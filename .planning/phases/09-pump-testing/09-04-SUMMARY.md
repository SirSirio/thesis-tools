---
phase: 09-pump-testing
plan: 04
subsystem: docs
tags: [documentation, iso-23783-2, iso-8655, tool-spec-standard]

# Dependency graph
requires:
  - phase: 09-pump-testing (plan 06)
    provides: "tools/pump-testing/index.html complete end-to-end (Sections 1-10, both layers authored)"
provides:
  - "Canonical co-located tools/pump-testing/SPEC.md satisfying the site's tool-spec standard"
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SPEC.md adapted for a document-first tool: 'inputs' section repurposed as the standards' normative values/tables rather than calculator input fields, matching the D-01/D-03 framing established by the shipped page"

key-files:
  created:
    - tools/pump-testing/SPEC.md
  modified: []

key-decisions:
  - "SPEC.md structure modeled on tools/system-architecture-explorer/SPEC.md's section shape (Purpose, tables, formulas, assumptions, cross-links) rather than the calculator-tool SPEC.md pattern, since this tool has no <input> fields"
  - "SPEC.md documents both layers explicitly with their own headed sections (top-layer normative values/formulas/assumptions; bottom-layer deviation table + workarounds + honest scope) so the two-layer structure the user asked to preserve is legible in the spec, not just in the HTML"

requirements-completed: [D-01, D-03]

# Metrics
duration: 15min
completed: 2026-07-23
---

# Phase 9 Plan 4: Pump Testing Protocol — SPEC.md Summary

**Authored `tools/pump-testing/SPEC.md` (314 lines) documenting the document-first tool's dual-frame standards anchor, normative values/formulas, both stacked layers (top market-grade protocol + bottom prototype deviations), and the still-deferred live-calculator scope — satisfying the site's mandatory co-located tool-spec standard.**

## Performance

- **Duration:** ~15 min
- **Completed:** 2026-07-23
- **Tasks:** 1/1 completed
- **Files modified:** 1 (`tools/pump-testing/SPEC.md`, created)

## Accomplishments

- Authored `tools/pump-testing/SPEC.md` following the CLAUDE.md tool-spec standard (purpose/scope,
  normative values, formulas, constants, assumptions), adapted for a document-first tool where
  "inputs" are the standards content the page relies on rather than calculator input fields.
- Recorded the dual-frame standards anchor (ISO 23783-2 Annex D as gravimetric test method / ISO
  8655 as pipette-analogy performance benchmark) with both honest gaps stated: ISO 23783-3 not
  held/verified (Part 2 §9 delegates reporting/traceability/MSU to it), and ISO 8655-2:2022's exact
  permissible-error percentages tagged `[unverified — obtain via DTU library]`.
- Documented the normative values/tables the shipped page relies on: Table 3 (balance grades,
  0.5–20 µL / 0.001 mg compliant band), Table D.1 (environmental conditions), preparation constants
  (pre-rinse ≥5×, thermal equilibrium ±2°C/≥2h, balance settle ≥6s), the ≥10-cycle evaporation-blank
  workflow, and the ISO 8655 n=10/three-test-point replicate convention.
- Wrote out all four Annex A formulas (A.1 buoyancy-corrected volume, A.2 CIPM-2007 air density,
  A.3 Tanaka water density with all five constants a₁–a₅, A.4 practical shortcut) plus the
  trueness/CV formulas, matching what is actually typeset in the shipped `index.html`.
- Documented the bottom layer in full: the two-axis accuracy/precision model, the 0.1 mg-balance
  binding constraint and its three workarounds (slope method, √N root-scaling, same-instrument
  pipette comparison), the six-row ISO-requirement/prototype-reality/justification deviation table,
  the pipette head-to-head thesis claim, and the honest can/cannot-claim scope — cross-checked
  against the shipped page's Section 10 content, not re-derived from upstream sources.
- Named the still-deferred scope explicitly (live results calculator, DoE/test-grid planner, CSV
  export) and stated that the bottom layer itself is NOT part of that deferred set — it is fully
  authored in this phase, superseding the original D-04 deferral.
- Cross-linked sibling tools (rotor-solver's 5 µL design point, the displaced-volume model's KaTeX
  precedent) and the proto-02 `TEST-PROTOCOL.md`/`PROTOTYPE.md` sources.

## Task Commits

Each task was committed atomically:

1. **Task 1: Write tools/pump-testing/SPEC.md documenting purpose, normative values, formulas, standards, assumptions, and deferred scope** - `4d2c073` (docs)

_No TDD tasks in this plan — the single task is a `type="auto"` documentation-authoring task._

## Files Created/Modified

- `tools/pump-testing/SPEC.md` — New canonical spec (314 lines): purpose/scope, dual-frame
  standards anchor with honest gaps, normative values/tables, Annex A formulas, assumptions, both
  stacked layers (top protocol + bottom prototype deviations), still-deferred scope, cross-links,
  and a page-structure section listing all ten shipped sections.

## Decisions Made

- Modeled SPEC.md's section structure on `tools/system-architecture-explorer/SPEC.md` (a sibling
  document-heavy tool spec) rather than a calculator-tool SPEC.md, since this tool's "inputs" are
  normative standards content, not `<input>` fields.
- Documented both layers with dedicated headed sections mirroring the page's own top/bottom-layer
  split, so the two-layer structure is legible from the spec alone without cross-referencing the
  HTML.
- Cross-checked every value, formula, and citation against the actual shipped `index.html` (read in
  full across two reads) rather than re-deriving from `09-RESEARCH.md`/`TEST-PROTOCOL.md` directly,
  per the plan's explicit instruction to avoid silent drift between spec and shipped page.

## Deviations from Plan

None - plan executed exactly as written. The single task's automated verification command passed
on first attempt with no auto-fixes required.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `tools/pump-testing/SPEC.md` now exists and is consistent with the shipped `index.html` (same
  standards, values, deferred scope), satisfying the site's mandatory co-located tool-spec standard
  for this tool.
- Phase 9's remaining closing-integration steps (landing-page card, README/ROADMAP rows,
  CLAUDE.md folder-structure update) were already completed by Plan 09-05, per STATE.md's session
  log — this plan (09-04) only needed to add the SPEC.md file itself.
- No further work identified for the pump-testing tool within Phase 9.

---
*Phase: 09-pump-testing*
*Completed: 2026-07-23*

## Self-Check: PASSED

Verified `tools/pump-testing/SPEC.md` exists on disk (314 lines) and contains all required strings
per the plan's acceptance criteria ("23783-2", "8655", "Annex A", "unverified", "23783-3",
"deviation", "calculator", "deferred", "Tanaka"/"0.001 mg") — automated verify command re-run and
confirmed PASS. Task commit hash `4d2c073` verified present via `git log --oneline -3`.
