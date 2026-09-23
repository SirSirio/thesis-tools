# Part III handover — paste this into the new chat

You are taking over **Part III** of Sirio Feltrin's DTU master's thesis defense deck. Another session has been handling Part II and is finishing its last task; from now on Part III is yours alone.

**Defense: 28 September 2026.** Repo root: `D:\03. DTU - Offline\03. MASTER THESIS\02. GitHub Thesis Tools Page`. Deck: `decks/thesis-defense/`.

---

## 1 · Read these before touching anything

0. **`ASSISTANT-GUIDE.md`** — the standing working agreement for every part chat: the role, delegation, how Sirio wants to be answered, the part/chapter division, editing limits, content rules, verification and the traps. Read it first; this handover only adds what is specific to Part III.
1. `BRIEF.md` section 0 — handoff state, how to run the deck, the standing rules.
2. `SLIDE-ORDER.md` — the taxonomy that decides where every slide lives, what makes a slide an appendix slide (`data-part="backup"`, never the cue prefix), the `A01…` numbering, and the recipes for adding, moving or renumbering a slide. Read it before you move anything.
3. `BUILD-CONTRACT.md` and `BUILDER-REFERENCE.md` — how to write a part, the timeline API (`Deck.slide`, `Deck.enter`, `window.Deck`, `Deck.marks`), and the verification you owe.
4. `PUNCHLIST.md` — the review log. Sections **(x)**, **(aa)** and **(ab)** are traps that have already cost whole rounds; summarised in §4 below, but read them.
5. `CONTENT.md` (slide-by-slide content), `CONTENT-IT.md` (the Italian guest deck's content points), `SPEC.md` (runtime, the three views, the sync protocol).
6. `research/part3-ch09-12.md` and `research/part4-ch13-14-appendices.md` — agent reports on the thesis from 2026-09-19. Useful, but **not** a verification pack (see §5).

Thesis LaTeX source: `D:\03. DTU - Offline\03. MASTER THESIS\01. Thesis Document LaTex\latex\`. Part III of the deck maps to thesis chapters **10 (System Architecture and Electronics), 11 (Integration), 12 (System-Level Validation)**, then the live demo, then **13 (Discussion) and 14 (Conclusion)**.

---

## 2 · How the deck is built and run

- `index.html` is **generated**. Never edit it. Edit `parts/*.html`, then run `python assemble.py` from the deck folder. The assembler concatenates parts in filename order and hoists every `<style data-part>` and `<script data-part>` block into the document.
- A static server is usually already running at `http://localhost:7331`; the deck is at `http://localhost:7331/decks/thesis-defense/index.html`. If not, run `.\serve.bat` from the repo root. **Never open these files through VS Code Live Preview** — it rewrites relative paths and strips inline scripts.
- Views: `?view=stage` (default), `?view=presenter`, `?view=guest`. Keys: arrows step through fragments, **`a`/`d` jump whole slides**, `o` or Escape opens the overview, `b` blackout, `f` fullscreen.
- `../../assets/deck.js` and `deck.css` are **shared with `decks/lab-meeting-2026-06/`. Do not edit them.** Everything deck-specific belongs in `parts/99-tail.html`.

**Your files:** `parts/40-part3.html` (cues `s25`–`s36`, including the new `s30b`) and `parts/50-discussion.html` (cues `s37a`, `s37`–`s43`). `parts/99-tail.html` is shared infrastructure — edit it only when the task genuinely needs it, and say so. `parts/10-opening.html` and `parts/20-part1.html` belong to other sessions: **do not touch them.**

---

## 3 · Standing rules Sirio has set

- **Module names are canonical: Pump · Alignment · Nozzle · User Interface**, matching thesis chapters 6–9. Never substitute a component for a module — not "stage" for alignment, "needle" for nozzle, "screen" or "display" for the user interface. Reagent storage is **Marius Schiller's** contribution, not one of Sirio's modules.
- **Titles are full assertive sentences** carrying the actual finding, not labels.
- **No filler text.** He narrates; the slides show. If a string adds nothing, delete it.
- **Nothing below 18 px. No overflow at any clicker position.**
- **Write `%`, never "per cent".** He reacted strongly to that.
- **Never crop a photograph to fit — shrink it.** He has rejected cropping three times; an `overflow:hidden` window onto part of an image makes it unreadable. Give the image a box at its own aspect ratio with `object-fit: contain` and rebalance the layout around it.
- **Every number on screen must be traceable to the thesis.** Do not compute, infer or dramatise. This matters more than anything else in this deck — see §5.
- **Update `CONTENT-IT.md` in the same pass** as any slide you change. Standing rule: an edited slide always gets its Italian content points updated, unprompted.
- Identify slides **by `data-cue`, never by the corner number** — the number shifted five times in one day as slides were added and moved.

**How he wants to be talked to:** replies of 130 words or less, reporting only what needs a decision from him or answers a question he asked. He does not read narration of what was done; he looks at the output. Flag disagreements, uncertainties and anything you could not do, plainly.

---

## 4 · Three traps that have already cost rounds

- **(x) SVG `<text>` over a chart can paint in the wrong place.** On one slide, `getBoundingClientRect()`, `getBBox()` and the element's screen CTM all agreed with each other and disagreed with the pixels by about one line height — proven by capturing a screenshot clipped to the reported rect and finding the line above inside it. Root cause never found. **Annotate charts and images with HTML chips** (`.callout`, `.callout--lite`, `.s16-pipt`) positioned over the plate, not SVG text, wherever the plate and the viewBox are 1:1.
- **(aa) Headless Chrome runs animation at about 1.3 fps.** Step timelines are fine, because the runtime seeks them to a label, but anything registered through `Deck.enter` autoplays via `requestAnimationFrame` and will look stalled and broken in a screenshot. Before judging one, force it: `gsap.globalTimeline.time(gsap.globalTimeline.time() + 8)`.
- **A Chrome that outlives its script serves a stale page.** Use a fresh `--user-data-dir` and a fresh port per run and kill the tree afterwards (`taskkill /F /T /PID`). Launch with `--remote-allow-origins=*` and connect the websocket with `suppress_origin=True`, or the CDP handshake returns 403. The Playwright MCP browser is often locked by another session.

**Verification you owe on every change:** reassemble; walk every clicker position of the touched slides forward and backward; screenshot each; audit for descendants outside the slide box and for text under 18 px (normalise by the stage scale — headless renders at about 0.867); and **look at the screenshots yourself**. Several real defects this week were invisible to the automated audit and obvious in a crop at 4×.

---

## 5 · The most important open item: Part III has never been fact-checked

Part II was audited line by line against the thesis and **19 contradictions** were found — invented numbers, claims the thesis does not support, and figures presented as measurements that were never taken. Examples that were on the projector: a contrast ratio of "7.1:1" that appears nowhere in the thesis; "32 per cent short", computed by whoever built the slide; "in an afternoon"; and three identical bars presented as three replicate weighings, when the thesis publishes one derived mean and a CV that proves the spread was not zero.

**Part III has had no such audit.** It almost certainly carries its own. Before or alongside the content work, commission a verification pack: read chapters **10, 11, 12, 13, 14** and the relevant appendices **in full**, then cross-check every number, name and claim on slides `s25`–`s43` against them, quoting deck text and thesis text side by side. Write it to `research/part3-verification-<date>.md`. The Part II equivalent, `research/part2-verification-2026-09-21.md`, is the model — read it for the format and the standard.

Two Part II findings reach into Part III and need his decision:

- **"Forty tubes, unattended"** rests on an unresolved `TO CONFIRM (2026-09-11)` note in the source saying the full five-rack run had not been performed; the dye run carried two racks. It appears on `s32`.
- **The air filter on the storage module is Marius's, not Sirio's.** Chapter 11 cites his thesis for it twice and the figure is captioned "The storage module as handed over … Design by Marius." Sirio believed he had added it. The slide now claims nothing either way; he was told and has not yet responded.

Also still unfixed: **`s28`, `s29`, `s30` need `data-map="integration"`** on the section element — the mark exists in `parts/99-tail.html`, but those three slides were left out of the pass that added it. And **speaker notes overflow the 243 px presenter panel** on several slides (`s14` needs about 430 px, `s20` 428, `s19` 404, `s16` 367). The panel scrolls, but he would be scrolling notes mid-sentence on the night.

---

## 6 · What has just been done to Part III

All applied and verified; do not redo.

- **`s25`** is now the **Part III-A** divider, rebuilt on the Part II divider's concept: a drawn line, three stops — System Architecture & Electronics · Integration · Validation — and a drop travelling the line lighting each in turn. The stops are empty `<g data-mark>` elements filled on entry from `window.Deck.marks`, so the divider and the corner marks are one drawing and cannot drift apart.
- **Three new marks** in `MODULE_GLYPH` / `MODULE_NAME` in `parts/99-tail.html`: `electronics` (one symbol covering architecture *and* electronics — his decision), `integration`, `validation`. `s26` and `s27` carry `electronics`; `s31`–`s34` carry `validation`; `s35` is `none`, being the whole-machine mosaic that no single module owns.
- **`s27`** rebuilt: no side panel, both figures whole and on stage together, each presented large then stepping back. Figure 10.4 (`fig-architecture-selected`), then figure 10.5 (`fig-power-tree`) in two states — **as built**, then **production** — since the thesis caption says the dashed supply represents the production design. Two generated images live in `assets/figs/`: `fig-power-tree-as-built.png` and `fig-power-tree-production.png`. Almost no text, and the orange signal animation was removed at his request.
- **`s28`–`s30`** restructured around a running bar along the bottom that accumulates one image per category — pump and storage carrier, nozzle, screen holder, battery holder — each with a three-or-four-word title on a coloured chip.
- **`s30b`** is new: the completed bar plus the dimensions-and-weight picture (`assets/media/device/top.jpg`, "3.3 kg", "18 cm high"), moved off `s30`.
- **`s36`** is now titled **Live Demo**, with the website address reduced to 20 px.
- **`s37a`** is new: a plain **Part III-B** divider reading **Discussion and Outlook**, with no icon strip and no travelling dot — his decision, because discussion and outlook are intertwined.

---

## 7 · His outstanding comments, to execute — verbatim

These arrived as one message and have not been started. He numbers slides by the corner counter, which has since shifted; the cues in the table below are the reliable addresses.

> **Validation:**
>
> **S36:** that is not the right video for that part. I think you shold show the video that you also show in slide 1 instead. 10% allowed is not the right thing to say here. Say "10% limit". The it is not really clear. The -18% it is, but the other channel 1 and channel 2... no really. You should say recalibration... that is the key word. And here you should mention the actyal values that the pumps deliver by stroke, as it was removed on the pup section, as this belongs here. The part on the bottom, with the dose to doe 0.27% by hand... I don't get it. Just show the CV of the pumps, and that is it. Limit the information please. The video should actually show that a different method has been used. I have weighted the liquid in the tubes, not on a boat, so you should put a small title on the video, as that shows it.
>
> **S37:** what is the 5mm that you are showing? where did you allucinate it? Use this title for the slide "Unattended dispensing validated across five racks and forty tubes." "3 of 40 landed on the deck", waht is this??? Bro this is allucinated. These are droplets that ladned out of the tubes. You have to state that. And it should be completely separate from the tubes, is totally another information.
>
> **S38:** Use this title "The three failure modes were cap friction, battery depletion, and septum leakage." "The Battery": I like the animation, but I don't get the two cricles there... They are not in the right spot, please move them to the right where there is white space. And you should show both of them a bit vibrating (showing that they are stuck), and then one still and the other moving. "The Cap" you have cropped the image badly, as the other cap is not shown, missing the whole point. I woudl say DO NOT CROP that image, shrink it, and leave balcnk sapce when enlarged, or reduce the enalrgemtn. Resize don't shrink for that image.
>
> **S39:** I like the lines connecting the enclosreu and a circuit borad, but they go over the text, please rewire them. Also, use capital letter for the Enclosure and the Circuit Board (and drop the artcile). Circuit board shoul have (PCB) right after in brakets: "Circuit Board (PCB)". Title: "Requirement Evaluation"
>
> **S40:** I would like to avoid the presentation showing the endalrgemtn of the video. i would like with one click to move on to the next slide. Those videos should be buttons: if I click on one, then they should enlarge, else, just move on. Each text has to be substituted accroding to this table:
>
> | # | Before | After |
> |---|---|---|
> | 1 | This is the machine, and it is in the room. | The machine is operational and ready to run live. |
> | 2 | dispensing, close | nozzle close-up |
> | 3 | the droplet leaving | motor spinning |
> | 4 | a full run, sped up | timelapse run |
> | 5 | outdoors, on battery | battery run outdoors |

### Which slides he means

| He says | Cue | Current title |
|---|---|---|
| S36 | `s31` | "Calibrated on itself, the machine lands within 3.4 % of the target…" |
| S37 | `s32` | "Forty tubes, five racks, nobody in the room." |
| S38 | `s33` | "The failures were a tube cap, a tired battery and a leaking septum…" |
| S39 | `s34` | "Six requirements met, three partly, four waiting for an enclosure…" |
| S40 | `s35` | "This is the machine, and it is in the room." |

### Facts already verified against the thesis for these

Checked directly in the source, so you need not re-derive them — but verify anything you add beyond this list.

**`s31` (ch. 12 lines 79–83; ch. 6 `tab:pump-two-heads`, lines 1203–1213):**

- The slide currently plays `pump-gravimetric.mp4`, the weigh-boat clip. Slide 1's video is `../../assets/media/video/machine-dispensing.mp4` — use that, with its poster. He wants a small title on it saying the liquid was weighed **in the tubes**, not in a boat.
- "10 % allowed" becomes **"10 % limit"**.
- The story, from ch. 12: using the nominal per-stroke constant from the isolated bench head, initial deliveries fell roughly **18 % short**; **recalibrating** the per-stroke constant on the assembled instrument brought delivery inside the **±10 %** envelope, with errors of only **−3.4 % on Channel 1** and **+0.6 % on Channel 2**. *Recalibration* is the word he wants carried.
- The per-stroke values that belong here, moved out of the pump section: **Channel 1 = 3.94 µL per stroke, Channel 2 = 4.10 µL per stroke**. Both assembled heads deliver roughly **10 % less** per stroke than the isolated bench head.
- Bottom block: drop the 0.27 % hand-pipette comparison. Show only the pumps' CV, **0.2 % to 1.0 %**.

**`s32` — neither number is invented, but both are mis-presented. Tell him so.**

- The **5 mm** is real: ch. 12 line 111 — the droplets landed on the tube openings, *"inside the 5 mm target radius the nozzle is specified against"*. It is the nozzle's specified target radius. The slide never says what it is, which is why it reads as arbitrary. Either label it properly or cut it; ask him which.
- **"3 of 40 landed on the deck"** is real but wrong as written: ch. 12 line 111 says *"only three droplets partly wetted the rack deck or the lane instead of falling into a tube"*, and line 159 *"roughly three droplets that landed on the rack and lane rather than in their target"*. It is three **droplets** that missed, not 3 of the 40 tubes failing. State it as droplets landing outside the tubes, and keep it visually separate from the forty-tube result, as he asked.
- New title, his words: **"Unattended dispensing validated across five racks and forty tubes."**

**`s33` (ch. 12 lines 131 and 159):** caps left flat rather than folded back to 135° project laterally and rub the alignment lane wall; because that axis runs open-loop, friction causes lost steps and the firmware registers the carriage as arrived while the rack lags. Septa lose their seal after about five punctures, with no reliable reseal past twenty. New title, his words: **"The three failure modes were cap friction, battery depletion, and septum leakage."**

**`s34`:** title **"Requirement Evaluation"**; capitalise and drop the article — **Enclosure**, **Circuit Board (PCB)**; rewire the leader lines so they stop crossing the text.

**`s35`:** the videos become buttons — a plain click advances the slide, clicking a video enlarges that one, with no automatic enlargement in the run of play. Apply his text table exactly.


---

## 8 · Later comments from Sirio, added after this file was written

These arrived after the handover was drafted and have **not** been started. They belong to
you, not to the Part II session.

> **S31:** "Architecture & Electronics" should be displayed on the top, not simply
> electronics. also slide 32, so to be consisten.
>
> **S31:** use this title "Twenty-five system architectures screened with two interactive
> tools." and this text instead of the one present "One microcontroller driving a screen,
> six pumps, two axes, and a vibration motor."
> "Which driver, not which processor." remove, and come up with something really
> meaningful, or rephrase this. Has to be short and clear.
> Use "The second pump captures 86 % of time savings; further pumps yield diminishing
> returns." instead of "The second pump buys 86 % of the saving; four more buy almost
> nothing."

**Which slides:** S31 is `s26` ("Twenty-five ways to wire six pumps, screened with two
tools instead of guesswork"); S32 is `s27`, the electronics slide rebuilt around figures
10.4 and 10.5.

**On the corner label.** Both slides carry `data-map="electronics"`, and the label comes
from `MODULE_NAME.electronics` in `parts/99-tail.html`, which currently reads
`electronics`. He wants the corner to read **Architecture & Electronics** on both. That is
a one-word change in a **shared file** — check no other session is mid-edit in
`99-tail.html` before you touch it, and keep the string short enough for the corner mark
(it renders in mono at a small size; verify it does not collide with the slide title).

**On "Which driver, not which processor."** He is not rejecting the idea, he is rejecting
the phrasing — he asked for something "really meaningful, or rephrase this. Has to be
short and clear." The underlying point, from ch. 10, is that the architecture choice
turned on how the pumps are driven rather than on which microcontroller runs the
instrument. Propose a line, do not invent a new claim, and check it against the chapter.
