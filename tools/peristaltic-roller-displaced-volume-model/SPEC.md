# SPEC — Peristaltic Roller Occlusion & Displaced-Volume Model

**Path:** `tools/peristaltic-roller-displaced-volume-model/index.html`
**Phase:** 3
**Status:** Live

---

## Purpose

Two-part geometric reference tool for the tube-deformation mechanics of a rigid-backed peristaltic pump. Intended as a citable, readable tool for thesis examiners alongside Proto 1 hardware decisions.

---

## Part 1 — Tube Cross-Section: The Stadium Model

### Inputs

| Input | Type | Range | Default |
|-------|------|-------|---------|
| Wall thickness `w` | Range slider | 0.40–1.20 mm, step 0.05 | 0.85 mm |
| Inner diameter `d` | Range slider | 0.25–1.14 mm, step 0.01 | 0.51 mm |
| Radial interference `δ` | Range slider | 0.00–0.60 mm, step 0.01 | 0.27 mm |
| Compression state | 3-button selector | No contact / Walls kiss / Compression fit | Compression fit |

### Outputs

| Output | Formula | Unit |
|--------|---------|------|
| Printed gap `G` | `G = 2w − δ` | mm |
| Residual gap `h` | Piecewise (see model) | mm |
| Flat width `L_w` | `L_w = π(d − h)/2` | mm |
| Lumen area `A(h)` | `A = (π/2)dh − (π/4)h²` | mm² |
| Area / open lumen | `A(h) / A₀ × 100` | % |

### Interactive SVG

Two-panel SVG figure:
- **Left panel:** Undeformed tube cross-section (circle), scales with `d` and `w`
- **Right panel:** Deformed tube (stadium shape) with roller above and backing wall below; residual gap `h` dimension marker

### Key Formula

```
A(h) = (π/2) · d · h  −  (π/4) · h²
```

Derived from conserved inner-wall perimeter `P = πd`. Replaces "occlusion %" with a well-defined geometry-based residual lumen area.

### Gap States

```
No contact:        G = OD = d + 2w
Walls kiss:        G = 2w          ← ID drops out at occlusion onset
Compression fit:   G = 2w − δ
```

---

## Part 2 — Displaced Volume & Axial Contact Length

### Inputs

| Input | Type | Range | Default |
|-------|------|-------|---------|
| Bearing OD | Select | 10 mm / 16 mm | 16 mm |
| Tube ID `d` | Select | 0.25 / 0.51 / 0.76 / 1.02 / 1.14 mm | 0.51 mm |
| Wall thickness `w` | Range slider | 0.40–1.60 mm, step 0.05 | 0.85 mm |
| Interference `δ` | Range slider | 0.02–0.60 mm, step 0.02 | 0.20 mm |
| Rollers engaged `N_c` | Range slider | 1–4, step 1 | 2 |
| Inflation factor `k` | Range slider | 1.00–1.50, step 0.05 | 1.15 |

### Outputs

| Output | Formula | Unit |
|--------|---------|------|
| Printed gap `G` | `G = 2w − δ` | mm |
| Contact length `L_c` | `L_c = k · 2√(2 R_r δ)` | mm |
| Open lumen area `A_ℓ` | `A_ℓ = π d² / 4` | mm² |
| Volume / roller `V_roller` | `V_roller = A_ℓ · L_c` | µL |
| Total displaced `V_total` | `V_total = N_c · V_roller` | µL |
| Arc compensation `ΔArc_total` | `ΔArc = N_c · L_c` | mm |

### Key Result

The compensating arc per roller equals its axial contact length exactly:

```
ΔArc = V_roller / A_ℓ = L_c    (per engaged roller)
```

The lumen area cancels; the correction is purely geometric.

### Warning Logic

- `δ > 2w` → **DANGER** strip — crushing wall material, not closing lumen
- `δ < 0.10 × 2w` → **CAUTION** strip — occlusion may be incomplete

---

## Hardware Constants & Sources

| Parameter | Value | Source |
|-----------|-------|--------|
| Tube selection | Masterflex Ismatec Puri-Clear LL, 2-stop microbore | Cole-Parmer 14-035 Rev C |
| Default ID `d` | 0.51 mm | Ismatec selection guide; Darwin Microfluidics |
| Default wall `w` | 0.85 mm | Platinum-cured silicone 2-stop: 0.89 ID / 2.59 OD → w = 0.85 mm (Cole-Parmer MFLX06421-26) |
| Roller candidates | R_r = 5 mm (MR105ZZ) or 8 mm (625-2RS) | Design selection |
| Occlusion band | δ = 10–20% × 2w | Pump Industry Magazine (2014) |
| Occlusion onset | G < 2w required | Boxer Pumps tech note |
| k correction | k ≥ 1 (perfect-compliance underestimates) | Klespitz & Kovács, Sensors & Actuators A (2022) |

---

## Assumptions

1. Bulk-incompressible wall (constant inner perimeter)
2. Rigid backing plate (no deflection)
3. Idealised stadium shape (first-order model)
4. Quasi-static, single cross-section view
5. No backpressure term

---

## KaTeX Dependency

Formulas rendered via KaTeX.
- CDN: `https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/`
- Local fallback: `katex/katex.min.css`, `katex/katex.min.js`, `katex/auto-render.min.js`
- Note: KaTeX font files are not bundled locally; offline use renders with browser fallback math fonts.
