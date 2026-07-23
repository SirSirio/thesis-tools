---
phase: 09-pump-testing
plan: 01
subsystem: docs
tags: [static-html, katex, iso-23783-2, iso-8655, dispensing-accuracy, metrology]

# Dependency graph
requires: []
provides:
  - "tools/pump-testing/ tool folder with vendored KaTeX (local-only, no CDN)"
  - "10-section anchor scaffold (#framing through #prototype-protocol-slot)"
  - "Authored top-layer Sections 1-3 (dual-frame framing, Annex D gravimetric method, Table 3 balance requirements)"
affects: ["09-02", "09-03", "09-06"]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Document-first tool page (no calculator, no <input>) — theory-card / theory-section / spec-table pattern reused from system-architecture-explorer"
    - "Local-only KaTeX vendoring (no CDN fallback pattern, unlike the displaced-volume-model precedent) — primary source is tools/pump-testing/katex/"

key-files:
  created:
    - tools/pump-testing/index.html
    - tools/pump-testing/katex/katex.min.css
    - tools/pump-testing/katex/katex.min.js
    - tools/pump-testing/katex/auto-render.min.js
  modified: []

key-decisions:
  - "KaTeX loaded local-only (no CDN primary), deviating from the displaced-volume-model's CDN-primary/local-fallback pattern, per this plan's explicit offline-first requirement"
  - "English-only page (no EN/IT toggle), matching the peristaltic-roller-displaced-volume-model precedent for dense, table-heavy thesis content"
  - "Table of contents rendered as plain anchor links (no JS), keeping Sections 4-10 as clearly-labeled stub cards pending later plans (09-02/09-03/09-06)"

patterns-established:
  - "Stub section pattern: unauthored sections carry a heading, anchor id, and an italic .stub-note naming which future plan authors them — lets later plans fill sections without restructuring"

requirements-completed: [D-01, D-02]

# Metrics
duration: 15min
completed: 2026-07-23
---

# Phase 9 Plan 1: Pump Testing Protocol — Shell & Top-Layer Sections 1-3 Summary

**Document-first `tools/pump-testing/` page shell with locally-vendored KaTeX, a full ten-section anchor scaffold, and the authored dual-frame framing (ISO 23783-2 Annex D as test method / ISO 8655 as performance benchmark), the Annex D gravimetric method, and the Table 3 balance-requirements section with its compliant band highlighted.**

## Performance

- **Duration:** ~15 min
- **Completed:** 2026-07-23
- **Tasks:** 3/3 completed
- **Files modified:** 4 (1 created HTML file + 3 vendored KaTeX assets)

## Accomplishments
- Built the `tools/pump-testing/` tool folder with a self-contained `index.html` following site conventions (dark glassmorphic chrome, `← All tools` nav, bg-blobs, fade-up entrance) and vendored KaTeX locally as the primary (non-CDN) source, so the page renders offline from a USB drive.
- Scaffolded all ten top-layer section anchors in the exact required order/ids (`#framing`, `#method-gravimetric`, `#balance-requirements`, `#mass-to-volume`, `#replicates`, `#trueness-precision`, `#reporting-uncertainty`, `#alternate-methods`, `#go-to-market`, `#prototype-protocol-slot`), each carrying a heading and a placeholder comment naming the plan that will author it.
- Authored Section 1 (dual-frame framing) stating the thesis-defensible verdict honestly, including the correction that ISO 23783-2 Part 2 delegates device pass/fail tolerances to ISO 23783-3 (not held/verified) rather than setting them itself.
- Authored Section 2 (Annex D single-channel gravimetric method): apparatus/test liquid, preparation rules, Table D.1 environmental conditions, and the evaporation-blank workflow.
- Authored Section 3 (Table 3 balance requirements): static 4-row table with the pump's compliant 0.5–20 µL / 0.001 mg (semi-micro) band visually highlighted, plus a forward-reference to the prototype's actual 0.1 mg balance (~2 orders of magnitude short) pointing to Section 10.

## Task Commits

Each task was committed atomically:

1. **Task 1: Create the tool folder, vendor KaTeX, build the page shell and ten-section anchor scaffold** - `94431d2` (feat)
2. **Task 2: Author Section 1 (dual-frame framing) and Section 2 (gravimetric method, Annex D)** - `9acd341` (feat)
3. **Task 3: Author Section 3 (balance requirements, Table 3) with the compliant band highlighted** - `f95dae3` (feat)

_No TDD tasks in this plan — all are `type="auto"` documentation-authoring tasks._

## Files Created/Modified
- `tools/pump-testing/index.html` - Document-first protocol page: shell, TOC, 10-section scaffold, Sections 1-3 fully authored, Sections 4-10 stubbed for later plans
- `tools/pump-testing/katex/katex.min.css` - Vendored KaTeX stylesheet (copied from peristaltic-roller-displaced-volume-model)
- `tools/pump-testing/katex/katex.min.js` - Vendored KaTeX core
- `tools/pump-testing/katex/auto-render.min.js` - Vendored KaTeX auto-render plugin

## Decisions Made
- KaTeX loaded local-only (no CDN reference at all), per the plan's explicit offline-first requirement — a stricter pattern than the displaced-volume-model's CDN-primary/local-fallback approach, since this tool has no CDN dependency at any point.
- No EN/IT language toggle — English-only, matching the RESEARCH.md recommendation and the displaced-volume-model precedent for dense normative-table content.
- Table of contents implemented as plain static anchor links (no JS) to stay within D-01's document-first, no-calculator constraint.

## Deviations from Plan

None - plan executed exactly as written. All three tasks' automated verification commands passed on first attempt with no auto-fixes required.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Sections 4-10 are cleanly scaffolded (id + heading + stub-note naming the owning plan) so Plan 09-02 (mass→volume, replicates, trueness/precision, reporting/uncertainty), Plan 09-03 (alternate methods, go-to-market map), and Plan 09-06 (actual prototype protocol, Layer 2) can fill them in without touching page structure.
- KaTeX is wired and ready (`renderMathInElement` call in place) for Plan 09-02's formulas (Z-factor, Tanaka formula, air-density formula) — no further infrastructure changes needed.
- `assets/style.css` remains byte-unchanged (verified via `git diff --stat`), preserving the site-wide shared stylesheet invariant.

---
*Phase: 09-pump-testing*
*Completed: 2026-07-23*

## Self-Check: PASSED

All created files verified present on disk; all three task commit hashes (94431d2, 9acd341, f95dae3) verified present in git log.
