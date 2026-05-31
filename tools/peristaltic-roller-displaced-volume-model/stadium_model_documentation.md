# Flattened Lumen Cross-Section: The Stadium Model

*Documentation of the tube-deformation geometry used in the peristaltic dispensing module.*

## 1. Purpose and motivation

When a peristaltic roller presses a flexible tube against a rigid backing, the circular bore (lumen) does not simply shrink in diameter — it changes shape, flattening into an elongated form before closing entirely. Quantifying that shape matters for two reasons in this project:

First, the volume of fluid a roller displaces depends on the cross-sectional area of the lumen along the contact region, not on any single diameter. Second, the common shorthand of describing occlusion as a percentage is dimensionally ill-posed for a precision dispensing application: occlusion is a *local* contact phenomenon at the roller, and a percentage implicitly invites the reader to relate it to the whole tube, which carries no physical meaning. A defensible model must instead report the residual lumen *area* as a function of how far the roller has closed.

The stadium model provides that. It describes the flattened lumen as a *stadium* (a rectangle capped by two semicircles, also called a discorectangle) and derives its area from a single physical assumption about the tube wall. The result is a smooth, monotonic area-versus-closure relationship bounded by the open circle at one extreme and complete occlusion at the other.

## 2. Symbols

| Symbol | Meaning | Units |
|--------|---------|-------|
| `d` | Tube inner diameter (ID) | mm |
| `r₀` | Undeformed lumen radius, `r₀ = d/2` | mm |
| `wall` | Tube wall thickness | mm |
| `OD` | Outer diameter, `OD = d + 2·wall` | mm |
| `δ` | Radial interference (crush past wall-contact) | mm |
| `G` | Printed roller-to-backing gap, `G = 2·wall − δ` | mm |
| `h` | Residual inner-wall separation under the roller | mm |
| `L_w` | Flat (straight) width of the stadium lumen | mm |
| `P` | Inner-wall perimeter, `P = π·d` (conserved) | mm |
| `A₀` | Undeformed lumen area, `A₀ = π·r₀²` | mm² |
| `A` | Deformed (stadium) lumen area | mm² |

## 3. The governing physical assumption: perimeter conservation

Elastomeric tube walls — soft PVC in this case — are very nearly incompressible in bulk. Squeezing the tube redistributes the wall material rather than compressing its volume. Viewed in cross-section, the practical consequence is that the inner wall contour retains, to first order, the same arc length as it deforms. The circle of circumference `P = π·d` is effectively unrolled into a flatter closed curve of the *same* length.

When a closed loop of fixed perimeter is pressed between two parallel flats separated by a distance `h`, the shape it relaxes into — the one that turns the corners with the least bending — is a stadium: two straight segments of length `L_w` hugging the flats, joined by two semicircular caps of diameter `h`. The straight runs lie against the roller and the backing; the caps account for the edges where the wall curves back on itself.

This is the entire physical content of the model. Everything below is geometry.

## 4. Geometry derivation

### 4.1 Flat width from conserved perimeter

The perimeter of a stadium is the two straight segments plus the two semicircular caps (which together form one full circle of diameter `h`):

```
P = 2·L_w + π·h
```

Setting this equal to the conserved circular perimeter `P = π·d` and solving for the flat width:

```
L_w = (P − π·h) / 2 = (π·d − π·h) / 2 = (π/2)·(d − h)
```

The behaviour at the two limits is the sanity check on the model:

- When `h = d`, then `L_w = 0`: the stadium degenerates back into the original circle (no flattening).
- When `h → 0`, then `L_w → P/2 = π·d/2`: the lumen has closed into a flat slit of zero area, with all the perimeter now in the two straight runs.

### 4.2 Lumen area

A stadium of straight-width `L_w` and cap-diameter `h` is a rectangle (`L_w × h`) plus two semicircular caps that together form one circle of radius `h/2`:

```
A = L_w·h + π·(h/2)²
```

Substituting `L_w = (π/2)·(d − h)`:

```
A(h) = (π/2)·(d − h)·h + π·h²/4
     = (π/2)·d·h − (π/2)·h² + (π/4)·h²
     = (π/2)·d·h − (π/4)·h²
```

This compact form, `A(h) = (π/2)·d·h − (π/4)·h²`, is the key result. The two limits again confirm correctness:

- `A(d) = (π/2)·d² − (π/4)·d² = (π/4)·d² = A₀` — the open circular lumen is recovered.
- `A(0) = 0` — full occlusion gives zero residual area.

The function is smooth and monotonic in `h` over the operating range, so the residual lumen area is well-defined at every degree of closure. This `A(h)` is what the interactive figure reports, and it is the honest, geometry-based replacement for an occlusion percentage.

## 5. Relating squeeze to closure: the gap equation

The figure links the *printed* hardware dimension to the *residual* lumen via the gap between the roller and the backing wall. The squeeze is set by the wall stack, not by the bore — a point worth stating explicitly because it is counterintuitive:

```
No contact (untouched):    G = OD     = d + 2·wall
Walls kiss (occlusion):    G = 2·wall            ← the ID drops out here
Compression fit (target):  G = 2·wall − δ
```

At the moment of occlusion the bore has pinched shut, so the inner diameter no longer contributes to the gap — only the two stacked wall thicknesses do. The interference `δ` is the depth of rubber crushed *beyond* that wall-kiss point. Its sole function is to guarantee complete occlusion despite manufacturing tolerance on the wall and dimensional tolerance on the 3D print. A practical starting band for soft PVC is `δ = 0.10` to `0.20 × (2·wall)`; driving `δ` beyond roughly `2·wall` means crushing wall material rather than merely closing the lumen, which accelerates fatigue and risks silent ID drift.

For the figure, each compression state maps to a residual gap `h` as follows. States 0 and 1 are fixed endpoints (`h = d` and `h = 0`). State 2 interpolates linearly on the gap between the open and closed limits:

```
if  G ≥ OD:        h = d
if  G ≤ 2·wall:    h = 0
otherwise:         h = d · (G − 2·wall) / (OD − 2·wall)
```

This mapping is a *presentation* device for the figure — a monotonic way to show the lumen closing as the gap shrinks. It is not a stress–strain constitutive law. The load-bearing physics of the model are the perimeter conservation (Section 3) and the area formula (Section 4); those are the relations to cite.

## 6. Assumptions and limits of validity

1. **Bulk-incompressible wall.** The wall conserves its inner-contour length as it deforms. This is the foundation of the stadium shape and the area formula. It holds well for thin-walled soft elastomers at moderate compression.
2. **Rigid backing.** The printed channel plate does not deflect under the roller. Valid for PETG/ASA at these loads; a compliant shoe would invalidate the fixed-flats premise.
3. **Idealised stadium.** Real flattened PVC develops slight wall thinning, and the caps are not perfect semicircles under load. The stadium is therefore a first-order reference geometry. Empirical correction — handled by the inflation factor in the companion displaced-volume model — accounts for the deviation. Treat `A(h)` as a clean lower-complexity reference, not an exact deformed profile.
4. **Quasi-static, cross-sectional view.** The model describes a single cross-section at the roller. It says nothing about how quickly the tube recovers its round shape *behind* the roller, which is the origin of low-volume pulsation. Pulsation is a flow-dynamics question and is deliberately outside the scope of this geometric model.

## 7. Parameters, values, and sources

**Tube inner diameter `d`.** Selected value 0.51 mm (Masterflex Ismatec Puri-Clear LL, 2-stop microbore); available IDs in this range are 0.25, 0.51, 0.76, 1.02, and 1.14 mm. Source: Ismatec/Masterflex Pump Tubing Selection Guide (Cole-Parmer document 14-035 Rev C) and the Darwin Microfluidics 2-Stop Puri-Clear LL product listing.

**Wall thickness `wall`.** Default 0.85 mm. The wall of 2-stop microbore tubing is approximately constant (about 0.85–0.91 mm) across the small IDs, because it is sized to fit the Ismatec pump cartridge rather than scaling with the bore. A confirmed figure comes from the platinum-cured silicone 2-stop line, listed at 0.89 mm ID and 2.59 mm OD, giving a wall of (2.59 − 0.89)/2 = 0.85 mm (Cole-Parmer part MFLX06421-26). The general design rule — that wall thickness must match the pump — is stated directly in the Ismatec tubing brochure. The manufacturer does not publish an OD for the PVC 2-stop line, so the actual Puri-Clear LL wall should be confirmed by caliper measurement during Proto 0; the model treats `wall` as an adjustable input precisely for this reason.

**Interference `δ`.** Recommended band 0.10–0.20 × (2·wall). The figure of 10–20% compression, higher for softer tube material, reflects standard peristaltic-pump occlusion practice (Pump Industry Magazine, 2014). The constraint that the roller-to-backing gap must be less than twice the wall thickness for occlusion to occur at all is from Boxer Pumps' technical note "Peristaltic Pumps for Liquid".

## 8. How to read the interactive figure

The figure presents two panels side by side. The left panel shows the undeformed lumen as a circle of inner diameter `d` surrounded by the wall; the right panel shows the same lumen flattened into a stadium between the roller (above) and the rigid backing wall (below). Three buttons select the compression state — no contact, walls kissing at occlusion onset, and the compression fit — while sliders vary the wall thickness, the ID, and the interference. The readouts report the printed gap `G`, the residual gap `h`, the flat width `L_w`, and the residual lumen area `A` expressed both absolutely and as a percentage of the open area. Dragging the interference toward zero in the compression-fit state reveals the partial-closure regime; any positive interference closes the lumen completely, which is the intended design condition.
