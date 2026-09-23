# Builder reference (from the infrastructure build, 2026-09-20)

The API and classes a slide builder uses. Authoritative for `parts/*.html`. Companion to `BUILD-CONTRACT.md`.

## The loop
1. Edit **only** your own `parts/NN-*.html`.
2. `python assemble.py` from `decks/thesis-defense/` (prints the slide count and every `data-cue` found, warns on duplicates or missing cues).
3. Open `http://localhost:7331/decks/thesis-defense/index.html#/<n>/<step>`. Hard reload after anyone touches a shared file; a stale `deck.js` silently kills `window.Deck`.

## Part file shape
Slides first, then at most one `<style data-part="yourname">` and one `<script data-part="yourname">`. The assembler lifts them into the head and to just before `</body>` in part order. Never write `<head>`, `<body>`, or a bare `<script>` or `<style>` without `data-part`.

## Slide markup
```html
<section class="slide" id="s16" data-cue="s16" data-dialect="sheet"
         data-part="II" data-accent="pump" style="--head-h:0px">
  <h2 class="slide__title">Full assertive sentence.</h2>
  <div class="slide__rule"></div>
  …content, media with data-src…
  <i class="fragment step-cue" data-step="1"></i>
  <i class="fragment step-cue" data-step="2"></i>
  <aside class="notes"><ul><li>…</li></ul></aside>
</section>
```
- `data-cue` `s01…s43` / `b01…b23`: the sync key; the Italian deck reuses it.
- `data-part` `open | I | II | III | demo | disc | close | backup`: drives the mini map label.
- `data-accent` `pump | align | nozzle` or absent: sets `--t-a` / `--t-b` on that slide only. Never touch `--accent`.
- `data-map` `store | rotor | nozzle | rack | none`: override which mini map node lights (default from `data-accent`). The map hides itself on dividers and on `data-part="open"` / `"close"`.
- `.fragment` markers in DOM order = clicker steps. `.step-cue` parks them off canvas (invisible markers). Put content *inside* a `.fragment` only when deck.css's plain fade is enough.
- `aside.notes`: 2 to 4 bullets, presenter view only, never on stage.

Divider: `<section class="slide slide--divider" data-part="II" data-accent="pump">` with `.divider__wash`, `.divider__inner > .divider__num / .divider__title / .divider__sub`, `.divider__rule`.

## Timelines
```js
Deck.slide('s16', function (el, gsap) {          // called once, lazily, on first entry
  const tl = gsap.timeline({ paused: true });
  tl.addLabel('step0');
  tl.to(…, 'step0').addLabel('step1');
  tl.to(…, 'step1').addLabel('step2');
  return tl;                                      // labels step0..stepN, N = .fragment count
});

Deck.enter('s16', function (el, gsap) { … });     // replayed on EVERY entry (entrance motion)
```
- Driver: `tweenTo('step'+n)` on a step change; `seek` on slide entry and under `prefers-reduced-motion`; entering backwards seeks the last label. A missing label falls back to the nearest lower one.
- **Scope every selector to `el`** (`el.querySelector(...)`). Never `document.querySelector`: the presenter view clones slides.
- GSAP core + DrawSVG + MotionPath + MorphSVG are loaded and registered by the tail. No other libraries.
- Test time only, never in a file: `gsap.ticker.lagSmoothing(0)`.

## window.Deck
| Member | Meaning |
|---|---|
| `Deck.slide(cue, fn)` | register a timeline builder |
| `Deck.enter(cue, fn)` | register an entrance hook |
| `Deck.slideNo` · `Deck.index` | current slide, 1-based · 0-based |
| `Deck.step` | fragments revealed, 0 = none |
| `Deck.count` · `Deck.steps` | slides in deck · fragments on this slide |
| `Deck.cue` · `Deck.el` | current `data-cue` · current `<section>` |
| `Deck.state` | `{slide, step, cue, count, steps}` |
| `Deck.goToState(slide, step, remote)` | 1-based slide |
| `Deck.goToCue(cue, step, remote)` | returns `false` if the cue is unknown |
| `Deck.advance()` `Deck.retreat()` `Deck.overview()` `Deck.blackout()` `Deck.fullscreen()` | |
| `Deck.ready` `Deck.reducedMotion` `Deck.slides()` | |
| event `deck:state` on `document` | `detail: {slide, step, cue, count, steps, remote}` |

Keys: `→` `Space` `PageDown` advance · `←` `Backspace` `PageUp` retreat · `Home` `End` · digits then `Enter` jump · `b` blackout · `f` fullscreen · `o` overview · `r` resets the presenter timer · `Esc` closes the Instruments panel first, then the grown tool card, then toggles the overview.

## Media (all lazy, infra driven)
```html
<img   data-src="../../assets/media/pump/proto01-open.jpg" alt="…">
<video data-src="../../assets/media/video/pump-head.mp4"
       poster="../../assets/media/video/pump-head-poster.jpg"
       muted loop playsinline preload="none"></video>
```
`src` is swapped in on entry with one-slide lookahead and cleared beyond two slides. Videos autoplay on entry and pause on leave. `data-sound` on **one** video per slide plays it unmuted (falls back to muted if the browser refuses); `data-noauto` skips autoplay. A poster is mandatory; the overview shows it instead of the clip. Paths are relative to `decks/thesis-defense/index.html`.

## Live tool card
```html
<div class="tool-card" data-tool="rotor"
     data-src="../../tools/rotor-solver/index.html"
     data-poster="assets/posters/rotor-solver.png"
     style="left:56px; top:184px; width:560px; height:400px;">
  <span class="tool-card__name">Rotor Geometry Solver</span>
  <span class="tool-card__line">One line of what to look at.</span>
</div>
```
Position it absolutely with inline `left/top/width/height`. Infra adds the shade and the "Open live" chip, loads the iframe on first click, grows it to 1200 × 648 at (40, 36), hands focus to it, and shrinks it on Escape (inside or outside the iframe) or a backdrop click. Posters in `assets/posters/`: `rotor-solver`, `architecture-explorer`, `throughput-simulator`, `occlusion-model`, `tensioned-path`, `thesis-timeline`, `ui-mockup`, `ui-prototypes`, `site`.

## Shared classes
**Frame**: `.slide__title` (Geist Bold 44 px at 56/60; `--lg` = 52 px), `.slide__rule`. Two knobs on the `<section>`: `--title-w` narrows the title; `--head-h` is the extra height a **two-line** title needs (pushes the rule and the dialect A blocks down, keeps their bottom edges fixed). Use `--head-h:48px` for a two-liner, 0 for one line.

**Dialect A, engineering sheet**: `.sheet` › `.sheet__main` (+ `.sheet__grid`, `.sheet__reg--tl/tr/bl/br`, `.sheet__figs` › `.sheet__fig` › `.sheet__frame`), `.sheet__rail` › `.sheet__panel` (+ `.sheet__panel-bar/-k/-t`), `.sheet__readout` › `.sheet__ro` › `.sheet__num` + `.sheet__label`, `.sheet__timeline` (+ `-track`, `-fill`, `.sheet__stop`). Geometry is preview A's, to the pixel.

**Dialect B, cinematic cut**: `.cine` › `.cine__shots` › `.cine__shot` (`.is-live` runs the 22 s Ken Burns) › `.cine__img` (`--cover`, `--bleed`), `.cine__draw .stroke`, `.cine__scrim`, `.cine__text`, `.cine__kicker`, `.cine__num` (`.v` / `.u`), `.cine__label`, `.cine__strip` › `.cine__thumb`. Set `--cine-scrim` on the slide (default `0.82`, preview B was `1`) to brighten or darken the plate.

**Dialect C, stacked cards**: `.pile` › `.card` › `.card__kicker`, `.card__media` (`--cover`, `--dark`), `.card__foot` › `.card__num` (`.u`) + `.card__label`. `.paper` is the standalone warm `#f6f3f0` frame for print figures.

**Shared parts**: `.num` (`--hero`, `--grad`), `.kicker` (`--muted`), `.leader` (SVG overlay; strokes take the thread colour, draw them with DrawSVG) and `.callout` (`--ghost` for dark backgrounds), `.tool-card`, `.minimap` (infra renders it once, do not add your own).

Tokens: `--display --mono --ease --dur --dur-fast --dur-slow --r-lg/-md/-sm/-pill --glass-bg --glass-border --text --text-soft --muted --accent --t-a --t-b --paper --paper-ink`.

Rules: nothing below 18 px at stage size, no bullet lists on the stage, no internal labels (no step numbers, dialect names, file names), no horizontal overflow of the 1280 × 720 box.

## Views and sync
`?view=stage` (default) · `?view=presenter` · `?view=guest`. `?sync=host` / `?sync=guest` add the ntfy relay (topic `svf-defense-20260928-k7q2m9x4`); BroadcastChannel `deck:thesis-defense` is always on, so two windows on one laptop stay in step with no network and no parameter. With no `sync` parameter the deck makes no network call.

## Step-synced captions
The notes are one bullet per build step, and both non-stage views follow the step (runtime: `parts/99-tail.html` sections 6c and 7a, added 2026-09-23):

```html
<aside class="notes">
  <ul>
    <li data-step="0">English bullet shown from step 0 (slide entry)</li>
    <li data-step="2">English bullet current from step 2 until the next bullet's step</li>
    <li>If asked: … (no data-step: panel-question material, never highlighted)</li>
  </ul>
  <div class="notes-it" lang="it">
    <p class="notes-it__title">Titolo della slide in italiano</p>
    <ul>
      <li data-step="0">Didascalia italiana</li>
      <li data-step="2">…</li>
    </ul>
  </div>
</aside>
```

- **Current-bullet rule:** the current bullet is the last `li[data-step]` whose `data-step` is at most `Deck.step` (0 = slide entry, up to `steps`). Stateless per state, so stepping backwards works the same way. If no bullet qualifies yet, none is current.
- **Presenter:** the current bullet is `is-now` (full opacity, accent bar and accent disc), earlier ones `is-done` (45 %), later ones `is-next` (70 %); the panel scrolls the current bullet into view. A bullet without `data-step` renders neutral; only one whose text starts with `If asked:` gets the quieter italic panel-question style. The `.notes-it` block is removed from the panel.
- **Guest:** the slide is fitted above a fixed band of 22 vh; the band shows `.notes-it__title` on one muted line and the current Italian `li[data-step]` large, crossfading on change. A slide without `.notes-it` shows an empty band of the same height.
- **Stage:** unchanged; `aside.notes` and `.notes-it` never render there.
- A slide with no `data-step` bullets renders its notes exactly as before. Content may use inline markup (`<em>`, entities); keep captions to one or two lines at 34 px.
- **The meta line drives the timers:** a first bullet `<li data-step="meta">~40 s</li>` (also `~1 min 30 s`, `~1:30`, `~5 min`; anything after a `&middot;` is commentary) is the slide's time target, never a caption. The presenter's pacing timers use it (`parts/99-tail.html` section 0b and `measurePlan()`): a slide with a meta gets exactly that many seconds, the band's other spoken slides share what is left of the band budget equally (0 s if nothing is left), a section's timer is the sum of its slides, and the ahead/behind colour on Elapsed uses the same per-slide seconds. The Part timer still counts down the band figure in `BAND_PLAN`. In the presenter the meta line shows as a small muted "target ~40 s" line, is never marked done/next, and the bar repeats the slide's planned seconds beside the slide count. The Italian block takes no meta line.

## Deviations from BUILD-CONTRACT.md, accepted
`Deck.slide` is the registration function (`Deck.slideNo` is the getter); `window.Deck` exists synchronously; the Escape guard uses a capture-phase probe; `--head-h` added; the HUD sits top right; a sync bootstrap guard stops a late-joining window from yanking the others; the presenter's next preview builds the target state on a clone (your builder and your `Deck.enter` hook are called again, on the clone, with `dataset.preview` set — keep every selector scoped to `el`, and guard anything that starts a live clock, an interval or a document-level listener with `if (el.dataset.preview)`).
