---
phase: 09-pump-testing
plan: 03
subsystem: docs
tags: [static-html, iso-23783-2, iso-8655, iso-10993, iso-13485, clia, iso-22870, iso-15189, dispensing-accuracy, go-to-market]

# Dependency graph
requires:
  - phase: 09-pump-testing (plan 02)
    provides: "Sections 4-7 deep metrological core (mass-to-volume, replicates, trueness/precision, reporting/uncertainty); .theory-card content shell; .math-block/.const-list/.tag-unverified CSS patterns"
provides:
  - "Authored top-layer Sections 8-9: alternate-methods comparison (why-gravimetric rationale, GRM/trumpet-curve rejections) and mapped go-to-market dimensions (D-03 lighter map)"
  - "Two new reusable CSS patterns: .verdict-badge (verdict-yes/verdict-no inline badges for comparison tables) and .map-card/.map-grid/.map-item/.map-lead (visibly lighter card family for mapped-not-deep content)"
  - "Top layer of tools/pump-testing/index.html now COMPLETE (Sections 1-9)"
affects: ["09-06"]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - ".verdict-badge / .verdict-yes / .verdict-no — inline applicability-verdict badges for comparison tables (green=adopt, red=not-applicable)"
    - ".map-card / .map-lead / .map-grid / .map-item — visibly lighter card family (no accent left-bar, dimmer neutral borders, no accent-colored headings) used to signal D-03's lighter depth allocation vs .theory-card's deep-core styling"

key-files:
  created: []
  modified:
    - tools/pump-testing/index.html

key-decisions:
  - "Section 8's methods comparison table uses the existing .spec-table/.table-wrap shell (not a new table class) so the alternates comparison visually matches Table 3/Table D.1/Table A.1 elsewhere on the page — consistency over novelty"
  - "New .map-card family deliberately omits the accent-colored left border and accent-colored h3 headings that .theory-card/.theory-section use, so Section 9's lighter D-03 depth allocation is visually legible at a glance, not just implied by shorter prose"
  - "Titrimetric (ISO 8655-7) row kept in the Section 8 table as 'mention only' with an explicit unverified-applicability tag, rather than omitted, per RESEARCH.md RQ-2's instruction to include it for completeness without overclaiming"

requirements-completed: [D-01, D-03]

# Metrics
duration: 15min
completed: 2026-07-23
---

# Phase 9 Plan 3: Pump Testing Protocol — Alternate Methods & Go-to-Market Map (Sections 8-9) Summary

**Authored the ISO 23783-2 alternate-methods comparison table with the explicit why-gravimetric rationale and GRM/trumpet-curve rejections, plus a visibly lighter go-to-market map covering ISO 10993 (contact-type-scoped), ISO 13485, the CLIA waiver bar, and ISO 22870/15189 — completing the market-grade top layer.**

## Performance

- **Duration:** ~15 min
- **Completed:** 2026-07-23
- **Tasks:** 2/2 completed
- **Files modified:** 1 (`tools/pump-testing/index.html`)

## Accomplishments

- **Section 8 (Alternate methods):** Authored a trimmed reader-facing comparison table (single-channel gravimetric, GRM, dual-dye/single-dye photometric, fluorescence, photometric/gravimetric hybrid, optical image analysis of droplets/capillaries, titrimetric) with standard reference, volume range, and a color-coded applicability verdict badge per method. Stated the explicit rationale that gravimetric single-channel (Annex D) is close to the only fit for this contact-delivery, single-outlet, any-liquid pump, since every plate/photometric/fluorescence method assumes a microplate-format multi-well liquid handler. Explicitly stated GRM (Annex E) is restricted to non-contact, free-flying-droplet/jet devices and therefore does not apply, and that proto-02's "slope method" is inspired by the same regression logic but is NOT the ISO GRM procedure and must not be labeled as such. Added a dedicated callout documenting IEC 60601-2-24 trumpet curves as considered-and-rejected (continuous-flow framing mismatched to this pump's discrete ~5 µL strokes).
- **Section 9 (Go-to-market map):** Authored a compact card grid covering safety/reliability/lifetime (map-only, no deep standard), biocompatibility (ISO 10993 series, explicitly scoped to the device's actual external-communicating/limited-duration/non-blood-contact fluid path — not the full blood-contact hemocompatibility panel), QMS/regulatory pathway (ISO 13485, framed as required only if productized), the CLIA Certificate-of-Waiver criteria (framing device matching point-of-care intent, not a waiver-status claim), and ISO 22870/ISO 15189 (POCT quality/competence, procedural framing with no dispensing-accuracy numbers). Rendered with a new `.map-card` family deliberately lighter than `.theory-card` (no accent left-bar, dimmer neutral borders, no accent-colored headings) so the D-03 depth allocation is visually legible, not just implied by shorter prose. Opened with a lead sentence framing the section as "what full market-readiness also demands" beyond dispensing accuracy.
- Added two new CSS patterns to the page's existing `<style>` block: `.verdict-badge`/`.verdict-yes`/`.verdict-no` (comparison-table applicability badges) and `.map-card`/`.map-lead`/`.map-grid`/`.map-item` (the lighter card family for Section 9).
- The top-layer market-grade protocol (Sections 1-9) is now fully authored end to end. Only Section 10 (the bottom-layer actual prototype protocol, owned by Plan 09-06) remains a stub.

## Task Commits

Each task was committed atomically:

1. **Task 1: Author Section 8 (alternate-methods comparison + why gravimetric + GRM/trumpet-curve rejections)** - `efd5cfa` (feat)
2. **Task 2: Author Section 9 (mapped go-to-market dimensions, lighter styling)** - `2088692` (feat)

_No TDD tasks in this plan — both are `type="auto"` documentation-authoring tasks._

## Files Created/Modified

- `tools/pump-testing/index.html` — Sections 8-9 fully authored (alternate-methods comparison table with why-gravimetric rationale and GRM/trumpet-curve rejections; mapped go-to-market dimensions with visibly lighter `.map-card` styling); two new CSS patterns added to the existing inline `<style>` block; Sections 1-7 (09-01/09-02) and Section 10 (09-06) untouched.

## Decisions Made

- Section 8's comparison table reuses the existing `.spec-table`/`.table-wrap` shell rather than introducing a new table class, keeping visual consistency with Table 3/Table D.1/Table A.1 elsewhere on the page.
- The new `.map-card` family was designed to be structurally distinct from `.theory-card` (no accent left-bar, no accent-colored `h3` headings, dimmer neutral border) specifically so a reader can tell at a glance — before reading a word of prose — that Section 9 is the lighter-treatment "map," honoring D-03's depth-allocation instruction beyond just writing shorter text.
- Titrimetric (ISO 8655-7) kept as an explicit "mention only" row with an unverified-applicability tag rather than omitted, matching RESEARCH.md RQ-2's guidance to note its existence in the ISO 8655 family for completeness without overclaiming applicability to a peristaltic (non-piston) pump.

## Deviations from Plan

None - plan executed exactly as written. Both tasks' automated verification commands passed on first attempt with no auto-fixes required.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The top-layer market-grade protocol (Sections 1-9) is complete: framing, gravimetric method, balance requirements, mass-to-volume conversion, replicates, trueness/precision, reporting/uncertainty, alternate methods, and the go-to-market map are all fully authored.
- Section 10 (the bottom-layer actual prototype protocol + justified deviations) remains a clearly-labeled stub, ready for Plan 09-06 to populate using `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/TEST-PROTOCOL.md` as its primary source, per 09-CONTEXT.md's superseded D-04.
- The new `.verdict-badge` and `.map-card` CSS patterns are available for reuse if 09-06 needs similar comparison-verdict badges or lighter-treatment cards for its own deviation table.
- `assets/style.css` remains untouched (all new CSS lives in the tool's own inline `<style>` block, per project convention).
- No `<input>` elements exist anywhere in the file — the document-first, no-calculator constraint (D-01, D-02) holds across all nine authored sections.

---
*Phase: 09-pump-testing*
*Completed: 2026-07-23*

## Self-Check: PASSED

Verified `tools/pump-testing/index.html` exists and contains both new CSS patterns (`.verdict-badge`, `.map-card`). Both task commit hashes (`efd5cfa`, `2088692`) verified present in `git log --oneline --all`. Tag balance checked: 10 `<section>`/`</section>` pairs, 71/71 `<div>`/`</div>` pairs, 9 `.theory-card` blocks — no structural HTML corruption introduced.
