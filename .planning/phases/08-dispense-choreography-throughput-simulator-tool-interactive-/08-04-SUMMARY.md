---
phase: 08-dispense-choreography-throughput-simulator-tool-interactive-
plan: 04
subsystem: docs
tags: [landing-page, i18n, chrome, ship-steps]

# Dependency graph
requires:
  - phase: 08-02
    provides: "Shipped tool/index.html (rendered metrics/Gantt/rack-animation) that the landing card links to"
  - phase: 08-03
    provides: "tools/dispense-throughput-simulator/SPEC.md (canonical spec referenced by CLAUDE.md's new folder entry)"
provides:
  - "Landing-page tool card (EN+IT i18n) linking tools/dispense-throughput-simulator/index.html"
  - "README.md tool-table row"
  - "Repo-root ROADMAP.md Shipped-table row"
  - "CLAUDE.md folder-structure entry for tools/dispense-throughput-simulator/"
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Landing-page card + i18n key pair follows the System Architecture Explorer card precedent exactly (icon, card-title/card-desc data-i18n keys in both LANG.en and LANG.it, --rd stagger increment)"

key-files:
  created: []
  modified:
    - index.html
    - README.md
    - ROADMAP.md
    - CLAUDE.md

key-decisions:
  - "Card icon set to timer/hourglass glyph (Unicode U+23F1, '⏱') — distinct from all existing card icons (⚙ 🧫 〰 🔌 ⬡ 🗓 🃏)"
  - "Card placed as the last item in the Tools grid (section-index 01), after the GSD Workflow Guide card, with --rd: 0.5s — the next stagger step after the prior last card's 0.42s"
  - "README row inserted after the System Architecture Explorer row and before Prototype Design Space, matching the table's ship-order convention"
  - "ROADMAP.md Shipped row copy reused verbatim from 08-PATTERNS.md's ready-made analog block; Planned placeholder left untouched"
  - "CLAUDE.md's system-architecture-explorer block changed from the tree's last '└──' to '├──' so the new dispense-throughput-simulator block becomes the new terminal '└──' entry, appended in ship order"

patterns-established: []

requirements-completed: [D-01, D-03, D-11]

# Metrics
duration: 7min
completed: 2026-07-20
---

# Phase 08 Plan 04: Landing Page, README, ROADMAP, CLAUDE.md Integration Summary

**Wired the shipped Dispense Choreography & Throughput Simulator into every site-chrome entry point — landing-page card (EN+IT), README tool table, repo-root ROADMAP Shipped table, and CLAUDE.md's folder-structure tree — closing the standard GSD ship steps for the tool.**

## Performance

- **Duration:** 7 min
- **Started:** 2026-07-20T12:33:41Z (immediately following 08-03)
- **Completed:** 2026-07-20T12:40:00Z
- **Tasks:** 2 completed
- **Files modified:** 4 (index.html, README.md, ROADMAP.md, CLAUDE.md)

## Accomplishments

- Added a new `.tool-card` to the landing page's Tools grid linking `tools/dispense-throughput-simulator/index.html`, with a unique `⏱` icon and copy surfacing D-01 (cocktail pipeline), D-03 (concurrency slider, lockstep vs. independent-rate), and D-11 (headline metrics) in user-facing language
- Added matching `card-title-dispense-sim`/`card-desc-dispense-sim` i18n key pairs to BOTH `LANG.en` and `LANG.it` in the landing page's own LANG object — no orphan keys, full EN/IT parity maintained
- Added a new README.md tool-table row (✅ Live) after the System Architecture Explorer row
- Added a new repo-root ROADMAP.md Shipped-table row describing the scheduler, concurrency model, Gantt, and U5 answer; left the `## Planned` placeholder row untouched
- Extended CLAUDE.md's folder-structure tree with a `tools/dispense-throughput-simulator/` block (index.html + SPEC.md one-line descriptions), appended in ship order after `system-architecture-explorer/`

## Task Commits

1. **Task 1: Landing-page card + README row** - `4a2d4b6` (feat)
2. **Task 2: Repo-root ROADMAP row + CLAUDE.md folder structure** - `d3e461f` (docs)

**Plan metadata:** (pending — final docs commit below)

## Files Created/Modified

- `index.html` - New Tools-grid card (`⏱` icon, `card-title-dispense-sim`/`card-desc-dispense-sim`), `--rd: 0.5s` stagger, i18n keys added to both `LANG.en` and `LANG.it`
- `README.md` - New tool-table row (✅ Live) after System Architecture Explorer
- `ROADMAP.md` - New Shipped-table row; `## Planned` placeholder untouched
- `CLAUDE.md` - New `tools/dispense-throughput-simulator/` folder-structure block; `system-architecture-explorer/`'s tree connector changed from `└──` to `├──` to accommodate the new terminal entry

## Decisions Made

See `key-decisions` in frontmatter above. No independent modelling or architectural decisions — this plan is pure chrome/doc integration following the ready-made analog blocks in `08-PATTERNS.md`.

## Deviations from Plan

None - plan executed exactly as written. Both tasks' automated verification greps passed on the first write with no rework needed:
- `CARD_README_OK` / i18n-parity check (6 total occurrences of the two i18n keys — card markup + EN + IT — exceeding the required minimum of 4)
- `ROADMAP_CLAUDE_OK` / `PLANNED_OK` (Planned placeholder row confirmed intact)

## Issues Encountered

None.

## User Setup Required

None - pure static-file chrome edits, no external service configuration.

## Next Phase Readiness

- The tool is now fully shipped per CLAUDE.md's standard new-tool checklist: reachable from the landing page (EN+IT), listed in README, recorded in the repo-root ROADMAP, and documented in CLAUDE.md's folder tree.
- Phase 08 (Dispense Choreography & Throughput Simulator) has no further plans — this was the final plan (4 of 4).
- The human-check verification item (visual render at 1280px/375px, EN/IT toggle) was not independently re-executed in a browser during this autonomous run since the new card reuses the exact `.tool-card`/`.card-icon`/`.card-body`/`.card-link` markup and CSS already shipped and visually verified for every prior card (rotor-solver, occlusion, tensioned-path, system-architecture-explorer, GSD) — structurally, no new CSS or layout risk was introduced. Recommend a quick visual spot-check via `serve.bat` before considering the phase fully closed if a human pass hasn't happened yet.
- No blockers.

## Known Stubs

None. All four edits are static, fully-authored content — no placeholder text, no empty data bindings.

## Threat Flags

None. Documentation/chrome-only change (landing card, README, ROADMAP, CLAUDE.md); no new executable logic, no inputs, no network, no persistence — matches the plan's own threat model (T-08-06: accept, N/A).

## Self-Check: PASSED

- FOUND: index.html contains `tools/dispense-throughput-simulator/index.html` and `card-title-dispense-sim`/`card-desc-dispense-sim` (6 occurrences)
- FOUND: README.md contains `tools/dispense-throughput-simulator/index.html`
- FOUND: ROADMAP.md contains "Dispense Choreography"; `## Planned` placeholder intact
- FOUND: CLAUDE.md contains `dispense-throughput-simulator` and `SPEC.md`
- FOUND: commit 4a2d4b6 (Task 1)
- FOUND: commit d3e461f (Task 2)

---
*Phase: 08-dispense-choreography-throughput-simulator-tool-interactive-*
*Completed: 2026-07-20*
