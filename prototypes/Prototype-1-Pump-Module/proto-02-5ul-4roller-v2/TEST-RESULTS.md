# Proto-02 v2.3 — Test Results Log

Companion to [`TEST-PROTOCOL.md`](TEST-PROTOCOL.md) (method & rationale). This file records **measured data** as the campaign runs. Mass→volume uses 1 mg ≈ 1 µL for water (Z-factor ≈ 0.997 µL/mg at 25 °C → ~+0.3 %, below the noise, omitted per §7 deviations).

> Tags: `[Certain]` (from the numbers) · `[Likely]` (supported inference) · `[Guessing]` (to confirm).

---

## R1 — Pipette reference (the human benchmark)

**Date:** 2026-07-23 · **Setup:** two pipettes (one set to 5 µL, one to 50 µL); **the same tip was reused across all 10 shots of each** — so this is *pipette + technique repeatability* with **tip-to-tip variation excluded**, and the reuse pre-wets the tip after shot 1. Weighed on the 0.1 mg balance, same boat/method as the pump will use.

### R1.1 Raw data (delivered mass, g)

Values are shown at the balance's full resolution — **4 decimal places (0.1 mg)**, exactly as read off the display.

| # | 5 µL | 50 µL |
|---|------|-------|
| 1 | 0.0050 | 0.0491 |
| 2 | 0.0050 | 0.0494 |
| 3 | 0.0050 | 0.0494 |
| 4 | 0.0048 | 0.0495 |
| 5 | 0.0049 | 0.0494 |
| 6 | 0.0049 | 0.0494 |
| 7 | 0.0049 | 0.0495 |
| 8 | 0.0049 | 0.0494 |
| 9 | 0.0048 | 0.0495 |
| 10 | 0.0049 | 0.0496 |

*(Row 2 of the 5 µL column was recorded as `0.0500` — a transcription typo for `0.0050`, corrected here; it is a normal reading, not an outlier.)*

### R1.2 Statistics

| Series | n | Mean | SD | **CV** | Scale-limited? |
|--------|---|------|-----|--------|----------------|
| **5 µL** (all) | 10 | 4.91 µL | 0.074 µL | **1.50 %** | **YES** — see below |
| **50 µL** (all) | 10 | 49.42 µL | 0.132 µL | **0.27 %** | no |
| 50 µL (minus 1st shot) | 9 | 49.46 µL | 0.073 µL | 0.15 % | no |

### R1.3 What this tells us

**The 50 µL CV is real, and it is the benchmark. [Certain]**
At 50 µL the delivered mass is ~494 balance counts, so resolution contributes only ~0.02 % — the scale is *not* limiting, and the measured **CV ≈ 0.27 %** (0.15 % excluding the first shot) is the pipette's genuine repeatability. **This is the human benchmark the pump must beat.** It is far better than the ISO 8655 nominal (1.5–3 % at 5 µL) because tip-to-tip variation is excluded and the tip was pre-wetted.

**The 5 µL CV is NOT the pipette — it is the scale floor. [Certain]**
All ten 5 µL readings take only **three distinct values** (4.8 / 4.9 / 5.0 mg) — adjacent 0.1 mg counts. So the "scatter" is the balance quantising, not the pipette varying. The pipette's *true* CV (from the 50 µL data, ~0.15–0.27 %) would need SD ≈ 0.01 mg at 5 µL to see — 10× below what a 0.1 mg balance can resolve. **The measured 1.50 % is an upper bound set by the instrument, not a pipette property.**

> This is the whole premise of the protocol, confirmed with real data: **at 5 µL a 0.1 mg balance measures itself, not the device.** Precision must be read at higher volume (or via √N), never from single 5 µL weighings. It also means the **5 µL pump-vs-pipette head-to-head will likely be floor-limited on both sides** — if both land near ~1.4 %, they are indistinguishable, and the meaningful comparison is at the higher-volume / per-stroke level. `[Likely]`

**First-shot effect is visible. [Likely]**
The first 50 µL shot (49.1) sits ~0.3 mg below the rest, which then cluster tightly. Consistent with an **un-wetted tip on shot 1** — exactly why the protocol pre-wets ≥5× and discards a priming run. Real, small, and now evidenced in the data.

**Accuracy:** 5 µL pipette delivers 4.90 µL (−2 %), 50 µL delivers 49.4 µL (−1.2 %) — both slightly low but consistent, within pipette tolerance. Irrelevant to the CV argument, and it cancels in the same-scale comparison anyway.

### R1.4 Consequence for the pump comparison

Benchmark set: **manual pipetting ≈ 0.15–0.27 % CV at 50 µL** (tip fixed, pre-wetted). The pump's precision — back-calculated to a comparable volume via √N from its high-volume runs — is what gets compared against this. The direct 5 µL head-to-head stays in the protocol (it is the operating dose and the scale-cancellation still holds *if* anything rises above the floor), but **R1 already tells us the honest comparison lives at the higher-volume level**, not at a single 5 µL weighing. `[Likely]`

---

## R2 — Evaporation rate (session correction constant)

**Date:** 2026-07-23 · **Method:** water in the weigh boat, tared, mass loss recorded over a fixed exposure time (ISO 23783-2 D.5.2 blank principle).

| Exposure (s) | Loss (mg) | | Exposure | Loss |
|---|---|---|---|---|
| 30 | 2.7 | | 45 | 5.0 |
| 30 | 3.4 | | 60 | 6.2 |
| 45 | 5.7 | | 60 | 7.0 |
| 45 | 5.4 | | | |

**Linear fit:** loss = **E · t**, with **E = 0.118 mg/s (7.1 mg/min)**, intercept −0.27 mg (≈ 0 — loss is proportional to exposure, as it should be). `[Certain]`

**Why it matters — correction magnitude vs volume:**

| Dose | Handling | Evap loss | % of dose |
|------|----------|-----------|-----------|
| 5 µL (1 stroke) | ~20 s | 2.4 mg | **~47 %** ⚠ |
| ~400 µL (100 str) | ~30 s | 3.5 mg | ~0.9 % |
| ~1200 µL (300 str) | ~40 s | 4.7 mg | **~0.4 %** |

**Correction applied to every reading:** `m_corrected = measured_mass_g·1000 + E · duration_s` (mg), using the per-replicate `duration_s`. Negligible at high volume, dominant at 1 stroke → **reinforces that the single-stroke absolute value stays indicative; the trustworthy per-stroke comes from the high-volume slope.** `[Certain]`

*(The R1 pipette 5 µL readings were **not** evaporation-corrected, so they carry an additional low bias on top of the scale floor — irrelevant to that section's conclusion since 5 µL was floor-limited regardless.)*

---

## R3 — Pump factorial (new tube, gap 1.52)

**Date:** 2026-07-23 · **Dataset:** 76 replicates, `Tests/.../2026.07.23 - 1 - New tube 0.51 ID/`.
**Corrections applied:**
- **Evaporation:** exposure = **dispense time** (operator reads immediately, τ ≈ 0), `dispense_time = strokes × 200 / speed_steps_sec` (200 steps/stroke = ¼ rev at ms4, derived from the timing data). `m_corr = measured_g·1000 + E·dispense_time`, E = 0.118 mg/s (R2). **Not** the file `duration_s`, which includes breaks. Correction is < 0.7 % everywhere.
- **Mass→volume:** ρ = 0.997 mg/µL.

### R3.1 Excluded flyers (5 of 76)

| Cell | Dropped per-stroke (µL) | Likely cause |
|------|-------------------------|--------------|
| 1 str @ 120 | 41.1, 43.1, 0.0 | 41/43 = a large blob / wrong mass; 0.0 = missed dispense or un-tared |
| 100 str @ 120 | 14.6 | ~3× high — a 300-stroke mass mis-logged under a 100-stroke run |
| 100 str @ 180 | 14.6 | same |

Rejection rule: per-stroke value > 25 % from the cell median. **Data-quality note:** these are gross mis-records, not pump behaviour — worth a look at the capture procedure (auto-log the mass, or a sanity range check).

### R3.2 Accuracy — the pump delivers ~91 % of nominal (the −41 % was the old tube)

Per-stroke volume is **stable across volume and speed at ≈ 4.55 µL/stroke = 91 % of the 5 µL nominal.**

| Speed | 1 str | 100 str | 300 str |
|-------|-------|---------|---------|
| 60 rpm | 4.31 | 4.594 | **4.608** |
| 120 rpm | 4.11* | 4.555 | **4.557** |
| 180 rpm | 4.56 | 4.525 | **4.530** |
| 240 rpm | — | 4.495 | **4.513** |

*(1-stroke noisy: n small, scale-limited. 100- and 300-stroke agree to <0.5 % at each speed → good linearity, no large fixed offset.)*

> **Key finding:** this **supersedes the −41 % in §8.2.** That figure came from the old, unconditioned tube in a non-stationary run. A fresh tube, pre-wetted, run to stationarity, delivers **~4.55 µL/stroke (−9 %)** — a deficit that is **fully calibratable** by step count. The pump is close to nominal and predictable. `[Certain]`

### R3.3 Speed — best precision at 180 rpm (the original guess was right)

```
per-stroke volume vs speed (300-str)      CV vs speed (300-str, ~1.35 mL delivery)
 uL/                                        CV%
4.61┤●                                     0.9┤●  60rpm
4.58┤   ●                                  0.6┤
4.55┤       ●                              0.4┤      ●       ●   ← 120/240
4.52┤            ●                         0.3┤          ●       ← 180 = best
    └──┬───┬───┬───┬─ rpm                     └──┬───┬───┬───┬─ rpm
      60 120 180 240                            60 120 180 240
  mild refill droop: -2.0% over 60->240     precision optimum at 180 rpm
```

- **Accuracy vs speed:** mild monotonic droop, **−2.0 % from 60→240 rpm** — a gentle refill effect, no sharp knee. `[Likely]`
- **Precision vs speed:** delivery CV is **lowest at 180 rpm (0.34 %)**, worse at 60 (0.82 %, longer run = more drift) and slightly worse at 240 (0.45 %). **180 rpm is the sweet spot** — best precision, high throughput, only 1.7 % below the slow-speed volume. The assumed operating speed turns out to be optimal. `[Likely]`

### R3.4 Precision — excellent for multi-stroke; single-stroke bounded

| Metric | Value |
|--------|-------|
| **Delivered-volume CV, 300 str (~1.35 mL) @ 180 rpm** | **0.34 %** (directly measured, scale not limiting) `[Certain]` |
| Same across speeds | 0.34 – 0.82 % |
| Pipette benchmark (R1, 50 µL) | 0.27 % |
| Single-stroke CV (√N upper bound) | ~6 % @ 180 — **upper bound only** |

The **multi-stroke delivery precision (~0.3–0.8 %) is pipette-class** — the pump reproduces a ~1.5 mL dose about as consistently as a calibrated hand pipette reproduces 50 µL.

**On the single-stroke CV — read carefully.** The √N back-calc gives ~6 %, but it is an **upper bound, not the value.** The 300-stroke collection CV mixes averaged single-stroke randomness (which *does* fall as 1/√N) with **run-to-run drift** (tube hysteresis, temperature over the ~1 h session) that does *not*. So the true per-stroke CV sits **below** 6 % — a rough decomposition puts it nearer 3–4 %, but it **cannot be separated with this data** and the 0.1 mg balance cannot measure it directly. Honest statement: *single 5 µL dose precision is not directly measured; bounded above ~6 %, likely better.* `[Likely]`

### R3.5 What this establishes

- ✅ **Accuracy:** ~4.55 µL/stroke, stable, 91 % of nominal → calibratable to target by step count. The −41 % scare was a tube/procedure artifact.
- ✅ **Operating point:** **180 rpm** confirmed as the precision optimum with good throughput.
- ✅ **Multi-stroke precision:** ~0.3 % CV — pipette-class, comfortably inside any dosing spec for doses of tens of strokes.
- ⚠ **Single-stroke precision:** bounded ~6 %, likely 3–4 %, not directly resolvable on this balance — the one open question for a discrete single-dose device, flagged for a finer-balance or photometric follow-up.
- ⚠ **5 mis-recorded masses** out of 76 → tighten the capture procedure.
