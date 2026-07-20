---
phase: 08-dispense-choreography-throughput-simulator-tool-interactive-
verified: 2026-07-20T15:10:00Z
status: human_needed
score: 13/13 must-haves verified
overrides_applied: 0
human_verification:
  - test: "Serve tool, confirm benchmark defaults prefilled and slider/mode-toggle visible, no horizontal scroll at 1280px/375px (08-01-PLAN human-check)"
    expected: "4 liquids 600/200/175/25 prefilled, rollers 4/µL-stroke 5/RPM 180 prefilled; concK slider max=4; A1/A2 endpoint labels and mode select visible; no horizontal scrollbar at either width"
    why_human: "Visual layout/rendering — cannot be confirmed by static grep"
  - test: "Drag concurrency slider from K=1 to K=N and observe live total-time update; clear RPM field and observe inline warning instead of NaN (08-01-PLAN human-check)"
    expected: "Total run time updates live from ~583s to ~377s; clearing RPM shows a warning message, no NaN/blank cards"
    why_human: "Live DOM interaction/event behavior — requires a running browser"
  - test: "Serve tool, confirm four metric cards' values, mode toggle equality + explanatory copy at fixed K, and slider drag behavior (08-02-PLAN human-check)"
    expected: "K=1: total ~9m43s, bottleneck '600 µL to 10.0 s', A1-vs-A2 '206.67 s saved (~35%)', throughput 18.23 s/sample / 197.5 samples/hr; toggling A1↔A2 at fixed K leaves numbers equal with visible explanatory copy"
    why_human: "Visual/interactive confirmation of rendered metric card content"
  - test: "Serve tool at 1280px and 375px, confirm Gantt shows N station rows with no horizontal scrollbar, bottleneck row highlighted, hover tooltips work (08-02-PLAN human-check)"
    expected: "N rows visible, 600 µL row visibly highlighted, tooltips appear on hover, no horizontal scrollbar at either width"
    why_human: "Visual rendering/responsive layout and pointer-hover interaction"
  - test: "Serve tool, confirm rack animation loops with discrete snap-pause-snap indexing, freezes under OS 'reduce motion', no console errors/network requests (08-02-PLAN human-check)"
    expected: "Wells index discretely beneath the nozzle row in a smooth repeating loop; animation is static under prefers-reduced-motion; no console errors, no external requests"
    why_human: "Animation timing/visual behavior and browser devtools inspection"
  - test: "Serve landing page, confirm new card renders correctly in both EN and IT, no horizontal scroll at 1280px/375px (08-04-PLAN human-check)"
    expected: "Card appears in Tools grid with ⏱ icon, links to the tool, text switches correctly between EN/IT, no horizontal scrollbar"
    why_human: "Visual rendering and i18n toggle interaction"
---

# Phase 08: Dispense Choreography & Throughput Simulator Verification Report

**Phase Goal:** Ship a self-contained tool at `tools/dispense-throughput-simulator/` that schedules a 6-nozzle cocktail-pipeline indexing line (up to 6 liquids, 32-sample rack) at a chosen concurrency (1..N, A1 lockstep vs A2 independent endpoints) and reports total run time, a row-per-station Gantt with the bottleneck highlighted, and the A1-vs-A2 time-saved verdict — reproducing the pinned benchmark (serial 16.67 s/sample, pipelined ceiling 10 s, full totals 583.33 s @ K=1 vs 376.67 s @ K=4) to answer U5 empirically.
**Verified:** 2026-07-20
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | D-01/D-02: Cocktail-pipeline model; up to 6 liquids; line length N = liquid count; total-dose warning ≥2000 µL, outputs still shown | ✓ VERIFIED | `index.html:897-905` builds `liquids` array from `liquidCount` rows; `overDose = totalVolume >= 2000` (`:905`); `doseWarningEl` shown but outputs still rendered (`:939-948`) |
| 2 | D-03/D-04: Concurrency slider 1..N with A1/A2 endpoint markers; lockstep(A1)/independent(A2) mode toggle | ✓ VERIFIED | `concK` range wired with `max=liquidCount` (`:578,917`); `updateSliderEndpoints()` labels "1 = A1" / "N = A2" (`:554-559`); `#mode` select with `a1`/`a2` options (`:502-505`) |
| 3 | D-05/D-06: Stroke-quantized dose time, strict stop-and-go alternation | ✓ VERIFIED | `computeDoseTimes`: `Math.ceil(v/uLPerStroke)/strokesPerSec` (`:600-603`); cycle model adds `SAMPLE_SHIFT` per active cycle, no move/dispense overlap (`:641`) |
| 4 | D-07/D-08: Full wall-clock accounting (fill+steady+drain unified loop) + flat rack-change overhead; fixed constants 1s shift / 5s rack change / 4 racks / 32 samples | ✓ VERIFIED | `simulateSchedule` unified loop `totalCycles = M+N-1`, `i=c-j+1` active-station rule (`:622-653`); rack changes added once as `numRackChanges*rackChangeSec` (`:645`); constants declared at script scope (`:541-544`) and shown as read-only chips (`:561-570`) |
| 5 | Engine reproduces the pinned benchmark EXACTLY (serial 16.6667 s, ceiling 10 s, totals 583.33/376.67 s, delta 206.67 s, throughput 197.5/305.7 samples/hr) | ✓ VERIFIED | `engine-harness.cjs` extracts the shipped functions from `index.html` and asserts every value; both `core` and `metrics` modes ran and passed with exit code 0: `ENGINE CORE OK serial=16.6667 ceiling=10.00 K1=583.33 K4=376.67`; `ENGINE METRICS OK delta=206.67 spsK1=18.23 sphK4=305.8` |
| 6 | D-11: Four headline metric cards (total run time, bottleneck, A1-vs-A2 delta, throughput), delta computed from K=1/K=N slider endpoints independent of mode toggle | ✓ VERIFIED | `renderMetrics()` builds all four `.mc` cards (`:699-743`); delta re-runs `simulateSchedule` at `K=1` and `K=N` regardless of current `K`/`mode` (`:721-729`) |
| 7 | D-09/D-10: Row-per-station Gantt over a steady-state window, bottleneck row highlighted, no horizontal scroll at 1280px/375px | ✓ VERIFIED (code-level) / needs human for rendered layout | `renderGantt()` builds one `.row` per station (`:819-832`) using percentage `left/width` (`:822-824`); no `overflow-x:auto/scroll` and no fixed-px `min-width` anywhere in the file (grep confirmed); window is cycles `N..min(N+2,SAMPLES)` (`:793-794`) |
| 8 | D-12: Illustrative rack-indexing animation, decoupled from real timing, respects `prefers-reduced-motion`, no external library | ✓ VERIFIED | `buildRackSvg()` hand-built inline SVG (`:845-879`); `@keyframes indexStep`/`steps(8,end)` CSS animation (`:389-393`); `@media (prefers-reduced-motion: reduce)` disables it (`:394-396`); no `gsap` reference anywhere in the file |
| 9 | Degenerate inputs (RPM/rollers/µL-per-stroke = 0/blank) clamp instead of producing NaN/Infinity | ✓ VERIFIED | `recompute()` clamps `rollers≥1`, `uLPerStroke≥0.01`, `rpm≥1` with warning text (`:908-913`) and pushes into visible `#warnings` box (`:950-960`) |
| 10 | SPEC.md documents inputs, outputs, formulas, benchmark, and the D-07/rack-change/A1-A2 footnotes | ✓ VERIFIED | `tools/dispense-throughput-simulator/SPEC.md` (132 lines) contains full Inputs/Outputs/Derived-formulas/Known-values-benchmark/Assumptions-&-footnotes sections; benchmark numbers 16.6667/583.33/376.67/206.67 present verbatim; footnotes cover the `32+(N-1)` cycle reading, 3× rack-change convention, and A1/A2 fixed-K equality |
| 11 | Ship-chrome steps complete: landing-page card (EN+IT), README row, repo-root ROADMAP row, CLAUDE.md folder entry | ✓ VERIFIED | `index.html:666-673` new `.tool-card`; `card-title-dispense-sim`/`card-desc-dispense-sim` present in both `LANG.en` (`:776-777`) and `LANG.it` (`:830-831`); `README.md:20` new row; root `ROADMAP.md:19` new Shipped row; `CLAUDE.md:58-60` new folder-tree block |
| 12 | No debt markers (TBD/FIXME/XXX/TODO/HACK/PLACEHOLDER) left in shipped tool files | ✓ VERIFIED | `grep -iE "TBD|FIXME|XXX|TODO|HACK|PLACEHOLDER|not yet implemented|coming soon"` on `index.html` + `SPEC.md` returned no matches |
| 13 | Requirements coverage: D-01…D-12 all claimed and traceable across the 4 plans | ✓ VERIFIED | `requirements`/`requirements-completed` frontmatter across 08-01..08-04 PLAN/SUMMARY pairs collectively cover D-01 through D-12 with no gaps; no Phase-8 entries in `.planning/REQUIREMENTS.md` (matches the phase's declared "no formal REQ-IDs" status — not an orphan) |

**Score:** 13/13 truths verified at the code/automated level. Several of these truths also carry a planner-deferred **visual/interactive** confirmation step (see Human Verification Required) that cannot be settled by static analysis — per the decision tree, this routes the phase to `human_needed` rather than `passed`.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `tools/dispense-throughput-simulator/index.html` | Tool shell, input panel, scheduling engine, metrics/Gantt/animation renderers | ✓ VERIFIED | 982 lines; contains `computeDoseTimes`, `groupDispenseTime`, `simulateSchedule` as top-level functions (closing brace at column 0, harness-extractable); imports only `../../assets/style.css` |
| `tools/dispense-throughput-simulator/SPEC.md` | Canonical spec: inputs, outputs, formulas, constants, benchmark, assumptions | ✓ VERIFIED | 132 lines; matches shipped element IDs/defaults exactly (`vol0..vol5`, `rollers`, `uLPerStroke`, `rpm`, `concK`, `mode`) |
| `.planning/phases/08.../engine-harness.cjs` | Standalone Node harness proving benchmark fidelity from the actual shipped source | ✓ VERIFIED | Extracts real functions via regex from `tools/dispense-throughput-simulator/index.html` (not a hand-copied duplicate); both `core` and `metrics` modes pass, exit code 0 |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| Input `addEventListener('input'/'change')` handlers | `recompute()` | direct wiring | ✓ WIRED | `index.html:969-974` — every volume/rollers/uLPerStroke/rpm/concK/mode input calls `recompute()` |
| `recompute()` | `simulateSchedule()` | single-source-of-truth call | ✓ WIRED | `index.html:934` — `const result = simulateSchedule(doseTimes, liquidCount, SAMPLES, K, ...)`; stored to `window.__sim` |
| `renderMetrics()`/`renderGantt()`/`renderRackAnim()` | `window.__sim` | shared engine-output object | ✓ WIRED | `index.html:964-966` — all three render functions read the one `window.__sim` object populated by `recompute()`, no independent re-derivation |
| A1-vs-A2 delta card | `simulateSchedule(K=1)` / `simulateSchedule(K=N)` | endpoint re-run, independent of `mode`/current `K` | ✓ WIRED | `index.html:721-722` — re-runs at the two pinned endpoints regardless of the live slider position or mode-toggle value |

### Data-Flow Trace (Level 4)

Not applicable in the conventional sense (no backend/API/DB) — this is a pure client-side calculator. The "data source" is the scheduling engine itself; its correctness was traced independently against the pinned benchmark via `engine-harness.cjs`, which extracts and executes the actual shipped functions (not a re-implementation), confirming real computed values flow to every rendered output rather than static/hardcoded numbers.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Engine reproduces core benchmark (dose times, serial sum, ceiling, LPT, K=1/K=4 totals) | `node engine-harness.cjs core` | `ENGINE CORE OK serial=16.6667 ceiling=10.00 K1=583.33 K4=376.67`, exit 0 | ✓ PASS |
| Engine reproduces derived metrics (delta, throughput) | `node engine-harness.cjs metrics` | `ENGINE METRICS OK delta=206.67 spsK1=18.23 sphK4=305.8`, exit 0 | ✓ PASS |
| Gantt CSS avoids horizontal-scroll triggers | `grep -inE "overflow-x:\s*(auto|scroll)"` / `grep -inE "min-width:\s*[0-9]+px"` on `index.html` | no matches | ✓ PASS |
| No vendored/CDN animation library referenced | `grep -in gsap index.html` | no matches | ✓ PASS |
| Fill/steady/drain cycle formula is the unified `M+N-1` reading, not the over-counting `2*(N-1)` variant | `grep -inE "M \+ N - 1|totalCycles"` | `totalCycles = M + N - 1` present; no `2*(N-1)` present | ✓ PASS |

### Probe Execution

| Probe | Command | Result | Status |
|-------|---------|--------|--------|
| `engine-harness.cjs core` (declared in 08-01-PLAN.md verify block) | `bash -c 'node .../engine-harness.cjs core'` | exit 0, `ENGINE CORE OK ...` | PASS |
| `engine-harness.cjs metrics` (declared in 08-02-PLAN.md verify block) | `bash -c 'node .../engine-harness.cjs metrics'` | exit 0, `ENGINE METRICS OK ...` | PASS |

### Requirements Coverage

| Requirement | Source Plan(s) | Description | Status | Evidence |
|-------------|----------------|--------------|--------|----------|
| D-01 | 08-01, 08-02, 08-03, 08-04 | Cocktail pipeline model | ✓ SATISFIED | Unified cycle loop `i=c-j+1` (`index.html:636`) |
| D-02 | 08-01, 08-03 | Up to 6 liquids, N=liquid count, 2000 µL dose warning | ✓ SATISFIED | `liquidCount` rows + `overDose` check |
| D-03 | 08-01, 08-02, 08-04 | Concurrency slider 1..N, A1/A2 endpoint markers | ✓ SATISFIED | `concK` range + `updateSliderEndpoints()` |
| D-04 | 08-01, 08-02, 08-03 | Lockstep/independent mode toggle, honest equality at fixed K | ✓ SATISFIED | `#mode` select + `modeNote` teaching copy |
| D-05 | 08-01, 08-03 | Strict stop-and-go alternation | ✓ SATISFIED | `cycleTime = dispensePhase + shift`, no overlap |
| D-06 | 08-01, 08-03 | Stroke-quantized dose time | ✓ SATISFIED | `Math.ceil(v/uLPerStroke)/strokesPerSec` |
| D-07 | 08-01, 08-03 | Full wall-clock accounting (fill+steady+drain+rack changes) | ✓ SATISFIED | `totalCycles=M+N-1` + flat rack-change addend |
| D-08 | 08-01, 08-03 | Fixed constants 1s shift / 5s rack change | ✓ SATISFIED | `SAMPLE_SHIFT`/`RACK_CHANGE` script-scope constants + chips |
| D-09 | 08-02, 08-03 | Row-per-station Gantt, bottleneck highlighted | ✓ SATISFIED | `renderGantt()` `.row-bottleneck` class |
| D-10 | 08-02, 08-03 | Steady-state window, full totals reported numerically | ✓ SATISFIED | Window `cycles N..min(N+2,SAMPLES)` + metric cards show full totals |
| D-11 | 08-02, 08-03, 08-04 | Four headline metrics | ✓ SATISFIED | `renderMetrics()` four `.mc` cards |
| D-12 | 08-02, 08-03 | Illustrative decoupled rack animation, reduced-motion aware | ✓ SATISFIED | `buildRackSvg()` + `prefers-reduced-motion` |

No REQ-IDs from `.planning/REQUIREMENTS.md` map to Phase 8 — consistent with the phase's declared scope ("No formal REQ-IDs"). No orphaned requirements found.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `tools/dispense-throughput-simulator/index.html` | 549-552 | `setRangeFill` divides by `(max-min)` with no zero-denominator guard; produces `--fill: NaN%` when `liquidCount===1` (slider `min=max=1`) | ⚠️ Warning | Cosmetic: concurrency-slider fill track silently renders at the CSS gradient default instead of the correct position in the single-liquid edge case. Flagged in `08-REVIEW.md` (WR-01) and confirmed still present in the shipped file — not fixed since the review ran (review timestamp is after the last phase commit `d3e461f`) |
| `index.html` (landing page) | 463-472, 666-673 | `.tool-card--feature{grid-column:span 2}` plus a stale comment referring to a "merged 5-card Tools grid" — the grid now has 6 cards (3+3), so the feature span reintroduces the single-card orphan-row problem the comment says it was added to prevent | ⚠️ Warning | Cosmetic: likely produces a lone `dispense-throughput-simulator` card alone in its own row at typical desktop width (3-column `auto-fill` grid + one 2-span card = 7 track-units over 6 cards). Flagged in `08-REVIEW.md` (WR-02), confirmed still present, not fixed |
| `tools/dispense-throughput-simulator/index.html` | 797 | Secondary Gantt guard (`winStartIdx===-1`) blanks the panel (`innerHTML=''`) instead of showing the "Timeline unavailable" notice the primary guard uses — provably unreachable for N=1..6, so dead code, but inconsistent with the tool's own show-don't-hide precedent if it ever fired | ℹ️ Info | No observed runtime impact (unreachable branch) — cosmetic-code-quality note only (08-REVIEW.md IN-01) |
| `tools/dispense-throughput-simulator/index.html` | 908-909 | `rollers` read via `parseFloat` with no integer floor — a physically discrete roller count can be entered as a fraction (e.g. `4.5`) and silently flows into every dose-time calculation | ℹ️ Info | No crash; produces a physically meaningless but "valid-looking" result for a manually-typed fractional roller count (08-REVIEW.md IN-02) |

None of the four findings are blockers — all are warning/info severity per the code review, and none affect the benchmark reproduction, the core scheduling engine, or the D-01…D-12 decision coverage that the phase goal is built on. They are pre-existing, documented findings from `08-REVIEW.md` that were not subsequently fixed in a later commit (confirmed: no commits after `d3e461f`, the review's own timestamp postdates all four plan commits).

### Human Verification Required

Six items were deferred from `checkpoint:human-verify` to end-of-phase across the four PLAN files' `<human-check>` blocks (workflow #3309). None of these were independently re-executed by the executor (08-04-SUMMARY.md explicitly notes the visual pass was not re-run and recommends a `serve.bat` spot-check). They are harvested here rather than duplicated:

### 1. Tool shell renders with benchmark defaults, no horizontal scroll

**Test:** Serve with `.\serve.bat`, open `tools/dispense-throughput-simulator/index.html`.
**Expected:** Benchmark defaults prefilled (4 liquids 600/200/175/25 µL, rollers 4, µL/stroke 5, RPM 180); slider max equals liquid count; A1/A2 endpoint markers and the mode toggle are visible; no horizontal scroll at 1280px or 375px.
**Why human:** Rendered layout and responsive breakpoints cannot be confirmed from source alone.

### 2. Live slider drag and degenerate-input warning

**Test:** Drag the concurrency slider from K=1 to K=N while watching the total-time card; clear the RPM field.
**Expected:** Total run time updates live from ~583 s toward ~377 s; clearing RPM shows an inline warning, never NaN/blank.
**Why human:** Requires live DOM event interaction in a browser.

### 3. Four metric cards match the benchmark verdict, mode-toggle equality is visible

**Test:** At K=1, read all four metric cards; toggle mode A1↔A2 at an interior K (e.g. K=2); drag slider to K=N.
**Expected:** K=1 total ≈9m43s, bottleneck "600 µL to 10.0 s", delta "206.67 s saved (~35%)", throughput 18.23 s/sample / 197.5 samples/hr; toggling mode at fixed K leaves numbers unchanged with visible explanatory copy; delta card stays fixed when dragging the slider.
**Why human:** Rendered card content and toggle-interaction behavior.

### 4. Gantt renders correctly at both viewport widths with working tooltips

**Test:** Serve at 1280px and 375px; inspect the Gantt panel; hover over bars.
**Expected:** N station rows over the steady-state window, bottleneck (600 µL) row visibly highlighted, hover tooltips show station/liquid/dose/cycle, no horizontal scrollbar at either width.
**Why human:** Visual rendering, responsive layout, and pointer-hover interaction.

### 5. Rack animation loops correctly and respects reduced motion

**Test:** Watch the rack animation for several loop cycles; enable OS "reduce motion" and reload.
**Expected:** Wells index in a discrete snap-pause-snap pattern in a seamless loop; animation is static under reduced motion; no console errors, no network requests.
**Why human:** Animation timing/visual behavior and devtools inspection.

### 6. Landing-page card renders correctly in EN and IT

**Test:** Serve the landing page; toggle EN/IT; inspect the new card.
**Expected:** Card appears in the Tools grid with a unique ⏱ icon, links to the tool, text switches correctly between languages, no horizontal scroll at 1280px/375px.
**Why human:** Visual rendering and i18n toggle behavior (also intersects the WR-02 grid-layout warning above — worth confirming visually whether the card lands alone in an orphan row).

### Gaps Summary

No blocking gaps. All 13 derived observable truths (covering D-01 through D-12 plus faithful benchmark reproduction) are verified at the code and automated-probe level: the scheduling engine (`computeDoseTimes` → `groupDispenseTime` LPT → `simulateSchedule`) is a single top-level, harness-extractable source of truth that reproduces the pinned benchmark numbers exactly (16.6667 s serial, 10 s ceiling, 583.33 s / 376.67 s / 206.67 s totals, 197.5 / 305.7 samples/hr) when run against the actual shipped file — not a hand-verified duplicate. All four headline metrics, the row-per-station Gantt, and the illustrative rack animation read from that single engine object. SPEC.md documents the model faithfully, and all four standard ship-chrome steps (landing card EN+IT, README, root ROADMAP, CLAUDE.md) are complete.

The phase is withheld from `passed` status only because six visual/interactive checks explicitly deferred by the planner to end-of-phase (`<human-check>` blocks across all four PLAN.md files) have not been executed in a browser — this is a process requirement (workflow #3309), not evidence of a defect. Additionally, two pre-existing code-review warnings (WR-01 slider-fill NaN at N=1, WR-02 stale/orphan-risking grid-span rule) remain unfixed in the shipped code; both are cosmetic, non-blocking, and were already surfaced in `08-REVIEW.md` — included here for visibility, not as new findings.

---

*Verified: 2026-07-20*
*Verifier: Claude (gsd-verifier)*
