# Phase 9: Pump Testing — Research

**Researched:** 2026-07-23
**Domain:** Dispensing-accuracy metrology standards (ISO 8655 / ISO 23783-2 family) + lighter go-to-market frames (biocompatibility, QMS, POCT) for a document-first protocol tool page
**Confidence:** HIGH for the ISO 23783-2 method content (directly extracted from the DTU-licensed primary PDF this session); MEDIUM for the ISO 8655 structural facts (corroborated across independent secondary sources); LOW/unverified for exact ISO 8655-2:2022 numeric permissible-error values (paywalled, not obtainable this session)

## Summary

The phase's central question — which standard(s) anchor the dispensing-accuracy qualification — resolves to a **dual-frame, not a single winner**, and this session's primary-source read of the actual DTU-licensed ISO 23783-2 PDF *strengthens* rather than merely confirms the user's leading hypothesis, with one important correction the seed missed: **ISO 23783-2 Part 2 does not itself set device pass/fail tolerances.** Its own scope statement (§1) restricts it to "procedures for the determination of volumetric performance," and §9 Reporting explicitly hands specification/tolerance-setting to **ISO 23783-3** (a part this project does not have access to and is not itself pipette-equivalence-aware). ISO 23783-2's Table 1 numbers are the *measurement method's own achievable uncertainty*, not a device spec. That means the "what good is" benchmark cannot come from Part 2 at all — it has to come from somewhere that actually defines pass/fail numbers for a device in this volume range. ISO 8655 (Parts 2 and 6) is that source, and because the device's job is explicitly to replace a person pipetting by hand, benchmarking against pipette-grade trueness/CV by **analogy** (not by literal compliance claim — the pump is not a piston-operated apparatus) is the defensible framing.

Meanwhile ISO 23783-2's own scope text (§1: "applicable to all ALHS... which perform liquid handling tasks without human intervention") describes the pump almost verbatim — it *is* an automated liquid handling system by this standard's own definition — and Annex D (single-channel gravimetric method) is written for exactly this device shape: one channel, any liquid, contact delivery to a vessel. So the dual-frame is confirmed with a sharper division of labor than the seed stated: **ISO 23783-2 Annex D is the literally-applicable test method; ISO 8655 is the analogically-applicable performance benchmark; neither is the other's substitute.**

A second correction from the primary-source read: ISO 23783-2's own regression method (Annex E, "gravimetric regression method"/GRM) is explicitly restricted to **non-contact liquid delivery devices that deliver the liquid volume as free flying droplets or jets** — it does not apply to a peristaltic pump discharging into a submerged/contact tube outlet. proto-02's own "slope method" (fit `delivered = m·strokes + b` across ISO-compliant stroke counts, then predict the single-stroke volume) is inspired by the same regression logic but is **not** the ISO GRM procedure and must not be labeled as such in the top layer — it is a defensible engineering workaround for the bottom layer, not a normatively-recognized alternate method.

**Primary recommendation:** Anchor the top layer on the dual frame — ISO 23783-2 Annex D as the full gravimetric test-method backbone (balance grades, environment, evaporation, prep, Z-factor/mass→volume, traceability), and ISO 8655's pipette-grade trueness/CV convention (n=10, three test points at 10/50/100% of nominal, gravimetric reference method shared with Part 6) as the analogical performance benchmark — stated honestly as an analogy, with the exact ISO 8655-2:2022 numeric limits flagged `[unverified]` pending DTU-library access to the paywalled table.

## Architectural Responsibility Map

This is a static, offline, single-page documentation tool — there is no backend, API, or persistence tier. Every capability lives in the Browser/Client tier.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Protocol content rendering (prose, tables) | Browser / Client | — | Static HTML, no server |
| Formula rendering (Z-factor, CV, trueness, uncertainty) | Browser / Client | — | KaTeX (local) renders client-side, same as sibling tools |
| Balance-readability → compliant-volume lookup | Browser / Client | — | Static table (see Implementation Guidance); no computation needed |
| Expand/collapse section interactivity | Browser / Client | — | Light JS, no state persistence required |
| EN/IT toggle (if adopted) | Browser / Client | — | Existing site-wide `data-i18n` + localStorage pattern |
| Deferred: live results calculator (future phase) | Browser / Client | — | Out of scope for Phase 9 (D-01, D-02) |

## Project Constraints (from CLAUDE.md)

- Static HTML/CSS/JS only — no build tools, no npm, no frameworks; must work offline from USB and on GitHub Pages.
- New tool at `tools/pump-testing/index.html` + co-located `SPEC.md` (purpose, inputs/outputs — here "inputs" are the normative values/tables, not calculator inputs — formulas, constants, assumptions).
- No CDN-only dependencies — any external resource (e.g. KaTeX) needs a local fallback; precedent at `tools/peristaltic-roller-displaced-volume-model/katex/`.
- All tool-specific calculation/formula logic lives inline in the tool's own `<script>`/`<style>` blocks — `assets/style.css` stays byte-stable (dark glassmorphic tokens, `← All tools` nav bar, fade-up entrance).
- No horizontal scroll at 1280px or 375px — wide normative tables (e.g. Table 3, Table D.1, Z-factor Table A.1) must wrap headers/scroll internally within a card, not break page layout.
- Standard closing steps: landing-page card (EN+IT if i18n adopted), README tool-table row, repo-root `ROADMAP.md` row, `CLAUDE.md` folder-structure update.
- Do not use VS Code Live Preview on these files (`serve.bat` instead).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 (Document-first):** The page is an authoritative written protocol (prose + spec tables + expandable method sections), citable via QR like a thesis chapter — not an interactive planner+calculator. Interactivity is light at most (expand/collapse; possibly one small static lookup if it earns its place). No calculators required.
- **D-02 (Thesis artifact for now):** Purpose is to explain what a market-grade protocol would require and defend why the prototype's method justifiably deviates. A later phase connects the page to the real data-acquisition app; live calculation is explicitly not built now.
- **D-03 (Depth allocation):** Dispensing-accuracy metrology (trueness, precision, test method, environmental control, replicate convention, reporting, measurement uncertainty) is fully specified — the deep core. Safety, reliability/lifetime, biocompatibility, and QMS/regulatory framing are covered as a structured **lighter** "what full market-readiness also demands" map — not omitted, not equal depth.
- **D-04 (Bottom layer deferred):** Do not design the bottom layer (actual prototype protocol + deviations) in this phase. The user supplies the actual protocol later. Planning designs the top layer now and leaves a clean, obvious slot for the bottom layer (likely an ISO-requirement | prototype-reality | justification table, seeded from proto-02's already-documented deviations).

### Claude's Discretion

- Page structure/section ordering, how the two layers visually relate, use of KaTeX for any formulas (mass→volume, CV, uncertainty), EN/IT i18n scope, and whether the balance-readability→compliant-volume lookup is a static table or a tiny interactive widget — all left to planning/execution within the document-first, no-calculator constraint. Follow site conventions (dark glassmorphic theme, `← All tools` nav, inline `<style>`/`<script>`, offline/no-CDN, co-located SPEC.md).

### Deferred Ideas (OUT OF SCOPE)

- App-connected data acquisition + live results calculator (own future phase) — wire measured masses to compute evaporation correction, Z-factor mass→volume, trueness, CV, and measurement uncertainty per volume; the seed's "Calculator" mode and interactive "Planner" (balance→compliant-volume lookup, DoE run-grid, CSV export) — explicitly out of Phase 9.
- Auto-generated "documented deviations" paragraph for the thesis — nice-to-have export once the bottom layer exists.
- Relocating `.planning/notes/2026-06-17-dispensing-accuracy-standards.md` to the thesis LaTeX workspace — housekeeping, not this phase.

**No formal REQ-IDs govern this phase** — the trackable decision set is CONTEXT.md's D-01…D-04, resolved against RQ-1…RQ-4 below.
</user_constraints>

---

## RQ-1 — Which standard(s) anchor the dispensing-accuracy qualification?

**Verdict: Dual-frame, CONFIRMED with a correction.** ISO 23783-2 Annex D is the applicable *test method*; ISO 8655 is the analogical *performance benchmark*; the two are not interchangeable and neither alone is sufficient.

### What the primary source actually says (this session, direct PDF read)

`prototypes/DS_EN ISO 23783-2_2023.pdf` was password-protected against interactive PDF readers but opened cleanly with `pdftotext -upw ""` (empty user password; only the owner/edit password is set) — the full 4,774-line extracted text was read directly this session. All ISO 23783-2 claims below are `[VERIFIED: DS/EN ISO 23783-2:2023, direct PDF extraction, this session]` unless noted otherwise.

- **§1 Scope:** "This document specifies procedures for the determination of volumetric performance of automated liquid handling systems (ALHS)... applicable to all ALHS with complete, installed liquid handling devices... which perform liquid handling tasks without human intervention." The pump under test fits this description exactly — it *is* an ALHS by the standard's own words. `[VERIFIED]`
- **§9 Reporting:** "Measurement results, traceability, and measurement uncertainty shall be reported in accordance with **ISO 23783-3**." Part 2 does not itself specify pass/fail tolerances for a device — it is a measurement-method standard. Part 3 ("Determination, specification, and reporting of volumetric performance") is the part that would set device-level tolerances, and it is **not in this project's possession** and was not purchased/verified this session. `[VERIFIED — the delegation; unverified — Part 3's content]`
- **Table 1** (§5.1, overview of methods): lists *typical systematic/random error* figures achievable **by the measurement method itself** when correctly executed, per volume band and method — this is a measurement-uncertainty budget for the test, not a device specification. Conflating "the gravimetric method can resolve to 0.3%" with "the device must be accurate to 0.3%" would be a category error the top layer must not make. `[VERIFIED]`

Because Part 2 supplies no device-level tolerance and Part 3 is unavailable, the "what good performance looks like" number has to come from elsewhere. The user's own prior note (`.planning/notes/2026-06-17-dispensing-accuracy-standards.md`) already made this case for ISO 8655 on functional-equivalence grounds (device replaces a hand pipette); this session's primary-source read makes it the *only* available anchor with real per-volume numbers in the household of standards gathered so far.

### ISO 8655 as the performance-benchmark frame — confirmed structural facts

- **Two-part-family split:** ISO 8655-2 (pipette accuracy/precision requirements) sets the trueness/CV limits per volume; ISO 8655-6 (gravimetric reference measurement procedure) is the reference method matching ISO 23783-2 Annex D's own gravimetric core (Note 2 at §6.1 of ISO 23783-2 states "the balance requirements given in Table 3 are based on ISO 8655-6"). `[VERIFIED — the ISO 23783-2-side of this cross-reference; CITED — ISO 8655-6's content, via ISO.org catalog + secondary sources]`
- **n=10, three test points:** "a minimum of ten measurements per volume must be made for at least three volumes, including at 100%, 50%, and 10% of the nominal volume" — the 2022 revision replaced the 2002 edition's single-nominal-volume limit with limits at all three points. `[CITED: Gilson "Updated ISO 8655 Guidelines," selectscience.net "Pipette calibration ISO 8655:2022" — two independent secondary sources agree]`
- **Exact numeric permissible-error table (ISO 8655-2:2022, Table 1) — `[unverified]`.** Every attempt to retrieve the actual table this session (WebSearch, WebFetch against manufacturer pages, iteh.ai preview PDF, Troemner handbook PDF) either hit a paywall, a 403/406 block, or returned numbers that could not be traced to a visible authoritative table — they read as a repackaging of the same "training-knowledge, unverified" figures already flagged in the June note. **Do not quote specific % numbers for ISO 8655-2:2022 Table 1 in the tool without DTU-library access to the actual standard.** State the *structure* (two bounded error types, tightening toward larger volumes, three test points, n=10) as confirmed; leave the numbers as an explicit `[unverified — obtain via DTU]` placeholder or use the earlier note's approximate band with a loud caveat.
- **Titrimetric + photometric alternates exist in the ISO 8655 family, not in ISO 23783-2:** ISO 8655-7:2005 ("Non-gravimetric methods for the assessment of equipment performance") explicitly covers photometric *and titrimetric* determination; ISO 8655-8:2022 is the newer, split-out photometric reference procedure. `[CITED: iso.org standard catalog entries 29732 (8655-7) and 75212 (8655-8) — official ISO listings, HIGH confidence for existence/scope; not fetched in full]`

### Candidate frames considered and their disposition

| Candidate | Verdict | Reasoning |
|---|---|---|
| **ISO 8655** (Parts 2, 6) | **Adopt — performance benchmark, by analogy** | Device replaces manual pipetting; only source with real per-volume trueness/CV numbers; gravimetric reference method (Part 6) shares the same physics as ISO 23783-2 Annex D |
| **ISO 23783-2 Annex D** | **Adopt — test method** | Device is literally an ALHS per §1 scope; Annex D is written for single-channel, any-liquid, contact delivery — matches the pump exactly |
| **ISO 23783-3** | **Not available — flag as a gap** | Would be the "correct" place for ALHS-native pass/fail tolerances, but was not purchased/verified; do not claim its content |
| **ISO 15197** (blood-glucose IVD) | **Pattern reference only** | "±X% or ±Y, whichever is greater" compound-limit *form* is structurally identical to the device's own ±10%/±10 µL spec — useful to justify why a compound limit is normal for POC accuracy specs, not a technical dispensing-accuracy source |
| **IEC 60601-2-24** (infusion-pump trumpet curves) | **Reject as primary frame** | Trumpet curves characterize *continuous or near-continuous flow-rate* accuracy across increasingly long observation windows (minutes–hours) — built for IV infusion pumps. The pump under test delivers **discrete ~5 µL strokes**, not a continuous flow to be windowed. Mismatched device class; correctly considered and correctly rejected, not force-fit. `[CITED: multiple academic sources on trumpet-curve methodology confirm the continuous-flow framing]` |

## RQ-2 — Methods coverage

**Fully specify:** ISO 23783-2 Annex D single-channel gravimetric method (this is the applicable, literally-correct method for this device — contact delivery, single channel, any liquid).

**Alternates — confirmed from ISO 23783-2's own Table 1, with applicability checked against this pump's actual delivery mechanism (contact tube discharge into a vessel, not plate-based, not free-flying droplet/jet):**

| Method | ISO 23783-2 ref. | Volume range (as extracted) | Applicable to this pump? | Why / why not |
|---|---|---|---|---|
| Single-channel gravimetric | Annex D (§5.3.1) | 0.5–<20 µL: sys 1.4%/rand 0.6%; 20–<200: 0.9%/0.3%; 200–1000: 0.9%/0.3% `[VERIFIED, but see note below]` | **Yes — adopt as core method** | Matches contact, single-channel, any-liquid delivery exactly |
| Gravimetric regression (GRM) | Annex E (§5.3.2) | "suitable... between 0.005 µl and 1 µl" (§5.3.2 prose) vs. "between 1 nl and 100 µl per droplet or jet" (Annex E.1 prose) — the two clauses within the same document do not state identical ranges `[VERIFIED as-extracted; range discrepancy itself is unverified/needs a visual re-check of the published standard]` | **No** | Explicitly restricted to "non-contact liquid delivery devices... that deliver the liquid volume as free flying droplets or jets" (§5.3.2, Annex E.1) — this pump discharges via a contact/submerged tube outlet, not a free-flying droplet. proto-02's "slope method" is inspired by the same linear-extrapolation logic but is **not** this ISO procedure — do not label it as GRM in the tool |
| Dual-dye ratiometric photometric | Annex B (§5.2.1) | 0.1–350 µL (96-well) / 0.01–55 µL (384-well) | **No** | Requires a 96/384-well microplate reader — designed for plate-format liquid handlers, not a single-outlet dispensing pump |
| Single-dye photometric | Annex C (§5.2.2) | 1–100 µL (96-well) / 0.25–20 µL (384-well) | **No** | Same plate-format mismatch |
| Fluorescence | Annex H (§5.2.3) | <15 nl, 384/1536-well | **No** | Sub-nanoliter, plate-format, non-contact droplet devices only |
| Photometric/gravimetric hybrid | Annex F (§5.4) | 1–300 µL (chromophore-dependent) | **No** | Plate-format, requires chromophore-doped test liquid |
| Optical image analysis of droplets | Annex G (§5.5.1) | free-flying droplets <5 µL | **No (but conceptually adjacent)** | Non-contact droplet imaging — philosophically related to proto-02's pendant-drop problem (§8.1), but not applicable to a submerged-outlet delivery |
| Optical image analysis of capillaries | Annex I (§5.5.2) | 0.1–1000 µL | **No** | Requires calibrated capillary geometry + flatbed scanner; different apparatus class |
| Titrimetric (ISO 8655-7) | Not in ISO 23783-2 | Not extracted (standard not obtained) | **Mention only** | Exists in the ISO 8655 family as a non-gravimetric alternative for piston-operated apparatus; relevant to note in an alternates table for completeness, but its applicability to a peristaltic (non-piston) pump was not independently verified this session `[unverified applicability]` |

**Why gravimetric for this pump (the rationale to state explicitly in the tool):** the pump has one outlet, delivers a liquid (water for calibration, arbitrary reagents in use), and discharges to a vessel by contact — every plate-based/photometric/fluorescence method assumes a microplate-format multi-well liquid handler, which this pump is not. The only "free-flying droplet" alternate (GRM/Annex E) is explicitly restricted away from this device's contact-delivery mechanism. Gravimetric single-channel (Annex D) is not just the best fit — for this device shape, it is close to the *only* fit among the methods ISO 23783-2 actually defines.

## RQ-3 — Go-to-market "mapped" dimensions

Confirmed/refined relevance map (lighter treatment per D-03):

| Dimension | Frame | Verdict | Confidence |
|---|---|---|---|
| **Biocompatibility** | ISO 10993 (series; -1 general principles, -4 blood-contact selection, -5 cytotoxicity, -11 chronic toxicity) | **Applies** — any fluid-path material (tube, connectors) contacting the dispensed liquid needs a biological-evaluation justification per ISO 10993-1's contact-nature/duration risk framework. For a reagent/water aliquoting device (not blood-contact), the relevant endpoints are likely limited (cytotoxicity/irritation for external-communicating, limited-duration contact) rather than the full blood-contact panel (-4) — state this distinction rather than implying the device needs full hemocompatibility testing it doesn't need. | MEDIUM — `[CITED: ISO 10993-1 general framework via multiple secondary sources, official ISO 10993-4 catalog entry]` |
| **Safety / reliability / lifetime** | No single named standard surfaced this session beyond general ISO 13485 design-control framing | **Map only, no deep standard** | Consistent with D-03 — keep this section a structured "what would be assessed" map, not a standards deep-dive |
| **QMS / regulatory pathway** | ISO 13485 (medical-device QMS) | **Applies conceptually if productized** — not required for a thesis prototype; correctly scoped as "what market entry would require" | MEDIUM — `[CITED, from prior note]` |
| **CLIA waiver bar (US, field-deployable POC)** | CLIA Certificate of Waiver criteria | **Applies as a framing device** — "simple, accurate, low risk of erroneous or harmful result, usable by untrained operators" maps directly onto the device's point-of-care intent; robust clinical data is required in practice to obtain a real waiver | MEDIUM — `[CITED: CDC/FDA CLIA waiver pages, this session]` |
| **POCT quality/competence** | ISO 22870 (POCT quality/competence) → defers technical limits to ISO 15189 | **QMS/competence framing only** — no dispensing-accuracy numbers live here; correctly scoped as procedural, not metrological | MEDIUM — `[CITED, from prior note, unchanged]` |

**Net verdict on RQ-3:** the prior note's relevance map holds up; the one addition this session substantiates is ISO 10993 (biocompatibility), which the seed/note had flagged with "verify" — confirmed applicable, with the caveat to scope it to the actual contact type (external-communicating, limited-duration, non-blood) rather than defaulting to the full blood-contact test battery.

## RQ-4 — Verified normative values

All values below are extracted directly from `prototypes/DS_EN ISO 23783-2_2023.pdf` this session (`pdftotext -upw ""`, empty user password — the PDF has an owner/edit password but no read password) unless marked otherwise. This corrects/confirms the seed's Context-Seed extraction.

### Table 3 — Minimum requirements for balances for weighing liquids `[VERIFIED]`

| Delivered volume | Readability | Repeatability | Expanded uncertainty in use (k=2) |
|---|---|---|---|
| < 0.5 µL | 0.0001 mg | 0.0005 mg | 0.001 mg |
| 0.5 ≤ V < 20 µL | 0.001 mg | 0.006 mg | 0.012 mg |
| 20 ≤ V < 200 µL | 0.01 mg | 0.025 mg | 0.05 mg |
| 200 ≤ V ≤ 10 000 µL | 0.1 mg | 0.2 mg | 0.4 mg |

Table note (a): "Assumes one delivery of test liquid from a single channel." Note (b): uncertainty-in-use can be determined per ASTM E898-20 / EURAMET CG-18 at the largest volume in the range. **The pump's ~5 µL/stroke target falls in the 0.5–20 µL band → requires a 0.001 mg (1 µg, semi-micro) balance**, exactly as the seed inferred and as proto-02's §8.1 blocker analysis (0.1 mg balance injects ~2% error, 40% of the CV budget) independently confirms empirically.

### Table D.1 — Test conditions (Annex D) `[VERIFIED]`

| Environmental condition | Range | Permitted change during test |
|---|---|---|
| Water temperature | 17 °C – 30 °C | ≤ 1 °C |
| Air temperature | 17 °C – 30 °C | ≤ 3 °C |
| Relative humidity | 45 % – 70 % | ≤ 10 % |

Note: §6.3 (general preparation, applies to all methods) separately states thermal equilibrium ±2 °C for ≥2 h before testing, and a *general* in-test tolerance of ±1 °C / ±5% RH — Table D.1's ±1 °C (water) / ±3 °C (air) / ±10% RH is the *gravimetric-method-specific* refinement and is the one to quote for this protocol. Balance settle time ≥6 s (§6.1). Pre-rinse tips ≥5× to waste on every tip change (§6.3).

### Annex A — Mass-to-volume conversion (Z-factor) `[VERIFIED — and this corrects the seed/context's attribution]`

**Correction:** the seed and 09-CONTEXT.md state the Z-factor basis is "ISO 8655-6." The primary-source read shows **ISO 23783-2's own Annex A is self-contained** — it does not delegate the Z-factor calculation to ISO 8655-6. Annex A provides:

- **Formula (A.1)** — general volume-from-mass formula: `V_L = (m_L − m_E) · (1/ρ_L) · (1 − ρ_A/ρ_B) / (1 − ρ_A/ρ_L)` [as extracted; ρ_L = test-liquid density at test temp, ρ_A = air density, ρ_B = calibration-weight density (typically 8.0 g/mL stainless steel, per Note 2)].
- **Formula (A.2)** — air density from temperature, barometric pressure, and relative humidity (CIPM-2007 air-density equation), valid 15–27 °C / 600–1100 hPa / 20–80% RH.
- **Formula (A.3)** — the **Tanaka formula** for pure-water density: `ρ_W = a5·[1 − (t_W+a1)²·(t_W+a2) / (a3·(t_W+a4))]`, with `a1=−3.983035 °C, a2=301.797 °C, a3=522528.9 (°C)², a4=69.34881 °C, a5=0.999974950 g/mL`.
- **Table A.1 — Z correction factors for distilled water (air-saturated), µL/mg**, tabulated at 15.0–30.0 °C (0.5 °C steps) × 800/850/900/950/1000/1013/1050 hPa barometric pressure — a full lookup table, directly usable as `V_i = m_i · Z` (Formula A.4).

**Confirmed:** ISO 8655-6 is *likely* the harmonized origin of an equivalent table (ISO 23783-2 §6.1 Note 2 says Table 3's balance grades are "based on ISO 8655-6"), but that note is about balance *hardware requirements*, not about the Z-factor table specifically. **Do not state that the Z-factor comes from ISO 8655-6** — cite ISO 23783-2 Annex A directly; it is self-sufficient for this tool.

### Replicate count `[VERIFIED — open in Part 2, closed by convention]`

- ISO 23783-2 Annex D.5.3(g): **"Perform as many measurements as required"** — Part 2 itself leaves replicate count open; it is a Part 3 (specification) matter, not extracted this session.
- Evaporation blank: **≥10 blank measurement cycles** required before test liquid measurements begin (D.5.2.2), same cycle time as a real delivery.
- The **n=10** convention used by proto-02 traces to the **ISO 8655 pipette-calibration convention** (10 measurements per volume, at three test points), not to ISO 23783-2 — this is exactly the dual-frame in practice: the *method* (how to weigh) comes from Part 2, the *replicate convention* (how many, at what points) comes from ISO 8655.

### Reporting / traceability / uncertainty `[VERIFIED]`

- §9: results/traceability/MSU "shall be reported in accordance with ISO 23783-3" (not obtained/verified this session — flag as a documentation gap the top layer should name honestly rather than paraphrase).
- §8.2: MSU may be estimated by (a) whole-system statistical approach (precision/bias studies, interlaboratory comparisons) or (b) measurement-model approach (per input to the model, ISO/IEC Guide 98-3 — i.e. GUM). D.7 additionally references **EURAMET CG-19** for MSU estimation specific to this gravimetric procedure.
- §7 Thermal expansion: optional correction `V_L,tc = V_L · [1 − β·(t_T − t_ref)]` if the device's thermal-expansion coefficient β and reference-adjustment temperature are known — likely **not applicable** to this 3D-printed pump (no manufacturer-stated β); worth a one-line "not applicable, no calibrated β" note rather than silence.

## Recommended Top-Layer Section Structure

Ordering that puts the deep metrological core first (per D-03) and the mapped dimensions last, with the deferred bottom-layer slot placed immediately after the top layer as a clearly-labeled, distinctly-styled placeholder (not interleaved):

1. **Framing intro** — why two layers; why the pump is benchmarked against pipette-equivalence; one-paragraph statement of the dual-frame verdict (RQ-1), written as prose, not a hidden research artifact — this *is* the tool's thesis-defensible reasoning and should be visible, not buried.
2. **Method — single-channel gravimetric procedure** (ISO 23783-2 Annex D): apparatus, test liquid (ISO 3696 grade 3 water), preparation (§6.3: pre-rinse ≥5×, thermal equilibrium ±2 °C/≥2h), environmental conditions (Table D.1), evaporation-blank workflow (D.5.2, ≥10 blanks, formula D.1–D.2).
3. **Balance requirements** — Table 3 as a static table with the 0.5–20 µL row visually highlighted (the pump's compliant band); brief note that a 0.1 mg balance (proto's actual hardware) fails this requirement by ~2 orders of magnitude — forward-reference to the bottom layer.
4. **Mass → volume conversion** (Annex A) — Formula A.1 general case, Tanaka Formula A.3, air-density Formula A.2, and the full Z-factor Table A.1 (or a compact excerpt) with Formula A.4 as the practical shortcut. KaTeX for all formulas (see Implementation Guidance).
5. **Replicates & statistical convention** — dual-frame in action: n=10 / three-test-point convention from ISO 8655, applied to the Annex D method; the batch-mean-vs-stroke-to-stroke-CV distinction (both because it's metrologically correct and because it directly sets up the bottom layer's E2-vs-E3 rig split).
6. **Trueness & precision — the pass/fail benchmark** — ISO 8655 pipette-grade CV/trueness figures, explicitly marked `[unverified — exact ISO 8655-2:2022 Table 1 values, obtain via DTU]`, alongside ISO 23783-2's own Table 1 "typical achievable" figures for the gravimetric *method itself* (1.4%/0.6% at 0.5–20 µL) — labeled clearly as method-uncertainty, not device spec, to avoid the category error flagged in RQ-1.
7. **Reporting & measurement uncertainty** — point to ISO 23783-3 (name the gap honestly — "not obtained this session"), EURAMET CG-19 for MSU, GUM/ISO IEC Guide 98-3 approach outline.
8. **Alternate methods — comparison table** (the RQ-2 table above, trimmed for the reader) with the explicit "why gravimetric, not photometric/hybrid/dimensional/GRM" rationale, and the honest GRM-vs-slope-method distinction.
9. **Mapped go-to-market dimensions** (lighter, RQ-3) — safety/reliability/lifetime (map only), biocompatibility (ISO 10993, scoped to actual contact type), QMS/regulatory (ISO 13485, CLIA waiver, ISO 22870/15189) — a compact table or card grid, visually distinct (less "deep" styling) from sections 2–8.
10. **Bottom-layer slot** — a clearly labeled, visually distinct placeholder section ("Actual Prototype Protocol & Deviations — pending user input") with an anchor id, a one-paragraph description of what will go here (ISO-requirement | prototype-reality | justification table), and forward-pointers to proto-02 `PROTOTYPE.md` §2 (targets/pass criteria), §8.1 (execution protocol, blockers), §8.2 (first result), §11 (diagnosis) as the seed material once the user supplies the final protocol. **Do not populate this section's content in this phase (D-04)** — the slot itself is the Phase 9 deliverable for this layer.

## Implementation Guidance

- **KaTeX vs plain text:** **Use KaTeX** (local fallback, copy the `katex/` folder pattern from `tools/peristaltic-roller-displaced-volume-model/`). This protocol has real, non-trivial formulas (Annex A.1 buoyancy formula, Tanaka Formula A.3, air-density Formula A.2, CV/trueness, expanded uncertainty) — plain-text/Unicode rendering would be both harder to read and harder to cite (D-01 explicitly wants the page "citable via QR like a thesis chapter," which argues for properly typeset math). No CDN — local-only, matching site convention.
- **i18n scope:** **Recommend English-only**, matching the `peristaltic-roller-displaced-volume-model` precedent (OCCL-04: "No EN/IT language toggle; English only"). This is a document-dense, table-heavy, normative-value page — doubling every table/paragraph into EN+IT roughly doubles the content-maintenance burden for a thesis artifact (D-02) with a narrow audience (thesis committee, DTU), and the site already has one directly-comparable precedent for skipping i18n on a similarly dense tool. Final call is Claude's discretion per CONTEXT.md, but this is the strong recommendation.
- **Balance-readability lookup — static table, not a widget.** Table 3 has exactly 4 rows; a static table with the applicable row (0.5–20 µL) highlighted communicates the compliance requirement immediately without needing interaction. D-01 permits "possibly one small static lookup if it earns its place" but does not require a widget, and a widget here would add interaction-state complexity (temp/pressure inputs bleed toward the deferred Z-factor calculator, which is explicitly out of scope for this phase) for no real reader benefit over a clearly-highlighted static table row.
- **Z-factor table:** present a **compact excerpt** of Table A.1 (e.g. 20°C/1013 hPa row plus 2-3 bracketing rows), not the full 31-column × 7-row table, to avoid the horizontal-scroll constraint (CLAUDE.md) — link/reference the full table's existence and cite Formula A.4 as the general-purpose shortcut for readers who need other temp/pressure combinations.

## Sources

### Primary (HIGH confidence)
- `prototypes/DS_EN ISO 23783-2_2023.pdf` — DTU-licensed, DS/EN ISO 23783-2:2023 (IDT with ISO 23783-2:2022 and EN ISO 23783-2:2023). Opened via `pdftotext -upw ""` this session (password-protected against interactive viewers but no read-password set); full text extracted and read directly. Sections used: §1 Scope, §5 Measurement methods overview + Table 1, §6 Equipment/preparation + Tables 2/3, §7 Thermal expansion, §8 Traceability/MSU, §9 Reporting, Annex A (mass→volume, Z-factor), Annex D (single-channel gravimetric procedure, normative), Annex E (gravimetric regression method).

### Secondary (MEDIUM confidence)
- [Pipette calibration ISO 8655:2022 — Everything you need to know (SelectScience)](https://www.selectscience.net/article/pipette-calibration-iso-8655-2022-everything-you-need-to-know) — n=10, three-test-point convention (100%/50%/10% of nominal)
- [Updated ISO 8655 Guidelines for Pipette Calibration and Testing (Gilson)](https://www.gilson.com/default/learninghub/post/updated-iso-8655-guidelines-for-pipette-calibration-and-testing.html) — same convention, independent corroboration
- [ISO 8655-7:2005 catalog entry (iso.org)](https://www.iso.org/standard/29732.html) — confirms titrimetric + photometric non-gravimetric methods exist in the ISO 8655 family
- [ISO 8655-8:2022 catalog entry (iso.org)](https://www.iso.org/standard/75212.html) — confirms the split-out photometric reference procedure
- Reporting Insulin Pump Accuracy: Trumpet Curves According to IEC 60601-2-24 (multiple: Semantic Scholar / SAGE / PubMed / ResearchGate) — confirms trumpet curves characterize continuous-flow accuracy across observation windows, supporting the RQ-1 rejection of IEC 60601-2-24 as a frame for discrete-stroke dispensing
- ISO 10993 biocompatibility framework — [Complizen guide](https://www.complizen.ai/post/biocompatibility-testing-medical-devices-iso-10993-guide), [ISO 10993-4 catalog entry](https://www.iso.org/standard/63448.html) — contact-nature/duration risk framework, blood-contact-specific Part 4 not automatically required for a non-blood-contact fluid path
- CLIA waiver criteria — [CDC Waived Tests](https://www.cdc.gov/lab-quality/php/waived-tests/index.html), [FDA CLIA Waiver by Application](https://www.fda.gov/medical-devices/ivd-regulatory-assistance/clia-waiver-application) — "simple, accurate, low risk, untrained-operator-usable" framing

### Tertiary (LOW confidence / unverified)
- Exact ISO 8655-2:2022 Table 1 permissible-error percentages at 1/5/10 µL — **could not be verified from any accessible source this session** (paywalled standard; manufacturer pages either blocked WebFetch with 403/406 or reproduced structure without numbers; the one WebSearch answer that supplied specific percentages could not be traced to a visible authoritative table and matches the pre-existing note's own hedged "training knowledge, unverified" figures — treat as unverified, not as confirmation). **Action for the planner/tool: mark these numbers `[unverified — obtain via DTU library]` wherever quoted, or omit and cite only the confirmed structure (3 test points, n=10, tightening toward larger volumes).**
- ISO 23783-2 Annex E's own internal range inconsistency (§5.3.2 prose: 0.005–1 µL; Annex E.1 prose: 1 nl–100 µl) — extracted verbatim from the same PDF; not resolved this session, flagged for a visual re-check of the actual published table/figure layout if GRM range is ever quoted precisely (moot for this pump per the non-contact restriction, but worth fixing if the tool ever mentions GRM's range as a specific number).
- ISO 23783-2 Table 1's gravimetric-method row showing identical typical-error values (0.9%/0.3%) for both the 20–200 µL and 200–1000 µL bands — extracted as-is; may be a genuine plateau or a PDF-table-extraction artifact from column/row wrapping; not independently re-verified.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | ISO 8655-2:2022 permissible-error values quoted as ≈±2.5%/±1.5% at 5 µL (from the prior note, now doubly-unconfirmed) | RQ-4, trueness/precision section | If the tool states a specific number and it's wrong, a thesis reviewer with library access to the actual standard could catch a factual error; mitigated by explicit `[unverified]` tagging recommendation |
| A2 | ISO 8655-6 is the harmonized origin of a Z-factor table equivalent to ISO 23783-2's own Table A.1 | RQ-4, Annex A section | Low risk — ISO 23783-2 Annex A is self-contained and sufficient for the tool regardless of whether this attribution is correct; the claim is not load-bearing for any tool content |
| A3 | Titrimetric method (ISO 8655-7) applicability to a peristaltic (non-piston) pump | RQ-2, alternates table | Low risk if only mentioned as "exists in the ISO 8655 family" without claiming direct applicability to this device, as recommended |
| A4 | ISO 10993 endpoint scoping (external-communicating, limited-duration, non-blood-contact — narrower than full hemocompatibility panel) | RQ-3, biocompatibility row | Medium — if the actual fluid path design changes (e.g. a future blood-adjacent application), the endpoint scope would need re-evaluation; flagged explicitly rather than silently assumed |

## Open Questions

1. **Exact ISO 8655-2:2022 Table 1 values.**
   - What we know: the table exists, gives limits at three test points (10/50/100% of nominal), for both systematic and random error, tightening toward larger volumes.
   - What's unclear: the actual percentages at 1/5/10 µL.
   - Recommendation: either mark as `[unverified — obtain via DTU library]` inline in the tool, or omit specific numbers entirely and describe only the confirmed structure. Do not use the previously-circulated "training knowledge" approximate numbers as if confirmed.

2. **ISO 23783-3's actual specification/reporting content.**
   - What we know: ISO 23783-2 §9 delegates all specification and reporting requirements to Part 3.
   - What's unclear: whether Part 3 supplies a pipette-independent, ALHS-native tolerance-setting scheme that might complicate or supersede the "benchmark against ISO 8655 by analogy" framing.
   - Recommendation: name the gap honestly in the tool's Reporting section rather than paraphrase content not verified; a future phase could purchase/verify Part 3 if the thesis committee asks for a stricter ALHS-native frame.

3. **ISO 23783-2 Annex E's internal range inconsistency (0.005–1 µL vs 1 nl–100 µl).**
   - What we know: both figures appear in the same document, in different sections.
   - What's unclear: which is the "operative" scope statement, or whether one is a typo/extraction artifact.
   - Recommendation: moot for this pump (GRM doesn't apply to contact delivery regardless of exact range), but flag for anyone extending the tool to a non-contact dispensing device later.

## Metadata

**Confidence breakdown:**
- ISO 23783-2 method content (Annex D, Table 3, Table D.1, Annex A): HIGH — direct primary-source PDF extraction this session, cross-checked against the seed's earlier extraction (matches)
- ISO 8655 structural facts (n=10, 3 test points, Part 6 gravimetric, Part 7/8 non-gravimetric): MEDIUM — corroborated across 2-3 independent secondary sources, standard itself not obtained
- ISO 8655-2:2022 exact numeric permissible-error table: LOW/unverified — could not be retrieved from any accessible source this session
- RQ-3 mapped dimensions (ISO 10993, ISO 13485, CLIA, ISO 22870/15189): MEDIUM — consistent with the prior note, refined with one session's worth of independent web corroboration

**Research date:** 2026-07-23
**Valid until:** Standards content (ISO 23783-2, ISO 8655 structure) is stable — treat as valid indefinitely absent a standard revision. The `[unverified]` ISO 8655-2 numeric table should be resolved (via DTU library) before the thesis's final defense, not necessarily before Phase 9 execution — the tool can ship with an honest `[unverified]` tag.
