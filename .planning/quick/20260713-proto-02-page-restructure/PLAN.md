---
type: quick
slug: proto-02-page-restructure
created: 2026-07-13
files: [prototypes/index.html, prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PROTOTYPE.md]
---

# Quick task: proto-02 page revision (7 user requests)

User requests, verbatim intent:
1. Reposition ShrinkTest10cm.jpg (stranded at section bottom after the fit-ladder content)
   next to the shrink-coupon results; BearingPocketTest.jpg after its ladder table; constrain photo width.
2. Mark the 0.085 mm radial-play figure as an estimate (HTML table + PROTOTYPE.md sync).
3. Simplify the PLA-creep/DFM paragraph: plastic was a deliberate expedient to prove the
   concept fast and learn to engineer with a specific material; final pump will be metal.
4. Print model: introduce it better (motivation = no guesswork, characterize the printer,
   educated guess NOT claimed accurate) + visual annotated formula (HTML/CSS chips).
   Also fix the now-contradicted "shrink is nozzle-independent" stat-label.
5. Add a modern TOC with anchor links (grouped by version, auto-expands panels).
6. Make version groups collapsible glass panels (design / v2.1 / v2.2), current open.
   Remove stale status callout + now-redundant inline version chips.
7. Redesign head radius-ladder SVG as a true cross-section: solid hatched walls,
   centerline + ghost mirror + top-view locator inset making "right half only" obvious;
   exaggerated radial spacing, noted.

## Commits
1. content: images, estimate, creep text, print-model intro + visual formula, stat-label
2. schematic: cross-section rebuild of the head diagram
3. structure: TOC + collapsible version panels + CSS/JS
