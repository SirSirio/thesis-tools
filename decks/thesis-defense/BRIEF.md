# Thesis defense deck: project brief

## 0. Handoff state (2026-09-20, end of the first build session)

**Where things stand.** The English host deck is built, assembled and verified: 43 slides plus 23 backups (66 sections, 147 clicker steps), zero console errors on a full forward and backward walk, QR codes decode, presenter view, guest view and same-laptop sync tested. Sirio has walked it once; his first round of notes (Revision 1) is applied, the presenter's next-step preview is fixed (Revision 2), and the presentations index has the two hover cards (presenter view, Italian guest). The Italian deck is not built. Defense: **28 September 2026**.

**How to run it.** From the repo root, `.\serve.bat` (or `python -m http.server 7331`), then:
- Stage (projector): `http://localhost:7331/decks/thesis-defense/index.html`
- Presenter (Sirio's laptop, drives the stage, relays to the family screen): `…/index.html?view=presenter&sync=host`
- Guest (Italian, second laptop): `…/it/index.html?sync=guest` — the Italian deck (built 2026-09-24): every slide translated with the same layout, opening in the guest view, with the Italian caption of the current click in a band under the slide; no band on the cover and the appendix. Built from `it/parts/` by `python assemble.py it`. On one laptop, a second window at `it/index.html` follows with no parameter (BroadcastChannel).
- Both drop-down cards are on `decks/index.html` under the defense card (hover).
Never edit `index.html`: edit `parts/*.html`, run `assemble.py` with the anaconda python from the deck folder. Never open pages through VS Code Live Preview.

**Read in this order in a new session.** `ASSISTANT-GUIDE.md` first if you are one of the per-part chats — it is the standing working agreement: the role, how work is delegated, how Sirio wants to be answered, which part owns which slides and thesis chapters, what each chat may and may not edit, the hard content rules, the verification owed and the traps. Then this file (sections 2 and 3 for what Sirio wants and decided), `CONTENT.md` (the slides, section L dialect map, section H motion, sections I to K change logs), `PUNCHLIST.md` (what the reviewers saw and what Sirio should judge; Revision 1 and 2 notes), `SPEC.md` (runtime, views, sync), `BUILDER-REFERENCE.md` and `BUILD-CONTRACT.md` (how to write or change a part), **`SLIDE-ORDER.md`** (how the deck is sorted: the band/topic taxonomy behind the overview, what makes a slide an appendix slide, and the recipes for adding a slide, moving one into the appendix or adding a topic — read it before you move or renumber anything), `SKILL-NOTES.md`, `ASSETS.md`. The thesis reports in `research/` answer content questions with section references.

**What comes next, in order.**
1. Sirio's next walk-through and notes: cut, add, change. Apply per part, reassemble, re-run the overflow and console walk (an agent, the main context gets heavy). Rules that stand: "alignment" never "stage"; no filler text; he narrates, slides show; nothing below 18 px; no text over titles or out of boxes; be creative beyond the three dialects.
2. *(Superseded 2026-09-23: the Italian is now served in-deck by the guest view — each slide's notes carry a `.notes-it` block with `data-step` captions, see `BUILDER-REFERENCE.md` "Step-synced captions". Part II is tagged; Part I and Part III still need their captions tagged. The original plan follows for reference.)* The Italian guest deck at `decks/thesis-defense/it/`: same `data-cue` and step counts as the host (the sync addresses slides by cue), built as its own parts folder and assembler from the same head and tail, `?view=guest`, image column about 55 % and caption column 45 %, the caption of the current step at 1.35 times the base size and full opacity, earlier captions at 55 %, later ones hidden, breadcrumb "Parte II · La pompa", "Sirio sta parlando di" label, "In questa parte" on dividers, screenshots instead of iframes, the demo checklist on screen. Claude drafts the Italian from the notes and step sentences in `CONTENT.md`; Sirio corrects.
3. A rehearsal with two laptops on the venue wifi for the ntfy relay (topic `svf-defense-20260928-k7q2m9x4`); if blocked, the guest keyboard is the fallback.
4. On the day: extended desktop, not mirrored; press one key on the stage before the room fills so the cover clip's sound is allowed; the machine arrives with dye and a rack loaded; the demo slide's `v` key plays the fallback clips.
5. Committed and pushed as `4cdf125` on master (2026-09-20). `screens/` is git-ignored (108 MB of verification screenshots); `previews/` is committed as the design reference. Later edits: change a part, reassemble, commit the part and `index.html` together.

---

Working file for the defense presentation. Read this first in every session that touches `decks/thesis-defense/`. Sections marked **decided** are settled with Sirio; everything else is open.

Started 2026-09-19. Thesis submitted, final text in `D:\03. DTU - Offline\03. MASTER THESIS\01. Thesis Document LaTex\latex\` (see memory note `thesis-source-and-showcase-assets`).

---

## 1. What is being built

| Item | Value |
|---|---|
| Deliverable | An HTML slide deck for the 30-minute master's thesis defense, living at `decks/thesis-defense/` on the thesis tools site, listed on `decks/index.html` |
| Runtime | The shared deck runtime `assets/deck.css` + `assets/deck.js`, same as `decks/lab-meeting-2026-06/` |
| Thesis | Modular automated liquid dispensing for point-of-care use, Sirio Vittorio Feltrin, DTU 2025-2026 |
| Duration | 30 minutes including a 5 minute live demo, then questions. **Defense date: 28 September 2026** |
| Language | English (host deck) |
| Second deck | Italian "guest" deck, same slides and steps, more text, follows the host in real time on a second laptop (see section 4) |
| Backup slides | A separate section after the closing slide, for the question session (see section 5) |

## 2. Sirio's requirements (from the 2026-09-19 brief, verbatim intent)

**Content**
- Go through the whole thesis; the deck follows the thesis structure more or less, with its three parts.
- Videos and photos, not too much text. Take advantage of the thesis images; graphical over textual.
- Keep the thesis opening (the airport scene) and the closing that returns to the same scene.
- **Titles carry the message.** Not "Prototype 1: mechanisms" but "Prototype 1 showed the gap was inconsistent". Every slide title is a full assertive sentence with the actual finding.
- Orientation slides: a contents slide near the start so Sirio can announce the structure, and divider slides when passing from one part to the next, so listeners can follow.
- Must be easy to follow in 30 minutes. Titles and text in simple, clean, easy language; no AI slop; the frontend-slides skill's content rules apply.
- A red thread the listener can follow (v2: follow the liquid through the machine).
- Chapter 13, the discussion, is a main focus and must be well represented; the prototype story can be cut to make room.
- A live demo of the machine, about 5 minutes, after everything built has been shown and before the discussion. Slide content shrinks to make room.
- Tools used for a module are embedded on that module's slides and can be clicked to enlarge and shown live (rotor solver for the pump; architecture explorer and choreography simulator for the electronics).
- Architecture: show the process, not pin counts.
- Integration: image intense, in the thesis order (carriers, nozzle in place, display holder, battery cradle, whole machine), with the grow and shrink effect.
- Storage module presented last among the modules.
- Be creative with animation and transitions; the listed ideas are a floor, not a ceiling.
- Embed some of the website tools live in the deck (HTML allows it), and mention them.
- Animations and transitions are wanted, and should ease the listener into focusing on what is being explained. Images shrinking and growing within one slide is a good pattern.

**Process**
- First: 5 ideas on in-slide animation that help the listener, and 5 ideas on transitions (part to part, slide to slide). Discuss before building.
- Then: a draft of the content, all slides, for approval.
- Only after approval: build. Check output before shipping.
- Subagents on Opus 5 to save tokens.
- Keep this md file up to date for the chats to come.

**Italian guest deck** (built LATER, after the English content is approved; infrastructure designed now)
- Same content and same slide/step sequence as the English deck, more text, in Italian, in actual sentences, so family who do not speak English can read the main points.
- Runs on another laptop connected to a screen, at a separate link, as a "guest" that follows the "host" (English) deck: every slide change and every in-slide step on the host is mirrored on the guest.
- The text relevant to the current step is emphasised (bigger); when the next step comes, the previous caption shrinks and the new one grows. Images may be smaller than in the English deck to leave room for text.
- Where the English slide has an image with no caption (Sirio explains it aloud), the Italian slide carries the caption.
- Other ideas to make it easier to follow are welcome.

**Backup slides**
- Extra slides for things that do not fit the 30 minutes, for the question session. Sirio will guide the list later; a first proposal is welcome.

## 3. Decisions log

| Date | Decision | Status |
|---|---|---|
| 2026-09-19 | Deck lives at `decks/thesis-defense/`, guest deck at `decks/thesis-defense/it/` (same runtime, same slide ids) | proposed |
| 2026-09-19 | Animation and transition ideas | reviewed 2026-09-20: fit to focus accepted, but not tied to a thumbnail rail; layout of images and bullets follows each slide's content. The other ideas accepted. Sirio wants more, slide-specific creativity |
| 2026-09-20 | Motion stack: not CSS only. GSAP core (already vendored) plus the free DrawSVG, MotionPath and MorphSVG plugins, vendored into `assets/gsap/`; one timeline per slide driven by the fragment steps. Per-slide motion design is `CONTENT.md` section H | decided |
| 2026-09-20 | Offline-from-USB does not apply to this deck: Sirio values quality over exportability. Web fonts and hosted libraries are allowed. Anything cheap to vendor is still vendored, because venue wifi can fail on the day | decided |
| 2026-09-20 | Build must follow the `frontend-slides` skill (github.com/zarazhangrui/frontend-slides), installed locally at `.claude/skills/frontend-slides/`; how it applies is in `SKILL-NOTES.md` | done |
| 2026-09-19 | Slide-by-slide content draft v1: 47 slides (4 dividers), 20 backups, 3 live tools | superseded by v2 |
| 2026-09-20 | Content draft v2 after review: airport photo on S02, S03, S46 (`assets/airport-arrivals.jpg`, licensing accepted by Sirio for a website slide); plain-language titles; AI as two slides (house metaphor, then tools with all three figures); printer and measurement lessons moved into the pump story; storage slide added (Marius's three photos); Part II follows the liquid; pump story cut; chapter 13 expanded to six slides; ideas declared non-binding | superseded by v3 |
| 2026-09-20 | Content draft v3 after the second review: a 5 minute live demo after validation and before the discussion (S37, fallback clips); storage module last in Part II; pump tools and architecture tools embedded as click-to-enlarge live cards (Sirio opens the rotor solver, the explorer and the choreography simulator briefly); architecture slide about the process, pin numbers to backup; integration as three image-heavy slides in thesis order; explicit creativity mandate in sections A and B; 44 slides | superseded by v3.1 |
| 2026-09-20 | v3.1: airport slides merged (S02, eight steps); four whole-machine clips found in the thesis exports and placed (cover loop, forty-tube slide, whole-machine slide, and all four on a machine slide before the demo); machine arrives ready for the demo; less text, images speak; 43 slides | drafted in `CONTENT.md`, awaiting approval |
| 2026-09-20 | Sound on: the machine clips play with their own audio; when several clips share a slide, only the longest carries sound. The demo sped-up clip has no audio track in its master | decided |
| 2026-09-20 | Guest is a second laptop on the venue network: ntfy.sh is the primary sync path | decided |
| 2026-09-20 | Presenter view: Sirio presents from his laptop with the projector as a second screen. A presenter window shows the current slide, the next slide, minimal bullets of what to say, and a timer; it follows the projected window over BroadcastChannel. Speaker notes per slide are minimal bullets, written at build time from the Say lines | decided |
| 2026-09-20 | Italian text: Claude drafts, Sirio corrects. No PDF handout for the committee | decided |
| 2026-09-20 | Revision 1 after Sirio's first walk: "stage" replaced by "alignment" everywhere visible; S02 without text (wordless drawn scene, four clicks to the time comparison); S04 a text table of contents; seventeen filler strings removed; S07 title collision fixed; overflow audit at every clicker position, six hits fixed | done |
| 2026-09-20 | Revision 2: the presenter's next preview now runs the slide's timeline on a pristine clone and freezes it at the end of the next step; three builders guarded (`el.dataset.preview`); verified against the live stage on twelve states | done |
| 2026-09-20 | Presentations index: hover on the defense card drops two cards, presenter view (host) and Italian guest, in normal flow so the footer moves down; the host now relays states it receives from another window | done |
| 2026-09-20 | Preview round started (the frontend-slides Phase 2, scoped to the site identity): three dialects of the three-builds pump slide in `previews/a.html` (engineering sheet), `b.html` (cinematic cut), `c.html` (stacked cards), contract in `previews/PREVIEW-CONTRACT.md`. GSAP DrawSVG, MotionPath and MorphSVG vendored into `assets/gsap/`. Four pump figures rasterised into `assets/` | done, all three kept |
| 2026-09-20 | Dialect decision: use all three, chosen per slide by content. A (engineering sheet) for technical slides: the pump and the electronics. C (stacked cards) for the less technical modules and the integration: alignment, nozzle, interface, storage, carriers, holders. B (cinematic cut) for image-led moments: the airport, the machine, the validation, the closing; with the image brighter and less pushed into the background than in the preview. Keep being creative within these. The corner nav fades out while presenting. The previews stay as the design recipe until the build is done | decided |
| 2026-09-20 | Sirio, emphatically: the three dialects are a palette, not the set; new concepts per slide are expected and he will be disappointed otherwise | standing rule |
| 2026-09-20 | Build the whole English deck in one pass, then adjust (cut and add) with all content present. Build contract in `BUILD-CONTRACT.md`: parts assembled into one `index.html`, state API added to `deck.js`, presenter and guest views, ntfy sync | built and verified 2026-09-20: 66 slides, 150 steps, zero console errors, QR decodes, views and sync tested. Review notes in `PUNCHLIST.md` |
| 2026-09-21 | **Module names are canonical and must not drift: Pump · Alignment · Nozzle · User Interface** — the four modules Sirio designed and built, and the four thesis chapter names. Never "needle" (a part of the nozzle module), never "screen" (a part of the user interface module), never "stage" (see Revision 1). The reagent storage hardware shown on S24 is Marius Schiller's contribution, not a fifth module of Sirio's, and never appears in a list of his modules | standing rule |
| 2026-09-21 | **The overview is sorted by the thesis structure, and the rule is written down in `SLIDE-ORDER.md`.** Two levels: the presentation part is the strongly marked band, the thesis chapter is the topic inside it. The taxonomy lives once, as `SLIDE_ORDER` at the top of the script in `parts/99-tail.html`; the tail regroups the flat grid `deck.js` builds without editing the shared runtime. A slide is an appendix slide when it carries `data-part="backup"`, never by its cue prefix, so cues stay stable addresses. Appendix slides number `A01…` in the appendix slate `--appendix: #8b99ad`, and sit inside their own topic after the shown slides. S12 (the three pump principles) moved to the appendix as A01 under the pump module; `b01`–`b24` stay in one flat "not yet sorted" band until Sirio revises them | decided |

## 4. Host, presenter and guest: three windows, one state (infrastructure, to build after content approval)

Three views of the same deck file, selected by a URL parameter:
- **stage** (`?view=stage`, default): the projected deck, full screen on the projector.
- **presenter** (`?view=presenter`): on Sirio's laptop screen: the current slide small, the next slide (or next step) smaller, the minimal bullets for the current slide, a clock and an elapsed timer, slide number. Arrow keys here drive the stage. Same laptop as the stage, so it syncs over BroadcastChannel with no network.
- **guest** (`?view=guest`, at `it/`): the Italian deck on the second laptop, following over ntfy.sh, with BroadcastChannel as a same-machine fallback.

Speaker notes live in the deck HTML as `<aside class="notes">` inside each slide: two to four short bullets, the Say lines expanded. They render only in the presenter view.

Requirements: two laptops, possibly on different networks, static hosting only. The offline-from-USB requirement was dropped for this deck on 2026-09-20; the host still degrades to a plain deck if the relay is unreachable.

Design to be confirmed after the runtime audit (see `CONTENT.md` section "Infrastructure"). Principles already fixed:
- The English and Italian decks share one slide id list and one step count per slide, so a state message `{deck, slide, step, seq, t}` is enough.
- The host broadcasts on every navigation; the guest applies the state; the guest asks for the current state when it loads or reconnects; the host re-broadcasts periodically so a guest that missed a message catches up within seconds.
- Local fallback with zero infrastructure: host and guest as two windows on one laptop with an extended desktop, synced with `BroadcastChannel`.
- Keyboard on the guest still works, so a person next to the family screen can catch up by hand if the link drops.

## 5. Open questions for Sirio

- Room and projector format (16:9 assumed). Date is 2026-09-28.
- Does the venue laptop setup allow two displays (laptop screen plus projector) in extended mode? The presenter view depends on it.
- The whole-machine clips exist (four, see `ASSETS.md`), encoded 2026-09-20.
- Which tools to embed live, versus show as a screenshot with a link: the draft proposes a shortlist.
- Which slides Sirio wants to narrate without any on-screen text at all.

## 6. Files in this folder

| File | Purpose |
|---|---|
| `BRIEF.md` | This file: requirements, decisions, open questions |
| `CONTENT.md` | Slide-by-slide content draft (titles, visuals, steps, speaker cue, Italian caption slot), plus the animation and transition ideas and the backup slide list |
| `ASSETS.md` | Condensed media inventory: the four clips, the 75 web stills, thesis masters worth pulling, embeddable pages |
| `SKILL-NOTES.md` | Which frontend-slides rules the deck follows, adapts and ignores, with reasons |
| `research/` | The six agent reports of 2026-09-19 (chapters 1 to 5, 6 to 8, 9 to 12, 13 to 14 plus appendices), the raw material behind CONTENT.md |
| `BUILD-CONTRACT.md` | The contract every builder works against: parts and assembly, slide markup, timelines, shared components, runtime additions, the three views, sync, verification |
| `parts/` | The source fragments of the deck; `assemble.py` concatenates them into `index.html` |
| `SPEC.md` | Written at build time: runtime structure, embedded tools, assets used, sync protocol |
| `index.html` | The English host deck (build after approval) |
| `it/index.html` | The Italian guest deck (build later) |
| `assets/` | Deck-local assets: `airport-arrivals.jpg` (1200 x 900, the arrivals hall photo Sirio chose), the four pump figures rasterised from the thesis PDFs at 2400 px (`fig-v21-gap-around-arc`, `fig-roller-peg-taper`, `fig-pump-head-gap`, `fig-print-compensation`), `calibration-rings.jpg`, `v23-render.png`, later posters and tool screenshots |
| `previews/` | The preview round: `PREVIEW-CONTRACT.md`, `a.html` (engineering sheet), `b.html` (cinematic cut), `c.html` (stacked cards) and their step screenshots. All three are design recipes for the build; delete after the deck ships |

---

## 7. Runtime audit findings (2026-09-19, from the deck-runtime agent)

**What the shared runtime gives us**
- Flat `section.slide` sequence inside a fixed 1280 x 720 `.deck-stage`, scaled to the window. `deck.js` loads last before `</body>`, no init call.
- In-slide steps exist: any element with `class="fragment"` is revealed in DOM order by the right arrow or space, and the runtime toggles `data-fragment-revealed`. Going back lands on the previous slide with all its steps shown.
- One transition only: a 0.4 s opacity cross-fade. No per-slide variants. Deck-local CSS can override `--slide-transition` per slide and add its own entrance keyframes; keyframes must be restarted on slide entry with the MutationObserver pattern from the lab-meeting deck (slides are never `display:none`).
- Keys: right/space advance, left/backspace retreat, `o` and Escape toggle the overview. No PageUp/PageDown (clickers send those), no touch, no fullscreen, no notes.
- Videos and iframes are handled by deck-local script only (the precedent plays one `video[data-deck-video]` per slide on entry). Iframes are eager; a `data-src` lazy pattern must be added deck-locally.
- Registering: one `.deck-card` anchor in `decks/index.html` with `--card-angle` and `--delay`; README row for the deck system exists already.

**What must be added for this deck (deck-local unless noted)**
1. A tiny additive state API in `assets/deck.js`: `window.Deck` with `slide`, `step`, `goToState(slide, step)`, and a `deck:state` CustomEvent on every navigation. The shared runtime is a sanctioned shared file, and this is the one change it needs. Optional: hash becomes `#/<slide>/<step>`.
2. Capture-phase key guard so Escape closes the Instruments panel without opening the overview, plus PageUp/PageDown for clickers, `f` for fullscreen, `b` for blackout.
3. Lazy `data-src` for images, videos and iframes, swapped in on slide entry with one-slide lookahead; `preload="none"` with posters; `querySelectorAll` for videos so a slide may hold two clips.
4. Overview: replace cloned videos with their poster.
5. A print stylesheet is optional (handout PDF).

**Sync protocol (decided in principle)**
- Message: `{ v, deck, sid, slide, step, seq, t }`. `sid` random per host load, `seq` monotonic, `t` for staleness. Guest accepts on new `sid` or higher `seq`, rejects messages older than 2 minutes.
- Primary: ntfy.sh, an SSE relay. Host `fetch(POST)`s to an unguessable topic on every state change (coalesced 120 ms) and heartbeats every 15 s; guest opens `EventSource(topic/sse?since=2m)`, which also replays the current state on load and on every automatic reconnect. No library, plain HTTPS, crosses networks.
- Fallback: `BroadcastChannel` for two windows on one laptop with an extended desktop (needs `serve.bat`, not `file://`). The same 30-line block does both.
- Gated behind `?sync=host` and `?sync=guest`; the plain deck opened from USB makes no network call.
- Rejected: MQTT (vendored library, blocked ports), WebRTC/PeerJS (NAT failures with no diagnostic), Python LAN relay (kept as an offline rehearsal note only).
- The two decks sync by slide cue id (`data-cue`) rather than raw index, so the Italian deck cannot drift if a slide is inserted on one side only.
