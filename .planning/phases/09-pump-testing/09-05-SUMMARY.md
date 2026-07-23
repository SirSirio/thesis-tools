---
phase: 09-pump-testing
plan: 05
subsystem: docs
tags: [static-html, i18n, landing-page, site-chrome, iso-23783-2, iso-8655]

# Dependency graph
requires:
  - phase: 09-pump-testing (plan 03)
    provides: "Top layer of tools/pump-testing/index.html complete (Sections 1-9) — accurate source for landing/README/ROADMAP copy"
  - phase: 09-pump-testing (plan 06)
    provides: "Bottom layer of tools/pump-testing/index.html complete (Section 10) — the tool is fully authored end to end, so this plan's closing-integration copy can describe both layers accurately"
provides:
  - "Bilingual (EN+IT) landing-page tool-card for tools/pump-testing/index.html"
  - "README.md tool-table row (Live) and repo-root ROADMAP.md Shipped row"
  - "CLAUDE.md folder-structure entry for tools/pump-testing/ plus a closing-chrome paragraph documenting the D-01/D-03 document-first two-layer framing"
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Landing-page tool-card stagger convention: new last card gets the next --rd step (0.58s) and the previously-last card's connector in CLAUDE.md's tree is un-terminated to admit the new block, matching the Phase-8 precedent"

key-files:
  created: []
  modified:
    - index.html
    - README.md
    - ROADMAP.md
    - CLAUDE.md

key-decisions:
  - "Balance glyph (U+2696 ⚖) chosen for the landing-page card icon to signal gravimetric weighing, distinct from every other tool's icon"
  - "CLAUDE.md documents tools/pump-testing/SPEC.md ahead of its own creation, matching the 06-04 precedent of documenting a tool's SPEC.md in the folder tree before the plan that authors it lands"
  - "Added a dedicated closing-chrome paragraph in CLAUDE.md's Design system section (not just the folder tree) to satisfy the must-have that the D-01/D-03 two-layer framing is described in prose, not only implied by the tree comment"

requirements-completed: [D-01, D-03]

# Metrics
duration: 8min
completed: 2026-07-23
---

# Phase 9 Plan 5: Pump Testing Protocol — Site Integration Summary

**Landing-page bilingual tool-card, README/ROADMAP rows, and CLAUDE.md folder-structure + closing-chrome documentation for the new two-layer pump-testing protocol page, with zero calculator/planner language.**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-07-23T14:12:21Z
- **Completed:** 2026-07-23T14:16:28Z
- **Tasks:** 2/2 completed
- **Files modified:** 4 (`index.html`, `README.md`, `ROADMAP.md`, `CLAUDE.md`)

## Accomplishments

- **Landing-page card (Task 1):** Added a new `<a class="tool-card reveal">` after the dispense-throughput-simulator card, linking `tools/pump-testing/index.html`, with `--rd: 0.58s` stagger and a balance glyph (⚖) icon. Added `card-title-pumptest`/`card-desc-pumptest` keys to both `LANG.en` and `LANG.it`, with copy describing a document-first, QR-citable dispensing-accuracy qualification protocol — the market-grade ISO 23783-2 gravimetric method + ISO 8655 pipette-equivalence benchmark as the deep top-layer core, a lighter go-to-market map, and the bottom-layer actual prototype protocol with justified deviations. No calculator/planner wording anywhere in the card copy.
- **README/ROADMAP/CLAUDE.md (Task 2):** Added a `README.md` tool-table row (marked ✅ Live) describing both layers with the full metrological core list (balance grades, environmental limits, evaporation handling, mass→volume Z-factor, replicate convention, trueness/precision, reporting). Added a matching repo-root `ROADMAP.md` Shipped-section row. Added a `tools/pump-testing/` block to `CLAUDE.md`'s folder-structure tree (index.html + SPEC.md + katex/ local fallback), converting the dispense-throughput-simulator block's connector from terminal (`└──`) to mid-list (`├──`) so pump-testing becomes the new last tool block. Added a new closing-chrome paragraph in CLAUDE.md's Design system section explicitly naming `tools/pump-testing/` as a document-first, no-calculator (D-01) two-layer protocol page exception to the site's "enter your parameters and get answers" tool pattern.
- `assets/style.css` confirmed byte-unchanged (card reuses existing `.tool-card`/`.card-icon`/`.card-body`/`.card-link` classes only).

## Task Commits

Each task was committed atomically:

1. **Task 1: Add the landing-page tool-card with EN+IT i18n keys** - `d2b3615` (feat)
2. **Task 2: Add README row, repo-root ROADMAP row, and CLAUDE.md folder-structure entry** - `2e36342` (docs)

_No TDD tasks in this plan — both are `type="auto"` documentation/chrome-integration tasks._

## Files Created/Modified

- `index.html` — new bilingual pump-testing tool-card (EN+IT `data-i18n` keys `card-title-pumptest`/`card-desc-pumptest`), `--rd: 0.58s` stagger, balance-glyph icon.
- `README.md` — new tool-table row for Pump Testing Protocol, marked ✅ Live.
- `ROADMAP.md` (repo root) — new Shipped-section row.
- `CLAUDE.md` — new `tools/pump-testing/` folder-structure block (index.html/SPEC.md/katex/); dispense-throughput-simulator tree connector changed terminal→mid-list; new closing-chrome paragraph describing the D-01/D-03 two-layer framing.

## Decisions Made

- Balance glyph (⚖, U+2696) selected as the card icon to signal gravimetric weighing — distinct from every other tool's icon glyph on the landing page.
- CLAUDE.md documents `tools/pump-testing/SPEC.md` in the folder tree even though the SPEC.md file itself has not yet been authored in this plan wave, following the 06-04 precedent (documenting a spec ahead of its own creation is acceptable when the tool's shape is already fixed).
- Added a standalone closing-chrome prose paragraph (not just a tree-comment) so the D-01/D-03 two-layer framing is discoverable as readable prose, matching the plan's explicit must-have wording.

## Deviations from Plan

None - plan executed exactly as written. Both tasks' automated verification commands passed after the closing-chrome paragraph was added to satisfy the literal `grep -q "tools/pump-testing/"` substring check in Task 2's verify command (the folder tree alone renders the path split across indentation levels, so a literal `tools/pump-testing/` substring only appears via an explicit prose sentence — added deliberately, not as a bug fix, since the plan's own must-haves called for both a tree entry and closing-chrome prose).

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `tools/pump-testing/index.html` is fully authored (Sections 1-10, from 09-01/09-02/09-03/09-06) and is now discoverable from the landing page (bilingual card), documented in README and the repo-root ROADMAP Shipped section, and recorded in CLAUDE.md's folder-structure tree and closing chrome.
- `tools/pump-testing/SPEC.md` does not yet exist as a physical file — CLAUDE.md documents it ahead of creation (06-04 precedent). If Phase 9 has no further plan that authors it, a follow-up quick task should create `SPEC.md` per the project's tool-spec standard before considering the tool fully compliant with CLAUDE.md's own rules.
- This was the last plan of Phase 9's wave 4 (depends only on 09-03) — Phase 9's closing integration steps are complete.

---
*Phase: 09-pump-testing*
*Completed: 2026-07-23*

## Self-Check: PASSED

Verified `index.html`, `README.md`, `ROADMAP.md`, and `CLAUDE.md` all exist and contain the expected pump-testing references. Both task commit hashes (`d2b3615`, `2e36342`) verified present in `git log --oneline --all`. `assets/style.css` confirmed byte-unchanged (`git diff --stat` against pre-plan HEAD shows no changes to that file). No `calculator`/`planner` wording found in `index.html`'s new card copy; the only `calculator`/`planner` matches in `README.md`/`ROADMAP.md`/`CLAUDE.md` are pre-existing unrelated backlog items and the new "No calculator" negation sentences describing the pump-testing tool's absence of a calculator.
