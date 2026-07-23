# Phase 9 — Pump Testing tool · Context Seed

> Raw seed captured at phase-add time (2026-07-23). **Not yet reconciled** — `/gsd:discuss-phase 9`
> must reconsider scope from first principles. The user explicitly warned: *"Do not assume that what
> we have found so far are the right things, maybe think them through again."* Treat every framing
> below (planner+calculator, slope method, DoE blocks) as a **candidate**, not a locked decision.

---

## What the user asked for (verbatim intent)

Describe how a full-fledged testing protocol should be carried out **if this pump would actually go
to market**. Do fresh research if needed — we know what pump this is, what it's for; search
appropriately and re-think the earlier findings.

Write it into a **new tool called "Pump Testing"** with two stacked layers:

1. **The righteous protocol** — the market-grade protocol that *should* be run, with all
   specifications, and different methods where required.
2. **The actual prototype method** — below the ideal, the method actually used on the prototype,
   with the logical explanation for each deviation. Rationale: *we are prototyping; the ISO
   requirements are too restrictive and in many cases we lack the hardware to carry them out.*

**Pending input:** the user will provide the actual prototype testing protocol "in a bit" — do not
finalize the bottom layer until it arrives.

---

## Tool concept (candidate — challenge in discuss-phase)

An interactive gravimetric test planner + results calculator for the pump, grounded in ISO 23783-2
Annex D. Two possible modes:

- **Planner:** balance readability + target volume + speeds → ISO-compliant volume range, required
  replicates, a DoE run grid (volume × speed × n), the evaporation-blank workflow, and a
  ready-to-paste "documented deviations" statement for the thesis. Export CSV run sheet.
- **Calculator:** paste back the measured masses → apply evaporation correction + Z-factor
  (mass→volume), compute trueness (systematic error %) and precision (CV %) per volume, with
  measurement uncertainty.

Natural sibling to the rotor-solver, displaced-volume model, and throughput simulator.

---

## VERIFIED standards content (from `prototypes/DS_EN ISO 23783-2_2023.pdf`, DTU-licensed)

**Method:** Single-channel gravimetric — Annex D (normative). This is the pump's method. Other
methods in the standard don't fit: §5.3.2/Annex E "gravimetric regression" is 0.005–1 µL
non-contact droplet/jet only; §5.2/5.4 photometric & hybrid are for 96/384-well plates.

**Balance readability — Table 3 (single channel, single delivery):**

| Delivered volume | Readability | Repeatability | Expanded unc. (k=2) |
|------------------|-------------|---------------|---------------------|
| < 0.5 µL         | 0.0001 mg   | 0.0005        | 0.001               |
| 0.5 – 20 µL      | 0.001 mg    | 0.006         | 0.012               |
| 20 – 200 µL      | 0.01 mg     | 0.025         | 0.05                |
| 200 – 10000 µL   | 0.1 mg      | 0.2           | 0.4                 |

→ Core tool logic: readability in → compliant volume floor out. (0.1 mg scale ⇒ compliant only ≥ 200 µL.)

**Evaporation (D.5.2, D.6.1):** not ignored — take ≥10 blank cycles (tare → run delivery cycle to
waste, same cycle time → weigh), average the mass loss b̄, add it back to every reading
(m′ᵢ = mᵢ + b̄). Alternatives: lidded vessel, or open vessel with 3:1 height-above-fluid : diameter ratio.

**Preparation (6.3):** pre-rinse tube ≥5× to waste (every tip change); thermal equilibrium ±2 °C for
≥2 h; prime immediately before; balance settle ≥6 s; record T, RH, pressure at start and end.

**Test conditions — Table D.1:** water 17–30 °C; air 17–30 °C (≤3 °C change); RH 45–70 % (≤10 % change).

**Test liquid (D.3):** ISO 3696 grade 3 water, degassed or air-equilibrated.

**Mass → volume (Annex A):** Z-factor = density + air-buoyancy correction; needs liquid temp, air
temp, pressure. Don't hardcode Z — pull the table from ISO 8655-6 / compute per Annex A; the tool
should take temp/pressure as inputs.

**Replicate count:** Part 2 leaves it open ("perform as many measurements as required", D.5.3). n
comes from Part 3 + the ISO 8655 convention of n = 10.

**Reporting (§9 → ISO 23783-3):** results, traceability, and measurement uncertainty per Part 3;
report systematic error (trueness) and random error (precision) together.

**Traceability/uncertainty (§8, D.7):** calibrated balance + environmental equipment; MSU per EURAMET CG-19.

---

## The metrological design decision to encode (the "slope method")

A 0.1 mg balance can't weigh 5 µL, so fit `delivered = m·strokes + b` using only ≥200 µL deliveries
(ISO-compliant), extract per-stroke `m` + offset `b` at ISO grade, then predict 5 µL as `m·1 + b`.
Single-stroke weighings are an indicative cross-check only. Tool should make this the recommended
path and label sub-200 µL rows "indicative."

---

## Pump-specific inputs (from proto-02 PROTOTYPE.md §2, §8.1, §8.2, §11)

- **Targets:** 5 µL/stroke, CV ≤ 5 % (stretch ≤3 %), mean known to ±2 %. Pipette benchmark at 5 µL:
  CV 1.5–3 % (ISO 8655).
- **Confirmed:** no missed steps at any speed, incl. 1/16 µstep (E7 closed) → the ~2.95 µL/stroke
  deficit at 180 rpm is volumetric, not step-loss; runs were non-stationary (needs pre-wet + priming
  discard, which ISO backs).
- **Geometry:** gap 1.52 (concentric), δ = 0.30, N_c = 2, 4 rollers, tube ID 0.51 / w 0.91 /
  2w 1.82 / OD 2.33.
- **DoE converged:** Block 0 pipette benchmark (5/50/500 µL ×10, rig validation); Block 1 compliant
  calibration line (100/200/300/400/500 strokes, n=10, speeds 60/120/180); Block 2 small-volume
  indicative (1/2/4/10/20 strokes). Evaporation blanks each session.
- **E5 link:** back-calculate effective k by comparing measured m to the displaced-volume model
  prediction.

---

## Site conventions (from CLAUDE.md)

- Static HTML/CSS/JS, no build, offline-capable, no CDN (local fallback pattern — see the `katex/`
  folders for formula-rendering precedent).
- Dark glassmorphic design system (bg #0a0a0c, accent #ff6b2b→#e83535); tokens in `assets/style.css`;
  `← All tools` nav bar.
- Co-located `SPEC.md` (purpose, inputs, formulas, constants, assumptions); add a README table row +
  ROADMAP entry; update `CLAUDE.md` folder structure.
- CSV-export + inline-`<script>` calculation precedent already in sibling tools.

---

## Resources

| Resource | Use | Where |
|----------|-----|-------|
| DS/EN ISO 23783-2:2023 | primary method (Annex D, Table 3, Annex A) | `prototypes/DS_EN ISO 23783-2_2023.pdf` (local, DTU-licensed) |
| ISO 23783-1/-2/-3:2022 | vocab / methods / reporting | iso.org /76952 · /76958 · /76959 |
| ISO 8655-6 | gravimetric reference basis + Z-factor table | via DTU / Dansk Standard |
| ISO 8655-2 | pipette perf (calibrated-pipette benchmark) | DTU |
| ISO 3696 | water grades | DTU |
| EURAMET CG-19 | measurement-system uncertainty for gravimetry | euramet.org |
| IEC 60601-2-24 | infusion-pump accuracy framing (trumpet curves) — verify relevance | DTU |
| proto-02 PROTOTYPE.md | targets, measured data, DoE, deviations | `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PROTOTYPE.md` §2, §8.1–8.2, §11.10 |

---

## Open decisions for discuss-phase to resolve

1. **Scope:** pump-specific tool, or a general ALHS gravimetric planner with pump defaults?
   (Seed leans: general engine, pump preset.)
2. **Modes:** planner-only, or planner + results calculator? (Seed leans: both.)
3. **Sub-200 µL:** gravimetric only, or add a photometric branch? (Seed leans: gravimetric core +
   "photometric / borrow finer balance" callout.)
4. **Z-factor:** interactive (temp/pressure inputs, computed) vs fixed 20 °C table? (Seed leans:
   interactive — more honest, small extra work.)
5. **Outputs:** on-screen run sheet + CSV + a printable one-page protocol? Include the auto-generated
   "documented deviations" paragraph?
6. **The two-layer framing itself** (righteous protocol on top, actual prototype protocol +
   justified deviations below) is the user's core structural ask — confirm how much is
   narrative/documentation vs interactive calculator.

---

## Next step

`/gsd:discuss-phase 9` — reconsider scope from first principles, fold in the user's actual prototype
protocol once supplied, and resolve the open decisions above before planning.
