# Pump Testing Protocol, Tool Spec

**Tool:** Pump Testing Protocol
**File:** `tools/pump-testing/index.html`
**Status:** Live, short document page (cut down from the long two-layer protocol on 2026-09-19)

---

## Purpose and scope

A short, citable summary of the dispensing-accuracy qualification of the peristaltic pump: the
gravimetric method, the campaign actually run on proto-02 v2.3, the measured numbers, and the
deviations from the ideal method with their reasons. It is written to be read in about three
minutes by a recruiter or an examiner, not to be worked through as a bench procedure.

**Document-first, no calculator.** Prose, one static table, one metric row, one KaTeX formula.
No `<input>` element and no live computation anywhere in the file.

**Standards frame.** Test method adapted from **ISO 23783-2 Annex D** (single-channel
gravimetric). Performance benchmark by analogy to **ISO 8655**, via a calibrated micropipette
weighed on the same balance. The analogy is not a compliance claim: the pump is not a
piston-operated apparatus.

**Out of scope:** a live results calculator, a run-sheet or test-grid planner, CSV export, any
connection to the data-acquisition app.

### Where the long version went

Until 2026-09-19 this page carried a full two-layer protocol, about 1230 lines: the market-grade
ideal method (framing, Annex D apparatus, Table 3 balance requirements, Annex A mass-to-volume,
replicate convention, trueness and precision benchmark, reporting and measurement uncertainty,
alternate methods, go-to-market map) plus the prototype protocol and its deviations. That text is
preserved in two places:

- **Git history**, any commit before 2026-09-19 on `tools/pump-testing/index.html`, and this
  spec's own history for the standards detail.
- **The thesis, chapter 6**, which is the canonical written home for the full method.

Nothing in the long version is contradicted by the short page; it is dropped, not revised.

---

## Page structure (as shipped)

One self-contained page, shared frame (`.site-nav`, `#instr-panel`, `.site-foot`, `.bg-blobs`)
plus four numbered sections and a closing panel:

| Anchor | Section | Content |
|---|---|---|
| (hero) | Pump Testing Protocol | One sentence: the gravimetric method, adapted from ISO 23783-2, with an ISO 8655 micropipette benchmark. The page's only eyebrow label |
| `#method` | 01 Method in five lines | Balance readability, evaporation blank and correction, randomised order, Z-factor conversion (the page's one KaTeX formula), micropipette benchmark on the same balance |
| `#campaign` | 02 What was run on proto-02 | Hardware, the full factorial, replicate count, environment, reference pipette |
| `#results` | 03 Results | Six-tile metric row plus two sentences of interpretation |
| `#deviations` | 04 Deviations from the ideal | Six-row table: deviation, why, effect |
| (closing) | Closing panel | Links to the Proto-02 record and the Rotor Geometry Solver |

**CSS.** Page-specific styles live in the file's own `<style>` block. Retained classes:
`.tool-main`, `.tool-header`, `.glass-panel`, `.part-label` + `.num`, `.theory-card`,
`.theory-section`, `.table-wrap`, `table.spec-table`, `.callout`, `.math-block`, plus one new
`.metric-grid` / `.metric` pair for the results row. The classes that served removed sections
(`.toc-list`, `.dual-frame-grid`, `.frame-card`, `.map-card` family, `.layer2-*` family,
`.scope-*`, `.rationale-details`, `.verdict-badge`, `.tag-unverified`, `.const-list`,
`.stub-note`, `.callout--warn`, `.row-compliant`) were deleted with them. `assets/style.css` is
untouched.

**Scripts.** One inline script: the KaTeX auto-render call. KaTeX is vendored local-only at
`tools/pump-testing/katex/`, no CDN, so the page renders offline from a USB drive.

---

## Formulas and constants

These are the canonical reference for the method even though the short page prints only Formula
A.4. All four Annex A formulas are self-contained within ISO 23783-2 Annex A; Annex A does not
delegate the Z-factor arithmetic to ISO 8655-6.

**Formula A.1, buoyancy-corrected volume from mass:**

$$V_L = (m_L - m_E)\cdot\frac{1}{\rho_L}\cdot\frac{1-\frac{\rho_A}{\rho_B}}{1-\frac{\rho_A}{\rho_L}}$$

`V_L` delivered volume at test temperature; `m_L, m_E` loaded and empty (tare) vessel mass;
`ρ_L` test-liquid density at test temperature (Formula A.3); `ρ_A` air density (Formula A.2);
`ρ_B` calibration-weight density, **8.0 g/mL** for stainless-steel weights.

**Formula A.2, air density:** the CIPM-2007 equation, from air temperature, barometric pressure
and relative humidity. Valid 15 to 27 °C, 600 to 1100 hPa, 20 to 80 % RH.

**Formula A.3, the Tanaka formula (pure-water density):**

$$\rho_W = a_5\left[1 - \frac{(t_W+a_1)^2(t_W+a_2)}{a_3(t_W+a_4)}\right]$$

| Constant | Value |
|---|---|
| a₁ | −3.983035 °C |
| a₂ | 301.797 °C |
| a₃ | 522528.9 °C² |
| a₄ | 69.34881 °C |
| a₅ | 0.999974950 g/mL |

**Formula A.4, the practical shortcut (the one printed on the page):**

$$V_i = m_i \cdot Z$$

Z in µL/mg, looked up for test temperature and pressure. Around 20 °C and 1013 hPa,
Z ≈ 1.00285 µL/mg (Table A.1 spans 15.0 to 30.0 °C in 0.5 °C steps across 800 to 1050 hPa).

**Trueness (systematic error):** $e_T = \frac{\bar{V} - V_0}{V_0}\times 100\%$

**Precision (coefficient of variation):** $CV = \frac{s}{\bar{V}}\times 100\%$

Computed per test point, never pooled across points. A batch-mean measurement is metrologically
distinct from single-dose stroke-to-stroke CV.

**Evaporation correction (as actually applied):** exposure equals the dispense duration, since the
operator reads immediately. `m_corr = m_measured + E · t_dispense`, with **E = 0.118 mg/s**
(7.1 mg/min) from a linear fit of the blank series. The correction is below 0.7 % everywhere.

**Mass to volume as actually applied:** ρ = 0.997 mg/µL, no buoyancy term.

### Reference constants from the ideal method

- **Minimum balance readability at 0.5 to 20 µL: 0.001 mg** (ISO 23783-2 Table 3). The prototype
  balance reads 0.1 mg, which is compliant only for deliveries at or above 200 µL. This is the
  binding constraint behind the slope method and the bounded single-stroke CV.
- **Environmental conditions, Table D.1:** water and air temperature 17 to 30 °C (change during
  test ≤ 1 °C and ≤ 3 °C), relative humidity 45 to 70 % (change ≤ 10 %).
- **Preparation:** pre-rinse the delivery path ≥ 5 times on every tube change; thermal equilibrium
  ±2 °C for ≥ 2 hours; balance settle ≥ 6 seconds per reading.
- **Evaporation blanks:** ≥ 10 blank cycles before any test-liquid measurement.
- **Replicates:** n = 10 per volume at three test points (100 %, 50 %, 10 % of nominal), the
  ISO 8655 convention, since Annex D.5.3(g) leaves the count open.
- **Test liquid:** ISO 3696 grade 3 water.

---

## Measured values printed on the page

From the 2026-07-23 campaign on proto-02 v2.3 (gap 1.52 mm, 0.51 mm ID tube), 76 replicates,
full factorial of 1, 100 and 300 strokes against 60, 120, 180 and 240 rpm, deionised water at
about 20 °C and 20 % RH.

| Value | Number |
|---|---|
| Per-stroke volume at 180 rpm | 4.53 µL |
| Delivered-volume CV, 100 strokes | 0.25 % |
| Delivered-volume CV, 300 strokes | 0.34 % |
| Micropipette CV, same balance | 0.27 % |
| Monotonic droop, 60 to 240 rpm | 2 % |
| Single 5 µL stroke CV | bounded at about 6 %, instrument-limited |

The single-stroke figure is an upper bound from the root-N back-calculation, inflated by
run-to-run drift that does not average down. It is not a measured value and the page says so.

---

## Deviations table (the six rows on the page)

Balance 0.1 mg instead of 0.001 mg; 3 to 5 evaporation blanks instead of ≥ 10; pre-rinse ≥ 5
kept in full; room temperature noted at start and end instead of a 2 h logged equilibration;
Z-factor from water density alone with no buoyancy term; 3, 5 or 10 replicates by volume instead
of 10 everywhere. Each row carries its reason and its effect. Source:
`prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/TEST-PROTOCOL.md` §7.

---

## Assumptions

- The pump-to-pipette comparison is an analogy, not a compliance claim.
- Single-channel gravimetric (Annex D) is effectively the only applicable ISO 23783-2 method for
  this device shape: the photometric and multi-well methods assume a microplate liquid handler,
  and gravimetric regression (Annex E) is restricted to non-contact, free-flying-droplet devices.
- The slope method (fit delivered volume against stroke count, read the per-stroke volume off the
  slope) is a defensible engineering workaround for a sub-resolution single-stroke volume, not a
  normatively recognised alternate method.
- IEC 60601-2-24 trumpet curves were considered and rejected: they characterise continuous flow
  rate over long windows, mismatched to discrete 5 µL strokes.
- Thermal-expansion correction is omitted: no calibrated coefficient exists for a 3D-printed
  housing, so it is left out rather than guessed.
- Accuracy is calibratable by a step-count multiplier; precision is not. Precision is therefore
  the figure of merit.

---

## Cross-links

- **`prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/index.html`**, linked from the
  page: the build, the gap sweep and the full result tables.
- **`tools/rotor-solver/`**, linked from the page: the 5 µL per stroke rotor geometry this
  protocol qualifies.
- **`prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/TEST-PROTOCOL.md`** and
  **`TEST-RESULTS.md`**: the primary sources for the campaign, the corrections and every number
  on the page.
- **`tools/peristaltic-roller-displaced-volume-model/`**: the displaced-volume model behind the
  geometric prediction, and the KaTeX vendoring precedent.
