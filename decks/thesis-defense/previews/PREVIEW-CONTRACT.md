# Preview round: one slide, three dialects

Three single-slide preview pages, `a.html`, `b.html`, `c.html`, in this folder. Each is a real, working slide from the defense deck, built on the site's deck runtime, so Sirio can step through it with the arrow keys exactly as in the talk. Same content in all three; what differs is the composition and the motion language. He picks one by looking; the chosen dialect becomes the design recipe for the whole deck.

Serve with `.\serve.bat` from the repo root and open `http://localhost:7331/decks/thesis-defense/previews/a.html` (and b, c). Never open these through VS Code Live Preview.

## The slide (S15 of CONTENT.md v3.1)

**Title:** Three more builds fixed the printing, not the physics.

Pump section, so the accent is the pump thread: orange `#ff6b2b` to red `#e83535` (the global accent; no `--accent` override needed).

Four clicker steps (`.fragment` elements in DOM order), each with one image, one number and one short label. The step sentences below are what Sirio says; on screen only the label and the number appear.

| Step | Build | Image | Number on screen | Label on screen | What Sirio says |
|---|---|---|---|---|---|
| 1 | v2.1 | `../assets/fig-v21-gap-around-arc.png` (a: the dovetail offset in section, exaggerated ten times; b: the gap at three slots against the 1.82 mm closure line, apex at 2.22 mm) | 2.22 mm | the mount sat 0.45 mm high | The mount sat 0.45 mm high, so the gap opened to 2.22 mm at the top of the arc against a 1.82 mm closure threshold. The rollers sealed at the sides and let go across the top. |
| 2 | v2.2 | `../assets/fig-roller-peg-taper.png` (a: printed peg tapering 0.085 mm with two stacked bearings, roller tilted 0.6°; b: one bearing on the wide base with guide rims; photos of the two rotor halves) | 0.6° | printed pegs taper, rollers tilt | Printed pegs taper about 0.085 mm from base to tip, so two stacked bearings tilted the roller by 0.6° and it walked the tube. Fixed with one bearing on the wide base and guide rims on the rotor. |
| 3 | the printer | `../assets/calibration-rings.jpg` (the printed calibration rings) and `../assets/fig-print-compensation.png` (two rules: outer diameters shrink proportionally, inner bores lose a fixed amount) | ±0.10 mm | outer shrinks 0.65 %, inner loses 0.14 mm | A housing drawn at 1.52 mm printed at 1.75, because printers shrink inner curves. So the printer was characterised on rings: outer sizes shrink 0.65 %, inner bores lose a fixed 0.14 mm, and parts became predictable to ±0.10 mm. |
| 4 | v2.3 | `../assets/fig-pump-head-gap.png` (the assembled head in CAD with the gap and three red inspection slots) and `../assets/v23-render.png` | 1.52 mm | measured at three points | The seat was lowered by a measured 0.35 mm, and the installed gap read exactly 1.52 mm at the apex and at both ends of the track. |

Closing line, spoken, not shown: "CAD dimensions are assumptions until anchored to a physical datum."

Speaker notes for the presenter view, as an `<aside class="notes">` inside the slide (hidden on stage): the four spoken sentences above as four short bullets, plus the closing line.

## The three dialects

**a.html, the engineering sheet.** Calm and precise. The four builds sit as a column of small panels down the right edge; the active one takes the left two thirds. Dimension lines and callouts draw themselves (DrawSVG) on the active image; the number counts up in the mono face; a thin timeline of the four builds runs along the bottom and fills as the steps advance. The failure is animated on the drawing: the mount offset tweens upward, the gap value opens from 1.82 to 2.22; the peg tapers and the roller tilts then snaps straight; the ring rules animate as an outer circle shrinking and an inner bore thickening inward; on the last step "1.52" appears at three points on the arc, apex first. Reads like a well-made engineering drawing brought to life.

**b.html, the cinematic cut.** One image at a time, large, nearly full bleed under a dark scrim, with a slow 1200 ms crossfade and a gentle 4 % scale drift (Ken Burns) on each build. The number is very large (mono, 160 px at stage size) and lands after the image; the label is one small line. The builds already shown shrink into a filmstrip along the bottom edge, so the story accumulates. The failure is shown with a single drawn stroke on the photo or figure (a drawn arc over the open gap; a drawn tilt line on the roller; a ring drawn on the calibration coupon; three drawn ticks on the arc). Dramatic, image first, the least text of the three.

**c.html, the stacked cards.** The four builds are large cards in a loose physical pile, slightly rotated, like sheets on a bench. The active card lifts to the front, straightens and grows; the others tuck behind with a soft settle (`back.out`). Each card has a kicker ("v2.1", "v2.2", "the printer", "v2.3") in small caps, the image, the number in the mono face, the label. The failure animates inside the card. On the last step the four cards fan out into a row so the whole story is visible at once. Tactile, playful within the site's restraint.

Each dialect must also imply how it would scale to the other slide types of the deck (a photo-only slide, a chart slide, a live-tool card slide, a divider); the builder writes three lines about that in an HTML comment at the top of the file.

## Shared contract (identical in all three)

Runtime: the site's shared deck runtime, loaded exactly as `decks/lab-meeting-2026-06/index.html` does, at depth `decks/thesis-defense/previews/` (so paths are `../../../assets/...`). Stage is 1280 by 720, the runtime's fixed canvas. The page is one deck with one slide (plus nothing else). Head, in this order:

```html
<link rel="stylesheet" href="../../../assets/style.css" />
<link rel="stylesheet" href="../../../assets/site.css" />
<script src="../../../assets/site-nav.js"></script>
<link rel="stylesheet" href="../../../assets/deck.css" />
```

Body: the three `.bg-blobs` divs, the `.site-nav.site-nav--deck` header with `data-root="../../../"` and the back link to `../../index.html`, the `#instr-panel` div, `.deck-viewport > .deck-stage[tabindex=0] > section.slide.slide--active`, the hidden `.site-foot`, then `<script src="../../../assets/deck.js"></script>` and the deck-local script. Copy the deck-variant CSS block from the lab-meeting deck (the `.site-nav--deck`, `#instr-panel`, `line-height: normal`, `.site-foot { display:none }`, `html, body { overflow:hidden }` rules).

Steps: four `.fragment` elements in DOM order. The runtime reveals them with the right arrow or space by setting `data-fragment-revealed`. The deck-local script watches those attributes with a MutationObserver and drives one GSAP timeline per slide: on reveal of fragment n it plays `tl.tweenTo("step" + n)`; on un-reveal it plays back to the previous label. Build the timeline on slide entry (the slide is already active on load; call the builder on `DOMContentLoaded`). Under `prefers-reduced-motion: reduce`, jump with `tl.seek(label)` instead of tweening.

GSAP: `<script src="../../../assets/gsap/gsap.min.js"></script>` plus, only if used, `DrawSVGPlugin.min.js`, `MotionPathPlugin.min.js`, `MorphSVGPlugin.min.js` from the same folder, registered with `gsap.registerPlugin(...)`. No CDN scripts.

Identity: the site's tokens from `style.css` and `site.css`. Display face `var(--display)` (Geist Bold) for the title only; body `system-ui` stack; numbers in `var(--mono)`, tabular. Text `#f0ece8`, muted `#7a7068`, glass `rgba(255,255,255,0.04)` with `backdrop-filter: blur(24px)` and the orange-tinted `--glass-border`, radii `--r-lg` 28 px for media frames, `--r-md` 18 px for cards. Easing `--ease: cubic-bezier(.22,.68,0,1)` in CSS and `expo.out` in GSAP; 480 ms for reveals; slow fades 1200 ms. Keep the water wash showing through: slides are transparent, glass panels are sparse (one or two per slide, not a grid of them).

Type sizes at the 1280 by 720 stage: title 44 to 52 px, label 20 to 22 px, the number 96 to 160 px depending on dialect, kicker 14 px letter-spaced. Nothing below 18 px.

A mini map bottom right: the site's line mark (tube, rotor, nozzle, sample) drawn small in stroke only, with the rotor node lit orange. Static in the preview; it is the "you are here" device of the whole deck.

Keyboard guard: add the capture-phase key guard from `BRIEF.md` section 7 so Escape closes the Instruments panel without toggling the overview, and map PageUp/PageDown to the deck's retreat/advance by dispatching ArrowLeft/ArrowRight keydown events.

Images load with `loading="eager"` (it is one slide). Alt text present. No text on screen beyond: the title, the four labels, the four numbers, the four kickers where the dialect has them, and the mini map. No option letters, dialect names, file names or notes on the slide. The `<title>` is "Thesis defense · preview".

Verification before reporting: open the page through `http://localhost:7331/...` in the Playwright MCP browser (start `python -m http.server 7331` from the repo root if nothing is serving), press the right arrow four times taking a screenshot after each step, and once with the window at 1280 by 720 and once at 900 by 500 to confirm the stage letterboxes without overflow. Check the console is free of errors. Save screenshots beside the page as `a-step1.png` and so on. Report what you built, what you verified, and any deviation from this contract with its reason.
