# Pump Testing Protocol — Tool Spec

**Tool:** Pump Testing Protocol
**File:** `tools/pump-testing/index.html`
**Status:** Live — document-first, two-layer dispensing-accuracy qualification protocol (Phase 9)

---

## Purpose and scope

A written, QR-citable dispensing-accuracy qualification protocol for the peristaltic dispensing
pump (~5 µL/stroke, point-of-care use, intended to replace a human aliquoting by hand with a
pipette). **Document-first (D-01):** the page is prose + static reference tables + KaTeX formulas
+ one collapsible `<details>` rationale block — no calculator, no `<input>` element, no live
results computation anywhere in the file. It is structured as **two stacked layers**:

1. **Top layer — the "righteous" market-grade protocol** (Sections 1–9). How a dispensing-accuracy
   qualification of the pump *should* be run if it went to market. Dispensing-accuracy metrology
   (test method, balance/environment requirements, mass→volume conversion, replicates,
   trueness/precision, reporting/uncertainty) is the **deep, complete core** (Sections 2–7). The
   other go-to-market dimensions — safety/reliability/lifetime, biocompatibility, QMS/regulatory
   pathway — are **mapped**, structured but visibly lighter (Section 9), per the D-03 depth
   allocation: not omitted, not treated at equal depth.
2. **Bottom layer — the actual prototype protocol + justified deviations** (Section 10). The
   method actually used on proto-02 v2.3, with reasoned engineering justification for every
   deviation from the top layer's restrictive ideal, given prototyping-stage hardware limits
   (principally a 0.1 mg balance where Table 3 requires 0.001 mg at this volume). This layer is
   authored, not deferred — it documents deviations as defensible engineering judgment, not
   apology.

**In scope:** the written protocol itself — both layers, fully authored, cross-linked, and
internally consistent with the shipped page.

**Out of scope (deferred, D-01/D-02):** a live results calculator (paste masses → computed
trueness/CV/Z-factor), a DoE run-sheet / test-grid planner, CSV export, and any connection to the
user's data-acquisition app. These belong to a **future phase** that wires this page to actual
measured data; building calculation logic speculatively now was explicitly rejected. The bottom
layer (Section 10) itself is fully authored in this phase (Plan 09-06) — it is the actual protocol
+ deviations, not the deferred calculator.

---

## Standards anchor — the dual frame (Section 1, `#framing`)

Two standards apply, doing two different jobs; neither substitutes for the other:

| Frame | Standard | Job |
|---|---|---|
| **Test method** | **ISO 23783-2 Annex D** (single-channel gravimetric procedure) | *How to measure.* The pump is literally an automated liquid handling system (ALHS) by the standard's own scope (§1) — Annex D is written for exactly this device shape: one channel, any liquid, contact delivery into a vessel. |
| **Performance benchmark** | **ISO 8655** (Parts 2 and 6) | *What counts as accurate.* Applied **by analogy**, not literal compliance — the pump is not a piston-operated apparatus, but its job is to replace a person pipetting by hand, so pipette-grade trueness/CV is the natural comparison. |

**Honest gaps recorded on the page, not paraphrased over:**
- **ISO 23783-2 Part 2 sets no device tolerance.** Its own §9 (Reporting) delegates "measurement
  results, traceability, and measurement uncertainty" to **ISO 23783-3**, which this project does
  **not hold** and has not verified. Table 1's 1.4%/0.6% figures (§5.1) are the gravimetric
  **method's own achievable uncertainty**, not a device pass/fail spec — reading one as the other
  is a category error the page explicitly warns against (Section 6).
- **ISO 8655-2:2022's exact permissible-error percentages are `[unverified — obtain via DTU
  library]`.** The standard is paywalled; only its confirmed structure (two bounded error types,
  tightening toward larger volumes, three test points, n=10) is stated as fact. No specific
  percentage is quoted as if verified.

---

## Normative values / "inputs"

Here "inputs" are the standards content the page relies on and reports as normative reference
material, not calculator input fields (there are none — D-01).

### Table 3 — minimum balance requirements (`#balance-requirements`)

| Delivered volume | Readability | Repeatability | Expanded uncertainty (k=2) |
|---|---:|---:|---:|
| < 0.5 µL | 0.0001 mg | 0.0005 mg | 0.001 mg |
| **0.5 ≤ V < 20 µL** | **0.001 mg** | 0.006 mg | 0.012 mg |
| 20 ≤ V < 200 µL | 0.01 mg | 0.025 mg | 0.05 mg |
| 200 ≤ V ≤ 10 000 µL | 0.1 mg | 0.2 mg | 0.4 mg |

The pump's ~5 µL/stroke target falls in the **0.5–20 µL** band, requiring a **0.001 mg (1 µg,
semi-micro)** balance for ISO-compliant single-dose measurement.

### Table D.1 — environmental conditions (`#method-gravimetric`)

| Condition | Range | Permitted change during test |
|---|---|---|
| Water temperature | 17 °C – 30 °C | ≤ 1 °C |
| Air temperature | 17 °C – 30 °C | ≤ 3 °C |
| Relative humidity | 45% – 70% | ≤ 10% |

### Preparation constants (§6.3, `#method-gravimetric`)

- **Pre-rinse** the delivery path **≥ 5×** to waste on every tip/tube change, before any
  measurement cycle begins.
- **Thermal equilibrium ±2 °C for ≥ 2 hours** (pump, test liquid, balance) before testing starts.
- **Balance settle ≥ 6 seconds** before reading each mass (§6.1).

### Evaporation-blank workflow (§D.5.2, `#method-gravimetric`)

**≥ 10 blank measurement cycles** (empty dispense/weigh cycles at the same cycle time as a real
delivery) must characterise the vessel's evaporation rate under actual test conditions **before**
any test-liquid measurement begins. The blank baseline is subtracted from subsequent measurements
(Formulas D.1–D.2) so evaporation loss during weighing is not mistaken for dispensing error.

### Replicate convention (`#replicates`)

Annex D.5.3(g) itself leaves replicate count open ("perform as many measurements as required" —
delegated onward, the same ISO 23783-3 gap). The operative convention actually used, from **ISO
8655**: minimum **n = 10** measurements per volume, at **three test points — 100%, 50%, 10%** of
the nominal delivered volume.

---

## Formulas (Section 4, `#mass-to-volume`, and Section 5, `#replicates`)

All four Annex A formulas are **self-contained within ISO 23783-2 Annex A** — Annex A does **not**
delegate the Z-factor calculation to ISO 8655-6 (§6.1 Note 2 cross-references ISO 8655-6 only for
balance *hardware* requirements behind Table 3, not this arithmetic).

**Formula A.1 — buoyancy-corrected volume from mass:**

$$V_L = (m_L - m_E)\cdot\frac{1}{\rho_L}\cdot\frac{1-\frac{\rho_A}{\rho_B}}{1-\frac{\rho_A}{\rho_L}}$$

where `V_L` = delivered liquid volume at test temperature; `m_L, m_E` = loaded and empty (tare)
vessel mass; `ρ_L` = test-liquid density at test temperature (Formula A.3); `ρ_A` = air density
(Formula A.2); `ρ_B` = calibration-weight density — **8.0 g/mL** for the stainless-steel weights
used to verify the balance (Note 2).

**Formula A.2 — air density (CIPM-2007 equation):**

$$\rho_A = \rho_A(t_A,\, p,\, h_r) \qquad \text{CIPM-2007 air-density equation}$$

Computed from air temperature `t_A`, barometric pressure `p`, relative humidity `h_r`; valid
15–27 °C / 600–1100 hPa / 20–80% RH, comfortably covering Table D.1's 17–30 °C range.

**Formula A.3 — the Tanaka formula (pure-water density):**

$$\rho_W = a_5\left[1 - \frac{(t_W+a_1)^2(t_W+a_2)}{a_3(t_W+a_4)}\right]$$

Tanaka constants:

| Constant | Value |
|---|---|
| a₁ | −3.983035 °C |
| a₂ | 301.797 °C |
| a₃ | 522528.9 °C² |
| a₄ | 69.34881 °C |
| a₅ | 0.999974950 g/mL |

`t_W` = water temperature in °C. This is the same Tanaka reference-density formula used throughout
ISO 3696 grade-3-water gravimetric verification.

**Formula A.4 — the practical shortcut:**

$$V_i = m_i \cdot Z$$

Once the Z-factor (µL/mg) is looked up for test temperature/pressure (Table A.1), every subsequent
mass reading converts to volume by a single multiplication.

**Table A.1 excerpt** (illustrative, self-derived from Formulas A.1–A.3 using the CIPM ideal-gas
air-density approximation, not transcribed from the standard's certified grid — full table spans
15.0–30.0 °C in 0.5 °C steps × 800–1050 hPa): 19.5/20.0/20.5 °C × 950/1000/1013/1050 hPa, Z ≈
1.00269–1.00300 µL/mg.

**Trueness (systematic error):**

$$e_T = \frac{\bar{V} - V_0}{V_0}\times 100\%$$

**Precision (coefficient of variation):**

$$CV = \frac{s}{\bar{V}}\times 100\%$$

Both computed per test point (100%/50%/10%), never pooled across points. A batch-mean measurement
(small n, averaged) is metrologically distinct from single-dose stroke-to-stroke CV — the
distinction the bottom layer's rig split (batch-mean rig vs stroke-to-stroke-CV rig) is built
around.

---

## Assumptions

- **The pump-to-pipette analogy is exactly that — an analogy, not a compliance claim.** The pump
  is not a piston-operated apparatus (ISO 8655's literal scope); it is benchmarked against
  pipette-grade trueness/CV because its job is to replace hand-pipetting.
- **Gravimetric single-channel (Annex D) is close to the only applicable method** for this device
  shape among the methods ISO 23783-2 actually defines. Almost every alternative (Annexes B/C/F/H,
  the photometric/fluorescence family) assumes a microplate-format multi-well liquid handler; this
  pump has one outlet and delivers by contact into a vessel. Gravimetric regression (GRM, Annex E)
  is explicitly restricted to **non-contact, free-flying-droplet/jet** devices and does not apply
  to this contact-delivery pump. Titrimetric (ISO 8655-7) is mentioned for completeness with its
  applicability to a non-piston pump unverified.
- **The slope method is not the ISO GRM.** proto-02's own linear-regression workaround (fit
  delivered volume vs stroke count, extrapolate the single-stroke volume) is inspired by the same
  logic as GRM but is a defensible engineering workaround for this prototype's sub-balance-
  resolution single-stroke volume — not a normatively-recognized alternate method.
- **IEC 60601-2-24 trumpet curves were considered and rejected** as an accuracy frame: they
  characterise continuous/near-continuous flow-rate accuracy across long observation windows,
  mismatched to this pump's discrete ~5 µL strokes.
- **Thermal-expansion correction (§7) is not applicable.** There is no calibrated thermal-expansion
  coefficient β for a 3D-printed pump housing, so the correction term is omitted rather than
  guessed.
- **ISO 3696 grade 3 water** is the standard reference liquid for gravimetric verification, chosen
  for its well-characterised, temperature-dependent density (Tanaka formula).

---

## Bottom layer — actual prototype protocol + justified deviations (Section 10, `#prototype-protocol-slot`)

Authored in this phase (Plan 09-06), transcribed directly from the user-supplied
`prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/TEST-PROTOCOL.md`, primarily its §7.
Visually distinct from the top layer via a violet-accent `.layer2-card` CSS family (vs the top
layer's orange `.theory-card`), so a reader can tell which layer they are in without reading prose.

**Measured baseline:** proto-02 v2.3 delivered **2.95 µL/stroke at 180 rpm (−41%)** against the
5 µL target; a revolution-count check (E7) confirmed **no missed motor steps** at any speed —
the deficit is volumetric, not step-loss.

**The two-axis model.** Accuracy (mean vs target) is **calibratable** — a step-count multiplier
fixes a known offset. Precision (`CV = SD/V̄ × 100%`) is **not** calibratable — random scatter is
the true, honest quality of the mechanism, and therefore the fundamental figure of merit.

**The binding constraint: a 0.1 mg balance.** Against Table 3 (above), the prototype's balance
is compliant only for deliveries **≥ 200 µL** — two orders of magnitude coarser than the 0.001 mg
the 0.5–20 µL band requires. Three workarounds make this balance sufficient:

1. **Mean from the slope** — fit `delivered = m·strokes + b` using only compliant (≥200 µL)
   points; the slope `m` = volume/stroke at ISO grade, with no micro-balance.
2. **Per-stroke CV via √N (root-N scaling)** — `CV_stroke = CV_collection × √N`, measuring CV of
   a large collection where the balance is clean, then scaling back to the single stroke (valid if
   strokes are independent).
3. **Same-instrument interleaved pipette comparison** — weigh the pump's 5 µL and a calibrated
   pipette's 5 µL on the same balance, same method, interleaved; the balance's systematic error
   cancels in the comparison (`SD_observed² = SD_pump² + SD_scale²`).

**The deviation table** (ISO 23783-2 requires | We do | Justification — the centerpiece,
transcribed from TEST-PROTOCOL.md §7, six rows): balance grade (0.001 mg → 0.1 mg, workarounds
above); ≥10 evaporation blanks → 3–5 blanks/session (fast weigh limits evaporation); pre-rinse ≥5×
→ **kept** (free, fixes observed non-stationarity); thermal equilibrium/logging → note room
temp start/end only (flags drift at prototype scale); Z-factor density/buoyancy → assume 1.00
mg/µL (<0.3% vs a 5% CV budget, negligible); n=10 → n=3/5/10 by volume (prototype means, not
certification, stated as such).

**The pipette head-to-head (thesis claim):** if the pump's CV at 5 µL is ≤ a manual pipette's CV
at 5 µL (benchmarked against the ISO 8655 pipette band, 1.5–3%), the device is more consistent
than the human it replaces — on the one metric (precision) that cannot be faked by calibration.
Valid because both are weighed interleaved on the same balance (systematic error cancels), guarded
by a 50 µL floor-separability check.

**Honest can/cannot-claim scope:**
- **Can claim:** per-stroke volume and its speed/volume dependence to good precision on the mean;
  the operating point and a retro-explanation of the −41%; head-to-head precision vs manual
  pipetting at the operating dose.
- **Cannot claim:** certify CV ≤ 5% at n=10 (~±25% uncertainty — needs a Stage-2 n≈30 deep-dive);
  prove the design beyond this single build; directly measure single-dose precision (it is inferred
  via √N); speak to real-use conditions beyond water-only, no backpressure.

---

## Still-deferred scope

Explicitly **not** built in this phase, deferred to a future phase that connects this page to the
user's actual data-acquisition app:

- **Live results calculator** — paste measured masses in, compute trueness (%), CV (%), and the
  Z-factor mass→volume conversion live.
- **DoE / test-grid planner** — an interactive balance-readability → compliant-volume lookup, run
  grid generator.
- **CSV run-sheet export.**

These are the seed's original "Calculator" and interactive "Planner" modes (D-01/D-02) — explicitly
out of scope for this document-first phase. The bottom layer (Section 10, actual prototype protocol
+ deviations) is **not** part of this deferred set — it is fully authored in Phase 9 (superseding
the original D-04 deferral once the user supplied the actual protocol).

---

## Cross-links

- **`tools/rotor-solver/`** — the 5 µL/stroke rotor-geometry design point this protocol qualifies.
- **`tools/peristaltic-roller-displaced-volume-model/`** — the displaced-volume model behind the
  slope-method's effective-inflation-factor back-calculation; also the KaTeX local-fallback
  precedent this tool's KaTeX vendoring follows (though this tool loads KaTeX **local-only**, no
  CDN, per its offline-first requirement — a stricter pattern than the displaced-volume model's
  CDN-primary/local-fallback approach).
- **`prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/TEST-PROTOCOL.md`** — the primary
  source for the bottom layer (Section 10): §1 two-axis model, §2 balance workarounds, §3–5
  why-these-volumes/speeds/replicates rationale, §6 pipette head-to-head, §7 the deviation table
  (centerpiece), §8 two-stage screen-then-lock strategy, §11 honest scope.
- **`prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PROTOTYPE.md`** — design targets
  (5 µL/stroke, CV ≤ 5%, mean ±2%), the v2.3 measured baseline (2.95 µL/stroke, −41%), and the
  E7 revolution-count step-loss check.
- **`.planning/notes/2026-06-17-dispensing-accuracy-standards.md`** — the standards-landscape
  reconsideration that led to the dual-frame verdict (RQ-1), rather than defaulting to the phase
  seed's original single-standard (ISO 23783-2-only) assumption.

---

## Page structure (as shipped)

`tools/pump-testing/index.html` — one self-contained page, ten sections:

1. `#framing` — dual-frame verdict, honest Part-2/Part-3 correction
2. `#method-gravimetric` — Annex D apparatus, preparation, Table D.1, evaporation blank
3. `#balance-requirements` — Table 3, compliant band highlighted, forward-link to Section 10
4. `#mass-to-volume` — Annex A formulas (A.1–A.4), Tanaka constants, Table A.1 excerpt
5. `#replicates` — n=10/three-point convention, trueness/CV formulas, batch-mean vs stroke CV
6. `#trueness-precision` — ISO 8655-2 benchmark structure (`[unverified]` values), Table 1 category-error warning
7. `#reporting-uncertainty` — ISO 23783-3 gap, GUM vs whole-system MSU approaches, thermal-expansion non-applicability
8. `#alternate-methods` — methods comparison table, why-gravimetric rationale, GRM/trumpet-curve rejections
9. `#go-to-market` — lighter-styled map (biocompatibility, QMS, CLIA, POCT)
10. `#prototype-protocol-slot` — Layer 2, the bottom layer (violet `.layer2-card` family)

No CDN dependencies (KaTeX vendored local-only at `tools/pump-testing/katex/`); no `<input>`
elements anywhere in the file; `assets/style.css` untouched — all page-specific CSS lives in the
file's own inline `<style>` block, per site convention.
