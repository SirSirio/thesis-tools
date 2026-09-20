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
