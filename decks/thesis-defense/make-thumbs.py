#!/usr/bin/env python3
"""Render the overview thumbnails of the defense deck, one picture per slide.

The overview (press o or Escape) used to show static DOM clones of every
slide, so anything a GSAP timeline draws was missing or caught mid-flight.
This script opens the deck in headless Chrome, walks every slide to its LAST
clicker step, lets every animation finish, and saves the stage as

    assets/thumbs/<cue>.jpg          960 x 540, one per slide
    assets/thumbs/manifest.js        window.DECK_THUMBS = {ext, v: {cue: hash}}

The tail script (parts/99-tail.html, section 4d) lays each picture over the
clone inside the same thumb node, cache-busted with the hash from the
manifest, and falls back to the clone when a picture is missing.

Run from anywhere, with the site served at http://localhost:7331
(.\\serve.bat from the repo root):

    python make-thumbs.py               every slide
    python make-thumbs.py s12 s07b      just those cues (the manifest keeps
                                        every other entry as it was)

Options:
    --walk        reach the last step by pressing advance() from step 0
                  instead of entering the slide at its last step (slower;
                  used to check that both give the same picture)
    --it          render the Italian guest deck (it/index.html into
                  it/assets/thumbs/) instead of the English one
    --out DIR     write the pictures somewhere else (the manifest is only
                  written into the deck's own assets/thumbs/)
    --base URL    the served repo root, default http://localhost:7331
    --quality N   JPEG quality, default 80
    --width N     output width in px, default 960 (height follows 16:9)
    --show        keep the browser window visible (debugging)

Requires: Python 3 standard library, websocket-client, and Chrome or Edge.
"""

from __future__ import annotations

import argparse
import base64
import hashlib
import json
import os
import shutil
import socket
import subprocess
import sys
import tempfile
import time
import urllib.request
from pathlib import Path

try:
    import websocket  # websocket-client
except ImportError:  # pragma: no cover
    print("error: this script needs websocket-client (pip install --user websocket-client)",
          file=sys.stderr)
    raise SystemExit(1)

HERE = Path(__file__).resolve().parent
REPO_PATH_EN = "decks/thesis-defense/index.html"
REPO_PATH_IT = "decks/thesis-defense/it/index.html"

CHROME_CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"),
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
]

# Hide everything that is not the projected stage: the frame, the HUD, the
# presenter and guest furniture. The stage's own rail, slide number and
# module mark stay, because the projector shows them.
CHROME_OFF_CSS = """
.site-nav, #instr-panel, .deck-hud, .deck-nav, .deck-progress, .deck-arrow,
.guest-dot, .guest-cap, .site-foot, .pres, .deck-overview { display: none !important; }
html, body { cursor: none !important; }
"""

JS_SETUP = r"""
(function () {
  var st = document.createElement('style');
  st.id = 'thumbs-capture';
  st.textContent = %s;
  document.head.appendChild(st);
  if (window.gsap) { try { window.gsap.ticker.lagSmoothing(0); } catch (e) {} }
  window.__thumbErrors = [];
  window.addEventListener('error', function (e) {
    window.__thumbErrors.push(String(e.message || e));
  });
  var ce = console.error;
  console.error = function () {
    try { window.__thumbErrors.push(Array.prototype.map.call(arguments, String).join(' ')); } catch (e) {}
    return ce.apply(console, arguments);
  };
  return JSON.stringify(Array.prototype.map.call(document.querySelectorAll('.slide'),
    function (s) { return [s.getAttribute('data-cue'), s.querySelectorAll('.fragment').length]; }));
})()
"""

# Push every running GSAP animation (entrance hooks, loops, delayed calls) far
# past its end. Headless Chrome starves requestAnimationFrame, so without this
# anything started on Deck.enter looks stalled. Paused step timelines are not
# touched: they hold exactly the label the deck seeked them to.
JS_FORCE = r"""
(function () {
  var g = window.gsap;
  if (!g) return 'no-gsap';
  for (var i = 0; i < 3; i++) {
    try { g.globalTimeline.time(g.globalTimeline.time() + 8); } catch (e) {}
    try { g.ticker.tick(); } catch (e) {}
  }
  return 'ok';
})()
"""

JS_PENDING = r"""
(function () {
  var el = window.Deck && window.Deck.el;
  if (!el) return 99;
  var n = 0;
  el.querySelectorAll('img').forEach(function (im) {
    if (im.getAttribute('src') && !im.complete) n++;
  });
  if (document.fonts && document.fonts.status !== 'loaded') n++;
  return n;
})()
"""

# A video on the thumbnail shows its poster, the frame chosen to stand for it.
JS_VIDEOS = r"""
(function () {
  var el = window.Deck && window.Deck.el;
  if (!el) return 0;
  var n = 0;
  el.querySelectorAll('video').forEach(function (v) {
    try { v.pause(); } catch (e) {}
    if (v.getAttribute('poster')) {
      v.removeAttribute('src');
      try { v.load(); } catch (e) {}
      n++;
    }
  });
  return n;
})()
"""

JS_RECT = r"""
(function () {
  var s = document.querySelector('.deck-stage');
  var r = s.getBoundingClientRect();
  return JSON.stringify({x: r.left, y: r.top, w: r.width, h: r.height,
                         cue: window.Deck.cue, step: window.Deck.step, steps: window.Deck.steps});
})()
"""


def find_chrome() -> str:
    for c in CHROME_CANDIDATES:
        if c and Path(c).is_file():
            return c
    for name in ("chrome", "google-chrome", "chromium", "msedge"):
        p = shutil.which(name)
        if p:
            return p
    raise SystemExit("error: no Chrome or Edge found")


def free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def kill_tree(proc: subprocess.Popen) -> None:
    if proc.poll() is not None:
        return
    if os.name == "nt":
        subprocess.run(["taskkill", "/F", "/T", "/PID", str(proc.pid)],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    else:
        proc.kill()
    try:
        proc.wait(timeout=10)
    except Exception:
        pass


class CDP:
    def __init__(self, ws_url: str):
        self.ws = websocket.create_connection(ws_url, timeout=60, suppress_origin=True)
        self.n = 0

    def call(self, method: str, **params):
        self.n += 1
        mid = self.n
        self.ws.send(json.dumps({"id": mid, "method": method, "params": params}))
        while True:
            msg = json.loads(self.ws.recv())
            if msg.get("id") == mid:
                if "error" in msg:
                    raise RuntimeError(f"{method}: {msg['error']}")
                return msg.get("result", {})

    def js(self, expr: str):
        r = self.call("Runtime.evaluate", expression=expr, returnByValue=True, awaitPromise=True)
        if "exceptionDetails" in r:
            raise RuntimeError(r["exceptionDetails"].get("text", "js error"))
        return r.get("result", {}).get("value")

    def close(self):
        try:
            self.ws.close()
        except Exception:
            pass


def page_ws(port: int, deadline: float) -> str:
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/json", timeout=2) as r:
                for t in json.loads(r.read().decode()):
                    if t.get("type") == "page" and t.get("webSocketDebuggerUrl"):
                        return t["webSocketDebuggerUrl"]
        except Exception:
            pass
        time.sleep(0.25)
    raise SystemExit("error: Chrome did not open its debugging port")


def wait_for(cdp: CDP, expr: str, timeout: float, step: float = 0.15):
    end = time.time() + timeout
    v = None
    while time.time() < end:
        try:
            v = cdp.js(expr)
            if v:
                return v
        except Exception:
            pass
        time.sleep(step)
    return v


def main() -> int:
    ap = argparse.ArgumentParser(description="Render the defense deck's overview thumbnails.")
    ap.add_argument("cues", nargs="*", help="only these cues (default: every slide)")
    ap.add_argument("--walk", action="store_true", help="reach the last step with advance()")
    ap.add_argument("--it", action="store_true", help="the Italian guest deck under it/")
    ap.add_argument("--out", help="write the pictures here instead")
    ap.add_argument("--base", default="http://localhost:7331")
    ap.add_argument("--quality", type=int, default=80)
    ap.add_argument("--width", type=int, default=960)
    ap.add_argument("--show", action="store_true")
    a = ap.parse_args()

    deck_dir = HERE / "it" if a.it else HERE
    thumbs_dir = deck_dir / "assets" / "thumbs"
    out_dir = Path(a.out).resolve() if a.out else thumbs_dir
    out_dir.mkdir(parents=True, exist_ok=True)
    url = a.base.rstrip("/") + "/" + (REPO_PATH_IT if a.it else REPO_PATH_EN)

    try:
        urllib.request.urlopen(url, timeout=5).read(64)
    except Exception as e:
        print(f"error: {url} is not being served ({e}).\n"
              f"Start serve.bat from the repo root first.", file=sys.stderr)
        return 1

    chrome = find_chrome()
    port = free_port()
    profile = tempfile.mkdtemp(prefix="deck-thumbs-")
    args = [
        chrome,
        f"--remote-debugging-port={port}",
        f"--user-data-dir={profile}",
        "--remote-allow-origins=*",
        "--window-size=1280,720",
        "--hide-scrollbars", "--mute-audio",
        "--autoplay-policy=no-user-gesture-required",
        "--no-first-run", "--no-default-browser-check",
        "--disable-background-timer-throttling",
        "--disable-renderer-backgrounding",
        "--disable-backgrounding-occluded-windows",
        "about:blank",
    ]
    if not a.show:
        args.insert(1, "--headless=new")
    proc = subprocess.Popen(args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    failed: list[str] = []
    warned: list[str] = []
    done: dict[str, str] = {}
    cdp = None
    try:
        cdp = CDP(page_ws(port, time.time() + 20))
        cdp.call("Page.enable")
        cdp.call("Runtime.enable")
        cdp.call("Network.enable")
        cdp.call("Network.setCacheDisabled", cacheDisabled=True)
        cdp.call("Emulation.setDeviceMetricsOverride", width=1280, height=720,
                 deviceScaleFactor=1, mobile=False)
        # The local server is python's http.server: under load it sometimes
        # drops a script, and a deck without GSAP renders every slide at rest.
        # So check that the runtime and all four GSAP files arrived, and
        # reload until they have.
        ready = ("document.readyState==='complete' && !!window.Deck && Deck.count>0 && "
                 "!!window.gsap && !!window.DrawSVGPlugin && !!window.MotionPathPlugin && "
                 "!!window.MorphSVGPlugin")
        for attempt in range(4):
            cdp.call("Page.navigate", url=f"{url}?view=stage&thumbs={int(time.time())}{attempt}")
            if wait_for(cdp, ready, 30):
                break
            print(f"  the deck loaded incompletely, reloading ({attempt + 1})")
        else:
            print("error: the deck did not load with its GSAP runtime", file=sys.stderr)
            return 1
        time.sleep(0.8)
        slides = json.loads(cdp.js(JS_SETUP % json.dumps(CHROME_OFF_CSS)))
        steps_of = {c: n for c, n in slides}
        order = [c for c, _ in slides]

        targets = order
        if a.cues:
            unknown = [c for c in a.cues if c not in steps_of]
            for c in unknown:
                failed.append(f"{c}: no such cue in the deck")
            targets = [c for c in order if c in a.cues]

        print(f"rendering {len(targets)} of {len(order)} slides -> {out_dir}")
        for cue in targets:
            last = steps_of[cue]
            try:
                cdp.js("window.__thumbErrors = []")
                if a.walk:
                    cdp.js(f"Deck.goToCue({json.dumps(cue)}, 0)")
                    time.sleep(0.5)
                    cdp.js(JS_FORCE)
                    for _ in range(last):
                        cdp.js("Deck.advance()")
                        time.sleep(0.15)
                        cdp.js(JS_FORCE)
                else:
                    ok = cdp.js(f"Deck.goToCue({json.dumps(cue)}, {last})")
                    if not ok:
                        failed.append(f"{cue}: goToCue refused it")
                        continue
                # let the crossfade, CSS transitions and lazy media settle
                time.sleep(0.7)
                cdp.js(JS_FORCE)
                wait_for(cdp, JS_PENDING.replace("return n;", "return n === 0;"), 8)
                cdp.js(JS_VIDEOS)
                time.sleep(0.6)
                cdp.js(JS_FORCE)
                time.sleep(0.2)

                info = json.loads(cdp.js(JS_RECT))
                if info["cue"] != cue or info["step"] != last:
                    failed.append(f"{cue}: landed on {info['cue']} step {info['step']}/{info['steps']}")
                    continue
                pending = cdp.js(JS_PENDING)
                if pending:
                    warned.append(f"{cue}: {pending} image(s) or fonts still loading")
                broken = cdp.js("[].filter.call(Deck.el.querySelectorAll('img[src]'),"
                                "function(i){return i.complete && !i.naturalWidth}).length")
                if broken:
                    warned.append(f"{cue}: {broken} image(s) failed to load")
                errs = cdp.js("window.__thumbErrors") or []
                if errs:
                    warned.append(f"{cue}: console error: {errs[0][:140]}")

                scale = a.width / info["w"]
                shot = cdp.call("Page.captureScreenshot", format="jpeg", quality=a.quality,
                                clip={"x": info["x"], "y": info["y"], "width": info["w"],
                                      "height": info["h"], "scale": scale})
                data = base64.b64decode(shot["data"])
                (out_dir / f"{cue}.jpg").write_bytes(data)
                done[cue] = hashlib.sha1(data).hexdigest()[:10]
                print(f"  {cue:6s} step {last:2d}  {len(data) // 1024:4d} KB")
            except Exception as e:
                failed.append(f"{cue}: {e}")
    finally:
        if cdp:
            cdp.close()
        kill_tree(proc)
        shutil.rmtree(profile, ignore_errors=True)

    # The manifest: keep every entry a partial run did not touch, drop entries
    # whose picture no longer exists, and add what this run rendered.
    if out_dir == thumbs_dir and done:
        man_path = thumbs_dir / "manifest.js"
        old: dict[str, str] = {}
        if man_path.is_file():
            txt = man_path.read_text(encoding="utf-8")
            try:
                old = json.loads(txt[txt.index("{"):txt.rindex("}") + 1]).get("v", {})
            except Exception:
                old = {}
        v = {c: h for c, h in old.items() if (thumbs_dir / f"{c}.jpg").is_file()}
        v.update(done)
        body = json.dumps({"ext": "jpg", "v": dict(sorted(v.items()))}, indent=1)
        man_path.write_text(
            "/* Generated by make-thumbs.py; do not edit. Overview thumbnails:\n"
            "   assets/thumbs/<cue>.<ext>?v=<hash>. See SLIDE-ORDER.md section 7. */\n"
            f"window.DECK_THUMBS = {body};\n",
            encoding="utf-8", newline="\n")
        total = sum(p.stat().st_size for p in thumbs_dir.glob("*.jpg"))
        print(f"manifest: {len(v)} pictures, {total / 1048576:.1f} MB in {thumbs_dir}")

    for w in warned:
        print(f"warning: {w}")
    if failed:
        print(f"FAILED ({len(failed)}):")
        for f in failed:
            print(f"  {f}")
        return 2
    print(f"done: {len(done)} rendered, none failed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
