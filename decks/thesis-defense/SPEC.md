# Thesis Defense deck: spec

**Address:** `decks/thesis-defense/index.html` · **Defense:** 28 September 2026 · **Length:** 30 minutes including a 5 minute live demo, then questions · **Author:** Sirio Vittorio Feltrin.

Status: built and verified 2026-09-20 (English host deck), Revision 1 (Sirio's first notes) and Revision 2 (presenter preview) applied the same day; Italian guest deck (`it/index.html`) built 2026-09-24 from `it/parts/` (`python assemble.py it`). Handoff notes in `BRIEF.md` section 0. Content and per-slide design are in `CONTENT.md` (v3.1, 43 slides plus 23 backups); requirements and decisions in `BRIEF.md`; the build rules in `BUILD-CONTRACT.md` and `BUILDER-REFERENCE.md`.

## 0. Slide numbering, after the September 21 restructure

The number a slide shows is its **position among the talk's slides**, not its cue.
Cues are stable identifiers (the sync key, and the Italian deck's key) and no longer
track the running order, so a section can be moved between or within part files with
no rename anywhere. The hold screen opts out with `data-talk="no"`; backups number
separately as B01…B23.

Opening and Part I run, in order:
`s00` hold · `s01` cover · `s02` the arrivals hall · `s04` the field laboratory ·
`s03` contents · `s05` Part I divider · `s06` the gap · `s04b` the volume range ·
`s04d` the span · `s04c` PANPOC · `s07` the design problem and the gates ·
`s07a` the modules on the machine · `s07b` how they relate · `s10` the hierarchy ·
`s09b` 3D printing · `s08` the house · `s09` the working environment.

`s04b`, `s04d` and `s04c` sit in `20-part1.html` while their rules and builders stay
in `10-opening.html`'s hoisted blocks, shared with `s04` through the `.s04fam` class.
`s07` and `s07a` share `.s07fam` the same way. The assembler hoists every
`data-part` block wherever it lives, so the split costs nothing.

**Trap:** the assembler finds those blocks by regex. Writing either tag name in prose
inside a part file makes it swallow the rest of the file. `assemble.py` now warns.

## 1. Structure

| Block | Slides | Minutes |
|---|---|---|
| Hold screen (not part of the talk: no number, no rail, no timer) | S00 | — |
| Opening: the arrivals hall, contents, still by hand | S01 to S04 | 2 |
| Part I: why this machine, and how I worked | S05 to S10 | 4 |
| Part II: the modules (pump, alignment, nozzle, interface, storage) | S11 to S24 | 9 |
| Part III: the machine, wired, assembled, validated | S25 to S35 | 5.5 |
| Live demo | S36 | 5 |
| What I learned, what comes next (chapter 13) | S37 to S41 | 3.5 |
| Closing: the arrivals hall again, thanks | S42 to S43 | 1 |
| Backups, hard cuts | B01 to B23 | not timed |

Every slide carries a `data-cue` (`s01` to `s43`, `b01` to `b23`); the Italian deck will reuse them, and the sync protocol addresses slides by cue.

## 2. Source and assembly

`index.html` is generated, never edited by hand. Source fragments live in `parts/`, one per block (`00-head`, `10-opening`, `20-part1`, `30-part2`, `40-part3`, `50-discussion`, `60-backups`, `99-tail`); `assemble.py` (run with the anaconda python from this folder) concatenates them in name order, hoisting each part's `<style data-part>` into the head and `<script data-part>` before `</body>`. Edit a part, re-run the assembler. The head holds all shared CSS; the tail holds the infrastructure script.

## 3. Runtime

The shared deck runtime `assets/deck.css` and `assets/deck.js` (1280 by 720 stage, flat `section.slide` sequence, `.fragment` steps, one crossfade), with additions made to `deck.js` on 2026-09-20 (additive; the lab-meeting deck verified unchanged):

- `window.Deck`: `slideNo`, `index`, `step`, `count`, `steps`, `cue`, `el`, `state`; `goToState(slide, step, remote)`, `goToCue(cue, step, remote)`, `advance()`, `retreat()`, `overview()`, `blackout()`, `fullscreen()`; `slide(cue, builder)` registers a GSAP timeline builder, `enter(cue, fn)` an entrance hook. `window.Deck` exists synchronously so part scripts can register during parsing.
- `deck:state` CustomEvent on `document` after every navigation, `detail: {slide, step, cue, count, steps, remote}`.
- Hash `#/<slide>/<step>`, 1-based slide, read on load and `hashchange`, written with `replaceState`.
- Keys: arrows, Space, Backspace, PageUp, PageDown walk **clicker steps**; `a` and `d` (deck-local, in the tail) jump a whole **slide** at a time, landing at step 0 and ignoring the fragments — `d` forward, `a` back, both no-ops at the ends, both walking into the appendix exactly as the right arrow does. Then Home, End, digits then Enter, `b` blackout, `f` fullscreen, `o` overview, `r` presenter timer reset, Escape (Instruments panel, then a grown tool card, then the overview).
- `a` and `d` are ignored when a modifier is held, while a tool card is grown (`body[data-demo-active]`), and while focus is in an `input`, `textarea`, `select` or a contenteditable — the live tool pages take typing. They are bound in the stage and presenter views only; the guest view follows its host.
- Overview clones show a video's poster instead of the video.

Deck-local (tail script): one GSAP timeline per slide, built lazily on first entry, driven to `step<n>` labels by a MutationObserver on the fragments (`tweenTo`, or `seek` under reduced motion and on backward entry); lazy media (`data-src` on `img`, `video`, `iframe`; one-slide lookahead; unloaded beyond two slides); video autoplay on entry and pause on leave, `data-sound` for the one clip per slide that plays with audio; tool cards that grow to 1200 by 648 on click and load their iframe then; the section rail rendered once and lit per `data-part` (five pips, one per row of the contents slide: Part I, Part II, Part III, live demo, what I learned; `disc` and `close` share the last, `open` lights none, `backup` dims all and reads "appendix") in the free strip above the titles at top right, hidden only on the hold screen; the slide number in the bottom right corner of every slide, read from the cue (`s07` renders `7`, `b01` renders `B01`) so it survives a slide being inserted ahead of the deck, and opted out of with `data-no="none"`; the corner nav fading after 3 s of stillness; the HUD moved top right. **The frame has its own space (2026-09-21).** While a slide is shown the frame is one 32 px back arrow at the window's top left (`aria-label` “Back to presentations”), clear of the stage's module mark at `x = 56` in stage coordinates, and it keeps the idle fade, so a fullscreen run shows nothing; the Instruments trigger and its panel are `display:none`, because a talk is not a website. While the overview is open the frame becomes a fixed 64 px glass strip across the top with the Instruments link on it, the overview reserves 88 px of top padding so its header and first band of thumbnails start below the strip, and the strip does not fade while he is browsing. The rules live in the tail's `<style data-part="tail">`, which the assembler hoists last and which therefore overrides `00-head.html` section 1 on equal specificity.

Motion: GSAP core 3.15 with DrawSVG, MotionPath and MorphSVG, all vendored in `assets/gsap/`; CSS transitions for simple reveals. `prefers-reduced-motion` jumps every timeline to its end state.

## 4. Three views, one file

- `?view=stage` (default): the projected deck.
- `?view=presenter`: Sirio's laptop screen: the stage scaled into a panel, the next step or next slide as a caption plus a live-built clone (the target slide's timeline is rebuilt on the clone, seeked to the target step and settled, so the panel shows the projector's state after the next press, not the slide at rest), the current slide's `aside.notes` at 22 px, slide and step counters, a clock, an elapsed timer that starts on the first key press (reset with `r`), and the remaining time against the 30 minute plan. Keys in the presenter window drive the stage window.
- `?view=guest`: no nav, no HUD, full-window deck, a status dot top right that turns green when a sync message arrived in the last 20 s. This is the view the Italian deck will use.
- Step-synced captions (2026-09-23): notes bullets carry `data-step`; the presenter highlights the current bullet, and the guest view fits the slide above a 22 vh band showing the slide's `.notes-it` Italian title and current Italian caption. Contract in `BUILDER-REFERENCE.md`, "Step-synced captions"; stage view unchanged.

## 5. Synchronisation

BroadcastChannel `deck:thesis-defense` is always on: windows of the same origin on one machine (stage and presenter) follow each other in both directions, guarded by a per-window `sid` and a monotonic `seq`. A late-joining window sends a `hello` and receives the current state without disturbing the others.

With `?sync=host` the deck also posts every state (coalesced 120 ms, heartbeat every 15 s) to `https://ntfy.sh/svf-defense-20260928-k7q2m9x4`; with `?sync=guest` it subscribes to that topic's `/sse?since=2m` stream and applies states by cue. Message: `{ v:1, deck:'thesis-defense', sid, cue, step, seq, t }`; stale (older than 2 minutes) or out-of-order messages are ignored. Without a `sync` parameter the deck makes no network call.

Plan for the day: stage window `index.html?sync=host` on the projector, presenter window `index.html?view=presenter` on the laptop screen (extended desktop, not mirrored), guest laptop `it/index.html?view=guest&sync=guest` on the family screen. If ntfy.sh is unreachable on the venue network, the guest keyboard still works for manual catch-up.

## 6. Embedded tools

| Slide | Tool | How |
|---|---|---|
| S09 | the site | address and QR (`assets/qr-site.svg`) |
| S13 | Rotor Geometry Solver, Occlusion and Displaced-Volume Model, Tensioned Tube-Path Model | three tool cards, click to grow; Sirio opens the solver live |
| S23 | Live User Interface | tool card |
| S26 | System Architecture Explorer, Dispense Throughput Simulator | two tool cards; both opened briefly |
| B14, B18 | Architecture Explorer, Thesis Timeline | tool cards |

Posters for every card in `assets/posters/`, captured 2026-09-20 at 1280 by 800.

## 7. Media

Web clips from `assets/media/video/` (module clips muted; the four machine clips with their audio, the longest on a slide carrying sound), web stills from `assets/media/`, and deck-local assets in `assets/`: the airport photo, the thesis figures rasterised from the PDFs (`figs/`), selected stills (`stills/`), the 134 device captures (`ui/`), posters, the QR. Inventory in `ASSETS.md`.

## 8. What is real, staged and faked

Real: every number, every photo, every clip, the tool pages (the same files the site serves). Staged: the outdoor run is a scenario, not a field deployment, and the slide says so. Drawn for the deck: the house metaphor, the gap matrix icons, the accuracy chart (the thesis has no plot for the 18 % to −3.4 % result), the six-stage chain, the reader pairing. Both QR codes are the real code for the site (verified by decoding).

## 9. Open

Italian guest deck (`it/`): built 2026-09-24 by Claude, for Sirio to correct. A rehearsal on the venue network for ntfy.sh. Sirio's further review rounds. The QR swap is done (both codes decode).

## 10. Verification 2026-09-20

Final pass on the assembled file at 1280 by 720, in an isolated browser context with BroadcastChannel stubbed and the console watched throughout.
Walked S01 to B23 and back, every step in one pass: 66 slides, 150 fragments, 216 clicker positions, 215 presses each way, no stuck state. One screenshot per slide at its last step in `screens/final-<cue>.png`, all inspected.
Console: one GSAP "target not found" warning on S23, fixed; the final build logs nothing in either direction, in either presenter or guest, or through the tool card, the mosaic, blackout, overview and reduced motion.
Fixed, with the detail in `PUNCHLIST.md`: the 18 px floor applied deck-wide (`.kicker`, `.card__kicker`, `.sheet__panel-k`, `.tool-card__hint`, `.p3-k`, `#s04 .s04-jlab`) and the sheet rail re-spaced to absorb it; the S30 rail overflow; the S22 caption clipped by the candidate row; the S35 mini map behind a grown clip; the overview thumbnails rendering alt text.
Two real runtime bugs fixed in `parts/99-tail.html`: leaving a slide mid-tween left that tween running, so S30's unmuted clip restarted over S31 and S32 — the outgoing timeline is now killed and paused on leave; and the presenter's next-step preview stripped the clone's ids, which broke every `#sNN` rule the builders wrote — the clone now keeps them.
QR: the S09 and S43 module grids are identical and match, module for module, a version-3 ECC-M mask-4 code for `https://sirsirio.github.io/thesis-tools/`. Verified against the `qrcode` library, since cv2 and pyzbar are not installed.
Views: presenter shows the scaled stage, the next-step caption, notes at 22 px, slide, step, elapsed, remaining and clock; guest drops the nav and the HUD and fills the window with the "seguiamo" dot. A key press in a presenter window moves a stage window in a second tab, and the reverse, over BroadcastChannel with no network.
Tool card on S13: the iframe loads the live rotor solver, takes focus, Escape shrinks it and the deck keys work again. S35: a clicked clip grows, takes the sound and fades the others; Escape restores the mosaic without opening the overview. `b` and `o` both behave, and the overview shows posters, not clips.
Reduced motion: `#/15/0` plus four presses, every state complete and instant, no active tween at any step.
Open after this pass: the judgement calls listed in `PUNCHLIST.md` section (b), which are Sirio's to make, and the Italian guest deck.
