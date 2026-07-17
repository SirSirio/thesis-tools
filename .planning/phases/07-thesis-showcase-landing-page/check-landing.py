#!/usr/bin/env python3
"""
check-landing.py -- Phase 7 invariant checker for index.html.

Planning-workspace verification script, NOT a site build step and NOT a
runtime dependency. Lives under .planning/, ships nothing, standard-library
only (re, io, math, pathlib, sys). Run from the repo root:

    python .planning/phases/07-thesis-showcase-landing-page/check-landing.py

Each assertion group prints its own "OK: ..." line so a failure names the
decision it protects, not just a source line number. Exits 0 on success,
non-zero (via AssertionError -> uncaught traceback) on the first failure.

AMENDMENT NOTE (D-01/D-03, mid-phase user decision): the landing page's hero
motif was reworked to use the locally-vendored assets/gsap/gsap.min.js (GSAP
core, no CDN, no plugins, committed in a6f9a26). Any check that would treat
a reference to "gsap" itself as forbidden is WRONG for this phase -- only
CDN-host strings (googleapis, gstatic, unpkg, jsdelivr, cdn) remain
forbidden. This script reflects that amendment; do not re-add "gsap" to the
forbidden list.

AMENDMENT NOTE 2 (consequence of the same GSAP rework): the hero rotor's
motion is driven entirely by a JS GSAP timeline (initHeroMotion()), not CSS
@keyframes. There is no "animation: none" CSS rule to check for any more --
the reduced-motion freeze happens in JS (prefersReducedMotion gates
tl.play() and instead seeks+pauses the timeline). This script checks for
that JS-side mechanism instead of a stale CSS-only assumption.
"""
import io
import math
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
INDEX = ROOT / "index.html"

FAILURES = []


def check(condition, message):
    """Assert-like helper that collects a named failure instead of raising
    immediately, so one run reports every broken invariant, not just the
    first one encountered."""
    if not condition:
        FAILURES.append(message)


def strip_comments(src):
    """Strip HTML comments and JS comments before forbidden-reference
    matching, so a comment that explains what is NOT used (e.g. "no CDN,
    no plugins") cannot make the check pass or fail spuriously. Only
    full-line `//` comments are stripped (not inline trailing `//`), since
    the file's only inline `//` occurrences are inside URL strings
    (e.g. the inline SVG favicon's data URI), never trailing comments."""
    s = re.sub(r"<!--.*?-->", "", src, flags=re.S)
    s = re.sub(r"/\*.*?\*/", "", s, flags=re.S)
    lines = []
    for line in s.split("\n"):
        if line.strip().startswith("//"):
            continue
        lines.append(line)
    return "\n".join(lines)


def main():
    if not INDEX.exists():
        print(f"FATAL: {INDEX} not found", file=sys.stderr)
        sys.exit(2)
    s = io.open(INDEX, encoding="utf-8").read()
    stripped = strip_comments(s)

    # ── Eyebrows (D-17) ──────────────────────────────────────────────
    # Assert the >=7 section-count floor FIRST, so a structural
    # regression (fewer sections than D-13+D-14 mandate) reports as a
    # structural regression, not a misleading eyebrow-cap breach.
    secs = len(re.findall(r"<section", s))
    check(secs >= 7,
          "D-17/D-13/D-14: expected >=7 <section> elements (4 narrative + "
          "3 resource); found %d" % secs)

    idx = re.findall(r'class="section-index">([0-9]+)<', s)
    check(idx == ["01", "02", "03"],
          "D-17: .section-index eyebrows must read exactly 01,02,03 in "
          "order; found %s" % idx)

    if secs > 0:
        cap = math.ceil(secs / 3)
        check(len(idx) <= cap,
              "D-17: eyebrow count %d exceeds ceil(section count %d / 3) "
              "= %d" % (len(idx), secs, cap))
    print("OK: eyebrows (sections=%d, eyebrows=%s)" % (secs, idx))

    # ── Destinations (hard invariant) ───────────────────────────────
    dests = [
        "tools/rotor-solver/",
        "tools/peristaltic-roller-displaced-volume-model/",
        "tools/peristaltic-tensioned-path-model/",
        "tools/system-architecture-explorer/",
        "tools/gsd-workflow-guide/",
        "prototypes/",
        "tools/thesis-timeline/",
        "decks/",
    ]
    missing = [d for d in dests if d not in s]
    check(not missing, "HARD INVARIANT: unreachable destinations %s" % missing)
    print("OK: all 8 destinations present")

    # ── Tools section card count (D-14) ─────────────────────────────
    blocks = s.split("<section")
    tools_blocks = [b for b in blocks if "tools/rotor-solver/" in b]
    check(len(tools_blocks) == 1,
          "D-14: expected exactly 1 section containing the rotor-solver "
          "card, found %d" % len(tools_blocks))
    if tools_blocks:
        tb = tools_blocks[0]
        n_in_section = tb.count('class="tool-card')
        check(n_in_section == 5,
              "D-14: merged Tools section must hold exactly 5 tool-card "
              "anchors; found %d" % n_in_section)
        for h in dests[:5]:
            check(h in tb,
                  "D-14: card %s not inside the merged Tools section" % h)
    total_cards = s.count('class="tool-card')
    check(total_cards == 7,
          "D-14: expected 7 tool-cards total (5 Tools + 1 Roadmap + 1 "
          "Presentations); found %d" % total_cards)
    print("OK: Tools section card count (5 scoped, %d total)" % total_cards)

    # ── i18n parity and orphan keys (D-18, LANG-01..05) ─────────────
    m = re.search(r"const LANG = \{(.*?)\n    \};", s, re.S)
    check(m is not None, "D-18: LANG dict not found")
    en, it, used = set(), set(), set()
    if m:
        d = m.group(1)
        parts = d.split("it: {")
        check(len(parts) == 2, "D-18: could not split LANG dict into en/it branches")
        if len(parts) == 2:
            en_s, it_s = parts[0], parts[1]
            en = set(re.findall(r"'([a-z0-9-]+)':\s", en_s))
            it = set(re.findall(r"'([a-z0-9-]+)':\s", it_s))
            check(en == it,
                  "D-18: EN/IT key mismatch: only-EN=%s only-IT=%s"
                  % (sorted(en - it), sorted(it - en)))

            # Keys referenced literally as data-i18n="key" in static markup...
            used = set(re.findall(r'data-i18n="([a-z0-9-]+)"', s))
            # ...UNION keys referenced dynamically: buildModuleSchema()
            # builds each module <text> with data-i18n="${b.labelKey}",
            # so the six module-* keys are only visible via the boxes
            # array's labelKey values, not as a literal data-i18n="...".
            # This is a real (not orphaned) usage -- a purely textual
            # scan for data-i18n="literal" would false-positive these six
            # keys as orphaned every single run.
            used |= set(re.findall(r"labelKey:\s*'([a-z0-9-]+)'", s))

            check(not (used - en),
                  "D-18: data-i18n keys with no LANG.en entry: %s"
                  % sorted(used - en))
            check(not (en - used),
                  "D-18: orphaned LANG.en keys not referenced by any "
                  "data-i18n (literal or dynamic): %s" % sorted(en - used))
    print("OK: i18n parity (%d EN keys, %d IT keys, %d used)" % (len(en), len(it), len(used)))

    # ── Guards intact (LANG-03, LANG-04, T-07-10) ───────────────────
    check(re.search(
        r"try\s*\{\s*currentLang\s*=\s*localStorage\.getItem\('lang'\)\s*\|\|\s*'en';\s*\}\s*catch\s*\(e\)\s*\{\s*\}",
        s) is not None,
        "LANG-04/T-07-10: localStorage.getItem('lang') read is not "
        "try/catch wrapped as expected")
    check(re.search(r"if\s*\(!LANG\[currentLang\]\)\s*currentLang\s*=\s*'en';", s) is not None,
          "LANG-03/T-07-10: 'if (!LANG[currentLang]) currentLang = ...' "
          "fallback guard is missing")
    print("OK: localStorage guard (try/catch) and LANG fallback guard intact")

    # ── Forbidden references (D-01, D-03, amended) ──────────────────
    # gsap itself is explicitly SANCTIONED (D-01/D-03 amended by Sirio,
    # commit a6f9a26) -- only CDN-host strings remain forbidden.
    forbidden = ["googleapis", "gstatic", "unpkg", "jsdelivr", "cdn"]
    hits = {f: len(re.findall(f, stripped, flags=re.I)) for f in forbidden}
    hits = {k: v for k, v in hits.items() if v}
    check(not hits, "D-01/D-03: forbidden CDN-host reference(s) found in "
                     "comment-stripped source: %s" % hits)
    # No externally-hosted <script src="http...">.
    script_srcs = re.findall(r'<script[^>]+src="([^"]+)"', s)
    external = [u for u in script_srcs if u.startswith("http")]
    check(not external, "D-01/D-03: externally-hosted <script src> found: %s" % external)
    check("assets/gsap/gsap.min.js" in s,
          "D-01/D-03 (amended): expected the local vendored "
          "assets/gsap/gsap.min.js reference to be present")
    print("OK: no CDN references; gsap is local-only (assets/gsap/gsap.min.js)")

    # ── Animation technique (D-01, RESEARCH rejected techniques) ────
    for banned in ["animateTransform", "requestAnimationFrame", "getPointAtLength"]:
        check(banned not in s, "D-01: rejected animation technique '%s' found" % banned)
    print("OK: no rejected animation techniques (animateTransform / "
          "requestAnimationFrame / getPointAtLength)")

    # ── Exactly one IntersectionObserver (D-11) ─────────────────────
    n_io = len(re.findall(r"new IntersectionObserver", s))
    check(n_io == 1, "D-11: expected exactly 1 'new IntersectionObserver'; found %d" % n_io)
    print("OK: exactly one IntersectionObserver instance")

    # ── D-16: simplified module schema, no port, no iframe ──────────
    check("buildModuleSchema" in s, "D-16: buildModuleSchema() not found")
    check(re.search(r"\bbuildSchema\s*\(", s) is None,
          "D-16: buildSchema( call/definition found -- must not port the "
          "System Architecture Explorer's function")
    check("<iframe" not in s.lower(), "D-16: <iframe> found -- must not embed the tool")
    check(re.search(r"NEMA17|MPR121|LM75", s) is None,
          "D-16: engineering-grade component name (NEMA17/MPR121/LM75) "
          "leaked into the simplified graphic's own code")
    print("OK: D-16 module schema (no port, no iframe, no component leakage)")

    # ── Video (D-09, D-10, D-11) ─────────────────────────────────────
    check("pump-head-web.mp4" in s, "D-09/D-10: pump-head-web.mp4 not referenced")
    check("pump-head-poster.jpg" in s, "D-09/D-10: pump-head-poster.jpg not referenced")
    video_tag_m = re.search(r"<video[^>]*>", s)
    check(video_tag_m is not None, "D-11: <video> tag not found")
    if video_tag_m:
        vtag = video_tag_m.group(0)
        for attr in ["muted", "loop", "playsinline"]:
            check(attr in vtag, "D-11: <video> tag missing '%s' attribute" % attr)
    check(not re.search(r"aspect-ratio\s*:\s*16\s*/\s*9", s),
          "D-09/RESEARCH Pitfall 2: forbidden 16:9 aspect-ratio rule found "
          "on a portrait clip")
    print("OK: video wiring (muted/loop/playsinline, no 16:9 aspect-ratio)")

    # ── Font (D-20) ───────────────────────────────────────────────────
    check("assets/fonts/geist/Geist-Bold.woff2" in s,
          "D-20: assets/fonts/geist/Geist-Bold.woff2 not referenced")
    license_path = ROOT / "assets" / "fonts" / "geist" / "LICENSE.txt"
    check(license_path.exists(), "D-20: %s does not exist on disk" % license_path)
    print("OK: Geist font reference + LICENSE.txt on disk")

    # ── Geometry (D-06) ───────────────────────────────────────────────
    check("19.7" in s, "D-06: real proto-02 rotor radius (19.7) not found")
    print("OK: real proto-02 geometry (19.7) present")

    # ── Reduced motion (D-03, amended: JS-driven, not CSS keyframes) ─
    n_rm_blocks = len(re.findall(
        r"@media\s*\(prefers-reduced-motion:\s*reduce\)", s))
    check(n_rm_blocks == 1,
          "D-03: expected exactly 1 '@media (prefers-reduced-motion: "
          "reduce)' block; found %d" % n_rm_blocks)
    # The hero motion's reduced-motion handling now lives in JS
    # (initHeroMotion() checks prefersReducedMotion and seeks+pauses the
    # GSAP timeline instead of calling tl.play()) rather than a CSS
    # "animation: none" rule, since there are no more CSS @keyframes to
    # freeze after the GSAP rework. Assert the JS mechanism exists.
    check("prefersReducedMotion" in s,
          "D-03: no 'prefersReducedMotion' JS guard found")
    check(re.search(r"tl\.progress\([^)]*\)\.pause\(\)", s) is not None,
          "D-03: expected the hero timeline's reduced-motion freeze "
          "('tl.progress(...).pause()') to be present")
    print("OK: reduced motion (1 CSS block + JS-driven hero freeze)")

    # ── Report ────────────────────────────────────────────────────────
    if FAILURES:
        print("\nFAILURES (%d):" % len(FAILURES), file=sys.stderr)
        for f in FAILURES:
            print("  - %s" % f, file=sys.stderr)
        sys.exit(1)

    print("\nALL CHECKS PASSED")
    sys.exit(0)


if __name__ == "__main__":
    main()
