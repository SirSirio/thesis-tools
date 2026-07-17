---
phase: 07-thesis-showcase-landing-page
plan: 03
subsystem: ui
tags: [svg, i18n, intersection-observer, video-autoplay, hand-built-svg]

# Dependency graph
requires:
  - phase: 07-01
    provides: "prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/pump-head-web.mp4 and pump-head-poster.jpg (re-encoded portrait clip + poster)"
  - phase: 07-02
    provides: ".site-header hero structure (.hero-copy/.hero-rotor), buildHeroRotor(), reveal/--rd stagger idiom, LANG dict/applyLang() pattern"
provides:
  - "Four narrative sections (problem, device, proof, journey) between the hero and .resources-sections, in D-13 order, with no numbered eyebrows (D-17)"
  - "buildModuleSchema() -- new, simplified, non-interactive six-module SVG graphic (D-16), reusing the System Architecture Explorer's exact #4a90d9/#3ec06b flow colours without porting its code"
  - "Portrait pump-head <video> (540x960) wired to the SAME existing IntersectionObserver instance for autoplay-on-scroll, branching on target identity rather than adding a second observer (D-11, overriding RESEARCH's own recommendation)"
  - "14 new EN/IT LANG key pairs (narrative-* + module-*), full parity, Sirio-approved-as-drafted"
affects: [07-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Single-IntersectionObserver branching by target identity: one observer instance serves two different semantics (one-shot reveal-and-unobserve vs. repeated play/pause-never-unobserve) by checking `en.target === pumpVideo` inside the same callback, rather than instantiating a second observer"
    - "Deferred applyLang() invocation: JS-built SVG text carrying data-i18n attributes is only correctly localized if the initial applyLang(currentLang) call happens AFTER the SVG is injected into the DOM -- the call was moved to run after both buildHeroRotor() and buildModuleSchema() inject their markup"
    - "Reduced-motion video affordance via JS attribute, not CSS: window.matchMedia('(prefers-reduced-motion: reduce)') gates both the autoplay call in the observer callback and a one-time setAttribute('controls', '') at init, since CSS alone cannot add HTML attributes"

key-files:
  created: []
  modified:
    - index.html

key-decisions:
  - "D-11's RESEARCH recommendation (a second IntersectionObserver instance for the video) was explicitly rejected per the plan's locked decision -- the existing observer's callback was extended with a target-identity branch instead, keeping exactly one `new IntersectionObserver` in the file (asserted programmatically)"
  - "Six module labels (module-storage/pump/nozzle/alignment/ui/software-electronics) kept identical between LANG.en and LANG.it -- matches the System Architecture Explorer's own untranslated technical vocabulary rather than forcing an artificial Italian gloss on proper hardware-module names"
  - "Module graphic content limited to names + connectivity only (no per-module hardware payload, no pin/cost/BOM data, no hover/click) -- the accompanying device-section prose carries the explanatory detail instead of the graphic"
  - "Two own-authored comments that would have tripped the 'no buildSchema()/no NEMA17|MPR121|LM75' automated verify (via literal-substring false positives in code comments referencing what NOT to port) were reworded during self-verification, not silently left failing"
  - "Checkpoint outcome: approved as drafted by Sirio, zero copy edits -- every LANG key ships exactly as executor-drafted"

patterns-established:
  - "Purpose-built simplified diagrams for landing-page narrative beats should reuse an existing tool's established colour/visual vocabulary (exact hex values) without porting its code, when a full tool already exists one hop away via a linked-out 'see the full X' affordance"

requirements-completed: ["LANG-05"]

# Metrics
duration: 13min
completed: 2026-07-17
---

# Phase 7 Plan 3: Narrative Sections -- Problem, Device, Proof, Journey Summary

**Four eyebrow-less narrative sections (problem -> device -> proof -> journey) inserted between the hero and the tool sections, carrying a new hand-built six-module SVG graphic and an autoplaying portrait pump-head video wired into the site's single existing IntersectionObserver -- approved as drafted, zero copy edits.**

## Performance

- **Duration:** ~13 min of active execution (Task 1 commit 14:09:50 -> Task 2 commit 14:12:43), plus a checkpoint pause awaiting Sirio's review
- **Started:** 2026-07-17T14:00Z (immediately following 07-02's completion)
- **Completed:** 2026-07-17 (checkpoint approved same session)
- **Tasks:** 2 automated tasks + 1 checkpoint (approved as drafted, no rework)
- **Files modified:** 1 (`index.html`)

## Accomplishments
- Inserted four narrative `<section>` elements in D-13's mandated order (problem, device, proof, journey) between `.site-header` and `.resources-sections`, each carrying `.narrative-title`/`.narrative-body` markup deliberately distinct from `.section-head`/`.section-index` so no numbered eyebrow leaks into the story (D-17)
- Established 4 new layout families for taste-skill's variety rule: centred prose (problem), split copy+media (device), centred heading + centred media (proof), and a CTA panel (journey) -- on top of the existing hero/card-grid/wide-row families
- Drafted all narrative prose from `PROJECT.md`, `prototypes/REQUIREMENTS-CRITERIA.md`, and `prototypes/PROTOTYPES.md` per D-19 -- fresh copy, not lifted from the written thesis, in Sirio's em-dash-forward voice
- Added 14 new EN/IT `LANG` key pairs (57 keys total, up from 43), full parity verified programmatically
- Built `buildModuleSchema()`: a new, purpose-built six-module SVG (Storage, Pump, Nozzle, Alignment, UI, Software & Electronics) with a solid blue (`#4a90d9`) liquid-flow path and a dashed green (`#3ec06b`) data-flow fan-out, reusing the System Architecture Explorer's exact established colour vocabulary without porting its `buildSchema()`-equivalent code, payload chips, or interactivity
- Wired the re-encoded portrait (540x960) pump-head clip into the proof section, styled by `max-height`, never a 16:9 `aspect-ratio` rule
- Extended the site's single existing `IntersectionObserver` (not a second instance) to branch on target identity: the video gets guarded `.play()`/`.pause()` on every enter/exit and is never unobserved, while reveal targets keep their original one-shot behaviour; `prefers-reduced-motion` suppresses autoplay and exposes native `controls` instead

## Task Commits

Each task was committed atomically:

1. **Task 1: Draft the four narrative sections and their EN/IT copy** - `54d5b15` (feat)
2. **Task 2: Build the six-module graphic and wire the portrait video to the existing observer** - `538f0a1` (feat)
3. **Task 3: Sirio reviews and edits the narrative draft** - checkpoint, **approved as drafted** -- see Decisions Made

**Plan metadata:** (this commit)

## Files Created/Modified
- `index.html` - Four narrative `<section>`s (problem/device/proof/journey) with drafted EN/IT prose; `buildModuleSchema()` six-module SVG function + `#module-schema` mount point + legend; `<video id="pump-head-video">` wired into the proof section; single `IntersectionObserver` extended with a target-identity branch for video play/pause; `applyLang(currentLang)` invocation moved to run after both SVG builders inject their markup; new narrative/module CSS (no changes to `assets/style.css`)

## Decisions Made
- **Checkpoint outcome: approved as drafted.** Sirio's exact reply: *"approved as drafted. No copy edits -- every LANG key stands exactly as you drafted it."* All 14 narrative/module `LANG` key pairs ship unchanged from the executor's Task 1 draft; no EN or IT string was rewritten.
- RESEARCH explicitly recommended a second `IntersectionObserver` for the video's play/pause behaviour, arguing the reveal observer's one-shot `unobserve()` is incompatible with repeated triggering. Per the plan's locked D-11 instruction, that recommendation was rejected: the existing observer's callback was extended with a `target === pumpVideo` branch instead, keeping exactly one `new IntersectionObserver` in the file (verified programmatically, since RESEARCH argued the opposite).
- Module graphic labels (Storage/Pump/Nozzle/Alignment/UI/Software & Electronics) were kept identical between `LANG.en` and `LANG.it` rather than translated, matching the linked System Architecture Explorer's own English-only technical vocabulary for the same six names.
- `applyLang(currentLang)` was moved from immediately after the `LANG`/`applyLang` definitions to run after `buildHeroRotor()` and `buildModuleSchema()` both inject their SVG markup, so the module graphic's `data-i18n`-carrying `<text>` labels render in the correct language on first paint for a visitor whose stored `lang` preference is Italian (otherwise they would silently show English until the next manual language toggle).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Own code comments tripped the automated D-16 no-port / no-payload-chip verify via literal substring match**
- **Found during:** Task 2, first verify run
- **Issue:** A code comment explaining what NOT to port from the System Architecture Explorer literally contained the substrings `buildSchema()` and `NEMA17, MPR121, LM75` as prose -- exactly the strings the plan's own automated `<verify>` block scans for (correctly) to catch an actual port. The comment's intent (explaining the deliberate non-port) collided with the letter of the check.
- **Fix:** Reworded both comments to describe the excluded content/function without using the literal forbidden substrings (e.g. "System Architecture Explorer's schema-drawing function" instead of naming `buildSchema()`; "per-module hardware-payload chips" instead of listing the specific component names).
- **Files modified:** `index.html`
- **Verification:** Re-ran the full Task 2 automated `<verify>` block; all assertions passed, including `'buildSchema' not in s` and the `NEMA17|MPR121|LM75` regex.
- **Committed in:** `538f0a1` (part of the Task 2 commit -- caught and fixed before commit, not a follow-up fix)

---

**Total deviations:** 1 auto-fixed (Rule 1 -- both instances were self-caught during the executor's own pre-commit verification pass, not discovered later)
**Impact on plan:** No scope creep; the fix only reworded explanatory comments, no functional or content change.

## Issues Encountered
None beyond the self-caught comment wording above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- `index.html`'s narrative region (`.narrative-sections`, four `<section class="narrative ...">` blocks, `buildModuleSchema()`, `#module-schema`, `#pump-head-video`) is stable and Sirio-approved; plan 07-04 can proceed to whatever remains of the D-14 resource-section grid collapse without needing to revisit this plan's sections
- `assets/style.css` remains byte-identical across all of Phase 7 so far
- EN/IT parity holds at 57 keys each; no i18n regression (LANG-01..05)
- **Context note, out of this plan's scope:** after this plan's checkpoint, Sirio separately requested a rework of the 07-02 hero motif (vessel realism, tube path, GSAP-driven sync) and approved amending D-01/D-03 to permit the locally-vendored `assets/gsap/gsap.min.js` on the landing page. That rework was not actioned by this plan or this executor -- it is tracked as a separate follow-up outside 07-03's scope.

---
*Phase: 07-thesis-showcase-landing-page*
*Completed: 2026-07-17*
