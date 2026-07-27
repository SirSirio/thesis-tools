# Evaporation calibration — Peristaltic Gap 1.52 V2.23

Water evaporates from the collection vessel while the dispensed liquid is on the
balance, so the weighed mass **underestimates** the true dispensed mass. This
folder holds the evaporation measurement and the constants used to correct every
gravimetric reading in this experiment.

## Measurement

A water sample was left on the balance and its mass loss recorded over fixed
intervals (raw data in `evaporation_measurements.csv`):

| time (s) | mass loss (mg) |
|---------:|---------------:|
| 30 | 2.7 |
| 30 | 3.4 |
| 45 | 5.0 |
| 45 | 5.4 |
| 45 | 5.7 |
| 60 | 6.2 |
| 60 | 7.0 |

## Fit → evaporation rate E

Linear regression of mass loss vs. time:

- **With intercept (used):** slope = **0.1183 mg/s**, intercept = −0.268 mg, **R² = 0.906**.
- Through-origin (reference): 0.1127 mg/s, R² = 0.903.

**E = 0.118 mg/s** (from the with-intercept slope) is adopted as the evaporation rate.

## Constants used in the analysis

| symbol | value | meaning / source |
|---|---|---|
| **E** | 0.118 mg/s | evaporation rate (regression slope above) |
| **ρ** | 0.997 mg/µL | density of water at ~25 °C (state the temperature with any result) |
| pipette benchmark | 0.27 % CV @ 50 µL | reference precision (R1) |

## How the correction is applied

For each replicate, using the **calculated dispensing time** (not the recorded
`duration_s`, which includes variable weighing/handling overhead):

```
t_dispense_s = 15 · strokes / speed_rpm     # 1 stroke = 90° = ¼ motor rev
m_corr_mg    = measured_mass_g · 1000 + E · t_dispense_s
V_uL         = m_corr_mg / ρ
```

Because the dispensing time scales with strokes, the evaporation correction is a
**roughly constant ~1 % of mass across all cells** — it is *not* the dominant
error on the 1-stroke rows. The 1-stroke rows are limited instead by the balance
resolution (scale floor) and are treated as indicative checks, not calibration
points (the headline per-stroke volume comes from the V-vs-strokes slope).
