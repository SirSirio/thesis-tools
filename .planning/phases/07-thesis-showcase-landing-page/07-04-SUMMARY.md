---
phase: 07-thesis-showcase-landing-page
plan: 04
subsystem: ui
tags: [i18n, static-site, resource-grid, invariant-checker, gsap]

# Dependency graph
requires:
  - phase: 07-02
    provides: "GSAP-driven hero motif (assets/gsap/gsap.min.js, buildHeroRotor()/initHeroMotion()), amended D-01/D-03 permitting local GSAP"
  - phase: 07-03
    provides: "Four narrative sections (problem/device/proof/journey), buildModuleSchema(), portrait pump-head video wired into the existing IntersectionObserver"
provides:
  - "Three resource sections (Tools/5 cards, Roadmap, Presentations) replacing the prior five, eyebrows renumbered 01/02/03 with no gaps"
  - "Prototypes resource section deleted entirely -- its destination lives only in the 07-03 narrative journey beat"
  - "Standalone stdlib-only invariant checker at .planning/phases/07-thesis-showcase-landing-page/check-landing.py asserting every phase-wide D-0x/LANG-0x invariant against index.html"
  - "CLAUDE.md folder structure and design-system sections document assets/fonts/geist/, assets/gsap/gsap.min.js, and the new proto-02 video/poster files"
  - "README.md Tech section corrected to no longer claim zero external dependencies now that GSAP core is vendored"
  - "Sirio's phase-closing sign-off on the live page, including explicit approval of the vendored GSAP exception"
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Phase-wide invariant checker as a planning-workspace-only Python script (stdlib only, lives under .planning/, never shipped, never referenced from index.html or assets/) -- same authoring-time-tool distinction that already covers ffmpeg (D-10) and taste-skill (D-02)"
    - "Deliberate asymmetric grid placement for an odd card count (5): the richest-scoped card spans two grid tracks (.tool-card--feature) instead of padding to 6 or accepting a 3+2 orphan row"

key-files:
  created:
    - .planning/phases/07-thesis-showcase-landing-page/check-landing.py
  modified:
    - index.html
    - CLAUDE.md
    - README.md

key-decisions:
  - "Tasks 1-3 (resource-section collapse, checker script, CLAUDE.md doc pass) were found already fully executed and committed at the start of this session (9d4f885, bfe5236, 6fe1905) from a prior session of this same plan -- re-verified against the checker and the D-07/D-15 diff-quiet assertions rather than redone"
  - "Two additional hero-motif fix commits (ac5056f, df136cd) were found layered on top of Task 3, addressing rotor-spin/flow-direction decoupling, Eppendorf lid angle, and liquid-slug pocket seating -- these read as a live review round predating this session, but no approval or SUMMARY.md existed anywhere in the repo, so this executor did not treat them as implicit sign-off and re-presented the Task 4 checkpoint for explicit confirmation"
  - "Sirio approved the live page and explicitly confirmed the vendored GSAP amendment (D-01/D-03) is justified and should be kept"
  - "README.md's 'no external dependencies' claim (line 36) was corrected post-approval per Sirio's own catch: still no frameworks/build tools/CDN/install, but the landing page now vendors GSAP core locally for the hero motif -- line 5's separate 'no installation, no build step, no internet required' claim was left untouched since it remains true"

patterns-established:
  - "When a continuation executor finds prior-session commits already satisfying a plan's tasks, re-verify against the plan's own automated checks before treating them as complete -- do not silently trust git history without re-running the checker"

requirements-completed: ["LANG-01", "LANG-02", "LANG-03", "LANG-04", "LANG-05"]

# Metrics
duration: ~15min (this session: verification + checkpoint + README fix + close-out; Tasks 1-3 and the intervening hero-fix round were executed in a prior session)
completed: 2026-07-17
---

# Phase 7 Plan 4: Resource-Section Collapse, Invariant Checker, and Phase Sign-off Summary

**Five resource sections collapsed to three (Tools/5 cards, Roadmap, Presentations) with eyebrows renumbered 01/02/03, a stdlib-only invariant checker asserting every phase-wide decision against index.html, CLAUDE.md documenting the vendored Geist font and GSAP exception, and Sirio's explicit phase-closing approval including sign-off on the GSAP amendment -- closed out with a README correction fixing a now-false "no external dependencies" claim.**

## Performance

- **Duration:** ~15 min this session (re-verification, checkpoint presentation, README fix, close-out). Tasks 1-3 and an intervening hero-motif fix round were completed in a prior session of this same plan.
- **Started:** 2026-07-17 (continuation session)
- **Completed:** 2026-07-17
- **Tasks:** 3 automated tasks (found pre-completed, re-verified) + 1 checkpoint (approved by Sirio, with one follow-up correction)
- **Files modified:** 3 (`index.html`, `CLAUDE.md`, `README.md`)

## Accomplishments
- Verified (did not redo) the resource-section collapse: five sections merged into three -- Tools (rotor-solver, occlusion, tensioned, system-architecture-explorer as a spanning `.tool-card--feature`, gsd-workflow-guide), Roadmap, Presentations -- eyebrows read exactly `01`/`02`/`03` with no gaps, Prototypes section deleted entirely (D-15)
- Verified the stdlib-only checker at `.planning/phases/07-thesis-showcase-landing-page/check-landing.py` exists and passes all 13 assertion groups: eyebrow/section-count math, all 8 destinations present, per-section Tools card count (5 scoped / 7 total), EN/IT key parity (50/50), localStorage try/catch + fallback guards, no CDN references (gsap confirmed local-only), no rejected animation techniques, exactly one `IntersectionObserver`, D-16 module-schema no-port guard, video wiring, Geist font + LICENSE.txt on disk, `19.7` geometry present, single reduced-motion block
- Verified CLAUDE.md documents `assets/fonts/geist/`, `assets/gsap/gsap.min.js`, and the new `pump-head-web.mp4`/`pump-head-poster.jpg` proto-02 files, and records Geist as headline-only/system-ui-body and GSAP as a scoped D-01/D-03 landing-page-only exception
- Presented the Task 4 checkpoint (finished page, all 8 destinations, EN/IT parity, no-horizontal-scroll, reduced-motion, `file://` load, other-page blob suppression check) -- **Sirio replied "approved"** and separately confirmed the vendored GSAP is justified and should be kept
- Corrected README.md's `## Tech` section: `assets/gsap/gsap.min.js` made "No external dependencies" literally false; reworded to keep "no frameworks, no build tools, no CDN, no install" while noting the landing page vendors GSAP core locally -- length and tone kept close to the original per Sirio's instruction

## Task Commits

Tasks 1-3 were committed in a prior session of this plan:

1. **Task 1: Collapse five resource sections into three and renumber the eyebrows** - `9d4f885` (feat)
2. **Task 2: Write the invariant checker script** - `bfe5236` (docs)
3. **Task 3: Apply Sirio's copy edits and refresh README.md and CLAUDE.md** - `6fe1905` (docs) -- no copy edits existed to apply (07-02's checkpoint feedback was mechanical/visual; 07-03 was approved as drafted); README.md was left unmodified at the time since no staleness was found under Task 3's own scope

Between Task 3 and this session's checkpoint round (also prior session, addressing live feedback on the hero motif -- not part of this plan's own tasks but landed on the same file before sign-off):

- `ac5056f` (fix, 07-02): decouple rotor-spin direction from liquid-flow direction (`ROTOR_SIGN`/`FLOW_SIGN`), raise Eppendorf lid angle to 135°
- `df136cd` (fix, 07-02): re-seat liquid slugs in the inter-roller pocket rather than on the pinch point

This session:

4. **Task 4: Sirio signs off the finished page** - checkpoint, **approved**, with the vendored GSAP exception explicitly confirmed as justified
5. **README correction (Sirio-directed, post-approval):** fix the now-false "no external dependencies" claim - `10824d8` (docs)

**Plan metadata:** (this commit)

## Files Created/Modified
- `index.html` - No changes this session (Tasks 1-3 already landed in the prior session; re-verified only)
- `.planning/phases/07-thesis-showcase-landing-page/check-landing.py` - No changes this session (already existed; re-run to confirm no regression)
- `CLAUDE.md` - No changes this session (already updated in the prior session's Task 3 commit)
- `README.md` - `## Tech` section's "No external dependencies" claim corrected to acknowledge the locally-vendored GSAP core, keeping "no frameworks, no build tools, no CDN, no install" intact; line 5's separate "no installation, no build step, no internet required" claim left untouched (still true)

## Decisions Made
- Re-verified rather than re-executed Tasks 1-3 after finding them already committed from a prior session -- ran the plan's own checker and diff-quiet assertions (`assets/style.css`, `prototypes/index.html`) rather than trusting git history alone
- Did not self-approve or infer approval from the two intervening hero-fix commits (`ac5056f`, `df136cd`) despite their `fix(07-02)` framing implying a completed live-review round -- re-presented the full Task 4 checkpoint and waited for an explicit reply, per the no-self-approval constraint
- README.md's tool table and general framing were confirmed not stale (no tool added/removed, no "directory of tools" language) -- only the one factually incorrect dependency sentence was touched, at Sirio's own direction after his approval

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug, raised by Sirio at the Task 4 checkpoint] README.md's "no external dependencies" claim was factually false**
- **Found during:** Task 4 checkpoint response (Sirio's own review, not executor-discovered)
- **Issue:** README.md line 36 read "No frameworks, no build tools, no external dependencies" -- but `assets/gsap/gsap.min.js`, vendored in the 07-02 rework and explicitly kept per Sirio's D-01/D-03 amendment, is a third-party dependency. Task 3's own verification had confirmed README needed no change, which was correct under Task 3's original scope (no "tool directory" language, table unchanged) but missed this specific sentence, which only became false once GSAP was vendored in a later (07-02 rework) commit that postdated Task 3's own review pass.
- **Fix:** Reworded the sentence to "No frameworks, no build tools, no CDN, no install. The landing page vendors GSAP core locally to drive its hero motif." -- keeps the same length/tone, corrects only the false claim, leaves line 5's separate "no installation, no build step, no internet required" claim untouched since it remains true.
- **Files modified:** `README.md`
- **Verification:** `python .planning/phases/07-thesis-showcase-landing-page/check-landing.py` re-run post-fix -- all 13 groups still pass (README isn't part of the checker's scope, but re-running confirms the fix didn't touch index.html or regress anything else)
- **Committed in:** `10824d8`

---

**Total deviations:** 1 auto-fixed (Rule 1, raised via the checkpoint's human reviewer rather than executor-discovered)
**Impact on plan:** Necessary correctness fix to a documentation claim; no scope creep beyond the one sentence Sirio identified.

## Issues Encountered
None beyond the README correction above, which was resolved immediately per Sirio's explicit instruction.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 7 (thesis-showcase-landing-page) is complete: hero motif (07-02), narrative sections (07-03), and resource-grid collapse + phase-wide invariant sign-off (07-04) all approved by Sirio
- `assets/style.css` remains byte-identical across the entire phase (D-07)
- `prototypes/index.html` untouched -- only its landing-page card placement changed (D-15)
- EN/IT parity holds at 50 keys each; no i18n regression (LANG-01..05)
- `.planning/phases/07-thesis-showcase-landing-page/check-landing.py` is available for any future phase that touches `index.html` again, to re-assert this phase's invariants before merging further changes
- The vendored GSAP core (`assets/gsap/gsap.min.js`) is now a confirmed, Sirio-approved, scoped exception (landing-page hero motif only) to D-01/D-03's original "no vendored animation runtime" rule -- future phases should not extend its use elsewhere without a fresh decision

---
*Phase: 07-thesis-showcase-landing-page*
*Completed: 2026-07-17*
