---
phase: 08-dispense-choreography-throughput-simulator-tool-interactive-
plan: 03
subsystem: docs
tags: [documentation, spec-md, scheduling-simulation]

# Dependency graph
requires:
  - phase: 08-01
    provides: "computeDoseTimes / groupDispenseTime / simulateSchedule engine (source of formulas documented here)"
  - phase: 08-02
    provides: "Rendered metrics/Gantt/rack-animation (source of the D-09/D-10/D-11/D-12 Outputs section)"
provides:
  - "tools/dispense-throughput-simulator/SPEC.md — canonical tool spec (inputs, outputs, formulas, constants, benchmark, assumption footnotes)"
affects: [08-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SPEC.md structure mirrors tools/rotor-solver/SPEC.md's shape (Purpose / Inputs / Formulas / Outputs / Known values at design point / Assumptions), adapted to a scheduling-engine domain instead of a geometry-solver domain"

key-files:
  created:
    - tools/dispense-throughput-simulator/SPEC.md
  modified: []

key-decisions:
  - "SPEC.md documents the resolved-assumption footnotes (32+(N-1) cycle reading, 3x rack-change convention, flat-additive rack changes, global flow params, A1/A2 fixed-K numerical equality) as permanent record, matching exactly what 08-01/08-02 already implemented and RESEARCH.md's Assumptions Log A2-A6 — no new modelling decisions made in this plan, purely documentation of prior-plan choices"
  - "Cross-linked to prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md (U5 source study) and tools/system-architecture-explorer/index.html (the pinsOf()/periphOf() single-source-of-truth precedent simulateSchedule() mirrors), per the plan's explicit instruction"

patterns-established: []

requirements-completed: [D-01, D-02, D-03, D-04, D-05, D-06, D-07, D-08, D-09, D-10, D-11, D-12]

# Metrics
duration: 6min
completed: 2026-07-20
---

# Phase 08 Plan 03: Dispense Choreography & Throughput Simulator — SPEC.md Summary

**Wrote the canonical `tools/dispense-throughput-simulator/SPEC.md`, documenting every input/output/formula the shipped engine (08-01) and visualization (08-02) actually implement, plus the benchmark of record and all five resolved-assumption footnotes.**

## Performance

- **Duration:** 6 min
- **Started:** 2026-07-20T12:27:45Z (immediately following 08-02)
- **Completed:** 2026-07-20T12:33:41Z
- **Tasks:** 1 completed
- **Files modified:** 1 (new)

## Accomplishments

- Wrote `SPEC.md` following `tools/rotor-solver/SPEC.md`'s section shape (Purpose / Inputs table / Derived constants + scheduling formulas / Outputs / Known values at the current design point / Assumptions & footnotes / Cross-links)
- Inputs table matches the shipped `index.html`'s actual element IDs and defaults exactly (`vol0..vol5`, `rollers`, `uLPerStroke`, `rpm`, `concK`, `mode`; fixed constants `SAMPLE_SHIFT`/`RACK_CHANGE`/`RACKS`/`SAMPLES`)
- Recorded the benchmark of record verbatim: dose times [10, 3.3333, 2.9167, 0.4167] s, serial 16.6667 s, pipelined ceiling 10 s, full totals 583.33 s (K=1) / 376.67 s (K=4), delta 206.67 s (≈35%), throughput 18.23/11.77 s/sample
- Footnoted all five resolved-assumption items from RESEARCH.md's Assumptions Log (A2-A6): the `32+(N-1)` cycle reading vs the literal `32+2(N-1)`, the 3× (not 4×) rack-change convention, rack changes as flat additive overhead, global flow params across all stations, and the A1/A2 fixed-K numerical equality
- Cross-linked `prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md` (U5 source study) and `tools/system-architecture-explorer/index.html` (the single-source-of-truth breakdown-function precedent `simulateSchedule()` mirrors)

## Task Commits

1. **Task 1: Write the canonical SPEC.md** - `f9d1f3a` (docs)

**Plan metadata:** (pending — final docs commit below)

## Files Created/Modified

- `tools/dispense-throughput-simulator/SPEC.md` - New canonical tool spec: Purpose, Inputs, Derived constants & scheduling formulas, Outputs, Known values at the current design point (benchmark), Assumptions & footnotes, Cross-links

## Decisions Made

See `key-decisions` in frontmatter above. This plan made zero independent modelling judgment calls — every formula, constant, and assumption documented here was already locked and implemented by Plans 08-01/08-02; this plan's sole job was to write it down faithfully as the permanent SPEC.md reference, per CLAUDE.md's tool-spec standard.

## Deviations from Plan

None - plan executed exactly as written. Both automated verification greps (`SPEC_OK` benchmark/formula check, `FOOTNOTES_OK` assumption-footnote check) passed on the first write with no rework needed.

## Issues Encountered

None.

## User Setup Required

None — pure documentation file, no external service configuration.

## Next Phase Readiness

- `tools/dispense-throughput-simulator/SPEC.md` is now complete and matches the shipped `index.html` exactly (verified element IDs, defaults, and formulas by reading the live code before writing).
- Plan 08-04 (landing page card, README row, ROADMAP entry, CLAUDE.md folder-structure block) can proceed — this plan touched only `SPEC.md`, leaving `index.html` and repo-root files untouched as instructed.
- No blockers.

## Known Stubs

None. `SPEC.md` is prose/documentation only — no code, no data bindings, nothing that could be a stub.

## Threat Flags

None. Documentation-only change; no executable content, no new attack surface. Matches the plan's own threat model (T-08-05: accept, N/A).

## Self-Check: PASSED

- FOUND: tools/dispense-throughput-simulator/SPEC.md
- FOUND: commit f9d1f3a (Task 1)

---
*Phase: 08-dispense-choreography-throughput-simulator-tool-interactive-*
*Completed: 2026-07-20*
