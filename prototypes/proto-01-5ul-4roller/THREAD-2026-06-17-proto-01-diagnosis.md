# Thread — Proto-01 diagnosis & documentation (2026-06-17)

> Conversation record. The canonical artifact is `PROTOTYPE.md` in this folder;
> this thread captures the reasoning, the dead-ends, and the decisions that led to
> it. Posture: `sparring-partner` + `diagnose-gap`.

## Goal of the session

Discuss proto-01 retroactively: understand why it under-delivered, validate the
model against the real result, document everything (with full calculations) in
`PROTOTYPE.md`, then update the HTML journey page. Save the screenshots (tool
captures, CAD renders, real photos, circuit) into this folder for use in the report
and the site.

## How the diagnosis evolved

1. **First pass (wrong emphasis).** Initial error budget treated the occlusion gap
   as the sole dominant cause and called the `N_c` input a "secondary" note.
2. **Correction from Sirio.** The `N_c` value is **fed forward** into the rotor
   solver — `ΔArc_total` changes the rotor radius. So `N_c`=1 vs 2 is not cosmetic;
   it physically under-sized the rotor. Re-ran the chain: `R` 17.7 → 19.7 mm.
3. **The real killer surfaced.** Sirio realised the **printed gap is 1.75 mm** while
   `2w = 1.70 mm` → the tube was **never occluded by design**. The pump only worked
   because of a **paper shim** folded into the groove.
4. **Quantified the shim.** Caliper on folded paper: ~0.78 mm (very hard) → ~1.1 mm
   (light). Effective gap ≈0.9–1.1 mm → effective δ ≈ 0.6–0.8 mm.
5. **Model validation.** Net = (arcNeeded − N_c·L_c(δ_eff))·A. Firm shim (δ=0.80,
   N_c=2) → **3.01 µL** predicted vs **3.39 µL** measured (gravimetric). Back-solving
   from 3.39 gives an effective gap of **1.11 mm** — matches the *light-shim* band
   Sirio measured. **The model brackets reality to ~11 %.** Strong validation.

## Key numbers (verified in Python)

```
A = 0.2043 mm²
L_c(δ=0.20) = 3.253 mm ;  arcNeeded(N_c=1) = 27.73 mm ;  geomVol = 5.66 µL
R(4, N_c=1) = 17.65 → 17.70 mm   (as built)
R(4, N_c=2) = 19.72 mm           (corrected — proto-02 target)
L_c(δ=0.80) = 6.505 ; ΔArc(N_c=2)=13.01 ; net = 3.01 µL  (firm shim)
back-calc δ from measured 3.39 µL → δ≈0.59, gap≈1.11 mm  (light-shim band ✓)
```

## Three confirmed design errors (all fixable)

1. **`N_c` = 1 entered instead of 2** → rotor under-sized ~2 mm (~−0.67 µL even if
   occlusion were perfect).
2. **Gap 1.75 mm > walls-kiss 1.70 mm** → no natural occlusion; needed the shim.
   Workflow failure: the tool's `G = 1.50 mm` output was not carried into CAD.
3. **0.25 mm loose tolerance + no head lock** → wobble modulates the gap; head had
   to be held by hand.

## Decisions agreed

- **Don't touch `k` yet** — proto-01 mixes two error sources, can't isolate true `k`.
  Back-calculate it from a clean proto-02 measurement instead.
- **Measure `w` properly** (microscope cross-section / micrometer OD) — it's the
  highest-leverage, hardest-to-measure input. Document as a model limitation.
- **Model is structurally correct** — it assumes full occlusion; proto-01 broke that
  premise. Fix the hardware to match the model, don't patch the model.
- **Noise:** bench-tested → **1/4 microstep @ 2400 steps/s (180 RPM) on DRV8825** is
  the noise-vs-torque sweet spot. Silent TMC driver is fallback only.
- **4 rollers stays** — discrete-dosing hand-off argument; but only *testable* in
  proto-02 once the systematic occlusion error is gone.

## Proto-02 brief (handed forward)

`N_c`=2 → rotor ~19.7 mm; print a gap sweep (≈1.35/1.50/1.65 mm) around `2w−δ`;
positive head lock (screw or cam/lever); 0.10 mm tolerance; tube-retention (holder
position + tighter holes + anti-fall shield); 1/4-step firmware; recalibrate
steps/stroke; measure `w`. Full brief in `PROTOTYPE.md` §11.

## Artifacts produced

- `PROTOTYPE.md` — rewritten: purpose, full nomenclature, worked calculations,
  hardware reality, shim validation, error budget, wall-thickness limitation,
  performance, vibration test, issues, proto-02 brief, 4-roller rationale.
- `prototypes/index.html` — detail view restructured + images wired in (see commit).
- Screenshots/renders/photos saved in this folder.

## Revision 2 (same day) — Sirio review pass

Changes requested and applied after first draft:

- **Page flow reordered** so *Results* come before the model-validation *Discussion*
  (the gap/shim is described as setup before, the comparison after). Render pair
  moved to sit after Purpose. Caption→next-section overlap fixed (figure margins).
- **Purpose** turned into a bullet list. **4-roller rationale merged into the
  Parameters section** (§3a) — it's a parameter-choice decision — and the standalone
  section removed. Parameter table gained a **"why each value"** column.
- **Formulas rewritten report-style**: a prose description of what each computes and
  where every number comes from, then the equation. Rendered with **KaTeX**
  (`prototypes/katex/`, 20 woff2 fonts bundled locally for offline + GitHub Pages).
- **Click-to-enlarge lightbox** added for all figures; wide tool screenshots no
  longer side-cropped (`object-fit: contain`). FullCircuit image moved to Results.
- Content fixes: tube linked to **Darwin Microfluidics** product; wall-thickness
  wording = *similar-tube online estimate + caliper check*; **microscope
  cross-section** set as the preferred proto-02 `w` measurement (no micrometer);
  error-budget CV-driver confidence **Certain → Very likely**.
- `PROTOTYPE.md` re-sectioned to mirror the page (§5 setup → §6 results →
  §7 discussion → §8 wall thickness); all cross-refs updated.
