---
task: Redesign homepage index.html — premium/modern layout, keep all features incl. EN/IT translation
quick_id: 260713-o6s
date: 2026-07-13
status: complete
files_modified:
  - index.html
---

# Summary — Quick Task 260713-o6s

Homepage redesigned in place. `assets/style.css` untouched (shared by tool pages and
the lab-meeting deck) — all new styling lives in the page's inline `<style>` block,
layered over the shared tokens.

## What changed

- **Fixed glass top nav** — brand wordmark ("Thesis Tools · Sirio V. Feltrin") left,
  segmented EN/IT language switch right. Replaces the floating single-button toggle;
  same `localStorage` key (`lang`), still synced with rotor-solver.
- **Hero** — balanced 3-line gradient title (`text-wrap: balance`), author line framed
  by gradient hairlines, three translated meta chips (browser / offline-USB / no install).
- **Editorial section headers** — index numbers 01–04 + label + gradient hairline rule.
- **Cards** — icon in a glass gradient tile, hover top-hairline accent, mouse-tracking
  spotlight (CSS vars set from `mousemove`), arrow slides on hover, neutral border that
  warms to orange on hover.
- **Wide horizontal card variant** for single-card sections (Guides, Prototypes,
  Presentations) — no more lone card floating in a 3-column grid; collapses to vertical
  below 680 px.
- **Scroll-triggered reveals** — IntersectionObserver adds `.in-view`; styles gated on a
  `.js` root class so the page renders fully without JS; `prefers-reduced-motion`
  respected.
- **Background grid overlay** (radial-masked) + inline SVG data-URI favicon (kills the
  pre-existing favicon 404).
- **Full i18n coverage** — previously only ~half the page had `data-i18n` keys; now every
  visible string translates (cards 2–4, guides/prototypes/presentations cards, section
  descs, card links, meta chips). Arrows moved outside translated spans.

## Verification (Playwright against `python -m http.server 7331`)

- Loads with persisted language from localStorage (came up in IT from a prior session);
  EN/IT switch updates every string and the active segment; persists across reload.
- Desktop 1440×900 and mobile 390×844: no horizontal scroll, wide cards collapse,
  title balances.
- All `.reveal` elements reach `in-view` after a normal scroll pass (0 left hidden).
- Console clean (only pre-existing favicon 404, now fixed by the data-URI icon).

## Also

- STATE.md: retired backlog item "[ui] Redesign and restructure landing page for many
  tools" (this task addressed it); quick-task row + last-activity updated.
- The docs commit carries a small pre-existing uncommitted STATE.md line (Phase 6
  roadmap-evolution note from 2026-07-12) that was already in the working tree.
