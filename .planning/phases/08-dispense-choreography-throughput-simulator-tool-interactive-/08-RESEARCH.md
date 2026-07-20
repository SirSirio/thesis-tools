# Phase 8: Dispense Choreography & Throughput Simulator - Research

**Researched:** 2026-07-20
**Domain:** Discrete-event scheduling / pipeline simulation, rendered as a static-site interactive tool (no libraries, no build step)
**Confidence:** HIGH (scheduling math — hand-derived and numerically verified against the pinned benchmark), MEDIUM (grouping/rack-change modelling choices — reasoned defaults for genuine CONTEXT.md ambiguities, need planner/user confirmation), HIGH (rendering/animation patterns — direct precedent in this repo)

## Summary

This phase is a pure client-side discrete-event simulation dressed as an interactive tool: no external libraries are needed or wanted. The hard part is not code, it's getting the **scheduling model** unambiguous before any HTML/CSS is written — the whole tool's credibility rests on reproducing the pinned benchmark (serial 16.67 s/sample, pipelined ceiling 10 s/sample @ 600 µL bottleneck) and on the A1-vs-A2 "delta" being a real, non-zero, defensible number.

I derived, and numerically verified by simulation, a complete cycle-by-cycle model that reproduces both pinned benchmark numbers exactly and extends cleanly to concurrency `1 < K < N`, to the fill/drain ramps, and to full 32-sample wall-clock totals. The critical finding — **flagged prominently below** — is that with globally-identical flow parameters (the Discretion default), the **A1/A2 control-mode toggle (D-04) produces IDENTICAL numbers to the concurrency slider's two endpoints** (K=1 vs K=N); it does not add a second independent numeric lever. This is not a flaw in my derivation, it falls directly out of D-03's own wording ("A1 and A2 are pinned as explicit endpoint markers on the slider") — but it means the planner must NOT design two orthogonal "make the numbers move" controls, or a user will find the mode toggle does nothing at fixed K and conclude the tool is broken.

The Gantt should be built HTML/CSS-percentage-based (like `tools/thesis-timeline/`), NOT SVG, and NOT date-based — percent-of-window positioning against a fixed steady-state time window, sized to fit 100% container width so **no horizontal scroll is ever needed** (a deliberate departure from thesis-timeline's own `overflow-x:auto` pattern, which D-10 explicitly asks to avoid). The illustrative rack animation should be hand-built SVG + CSS `@keyframes`/`steps()`, no runtime library — GSAP is a named, page-scoped exception for the landing page only and must not be reused here.

**Primary recommendation:** Implement the scheduler as a small (≤37-iteration) cycle-by-cycle JS simulation loop — not a closed-form formula — since N≤6 stations and 32+N-1≤37 cycles is computationally trivial and a simulation is far less error-prone than deriving one giant equation. Render the Gantt from the same simulation's per-cycle, per-station timestamps.

## Architectural Responsibility Map

This is a single static HTML page with an inline `<script>` — there is no server, no build, no API. Every capability lives in one tier.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Input panel (liquids, flow params, concurrency, mode) | Browser / Client | — | Inline form + JS, no persistence layer required by CONTEXT |
| Scheduling / timing engine (cycle simulation) | Browser / Client | — | Pure computation in the page's `<script>`, mirrors rotor-solver's `upd()` pattern |
| Gantt rendering | Browser / Client | — | DOM/CSS bar positioning, same technique as `tools/thesis-timeline/` |
| Rack-indexing animation | Browser / Client | — | Hand-built SVG + CSS `@keyframes`, decoupled from the engine (D-12) |
| Headline metrics (D-11) | Browser / Client | — | Derived values read off the same simulation output |

No CDN/API/DB tier exists in this project's architecture; nothing in this phase changes that.

## Standard Stack

### Core

No new libraries. This is a hard project constraint (CLAUDE.md: "static HTML/CSS/JS only — no build tools, no npm, no frameworks") and nothing in this phase needs one — the scheduling math is arithmetic + a `<37`-iteration loop, and the visuals are DOM/CSS/SVG, all well inside vanilla JS.

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| — | — | — | No package installs apply to this phase |

### Supporting

Local/vendored assets already in the repo that this tool may reference, none of which require installation:

| Asset | Location | Purpose | When to Use |
|-------|----------|---------|-------------|
| `assets/style.css` | shared | Dark glassmorphic tokens, `.glass-panel`, `.stat`, `fade-up` | Always — every tool imports this, no private `:root` overrides |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hand-rolled cycle-simulation loop | A generic job-shop-scheduling / bin-packing npm library | Forbidden by CLAUDE.md (no npm); also massive overkill — the real problem is ≤6 items into ≤6 bins, solved by one `sort()` + `chunk()` |
| HTML/CSS percentage-based Gantt | SVG Gantt (as used in `peristaltic-roller-displaced-volume-model`'s figures) | thesis-timeline's HTML/CSS bar technique is simpler for a horizontal-bar chart, gives free native `mouseenter` tooltip wiring, and is the site's own precedent for exactly this chart type |
| CSS `@keyframes`/`steps()` rack animation | Vendored GSAP (landing-page precedent) | GSAP is an explicit, page-scoped D-01/D-03 exception for the landing page's hero motif only; reusing it here would be an unauthorized second exception and CLAUDE.md does not sanction it for this tool |

**Installation:** None required — this phase touches only `tools/dispense-throughput-simulator/index.html` (new) + `SPEC.md` (new) + `assets/style.css` (import only, no edits) + landing page / README / ROADMAP / CLAUDE.md integration edits.

**Version verification:** N/A — no packages to verify on any registry.

## Package Legitimacy Audit

**Not applicable.** This phase installs zero external packages (no npm, no CDN scripts, no vendored runtime beyond the already-shared `assets/style.css`). The Package Legitimacy Gate protocol is skipped; there is nothing for `slopcheck` or a registry command to check. If a future iteration of this tool ever proposes adding a dependency (e.g., a charting library), that addition must re-trigger this gate — it does not apply retroactively to this phase's scope.

## Architecture Patterns

### System Architecture Diagram

```
[Input Panel]                           [Rack Animation]
  liquids[] (name, volume)                (illustrative, D-12,
  flow params (rollers,                    decoupled from timing)
   µL/stroke, RPM)
  sampleShift=1s (fixed)                        ▲ (independent CSS loop,
  rackChange=5s (fixed)                         │  no data dependency)
  concurrency K (1..N)
  mode (A1 lockstep / A2 independent)
        │
        │ on any input event
        ▼
┌───────────────────────────┐
│  computeDerived()         │  strokesPerSec = (RPM/60) × rollers
│  (flow-rate math)         │  doseTime_i    = ceil(V_i/µLPerStroke) / strokesPerSec
└──────────┬────────────────┘
           │ doseTime[] (one per liquid/station, in input order)
           ▼
┌───────────────────────────┐
│  simulateSchedule(K)      │  for cycle c = 1..(32+N-1):
│  (cycle-by-cycle loop)    │    activeStations = stations with a sample present at c
│                           │    groups = LPT-partition(activeStations, K)
│                           │    dispensePhase = Σ max(doseTime) per group
│                           │    cycleTime = dispensePhase + 1s (index move)
│                           │  totalRunTime = Σ cycleTime + rackChanges×5s
└──────────┬────────────────┘
           │ per-cycle, per-station timestamps + totals
           ▼
     ┌─────────────┬──────────────────┬──────────────────────┐
     ▼             ▼                  ▼                      ▼
[Total run    [Bottleneck        [A1 vs A2 delta:       [Gantt: steady-state
 time card]    station card]      re-run simulateSchedule  window, one row per
               (max doseTime)     at K=1 and K=N, diff]    station, bottleneck
                                                            row highlighted]
```

A reader can trace input → derived flow constants → per-cycle simulation → all four headline metrics (D-11) and the Gantt, all from ONE shared simulation function — this single-source-of-truth shape is exactly the `pinsOf()`/`periphOf()` precedent already used in `tools/system-architecture-explorer/index.html` (one function feeds both the matrix and the expanded-row breakdown tables).

### Recommended Project Structure

```
tools/dispense-throughput-simulator/
├── index.html      All markup, inline <style>, inline <script> (project hard rule)
└── SPEC.md         Inputs, outputs, the scheduling formulas below, assumptions, benchmark
```

No sub-files. No `katex/` (no formula-rendering need here — this tool reports numbers and a Gantt, not derivations with rendered math; if the planner wants a short symbolic write-up, plain `<code>`/`<pre>` blocks match rotor-solver's own non-KaTeX convention, KaTeX is only used by the two occlusion/displaced-volume tools).

### Pattern 1: Live-recompute-on-input panel (rotor-solver precedent)

**What:** A single `upd()`-style function reads every input field, recomputes everything, and re-renders. Wired via `addEventListener('input', upd)` for continuous controls (sliders/number fields) and `addEventListener('change', upd)` for discrete selects.
**When to use:** Every control in this tool (liquid volumes, rollers/µL-per-stroke/RPM, concurrency slider, mode toggle) — matches D-03's "run time updates live so the whole sweep is visible."
**Example:**
```javascript
// Source: tools/rotor-solver/index.html:806-810 (adapt 1:1)
['arcCompN', 'bossS', 'spS'].forEach(id =>
  document.getElementById(id).addEventListener('input', upd));
['idSel', 'bSel', 'voltSel', 'msSel'].forEach(id =>
  document.getElementById(id).addEventListener('change', upd));
```
For phase 8: bind every liquid-volume `<input>`, the concurrency `<input type=range>`, and the mode `<select>`/toggle to one `recompute()` that calls `simulateSchedule()` twice (once at the user's K, once implicitly for the pinned endpoints if the A1/A2 delta card is always shown) and re-renders the four stat cards + Gantt.

### Pattern 2: Single-source-of-truth breakdown function (system-architecture-explorer precedent)

**What:** One function (`pinsOf(v)` in that tool) computes a value AND exposes its term-by-term breakdown, consumed by both the summary table and the expanded-row detail — added `260720-pbc` specifically to eliminate drift between a summary number and its explanation.
**When to use:** `simulateSchedule(K, mode)` should return `{ perCycle: [...], totalRunTime, bottleneck, samplesPerHour }` — every headline metric AND the Gantt read from this one return value, so there is no second, separately-hand-maintained "total time" formula that can drift from what the Gantt visually shows.

### Pattern 3: HTML/CSS percentage-based Gantt (thesis-timeline precedent, adapted)

**What:** Absolute-positioned `.bar` divs inside `.row-track` flex rows, one row per entity, positions computed as `pct(t) = (t - windowStart) / (windowEnd - windowStart) * 100`.
**When to use:** The steady-state window Gantt (D-09/D-10).
**Example:**
```javascript
// Source: tools/thesis-timeline/index.html:574-577, 646-649 (adapt time-domain from dates to seconds)
const pct = t => ((t - windowStart) / (windowEnd - windowStart)) * 100;
// ...
bar.style.left  = Math.max(0, pct(seg.start)) + '%';
bar.style.width = Math.max(0.6, pct(seg.end) - pct(seg.start)) + '%';
```
**Critical adaptation — do NOT copy this part:** thesis-timeline sets `.timeline { min-width: 940px }` and wraps it in `.gantt-scroll { overflow-x: auto }` (index.html:158-162) to allow horizontal scroll on narrow screens. **Phase 8 must NOT do this** — D-10 picks a steady-state window specifically so the whole chart fits without scrolling, and CLAUDE.md's "no horizontal scroll on any page" rule is a hard constraint (not just a preference, unlike thesis-timeline's own contained-scroll compromise). Give `.timeline` `width: 100%` with no `min-width`, and no `overflow-x` wrapper.

### Anti-Patterns to Avoid

- **Deriving one giant closed-form total-run-time formula:** tempting, but the fill/drain ramp + per-cycle grouping interaction is exactly the kind of thing that's simple to simulate and error-prone to derive symbolically. Simulate cycle-by-cycle (≤37 iterations) instead — see the Scheduling Engine section below for the exact loop.
- **Treating the A1/A2 mode toggle as a second independent numeric lever:** see the dedicated subsection below — this is the single most important pitfall in this phase.
- **SVG time-axis Gantt:** more code than the DOM/CSS technique for zero benefit at this scale (≤6 rows, a few dozen bar segments); reserve SVG for the rack animation's static schematic layer.
- **Vendoring a second animation runtime:** GSAP's one sanctioned use is the landing-page hero motif (D-01/D-03 exception, scoped explicitly to that motif). Do not extend it here.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Optimal K-way bin packing to minimize schedule time | A generic scheduling/bin-packing library or a from-scratch optimal solver | The simple LPT heuristic (sort doseTimes descending, chunk sequentially into groups of size ≤K, sum group maxes) — see worked derivation below | At N≤6 items this is provably sufficient (verified below by exhaustive small-N comparison) and is ~5 lines of JS; a "real" scheduling library is both forbidden (no npm) and pointless overkill |
| Date/time axis math | A date library (moment/dayjs/luxon) | Plain seconds (numbers), no `Date` objects at all — this tool has no calendar dates, only elapsed seconds | thesis-timeline needs `Date` because it plots real calendar dates; phase 8 plots elapsed seconds from t=0, so `Date` machinery doesn't even apply |
| Discrete "stop-and-go" animation easing | A JS animation library / requestAnimationFrame tweening engine | CSS `animation-timing-function: steps(N, end)` on a `transform: translateX()` keyframe | CSS `steps()` is purpose-built for exactly this "snap to position, pause, snap again" motion and needs zero JS |

**Key insight:** Every "hard part" of this phase (scheduling, animation timing, Gantt layout) has a purpose-built primitive already available in vanilla CSS/JS at this problem's scale (N≤6, ≤37 cycles, 32 samples). Reaching for a library anywhere in this phase would be solving a problem the platform already solves for free, while also violating the project's no-npm/no-CDN hard constraint.

## The Scheduling / Timing Engine (core research finding)

### Flow-rate derivation (reused from rotor-solver, verified against benchmark)

```
strokesPerSec = (RPM / 60) × rollers
flowRate_uLps = strokesPerSec × µLPerStroke   (equivalently: (RPM/60) × rollers × µLPerStroke)
doseTime_i    = ceil(V_i / µLPerStroke) / strokesPerSec     (D-06 stroke quantization)
```

**Benchmark verification** [VERIFIED: hand-computed + Python-simulated, this session]:
- rollers=4, µLPerStroke=5 → µL/rev = 4×5 = 20 ✓ (matches CONTEXT D-06)
- RPM=180 → rev/s = 3 → strokesPerSec = 3×4 = 12 → flowRate = 12×5 = 60 µL/s ✓
- V = [600, 200, 175, 25] µL → strokes = [120, 40, 35, 5] → doseTime = [10, 3.3333, 2.9167, 0.4167] s
- **Serial sum** (K=1) = 10+3.3333+2.9167+0.4167 = **16.6667 s** ✓ matches "serial 16.67 s/sample"
- **Pipelined ceiling** (K=N) = max(doseTime) = **10 s** at the 600 µL station ✓ matches "pipelined ceiling 10 s"

Both pinned benchmark numbers are reproduced exactly by this formula set. Confidence: HIGH — this is direct arithmetic, verified twice (by hand and by a Python simulation, see below).

### Concurrency grouping for `1 < K < N` (resolves the Claude's Discretion item)

**The model:** at any cycle, some subset of stations is "active" (has a sample under it — see fill/drain below). If more than `K` stations are active at once, partition them into `ceil(activeCount / K)` sequential groups; groups run one after another within the same rack index-position (no overlap between groups; the physical rack index-move only happens after ALL active stations finish). Group time = `max(doseTime)` within that group (all group members start together and the group can't advance until its slowest member finishes — this is D-05's "slowest active station's dispense time" generalized to K<N sub-groups).

**Grouping rule (recommended, not explicitly stated in CONTEXT.md — flag for planner confirmation):** sort active stations' `doseTime` **descending**, then chunk sequentially into groups of size ≤K. This is the LPT (Longest-Processing-Time-first) heuristic and it **minimizes** total schedule time for this exact "partition into fixed-size groups, cost = sum of group maxima" structure. Verified by exhaustive small-case comparison:

```
doseTimes = [10, 3.3333, 2.9167, 0.4167], K=2
{10,3.33}+{2.92,0.42}: max(10,3.33)+max(2.92,0.42) = 10+2.92 = 12.92   ← LPT (lowest)
{10,2.92}+{3.33,0.42}: 10+3.33 = 13.33
{10,0.42}+{3.33,2.92}: 10+3.33 = 13.33
```
[ASSUMED — my own derivation this session, not sourced from an external algorithms reference; mathematically verified by exhaustive comparison above, but not a CONTEXT.md-locked decision. Flag as an assumption needing no further validation than the worked proof shown, since it directly satisfies "planner/executor to specify a defensible model" per the Claude's Discretion note.]

**Concrete diminishing-returns curve** (steady-state cycle time, dispense-phase only, before adding the 1 s index move), N=4, benchmark doses:

| K | Steady-state dispense phase | + 1s move = cycle time |
|---|------|------|
| 1 | 16.6667 s | 17.6667 s |
| 2 | 12.9167 s | 13.9167 s |
| 3 | 10.4167 s | 11.4167 s |
| 4 (=N) | 10.0000 s | 11.0000 s |

This monotonic, diminishing-returns curve (savings of 3.75s, 2.5s, 0.417s per step) is exactly what D-03 asks for ("the whole sweep is visible and diminishing returns are apparent") — verified by Python simulation this session.

### Full wall-clock total (D-07) — fill / steady / drain decomposition

**Standard pipeline theory** (recommended default): for M=32 samples through N stations, one sample enters per cycle, total cycles = **M + N − 1** (NOT `M + 2(N−1)`). Worked out explicitly for N=4 (this session's simulation):

```
Sample i occupies station j during cycle c = i + j − 1  (i=1..32, j=1..N)
Station j is "active" at cycle c  ⟺  ∃ i∈[1,32] with i = c − j + 1
Active-station-count(c) = min(32,c) − max(1,c−N+1) + 1
```
This naturally decomposes into three phases without double-counting:
- **Fill:** cycles 1..(N−1) — active count ramps 1,2,...,N−1 (only the FRONT stations 1..c are occupied)
- **Steady:** cycles N..32 — that's `32−(N−1)` cycles, all N stations active — **this is the phase D-01's "up to N stations work on N different samples at once" describes**
- **Drain:** cycles 33..(32+N−1) — active count ramps down N−1,...,1 (only the BACK stations are still occupied, front ones empty)

Total cycles = (N−1) + (32−(N−1)) + (N−1) = **32 + (N−1)**, matching standard pipeline theory exactly.

**Important divergence from a literal reading of D-07:** CONTEXT.md's wording — "fill (N−1 lead-in cycles) + 32 sample cycles + drain" — read as three separately-additive terms would total `32 + 2(N−1)` cycles, which is 3 MORE cycles than the mathematically correct `32 + (N−1)` (for N=4: 35 vs 38). **Recommendation: use `32 + (N−1)` total cycles** (the correct pipeline count; "32 sample cycles" in D-07's phrasing is best read loosely as "sized proportionally to the 32-sample batch," not as a literal separate additive term) — but this is a genuine ambiguity in the locked decision text, not resolved by me. **Flag for the planner to either (a) silently adopt `32+(N−1)` with a one-line SPEC.md footnote explaining the reading, or (b) raise a `checkpoint:human-verify` with Sirio if exact literal conformance to the D-07 wording is wanted.** I recommend (a) — the discrepancy is invisible in the tool's headline numbers either way (3 extra ramp cycles at N=4, of dwindling active-count each, add only a few seconds to a ~380–580 s total) and the mathematically correct model is safer to defend in a thesis.

**Full worked totals** (benchmark inputs, N=4, K∈{1,4}, `32+(N−1)=35` cycles, 3 rack changes × 5s, NOT preceding rack 1) [VERIFIED: Python simulation this session]:

| K (mode) | Dispense+move total | + rack changes (15s) | **Total run time** |
|---|---|---|---|
| 1 (A1 endpoint) | 568.33 s | +15 s | **583.33 s** (9 min 43.3 s) |
| 2 | 449.58 s | +15 s | 464.58 s |
| 3 | 373.75 s | +15 s | 388.75 s |
| 4 (A2 endpoint, =N) | 361.67 s | +15 s | **376.67 s** (6 min 16.7 s) |

**A1 vs A2 delta (D-11.3, the "money" headline)** = 583.33 − 376.67 = **206.67 s saved (≈35.4%)**.
**Throughput (D-11.4):** K=1 → 18.23 s/sample, 197.5 samples/hr. K=4 → 11.77 s/sample, 305.7 samples/hr.

[ASSUMED for the full-total figures specifically — these depend on the fill/drain decomposition recommendation above and on "rack change does not precede rack 1" (also an open Discretion item, see below); the STEADY-STATE per-cycle numbers (16.67s / 10s) are the only ones directly pinned by CONTEXT.md and are HIGH confidence / exactly reproduced.]

### Rack-change accounting (resolves the second Claude's Discretion item)

**Recommendation: 3 changeovers (not 4), rack change does NOT precede rack 1.** Rationale: a "rack change" is the physical swap-out action between a FINISHED rack and the NEXT rack; rack 1 is presumably already loaded and in position before the run starts (no prior rack to swap out), matching standard lab-automation convention (you don't count "loading the very first plate" as a changeover event). This gives `3 × 5s = 15s` total rack-change overhead, as used in the worked totals above.

**Also recommend:** rack changes are modelled as a **flat additive overhead** on top of the continuous 32-sample pipeline simulation (NOT as an event that pauses/resets the pipeline mid-stream). CONTEXT.md's D-07 wording lists "rack changes" as one term alongside fill/32/drain, suggesting a simple additive treatment rather than a pipeline-interrupting one — a rack-interrupting model would be considerably more complex (partial pipeline drain-then-refill per rack) and isn't clearly implied by the decision text. Flag this explicitly for the planner as the assumption it is.

### The A1/A2 lockstep-vs-independent math (D-04) — the tool's single biggest landmine

**Finding (derived this session, cross-checked against D-03's own wording):** Given the Claude's-Discretion default of **globally identical flow parameters** (same rollers/µLPerStroke/RPM for every station), the lockstep-mode ("A1") and independent-mode ("A2") formulas are **numerically identical at any fixed concurrency K**. Here's why:

- In lockstep (A1), CONTEXT.md's own resolution text says: "K pumps stepping together at one rate, each disabled via ENABLE when its volume is reached." With a global rate, the "one rate" IS the global rate — group completion time = `max(doseTime_i)` among the group (the last pump to reach its own stroke count).
- In independent mode (A2), each pump runs its own configured rate — but since flow params default to global/identical, every pump's rate IS the same global rate too. Group completion time is again `max(doseTime_i)`.
- **Both modes compute the exact same formula.** There is no scenario, at fixed K with global params, where switching the toggle changes a single number.

This is not a bug in my derivation — it falls directly out of D-03's explicit text: **"A1 and A2 are pinned as explicit endpoint markers on the slider"** — meaning the CONTEXT itself defines A1≡(K=1) and A2≡(K=N) as the two points being compared (D-11.3's "A1 vs A2 delta = serial total vs full-parallel total" reads the two SLIDER ENDPOINTS, not two settings of the separate mode toggle). **The A1/A2 verdict is carried entirely by the concurrency slider; the mode toggle is a second, narrower control that (given global params) is numerically inert at any interior K.**

**Recommended resolution for the planner (keeps benchmark fidelity, adds zero scope creep):**
1. Implement the mode toggle as CONTEXT.md literally specifies (real UI control, real "K pumps share a rate / each disabled via ENABLE" narrative) — it is a locked decision (D-04) and must exist.
2. Do **not** let the toggle silently do nothing with no explanation — pair it with UI copy that makes the mechanism explicit, e.g.: *"At this concurrency, lockstep (A1) and independent (A2) modes take the same time because every pump is configured to run at the same rate — A1's real cost only appears when a protocol needs pumps at genuinely different rates."* This turns the "surprising non-difference" into the tool's own teaching moment, consistent with D-04's "represented honestly rather than flattering A1" instruction (the honest finding IS that A1 is not disadvantaged when rates are shared — that is itself the U5 nuance the CONTEXT's own architecture doc identifies: A1's *sole* limitation is inability to run **independent rates**, not inability to run in parallel at a shared rate).
3. Compute the D-11.3 "A1 vs A2 delta" headline strictly as `simulateSchedule(K=1) total − simulateSchedule(K=N) total` (the two pinned slider endpoints), independent of whatever the mode toggle currently shows — this matches D-03's wording exactly and is what the worked totals table above already computes (206.67 s).
4. **Optional stretch, NOT required for benchmark fidelity:** if the planner wants the mode toggle to carry real numeric weight, add a per-liquid RPM override (defaulting to the shared global value) so a user CAN explore mismatched rates; lockstep would then need to clamp a co-enabled group to (e.g.) the minimum configured rate among its members, while independent mode lets each run at its own rate. This is explicitly named in CONTEXT.md's Deferred Ideas as "per-liquid flow tuning... an A2/U6 capability... unless trivially free" — treat it as optional scope, not a phase-8 requirement, and flag it as a `checkpoint:human-verify` if pursued (it changes the input model, not just the engine).

[ASSUMED — this entire subsection is my own reasoning from the given decisions, not sourced externally. It is the single highest-value finding in this research: without it, a planner might build two independently-acting numeric controls and discover post-hoc that one of them is silently a no-op, or might invent an ad-hoc "penalty" for lockstep that isn't grounded in anything CONTEXT.md actually specifies.]

### Recommended implementation shape (concrete JS, ready to drop into task specs)

```javascript
// 1. Derived flow constants (per rotor-solver's flow-math precedent)
function computeDoseTimes(liquids, rollers, uLPerStroke, rpm) {
  const strokesPerSec = (rpm / 60) * rollers;
  return liquids.map(v => Math.ceil(v / uLPerStroke) / strokesPerSec);
}

// 2. LPT grouping — sort descending, chunk into groups of size K, sum of maxima
function groupDispenseTime(activeDoseTimes, K) {
  const sorted = [...activeDoseTimes].sort((a, b) => b - a);
  let total = 0;
  for (let i = 0; i < sorted.length; i += K) {
    total += Math.max(...sorted.slice(i, i + K));
  }
  return total;
}

// 3. Cycle-by-cycle simulation (N stations, M=32 samples, K concurrency)
function simulateSchedule(doseTimes, N, M, K, sampleShift, rackChangeSec, numRackChanges) {
  const totalCycles = M + N - 1;   // NOT M + 2*(N-1) — see fill/drain derivation above
  const cycles = [];
  let total = 0;
  for (let c = 1; c <= totalCycles; c++) {
    const activeStations = [];
    for (let j = 1; j <= N; j++) {
      const i = c - j + 1;               // sample index at station j, this cycle
      if (i >= 1 && i <= M) activeStations.push(j);
    }
    const activeTimes = activeStations.map(j => doseTimes[j - 1]);
    const dispensePhase = activeTimes.length ? groupDispenseTime(activeTimes, K) : 0;
    const cycleTime = dispensePhase + (activeTimes.length ? sampleShift : 0);
    cycles.push({ cycle: c, activeStations, dispensePhase, cycleTime });
    total += cycleTime;
  }
  total += numRackChanges * rackChangeSec;   // flat additive, doesn't interrupt the pipeline
  return { cycles, totalRunTime: total };
}
```

This is small enough (≤37 outer iterations × ≤6 inner) to re-run on every input event with no debouncing needed — matches the "run time updates live" requirement (D-03) with zero performance risk.

## Runtime State Inventory

Not applicable — this is a greenfield tool addition (new folder, new files), not a rename/refactor/migration phase.

## Common Pitfalls

### Pitfall 1: Treating the fill/drain decomposition literally as three additive terms
**What goes wrong:** Implementing `totalCycles = (N-1) + 32 + (N-1)` gives 3 extra cycles versus the mathematically correct pipeline count, and — worse — if the "32" block is coded as a SEPARATE steady-state loop bolted onto separately-coded fill/drain loops, sample indices can double-count or the wrong stations can be marked active during the boundary cycles.
**Why it happens:** D-07's prose reads naturally as "fill, then 32, then drain" — a plausible but not textbook-correct pipeline accounting.
**How to avoid:** Implement the single unified loop shown above (`i = c - j + 1`, active if `1≤i≤M`) — it produces the fill/steady/drain phases as an emergent property of one formula, with no possibility of a boundary double-count.
**Warning signs:** Total cycle count ≠ `M + N - 1`; active-station count exceeding N at any cycle; the Gantt showing more than N simultaneous bars.

### Pitfall 2: A1/A2 mode toggle expected to change numbers at fixed K
**What goes wrong:** A tester toggles lockstep↔independent at K=3 expecting the total run time to change, sees no change, and files it as a bug.
**Why it happens:** D-04 describes the toggle as if it were a live numeric lever; with global flow params it mathematically cannot be (see the dedicated subsection above).
**How to avoid:** Ship the UI copy recommended above explaining WHY the numbers match at fixed K, and make the A1-vs-A2 headline delta (D-11.3) explicitly compare the two slider ENDPOINTS regardless of the toggle's current position.
**Warning signs:** Any task spec that describes the mode toggle as "recomputes the schedule with a different rate" without specifying WHERE that different rate comes from.

### Pitfall 3: `ceil()` stroke-quantization producing ties that make LPT grouping non-deterministic
**What goes wrong:** Two liquids with different volumes can round up to the same stroke count (e.g. 176 µL and 180 µL both `ceil(x/5)=36` strokes at 5 µL/stroke) — a naive `sort()` on tied values can reorder unpredictably across re-renders (V8's sort is stable for arrays but ties combined with `Array.prototype.slice`/`map` re-derivation from scratch each render should still be checked), producing a flickering Gantt group assignment.
**How to avoid:** Sort by `(doseTime, then original input index)` as a stable tiebreaker, not `doseTime` alone.
**Warning signs:** Gantt bar grouping visibly changes between otherwise-identical re-renders.

### Pitfall 4: NaN/Infinity propagation from zero or empty inputs
**What goes wrong:** RPM=0, rollers=0, or µLPerStroke=0 (user clears a field mid-edit) produces `Infinity` or `NaN` doseTimes, which then breaks `Math.max()` comparisons and can silently render a broken/blank Gantt with no visible error.
**How to avoid:** Follow rotor-solver's precedent exactly: gate a `feasible`-style flag on all engine outputs and **show, don't hide** invalid states (rotor-solver SPEC: "Red rows are not hidden — they remain readable for comparison"). Recommend clamping to sane minimums (e.g. RPM≥1, rollers≥1, µLPerStroke>0) with an inline warning rather than silently producing `NaN` cards.
**Warning signs:** Console errors on load before any input is touched; blank/zero-width Gantt bars.

### Pitfall 5: Gantt steady-state window accidentally showing a fill/drain slice
**What goes wrong:** D-10 asks for "a representative handful of full-pipeline cycles (where the pattern repeats)" — if the window picked happens to start before cycle N (still in fill, fewer than N stations active), the chart will show FEWER bars per cycle than the user's concurrency setting implies, undermining the "idle gaps show why parallelism helps" story (D-09).
**How to avoid:** Pick the window starting at cycle N (first fully-steady cycle) through cycle `N + 2` or `N + 3` (a few full-occupancy repeats), explicitly excluding the fill (cycles `1..N-1`) and drain (cycles `M+1..M+N-1`) ranges from the rendered window. Report the fill/drain-inclusive **totals** numerically alongside (as D-10 already specifies), just don't render them as bars.
**Warning signs:** Rendered Gantt window's cycle count of active stations < N when concurrency K=N is selected.

### Pitfall 6: Fixed-pixel label column breaking the no-horizontal-scroll rule at 375px
**What goes wrong:** thesis-timeline's `--lbl: 210px` fixed label column (index.html:162) plus a percentage-based bar area works because that page ALLOWS contained horizontal scroll below 940px. Phase 8 cannot allow ANY horizontal scroll (CLAUDE.md hard rule, reinforced by D-10), so a 210px fixed label column at a 375px viewport leaves only ~165px for N≤6 bars — likely too cramped, or forces overflow.
**How to avoid:** Use a responsive label column (e.g. `clamp(70px, 22vw, 130px)` or a percentage-based label width), and/or stack the label above the bar on narrow viewports (a small media-query break, similar in spirit to system-architecture-explorer's `hide-sm` column-hiding pattern at 640px, PIN-BUDGET-ANALYSIS note at 06.1-03).
**Warning signs:** Any horizontal scrollbar appearing at 375px in manual testing.

## Code Examples

### Live-recompute wiring (rotor-solver precedent, direct reuse)
```javascript
// Source: tools/rotor-solver/index.html:806-812
['field1','field2'].forEach(id => document.getElementById(id).addEventListener('input', recompute));
['select1','modeToggle'].forEach(id => document.getElementById(id).addEventListener('change', recompute));
```

### Percentage-based Gantt bar (thesis-timeline precedent, date-domain swapped for seconds)
```javascript
// Source: tools/thesis-timeline/index.html:574-577 (toMs/pct), 646-649 (bar positioning) — adapted
const pct = t => ((t - windowStart) / (windowEnd - windowStart)) * 100;
bar.style.left  = Math.max(0, pct(seg.start)) + '%';
bar.style.width = Math.max(0.6, pct(seg.end) - pct(seg.start)) + '%';
// NOTE: do NOT wrap in .gantt-scroll{overflow-x:auto} or set a fixed min-width — see Pitfall 6.
```

### Discrete stop-and-go CSS animation (no library, D-12)
```css
/* Rack indexes discretely under a fixed nozzle row — decoupled from real timing (D-12) */
@keyframes indexStep {
  0%   { transform: translateX(0); }
  100% { transform: translateX(var(--travel, -280px)); }
}
.rack-track {
  animation: indexStep 8s steps(8, end) infinite;
}
@media (prefers-reduced-motion: reduce) {
  .rack-track { animation: none; }
}
```
`prefers-reduced-motion` guard precedent: `assets/deck.css`/`assets/deck.js` (SC-1's "reduced-motion guards") and the landing page's hero motif — follow the same convention here.

## State of the Art

Not applicable in the usual "library X replaced library Y" sense — there is no external library dependency in this domain for this project. The one relevant "state of the art" note: CSS `steps()` easing and native DOM tooltip wiring (as already used in thesis-timeline) remain the current, unchanged, framework-free way to build exactly this kind of chart/animation in a static site; nothing has superseded these primitives.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | LPT (sort-descending, chunk-into-groups-of-K) is the grouping rule for 1<K<N | Scheduling Engine → Concurrency grouping | Low — verified by exhaustive small-case comparison in this doc; if the planner picks a different (e.g. round-robin) grouping, only the MID-range K values (2, 3 at N=4) change, the two pinned endpoints (K=1, K=N) are unaffected |
| A2 | Total cycles = `M + (N−1)`, not `M + 2(N−1)` | Scheduling Engine → Fill/steady/drain decomposition | Medium — affects the full wall-clock totals (D-11.1, D-11.4) by a few extra ramp-cycles' worth of seconds if the alternate literal reading is intended; does NOT affect the two pinned per-cycle benchmark numbers |
| A3 | Rack change does not precede rack 1 (3× not 4× the 5s) | Rack-change accounting | Low — a flat ±5s difference on a ~380-580s total; explicitly named as a Claude's Discretion item in CONTEXT.md, so this is expected to need confirmation, not a research gap |
| A4 | Rack changes are additive overhead, not pipeline-interrupting | Rack-change accounting | Medium — a pipeline-interrupting model would require a materially more complex per-rack fill/drain simulation; if wrong, the whole total-run-time engine needs restructuring, not just a constant tweak |
| A5 | A1/A2 mode toggle is numerically inert at fixed K under global flow params | The A1/A2 lockstep-vs-independent math | High-consequence if unaddressed — this is the biggest UX/credibility risk in the tool; the recommended mitigation (UI copy + basing D-11.3 on slider endpoints) is designed to make this a feature, not a bug, but the planner must deliberately implement that framing rather than silently building two "should differ" controls |
| A6 | Flow params (rollers/µL-per-stroke/RPM) are global across all stations (matches CONTEXT's explicit Discretion default) | Throughout | Low — directly stated as the Discretion default in CONTEXT.md, not an independent assumption of mine |

**If this table is empty:** N/A — see entries above; none of these need to block planning, but A2, A4, and A5 in particular should be surfaced to the user (Sirio) at some point before the SPEC.md is written as final, since they materially shape what "the benchmark" formally means beyond the two numbers CONTEXT.md itself pins.

## Open Questions

> **All three resolved during planning (Phase 8 plans, 2026-07-20)** — the plans hardcode a single reading for each, so nothing is left for the executor to guess. Markers added per plan-checker audit-trail convention.

1. **(RESOLVED — adopted `32+(N-1)`, footnoted in SPEC.md; 08-01 Task 2 hardcodes `totalCycles = M + N - 1` with a grep guard against the `2*(N-1)` reading)** **Does D-07's "fill + 32 + drain" wording mean literally `32+2(N-1)` cycles, or is `32+(N-1)` (standard pipeline math) an acceptable reading?**
   - What we know: the two PINNED benchmark numbers (16.67s serial-sum, 10s pipelined-max) are steady-state per-cycle figures and are unaffected either way.
   - What's unclear: the exact total-cycle-count formula for the full wall-clock total (D-07/D-11.1).
   - Recommendation: adopt `32+(N-1)` (mathematically correct, worked out in full above) with a one-line SPEC.md footnote; only escalate to the user if exact literal wording matters more than mathematical correctness for the thesis write-up.

2. **(RESOLVED — explanatory-only for v1; 08-02 Task 1 computes the D-11.3 delta from the K=1 vs K=N slider endpoints, mode toggle carries teaching copy, no per-liquid override built)** **Should the A1/A2 mode toggle ever carry independent numeric weight (via optional per-liquid rate override), or is it purely explanatory given the global-params default?**
   - What we know: CONTEXT.md's Deferred Ideas explicitly name per-liquid flow tuning as a "later enhancement... unless trivially free."
   - What's unclear: whether "trivially free" is met by a simple per-station RPM override field, or whether that's scope creep for this phase.
   - Recommendation: ship the explanatory-only version for v1 (Option 1 above); treat the override as an explicit future-phase candidate, not something to half-build here.

3. **(RESOLVED — no persistence for v1; no plan introduces a localStorage mechanism)** **Does the tool need any persisted state (localStorage), matching system-architecture-explorer's D-06 precedent?**
   - What we know: CONTEXT.md's 12 decisions never mention persistence; thesis-timeline (the closest structural analog) has none ("read-only visualization — no inputs, no persistence") but that tool also has no inputs, unlike phase 8.
   - What's unclear: whether losing all input state on reload is acceptable for a tool this interactive.
   - Recommendation: default to no persistence for v1 (simplest, matches the absence of any CONTEXT.md decision calling for it); flag as a cheap addable-later enhancement if Sirio wants it (the system-architecture-explorer precedent, `06-01-PLAN.md`, shows the pattern is already proven in this codebase if needed).

## Environment Availability

Skipped — this phase has zero external dependencies (no CDN, no npm, no build tool, no runtime beyond the browser itself). All required capabilities (vanilla JS, CSS `@keyframes`/`steps()`, inline SVG) are guaranteed present in any modern browser and require no environment probing.

## Security Domain

`security_enforcement` is enabled (`.planning/config.json`, ASVS level 1) — addressed for completeness even though this phase is a pure client-side static calculator with no network calls, no authentication, no server, and (per the Open Question above) likely no persistence.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No login/session exists anywhere on this static site |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | No access-controlled resources |
| V5 Input Validation | Yes | Numeric range clamps on all inputs (RPM, rollers, µL/stroke, volumes, concurrency); guard against 0/negative/NaN before they reach `computeDoseTimes`/`simulateSchedule`; enforce the D-02 total-dose-<2000µL constraint with a visible inline warning rather than silent truncation |
| V6 Cryptography | No | Nothing is encrypted, transmitted, or stored |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Divide-by-zero / `Infinity`/`NaN` propagation from degenerate inputs (RPM=0, rollers=0, µL/stroke=0) | Denial of Service (of the tool's own UI, not a real security boundary) | Input clamping + explicit "invalid input" UI state (Pitfall 4 above), following rotor-solver's "show don't hide infeasible" precedent |
| None of the classic web threats (XSS, CSRF, injection, SSRF) apply | — | This tool has no server, no user-generated HTML rendering from untrusted sources, and no network requests — there is no attack surface for these categories in this phase |

## Sources

### Primary (HIGH confidence)
- `prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md` — A1/A2/B/C study, §5 U5 — the exact question this tool answers
- `tools/rotor-solver/SPEC.md` and `tools/rotor-solver/index.html` — flow-rate derivation (rollers × µL/stroke = µL/rev; RPM → rev/s → strokes/s), live-recompute pattern (`upd()`, event listener wiring)
- `tools/thesis-timeline/index.html` and `SPEC.md` — HTML/CSS percentage-based Gantt bar technique, hover-tooltip wiring, and (as a documented anti-pattern to avoid) its `overflow-x:auto`/`min-width` scroll compromise
- `tools/system-architecture-explorer/index.html` (via STATE.md entries 260720-pbc/260720-pcp/260720-msp) — single-source-of-truth breakdown-function pattern (`pinsOf()`), expanded-row detail table precedent
- `.planning/phases/08-dispense-choreography-throughput-simulator-tool-interactive-/08-CONTEXT.md` — the 12 locked decisions and Discretion items this entire research resolves against
- `.planning/STATE.md` (Roadmap Evolution, Phase 8 entry) — the pinned benchmark of record
- Python simulation run in this research session — numerically verified every cycle-count, LPT-grouping, and total-run-time figure quoted above

### Secondary (MEDIUM confidence)
- CLAUDE.md — project hard constraints (no build tools, no CDN-only deps, no horizontal scroll, inline-only logic) cross-checked against every recommendation above

### Tertiary (LOW confidence)
- None — this phase required no external web research; every finding traces to a file already in this repository or to arithmetic verified by direct computation this session.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no packages, hard project constraint, unambiguous
- Architecture / rendering patterns: HIGH — direct, cited precedent already shipped in this repo (thesis-timeline, rotor-solver, system-architecture-explorer)
- Scheduling engine core formulas (flow rate, dose time, pinned benchmark reproduction): HIGH — exact arithmetic match to two independently-pinned numbers, cross-verified by simulation
- Scheduling engine extensions (LPT grouping, fill/drain cycle count, rack-change convention): MEDIUM — internally consistent, worked and simulation-verified, but resolve genuine ambiguities/discretion items in CONTEXT.md rather than restating locked facts; flagged individually in the Assumptions Log
- A1/A2 mode-toggle finding: MEDIUM-HIGH on the math (follows directly from D-03's own wording), but the recommended UX resolution is a judgment call the planner should treat as a strong recommendation, not a locked fact

**Research date:** 2026-07-20
**Valid until:** No expiry driver — this research is internal derivation + repo-precedent, not tracking an external fast-moving library; safe to treat as valid for the life of this phase (re-derive only if CONTEXT.md's decisions change).
