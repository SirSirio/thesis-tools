---
id: proto-01
slug: proto-01-5ul-4roller
title: Prototype 1 — 5 µL 4-roller peristaltic (baseline)
status: built-redesign-pending
created: 2026-06-15
---

# Prototype 1 — 5 µL 4-roller peristaltic (baseline)

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

Manual 1 mL open-loop calibration (2026-06-15), **two measurement methods** —
full report: `03. CODING/manual-dispense-check/REPORT.md`.

| Method | n | Mean delivered (1 mL cmd) | CV | Implied µL/stroke |
|--------|---|---------------------------|-----|-------------------|
| Gravimetric (reference) | 3 | **678 µL** (−32.2 %) | 4.5 % | **3.39** |
| Flow sensor (integrated) | 5 | 600 µL (−40.0 %) | 17.6 % | 3.00 |

- **Assumed 5.0 µL/stroke is wrong** — true rate is **≈3.4 µL/stroke**
  (gravimetric, the absolute reference). The build under-dispenses ~32 %.
- Flow integration reads ~11.5 % below gravimetric — trust gravimetric for the
  absolute number, flow for dynamics (priming, ripple).
- This gap is the **motivation to redesign** (proto-02): more volume per stroke.

## Test plan & acceptance (design-side contract)

> **PENDING** — the standard per-prototype test-plan schema is being designed.
> See `.planning/notes/2026-06-15-prototype-test-schema-decision.md`. Until then
> this is a placeholder.

- **Setpoint grid (volume × flow):** TODO — which (µL, µL/min) points to test.
- **Pass targets per KPI:** TODO per this prototype. Candidate KPIs (from the app):
  `accuracy_pct`, `precision.cv_pct`, `pulsation.ripple_pct`,
  `transient.rise_time_s`, `drift.drift_slope`, 0–100 `score`.
- The matching **test report** is emitted in `03. CODING` and a distilled snapshot
  is copied back into this folder once the schema is agreed.

## Test data (forward links → 03. CODING)

- Calibration / manual check: `../../../03. CODING Thesis Out of Drive/manual-dispense-check/`
- Lab sessions: `../../../03. CODING Thesis Out of Drive/lab-data/` (link the
  specific `phase-*/SESSION.md` once a session is run against this prototype)

> Reciprocal link: add a "Prototype: proto-01" line to the relevant `SESSION.md`.

## Version log

- **v1 (this build)** — 5 µL/stroke target, measured ≈3.4 (gravimetric). Redesign decided.
- **v2 (planned)** — to be designed; capture new solver inputs here when started.

## Open decisions

- What geometry change closes the 5.0 → 3.5 gap (tube ID, occlusion, roller
  count)? → start a `/gsd:thread` in this repo when tackling the redesign.
