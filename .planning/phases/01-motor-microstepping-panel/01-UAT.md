---
status: complete
phase: 01-motor-microstepping-panel
source: [01-01-SUMMARY.md, 01-02-SUMMARY.md, 01-03-SUMMARY.md]
started: 2026-05-30T21:09:26.513Z
updated: 2026-05-30T21:09:26.513Z
---

## Current Test

[testing complete]

## Tests

### 1. Voltage and microstepping selects present
expected: Parameters panel shows Supply voltage (12 V / 24 V, default 12 V) and Microstepping (full / 1/2 / 1/4 / 1/8 / 1/16 / 1/32, default 1/8) dropdowns with correct EN labels.
result: pass
verified_by: playwright-auto

### 2. 16 table columns present
expected: Results table shows 10 original columns plus 6 new motor columns: Rollers contact, Steps/stroke, µL/step, Torque rim (g), FoS ³, Max step rate ⁴ (steps/s).
result: pass
verified_by: playwright-auto

### 3. Infeasible rows show dashes
expected: Roller counts that fail feasibility checks show — for all 6 motor columns. Feasibility reason (e.g. "hits boss") is shown in the Feasible column.
result: pass
notes: N=3 shows "✗ hits boss" with — in all 6 motor columns confirmed.
verified_by: playwright-auto

### 4. FoS traffic-light coloring
expected: FoS cell uses class ok (green) for ≥ 2.0, warn (amber) for 1.0–2.0, no (red) for < 1.0. Numeric value always visible regardless of color.
result: pass
notes: At 12V/1/8 step: N=4 1.53 warn, N=5 1.22 warn, N=6–12 no. At 24V: N=4 2.30 ok. All classes correct.
verified_by: playwright-auto

### 5. Motor math correct (torque rim + FoS)
expected: Torque rim = 4800 × torque_fraction × speed_derating / R × 10. FoS = torque_rim / (200 × rollers_contact). Values match formula at both 12 V and 24 V.
result: pass
notes: N=4 at 12V: torqueRim=612, FoS=1.53 ✓. N=10 at 24V: torqueRim=367, FoS=0.37 ✓. Math verified independently.
verified_by: playwright-auto

### 6. Voltage changes max step rate and FoS
expected: Switching 12 V → 24 V changes max step rate column 1333 → 2667 and improves FoS values via speed derating (derating = 1.0 at 24V since SP=2000 < 2667).
result: pass
notes: 12V: all rows show 1333. 24V: all rows show 2667. FoS values improve proportionally.
verified_by: playwright-auto

### 7. Dynamic Time column (microstepping-dependent)
expected: Switching microstepping mode changes the Time column. Full step should give 1/8 of the time vs 1/8 step (8× fewer steps per revolution).
result: pass
notes: 1/8 step N=10: 16.0s → full step N=10: 2.0s. Ratio = 8 = Mf(1/8)/Mf(full). ✓
verified_by: playwright-auto

### 8. RPM summary card
expected: A "Rotor speed" summary card shows RPM updating with step rate and microstepping. RPM = step_rate / steps_rev × 60.
result: pass
notes: At 1/8 step (1600 steps/rev), SP=2000: RPM = 2000/1600×60 = 75.0 ✓. Card present and labeled correctly.
verified_by: playwright-auto

### 9. IT translation — headers and labels
expected: Switching to IT translates all 6 new column headers and RPM card label. Voltage and microstepping param labels also translated. Numeric values and formulas unchanged.
result: pass
notes: Headers: Rulli contatto, Step/ciclo, μL/step, Coppia rim (g), FoS ³, Step rate max ⁴ ✓. RPM: "Velocità rotore" ✓. Volt: "Tensione alimentazione" ✓.
verified_by: playwright-auto

### 10. Notes block — all motor documentation
expected: Notes section documents the FoS formula with speed derating, max step rate formula + 12V/24V values, compression load range (50–200 g/roller), and Wantai 42BYGHW811 motor constants with torque-fraction table. Time footnote says "at the selected microstepping mode" (no hardcoded 6400 or 1/32).
result: pass
notes: All content confirmed in both EN and IT. IT time footnote: "nella modalità microstepping selezionata". No 6400 anywhere.
verified_by: playwright-auto

## Summary

total: 10
passed: 10
issues: 0
pending: 0
skipped: 0

## Gaps

[none]
