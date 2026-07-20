---
quick_id: 260720-a4x
slug: arch-tool-flow-schema-price-fixes
date: 2026-07-20
status: complete
---

# Summary — Architecture tool: schema font, price fold, page flow

Phase 6.1 adjustments to `tools/system-architecture-explorer/index.html` (plus a
SPEC.md sync). Style tokens untouched — the user was explicit the styling is fine;
only legibility, affordance, and page flow changed. Verified live via `serve.bat`
+ headless browser at 1280px.

## Task 1 — Module schema font (was too small) ✓
`buildSchema()` SVG text bumped: module titles 12.5 → **15**, payload chips
9.5 → **12** (chip rect 16 → 18 tall, row pitch 20 → 22 to keep the larger text
inside the fixed 120-tall boxes), liquid-barrier label 10 → **12**, legend
10 → **12** (legend rows re-spaced). Screenshot confirmed every chip — including
the longest, "System bus (I²C / RS-485 / CAN)" and "6× NEMA17 42BYGHW811" —
still fits its box with no overflow.

## Task 2 — Component unit prices now reads as expandable ✓
The bare `<details id="pricesFold">` is now boxed: glass-bg + `--glass-border` +
12px radius + padding, matching the surrounding `.sae-card` token family, with a
hover border cue and the existing rotate-on-open ▸ marker. Collapsed it reads as
a clickable card; open, the inner table card nests inside it. Verified toggle
open/closed.

## Task 3 — Overall page flow (user-selected scope) ✓
- Divider pills renumbered from the inconsistent "Part 00 / Design directions /
  Part 01 / Part 02 / Diagram" to a clean **Part 1 · Part 2 · Part 3 · Part 4**
  walkthrough spine.
- The per-variant diagram is now Part 4's companion: a muted, non-numbered
  **"Selected-variant view"** label (`.part-label--sub`) tightened against the
  matrix, so the page ends on the comparison step instead of a dangling section.
  Its summary now opens "Companion to the matrix above — …".
- Vertical rhythm between top-level parts increased (`.part-label` margin-top
  16 → 30px) so the four steps read as distinct beats.
- HTML comment banners + one visible prose reference ("module schema in Part 1")
  updated for consistency; SPEC.md part references synced (Part 00→1, Part 01→3,
  spine line updated).

## Files
- `tools/system-architecture-explorer/index.html` — all three fixes
- `tools/system-architecture-explorer/SPEC.md` — part-number sync

## Notes / follow-ups
- No changes to `assets/style.css` (tool-local `<style>` + inline `<script>` only).
- The schema's right-hand note panel is still mostly empty until a module is
  hovered — left as-is; the user's layout complaint was scoped to overall flow,
  not the schema's two-column split.
