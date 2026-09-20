#!/usr/bin/env python3
"""Assemble decks/thesis-defense/index.html from parts/*.html.

The served deck is one self-contained file, but several builders work on it
in parallel, so the source lives in parts/ and this script concatenates them
in file-name order:

    parts/00-head.html    doctype, head, shared CSS, frame, open .deck-stage
    parts/10-opening.html … the slide parts, one per builder
    parts/99-tail.html    close of stage, HUD, panels, runtime scripts

A part is a plain HTML fragment: its <section class="slide"> elements, then
optionally one <style data-part="…"> and one <script data-part="…"> block.
Those two blocks are lifted out and re-emitted, in part order, immediately
before </head> and before </body> respectively, so a builder never has to
touch the head or the tail.

index.html is generated; never edit it by hand.
Run:  python assemble.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
PARTS = HERE / "parts"
OUT = HERE / "index.html"

STYLE_RE = re.compile(r"[ \t]*<style\b[^>]*\bdata-part\b[^>]*>.*?</style>[ \t]*\r?\n?", re.S | re.I)
SCRIPT_RE = re.compile(r"[ \t]*<script\b[^>]*\bdata-part\b[^>]*>.*?</script>[ \t]*\r?\n?", re.S | re.I)
SLIDE_RE = re.compile(r"<section\b[^>]*\bclass=[\"'][^\"']*\bslide\b", re.I)
CUE_RE = re.compile(r"<section\b[^>]*?\bdata-cue=[\"']([^\"']+)[\"']", re.I | re.S)


def main() -> int:
    if not PARTS.is_dir():
        print(f"error: {PARTS} does not exist", file=sys.stderr)
        return 1

    files = sorted(p for p in PARTS.glob("*.html") if p.is_file())
    if not files:
        print(f"error: no parts in {PARTS}", file=sys.stderr)
        return 1

    body_chunks: list[str] = []
    styles: list[str] = []
    scripts: list[str] = []

    for path in files:
        text = path.read_text(encoding="utf-8")

        found_styles = STYLE_RE.findall(text)
        found_scripts = SCRIPT_RE.findall(text)
        for block in found_styles:
            styles.append(block.strip("\r\n"))
        for block in found_scripts:
            scripts.append(block.strip("\r\n"))

        text = STYLE_RE.sub("", text)
        text = SCRIPT_RE.sub("", text)
        body_chunks.append(text.rstrip("\r\n"))

    doc = "\n".join(body_chunks) + "\n"

    if styles:
        block = "\n".join(styles) + "\n"
        if "</head>" not in doc:
            print("error: no </head> in the assembled document", file=sys.stderr)
            return 1
        head, sep, rest = doc.partition("</head>")
        doc = head + block + sep + rest

    if scripts:
        block = "\n".join(scripts) + "\n"
        if "</body>" not in doc:
            print("error: no </body> in the assembled document", file=sys.stderr)
            return 1
        idx = doc.rindex("</body>")
        doc = doc[:idx] + block + doc[idx:]

    OUT.write_text(doc, encoding="utf-8", newline="\n")

    slides = SLIDE_RE.findall(doc)
    cues = CUE_RE.findall(doc)

    print(f"assembled {OUT.relative_to(HERE)} from {len(files)} parts:")
    for path in files:
        print(f"  · {path.name}")
    print(f"hoisted {len(styles)} <style data-part> block(s), {len(scripts)} <script data-part> block(s)")
    print(f"slides: {len(slides)}")
    print(f"cues ({len(cues)}): {', '.join(cues) if cues else '(none)'}")

    missing = len(slides) - len(cues)
    if missing:
        print(f"warning: {missing} slide(s) without a data-cue", file=sys.stderr)
    dupes = sorted({c for c in cues if cues.count(c) > 1})
    if dupes:
        print(f"warning: duplicate data-cue values: {', '.join(dupes)}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
