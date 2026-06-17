# Dispensing accuracy — standards & benchmarks

> **Status:** loose research note, written 2026-06-17. **Does not belong in the tools repo
> long-term** — move to the thesis LaTeX workspace (relevant to §3.4.1 Performance criteria
> and the Deliver/validation chapter). Kept here only because it was generated during the
> proto-02 design discussion.

## Why this note exists

The device is meant to **replace a human performing the same aliquoting by hand with a
pipette**. So the fair benchmark is not an industrial metering pump — it is a **manual
micropipette operated by a person**, and the standard that governs that is **ISO 8655**.
This note records the standards landscape and the numbers to benchmark against, with sources.

## The device's own spec (from thesis §3.4.1, as discussed)

- **Reproducibility / accuracy: ±10 %, but not more than ±10 µL** (compound criterion —
  the absolute ±10 µL cap binds at large accumulated volumes).
- This is structurally the **same form** as standard point-of-care IVD specs (e.g.
  ISO 15197 blood-glucose: "±15 mg/dL or ±15 %, whichever is greater"). A percentage band
  with an absolute floor/cap is the normal way POC accuracy is written. **[Likely]**
- The earlier "±1 µL" figure in §3.4.1 is **too tight for an open-loop peristaltic pump**
  at these volumes and should be reconciled with the ±10 % / ±10 µL criterion. **[Likely]**

## ISO 8655 — the pipette benchmark (primary comparator)

ISO 8655 ("Piston-operated volumetric apparatus") is the international standard for the
accuracy and precision of **pipettes, dispensers, burettes, dilutors and precision
syringes** across 1 µL–10 000 µL. Because the device substitutes for a hand pipette, this
is the right yardstick.

Key facts established from the sources:

- **Two error metrics:** *systematic error* (= accuracy, the mean offset) and *random error*
  (= precision, expressed as a CV or SD). Both are bounded. **[Certain]**
- **Calibration uses n = 10 measurements** per tested volume — the accepted minimum for a
  credible accuracy + precision characterization. *(This is why proto-02 uses n = 10.)*
  **[Certain]**
- The **2022 revision** specifies limits at **10 %, 50 % and 100 % of nominal volume**
  (the 2002 edition gave limits only at nominal). **[Certain]**
- **Reference method = gravimetric** (Part 6); photometric is the alternative (Part 8).
  Sub-20 µL work requires a six-place balance (µg resolution). **[Certain]**
- Environmental control: temperature stable to ±0.5 °C, RH 50–75 %. **[Certain]**

Approximate permissible-error magnitudes (could **not** extract the exact 2022 table —
paywalled; values below are from training knowledge of the standard, treat as indicative):

| Nominal volume | Max systematic error (accuracy) | Max random error (CV) |
|---------------:|--------------------------------:|----------------------:|
| 1 µL  | ≈ ±5 %      | ≈ 5 %       |
| 5 µL  | ≈ ±1.5–2.5 %| ≈ 1.5–3 %   |
| 10 µL | ≈ ±1.0–1.2 %| ≈ 0.8–1 %   |
| 100 µL| ≈ ±0.4–0.8 %| ≈ 0.2–0.3 % |
| 1000 µL| ≈ ±0.3 %   | ≈ 0.15–0.2 %|

> **[Guessing]** on the exact percentages — verify against the real ISO 8655-2:2022 Table 1
> before quoting any number in the thesis. The *structure* (two bounded errors, tightening
> toward larger volumes, n = 10, gravimetric reference) is **[Certain]**.

**Benchmark takeaway:** a good pipette at 5 µL holds CV ≈ 1.5–3 %. Proto-01 already measured
**CV 4.5 %** (gravimetric, n = 3) — i.e. within ~2× of pipette-grade precision despite three
known design errors. For a peristaltic pump (inherently higher CV than piston displacement),
landing near pipette CV after the proto-02 fixes is a credible, defensible target.

## Other standards — relevance map

| Standard | What it is | Relevance here |
|----------|------------|----------------|
| **ISO 8655** (2022) | Pipette/dispenser accuracy & precision, 1 µL–10 mL | **Primary** — the device replaces a hand pipette; benchmark CV and accuracy against it |
| **ISO 15197** | Blood-glucose IVD performance | **Pattern reference** — its "±X or ±Y %, whichever is greater" form mirrors our spec |
| **ISO 22870** (2016) | POCT — quality & competence | QMS/competence framework, *defers technical limits to ISO 15189*; no dispensing numbers. Compliance framing only |
| **ISO 15189** | Medical laboratories — quality & competence | Parent of 22870; again QMS, not dispensing tolerances |
| **ISO 13485** | Medical-device QMS (design + manufacturing) | The right QMS frame if the device is ever productized; not needed for a thesis prototype |
| **CLIA waiver criteria** | US "simple, low-risk" POC device bar | Frames "field-deployable"; demands operator independence + robustness (already flagged in thesis §3.5 incoming notes) |

## Microdispensing literature — independent CV benchmarks

From the non-contact microdispensing / liquid-handling literature (not pipette-specific),
useful to bracket what is achievable in this volume range:

- Sub-µL non-contact dispensing: **intra-run CV 0.4–7.7 %**, tip-to-tip CV 1.4–9.9 %. **[Certain — sourced]**
- Non-contact microdispensing precision generally **CV 0.5–5.3 %**, accuracy **< ±10 %**. **[Certain — sourced]**
- "**Accuracy better than ±5 % is difficult to achieve in the sub-µL range.**" **[Certain — sourced]**
- High-throughput automated liquid handlers (NIST-traceable): intra-plate **CV 2.0–10.3 %**. **[Certain — sourced]**
- General note: **peristaltic transfers have higher CV than syringe pumps** (pulsatile
  pressure, tube compliance) — a known and expected penalty of the pump class. **[Certain — sourced]**

So a **CV target of ≤ 3–5 %** for proto-02+ sits squarely inside the achievable band for
this volume regime, and the ±10 % / ±10 µL device spec is consistent with both ISO 8655
pipette practice and the microdispensing literature.

## Sources

- [Pipette calibration ISO 8655:2022 — Everything you need to know (SelectScience)](https://www.selectscience.net/article/pipette-calibration-iso-8655-2022-everything-you-need-to-know)
- [Six Things You Should Know about ISO 8655:2022 (Sartorius)](https://www.sartorius.com/en/knowledge/science-snippets/five-things-you-should-know-about-the-new-pipette-calibration-iso-8655-2022-1403808)
- [ISO 8655 (MasterControl glossary)](https://www.mastercontrol.com/glossary-page/iso-8655/)
- [What is the ISO 8655:2022 standard (MasterControl)](https://www.mastercontrol.com/gxp-lifeline/what-is-iso-8655-standard/)
- [Updated ISO 8655 Guidelines for Pipette Calibration and Testing (Gilson)](https://www.gilson.com/default/learninghub/post/updated-iso-8655-guidelines-for-pipette-calibration-and-testing.html)
- [ISO 22870:2016 — Point-of-care testing requirements (ISO)](https://www.iso.org/standard/71119.html)
- [Quantitative characterization of non-contact microdispensing technologies for the sub-microliter range (ScienceDirect)](https://www.sciencedirect.com/science/article/abs/pii/S1359644612004059)
- [Microdispensing (Wikipedia, overview + CV figures)](https://en.wikipedia.org/wiki/Microdispensing)

> **To verify before thesis use:** exact ISO 8655-2:2022 Table 1 permissible-error values
> at 1 / 5 / 10 µL (paywalled — get from DTU library or the purchased standard).
