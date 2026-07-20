---
created: 2026-07-20T00:00:00Z
title: Dispense simulator — rack animation should follow the K-tubes state model
area: tools
files:
  - tools/dispense-throughput-simulator/index.html
---

## Problem

Sirio's intended rack-animation model (given after several mismatched iterations)
is a simple 4-state lifecycle keyed on the concurrency **K**, NOT the current
"one tube per nozzle / N under the bank" pipeline:

- **State 0** — bank empty, no tube under any nozzle.
- **State 1** — **K** tubes are under the nozzles (K = the selected concurrency)
  and dispense together.
- **States 2…n** — the existing indexing/moving logic (this part is fine).
- **Final state** — all tubes move away from the nozzles.

The current animation puts N tubes under N nozzles (waves of K) and runs the full
pipeline fill/drain. Sirio wants the number of tubes under the nozzles at the
"dispense" moment to be **K**, with the lifecycle above.

## Solution

Rework the stepper so State 1 shows exactly K tubes arriving under the nozzles
and dispensing, then indexing, then a final state where all tubes leave. Confirm
the precise geometry with Sirio before building (e.g. do the K tubes sit under
the first K nozzles? do they move as a group? how does K < N vs K = N look?) —
ask concrete visual options to avoid another mismatch.

## Context

Deferred at phase-08 close (2026-07-20): Sirio approved shipping phase 8 as-is and
set this animation refinement aside as a follow-up rather than blocking the phase.
