# Rotor Geometry Solver — Tool Spec

**Tool:** Peristaltic Rotor Geometry Solver  
**File:** `tools/rotor-solver/index.html`  
**Status:** Live — motor panel in progress (Phase 1)

---

## Purpose

Solves rotor radius analytically for a target stroke volume. Checks roller collision, hub clearance, and tube length feasibility across roller counts 3–12. With the motor panel, also screens each roller-count configuration against motor torque and microstepping operating points.

---

## Inputs

| Input | ID | Type | Range | Default |
|-------|----|------|-------|---------|
| Delivered volume / stroke | `volN` | number | 1–25 µL | 5 µL |
| Tube inner diameter | `idSel` | select | 0.25 / 0.51 / 0.76 / 1.02 / 1.14 mm | 0.51 mm |
| Roller bearing OD | `bSel` | select | 625-2RS = 16 mm, MR105ZZ = 10 mm | 16 mm |
| Occlusion efficiency | `occS` | range | 0.60–1.00 | 0.85 |
| Shaft boss diameter | `bossS` | range | 8–24 mm | 14 mm |
| Step rate | `spS` | range | 200–6000 steps/s | 2000 steps/s |
| Supply voltage *(motor panel)* | `voltSel` | select | 12 V / 24 V | 12 V |
| Microstepping mode *(motor panel)* | `msSel` | select | full / 1/2 / 1/4 / 1/8 / 1/16 / 1/32 | 1/8 |

---

## Geometry Outputs (per roller count N ∈ {3, 4, 5, 6, 8, 10, 12})

### Derived constants
```
A         = π × (ID/2)²             — tube cross-section area (mm²)
geomVol   = vol / occ               — geometric swept volume per stroke (µL)
arcNeeded = geomVol / A             — arc length each roller must sweep (mm)
rollerR   = bearingOD / 2           — roller radius (mm)
bossR     = bossD / 2               — shaft boss radius (mm)
```

### Per-row calculations
```
R         = N × arcNeeded / (2π)    — rotor radius, rounded to 0.1 mm (Bambu P1S resolution)
OD        = 2 × R                   — rotor outer diameter (mm)
tubeArc   = π × R                   — tube arc length (mm)
arcGap    = arcNeeded − bearingOD   — clearance between rollers (mm); must be > 0
hubClr    = (R − rollerR) − bossR  — clearance between roller and motor boss (mm); must be > 0
strokes   = 1000 / vol              — strokes needed to dispense 1000 µL
steps_rev = 200 × M_factor          — steps per revolution at selected microstepping
totalSteps= strokes × (steps_rev / N)
time      = totalSteps / SP         — dispense time for 1000 µL (s)
```

### Feasibility checks
| Check | Condition | Fail label |
|-------|-----------|------------|
| Roller collision | arcGap > 0 | "rollers overlap" |
| Hub clearance | hubClr > 0 | "hits boss" |
| Tube length | tubeArc ≤ 300 mm | "tube too short" |

Note: 300 mm tube limit based on movable stoppers (Marius confirmed).

---

## Motor Panel Outputs (per roller count, Phase 1 addition)

### Motor constants — Wantai 42BYGHW811 / DRV8825
| Parameter | Value |
|-----------|-------|
| Steps / rev (full step) | 200 (1.8°/step) |
| Holding torque | 4800 g·cm (0.47 N·m) — static, both phases energised, full current |
| Rated current | 2.5 A/phase |
| Winding resistance | 1.25 Ω/phase |
| Winding inductance | 1.8 mH/phase |
| L/R time constant | τ = 1.8 mH / 1.25 Ω ≈ 1.44 ms |
| Shaft | 5 mm D-shaft |
| Driver | DRV8825, 8.2–45 V motor supply, up to 1/32 microstepping |

### Microstepping factors (M_factor)
| Mode | M_factor | Steps/rev | Torque fraction |
|------|----------|-----------|-----------------|
| full | 1 | 200 | 1.00 (100%) |
| 1/2 | 2 | 400 | 0.70 (70%) |
| 1/4 | 4 | 800 | 0.50 (50%) |
| 1/8 | 8 | 1600 | 0.35 (35%) |
| 1/16 | 16 | 3200 | 0.20 (20%) |
| 1/32 | 32 | 6400 | 0.10 (10%) |

Torque fractions are approximate values for the DRV8825 sinusoidal current profile.

### Per-row motor calculations
```
rollers_contact = floor(N / 2)                                                   — simultaneous rollers in 180° arc
steps_stroke    = (200 × M_factor) / N                                           — steps per stroke
uL_per_step     = vol × N / (200 × M_factor)                                     — volume resolution (µL/step)
max_step_rate   = V_supply / (2 × L × I_rated)                                   — inductive ceiling (steps/s); 12 V → 1333, 24 V → 2667
speed_derating  = min(1, max_step_rate / step_rate)                              — < 1 when operating above inductive ceiling; voltage- and speed-dependent
torque_rim      = 4800 × torque_fraction × speed_derating / R_mm × 10            — effective torque at rim (g); reduced at high speed or low voltage
FoS             = torque_rim / (200 × rollers_contact)                            — factor of safety vs worst-case compression load
```

**FoS colour thresholds:**
- ≥ 2.0 → green (adequate margin for uncertain loads — standard engineering practice)
- 1.0–2.0 → amber (functional but tight)
- < 1.0 → red (insufficient — stall likely under worst-case load)

Both the numeric FoS value and the colour are shown. Red rows are not hidden — they remain readable for comparison.

**Worst-case compression load basis:**
- Per-roller compression: 50–200 g (0.51 mm soft PVC microbore tube, estimated)
- Worst-case per row: 200 g × rollers_contact
- Typical per row: ~100 g × rollers_contact

**Max step rate and speed derating:**
- Inductive ceiling: f_max = V_supply / (2 × L × I_rated) → 1333 steps/s @ 12 V; 2667 steps/s @ 24 V
- Above this ceiling, current cannot reach rated value in one step period → effective torque reduced
- speed_derating = min(1, f_max / step_rate) is applied to torque_rim and propagates into FoS
- Higher voltage raises the ceiling, increasing effective torque at the same operating step rate
- Example: at SP = 2000 steps/s → derating = 0.67 @ 12 V, 1.00 @ 24 V

### Summary card (not per-row)
```
RPM = step_rate / (200 × M_factor) × 60
```

---

## Known values at Proto 1 design point (10 rollers, R ≈ 39 mm)

| Quantity | Value | Condition |
|----------|-------|-----------|
| Rotor radius | ~39 mm | — |
| Rollers in contact | 5 | — |
| Vol / full step | ~0.25 µL/step | sufficient for ±10% at 5 µL min dispense |
| Torque at rim (full step) | ~1231 g | 24 V, SP ≤ 2667 (derating = 1.0) |
| Torque at rim (full step) | ~821 g | 12 V, SP = 2000 (derating = 0.67) |
| Torque at rim (1/8 step) | ~431 g | 24 V, SP ≤ 2667 (derating = 1.0) |
| Torque at rim (1/8 step) | ~287 g | 12 V, SP = 2000 (derating = 0.67) |
| FoS (full step) | ~1.23 — amber | 24 V, SP ≤ 2667 |
| FoS (full step) | ~0.82 — red | 12 V, SP = 2000 |
| FoS (1/8 step) | ~0.43 — red | 24 V, SP ≤ 2667 |
| FoS (1/8 step) | ~0.29 — red | 12 V, SP = 2000 |
| Time @ 1/8 step, 1500 steps/s | ~21 s for 1000 µL | within 60 s target |

---

## Assumptions

- 180° contact arc (half the rotor circumference is the active pumping zone)
- Rollers equally spaced around 360°
- Rotor radius rounded to 0.1 mm (limited by Bambu P1S print resolution, PLA material for first test prints)
- Tube available length = 300 mm (movable stoppers, confirmed by Marius)
- Occlusion efficiency is uniform across the arc
- Motor torque fractions are approximate (sinusoidal current profile, DRV8825)
- Compression load estimate (50–200 g/roller) is for 0.51 mm soft PVC microbore tube; may differ for other tube materials or IDs

---

## Language support

Full ENG/IT translation via `data-i18n` attributes and inline `LANG` dictionary. All static labels translated; computed values and units are language-neutral.
