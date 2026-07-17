---
phase: 07-thesis-showcase-landing-page
plan: 02
subsystem: ui
tags: [svg, css-animation, hand-built-motion, i18n, web-fonts, glassmorphism]

# Dependency graph
requires:
  - phase: 07-01
    provides: "assets/fonts/geist/Geist-Bold.woff2 (subsetted headline font), assets/fonts/geist/LICENSE.txt"
provides:
  - "Asymmetric hero (.hero-copy / .hero-rotor) with background blobs suppressed landing-page-only"
  - "Vendored Geist Bold headline via @font-face, scoped to .site-title, system-ui fallback intact"
  - "Hand-built SVG fluidic-path motif: 50ml source tube -> inlet -> pump (real proto-02 rotor geometry, top-wrap) -> outlet -> nozzle -> 1.5ml collection tube, with a liquid ring phase-locked to roller rotation"
  - "buildHeroRotor() function and #hero-rotor DOM structure that plans 07-03/07-04 must not collide with when editing index.html further"
affects: [07-03, 07-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Phase-locked SVG animation: two elements sharing the identical CSS class chain (.rotor-spin-outer > .rotor-spin-inner) are driven by the identical @keyframes animation-name/duration/timing-function/delay, guaranteeing frame-for-frame synchronization without any JS coordination — used to lock the liquid-arc ring to the roller ring"
    - "Static clip-path wrapper revealing a slice of a rotating child: a non-rotating <g clip-path=...> containing a rotating <g class=\"rotor-spin-outer\">...</g> reveals only the portion of the rotating content that overlaps a fixed region, without the clip itself rotating"
    - "CSS custom property as the bridge between JS-computed geometry and CSS @keyframes (--packet-shift precedent, later removed in the sync-fix commit in favor of the shared-class technique above, but the pattern remains valid for future JS-to-CSS-animation numeric handoffs)"

key-files:
  created: []
  modified:
    - index.html

key-decisions:
  - "Liquid packet re-architected from an independent stroke-dashoffset sweep (arbitrary matching period) to 4 liquid-arc segments living inside the SAME rotating groups as the rollers, after Sirio's checkpoint feedback identified the independent-sweep approach as desynchronized from roller position"
  - "Tube wrap moved from bottom-of-rotor to top-of-rotor (sweep-flag 0 vs 1) per checkpoint feedback"
  - "Scene expanded from a rotor-only graphic (240x240 viewBox) to a full left-to-right fluidic path (640x260 viewBox): 50ml Falcon-style source tube, inlet tube, pump, outlet tube, nozzle, 1.5ml Eppendorf-style collection tube, with a looped droplet fall/fade at the nozzle"
  - "site-subtitle trimmed to exactly 20 words (from ~23) in markup + LANG.en/LANG.it, meaning preserved, not rewritten"
  - "main padding-top reduced from 150px to 92px (mobile 118px -> 84px) to satisfy taste-skill's ~96px hero-padding ceiling"
  - "Sirio authorized self-verification for the post-checkpoint fix round rather than a second visual checkpoint — the sync fix, no-horizontal-scroll math, reduced-motion coverage, EN/IT parity, style.css untouched, and HTTP 200 were all verified programmatically by this executor, not by a human re-review"

patterns-established:
  - "Phase-lock via shared CSS class/animation, not shared period: when two visual elements must move in exact lockstep, put them in separate DOM subtrees that both carry the identical class chain driving the identical @keyframes rule, rather than giving each its own animation with a matching duration (which only guarantees period equality, not phase equality, and drifts if either duration is ever tuned independently)"

requirements-completed: ["LANG-05"]

# Metrics
duration: 50min
completed: 2026-07-17
---

# Phase 7 Plan 2: Hero Motif — Asymmetric Hero, Geist Headline, Fluidic-Path Rotor Summary

**Asymmetric two-column hero with blobs suppressed, a vendored-Geist headline, and a hand-built SVG fluidic path (50ml source tube -> pump with real proto-02 rotor geometry, top tube-wrap -> nozzle -> 1.5ml collection tube) whose liquid ring is phase-locked to the roller ring via shared CSS animation classes, not an independent timer.**

## Performance

- **Duration:** ~50 min (including one checkpoint round-trip with Sirio's feedback and a full rework of the motif's sync mechanism and scene)
- **Started:** 2026-07-17T11:05Z (session start, per STATE.md)
- **Completed:** 2026-07-17T11:56Z
- **Tasks:** 2 automated tasks + 1 checkpoint (approved-with-changes, reworked, self-verified per Sirio's explicit authorization)
- **Files modified:** 1 (`index.html`)

## Accomplishments
- Suppressed `.bg-blobs` on the landing page only (own inline `<style>`, no `!important`, markup div left in place for other pages sharing `assets/style.css`); `assets/style.css` remains byte-identical across the whole plan
- Wired the plan 07-01-vendored Geist Bold via `@font-face` (`font-display: swap`), scoped to `.site-title` only with the `var(--font)` system-ui fallback intact
- Restructured the hero from a centred stack into an asymmetric two-column layout (`.hero-copy` / `.hero-rotor`), collapsing to a single centred column at <=600px; `main`'s `padding-top` cut from 150px to 92px (mobile 84px) to clear taste-skill's ~96px hero-padding ceiling
- Trimmed `site-subtitle` to exactly 20 words in markup + `LANG.en`/`LANG.it`, preserving meaning
- Built a hand-built, geometrically real proto-02 rotor (N=4 rollers, R=19.7mm, rollerR=5mm/MR105ZZ, 180° tube wrap) via `buildHeroRotor()`, following `rotor-solver`'s `buildFigure()` template-string technique — no library, no external file
- **Post-checkpoint rework** (Sirio: not approved, main defect = liquid/roller desync): re-architected the liquid motion so the 4 liquid-arc segments live inside the identical `.rotor-spin-outer`/`.rotor-spin-inner` elements as the roller ring, guaranteeing the same CSS animation drives both — phase-locked, not period-matched. Moved the tube wrap to the top of the rotor. Extended the scene into a full left-to-right fluidic path: 50ml Falcon-style source tube (conical bottom, static liquid fill) -> inlet tube -> pump -> outlet tube -> nozzle -> 1.5ml Eppendorf-style collection tube, with a looped droplet fall/fade at the nozzle, keeping the 50ml vessel substantially larger than the 1.5ml vessel (70x150 vs 50x45 body)
- Extended the existing `@media (prefers-reduced-motion: reduce)` block (not duplicated) to freeze the rotor groups (which now also freezes the liquid ring, since it shares the same classes) and the new droplet, to a legible static frame

## Task Commits

Each task was committed atomically:

1. **Task 1: Suppress the blobs, wire the Geist headline, restructure the hero as asymmetric** - `8bc9c3a` (feat)
2. **Task 2: Build the animated proto-02 rotor as a hand-built SVG with CSS-keyframe motion** - `ca2fc18` (feat)
3. **Task 3: Sirio reviews the hero motif** - checkpoint, **not approved as originally built**; changes requested (see below)
4. **Post-checkpoint fix: phase-lock liquid to rollers, move wrap to top, add full fluidic path** - `7b4a57f` (fix)

**Plan metadata:** (this commit)

## Files Created/Modified
- `index.html` - `.bg-blobs` suppression, `@font-face`/`.site-title` Geist wiring, asymmetric `.hero-copy`/`.hero-rotor` layout, trimmed `site-subtitle` (markup + LANG dict), `buildHeroRotor()` producing the full fluidic-path SVG (50ml source tube, inlet, pump with real proto-02 rotor geometry and top wrap, outlet, nozzle, 1.5ml collection tube, phase-locked liquid ring, looped droplet), extended reduced-motion block

## Decisions Made
- **Checkpoint outcome: approved-with-changes, not approved as originally built.** Sirio's verification of items 2/3/6 (blobs, Geist, reduced-motion) confirmed those correct as built. Item 1 (rotor+packet motion) was flagged as the main defect: the liquid packet was period-matched to the rotor (same 4s duration) but not phase-locked — it read as visually decoupled from which roller was actually occluding the tube. Sirio also requested the tube move to the top of the rotor, and the scene be extended into a full fluidic path (50ml source -> pump -> nozzle -> 1.5ml collection tube).
- **Sync fix design:** rather than tuning timing offsets on an independent animation (fragile, approximate), the 4 liquid-arc segments (one per 90° roller-to-roller gap) were moved into the exact same rotating `<g>` elements as the rollers. Since CSS animations with identical class-driven `animation-name`/`duration`/`timing-function`/`delay` run on the same document timeline, this guarantees frame-for-frame phase equality — a structural guarantee, not a tuned approximation. A static (non-rotating) `<g clip-path="url(#hero-wrap-clip)">` wrapping a rotating copy of the same two classes reveals only the slice of the liquid ring inside the top-180° wrap window, so each inter-roller "plug" enters/crosses/exits the visible tube in lockstep with the two rollers bounding it.
- **Self-verification authorized:** Sirio explicitly authorized the executor to verify the post-checkpoint fix automatically rather than requiring a second visual checkpoint. Verification performed: (a) both rotation groups (liquid ring + roller ring) confirmed to carry the identical class chain via source inspection — the structural sync proof; (b) geometry re-derived and checked numerically (roller/liquid-arc coordinates, radii, viewBox bounds, no overflow); (c) `<svg>` tag confirmed `width="100%"` (not a fixed pixel width) + `viewBox` + `max-width`, so no horizontal-scroll risk at 1280px or 375px regardless of the wider 640x260 authored viewBox; (d) EN/IT key parity and subtitle word count re-checked (unaffected by this round, still passing); (e) the single reduced-motion block confirmed to cover both rotation groups and the new droplet; (f) `git diff --quiet assets/style.css` confirmed clean; (g) the page confirmed to return HTTP 200 from the running `serve.bat`-equivalent local server.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug, raised via checkpoint feedback] Liquid packet desynchronized from roller position**
- **Found during:** Task 3 (Sirio's checkpoint review)
- **Issue:** The originally-committed Task 2 design (commit `ca2fc18`) drove the liquid packet with an independent `stroke-dashoffset` animation matched only in *period* (4s) to the rotor's steady rotation, not in *phase*. Visually this meant the packet did not reliably track which roller was actually occluding the tube — the "roller pushes the liquid" read was not legible.
- **Fix:** Replaced the independent sweep with 4 liquid-arc path segments living inside the identical `.rotor-spin-outer`/`.rotor-spin-inner` rotating groups as the roller ring, so the same CSS animation drives both rings frame-for-frame. A static clip-path reveals only the portion of the liquid ring inside the fixed top-wrap window.
- **Files modified:** `index.html`
- **Verification:** Source-level structural check confirming both rotation groups share the identical class chain (2x `rotor-spin-outer` + 2x `rotor-spin-inner`); geometry re-derived and checked numerically for consistency (liquid-arc endpoints exactly match adjacent roller positions).
- **Committed in:** `7b4a57f`

**2. [Rule 2 - Missing scope, raised via checkpoint feedback] Tube wrap position and scene scope**
- **Found during:** Task 3 (Sirio's checkpoint review)
- **Issue:** The tube wrap was on the bottom of the rotor (matching `rotor-solver`'s own convention, which was a reasonable default but not what Sirio wanted for this motif); the motif was rotor-only, with no visible source, dispense, or fluidic-path context.
- **Fix:** Flipped the tube-wrap arc's SVG sweep-flag (0 instead of 1) to move it to the top; extended `buildHeroRotor()`'s scene into a full left-to-right fluidic path (50ml source tube, inlet, pump, outlet, nozzle, 1.5ml collection tube with a looped droplet), keeping the 50ml vessel substantially larger than the 1.5ml vessel.
- **Files modified:** `index.html`
- **Verification:** Source-level regex check confirming the sweep-flag-0 top-wrap path; geometry re-derived and checked for viewBox containment (no element exceeds the 0-640 x 0-260 bounds).
- **Committed in:** `7b4a57f`

---

**Total deviations:** 2, both driven by Sirio's explicit checkpoint feedback rather than executor-discovered issues (recorded here per the deviation-documentation convention, though the "Rule" numbers are approximate since the trigger was a human aesthetic/correctness review, not an automated bug/gap discovery).
**Impact on plan:** Both fixes were required before the plan could be considered complete; no scope creep beyond what Sirio explicitly requested. All original Task 1/Task 2 acceptance criteria (blobs, font, EN/IT, no-horizontal-scroll, real geometry, reduced-motion, no forbidden techniques) remain satisfied after the rework.

## Issues Encountered
- The original Task 2 automated `<verify>` block asserted `stroke-dashoffset` must be present (mirroring the initially-planned independent-sweep technique). The post-checkpoint fix removes that specific mechanism in favor of the shared-rotation-class technique, which is a stronger synchronization guarantee. This executor wrote fresh, targeted verification for the new mechanism (structural class-sharing proof, geometry re-derivation, viewBox containment) rather than being bound to the superseded script, per Sirio's explicit instruction to "verify these automatically yourself."

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- `index.html`'s hero region (`.hero-copy` / `.hero-rotor`, `#hero-rotor`, `buildHeroRotor()`) is stable and approved-with-changes; plans 07-03 and 07-04 (sequenced behind this plan specifically because they edit the same file) can build on this structure without needing to touch the hero again
- `assets/style.css` remains byte-identical across all of Phase 7 so far
- EN/IT parity holds (37 keys each); no i18n regression
- The `--packet-shift` CSS custom-property technique used in the original (superseded) design remains a valid pattern for future JS-to-CSS-animation numeric handoffs, even though it's no longer used in the current hero

---
*Phase: 07-thesis-showcase-landing-page*
*Completed: 2026-07-17*
