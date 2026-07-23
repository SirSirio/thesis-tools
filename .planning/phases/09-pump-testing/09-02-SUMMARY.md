---
phase: 09-pump-testing
plan: 02
subsystem: docs
tags: [static-html, katex, iso-23783-2, iso-8655, dispensing-accuracy, metrology, mass-to-volume, uncertainty]

# Dependency graph
requires: ["09-01"]
provides:
  - "Authored top-layer Sections 4-7: mass-to-volume Z-factor (Annex A), replicates/statistical convention, trueness/precision benchmark, reporting/measurement uncertainty"
  - "Two new reusable CSS patterns for the page: .math-block (KaTeX display wrapper) and .tag-unverified (inline unverified-value flag)"
affects: ["09-03", "09-06"]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - ".math-block CSS class (centered, horizontally-scrollable KaTeX display wrapper) — copied convention from peristaltic-roller-displaced-volume-model, now established in tools/pump-testing/"
    - ".const-list / .tag-unverified — new small CSS patterns for formula-constant lists and inline [unverified] flags, reusable by 09-03/09-06 if they need similar callouts"

key-files:
  created: []
  modified:
    - tools/pump-testing/index.html

key-decisions:
  - "Table A.1 excerpt values (19.5/20.0/20.5C x 950/1000/1013/1050 hPa) computed here from Formulas A.1-A.3 using the CIPM ideal-gas air-density approximation, not transcribed from the standard's own certified grid (never independently extracted this session) — captioned as illustrative with an explicit pointer to consult the real Table A.1 for certified figures, avoiding overclaiming precision"
  - "Air-density Formula A.2 rendered as a named schematic form (rho_A = rho_A(t_A, p, h_r), CIPM-2007 equation) with its validity window in prose, rather than fabricating the full CIPM-2007 humidity/compressibility coefficient expansion, since RESEARCH.md did not extract the complete formula this session"
  - "ISO 8655-2:2022 exact permissible-error percentages omitted entirely and replaced with an inline [unverified - obtain via DTU library] tag plus the confirmed structural description (two bounded error types, tightening toward larger volumes, three test points, n=10) — per the RESEARCH.md hard [unverified] discipline"
  - "ISO 23783-2 Table 1 figures (1.4% systematic / 0.6% random) presented alongside the unverified ISO 8655-2 benchmark but visually and textually separated with an explicit category-error warning callout, so a reader cannot conflate method-uncertainty with a device spec"

requirements-completed: [D-01, D-02, D-03]

# Metrics
duration: 20min
completed: 2026-07-23
---

# Phase 9 Plan 2: Pump Testing Protocol — Deep Metrological Core (Sections 4-7) Summary

**Authored the ISO 23783-2 Annex A Z-factor mass-to-volume conversion, the ISO 8655 n=10/three-point replicate convention, the trueness/precision pass/fail benchmark with strict [unverified] discipline, and the reporting/measurement-uncertainty section naming the ISO 23783-3 gap — all typeset in KaTeX, document-first, with zero calculator logic.**

## Performance

- **Duration:** ~20 min
- **Completed:** 2026-07-23
- **Tasks:** 3/3 completed
- **Files modified:** 1 (`tools/pump-testing/index.html`)

## Accomplishments

- **Section 4 (Mass → volume conversion, Annex A):** Typeset all four Annex A formulas as KaTeX — Formula A.1 (buoyancy-corrected volume-from-mass, with the density terms for test liquid, air, and the stainless-steel 8.0 g/mL calibration weight per Note 2), Formula A.2 (named CIPM-2007 air-density equation with its 15–27°C/600–1100 hPa/20–80% RH validity window), Formula A.3 (the Tanaka pure-water density formula with all five constants a1…a5), and Formula A.4 (the practical `V_i = m_i · Z` shortcut). Rendered a compact 3-row × 4-column excerpt of Table A.1 (19.5/20.0/20.5°C × 950/1000/1013/1050 hPa) inside a card with internal-only overflow, self-consistently derived from the formulas above and clearly captioned as illustrative rather than transcribed from the standard's certified grid. Corrected the Z-factor attribution explicitly: Annex A is self-contained, not delegated to ISO 8655-6.
- **Section 5 (Replicates & statistical convention):** Stated that ISO 23783-2 Annex D.5.3(g) itself leaves replicate count open ("perform as many measurements as required," a Part 3 matter) and that the operative n=10 / three-test-point (100%/50%/10% of nominal) convention comes from ISO 8655 — the dual-frame in action. Rendered trueness (systematic error) and CV (precision) as KaTeX formulas. Explained the batch-mean-vs-stroke-to-stroke-CV distinction both as a metrological correctness point and as the setup for the deferred bottom layer's rig split. Cross-referenced the Section 2 evaporation-blank prerequisite.
- **Section 6 (Trueness & precision benchmark):** Described the ISO 8655-2:2022 permissible-error benchmark's confirmed structure (two bounded error types, tightening toward larger volumes, three test points, n=10) while tagging every exact percentage as `[unverified — obtain via DTU library]` rather than quoting unverifiable numbers as fact. Presented ISO 23783-2 Table 1's own 1.4%/0.6% figures clearly labeled as the measurement method's own achievable uncertainty, with an explicit category-error warning against reading it as a device pass/fail spec.
- **Section 7 (Reporting & measurement uncertainty):** Named the ISO 23783-3 gap honestly (§9 delegates reporting/traceability/MSU to Part 3, which is not held/verified). Outlined the two MSU approaches from §8.2 (whole-system statistical vs measurement-model/GUM per ISO/IEC Guide 98-3), cited EURAMET CG-19 for the gravimetric-procedure-specific MSU route, and added a one-line note that the §7 thermal-expansion correction does not apply (no calibrated β for the 3D-printed pump housing).
- Added two small new CSS patterns (`.math-block`, `.const-list`, `.tag-unverified`) to the page's existing `<style>` block to support the KaTeX display blocks, constant lists, and inline unverified-value flags used across Sections 4–7.

## Task Commits

Each task was committed atomically:

1. **Task 1: Author Section 4 (mass-to-volume, Annex A Z-factor) with typeset KaTeX formulas and a compact Table A.1 excerpt** - `4a1068c` (feat)
2. **Task 2: Author Section 5 (replicates and statistical convention)** - `9d21905` (feat)
3. **Task 3: Author Section 6 (trueness/precision, [unverified] tagging) and Section 7 (reporting/uncertainty)** - `6d07211` (feat)

_No TDD tasks in this plan — all are `type="auto"` documentation-authoring tasks._

## Files Created/Modified

- `tools/pump-testing/index.html` — Sections 4–7 fully authored (mass→volume Z-factor, replicates, trueness/precision, reporting/uncertainty); new CSS for KaTeX display blocks and unverified-value tags; Sections 1–3 (09-01) and Sections 8–10 (09-03/09-06) untouched.

## Decisions Made

- Table A.1 excerpt values computed self-consistently from Formulas A.1–A.3 (ideal-gas CIPM approximation for air density) since the standard's own certified grid values were not extracted verbatim during research — captioned as illustrative, with an explicit pointer to consult the real ISO 23783-2 Table A.1 for certified figures in an actual test report.
- Formula A.2 (CIPM-2007 air density) rendered as a named schematic function form rather than the full multi-term humidity/compressibility expansion, since the complete formula was not extracted in RESEARCH.md — avoids fabricating unverified coefficients while still typesetting a real KaTeX expression and naming the correct standard and validity window.
- ISO 8655-2:2022 exact permissible-error percentages omitted entirely in favor of an inline `[unverified — obtain via DTU library]` tag plus the confirmed structural description — matches RESEARCH.md's hard discipline that no unverifiable specific number should be quoted as fact.
- ISO 23783-2 Table 1's 1.4%/0.6% method-uncertainty figures kept in a visually and textually distinct box from the unverified device-benchmark numbers, with an explicit category-error warning, so the two cannot be conflated by a reader.

## Deviations from Plan

None - plan executed exactly as written. All three tasks' automated verification commands passed on first attempt with no auto-fixes required. The one judgment call not spelled out verbatim in the plan — how to render Formula A.2 and the Table A.1 excerpt values given that neither the full CIPM-2007 formula nor the standard's certified Table A.1 grid was extracted verbatim in RESEARCH.md — was resolved conservatively (named schematic formula; self-derived, captioned-as-illustrative table values) rather than fabricating precision that was never verified. This is a content-authoring judgment call within the task's explicit instructions, not a rule-triggered deviation.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Sections 4–7 are fully authored and internally cross-linked (to Sections 1, 2, 5, 6, 7, and forward to the Section 10 bottom-layer slot), so Plan 09-03 (Sections 8–9: alternate methods, go-to-market map) and Plan 09-06 (Section 10: actual prototype protocol) can proceed without touching this plan's content.
- The new `.math-block`/`.const-list`/`.tag-unverified` CSS patterns are available for reuse if 09-03 or 09-06 need similar KaTeX display blocks or unverified-value flags.
- `assets/style.css` remains untouched (all new CSS lives in the tool's own inline `<style>` block, per project convention).
- No `<input>` elements exist anywhere in the file — the document-first, no-calculator constraint (D-01, D-02) holds across all seven authored sections.

---
*Phase: 09-pump-testing*
*Completed: 2026-07-23*

## Self-Check: PASSED

Verified `tools/pump-testing/index.html` exists and contains all required content (Tanaka constants, Annex A citations, unverified tags, ISO 23783-3/EURAMET/GUM references). All three task commit hashes (4a1068c, 9d21905, 6d07211) verified present in `git log --oneline -5`. Tag balance checked: 10 `<section>`/`</section>` pairs, 60/60 `<div>`/`</div>` pairs, 10 `.theory-card` blocks — no structural HTML corruption introduced.
