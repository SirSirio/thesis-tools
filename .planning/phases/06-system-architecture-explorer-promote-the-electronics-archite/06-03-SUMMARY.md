---
phase: 06-system-architecture-explorer-promote-the-electronics-archite
plan: 03
subsystem: docs
tags: [static-html, markdown-docs, cross-linking, content-authoring]

# Dependency graph
requires: ["06-01"]
provides:
  - "tools/system-architecture-explorer/index.html — id=theory now holds the canonical reasoning prose (three comms layers, driver-vs-MCU insight, U5 concurrency axis)"
  - "prototypes/System-Architecture/{ARCHITECTURE,PUMP-CONTROL-CONCEPTS,SOLUTION-MATRIX}.md trimmed to pointers for overlapping prose, all deleted-index.html links repointed to the tool"
  - "prototypes/PROTOTYPES.md architecture-studies table cross-links System-Architecture/"
affects: [06-04, 06-05, 06-06]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "D-05 trim idiom: replace duplicated reasoning prose with a one-line pointer into the tool's #theory anchor, phrased 'Full write-up now lives in the tool: [link]' + a 2-3 sentence quick summary, while keeping raw audit-trail content (fixed components, open questions, named verdicts) untouched"
    - "Cross-record links (same prototypes/System-Architecture/ folder) stay same-folder relative; only links that targeted the deleted index.html get the ../../tools/system-architecture-explorer/index.html#anchor treatment"

key-files:
  created: []
  modified:
    - tools/system-architecture-explorer/index.html
    - prototypes/System-Architecture/ARCHITECTURE.md
    - prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md
    - prototypes/System-Architecture/SOLUTION-MATRIX.md
    - prototypes/PROTOTYPES.md

key-decisions:
  - "Anchor mapping for repointed links: #matrix for live cost/variant-table references, #diagram for 'see the diagram' promises (diagram itself ships in a later plan, 06-06), #theory for reasoning/concept-explanation pointers"
  - "Trimmed ARCHITECTURE.md's 'driver matters more than the MCU' section, its U5-concurrency framing bullets, and PUMP-CONTROL-CONCEPTS.md's 'mental model: WHO makes the step pulses?' section (including its driver-family table) to pointers — these were the exact prose the tool's new theory section was authored from, so keeping both copies would violate D-05's one-home-per-idea rule"
  - "Also trimmed PUMP-CONTROL-CONCEPTS.md's power/heat bullet under 'Two things that cost more than the controller' to a pointer, since it duplicates the tool's U5 PSU/heat/EMI explanation almost verbatim; kept the throughput bullet (unique framing, not in the tool)"
  - "Left ARCHITECTURE.md's 'Fixed components', 'Pump-controller options' table, '\"Different Arduino per pump\" verdict', 'How it all connects', and 'Open questions' sections untouched — these are raw exploration/audit-trail content with no home in the tool, explicitly protected by the plan's must_haves"
  - "SOLUTION-MATRIX.md D-08 preface placed as a blockquote directly under the parent-docs line, before '## Component unit prices' — reads as the entry point to the whole static-table document, not just one section"

requirements-completed: [ARCH-04]

# Metrics
duration: 25min
completed: 2026-07-15
---

# Phase 06 Plan 03: System Architecture Explorer — Theory Content & Cross-Link Repair Summary

**Authored the tool's canonical Part-01 reasoning prose (three comms layers, driver-vs-MCU insight, U5 concurrency axis) and repointed every dangling link left by 06-01's file move across the three decision records and PROTOTYPES.md.**

## Performance

- **Duration:** ~25 min
- **Completed:** 2026-07-15T14:15:00Z
- **Tasks:** 2/2
- **Files modified:** 5

## Accomplishments
- Filled `tools/system-architecture-explorer/index.html`'s `id="theory"` `.theory-card` with three `.theory-section` panels: "The Three Comms Layers" (A/B/C), "The Driver Matters More Than the MCU", and "The U5 Concurrency Axis" — cross-linking the U5 section to the multi-liquid-architecture study that owns that open unknown
- Repointed every link in `ARCHITECTURE.md`, `PUMP-CONTROL-CONCEPTS.md`, and `SOLUTION-MATRIX.md` that targeted the deleted `prototypes/System-Architecture/index.html`, using `#matrix`/`#diagram`/`#theory` anchors matched to what each link actually referenced
- Trimmed the passages in `ARCHITECTURE.md` and `PUMP-CONTROL-CONCEPTS.md` that duplicated the tool's new theory prose (the driver-vs-MCU insight, the "mental model: WHO makes the step pulses?" section + its table, the U5-concurrency framing, and the power/heat cost bullet) down to one-line pointers into the tool's `#theory` anchor, keeping a short quick-summary sentence in each case
- Added a D-08 "reference view" preface blockquote to `SOLUTION-MATRIX.md` stating the live tool computes authoritative numbers and the static table is a human-readable snapshot
- Added a `System-Architecture/` row to `PROTOTYPES.md`'s "Architecture studies" table, mirroring the `multi-liquid-architecture/` row shape and noting the live tool now lives under `tools/`

## Task Commits

1. **Task 1: Author the Part-01 theory/reasoning section in the tool (D-04)** - `ce2767d` (feat)
2. **Task 2: Trim the three decision records to pointers, repoint links, add SOLUTION-MATRIX reference-view preface, and add the PROTOTYPES.md cross-link row** - `639b429` (docs)

## Files Created/Modified
- `tools/system-architecture-explorer/index.html` - `id=theory` filled with 3 reasoning panels replacing the 06-01 placeholder
- `prototypes/System-Architecture/ARCHITECTURE.md` - Links at (former) lines 14, 43-44, 110 repointed to the tool; driver-insight and U5-framing sections trimmed to pointers; fixed components / options table / "different Arduino per pump" verdict / open questions retained
- `prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md` - "Mental model" section trimmed to a pointer; power/heat bullet trimmed to a pointer; the 7 concepts (C1-C7), side-by-side table, and recommendation lens retained; closing link repointed
- `prototypes/System-Architecture/SOLUTION-MATRIX.md` - D-08 reference-view preface added; component-price and matrix links repointed; "short list" heading text updated to remove the stale `index.html` mention
- `prototypes/PROTOTYPES.md` - New row cross-linking `System-Architecture/` under the architecture-studies table

## Decisions Made
- Anchor choice per link target: `#matrix` for live cost/variant-table references, `#diagram` for "see the diagram" promises (the diagram itself is a later plan, 06-06 — the promise is now correctly pointed even though the destination anchor currently renders an empty reserved `<div id="diagram">`), `#theory` for concept-explanation pointers
- Trimmed the exact passages the tool's theory prose was sourced from (driver-vs-MCU insight, "mental model" section + table, U5 framing, power/heat bullet) rather than leaving them duplicated — this is the direct application of D-05's locked direction
- Left all explicitly protected raw content untouched: fixed components, the pump-controller options table, the "different Arduino per pump" verdict, "How it all connects", and the three open questions

## Deviations from Plan

None - plan executed exactly as written. All specific line-reference edits (ARCHITECTURE.md lines 14, 43-44, 110; SOLUTION-MATRIX.md lines 23, 126; PUMP-CONTROL-CONCEPTS.md line 155) were applied at their equivalent locations in the current file content, and the D-05 trim scope was judged by comparing each record's prose side-by-side against the newly authored tool theory section, per the plan's "Claude's Discretion" allowance.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- `tools/system-architecture-explorer/index.html` now has its `#theory` anchor filled with substantive, self-contained reasoning prose that 06-05 (data/pin-budget) and 06-06 (live diagram) can extend or reference without re-deriving it
- The `#diagram` anchor still renders an empty reserved `<div id="diagram">` — the `#diagram` links added in this plan are forward-references that will resolve to real content once 06-06 builds the live SVG diagram; they are not dangling in the RESEARCH Pitfall 2 sense (the target file and anchor id both exist today, only the anchor's content is still a placeholder)
- All three decision records and PROTOTYPES.md are git-tracked as of this plan's Task 2 commit (they were untracked working-tree state before, per 06-01-SUMMARY.md's note)

---
*Phase: 06-system-architecture-explorer-promote-the-electronics-archite*
*Completed: 2026-07-15*

## Self-Check: PASSED

- FOUND: tools/system-architecture-explorer/index.html
- FOUND: prototypes/System-Architecture/ARCHITECTURE.md
- FOUND: prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md
- FOUND: prototypes/System-Architecture/SOLUTION-MATRIX.md
- FOUND: prototypes/PROTOTYPES.md
- FOUND commit: ce2767d
- FOUND commit: 639b429
