---
phase: 01-motor-microstepping-panel
plan: 01
subsystem: rotor-solver
tags: [inputs, i18n, motor-constants, css, event-listeners]
dependency_graph:
  requires: []
  provides: [voltSel, msSel, MOTOR, MS_FACTOR, TORQUE_FRAC, .warn]
  affects: [tools/rotor-solver/index.html]
tech_stack:
  added: []
  patterns: [data-i18n attribute, script-scope constants, change event delegation]
key_files:
  created: []
  modified: [tools/rotor-solver/index.html]
decisions:
  - Option value strings for msSel match MS_FACTOR/TORQUE_FRAC keys exactly (full, 1/2, 1/4, 1/8, 1/16, 1/32) to prevent silent undefined in motor calculations
  - Motor constants placed at script scope (not inside upd()) to avoid repeated allocation on every event
  - .warn class added inline in tool style block; assets/style.css untouched per project convention
metrics:
  duration: 15m
  completed: 2026-05-30
---

# Phase 01 Plan 01: Motor & Microstepping Panel — Foundation Summary

**One-liner:** Supply voltage (12/24 V) and microstepping (full–1/32, default 1/8) selects added to Parameters panel with EN/IT i18n labels, Wantai 42BYGHW811/DRV8825 motor constants defined at script scope, amber `.warn` CSS class added, and both selects wired to `upd()`.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add voltage + microstepping selects and i18n labels | 8aceac7 | tools/rotor-solver/index.html |
| 2 | Add motor constants block, .warn CSS class, and event listeners | 1882561 | tools/rotor-solver/index.html |

## What Was Built

- `<select id="voltSel">` with options 12 V (default) and 24 V in the Parameters panel `.ctrl` grid
- `<select id="msSel">` with six options (full/1/2/1/4/1/8/1/16/1/32, default 1/8) in the Parameters panel
- `data-i18n="label-volt"` and `data-i18n="label-ms"` labels with translations in both LANG.en and LANG.it
- `const MOTOR` at script scope: stepsFullRev=200, holdingTorque=4800 g·cm, ratedCurrent=2.5 A, resistance=1.25 Ω, inductance=0.0018 H
- `const MS_FACTOR`: maps full→1, 1/2→2, 1/4→4, 1/8→8, 1/16→16, 1/32→32
- `const TORQUE_FRAC`: maps full→1.00, 1/2→0.70, 1/4→0.50, 1/8→0.35, 1/16→0.20, 1/32→0.10
- `.warn { color: #e8a020; font-weight: 600; }` in inline `<style>` block
- Change listener array extended to `['idSel', 'bSel', 'voltSel', 'msSel']`

## Contracts Established for Plan 02

- Option value strings (`full`, `1/2`, `1/4`, `1/8`, `1/16`, `1/32`) match MS_FACTOR/TORQUE_FRAC keys exactly
- MOTOR/MS_FACTOR/TORQUE_FRAC accessible at script scope from within `upd()`
- `.warn` class ready for FoS traffic-light usage
- voltSel and msSel call `upd()` on change; reads will be added to `upd()` body in plan 02

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — this plan establishes contracts only. Motor output computations and display are deferred to plan 02 by design.

## Threat Flags

No new threat surface beyond what the plan's threat model covers (fixed dropdown options, no free-text input, no innerHTML injection of user strings).

## Self-Check: PASSED

- tools/rotor-solver/index.html modified: confirmed (git log 8aceac7, 1882561)
- voltSel present: confirmed (grep)
- msSel with 1/8 default: confirmed (grep)
- label-volt in both LANG objects: confirmed (2 lines)
- label-ms in both LANG objects: confirmed (2 lines)
- MOTOR.stepsFullRev=200, holdingTorque=4800, inductance=0.0018: confirmed (grep)
- MS_FACTOR '1/32':32: confirmed (grep)
- TORQUE_FRAC '1/32':0.10: confirmed (grep)
- .warn in inline style: confirmed (grep line 252)
- Event listener array includes voltSel + msSel: confirmed (grep line 558)
- assets/style.css unchanged: confirmed (.warn absent from style.css)
- No new files created: confirmed
