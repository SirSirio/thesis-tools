# Punchlist — final verification pass, 2026-09-20

One continuous walk of the assembled deck at 1280 × 720 in an isolated browser context
(BroadcastChannel stubbed, console and pageerror captured for the whole session):
S01 → S43 → B01 → B23 forward, every step, then B23 → S01 backward, every step.
215 clicker presses each way. One screenshot per slide at its last step in
`screens/final-<cue>.png` (66 files), all inspected.

---

## (a) What was fixed, per file

### `parts/00-head.html`
1. **The small type floor.** `.kicker`, `.card__kicker` and `.sheet__panel-k` went from
   14 px to 18 px and `.tool-card__hint` (the "Open live" chip) from 13 px to 18 px;
   letter spacing came down with each of them (0.24 → 0.16 em, 0.22 → 0.14 em,
   0.18 → 0.12 em) so the labels keep their width. `.cine__kicker` was already 19 px and
   was left alone. P4's local 18 px override of `.kicker` in parts 50 and 60 was left in
   place — it now agrees with the shared rule.
2. **Rail panels, after the kicker grew.** `.sheet__panel` padding 14 → 11 px, gap 7 → 5 px,
   and `.sheet__panel-k` got `line-height: 1`. Nothing shrank; the box gave the room back.
   The six slides that use a rail (S09, S12, S14, S15, S27, S30) all fit again.
3. **Presenter bar wrapping.** `.pres__stat` got `flex: 0 0 auto; white-space: nowrap`.
   "SLIDE 16 / 66" and "STEP 2 / 4" were breaking across two lines and the bar was 110 px
   tall; it is now one line, 67 px, which also gives the notes pane more height.
4. **Presenter notes.** `.pres__notes-body` padding 18 → 14 px, `li` line-height 1.5 → 1.4
   and margin-bottom 10 → 6 px, title margin 14 → 10 px. The text stays at 22 px.
   Four-bullet slides now come within 8 px of fitting at 1280 × 720 and fit outright on a
   larger presenter screen; the pane still scrolls if a slide runs long.

### `parts/99-tail.html`
5. **Sound bleeding into the next slide (real bug).** Leaving a slide while its step tween
   was still running left that tween alive: it kept advancing the old slide's timeline and
   its remaining `.call()` callbacks fired *after* `pauseVideos`. On S30 that restarted the
   unmuted outdoor-run clip, so its audio played over S31 and S32. `onState` now kills the
   outgoing slide's `__tween` and pauses its timeline before pausing its videos. Retested by
   leaving S30 deliberately mid-tween: no stray audio afterwards.
6. **Presenter next-step preview (real bug).** The clone stripped every `id`, including the
   section's, so every `#sNN …` rule — which is how all four builders scoped their CSS —
   stopped matching. The preview showed unpositioned, unfilled content: on S16 a large black
   polygon over the chart and the title overlapping itself. The clone now keeps its ids. It
   sits after the stage in the document, so `getElementById` and `url(#…)` still resolve to
   the live slide, and no part script selects outside its own element.

### `parts/10-opening.html`
7. **S04 journey labels** `#s04 .s04-jlab` 16 → 18 px, letter spacing 0.20 → 0.14 em.
   Measured afterwards: the four labels still have clear gaps, right edge at 870 px.

### `parts/30-part2.html`
8. **S23 GSAP warning.** `tl.to(frs.slice(0, i), …)` was called with an empty array on the
   first frame, which logged *"GSAP target not found"* every time S23 was built. Guarded
   with `if (i)`.
9. **S22 caption collision (real overlap).** The two-line screen captions ran from y 415 to
   463 while the candidate row began at y 460, so the descenders of "power switch." were
   clipped by an opaque card. Caption margin-top 12 → 5 px, line-height 1.25 → 1.22, and the
   candidate row moved 460 → 470 px. Now: image bottom 403, caption 408–455, row 470–680.

### `parts/40-part3.html`
10. **`.p3-k` below the floor.** P3's local kicker clone was 14 px; raised to 18 px with
    letter spacing 0.24 → 0.16 em.
11. **S30 rail overflowed by 41 px.** Four panels could not shrink inside a 372 px rail
    (`min-height: auto`), so the fourth was cut off at the bottom edge. Added
    `#s30 .sheet__panel { min-height: 0; padding-top: 10px; padding-bottom: 10px; }`,
    the same remedy P2 already used for S14 and S15. Rail is now 370 / 370.
12. **S35 mini map behind a grown clip.** A focused clip (`z-index: 60`) covered the left
    half of the mini map, which sat at `z-index: 5` — half a line mark peeking out from
    behind a video. Added `#s35:has(.p3-clip.is-big) ~ .minimap { opacity: 0 }`; the map is
    back the moment Escape returns the mosaic. No z-index was changed anywhere.

### `assets/deck.js`
13. **Overview thumbnails showed alt text.** Slides more than two away have had their lazy
    `src` cleared, so the overview clone rendered the alt sentence as body copy — S02 and S04
    were black tiles with a line of prose at the top. The clone now blanks `alt` on images
    that have no `src`. No images are force-loaded, so pressing `o` still costs nothing.

Nothing else was touched. `index.html` was regenerated with `assemble.py` after every edit
(66 slides, 66 cues, no duplicates, no missing cue).

---

## (b) Visual observations for Sirio — nothing applied

These are judgement calls, not defects. Cue, then the one-line reason.

**Opening**
- **S01** — the frame the cover clip lands on is a tight, blurred crop of the carriers; it
  reads as clutter rather than "the machine dispensing". Consider a later in-point.
- **S01** — the clip is declared `data-sound`, but Chrome refused unmuted autoplay before the
  first gesture in a cold load and fell back to muted. Press a key once before the room
  comes in, or accept a silent cover.
- **S02** — a tall empty band sits between the title and the first bar; the slide feels
  bottom-heavy at its last step.
- **S03** — the pipette photo still carries the thesis figure's A/B/C/D letters with no
  legend on the slide; they read as leftover annotation.
- **S04** — at the last step the three chips are still at three different opacities, so
  "Part I" and "Part II" look half-dead while "Part III" is lit.
- **S04** — the slide draws its own journey line bottom-left *and* a second module map
  bottom-right; two maps at once on the contents slide.

**Part I**
- **S06** — the "what the field needs" row is four empty dashed circles; it reads as
  "unknown" rather than "all four at once".
- **S07** — the "Storage" and "Pump" chips nearly touch and crowd the top-left corner of the
  photo; the rest of the frame is empty.
- **S06 / S07 / S08** — the mini map is visible with no node lit (no `data-accent`, no
  `data-map`). Either `data-map="none"` like S09, or light a node.
- **S09** — the QR sits low-left in a very large paper card; the bottom half and the right
  third of the card are empty.
- **S10** — the bridge ends on a photo dimmed almost to black with no text at all. If you
  pause here the audience sees a grey blur. It is the weakest slide in the deck as it stands.

**Part II**
- **S12** — "0 machine parts touch the liquid": the 0 in the orange pill reads as a logo
  rather than a number.
- **S13** — the two unselected tool cards keep their titles at low opacity over busy
  screenshots; "Occlusion & Displaced Volume" and "Tensioned Tube Path" are hard to read.
- **S13 / S23 / S26 / B14 / B18** — the "OPEN LIVE" chip is noticeably heavier at 18 px and
  lands on the tool poster's own navigation bar. It is legible now, which is what you asked
  for; whether it should be an outline chip instead is your call.
- **S16** — the pump-head clip's visible frame is a wide bench shot with a laptop; nothing in
  it says "pump head".
- **S17** — at the last step the sketch fan is a single dark card half off the left edge and
  the middle of the stage is empty. The composition looks unfinished.
- **S18** — none of the three panel captions (v1 / v2 / v2.1) are visible at the last step,
  so the three builds are unlabelled; the three photos are also white-on-white and flat.
- **S20 / S19** — the CAD renders sit on pure white cards that are much brighter than
  everything around them.
- **S22** — "line" and "tube" are enormous with a lot of air around them; the right half of
  the slide is light compared with the dense left half.
- **S23** — the six device frames along the top are about 150 px wide; their on-screen text
  is unreadable from the room.
- **S24** — the orange registration grid is drawn across all three photographs and reads as
  noise on top of the objects.

**Part III**
- **S27** — the architecture figure is a light paper block set in a serif face; it is the
  only serif on the stage.
- **S28 / S30** — mini map visible with nothing lit, same as S06–S08.
- **S29** — thumbnail, caption and mini map all crowd the bottom-right corner.
- **S33** — the two left cards are dim grey on near-black with four-line bodies; the lowest
  contrast text in the deck.
- **S34** — the connector curves run under other tiles and read as stray hairlines; the
  "excluded" rows are very dim.
- **S31** — the clip beside the accuracy chart is a dark window-and-laptop shot; it does not
  read as a gravimetric measurement.
- **S35** — jumping straight to `#/35/2..4` (or arriving backwards) leaves the four clips
  tiled while the counter says step 4: the grow is done by `.call()`, which GSAP suppresses
  on `seek`. Harmless in a forward walk, worth knowing if you jump by number.

**Discussion and closing**
- **S37** — the four rows are grey on a dimmed photograph that is still quite visible; the
  labels are the hardest thing to read in the last third of the deck.
- **S38 / S39** — the quotation overlay blurs the whole slide behind it into mush; fine as a
  beat, but the slide you just built disappears completely.
- **S40** — card 01 is taller than the other five with its text at the bottom, and a third of
  the stage below the chain is empty.
- **S42** — the first two paragraphs are grey over bright grass and white plastic; only the
  third is white. The scrim under the text block is too weak at the top.

**Backups**
- **B05 / B06 / B07 / B09 / B11** — the embedded tool and terminal screenshots are far below
  reading size from the room; they work as evidence you point at, not as text.
- **B15** — the table shows seven rows and then a "twelve line items" total, so three rows are
  implied but not shown.
- **B17 / B20** — three-line titles push the content down; they still fit but they are the
  only three-liners in the deck.
- All 23 backups share one strong layout (three or four mono numbers left, a figure or a
  table right). It is consistent and it reads; it is also the same slide twenty-three times.

**Chrome**
- The mini map label reads "Part I / Part II / Part III / Backup" at 11 px (`.mm-part`) and
  the HUD counter at about 12 px. Both are below the 18 px floor, but they are chrome, not
  content, so they were left alone.

---

## (c) Console log summary

Attached for the whole session: `console.error`, `console.warn`, `window.onerror`,
`unhandledrejection`.

| Where | What | Status |
|---|---|---|
| S23, every build of the slide | `GSAP target not found` — `frs.slice(0, 0)` on the first frame | fixed in `parts/30-part2.html` |
| everywhere else | nothing | — |

Final build: **zero errors and zero warnings** across the forward walk (215 presses), the
backward walk (215 presses), the presenter view, the guest view, the two-window sync test,
the S13 tool card, the S35 mosaic, blackout, overview and the reduced-motion pass.

No cross-part collision was found: no two part scripts declare the same top-level name, no
timeline reaches into another slide, and no part script uses `document.querySelector` on a
slide (the only `document.` uses are `createElement`, `createElementNS` and two `keydown`
listeners, both guarded — S35 by its own `big` flag, S36 by `Deck.cue === 's36'`).

Infrastructure checks, all passing:
- **Mini map** — lights `rotor` through S10–S16, `rack` on S17–S19 and S22–S23, `nozzle` on
  S20–S21 and S29, `store` on S24, `rotor` on S27 and S31, `rack` on S32–S33 and S35; hidden
  on every divider, on the opening, on S09, S26, S34, S36, the closing and all 23 backups, as
  each slide's `data-map` asks. Label follows `data-part`.
- **Corner nav** — awake on mouse movement, `data-nav-idle` after 3 s of stillness, awake
  again on the next movement.
- **Lazy media across the two-slide unload boundary** — walking backwards through all 66
  slides: no image or video left without a `src`, no broken image, no video playing from a
  slide that is not active.
- **Videos on leave** — after the tween fix, no clip and no audio survives a slide change.
- **HUD counter** — 1/66 through 66/66, matching `Deck.slideNo` at every step.
- **Backward entry** — every slide entered backwards arrives with all its fragments revealed.

---

## (d) The QR codes

**Both decode to `https://sirsirio.github.io/thesis-tools/`.**

`cv2` and `pyzbar` are not installed in the anaconda environment, so the check was done
against the module matrix, which is stronger than a photo decode. The S09 (`#s09-qr`) and
S43 (`#d43-qr`) SVGs were read out of the DOM as 29 × 29 grids from their `<rect>` children
(455 dark modules each); the two matrices are **identical**. The grid was then compared
module by module against references generated with the `qrcode` library over every version-3
combination of error-correction level and mask:

```
EXACT MATCH: 'https://sirsirio.github.io/thesis-tools/'  ECC M, mask 4  (0 modules differ)
```

A byte-for-byte match with a validly generated code is a decode. Both are drawn on a light
card with a full quiet zone (S09 208 px, S43 254 px on the stage), so a phone will read them
from the room. No fix needed.

---

## (e) Timing

- **66 slides**, **150 fragments**, so **216 clicker positions** — 215 presses from the cover
  to the last backup. Verified in both directions.
- Main talk, S01 to S43: 43 slides, 150 fragments, **193 presses**.
- Backups, B01 to B23: 23 slides, no fragments, one press each.
- **Slides with more than five steps: two.** S02 (8) and S23 (7).
- Slides with exactly five: S31, S34, S37, S38, S40.
- Against the 30-minute plan (25 minutes of slides plus the 5-minute demo) the 193 presses
  before the demo average about 7.8 seconds each. S02 alone is eight presses of scripted
  narration; S23 is seven frames of one run.

---

# Revision 1 — after Sirio's first walk, 2026-09-20

Six changes, then a re-verification: a DOM audit at every step of every slide
(S01 → B23) in an isolated browser context (BroadcastChannel stubbed, the page
driven by its URL hash, console and `pageerror` captured for the whole session),
then a keyboard walk forward and backward, 212 presses each way.

---

## (a) "Stage" is never the module

The module is **alignment**, or **the alignment module**, everywhere a person
can read it. The runtime word for the 1280 × 720 canvas (`.deck-stage`,
`?view=stage`, "stage panel" in the presenter view) is not user facing and was
left alone.

| Where | Was | Is |
|---|---|---|
| `parts/30-part2.html` S11 journey strip | `Stage` | `Alignment` |
| `parts/30-part2.html` S11 notes | "pump, stage, needle, screen, vial" | "pump, alignment, needle, screen, vial" |
| `parts/30-part2.html` S18 title | "Three builds made a printed **stage** that finds its own zero." | "Three builds made a printed **alignment module** that finds its own zero." |
| `parts/30-part2.html` S18 alt text ×2 | "The v1 alignment stage…", "The v2.1 stage on the bench…" | "The v1 alignment module…", "The v2.1 alignment module on the bench…" |
| `parts/50-discussion.html` S38 alt text | "The alignment stage on the bench…" | "The alignment module on the bench…" |
| `parts/50-discussion.html` S40 node 04 | `Alignment stage` | `Alignment` |
| `parts/50-discussion.html` S40 notes | "Then the stage, then the electronics…" | "Then the alignment module, then the electronics…" |
| `CONTENT.md` §the red thread, S11, S18, S38, S40 | "stage" | "alignment module" |

The mini map has no per-node text: its nodes are glyphs and its only label is
the part name, so nothing there needed changing. `parts/60-backups.html` B18
keeps "late-stage integration bottlenecks" — that is the project sense of the
word, quoted from the March risk register, not the module.

## (b) S02, the arrivals hall: no text beats

The four read-aloud paragraphs are **gone from the slide**. They now live only
in the speaker notes, as four bullets, so Sirio tells the story and the slide
draws it. The photograph still rises out of black on every entry.

In their place, one wordless drawing over the photograph, on a single clicker
step: a ring marks the traveller at her shoulder, a swab draws beside her, a
droplet falls from its tip into a sample tube, the tube fills, and the tube then
travels a drawn route across the frame to a conical-flask glyph — a central
laboratory — while a clock ring fills and its hand sweeps 331°. A soft veil
(`rgba(8,8,10,0.44)`) fades in under the drawing so the orange line art reads
over a busy photograph, and fades out again when the photo shrinks.

**The slide is now four clicker steps instead of eight**, so the time comparison
arrives fast:

1. the drawn scene;
2. the photo shrinks to its top-right card, the title "A test that takes a day
   comes too late." fades up, the axis draws and the "under 1 h" band grows;
3. the 26 h bar runs off the right edge of the stage;
4. the 2.6 h bar, and "The test can travel to the gate. The sample preparation
   cannot yet."

Two row labels were shortened at the same time: "what an answer at the gate
needs" → "an answer at the gate", and "a portable molecular test, at the point
of care" → "a portable molecular test at the point of care".

The deck is therefore **147 fragments over 66 slides — 213 clicker positions,
212 presses** (was 150 / 216 / 215).

## (c) S04, contents: a real table of contents

The machine photograph, the three leader lines, the three chips, the journey bar
and the second module map are all gone — the punchlist had flagged the last two
as "two maps at once on the contents slide". What is there now is four text
blocks, each a mono part label, a thin accent rule, a short title and one line
of contents:

- **Part I** — Why this machine, and how I worked · the gap · the requirements
  and the modules · working with an AI
- **Part II** — The modules · pump · alignment · nozzle · interface · storage
- **Part III** — The machine · electronics · integration · validation
- **Then** — Live demo / What I learned, what comes next / Closing

One block lights per step, the earlier ones dropping to a single common 34 %
(the punchlist had flagged three chips ending at three different opacities).
Smallest type on the slide is 19 px (the mono part labels); the contents lines
are 21 px. The title is unchanged. The slide is four steps.

## (d) Filler text removed, deck-wide

Every visible string in every part was read out of the assembled document and
judged. Removed or rewritten:

| Slide | Was | Is |
|---|---|---|
| S03 | caption "the same run holds the smallest dose and the largest" | removed — the `200 ×` span and the two drop sizes already say it |
| S05 | "The gap between the instruments that exist, the requirements that follow from it, and the way the work itself was organised." | "The gap, the requirements, the way of working." |
| S07 | kicker "The sentence that governs every decision after it." | removed (Sirio flagged it) |
| S07 | "The pump carries most of the requirements, so everything else adapts to it." | removed — it repeats "The pump decides. Every module below it adapts." standing beside it |
| S09 | "Three of them are opened live in this talk." | removed — it announces what he is about to do |
| S10 | "Everything else in this machine follows from the part that meters the liquid." | removed — an abstract restatement of S07; the bridge now shows the outlined carrier and the kicker "the pump" |
| S13 | tool line "Which roller count is feasible at all." | "Which roller count is feasible." |
| S22 | "one word was doing two jobs, and only a stranger could see it" | "one word was doing two jobs" |
| S22 | "every page measured its own contrast and its smallest button, before the device saw it" | "each page measured its own contrast and its smallest button" |
| S23 | tool line "The real frames, the real navigation. Start a run." | "Start a run." |
| S24 | "Designed and built by Marius Schiller; photographed for this thesis." | "Designed and built by Marius Schiller." |
| S40 | lede "Each stage inherits its geometry from the stage before it" | removed — the title already says "in the order their geometry depends" |
| B12 | "…in a 120-prompt audit — good enough to be dangerous" | "…in a 120-prompt audit" |

Kept on purpose: every title (they are CONTENT.md's), every number with its
unit, the verbatim design problem on S07, the two verbatim quotations on S38 and
S39, the three closing beats on S42, the short concrete labels on the rail
panels and the readouts, and the "Backup" tag on the backup slides.

## (e) S07, the layout bug

When the design statement shrank on step 2 it scaled about its own top edge and
then moved **84 px up**, which put it at y 134 — behind a two-line title whose
block runs to y 186. The move is now **8 px**, so the shrunk statement sits at
y 210 to 347: clear of the title rule above it (186) and clear of the gate cards
below it (376). The module tiles arrive on step 3, after the statement has faded,
and do not reach it.

While the slide was open, the **Storage** tile was found to land on top of the
**Pump** tile at the match cut (a real 10 × 12 px overlap). Storage's landing
point moved from (196, 196) to (140, 174); it still points at the reagent
bottles, and the seven tiles no longer touch.

## (f) Overflow sweep, S01 to B23

The audit, run at every step of every slide, flags four things: text cut by a
clipping ancestor (including SVG roots, which clip by default); text whose box
leaves its nearest positioned ancestor; two text boxes that overlap; anything
outside 1280 × 720. Elements at an effective opacity below 0.08, and elements
that `elementFromPoint` shows are covered by something painted above them, are
not counted — otherwise the deliberate overhanging callouts, the quotation
overlays on S38 and S39, and every element under an opaque panel report as hits.

Hits found, and what was done:

| Where | What | Fix |
|---|---|---|
| S13, steps 2–3 | **real**: on the two narrow cards the two-line tool name sat on top of the two-line caption, 322 × 17 px of overlap. The same shape was waiting on S23, S26, B14 and B18. | `.tool-card` in `parts/00-head.html` is now a bottom-anchored flex column with 20 px padding, and `.tool-card__name` / `.tool-card__line` are in flow instead of pinned to fixed offsets from the bottom. Any number of lines now stacks instead of colliding. |
| S13, steps 1–3 | the design-point ladder's SVG clipped its own labels: "19.70 mm" by 6 px, the five `ladder__k` labels by 2 px each | `#s13 .ladder { overflow: visible }` |
| S14, step 2 | "flow signal, µL per minute" clipped 3 px by its chart SVG | `.sheet__draw { overflow: visible }` — the same guard for every dialect-A chart |
| S33, all steps | **real**: the two narrow failure cards clipped the descenders of their last line ("beside the tube.", "once.") by 2 px | `.p3-fcard-media` 236 → 212 px, which gives the card foot the 24 px it needed; the photographs crop slightly more and nothing else moved |
| S07, step 4 | **real**: Storage on Pump, 10 × 12 px | see (e) |
| S02, steps 3–4 | the slide clips 376 px horizontally | by design — the 26 h bar is 1560 px wide and is meant to leave the frame. No text is cut: the "26 h" value ends at x 1146 and the chevrons at x 1270. |
| S12, S14, S15, S22 | callouts and captions hang outside the photo frame they are anchored to | by design; none of them is clipped, none overlaps another label, none leaves the 1280 × 720 box |

After the fixes the audit is **clean at every one of the 213 clicker positions**:
no cut text, no overlapping text, nothing outside the box.

## (g) Verification

- **Forward walk**, `ArrowRight` from S01/0 to B23: **212 presses**, ending on
  slide 66 step 0. **Zero console errors, zero warnings.**
- **Backward walk**, `ArrowLeft` back to S01/0: **212 presses**, ending on slide
  1 step 0. **Zero console errors, zero warnings.**
- `console.error`, `console.warn`, `window.onerror` and `unhandledrejection`
  were hooked before any page script ran, for the whole session; the Playwright
  console channel was read afterwards and reports 0 errors and 0 warnings.
- `assemble.py` after every edit: 66 slides, 66 cues, no duplicate, no missing
  cue.
- `screens/final-<cue>.png` re-taken and inspected for all 24 touched slides:
  s02, s03, s04, s05, s07, s09, s10, s11, s12, s13, s14, s15, s18, s22, s23,
  s24, s26, s27, s30, s33, s40, b12, b14, b18.

## (h) Still open, unchanged

Everything in section (b) of the original punchlist that Revision 1 did not
touch still stands — in particular the "OPEN LIVE" chip landing on a tool
poster's own navigation bar, the low-contrast bodies on S33's two left cards,
S35's `.call()`-driven grow being suppressed when the slide is entered by number,
and the mini map and HUD labels sitting below the 18 px floor as chrome.

---

# Revision 2, presenter preview — 2026-09-20

## What was wrong

The presenter panel's "next" frame was a static clone of the target slide with
`data-fragment-revealed` ticked on. Almost every slide is driven by a GSAP
timeline registered through `Deck.slide(cue, builder)`, and neither that builder
nor the slide's `Deck.enter` hook was ever run on the clone, so the panel showed
the slide at rest, or at step 0, instead of the state the projector will be in
after the next press. It was right only on slides whose steps are plain CSS
fragment reveals. The next-slide case was wrong in the other direction: it
revealed *every* fragment of the next slide instead of showing it at step 0.

## What it does now (`parts/99-tail.html`, section 6b)

1. **Target**: this slide at step n+1 while fragments are left, otherwise the
   next slide at step 0, and "End of deck" past the last slide. The caption is
   unchanged ("Next: step k of n on this slide" / "Next slide N — title").
2. **Source**: a pristine snapshot of every slide, cloned once in `init()` after
   `wireToolCards()` and before the first builder runs. The live slide is not
   usable as the source: S28 and S35 read inline `left/top/width/height` as their
   home geometry and the live values are mid-animation.
3. **Render**: ids kept (the parts' CSS is `#sNN`-scoped), fragments revealed up
   to the target step, notes and iframes dropped, tool cards un-grown, and every
   `<video>` stripped of `src`/`data-src` so it paints its poster and asks the
   network for nothing — the element itself stays, so `… video` CSS rules keep
   matching, which the old poster-`<img>` swap broke on `.p3-clip`, `#s16`,
   `#s21` and `#s30`. `clone.dataset.preview = '1'` is set before anything runs.
   The clone is inserted **before** the builder runs, so DrawSVG and anything
   that measures sees a laid-out element.
4. **Build**: inside `gsap.context(fn, clone)` — `builder(clone, gsap)`, then
   `tl.seek('step' + k, false)` (nearest lower label, then the timeline end),
   then the `Deck.enter` hook. `settlePreview()` finishes and kills whatever is
   left running; `killPreview()` reverts the previous context on the next render.
5. **Line height**: the clone lives under `.pres`, which inherits the body's
   `1.6`, while the stage sets `normal`. It is pinned to the stage's value, or
   text relayouts by a few pixels (S38's column headers were 29 px instead of 21).

## Three GSAP traps this had to survive

- **Lazy paint.** GSAP queues a fresh tween's first paint for the next tick, and
  `kill()` cancels a queued paint. `totalProgress(1)` followed straight by
  `kill()` left S02's title and photo plate frozen at their from-state. One
  `gsap.ticker.tick()` between the two flushes the queue.
- **Playhead, not render.** Fast-forwarding with `render(totalDuration, …)`
  instead of `totalProgress(1)` does not move the playhead, so the next tick
  pulled the tween straight back to its start. Only `totalProgress(1)` sticks.
- **Stagger children.** `tl.getChildren(true, true, true)` does not hand back the
  tweens a stagger wraps in its own sub-timeline. Excluding the timeline's
  children by that list let S31 finish its step-3 tweens, so the preview showed
  channel 1 and channel 2 a press early. The containment test now walks the
  `parent` chain. Anything already at `totalProgress() >= 1` is also left alone,
  which is what keeps a builder's opening `gsap.set()` calls from being replayed
  over the seeked state.

## Builders that needed a guard

Three, all in `parts/40-part3.html`, one line each:

| Cue | What it started | Guard |
|---|---|---|
| S27, `Deck.enter` | a 10⁶-second GSAP tween driving `st.paint` — the six pulse trains' clock | `if (el.dataset.preview) { st.last = st.clock.t; st.paint(); return; }` — one paint, no clock |
| S35, `Deck.slide` | a capture-phase `document` keydown listener (Escape un-grows a clip) | wrapped in `if (!el.dataset.preview)` |
| S36, `Deck.slide` | a `document` keydown listener (`v` toggles the video fallback) | wrapped in `if (!el.dataset.preview)` |

Swept for the rest: no `gsap.ticker.add`, no `setInterval`, no
`requestAnimationFrame` and no other `document.addEventListener` anywhere in
`parts/10`…`parts/60`.

## Verification

Isolated Playwright context, BroadcastChannel stubbed, driven through
`Deck.goToState`. Each pair is the presenter preview one press early against the
live stage at the target, both captured at 1280 × 720, in
`screens/preview-<cue>-<step>.png` and `…-live.png`.

| Pair | % of pixels differing by more than 48/255 | Verdict |
|---|---|---|
| S02 1→2 | 0.09 | match |
| S07 1→2 | 0.00 | match |
| S07 3→4 | 0.00 | pixel-identical, wash included |
| S13 2→3 | 0.24 | match |
| S15 2→3 | 0.16 | match |
| S19 2→3 | 0.19 | match |
| S27 1→2 | 0.53 | match; the pulse dashes sit at a different phase |
| S31 1→2 | 2.91 | match; the bench clip plays live and the preview holds its poster |
| S35 0→1 | 15.31 | match; four clips play live, the preview holds four posters |
| S38 3→4 | 0.45 | match |
| S24 → S25 | 0.00 | match |
| B01 → B02 | 0.14 | match |

Two differences are inherent and stay: the preview frame has a flat `#060608`
backing where the stage shows the moving background wash through the slide
(this is the whole of the 1–13/255 mean difference on every pair), and a video
shows its poster in the panel while the stage is playing it.

- **Forward walk** S01 → S43 in the presenter view, 189 presses: **zero console
  errors, zero warnings**; "End of deck" at slide 66.
- **Live stage untouched**: a MutationObserver on the live S25 element records
  **zero** mutations while its preview is built (the one mutation seen earlier is
  the infrastructure's own one-slide media lookahead, which fires on entry, not
  on the preview).
- **Nothing keeps ticking**: after each render, zero animations in
  `gsap.globalTimeline` target a node inside the clone; 20 repeated renders of
  the same state leave the global animation count at 13 → 13; after the full
  walk exactly **one** long-running animation exists, the live S27 clock.
- **Cost**: 7–51 ms for the whole `deck:state` handler, preview included, on
  every one of the twelve states — against the 150 ms budget.

---

# Revision 3 — Part II, the pump opening (S11, S12, S12b, S13) — 2026-09-21

Sirio's notes on the second walk, applied to `parts/30-part2.html` only. Nothing
outside S11–S13 was touched; S14 onward and S24 are unchanged.

## (a) S11 — the divider shows the four real modules

> *"it should show the actual modules… using the right terminology. It is imperative
> that the terminology stays coherent. pump - alignment - nozzle - UI. Vial? what is
> that? not a module. Screen? Needle? I think you can just have 4, the ones I have
> actually worked on."*

The strip had five stops labelled Pump · Alignment · **Needle** · **Screen** ·
**Vial**. Three of those name a part, not a module, and the reagent storage is not
one of Sirio's modules at all — it is Marius Schiller's contribution, already
credited on S24.

- Four stops now, evenly spaced across the 1088-wide strip at x = 104, 397, 691, 984:
  **Pump · Alignment · Nozzle · User Interface**, the four thesis chapter names.
- Four new glyphs, same line weight and the same `.jrn-g` / `.jrn-t` classes so the
  colour-in still works: a four-roller rotor inside its curved track with the tube
  tails dropping; the loaded rack on its rail; the needle carrier with a droplet
  leaving the centre needle; the screen with a touch target and its stand.
- The drop now travels four stops; the final fade moved from `1.05 + 4 * 0.44 + 0.5`
  to `1.05 + 3 * 0.44 + 0.5`.
- Subtitle was *"Five stops, in the order the liquid meets them."* — wrong on the
  count, and the user interface is not in the liquid path. Now: *"The four modules I
  designed and built, in the order the thesis takes them."*
- Speaker notes rewritten; the third bullet now says where the storage module comes
  from.

## (b) S12 split in two, mechanisms first

> *"The part about the different mechanism should come before the comparison among
> the 2. Please make them 2 separate slides."*

S12 was doing two jobs on one sheet. It is now two consecutive slides.

- **S12** (same `id` and `data-cue`) is the three principles alone, on a new
  composition called `plate`: `assets/figs/fig-pump-principles.png` on a warm paper
  plate **1100 px wide** against the 748 px it had before, with the three wetted
  boundaries drawing **one per clicker step** so Sirio can talk through them, and a
  caption under each panel carrying the existing "machine wetted / machine wetted /
  tube only" chips. No rail and no numbers: the figure is the argument.
- **S12b** (new, `id="s12b"`, `data-cue="s12b"`, immediately after S12) is the
  screening and the head-to-head: the chip field, the rail and the readouts. Its
  three steps are now thirty → **seven** → five, two and the finalists, so the
  readout (30, 7, 3485) always agrees with what is on the sheet. In the old single
  slide the field thinned all the way to two while the rail still said seven.
- The chip-field builder moved into the S12b timeline and now **reuses** any filler
  chips already in the field, so the presenter's preview clone cannot end up with a
  second set of thirty. All ids renamed `s12-*` → `s12b-*`.

## (c) S12b — the rotary glyph is a rotor again

> *"the one on the left, rotary peristaltic, still looks weird. The rotors are not
> spanning across the 360° properly."*

The four rollers sat at (58,69), (81,43), (119,43), (142,69) — inside a 140° arc
across the top only, so it read as a fan. Redrawn about a hub at (100, 62) with the
four rollers on a 34-unit pitch circle at genuine 90° spacing (3, 12, 9 and 6
o'clock), the track and tube wrapping the upper 180° and both tube tails dropping to
the bottom of the glyph, as in panel c) of the figure. `#s12b-rotor` now spins about
`svgOrigin: '100 62'`, its true hub.
The linear pinch glyph was checked in the same pass: its two check valves overlapped
the rail, so the tube moved to y = 78, the valves onto the tube line as proper
bow-tie symbols, and the rail down to y = 104 clear of both.

## (d) S13 — the design point rebuilt

> *"There is a line on the bottom with some values. Only keep 0.51 mm, 4 and 5 µL,
> the rest are obsolete and just crowding things… is just a weird way to show those
> numbers, please change it so it would make more sense."*

The rising five-node ladder is gone. The tube wall (0.91 mm) and the pitch radius
(19.70 mm) are dropped, and the climbing diagonal with them: three unrelated
quantities in three different units on a rising line encoded a trend that does not
exist.

In its place, the chain the numbers actually form — two boxes under the kicker
**geometry** (`0.51 mm` tube bore, `4` rollers) bracketed together and arrowed into
one accented box under the kicker **dose** (`5 µL` per stroke). Mono tabular
numerals, the pump accent, the deck's own surfaces, nothing below 18 px, no fourth
number. It uses the slide's existing three steps: the chain builds on step 1 while
it has the stage to itself, slides down 168 px on step 2 as the three tool cards
rise, and dims to 50 % while the solver is highlighted on step 3. Notes rewritten;
they recited all five values.

## (e) Verification

`python assemble.py` — 75 slides, no warnings, `s12` and `s12b` both present, no
duplicate cues. Walked in a headless Chrome over CDP at 1280 × 720 (the shared
Playwright browser was held by another session all afternoon): S11 and every clicker
position of S12, S12b and S13, **forward and backward**, 25 states.

- **Overflow**: an audit at every state compares every visible descendant's rect
  against the slide's own box — zero hits.
- **Type**: every rendered text node at stage scale ≥ 18 px — zero hits.
- **Console**: clean across all 25 states, and clean again in `?view=presenter`.
- **Presenter view**: S12 and S12b both render, and the next-step preview builds
  without throwing, both for a step change and for the slide change S12 → S12b.
- Two things the automated audit could not see and the screenshots did:
  the S12 captions originally ran to y ≈ 700 and met the section rail bottom right,
  so the plate and the captions were lifted (plate 1120 px at y 196, captions at
  y 590); and the S13 value and its key touched at 30 px mono, so the given boxes
  went from 270 to 300 wide and the bracket and dose box moved right with them.

## (f) Not changed, on purpose

- `parts/99-tail.html` and `parts/00-head.html`: swept for anything keyed to the old
  five-stop strip or to a fixed slide count. Nothing is. The section rail's five pips
  are the five **sections of the talk** (`PART_SECTION`, driven by `data-part`), not
  the modules; the slide numbers, the progress total and the talk count are all
  measured from the DOM at load, so adding S12b needs no edit there. `data-map` on
  S24 is untouched.
- The dialect map in `CONTENT.md` section L still uses the pre-renumber draft ids and
  was left alone rather than half-corrected.

---

## (g) S14 — the flow chart grounded on zero, the bench photo, the tilted box, and a figure that stopped inventing data

Sirio's notes on S14, all four applied to `parts/30-part2.html`. Same review round
as (a)–(f) above; S11–S13 and S16 onward were not touched.

### (g1) the chart now stands on zero

> *"You should actually ground that graph to 0, the 0 should be to the horizontal x
> axis, and so it will be much clearer that there is values that are below zero…
> and instead of 'zero flow' you can just put the 0."*

`#s14-f2`'s chart was 700 × 300 with the x-axis a bare floor at y = 276 and a
dashed "zero flow" line floating 83 px above it: everything below zero read as
positive-but-low. The chart is now 400 × 300 (it shares the step with the bench
photograph) and **zero is the x-axis**. The plate labelled *zero flow* is gone; a
plain `0` sits on the axis at the left, as asked.

The same recorded values are drawn — the old path was remapped about the new zero,
not redrawn — so nothing was invented. What the rescaling reveals is already
published: the ± 1 SD band (mean **1104**, SD **1159** µL/min) has its lower edge at
**− 55 µL/min** and crosses the axis, and **12 of the 78 drawn samples** fall below
it, which is the thesis's *apparent reverse flow on one sample in seven*. Those
twelve now carry a dot, the region below zero carries a faint red wash, and the
label reads *one sample in seven, below zero*. **No number is put on the depth of
the excursions** — the thesis states the frequency and the sign changes and never
the magnitude (verification pack §C.2, H-20).

### (g2) the bench setup, with the sensor pointed at

> *"I think you should add the image in gray and white from my thesis, where the
> actual setup for that setting is shown, else it is too confusing alone."*

`assets/stills/proto01-bench.jpg`, the thesis figure `fig:proto01-bench`, now sits
to the left of the chart at 330 × 251. The frame shows the window x 270–980,
y 160–700 of the 1280 × 721 original — the run of the fluid path, without the
ceiling and the empty bench — by oversizing the image inside an `overflow:hidden`
frame; the overlay `viewBox` is stated in the same image coordinates, so the ring
drawn at (636, 368) lands on the sensor body itself and not near it. A leader runs
from a `the inline flow sensor` chip down to the ring, and the caption under the
frame orients the rest: *reservoir at left, vessel at right*. The ring position was
read off the image file and then confirmed on the rendered screenshot, not guessed.

### (g3) the balance box sits on the reading

> *"the rectangle of the number on the scale is not really aligned, you should tilt
> it a bit."*

`#s14-box` was an axis-aligned rectangle over a display photographed at an angle.
The four corners of `0.6943` were measured on `assets/media/pump/gravimetric.jpg`
(1080 × 1385) against a plotted coordinate grid, and the path is now the
quadrilateral `M 262 1046 L 540 1012 L 540 1118 L 262 1154 Z` — a 7° tilt matching
the display bezel, tight on the digits and clear of the `g`. Confirmed on a zoom of
the rendered screenshot.

### (g4) three bars that were never three measurements

> *"what the fuck are those values showing 3.39 all equal? like did I take these
> measurements? what is the purpose of putting them there like that…"*

He is right, and the old figure made a claim the thesis contradicts. **3.39 µL is
one derived per-stroke figure** — the mean 678 µL of a commanded 1000, divided by
the stroke count — and **the three individual weighings are published nowhere in the
thesis** (exhaustive search across every chapter and appendix; verification pack
§C.4, H-1). Their CV is **4.5 %**, i.e. σ ≈ ± 30 µL on the mean, so three identical
bars asserted a spread of zero that the thesis's own CV disproves.

`#s14-f4` is now one measured value against its nominal: a single bar at **3.39**
against a dashed **5.00 µL nominal**, the volume that never arrived shaded between
them, and a **± 4.5 % whisker** on the bar top — so the picture makes the argument
the step exists to make, that the gap is systematic (1.61 µL) and the scatter is not
(± 0.15 µL). Beside it, where the number came from: *read on the balance* —
**678 µL** — *of a commanded 1000 µL* — *three weighings, CV 4.5 %*. The header is
the thesis's own phrase, *a repeatable systematic shortfall*.

Readouts followed. `#s14-ro3` was *µL weighed, three times*, which read as three
weighings of 678.0; it is now *µL, mean of three weighings*. `#s14-ro4` counted to
**32** *per cent short, every time* — deck arithmetic on 1 − 3.39/5.00 that appears
nowhere in the thesis, and *every time* re-asserted the zero spread (H-13). It now
counts the published **4.5**, *per cent CV, three weighings*. Speaker notes rewritten
to match, with the 6.7 Hz roller-passage frequency and the 11.5 % underestimate
added for questions.

## (h) S15 — the printer step rebalanced, and no more circles on the photographs

> *"on 'The printer', you should make significantly smaller the image with the print
> bed of the printer, and remove the orange circle on that. And please do not add
> orange circles in those images. You should have it bigger the one showing the
> actual models, they should be very big and visible."*

- The slicer plate of calibration rings drops from **340 px to 128 px**. It shows
  only that rings were printed, so it is context and now reads as context.
- `fig-print-compensation.png` goes from **404 px to 596 px** — the full height the
  engineering sheet allows — and dominates the step.
- Every overlay on both images is deleted: `#f3-ring`, `#f3-dim`, `#f3-dah` on the
  print bed and `#f3-outer`, `#f3-bore` on the rule figure. The two `.p2-ov` SVGs
  went with them, and the step-3 timeline no longer references any of those ids.
- Step 3 is re-timed for the new composition: with nothing to draw on the images,
  the rule figure **wipes in one panel at a time** (`clip-path`), the external rule
  first and then the internal one, which is the order the rail line states them in.
  The ± 0.10 mm readout counts under the second wipe.
- The alt text said *"Four calibration rings of different diameters."* The coupon is
  **five bodies in three sizes, the middle size printed in triplicate** (App-C
  `tab:ring-artifact`; H-8, confirmed against the image itself). Rewritten, and the
  compensation figure's alt text now carries both rules and their numbers.
- Checked against verification pack §E before enlarging: the figure's
  `Model = 1.0065 × target − 0.07` and `Model = target + 0.14` are
  `eq:cal-ext-inverse` and `eq:cal-int-inverse` verbatim, and Ø28 / Ø88 / Ø22 / Ø82
  are the ring nominals. **One thing worth knowing rather than editing:** the
  *0.18 mm lost* and *0.57 mm lost* labels are the **scaling term alone**
  (0.65 % of 28 and of 88); the fitted forward rule also carries a + 0.068 mm
  intercept, so the full predicted loss is 0.11 and 0.50 mm. The figure is
  self-consistent and matches Ch. 3's plain-language "≈ 0.65 %", so it was left
  exactly as the thesis prints it. Do not quote *0.18 mm* as a measured deviation
  — `tab:ring-artifact` measured − 0.11 mm on that feature.
- Steps 1, 2 and 4 are untouched: those overlays are dimension callouts on CAD
  figures, which is not what the objection was about.

## (i) Verification of (g) and (h)

`python assemble.py` — **75 slides**, unchanged from Revision 3, no warnings, no
duplicate cues. Walked in a private headless Chrome over CDP at 1280 × 720 (the
shared Playwright browser was still held by another session): **every clicker
position of S14 and S15, forward and backward, 20 states**, six seconds of settle
each because `tweenTo` plays a step at real speed and a 1.9 s wait had been
catching the last label mid-fade.

- **Overflow**: every visible descendant's rect compared against the slide's own box
  at every state — clean, with one known and intended exception: the bench
  photograph's `<img>` is deliberately oversized inside an `overflow:hidden` frame,
  so its element rect extends past the slide while nothing is painted outside it.
- **Type**: every rendered text node ≥ 18 px at stage scale at every state — zero
  hits.
- **Console**: clean across all 20 states, and clean again in `?view=presenter`.
- **Presenter view**: S14 and S15 render, the notes panel rebuilds, and the
  next-step preview builds without throwing for both a step change and a slide
  change.
- Two things the screenshots caught that the automated audit could not: the
  *one sample in seven, below zero* label was being captured mid-fade (a timing
  artefact of the harness, fixed by waiting longer, not a deck bug), and the
  `5.00 µL nominal` label on the new S14 figure sat on its own dashed line, so it
  was lifted 6 px and the `CV 4.5 %` label moved out of the shortfall shading to sit
  beside its whisker.

## (j) Known limit, not fixed — the compensation figure's own type

`fig-print-compensation.png` is 2400 × 1535 and its internal labels
(Ø28, *0.18 mm lost*, the two `Model = …` boxes) are about 2.2 % of the figure's
height. At 596 px wide — the ceiling inside the engineering sheet, whose figure area
is 764 × 384 — they land at roughly **8–9 px at stage scale**, below the deck's 18 px
floor for live text. Enlarging cannot fix this: a full-stage plate in the S12 manner
would be at most 860 × 550 and still only reach ≈ 12 px. **The two numbers that
matter are on screen as live 18 px type in the rail** — *"Outer sizes shrink 0.65 %,
inner bores lose a fixed 0.14 mm"* — and the figure carries the geometry. If Sirio
wants the figure's own annotations readable from the back of the room, the fix is to
redraw the figure with larger type in the thesis source, not to resize it here.
Worth deciding before the defense.

### (k) Cross-session note for whoever owns `parts/10-opening.html` — 2026-09-21

Part II's divider now names exactly **four** modules — Pump · Alignment · Nozzle ·
User Interface — the four Sirio designed and built, and the four thesis chapter
titles (ch. 6–9). Reagent storage on `s24` is Marius Schiller's contribution and is
no longer counted as a module; the slide itself stays in Part II with its credit.

Two strings in the opening part still say five and were left alone because that
file is owned by another session:

- `parts/10-opening.html`, the contents slide, speaker note: *"Part II: the five
  modules, in the order the liquid meets them."* Both halves are now wrong — the
  count, and the claim about the liquid's order (the user interface is not in the
  fluid path, and the vial comes first, not last). See finding H-5 in
  `research/part2-verification-2026-09-21.md`.
- `CONTENT-IT.md` line 60 carries the same sentence in Italian.

The contents slide's visible subtitle, *"pump · alignment · nozzle · interface ·
storage"*, is defensible as an outline of what Part II covers, and its module names
are already correct. Only the count and the "order the liquid meets them" claim
need changing.

**Standing rule:** the four module names above are canonical and must match the
thesis. Do not substitute a component for a module — not "stage" for alignment,
"needle" for nozzle, or "screen"/"display" for the user interface.

### (l) Two follow-ups Sirio should judge — 2026-09-21

- **S15, the print-bed thumbnail.** Shrunk from 340 px to 128 px as asked, and its
  orange overlay is gone. At that size it reads as a grey smudge and carries no
  information. Either accept it as a token of "rings were printed", bump it to
  ~180 px so the rings are visible, or drop it and give the whole step to the
  compensation figure.
- **S15, the compensation figure's own type.** Enlarged from 404 px to 596 px, the
  ceiling inside the engineering sheet. Its internal labels are ~2.2 % of the
  figure height, so they land at roughly 8–9 px at stage scale — under the deck's
  18 px floor. No resize fixes that; the figure would have to be redrawn with
  larger type in the thesis source. The two numbers that matter are on screen as
  live 18 px type in the rail.


### (m) Navigation keys and the frame's own space — 2026-09-21

Two things Sirio asked for after a walk-through. Both are in `parts/99-tail.html`
only: the CSS in its `<style data-part="tail">` block and the behaviour in the
infrastructure script. `00-head.html` and `assets/deck.js` / `assets/deck.css` were
not touched — the head is owned by another session, and the two shared runtime
files also serve `decks/lab-meeting-2026-06/`.

**What he asked.** *"Can you please add new commands for navigating the slides? A
and D to move between slides instead of animation (A left, D right), like in video
games."* And: *"the overview page, the header with 'Presentations' and isntrument,
they end up on top of the other content, and that happens for the slides as well.
Please fix it, so they have their allocated space. When a slide is clicked, that is
basically presenter mode, and no other buttons should be present in the screen, just
maybe a back arrow on the top left, that's it (of course not while in full screen
mode, as it is now). When the overview of the slide is shown, the header should have
it's own space."*

**A and D jump whole slides** (tail script, section 5b). The arrows keep walking
clicker steps; `d` lands on the next slide at step 0 and `a` on the previous one at
step 0, both through `Deck.goToState(n, 0)` rather than synthesised arrow presses,
so the fragments are skipped entirely. Uppercase works, because he will hit them
mid-talk with a hand on shift. Consistent with the arrows at the talk/appendix
boundary: the deck is one flat sequence, so `d` off the last talk slide (`s43`)
lands on `s12`, exactly where the right arrow already goes. The first slide's `a`
and the last slide's `d` do nothing. Guards: any of ctrl, alt or meta hands the key
back to the browser; a grown tool card owns the keyboard (the same
`body[data-demo-active]` test `deck.js` uses); and a focused `input`, `textarea`,
`select` or contenteditable keeps its letters, checked on both the event target and
`document.activeElement`, because this deck has live tool pages in iframes and an
"a" typed into the rotor solver must not move the talk. Bound in the stage and
presenter views; the guest view is untouched, since a guest follows its host. The
presenter key hint now reads `← → step · a d slide · r timer · b black · f full ·
o overview`, and `SPEC.md` section 3 carries the same rules.

**The frame stops sitting on the content** (tail CSS, plus section 5c of the script).
The deck nav is one absolutely positioned bar at `top: 20px; left: 20px` holding
“← Presentations” and the Instruments trigger, and it had no space of its own. Two
answers now:

- *While a slide is shown.* The Instruments trigger and `#instr-panel` are
  `display: none` — a talk is not a website. What is left is one 32 px glass circle
  with a drawn arrow at the window's top left, a real link to `decks/index.html`
  named “Back to presentations” (`aria-label` and `title` set in the script; the
  link keeps its own text, hidden with `font-size: 0`). It keeps the existing idle
  behaviour, so a fullscreen run still shows nothing: the nav fades at 3 s of
  stillness and returns on a mouse move, verified both ways.
- *While the overview is open.* The nav becomes a fixed 64 px glass strip across the
  top, with the same 80 px gutter as the overview, the Instruments link still on it,
  and it does not fade while he is browsing. The overview reserves the height with
  `padding-top: 88px`, so its `OVERVIEW` pill and title start at y = 88 and the
  first band of thumbnails at y = 262 — nothing is covered at rest, and the strip
  behaves as a header when he scrolls.

One edge case the script closes: with the panel `display: none` on a slide, a panel
left open in the overview would still read as open to `deck.js`'s Escape handler
after a thumbnail was clicked, and would eat the first Escape. A MutationObserver on
`body`'s `data-overview` now closes the panel as the overview closes.

**The one measurement that decided the back arrow's placement.** The stage is
1280 × 720 scaled from its top left by `s = min(W/1280, H/720)`, and the leftmost
thing on a slide is the module mark at `x = 56` in stage coordinates. A 32 px control
at (8, 10) ends at `x = 40` and the mark starts at `tx + 56·s`, so the gap only
grows with the window. Measured on `s12b`, which carries the PUMP mark:

| Window | back arrow | `.modmark` | intersect | gap |
|---|---|---|---|---|
| 1280 × 720 (stage fills the width, s = 1) | x 8–40, y 10–42 | x 56–134.9, y 12–38 | no | 16 px |
| 1600 × 900 (16:9, s = 1.25) | x 8–40, y 10–42 | x 70–168.6, y 15–47.5 | no | 30 px |
| 1920 × 1080 (16:9, s = 1.5) | x 8–40, y 10–42 | x 84–202.4, y 18–57 | no | 44 px |
| 1440 × 720 (wider, left band) | x 8–40, y 10–42 | x 136–214.9 | no | 96 px |
| 1280 × 800 (taller, top band) | x 8–40, y 10–42 | x 56–134.9, y 52–78 | no | 16 px |

Below roughly 900 px of width at exactly 16:9 the two would touch, which is far under
any size this deck is shown at; every other aspect ratio puts a letterbox band
between them.

**Verification.** `python assemble.py` — 75 slides, no warnings, no duplicate cues.
Driven over CDP in a private headless Chrome, mouse moved to clear `data-nav-idle`
before judging the nav, state read from `Deck.slideNo` / `Deck.step` / `Deck.cue`
rather than eyeballed.

- `d` from `s13` step 1 → `s14` step 0; again → `s15` step 0; `a` → `s14` step 0. No
  fragment walked in either direction. Shift+`d` moves; ctrl+`d` does not.
- `a` on slide 1 (`s00`) and `d` on slide 75 (`b24`) hold, and throw nothing.
- Boundary: the arrows walk `s43` → `s12`; `d` from `s43` lands on `s12` too.
- Rotor solver opened in the S13 tool card, its `#volN` field focused, `a` and `d`
  typed: the deck stayed on `s13` step 0. Escape shrank the card and `d` moved again.
- Overview at 1280 × 720 and 1920 × 1080: strip 0–64, header 88–177.6, first band
  head 203.6, first thumb 262.3 — no intersection, 24 px of air, all 75 thumbnails
  present, no horizontal scroll (`scrollWidth == clientWidth`). With the Instruments
  panel open it hangs from y = 64, flush under the strip.
- A thumbnail click still navigates (thumb 7 → `s06`, overview closed).
- Console across slide → `o` → overview → thumbnail → slide → several `a`/`d`:
  clean apart from the pre-existing `favicon.ico` 404.
- `?view=presenter` loads, shows the new hint line, and its next-step preview
  rebuilds without throwing through six `d` and three `a` presses.
- `?view=guest`: `d` does nothing, as intended.

Screenshots: `screens/frame-slide-*.png`, `screens/frame-overview-*.png`,
`screens/frame-presenter.png`.

## (m) S12b — three of the thirty chips are the mechanisms themselves

> *"you can put a small version of the image in slide A01 in the 'the Screening'
> field, in in place of 3 of the tiles that are there (since the slide carries 3
> mechanisms)."*

The screening step used to thin thirty anonymous grey rectangles down to seven
anonymous grey rectangles. Three of the thirty slots now carry the three metering
principles instead — one panel each of `assets/figs/fig-pump-principles.png`, the
figure the appendix slide A01 shows whole — so the field shows real mechanisms
among the anonymous ideas. This matters more than it did: A01 left the talk in
(b) above, so these tiles are the only place the three principles are seen.

- **Where they sit.** Three slots of the **middle row**, columns 2–4, inside the
  field's own grid and not floating over it. The chip grid was re-pitched to make
  room: five rows at y 5, 54, 103 (the plates), 248, 297, the middle row's blanks
  riding level with the plates at y 138. Six columns unchanged at 120 px pitch.
- **The count is still thirty.** 25 blanks + 3 principles + 2 finalists. The
  `30 ideas on the table` readout stays honest.
- **They survive the screening.** `SEVEN` is now `[3, 7, 13, 14, 15, 22, 27]` — the
  three plates plus the two finalists plus two blanks — so on the screening step
  they are among the seven that stay lit, lifting 6 px with the accent on their
  border. `FIVE` keeps the reciprocating and peristaltic plates (the syringe was
  ruled out on the wash argument, not on accuracy). On the verdict step they dim
  to 3 % with everything else **before** the finalists grow, so nothing collides.
- **The panels are cropped, not shrunk.** `fig-pump-principles.png` carries its own
  annotations — *Plunger face*, *Bore*, *Diaphragm*, *Check valves*, *Roller*,
  *Track*, *Occlusion* — which at a 104 px plate would land at about 3 px. Each
  panel is therefore cropped to the mechanism alone and saved beside the figure as
  `assets/figs/principle-a.png` (590 × 168), `-b.png` (520 × 380) and `-c.png`
  (360 × 427). The crops are pixel windows of the thesis figure — nothing was
  redrawn, recoloured or relabelled. Each panel's name is set under its plate as
  **live 18 px type**: Syringe · Reciprocating · Peristaltic, the figure's own
  captions. A first attempt positioned the whole figure inside an overflow-hidden
  window, the technique the bench photograph uses; it failed because a window only
  clips to its own box, so the annotations either side of each panel came with it.

## (n) S14 — rebuilt as two columns, the prototype and the method

> *"We should oirganize it in two columns. ONe about the prototype itslef, and the
> other about the method… column left with proto 1 / column righ with the sensor
> method / column right with the balance methof / column left with the proto 1
> verdict… the highlighted part should be a bit bigger, and then shrink a bit after
> being presented. I ask you to keep the text and the numbers to a minimum."*

The engineering-sheet dialect is gone from this slide, and with it the four-panel
rail and the four 96 px readouts. S14 now uses a composition of its own,
`data-dialect="columns"`, documented in the part's style block.

- **The layout.** Two columns under two kickers, *the prototype* (left) and *the
  method* (right). Four blocks: proto-01 and the verdict on the left, the flow
  sensor and the balance on the right. Each is a picture with **one 19 px sentence**
  under it, and that sentence is the only prose on the block.
- **The motion.** The block being presented is full size and fully lit; once it has
  been presented it steps back a size and dims to 55 %, and stays in view. Heights
  are 263 presented, 214 stepped back, 165 when the column partner has the floor —
  263 + 18 + 165 = 214 + 18 + 214 = 446, the whole band, so the columns always fill
  and never overlap. Step 1 is a **hero**: the taped pump head opens 1063 px wide
  across the stage and docks into its column when the sensor arrives, which is what
  keeps the first step from being one small card on an empty stage.
- **How the 18 px floor survives a scale.** The body of each block is drawn once at
  536 × 198 and scaled by (height − 65) / 198 — 1, 0.753, 0.505. Scaling live text
  would take it to 9 px, so no live text is ever scaled: the caption sits **outside**
  the scaled body and stays at 19 px, and every annotation inside a body (callouts,
  chart labels, the value on the bar) is faded out the moment its block steps back.
  The hero's one chip is counter-scaled by 198/381 so it still measures 18 px.
  Every state of the walk audits clean at ≥ 18 px.
- **Photographs track their overlays at any size.** `.c14-win` clips, `.c14-in`
  holds the whole image at a stated size with a `calc()` offset, and the overlay SVG
  is a sibling inside it in image coordinates. So the ring still lands on the sensor
  body and the tilted parallelogram still sits on `0.6943` at 100 %, 75 % and 50 %.
- **The numbers.** On screen: **2 mm** (rotor undersize), **1104** and **1159**
  (mean and one standard deviation, µL/min), **3.39** against **5.00 µL** and
  **CV 4.5 %**. That is six, down from fourteen. Moved into the speaker notes, where
  Sirio can say them: 17.70/19.70, the 1.75 mm guessed wall, 600.1 µL at CV 17.6 %
  over five replicates, 678 µL of a commanded 1000, the 11.5 % underestimate and the
  6.7 Hz roller passage. Nothing new was invented; nothing on screen is outside the
  verification pack's §C list.
- **Everything settled earlier survives the rebuild.** Zero is the x-axis with a
  plain `0` and the below-zero region real, with the twelve dotted samples and the
  band crossing it; the callout lands on the flow sensor in the bench photograph;
  the box over the balance is the tilted parallelogram; and the verdict is **one**
  bar with a 4.5 % whisker, never three.
- The flow-trace chart was re-drawn from 400 × 300 into 336 × 200 by remapping the
  existing path — the same recorded samples, not a new figure — so the geometry
  claims of (g1) still hold. The bench callout had to shorten from *the inline flow
  sensor* to *flow sensor* to fit the 188 px window.

## (o) S16 — the rationale, the chosen speed and the result

> *"there are too many numbers there. Avoid mentioning the 2 heads please, as I will
> speack about them in the validation. The 0.27% is already in the graph… keep the
> rational only: different speed were tested to evaluate the pump performance. And
> then tell show which speed was chosen, and what results it gets."*

The four-cell ledger is three cells, and the slide is three clicker steps instead
of four.

- **Dropped:** the `3.94 · 4.10` two-heads cell (it belongs to the validation part);
  the `0.27 %` cell (it is the labelled dashed line on the chart); and the
  `0.25–0.34 %, the pump, over 76 replicates` cell — those are the chart's own
  y-values, and finding **H-9** records that the range is a **180 rpm figure only**
  while the chart itself draws ≈ 0.81 % at 60 rpm, so the slide was contradicting
  itself two inches apart.
- **Kept, in order:** the **rationale** — *four speeds were run, because rotation
  trades delivered volume against repeatability* (no numbers); the **choice** —
  **180 rpm**, *adopted: the lowest scatter, three times faster than the slowest*;
  and the **result** — **4.53 µL**, *per stroke at that speed, 9.4 % under nominal*.
  Three numbers where there were seven. All from Ch. 6, "The operating point" and
  "Precision".
- **The chart now carries the title's claim on its own**, since the ledger no longer
  states it: the benchmark line is labelled, and on the choice step a dashed stem
  draws up from the 180 rpm tick and rings both points there — where the two series
  sit on the pipette line. Step 2 is also where the pump-head clip starts, so the
  head runs as the speed is chosen.
- **Speaker notes rewritten**; they recited all four old cells including the two
  heads. They now carry the trade-off sentence, the 1.7 % volume cost, the three
  times faster, the 0.25 % / 0.34 % pair and the 0.02 % agreement between the 100-
  and 300-stroke tests.

### (o1) The pipette label — done, and it also fixed a collision

Finding **H-19** asked for the benchmark's sample size and its *cumulative*
qualifier. Both are now handled without clutter: the chart label reads **"manual
pipette, ten × 50 µL: 0.27 %"**, and the cumulative qualifier stays in the spoken
claim, in the notes, where it belongs — putting it on the chart would have taken a
second line for a caveat Sirio says in four words. Moving the label down to clear
the new 180 rpm ring also fixed something that was already wrong: at its old
y = 234 it overlapped the 180 rpm marker of the 100-stroke series by a few pixels.
The label now sits on a paper-coloured plate and is drawn after the stem, so the
stem passes behind it instead of striking through the words; and the operating
point is marked with **one** ellipse round both points rather than two circles,
which at 26 px apart merged into a figure of eight.

## (p) Verification of (m), (n) and (o)

`python assemble.py` — **75 slides**, no warnings, no duplicate cues, `s12b` and
`s14` and `s16` all present. Walked in a private headless Chrome over CDP at
1280 × 720 (the shared Playwright browser was held by another session all day),
fresh profile and fresh port, process tree killed after each run: **every clicker
position of S12b, S14 and S16, forward and backward — 23 states**, seven seconds of
settle each.

- **Counters confirmed in the browser before editing**: 18 = `s12b`, 20 = `s14`,
  22 = `s16`, read off the corner of a rendered screenshot, not off the file order.
- **Overflow**: every visible descendant's rect against the slide's own box at every
  state — clean, with one known and intended exception: `.c14-in`, the whole
  photograph oversized inside an `overflow:hidden` window, has an element rect that
  reaches past the slide while nothing is painted outside it. Same exception class
  as the old bench frame in (i).
- **Type**: every rendered text node ≥ 18 px at stage scale, at every state,
  including the scaled-down blocks on S14 — zero hits.
- **Console**: clean at all 23 states and in `?view=presenter`. The only network
  failure anywhere is `/favicon.ico`, which 404s on every page of the site and is
  not ours.
- **Presenter view**: all three render, the notes panel rebuilds, and the next-step
  preview builds without throwing for a step change and for the slide changes
  S12b → S13 and S14 → S15.
- Four things the screenshots caught that the automated audit could not, all fixed:
  the first S12b attempt showed each panel's baked-in annotations because an
  overflow window clips to its box and not to a crop (rebuilt as real crops); the
  mechanism plates rendered 34 px tall because the new rules sat **above** `#s12b
  .chip` at equal specificity and lost (moved below); the S14 bench callout was
  positioned outside its own visible window and never appeared; and the two chart
  labels on that block overlapped by two pixels.

## (q) One judgement call worth Sirio's eye

**S14 step 1 is a hero.** The taped pump head opens 1063 px wide — wider than its
column, not the full 1168 px, because the height of the band fixes the width once
the aspect is fixed. Its right edge therefore lands at x = 1119 and not flush with
the rule above it. That is deliberate and it reads as a left-aligned opening shot,
but it is the one place on the slide where an edge does not line up with another
edge. If it bothers him, the alternative is a plain 568 px card on an otherwise
empty stage for the first step.

## (r) S17 — the circles measured onto the holes, and the rule above the rejections

> *"the purple circles on the rack are not exactly aligned with the actual holes,
> solve please. You have squared the text on the image (super good), well, you
> should report it as the first text that appears on the side, and should be on
> top. The stikeout text, shoul be this: - circular design - belt & pulley - push
> from the bottom. The 'push, never grip · clean first, build second' has to
> disappear."*

**The circles.** The eight ellipses were spaced on a constant 147 px pitch
(`cx` 190, 337, 484 … 1218) over a render that is in perspective, so they drifted
right-to-left off the bores, and one radius pair was forced on all eight while the
real bores grow toward the camera.

They are now measured off `assets/media/alignment/rack.png` itself. Each bore's
mouth was taken as the half-intensity contour between the local body luminance
(median ≈ 107) and the bore floor (1st percentile ≈ 11–19), with PIL, in a window
round each bore so the shadow band below the rack could not merge into it; the
result was then compared against a 4× pixel zoom of bores 1 and 8, which showed
the true mouth about 3.5 px wider and 2 px deeper than the dark contour, and that
offset was added. What the file actually contains:

| bore | cx | cy | rx | ry | pitch to the next |
|---|---|---|---|---|---|
| 1 | 193 | 244 | 38 | 15 | 129 |
| 2 | 322 | 260 | 39 | 15 | 135 |
| 3 | 457 | 278 | 39 | 16 | 140 |
| 4 | 597 | 295 | 40 | 16 | 145 |
| 5 | 742 | 314 | 40 | 17 | 152 |
| 6 | 894 | 333 | 41 | 18 | 158 |
| 7 | 1052 | 353 | 42 | 18 | 165 |
| 8 | 1217 | 374 | 43 | 19 | — |

So the pitch grows 129 → 165 px and the bores widen and flatten toward the right,
which is the opposite of the old overlay's assumption. The `22 mm` dimension is
re-anchored to bores 1 and 2 and the `154 mm of travel` dimension to bores 1 and
8, and both callout chips moved with them: the `22 mm` chip had to go to the right
of its own dimension line, because at the left-hand end of the rack the chip is
wider than the gap and was sitting on bore 1 and hiding the line it labels.

**The side text.** The column now opens with the rule, set as the rule: the boxed
note the sketch itself carries, **CLEANABILITY IS THE MAIN CONCERN**, in a bordered
plate in the alignment accent, with a drawn stem down to the three approaches it
threw out — **circular design · belt & pulley · push from the bottom** — which keep
the strike-through, correctly: those three really were rejected. The
`push, never grip · clean first, build second` line is deleted. Step 2 is re-timed
so the box drawn on `sketch-3.jpg` and the same words arriving in the column are
one thought (the box draws at 2.4 s, the plate arrives at 2.55 s), the stem at
3.25 s and the three rejections from 3.5 s.

Speaker notes rewritten; they still said "Push, never grip." They now name the
rule and the three rejections, with the thesis's own score for the last one:
bottom-push took **9 points** against **17** on fluid ingress beneath open tubes
(sheet 4, verification pack §G.1).

One thing worth knowing: *circular design* and *push from the bottom* are the
thesis's own rejections (the carousel lost to linear motion "on feasibility and
cleanability"; bottom-push scored 9). ***belt & pulley* is Sirio's wording from
this review and from the sketch sheets** — the thesis rejects "commercial linear
actuators and enclosed lead screws" by name rather than a belt drive. It is his
own sheet, so it is carried as he wrote it, but it is not a quotable thesis
sentence.

## (s) S19 — no text, and a rack that indexes instead of drifting

> *"remove the text (even though the one present can be used for the italian
> version). And the animation, you can make it better. the rack moving to the
> right is scattered. If you want to mimic the movement under the nozzle that
> would be great, but you have to have pauses of at lease 0.5 sec, and the nbumber
> of movement should be 7, plus a final push. You see the ~45° grooves at the end
> of the rail? Well, there, the rack is supposed to follow them, before vertical
> movement."*

**The text is gone.** The three `input queue / dispensing lane / output tray` rows
and the `40 tubes, unattended` readout are removed. The plan view already prints
IN QUEUE, RAIL and OUT QUEUE, so the drawing carries the words. With the rail
column gone the figure grew from 851 × 460 to **888 × 480, centred** at x 196.

**The motion.** The old step 3 was one `steps(8)` slide across the lane followed
by a straight drop — which is what "scattered" meant. The geometry was read off
`v3-top-annotated.png` (2000 × 1081) before anything was re-timed:

- the rack occupies x 275–830, y 368–460, and its glyph's tube pitch is 68 px;
- the two ejection grooves are the **dark channels** between the blue floor bands,
  running (1215, 370) → (1280, 460) and (1522, 370) → (1588, 460) — 65 px across
  for 90 px down, i.e. about 54° from the horizontal, and 307 px apart;
- so the rack's two ribs, drawn 307 px apart at the grooves' own slope, meet the
  groove mouths after **816 px** of forward travel.

816 splits as **272 px of feed-in + 7 × 68 px of indexing + 68 px of final
stroke**, so every index is exactly one tube pitch (the 22 mm move) and the final
stroke is the thesis's own final 22 mm. The feed-in is not an index: it is the
approach from the loading position, and it is animated as one continuous motion
inside step 1 so it reads as loading.

The slide keeps four steps, deliberately, because each one is a thing Sirio says:

1. the second axis feeds a rack up out of the queue and onto the rail, and it runs
   into the first dispensing position (1.4 s, continuous);
2. **seven index steps**, each a 0.30 s move followed by a **0.62 s hold** — above
   his 0.5 s floor — with the rack outline pulsing once on each hold, so a pause
   reads as a dose and not as a stutter. 6.4 s of rhythm on one click;
3. the final stroke, the two ribs into the two grooves, the **diagonal** along the
   groove direction (263 px along (0.5855, 0.8107), which lands the rack at
   x 1245–1800 — inside the out tray, clear of the electronics bay at x ≤ 1230)
   and then the **vertical** drop;
4. the crossfade to the isometric.

Plain x/y tweens, not MotionPath: the diagonal is a straight line, so a
coordinated pair of tweens is exact and has fewer ways to fail. Reduced motion
seeks to the end like the rest of the deck.

**The forty-tube claim is gone from the slide.** Finding **H-3** records that the
printed takeaway rests on an unresolved `TO CONFIRM (student, 2026-09-11)` saying
the full five-rack run had not been performed and that the dye run carried two
racks. The notes now carry the **capacity** ("a standard batch is five racks —
four waiting, one pre-loaded") and, as a fourth bullet, the module's one known
failure mode (**H-4**): a lid left flat rather than standing rubs the chamfered
wall and loads the rack with a friction the open-loop drive cannot sense.

## (t) S20 — the nozzle, rebuilt

> *"Start by saying that the prototype hadned over by marius was not functional,
> and thus was rebuilt it from scratch. The strikehout there do not make actual
> sense… those comments are real… Please, do keep the bullets below the main
> sentence above, but shrink them to max 3-4 words each, even 1 if you can… 'Two
> elastic bands' is wrong as only one is shown… I like the dark text with the
> light blue background for describig things."*

**The title now carries the hand-over**: *"The nozzle Marius handed over did not
work, so I rebuilt it from scratch."* Chapter 8 supports every word of it — at
hand-over "the mechanism was inoperative", "the inherited assembly lacked physical
mounting interfaces", and the OpenSCAD export gave Fusion "an unmodifiable solid
body", so the module was "modeled from scratch in CAD" from caliper measurements.
The vibration-detachment principle is Marius's and was kept; that is in the notes.

**The strike-through is removed from the three findings.** Struck out they read as
things considered and dropped, when they are observations about hardware that
existed. Shortened as asked, to **too weak · no mounting · an uneditable mesh**,
at 30 px with an accent tick each.

**The layout is a three-beat reveal** on a new composition (`data-dialect="columns"`):
a 356 px left column holds the findings and, under them, the one line the CAD
gets — *One degree of freedom: vertical.* — which is where he asked for it; the
right region holds first the two renders (388 × 254 each, side by side) and then,
after they step down to **162 × 106 at the bottom left**, the module as built at
**792 × 448**. Both renders are the whole file inside an `overflow:hidden` window
cropped by **percentages** (carrier `width 161.2%, left −18.96%, top −5.29%`;
holder `125.95% / −12.51% / −4.55%`), which is the `.c14-win` idea from S14 with
one change: because both window sizes share one aspect ratio, percentages hold at
both scales and nothing has to be re-measured when the frame shrinks.

**Three marks on the photograph, and nothing else.** Coordinates are in the
photograph's own 2000 × 1131 space, all measured on the file and then checked on a
zoom of the rendered slide:

| mark | geometry | label |
|---|---|---|
| vibration motor | ellipse cx 1035, cy 478, rx 140, ry 92 (the grey cylinder measures x 951–1121, y 427–535) | chip at 61.9 % / 21.4 %, leader arrow (1255,318) → (1145,405) |
| the one fitted band | ellipse cx 1500, cy 800, rx 130, ry 160, round the knot and the loop through the seat | chip at 70.7 % / 47.3 %, beside the circle |
| 22 mm between the needles | witness lines at x 327 and x 590 from the needle tips down to y 930, dimension line at y 905 with arrowheads | chip at 18.2 % / 76.8 %, on the line |

**Deleted:** `#s20-band1`, the arc at x ≈ 690 that pointed at bare plastic and not
at any band; `#s20-spin` and `#s20-lift`; the `a magnet and three nuts` chip; the
`two elastic bands` ghost chip, which was **factually wrong for this photograph**
(the design drills two holes and the thesis figure caption says "an elastic
retaining band passes over the carrier at the right" — singular); the caption
under the photograph; and the seat/hub overlay and both render captions on the CAD
step.

**The label style** is a new `.callout--lite`: dark ink `#10242e` on a light blue
plate mixed from the nozzle thread's own teal, 18 px mono bold, the same
solid-chip language as the `machine wetted` / `tube only` captions on S12. Speaker
notes rewritten; they said "Two elastic bands retain it", and now say elastic
bands were routed round the carrier and **one is fitted here**.

## (u) S16 — the pipette benchmark label, made robust

Handed over mid-round as a defect on the slide the previous session left: the
label `manual pipette, ten × 50 µL: 0.27 %` clipped, with the value off screen.

**What was actually wrong.** The label was one line, `text-anchor="end"` at x 680,
on a knockout plate running to x 684 inside a 700-wide viewBox. Measured at an
exact 1280 × 720 it fitted, with **3 px of slack inside its plate and 19 px inside
the SVG** — but rendered at a non-unit stage scale (my first render, a 1264 × 625
window with the stage at 0.868) the string came out longer and `0.27 %` was cut
off at the right, exactly as reported. So the defect is real and the cause is that
the label had no slack; it is not reproducible at every window size, which is why
it survived the previous round's walk.

**The fix** is a two-line, left-anchored label hanging off the **left** end of the
dashed benchmark line it names, on a plate at x 82, y 218, 300 × 54:

```
manual pipette, ten × 50 µL
0.27 %                        ← bold, darker
```

It clears the 180 rpm stem (x 448) and the operating-point ellipse by 66 px, sits
22 px above the x-axis and far from the tick labels, keeps both lines at 18 px,
and now has 20 px of slack on its own plate and 318 px inside the viewBox, so no
font-metric difference can clip it again. Verified by measurement at 1280 × 720,
1264 × 625 and 1600 × 900: the plate and both text runs scale together at every
one (text width 285 → 247 → 356 px, exactly the stage scale), and by eye on a 2×
zoom of each.

## (v) Verification of (r) to (u)

`python assemble.py` — **75 slides**, no warnings, no duplicate cues.

**Slide identity.** The on-screen counter **shifted by one during this session**:
another session moved `s04c` out of the talk and into the appendix, so what the
handover called 23 / 25 / 26 rendered as **s17 = 22, s19 = 24, s20 = 25** (and
s16 = 21) by the end. Every slide was resolved by `Deck.cue`, not by number, and
the cue was read back out of the browser after each navigation.

Walked in a private headless Chrome over CDP at 1280 × 720 (the shared Playwright
browser was held by another session), fresh profile and fresh port per run,
process tree killed after each: **every clicker position of S16, S17, S19 and S20,
forward and backward — 27 states**, eight seconds of settle each, because S19's
index run is 6.4 s of real-time timeline on a single step.

- **Overflow**: every visible descendant's rect against the slide's own box at
  every state — clean, with one known and pre-existing exception: on S17 step 3
  the four sketch sheets tween to `x: -300` and slide off the left edge on purpose,
  so their element rects reach past the slide. Unchanged by this round.
- **Type**: every rendered text node ≥ 18 px at stage scale, at every state,
  including the demoted CAD renders on S20 — zero hits. No live text is scaled:
  the S20 renders that shrink to 41.75 % contain no type.
- **Console**: clean at all 27 states and in `?view=presenter`; the only network
  failure anywhere is `/favicon.ico`.
- **Presenter view** at 1600 × 900: all four slides render, the notes panel
  rebuilds, and the next-step preview builds without throwing for step changes and
  for the slide change S19 → S20.
- **Reduced motion**: `prefers-reduced-motion: reduce` emulated — all four jump to
  their end state, console clean, `Deck.reducedMotion === true`.

**What was checked by eye, crop by crop, because an automated rect audit cannot
see a circle sitting beside a hole:**

- the rack bores at 4×, left half and right half — all eight ellipses on their
  bores, bore 8 included, which is where the old constant pitch was worst;
- the `22 mm` and `154 mm of travel` dimensions after the chips moved;
- the S19 rack motion, sampled out of the DOM at 40 ms: **272 → 340 → 408 → 476 →
  544 → 612 → 680 → 748**, seven moves of 68 px with 0.53–0.73 s of measured hold
  between them, then 816 (the final stroke), then (838, 31) and (970, 213) — a
  22 : 31 slope, the grooves' 65 : 90 — then 273 and 285 vertically;
- the rib-in-groove pose, forced with a direct style so it could be held still:
  both ribs sample **dark at every point along their length** in the source image,
  i.e. inside the groove channels and not on the blue floor either side;
- the S20 motor ring, band ring and 22 mm dimension at 3–4×. The dimension drops
  from the two needle tips with arrowheads and the chip on the line; the band ring
  encloses the knot and the loop through the seat; the motor ring encloses the grey
  cylinder;
- the S16 label at three viewports.

## (w) Two things left for Sirio to judge

- **S20 step 1 is deliberately stark**: the title, three short findings in a
  356 px column, and nothing else on the stage. That is the reveal order he asked
  for (bullets, then CAD right, then CAD bottom-left with the photograph right),
  and it works as an opening beat, but it is the emptiest single state in Part II.
- **S17's `room for a cap opener` ghost chip** still sits at the bottom left of the
  rack render, a long way from the ghost jaw brackets it explains between bores 1
  and 2. It was already like that and he did not flag it, so it was left alone, but
  the chip is 247 px wide against a 52 px gap and there is nowhere near the jaws to
  put it. If it bothers him the honest options are to drop the chip and say it, or
  to drop the jaw ghosts and keep the chip as a plain note.

### (x) The pipette benchmark label, third attempt — 2026-09-22

Two in-SVG attempts failed. The first overran the chart plate and cut `0.27 %`
off entirely. The second split it onto two lines lower in the plot, where the
x-axis rule ran straight through the glyphs of `0.27 %`.

Both attempts measured as correct and rendered as wrong, and it is worth
recording why, because the next person will hit it. For the two `<text>` nodes
in `#s16-pip-t`, `getBoundingClientRect()` and `getBBox()` agreed with each
other, agreed with the element's own screen CTM, and disagreed with the painted
pixels by about one line height — a clipped screenshot taken at the reported
rect of the second line contained the pixels of the first. The axis path in the
same SVG matched its reported rect exactly, so it was not a page-scale or
viewport-offset problem, and the group carried no transform, no duplicate id
and no `dominant-baseline`. The cause was not found.

**The fix was to stop using SVG text for it.** `#s16 .s16-plate` is 700 x 340
and the chart's viewBox is `0 0 700 340`, so the plate is 1:1 with chart units
and an ordinary positioned `div` can be placed in the chart's own coordinates.
The label is now `.s16-pipt`, two lines, `left: 84px; top: 224px`,
`width: max-content` with the first line `white-space: nowrap` so it cannot
wrap and cannot overrun. The dashed benchmark is at y 212.2 and the x-axis at
y 292, so the chip sits in the empty band between them, clear of the 180 rpm
stem at x 448.

Verified by clipped screenshot at 6x, not by arithmetic: both lines legible,
`0.27 %` bold and complete, nothing crossing it.

**Rule for this deck:** annotate a chart with an HTML chip positioned over the
plate, not with SVG `<text>`, wherever the plate and the viewBox are 1:1.

---

### (y) S22, S23, S24 — the user-interface mark, the contrast bar, the fast cascade and one circle — 2026-09-22

Sirio's review of the two user-interface slides and the storage slide. Four
separate things; the module mark is the one with a cause worth recording.

#### (y1) The module mark said "alignment" on both interface slides

`updateModMark` in `parts/99-tail.html` reads `data-map` off the section and looks
the key up in `MODULE_GLYPH` / `MODULE_NAME`. Those two maps had **four** entries
— `store`, `rotor`, `nozzle`, `rack` — and **no `ui` entry at all**, so the two
interface slides had been given `data-map="rack"` and were drawing the alignment
module's rack-on-a-rail under the word "alignment".

Added a fifth entry, `ui` → `user interface`, drawn as the panel on its stand with
the touch target lit: the same figure as the fourth stop of the Part II journey
strip on `s11`, redrawn in the mark's `-18 -18 36 36` box with `mk-node` strokes
and one `mk-solid` dot. `s22` and `s23` now carry `data-map="ui"`. Verified by a
6x clipped screenshot of the top-left corner on both.

**Still mislabelled by the same mechanism, not fixed** (they are Part III, another
session's file): `s33` "The failures were a tube cap, a tired battery and a leaking
septum" and `s35` "This is the machine, and it is in the room" both carry
`data-map="rack"` and so announce themselves as the alignment module although they
are system-level validation. `s34` already opts out with `data-map="none"`; the
honest options for the other two are `none`, or a new whole-machine key.

#### (y2) S22 — no 7.1:1, and one beat fewer

- The `tube` / `line` / `tube` word block is gone, with its CSS, its timeline
  segment and its step. S22 is **three steps**, not four. Its speaker note also
  claimed two colleagues found the collision "in an afternoon" — verification-pack
  **H-14**, a duration the thesis does not give — and that line is gone too.
- Captions are now **"V1 handed over."** and **"V2.2 rebuilt."** Chapter 9's
  version table calls v2.2 "the final validated release", which is the number
  Sirio was unsure of.
- The readout was `6.2` counting to `7.1` — verification-pack **H-2**, a
  measurement invented to one decimal place on the slide whose subject is
  self-auditing rigour. It now reads **7:1** over the label **Contrast ratio**,
  which is the requirement chapter 9 states (a minimum contrast ratio of at least
  7:1, checked after the colours are cut to the panel's 16-bit depth, against
  "the 7:1 ratio that international guidance sets"). **A fixed requirement must
  not count**, so the counter is replaced by a rise-in and a gradient bar that
  draws the full width of the column — the bar each page held itself to, drawn as
  a bar. The 6.2:1 failure moved into the notes, where it belongs: it is a defect
  the method caught, not a result the slide asserts.
- The readout also moved from a 254 px stub at the far right into the 524 px
  column the touch-target comparison vacates at step 2, so the right half of the
  stage is no longer empty at step 3.

#### (y3) S23 — seven steps to two

He will demo the real tool instead of narrating six frames, so the shutter is
gone. **Two steps**: (1) all six device frames land at once, 60 ms apart, about
0.7 s end to end; (2) they fold into the filmstrip and the live card takes the
room. One step for the screens and one for the card is the smallest count that
still clears the stage before the card appears — the card sits at
`left:360; top:318`, straight over the 3 x 2 grid, so it cannot arrive on the
same beat.

One trap: the fold moves each frame's **top-left corner** to an exact filmstrip
slot, so `transformOrigin` has to stay `0% 0%`. An entrance written with a
centred origin looks better for a fifth of a second and lands the filmstrip in
the wrong place. The origin is now commented in the builder.

The tool card is relabelled **Live User Interface** (the site-wide rename);
`data-src` stays `../../tools/ui-mockup/index.html`, verified by clicking the
card and reading the grown iframe's `src`. `SPEC.md` and `CONTENT.md` already
carried the new name.

#### (y4) S24 — one circle, and a caption that does not overclaim

Deleted `#s24-cu` (the copper-tape line), `#s24-pin` (the circle on the sleeve),
`#s24-liq` and `#s24-air` (the two needle lines), their `<svg>` wrappers on the
first two cards, and their timeline segments. The slide now holds **one** marked
element, `#s24-filt`, the circle on the 0.22 µm air filter. Verified by counting
`#s24 .p2-ov *` at step 3: **one node**, plus a 4x clipped capture showing the
ring landing on the green filter body.

**The provenance claim, checked.** Sirio's instruction said to leave the filter
circle "as that is the thing I added". **Chapter 11 §11.1 does not support that
framing, and the caption does not make it.** The filter is part of the handed-over
hardware: "the tubing on the air needle ends in a syringe filter", cited to the
companion thesis, and `fig:storage-parts` is captioned "**The storage module as
handed over**… the syringe filter, with its green housing, that closes the end of
the air line. Design by Marius". The one thing the thesis attributes to Sirio
here is **reading the 0.22 µm rating off the fitted filter** (source comment,
2026-09-12) and the judgement that follows it: "That exceeds what a preparation
reagent strictly requires, but it closes the one path by which the outside
environment reaches the liquid." So the circle stays — it is the part he wants to
talk about — and the caption says what the part does, not whose it is. If he
means to claim it on stage, the thesis has to say so first.

Captions now carry the two things he will say and nothing else: **where it comes
from** ("The one module in this machine I did not design.", above the existing
credit line, which names who) and **the filter** ("One needle draws the liquid,
one lets air back in through a 0.22 µm filter."). The middle caption is the plain
assembly order. Cut: the 5 % level accuracy, the spring pins, the cap-height
point.

`CONTENT-IT.md` gained `s22`, `s23` and `s24`, written from the new content
rather than translated from the retired captions. `s18` and `s21` are still
missing and stay flagged in *Da fare*.

#### (y5) Verification

`python assemble.py` after every slide: 75 slides, no warnings, no duplicate
cues. Private headless Chrome over CDP at 1280 x 720, fresh profile and port per
run, tree killed after.

- Every clicker position of all three walked forward **and** backward, screenshot
  each: `s22` 0–3, `s23` 0–2, `s24` 0–4. Each state audited for descendants
  outside the slide box and for text under 18 px: **none in any state**.
- Clipped captures inspected rather than arithmetic trusted, per (x): the module
  mark at 6x on `s22`, `s23` and, as controls, `s19` and `s24`; the air-filter
  circle at 4x; both unmarked storage photographs at 2x.
- Console across all runs: the only failing request in the whole deck is
  `/favicon.ico`, 404, pre-existing and harmless. No exceptions.
- `?view=presenter` renders all three and the next-step preview builds without
  throwing.

**One thing left as it was found.** The presenter notes panel is 243 px with
`overflow-y: auto`, and several slides' notes are taller than it: `s20` 428,
`s19` 404, `s16` 367. The rewritten notes were trimmed to **244** (`s22`) and
about **250** (`s24`), so both now fit a screenful; `s23`'s 274 is untouched and
pre-existing. The panel scrolls, so nothing is lost — but a note he has to scroll
to is a note he will not read mid-sentence, and the tall ones are worth a pass.

---

### (z) S14 uncropped, the divider's symbols, three S16 strings and the S20 bullets — 2026-09-22

Sirio's second Part II review. Four separate things, all in `parts/30-part2.html`
except one line in `parts/99-tail.html`.

#### (z1) S14 — "Shrink yes, crop no"

Verbatim: *"You have cropped the images, and I can't see basically anything…
You have to show the image uncropped, taking the necessary space, and then shrink
it down."* He was right about the mechanism: every photograph sat in a
`.c14-win` / `.c14-in` pair — an oversized image inside an `overflow: hidden`
window, which is a crop by construction.

**The window is gone.** Each photograph now sits in a `.c14-fig` cut to that
image's own aspect ratio, with the file at `width:100% height:100%
object-fit:contain`, so the frame **is** the whole image and the only thing a
block's height changes is how big it is drawn. The four canvases, at scale 1:

| Block | Canvas | Holds |
|---|---|---|
| B1 the prototype | 198 × 198 | `proto01-open.jpg`, 1600 × 1599 |
| B2 the flow sensor | 336 × 401 | `proto01-bench.jpg` 1280 × 721, **above** the 336 × 200 trace |
| B3 the balance | 277.8 × 198 | `pump-gravimetric.mp4` 540 × 960, beside `gravimetric.jpg` 1080 × 1385 |
| B4 the verdict | 536 × 198 | the drawn bar figure |

The geometry is now one explicit table, `GEO` in the builder: one row per
clicker position, one `{x, y, w, h}` per block in stage pixels. `scaleOf` turns
a block's height into the canvas's uniform scale and nothing else measures
anything. Reading it, the whole slide is five lines.

**What the rebalance cost.** Wide media and tall media cannot share one column
shape, so the caption moved: a square, tall or stacked block puts its 19 px
sentence **beside** the canvas, in the column the scaled canvas leaves (the
builder sets its `left` and `width` per step from that scaled width, so there is
no dead space at any size); only the wide drawn figure keeps its caption below.
The two prices, both accepted:

- **The first pump head is no longer a full-stage hero.** It is 888 × 446 at
  step 1, a 418 px square photograph with its one line set at 28 px beside it.
  The old hero was 1063 wide because a cropped letterbox could fill it; a whole
  square cannot, and a 1063 px card with a 418 px picture in it is a hole.
- **The bench photograph is 336 px wide instead of 474.** It is *whole* at 336
  — the reservoir, the head, the sensor and the vessel are all on screen for the
  first time — where before you saw a 188 px slice of the middle. Its chart moved
  from beside it to under it to buy that width. Overlay strokes were
  re-multiplied for the new sizes (the sensor lead and ring 9 → 12 in a 1280
  viewBox; the balance quadrilateral 12 → 13 in a 1080 one, and widened slightly
  so it frames the digits instead of grazing them).

**Registration got simpler, not harder.** `.c14-in` existed so an SVG sibling in
image coordinates would stay on an oversized image. Now the frame is the image,
so each overlay just shares the frame's box with its `viewBox` set to the file's
own pixel size. Verified by eye, not by arithmetic: a 5× clip of the bench
photograph shows the ring and leader landing on the green inline sensor, and an
8× clip of the balance shows the tilted quadrilateral framing `0.6943` with
clearance on both ends.

**The measurement video.** `assets/media/video/pump-gravimetric.mp4`
(H.264, 540 × 960 portrait, 11.4 s) is in the balance block, **beside** the still
rather than instead of it: the clip is the weighing happening, the still is the
frame that carries the reading and the quadrilateral that marks it. Muted,
looped, `playsinline`, `preload="none"`, poster present, and `data-noauto` so the
infra's entry autoplay leaves it alone. It runs **only while the balance step is
live**: the builder reads a window off the timeline playhead in `onUpdate`, which
is right in both directions, and a `Deck.enter('s14')` hook re-syncs 80 ms after
entry because `tl.seek()` suppresses `onUpdate`. Measured: paused at steps 0–2,
playing at 3, paused at 4, playing again stepping *back* to 3, paused off-slide,
playing on re-entry at 3, paused on re-entry at 0.

One small correction taken while in there: `#s14-whisk-l` ("CV 4.5 %") was
missing `data-late`, so it appeared at the top of step 4 and again when its
whisker drew. It now waits for the whisker, like `#s14-nom-l`.

#### (z2) S11 — the divider's symbols are the module marks

*"The symbols that you use in the slide 16 should be the same used on top of the
slides."* The Part II divider drew four hand-made glyphs; every module slide
draws a corner mark from `MODULE_GLYPH` in `parts/99-tail.html`. Two drawings of
four modules.

**Single source, not copied paths.** `parts/99-tail.html` now publishes the map:
`window.Deck.marks`, plus `Deck.mark(key)` and `Deck.markBox`. The divider's four
stops carry no geometry at all — each is an empty `<g class="jrn-mark">` with a
`data-mark` key, filled on entry from `Deck.marks`. Script order makes this safe
(the tail's inline script runs before the hoisted part scripts), and the fill is
idempotent, so replaying the hook and the presenter view's clone cost nothing.
They cannot drift, because there is nothing to drift.

The mark box is `-18 -18 36 36`, so each group is `translate(<stop x> 32)
scale(1.111)` and the stroke is pre-divided by that scale (1.8 → the 2 px the
strip is drawn with). The colour-in animation still works: it now tweens
`stroke` on `.mk-node` and `fill` on `.mk-solid`, each guarded for an empty set
because only two of the four marks have a solid node.

Verified by cropping each divider glyph at 8× beside the same module's corner
mark at 12×: pump/rotor, alignment/rack, nozzle/nozzle and user
interface/`ui` are the same drawings, differing only in colour (the strip lights
orange, the corner mark takes the slide's thread accent).

#### (z3) S16 — three strings

- Benchmark chip (`.s16-pipt`, still an HTML chip over the plate, per (x)):
  first line **`manual pipette`**, second line **`0.27 %`**. "ten × 50 µL" moved
  to the notes.
- First ledger cell: **"The pump was tested at four speeds."**
  *For the record: the sentence it replaces — "Four speeds were run, because
  rotation trades delivered volume against repeatability" — was **not invented**.
  It is ch. 6 "The operating point", which reads "Slower rotation delivers
  slightly more volume per stroke but repeats less reliably, while faster
  rotation reduces both delivered volume and repeatability." He judged it too
  much for the slide, so it is cut as instructed and kept in the notes. If he
  wants it back it is sourced.*
- Third ledger cell: **"per stroke at that speed — a 9.4 % underdelivery"**.
  "Underdelivery" was chosen over "delivers 9.4 % less than commanded" because
  the cell's value counts down from **5.00** to **4.53** as it lands, so the
  thing being underdelivered is already on screen and the cell stays two lines
  wide. The notes now read "it underdelivers the nominal 5.0 µL by 9.4 %".

#### (z4) S20 — the bullet dashes

The three findings' light-blue dashes were absolutely positioned boxes at
`top: 13px`, a hand-measured offset that sat about 5 px above the text's optical
centre. They are now **aligned by construction**: the row is a flex container
with `align-items: baseline`, the dash is the `::before` flex item, and a flex
item with no content takes its bottom margin edge as its baseline — so the dash
lands exactly on the first line's baseline and one em-relative lift
(`translateY(calc(1.5px - 0.26em))`, half an x-height) puts it on the x-height
centre. The lift is em-based and the row carries the font size, so it holds at
any size and the dash stays on the **first** line if a row ever wraps.
Confirmed on a 4× clip: all three dashes on their rows' optical centre.

#### (z5) Verification

`python assemble.py` after every one of the four items: **75 slides**, no
warnings, no duplicate cues, `index.html` never hand-edited. Private headless
Chrome over CDP at 1280 × 720, `--remote-allow-origins=*`, websocket with
`suppress_origin=True`, fresh profile and a random port per run, tree killed
after.

- Every clicker position of `s11`, `s14`, `s16`, `s20` walked forward **and**
  backward, screenshot each, and every state audited for descendants outside the
  slide box and for text below 18 px **normalised by the stage scale** (the
  headless stage renders at 0.867, so a raw font-size read is 15.6 px and means
  nothing). **No overflow in any state. No text below 18 px in any settled
  state.**
- Clipped captures inspected by eye rather than trusted arithmetically, per (x):
  the proto-01 photograph at 3× (whole frame, the "held down with tape" chip
  moved from 71 % to 38 % so it sits on the photograph instead of hanging off
  it), the bench photograph at 5× (whole frame, ring and leader on the sensor),
  the balance at 5× and its display at 8× (whole frame, quadrilateral on the
  digits), the four divider glyphs at 8× against four corner marks at 12×, and
  the three S20 bullets at 4×.
- Video gating measured programmatically at every step and on re-entry, both
  directions; poster attribute present and shown before the first play.
- Console across all runs: the only failing request in the deck is
  `/favicon.ico`, 404, pre-existing. **No exceptions, no GSAP target warnings.**
- `?view=presenter` renders all four and the next-step preview builds without
  throwing.

#### (z6) Left as found

- **S20's two lower callouts measure 17.94 and 17.95 px** in the settled state.
  That is 18 px through a 0.867 stage scale and back — floating-point rounding in
  the measurement, not type below the floor. Pre-existing, untouched.
- **S14's speaker notes are still taller than the presenter panel.** The panel is
  243 px; these notes run to about 430. Same open item as (y5) names for `s20`,
  `s19` and `s16`. The panel scrolls, so nothing is lost, but the tall ones are
  still worth a pass.
- **The trace chart on S14 is unchanged**, including the "standard deviation
  1159" plate that the trace pokes above. It is the same drawing at the same
  336 × 200 as before; only its position in the block moved.

### (aa) Headless verification trap: entry timelines look stalled — 2026-09-22

Screenshots of the Part II divider taken in headless Chrome showed the journey
strip dim and its labels apparently truncated to "Pum", "Aligr", "Use". Nothing
was wrong with the slide.

Measured in the page: all four `.jrn-stop` groups sat at `opacity: 0.3`, the
`<text>` nodes held their full strings with `text-anchor: middle` and fitted
inside the SVG box, and the tween onto the first stop existed, was unpaused and
reported `progress: 0` after fourteen seconds. `gsap.ticker.frame` advanced
from 20 to 22 across 1.5 s of wall clock — **about 1.3 frames per second**.

The headless rig this project verifies with (`--headless=new --disable-gpu`)
runs `requestAnimationFrame` at roughly one frame a second. That does not
matter for a slide's step timeline, because the runtime *seeks* those to a
label, so they paint their settled state immediately. It matters a great deal
for anything registered through `Deck.enter`, which builds an autoplaying
timeline and relies on the ticker: at that frame rate it has barely begun when
the screenshot is taken.

**How to verify an entry timeline in headless.** Force it forward before
capturing, then read the settled values back:

    gsap.globalTimeline.time(gsap.globalTimeline.time() + 8)

With that, the four stops read `opacity: 1`, the glyphs take the accent and
the labels are complete. Do not conclude that a divider or any other
`Deck.enter` animation is broken from a headless screenshot alone — check the
ticker first, and force time before you file a defect.


---

### (ab) Part III-A: three new marks, the S25 divider, S27 rebuilt, "Live Demo" — 2026-09-22

Sirio's notes on Part III. Four items, applied one at a time with an assemble
and a browser check between each.

#### (ab1) Three new marks, one family

`MODULE_GLYPH` / `MODULE_NAME` in `parts/99-tail.html` gained **`electronics`**,
**`integration`** and **`validation`**, drawn in the existing idiom: the
`-18 -18 36 36` box, `mk-node` for stroked outlines, `mk-solid` for the few
filled nodes, nothing smaller than r 2.4.

- **`electronics`** — a processor package with its pin-one dot, over a bus, over
  three things it drives. Sirio's correction mid-session: **system architecture
  and electronics are one subject and share one mark**, so there is no separate
  `architecture` key. A first draft carried the package legs as well; at the
  26 px corner size it read denser than the rest of the family, so the legs came
  off and the block diagram stayed.
- **`integration`** — one case with the modules seated inside it.
- **`validation`** — measurements landing inside the tolerance band.

Checked by rendering all eight marks side by side twice, once at 96 px and once
at the real 26 px corner size with their names, and looking at the crop. The
three new ones sit at the same ink density as `rotor`, `rack`, `nozzle`, `ui`
and `store`.

`data-map` set: `electronics` on **S26 and S27** (one subject, one mark),
`validation` on **S31, S32, S33, S34**. **S33 and S35 carried `rack`, the
alignment module, which was simply wrong**; S33 is validation, and S35 — the
four-clip mosaic of the whole machine, immediately before the demo — now carries
`none`, like the demo slide after it, because no single module owns it.
**S28, S29 and S30 still need `data-map="integration"`**; they were another
session's to edit and were deliberately left alone.

#### (ab2) S25, the Part III-A divider

The eyebrow reads **Part III-A**. The body is now the Part II divider's concept
(S11): a drawn line, three evenly spaced stops each with a symbol and a label,
and the drop travelling the line and lighting each stop in turn. The stops are
**System Architecture & Electronics · Integration · Validation**, at x 180, 544
and 908 in a 1088 x 116 box.

The stops carry **no glyph paths of their own**: each is an empty `<g>` with a
`data-mark` key, filled on entry from `window.Deck.marks`, idempotently, exactly
as S11 does. One source of truth, so the divider can never drift from the corner
marks. The `.mk-node` / `.mk-solid` tweens are guarded against empty sets.

The first label is two lines — `System Architecture` / `& Electronics` — because
one line of it is 253 px of 18 px mono and would have run off the left edge of
the strip. The other two are one line each. Measured: the three stops occupy
208-423, 570-695 and 891-1004 device px, so nothing touches.

The section rail in `parts/99-tail.html` already read `Part III-A` in `SECTIONS`
and was correct; it was **not** changed.

#### (ab3) S27, two figures, whole, no side panel

Sirio: show figure 10.4 in full, not cropped; then 10.5 in two versions, as
built and then production; the presented one enlarged; no side panel; almost no
text; no orange signal animation; no mention of out-of-stock drivers.

What went: the `sheet__rail` panel of three, the cropped figure window
(`#s27-fig img` was 901 px wide inside an 820 px box at a negative offset — the
same crop complaint as S14), the whole SVG overlay with its six pulse trains and
its shared clock ticker, the electronics-bay photo, the readout, the
"smart drivers, out of stock" callout and its strike-through.

What replaced it, dialect **`plates`**: each figure sits in a box carrying its
**own aspect ratio** (`aspect-ratio: 2000/1266` and `2000/1125`) with
`object-fit: contain`, so growing or shrinking the box cannot crop the drawing.
Only `left`, `top` and `width` are tweened; the height follows. Three beats:

1. the control architecture whole and centred, 720 px wide;
2. it steps back to 330 px on the left while the power tree rises to 790 px on
   the right, in its **as built** state;
3. the **production** design fades in over it.

Text on the slide is now one word under each figure — **Control**, **Power** —
plus a pill reading **as built** then **production**. Two pills are stacked and
crossfaded rather than one whose text is rewritten, so the state scrubs
correctly in both directions.

**The two states of 10.5 are two derived images**, both written to
`assets/figs/` with PIL from `fig-power-tree.png`:

- `fig-power-tree-as-built.png` — the dashed production elements erased to
  transparent (the 24 V battery pack, the 24 V rail, the two dashed arrows, the
  "buck" step-down arrow and its label) together with the "Dashed: designed, not
  built" legend;
- `fig-power-tree-production.png` — the original with only that legend erased.

The unchanged pixels are identical in both files, so the second fading in over
the first shows exactly the dashed parts appearing and nothing else moves. The
legend is gone from both because at this size it was about 7 px of unreadable
print, and the pill now says what state the figure is in.

Verified by eye on clipped captures at each beat: the as-built plate shows **no
dashed artefact** (a first pass left the bottom border of the battery-pack box
behind; the erase rectangle was extended from y 162 to y 178 and re-checked),
and both figures are whole with no edge cut.

The step count on this slide went from **three to two**, because there is no
natural fourth beat. The deck's step total changed accordingly.

#### (ab4) "Live Demo"

Sirio: *"Use 'Live Demo' as text please. You can leave the website, but make it
smaller."*

**This was applied to S36, not S35.** The brief named S35, but S35 is the
four-clip mosaic titled "This is the machine, and it is in the room." and it
carries **no website reference at all** — "you can leave the website" cannot
refer to it. S36 is the demo hand-off, and it is the slide that carried both a
short title (*The machine, live*) and the address
`sirsirio.github.io/thesis-tools`. The title is now **Live Demo** at 88 px and
the address dropped from 26 px to 20 px in a muted accent, secondary beneath it.
S35's own title is unchanged; only its wrong `data-map` was fixed.

#### (ab5) Verification

- `python assemble.py`: 75 slides, no duplicate cues, no warnings.
- Private headless Chrome over CDP at 1280 x 720 (own port, own user-data-dir,
  killed with `taskkill /F /T` after each run), against
  `http://localhost:7331/`. Every clicker position of S25, S26, S27, S35 and S36
  walked forward and then backward, screenshot at each, **every screenshot
  looked at**.
- Entry timelines forced with
  `gsap.globalTimeline.time(gsap.globalTimeline.time() + 8)` before judging, per
  (aa). With that, all three S25 stops read `opacity: 1`, take the accent and
  show their full labels, including on re-entry after leaving and coming back.
- Programmatic audit at every state: **no descendant outside the slide box, and
  no visible text below 18 px** once normalised by the 0.867 stage scale.
- Crops inspected: the eight marks at 96 px and again at the 26 px corner size
  with their names; the S25 strip at 3x; the S33 corner mark at 4x; the power
  tree as-built flattened onto the paper colour at full size and again across
  its top band.
- Console clean on every run, and no GSAP target warnings.
- S28 to S34 walked as a regression check after the part-3 script was edited:
  step counts unchanged, console clean.
- `?view=presenter` renders S25, S26, S27, S35 and S36 and builds the next-step
  preview without throwing.

#### (ab6) Left as found

- `.p3-read`, `.p3-read-v`, `.p3-read-u` and `.p3-read-l` in the part-3 style
  block are now **dead CSS**: S27 was their only user. They are four harmless
  rules in the "shared pieces" section and were left in place rather than
  widening the diff.
- S27's speaker notes, rewritten to match the new slide, are still taller than
  the presenter panel. Same open item as (z6) names for S14, S16, S19 and S20.
  The panel scrolls.


---

### (ac) Integration rebuilt as one running record: S28 to S30b, and the Part III-B divider — 2026-09-22

Sirio, on the three integration slides: *"These slides are about the
integration, and I would like a complete re-structuring of these ... show all
the pictures distinguishing between the things that have been built for the
integration ... I think that here we can apply the concept of actually having a
bar on the bottom, that will keep a picture of everything we show, like one per
category ... please shrink them not crop them ... a small text that describes
them (3-4 words max! not a description, but a small title!) ... use different
colors for each of them ... then only one, the most significant, goes on the
bottom."*

#### (ac1) The device

A new dialect, **`record`**. Every S28 to S30b slide carries the same four-slot
bar along the bottom. The slots a slide has already earned are simply present at
step 0 — **no slide restarts the bar from empty** — and the one it earns is the
only one that animates: it starts at the big picture's own position and scale
and tweens down into its slot, 178 by 100, with its colour chip fading in under
it. A thin rule sits above the bar and arrives with the first picture that lands
on it.

Geometry, fixed once in the part-3 style block: kicker at y 196, pictures 224 to
504, rule 516, bar frames 550 to 632, chips 640 to 669. **Everything is above
y 684**, because the section rail occupies [991, 691] to [1214, 706] and the
slide number [1230, 684] to [1254, 705] — measured in the page, not guessed. A
first attempt put the bar 34 px lower and the fourth chip ran straight through
the rail.

Every picture sits in a box carrying **that image's own pixel ratio** with
`object-fit: contain`, so growing, shrinking or swapping a box can never crop
the photograph. Same rule as the S27 rebuild in (ab3).

#### (ac2) The four categories and their chips

| Slot | Picture | Chip | thread colours |
|---|---|---|---|
| 1 | `device/carriers-rear.jpg` | **Pump and storage carrier** | `#ff6b2b` / `#e83535` |
| 2 | `nozzle/mounted-front.jpg` | **Nozzle in place** | `#4fb3c8` / `#3a7bd5` |
| 3 | `ui/display-side.jpg` | **Screen and stylus holder** | `#9b7fe0` / `#5a8fd8` |
| 4 | `device/battery-loaded.jpg` | **Battery cradle** | `#4fc38a` / `#3aa87a` |

The chips are `.callout.callout--lite` — the dark-ink-on-a-light-plate idiom
from S20 — with the thread colours set **inline on the bar item**, so one rule
serves all four and the frame border takes the same colour. The fourth is a
green picked to sit with the deck's three thread accents without colliding with
any of them; it is also the colour the verdict table already uses for "met".

#### (ac3) How the four categories were distributed

- **S28**, the pump and storage carrier, five steps: the central carrier empty,
  front and back, on entry; the two arrows, pump from above and vial from the
  front; loaded; the left carrier with the flange circled; mounted on the
  machine; and the carrier drops into slot 1.
- **S29**, two categories. The nozzle gets **one picture and no sequence**, as
  asked, because the module was shown in Part II; it goes straight into slot 2
  on the first click. Then the screen holder in CAD, then on the front of the
  machine at 45 degrees, then slot 3.
- **S30**, the battery cradle: the cradle; on board; slot 4, which completes the
  record; and the outdoor run on battery as the payoff.
- **S30b** (new): the completed record under the finished machine.

#### (ac4) S30b, the new slide

Cue **`s30b`**, `data-part="III"`, `data-map="integration"`. Title: *Four joints
turn the modules into one object of 3.3 kilograms* — the thesis's own framing,
three printed assemblies plus one printed boss. `device/top.jpg` and its two
numbers came off S30 and are the hero here, whole and uncropped at 497 by 280,
with the width and depth leaders drawn on it.

**The leaders' labels are HTML chips over the plate, not SVG text** — rule (x).
The old S30 overlay used SVG text at font-size 54 in a 2000-wide viewBox, which
at this plate size would have been 15 px; the chips are 18 px whatever the plate
does. The mass counts up beside the picture with two lines under it, and the
last step says plainly what is missing: 2 of 6 channels, breadboards not a PCB,
no enclosure.

#### (ac5) S37a, the Part III-B divider

Cue **`s37a`**, first in `parts/50-discussion.html`. Eyebrow **Part III-B**,
title **Discussion and Outlook.** Sirio: *"just a plain title for now, as
discussion and outlook are intertwined"*, so it has the wash, the typography and
the rule every other divider has and **no journey strip, no symbols and no
travelling dot**. The section rail in `parts/99-tail.html` already read
`Part III-B` and was not touched.

#### (ac6) Two thesis figures replaced by clean renders

`assets/figs/fig-display-holder.png` and `fig-battery-cradle-cad.png` carry
their own **printed labels** — "Pin-header holes", "a) Top", "Screw holes,
re-cut for M3". At the sizes these slides can give them, those labels render at
seven or eight pixels, and the deck's own chips landed on top of them. Both were
swapped for the unannotated renders that already exist in `assets/media/`:

- S29 now shows `ui/display-holder-cad-front.png` and
  `ui/display-holder-cad-side.png` side by side, annotated with **about ten
  prints** and **split on a dovetail**;
- S30 shows `device/battery-cradle-cad.png` with **re-cut for M3**.

Same class of defect as the power-tree legend in (ab3); worth remembering that a
thesis figure with print annotations usually cannot be used at deck size.

#### (ac7) A trap worth recording: entry hooks fire after the seek

`goToSlide` calls `driveTimeline(el, step, entering)` — which **seeks** the step
timeline to its label — and *then* `runEnterHooks(el)`. An entry hook that
animates something the step timeline also owns therefore wins, and walking
**backwards** into a slide replays the opening beat over a settled late state:
coming back into S29 from S30 made the nozzle photograph reappear at step 4.

The fix is a guard, `stepOf(el)`, which counts
`.fragment[data-fragment-revealed]` on the element. Above zero, the hook sets
its settled values with `gsap.set` and returns. It reads correctly on the
presenter's preview clone too, because the preview sets the same attribute on
the clone before calling the hooks.

Also: `gsap.fromTo` defaults to `immediateRender: true`, and the flag is read
from the **second** vars object. A `from` state that is visible and displaced —
which is exactly what the bar flight is — must carry `immediateRender: false`
**in the `to` vars**, or the element paints at the source position the moment
the timeline is built. Putting it in the `from` vars does nothing; that cost a
build.

#### (ac8) What was dropped

- The S29 **45 degree eye-line diagram**, the plate hinging under an eye line.
  The bar took the bottom band and the diagram's own SVG text would have fallen
  under 18 px at any width that fitted beside the photographs. The 45 degrees is
  carried by the title, a chip on the photograph and the speaker notes.
- The S29 `lines-over-rack.jpg` photograph and its "450 mm, unguided" callout.
  The 450 mm line survives in the speaker notes; the picture has no room in a
  slide that now carries two categories.
- S30's four-panel `sheet__rail` of text, its `inside-right.jpg` breadboard
  photograph and the "breadboards, no charge sensing" callout. The honest
  statement moved to S30b's last step as three chips and is still in the notes.
- Dead after this and removed with their slides: `.p3-tile`, `.p3-col`,
  `.p3-diag` and the `#s29-diag` / `#s30-top` font rule. `.p3-read*` stays dead
  from (ab6).

#### (ac9) Step counts

S28 4 to **5**, S29 4 to **4**, S30 4 to **3**, plus **S30b** (2) and **S37a**
(0). Deck totals: **77 slides**, 50 in the talk.

#### (ac10) Left for whoever owns `parts/99-tail.html`

`SLIDE_ORDER` still lists the old cue sets. Two rows need the new cues; the
table in `SLIDE-ORDER.md` section 1 already has them:

    { band: 'Part III — The machine',
      key: 'integ',     topic: 'Integration',                     thesis: 'chapter 11',
      cues: ['s28', 's29', 's30', 's30b'] },          // s30b added, last

    { band: 'Discussion and close',
      key: 'disc',      topic: 'Discussion and reflection',       thesis: 'chapter 13',
      cues: ['s37a', 's37', 's38', 's39'] },          // s37a added, first

Until then the section 2 fallback keeps both slides in the overview — each
inherits the group of the slide before it, which happens to be the right one —
so nothing is lost, but the array and the table disagree.

#### (ac11) Verification

- `python assemble.py`: **77 slides**, no duplicate cues, no warnings.
- Private headless Chrome over CDP at 1280 by 720 (`--remote-allow-origins=*`,
  `suppress_origin=True`, a fresh user-data-dir and port per run, killed with
  `taskkill /F /T`), against `http://localhost:7331/`.
- Every clicker position of S28, S29, S30, S30b and S37a walked forward and
  backward, screenshot at each, **every screenshot looked at**. S27, S31 and S37
  walked as a regression check: step counts and layout unchanged.
- Entry timelines forced forward before judging, per (aa).
- A separate **real backward walk** with `Deck.retreat()` from S31 down through
  S28, sixteen positions, which is what caught the entry-hook trap in (ac7).
  Clean after the guard.
- Programmatic audit at every position: **no descendant outside the slide box**
  and **no text below 18 px**, both normalised by the 0.868 stage scale.
- Crops inspected by eye at 2.6x and 3x: the slot-1 thumbnail against its own
  full-size photograph (identical framing, whole image, both edges present), and
  the completed four-slot bar in two halves — all four images whole and
  recognisable, all four chips legible and visibly different colours.
- Console clean on every run except a 404 for `/favicon.ico`, which is
  pre-existing and unrelated.
- `?view=presenter` renders all five slides and builds the next-step preview
  without throwing.

---

### (ad) Part III measured against the thesis: S31 to S35, the verdict board, and the SVG-text defect of (x) closed — 2026-09-22

Several sessions, one pass. Sirio reviewed S31 to S35 slide by slide, a separate
session fact-checked the whole of Part III against the thesis for the first time,
and the S31 rebuild happened to find the root cause of the defect recorded in
**(x)** as never found. Everything below is in `parts/40-part3.html` unless it
says otherwise.

#### (ad1) S35 — four clips, no clicker steps

Retitled **`The machine is operational and ready to run live.`** The four labels
are now **`nozzle close-up`**, **`motor spinning`**, **`timelapse run`** and
**`battery run outdoors`** — what each clip shows, not what file it came from.

**All four clicker steps came off.** The slide had been growing a clip per press,
which meant four presses between the mosaic and the demo, and a clip enlarging
itself while Sirio was still talking about the one beside it. There are now no
`.fragment` elements at all: a plain press advances to S36, and a clip grows only
when that clip is clicked (Escape brings the mosaic back). The speaker note says
so, because it is the one slide in the deck where a press does not do what the
rest of the deck trained the presenter to expect.

Removing the auto-enlargement left the mosaic lopsided — the geometry had been
drawn around whichever tile was about to grow. The outdoor clip is now **centred
under the two landscape clips above it** (`left:568px`, 453 x 255, against 421 x
237 tiles at x 366 and x 803), with the portrait clip holding the full-height
left column. It carries the sound, and it is the only clip that does.

#### (ad2) S34 — the verdict board, retitled and rewired

**The title was wrong, not merely long.** It claimed *six requirements met*;
`tab:validation-verdict` lists **five Met plus one By design**, and the board's
own chips have always been five `is-met` and one `is-design`. A title that
miscounts the table beneath it is the worst kind of error to leave on a
projector, so it is gone: the slide is now titled **`Requirement Evaluation`**
and the board speaks for itself.

**There are three pills, not two.** They were capitalised to **`Enclosure`** and
**`Circuit Board (PCB)`**, and a third, **`Cleanable materials`**, was added on
**Sirio's approval, 2026-09-22** — see the routing below for why. All three are
**300 px wide and 52 px tall on the y 596 row**, evenly spaced across the content
width: `left` **56**, **490** and **924**, right edge 1224, 134 px between them,
centres **206 · 640 · 1074**. Those centres fall roughly under chip columns 1,
3 and 5, so each pill sits beneath the region it serves and every drop into one
is short. Left to right: `Enclosure` · `Cleanable materials` ·
`Circuit Board (PCB)`.

**The leader lines were rewired.** Sirio: *"they go over the text."* They did:
four diagonal Béziers swept across the board and crossed the chip labels they
were supposed to be reading from. The routing is now orthogonal, and the geometry
is worth recording so the next person does not have to re-derive it:

- The five chip columns occupy **56–272, 292–508, 528–744, 764–980,
  1000–1216**. The gutters between them are the only vertical space a line may
  use.
- Every chip row is 62 px tall at y **228, 296, 364, 432**, so chips end at
  **y 494**. The pills sit at **y 596**.
- A line leaves its chip by a **free edge**, runs sideways into the adjacent
  gutter, drops down that gutter, and reaches its pill in the band below the
  y 494 chip floor and above the y 596 pill line. Two **collector rails** and
  one straight drop carry the four:

  | To | Route |
  |---|---|
  | `Enclosure` | Operating envelope leaves its right edge at y 259 into gutter **x 754**; Wind leaves its right edge at y 327 into gutter **x 985**; both drop to the **y 552** rail, which runs left to **x 206** and down to the pill |
  | `Cleanable materials` | Cleanability leaves its right edge at y 395 into the same gutter at **x 995**, drops past Wind to the **y 574** rail, which runs left to **x 640** and down to the pill |
  | `Circuit Board (PCB)` | Electrical safety leaves its own **bottom** edge at **x 1074** and falls straight to the pill. Column 5 has nothing under it, and the pill centre is already at x 1074, so a rail would only have added two corners |

  Wind stops at 552 and turns left; Cleanability passes it **10 px to its right**
  and turns left at 574, so **no rail crosses another line's vertical**. Both
  verticals sit inside the 980–1000 gutter with clear air on either side —
  checked at 3x, they read as two separate lines and neither touches a chip
  border.

**Cleanability was taken off the Enclosure bundle, because that bundle was a
false claim.** It had been teed onto Wind's drop at x 990, sharing Wind's
destination. But `tab:validation-verdict` gives three different bases for the
three: Operating envelope *"No enclosure or climate control"*, Wind *"No
enclosure"*, and Cleanability **"PLA fused-filament parts are not a cleanable
surface."** Ch. 13 resolves it with material, not packaging — *"metal with
certified clinical roughness, or high-performance engineering plastics such as
polypropylene"*. **An enclosure is the one change that would not fix
cleanability**, so the slide was asserting something the thesis contradicts.
Sirio approved the third pill on 2026-09-22 and it now has its own line and its
own destination.

**Versatility carries its asterisk.** The thesis marks it **Met\*** with the
footnote *"The `5 µL` lower bound is not yet validated but expected to pass"*,
and the deck was showing a bare `met` — which S37 then contradicts on screen
ten slides later with `5 µL lower bound — not verified`. The chip now reads
**`met *`** (still 18 px mono) and a new `.p3-fnote` line at (56, 508), 18 px,
660 wide, carries **`* the 5 µL lower bound is not yet validated, but is
expected to pass`**. It fades in with the Performance group and dims with it,
and at 660 px it sets on one line. Its box is x 56–716, y 508–531, which puts
it **21 px above the y 552 rail** and above both pill drops (x 206 starts at
552, x 640 at 574), so nothing passes through it. The speaker note matches.

The excluded-requirements bullet in the notes was rewritten with the third pill:
four are excluded honestly and **not for the same reason** — two wait on an
enclosure, one on a real circuit board, and one on a material that can be
sanitised, because PLA is not a cleanable surface and a field machine needs
metal or polypropylene on the sliding faces. None of the four waits on the
mechanisms.

#### (ad3) S31 — the accuracy chart rebuilt around the recalibration

The chart was relaid in an **820-wide** viewBox. The tolerance band is labelled
**`10 % limit`** rather than the old signed form, and the centrepiece is the
orange **`after recalibration`** bracket gathering the two channel bars — the
slide's argument is not that the numbers are small, it is that recalibrating the
per-stroke constant on the assembled instrument is what made them small.

Beside the chart: the landscape **`machine-dispensing.mp4`** with the
**`weighed in the tube`** chip, because the tubes were capped and weighed as they
stood in the rack; and a **per-stroke panel** giving **3.94 µL** and **4.10 µL**
for the two assembled heads, about 10 % under the isolated bench head, which is
the shortfall the recalibration absorbs.

**Two things were taken off the slide.** The **0.27 % manual-pipette comparison**
— true, and Ch. 6's own figure, but it is a second argument and it was competing
with the recalibration for the same eye. And the **session-to-session drift
group** (+1.3 % / −5.0 %), which is now spoken rather than drawn; it is the
answer to a question, not part of the claim. Both survive in the speaker notes.

One naming trap, recorded in the fact-check pack and repeated here because it is
easy to walk into: **+1.3 % appears twice in the thesis with two different
meanings** — in Ch. 6 `tab:pump-two-heads` it is Channel 1's calibrated error
(paired with −4.5 %), and in Ch. 12 it is the drift of a per-step constant
between sessions (paired with −5.0 %). The deck uses the Ch. 12 pairs
throughout. A question must not be allowed to pull the Ch. 6 pair onto this
slide; they are a different campaign.

The single `−18 %` bar is deliberately not offered as a third measurement of
the same precision as −3.4 and +0.6: its row is labelled **`with the bench
constant`** and the spoken line says *"about 18 % short"*, matching Ch. 12's own
*"roughly 18 per cent"*.

#### (ad4) The cause of (x), found — Chrome does not re-lay-out SVG text inside a hidden group

**(x) recorded a defect whose root cause was never found.** The S31 rebuild hit
it again, in a form that could be isolated, and the cause is now known.

**Chrome does not re-lay-out SVG `<text>` that sits inside a `<g opacity="0">`
once the stage transform has been applied to an ancestor.** The layout it keeps
is the one from before the scale. Everything that can be asked about the node
agrees with that stale box — `getBoundingClientRect()`, `getBBox()` and the
element's own screen CTM — while the glyphs paint somewhere else entirely. On
S31 the error was exactly the stage scale: **x off by 1/0.868 and y by ~1/0.875**,
which put the `dose to dose` labels off the bottom of the card while every
measurement insisted they were inside it.

**The automated audit cannot see this.** It reads the same rect the browser
reports, so the out-of-box check passes on a slide that is visibly broken. That
is the whole reason (x) survived two attempts and a verification pass: two
independent measurements agreed with each other and both were wrong.

What finally pinned it down was **cloning the node at runtime and inserting the
clone**: the clone, laid out fresh after the transform, rendered in the right
place, while the original did not move. Same markup, same viewBox, same
ancestors — the only difference was when layout last ran.

**The fix is a rule, not a patch:** never wrap SVG text in a hidden `<g>`. Put
`opacity="0"` on **each element individually** and animate them as an array.
S31's `dose to dose` group is now six independent nodes sharing a `.s31-cvi`
class, with a comment in the markup saying why.

The deck was swept for the pattern. **S31 was the only instance.** Four
`<g opacity="0">` groups remain, all four on S33 — `#s33-ghost`, `#s33-batt`,
`#s33-rot` and `#s33-beads` — and **none of them contains a `<text>` node**;
they are circles, rects and paths, which lay out correctly either way and were
left alone.

**(x)'s own conclusion still stands and is still the preferred idiom:** where the
plate and the viewBox are 1:1, annotate with an **HTML chip positioned over the
plate**, not with SVG text at all. This entry explains why (x)'s two in-SVG
attempts measured as correct and rendered as wrong; it does not make in-SVG text
a good idea.

#### (ad5) S32 and S33 — two rebuilds on Sirio's notes

**S32.** Verbatim: *"what is the 5mm that you are showing? where did you
hallucinate it? ... '3 of 40 landed on the deck', what is this??? Bro this is
hallucinated. These are droplets that landed out of the tubes. You have to state
that. And it should be completely separate from the tubes, is totally another
information."*

- Retitled, his words: **`Unattended dispensing validated across five racks and
  forty tubes.`** (`--head-h:48px` for the two-line set.)
- The 5 mm was first *labelled* rather than removed: it is real — Ch. 12,
  *"inside the `5 mm` target radius the nozzle is specified against"* — and
  the bare `5 mm` chip read as a measured spread, so it became
  `5 mm target radius`. **Sirio then cut it the same day**: *"5 mm radius:
  remove that thing, it doesn't matter."* The chip, the `#s32-target` ring,
  the `#s32-ov` overlay, the `#s32 .callout` rule and the sentence in the
  speaker notes are all gone. See **(ae1)**.
- **The two facts were separated, which was the actual complaint.** `#s32-sub`
  (`100 µL and 75 µL in every tube`) and `#s32-miss` had been sitting at the
  *same coordinates*, one replacing the other, which is what fused a tube result
  with a droplet count. The forty-tube result and its two volumes now stay on
  screen, and the misses moved into their own dashed block, bottom right, in its
  own register: a new `.p3-aside` — label **`OFF TARGET`**, then **`3 droplets
  wetted the rack or the lane`**, then **`counted apart from the cap fouling`**.
  Droplets, not tubes; *rack or lane*, as the thesis says both times; and the
  cap fouling explicitly fenced off, because Ch. 12 begins that sentence *"Apart
  from the tube-lid fouling described below"* and S33 then presents the cap as
  its own failure. The old chip double-counted it.
- **The invented time is gone.** `#s32-done`'s alt claimed *"the screen reading
  done at eleven minutes six seconds"*. **No run duration is published anywhere
  in the thesis**, and the same `11 min 06 s` is on the screen in the photograph
  of the *aborted sixteen-tube battery run*, so it cannot be attributed to this
  run on the strength of the picture either. The alt now ends *"the screen
  reporting the batch done"*, and the notes carry a line saying to answer "the
  thesis does not report one" if asked.
- **Step count 4 to 5, then back to 4.** The OFF TARGET block got its own beat
  rather than arriving with the rack-comparison thumbnails; landing two
  unrelated facts on one press is the thing being fixed, so it would have been
  odd to re-create it one row down. Deleting the 5 mm beat later the same day
  returned the slide to **4 steps**: 0 title, 1 before, 2 after with the count
  and the volumes, 3 rack thumbnails, 4 OFF TARGET. No press is empty.
- Recomposed around the new block: plate 668 x 376 at (56, 206), video 384 x 216,
  tube thumbnails 120 to **84 px** and lifted to y 596 (bottom 680, was 700, and
  the section rail and slide number live at about y 684).
- **The plate is no longer cropped.** `validation-start.jpg` is 1.631 in a 1.777
  frame and `object-fit: cover` was cutting the top and bottom off the "before"
  state — a full clicker position — which is the standing rule of (z1) broken.
  The frame now carries `p3-frame--contain`, so both photographs are shrunk to
  fit: the "after" frame matches the box and still fills it edge to edge, so the
  crossfade is untouched, and the "before" frame pillarboxes by about 27 px a
  side. Those bars would have been
  `var(--paper)`, `#f6f3f0`, two near-white slabs glowing on a dark stage, so the
  frame also took `p3-frame--dark`: at `#0d0f12` they read as a letterbox and all
  but disappear.

**S33.** Verbatim: *"'The Battery': I like the animation, but I don't get the two
circles there... They are not in the right spot, please move them to the right
where there is white space. And you should show both of them a bit vibrating
(showing that they are stuck), and then one still and the other moving. 'The Cap'
you have cropped the image badly, as the other cap is not shown, missing the
whole point."*

- Retitled, his words: **`The three failure modes were cap friction, battery
  depletion, and septum leakage.`** (`--head-h:40px`; rule at y 178, cards still
  open at y 200.)
- **The cap card follows its picture.** `lid-fouling.jpg` is 1600 x 1420, ratio
  1.127, and it was sitting in a 212 px `object-fit: cover` box — which cropped
  away the second cap, the entire point of the photograph. A new
  `.p3-fcard--fit` modifier sets `object-fit: contain`, and the card carries the
  image's own geometry: **active 384 x 480, media 384 x 340** (media ratio 1.129
  against the file's 1.127, so the letterbox is under a pixel), foot 140 px,
  bottom at y 680 inside the 200–684 band. Its overlay went from
  `preserveAspectRatio="slice"` to **`meet`**, so anything drawn in the image's
  own 1600 x 1420 space lands on the right pixels. **The annotation that used
  that space — the reference line, the 135° arm, the arc, the ghost and the
  falling drop — was replaced later the same day** by the two-cap comparison
  of **(ae2)**; the geometry note stands, because the new marks are authored in
  the same coordinates.
- **`layout()` is now per-card and the row is centred.** It had assumed one
  shared `W_BIG` and one shared height, which a narrow first card breaks. There
  is now an `ACT` array (`{w, h, mh}` per card) and one `IDLE`, and `rowX0()`
  centres the row from the widths it is about to use: **X0 = 174** when the cap
  card is active, **66** when either of the others is. The other two cards keep
  600 px active, 254 px idle, 384 px tall.
- **The battery graphics came off the photograph.** The two rotors were at
  cx 300 and 392 in a `600 x 340` viewBox that the `meet` fit squeezed into the
  middle 374 px of the media box — so they sat over the machine, in a coordinate
  system that did not correspond to anything in the picture. The overlay viewBox
  is now **`0 0 600 212`**, the active media box in its own pixels, so a
  coordinate means what it says at any card size; the battery icon (454, 48) and
  the two rotors (cx **474** and **536**, cy 148, r 24) now sit on the **empty
  bench to the right of the machine**, where they read at stage scale.
- **The motion was built in the order Sirio first asked for** — both rotors
  juddering, then one alone turning — and he corrected the order himself a few
  hours later: *"I misled you on the animation."* It now runs full-and-both-
  spinning, then drained-and-both-seized, then one alone. See **(ae2)**.
- The septum card's mechanism was left alone in this round, with one exception:
  its `0 punctures` SVG text now starts at `opacity="0"` and fades in at step 2.
  At the 254 px idle width it was rendering at about **13.5 px**, under the
  floor, on two positions where nobody was looking at it. The needle itself was
  rebuilt in the next round — **(ae2)**.

#### (ad6) The fact-check pack — `research/part3-verification-2026-09-22.md`

**The first audit Part III has ever had.** Every on-screen string, number, chip,
callout, SVG `<text>`, builder-typed string, `aside.notes` bullet and image `alt`
in `parts/40-part3.html` and `parts/50-discussion.html` checked against the
thesis chapters read in full (10, 11, 12, 13, 14, App-N, App-Q) plus the parts of
4, 6 and 7 that a deck claim depends on. Two photographs were read pixel by pixel
because an `alt` made a claim about what a screen said.

**96 supported · 10 misstated · 1 not found**, plus two attribution gaps and
three places where a true number was on screen without saying what it was.
Part III invents almost no numbers; its failures are **naming**. Applied:

| Slide | Was | Is |
|---|---|---|
| S26 | "and a **shaker**" | "and a **vibration motor**" — the ninth actuator is the nozzle vibration motor; in this thesis "shaker" is the benchtop plate shaker the machine exists to spare the operator (Ch. 1, App-A), so it was the one word that meant the opposite of the sentence |
| S27 notes | "Production: **a 24 V pack**" | "a **regulated USB-C power bank** feeding a 24 V motor rail" — Ch. 10 specifies a 140 W / ~86 Wh / 28 V PD bank and argues explicitly *against* a raw pack, which sags under motor load; only the rail is 24 V |
| S28 notes | "**the vial** slides in from the front" | "the **storage module** slides in from the front" — the vial is the glass container inside it; the slide's own `alt` already had it right |
| S31 | a bare rounded figure | "about 18 % short", against a row labelled `with the bench constant` — Ch. 12 says *roughly* 18 %, and the per-channel figures (−19.5 / −17.8) live in Ch. 6 |
| S32 | "3 of 40 landed on the deck" | "3 droplets wetted the rack or the lane", in its own block — see (ad5) |
| S34 | `Versatility / met` | `Versatility / met *` with its footnote — see (ad2) |
| S37 | "The **reference protocol**, run with its own reagents" | "The **PANPOC protocol**, run with its real reagents" |
| S38 | the syringe pump counted as a build | "4 rotary, 1 linear · **syringe benchmarked**" — it was benchmarked, not built |
| S40 | tile 01 "Pump · **Vial** · Nozzle" | "Pump · **Storage** · Nozzle" |

The pack's own summary line miscounted S34 as *"6 met / `is-met` ×6"*, which is
the same miscount that put "Six requirements met" in the old S34 title. It has
been **corrected in place**, with a dated note saying what it first read, so the
count in the pack cannot be quoted back as evidence for the title it helped
produce.

#### (ad7) Left open, for Sirio to judge

Two decisions, neither safe to take without him, plus one pre-existing cosmetic.
A third — S34's Cleanability pill — was open when this entry was first written
and **Sirio approved it the same day**; it is applied, the record is in
**(ad2)**, and it has been struck from this list. The live list, with the two
items the second round added, is **(ae8)**.

- **S33 · whose septum is it.** Ch. 12 fences the third failure off explicitly:
  *"**A separate weakness belongs to the storage module:** its vial septa lose
  their seal after repeated puncture."* Reagent storage is the only module in the
  instrument Sirio did not design — Ch. 11: *"Marius designed and built it in a
  companion project, transferring it as functional hardware."* As the card and
  the note stand, the leak reads as a failure of his own design. *"The third is
  not mine"* is also the stronger line to say out loud.
- **S28 · the same boundary, unmarked.** The slide's subject is the carrier,
  which is correctly his. But it puts **five images and two `alt` texts** of
  Marius's hardware on the screen, calls out his green air-line filters by name,
  and Part III credits him nowhere. If Part II's credit line is more than one
  slide back, a viewer attaches it to Sirio by default. One clause in the notes
  would close it: *"the storage module inside it is Marius's design, transferred
  as hardware; the carrier around it is mine."*
- **Pre-existing, not touched:** on **S40**, tile 01's subtitle wraps — "Nozzle"
  falls to a second line. Today's edit changed the word `Vial` to `Storage` and
  did not cause it. Fixing it means widening the 260 px tile at `left:66px`, and
  the tile's left edge is 10 px from the carriage start at **x 326**, so the
  wire's first segment (`#d40-w1`, `M 326 400 L 352 400`) and the carriage's
  start `cx` move with it. Both live in `parts/50-discussion.html`.

#### (ad8) Verification

- `python assemble.py`: **77 slides**, no duplicate cues, no warnings.
- Private headless Chrome over CDP at 1280 x 720, own port and user-data-dir per
  run, killed with `taskkill /F /T`, against `http://localhost:7331/`. Every
  clicker position of the rebuilt slides walked forward and then backward, a
  screenshot at each, **every screenshot looked at** — which is the only thing
  that catches the defect of (ad4), because the programmatic audit cannot.
- Entry timelines forced forward before judging, per (aa).
- Programmatic audit at every position: **no descendant outside the slide box**
  and **no visible text below 18 px**, normalised by the 0.868 stage scale.
  S26, S27, S28, S32, S33 and S34 walked as one set: 54 positions, **0 findings,
  0 console errors**.
- Crops inspected by eye: the `5 mm target radius` ring at 4x, still concentric
  on the same dyed tube opening after the `contain` change; the OFF TARGET block;
  the cap card whole, with both caps present and the 135° annotation landing on
  the lower tube; the S34 footnote, widened from 520 to 660 px after it wrapped
  to two lines and ran down onto the y 552 rail.

---

### (ae) Sirio's second pass on Part III, S37 and S38 rebuilt, and the pump attribution — 2026-09-22

The same day as **(ad)**, and largely a correction of it: Sirio reviewed the
rebuilt slides, cut one thing outright, reversed one animation he had himself
asked for the wrong way round, and approved the third S34 pill that (ad7) had
left open. S37 and S38 were rebuilt alongside. Files: `parts/40-part3.html` and
`parts/50-discussion.html`.

#### (ae1) S32 — the 5 mm is gone, and the slide is back to four steps

Verbatim: *"5 mm radius: remove that thing, it doesn't matter."*

Out: the `5 mm target radius` chip, the `#s32-target` ring it labelled, the
`#s32-ov` overlay that held nothing else, the `#s32 .callout` rule that had no
remaining user, one `.fragment`, and the 5 mm sentence from the `aside.notes`.

**Four clicker positions, none of them empty:** 0 the title, 1 the machine
before the run, 2 the machine after it with `40 tubes` and
`100 µL and 75 µL in every tube`, 3 the first-rack/last-rack thumbnails, 4 the
OFF TARGET block. Everything else on the slide is as **(ad5)** describes it —
the OFF TARGET block untouched, the run-time claim still out of the `alt`, both
plate photographs still `object-fit: contain` on a dark ground.

#### (ae2) S33 — three motion notes, three rebuilds

**The cap card: the falling dot is gone, and the two caps are compared
directly.** Verbatim: *"the cap part, there is an orange dot dropping, what is
it supposed to represent? I don't really like that animation. Please show
instead the difference between the other cap that is bent, and the one actually
touching the wall which is not."*

Deleted: `#s33-drop`, and with it `#s33-ref`, `#s33-arm`, `#s33-arc` and
`#s33-ghost`. They were authored against the **cropped** view and the ghost was
a hypothetical — a rotated copy of the arm showing where a flat cap *would*
swing to — which is exactly the kind of drawn speculation that reads as
evidence.

The photograph was re-read off a coordinate grid rendered over the file at its
own 1600 x 1420 pixel scale, because the card is no longer cropped and both caps
are in frame. There are exactly two:

| Cap | Image coords | What the pixels show |
|---|---|---|
| folded back | **(828, 338)** | the cap's cylindrical skirt is visible below the disc and it casts a hard shadow — it is standing clear of the deck |
| left flat | **(1165, 548)** | full circular face, flat shadow directly beneath, projecting sideways from its tube across the open deck |

The annotation is now two ellipses and an arrow, shapes only, in the image's own
coordinates: `#s33-good` at (828, 338), rx 132 ry 122, stroke **`#4fc38a`**;
`#s33-bad` at (1165, 548), rx 152 ry 114, stroke **`#e83535`**; and `#s33-reach`,
a short arrow continuing the tube-to-cap axis out to **(1416, 431)**, towards the
lane wall and the toothed drive rack at the top right. Green and red are the
deck's own verdict colours from the S34 board, and against white plastic they
read where the previous off-white stroke did not. The chips are unchanged in
kind — HTML `.callout`, never SVG text — but re-sited and re-worded:
**`135°, folded back`** at 25 %/4 %, above its ring, and
**`flat: it rubs the wall`** at 33 %/60 %, under the red one. Two beats inside
one press: the good cap, then the bad one and its reach.

The first placement put `135°, folded back` straight over the ring it labels —
the chip had been positioned for the two-character `135°` and then given
fourteen more characters. Caught by looking at the screenshot, not by the audit,
which has nothing to say about a chip covering a circle.

**The battery card: the order was wrong, and Sirio said so himself.** Verbatim:
*"very good placement. However, I misled you on the animation. First, when the
battery is full, both the pumps should be spinning, when the battery drains,
they should be stuck, and then finish with only one spinning."*

Three phases now, in that order:

1. **full, both running** — `batfill` at its full 78, both spoke groups turning
   0 → 300° over 1.3 s, linear;
2. **draining, both seized** — `batfill` 78 → 7 over 1.3 s while both rotor
   groups judder (±2 px, 16 and 18 plays) and their spokes twitch 300 ↔ 307 and
   300 ↔ 293 without ever coming round;
3. **one alone** — `#s33-rotA` dims to 0.4 and stays dead, `#s33-rotB` turns
   300 → 653°, a full further revolution.

All rotations are **absolute**, not `'+=360'`, so seeking and reversing land on
the right angle. The placement on the empty bench at the right of the
photograph, and the `0 0 600 212` overlay viewBox that made it addressable, are
unchanged from (ad5) — he explicitly praised the placement.

**The septum card: the needle now pierces, five times.** Verbatim: *"Actually
please show the needle go a bit more down to actually touch the septum, and stay
and show that it punctures it, multiple times."* It had dipped once, stopping
short of the disc, and retreated.

The needle travel is now `y -70 → 44`, which puts the tip at **172** in the
card's `600 x 340` viewBox — inside the r 104 disc centred at **196**, not
above it. Five cycles at 0.52 s spacing from `step2+=0.45`: down 0.18 s
(`power3.in`), hold 0.16 s, up 0.18 s, one puncture mark on each entry.
The remaining fifteen marks follow at `step2+=3.25` with a 0.045 s stagger, and
the droplets on the needle tip at `step2+=4.10`.

**The readout was counting faster than the marks appeared.** A single
`counter(0 → 5)` spanning the dips showed `4 punctures` over one dot. There is
now one counter call per dip, `d → d+1`, fired at that dip's entry, so the
number and the marks always agree; the first call carries the singular suffix,
because `1 punctures` on a projector is the kind of thing that gets noticed.
The five/twenty bounds and the card foot are untouched.

**Step count unchanged at 3.** The two cap beats share one press, as the card's
internal sequence always did.

#### (ae3) S34 — the third pill, approved

Sirio approved `Cleanable materials` on 2026-09-22 and it is applied. The pill
row, the re-routing and the reasoning are recorded in **(ad2)**; it is not
repeated here. It has been struck from the open list in (ad7).

#### (ae4) S37 — a title that the rule was striking through

Retitled **`The prototype proves the concept, not a finished instrument.`**,
which is Ch. 14's own sentence read forward. At 44 px it sets on two lines, and
the slide carried `--head-h:0`, so `.slide__rule` sat at y 138 and drew straight
through the descenders of the second line. `--head-h:48px` moves the rule to
y 186, and `#s37 .d37__rows` went **190 → 212 px** so the ledger clears it.

#### (ae5) S38 — the strategy table advances a row at a time

Retitled **`The pump balanced breadth and depth; the alignment module built only
one concept.`**

The two-by-two of breadth against depth used to arrive whole. Sirio asked to
present it, so it now advances **one row per press, Depth first and then
Breadth** — the order of the argument, not the order of the heading. Each row
is a `data-row` group (`d38__rl` label plus two `d38__cell`s) and the builder
reveals them in sequence. **Step count 5 to 6.**

The pump column was rebuilt as **three concepts with a picture each**, left to
right: the linear pinch pump, the benchmarked syringe pump, and the rotary head
that was chosen. Every frame is `object-fit: contain`, so nothing is cropped to
its box.

#### (ae6) The pump attribution, with the sources written down

This is the part worth recording, because it will be re-derived otherwise.
**Chapter 6 §6.1.3** states that two peristaltic concepts were carried to
functional hardware in parallel: the rotary one developed in this thesis, and
*"a linear peristaltic chamber pump developed in the companion thesis by
Marius"*. **Chapter 6 §6.1.2** states that the syringe pump was **benchmarked
on a commercial laboratory instrument** and never built.

So the three slots on S38 carry three different claims, and the captions say
which is which:

| Slot | Caption | Status | Source |
|---|---|---|---|
| Linear pinch | `Marius's, built` | built, in the companion thesis | Ch. 6 §6.1.3 |
| Syringe pump | `benchmarked` | never built; a commercial instrument was measured | Ch. 6 §6.1.2 |
| Rotary | `mine, chosen` | four builds; won 3485 to 3185 | this thesis |

**There is no photograph of Marius's linear pinch pump** — not in
`assets/media/`, not in the deck's own `assets/`, and not in the thesis Pictures
tree. The slot therefore holds the **schematic already drawn for S12b** in
`parts/30-part2.html` (the tube with two pinch shoes, the chamber and the cam),
copied into S38 as `.d38-tube` / `.d38-ln`. It is a drawing of the mechanism, not
a picture of his build, and it should be replaced if a photograph appears.

**The syringe frame is a deliberate placeholder.** `#s38`'s second slot carries
`.d38__slot--todo` with the caption `photograph to come` and an `img` already
pointed at `assets/stills/pump-syringe-benchmark.jpg`. That file **does not
exist yet**; drop it in and the frame fills with no further edit. (The only
syringe asset in `assets/stills/` today is `app-syringe-category-score.png`,
which is the appendix scoring chart and a different thing entirely.)

#### (ae7) Verification

- `python assemble.py`: **77 slides**, no duplicate cues, no warnings.
- Private headless Chrome over CDP at 1280 x 720, fresh port and user-data-dir,
  killed with `taskkill /F /T`. `s32:4 s33:3` and `s34:5` walked forward and
  backward, screenshot at every position, **every screenshot looked at**:
  **0 descendants outside the slide box, 0 text below 18 px, 0 console errors**.
- Because every change in (ae2) is motion that the label states do not show, a
  second pass scrubbed a **private copy of the S33 timeline**, built with
  `Deck.builderFor('s33')(el, gsap)` and seeked to absolute times, and shot
  fourteen intermediate frames: both cap beats, all three battery phases, and
  every needle dip. That is what caught the counter running ahead of the marks
  and the chip sitting on its own ring. The label-state walk showed neither.
- Crops inspected: the cap card at 3x on both rings; the battery graphics at 4x
  across the three phases; the needle at each entry and withdrawal; the
  `1 puncture` / `2 punctures` readout at 4x.

#### (ae8) Left open, for Sirio

Carried forward from **(ad7)**, less the S34 pill, which he approved:

- **S33 · are the cap rings the right way round?** The assignment above is read
  off the pixels — skirt visible and shadow hard means standing, full circular
  face means flat. But his note says *"the one actually touching the wall which
  is not [bent]"*, and in this frame it is the **folded** cap that sits nearest a
  raised edge while the **flat** one lies out on open deck reaching towards the
  lane. If he meant them the other way round it is a two-line swap of the two
  ellipse centres and the two chip positions. He took the photograph.
- **S38 · is there a photograph of Marius's pump?** If one exists it replaces
  the S12b schematic in the first slot. And the syringe frame is waiting for
  `assets/stills/pump-syringe-benchmark.jpg`.
- **S33 · whose septum is it.** Unchanged from (ad7): Ch. 12 fences the third
  failure off as *"A separate weakness belongs to the storage module"*, and the
  card does not say so.
- **S28 · the same boundary, unmarked.** Unchanged from (ad7): five images of
  Marius's hardware, no credit anywhere in Part III.
- **Pre-existing, not touched:** the S40 tile wrap, as (ad7) describes it.

---

### (af) The Part III regression walk: 149 states, nine defects, eight of them invisible to the audit — 2026-09-22

The last gate before the commit. **Every clicker position of S25 to S43 walked
forward and then backward — 149 states — and every screenshot looked at.** Nine
defects came out of it. **Eight were pre-existing**, sitting in slides that had
already passed the automated audit, some of them more than once. All nine are
fixed.

The value of the walk is the whole point of this entry, so it is worth saying
before the list: **the audit measures, and measuring is exactly what these
defects survive.** Six of the nine were things the DOM reported correctly and
the projector drew wrongly, or things that only exist at a *resting* playhead,
or only when the deck is driven **backwards**. None of them is a bug you can
write a check for without already knowing it is there.

#### (af1) S39 — the month that was never on the slide

**The serious one.** The timeline's month axis was a `<g class="tl">` of SVG
`<text>`, and Chrome painted those glyphs in **unscaled user space** while the
ticks beside them were drawn scaled. On the projector the axis read

    FEB   MAR   APR   MAY   JI   JUL   AUG

— seven labels for eight ticks, each drifting right of its own tick by exactly
the **1/0.868** stage scale, `JUN` clipped to `JI`, and **`SEP` off the end of
the plate entirely**. Nobody had ever seen the last month of the project on the
last timeline of the talk.

**And it changed what the slide claimed.** The orange marker is placed to
straddle **AUG–SEP**; with every label shifted right it read as sitting on
`AUG`, so the caption *"the market search landed at the start of the writing
phase"* pointed at the wrong month. A displaced label is not a cosmetic defect
when the thing beside it is a date.

This is the same Chrome behaviour as **(ad4)**, found on S31, and the same one
that defeated two attempts in **(x)**. Third slide, same cause.

**Fixed the way (x) and (ad4) both prescribe:** `<g class="tl">` is deleted and
the eight months are HTML `<span class="d39__ml">` inside `.d39__time`, placed at
the tick coordinates — **40, 129, 218, 307, 396, 485, 574, 664**. That is legal
here because `.d39__axis` is `viewBox="0 0 704 120"` inside a 704 px box: the
internal scale is 1, so a chart coordinate *is* a container coordinate, and the
spans need no conversion. A comment in the markup says so, for the next person
who wonders why the numbers look like SVG.

Confirmed by 4x crop: all eight months present, each within about 2 px of its
tick, the marker straddling AUG and SEP.

**Sweep:** `parts/50-discussion.html` now contains **no SVG `<text>` at all** —
the only `<text` in the file is inside the comment that explains why. Everything
else in Part IV already annotated with HTML chips.

#### (af2) S38 step 5 — the model panel over the corner furniture

The `MODEL FIRST` panel ran to **y 700**, through the 684 line where the section
rail and the slide number live. `PART III-B` was struck through by the panel
edge, the progress dashes were half covered, and the page number `45` was pushed
outside the box.

Rebalanced rather than shrunk — no type got smaller. The panel is
`top: 392; height: 284`, bottom **676**. The two figures were re-cut to their own
ratios at **316 x 183** and **172 x 178**, the connector's `viewBox` went
`1168 300` → **`1168 284`** to match the panel it lives in, and both captions
were lifted with it.

#### (af3) S28, S29, S30 — the record thumbnail parked on the photograph a beat early

`barDrop()` flies a thumbnail from the full-size picture down into the record bar
along the bottom. Its `fromTo(..., { immediateRender: false })` was placed **at**
the step label, and a resting playhead renders a tween at progress 0 — which is
the *start* state: the `.p3-bar-it` sitting **on top of the source photograph**
at scale 2.79.

So at three separate clicker positions a teal-bordered copy of the picture lay
over the picture, and because it covered them, it **hid the slide's own
callouts**:

| State | What was covered |
|---|---|
| S28 step 4 | `every screw horizontal` |
| S29 step 3 | the **45°** chip |
| S30 step 1 | `the bench supply's own socket` |

Worst case was **S29 step 0 reached backwards**: an unannotated copy of the
nozzle photograph sitting over the real one, with no caption to explain either.

**Fixed once, in `barDrop()`:** the frame's opacity is now its own tween from 0,
so a tween sitting at progress 0 paints nothing at all. One helper, three slides.

#### (af4) S28, S29, S30 — the kicker never reverted going backwards

The category kicker was driven by `tl.call(setText(...))`, and **a `call()` only
fires forward**. Reversing through the slide left the later label stranded over
the earlier pictures:

| State, reached backwards | Read | Over |
|---|---|---|
| S28 step 0 | `loaded` | the *empty* carrier renders |
| S29 step 0 | `the screen and stylus holder` | the nozzle photograph |
| S30 step 0 | `on board` | the CAD cradle |

**Fixed with S27's state-pill idiom**, which was already in the deck and already
reversible: the kicker is a stack of `<b class="p3-kk">` siblings, one per
category, crossfaded by a small `kicker(at, i)` helper per slide. Tweens reverse;
calls do not. **The wording is unchanged** — only the mechanism — and
`setText()` is deleted.

#### (af5) S29 step 1 — a dead beat

Step 1 emptied the stage: the nozzle photograph and its annotations left before
anything replaced them, so one press bought a blank slide. They now **stay while
the thumbnail flies into the bar**, which is what S28's equivalent last beat
already did. One press, one thing happening.

#### (af6) S33 — overlays outliving their cards, and one more cropped photograph

Two faults on the failures slide.

**The card overlays stayed lit after their card collapsed.** When the row
re-laid out, `#s33-c0`'s cap annotation and `#s33-c1`'s stall rings kept their
opacity on a 254 px idle card — the battery's rings ending up half-clipped by
the media edge, which reads as a rendering fault. Both overlays now retire with
their cards: `capOv` fades on `step1`, `batOv` on `step2`, each alongside the
chips that belong to it.

**The battery photograph was still `object-fit: cover`.** `(ad5)` fixed the cap
card and moved the battery *graphics*, but left the picture under them cropped
top and bottom — the standing rule of **(z1)** still broken on one card. It now
carries `p3-fcard--fit` at **600 x 338 media in a 480 px card**, the whole frame
visible, and the overlay was re-anchored to match: `viewBox` `600 212` →
**`600 338`**, the battery icon to **`translate(454, 111)`**, and both rotor
groups **+63 in y** (cy 148 → 211). The graphics land on the same bench pixels
they were placed on; only the frame around them grew.

#### (af7) S29 — a chip sitting on the rings it belonged to

The `3 screws` callout sat over the two circled screw heads it was counting.
Moved to `left: 41%; top: 89%`, beneath them, and reworded to **`3 screws,
1 hidden`** — which is both clearer and more accurate: Ch. 11 §"The nozzle in
place" says two screws secure the holder and *"a third screw, driven
horizontally on the left side into the wall of the electronics bay"*, which is
the one you cannot see in the photograph.

#### (af8) Two engine-level finds, recorded because they will bite again

**GSAP silently collapses chained offsets.** A position parameter built as
`'step1+=0.1' + '+=0.26'` does **not** mean `step1 + 0.36`; GSAP resolves it back
to `step1 + 0.1` and says nothing. S28's first category swap had its two incoming
pictures and its kicker all firing on the same instant instead of stepping, which
looked like a deliberately flat beat rather than a bug. There is now an `off(at,
d)` helper that composes offsets correctly, and the chained-string form should
never be written again.

**The automated audit cannot see a displaced-text defect — structurally, not by
oversight.** It asks `getBoundingClientRect()`, and in the failure mode of
(af1)/(ad4)/(x) that call returns the stale pre-scale box: the audit and the
browser agree with each other and both disagree with the pixels. It is equally
blind to a tween resting at progress 0 painting its start state (af3), to a
`call()` that never reverses (af4), and to a beat that is simply empty (af5) —
all of which are *correct* DOM that is *wrong* on the projector.

**Eight of today's nine defects passed the audit.** The audit stays, because it
catches overflow and sub-18 px type cheaply and on every state. But it is a
floor, not a gate: **the gate is walking the part and looking at every frame,
backwards as well as forwards.**

#### (af9) Verification

- `python assemble.py`: **77 slides**, no duplicate cues, no warnings.
- Private headless Chrome over CDP at 1280 x 720, fresh port and user-data-dir
  per run, killed with `taskkill /F /T`. **S25 to S43, every clicker position,
  forward and then backward: 149 states, screenshot at each, every screenshot
  looked at.**
- Entry timelines forced forward before judging, per **(aa)**.
- Programmatic audit at every state alongside the eye: no descendant outside the
  slide box, no visible text below 18 px, normalised by the 0.868 stage scale.
  Console clean.
- Crops inspected at 4x: the S39 month axis against its ticks; the S38 model
  panel against the corner furniture; the three record-bar states that had been
  covering their callouts; the S33 battery card whole; the S29 screw chip.

#### (af10) Left open, for Sirio

- **S33 · are the cap rings the right way round?** Carried from **(ae8)**. The
  green ring marks the cap read as folded back, the red one the cap read as
  lying flat; his note describes them the other way about. A two-line swap if he
  says so, and he took the photograph.
- **S38 · is there a photograph of Marius's linear pinch pump?** Carried from
  **(ae8)**. None exists in this repo or the thesis Pictures tree, so the slot
  holds the S12b schematic. The syringe slot is still waiting for
  `assets/stills/pump-syringe-benchmark.jpg`.
- **Two rasterised thesis figures have labels at about 9 px on the projector.**
  Both are screenshots of thesis figures whose internal type was sized for A4,
  not for a 1280 px stage, and neither can be fixed by scaling the image:

  | Figure | Where | Source |
  |---|---|---|
  | `fig-rotor-geometry.png` (2000 x 1159) | S38 step 5, in the model panel | a clean dark base exists at `latex/Pictures/tool-rotor-diagram.png`, **2684 x 2476** |
  | `fig-ai-working-loop.png` (2000 x 925) | S39 | no clean version exists; its generator needs one edit |

  Regenerating either is a real job and it has a hard constraint: **both
  generators live in the thesis repository.** Any regeneration must produce a
  **deck-only copy** under `decks/thesis-defense/assets/figs/` and leave the
  submitted thesis figures exactly as they are. Not started; Sirio's call
  whether it is worth it before the 28th.

---

### (ag) Sirio's third pass on Part III: the S34 bus, S41 rebuilt, S39 to the appendix, and a new readout ledger — 2026-09-22

Six items. Two of them are corrections to work from the same day, one is a slide
thrown out and rebuilt from nothing, and one is a slide he first asked to delete
and then asked to keep in a smaller form. Files: `parts/40-part3.html`,
`parts/50-discussion.html`, `parts/60-backups.html`, `parts/99-tail.html` and
`SLIDE-ORDER.md`.

#### (ag1) S34 — the leader lines, again, and his routing was better than mine

Verbatim: *"the lines that go to the circled things 'enclosure' 'cleanable
materials' are not placed well... You should try to do not overlap them. I think
it will be much [better] if you just move the line that goes from the 'wind' to
the left side of that box instead of the right. The only one you should not touch
is the one going to the 'Circuit Board (PCB)'."*

**Applied exactly as he suggested, and it is the right call.** The routing of
**(ad2)** sent Wind out of its *right* edge, which put it in the 980–1000 gutter
alongside Cleanability and then ran its rail all the way back across the board —
so the two rails ran parallel under most of the width and the eye could not tell
which line served which pill.

Sending Wind out of its **left** edge puts it in the gutter Operating envelope
already uses. The two Enclosure-bound lines now share **one vertical at x 754**,
teeing on from opposite sides with 10 px stubs, and read as a bus rather than as
two lines that happen to be near each other. Cleanability gets the 980–1000
gutter to itself, centred at **x 990**, on its own **y 574** rail.

The six paths as they now stand:

    operating envelope   M 744 259 H 754 V 552
    wind (left edge)     M 764 327 H 754 V 552
    enclosure trunk      M 754 552 H 206 V 590
    cleanability         M 980 395 H 990 V 574
    cleanable trunk      M 990 574 H 640 V 590
    circuit board (PCB)  M 1074 426 V 590        <- untouched, byte for byte

**The stretch where the two rails run parallel fell from 345 px to 114 px**
(they now overlap only between x 640 and x 754). The PCB drop was not touched,
as he asked.

#### (ag2) S38 — the claim in the kickers, and the syringe slot filled

Retitled to his words: **`Depth and breadth in prototyping: the pump and
alignment modules.`**

The column kickers used to be bare nouns. They now state the claim:
**`PUMP — BREADTH AND DEPTH`** with `3 concepts, 4 builds` under it, against
**`ALIGNMENT — BREADTH ON PAPER`** with `1 of about 50 concepts built`. The
asymmetry is the argument of the slide, so the headings should carry it.

**The placeholder of (ae6) is filled.** Sirio supplied
`assets/media/pump/syringe_pump_test.mp4` — **720 x 1280 portrait, 8.6 s** — and
a poster frame was pulled with ffmpeg to `syringe_pump_test-poster.jpg`. It is
the only portrait asset in a row of two landscape slots, so rather than crop it
to match its neighbours (the standing rule of **(z1)**) it got **its own 9:16
box** and the row was rebalanced around it:

| Slot | x | box | |
|---|---|---|---|
| Linear pinch | 56 | 175 x 135 | the S12b schematic, per (ae6) |
| Syringe pump | 281 | **105 x 186** | the new clip, portrait |
| Rotary | 436 | 175 x 170 | `v23-render.png` |

All three are **bottom-aligned at y 610**, which is what makes three different
aspect ratios read as one row. The dead `.d38__slot--todo` CSS and the small
piece of JS that used to fill it are removed.

**Open, and flagged for him:** at **105 px** the clip is small on stage. Making
it bigger costs width, and the only width available belongs to one of the two
landscape slots — so it is a trade between seeing the syringe move and keeping
three concepts side by side. His call.

#### (ag3) S40 — capitalisation

The five `.d40__note` descriptive lines are capitalised at his request:
*Co-developed until the fluidic interfaces are stable*, *The last manual step,
settled before the rack is frozen*, *Stronger motors, closed-loop step-loss
detection*, *One board, 24 V, charge sensing*, *Designed last, because it
inherits everything*. **The wording is untouched.**

#### (ag4) S41 — thrown out and rebuilt

His verdict is worth quoting in full, because it is the clearest statement of
the standard this deck is held to:

> *"I like how you have structured the slide, but i have to say it does NOT
> convey the message at all. The dispenser looks shit there, and also the
> analyzer. You have represented them very poorly. And what the hell is that
> thing going from left to right? You have to reconsider completely the design
> of this slide, because it looks awful."*

Gone: both line-art outlines, and the coded tube that travelled left to right
between them.

**The dispenser is now a photograph of the real machine** —
`assets/media/device/top.jpg`, `object-fit: contain`, uncropped — with the pill
**`THE DISPENSER · BUILT`** on it.

**The reader is drawn as a drawing**, dashed throughout, kicker `The reader`,
subtitle **`proposed, not built`**. That asymmetry is deliberate and it is the
whole point of the slide: one of these two things exists and the other is a
proposal, and the slide should not let a viewer mistake which is which. A
line-art dispenser beside a line-art reader said they were the same kind of
object.

Under it, **one detector bay** with **Fluorescence** seated in it, and **four
modules of identical footprint on a rail below** — Colorimetric / absorbance,
Turbidimetry, Lateral flow / strip reader, Electrochemical — each carrying the
**same dock tab**, which is what answers his *"show the different modules and
name them, in a way that they can be substituted."* Same tab, same footprint,
one bay: substitution is shown by the geometry, not asserted in a caption.

Dialect renamed **`pair` → `dock`**, because the slide is no longer two things
side by side. **5 steps.**

#### (ag5) S39 — deleted, restored, and cut down into the appendix

Worth recording the sequence honestly, because the file went through a deletion
and came back.

He first said: *"I don't like it. Remove it. The content is not really worth
mentioning again."* The deletion was begun. He then revised it: *"only focus on
AI, and make it more simple, and put it on the appendix. NO bullshit about
timeline."* **The section was restored from git and reworked**, which is the only
reason the slide still exists.

**The whole timeline is gone** — the axis, the ticks, the band, the dot, the
"one decision I would reverse" kicker, the market-search note, and **the eight
HTML month labels added earlier the same day in (af1)**. **Steps 4 → 3.** What
is left is the AI working loop and nothing else, which is what he asked for.

The section now lives in **`parts/60-backups.html`, between `s12` and `b01`**,
rendering as **A02**, carrying `data-part="backup" data-topic="disc"` and
**keeping its `s39` cue**. Its CSS and its builder stayed in
`parts/50-discussion.html`, per **SLIDE-ORDER.md §4**, with a comment at each end
saying where the markup went — a moved slide does not drag its styles across a
part boundary.

**Two shared rule groups were trimmed rather than deleted**, and both still name
`#s39` on purpose: the 18 px floor group
`#s37 .kicker, #s38 .kicker, #s39 .kicker, #s40 .kicker, #s41 .kicker, #s43
.kicker`, and the quotation group `#s38 .q-over, #s39 .q-over`. The slide still
exists and still uses them; only its markup moved.

**A consequence worth recording:** the month-axis fix of **(af1)** is now moot,
because the axis it repaired no longer exists. **The lesson is not moot** —
Chrome painting SVG `<text>` in unscaled user space, and the audit agreeing with
the stale box, is recorded in (af1), (ad4) and (x), and it cost three slides
before it was understood. Work thrown away is not the same as a finding thrown
away.

#### (ag6) B25 — a new appendix slide, the readout ledger

Built from **`research/qa-readout-methods.md`**, which Sirio compiled and asked
to have turned into a reference slide. Title: **`Six readouts could fit a
portable reader, and each one is a different bill of hardware.`** **Six steps.**

The five techniques the research pack calls *"Reachable in a portable module"*,
plus **Chemiluminescence / ECL** below a gate rule as the borderline case — the
rule is doing work, not decoration: it separates what fits from what nearly
fits.

New dialect **`ledger`**: every readout is billed against **the same five fixed
slots** — *light in · filter · detector · heat · also needs* — so the pattern of
filled chips against empty dashes carries the argument down the column without a
word of comparison being written. His own *"for your reader"* judgement on each
technique is **the largest text on the slide**, revealed one at a time: the
ledger is the evidence, the judgement is the line.

Registered in **`SLIDE_ORDER`** in `parts/99-tail.html` —
`cues: ['s40', 's41', 'b25']` — and in **`SLIDE-ORDER.md`** under *Conclusion
and outlook*, beside `s41`, with the `s39` move noted in the same table.

#### (ag7) Left open, for Sirio

- **S33 · are the cap rings the right way round?** Still unanswered; carried from
  **(ae8)** and **(af10)**. Two lines to swap if they are not.
- **S38 · is there a photograph of Marius's linear pinch pump?** Still none in
  this repo or the thesis Pictures tree; the slot holds the S12b schematic.
- **S38 · the syringe clip is 105 px wide.** New, see (ag2). Bigger costs a
  landscape slot.
- **`fig-rotor-geometry.png` still has ~9 px labels** on S38 step 5. It is now
  **the only remaining small-label figure**, because `fig-ai-working-loop.png`
  left the talk with S39. A clean dark base exists at
  `latex/Pictures/tool-rotor-diagram.png`, **2684 x 2476**, in the thesis
  repository — so any regeneration must produce a **deck-only copy** under
  `decks/thesis-defense/assets/figs/` and leave the submitted thesis figure
  untouched.

---

### (ah) Sirio on S15 and S16: the pump in parts, the callouts off the rings, and the right clip — 2026-09-22

Part II, `parts/30-part2.html` only. Three notes from him, applied one at a time
with an assemble and a headless walk between each. Letter chosen while another
session was writing Part III; if it collides with theirs, renumber this one.

#### (ah1) S15 step 4 — the last panel is the pump in parts

Verbatim: *"I would like to show on the last panel the image with the measured
gaps, as you have it now, but smaller. The rest should show the disassebled
pump, there is an image on my thesis."*

The panel now holds **`../../assets/media/pump/disassembly.jpg`** (2000 x 1067),
the whole v2.3 pump laid out in parts: the stepper motor with its cable, the
printed motor mount, the printed housing with **Gap: 1.52 V2.3** embossed on its
face, and along the bottom four bearings, five cap screws, the two rotor halves
and the tube with its fittings.

**Motion, not just layout.** The photograph enters at **719 x 384 — the figure
area of the sheet exactly** — and holds there for about 1.6 s while the readout
counts to 1.52, which is the beat in which the embossed value can be found on
the housing. It then steps back to **500 px** while `fig-pump-head-gap` grows in
beside it at **246 px, a little over half its old 462**, and the three caliper
slots take their callouts. The markup carries the *settled* widths (500 / 246)
and the builder sets the entry widths, so a deck with no GSAP still lays out
correctly. Step 4 runs 10.0 to 14.05 on the timeline, in line with step 2.

**The deck-local `assets/v23-render.png` is dropped from this slide.** It was the v2.3 head in CAD with
the gap value embossed on the housing face — which is the same thing the
photograph now shows on the real printed part. Keeping both said it twice and
cost the photograph 274 px of width. Nothing else in the deck references
`decks/thesis-defense/assets/v23-render.png` now — `previews/a.html` still does,
and it is left on disk. The **separate** `assets/media/pump/v23-render.png` is a
different file, still used twice in `parts/50-discussion.html`, and untouched.

**Not fixed, and it got worse:** `fig-pump-head-gap.png` carries its own leader
labels (*Pump head, carrying the 180 degree track*, *Three caliper slots*,
*Rotor*, *The occlusion gap, read here*) baked into the PNG. They were about
**9 px** at 462 px wide and are about **5 px** at 246. Same class as the
`fig-rotor-geometry.png` item in **(ag7)** and it cannot be fixed by scaling.
The figure does its job here through the three dark-red rings and the three HTML
chips; its own labels are decoration and are illegible either way. Sirio's call
whether the figure is worth regenerating.

#### (ah2) S15 — the horizontal orange line, and the callouts off the rings

Verbatim: *"slide 20: remove he horizontal orange line, and make sure the text
on the iamge on the right is not too close to the red circles."*

**The line.** The only decorative horizontal orange rule on the slide was
`#f4-under`, the stroke drawn under the gap value embossed on `v23-render.png`.
It is gone with the render. A replacement underline under the *real* embossing
on the photograph was built and then **removed unbuilt** on this note — a new
horizontal orange line is exactly what he asked not to have.

**One candidate was left alone and needs a ruling:** step 1 carries `#f1-closure`,
a bright orange horizontal rule across the whole of panel b) at the 1.82 mm
closure threshold, drawn `stroke-dasharray="26 20"` but reading nearly solid at
748 px, and it overshoots the plot frame on the right. It is the most prominent
horizontal orange line on the slide — but it is load-bearing, not decoration:
`#f1-stem` rises from it to the 2.22 dot and `#f1-dot` lands on it. It was **not**
removed. If that is the line he meant, the stem and dot choreography has to be
re-cut with it.

**The rings.** At 246 px the three `1.52` chips were covering the dark-red
inspection rings they name — the rings are the evidence, so the text is now
parked **outside the figure**: one chip above the apex slot (`top:-13.5%`), two
below the end slots (`top:110.5%`), each tick lengthened into a leader that runs
from its own ring out to its chip (`M 1155 112 L 1155 -130`,
`M 741 758 L 741 1430`, `M 1591 780 L 1591 1430`, stroke doubled to 22 for the
smaller frame). Checked on a 4x crop: all three rings clear, no chip overlaps
another, both bottom chips inside the frame width.

**Checked and not the complaint:** step 3's `fig-print-compensation.png` also has
red dashed circles, and its `0.14 mm lost` labels and the `Model = target + 0.14`
box sit well clear of them. Inspected at 4x; the image is left alone.

#### (ah3) S16 — the weighing clip, and a portrait box for it

Verbatim: *"the video is wrong, you should use the video where I am weighting in
the scale. The same that you have used in slide 19."*

`video/pump-head.mp4` out, **`video/pump-gravimetric.mp4`** in, with
`pump-gravimetric-poster.jpg` — the same clip the balance block on S14 plays.

Both clips are **540 x 960 portrait**, and the old box was **440 x 340 with
`object-fit: cover`**, so the pump-head clip had been cropped to a third of its
frame all along. The box is now **270 x 480 — exactly 9:16 — at (954, 208)**,
right-aligned to the 1224 px content edge and the full height of the content
band, with `object-fit: contain`, so the frame is shown whole, neither cropped
nor stretched.

**Rebalanced around it:** the chart plate is untouched at 700 x 340 at (56, 214),
because rule **(x)** depends on the plate being 1:1 with the chart viewBox and
`.s16-pipt` is positioned in chart units. The ledger narrows from **884 to
862 px** so it stops 36 px short of the clip instead of 14. Cell text re-measured
at the new width: no overflow, nothing under 18 px.

**Playback** follows S14's device rather than the infra's entry autoplay:
`data-noauto` in the markup, `VID_IN = 3.8` read off the playhead in the builder,
`onUpdate: syncVid` on the timeline and a `Deck.enter('s16', …)` hook, because
`tl.seek()` on entry suppresses `onUpdate`. Measured in the browser: paused at
steps 0 and 1, playing at 2 and 3, paused again on the way back, and S14's own
clip still behaves.

#### (ah4) Verification

Headless Chrome over CDP at 1280 x 720, private profile and port, killed after.
Entry timelines forced forward per **(aa)** before every capture.

- S15 steps 0 to 4 and 3 to 0, S16 steps 0 to 3 and 2 to 0, then one combined
  forward pass S15 to S17: **no out-of-box descendant, nothing under 18 px**
  (audit normalised by the 0.868 stage scale), console clean but for the
  `favicon.ico` 404 the deck has always had.
- Crops inspected by eye, not by arithmetic: the disassembly photograph at 3x
  (whole, every part recognisable, **Gap: 1.52 V2.3** legible); the gap figure at
  4x (three rings clear of the chips, leaders landing); step 3's compensation
  figure at 4x; the portrait clip at 1x at steps 0, 2 and 3.
- Video measured in the page: `540 x 960` into a `270 x 480` box — exact, so no
  letterbox and no distortion — poster before first play, `readyState 4` after.
- `?view=presenter` renders both slides at every step, next-step preview builds,
  no exception.

---

### (ai) The second regression walk, and Sirio's fourth pass: 188 states, seven more defects, and two new appendix slides — 2026-09-22

The deck is **79 slides**. This section covers two things that happened
together: a second full walk of Part III and the appendix, and Sirio's fourth
review round.

**The standing lesson first, because it is now twice proven.** The first walk
(**af**) found nine defects, eight of which the automated audit had passed. This
walk found **seven more**, and the audit had passed every one of them. Two walks,
sixteen defects, and the audit caught none of them — not through oversight but
because of what it is: it measures the DOM, and these are failures where the DOM
is right and the projector is wrong. **The walk is the gate. The audit is the
floor.**

#### (ai1) The walk

**188 states** — every clicker position of `s25`–`s43` plus the appendix slides
`s12`, `s39`, `b25` and `s04c`, forward and then backward, screenshot at each,
every screenshot looked at. All nine defects from (af) confirmed fixed.

#### (ai2) S04c — the displaced-SVG-text bug, a third time

**Third slide, same Chrome behaviour** as `s31` in **(ad4)** and `s39` in
**(af1)**, and this one had been live the longest.

Four legend labels in the bead-protocol panel painted **48 px right** of where
every measurement API put them, and were clipped mid-word by the panel edge:

    target molec…    internal con…    everything e…    magnetic be…

at **8 of the 10 clicker positions**.

The arithmetic is worth writing down, because it is the clearest instance of the
bug yet seen. The SVG is `viewBox="0 0 536 344"` in a **536 px box** — internal
scale exactly **1.0** — sitting inside a stage scaled to **0.8681**.
`<text x="358">` reported a rect of **436–557**, comfortably inside the panel at
**126–591**. It painted from **x 484**, which is `126 + 358 × 1.0`: the
**unscaled** user-space position. The element was drawn as if the stage
transform did not exist, and every API agreed with the transformed box.

Fixed as (x) prescribes: the four labels are HTML chips over the plate
(`.pan-legt`, positioned by `top` in the panel's own coordinates). **The swatch
circles stay SVG** — shapes lay out correctly; it is only text that does this.

**The sweep, which is the most useful line in this entry.** Eight SVGs in the
deck carry `<text>` inside a scale-1 viewBox:

| Slide | texts | state |
|---|---|---|
| `s07b` | 20 | **unchecked** |
| `s11` | 4 | **unchecked** |
| `s13` | 8 | **unchecked** |
| `s14` | 4 + 4 | **unchecked** |
| `s16` | 13 | **unchecked** |
| `s21` | 1 | **unchecked** |
| `s25` | 4 | measured, renders correctly |
| `s04c` | 4 | fixed here |

`s25` was measured and is **fine**, so **scale-1 alone is not sufficient to
trigger the bug** — something else is needed, and what that something is is not
yet known. That matters: it means the pattern cannot be used as a reliable
predictor, in either direction.

**The six unchecked ones are all in Parts I and II, and they belong to those
parts' owners.** They are not Part III's to fix and they have not been looked at.
If a label on any of those slides is a number or a date, it is worth an eye
before the 28th.

#### (ai3) B25 — a specificity collision that inverted the dimming

The borderline row's **empty** cells were painting a warm capsule, and brighter
than the filled cells in the rows above — the dimming inverted, so the one row
that means *"this one is borderline"* read as the most emphatic thing on the
slide.

`#b25 .ro-row--edge .ro-c` is **(0,1,2,0)** and outranked `#b25 .ro-c--off` at
**(0,1,1,0)**, so the row rule won on every dash.

**Fixed by exclusion, not by weight:** the rule is now
`#b25 .ro-row--edge .ro-c:not(.ro-c--off)`, which takes the empty cells out of
the rule instead of fighting it. No `!important` — an `!important` here would
have been a second collision waiting for the third one.

#### (ai4) S12 — two captions reading as one line

At step 3 two captions sat with a **7 px gutter** where every other pair on the
slide has **32 px**, so they ran together into one sentence. Fixed with an inline
`width: 320px` on `#s12-p-b` rather than a rule, because `.prin`'s geometry lives
in **`parts/30-part2.html`** while the section itself is in
`parts/60-backups.html`, and a shared-rule edit for one caption on one slide is
how a style block starts collecting exceptions.

#### (ai5) S38 — the syringe clip was showing somebody's laptop desktop

The clip Sirio supplied in **(ag2)**, `syringe_pump_test.mp4`, is 8.6 s long and
**pans off the pump at about 4.4 s**. The back half of every loop showed a
Windows taskbar, a file explorer window and a data plot — under the caption
*"Syringe pump · benchmarked"*, on a defence slide, **across four clicker
positions**, looping.

A bench-only trim was cut with ffmpeg to **`syringe-pump-bench.mp4`** (4.2 s, no
audio) with its own poster. **The original file is untouched on disk**, next to
it, so nothing supplied was destroyed.

**Record this as a rule: a supplied clip gets watched end to end before it goes
on a slide.** It was accepted on its poster frame and its first seconds, which
were exactly right, and the failure was in the part nobody had reason to look at.
The same applies to any asset that has a timeline.

#### (ai6) S38 — a caption wider than its slot

The syringe caption was **155 px over a 105 px slot**, overhanging about 50 px
into the gutter and crowding *Rotary*. Shortened to **`Syringe`** and centred on
the slot (`left:281px; width:105px; text-align:center`). The portrait box that
made the slot narrow is the right call and is not the problem; the caption was
written for the old 175 px slot and never re-measured.

#### (ai7) S38 — the rotor figure cannot be made readable, at any size

`fig-rotor-geometry.png`'s printed labels render at about **6 px** in the model
panel. This has been open since **(af10)**, and there is now a finding that
settles the "give it a bigger slide" option: **the labels are about 22 px in a
2000 px-wide source.** Even given a whole appendix slide — 1168 px of usable
width, a 0.58 scale — they reach roughly **13 stage px**, still under the 18 px
floor.

**So it cannot be fixed by making it bigger on any slide in this deck.** The
choice is to **regenerate the figure with larger type**, or to **drop it**. Still
Sirio's call, but it is now a binary one.

#### (ai8) A `backdrop-filter` ghost band, probably an artifact of the walker

A duplicate band of the figure panel appeared under the quote overlays on `s38`
and `s39`, at **y ≈ 580–625**. Proved to be the backdrop filter by forcing
`backdrop-filter: none`, which dropped it to flat background.

**It is probably not real.** The walker runs Chrome with `--disable-gpu`, and
software compositing is the classic trigger for this artifact. **But it has not
been seen on a GPU-composited display, and it needs opening once in a real
browser before the 28th.** It now affects **only `s39`**, since `s38`'s quotation
overlay was removed in (ai9).

#### (ai9) S38 — the quotation removed

*"A concept built once is also not a concept tested."* removed with its
animation, at Sirio's instruction. **Steps 6 → 5**, and the model panel is now
the last beat of the slide.

Only the **`#s38`** term was dropped from each shared `q-over` selector; `#s39`
keeps its quotation and its rules, which is why the group still exists. The same
discipline as (ag5): trim the selector, do not delete the group.

#### (ai10) B26 — modelling against trial and error, in the appendix

Sirio: *"make a slide about modelling on this topic: modelling and just try and
error… The slide has to go to the appendix."* He wanted the modelling half of
the S38 strategy table given room of its own.

Title: **`A model gives a reasoned starting point; systematic prototyping is what
makes the output dependable.`** **5 steps**, `data-topic="pump"`, placed after
`b25` and ahead of `b01`.

The two strategies are not drawn as two columns but as **the two ends of one
cycle**: dimensions out of the model, measurements back from the hardware. The
return arm is **drawn broken, with an ×** — because the model was never
validated, so the loop was never closed — and the ±0.10 mm printer is what
closes it. A broken return arm says in one shape what the S38 note said in a
sentence.

Source: ch. 13 §"Analytical models versus physical prototypes" and the lower
half of `tab:strategies`.

#### (ai11) S26 — four strings, and why the explorer finding changed

- Title: **`Twenty-five system architectures screened with two interactive
  tools.`**
- Question line: **`One microcontroller driving a screen, six pumps, two axes,
  and a vibration motor.`**
- Simulator finding: **`The second pump captures 86 % of time savings; further
  pumps yield diminishing returns.`**
- Explorer finding, rewritten at his request from `Which driver, not which
  processor.` to **`Pins and driver intelligence decided it, not cost.`**

**Why that one matters.** The old line gestured at one of the tool's three
findings and left the other two on the floor. The new one carries all three:
**pin availability** as the feasibility bottleneck (a dumb driver makes the
processor toggle a pin per microstep; six of them need twelve lines, and only
seven are left once the screen and the card reader are wired), **driver
intelligence rather than raw clock speed** deciding whether concurrent
multi-channel pumping is viable, and **cost not deciding anything** — every
candidate inside the pin budget lands within about 10 % of the others. The
speaker note carries the long form.

#### (ai12) S26 and S27 — the corner mark now reads ARCHITECTURE & ELECTRONICS

From the one string `MODULE_NAME.electronics` in `parts/99-tail.html`. Those two
slides are the only ones carrying `data-map="electronics"`, and the mark now
matches the first journey stop on the `s25` divider, which already read *System
Architecture & Electronics*. One source, per **(ab1)**.

Measured rather than assumed: the mark roughly **doubled in width** and still
ends about **850 px short of the right edge**, so nothing had to move.

#### (ai13) Housekeeping

- **`s04c` was missing `data-topic="gap"`** and had been falling into *"not yet
  sorted"* in the overview since 2026-09-21. Added.
- **`b25` moved up** to sit with the sorted appendix slides, per SLIDE-ORDER.md
  §6 step 3. The appendix file now opens `s12`, `s39`, `b25`, `b26`, then
  `b01`…
- **`b25` and `b26` registered** in `SLIDE_ORDER` in `parts/99-tail.html` — `b26`
  in the pump row, `b25` in *Conclusion and outlook* — and in `SLIDE-ORDER.md`.
  **All 79 cues are now registered; none relies on the §2 fallback.**
- **A ghost entry for a slide `s04e`** — which exists nowhere in the repo — was
  removed from `CONTENT-IT.md`.

#### (ai14) Hard-coded appendix numbers — the rule, and what is still carrying them

SLIDE-ORDER.md §6 step 4 already says it: **nothing addresses a slide by its
number.** `A01`, `A02`, … are **computed from document order**, so inserting or
moving one appendix section silently renumbers everything after it and every
written reference goes stale without an error anywhere.

**The deck already contains the proof.** Two section comments in
`parts/60-backups.html` both claim **A02** — `A02 · S39` at the top of the
restored S39 section, and `A02 · S04c` further down — because `s39` was inserted
ahead of a section that had been numbered when it was second. Both cannot be
right, and neither is checked by anything.

**The three banners in `parts/60-backups.html` are now cue-keyed** — the
contradiction above is what settled it. Each appendix section is announced by
its own stable address instead of a computed number:

| Was | Is |
|---|---|
| `<!-- A01 · S12` | `<!-- s12` |
| `<!-- A02 · S39` | `<!-- s39` |
| `<!-- A02 · S04c` | `<!-- s04c` |

Reassembled clean: **79 slides, 79 unique cues, no warnings.** Move a section in
that file now and nothing written down goes stale.

**Two sites are still outstanding, and they are Part II's, not Part III's.**
Both are in `parts/30-part2.html` — the `#s12` style-block comment reading
*"lives in parts/60-backups.html (appendix, A01, moved 2026-09-21)"* and the
`#s12` builder comment reading *"moved to parts/60-backups.html on 2026-09-21
(appendix A01)"*. They point at `s12`, whose banner is now `s12`, so the fix is
to say `s12` here too. They were **deliberately not touched**: another session
is actively writing that file. See (ai16).

**One entry came off this list as a false positive.** `CONTENT.md`'s
`### Not yet sorted (B01–B24)` is **correct as it stands**: `B01`–`B24` are the
slides' own **cues**, the same class of stable address as `s12` or `b26`, not
appendix numbers. The stale version was the heading it replaced —
`### Not yet sorted (B01–B24, A03–A26 on screen)` — and the `A03–A26` range is
exactly what the content-document pass removed. A cue range in a heading is the
right thing; a screen-number range is not.

**Scope of the content-document pass, for the record:** it covered `CONTENT.md`
and `CONTENT-IT.md` only. Nothing in the HTML was in it, which is why the HTML
sites above survived it.

The explanatory prose in SLIDE-ORDER.md §§105–119 and in CONTENT.md that
*describes* the numbering scheme is fine as it stands: it is documenting the
convention, not addressing a slide.

#### (ai15) Verification

- `python assemble.py`: **79 slides**, no duplicate cues, no warnings.
- Private headless Chrome over CDP at 1280 x 720, fresh port and user-data-dir,
  killed with `taskkill /F /T`. **188 states**, forward and backward, screenshot
  at each, **every screenshot looked at**.
- Programmatic audit at every state alongside the eye. Console clean.
- `backdrop-filter: none` forced once as a diagnostic, per (ai8); reverted.

#### (ai16) Left open, for Sirio

- **S33 · are the cap rings the right way round?** Carried from (ae8), (af10),
  (ag7). Still unanswered; two lines to swap if not.
- **S38 · is there a photograph of Marius's linear pinch pump?** Still none in
  this repo or the thesis Pictures tree.
- **S38 · the rotor figure: regenerate or drop.** Now a binary choice, see
  (ai7). A clean dark base exists at `latex/Pictures/tool-rotor-diagram.png`
  (2684 x 2476) in the **thesis** repository, so a regeneration must produce a
  **deck-only copy** and leave the submitted figure untouched.
- **The six unchecked scale-1 SVG text blocks in Parts I and II**, see (ai2) —
  for those parts' owners, not for Part III.
- **The `backdrop-filter` band on S39** needs one look in a real browser, see
  (ai8).
- **Two hard-coded appendix numbers remain, in `parts/30-part2.html`** — the
  two `#s12` cross-references described in (ai14). **Part II's to take**, like
  the six unchecked slides above; the three in `parts/60-backups.html` are done.
- **Part II is being worked by another session concurrently**, which appended
  **(ah)** (S15 and S16) while this section was being written. Anyone reading
  this punchlist should expect Part II entries from a different hand interleaved
  with the Part III ones, and should check the letter before appending.

### (ak) Sirio on S12b and S18: the reason instead of the score, and the rail comparison dropped — 2026-09-23

*Letter (aj) deliberately left free: a second session was working Part III
(`parts/40-part3.html`, `50-discussion.html`, `99-tail.html`) while this was
written, and only `parts/30-part2.html` was touched here.*

Two instructions, both verbatim from Sirio.

#### (ak1) S12b — the bottom readout now says why, not by how much

> *"The 3485 agains 3185 part at the bottom, you have to remove it and instead
> write tha tcelanbility was the factor what determined the choice. So something
> like 'On cleanability basis' where cleanability should be orage as the 3485 is.
> Points are not really relevant."*

`#s12b-ro3` reads **Cleanability** *decided it*. The node was **kept** and only
its contents changed: `sheetCtx` picks readouts by index (`c.ros[i]`), so
deleting one would have silently handed every later step the wrong readout — the
trap this deck has already fallen into once.

- The word keeps `.sheet__num`'s own gradient clipped to the text, so it carries
  exactly the orange-to-red `3485` carried; nothing new was invented.
- It is **62 px**, not 96: "Cleanability" set at the readout's normal size is
  about 700 px wide and would not sit beside its label inside the 780 px box. The
  variant is `.sheet__ro--say` in the part's style block — size, a 20 px gap, and
  a 26 px top padding so the word sits on the **same baseline** `30` and `7` stood
  on at the two steps before it. Verified by stacking the three readout crops.
- No timeline change was needed: `rail()` only fades `c.ros[2]` in. The two
  counters that remain (`#s12b-na`, `#s12b-nb`) are the **chip scores**, which
  still count to 3485 and 3185 with their bars — untouched, as instructed; Sirio
  is being asked separately whether those should go too. No dead selectors, no
  GSAP empty-target warnings.
- **On the claim.** The verification pack (§B.2) gives the margin to "footprint,
  mass, and cleanability" (380 of the 610 points gained), and names the check
  valves' cleaning demands as the primary reason the linear chamber was dropped.
  The stage therefore says the short true thing and the **speaker note carries the
  nuance**: "3485 against 3185 is a 300-point margin, and the matrix gives it to
  footprint, mass and cleanability — the score is not what decided the build."
  The old note, "Rotary beat the linear pinch pump 3485 to 3185", is gone.

#### (ak2) S18 — the rail-length comparison removed, and the panels grown into its place

> *"remove the partabout hte lenght of the axis... the 154 and 14 mm, not needed"*

Removed whole, not just the two labels: `#s18-tag-need` (`154 mm`),
`#s18-tag-have` (`140 mm`), both `.sbar` tracks and fills, the `#s18-miss`
shortfall marker that flashed red, all the `.s18-bars` CSS, and the step-4 block
of the timeline with its `step4` label. The **fourth clicker step went with it**:
it existed only for that comparison, so S18 is now **three steps, one per build**,
which is what its title promises.

- **Rebalanced rather than left hollow.** The bars occupied 606 to 692 px. The
  accordion was grown from **366 to 456 px** tall (`.acc` and `.acc__p`), so the
  three panels now take the whole content band, 214 to 670, in line with S19's
  frame. 420 px was tried and screenshotted first; 456 sits better in the dark
  field and gives the two cover-cropped photographs more of their scene. The one
  cost is the V1 strip, which is `object-fit: contain` on cream and so
  letterboxes a little more than before.
- **The note.** "One number failed, and it was geometric: 140 mm of usable rail
  against the 154 mm eight positions demand" is off the stage and out of the talk.
  It survives, reworded, as a fourth presenter bullet opening "**If asked:**" — a
  judgement call, made because the shortfall is real, the V3 chassis on the very
  next slide is the answer to it, and an examiner may ask. **Two lines to delete
  in `parts/30-part2.html` if Sirio would rather not have it in front of him.**
- `#s17-tag-span` still reads `154 mm of travel`. That is the **requirement** the
  rack pitch sets, not the shortfall comparison, it is on a different slide, and
  it was left alone.

#### (ak3) Verification

`python assemble.py` after each slide: 79 slides, 79 unique cues, no warnings.
A private headless Chrome over CDP at 1280 × 720 (the Playwright MCP browser was
held by the other session), every `Deck.enter` timeline forced with
`gsap.globalTimeline.time(+8)` before each shot, per (aa).

- **S12b and S18 walked through every step forward and backward**, 16 states,
  screenshot at each, **every screenshot looked at**. The programmatic audit found
  **no out-of-box descendant and no text under 18 px** at any state.
- Crops inspected at 2–3×: the new readout alone, and the three readouts stacked
  — steps 1 and 2 still read `30 ideas on the table` and `7 passed the screening`,
  in that order, on the same baseline as the new line. Backwards from step 3, S12b
  restores `7` with the screening panel lit.
- S18 at every step: no leftover mark, rule or gap where the bars were.
- Console clean, no GSAP warnings, no failed requests. `?view=presenter` renders
  both slides and their notes without throwing. Reduced motion jumps to the end
  state on both.
- `CONTENT.md` updated for both slides; `CONTENT-IT.md`'s S12b points rewritten
  to the cleanability line, and **S18's Italian points written for the first time**
  (they were on the missing list; only `s21` is left for Part II).

Not committed.

### (al) Part III-B step-synced notes: two open items — 2026-09-23

*Letter (aj) left alone: (ak) reserved it for a Part III session, and another
agent was working `parts/40-part3.html` in parallel.*

The notes and Italian captions for `s37a` to `s43` were rewritten one bullet per
build step (`parts/50-discussion.html`), and `CONTENT.md` / `CONTENT-IT.md` synced
from them. Walked every step forward and backward in `?view=presenter` and
`?view=guest` at 1920 × 1080: right bullet highlighted, right caption shown, no
overflow, console clean. Two things stay open.

**(a) The guest caption title is under the 18 px floor.** `.guest-cap__title`
renders at **15.3 px** at 1920 × 1080, and its size is
`clamp(12px, 1.55vh, 20px)` (`parts/99-tail.html`, line 322), so on a shorter
screen it drops to **12 px**. The caption text itself is fine (31.5 px). The rule
lives in `99-tail.html`, owned by the chat that built the step-synced captions:
**open for that chat.**

**(b) S41 shows five detectors; the thesis names four, and not the same ones.**
The slide's rail and bay carry **fluorescence, colorimetric, turbidimetry, lateral
flow and electrochemical**, with the line "One bay, five detector modules". Thesis
§13.6 (`Chapters/13_Discussion-and-Reflection.tex`, line 152) says:

> "A companion instrument could host swappable sensor modules---such as
> colorimetric, enzymatic, fluorescence, or immunoassay detectors---to analyze
> whatever assays the dispenser prepares."

The five on the slide appear to come from `research/qa-readout-methods.md`, the
Q&A preparation note, not from the thesis; the same goes for "fluorescence is
seated because the PANPOC protocol implies it". The rewritten notes and captions
name no count and no list, so nothing he says contradicts the thesis. **The slide
is unchanged, awaiting Sirio's decision:** keep the five as an illustration, or
align the rail with the four §13.6 names.

Not committed.

*Appended by the Part III-A notes session (`s25` to `s36`, `parts/40-part3.html`),
2026-09-23. Same step-synced rewrite; presenter and guest walks at 1280 × 720 and
1920 × 1080, 101 states each, right bullet and right caption at every state, no
overflow.*

**(c) S31, the Italian caption says "1000 µL, cioè un millilitro".** A unit
identity for the family, not a figure from the thesis. Harmless, but it is the one
number in the Part III-A captions that is not quoted. Kept; delete "cioè un
millilitro" from the step-0 caption of `s31` if the rule is read strictly.

**(d) S26, "within about 10 % on price" is in the thesis — closed.**
`Chapters/10_System-Architecture-and-Electronics.tex`, line 127: "the candidate
architectures that satisfy the GPIO pin budget fall within roughly \SI{10}{\percent}
of each other in total component cost". The step-2 speaker note keeps it; nothing
on screen carries it.

**(c) closed, same day.** The Part III-A notes were rewritten again in the Part I
style; the `s31` step-0 caption now says "mille microlitri", so no unit conversion
remains.
(d) likewise: the 10 % price figure is now an "If asked" line on `s26`, not part
of the step-2 note.
