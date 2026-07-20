# Dispense Choreography & Throughput Simulator — Tool Spec

**Tool:** Dispense Choreography & Throughput Simulator
**File:** `tools/dispense-throughput-simulator/index.html`
**Status:** Live

---

## Purpose

Configures a 6-nozzle linear indexing line dispensing a liquid cocktail into a 32-sample rack (8 samples × 4 racks), then sweeps concurrency `K` from fully serial (A1, `K=1`) to fully parallel (A2, `K=N`) so the run-time cost of each choice is visible directly, instead of argued from intuition. This is the empirical decider for **U5 (concurrency)** — the open question the System Architecture Explorer's cost/complexity matrix identifies but cannot answer on its own, because U5 is a scheduling/throughput question, not a BOM/pin-budget one. See `prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md` (the A1/A2/B/C multi-pump scaling study, §5 U5) and `tools/system-architecture-explorer/index.html` (the driver/MCU/bus variant matrix U5 feeds into).

---

## Inputs

| Input | ID | Type | Range | Default |
|-------|----|------|-------|---------|
| Liquid 1 volume | `vol0` | number | ≥ 0 µL | 600 µL |
| Liquid 2 volume | `vol1` | number | ≥ 0 µL | 200 µL |
| Liquid 3 volume | `vol2` | number | ≥ 0 µL | 175 µL |
| Liquid 4 volume | `vol3` | number | ≥ 0 µL | 25 µL |
| Liquid 5 volume | `vol4` | number | ≥ 0 µL | 100 µL (row hidden by default) |
| Liquid 6 volume | `vol5` | number | ≥ 0 µL | 100 µL (row hidden by default) |
| Liquid count (N, line length) | `addLiquidBtn` / `removeLiquidBtn` | button pair | 1–6 | 4 |
| Rollers | `rollers` | number | ≥ 1 (clamped) | 4 |
| µL / stroke | `uLPerStroke` | number | > 0 (clamped to ≥ 0.01) | 5 |
| Pump speed (shared) | `rpm` | number | ≥ 1 RPM (clamped) | 180 RPM |
| Per-pump speed | `rpm0`…`rpm5` | number | ≥ 1 RPM (clamped) | 180 RPM each |
| Concurrency K | `concK` | range | 1 … N (max tracks liquid count) | 1 |
| Control mode | `mode` | select | `a1` (lockstep / shared-bus) / `a2` (independent-rate) | `a1` |

**Quick-load presets:** three named benchmark loads, buttons in the config panel, ordered light → PANPOC → heavy: **Light dispensing** (100/25 µL), **PANPOC** (300/5/300/50 µL — the realistic point-of-care middle case), **Heavy dispensing** (1000/300/120/50/25/5 µL). A preset sets N + volumes and resets per-pump RPM to the shared speed; rollers/µL-stroke/mode are left as-is so the load is evaluated under the current system. The on-load default remains the original benchmark of record (600/200/175/25 µL), the verification anchor.

**Control-mode gating (D-04, revised):** In **A1 (lockstep)** every pump shares one rate — the `rpm0`…`rpm5` fields are disabled + dimmed and mirror the shared `rpm` value, and the engine receives a scalar rate (the benchmark of record). In **A2 (independent)** the per-pump `rpm0`…`rpm5` fields are editable and the shared `rpm` field is dimmed; the engine receives a per-pump rate array. Rollers and µL/stroke stay global in both modes.

**Fixed constants** (declared at script scope, not user-editable — displayed as read-only chips `chipSampleShift`/`chipRackChange`/`chipRacks`/`chipSamples`):

| Constant | Symbol | Value |
|----------|--------|-------|
| Sample-stage index-move time | `SAMPLE_SHIFT` | 1 s |
| Rack-change overhead per changeover | `RACK_CHANGE` | 5 s |
| Fixed rack count | `RACKS` | 4 |
| Fixed total samples (8/rack × 4 racks) | `SAMPLES` | 32 |

Total-dose warning threshold: total volume across all active liquid rows ≥ 2000 µL shows a visible warn-box (`doseWarning`) — outputs are still computed and shown ("show, don't hide" precedent, `tools/rotor-solver`).

---

## Derived constants & scheduling formulas

### Flow-rate derivation (per rotor-solver's flow-math precedent)

```
rate_i        = rpm_i in A2 (per-pump array) ; the shared rpm in A1 (scalar, all pumps equal)
strokesPerSec = (rate_i / 60) × rollers
doseTime_i    = ceil(V_i / uLPerStroke) / strokesPerSec        — stroke-quantized dose time per liquid/station
```

`computeDoseTimes(liquids, rollers, uLPerStroke, rpm)` accepts `rpm` as a **scalar** (A1 — one shared rate for every pump; reproduces the benchmark) or an **array** (A2 — each pump its own rate). Under A2 a faster pump finishes its dose sooner and, when it was the group's limiter at a given K, lowers the total — this is what makes A1 and A2 diverge at interior concurrency (they are identical only when all per-pump rates are equal).

### Concurrency grouping (LPT — Longest-Processing-Time-first)

For a set of `activeDoseTimes` and a concurrency `K`, sort descending (stable tiebreak on original input index to avoid flicker on ties), then chunk sequentially into groups of size ≤ K; each group's cost is its maximum member (the group cannot advance until its slowest member finishes):

```
sorted = activeDoseTimes sorted descending, ties broken by original index
groupDispenseTime = Σ over chunks of size K of max(chunk)
```

LPT minimizes total schedule time for this "partition into fixed-size groups, cost = sum of group maxima" structure — the two endpoints (`K=1`: sum of all dose times; `K=N`: max of all dose times) are unaffected by the grouping rule; only interior `1<K<N` values are shaped by it.

### Unified fill/steady/drain cycle model (D-01, D-05, D-07)

For `N` stations (liquid count) and `M=32` samples, one sample enters the line per cycle. A single unified loop produces the fill, steady, and drain phases as an emergent property — no separately-coded phases, no boundary double-counting:

```
totalCycles = SAMPLES + (N - 1)                    — i.e. 32 + (N-1), NOT 32 + 2*(N-1)
for cycle c = 1 .. totalCycles:
  for station j = 1 .. N:
    i = c - j + 1                                  — sample index occupying station j this cycle
    station j is active this cycle  ⟺  1 <= i <= SAMPLES
  activeTimes    = doseTime of every active station this cycle
  dispensePhase  = groupDispenseTime(activeTimes, K)   — 0 if no station active
  cycleTime      = dispensePhase + (SAMPLE_SHIFT if any station active else 0)
totalRunTime = Σ cycleTime over all cycles + numRackChanges × RACK_CHANGE
```

Rack changes are a **flat additive overhead** (`numRackChanges × RACK_CHANGE`) layered on top of the continuous pipeline total — they do not pause or interrupt the cycle loop. `numRackChanges = RACKS - 1 = 3` (see footnote below).

---

## Outputs

Four headline metric cards (D-11), all read from one `simulateSchedule()` return value (`{ cycles, totalRunTime, bottleneck, samplesPerHour }`) — no metric is independently re-derived:

1. **Total run time** — `result.totalRunTime` (fill + steady + drain + rack changes), shown as `m s` and raw seconds.
2. **Bottleneck station** — the station with `max(doseTime_i)`; reports its liquid volume, dose time, and station index.
3. **Serial vs parallel (time saved)** — `simulateSchedule` re-run at the two pinned slider **endpoints** `K=1` (serial) and `K=N` (full parallel) using the current dose times, independent of the live `K` slider position; reports the seconds saved and the percentage. Named "serial vs parallel" to avoid colliding with the A1/A2 control-mode toggle, which is a separate control.
4. **Throughput** — at the live `K`: `totalRunTime / SAMPLES` (s/sample) and `samplesPerHour = (SAMPLES / totalRunTime) × 3600`.

**Timeline (D-09/D-10):** a row-per-station HTML/CSS Gantt over an explicit steady-state window (cycles `N` through `min(N+2, SAMPLES)`), each station's per-cycle start/end offset computed by `stationOffsetsForCycle()` (mirrors `groupDispenseTime()`'s exact LPT sort/chunk rule). Bottleneck row/bars highlighted; hover tooltips show station, liquid, dose time, cycle. Fixed to a percentage-of-window layout (`width:100%`, no `min-width`, no horizontal-scroll wrapper) so the chart never triggers this site's no-horizontal-scroll rule.

**Rack animation (D-12):** an illustrative, hand-built inline SVG showing a rack of **8 sample tubes** (1.5 ml Eppendorf-style — the same tube idiom as the landing-page hero) indexing left under the **N fixed nozzles** (nozzle spacing = sample spacing). Each tube builds the cocktail **layer by layer** as it passes each nozzle — one stacked, per-liquid coloured band per station, band **height ∝ that liquid's dose volume** (floored at ~7 % of the cavity and renormalised so even a tiny dose like the heavy set's 5 µL stays a visible band); liquid 1 (first nozzle met) is the bottom layer. The animation **starts warm** — the nozzle bank begins already full (a fill staircase across the tubes under it), so every active nozzle dispenses together from the first round, matching the Gantt's steady-state view of N liquids at once (rather than a slow one-at-a-time fill ramp); the loop cycles over the full-bank window. It **respects the concurrency K**: only K pumps run at once, so at each index stop the nozzles fire in **waves of K** (longest dose first, mirroring the LPT grouping) — a drop appears only while a real tube is beneath that nozzle and drips in sync with its fill. Driven by a small JS stepper: the rack slide is a `requestAnimationFrame` tween of the group's `transform` attribute; each layer's "fill" is a CSS `.filled` `scaleY` transition (grows from its own base via `transform-box: fill-box`); waves are staggered with `setTimeout`. Illustrative (indexing + fill read), not a timing-accurate playback. Rebuilt only when `N` or the volumes change — `K` is read live so a concurrency change re-groups without restarting; `prefers-reduced-motion` renders a static representative frame.

---

**Benchmark comparison (added):** a dedicated section evaluating the three named benchmarks (Light / PANPOC / Heavy) at **1, 2, and 6 pumps in parallel**, using the current system settings (rollers, µL/stroke, and the shared pump speed) at a **fixed clock** — every pump at the same rate, independent of the A1/A2 toggle. A **batch-size selector** (1–4 racks = 8/16/24/32 samples; rack changes = racks−1) rescopes the whole comparison and is shown explicitly (e.g. "4 racks × 8 = 32 samples"). "6 pumps" clamps to a benchmark's liquid count where it has fewer (Light→2, PANPOC→4). Three KPIs per cell: **total run time**, **throughput** (samples/hr), and **% time saved vs serial** (the K=1 baseline). Rendered as grouped horizontal bars (bar length ∝ run time, on one shared scale, coloured per benchmark) plus an exact-number table beneath. Changing the system settings re-computes all three loads live, so the section shows how a given pump system copes across light/typical/heavy dispensing.

## Known values at the current design point (benchmark)

Rollers = 4, µL/stroke = 5 → 20 µL/rev; RPM = 180 → 60 µL/s; liquids = [600, 200, 175, 25] µL, N = 4.

| Quantity | Value |
|----------|-------|
| Dose times (per liquid) | [10, 3.3333, 2.9167, 0.4167] s |
| Serial sum (K=1) | **16.6667 s**/sample |
| Pipelined ceiling (K=N=4) | **10 s**/sample (600 µL bottleneck station) |
| Full total, K=1 (A1 endpoint) | **583.33 s** (9 min 43.3 s) |
| Full total, K=4 (A2 endpoint) | **376.67 s** (6 min 16.7 s) |
| A1-vs-A2 delta | **206.67 s** saved (≈35%) |
| Throughput, K=1 | 18.23 s/sample (197.5 samples/hr) |
| Throughput, K=4 | 11.77 s/sample (305.7 samples/hr) |

Interior concurrency values (dispense-phase only, before the +1 s index move, same benchmark inputs) follow a monotonic, diminishing-returns curve: K=1 → 16.6667 s, K=2 → 12.9167 s, K=3 → 10.4167 s, K=4 → 10.0000 s.

---

## Assumptions & footnotes

- **Fill/steady/drain cycle count reads as `32+(N-1)`, not the literal `32+2(N-1)`.** A literal three-term reading of "fill (N−1 lead-in cycles) + 32 sample cycles + drain (N−1)" over-counts by `N-1` cycles versus standard pipeline math. The tool implements the single unified loop (`i = c - j + 1`, active iff `1<=i<=32`), which produces exactly `32+(N-1)` total cycles as an emergent property, matching textbook pipeline theory. The two per-cycle benchmark numbers (16.6667 s serial, 10 s pipelined ceiling) are unaffected either way — only the full wall-clock totals depend on this reading.
- **Rack changes: 3× (not 4×) the 5 s overhead.** A rack change is the swap-out action between a finished rack and the next one; rack 1 is already loaded before the run starts, so there is no changeover preceding it. `numRackChanges = RACKS - 1 = 3`, giving 15 s total rack-change overhead in the full totals above.
- **Rack changes are flat additive overhead**, not pipeline-interrupting — they are added once to the total after the cycle loop completes, rather than pausing/resetting the simulation mid-stream. A pipeline-interrupting model would require a materially more complex per-rack partial-drain-then-refill simulation not clearly implied by the source decision text.
- **Rollers and µL/stroke are global** across every station/liquid. **Pump speed (RPM) is global in A1 and per-pump in A2** — the A2 case is the per-liquid rate override that answers U5 (does the architecture need independent per-motor rates).
- **A1 (lockstep) and A2 (independent-rate) diverge via per-pump rates.** In A1 every pump shares one rate, so a group of K pumps stepping together always finishes with its slowest member (`max(doseTime)` in the group) — identical to the original single-rate model and the benchmark of record. In A2 each pump runs its own rate: a pump that finishes early no longer limits its group, so the total drops at interior K (e.g. speeding only the 600 µL bottleneck pump to 360 RPM cuts its 10 s dose to 5 s and the K=1 total from 583 s to 423 s). The two modes coincide **only** when every per-pump rate equals the shared rate — which is why the default (all pumps 180 RPM) reproduces the benchmark under either mode. The "serial vs parallel" headline delta is independent of this toggle: it always compares the concurrency slider's two endpoints (K=1 vs K=N) at the current dose times.

---

## Cross-links

- `prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md` — the A1/A2/B/C multi-pump scaling study (§5 U5) this tool empirically answers.
- `tools/system-architecture-explorer/index.html` — the driver/MCU/bus cost/complexity variant matrix U5 feeds into; that tool's `pinsOf()`/`periphOf()` single-source-of-truth breakdown-function pattern is mirrored here by `simulateSchedule()`.
