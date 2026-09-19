# SPEC — Tensioned Tube-Path & Stroke Volume Model

**Path:** `tools/peristaltic-tensioned-path-model/index.html`
**Status:** Live

---

## Purpose

Alternative path geometry for the rigid-backed peristaltic pump. The Rotor Geometry
Solver assumes the tube lies on the 180° wall arc (`arcNeeded = 2πR/N`). A tube pinned
at **both** ends under a small seating strain instead runs straight from roller to
roller, wrapping each roller over a short arc. This tool:

1. Computes the true fluid-packet length for the taut path (closed form).
2. Applies incompressibility corrections for axial pre-strain ε (lumen area, wall
   thickness, effective interference).
3. Predicts net volume per stroke for an existing rotor (forward mode).
4. Solves the corrected rotor radius `R*` for a target volume (inverse mode, closed form).

**Relationship to the other tools:** does *not* replace the Occlusion &
Displaced-Volume Model — the stadium cross-section and the contact-length
compensation (`L_c`, `ΔArc = N_c·L_c`) are consumed unchanged. It replaces only the
rotor-solver mapping from rotor radius to swept tube length, for tensioned builds.

**Origin:** Proto-01 finding — the tube was held at one end only, so the path between
rollers was uncontrolled (indeterminate between wall arc and taut chord), a
stroke-to-stroke variance source. Design decision for Proto 2+: pin both ends with a
small seating strain, making the taut path the correct geometry.

---

## Inputs

| Input | Type | Range | Default |
|-------|------|-------|---------|
| Roller count `N` | Select | 3 / 4 / 5 / 6 / 8 | 4 |
| Rotor radius `R` (to bearing surface) | Number | 8–60 mm, step 0.1 | 17.7 mm |
| Bearing OD | Select | 10 mm (MR105ZZ) / 16 mm (625-2RS) | 10 mm |
| Tube ID `d` | Select | 0.25 / 0.51 / 0.76 / 1.02 / 1.14 mm | 0.51 mm |
| Wall thickness `w` | Range slider | 0.40–1.60 mm, step 0.05 | 0.85 mm |
| Interference `δ` | Range slider | 0.02–0.60 mm, step 0.02 | 0.20 mm |
| Seating strain `ε` | Range slider | 0–15%, step 0.5 | 3% |
| Inflation factor `k` | Range slider | 1.00–1.50, step 0.05 | 1.15 |
| Rollers engaged `N_c` | Range slider | 1–4, step 1 | 2 |
| Target volume `V_t` (inverse solve) | Number | 1–25 µL, step 0.5 | 5 µL |

---

## Formulas

Stretch ratio and stretched tube (incompressible wall, ν = 0.5):

```
λ    = 1 + ε
d_ε  = d / √λ          w_ε = w / √λ          OD_ε = d_ε + 2·w_ε
A_ε  = π·d² / (4λ)                            (lumen area scales 1/λ)
```

Printed gap (prescribed from the unstretched wall) and effective interference:

```
G    = 2w − δ
δ_ε  = 2·w_ε − G  =  2w/√λ − 2w + δ           (stretch consumes interference)
L_c  = k · 2·√(2·R_r·δ_ε)                      (from the displaced-volume model)
```

Taut packet length between adjacent pinch points (α = 2π/N):

```
R_cc      = R − R_r                            (roller-centre circle)
ρ         = R_r + OD_ε / 2                     (wrap radius of tube centreline)
L_packet  = 2·R_cc·sin(α/2) + ρ·α              (straight tangent + α/2 wrap per side)
```

Comparison paths shown alongside:

```
L_solver  = R·α                                (Rotor Solver assumption)
L_arcCL   = (R + G − OD_ε/2)·α                 (wall-hugging centreline arc)
```

Net volume per stroke (forward mode) and corrected radius (inverse mode —
`L_packet` is linear in `R`, so the inverse is closed form):

```
V_stroke  = A_ε · (L_packet − N_c·L_c)
R*        = [ V_t/A_ε + N_c·L_c + 2·R_r·sin(α/2) − ρ·α ] / (2·sin(α/2))
```

### Derivation notes

- **Straight segment:** adjacent wrap circles have equal radius ρ centred on the
  roller-centre circle, so the external tangent is parallel to the chord between
  centres and equal in length: `2·R_cc·sin(α/2)`.
- **Wrap arcs:** at each pinch the tube is tangent to the wall; tangent directions at
  adjacent pinches differ by exactly α. By symmetry the turn splits α/2 per roller on
  each side of every straight run → total wrap per packet = α at radius ρ.
- The wrap term is why the naive chord estimate (−10% at N = 4) overstates the
  effect: at the proto-01 point the taut packet is only ~3% shorter than the
  wall-hugging arc and ~1% shorter than the solver's assumption.

---

## Outputs

| Output | Formula | Unit |
|--------|---------|------|
| Net volume / stroke (hero) | `V_stroke = A_ε(L_packet − N_c·L_c)` | µL |
| Corrected rotor radius `R*` | closed-form inverse above | mm |
| Rotor Solver radius (reference) | `N·(V_t/A + N_c·L_c(δ))/(2π)`, ε = 0 | mm |
| Packet length `L_packet` | see above | mm |
| Solver arc · wall-hugging arc | `R·α` · `(R+G−OD_ε/2)·α` | mm |
| Taut vs. solver arc | `(L_packet/L_solver − 1)·100` | % |
| Effective interference `δ_ε` | `2w_ε − G` | mm |
| Contact length `L_c(δ_ε)` | `k·2√(2R_r·δ_ε)` | mm |
| Stretched lumen area `A_ε` | `πd²/(4λ)` | mm² |

### Interactive SVG

Top-down plan view, redrawn on every input change: occlusion wall band (top 180°),
roller-centre circle, N rollers (engaged highlighted), pinch-point markers, the taut
path (orange: tangent runs + wraps, built from external-tangent geometry with virtual
neighbour rollers giving entry/exit directions), and the wall-hugging arc (dashed)
for comparison.

### Warning logic

- `δ_ε ≤ 0` → **DANGER** — strain has consumed the interference; no occlusion
- `δ_ε > 2·w_ε` → **DANGER** — crushing wall material
- `δ_ε < 0.10 × 2w_ε` → **CAUTION** — marginal occlusion
- `ε = 0` → **INFO** — path indeterminate if tube is pinned at one end only; reports
  the arc-vs-chord spread as a variance bound

---

## Known values at the Proto-01 design point

`R = 17.7, R_r = 5, N = 4, d = 0.51, w = 0.85, δ = 0.20, k = 1.15, N_c = 2`

| Path model | Packet length | V/stroke | vs. solver |
|------------|--------------:|---------:|-----------:|
| Rotor Solver assumption | 27.80 mm | 4.35 µL | — |
| Wall-hugging arc (centreline) | 28.42 mm | 4.48 µL | +2.2% |
| Taut path, ε = 0 | 27.55 mm | 4.30 µL | −0.9% |
| Taut path, ε = 3% | 27.52 mm | 4.25 µL | −2.3% |

Inverse solve for 5 µL: solver 19.72 mm → taut ε=0 20.13 mm → taut ε=3% **20.37 mm**.
Occlusion at δ = 0.20 is lost only at ε ≈ 28% — seating strains of 2–5% are safe.

**Proto-01 attribution note:** the path correction (~1–3%) cannot explain proto-01's
−32% under-dispense; that deficit is already closed by the missing occlusion + shim
over-squeeze + N_c error (see proto-01 §7). This model exists because (a) the strain
corrections are decision-relevant for the gap prescription, and (b) pinning the tube
is a Proto 2+ design choice that makes this the correct geometry going forward.

---

## Assumptions

1. Tube pinned at both ends, taut — path is the minimum-length curve over the
   rollers. Unpinned tube (proto-01/02 as built): geometry indeterminate; the arc and
   taut models bound it.
2. Uniform incompressible stretch along the pumping section (ν = 0.5).
3. Taut-string path, no bending stiffness — taut packet length is a lower bound.
4. Occlusion mechanics (`L_c`, `ΔArc = N_c·L_c`, `k`) inherited unchanged from the
   displaced-volume model, evaluated at `δ_ε`.
5. Quasi-static, no backpressure, no re-recovery dynamics. With a taut path the tube
   leaves the wall between rollers — occlusion near arc entry/exit should be verified
   on hardware if backpressure matters.

---

## Hardware constants & sources

| Parameter | Value | Source |
|-----------|-------|--------|
| Tube | Masterflex Puri-Clear LL 2-stop microbore, 0.51 mm ID | Cole-Parmer / Darwin Microfluidics |
| Wall default | 0.85 mm (0.91 mm measured by microscope, proto-02) | proto-02 cross-section measurement |
| Roller candidates | R_r = 5 mm (MR105ZZ) / 8 mm (625-2RS) | design selection |
| k correction | 1.15 default | Klespitz & Kovács, Sensors & Actuators A (2022) |
| Path geometry | external tangent + α/2 wrap | derived first-principles for this thesis |
| Seating strain | 2–5% recommended | two-ink-mark measurement before/after mounting |

---

## KaTeX dependency

Formulas rendered via KaTeX. CDN primary
(`https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/`), local fallback in `katex/`
(copied from the sibling displaced-volume tool). KaTeX fonts are not bundled locally;
offline use renders with browser fallback math fonts.
