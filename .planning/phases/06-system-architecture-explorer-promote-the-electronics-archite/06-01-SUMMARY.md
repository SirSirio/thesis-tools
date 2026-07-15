---
phase: 06-system-architecture-explorer-promote-the-electronics-archite
plan: 01
subsystem: ui
tags: [static-html, cost-calculator, localStorage, design-tokens, glassmorphism]

# Dependency graph
requires: []
provides:
  - "tools/system-architecture-explorer/index.html — promoted, reskinned, persistent cost-matrix tool with two-part shell"
  - "Locked anchor ids #theory (Part 01 placeholder), #matrix (Part 02 interactive engine), #diagram (reserved for live SVG)"
  - "Locked localStorage keys sae-prices / sae-rate for downstream persistence"
  - "prototypes/System-Architecture/index.html deleted — the three .md decision records remain in place"
affects: [06-02, 06-03, 06-04, 06-05, 06-06]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Reskin private :root token block onto assets/style.css shared tokens; keep only genuinely tool-specific colours (--ok/--warn/--blue) local"
    - "Two-part theory->interactive tool shell (part-label/theory-card/glass-panel) mirroring peristaltic-roller-displaced-volume-model"
    - "localStorage persistence with Number.isFinite + non-negative/positive guards before touching in-memory state (site-wide try/catch idiom, new sae- key prefix)"

key-files:
  created:
    - tools/system-architecture-explorer/index.html
  modified: []

key-decisions:
  - "Renamed the ported engine's <table id=\"matrix\"> to <table id=\"matrixTable\"> since the plan reserves id=\"matrix\" for the Part-02 container (D-04 anchor lock); the original id was unused by both JS and CSS so the rename is behavior-neutral"
  - "Used nav-bar label \"← All tools\" (thesis-timeline precedent, the most recent English-only tool) rather than \"← Resources\" (older i18n-era tools), matching the plan's own must_haves text"
  - "prototypes/System-Architecture/index.html was never git-tracked (untracked working-tree state pre-existing before this plan), so its removal required no git deletion — only the filesystem delete"

patterns-established:
  - "Rule 1 fix: sync the #rate input field's displayed value from the restored localStorage rate on init, otherwise the field would silently disagree with the in-memory state after a reload with persisted prices"

requirements-completed: [ARCH-01, ARCH-03]

# Metrics
duration: 15min
completed: 2026-07-15
---

# Phase 06 Plan 01: Promote System Architecture Explorer Summary

**Moved the 310-line ad-hoc cost/complexity matrix from `prototypes/System-Architecture/index.html` into a first-class themed tool at `tools/system-architecture-explorer/index.html`, with a two-part theory/interactive shell and validated localStorage price/rate persistence.**

## Performance

- **Duration:** ~15 min
- **Completed:** 2026-07-15T13:44:00Z
- **Tasks:** 2/2
- **Files modified:** 2 (1 created, 1 deleted)

## Accomplishments
- Ported the entire cost engine (DEFAULTS, 17 VARIANTS, SHARED_BOM, costOf/renderMatrix/bomHtml, sort/filter/DKK↔EUR converter wiring) verbatim into the new tool file, all existing DOM ids preserved
- Reskinned the page off its private `:root` token block onto `assets/style.css` shared design tokens; kept only the genuinely tool-specific status colours (`--ok`/`--warn`/`--blue`) as local declarations
- Wrapped the tool in standard chrome (tool-nav, tool-header, background blobs) and a two-part shell locking the D-04 anchors: `#theory` (Part 01 placeholder), `#matrix` (Part 02 interactive engine), `#diagram` (reserved for the 06-06 live SVG)
- Added `loadPersisted()`/`persist()` with try/catch-wrapped localStorage access under the `sae-prices`/`sae-rate` keys, validating restored values with `Number.isFinite` guards before touching live state (T-06-01 mitigation)
- Extended the Reset handler to clear both storage keys, restoring the full escape-hatch-to-DEFAULTS behaviour (D-06)
- Deleted `prototypes/System-Architecture/index.html`; the three decision records (`ARCHITECTURE.md`, `PUMP-CONTROL-CONCEPTS.md`, `SOLUTION-MATRIX.md`) remain in place

## Task Commits

1. **Task 1: Create the promoted, reskinned two-part tool file with the engine ported verbatim** - `c2c7fcc` (feat)
2. **Task 2: Add localStorage price/rate persistence (D-06) and delete the old page** - `ef67c49` (feat)

## Files Created/Modified
- `tools/system-architecture-explorer/index.html` - New tool: ported cost engine, reskinned on shared design tokens, two-part theory/interactive shell, localStorage price/rate persistence
- `prototypes/System-Architecture/index.html` - Deleted (engine moved to tools/); the three `.md` decision records untouched

## Decisions Made
- Renamed the ported `<table id="matrix">` to `id="matrixTable"` to free `id="matrix"` for the Part-02 container required by D-04's anchor lock — the original table id had no JS/CSS dependents, so this is behavior-neutral
- Chose "← All tools" for the nav-bar back-link (thesis-timeline precedent — the newest English-only tool), matching the plan's must_haves wording, over the older "← Resources" phrasing used by earlier i18n-era tools
- `prototypes/System-Architecture/` was untracked in git before this plan started (confirmed via initial `git status`), so its `index.html` deletion needed no `git rm` — only a filesystem delete; the three `.md` files remain untracked and were left untouched per the "stage only plan-scoped files" instruction

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Reset check for `--acc`/`--card`/etc. token leakage in a doc comment**
- **Found during:** Task 1 verification (acceptance-criteria grep)
- **Issue:** The reskin-mapping documentation comment in the inline `<style>` block literally spelled out the old token names (`--card`, `--line`, `--txt`, `--mut`, `--acc`, `--red`), which tripped the plan's own verification grep (`grep -Ec -- '--(card|line|txt|mut|acc|red)\b'` expected 0) even though no CSS rule actually redefined them
- **Fix:** Rewrote the comment to describe the mapping by reference to 06-PATTERNS.md instead of spelling out the literal old token names
- **Files modified:** tools/system-architecture-explorer/index.html
- **Verification:** Re-ran the grep check — returns 0
- **Committed in:** c2c7fcc (Task 1 commit)

**2. [Rule 1 - Bug] `#rate` input field not synced after localStorage restore**
- **Found during:** Task 2 (persistence wiring)
- **Issue:** `loadPersisted()` correctly restores the in-memory `rate` variable from `sae-rate`, but the `#rate` `<input>` element still displayed its hardcoded `value="0.134"` until the user typed into it — the converter and component-table DKK columns would use the restored rate while the visible rate field disagreed
- **Fix:** Set `document.getElementById('rate').value = rate;` immediately after `loadPersisted()` in the init sequence, before the first render
- **Files modified:** tools/system-architecture-explorer/index.html
- **Verification:** Manual code trace; JS syntax re-validated with `node --check`
- **Committed in:** ef67c49 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 - bugs directly introduced by this plan's own changes, caught before commit)
**Impact on plan:** Both fixes are correctness-only, scoped entirely to files_modified. No scope creep.

## Issues Encountered
None beyond the two auto-fixed items above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- The tool file is stable with locked anchors (`#theory`, `#matrix`, `#diagram`) and locked localStorage keys (`sae-prices`, `sae-rate`) that 06-03 (theory prose), 06-05 (data/pin-budget), and 06-06 (live diagram) can build on without touching the foundation
- No SPEC.md, landing-page card, README/ROADMAP rows, or CLAUDE.md folder-tree entry were added in this plan — those are out of scope per `files_modified` and expected in a later plan (per 06-PATTERNS.md's file classification)
- Manual browser verification of the ported UI (price edits, sort/filter, shared-block toggle, BOM row expand, persistence across reload) was not run in this environment (no interactive browser available to the executor); the engine is byte-identical in logic to the source file which was already working, and JS syntax was validated with `node --check`

---
*Phase: 06-system-architecture-explorer-promote-the-electronics-archite*
*Completed: 2026-07-15*

## Self-Check: PASSED

- FOUND: tools/system-architecture-explorer/index.html
- CONFIRMED DELETED: prototypes/System-Architecture/index.html
- FOUND: prototypes/System-Architecture/ARCHITECTURE.md
- FOUND commit: c2c7fcc
- FOUND commit: ef67c49
