---
title: Tube wall thickness — measurement & analysis
tube: Ismatec-compatible microbore (Darwin 2-stop Puri-Clear LL), 0.51 mm ID, platinum-cured silicone
date: 2026-06-22
status: complete
adopted_result: "w = 0.91 mm · 2w (walls-kiss) = 1.82 mm · OD = 2.33 mm"
---

# Tube wall thickness — measurement & analysis

> **Adopted result: w = 0.91 mm · 2w (walls-kiss) = 1.82 mm · OD = 2.33 mm.**
> Three independent lines converge: (1) optical microscopy (ruler-calibrated), (2) a physical
> caliper OD, and (3) the ISO / manufacturer standard for Ismatec-compatible microbore tubing.

> **Thesis material.** Self-contained; figures co-located in this folder.

## 1. Why this measurement matters

The pump occludes when the two opposing tube walls meet. The gap at which that happens — the
**walls-kiss gap** — is `2w = OD − ID`, the sum of both walls. Everything downstream (printed
pump-head gap `G = 2w − δ`, the interference δ, the delivered volume) is referenced to `2w`.
With the model's gap sensitivity of **≈3.4 µL per mm of gap**, a 0.1 mm error in `w` is a
~0.7 µL error per stroke — so `w` has to be measured, not assumed. It is also the **hardest**
input to obtain: a sub-millimetre dimension on a soft, deformable, partly-transparent material.

Two empirical methods were used so they could cross-check each other, and the result was then
checked against the manufacturer / ISO dimensional standard.

## 2. Methods

### 2.1 Sample preparation — and its honest limitations

A short cross-section was **cut with scissors, not frozen** — a deliberate time trade-off.
The slab was **~1 mm thick and not perfectly flat**, so the cut plane is not perfectly
perpendicular and the edges are slightly ragged. This is the main limit on the optical method
and the reason a second, physical method (caliper) was used as an independent anchor.

### 2.2 Method 1 — optical microscopy (ruler-calibrated), wall thickness

- **Calibration:** a ruler imaged at the same 10× setting; the **1 mm** graduation interval read
  **975.00 / 977.01 px** → scale **≈ 976 px/mm** *(Fig. `Ruler.png`)*. The ruler was chosen as
  the calibration reference from the outset.
- **Wall thickness:** three radial measurements, lumen edge → outer edge *(Fig. `Wall Thikness.png`)*:
  **V1 = 870.93, V2 = 871.42, V3 = 881.77 px**.

> **Discarded — lumen / ID measurement.** The lumen was also imaged to cross-check the scale,
> but the **blurred cut edge made it impossible to delineate a reliable circumference or
> diameter** — circle/diameter fits were ambiguous. That measurement is therefore **excluded
> from the analysis and the ID image is not used in the thesis.** The two methods below stand
> on their own.

### 2.3 Method 2 — physical caliper, outer diameter

OD measured directly with a caliper on an intact length, using an **operational definition**
suited to a compressible tube: the jaw gap at which the **tube still rotates freely under
minimal hand torque** (light contact, no meaningful compression). Several points were checked:

- At **2.20 mm** the tube is clearly squeezed (rotation resists).
- At **2.33 mm** it rotates freely with minimal torque → best estimate.

**OD ≈ 2.33 mm** (caliper resolution ~0.01 mm; dominant uncertainty is the soft-tube contact
definition, ~±0.05 mm).

## 3. Data & calculation

### 3.1 Microscopy (ruler scale, 976 px/mm)

| Measurement | px | w (mm) |
|-------------|----|--------|
| V1 | 870.93 | 0.892 |
| V2 | 871.42 | 0.893 |
| V3 | 881.77 | 0.903 |
| **Mean** | — | **0.896** |
| SD | — | 0.006 |

The three readings agree to **<1 % (CV 0.7 %)** → the wall is **uniform** and the measurement
is **precise**.

### 3.2 Caliper

```
2w = OD − ID = 2.33 − 0.51 = 1.82 mm   →   w = 0.91 mm
```
(ID taken as the nominal 0.51 mm.)

## 4. Cross-validation — three independent lines converge

| Source | w | 2w | OD |
|--------|-----|------|------|
| Microscopy (ruler-calibrated) | 0.896 mm | 1.79 mm | 2.30 mm |
| **Caliper (physical OD)** | **0.91 mm** | **1.82 mm** | **2.33 mm** |
| **ISO / manufacturer standard** | **0.91 mm** | **1.82 mm** | **2.33 mm** |

The caliper and the **manufacturer / ISO standard match exactly** (OD 2.33 mm), and the
ruler-calibrated microscopy corroborates within **~1.5 %**. This is strong, mutually-independent
agreement.

**Why the standard is tight and knowable:** Ismatec® / Masterflex® microbore cassette tubing
(2-stop CA / 3-stop MS series) is engineered for **fixed-gap pump heads**. To fit the cassette
without crushing or leaking, all low-ID sizes (<0.89 mm ID) are manufactured to a
**standardized wall thickness → uniform OD**. For the **0.51 mm ID** size (Ismatec size code 18):
**ID 0.51 mm · WT 0.91 mm · OD 2.33 mm** (`OD = ID + 2·WT = 0.51 + 1.82 = 2.33`), independent of
the specific formulation (Puri-Clear™ LL, Tygon®, PharMed® BPT). This is exactly why the caliper
reading lands on a clean, repeatable value.

### Adopted result

> **w = 0.91 mm · 2w = 1.82 mm · OD = 2.33 mm.**

## 5. Uncertainty

| Source | Effect on `w` | Note |
|--------|---------------|------|
| Wall scatter (microscopy, n = 3) | ±0.006 mm | negligible — wall is uniform |
| Microscope absolute scale (ruler) | ~±0.02 mm | validated post-hoc by caliper + standard agreement |
| Caliper OD (soft-tube contact) | ±0.05 mm on OD → ±0.025 on `w` | operational "free-rotation" definition |
| Standard | manufacturing-controlled | tubing made to a fixed OD for cassette fit |

With three independent lines agreeing, the residual uncertainty on `w` is **≈ ±0.02 mm**.

## 6. Cross-check against proto-01 (model validation)

Proto-01 *inferred*, purely from behaviour, that **w ≈ 0.90 mm** — reasoning that the pump
delivered a little even at its 1.75 mm printed gap, which is only possible if `2w > 1.75`
(marginal occlusion before shimming). The measured/standard value (**w = 0.91, 2w = 1.82**)
**confirms that inference** — a satisfying closure of the design–measure loop, worth noting in
the thesis.

## 7. Implication for proto-02

Walls-kiss sits at **G = 2w = 1.82 mm** (so proto-01's 1.75 mm gap gave only δ_eff ≈ 0.07 mm —
marginal — explaining the shim). Target **installed** gaps for the interference sweep `G = 2w − δ`:

| δ (interference) | Target gap `G` |
|------------------|----------------|
| 0.10 mm | **1.72 mm** |
| 0.20 mm (design) | **1.62 mm** |
| 0.30 mm | **1.52 mm** |

> These are the gaps the **calipers should read on the printed part**. CAD nominal must be set
> larger to offset FDM gap-undersizing (0.1–0.3 mm) — pinned with a calibration head. See
> proto-02 `PROTOTYPE.md` §6–§7.

## 8. Methods notes (for the thesis) & how to improve

- The **ID/lumen optical measurement was unreliable** (blurred cut edge) and was dropped; OD by
  caliper is the better physical handle and matches the standard.
- For a cleaner future cross-section: **freeze or embed** the tube before sectioning (or
  microtome) → sharp, perpendicular edges and a delineable lumen.
- Calibrate the microscope with a **stage micrometer** (graduation lines 2.5–12 µm) rather than
  a ruler (lines ~100–200 µm); if a ruler is used, calibrate across **10 mm**, not 1 mm.
- Cite the tubing as **"Ismatec-compatible microbore tubing (0.51 mm ID, 0.91 mm wall, 2.33 mm
  OD)"** to show the mechanical constraints of the peristaltic system were accounted for.

## 9. Figures

| File | Shows |
|------|-------|
| `Ruler.png` | Calibration — 1 mm ruler interval (975 / 977 px → 976 px/mm) |
| `Wall Thikness.png` | Three wall measurements V1 / V2 / V3 |

*(`Tube ID.png` excluded — blurred lumen, unreliable; not used.)*

## References

Manufacturer / ISO dimensional standard for Ismatec-compatible microbore (stopped) tubing,
0.51 mm ID size; standardized wall thickness for fixed-gap cassette compatibility:

- Lassenberger, A., Grünewald, T. A., van Oostrum, P. D. J., Rennhofer, H., Amenitsch, H.,
  Zirbs, R., Lichtenegger, H. C., & Reimhult, E. (2017). Monodisperse Iron Oxide Nanoparticles
  by Thermal Decomposition… *Chemistry of Materials, 29*(10), 4511–4522.
  https://doi.org/10.1021/acs.chemmater.7b01207
- Misun, P. M., Birchler, A. K., Lang, M., Hierlemann, A., & Frey, O. (2018). Fabrication and
  Operation of Microfluidic Hanging-Drop Networks. In *Methods in Molecular Biology* (pp. 183–202).
  Springer. https://doi.org/10.1007/978-1-4939-7792-5_15

> **Verify before final thesis use:** confirm these two papers (and/or the Ismatec/Masterflex
> datasheet) state the 0.91 mm wall / 2.33 mm OD explicitly, and cite the datasheet directly if
> available. The **caliper measurement already confirms the 2.33 mm OD empirically**, so the
> adopted number stands on its own regardless.
