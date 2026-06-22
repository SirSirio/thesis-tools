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
| Tube wall `w` | **0.91 mm** (measured) | Microscope + caliper-OD + ISO/Ismatec standard all converge, 2026-06-22 — confirms proto-01's w≈0.90 inference. See `../Tube OD Thikness/tube-wall-thickness-analysis.md` |
| Walls-kiss `2w` / OD | **2w = 1.82 mm · OD = 2.33 mm** | `2w = OD − ID = 2.33 − 0.51`; matches Ismatec standard exactly; sets gap `G = 2w − δ` |
| Roller bearing | MR105ZZ, 10 mm OD (`R_r` = 5 mm) | Unchanged |
| Interference `δ` (nominal) | 0.20 mm | Unchanged design point |
| Inflation factor `k` | 1.15 (provisional) | **Do not change yet** — back-calculate from clean proto-02 data |
| **Rotor radius `R`** | **≈ 19.7 mm** | **Recomputed** with N_c = 2 (was 17.70) — see §5 |
| **Gap `G` — head sweep** | **1.72 / 1.62 / 1.52 mm** (target installed) | **NEW** — 3 heads at δ = 0.10/0.20/0.30, `G = 2w − δ` with measured 2w = 1.82; CAD nominal +FDM offset (see §6–§7) |
| Head lock | **screw clamp** (provisional) | **NEW** — simplest to test; final mechanism chosen after params settle |
| Loose-fit tolerance | **0.15–0.20 mm/side** | Was 0.25; **revised up from 0.10** — FDM undersizing makes 0.10 mm print as near-zero/interference (won't slide). Sliding fit for insertion, lock removes play. See §7 |
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

The sweep tunes the **interference** `δ = 2w − G` — how far the gap squeezes past the measured
walls-kiss `2w = 1.82 mm` (OD 2.33; microscope + caliper + ISO/Ismatec standard agree —
see [tube-wall-thickness-analysis](../Tube%20OD%20Thikness/tube-wall-thickness-analysis.md)).

### Delivery is leak-limited, not arc-limited (key correction from proto-01)

The displaced-volume model's arc-compensation term assumes the tube is **already fully sealed** —
it only describes the **over-squeezed** side. **Below the seal threshold the tube backflows, and a
*looser* gap leaks *more* → delivers *less*.** So delivery vs gap is a **hump**, not a line:

```
delivery ▲        ╭─●─╮   ← peak = loosest gap that still fully SEALS
         │      ╱      ╲____   over-squeezed: slow decline (arc loss + deformation)
         │    ╱  LEAK zone: looser = more backflow = LESS delivery
         └────────────────────► looser gap →
```

proto-01 operated **entirely on the leak (left) side** — which is exactly why tightening it (the
shim) gave *more*, and any looser gap gave *less*. **The optimum is the top of the hump: the
loosest gap that still fully seals** (max delivery, least over-squeeze and wear). The arc-compensation
model is only meaningful *right* of the peak.

### The sweep is run FIRM → LOOSE, hunting the peak

| Test order | δ | Target gap `G` | Sealed-regime model | Real expectation |
|------------|-----|----------------|---------------------|------------------|
| **1st (start firm)** | 0.30 | **1.52 mm** | ~4.70 µL | firmly sealed → real delivery; de-risks "does it pump" |
| 2nd | 0.20 | **1.62 mm** | ~5.00 µL | looser; if delivery **rises**, peak is here or looser |
| 3rd | 0.10 | **1.72 mm** | ~5.39 µL | likely **leaks** → delivery drops (≈ proto-01's marginal 1.75) |

Read the trend: delivery climbs as you loosen **until it doesn't** — that turning point is the
operating gap. If even 1.52 leaks → go firmer (1.42); if 1.72 still climbs → go looser. The
"sealed-regime model" column is the arc-compensation prediction (valid only past the seal point).
The **fixed rotor** (sized at δ=0.20) means each head delivers a different volume — a single-variable
(δ) sweep that characterizes **both** regimes (leak + sealed). 0.10 mm δ-steps clear the P1S print
tolerance so the heads come out distinct.

> **Superseded:** (1) a 4-head raw-gap sweep (1.25/1.45/1.65/1.85) — wider gaps don't all occlude;
> (2) an earlier loose→firm framing that assumed "looser = more delivery" — backwards below the
> seal threshold (see hump). proto-01's clean correction: **start firm.**

**Critical — measure the real gap, don't trust the nominal.** Each head gets **3 caliper-access
slots at the tube midline, spaced across the 180° arc** (the two arc ends = "sides" + the apex
= "top"). This reveals (a) the true installed gap per head and (b) whether the backing wall
**bows** under clamp load (gap non-uniform around the arc). The test result is recorded as
*"measured gap = X → delivered Y µL"*, not *"nominal gap = X"*.

---

## 7. Print process — orientation, tolerances & fits (Bambu P1S, 0.4 mm nozzle)

### 7.1 Orientation — print the arc FLAT in the bed plane (settled)

Print so the semicircular occlusion wall lies **flat in the build-plate plane** — the
channel/rotor axis points **straight up**, and the occlusion wall is a **vertical cylinder you
look straight down into**. Do **not** stand the head up with the arc climbing through the layers
("arc on the Z axis").

> **Label-free decision test:** does the semicircle lie *flat on the bed* (correct) or *stand up
> in a vertical plane* (wrong)? Flat = wall is a vertical cylinder; standing = curve built through
> stacked layers.

- **Flat (chosen):** every layer is the identical U-outline → the gap is an **XY dimension
  everywhere around the arc** (FDM's most accurate axis); the curve is smooth (XY motion, no
  stair-step); the roller travels *along* the horizontal layer rings (smooth); no overhang, no
  supports on the critical surface. **Bonus:** gap accuracy is **decoupled from layer height** →
  can print faster (0.12–0.16 mm) with no loss of gap precision.
- **Standing / arc-through-Z (rejected):** the bottom of the U tilts into the 30–60° worst
  stair-stepping band → gap stepped at the bottom, smooth at the sides → **non-uniform gap around
  the arc**; the roller climbs layer-to-layer → periodic occlusion ripple; overhang/supports land
  on the occlusion face.

### 7.2 Why orientation is a first-order driver — gap → volume sensitivity

The rotor is fixed (sized at δ=0.20); the head only changes δ = 2w − G. From the model, volume
responds to gap as:

**dVol/dG ≈ 3.4 µL per mm** (at δ=0.20)  →  **σ_vol ≈ 3.4 · σ_G**   `[Likely — model-based]`

So **gap control *is* the CV battle.** Orientation moves σ_G, hence CV:

| Orientation | σ_G around arc | σ_vol | CV on 5 µL |
|-------------|----------------|-------|------------|
| **Flat** (gap in XY, smooth wall) | ~0.03–0.05 mm | 0.10–0.17 µL | **2–3.4 %** ✓ |
| **Standing** (stair-step + supports) | ~0.08–0.15 mm | 0.27–0.51 µL | **5–10 %** ✗ |

This reframes "precision pump" as **"precision gap"**: orientation, the head lock, the slot fit,
and the measured-gap workflow are all one fight to shrink σ_G. (σ_G values `[Guessing-but-bracketed]`;
the 3.4 µL/mm lever is firm.)

### 7.3 P1S dimensional accuracy & fit clearances (0.4 mm nozzle)

General values, well-calibrated PLA/PETG, 0.4 mm nozzle:

| Quantity | Value | Note |
|----------|-------|------|
| Overall dimensional accuracy | **±0.1–0.2 mm** (≈ ±0.15 calibrated) | ±0.5 % / ±0.5 mm uncalibrated worst case; P1S ~0.1 mm in testing |
| Gaps/holes print **undersized** | by **0.1–0.3 mm** | nozzle oozes into the gap — comes out tighter than nominal; **systematic, calibratable** |
| Smallest resolvable gap | ~**0.05 mm not reproduced** (slicer skips with 0.4 nozzle) | below ~0.1 mm a modelled gap may not print as a gap |
| **Press / interference fit** | **−0.1 to −0.15 mm** (hole < pin) | force-together |
| **Snug / transition fit** | ~**0.0 to +0.1 mm** total | seats, then needs a push |
| **Sliding fit** (precise guidance) | **0.1–0.2 mm per side** (0.2–0.4 mm total) | moves with light play |
| **Loose / clearance fit** (free) | **0.3–0.5 mm per side** | free rotation/sliding |

### 7.4 Implications for proto-02

- **Calibrate the print, don't predict it.** The generic "holes print 0.1–0.3 mm tight" rule is
  for small enclosed holes; on this **large open concave channel** proto-01 evidence says the
  undersize is **small** (its 1.75 mm gap printed ≈ nominal). So **start the first (firm, 1.52 mm)
  head at nominal = target** — it doubles as the calibration head — caliper the 3 arc-slots,
  derive the offset (sign and size unknown until measured, but likely small), then apply it to the
  set. Every result is recorded vs **measured** gap, never nominal.
- **The 0.10 mm head-slot fit was too tight** — revised to a **sliding fit 0.15–0.20 mm/side**
  (a nominal 0.10 mm closes to ~0/interference after undersizing → won't slide). Clearance gets
  the head in; the **screw-clamp lock** removes the play during operation. `[Likely]`
- **Elephant's foot** tightens the **bottom of the channel** (along the axis) in the flat
  orientation → add a base chamfer or brim; caliper bottom-vs-top on the calibration head.

**Sources:** [Niro3D tolerances guide](https://www.niro3d.cz/en/blog/3d-printing-tolerances-accuracy-guide),
[3DPut fit guide](https://3dput.com/complete-guide-to-3d-printing-tolerances-and-fit-getting-perfect-clearance-for-moving-parts/),
[AON3D engineering fits](https://www.aon3d.com/applications/engineering-fits-how-to-design-for-3d-printed-assemblies/),
[Raphael Garcia — Bambu X1C fits](https://www.raphaelgarcia.me/blog/2024/9/9/tolerances-and-fits-in-3d-printing-how-to-get-it-right-with-your-bambu-lab-x1c),
[3Dnatives P1S test](https://www.3dnatives.com/en/3dnatives-lab-testing-the-bambu-lab-p1s-3d-printer-140920234/),
[Bambu forum — 0.05 mm gap not resolved with 0.4 nozzle](https://forum.bambulab.com/t/nozzle-size-p1s/40940),
[Xometry FDM tolerances](https://xometry.pro/en/articles/3d-printing-tolerances/).

---

## 8. Planned experiments

> Run order **randomized** (Sirio has an app for this) and, where possible, **tube wear
> controlled** — interleave heads or use a fresh tube section per head, because silicone
> hysteresis means `w_eff` drifts with compression cycles and would otherwise confound the
> gap sweep.

| # | Experiment | Method | n | Output |
|---|-----------|--------|---|--------|
| E1 | **Wall thickness `w`** ✅ done (2026-06-22) | Microscope (ruler-calibrated) + **caliper OD**, vs ISO/Ismatec standard | 3 wall + OD | **w = 0.91 mm, 2w = 1.82, OD = 2.33** — 3 lines converge; [analysis](../Tube%20OD%20Thikness/tube-wall-thickness-analysis.md); confirms proto-01's w≈0.90 inference |
| E2 | **Gap sweep → volume** (run **firm→loose**, 1.52→1.62→1.72) | Gravimetric: fixed stroke count, weigh, per head; record *measured* gap | 10 / head | Delivery-vs-gap **hump**; locate the peak (loosest gap that still seals) = operating point |
| E3 | **Precision (CV)** | Same setup, repeated | 10 / head | CV per head — the pass gate (≤ 5 %) |
| E4 | **Head-lock repeatability** | Snap head in/out, caliper the gap at the 3 slots each time | 10 reinstalls | Gap drift on reinstall; bowing/asymmetry around arc |
| E5 | **Back-calculate `k`** | Invert the model from E2 mean volume + E1 `w` + E2 measured gap | — | Effective `k` for this tube (confirm/correct 1.15) |
| E6 | **Gravimetric vs flow** | Run E2 with the flow sensor logging; compare integrated flow to the weighed mass | subset | *Why* flow under-reads (low-flow tails, zero threshold, bias) — method finding |
| E7 | **Step-skip check** | Confirm 1/4 step @ 180 RPM doesn't skip under the real 2-roller load, head locked | — | Open-loop reliability at the chosen operating point |

**Why n = 10:** matches ISO 8655's minimum for a credible accuracy + precision claim; n = 5
leaves the CV estimate too uncertain (~±40 %) to support the thesis claim.

---

## 9. Morphological analysis — relevance

For proto-02 the design is largely **pre-determined by the proto-01 fixes**, so a full
morphological chart is **not warranted**. The one genuine open choice is the **head-lock
mechanism** (screw clamp / cam lever / magnetic / snap-fit). Provisional pick: **screw clamp**
— most controllable, most reproducible clamping force, easiest to test — with the final choice
deferred until the geometry parameters are settled. The morphological method earns its keep at
**proto-04 (multi-liquid mechanism)**, where the design space is genuinely open.

---

## 10. Open questions / risks

- **Seal threshold / leak regime (model limitation).** The displaced-volume model's arc-compensation
  term only holds *once fully sealed*; below the seal threshold the tube backflows and delivery
  *drops* as the gap opens (proto-01 lived here — see §6 hump). The model needs a **sealing/leak
  term** to describe the under-sealed side. proto-01 (leak-limited) + proto-02's firm→loose sweep
  (through the peak) characterize both regimes — a genuine model-improvement result for the thesis.
  `[Key finding]`
- **True `w`** — resolved (E1: w = 0.91 mm). `[Done]`
- **Effective `k`** for this specific tube — provisional 1.15, confirmed only by E5 (and only on
  the sealed side of the hump). `[Likely OK]`
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

## 11. Version log

- **v1 (planned, this file)** — corrected N_c = 2 (R ≈ 19.7 mm), 4-head gap sweep
  (1.25/1.45/1.65/1.85 mm) with caliper-access slots, screw-clamp head lock, 0.10 mm fit,
  tube-retention fixes, 1/4-step firmware. Targets: mean ~5 µL *known*, CV ≤ 5 %. Design
  in progress; not yet built or tested.

---

## 12. Test data (forward links → 03. CODING)

- Calibration / gap sweep: `03. CODING/manual-dispense-check/proto-02-5ul-4roller-v2/`
  (to be created once the build is tested).
- Reciprocal link: add a "Prototype: proto-02" line to the relevant `SESSION.md`.
