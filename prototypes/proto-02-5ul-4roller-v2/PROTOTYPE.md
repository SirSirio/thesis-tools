---
id: proto-02
slug: proto-02-5ul-4roller-v2
title: Prototype 2 — 5 µL 4-roller peristaltic (corrected geometry + gap sweep)
status: design-in-progress
created: 2026-06-17
updated: 2026-06-17
---

# Prototype 2 — 5 µL 4-roller peristaltic (corrected geometry + gap sweep)

The first build that is meant to **actually work to spec**. Proto-01 proved the concept and
validated the model but carried three known, fixable errors and never occluded the tube
without a hand-folded paper shim. Proto-02 corrects all three, makes the gap a **measured,
locked, repeatable** quantity, and runs a proper statistical characterization (n = 10) to
pin down the two remaining model unknowns — the true tube wall `w` and the inflation
factor `k`.

> **This is a correction-and-characterization build, not an open research question.** The
> design space is largely fixed by the proto-01 diagnosis; the work is executing the fixes
> cleanly and measuring carefully.

---

## 1. Purpose

- **Hit a known, acceptable volume.** Deliver ~5 µL/stroke (ideally 5.0), but — equally
  acceptable — deliver a *consistent, known* volume that can be **calibrated by step count**.
  Because the device spec is **±10 %, not more than ±10 µL** over an accumulated dispense,
  the binding requirement is **low stroke-to-stroke CV**, not a perfect mean. A pump that
  reliably gives 5.2 µL/stroke is fine: command 192 strokes instead of 200.
- **Fix the three proto-01 errors** (N_c, gap, head lock — see §4).
- **Make the gap a measured quantity.** Add caliper-access slots to the pump head so the
  *real* installed gap can be read, not inferred from the nominal CAD dimension.
- **Pin down `w` and `k`.** Measure the tube wall properly *before* testing; back-calculate
  the effective `k` from clean post-fix data (proto-01 could not — two error sources were
  confounded).
- **Understand the gravimetric-vs-flow gap.** With a solid, correctly-occluding build,
  investigate *why* gravimetric reads higher than the integrated flow sensor (low-flow
  tails, zero-threshold cutoff, sensor bias) — a measurement-method finding in its own right.

---

## 2. Targets & pass criteria (the explicit goal)

| Quantity | Target | Notes |
|----------|--------|-------|
| Mean volume / stroke | ~5.0 µL (≥ ~4.5 acceptable) | Exact value less important than *knowing* it |
| **Stroke-to-stroke CV** | **≤ 5 %** (stretch ≤ 3 %) | At CV 5 %, σ over 200 strokes ≈ ±7 µL (95 %) → inside the ±10 µL cap. **This is the real pass gate.** |
| Mean known to | ~±2 % | So step-count calibration lands the accumulated volume inside ±10 % / ±10 µL |
| Head-lock gap repeatability | gap drift < 0.10 mm over 10 reinstalls | If it drifts more, the lock is the error source, not the gap |

> Benchmark context: a good **pipette** at 5 µL holds CV ≈ 1.5–3 % (ISO 8655). The device
> *replaces a person pipetting by hand*, so the pipette is the fair comparator. Proto-01 was
> already CV 4.5 % despite its errors. See `.planning/notes/2026-06-17-dispensing-accuracy-standards.md`.

---

## 3. Parameters — as designed (inputs for the build)

Corrected with the [Rotor Geometry Solver](../../tools/rotor-solver/index.html) and the
[Displaced-Volume Model](../../tools/peristaltic-roller-displaced-volume-model/index.html),
now with **N_c = 2**.

| Parameter | Value | Why / change from proto-01 |
|-----------|-------|----------------------------|
| Target volume / stroke | 5.0 µL | Unchanged |
| Roller count `N` | 4 | Unchanged — discrete-dosing rationale (proto-01 §3a); proto-02 is the first build that can *test* it |
| **Rollers engaged `N_c`** | **2** | **FIXED** — 180° arc with 4 rollers always has 2 engaged (was wrongly 1) |
| Tube inner diameter `d` | 0.51 mm | Unchanged (Darwin 2-stop Puri-Clear LL) |
| Tube wall `w` | **measure first** (~0.85 mm prior est.) | Highest-leverage unknown — microscope cross-section before testing |
| Roller bearing | MR105ZZ, 10 mm OD (`R_r` = 5 mm) | Unchanged |
| Interference `δ` (nominal) | 0.20 mm | Unchanged design point |
| Inflation factor `k` | 1.15 (provisional) | **Do not change yet** — back-calculate from clean proto-02 data |
| **Rotor radius `R`** | **≈ 19.7 mm** | **Recomputed** with N_c = 2 (was 17.70) — see §5 |
| **Gap `G` — head sweep** | **1.25 / 1.45 / 1.65 / 1.85 mm** | **NEW** — 4 interchangeable heads, 0.20 mm steps (see §6) |
| Head lock | **screw clamp** (provisional) | **NEW** — simplest to test; final mechanism chosen after params settle |
| Loose-fit tolerance | **0.10 mm** | Tightened from 0.25 mm, paired with the lock |
| Steps / stroke (firmware) | recalibrate to new `R` | Was 50; re-derive for the larger rotor |
| Microstepping / speed | 1/4 step @ 2400 steps/s (180 RPM) | Port the proto-01 §9 bench result into production firmware |

---

## 4. What proto-02 fixes (drivers from the proto-01 diagnosis)

1. **`N_c` = 1 → 2.** Rotor was undersized by ~2 mm. Corrected to R ≈ 19.7 mm.
2. **Gap never occluded (1.75 > 1.70 mm walls-kiss).** Now a deliberate, *measured* gap
   sweep around `2w − δ`, with caliper-access slots to read the installed value.
3. **No head lock + 0.25 mm wobble.** Screw clamp + 0.10 mm fit → the gap becomes
   repeatable, which is what makes the gap sweep meaningful at all.

Plus the tube-installation fixes (reposition holders, tighten holes, add a retainer shield)
and the firmware noise fix (1/4 step). Full brief: proto-01 `PROTOTYPE.md` §11.

---

## 5. Corrected geometry calculation

With **N_c = 2**, δ = 0.20 mm, k = 1.15, d = 0.51 mm, R_r = 5 mm, vol = 5.0 µL:

```
A     = π(d/2)²            = 0.2043 mm²
L_c   = k·2√(2 R_r δ)      = 1.15·2·√(2·5·0.20)   = 3.253 mm
ΔArc  = N_c · L_c          = 2 · 3.253            = 6.506 mm   ← was 3.253 (N_c=1)
arc   = vol/A + ΔArc       = 24.48 + 6.506        = 30.98 mm
geomVol = arc · A          = 30.98 · 0.2043       = 6.33 µL (gross; net 5.0)
R     = N · arc / (2π)     = 4 · 30.98 / (2π)     = 19.72 → 19.7 mm
```

**Rotor radius 17.70 → 19.7 mm.** Re-run both tools and transcribe the gap prescription
`G = 2w − δ` into CAD this time (the proto-01 workflow failure was *not* carrying the tool's
gap value into the model).

---

## 6. The gap sweep — design of the key experiment

`w` is uncertain (~0.85 mm ± unknown), and `w` sets the gap via `G = 2w − δ`. Rather than bet
on one gap, print **4 interchangeable pump heads** spanning the plausible `w` range:

| Head | Nominal `G` | Intent (at w ≈ 0.85) |
|------|-------------|----------------------|
| H1 | 1.25 mm | Over-squeeze (δ_eff ≈ 0.45) — sanity high-occlusion point |
| H2 | 1.45 mm | Near design (δ_eff ≈ 0.25) |
| H3 | 1.65 mm | Light squeeze (δ_eff ≈ 0.05) — near walls-kiss |
| H4 | 1.85 mm | At/just past walls-kiss — occlusion → ~0 (model floor check) |

**Why 0.20 mm steps (wider than the proto-01 brief's 0.15 mm):** the Bambu P1S prints slot
gaps to ~±0.05–0.10 mm. At 0.15 mm steps two adjacent heads can print indistinguishably; at
0.20 mm the model predicts a clear ~0.5 µL volume separation per step, resolvable over n = 10.
**[Likely]**

**Critical — measure the real gap, don't trust the nominal.** Each head gets **3 caliper-access
slots at the tube midline, spaced across the 180° arc** (the two arc ends = "sides" + the apex
= "top"). This reveals (a) the true installed gap per head and (b) whether the backing wall
**bows** under clamp load (gap non-uniform around the arc). The test result is recorded as
*"measured gap = X → delivered Y µL"*, not *"nominal gap = X"*.

---

## 7. Planned experiments

> Run order **randomized** (Sirio has an app for this) and, where possible, **tube wear
> controlled** — interleave heads or use a fresh tube section per head, because silicone
> hysteresis means `w_eff` drifts with compression cycles and would otherwise confound the
> gap sweep.

| # | Experiment | Method | n | Output |
|---|-----------|--------|---|--------|
| E1 | **Wall thickness `w`** | Cut a cross-section, image under microscope (fallback: micrometer OD → `w = (OD − d)/2`) | ≥3 sections | True `w` + its spread; feeds the model |
| E2 | **Gap sweep → volume** | Gravimetric: dispense fixed stroke count, weigh, per head; record *measured* gap | 10 / head | Mean µL/stroke vs measured gap; pick best head |
| E3 | **Precision (CV)** | Same setup, repeated | 10 / head | CV per head — the pass gate (≤ 5 %) |
| E4 | **Head-lock repeatability** | Snap head in/out, caliper the gap at the 3 slots each time | 10 reinstalls | Gap drift on reinstall; bowing/asymmetry around arc |
| E5 | **Back-calculate `k`** | Invert the model from E2 mean volume + E1 `w` + E2 measured gap | — | Effective `k` for this tube (confirm/correct 1.15) |
| E6 | **Gravimetric vs flow** | Run E2 with the flow sensor logging; compare integrated flow to the weighed mass | subset | *Why* flow under-reads (low-flow tails, zero threshold, bias) — method finding |
| E7 | **Step-skip check** | Confirm 1/4 step @ 180 RPM doesn't skip under the real 2-roller load, head locked | — | Open-loop reliability at the chosen operating point |

**Why n = 10:** matches ISO 8655's minimum for a credible accuracy + precision claim; n = 5
leaves the CV estimate too uncertain (~±40 %) to support the thesis claim.

---

## 8. Morphological analysis — relevance

For proto-02 the design is largely **pre-determined by the proto-01 fixes**, so a full
morphological chart is **not warranted**. The one genuine open choice is the **head-lock
mechanism** (screw clamp / cam lever / magnetic / snap-fit). Provisional pick: **screw clamp**
— most controllable, most reproducible clamping force, easiest to test — with the final choice
deferred until the geometry parameters are settled. The morphological method earns its keep at
**proto-04 (multi-liquid mechanism)**, where the design space is genuinely open.

---

## 9. Open questions / risks

- **True `w`** — the dominant model unknown (E1 resolves it). `[High leverage]`
- **Effective `k`** for this specific tube — provisional 1.15, confirmed only by E5. `[Likely OK]`
- **Tube wear / hysteresis** confounding the gap sweep if not controlled (interleave or fresh
  sections — see §7). `[Real risk]`
- **Backing-wall bowing** under clamp load making the gap non-uniform around the arc (E4 detects). `[Possible]`
- **System-level effects deferred:** backpressure from a downstream needle/syringe and tubing
  dead volume will shift calibration in the assembled device — not tested at pump-only stage,
  flagged for a later integration prototype. `[Likely small at 5 µL / short tubing]`
- **Ambition note:** the open-loop, no-feedback precision goal rests entirely on dimensional
  stability + calibration; at 5 µL, ±10 % = ±0.5 µL, which a single stroke will not hit
  open-loop — so small *commanded* volumes rely on stroke-count averaging. State this
  explicitly in the thesis. `[Certain]`

---

## 10. Version log

- **v1 (planned, this file)** — corrected N_c = 2 (R ≈ 19.7 mm), 4-head gap sweep
  (1.25/1.45/1.65/1.85 mm) with caliper-access slots, screw-clamp head lock, 0.10 mm fit,
  tube-retention fixes, 1/4-step firmware. Targets: mean ~5 µL *known*, CV ≤ 5 %. Design
  in progress; not yet built or tested.

---

## 11. Test data (forward links → 03. CODING)

- Calibration / gap sweep: `03. CODING/manual-dispense-check/proto-02-5ul-4roller-v2/`
  (to be created once the build is tested).
- Reciprocal link: add a "Prototype: proto-02" line to the relevant `SESSION.md`.
