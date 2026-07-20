---
status: partial
phase: 08-dispense-choreography-throughput-simulator-tool-interactive-
source: [08-VERIFICATION.md]
started: 2026-07-20T00:00:00Z
updated: 2026-07-20T00:00:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Tool shell renders with benchmark defaults, no horizontal scroll
expected: Serve with `.\serve.bat`, open `tools/dispense-throughput-simulator/index.html`. Benchmark defaults prefilled (4 liquids 600/200/175/25 µL, rollers 4, µL/stroke 5, RPM 180); slider max equals liquid count; A1/A2 endpoint markers and the mode toggle are visible; no horizontal scroll at 1280px or 375px.
result: [pending]

### 2. Live slider drag and degenerate-input warning
expected: Drag the concurrency slider K=1→K=N while watching the total-time card; total updates live from ~583 s toward ~377 s. Clearing the RPM field shows an inline warning, never NaN/blank.
result: [pending]

### 3. Four metric cards match the benchmark verdict, mode-toggle equality is visible
expected: At K=1, cards read total ≈9m43s, bottleneck "600 µL to 10.0 s", delta "206.67 s saved (~35%)", throughput 18.23 s/sample / 197.5 samples/hr. Toggling mode A1↔A2 at fixed interior K leaves numbers unchanged with visible explanatory copy; delta card stays fixed while dragging the slider.
result: [pending]

### 4. Gantt renders correctly at both viewport widths with working tooltips
expected: At 1280px and 375px — N station rows over the steady-state window, bottleneck (600 µL) row visibly highlighted, hover tooltips show station/liquid/dose/cycle, no horizontal scrollbar at either width.
result: [pending]

### 5. Rack animation loops correctly and respects reduced motion
expected: Wells index in a discrete snap-pause-snap pattern in a seamless loop; animation is static under OS "reduce motion"; no console errors, no network requests.
result: [pending]

### 6. Landing-page card renders correctly in EN and IT
expected: Card appears in the Tools grid with a unique ⏱ icon, links to the tool, text switches correctly EN↔IT, no horizontal scroll at 1280px/375px. Also confirm visually whether the card lands alone in an orphan row (relates to code-review WR-02).
result: [pending]

## Summary

total: 6
passed: 0
issues: 0
pending: 6
skipped: 0
blocked: 0

## Gaps
