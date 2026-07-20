---
phase: 08-dispense-choreography-throughput-simulator-tool-interactive-
plan: 01
subsystem: ui
tags: [static-html, vanilla-js, scheduling-simulation, peristaltic-pump, discrete-event-simulation]

# Dependency graph
requires:
  - phase: none
    provides: n/a (greenfield tool folder)
provides:
  - "tools/dispense-throughput-simulator/index.html — page shell, input panel, and the benchmark-faithful scheduling engine"
  - "computeDoseTimes / groupDispenseTime / simulateSchedule top-level engine functions (single source of truth for Plan 08-02's cards/Gantt/animation)"
affects: [08-02, 08-03, 08-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Cycle-by-cycle discrete-event simulation loop (totalCycles = M + N - 1) instead of a closed-form formula"
    - "LPT (Longest-Processing-Time-first) grouping with stable original-index tiebreak for K-way concurrency partitioning"
    - "Single-source-of-truth breakdown function (simulateSchedule returns {cycles, totalRunTime, bottleneck, samplesPerHour}) mirroring system-architecture-explorer's pinsOf() precedent"
    - "Top-level engine functions with column-0 closing braces for external test-harness extraction (engine-harness.cjs)"

key-files:
  created:
    - tools/dispense-throughput-simulator/index.html
  modified: []

key-decisions:
  - "Adopted totalCycles = M + N - 1 (standard pipeline math), not the literal M + 2(N-1) reading of D-07's prose — RESEARCH-recommended, footnote deferred to SPEC.md in a later plan"
  - "Rack changes modelled as flat additive overhead (numRackChanges * RACK_CHANGE), not pipeline-interrupting"
  - "3 rack changes (RACKS - 1), not 4 — a changeover doesn't precede rack 1"
  - "LPT (sort descending, chunk into groups of <=K, sum group maxima) used for 1<K<N concurrency grouping"
  - "Mode toggle (a1/a2) wired and read into window.__sim but deliberately NOT applied as a numeric lockstep penalty at fixed K — matches RESEARCH's finding that both modes are numerically identical under global flow params; Plan 08-02 owns the teaching copy"
  - "Total-dose warning threshold is >= 2000 µL (D-02), rendered via a visible warn-box, outputs still computed (show-don't-hide)"

patterns-established:
  - "Engine functions declared at <script> top level, not nested in an IIFE/DOMContentLoaded, so a Node harness can regex-extract and unit-test them in isolation"

requirements-completed: [D-01, D-02, D-03, D-04, D-05, D-06, D-07, D-08]

# Metrics
duration: 12min
completed: 2026-07-20
---

# Phase 08 Plan 01: Dispense Choreography & Throughput Simulator — Engine Summary

**New tool page with a benchmark-exact discrete-event scheduling engine (computeDoseTimes → groupDispenseTime LPT → simulateSchedule) reproducing serial 16.6667 s, pipelined ceiling 10 s, and full totals 583.33 s (K=1) / 376.67 s (K=4).**

## Performance

- **Duration:** 12 min
- **Started:** 2026-07-20T12:06:35Z
- **Completed:** 2026-07-20T12:14:46Z
- **Tasks:** 2 completed
- **Files modified:** 1 (new)

## Accomplishments
- Built the page shell (nav, header, Configuration glass-panel) with a fully benchmark-prefilled input panel: 1–6 liquid-volume rows, global flow params, a concurrency slider with A1/A2 endpoint markers, a mode toggle, and read-only D-08 constant chips
- Implemented the three-function scheduling engine exactly as specified in RESEARCH.md, verified via the provided Node harness against every pinned benchmark number (serial, ceiling, LPT grouping, full totals, A1/A2 delta, throughput)
- Wired live recompute on every input with input clamping and D-02/degenerate-input warnings, following rotor-solver's "show, don't hide" precedent

## Task Commits

Each task was committed atomically:

1. **Task 1: Page shell + input panel + control CSS** - `2a761ae` (feat)
2. **Task 2: Scheduling engine + input validation (benchmark-faithful)** - `b161bf5` (feat)

**Plan metadata:** (pending — final docs commit below)

## Files Created/Modified
- `tools/dispense-throughput-simulator/index.html` - New tool page: shell, input panel, scheduling engine (`computeDoseTimes`, `groupDispenseTime`, `simulateSchedule`), `recompute()` wiring, empty `#metrics`/`#gantt`/`#rackAnim` containers for Plan 08-02

## Decisions Made
See `key-decisions` in frontmatter above. All decisions follow RESEARCH.md's recommendations directly (fill/steady/drain cycle count, rack-change convention, LPT grouping, mode-toggle numeric inertness) — no independent judgment calls beyond what RESEARCH already resolved.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Dedented engine functions so closing braces land at column 0**
- **Found during:** Task 2 verification (`node engine-harness.cjs core`)
- **Issue:** Initial draft indented `computeDoseTimes`/`groupDispenseTime`/`simulateSchedule` by 2 spaces to match the surrounding `<script>` block's style, so their closing `}` was also indented — the harness's `\n\}` regex requires the closing brace at column 0 and failed to extract the functions (`Engine function not found or not top-level`).
- **Fix:** Rewrote the three functions with the `function ...() {` line and its matching closing `}` at column 0 (internal body indentation unchanged), per the plan's explicit instruction and the harness's documented requirement.
- **Files modified:** tools/dispense-throughput-simulator/index.html
- **Verification:** `node engine-harness.cjs core` → `ENGINE CORE OK serial=16.6667 ceiling=10.00 K1=583.33 K4=376.67`; `node engine-harness.cjs metrics` → `ENGINE METRICS OK delta=206.67 spsK1=18.23 sphK4=305.8`
- **Committed in:** b161bf5 (Task 2 commit)

**2. [Rule 3 - Blocking] Reworded a code comment that accidentally matched the forbidden-formula grep guard**
- **Found during:** Task 2 verification (`CYCLE_FORMULA_OK` check)
- **Issue:** A comment reading "(NOT M + 2*(N-1))" — written to document the formula NOT used — literally contained the substring the verify script's negative grep checks for (`2\*\(N-1\)`), causing a false-positive failure of the guard meant to catch an actual wrong implementation.
- **Fix:** Reworded the comment to describe the over-count in prose ("the literal-additive fill+M+drain reading over-counts by N-1 cycles") without spelling out the literal formula.
- **Files modified:** tools/dispense-throughput-simulator/index.html
- **Verification:** Re-ran the grep guard — `CYCLE_FORMULA_OK` now passes; harness re-run confirms no regression.
- **Committed in:** b161bf5 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 3 — blocking issues preventing the automated verification from passing; no scope or behavior change, comment/formatting only)
**Impact on plan:** Zero functional impact — both fixes were mechanical (brace placement, comment wording) required to satisfy the plan's own verification tooling. No scope creep.

## Issues Encountered
None beyond the two auto-fixed items above.

## User Setup Required
None - no external service configuration required. Pure static client-side page.

## Next Phase Readiness
- The engine (`simulateSchedule`) is the single source of truth Plan 08-02 will read from for the four D-11 headline metric cards, the row-per-station Gantt, and the A1-vs-A2 delta — no second total-time computation needs to be introduced.
- `window.__sim` already exposes `{ liquids, rollers, uLPerStroke, rpm, K, mode, doseTimes, result, overDose, totalVolume }` for 08-02 to consume directly.
- `#metrics`, `#gantt`, `#rackAnim` containers exist and are currently plain/empty — 08-02 replaces the `#metrics` plain-text stopgap with the four `.mc` cards and builds the Gantt/animation into the other two.
- No blockers. `SPEC.md` for this tool has not been written yet — deferred to whichever plan finalizes the tool (per CLAUDE.md's tool-spec standard), consistent with the phase's own plan sequencing.

## Self-Check: PASSED

- FOUND: tools/dispense-throughput-simulator/index.html
- FOUND: commit 2a761ae (Task 1)
- FOUND: commit b161bf5 (Task 2)

---
*Phase: 08-dispense-choreography-throughput-simulator-tool-interactive-*
*Completed: 2026-07-20*
