# Phase 8: Dispense Choreography & Throughput Simulator - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-20
**Phase:** 8-dispense-choreography-throughput-simulator
**Areas discussed:** Line & dose model, Concurrency → A1/A2 verdict, Timing assumptions, Outputs & timeline viz, Illustrative animation

---

## Line & dose model

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — cocktail pipeline | Every sample receives all assigned liquids, one nozzle per station, pipelined. Matches the 16.67 s / 10 s benchmark. | ✓ |
| One liquid per sample | Each sample gets a single nozzle's liquid; does not reproduce the benchmark. | |
| Configurable per sample | Per-sample recipe; heavier UI, scope creep. | |

**User's choice:** Cocktail pipeline.
**Notes:** Confirmed the benchmark math (600+200+175+25 = 1000 µL ÷ 60 µL/s = 16.67 s serial; 600 ÷ 60 = 10 s pipelined ceiling) only holds under this model.

## Nozzle setup

| Option | Description | Selected |
|--------|-------------|----------|
| Up to 6, each assignable (empty costs index) | 6 slots, empty station still costs the 1 s move. | |
| Up to 6, empty = skipped | Empty slots absent from the line entirely. | ✓ (reframed) |
| Fixed 6, all filled | Force all 6. | |

**User's choice:** Free-text — "an input panel where I can select the different liquids dispensed (up to 6) and their volume … total liquid dispensed should be below 2000 µL."
**Notes:** Line length = number of liquids entered; per-liquid volume input; hard constraint total < 2000 µL.

## Concurrency → A1/A2 verdict

| Option | Description | Selected |
|--------|-------------|----------|
| Slider 1–N + live total | Serial→parallel sweep, live run time. | |
| A1 vs A2 side-by-side | Two endpoints only. | |
| Slider + A1/A2 markers | Full sweep with A1/A2 pinned on endpoints. | ✓ |

**User's choice:** Slider + A1/A2 markers.

## A1 fidelity (control mode)

| Option | Description | Selected |
|--------|-------------|----------|
| Simple: own rate always | K just caps concurrency; ignores lockstep. | |
| Model A1 lockstep | Shared-bus pumps forced to common rate. | |
| Toggle between the two | Switch shared-bus/lockstep (A1) vs independent-rate (A2). | ✓ |

**User's choice:** Toggle between the two modes.

## Timing assumptions

| Question | Selected |
|----------|----------|
| Move/dispense | **Strict alternate (stop-and-go)** — cycle = slowest station + 1 s index. |
| Stroke model | **Quantize to whole strokes** — ceil(vol ÷ µL/stroke). |
| Fill/drain + racks | **Full accounting** — fill + 32 samples + drain + rack changes. |

**User's choice (given upfront):** Sample shift = **1 s**; rack change = **5 s**.

## Outputs & timeline viz

| Question | Selected |
|----------|----------|
| Timeline shape | **Row-per-station Gantt** (bottleneck row highlighted). |
| Timeline span | **Steady-state window** (representative cycles; full totals numeric). |
| Headline metrics | **All four:** total run time, bottleneck station, A1 vs A2 delta, throughput. |

## Illustrative animation (added mid-discussion)

| Option | Description | Selected |
|--------|-------------|----------|
| Synced to the schedule | Physically time-accurate playback of concurrency + mode. | |
| Illustrative loop | Concept loop of the rack indexing under nozzles, decoupled from timing. | ✓ |
| Synced, simplified timing | Reflects order/mode on a compressed clock. | |

**User's choice:** Illustrative loop.
**Notes:** "an animation that shows the 8 samples in the rack with the dispensing occurring from each nozzle. Just to give an idea of how the system works." Communication over timing fidelity.

## Claude's Discretion

- Exact lockstep math for 1 < K < N in shared-bus mode.
- Whether a rack change precedes rack 1 (3× vs 4× the 5 s).
- Gantt per-liquid colour coding, animation styling, input widget affordances (follow design system).
- Global vs per-nozzle flow params — default global (replicated identical modules).

## Deferred Ideas

- Per-liquid flow tuning (A2/U6).
- Per-sample recipes.
- Schedule-synced animation (declined here).
- Multi-line / alternative rack geometries.
