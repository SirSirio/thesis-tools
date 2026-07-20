# Phase 8: Dispense Choreography & Throughput Simulator - Context

**Gathered:** 2026-07-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Build one new self-contained tool at `tools/dispense-throughput-simulator/` (`index.html` + `SPEC.md`, standard `← All tools` nav bar, landing-page card, README row) that lets the user configure a peristaltic dispensing line — up to 6 liquids with per-liquid volumes, per-pump flow params (rollers, µL/stroke, RPM), sample-stage move time, and a concurrency setting — then **schedules the linear nozzle/sample indexing line** (6 nozzles in a line; 8 samples/rack × 4 racks = 32 samples indexing beneath) and reports **total run time, a per-station timeline, and the bottleneck station**.

**Reason to exist:** answer **U5 empirically** — does the protocol actually need architecture **A2** (per-motor independent step/dir, true parallel dispensing) or does **A1** (shared step bus, lockstep) suffice? This is the open unknown the System Architecture Explorer's cost matrix cannot resolve on its own.

**Fixed scope:** this one tool, this indexing setup (6-nozzle line, 32 samples). New capabilities (multi-line layouts, per-sample recipes, thermal/error modelling) belong in other phases.

</domain>

<decisions>
## Implementation Decisions

### Line & dose model
- **D-01:** **Cocktail pipeline** confirmed. Each sample passes every assigned nozzle station and collects a cocktail of all assigned liquids. Pipelined: sample N sits at station k while sample N+1 sits at station k−1, so up to N stations work on N different samples at once. This reproduces the benchmark exactly (600+200+175+25 = 1000 µL ÷ 60 µL/s = 16.67 s serial; pipelined ceiling 600 µL ÷ 60 µL/s = 10 s).
- **D-02:** **Input panel of up to 6 liquids**, each with a user-entered volume (µL). **Constraint: total dose across all liquids < 2000 µL.** The number of active nozzle stations (line length N) = the number of liquids entered (enter 4 liquids → 4 stations). There is no fixed-6 padding; unused nozzle slots simply do not exist in the line.

### Concurrency & the A1/A2 verdict (the tool's purpose)
- **D-03:** **Concurrency = slider 1…N** (N = number of liquids), from 1 (fully serial, A1) to N (fully parallel, A2). Run time updates live so the whole sweep is visible and diminishing returns are apparent. **A1 and A2 are pinned as explicit endpoint markers** on the slider so the named-architecture verdict reads directly off the curve.
- **D-04:** **Control-mode toggle** — *shared-bus / lockstep (A1)* vs *independent-rate (A2)*. In lockstep mode, concurrently-enabled pumps are forced to a **common rate** (A1 can't drive independent RPMs on a shared STEP/DIR bus); in independent mode each pump runs at its own configured rate (A2). Both are represented honestly rather than flattering A1. The toggle is the architectural distinction; the slider is the concurrency cap — the planner should make their interaction unambiguous (e.g. lockstep at K>1 = K pumps stepping together at one rate, each disabled via ENABLE when its volume is reached).

### Timing model
- **D-05:** **Strict stop-and-go alternation.** One shared linear stage indexes the whole rack one position at a time. Per cycle = (slowest active station's dispense time) + **1 s index move**. All dispensing halts during every move. No move/dispense overlap.
- **D-06:** **Stroke-quantized doses.** Dose time = `ceil(volume ÷ µL_per_stroke)` strokes ÷ strokes-per-sec. Partial strokes are impossible, so a dose rounds up to whole strokes. Benchmark volumes are all ÷5 so this reproduces 60 µL/s exactly; general volumes may round up. (Flow derivation: rollers × µL/stroke = µL/rev; RPM → rev/s → strokes/s. Benchmark: 4 rollers × 5 µL = 20 µL/rev; 180 RPM = 3 rev/s = 12 strokes/s × 5 µL = 60 µL/s.)
- **D-07:** **Full wall-clock accounting.** Total run time = pipeline **fill** (N−1 lead-in cycles) + 32 sample cycles + **drain** + **rack changes at 5 s each** (3 changeovers between the 4 racks; planner to confirm whether a change precedes rack 1). Not steady-state-only.
- **D-08:** Given inputs locked as timing constants: **sample shift = 1 s**, **rack change = 5 s**.

### Outputs & visualization
- **D-09:** **Row-per-station Gantt** timeline (one row per nozzle/station, time on X-axis, dispense bars vs idle gaps). The **bottleneck row is highlighted**; idle gaps make visible *why* parallelism does or doesn't help. `tools/thesis-timeline/` is the reusable JS-Gantt analog.
- **D-10:** **Steady-state window** for the Gantt — render a representative handful of full-pipeline cycles (where the pattern repeats) to respect the no-horizontal-scroll constraint; the full totals are reported numerically alongside. Not the whole 32-sample run.
- **D-11:** **Headline metrics above the timeline (all four):** (1) **Total run time** (full wall-clock, D-07); (2) **Bottleneck station** — which nozzle/liquid limits the line (longest quantized dose) + its per-cycle time, e.g. "600 µL → 10 s"; (3) **A1 vs A2 delta** — serial (A1) total vs full-parallel (A2) total and time saved = the explicit U5 verdict; (4) **Throughput** — derived seconds/sample and samples/hour at the current concurrency setting.
- **D-12:** **Illustrative animation** — a looping schematic of the 8-sample rack indexing under the nozzles with liquid dispensing at each station, to convey *how the system works*. **Decoupled from the exact schedule/timing** (a concept loop, not a synced playback). It may reflect assigned liquids/colours but does not need to be physically time-accurate. Purpose is communication, not a fifth output metric.

### Claude's Discretion
- Exact lockstep math when 1 < K < N in shared-bus mode (which pumps group, how a finished dose disables via ENABLE) — planner/executor to specify a defensible model consistent with D-04.
- Whether a rack change precedes rack 1 (3× vs 4× the 5 s) — planner to pick the physically sensible convention and document it.
- Gantt colour coding per liquid, animation styling, input widget affordances — follow the site's dark glassmorphic design system.
- Whether flow params (rollers, µL/stroke, RPM) are global or per-nozzle: default to **global** (replicated identical pump modules per the A-family premise); per-liquid tuning is an A2/U6 concern and can be a later enhancement unless trivially free.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### The decision this tool exists to resolve (MOST important)
- `prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md` — the A1 vs A2 vs B vs C study; **§5 U5** ("Do protocols need liquids dispensed at independent rates / simultaneously?") is the exact question this tool answers. A1 = shared step bus / lockstep; A2 = per-motor independent step/dir. The tool's serial-vs-parallel run-time gap is the empirical U5 input.
- `prototypes/REQUIREMENTS-CRITERIA.md` — device binary requirements + weighted criteria (context for why throughput/concurrency matters).

### Flow-parameter physics (pump model source of truth)
- `tools/rotor-solver/SPEC.md` — rollers, µL/stroke, RPM, contact-roller and steps-per-stroke formulas; the flow-rate derivation (µL/rev, strokes/s) the simulator's dose-time math reuses.
- `tools/peristaltic-roller-displaced-volume-model/SPEC.md` — displaced-volume / µL-per-stroke model behind the dispensing numbers (background, not required for scheduling).

### Reusable code analog
- `tools/thesis-timeline/index.html` + `tools/thesis-timeline/SPEC.md` — existing JS-driven Gantt (701 lines); closest structural analog for the row-per-station timeline (D-09).

### Benchmark of record
- `.planning/STATE.md` (Roadmap Evolution, Phase 8 entry, 2026-07-20) — pins the benchmark: 4 rollers × 5 µL/stroke = 20 µL/rev; 180 RPM → 60 µL/s; liquids 600/200/175/25 µL; serial 16.67 s/sample; pipelined ceiling 10 s at the 600 µL bottleneck. The simulator MUST reproduce these numbers.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `tools/thesis-timeline/index.html`: JS-driven Gantt (owner/status-coded bars, layout constants) — adapt for the row-per-station dispense timeline (D-09).
- `assets/style.css`: shared dark-glassmorphic design tokens (background `#0a0a0c`, accent `#ff6b2b`→`#e83535`, glass cards, `fade-up` entrance). Tool brings its own inline `<style>` for tool-specific bits; no new shared files.
- `tools/rotor-solver/`: precedent for live-recompute-on-input panels + inline flow-parameter math and a top-down geometry SVG.

### Established Patterns
- **Self-contained tool page**: all calc logic in inline `<script>`, tool-specific CSS in inline `<style>`, only `assets/style.css` shared (project hard rule).
- **`← All tools` nav bar** back to `../../index.html`; landing-page card; README tool-table row; repo-root ROADMAP + CLAUDE.md folder-structure update on ship.
- **No horizontal scroll at 1280px / 375px**; no CDN-only deps (offline/USB + GitHub Pages) — animation and Gantt must be hand-built CSS/SVG/Canvas/JS, no runtime libraries.
- **SPEC.md co-located** documenting inputs, outputs, formulas, constants (the benchmark), assumptions.

### Integration Points
- New tool folder `tools/dispense-throughput-simulator/` (name per STATE.md roadmap entry).
- Cross-link to `ARCHITECTURE-DECISION.md` (U5) and optionally the System Architecture Explorer, since this tool feeds the same A1/A2 decision that tool prices.

</code_context>

<specifics>
## Specific Ideas

- Benchmark preset the tool should default to / be able to reproduce: **4 rollers, 5 µL/stroke, 180 RPM (→ 60 µL/s); liquids 600 / 200 / 175 / 25 µL; 1 s shift; 5 s rack change** → serial 16.67 s/sample, pipelined 10 s ceiling.
- Sirio wants the tool to *feel* like it demonstrates the machine — the illustrative rack animation (D-12) is explicitly "just to give an idea of how the system works," so readability/clarity beats timing fidelity.
- The A1-vs-A2 delta (D-11.3) is the money output — the whole tool is a U5 decider, so that comparison should be prominent, not buried.

</specifics>

<deferred>
## Deferred Ideas

- **Per-liquid flow tuning** (different RPM/tube size per nozzle) — an A2/U6 capability; default to global params now, revisit if a protocol needs it.
- **Per-sample recipes** (different samples get different liquid subsets) — flexible but a heavier input UI; out of scope for a U5 decider.
- **Schedule-synced animation** (physically time-accurate playback reflecting concurrency + mode) — explicitly declined in favour of an illustrative loop (D-12); could be a later enhancement.
- **Multi-line / alternative rack geometries** — this phase fixes the 6-nozzle line + 8×4 rack layout.

None of these block the phase — all belong to future work.

</deferred>

---

*Phase: 8-dispense-choreography-throughput-simulator*
*Context gathered: 2026-07-20*
