## The model

**Cross-section under the roller (constant-perimeter stadium).** When the roller flattens the tube, rubber doesn't compress in volume — it redistributes. The inner wall perimeter is conserved. An undeformed lumen of inner circumference `πd` (d = ID) flattens into a "stadium" (rectangle + two semicircular caps) of height `h` = the residual gap between the two inner walls. Under your **compression fit, the target is h → 0**, i.e. the inner walls touch and residual lumen area → 0. That's full occlusion, and it's the right target.

So under a *perfectly* set compression fit, the roller leaves **zero trapped lumen at the contact point**. The volume the roller "takes away" is therefore **not** at the single contact line — it's the fluid displaced over the **axial contact length** `L_c`, the length of tube the roller squashes flat as it rolls. That's the number you actually want.

**Axial contact length `L_c`** — this is the geometric heart of it. A roller of radius `R_r` pressing into a tube backed by a rigid wall flattens a finite axial length. For a cylinder indenting against a flat backing with interference `δ` (your negative gap), the half-contact-length is approximately:

```
L_c ≈ 2·√(2·R_r·δ_eff)
```

where `δ_eff` is the effective radial interference (how far past wall-contact the roller is driven), capped by the tube collapsing. For your two bearing options the roller radius is **R_r = 5 mm (10 mm OD)** or **R_r = 8 mm (16 mm OD)** — and here's the first real design consequence: the **larger 16 mm bearing flattens a longer section of tube per pass**, so it removes more volume per stroke and needs more compensating arc. Smaller roller = shorter footprint = less displaced volume but higher contact stress (more wear).

**Volume displaced per roller (the "taken away" volume).**
```
V_roller ≈ A_lumen · L_c = (π·d²/4) · L_c
```
This is the slug of fluid each roller pushes ahead of itself / pinches off. Over a contact arc with `N_contact` rollers simultaneously engaged, the total "dead" displaced volume is `N_contact · V_roller`.

**Converting to extra arc** (what you actually asked):
```
ΔArc = V_roller / A_lumen = L_c
```
Elegant result: **the extra tube arc you need to compensate for one roller's displacement is just its axial contact length `L_c`.** Per roller. So if you have, say, 2 rollers engaged on the 180° arc and `L_c ≈ 1.8 mm` each, you lengthen the usable arc by ~3.6 mm. This is concrete and printable.

**The caveat you must document:** constant-perimeter assumes the *wall doesn't thin and doesn't bulge axially* — real PVC does both slightly. Published roller-displacement modeling (the ScienceDirect RVD paper) notes the assumption of perfect compliance of the tube results in smaller-than-actual volume values when using Riemann-sum integration. So treat `L_c` as a **lower bound**; add an empirical inflation factor (1.1–1.3×) once Proto 1 gravimetry is in. I'll put that factor in the UI as a slider.




## Now — how much should you squeeze? The interference question

Your intuition needs one correction. You said the squeeze should be "the ID, plus something more." It's actually the opposite — let me reframe it cleanly, because this is the heart of the whole design.

Think about the **gap between the roller and the backing wall**, call it `G`. The tube sits in that gap. Going from no-squeeze to full occlusion:

- **No contact:** `G = OD = ID + 2·wall`. The tube sits there untouched. For you: `G = 0.51 + 2(0.85) = 2.21 mm`.
- **Walls just kiss (zero residual lumen, the occlusion point):** the two wall thicknesses are stacked flat against each other, lumen pinched shut. `G = 2·wall = 1.70 mm`. **Notice the ID has vanished** — at full occlusion the bore is zero, so the gap is just twice the wall.
- **Compression fit (what you chose):** you go *past* that point and start compressing the rubber itself. `G = 2·wall − δ`, where **δ is the radial interference** — how far past wall-kiss you drive the roller.

So the squeeze target is **not ID-plus-something. It's `2×wall` minus a small interference δ.** The ID never enters the gap setting — it only determines how much fluid the (now-closed) lumen *was* holding. That's the counterintuitive bit and it's worth a sentence in your thesis.

**What δ physically is:** the depth of rubber you crush after the walls already touch. It exists for one reason — manufacturing and dimensional tolerance. If you set `G = 2·wall` exactly, then any tube that's 0.05 mm thinner than nominal won't fully occlude → backflow → lost accuracy. δ is your **safety margin against wall-thickness variation and print tolerance.** That's its entire job.

**How much δ?** The literature gives the bracket. Pump makers run 10 to 20% occlusion, higher for softer tube material and lower for harder material — here "occlusion %" means compression past contact as a fraction of total wall stack. So:

```
δ = (0.10 to 0.20) × 2·wall = 0.10–0.20 × 1.70 mm ≈ 0.17 to 0.34 mm
```

For your soft PVC (Puri-Clear is on the soft end), aim **δ ≈ 0.25–0.30 mm**, i.e. set your printed gap `G ≈ 1.70 − 0.27 ≈ 1.43 mm`. That's your starting print dimension. Too little and you risk incomplete occlusion; too much (δ > ~2×wall, the model's red flag) and you're crushing wall material, killing tube life and driving ID drift.


## About the "peristaltic_occlusion_model.html" file
**What's in the file.** A single self-contained `.html` — unstyled bare inputs/outputs as you asked, with a large documentation block at the top covering every formula, parameter range, source, and assumption. The five core formulas are written as pure functions (`contactLength`, `lumenArea`, `rollerVolume`, `printedGap`, `stadium`) so Claude Code can unit-test them or lift them straight into a module without touching the DOM glue.

**The model in one breath, for your supervisors:**
- Gap to print: `G = 2·wall − δ` — the ID drops out at occlusion, the wall stack governs.
- Contact length: `L_c = k · 2·√(2·R_r·δ)` — geometric footprint, with `k` absorbing real-world wall thinning.
- Displaced volume: `V_roller = (π d²/4) · L_c`.
- Extra arc: `ΔArc = L_c` per engaged roller — the clean result.
- Stadium area: `A = L_w·h + π(h/2)²` with `L_w = (πd − πh)/2` — the honest replacement for occlusion %.

**The sources, collected** so you have them for the bibliography: the wall-constant design rule and the 0.85 mm confirmation come from the Ismatec/Masterflex selection guide (Cole-Parmer 14-035 Rev C) and the platinum-cured silicone 2-stop dimensions (0.89 ID / 2.59 OD); the 10–20% occlusion band from Pump Industry Magazine (2014); the gap < 2×wall occlusion constraint from Boxer Pumps; and the "perfect-compliance underestimates volume, so k ≥ 1" point from the roller-volume-displacement paper in Sensors & Actuators A (2022). All of these are in the header comment with the claims attached.