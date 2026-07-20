---
status: passed
phase: 08-dispense-choreography-throughput-simulator-tool-interactive-
source: [08-VERIFICATION.md]
started: 2026-07-20T00:00:00Z
updated: 2026-07-20T00:00:00Z
---

## Current Test

[complete — user approved phase 8 on 2026-07-20 after multiple review iterations]

Tests 1–4 and 6 confirmed by the user. Test 5 (rack animation) was iterated
several times and shipped; a further refinement to the user's preferred K-tubes
state model is captured as a follow-up todo (2026-07-20-dispense-sim-animation-
k-tubes-state-model) rather than blocking the phase.

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
expected: Rack indexes under the nozzles; tubes fill; static under reduced motion; no console errors/network requests.
result: REDESIGNED (2nd iteration, pending user re-confirm). The colour-changing wells ("traffic light") were scrapped. New animation: a rack of 8 1.5 ml Eppendorf-style tubes (landing-page tube idiom) indexes left under N fixed nozzles (nozzle spacing = sample spacing); each tube builds the cocktail layer by layer as it passes each nozzle, with stacked per-liquid bands whose heights ∝ dose volume. JS stepper drives the slide (rAF transform tween) + per-layer CSS fill reveal. Verified in-browser: 8 tubes, 32 layers at N=4, rack transform advances, layers fill 1→6 over time, 0 console errors, reduced-motion renders a static frame.

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

Iteration 1 (`6e5bb6b`): tests 4, 5, 6 visual issues fixed + verified in-browser.

Iteration 2 (this commit): on user feedback the rack animation was fully
redesigned (8 Eppendorf tubes, layered fill ∝ volume, indexing under fixed
nozzles — see test 5), and the A1/A2 control-mode toggle was made **functional**
via per-pump RPM (locked+dimmed under A1, editable under A2; engine + SPEC +
harness updated). Default (all 180 RPM) still reproduces the pinned benchmark;
harness core+metrics+per-pump assertions pass. All verified in-browser (0 console
errors). Tests 4, 5, 6 remain `pending` until the user re-confirms visually. No
blocking gaps remain.
