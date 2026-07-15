---
phase: 06-system-architecture-explorer-promote-the-electronics-archite
plan: 04
subsystem: ui
tags: [static-html, landing-page, i18n, docs]

# Dependency graph
requires:
  - phase: 06-01
    provides: "tools/system-architecture-explorer/index.html — promoted, reskinned tool file to link to"
provides:
  - "Landing-page card linking tools/system-architecture-explorer/index.html (EN/IT, section 01 Calculators)"
  - "README.md Tools table row for System Architecture Explorer (Live)"
  - "Repo-root ROADMAP.md Shipped row for System Architecture Explorer"
  - "CLAUDE.md folder tree entry for tools/system-architecture-explorer/ and updated prototypes/System-Architecture/ entry (three .md records only)"
affects: [06-05, 06-06, 06-07]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "New card follows existing compact .tool-card + data-i18n key convention (card-title-*/card-desc-*), reusing shared card-link-tool key"

key-files:
  created: []
  modified:
    - index.html
    - README.md
    - ROADMAP.md
    - CLAUDE.md

key-decisions:
  - "Landing card placed in the existing 'Calculators' section (section 01) alongside rotor-solver/occlusion-model/tensioned-path-model, rather than a new section — landing-page redesign is out of scope per plan"
  - "Card copy scoped to only the currently-shipped feature set (BOM editor, DKK<->EUR converter, sortable/filterable matrix) — the plan's own suggested example text ('live system diagram', 'pin-budget matrix') referenced 06-05/06-06 features not yet built at this point in the wave sequence, so both the card text and the README row were trimmed to avoid overclaiming"
  - "Added EN+IT data-i18n dictionary entries (card-title-sysarch/card-desc-sysarch) for consistency with sibling cards in the same section, rather than falling back to static-only text"
  - "CLAUDE.md documents tools/system-architecture-explorer/SPEC.md as part of the standard tool-folder shape even though SPEC.md itself lands in 06-07 later in this wave — this matches the plan's explicit must_haves wording and the site-wide tools/<slug>/ convention"

requirements-completed: [ARCH-02, ARCH-06]

# Metrics
duration: 8min
completed: 2026-07-15
---

# Phase 06 Plan 04: Wire the Promoted Tool into Site Chrome & Docs Summary

**Added a themed, bilingual landing-page card for the System Architecture Explorer and documented it in README.md, repo-root ROADMAP.md, and CLAUDE.md's folder tree — with card/README copy corrected to match what's actually shipped so far in the phase (BOM + converter + matrix, not yet the pin-budget model or live diagram).**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-07-15T14:00:00Z
- **Completed:** 2026-07-15T14:08:00Z
- **Tasks:** 2/2
- **Files modified:** 4 (index.html, README.md, ROADMAP.md, CLAUDE.md)

## Accomplishments
- Added a compact `.tool-card` in the landing page's "Calculators" section (`--rd: 0.34s`, icon `🔌`) linking `tools/system-architecture-explorer/index.html`, with matching EN/IT `data-i18n` dictionary entries (`card-title-sysarch`, `card-desc-sysarch`)
- Added a README.md `## Tools` table row for the System Architecture Explorer, terminated `✅ Live`
- Added a repo-root `ROADMAP.md` `## Shipped` row noting the promotion from the ad-hoc design-record page and the partial retirement of the "Bill of materials / component selector" backlog item
- Updated CLAUDE.md's folder-structure tree: added `tools/system-architecture-explorer/` (index.html + SPEC.md), and added a `prototypes/System-Architecture/` entry showing the three retained decision records (`ARCHITECTURE.md`, `PUMP-CONTROL-CONCEPTS.md`, `SOLUTION-MATRIX.md`) with `index.html` gone

## Task Commits

1. **Task 1: Add the landing-page tool card (ARCH-02)** - `3c8c262` (feat)
2. **Task 2: Add README row, ROADMAP Shipped entry, and update the CLAUDE.md folder tree (ARCH-02, ARCH-06)** - `4ffeb2c` (docs)

**Deviation fix commit:** `c095cee` (fix) — corrected card copy before Task 2 committed

## Files Created/Modified
- `index.html` - New `.tool-card` in the Calculators section + EN/IT `card-title-sysarch`/`card-desc-sysarch` LANG entries
- `README.md` - New Tools table row for the System Architecture Explorer
- `ROADMAP.md` - New Shipped row for the System Architecture Explorer
- `CLAUDE.md` - Folder tree: added `tools/system-architecture-explorer/` entry; added `prototypes/System-Architecture/` entry reflecting the post-move state

## Decisions Made
- Placed the new card in the existing "Calculators" section rather than creating a new landing-page section (redesign explicitly out of scope)
- Added full EN/IT `data-i18n` entries for the new card rather than static-only text, matching every sibling card in that section
- Trimmed both the card description and the README row to the feature set actually shipped by 06-01/06-03 (BOM editing, DKK↔EUR conversion, sortable/filterable 17-variant matrix with expandable per-variant breakdown) — omitted "pin-budget" and "live system diagram" language since 06-05 (pin-budget) and 06-06 (diagram) have not run yet
- CLAUDE.md's new `tools/system-architecture-explorer/` entry documents `SPEC.md` even though it does not exist on disk until 06-07 — intentional, per the plan's explicit must_haves requirement to document the standard `index.html + SPEC.md` tool shape

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Landing card and LANG dictionary overclaimed unshipped features**
- **Found during:** Task 2 (checking the 06-01-SUMMARY.md against the tool's actual current file state before writing the README row)
- **Issue:** Task 1's card copy followed the plan's own suggested example text verbatim ("...DKK↔EUR, live system diagram" / "source/confidence tags"), but a grep of `tools/system-architecture-explorer/index.html` confirmed the `#diagram` container is still an empty reserved anchor (`<div id="diagram" aria-hidden="true"></div>`, `06-06` not yet run) and no `confidence`/`source-note` fields exist (`06-05` not yet run). The card and its EN/IT LANG entries were making false claims about a live production page.
- **Fix:** Rewrote the card's EN/IT `card-desc-sysarch` text to describe only the shipped cost/complexity matrix, editable BOM, and live DKK↔EUR converter — dropped "pin-budget", "source/confidence tags", and "live system diagram"
- **Files modified:** index.html
- **Verification:** Re-grepped `tools/system-architecture-explorer/index.html` for `confidence`/`sourceNote`/`buildDiagram` (all absent) to confirm the trimmed copy has no remaining overclaims
- **Committed in:** c095cee (separate fix commit, landed between the Task 1 and Task 2 commits)

**2. [Rule 1 - Bug] README row inherited the same overclaim**
- **Found during:** Task 2, same investigation as above
- **Issue:** The plan's action text for Task 2 suggested a README row including "editable BOM prices with source/confidence tags... live variant-driven system diagram" — same unshipped-feature problem as the card
- **Fix:** Wrote the README row to describe only the shipped feature set (editable BOM prices, live DKK↔EUR converter, sortable/filterable 17-variant matrix with expandable per-variant BOM breakdowns)
- **Files modified:** README.md
- **Verification:** Cross-checked wording against 06-01-SUMMARY.md's actual "Accomplishments" list
- **Committed in:** 4ffeb2c (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 - bugs: inaccurate/premature feature claims in shipped copy, caught before the docs commit landed)
**Impact on plan:** Both fixes are copy-accuracy corrections scoped to files_modified. No scope creep, no architectural change.

## Issues Encountered
- A git staging mistake (committing task-2 files alongside an index.html-only deviation fix due to stale `git add` state) was caught before the plan's final commit and corrected via `git reset HEAD~1` on the local, unpushed phase branch, then re-split into two clean commits (`c095cee` fix-only, `4ffeb2c` docs-only). No content was lost or altered by the reset.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- The landing page, README, and repo ROADMAP now reference the tool; CLAUDE.md's folder tree documents both the new tool location and the trimmed `prototypes/System-Architecture/` folder
- Card and README copy will need a follow-up pass once 06-05 (pin-budget model) and 06-06 (live diagram) ship, to add back the "pin-budget" and "live diagram" language now correctly deferred
- CLAUDE.md's `tools/system-architecture-explorer/SPEC.md` reference will become filesystem-accurate once 06-07 runs

---
*Phase: 06-system-architecture-explorer-promote-the-electronics-archite*
*Completed: 2026-07-15*

## Self-Check: PASSED

- FOUND: index.html
- FOUND: README.md
- FOUND: ROADMAP.md
- FOUND: CLAUDE.md
- FOUND commit: 3c8c262
- FOUND commit: c095cee
- FOUND commit: 4ffeb2c
