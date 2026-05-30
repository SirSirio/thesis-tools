# Phase 1: Motor & Microstepping Panel - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-30
**Phase:** 1-Motor & Microstepping Panel
**Areas discussed:** Layout, Step rate integration, Torque margin thresholds, Output column set

---

## Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Extend the table | Add motor columns to each row; motor inputs in parameters panel | ✓ |
| Second panel below (smallest feasible R) | Separate glass panel anchored to auto-selected roller count | |
| Second panel below (user picks roller count) | Separate panel with roller-count selector | |

**User's choice:** Extend the table  
**Notes:** User framed the motor panel as "a second screening dimension" — being able to filter/compare designs by motor capability alongside geometry. Keeping everything in one table makes that comparison direct and immediate.

---

## Step Rate Integration

| Option | Description | Selected |
|--------|-------------|----------|
| Keep one shared slider | Step rate slider stays in parameters panel, drives both Time column and motor outputs | ✓ |
| Two separate inputs | Keep existing slider for Time; add separate field in motor panel | |

**User's choice:** Keep one shared slider  
**Notes:** User explicitly noted that the Time column must recalculate when microstepping mode changes, because each microstepping mode changes the number of steps per revolution (and therefore the steps per stroke and total time). The current hardcoded `6400` (1/32 mode) must be replaced with `200 × M_factor`.

---

## Torque Margin Thresholds

| Option | Description | Selected |
|--------|-------------|----------|
| FoS ≥ 2.0 against worst-case 1000 g | Conservative, accounts for load uncertainty | |
| FoS ≥ 2.0 against typical 500 g | More lenient | |
| Show both numbers, let user judge | Numeric FoS + load range side by side, no colour threshold | |
| Traffic light on FoS with both numbers shown | FoS coloured, numeric value also displayed | ✓ |

**User's choice:** Show both the numeric FoS value and a traffic-light colour. Red at ~0.5 worst-case (FoS < 1.0). User wanted to be able to read and consider red rows — not hide them.  
**Notes:** User was not familiar with FoS as a concept; a plain-language explanation was provided. User confirmed they want the formula and threshold explained on the page itself (documentation principle). FoS denominator = 200 g × rollers_in_contact (worst-case per-roller × simultaneous rollers), not a fixed 1000 g. This makes the FoS geometry-aware.

Research confirmed: standard engineering FoS for uncertain loads is 1.5–2.0. Thresholds: green ≥ 2.0, amber 1.0–2.0, red < 1.0.

---

## Output Column Set

**User's choice (consolidated):** Six new columns + one updated existing column + one new summary card  
**Notes:** User asked whether simultaneous rollers in contact was accounted for — it is now a column and feeds the FoS denominator. User also asked to add max theoretical step rate as a column for quick visual comparison.

Final column set agreed:
1. Rollers in contact — `floor(N/2)`
2. Steps/stroke — `(200 × M_factor) / N`
3. µL/step — `vol × N / (200 × M_factor)`
4. Torque at rim (g) — `4800 × fraction / R_mm × 10`
5. FoS — `torque_at_rim / (200 × rollers_in_contact)`, traffic-light
6. Max step rate (steps/s) — from V and L/R, same for all rows

Updated: Time column uses actual microstepping mode instead of hardcoded 6400.
New card: RPM = `step_rate / (200 × M_factor) × 60`.

---

## Tool Isolation Principle (raised during discussion)

User stated that each tool should be self-contained — specs and constants live inline in the tool's HTML, not in shared files. Only `assets/style.css` is shared across tools. This is a **project-wide principle** captured in CONTEXT.md D-14 and added to PROJECT.md.

---

## Claude's Discretion

- Column ordering within the table (motor columns after Feasible column, or interleaved)
- Exact max step rate formula (DRV8825 L/R chopper ceiling at 12V and 24V)
- Amber CSS token (`.warn`) placement in inline `<style>` block

## Deferred Ideas

- **Motor selector** — user mentioned future dropdown to switch between motor models; constants would update accordingly. Deferred: not in this phase.
- **Switching strategy output** — bulk + fine dispense strategy display. Deferred: no operating point chosen yet.
