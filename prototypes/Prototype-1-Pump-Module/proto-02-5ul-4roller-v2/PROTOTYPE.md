---
id: proto-02
slug: proto-02-5ul-4roller-v2
title: Prototype 2 — 5 µL 4-roller peristaltic (corrected geometry + gap sweep)
status: 2.1-built-redesign-pending
created: 2026-06-17
updated: 2026-06-24
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

## ▣ Version status

| Version | State | Where |
|---------|-------|-------|
| 🟥 **v2.1** | **BUILT — did not seal** (partial occlusion, diagnosed) | §11 |
| 🟧 **v2.2** | **IN DESIGN** — rotor datum: **fix bearing play** (0.2 mm nozzle, **arrived 2026-07-02**) + shrink comp · centre head · **axial align** · enlarge gap access. Filament + shrink-coupon method fixed. | §11.5–§11.7 |
| ⬜ **v2.3** | future — first clean seal + gap sweep | — |

---

## 0. Parts & assembly — what changed from proto-01

The pump is **four printed parts + 8 bearings + the tube**. For the full breakdown of each part
and how the pump assembles, see **[proto-01 §1a](../proto-01-5ul-4roller/PROTOTYPE.md)** — the same
set carries over. proto-02 **edits** them as follows:

| Part | Change from proto-01 |
|------|----------------------|
| **NEMA17 motor holder** | **Unchanged — reused as the fixed reference / datum** (not reprinted; see §11.5). |
| **Rotor** (Main + Cover) | Radius `R` recomputed **17.7 → 19.7 mm** (N_c fix, §5). **Planned for 2.2:** tighter bearing pockets + PLA-shrink compensation (§11.4–11.6). |
| **Bearings** (8 × MR105ZZ, 2 stacked per roller) | Unchanged. |
| **Pump head** | **Gap-sweep heads** 1.52 / 1.62 / 1.72 mm (§6); **caliper-access slots** added to read the installed gap; **screw-clamp lock** added; sliding fit 0.15–0.20 mm/side. |
| **Tube** (Masterflex, via Darwin reseller) | Unchanged; wall `w` now **measured** 0.91 mm (was estimated 0.85). |

**The one datum that matters: the shaft.** It locates every part and cannot be moved, so **all
geometry is referenced to the shaft centre.** **Installed gap = wall radius − `R`**, which should be
**uniform around the arc** (wall concentric with the shaft). Non-uniformity means the wall is not
centred on the shaft — the lens for reading the proto-2.1 measurements in §11.

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

Corrected with the [Rotor Geometry Solver](../../../tools/rotor-solver/index.html) and the
[Displaced-Volume Model](../../../tools/peristaltic-roller-displaced-volume-model/index.html),
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
delivery ▲        ╭──●──╮
         │       ╱        ╲___        ● peak = loosest gap that still SEALS
         │      ╱ over-       ╲___       (proto-02 target)
         │   (squeezed)          leak zone — looser → backflow → less
         └──────────────────────────────► looser gap →
   proto-01:   +shim ≈3.4 µL ↑ (over-squeezed)      no-shim ≈0 ↑ (leaks)
```

proto-01 had **two states, neither at the peak**: with **no shim** the gap was far too loose →
deep in the **leak zone**, delivering **nothing**; with the **hand-folded shim** it **overshot**
into the **over-squeezed** zone (δ_eff ≈ 0.6–0.8) → it sealed and delivered, but only ≈3.4 µL,
*below* the peak (arc lost to deformation). **The optimum sits between them: the loosest gap that
still fully seals** (max delivery, least over-squeeze and wear). The arc-compensation model is only
meaningful on the **over-squeezed side** of the peak.

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

## 11. Build 2.1 — first print, measurements & diagnosis

> **Status:** built (firm head, nominal gap 1.52 mm) and measured; **not yet pumped.**
> Reprinted the **rotor** and **pump head**; reused the proto-01 **motor holder**. Occlusion is
> only partial — the diagnosis below explains why and sets the 2.2 changes.

### 11.1 Nominal vs measured — the framing
The design gap **1.52 mm is a nominal − nominal construct** (nominal wall radius 21.22 − nominal
`R` 19.70). It is a valid per-part design figure, but **what governs occlusion is the
printed-and-installed gap**, measured from the shaft (§0). The job of 2.1 was to measure that real
gap and explain the partial occlusion.

### 11.2 Measurements (firm head)
| Quantity | Nominal | Measured | Confidence |
|----------|---------|----------|------------|
| **Bearing–bearing (2R)** | 39.4 | **39.04** (39.05 / 39.03, two diameters) | **High** — easy, precise |
| → Roller radius `R` (= 2R/2) | 19.70 | **19.52** | High |
| Pump-head bore Ø (at the sides) | 42.44 | 42.33 | Caliper ±0.01; part ±~0.1 |
| Shaft centre → wall, **apex (top)** | 21.22 | 21.74 | **Low** — curved, hard to place (±0.1+) |
| Shaft centre → wall, 0° (left) | 21.22 | 21.34 | Low |
| Shaft centre → wall, 180° (right) | 21.22 | 21.23 | Low |
| Probe-object gap, sides | — | ~1.55 (1.55 object fits, tiny wobble) | Fair |
| Probe-object gap, apex | — | > 2.0 | Fair |
| Holder dovetail-female → shaft centre | — | 25.72 (an earlier read gave 26.00) | ±0.05–0.1 |
| Dovetail hard-stop height from base | 64.44 | 64.52 | ±~0.05 |

> Every caliper reading carries ≥0.01 mm instrument uncertainty; **curved / awkward features (the
> wall radii especially) are worse, ±0.1+.** The **2R measure is the trustworthy anchor**; the wall
> radii are the soft numbers. **Action for 2.2:** enlarge the caliper-access holes so the caliper
> reaches the wall directly.

### 11.3 Gaps implied (gap = wall radius − `R`, with `R` = 19.52)
| Position | Gap | δ = 2w − G (2w = 1.82) | State |
|----------|-----|------------------------|-------|
| Apex (top) | **2.22** | −0.40 | **open — no occlusion** |
| 0° left | **1.82** | 0.00 | knife-edge |
| 180° right | **1.71** | +0.11 | marginal seal |

The two methods (caliper-from-centre vs object-probe) **disagree on the absolute side gap by
~0.2 mm** (probe → ~1.55; caliper → 1.7–1.8) but **agree the apex is ~0.4–0.5 mm more open than the
sides.** So the **relative** apex-opening is the robust finding; treat the absolute gap as ±0.15
until the 2.2 holes allow a clean read.

### 11.4 Diagnosis — two stacked causes
1. **Rotor 2R undersized ~0.36 mm (`R` short ~0.18/side) → every gap ~0.18 mm too big, uniformly.**
   Causes: PLA shrink (0.3–0.5 % on 39.4 ≈ 0.12–0.20 mm) **+ bearing-pocket play** letting the
   bearings nest inward. The play also makes `R` vary per roller and per reseat → a **direct CV
   (σ_G) source**, so tightening the pockets is a precision fix, not only a sizing one.
2. **Pump head seated ~0.45 mm too high → wall not concentric with the shaft → apex (top) blown
   open.** Fitting a circle to the three wall radii gives bore radius ρ ≈ 21.29 and a vertical
   offset ≈ 0.45 mm (the shaft sits *below* the bore centre). Only **0.08 mm** of that is the
   dovetail hard-stop being high (64.52 vs 64.44); the remaining **~0.37 mm is unexplained** —
   either incomplete seating or a **CAD offset** between the dovetail stop and the bore centre.
   **To pin it:** compare the measured holder dovetail-to-shaft (25.72) against the head's CAD
   `dovetail-stop → bore-centre`; whatever fails to put the bore centre on the shaft axis is the
   offset to remove.

**Also observed — axial misalignment (in-plane vs along-shaft are different).** Causes 1–2 are *in
the arc plane* (radius too big, bore off-centre). Separately, **along the shaft axis the rotor sits
~1 mm proud of the pump head**, so the rollers aren't centred on the tube/channel height — they ride
toward one edge of the channel. This is a distinct alignment defect (axial, not radial) and is fixed
in 2.2 by axial registration.

> **Both in-plane causes must be fixed.** Centring the head alone, with the rotor still small, gives a uniform
> gap ≈ ρ − `R` = 21.29 − 19.52 ≈ **1.77 mm → δ ≈ 0.05 → barely seals.** Fixing only one leaves it
> leaking. (The axial ~1 mm offset is a third, independent fix.)

### 11.5 Decisions for 2.2
- **Fix the rotor (chosen).** Tighten the bearing pockets (less play → 2R back up *and* lower σ_G)
  and add **PLA shrink compensation** so 2R returns to ~39.4 (`R` → 19.7). This restores the design
  datum and yields the **nominal → actual compensation factor**. With `R` back at 19.7 the existing
  head wall radii are correct as-designed — no head-radius redesign needed.
- **Centre the head on the shaft (in-plane).** Resolve the ~0.45 mm too-high (close the CAD/seat offset)
  so the wall is concentric and the gap uniform around the arc.
- **Axial alignment (along the shaft).** Shift the head/rotor so the rollers sit **centred in the channel
  height** — currently the rotor is ~1 mm proud of the head along the shaft, so the rollers ride to one
  edge. Register the two axially (this is independent of the in-plane centring above).
- **0.2 mm nozzle for the bearing pockets (ordered, ~next week).** The 0.4 mm nozzle can't hit the 5 mm
  seat — it prints **4.8 mm (play)** or **5.2 mm (loose)**, and that play is a direct σ_G source. Try the
  finer nozzle **+ light sanding + PLA-shrink comp first**; **metal dowel-pin axles** are the fallback if
  play persists. (Bet on the nozzle before the more complex pin solution.)
- **Sequence, not simultaneous.** Fix + reprint + **re-measure the rotor first** (it defines the
  datum), *then* build and centre the head against the corrected rotor. The two fixes are naturally
  sequential — head geometry depends on the final `R`.
- **Enlarge the caliper-access holes** so the installed wall radius reads directly in 2.2.
- **Volume side-effect (flag only):** `R` = 19.52 vs 19.70 means a slightly shorter roller circle →
  slightly less swept volume/stroke than the model assumes. Fine — the spec calibrates volume by
  step count. Occlusion first, volume recalibration after it seals.

> **Parked for the thesis report (after 2.1):** an FDM-vs-resin printer comparison (Bambu P1S vs
> Prusa SL1S SPEED) and a PLA-shrinkage note (typical 0.2–0.5 %; ~1 % is high-end → another reason
> to confirm `R` directly rather than assume pure shrink).

### 11.6 PLA shrink compensation — how to apply it

**The number.** Nominal 2R = 39.40, measured 39.04 → apparent deficit **0.36 mm = 0.91 %**. This is
an **upper bound** on true material shrink, because bearing-pocket play (bearings sitting inward)
also lowers measured 2R. PLA's intrinsic shrink is typically **0.2–0.5 %** (occasionally ~0.8 %),
so realistically **true shrink ≈ 0.3–0.5 %** and the rest (~0.4–0.6 %) is play.

**The formula — shrink is a *percentage* of size, so compensate by SCALING, not by adding a fixed offset:**

```
scale factor  S = nominal / measured = 39.40 / 39.04 = 1.0092   → +0.92 %  (upper bound)
equivalently  shrink fraction  f = (nominal − measured) / measured ;   scale = 1 + f
```

Apply `S` as a **uniform XY scale** in the slicer (or scale the model in CAD). Z/height shrink
differs and matters far less for the gap geometry.

**Procedure — separate the two effects, don't lump them:**
1. **Fix the play first** — tighten the bearing pockets so the bearings seat at their true radius.
   This removes the play component of the deficit.
2. **Get the true shrink from a feature that does *not* depend on bearing seating** — either print
   a **calibration coupon** (e.g. a 40 mm bar / 20 mm cube) in the same material + orientation and
   compute `f = (nominal − measured)/measured`, **or** measure a **solid feature of the rotor itself**
   (rotor OD, a boss) against its CAD value.
3. **Apply the shrink scale** `(1 + f)` to the rotor, reprint, **re-measure 2R** (target 39.40).

**Values to print (bracket, if you skip the coupon):** because you are *also* removing the play, do
**not** bake in the full 0.92 %. Print the rotor at **+0.4 % / +0.6 % / +0.8 %** XY scale
(1.004 / 1.006 / 1.008), measure 2R for each, and pick/interpolate the one that lands 2R at 39.40.
If you measure a coupon first you get `f` directly and print once.

> **Warning:** applying the full 0.92 % *and* tightening the pockets will likely **overshoot** 2R
> (you would add back the play you just removed). Compensate for **shrink only**.

### 11.7 Filament & shrink-calibration method (v2.2)

**Filament used — all v2.2 prints.** 3DE MAX PLA — "Cold White", 1.75 mm, 1 kg (3D Eksperten).

| Property | Value |
|----------|-------|
| Type / diameter | PLA · 1.75 mm, tolerance **±0.05 mm** |
| Print (nozzle) temp | **215–230 °C** (recommended min–max) |
| Bed temp | **35–60 °C** |
| Density | 1.23 g/cm³ |
| Heat-distortion temp (HDT) | 55 °C |
| Tensile / elongation | 42.6 MPa · 285.1 % |
| Flexural / flex modulus | 64.8 MPa · 2353 MPa |
| Melt-flow index | 2–5 g/10 min |
| RAL/Pantone · EAN | 11-0602 TCX · 5711336018236 |
| Source | https://3deksperten.dk/products/3de-max-cold-white-1-75mm |

**Shrink-calibration coupon — decision (2026-07-02).** Use the MakerWorld *Filament Shrinkage Test Bar*
(two 100 mm bars, one on X and one on Y) — model 786685
(https://makerworld.com/en/models/786685-filament-shrinkage-test-bar).
**Print the bars with the 0.4 mm nozzle, not the 0.2.** Thermal shrink is a *material* property
(a percentage of length), essentially **nozzle-independent over a 100 mm span** — a 0.2 and a 0.4 nozzle
give the same shrink fraction to well inside the ±0.2 % bracket, and 0.4 mm prints much faster. The nozzle
only changes *fine-feature* accuracy (the 5 mm bearing pockets), which this coupon does not measure. Keep
everything else identical to the rotor print — **same spool, same nozzle temp, same bed temp, same
plate/orientation** — that is what makes the measured shrink valid to transfer onto the rotor (which is
printed at **0.2 mm** for the pockets).

**Procedure.**
1. Print both bars @ **0.4 mm**, matched filament + temps to the rotor print.
2. **Let them fully cool** before measuring — PLA keeps contracting for several minutes after the print ends.
3. Caliper each bar at a few points, average; compute `f = (100 − measured) / measured` for **X and Y separately**.
4. If X and Y agree (they usually do), apply a single XY scale `1 + f` in the slicer; if they differ noticeably, apply per-axis scale.
5. Apply the coupon's **material-shrink** scale (~0.3–0.5 %) to the rotor — **NOT** the full 0.91 % v2.1
   apparent deficit, which also contains bearing-pocket play (fixed separately). See §11.6 overshoot warning.

This replaces the "bracket the rotor at +0.4 / +0.6 / +0.8 %" fallback in §11.6: the coupon gives `f`
directly, so the rotor prints once.

---

## 12. Version log

- **v1 (planned)** — corrected N_c = 2 (R ≈ 19.7 mm), gap-sweep heads, caliper-access slots,
  screw-clamp head lock, tube-retention fixes, 1/4-step firmware. Targets: mean ~5 µL *known*,
  CV ≤ 5 %.
- **v2.1 (built 2026-06-24)** — first print: firm head (nominal gap 1.52 mm) + reprinted rotor;
  reused the proto-01 motor holder. Measured **2R = 39.04 mm (R = 19.52)** and a **non-concentric
  wall** (head seated ~0.45 mm too high → apex open). Diagnosis: two stacked causes — undersized
  rotor (PLA shrink + bearing play) and head seated too high. Decisions for 2.2: **fix the rotor**
  (tighten bearing pockets + shrink compensation → 2R ≈ 39.4) and **centre the head on the shaft**.
  Not yet pumped. Full detail → §11.

---

## 13. Test data (forward links → 03. CODING)

- Calibration / gap sweep: `03. CODING/manual-dispense-check/proto-02-5ul-4roller-v2/`
  (to be created once the build is tested).
- Reciprocal link: add a "Prototype: proto-02" line to the relevant `SESSION.md`.
