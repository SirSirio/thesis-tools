---
created: 2026-07-20T00:00:00Z
title: Dispense simulator — per-pump independent rates gated by A1/A2 mode
area: tools
files:
  - tools/dispense-throughput-simulator/index.html
  - tools/dispense-throughput-simulator/SPEC.md
---

## Problem

In v1 of the Dispense Choreography & Throughput Simulator, the A1/A2 "Control mode"
toggle is numerically inert: because every pump shares one global rate (rollers,
µL/stroke, RPM), lockstep (A1) and independent (A2) produce identical schedules at
any fixed concurrency K — a group always finishes with its slowest member. The
toggle is currently just teaching copy, which the user (Sirio) found confusing.

## Solution

Make the toggle functional by adding **per-pump flow rates**:

- Expose a per-liquid/per-pump rate (or per-pump RPM/µL-stroke) input, in addition
  to (or replacing) the single global rate.
- **A1 (lockstep):** per-pump rate fields are **locked and dimmed** — all active
  pumps forced to one shared rate (models a shared step bus).
- **A2 (independent):** per-pump rate fields are **editable / not dimmed** — each
  pump runs its own rate.
- The scheduling engine must then compute per-station dose times from per-pump rates,
  so A1 and A2 genuinely diverge at interior K (A2 lets a fast pump finish early
  instead of being held to the group's slowest member).

This is the real empirical answer to U5 (does the architecture need independent
per-motor rates), which v1 can only gesture at.

## Scope note

Not trivial — touches the engine (`computeDoseTimes`/`groupDispenseTime`/
`simulateSchedule`), the input panel, the mode-toggle wiring, and the SPEC.md
benchmark of record (new benchmark numbers for the divergent-rate case). Deserves
its own discuss/plan cycle rather than an inline fix. Foreshadowed in the v1
mode-toggle copy so users know it is coming.
