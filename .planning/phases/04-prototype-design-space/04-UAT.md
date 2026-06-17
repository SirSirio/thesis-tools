---
status: complete
phase: 04-prototype-design-space
source: [04-01-SUMMARY.md, 04-02-SUMMARY.md]
started: 2026-06-17T00:00:00Z
updated: 2026-06-17T00:00:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Page loads — journey view visible, detail hidden
expected: Open prototypes/index.html (via serve.bat at http://localhost:7331/prototypes/). The page loads with the journey view visible: sticky nav bar with "← All tools" link, background blobs, the winding SVG path, and the proto-01 node card. The detail view is NOT shown on initial load.
result: pass

### 2. SVG path self-draws on scroll / load
expected: As the page loads or on first scroll, the winding SVG S-path animates in, drawing itself from top to bottom. If prefers-reduced-motion is off, the path draws itself; if on, the final state is shown statically. The proto-01 node card pops in after or alongside the path.
result: pass

### 3. Proto-01 node card content
expected: The proto-01 card on the journey view shows: a tag ("Proto-01" or similar label), a title, a short purpose summary, KPI pills showing −32% and CV 4.5%, and an "Explore" (or similar) call-to-action button.
result: pass

### 4. Explore button — swaps to detail view
expected: Clicking the Explore / CTA button on the proto-01 node card hides the journey view and shows the detail view — no page reload, instant swap.
result: pass

### 5. Detail view — Purpose section
expected: A Purpose section is visible with readable content describing the proto-01 prototype's purpose.
result: pass
note: "User noted: would like links to open in a new tab"

### 6. Detail view — Parameters table with working tool links
expected: A Parameters table is present in the detail view. It contains at least two clickable links: one to the Rotor Solver (tools/rotor-solver/) and one to the Peristaltic Roller Displaced-Volume Model (tools/peristaltic-roller-displaced-volume-model/). Clicking either link navigates correctly.
result: pass

### 7. Detail view — Results: stat-cards, bar chart, comparison table
expected: The Results section shows three hero stat-cards with key metrics. A CSS bar chart is visible with three bars representing 1000 / 678 / 600 µL. A gravimetric vs flow-method comparison table is also present.
result: pass

### 8. Detail view — Design reasoning section
expected: A "Design reasoning" (or equivalent) section is present in the detail view with readable content.
result: pass

### 9. Back to journey — view swap returns
expected: There is a way to navigate back to the journey view from the detail view (a back button, nav link, or similar). Clicking it hides the detail view and shows the journey view again — no page reload.
result: pass

### 10. Landing page card links to Prototype Design Space
expected: Open the site root (index.html at http://localhost:7331/). A "Prototype Design Space" card is visible in the tools grid. Clicking it navigates to prototypes/index.html.
result: pass

## Summary

total: 10
passed: 10
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

[none]
