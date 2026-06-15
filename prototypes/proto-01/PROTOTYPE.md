---
id: proto-01
slug: proto-01
title: Prototype 1 — peristaltic pump (baseline)
status: built-redesign-pending
created: 2026-06-15
---

# Prototype 1 — Peristaltic Pump (baseline)

The first physical build. Data collected; **redesign pending** because measured
displacement is well below target.

## Design parameters ("the measures used to make it")

> Fill from the design-tool inputs. Values marked TODO were not captured in the
> handover and should be back-filled from the solver sessions / build notes.

| Parameter | Value | Source |
|-----------|-------|--------|
| Target volume per stroke | 5.0 µL (design intent) | roller displaced-volume solver |
| Roller count | TODO | rotor solver |
| Tube inner diameter | TODO | — |
| Rotor / occlusion geometry | TODO | rotor solver |
| Solver predicted displaced volume | TODO | `peristaltic_5ul_stroke_geometry_solver.html` |
| Steps per stroke (firmware) | 50 (200 steps/rev ÷ 4 rollers) | `03. CODING/firmware` |

## What we know so far

- **Measured ≈ 3.5 µL/stroke** vs assumed 5.0 → volumes under-dispense ~29%.
- This gap is the **motivation to redesign** (proto-02).
- Manual redesign data was collected — see `03. CODING/manual-dispense-check/`
  (`analyze_dispense.py`).

## Test data (forward links → 03. CODING)

- Calibration / manual check: `../../../03. CODING Thesis Out of Drive/manual-dispense-check/`
- Lab sessions: `../../../03. CODING Thesis Out of Drive/lab-data/` (link the
  specific `phase-*/SESSION.md` once a session is run against this prototype)

> Reciprocal link: add a "Prototype: proto-01" line to the relevant `SESSION.md`.

## Version log

- **v1 (this build)** — 5 µL/stroke target, measured ≈3.5. Redesign decided.
- **v2 (planned)** — to be designed; capture new solver inputs here when started.

## Open decisions

- What geometry change closes the 5.0 → 3.5 gap (tube ID, occlusion, roller
  count)? → start a `/gsd:thread` in this repo when tackling the redesign.
