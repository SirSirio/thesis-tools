---
quick_id: 260713-o8z
description: Align prototype cards on the actual curved line in prototypes page
date: 2026-07-13
status: complete
---

# Quick Task 260713-o8z — Summary

## What changed

The five prototype cards in the journey view used to sit in a straight
centre column (`left: 50%`) while the orange SVG S-curve swayed
underneath them. Now each card rides the curve.

**`prototypes/index.html`** — added `alignNodesToPath()` to the inline
script (after the IntersectionObserver block):

- Samples the real `.journey-path` at 240 points via `getPointAtLength()`
  (user units — `pathLength="1"` only rescales the stroke dashes used by
  the draw-in animation, so it doesn't interfere).
- For each `.proto-node`, converts the card's vertical centre to viewBox
  y (`/stageHeight · 900`), takes the nearest sample, and writes
  `left = x/600 · 100 %`. Because the SVG uses
  `preserveAspectRatio="none"`, viewBox units map linearly to stage
  fractions — no matrix math needed. The existing `translateX(-50%)`
  keeps the card centred on that point.
- `left` is clamped to half a card width from each stage edge, so a card
  can never overflow the stage (protects the no-horizontal-scroll rule).
- On mobile (≤ 640 px, SVG is `display: none`) it clears the inline
  `left` and bails, so the static full-width stack is untouched and no
  stale offset leaks back when resizing up to desktop.
- Runs at parse (script is end-of-body), on `load` (proto-01's photo
  changes card height), and on `resize`.

**`prototypes/SPEC.md`** — journey-view section now records the runtime
path-sampling placement and the no-JS fallback (cards stay in the CSS
centre column).

## Verification (Playwright, local server)

Measured each card's rendered centre against the path point at the same
y, using `getBoundingClientRect` (not `offsetLeft`, which ignores the
`translateX(-50%)` transform):

| Viewport | Max centre-to-curve error | Card overflow | Horizontal scroll |
|----------|---------------------------|---------------|-------------------|
| 929 px   | 1 px                      | none          | none |
| 1440 px  | 1 px                      | none          | none |
| 390 px   | n/a — static stack, inline `left` cleared | none | none |

Resize 1280 → 390 → 1440 restores alignment correctly. Only console
error on the page is a pre-existing `favicon.ico` 404.

## Files

- `prototypes/index.html`
- `prototypes/SPEC.md`
