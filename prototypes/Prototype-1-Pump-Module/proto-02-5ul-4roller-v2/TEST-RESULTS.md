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

## R3 — Pump factorial

*Pending — 76 replicates captured in `Tests/Peristaltic Gap 1.52 V2.23/2026.07.23 - 1 - New tube 0.51 ID/` (per-replicate JSON: `measured_mass_g`, `duration_s`, `strokes`, `speed_rpm`). To be analysed per the spec below.*
