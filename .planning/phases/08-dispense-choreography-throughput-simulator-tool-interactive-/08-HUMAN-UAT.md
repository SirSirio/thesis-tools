---
status: partial
phase: 08-dispense-choreography-throughput-simulator-tool-interactive-
source: [08-VERIFICATION.md]
started: 2026-07-20T00:00:00Z
updated: 2026-07-20T00:00:00Z
---

## Current Test

[awaiting user re-confirmation of fixes to tests 4–6]

## Tests

### 1. Tool shell renders with benchmark defaults, no horizontal scroll
expected: Serve with `.\serve.bat`, open `tools/dispense-throughput-simulator/index.html`. Benchmark defaults prefilled (4 liquids 600/200/175/25 µL, rollers 4, µL/stroke 5, RPM 180); slider max equals liquid count; A1/A2 endpoint markers and the mode toggle are visible; no horizontal scroll at 1280px or 375px.
result: passed — user confirmed "all good".

### 2. Live slider drag and degenerate-input warning
expected: Drag the concurrency slider K=1→K=N; total updates live from ~583 s toward ~377 s. Clearing the RPM field shows an inline warning, never NaN/blank.
result: passed — user confirmed it works. Enhancement requests applied: slider shortened + centred (max-width 440px), and the "Concurrency K" label emphasised (1rem, bold, non-uppercase).

### 3. Four metric cards match the benchmark verdict, mode-toggle equality is visible
expected: At K=1 cards read total ≈9m43s, bottleneck "600 µL to 10.0 s", delta "206.67 s saved ~35%", throughput 18.23 s/sample / 197.5 samples/hr. Toggling mode A1↔A2 at fixed interior K leaves numbers unchanged with visible explanatory copy.
result: passed — values confirmed. Clarified the A1/A2 semantics: renamed the "A1 vs A2 delta" card to "Serial vs parallel (time saved)" and rewrote the mode-toggle copy to state it is illustrative in v1 and foreshadow the planned per-pump-rate mode. (See follow-up: per-pump independent-rate feature.)

### 4. Gantt renders correctly at both viewport widths with working tooltips
expected: N station rows over the steady-state window, bottleneck row highlighted, hover tooltips show station/liquid/dose/cycle, no horizontal scrollbar.
result: ISSUE FOUND → FIXED (pending user re-confirm). Tooltip appeared far from the cursor because #ganttTip was inside a .glass-panel whose backdrop-filter became the containing block for position:fixed. Fix: reparent #ganttTip to <body>. Verified in-browser — tooltip now sits 13/15 px (= pad) from the hovered bar; no horizontal scroll at 1280px.

### 5. Rack animation loops correctly and respects reduced motion
expected: Wells index in a discrete snap-pause-snap seamless loop; static under reduced motion; no console errors/network requests.
result: ISSUE FOUND → FIXED (pending user re-confirm). Motion was invisible because every well was an identical grey circle (sliding by one spacing looked static). Fix: colour wells on an 8-well period (keeps the steps(8) loop seamless) + add a dispense pulse on the nozzle drops. Verified in-browser — 16 coloured wells, --travel -440px, indexStep animation active; reduced-motion guard extended to the drops.

### 6. Landing-page card renders correctly in EN and IT
expected: Card in the Tools grid with a unique ⏱ icon, links to the tool, text switches EN↔IT, no horizontal scroll; no orphan row.
result: ISSUE FOUND → FIXED (pending user re-confirm). The 6th card was double-width from the 5-card-era `.tool-card--feature { span 2 }` rule, orphaning a row. Fix: removed the span rule + class. Verified in-browser — 6 equal 296px cards, exactly 3-per-row (3+3) at 1280px, no horizontal scroll. EN/IT toggle keys confirmed present in both locales.

## Summary

total: 6
passed: 3
issues: 0
pending: 3
skipped: 0
blocked: 0

## Gaps

Three visual issues found during UAT (tests 4, 5, 6) were fixed in commit
`6e5bb6b` and verified in-browser via Playwright. They remain marked `pending`
until the user re-confirms them visually. No blocking gaps remain.
