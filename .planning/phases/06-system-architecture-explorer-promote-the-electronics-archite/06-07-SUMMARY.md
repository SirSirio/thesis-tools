---
phase: 06-system-architecture-explorer-promote-the-electronics-archite
plan: 07
subsystem: docs
tags: [spec-md, documentation, confidence-tagging, pin-budget, cost-model]

# Dependency graph
requires:
  - phase: 06-05
    provides: "19-variant VARIANTS/DEFAULTS data model with source/confidence tags, brain RAM/PSRAM/GPIO specs, pinsOf(v)/pinConfidenceOf(v) pin-budget engine"
  - phase: 06-06
    provides: "buildDiagram(v) live SVG system diagram, topoClassOf(v) topology classification"
provides:
  - "tools/system-architecture-explorer/SPEC.md — canonical tool spec: component price table (source/confidence), all 19 variant BOMs, three comms layers, pin-budget model + SCREEN_PINS/OVERRUN rule, power/PSU model, brain RAM/PSRAM/GPIO specs, cost-model assumptions, confidence-tag legend, open questions, persistence keys, cross-links, language support"
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SPEC.md documents the shipped index.html data model as-of-execution (not aspirational) — every table cross-checked line-by-line against DEFAULTS/VARIANTS/pinsOf() in the actual file, matching the site's co-located-spec convention (rotor-solver/SPEC.md precedent)"

key-files:
  created:
    - tools/system-architecture-explorer/SPEC.md
  modified: []

key-decisions:
  - "Adapted rotor-solver's SPEC.md section structure (Purpose → Inputs/Outputs → Feasibility → Diagram → Known values → Assumptions → Language) to this tool's actual shape: Purpose, confidence legend, price table, brain specs, variant BOMs, comms layers, pin-budget model, power model, diagram, cost assumptions, persistence, open questions, cross-links, language support"
  - "Documented ONLY the ILI9341 screen as High-confidence/sourced in the price table — all ~20 other component prices remain Low-confidence rough estimates per 06-05-SUMMARY.md's explicit scope note (sourcing them is deferred, out of Phase 6)"
  - "Screen SPI-vs-parallel ambiguity written up as Open Question #1 with the exact end-of-phase resolution procedure from 06-05-SUMMARY.md (which line to flip, both scenarios), rather than a generic 'TBD' note — a future reviewer can act on it directly"
  - "Cross-linked all three prototypes/System-Architecture/ decision records plus the multi-liquid-architecture ARCHITECTURE-DECISION.md (U5 owner), matching D-08's tool-canonical / records-are-pointers direction"

requirements-completed: [ARCH-05]

# Metrics
duration: 15min
completed: 2026-07-15
---

# Phase 06 Plan 07: SPEC.md — Cost, Pin-Budget & Comms-Layer Documentation Summary

**Co-located `SPEC.md` documenting the shipped tool's full data model — 20-component price table with source/confidence, all 19 variant BOMs, the three comms layers, the `pinsOf(v)` pin-budget engine (SCREEN_PINS/BUS_PINS/pinsC + OVERRUN rule), the 60W/150W power model, and the screen SPI-vs-parallel ambiguity as a flagged open item.**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-07-15T14:34:00Z
- **Completed:** 2026-07-15T14:49:55Z
- **Tasks:** 1/1
- **Files modified:** 1 (created)

## Accomplishments

- Created `tools/system-architecture-explorer/SPEC.md` (370 lines) following the `rotor-solver/SPEC.md` structural precedent, adapted to this tool's actual sections
- Component price table transcribed from the shipped `DEFAULTS` object with per-row source/confidence columns — the ILI9341 screen correctly flagged as the sole **High**-confidence, vendor-sourced anchor; all other ~19 prices flagged **Low** (rough estimates, sourcing deferred per 06-05-SUMMARY.md)
- Brain/MCU spec table (usable GPIO, RAM, PSRAM, UI-fluidity note) transcribed for all 6 brain candidates including the integrated `espscreen` board (9 IO, **High** confidence — the one vendor-stated-directly figure)
- Full 19-row variant BOM table (17 original + `ESPINT-fused-i2c` + `ESPINT-dumb-i2c`), each with concurrency, driver, bus, Layer-C link, complexity stars, and BOM component list — spot-checked against the shipped `VARIANTS` array
- Three comms layers (A/B/C) documented in prose matching the tool's own theory-card copy
- Pin-budget model section documents `pinsOf(v)`'s exact aggregation formula, `SCREEN_PINS` (SPI=8/parallel=13, both Low confidence), `BUS_PINS` per bus type, the `pinsC` per-variant Layer-C table, and the OVERRUN/confidence-pill rule, including why `esp32.gpioUsable=15` was chosen (mixed result set, not all-pass/all-fail)
- Power/PSU model (60W vs 150W, 12V/24V dual rail, common ground) and the live-diagram topology-class table (fused/satellite/distributed/printer, node counts) both documented
- Confidence-tag legend (High/Medium/Low, D-11) stated once up top; every subsequent table's Confidence column uses it consistently
- Open Questions section documents the screen SPI-vs-parallel ambiguity as **PENDING end-of-phase physical inspection**, including the exact code-edit procedure (which globals to flip) carried over verbatim from 06-05-SUMMARY.md's "Human-Check Outcome" section — plus the TMC2209 UART-mode and bare-ESP32-S3 open items, both marked non-blocking
- Persistence section states the `sae-prices`/`sae-rate` localStorage keys and confirms no collision with the site's shared `lang` key
- Cross-links section links all three `prototypes/System-Architecture/*.md` decision records plus the `multi-liquid-architecture/ARCHITECTURE-DECISION.md` U5 owner, matching D-08's "tool canonical, records point in" direction
- Language support section states English-only, with the rationale (post-i18n-era tool, not retrofitted)

## Task Commits

1. **Task 1: Write tools/system-architecture-explorer/SPEC.md (ARCH-05)** - `28ba2ef` (docs)

## Files Created/Modified

- `tools/system-architecture-explorer/SPEC.md` — new file, the tool's canonical spec per the site's co-located-SPEC.md standard

## Decisions Made

See `key-decisions` in frontmatter above for the full list. Highlights: only the ILI9341 screen documented as sourced/High-confidence (everything else stays honestly Low per the deferred-sourcing scope note from 06-05); the screen-interface open question was written with the exact resolution steps a future reviewer needs, not a vague TBD; all three prototype decision records were cross-linked per D-08's direction.

## Deviations from Plan

None — plan executed exactly as written. The single task matched its `<action>` specification; all four `<acceptance_criteria>` items and all four `<verify><automated>` checks pass (file exists, contains "confidence", "pin", and "sae-prices"; 370 lines well above the 60-line minimum).

## Issues Encountered

None. Verification was straightforward: `grep`/`test` checks from the plan's `<verify>` block all passed on first attempt.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Phase 6 (System Architecture Explorer) is now feature-complete per its ROADMAP plan list: 06-01 (skeleton/reskin), 06-03 (cross-links), 06-04 (landing/README), 06-05 (sourcing/pin-budget), 06-06 (live diagram), 06-07 (this SPEC.md) — all six plans shipped
- The screen SPI-vs-parallel physical inspection remains the one open item, correctly deferred to end-of-phase human review per `workflow.human_verify_mode: end-of-phase` — not a blocker for this plan or phase completion
- No blockers for closing out Phase 6

---
*Phase: 06-system-architecture-explorer-promote-the-electronics-archite*
*Completed: 2026-07-15*

## Self-Check: PASSED

- FOUND: tools/system-architecture-explorer/SPEC.md
- FOUND commit: 28ba2ef
