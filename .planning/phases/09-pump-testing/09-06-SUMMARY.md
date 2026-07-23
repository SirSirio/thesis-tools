---
phase: 09-pump-testing
plan: 06
subsystem: docs
tags: [static-html, iso-23783-2, iso-8655, katex, dispensing-accuracy, prototype-protocol, two-layer-design]

# Dependency graph
requires:
  - phase: 09-pump-testing (plan 03)
    provides: "Top layer of tools/pump-testing/index.html fully complete (Sections 1-9); Section 10 (#prototype-protocol-slot) scaffolded as an empty stub with cross-links already pointing into it from #balance-requirements, #replicates, #alternate-methods"
provides:
  - "Section 10 (#prototype-protocol-slot) fully authored as a visually-distinct Layer-2 block: the actual proto-02 v2.3 test protocol and reasoned justification for every deviation from the top-layer market-grade ideal"
  - "New .layer2-* CSS family (violet accent, deliberately distinct from .theory-card's orange) so Layer 2 is visually unmistakable at a glance"
  - "New .scope-grid/.scope-col CSS family for the Can-claim/Cannot-claim honest-scope block"
  - "New .rationale-details CSS (details/summary, no form fields) for the condensed design-rationale expandable"
  - "tools/pump-testing/index.html is now COMPLETE end-to-end (Sections 1-10) — both layers of the two-layer protocol are authored"
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - ".layer2-stack / .layer2-banner / .layer2-card — visually-distinct violet-accent card family marking Layer 2 (actual prototype protocol) as structurally different from Layer 1's orange .theory-card, so a reader can tell which layer they're in without reading prose"
    - ".scope-grid / .scope-col.can / .scope-col.cannot — two-column honest-scope block (green-bordered Can-claim, red-bordered Cannot-claim) reusing the site's existing green/red verdict-badge color tokens"
    - ".rationale-details — details/summary expandable pattern (custom ▸/▾ marker via ::before, no <input>) for the condensed design-rationale, keeping the block collapsed by default without adding a live calculator"

key-files:
  created: []
  modified:
    - tools/pump-testing/index.html

key-decisions:
  - "Layer 2's visual identity uses a violet accent (#c3aef5/#9b7fe0) instead of reusing the top layer's orange or Section 9's neutral .map-card scheme — a third, deliberately distinct color family so Layer 1 vs Layer 2 is legible purely from card color, independent of the section-9 vs section-1-7 depth distinction already established by 09-03"
  - "The deviation table's six rows and their top-layer cross-links are transcribed directly from TEST-PROTOCOL.md §7 (the user-supplied primary source) rather than re-derived, per D-04's superseded note that this document is now the bottom layer's primary source"
  - "The Can/Cannot honest-scope block reuses the existing green (#7fd858) and red (#e07a7a) tokens from the top layer's .verdict-yes/.verdict-no badges (09-03) rather than introducing new colors, keeping the pass/fail visual vocabulary consistent across both layers"
  - "The condensed design-rationale (§3-5 volumes/speed/replicates reasoning) is collapsed by default inside a <details> element rather than always-open prose, since it is supporting detail for readers who want the 'why' behind the run-sheet shape, not required reading for the main deviation-table argument"

requirements-completed: [D-01, D-02, D-04]

# Metrics
duration: 20min
completed: 2026-07-23
---

# Phase 9 Plan 6: Pump Testing Protocol — Actual Prototype Protocol & Justified Deviations (Section 10) Summary

**Authored the bottom Layer-2 block of the pump-testing protocol page: proto-02 v2.3's actual test method (two-axis accuracy/precision model, 0.1 mg-balance workarounds), the ISO-requirement/prototype-reality/justification deviation table cross-linked to the top layer, the pipette head-to-head thesis claim, and an honest can/cannot-claim scope — completing `tools/pump-testing/index.html` end to end.**

## Performance

- **Duration:** ~20 min
- **Completed:** 2026-07-23
- **Tasks:** 3/3 completed
- **Files modified:** 1 (`tools/pump-testing/index.html`)

## Accomplishments

- **Task 1 — Layer-2 opening (two-axis model + balance constraint):** Converted `#prototype-protocol-slot` from an empty stub into a visually-distinct Layer-2 block (new violet-accent `.layer2-*` CSS family). Opened with a bridge paragraph naming the measured baseline (v2.3: 2.95 µL/stroke at 180 rpm, −41%, with no missed motor steps confirmed by the E7 revolution-count check — so the deficit is volumetric, not step-loss). Authored the two-axis accuracy/precision model as a table + KaTeX `CV = SD/mean`, concluding precision is the fundamental figure of merit since accuracy is calibratable (a step-count multiplier) and precision is not. Authored the 0.1 mg-balance binding constraint with the Table-3-vs-our-balance compliance comparison (cross-linked to `#balance-requirements`) and the three workarounds: mean-from-slope, per-stroke CV via √N (root-N scaling, KaTeX), and same-instrument pipette comparison (KaTeX variance-split formula).
- **Task 2 — Deviation table + condensed rationale:** Authored the centerpiece three-column deviation table ("ISO 23783-2 requires | We do | Justification") with the six real rows from TEST-PROTOCOL.md §7, each requirement cell cross-linked to the top-layer section it departs from (`#balance-requirements`, `#method-gravimetric` ×3, `#mass-to-volume`, `#replicates`). Added a condensed, collapsible (`<details>`) design-rationale covering why these three stroke-count volumes, why the refill-limitation speed sweep, and why replicates fight randomness not resolution.
- **Task 3 — Pipette head-to-head + honest scope:** Authored the pipette head-to-head as the Layer-2 thesis point: CV(pump) ≤ CV(manual pipette) at 5 µL means the device is more consistent than the human it replaces on the one metric that cannot be faked, valid because both are weighed interleaved on the same coarse balance (systematic error cancels), guarded by the 50 µL floor-separability check, and benchmarked against the ISO 8655 pipette CV band (1.5–3% at 5 µL, cross-linked to `#trueness-precision`). Closed with an honest two-column Can-claim/Cannot-claim scope block (new `.scope-grid`/`.scope-col` CSS, reusing the existing green/red verdict tokens) stating plainly that CV ≤ 5% cannot be certified at n=10 (±25% uncertainty; needs the Stage-2 n≈30 deep-dive), that only this single build is characterised, that single-dose precision is inferred (not directly measured) via √N, and that conditions are water-only/ideal — plus a note on the Stage-1-screen/Stage-2-lock two-stage strategy.
- `tools/pump-testing/index.html` (Sections 1–10) is now fully authored end to end across both stacked layers.

## Task Commits

Each task was committed atomically:

1. **Task 1: Open the Layer-2 block — framing, two-axis model, 0.1 mg-balance constraint + workarounds** - `c535512` (feat)
2. **Task 2: The deviation table + condensed design rationale** - `930225c` (feat)
3. **Task 3: The pipette head-to-head + honest can/cannot-claim scope** - `655ec3e` (feat)

_No TDD tasks in this plan — all three are `type="auto"` documentation-authoring tasks._

_Note: a mid-Task-1 fix (see Deviations below) is folded into the Task 1 commit since it was caught and corrected before that commit was made._

## Files Created/Modified

- `tools/pump-testing/index.html` — Section 10 (`#prototype-protocol-slot`) fully authored as a visually-distinct Layer-2 block (violet-accent `.layer2-*` card family); three new CSS families added to the existing inline `<style>` block (`.layer2-*`, `.scope-grid`/`.scope-col`, `.rationale-details`); Sections 1–9 (09-01/09-02/09-03) untouched.

## Decisions Made

- Layer 2 uses a distinct violet accent color family rather than reusing Layer 1's orange `.theory-card` or Section 9's neutral `.map-card`, so the two-layer structure the user asked to preserve literally is visually legible without reading any prose.
- The deviation table's six rows and cross-links are transcribed directly from the user-supplied `TEST-PROTOCOL.md` §7 rather than re-derived from other sources, honoring D-04's superseded note that this document is now the primary source for the bottom layer.
- The Can/Cannot honest-scope block reuses the existing green/red verdict-badge color tokens from 09-03's `.verdict-yes`/`.verdict-no` rather than introducing new colors.
- The condensed design-rationale is collapsed by default inside a `<details>` element (supporting detail, not required reading for the main deviation-table argument).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed false-positive `<input>` self-check caused by a CSS comment**
- **Found during:** Task 1 (verification step, after writing the `.rationale-details` CSS)
- **Issue:** The plan's automated verification for every task in this plan asserts `! grep -qi "<input"` (document-first, no calculator constraint). The CSS comment I wrote for the `.rationale-details` rule literally contained the substring `<input>` (documenting that no `<input>` fields are used), which made the negative grep check fail even though no actual `<input>` element exists anywhere in the page.
- **Fix:** Reworded the CSS comment to describe the constraint without using the literal `<input>` substring ("document-first, no form fields" instead of "no `<input>`").
- **Files modified:** `tools/pump-testing/index.html`
- **Verification:** Re-ran Task 1's automated verify command; passed clean.
- **Committed in:** `c535512` (Task 1 commit — caught before the task's commit was made, so no separate fix commit was needed)

---

**Total deviations:** 1 auto-fixed (1 bug, self-inflicted verification false-positive, no functional impact)
**Impact on plan:** Cosmetic only — a comment wording fix caught by the plan's own verification step before the commit landed. No scope creep, no behavior change.

## Issues Encountered

None beyond the deviation above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `tools/pump-testing/index.html` is complete end to end: the top layer (Sections 1–9, market-grade protocol) from 09-01/09-02/09-03, and the bottom Layer-2 block (Section 10, actual prototype protocol + justified deviations) from this plan.
- The two-layer structure the user asked to preserve literally is both content-complete and visually distinct (orange `.theory-card` top layer vs violet `.layer2-card` bottom layer).
- No `<input>` elements exist anywhere in the file — the document-first, no-calculator constraint (D-01, D-02) holds across all ten authored sections.
- `assets/style.css` remains byte-unchanged; all new CSS lives in the tool's own inline `<style>` block, per project convention.
- This was the last plan of Phase 9 (wave 4, depends only on 09-03) — Phase 9 is now ready for its closing integration steps (SPEC.md, landing card, README/ROADMAP rows, CLAUDE.md folder-structure update) if not already done in an earlier plan.

---
*Phase: 09-pump-testing*
*Completed: 2026-07-23*

## Self-Check: PASSED

Verified `tools/pump-testing/index.html` exists and contains all three new CSS families (`.layer2-card`, `.scope-grid`, `.rationale-details`). All three task commit hashes (`c535512`, `930225c`, `655ec3e`) verified present in `git log --oneline --all`. Tag balance checked: 10 `<section>`/`</section>` pairs, 97/97 `<div>`/`</div>` pairs, 1/1 `<details>`/`</details>` pair, 20 `$$` KaTeX delimiters (10 balanced display-math blocks) — no structural HTML corruption introduced. `assets/style.css` confirmed byte-unchanged (`git diff --stat` against pre-plan HEAD shows no changes to that file). No `<input>` elements anywhere in the final file.
