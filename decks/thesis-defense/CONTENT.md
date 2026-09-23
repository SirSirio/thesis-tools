# Thesis defense deck: content draft v3.1

Draft v3.1 of 2026-09-20, after Sirio's third review (airport slides merged, the machine clips placed, a machine slide before the demo, less text). Sources: the research reports in `research/`. Every number below comes from the thesis text; the reports give the section. Changes from v2 are listed in section I.

Conventions:
- **Title** is the sentence shown on the slide, in plain words, carrying the finding.
- **Visual** names the files (see `ASSETS.md`; deck-local files in `decks/thesis-defense/assets/`).
- **Steps** are the in-slide reveals, one per clicker press.
- **Say** is a one-line speaker cue. At build time each slide also gets two to four minimal bullets as speaker notes, shown only in the presenter view on Sirio's laptop with the next slide and a timer.
- **IT** marks the caption slots for the Italian guest deck, filled later.
- Accent: pump orange, alignment violet, nozzle teal, everything else the global orange.
- **Less text, let the image speak.** On the host deck a slide shows its title, the image or tool, and at most one short line or one number per step. The sentences under **Steps** below are what Sirio says and what the Italian deck prints; they are not on-screen text unless the slide is a scene (S02, S41) or a quotation. Bullet lists never appear on screen.

## The red thread

The talk follows one droplet. It starts at an airport, where a swab must still travel to a laboratory. It asks what a machine would need to do to prepare that swab on the spot (Part I). It goes through the machine module by module in the order the thesis built them: the pump, which decides everything, then the alignment module that carries the tubes, the needle that lets the drop go, the screen that runs it, and last the reagent storage inherited from Marius (Part II). It then shows the whole machine: how it was wired and assembled, what it delivered in the validation, and then the machine itself, live, in the room (Part III). After the demo comes the longest stop, what the project taught and what comes next, and the talk ends at the same airport with an honest answer.

Time plan, 30 minutes with a 5 minute live demo:

| Block | Slides | Minutes |
|---|---|---|
| Opening: scene, problem, contents | S01 to S04 | 2 |
| Part I: why this machine, and how I worked | S05 to S10 | 4 |
| Part II: the modules | S11 to S24 | 9 |
| Part III: the machine, wired, assembled, validated | S25 to S35 | 5.5 |
| Live demo | S36 | 5 |
| What I learned, what comes next | S37 to S41 | 3.5 |
| Closing | S42 to S43 | 1 |
| Backup slides | B01 onwards | not timed |

---

## A. Animation inside a slide

**Be creative here. This section is not a list to follow; it is a floor to stand on.** Sirio's instruction, twice given: use the full potential of the medium, invent the animation of each slide from what that slide shows, surprise him. The five devices below are the shared grammar so the deck feels like one hand made it; everything beyond them is expected, not tolerated. When a slide asks for something new (a mask that follows a needle tip, a chart that assembles from the photo behind it, a diagram that becomes the photo of the part), do it, then note it in section H.

1. **Fit to focus.** The thing being explained grows, the rest shrinks, always with the same easing. Where the rest goes follows the slide's material.
2. **Target first, result second.** The requirement is drawn before the number lands in it.
3. **One photo, callouts in turn.** The photo holds still; leader lines arrive one per step; the earlier ones dim.
4. **Build it, then break it.** A mechanism assembles as a drawing, then the failure animates on that drawing.
5. **Dim what was said, light what is said.** Earlier steps fall to 55 %; a mini map in the corner lights the current stop.

## B. Transitions between slides and parts

**Same instruction: be creative.** The five below are the grammar. A transition may also be invented for one pair of slides when the content asks for it (a photo that shrinks into the corner of the next slide as a cue, a drawing that becomes the photo it describes, a part that lifts off the machine and lands on its own slide).

1. **Part dividers as a water wash**, with the module accent colours in Part II.
2. **Default crossfade with a 12 px push** in the reading direction.
3. **Match cut on a shared image** when two slides show the same picture.
4. **Zoom into the module** from the machine photo; zoom back out for Part III.
5. **Dip to dark twice only**, for the airport opening and closing. Hard cuts for backups.

Motion stack: CSS for simple reveals; GSAP core (vendored) plus DrawSVG, MotionPath and MorphSVG for choreographed slides; one timeline per slide, advanced to a label per step, reversed on the way back.

**Embedded tools, one pattern.** A tool appears on its slide as a live card (a real iframe, lazy loaded, with a screenshot poster behind it). Clicking the card grows it to fill the stage, with the same fit-to-focus easing, and the tool becomes interactive; Escape or a click on the frame edge shrinks it back and the deck keys work again. Several cards can sit on one slide; only the clicked one grows. This is how the pump tools (S13) and the architecture tools (S26) are shown.

---

## C. Slide by slide

### Opening (2 min)

**S01. Cover.**
- Text: Modular automated liquid dispensing for point-of-care use. Sirio Vittorio Feltrin. MSc thesis defense, DTU Bioengineering, NaBIS. Supervisors Maria Dimaki, Winnie Edith Svendsen, Lars Hvam.
- Visual: `video/machine-dispensing.mp4` (the 7 s landscape clip of the machine dispensing) looping full bleed under a dark scrim, with its sound; the rotor mark turns once and settles. `device/outdoor.jpg` is its poster.
- IT: title in Italian.

**S02. The arrivals hall, then: a test that takes a day comes too late.** No title on entry; the title arrives with step 2. **No text beats on the slide — Sirio tells the story; the slide draws it.**
- Visual: `assets/airport-arrivals.jpg` rising from black. Over it, on step 1, one wordless drawing: a ring marks the traveller, a swab draws beside her, a droplet falls from its tip into a sample tube, the tube fills, then travels along a drawn route across the frame to a conical-flask glyph (a central laboratory) while a clock ring fills and its hand sweeps almost a full turn. On step 2 the photo shrinks into a card at the top right, about a quarter of the stage, and the freed stage holds one time axis.
- Steps, four in all: (1) the drawn scene; (2) the photo shrinks, the title appears, and "under 1 h" is drawn as a short green band; (3) the hospital route, over 26 hours, a bar that runs off the right edge; (4) a portable molecular test at the point of care, 2.6 hours, and the closing line "The test can travel to the gate. The sample preparation cannot yet."
- Say: the four beats are in the speaker notes and are spoken, not shown — the passenger with a fever, the swab that must be sent away, the day of waiting that is impossible either way, and the answer in under an hour. Then the numbers.
- IT: four captions, one per step, carrying the same four spoken beats.

**S03. Three parts, one droplet.** (contents) **A structured text slide — no photograph, no journey bar, no second map.**
- Visual: four blocks, each a mono part label at the left, a thin accent rule, a short title and one line of contents. Part I, why this machine, and how I worked — the gap · the requirements and the modules · working with an AI. Part II, the modules — pump · alignment · nozzle · interface · storage. Part III, the machine — electronics · integration · validation. Then: live demo, what I learned and what comes next, closing.
- Steps: one block lights per step and the ones before it drop to 34 %: (1) Part I; (2) Part II; (3) Part III; (4) the three closing stops together.
- Say: questions at the end; backup slides exist.
- IT: four captions.

### Part I. Why this machine, and how I worked (4 min)

**S05. Divider: Part I. Why this machine, and how I worked.**

**S06. No instrument today is precise, portable, unattended and open to any protocol at once.**
- Visual: a 3 by 4 matrix, three instrument families as line-art icons against four properties; the empty fourth row.
- Steps: (1) lab workstations; (2) cartridge platforms; (3) the open-source builds — portable only in part, a yellow slash rather than a cross; (4) the empty row.
- IT: four captions.

**S07. The machine must dose 5 to 1000 µL of six liquids into forty tubes, on its own.**
- Visual: the design problem statement, then the requirement gates as cards, then the module hierarchy with the pump on top and a match cut to the machine with callouts (the enclosure callout points at empty air).
- Steps: (1) the statement, verbatim; (2) the gates: within ±10 %, 5 to 1000 µL, six reagents, tens of tubes, no hands after setup, learnable in ten minutes; (3) six modules, the pump decides for all of them; the lower module adapts to the higher; (4) the modules on the machine, and the one never built.
- Say: requirements are gates; criteria only rank what already passed.
- IT: four captions.

**S08. Ask an AI to design a house and you see exactly where it fails.**
- Visual: a line-drawn house in orange that changes with each failure.
- Steps: (1) "Design a house": villa or townhouse, both valid, neither what was meant; (2) "Add a window upstairs": it lands where the balcony was agreed earlier; (3) an old instruction comes back and a wall moves; (4) the fix as a blueprint: the layout set up front, plumbing aligned floor to floor, each floor checked before the next is raised.
- Say: structural failures, not mistakes; the answer is an environment, not better prompting.
- IT: four captions.

**S09. So the AI worked inside written specs, a memory on disk, and checks it could not skip.**
- Visual: the three chapter figures in a row, each taking focus in turn: `fig-gsd-loop`, `fig-ai-working-loop`, `fig-cite-search-pipeline`.
- Steps: (1) the spec-driven loop: discuss, plan, execute, verify, ship; (2) the design loop, what the assistant did at each stage, and what stayed physical: printing, wiring, assembling, testing; (3) the literature pipeline: seven databases, forty candidates in, twelve out, no reference without a human; (4) the models behind the decisions were published as tools on the thesis site (address and QR); three of them open in this talk.
- IT: four captions.

**S10. Bridge.** The machine with the pump carrier outlined; zoom into Part II. (Merges with the divider if the zoom does the job.)

### Part II. The modules (9 min)

**S11. Divider: Part II. The modules.** The journey strip lights the four modules in thesis order: Pump, Alignment, Nozzle, User Interface. Its four glyphs are **the same drawings as the module mark in the corner of every module slide**, not a second set: the strip builds them at entry from `window.Deck.marks`, the one map in `parts/99-tail.html`, so the two can never drift apart (2026-09-22). Those four names are canonical across the deck — a needle is a part of the nozzle module, a screen a part of the user interface module, and the reagent storage shown at the end of the part (S24) is Marius Schiller's contribution, not a fifth module of mine.

#### Pump (orange)

*(S12, the three metering principles, moved to the appendix on 2026-09-21. It is filed under the pump module and its entry is in section D; it keeps its `s12` cue. See `SLIDE-ORDER.md`.)*

**S12b. Thirty ideas came down to two builds, and the pinch pump still needed check valves.**
- Visual: the chip field on the engineering sheet — thirty chips thinning to two, the two growing into the finalist glyphs with their scores; rail and readouts on the right. **Three of the thirty slots are not blanks**: they carry the three metering principles themselves, one cropped panel each of `assets/figs/fig-pump-principles.png` (`principle-a/-b/-c.png`) on a 104 px plate with its name under it — Syringe · Reciprocating · Peristaltic — sitting in three slots of the middle row. The screening step therefore shows three real mechanisms among the anonymous ones, which is the job the appendix slide `s12` used to do in the talk. The field is still thirty ideas: 25 blanks, 3 principles, 2 finalists.
- Steps: (1) thirty mechanisms in six families, some deliberately absurd — readout 30; (2) seven passed the gates, and the three principles are among them: their plates lift 6 px and their borders take the accent — readout 7; (3) five developed, two built; the three principles settle back and dim with the rest while the two finalists grow, the rotor turns, the carriage strokes, the scores count to 3485 against 3185 on the two chips — and the readout closes the slide with **Cleanability decided it**, the word carrying the same gradient the numbers do (2026-09-23: it replaced the old `3485 against 3185` readout, on the grounds that the points are not the point).
- Say: 3485 against 3185 is a 300-point margin and the matrix gives it to footprint, mass and cleanability, so the score is not what decided the build. The linear pinch pump lost on the same ground as the syringe — reciprocal pinching needs a check-valve array to route several reagents, which puts wetted moving parts back inside the machine.
- IT: three captions.

**S13. Count steps, not seconds: the dose comes from the geometry, and three tools set it.** (tools embedded)
- Visual (rebuilt 2026-09-23, Sirio's request: show how a peristaltic pump works and what 5 µL per stroke means): **the pump at work**, a schematic four-roller rotor turning counter-clockwise inside a 180° track, the tube lying in the track from an inlet on the left to a needle on the right over a small receiving tube. Wherever a roller presses, the inner tube wall is pushed onto the outer one and a short bright bar marks the flattened, closed length; two rollers are always closed inside the track (audited every 10 ms across the loop), so the path is never open. The liquid fills the tube; the pocket trapped between two sealed rollers is lit, travels with the rotor and leaves through the outlet ramp. A wedge inside the rotor sweeps the quarter turn, labelled *¼ turn · 5 µL*.
- The loop, stop-and-go: one stroke = one quarter turn (1.6 s), then a 1 s hold. During the stroke the lit pocket next to the outlet is swept out and the next one, sealed in the inlet quarter, lights up as it takes its place; one drop grows at the needle through the stroke and falls in the hold, and the counter beside the tube steps *5 µL · 1 stroke → 10 µL · 2 strokes → 15 → 20*. After four strokes (one full turn) the tube is swapped for an empty one and the counter returns to 0; the loop closes seamlessly (rotor, roller spin and pockets repeat exactly after one turn). Every frame is a function of one loop time, drawn from one tube centreline. The loop runs whenever the slide is up, at every step including the miniature, and pauses when the slide is left; reduced motion and the presenter preview show one still frame (the hold after two strokes, 10 µL).
- Steps: (0) the pump alone, centred; (1) the pump steps left and the three numbers arrive beside it, large: **4 rollers · 0.51 mm inner diameter · 5 µL per stroke**; (2) the pump shrinks to a miniature in the bottom band, still running, the numbers fly into one row beside it, and the three live cards rise across the top — Rotor Geometry Solver, Occlusion and Displaced-Volume Model, Tensioned Tube-Path Model; click one and it fills the stage; (3) Sirio clicks the solver and shows, in about 30 seconds, that four rollers is the smallest count that never leaves the tube open and the largest with torque to spare at 12 V.
- On screen, schematic and not to scale: the tube bore is drawn far wider than 0.51 mm and the drop is not a true 5 µL sphere. 5 µL in a 0.51 mm bore is about 24.5 mm of tube (speaker-note material only).
- Say: the tools were built while the decisions were open, not written up afterwards. If asked why four: across a 180° track it is the fewest rollers that keeps two pressing at every moment, so no backflow without valves.
- IT: four captions, one per click.

**S14. The first pump did not seal, and the flow sensor proved inadequate.**
- Visual: **two columns telling one story**, a composition of its own (`data-dialect="columns"`). The left column is headed *the prototype* and holds the first and last blocks; the right column is headed *the method* and holds the two in between. A block is full size while it is being presented and steps back a size once it has been, so by the last step all four are on screen with the fourth prominent — the prototype story opened and closed on the left, the measurement method settled on the right.
- **Every photograph is shown whole (2026-09-22).** Each frame is cut to its own image's aspect ratio and is only ever *scaled down* as its block steps back; nothing is ever cropped to a window. Because a frame is the whole image, each overlay states the image's own pixel coordinates and stays registered at every size — the ring and leader on the inline flow sensor (1280 × 721) and the tilted quadrilateral on the balance display (1080 × 1385). Captions sit **beside** the square, tall and stacked media and **below** the one wide drawn figure, so no block carries dead space at any size.
- Steps: (1) **left, the prototype** — the whole taped pump head, large, with its one line beside it: *a rotor 2 mm small, and a gap drawn from a guessed wall*; (2) **right, the method** — the whole bench photograph with the flow sensor called out, and under it the trace it produced: zero sits on the x-axis, mean 1104 µL/min, one standard deviation 1159, so the band crosses below zero and one sample in seven lands there; (3) **right, the method** — the balance: **`video/pump-gravimetric.mp4`**, the weighing actually happening, beside the frame that carries the reading with the tilted quadrilateral drawn on the display: *every volume from here on is weighed*; (4) **left, the prototype** — one bar at 3.39 µL under the dashed 5.00 µL nominal with a CV 4.5 % whisker: *it repeats, so the parts were wrong, not the motor*.
- The clip is muted, looped, poster-backed and `data-noauto`: it runs **only while the balance step is the live one**, and the builder reads that window off the timeline playhead, so it is right forwards, backwards and on re-entry.
- Say: the method settled for the balance during this prototype — that contrast between the columns is the point of the slide. The shortfall repeated, so the shape of the parts was wrong, not the motor; closed-loop control was set aside here.
- Numbers on screen: 2 mm · 1104 · 1159 · 3.39 · 5.00 · 4.5 %. Everything else moved into the speaker notes — 17.70/19.70, 1.75 mm, 600.1 µL, CV 17.6 %, 678 µL of a commanded 1000, 11.5 %. The old engineering-sheet rail and its four 96 px readouts are gone with them.
- Traceability: the thesis publishes a mean and a CV for those three weighings and never the individual masses, so the last step draws **one** bar. The trough depth of the negative flow excursions is nowhere in the thesis, so no number is put on it — the frequency (one in seven) and the standard deviation carry it.
- IT: four captions.

**S15. Three more builds fixed the printing, not the physics.**
- **Two clicker steps, two buttons (2026-09-23, Sirio).** The slide opens on the empty sheet with **v2.1 · mount height** and **v2.2 · peg taper** collapsed into two small dashed buttons at the top of the rail (+ closed, × open, as on S09); the printer and v2.3 panels share the rest of the rail. The walk skips v2.1 and v2.2: click 1 is the printer, click 2 is v2.3. A mouse click (or Enter) on a button opens its sentence in the rail and its figure over the sheet, drawn as before (`fig-v21-gap-around-arc` with the 2.22 mm readout, `fig-roller-peg-taper` with the 0.6° readout), while the walked figure and readout step aside; a second click, a click anywhere else, any step or leaving the slide closes it. Opening one changes no deck step, fires no `deck:state` and is never sent by sync — a local aside for questions.
- Visual: the printer step, then the last panel, which is **the pump in parts**. On the printer step the slicer plate of calibration rings is kept small as pure context (128 px) beside `fig-print-compensation` at the full height the sheet allows (596 px); **nothing is drawn on either image** — the old ring, dimension arrows and the two circles over the compensation figure are gone.
- Last panel (2026-09-22, Sirio): the panel is **`media/pump/disassembly.jpg`**, the whole v2.3 pump laid out in parts — motor, mount, housing with **Gap: 1.52 V2.3** embossed on its face, four bearings, five cap screws, the two rotor halves, the tube with its fittings. It arrives at the full width of the sheet (719 px) and holds there while the readout counts, then steps back to 500 px as `fig-pump-head-gap` grows in beside it at **246 px, half its old size**. The deck-local `assets/v23-render.png` is **dropped from this slide**: it showed in simulation the same embossing the printed part now shows for real. (The separate `media/pump/v23-render.png` is still used in Part IV and is untouched.) The three `1.52` callouts are parked **outside** the figure — one above the apex slot, two below the end slots — each on a lengthened tick, so no text sits on the dark-red inspection rings.
- Steps: (0) the sheet waits with the two buttons: a few iterations, and the most meaningful was characterising the printer so it prints the dimensions designed; (1) the printer, characterized on rings — five bodies in three sizes, the middle one printed three times — and the rule figure wipes in a panel at a time: outer sizes shrink 0.65 %, inner bores lose a fixed 0.14 mm, parts predictable to ±0.10 mm; (2) v2.3, the pump in parts: the value it was built to is embossed on the housing, and the gap read exactly 1.52 mm through each of the three caliper slots.
- Buttons, for questions only: v2.1, the mount sat 0.45 mm high and the gap opened to 2.22 mm at the top of the arc; v2.2, printed pegs taper and tilted the rollers, fixed with one bearing on the wide base. Both live in the one "If asked" line, together with the housing drawn at 1.52 mm that printed at 1.75.
- Say: "CAD dimensions are assumptions until anchored to a physical datum."
- Time: ~30 s. IT: three captions, none about v2.1 or v2.2.

**S16. The pump repeats a dose as well as a hand with a pipette.**
- Visual: the CV-against-rpm chart with the pipette benchmark drawn first, **`video/pump-gravimetric.mp4` beside it** — the weighing on the analytical balance, the same clip S14 uses (2026-09-22, Sirio: the pump-head clip was the wrong one) — and under the chart **three cells: the rationale, the choice and the result**. The clip is portrait, 540 × 960, so its box is cut to 9:16 (270 × 480, right-aligned, the full height of the content band) and the frame is shown whole; the ledger stops at 862 px to clear it. `data-noauto` plus a playhead window keeps it playing only from the step that brings it on. The title claim is carried by the chart alone — the pump points sit on the benchmark line at the operating point — because the ledger no longer states it.
- Steps: (1) **the rationale** — the benchmark line draws, then both series and their four speeds: *the pump was tested at four speeds*; (2) **the choice** — a stem draws up from the 180 rpm tick and one ring closes around both points there, the clip starts: **180 rpm**, *adopted: the lowest scatter, three times faster than the slowest*; (3) **the result** — **4.53 µL**, *per stroke at that speed — a 9.4 % underdelivery*, counting down from 5.00.
- Say: the slide states only that four speeds were run; the reason is his to give if asked — slower rotation delivers slightly more volume per stroke but repeats less reliably; faster loses both. 180 rpm costs 1.7 % of the volume against the slowest setting and dispenses three times faster than 60 rpm. The two heads from identical files belong in the validation part, not here.
- Cut from the old four-cell ledger: the `0.27 %` cell (it is the labelled line on the chart), the `0.25–0.34 % over 76 replicates` cell (those are the chart own y-values, and the range is a 180 rpm figure only — finding H-9), and the `3.94 · 4.10` two-heads cell (Sirio covers it in the validation).
- The benchmark label reads ***manual pipette* / *0.27 %*** and sits clear of the 180 rpm markers (finding H-19). It is an HTML chip over the plate, never SVG text — see PUNCHLIST (x). The ten-replicate and cumulative-volume qualifiers stay in the spoken claim, in the notes (2026-09-22).
- IT: three captions.

#### Alignment (violet)

**S17. Move the tubes, keep the nozzles still, and let the tube spacing set the size of the machine.**
- Visual: four sketch sheets fanned; `alignment/rack.png` arriving on the last steps.
- Steps: (1) fifty ideas, ten survived; still nozzles mean tubing that never bends and a rack that shows progress; (2) the rule the sketch sheet boxes - **cleanability is the main concern** - and the three approaches it threw out, struck through: circular design, belt & pulley, push from the bottom; (3) the rack: eight tubes because biology counts in eights, 22 mm apart because a cap opener needs the room, 154 mm of travel; the footprint belongs to the consumable.
- The boxed note drawn on `sketch-3.jpg` and the same words arriving in the side column are timed as one thought, and the column is headed by that rule rather than by another rejected item. The old `push, never grip / clean first, build second` line is gone.
- The eight ellipses over `rack.png` are **measured off the file**, not spaced on a constant pitch: the render is in perspective, so the on-screen pitch grows 129 to 165 px and the bores widen and flatten toward the camera. Centres and radii are in the part file; the 22 mm and 154 mm dimensions are re-anchored to bores 1, 2 and 8.
- IT: three captions.

**S18. Three builds made a printed alignment module that finds its own zero.**
- Visual: the V1 strip, `alignment/v21-homing.jpg`, `video/alignment-v2.mp4`, each widening in turn. **The rail-length comparison under them — the two bars, the `154 mm` and `140 mm` callouts and the shortfall marker — was dropped on 2026-09-23 with the fourth step it occupied; the three panels grew from 366 to 456 px to take the whole content band.** The 140-against-154 fact survives as a presenter note, to be said only if the panel asks.
- Steps: (1) V1: a printed rack and pinion indexes 22 mm repeatably; (2) V2: the motor above the samples, protected by gravity; (3) V2.1: a switch and a three-pass homing, 0.03 mm repeatability, no lost steps over 132 mm.
- IT: three captions.

**S19. The final chassis queues five racks and ejects them with no extra motor.**
- Visual: `alignment/v3-top-annotated.png`, then `v3-iso.png`. **No text on the slide at all** - the plan view already prints IN QUEUE, RAIL and OUT QUEUE, and the motion carries the rest. The old three-row rail and the `40 tubes, unattended` readout are removed.
- Steps: (1) the second axis feeds a rack up out of the queue and onto the rail, and it runs into the first dispensing position - one continuous motion, so it reads as loading and not as an index; (2) **seven index steps of one tube pitch, each held for 0.62 s** while the nozzles dispense, the rack outline pulsing on each hold; (3) the final stroke takes the two ribs into the two angled floor grooves, the grooves turn the push into a **diagonal**, and the rack drops **vertically** into the out tray; (4) crossfade to the isometric - the module has become the frame of the instrument.
- Geometry, read off the render: rack x 275-830 / y 368-460, tube pitch 68 px; the two groove channels run (1215,370) to (1280,460) and (1522,370) to (1588,460); the ribs are 307 px apart and meet the groove mouths after 816 px of travel, which is 272 of feed-in plus 7 x 68 plus 68.
- **The forty-tube claim is dropped** (verification pack H-3: the printed takeaway rests on an unresolved `TO CONFIRM (2026-09-11)` and the dye run carried two racks). The capacity and the lid-fouling failure mode (H-4) are in the speaker notes instead.
- IT: four captions; the old on-screen rail text is reused there, without the completed-unattended-run claim.

#### Nozzle (teal)

**S20. The nozzle Marius handed over did not work, so I rebuilt it from scratch.**
- Visual: `nozzle/carrier-top.png` and `holder-vibr-top.png`, then `nozzle/as-built.jpg`.
- The title carries the hand-over and the rebuild (ch. 8: it arrived working in principle and inoperative in practice, with no mounting interface and an OpenSCAD mesh that Fusion could not edit).
- Steps: (1) **left**, three findings about the inherited hardware - *too weak / no mounting / an uneditable mesh*. **No strike-through**: these are real observations, not ideas that were considered and dropped; (2) **right**, the two CAD renders, with one short line on the left, *One degree of freedom: vertical.*; (3) the renders step down to the **bottom left** and the module **as built** takes the whole right region.
- Exactly three marks on the photograph, and nothing else: a ring on the **vibration motor** with a leader arrow, a ring on the **one elastic band that is actually fitted**, and the **22 mm** between the two installed needles. Deleted: the phantom second band at x about 690 (it pointed at bare plastic), the spin and lift arrows, the `a magnet and three nuts` chip, the factually wrong `two elastic bands` chip, and the caption under the photograph.
- Label style: `.callout--lite`, dark ink on a light blue plate in the nozzle thread's family, the same solid-chip language as the S12 captions.
- The three findings carry a light-blue dash each. The dash is a **baseline-aligned flex sibling** of the text, lifted half an x-height, so it sits on the text's optical centre by construction and stays there at any size and through a wrap — it is no longer an absolutely positioned box at a hand-measured offset (2026-09-22).
- IT: three captions.

**S21. The needle bore decides whether a droplet forms at all.**
- Visual: `video/droplet-slowmo.mp4` throughout; `nozzle/needle-assortment.jpg` with the gauges lighting in turn.
- Steps: (1) five tips tried with water; (2) 0.21 and 0.26 mm: a stream, nothing to shake off; (3) 0.41 and 0.51 mm: a droplet forms and most release; (4) plastic tips released nine of ten small droplets and never scattered; the machine ran on 22 G steel.
- IT: four captions.

#### Interface

**S22. The inherited screen trapped the user, so it was redrawn in a browser that checked its own buttons.**
- Visual: `ui-v1-home` captioned "V1 handed over." and `ui-v22-home-twopumps` captioned "V2.2 rebuilt."; the three round-1 candidates beneath; the contrast readout on the right.
- Steps: (1) a calibration screen with no way out but the power switch, buttons of 25 by 14 pixels; (2) rebuilt as a picture of the machine: bottles with their fill, racks at their pitch, three rows at most; (3) nine candidates over three rounds, and the bar each page held itself to — **7:1, Contrast ratio**, the requirement the thesis states (ch. 9), never a measured reading. The 6.2:1 palette that failed its own requirement lives in the notes only.
- The word-split beat ("tube" into "line" and "tube") was cut on 2026-09-22 at Sirio's request; the version history still carries it.
- IT: three captions.

**S23. One run, start to done, on one screen.** (tool embedded)
- Visual: six device frames (home, pick, assign, check, run, done), then the **Live User Interface** as a card that fills the stage on click.
- Steps: (1) all six frames arrive at once in a fast cascade, about 0.7 s end to end; (2) they fold into a filmstrip and the live card takes the room. He walks the run in the tool, not through the frames.
- Say: the interface never shows a number it cannot stand behind.
- IT: two captions; no iframe on the guest.

#### Storage (inherited, last)

**S24. The reagent waits in a sealed vial, read by a sensor and drawn by two needles.**
- Visual: `storage/cartridge.jpg`, `storage/sleeve.jpg`, `storage/needle-holder.jpg`, side by side; "Designed and built by Marius Schiller."
- He says two things here and nothing else: where the module comes from, and the air filter. The captions carry only those.
- Steps: (1) the cartridge — "The one module in this machine I did not design", with the credit line; (2) the sleeve — cartridge into sleeve, sleeve onto needle holder; (3) the needle holder — one needle draws the liquid, one lets air back in through a 0.22 µm filter, **and the single orange circle on the slide draws around that filter**; (4) it arrived as an uneditable mesh, which shaped the integration.
- The 5 % level accuracy, the spring pins and the cap-height point were cut on 2026-09-22; the copper-tape line and the two needle lines were cut with them. One circle, one photograph.
- IT: three captions.

### Part III. The machine, wired, assembled, validated (5.5 min)

**S25. Divider: Part III-A. One machine.** Zoom out to the whole machine.
- Eyebrow reads **Part III-A**.
- Visual: the same journey-strip concept as the Part II divider (S11) — a line, three
  evenly spaced stops with a symbol and a label, and the drop travelling the line and
  lighting each stop in turn. The stops are **System Architecture & Electronics ·
  Integration · Validation**, and their glyphs are built at runtime from the shared
  module marks (`window.Deck.marks`), so the divider and the corner marks of S26 to
  S34 are one drawing. Rebuilt 2026-09-22.
- **Notes by step** (~10 s; step-synced, 2026-09-23; step 0 is arrival): (0) From here on, the modules become one machine: how it was wired, how it was put together, and what it achieved.
- IT: one caption, step 0 (see CONTENT-IT.md).

**S26. Twenty-five system architectures screened with two interactive tools.** (tools embedded)
- **Retitled and rewritten 2026-09-22, in Sirio's words.** The title was “Twenty-five ways to wire six pumps, screened with two tools instead of a datasheet pile.” The question line read **One microcontroller driving a screen, six pumps, two axes, and a vibration motor.** until 2026-09-23, when Sirio struck the premise — the explorer decided how many controllers it takes — and it now reads **What had to be controlled: a screen, six pumps, two axes, and a vibration motor.**, and the simulator finding **The second pump captures 86 % of time savings; further pumps yield diminishing returns.**
- **The explorer finding is the one judgement on this slide, and the one string he asked to be rewritten rather than dictated.** Sirio: “'Which driver, not which processor.' remove, and come up with something really meaningful, or rephrase this. Has to be short and clear.” It now reads **Pins and driver intelligence decided it, not cost.** — six words carrying **all three** findings of Ch. 10 §“Mapping the architectural design space”, where the old line gestured only at the first:
  - **Pins.** Pin availability is the **primary feasibility bottleneck**. An ESP32 offers about **sixteen** safe GPIOs; the display subsystem takes **eight** and the SD reader a **ninth**, leaving **seven** before any motor is wired — while six dumb drivers need **twelve** dedicated lines, or **eight** with a shared step line.
  - **Driver intelligence.** The thesis's own vocabulary: “driver intelligence — rather than raw clock speed — determines whether concurrent multi-channel pumping is computationally viable.” A dumb step/direction driver makes the microcontroller toggle a pin for every microstep; a smart driver generates its own pulses.
  - **Not cost.** Every candidate that satisfies the pin budget lands within roughly **10 %** of the others, so “bill-of-materials expense alone does not decide the architecture.”
- **The corner module mark now reads `ARCHITECTURE & ELECTRONICS`** on this slide and on S27 (it read `ELECTRONICS`). Sirio: “'Architecture & Electronics' should be displayed on the top, not simply electronics. also slide 32, so to be consistent.” It comes from `MODULE_NAME.electronics` in `parts/99-tail.html`, and these two are the only slides carrying `data-map="electronics"`, so nothing else moved. It now matches the S25 divider's first journey stop, which already read **System Architecture & Electronics**.
- Visual: two live cards side by side: the System Architecture Explorer and the Dispense Choreography and Throughput Simulator. One line of process under each. No pin arithmetic on the slide — it is compressed into the finding line, and lives in full in the appendix pin-budget slide.
- Steps, **four**: (1) the question, as it reads on screen: what had to be controlled — a screen, six pumps, two axes and **a vibration motor** — the nozzle's droplet-release motor, not a shaker; in this thesis a shaker is the external plate shaker the machine exists to spare the operator; (2) the explorer card: twenty-five system architectures in four families, costed on real prices and audited against real pins; the finding types out, “Pins and driver intelligence decided it, not cost.”; (3) the simulator card: a rack of eight indexing under six nozzles; the finding types out, “The second pump captures 86 % of time savings; further pumps yield diminishing returns.”; (4) both cards take the accent and Sirio opens each briefly.
- **Notes by step** (~35 s; step-synced, 2026-09-23; step 0 is arrival): (0) There were twenty-five ways to wire this machine, and I needed a fair way to choose. (1) It had to control a screen, six pumps, two axes and a vibration motor, with as many controllers as it took. (2) The first tool priced every option and checked its connections, and the connections decided it, not the price. (3) The second tool timed the work. A second pump saves most of the time, 86 %, and more add little. (4) — Unstepped: If asked about price: every option with enough connections costs within about 10 % of the others.
- IT: five captions, steps 0 to 4 (see CONTENT-IT.md).

**S27. One microcontroller controls the whole machine.**
- **Retitled 2026-09-23, approved by Sirio.** It read “One clock drives six pumps, because a dose is a number of steps.” — the idea he dropped from the spoken line. The new title is ch. 10’s own claim: the shared clock is “the cheapest arrangement that keeps the whole instrument on one processor”, and the ESP32-S3-Nano “preserves a single-processor architecture” (`10_System-Architecture-and-Electronics.tex`, lines 283 and 343). The figure’s printed “shared step and direction clock” label stays; it is part of the drawing, not a headline.
- **Its corner module mark reads `ARCHITECTURE & ELECTRONICS` as of 2026-09-22**, the same change as S26 and from the same source; nothing else on this slide moved.
- Rebuilt 2026-09-22 on Sirio's note: **two figures, whole, nothing cropped, no side panel, no signal animation, almost no text.**
- Visual: thesis figure 10.4 `fig-architecture-selected` (the control architecture as built) and figure 10.5 the power tree, each in a box at its own aspect ratio with `object-fit: contain`. The presented figure is enlarged, the other reduced but still on screen. One word under each: **Control** and **Power**, plus a pill on the power tree reading **as built** then **production**.
- Steps, **two** (three clicker positions): (0) the control architecture, whole, centred; (1) it steps back to the left and the power tree comes up large, in its **as built** state; (2) the **production** design fades in on top — the 24 V pack, the 24 V motor rail and the step-down stage, dashed in the thesis figure.
- The two states of 10.5 are two derived images in `assets/figs/`: `fig-power-tree-as-built.png` (the dashed production elements and the legend erased) under `fig-power-tree-production.png` (the original with only the legend erased), crossfaded. The unchanged pixels are identical in both, so only the dashed parts appear.
- **Notes by step** (~25 s; step-synced, 2026-09-23; step 0 is arrival): (0) One microcontroller controls everything: the screen, the six pumps, the two alignment motors, the vibration motor and the level sensors. (1) As built, everything runs from one 12 volt line, fed by a tool battery or the bench supply. (2) For production I would use a regulated USB-C power bank, because a plain battery loses voltage under load, and that is what stopped the prototype. Unstepped: If asked: the capacitors on the board are rated for 16 volts, so they must be replaced before a 24 volt motor line goes in.
- IT: three captions, steps 0 to 2 (see CONTENT-IT.md).

**S28. Each pump and its reagent storage share one printed carrier, and the carriers hold each other.**
- **2026-09-23, Sirio's review: the arrows were on the wrong bays.** Read off the render, the pump bay is the **left** one and the storage bay the **right** one; the old overlay had the pump arrow over the right bay and a “vial, from the front” arrow on the left. The pump arrow now drops into the left bay, the storage arrow rises from below the front face into the right bay (how “from the front” projects in this near-frontal view), and the chips read **pump, from above** and **storage, from the front**. The slide says **storage** throughout — title, chips, alt text, notes and captions — never vial or container.
- **Restructured 2026-09-22** on Sirio's note. S28 to S30b are now one run with a shared device: each thing the integration produced is presented on its own, in depth, and then **its one most significant picture shrinks into a bar along the bottom of the slide and stays there**, so by S30b the room can see everything integration added. The bar accumulates across the four slides and never restarts from empty; each entry carries a three-or-four-word title on a light chip in its own colour. Every picture is shown **whole** in a box carrying that image's own pixel ratio — shrunk, never cropped. Dialect **`record`**.
- The four categories, in order: **the pump and storage carrier** (orange `#ff6b2b`), **the nozzle** (teal `#4fb3c8`, one beat only, because the module itself was shown in Part II), **the screen and stylus holder** (violet `#9b7fe0`) and **the battery cradle** (green `#4fc38a`).
- Visual: the eight carrier renders from the thesis, two at a time at their own aspect ratio; then `device/carriers-rear.jpg` and `carriers-side.jpg`.
- **2026-09-23, step count five → six.** Sirio: “please start the slide with just the title, so at the click the central carrier with images will appear.” The two empty central-carrier renders used to be lit at rest; **the slide now opens on the title and its rule alone**, they arrive on the first click, and every later beat shifted one along.
- Steps, **six**: (0, on entry) title and rule, nothing else; (1) the central carrier, empty, front and back; (2) the two arrows draw — the pump drops into the left bay from above, the storage slides into the right bay from the front; (3) loaded, the shortest suction line; (4) the left carrier, and the tall flange circled; (5) mounted, every screw horizontal, two of six channels; (6) `carriers-rear` flies down into the first slot of the bar as **Pump and storage carrier**.
- **Notes by step** (~20 s; step-synced, 2026-09-23; step 0 is arrival): (0) Regarding how the machine was put together, each pump and its reagent storage share one printed holder. (1) — (2) The pump drops in from above, and the storage slides in from the front. (3) — (4) The left one also screws into the side wall. (5) They slot together and are screwed down. (6) —
- IT: seven captions, steps 0 to 6 (see CONTENT-IT.md).

**S29. The nozzle bolts to the chassis; the screen tilts to 45 degrees so you look down at it.**
- Two categories, one slide. The nozzle gets **one picture and no sequence** — it was shown in Part II — and then goes straight into the bar; the screen holder gets two beats.
- **Two fixes 2026-09-22, out of the regression walk.** (a) Step 1 used to fade the nozzle photograph out and then show nothing until step 2, so one clicker position sat on an empty band. **The photograph and its annotations now stay on screen while the thumbnail flies down into the record bar** — the same shape as S28's last beat — and the nozzle leaves on step 2, when the CAD arrives. (b) The screw chip read `3 screws` and sat over the two rings, which reads as a miscount when only two screws are in frame. It now reads **`3 screws, 1 hidden`** and sits beneath the rings: Ch. 11 §"The nozzle in place" has two screws down into the chassis and a third driven **horizontally into the electronics-bay wall**, which this photograph cannot show.
- Visual: `nozzle/mounted-front.jpg` carrying `no new part`, `3 screws, 1 hidden` and `2 of 6 positions`; the two display-holder CAD renders (`ui/display-holder-cad-front.png` and `-side.png`, the clean ones, annotated with the deck's own chips rather than the thesis figure's 8 px printed labels); `ui/display-side.jpg` and `ui/display-top.jpg`.
- Steps, **four**: (0, on entry) the nozzle in place, no new part, three screws of which one is hidden, two of six positions; (1) the thumbnail drops into the second bar slot as **Nozzle in place** while the photograph stays up; (2) the nozzle leaves and the display holder arrives in CAD, split on a dovetail, about ten prints; (3) at 45° on the front of the machine, stylus tethered; (4) `display-side` drops into the third slot as **Screen and stylus holder**, the pictures staying because this is the last beat of the slide.
- Dropped in the restructure: the 45° eye-line diagram and the lines-over-rack photo — the bar took the bottom band and the two would not fit above it. The 450 mm unguided line stays in the speaker notes.
- **Notes by step** (~25 s; step-synced, 2026-09-23; step 0 is arrival): (0) The nozzle needed no new part: three screws hold it to the electronics box, one hidden to the side. (1) Each pump feeds its needle through a tube that unplugs by hand. (2) The screen holder also carries two clips for the pen. (3) It tilts the screen to 45 degrees, because you look down at this machine, on a table or a truck bed. (4) —
- IT: five captions, steps 0 to 4 (see CONTENT-IT.md).

**S30. A published battery holder and three screws put the power on board.**
- Visual: `assets/figs/fig-battery-cradle-cad.png`, `device/battery-empty.jpg`, `device/battery-loaded.jpg`, then `video/machine-outdoor-run.mp4` (the 44 s outdoor run on battery, with sound).
- Steps, **three**: (0, on entry) the cradle, holes filled and re-cut for M3; (1) on board, three horizontal screws, the bench supply's own socket; (2) `battery-loaded` shrinks into the fourth slot as **Battery cradle** — the record is now complete; (3) the outdoor run plays, and Sirio says plainly that it is a scenario, not a claim.
- The whole-machine picture and its dimensions moved off this slide to S30b.
- **Notes by step** (~30 s; step-synced, 2026-09-23; step 0 is arrival): (0) The battery holder is adapted to the drill battery I used, and I remade its screw holes in CAD. (1) Three screws hold it, and the battery plugs into the bench supply's socket, so nothing inside was rewired. (2) That was the last piece the machine needed. (3) Here it runs outdoors on battery. That is a scenario, not a claim: without a case, it only runs reliably indoors.
- IT: four captions, steps 0 to 3 (see CONTENT-IT.md).

**S30b. Four joints turn the modules into one object of 3.3 kilograms.** *(new, 2026-09-22)*
- Sirio: "the next slide should be basically a copy of the bottom, and then showing here the picture with the dimension and weight".
- Visual: the completed bar of four along the bottom, and `device/top.jpg` whole on the left with the width and depth leaders drawn on it. The dimensions are annotated with **HTML chips over the plate, never SVG `<text>`** — see PUNCHLIST (x).
- **2026-09-23, step count two → one.** Sirio: “I would remove these: ‘Loaded, with the racks and the battery aboard. Two recessed handles in the end walls, for two hands. still missing 2 of 6 channels breadboards, not a PCB no enclosure’. They are either unnecessary or anticipate something that will be told later.” All six strings are gone, and with them the whole second beat. **The ‘still missing’ points came out of the speaker notes too**, so he no longer says them here — S37 is where the boundary of the evidence belongs.
- What remains: the dimension leaders with `50 cm`, `35 cm` and `18 cm high`, the counting **3.3 kg** — now set much larger and centred as the whole right-hand column, rather than heading a column with two lines and three chips under it — and the completed record bar of four.
- Steps, **one**: (0, on entry) the plate rises and the four bar chips acknowledge themselves left to right; (1) the leaders draw, the three dimensions land, and `3.3 kg` counts up beside them.
- **Notes by step** (~10 s; step-synced, 2026-09-23; step 0 is arrival): (0) Put together, those four pieces make the modules one object. (1) It weighs 3.3 kilograms with the racks and the battery, and you lift it with two hands. Unstepped: If asked: 50 by 35 by 18 centimetres; the battery adds 5.5 centimetres of the depth.
- IT: two captions, steps 0 to 1 (see CONTENT-IT.md).

**S31. Calibrated on itself, the machine lands within 3.4 % of the target.**
- **2026-09-23, Sirio's review.** The CV label is shortened to **CV, one session (1000 µL)** — he asked for “CV between sessions”, but 0.71 % and 0.37 % are within one session, so the label keeps saying so (raised with him by the coordinator). The per-stroke note now reads **about 10 % less than on the bench**: he asked for “than the design”, but Ch. 12 (`12_System-Level-Validation.tex`, line 83) compares the assembled heads with the isolated bench head, not with the design value. The spoken step-5 line is now the between-session shift (+1.3 % and −5.0 %), and the within-session CV moved to an “If asked” line — his call, as the more honest emphasis.
- **Later on 2026-09-23, Sirio confirmed: the slide shows the drift, not the CV.** The block now reads **Drift between sessions (1000 µL)** with Channel 1 **+1.3 %** and Channel 2 **−5.0 %**, in the same place and the same type as before; it is labelled as drift, never as a CV. Source: `12_System-Level-Validation.tex` line 81 (“the per-step delivery constants shifted by +1.3 % and −5.0 %”), verification pack E-8. The thesis gives the pair without naming channels; the attribution (Channel 1 +1.3 %, Channel 2 about −5 %) is from the campaign record, `VALIDATION-PLAN.md`, run 5. The within-session CVs 0.71 % and 0.37 % are now only an “If asked” line.
- **Rebuilt 2026-09-22.** The chart is relaid out 820 wide so nothing collides; the band label now reads **10 % limit**; and an orange bracket labelled **after recalibration** groups the two channel rows — that bracket, not the bars, is the centre of the slide. The clip is now the landscape `video/machine-dispensing.mp4`, the same one S01 opens on, and it carries an HTML chip reading **weighed in the tube**: the doses went into tared tubes standing in the rack and were capped and weighed as they stood, never in a weigh boat. Dropped from the screen: the 0.27 % hand-pipette comparison, and the whole between-sessions drift group — the drift stays in the speaker notes, where it is the reason a field instrument has to be able to recalibrate itself.
- **2026-09-23: the vague repeatability strip is gone, replaced by a precise statement.** Sirio: “If it is the CV, you should show it more precisely.” It used to be two unlabelled dots reading 0.2 % and 1.0 %, a range that mixed the isolated bench head with one installed one and never said what the number was *of*. The slide now states **coefficient of variation, three consecutive 1000 µL doses on each channel, one session**, with **Channel 1 = 0.71 %** and **Channel 2 = 0.37 %**. It is HTML over the plate, never SVG `<text>` — this chart's viewBox is 1:1 with its box, the exact case where Chrome paints glyphs off their own measured box. The bench-constant bar also now reads **≈−18 %** rather than a bare −18 %, since Ch. 12 says “roughly”.
- **RESOLVED 2026-09-23 — the slide was briefly splicing two campaigns, and no longer is. Do not re-open this.** The `1.04 %` and `2.94 %` that stood in the CV block for part of the day were the **wrong run**. Audited against Sirio's own campaign record, `01. Thesis Document LaTex/VALIDATION-PLAN.md`, the thesis reports **two weighing sessions, both on 2026-09-10, on the same two heads**:
  - **Run 4** — both channels run **together**, both carrying the **same** 4.08 µL/stroke constant, on the **3 A mains supply**, n = 3 per channel (a fourth dose excluded on each for reservoir exhaustion: a 4 mL vial runs dry on the fourth 1000 µL dose). Channel 1 **−3.4 %**, CV **0.71 %**, 3.940 µL/stroke; Channel 2 **+0.6 %**, CV **0.37 %**, 4.103 µL/stroke. **This is what Ch. 12 publishes, and every figure on the slide is now this run.**
  - **Run 5** — later the same day: lines **re-primed**, run from the **battery**, **one pump at a time**, each head on **its own** constant. Channel 1 **+1.3 %**, CV 1.04 %; Channel 2 **−4.5 %**, CV 2.94 %. This is Ch. 6's `tab:pump-two-heads` calibrated column.
  - **+1.3 % was never a duplicate figure.** Run 5 commanded Channel 1 with exactly the **3.94 constant Run 4 had measured**, so its delivery error *is* the drift of that constant — one measurement described two ways, which is why the same number reads as a calibrated error in Ch. 6 and as a between-session shift in Ch. 12.
  - The speaker note's between-sessions bullet (**+1.3 % and −5.0 %**) is now the **only** place the Run 5 story is told, and that is deliberate: it is the argument for on-device recalibration, and it needs the contrast with a clean single-session slide to land.
- Visual: the chart built for the deck, the 10 % limit drawn before any result lands; the **Drift between sessions (1000 µL)** block under it, Channel 1 **+1.3 %** and Channel 2 **−5.0 %**; `video/machine-dispensing.mp4` at the top right under the **weighed in the tube** chip; and a **per stroke** panel beneath it — Channel 1 **3.94 µL**, Channel 2 **4.10 µL**, “about 10 % less than on the bench”.
- Steps, **five**: (1) the zero line, the two dashed edges and the **10 % limit** band; (2) on the constant from the isolated pump bench, about 18 % short — the bar runs out past the left edge and that edge flashes red; (3) the bracket draws, **after recalibration** lands, and the two channels come inside at −3.4 % and +0.6 %, the band turning green; (4) the per-stroke panel rises: 3.94 and 4.10 µL, about 10 % less than on the bench — that is the shortfall the recalibration absorbs; (5) the calibration drift between sessions: **Drift between sessions (1000 µL)** — Channel 1 **+1.3 %**, Channel 2 **−5.0 %**. The within-session CVs (0.71 %, 0.37 %) are an “If asked” line.
- **Notes by step** (~40 s; step-synced, 2026-09-23; step 0 is arrival): (0) To test accuracy, I asked the whole machine for a thousand microlitres and weighed the tube. (1) The shaded band is what the requirement allows: 10 % either way. (2) Using the pump's calibration from the bench, the machine delivered about 18 % too little. (3) So I recalibrated it on the machine itself, and both channels landed inside the band. (4) Installed, each pump gives about 10 % less per stroke than on the bench, and the recalibration corrects that. (5) But the calibration moves between sessions, by +1.3 % and −5.0 %, so a field machine must be able to recalibrate itself. Unstepped: If asked: within one session, from one dose to the next, it varied by only 0.71 % and 0.37 %. If asked: a hand pipette varied by 0.27 % on the same balance, but at 50 microlitres, so it is the same order, not a fair win.
- IT: six captions, steps 0 to 5 (see CONTENT-IT.md).

**S32. Unattended dispensing validated across five racks and forty tubes.**
- **Rebuilt 2026-09-22.** The old block read “3 of 40 landed on the deck”, which fused two facts the thesis keeps apart: it made the denominator the forty tubes, it dropped the lane, and it quietly absorbed the cap fouling that S33 then presents again — Ch. 12 opens that sentence with “Apart from the tube-lid fouling described below”. The forty-tube result and its **100 µL and 75 µL** stay where they land, and the misses now have a dashed block of their own, kicker **off target**: **3 droplets wetted the rack or the lane** / *counted apart from the cap fouling*. Three **droplets**, not three tubes — a dual-reagent run into forty tubes dispenses eighty. The `alt` claim that the screen read “done at eleven minutes six seconds” went at the same time: the identical reading sits on the screen in the photograph of the *aborted* battery run, and the thesis publishes no run time at all.
- **Second pass, later on 2026-09-22: the target ring and its `5 mm target radius` chip are deleted, and the step count is back to four.** Sirio: “remove that thing, it doesn't matter.” The 5 mm bullet left the speaker notes with it. The photograph is now simply the before and the after, with nothing drawn on it, and the four beats are the four things worth saying.
- Visual: `device/validation-start.jpg` crossfading to `validation-done.jpg`, contained and unannotated; a counter running to **40 tubes** with “100 µL and 75 µL in every tube”; `video/machine-demo.mp4` (the 20 s sped-up run) beneath them; the two tube thumbnails at the foot left; the **off target** aside at the foot right.
- Steps, **four**: (1) the plate arrives — the machine before the run; (2) the crossfade to done, the counter to 40, the clip starting, and the two volumes; (3) the first-rack and last-rack thumbnails, alike by eye; (4) the **off target** block — three droplets on the rack or the lane, counted apart from the cap fouling.
- **Notes by step** (~35 s; step-synced, 2026-09-23; step 0 is arrival): (0) Next, the real test: can it run a full batch with nobody touching it? (1) It started with forty empty tubes in five racks, running on the bench supply, not the battery. (2) It filled all forty with both reagents, without any help. (3) A tube from the first rack and one from the last hold about the same amount, by eye. (4) Only three drops missed and landed on the rack or the lane. The caps caused a separate problem, which comes next. Unstepped: If asked how: the motors were slowed down, which gave them the strength to push five loaded racks. If asked for a run time: the thesis does not report one.
- IT: five captions, steps 0 to 4 (see CONTENT-IT.md).

**S33. The three failure modes were cap friction, battery depletion, and septum leakage.**
- **Rebuilt 2026-09-22.** The cap photograph is no longer cropped: that card carries the image's own 1600 × 1420 ratio and contains the picture, so both kinds of cap are visible — which was the point of taking it. It is therefore the narrow card of the three, and the row is centred around it instead of sitting on a fixed grid. The pack icon and the two rotors moved **off** the battery photograph into the empty bench space at its right.
- **Second pass, later on 2026-09-22: two cards re-animated, one rebuilt. Still three steps.**
  - **The cap.** The falling orange dot is gone, and with it the reference line, the swinging arm, the arc and the ghost. What is left is a straight comparison drawn inside the one photograph: a **green ring** on the cap that is folded back and standing clear of the deck with the chip **135°, folded back**, then a **red ring** on the cap lying flat with the chip **flat: it rubs the wall** and a short red arrow reaching out towards the lane wall. The difference between the two caps *is* the animation.
  - **The battery.** Sirio corrected the order he had given earlier. It now runs **full pack, both rotors turning smoothly → the pack drains and both seize, juddering together → one alone turns** while the other stays dead. That is the thesis: a drained pack could not sustain concurrent two-channel dispensing, and the firmware cannot yet run one pump at a time.
  - **The septum.** The needle now visibly **enters** the disc, holds there, withdraws and repeats — five times, a puncture mark landing on each entry and the readout counting with them — then the remaining fifteen arrive at speed. The bounds are unchanged.
- **Third pass, 2026-09-22, from the regression walk: the battery photograph is no longer cropped either.** That card now carries its image's own ratio like the cap card beside it, so the whole frame is visible at every card width, and **both photo cards' overlays retire when the card collapses** instead of staying lit on a 254 px thumbnail. The cap card is still the narrow one of the three, at 384 px against 600.
- Visual: three cards, one enlarged at a time — `alignment/lid-fouling.jpg` with the green and red rings and the reach arrow; `device/validation-battery.jpg` with **16 samples**, the draining pack and the two rotors drawn on the bench beside it; a drawn septum disc with a needle and a puncture readout.
- Steps, **three**: (1) the cap — one folded back to **135°** and clear, one left flat and rubbing the lane wall; the axis is open-loop, so the firmware registers the carriage as arrived while the rack lags, and the dose lands beside the tube; (2) the battery — both heads turning, then the drained pack seizing both, then one turning alone; **16 samples**, two racks; (3) the septum — five visible punctures, then fifteen at speed, the readout running **0 → 5 → 20** and droplets left on the needle tips.
- **Notes by step** (~35 s; step-synced, 2026-09-23; step 0 is arrival): (0) Three things went wrong, none of them in the moving mechanics, and each has a known fix. (1) A cap left flat rubs the wall, the motor slips without knowing it, and the drop lands beside the tube. (2) On the battery, it managed two racks, sixteen samples. Then the battery ran low, both pumps stalled, and the software can't yet run just one. (3) The third belongs to Marius's reagent storage: its rubber seal starts to leak after about five needle punctures.
- IT: four captions, steps 0 to 3 (see CONTENT-IT.md).

**S34. Requirement Evaluation**
- **Retitled and rewired 2026-09-22.** The old title — “Six requirements met, three partly, four waiting for an enclosure and a circuit board” — counted wrong: `tab:validation-verdict` carries **five _Met_** plus one **by design**, not six met. Rather than argue arithmetic on the projector the sentence went and the plain noun stayed; the fifteen chips state the verdicts themselves. The leader lines were rewired in the same pass, on Sirio's note that they ran over the text: the old diagonal curves swept across the whole board, and the routing is now **orthogonal** — each excluded chip leaves by its free edge and drops down a gutter between two chip columns before turning along a collector rail below the chips and above the pills.
- **Later the same day** the Versatility chip took the asterisk the thesis table carries: it reads **met \***, with a footnote line under the Performance column — *\* the 5 µL lower bound is not yet validated, but is expected to pass* — which arrives with Performance and dims with it. That removes the contradiction with S37, where the same bound is called **not verified** on screen.
- **Split to three pills on 2026-09-22, approved by Sirio.** Cleanability used to be bundled into **Enclosure** with Operating envelope and Wind, and it does not belong there: the thesis excludes it for a **materials** reason — fused-filament PLA is not a cleanable, non-porous surface — and Ch. 13 resolves it with **metal of certified clinical roughness, or polypropylene**, on the sliding faces. An enclosure is the one change that would *not* have fixed it. The foot of the slide now carries **three** 300 px pills, centred at x 206, 640 and 1074 so each sits under the chip columns it serves: **Enclosure · Cleanable materials · Circuit Board (PCB)**. The speaker notes were reworded to match: "Four are excluded honestly, and not for the same reason: two wait on an enclosure, one on a real circuit board, and one on a material that can be sanitised."
- Visual: fifteen colour-coded chips in five columns — Performance, Automation, Portability, Contamination, Safety — and three pills at the foot, **Enclosure**, **Cleanable materials** and **Circuit Board (PCB)**, fed by the dashed lines from the excluded chips.
- Routing, **three routes on three heights**: Operating envelope and Wind leave into the gutters at x 754 and x 985, drop to the shared **y 552** rail and run left into **Enclosure**; **Cleanability** leaves into the same gutter at **x 995**, passing Wind's vertical 10 px to its right, and turns left on a rail of its own at **y 574** into **Cleanable materials**; **Electrical safety** falls straight down from **x 1074** into **Circuit Board (PCB)** with no rail at all, because that pill's centre already sits under it.
- **2026-09-23, step count five → six.** Sirio: “The animation about the lines and the enclosure and cleanable materials and PCB should appear one click after the boxes about safety are shown. They are simultaneous with that now, and causes issue in the flow of my speech.” The Safety column now settles on its own beat and the destinations arrive on the next one.
- Steps, **six**: (1) performance; (2) automation; (3) portability; (4) contamination; (5) safety, and the column settles; (6) the three pills rise and the six leader lines draw down into them.
- **Notes by step** (~35 s; step-synced, 2026-09-23; step 0 is arrival): (0) Now the requirements, group by group. (1) Accuracy and repeatability are met. Versatility is too, though the smallest dose, 5 microlitres, is still unconfirmed. (2) It ran a full batch alone; training a new user was not tested. (3) Portability is partly met. (4) The reagents cannot mix, by design rather than by washing. (5) Safety is partly met, and electrical safety was left out: the electronics are still on test boards. (6) What was left out waits for a case, a circuit board and a cleanable material, not for new mechanics. Unstepped: If asked about cleaning: printed plastic cannot be disinfected, so the sliding parts need metal or polypropylene. If asked about feasibility: it was a check when choosing the concept, not a test of the finished machine.
- IT: seven captions, steps 0 to 6 (see CONTENT-IT.md).

**S35. The machine is operational and ready to run live.**
- **Retitled 2026-09-22** — it read “This is the machine, and it is in the room” — **and stripped of its clicker steps**, on Sirio's note: a plain press has to walk him on to the demo, and a clip grows only when that clip itself is clicked. The outdoor run moved in the same pass, from beside the other landscape clips to centred beneath them.
- Visual: the four whole-machine clips together on one stage, all playing: the portrait dispensing clip (27 s) standing full height at the left; the short landscape dispensing clip (7 s) and the sped-up demo (20 s) side by side to its right; the outdoor run (44 s) centred under those two. The labels read **nozzle close-up · motor spinning · timelapse run · battery run outdoors**. Only the outdoor run plays its sound; a clicked clip grows to fill the stage and takes the sound over, and Escape brings the mosaic back. The mini map's demo marker lights. No text beyond the title.
- Steps: **none, by design.** All four run from the moment the slide arrives, and the next press is S36.
- **Notes by step** (~5 s; step-synced, 2026-09-23; step 0 is arrival): (0) Here it is running; in a moment you will see it for real. Unstepped: One press moves on. Clicking a clip enlarges it with its sound; Escape goes back.
- IT: one caption, step 0 (see CONTENT-IT.md).

### Live demo (5 min)

**S36. Live demo.** A quiet slide: the machine photo at 30 % and a short checklist for Sirio only in the speaker notes, not on screen. On screen: the two words **Live Demo** at 88 px and, smaller and secondary beneath them, the site address (Sirio, 2026-09-22). The machine comes to the room ready, with dye and a rack loaded.
- Suggested run, five minutes: load a rack, pick a recipe on the screen, show the pre-run check, run one or two tubes with dye, watch a droplet detach, show the rack eject. Fallback if the machine misbehaves: the pump-head and droplet clips play from this slide on a key press.
- **Notes by step** (~5 min · live demo; step-synced, 2026-09-23; step 0 is arrival): (0) Now the machine itself. Unstepped: Load a rack, choose a recipe on the screen, and show the reagent check before the run. Dispense one or two tubes with dye, point at the drop falling, and show the rack moving out. It arrives ready: dye in the reagent storage, a rack loaded, the lines already filled, the caps folded back. If something goes wrong, press v and the pump and droplet clips play instead.
- IT: one caption, step 0 (see CONTENT-IT.md).

### What I learned, what comes next (3.5 min)

**S37a. Part III-B — Discussion and Outlook.** *(new divider, 2026-09-22)*
- Plain on purpose. Sirio: "just a plain title for now, as discussion and outlook are intertwined", so it carries the eyebrow, the title, the wash and the rule that every other divider has, and **no journey strip, no symbols and no travelling dot**.
- Eyebrow **Part III-B**; title **Discussion and Outlook.**
- **Notes by step** (~8 s; step-synced, 2026-09-23; step 0 is arrival): (0) You have seen the machine work. Now for what it proves, what it does not, and what comes next.
- IT: 1 caption, step 0 (see CONTENT-IT.md).

**S37. The prototype proves the concept, not a finished instrument.**
- **Corrected 2026-09-22.** The test-one card read “the reference protocol, run with its own reagents”. In this thesis “the reference protocol” is already taken, by a different object — the four-reagent simulator benchmark, which this deck itself puts on screen earlier, on S26 — so the card now names what Ch. 13 actually asks for: **the PANPOC protocol, run with its real reagents.**
- **Retitled later the same day**, in Sirio's words: it read “The concept is proven; the instrument is not” and now reads **The prototype proves the concept, not a finished instrument.** Same claim, said as one sentence rather than two halves. Steps unchanged.
- Visual: the machine dimmed; four lines light in turn.
- Steps, **five**: (1) two of six channels; (2) water and dye, never the real reagents; (3) 5 µL expected, not verified; (4) no untrained user yet; (5) the two cards deal in — the PANPOC protocol with its real reagents, and a first-time user handling racks, tubes, lids and bottles.
- **Notes by step** (~31 s; step-synced, 2026-09-23; step 0 is arrival): (0) The machine works, but it is not yet a finished instrument. (1) I built only two of the six liquid channels. (2) I tested only with water and dye, never with the real reagents. (3) I never checked the smallest dose, 5 µL, on the assembled machine. (4) And nobody without training has used it yet. (5) So two tests come first: the PANPOC protocol with real reagents, and a first-time user handling racks, tubes, lids and bottles.
- IT: 6 captions, steps 0 to 5 (see CONTENT-IT.md).

**S38. Depth and breadth in prototyping: the pump and alignment modules.**
- **Rebuilt 2026-09-22, retitled twice in Sirio's words. The step count went five → six → five: the strategy table gained a beat by being presented a row at a time, and the closing quotation later lost one.** It first read “The pump got depth because breadth came first; the alignment module got breadth on paper only”, then “The pump balanced breadth and depth; the alignment module built only one concept”; the title now simply names the subject and lets the two columns carry the argument. **The column kickers say it plainly instead**: **`Pump — breadth and depth`** with **`3 concepts, 4 builds`** under it, against **`Alignment — breadth on paper`** with **`1 of about 50 concepts built`**. His note: “pump module is an example of breadth and depth.” The extra beat is the strategy table, which he wanted **a row at a time**: **Depth** with its label and both its cells as one press, then **Breadth** the same way with Depth dimming behind it, and only then the evidence.
- **The quotation is gone, later on 2026-09-22.** Sirio: “Remove the ‘A concept built once is also not a concept tested.’ and the animation to it as well.” The overlay, its step and its tweens are deleted, so **the model panel is now the last beat** and the slide ends on the evidence rather than on an aphorism.
- **The pump column is the real change: three concepts, one picture each, in his order** — and the old single evidence line, “4 rotary, 1 linear · syringe benchmarked”, is gone with it.
  - **Linear pinch — *Marius's, built*.** Ch. 6 §6.1.3 says it outright: two peristaltic concepts were developed into functional prototypes in parallel, the rotary one here and “a linear peristaltic chamber pump developed in the companion thesis by Marius”. **As of 2026-09-23 the slot holds a photograph**: Sirio supplied `assets/media/pump/MariusPump.png` (973 × 611) with the instruction “Please shrink don't crop”, and the drawn schematic that stood in for it is gone. The row was rebalanced into **three bottom-aligned frames, each at its own picture's ratio** — the photo 230 × 146 at x 56, the portrait syringe clip 105 × 186 at x 321, the rotary render 150 × 146 at x 461 — so nothing is cropped and nothing is letterboxed, and each caption is centred on the frame it names.
  - **Syringe pump — *benchmarked*.** §6.1.2: “I benchmarked a commercial laboratory syringe pump.” Never built. **The placeholder is filled as of 2026-09-22**: a portrait clip in a **9:16 box of its own**, with the three-slot row rebalanced around it — 175 / 105 / 175 with 50 px between — rather than cropping a portrait clip into the old 4:3 slot. The file is now **`assets/media/pump/syringe-pump-bench.mp4`** with `syringe-pump-bench-poster.jpg`, a **4.2 s bench-only trim**: the original panned off the pump at 4.4 s, so the back half of every loop was showing a laptop desktop with a Windows taskbar under the caption. The caption is shortened to **Syringe** over **benchmarked**, centred on the 105 px slot — measured on a commercial laboratory instrument, never built here.
  - **Peristaltic — *mine, chosen*.** The v2.3 CAD render, with a **4 builds** chip. It won the scoring 3485 to 3185. The caption read **Rotary** until 2026-09-23; Sirio wants it called **Peristaltic**, so “rotary” is gone from the slide, the notes and the Italian caption.
- Visual: the two-row strategy table (what it buys / what it costs); the pump column under **`Pump — breadth and depth`** with its three captioned slots, the middle one a portrait clip; the alignment column under **`Alignment — breadth on paper`**, fifty chips and one photograph; and last, the model panel — the rotor drawing beside the v2.3 render with the struck-through target.
- Steps, **five**: (1) **Depth** — brings a concept to the precision it can reach, but commits to a shape before its alternatives are built; (2) **Breadth** — compares alternatives as hardware rather than on paper, but a quick build may compare two builds rather than two mechanisms; (3) the pump — three concepts, one picture each, and the **4 builds** chip landing last on the peristaltic pump; (4) the alignment module — fifty chips, one photograph, one built; (5) and last, the model panel — a starting point never validated, target **5.0 µL** struck through against **3.94 / 4.10 µL** delivered, and ±0.10 mm printing making a real rotor sweep worth running. The fuller version of that argument is the appendix slide **B26**.
- **2026-09-23, Sirio’s review:** the model panel’s kicker read **Model first**; it now states the finding, **The pump model was not tested** (Ch. 13, analytical models versus physical prototypes: “the model was never experimentally validated”). The note under the delivered value, “the model was never validated”, said the same thing and is deleted. In the notes, “I built mine four times” became **“I built the peristaltic one four times”**, in Sirio’s words. (Marius’s linear pump is peristaltic too; “rotary” was added once for that reason and removed on his call.)
- **Notes by step** (~45 s; step-synced, 2026-09-23; step 0 is arrival): (0) A module can be developed in depth or in breadth. (1) Depth means building one idea many times, but you choose its shape before trying the others. (2) Breadth means building several ideas, but a quick build can fail for the build, not the idea. (3) The pump had both: Marius built a linear pump, I tested a syringe pump, and I built the peristaltic one four times. (4) The alignment module had breadth only on paper: about fifty ideas, one built, though it sets the machine's size. (5) And the pump's model was never tested: it aimed at 5 µL per stroke, and both pumps deliver less. Unstepped: If asked: the two pumps deliver 3.94 and 4.10 µL per stroke. My peristaltic pump beat Marius's linear one 3485 to 3185 in the scoring. With printing now held to ±0.10 mm, a real test series of rotors is worth running.
- IT: 6 captions, steps 0 to 5 (see CONTENT-IT.md).

**S40. The next prototype starts from the modules, in the order their geometry depends.**
- **Corrected 2026-09-22.** Stage 01 read “Pump · Vial · Nozzle”. `fig:development-order` names its first node “Pump, **storage** and nozzle together”, and a vial is a consumable inside the reagent storage module, not a module anyone can spend the first stage of a prototype developing. The tile now reads **Pump · Storage · Nozzle**, and the speaker note with it.
- **2026-09-22, on his note:** every descriptive line under the chain now starts with a **capital** — “Co-developed until the fluidic interfaces are stable”, “The last manual step…”, “Stronger motors…”, “One board, 24 V, charge sensing”, “Designed last, because it inherits everything”. Wording otherwise unchanged.
- Visual: the six-stage chain, drawn left to right, with a carrier dot handing the geometry forward from stage to stage.
- Steps, **five**: (1) the fluidic core — pump, storage and nozzle, co-developed until the fluidic interfaces are stable; (2) lid opener, then sample rack, both on the one press; (3) the alignment module, stronger motors, step-loss detection; (4) electronics on a board at 24 V with charge sensing; (5) the enclosure, designed last because it inherits everything.
- **2026-09-23, Sirio’s review:** the alignment line in the notes adds **a safe stop button**. Ch. 13 asks for a physical emergency stop button, but in the integration-and-enclosure subsection, not the alignment one; the slide itself is unchanged.
- **Notes by step** (~35 s; step-synced, 2026-09-23; step 0 is arrival): (0) The next prototype should start from the modules, in order. (1) First the pump, storage and nozzle, together, because together they set the dose. (2) Then the lid opener, the last step still done by hand, before the sample rack is fixed. (3) Then the alignment module, with stronger motors, a way to stop if a motor slips, and a safe stop button. (4) Then the electronics, on one circuit board that also measures the battery. (5) The enclosure comes last, because it wraps around everything else. Unstepped: If asked: this time the pump tubing arrived six weeks late, which forced us to build the modules in parallel. Next time, in order. The storage module is Marius's.
- IT: 6 captions, steps 0 to 5 (see CONTENT-IT.md).

**S41. A prepared sample is not an answer: pair the dispenser with a reader.**
- **Completely rebuilt 2026-09-22.** Sirio rejected the previous design outright — “it does NOT convey the message at all. The dispenser looks shit there, and also the analyzer… what the hell is that thing going from left to right?” — so the two line-art outlines and the coded tube that travelled between them are gone. Dialect is now **`dock`**.
- **The composition is the argument.** On the left, a **photograph of the machine that exists**, with the pill **The dispenser · built**. On the right, a **drawn** reader, deliberately dashed and labelled **The reader / proposed, not built**. The contrast between a real thing and a proposal is intentional and honest; nothing pretends the reader exists.
- **One bay, four modules** (was five until 2026-09-23). The reader has a single detector bay with **Fluorescence** seated in it, and three more on a rail below — **Absorbance / colour and turbidity**, **Lateral flow / strip reader**, **Electrochemical** — all on the **same footprint with the same dock tab**. The line reads *“One bay, interchangeable detector modules: the reader is whatever is docked in it.”*
- **2026-09-23, colorimetric and turbidimetry merged.** Sirio asked whether they are the same hardware. They are: an LED, the sample and a photodiode read in transmission, colour at one or two wavelengths, cloudiness at one. So they are one **Absorbance** card, and the rail went from four cards at x 56 / 376 / 696 / 1016 to three at x 56 / 536 / 1016, the bus risers with them. General optics, not the thesis; recorded in `research/qa-readout-methods.md`, “One module for colour and turbidity”. The earlier count of five, and “fluorescence because PANPOC implies it”, came from that research note, not the thesis.
- Kept from the old version: the **code on the kit**, so the operator loads and scans instead of configuring.
- **2026-09-23, step count five → four: the use-case beat is deleted.** Sirio: “The thing about livestock screening and municipal water testing, that animation with those text etc, just remove it… Completely out of context.” Livestock screening and municipal water testing are **no longer anywhere in the deck**. The slide now ends on the code on the tube, re-timed so that beat reads as a resting state rather than a cut.
- Visual: `device/top.jpg` in a 16:9 contained box on the left with the handoff arrow and the word *the sample*; the drawn reader on the right with its bay, its readout bars and *the answer, on the spot*; the module rail across the foot; one narration line at a time under the picture.
- Steps, **four**: (1) the machine that exists — it prepares the sample and performs no detection of its own, the reader showing only as an outline; (2) the reader comes up solid with the handoff arrow drawn, the missing half, proposed not built; (3) the bus and the rail draw, the four modules land and **Fluorescence** seats into the bay; (4) and last, the code appears on the kit — load and scan instead of configure.
- **Notes by step** (~30 s; step-synced, 2026-09-23; step 0 is arrival): (0) In the field, people want a result, not just a prepared sample. (1) This machine prepares the sample, but it does not measure anything. (2) The sample-preparation machine is general purpose, so the reader that pairs with it should be too. (3) So I propose a modular reader: one slot, with a detector for each kind of test. (4) A code on the kit sets up both machines, so the user only loads and scans. Unstepped: If asked: preparing a sample is largely the same from test to test, but detecting the result is not. That is why the detector belongs in a separate reader, not locked inside the dispenser.
- **2026-09-23, Sirio’s review:** the notes now give his reasoning — the sample-preparation machine is general purpose, so the reader that pairs with it should be too; hence a modular reader, one slot, a detector for each kind of test. They name no detector count or list. Thesis §13.6 names four **assay types** (colorimetric, enzymatic, fluorescence, immunoassay); the slide shows four **detector types**, a complementary list, not the same one. Open in PUNCHLIST.md (al).
- IT: 5 captions, steps 0 to 4 (see CONTENT-IT.md).

### Closing (1 min)

**S42. The arrivals hall, again.** No title. The airport photo returns under the text, then gives way to the machine outdoors.
- **2026-09-23, Sirio’s review:** the notes and Italian captions are rewritten from the thesis conclusion (Ch. 14), in its own words: the swab still travels to a central laboratory, sample preparation does not have to, a portable instrument can dispense precisely and unattended, what it needs before an airport gate, and the open question. The old stage direction (“Nothing is written on this slide…”) and the One / Two / Three beat labels are gone. A **hidden** `slide__title` (“The arrivals hall, again.”, `display:none`, never on the stage) gives the presenter panel, the next-slide caption and the overview a title instead of the bare cue.
- **Notes by step** (~38 s; step-synced, 2026-09-23; step 0 is arrival): (0) Back to the traveller: today, their swab must still travel to a central laboratory. (1) This thesis shows that sample preparation does not have to. A portable instrument can dispense liquids precisely and unattended. (2) Before it can stand at an airport gate, it must be rebuilt from matured modules, tested on real reagents with real users, and paired with a reader. (3) Whether that traveller can one day be tested before leaving the terminal is still open. But it is no longer a question only a central laboratory can answer.
- IT: 4 captions, steps 0 to 3 (see CONTENT-IT.md).

**S43. Thank you. / Questions?** Supervisors, Marius, Pulkit. Hard cut into the backups.
- **2026-09-23: the QR and the site address are deleted.** Sirio: “please simply remove the QR code on the final slide, and just replace it with 'Questions?' or something like that. Also the website remove please.” In their place stands **Questions?**, on the mark's axis, in the accent gradient, composed as **the twin of “Thank you.”** — same display face, same size, same rule 34 px under the word. The slide now reads as one line of two display words: **credits on the left, the invitation on the right**, with the turning mark below the invitation. Nothing about the address or the QR survives, so he no longer points at either during questions.
- **Earlier on 2026-09-23** the QR had been shrunk from **256 to 192 px** with a better quiet zone; it was removed outright later the same day, so that change is history. What survived from that pass is the **rotating pump mark is now the hold screen's mark, copied drawing for drawing from S00** — Sirio: “please the rotating pump symbol should be the same as the opening one, which is not (on slide 0). Fix.” It had been a filled dot on a one-shot sweep; it is now the same 120 box, the same r 52 breathing halo and the same **stroked** r 34 rotor with four stroked r 7 dots, at **176 px**, turning clockwise on the same endless **26 s** CSS animation. Both are frozen under `prefers-reduced-motion`. The deck therefore opens and closes on the same turning mark.
- **Later on 2026-09-23: the turning mark is replaced by the pump at work, on S00 and S43 alike.** Sirio asked for S13's peristaltic pump animation, without any numbers or text, in place of the rotating rotor on the hold screen and here. Both slides now run the same figure (four rollers in the 180° track, the pinched tube, the lit packet swept to the outlet, one drop per quarter turn into the receiving tube, the stop-and-go loop) with no *¼ turn · 5 µL* label and no counter, at 0.8 of S13's speed because both slides are calm. One factory, `window.PumpAnim` in `parts/30-part2.html`, draws all three; S13 keeps its labels. Size: the bare drawing at 0.6 (336 × 274 px) — on S00 in the mark's place above the title, on S43 centred on the 1002 px axis under “Questions?”, level with the names. It fades in with the invitation; reduced motion and the presenter preview show one still frame (the hold after two strokes). The breathing halo and the 26 s CSS turn are gone.
- **2026-09-23:** a **hidden** `slide__title` (“Thank you. Questions?”, `display:none`) for the same reason as S42: the presenter panel showed the cue `s43` where every other slide shows its title. Nothing on the stage changes.
- **Notes by step** (~9 s; step-synced, 2026-09-23; step 0 is arrival): (0) Thank you to my supervisors, Maria Dimaki, Winnie Edith Svendsen and Lars Hvam, and to Marius and Pulkit. I welcome your questions.
- IT: 1 caption, step 0 (see CONTENT-IT.md).

---

## D. Appendix slides (after S43, hard cuts)

Two kinds, and the difference matters for the overview. **Sorted** — slides cut
from the talk and filed under the topic they belong to; the overview shows them
inside that topic, after the shown slides, in the appendix slate. **Not yet
sorted** — B01 to B24, which Sirio has not revised, kept in one flat band in
their current order. A slide is an appendix slide because it carries
`data-part="backup"`, never because of its cue; the whole rule is
`SLIDE-ORDER.md`.

**On numbering.** On screen the appendix slides carry `A01`, `A02`, … in the
appendix slate, **computed from their order in `parts/60-backups.html`**, so any
slide moving changes the numbers below it. Nothing addresses a slide by its
number and **no entry below states one**: a slide's address is its `data-cue`
(`s12`, `s39`, `b25`), which never changes — `SLIDE-ORDER.md` §6 step 4.

### Sorted — Opening

**S04. Bringing the lab to the sample often still requires pipetting and an expert.** *(moved out of the talk 2026-09-23, where it was talk slide 3; keeps its `s04` cue, its section, its four own CSS rules and its `Deck.slide` builder now all sit in `parts/60-backups.html`, while the shared `.s04fam` family sheet stays in `parts/10-opening.html` for S04b)*
- **Relabelled 2026-09-23.** This entry was headed **S03** and the contents entry **S04**, the wrong way round against the deck: the field-laboratory slide is cue `s04` and the contents slide is cue `s03`. Both now carry their real cue.
- Visual: `fig-portable-qpcr` (mobile lab in Ethiopia, CC BY 4.0), near full bleed, with a spotlight that closes on the pipettes and the credit *Carlier et al. 2022 · CC BY 4.0* left-aligned under the photo.
- Steps, **two**: (1) the photograph rises out of black and the credit fades in; (2) the spotlight tightens onto the four manual pipettes. The old beats 3 to 5 — the bead protocol, the provenance of the range, the span — became S04c, S04b and B24 and are commented out in the section.
- Say: a mobile molecular laboratory for malaria surveillance in Ethiopia — cycler, magnetic block, shaker — and four manual pipettes doing everything in between. A dozen steps, six liquids, 5 µL to 1 mL, every one of them by hand.
- IT: three beats.

### Sorted — Pump module (chapter 6)

**S12. Only a peristaltic pump keeps the liquid inside a tube you can throw away.** *(moved out of the talk 2026-09-21; keeps its `s12` cue, its section now sits in `parts/60-backups.html`, its CSS and timeline builders stay in `parts/30-part2.html`)*
- Visual: `fig-pump-principles` alone, on a paper plate 1168 px wide, with the wetted boundary drawn in orange on each of the three principles in turn and a caption under each.
- Steps: (1) the syringe — the plunger face and the bore hold the reagent; (2) the reciprocating pump — so do the diaphragm and both check valve leaflets; (3) the peristaltic pump — the first two dim and only the tube draws, and the tube is thrown away.
- Say: accuracy did not decide this (a laboratory syringe pump stayed within nominal from 20 µL up); the wash did, and a border post has no sink.
- IT: three captions.

**B26. A model gives a reasoned starting point; systematic prototyping is what makes the output dependable.** *(new 2026-09-22; `data-topic="pump"`, `data-accent="pump"`, dialect `loop`, placed after B25 and ahead of B01)*
- Asked for directly by Sirio: “Slide 45 mentions the modelling of prototyping. I would like you to read the discussion, and make a slide about modelling on this topic: modelling and just try and error I think it was. The slide has to go to the appendix.”
- **It carries the second half of the thesis's strategy table.** S38 shows **depth versus breadth**; this shows **model first versus prototypes first**. Source: Ch. 13 §“Analytical models versus physical prototypes” and the lower half of `tab:strategies`. Nothing on it is invented.
- **The composition is a cycle, not two columns.** A **Model first** panel on the left and a **Prototypes first** panel on the right, each carrying its strength and its weakness verbatim from the table — model first buys “a reasoned set of dimensions to start from” and is “worth only as much as its validation, which needs many builds”; prototypes first “measures the real part across a spread of dimensions” but “needs printing precise enough that results reflect the dimensions, not the printer”. The **two arms of the loop run through the gap between them**: *dimensions to start from* outward, *measurements that calibrate the model* back. The **return arm is drawn broken, with an ×**, because the model was never validated, and the ±0.10 mm printer is what closes it.
- Lead line above the loop: *“Derive the dimensions from a model before building, or build many variants and derive the model from the data.”*
- Steps, **five**: (1) the two strategies, each with its plus and its minus; (2) the pump went **model first** — choosing rotor diameters and occlusion gaps without a model would have been guesswork — and the outward arm draws; (3) the return arm draws **broken**, the × lands, and the target **5.0 µL** strikes through against **3.94 / 4.10 µL** delivered: the builds went into getting parts to print as drawn rather than into testing the model's predictions; (4) **±0.10 mm**, the × clears, the loop closes and goes orange, with the chip *the v2.3 housing hit its nominal 1.52 mm gap*; (5) the complementary conclusion — the model gives the starting point, a systematic sweep calibrates it, and pumps can then be printed for a chosen volume per stroke — plus **what is still open**: tube bores other than **0.51 mm**, liquids other than water, and **ten-hour runs with gravimetric checks either side**.
- **The distinction to protect:** ±0.10 mm is a **manufacturing** tolerance, **not fluidic behaviour** — how closely a printed part matches its CAD drawing once the compensation rules are applied. The slide says so in as many words. That dimensional repeatability is exactly what now makes an empirical campaign worth running, because differences between test rotors would reflect deliberate geometry rather than print scatter.
- IT: five captions.

### Sorted — Discussion and reflection (chapter 13)

**S39. The AI was the foundation of the digital work; the physical work stayed in my hands.** *(moved out of the talk 2026-09-22 and cut down; keeps its `s39` cue, its section now sits in `parts/60-backups.html`, its CSS and `Deck.slide` builder stay in `parts/50-discussion.html`)*
- Sirio: “only focus on AI, and make it more simple, and put it on the appendix. NO bullshit about timeline.” **The whole timeline is gone** — the axis, the months, the *one decision I would reverse* kicker and the market-search note with it. Nothing on any slide now says when the market search landed. **Steps 4 → 3.**
- What survives is the contrast alone: the working-loop figure with the build stage outlined and its dashed *by hand* tag, the **Decisive for** column against **The boundary**, and the closing quotation.
- Visual: `assets/figs/fig-ai-working-loop.png` on a paper plate; five chips under **Decisive for** — Literature research, Experimental protocols, Measurement analysis, Firmware, Technical specifications; four dimmed chips under **The boundary** — Printing, Assembly, Wiring, Lab testing — with *and the CAD assembly it could not build* beneath them.
- Steps, **three**: (1) decisive for literature, protocols, measurement analysis, firmware and specifications — a foundation, not an accessory; (2) the boundary, purely physical: printing, assembly, wiring, laboratory testing, and the CAD assembly it could not build; (3) “Without AI embedded across the entire engineering workflow, completing an integrated prototype and this depth of experimental validation within a master's thesis timeline would not have been possible.”
- IT: three captions.

### Sorted — Conclusion and outlook (chapter 14)

**B25. Six readouts could fit a portable reader, and each one is a different bill of hardware.** *(new 2026-09-22; `data-topic="outlook"`, so it files beside S41 as the reference slide behind the modular-reader argument)*
- Source: `research/qa-readout-methods.md`, compiled by Sirio. It is background for §13.6, not thesis content, so the slide is an answer to “what would the reader actually do?” rather than a claim the thesis makes.
- **The device is one table, six rows, five fixed columns** — **Light in · Filter · Detector · Heat · Also needs**. Every readout is billed against the same five slots, so **the pattern of filled chips against empty dashes is the argument**: what each method costs in hardware, read across one row. A highlight bar walks down the rows, the current one goes to full opacity and the rest to 0.4, and a judgement card swaps in under the table for each.
- Five are **reachable in a portable module** — Fluorescence, Colorimetric / absorbance, Turbidimetry, Lateral flow, Electrochemical. **Chemiluminescence / ECL** sits under a gate rule labelled *Borderline · more box than a portable module has*. Everything else in the research file — magnetic GMR, surface plasmon resonance, Raman, nanopore — is out, and stays in the speaker notes.
- Lead line before step 1: *“The dispenser assembles the reaction; the reader is what turns it into a number.”*
- Steps, **six**, one per readout: (1) **Fluorescence** — blue LED, two filters, photodiode, 65 °C block, dark box; RT-LAMP, RPA, qPCR, CRISPR; best sensitivity per euro, PANPOC's own assay already works this way, and the heater sets the battery, not the optics; (2) **Colorimetric** — LEDs, photodiode, 65 °C block; the cheapest reader that works, but a crude sample can suppress the colour change and read as a false negative; (3) **Turbidimetry** — 650 nm LED, photodiode, heater; weak, LAMP only, on the list because the parts are the ones colorimetry already needs; (4) **Lateral flow** — white LED, camera, strip holder, **no heater at all**; its hard part is registering the strip, not the optics, which is what the alignment module already does; (5) **Electrochemical** — potentiostat and a printed strip, **no optics at all**, so light, turbidity and colour stop mattering; (6) **Chemiluminescence and ECL** — the label emits its own light, no lamp, but it wants a photomultiplier and a genuinely light-tight chamber.
- Say, if asked why not just a phone: a phone gives a camera and compute for free but no control of exposure geometry, no filters and no heater — it covers lateral flow and colorimetry, nothing below them. And if asked what the dispenser buys the reader: every one of these assumes the reaction mix was assembled correctly; the reader is the cheap half.
- IT: six captions.

### Not yet sorted (B01–B24)

- **B01.** The volume range was read out of five protocols, not estimated.
- **B02.** Forty tubes is a field site's day, not a laboratory's.
- **B03.** Random error shrinks with chained doses; systematic error never does.
- **B04.** The printer was characterized only after two measurement designs failed.
- **B05.** The inline flow sensor fails at exactly the volumes that matter.
- **B06.** Per-stroke volume is a regression slope, not a single weighing.
- **B07.** The syringe pump was rejected on measured performance, not on preference.
- **B08.** Rotary beat the linear pump on hygiene and size after both passed the accuracy gate.
- **B09.** Four rollers is the only count that satisfies geometry, backflow and torque at once.
- **B10.** A tube that stretches straight changes the dose by at most 2.2 %.
- **B11.** Fifty alignment concepts were narrowed on six sketch sheets, and only one was built.
- **B12.** Citation integrity was solved by architecture, not by trusting the model.
- **B13. The pump constant does not transfer between heads, or between sessions.** *(rebuilt 2026-09-23; single step)* — **this is the slide he puts up if a committee member notices that chapters 6 and 12 disagree.** It carried the same Run 4 / Run 5 splice S31 did, per-stroke 3.94 / 4.10 from one session against CV 1.04 % / 2.94 % from another. Rather than delete a column it now shows **both sessions side by side as two structurally identical cards**, so what differs between them is the point.
  - Standfirst: *Both sessions 10 September 2026 · the same two heads · 1000 µL commanded at 180 rpm.* Three facts across the top: **4.53 µL** (the isolated bench head, at a CV of 0.25–0.34 %), **≈ 10 %** (how far short of it both assembled heads fall, on gaps of 1.45 and 1.52 mm), **+1.3 / −5.0 %** (how far each head's measured µL per stroke moved between the sessions).
  - **Session 1, both heads together, chapter 12** — 3 A mains · one shared constant · n = 3, the 4th dose ran the vial dry. Channel 1 ran on 4.08, measured 3.940, **−3.4 %**, CV **0.71 %**; Channel 2 ran on 4.08, measured 4.103, **+0.6 %**, CV **0.37 %**.
  - **Session 2, one head at a time, chapter 6** — battery · own constant per head · lines re-primed · n = 3. Channel 1 ran on 3.94, measured 3.990, **+1.3 %**, CV **1.04 %**; Channel 2 ran on 4.08, measured 3.896, **−4.5 %**, CV **2.94 %**.
  - **The “Ran on / Measured” pairing is what makes the drift readable** without a third table, and the footnote says it in one line **on the slide**, not only in the notes: *Session 2 ran Channel 1 on the 3.94 constant Session 1 measured, so its +1.3 % error is that drift.* Same resolution as S31's; see that entry for the full audit.
  - **Rendering trap, found here and worth knowing generally: `text-transform: uppercase` maps the micro sign to Greek capital Mu**, which the mono face draws as a plain M — an uppercased header read `ML/STROKE` instead of `µL/STROKE` on the projector. The other part files were swept and B13 was the only instance, but **any future uppercased label carrying µ will do the same**.
- **B14.** Six pumps on twenty-one pins works only because the step clock is shared (the pin budget lives here, not in the talk).
- **B15.** The whole electronics bill is about €248.
- **B16.** Battery runtime is governed by firmware discipline: 10 % duty turns one hour into eight.
- **B17.** The device is laboratory equipment, not an IVD, and that changes the paperwork, not the hardware.
- **B18.** The project ran late exactly as its own March risk register predicted.
- **B19.** The septum, the vent and the drained line are where the contamination risk lives.
- **B20.** What the AI got wrong: the CAD assembly, the error-budget weights, planning words leaking into prose.
- **B21.** The requirement verdicts, one row per requirement with the basis. *(one number corrected 2026-09-23: the tally read “6 met”; `tab:validation-verdict` is **5 Met plus 1 By design** — the cross-contamination row, which this slide already labels “By design” in its own table. It now reads **5 met · 1 by design · 3 partly met · 4 excluded · 1 not tested · 1 n/a**, totalling 15. Same miscount that produced the old S34 title. Nothing else on the slide changed.)*
- **B22.** The two-person usability test, what it found and what it cannot claim.
- **B23.** The roller flattens the tube: the occlusion model in full (the 26 % rotor growth, cut from the talk).

## E. Tools embedded

| Slide | Tool | Mode |
|---|---|---|
| S09 | The site itself | address and QR; iframe only if time allows |
| S13 | Rotor Geometry Solver, Occlusion and Displaced-Volume Model, Tensioned Tube-Path Model | three live cards, click to fill the stage; Sirio opens the solver |
| S23 | Live User Interface | live card, click to fill |
| S26 | System Architecture Explorer, Dispense Choreography and Throughput Simulator | two live cards, click to fill; Sirio opens both briefly |
| B14 | Architecture Explorer | live |
| B18 | Thesis Timeline | live |

Every card lazy loads on slide entry with a screenshot poster behind it, so a slow load is invisible. The guest deck shows the screenshots.

## F. Italian guest deck (infrastructure now, content later)

- Same slide ids and step counts as the host; the sync message carries cue and step.
- Image column at 55 %, caption column at 45 %. The current step's caption at 1.35 times the base size and full opacity; earlier captions at base size and 55 %; later captions hidden. Where the English slide has no caption, the Italian one carries it.
- Titles translated as full sentences.
- A breadcrumb ("Parte II · La pompa"), the same mini map, and a "Sirio sta parlando di" label above the captions.
- Divider slides carry "In questa parte" and a short glossary strip.
- Videos in sync with a one-line "guarda" caption; key numbers in orange; screenshots instead of iframes; the demo slide shows the demo checklist in Italian; keyboard works for manual catch-up.

## G. Open questions

1. Defense date and room; projector 16:9; can the laptop run extended mode (laptop screen plus projector) so the presenter view works?
2. Answered 2026-09-20: sound on (longest clip carries it); guest on a second laptop; presenter view with next slide, bullets and timer; Italian drafted by Claude and corrected by Sirio; no handout.

---

## H. Motion and composition, slide by slide

Shared rules: one easing (`--ease`, GSAP `expo.out`), 480 ms reveals, 220 ms hover, 1200 ms slow fades; under `prefers-reduced-motion` every timeline jumps to its end. "Draws itself" means DrawSVG. **These are starting points. Better ideas found while building replace them; be creative.**

- **S01.** The 7 s dispensing clip loops under a scrim; the rotor mark turns once; an orange rule draws under the title.
- **S02.** The airport photo rises from black over 2.2 s. Step 1 draws the scene over it, with no words: the traveller ring, the swab, the droplet falling into the tube, the tube filling and then travelling the drawn route to the laboratory flask while the clock ring fills and its hand sweeps 331°; a soft veil darkens the photograph under the drawing. On step 2 the photo shrinks into the top-right card in one 900 ms move, the title fades up, the axis draws and the goal band grows; step 3 runs the 26 h bar off the stage; step 4 brings the 2.6 h bar and the closing line.
- **S03.** Photo full bleed; a soft mask tightens on the pipettes; the photo slides to 55 % and six bars grow on a log axis, the 5 µL one a dot; then two scatter bars, the second 28 times taller.
- **S04.** Four text blocks; each lights in turn with a 16 px lift and its accent rule scaling down from the top, the ones before it dropping to 34 %.
- **S05, S11, S25.** Wash brightens and drifts; numeral in Geist; the mini map segment fills. S25 zooms out from the module to the whole machine and, like S11, draws a three-stop strip with the drop lighting architecture and electronics, integration, validation in turn.
- **S06.** Three icons draw themselves; ticks and crosses draw; the empty row's dotted outline pulses once.
- **S07.** The statement alone; six key phrases light in orange; the statement shrinks up and five gate cards stand up with a small overshoot; tiles stack pump first; match cut to the machine; callouts land, the enclosure one on empty air.
- **S08.** A line-drawn house flickers villa to townhouse; a window appears where a balcony was; a wall moves back; a blueprint grid draws over it floor by floor with a check per floor.
- **S09.** Three figures in a row; the discussed one grows; the loop draws clockwise; the physical stages get an orange outline; 40 dots fall and 12 land; the QR draws in a spiral.
- **S12.** The plate rises 18 px on entry; the orange wetted line draws around the plunger and bore, then around the diaphragm and both check valves, then — with the first two dropped to 20 % — around the tube alone. One caption fades up under each as its boundary closes.
- **S12b.** Thirty chips scatter in and settle, three of them carrying a metering principle each; they thin by opacity to seven — the three principles lift 6 px and take the accent as they survive — then to five and two; the two grow into the finalist glyphs, the rotor turning a full revolution about its hub and the pinch carriage stroking once, while the scores count to 3485 and 3185.
- **S13.** The pump loop runs from entry: a quarter turn in 1.6 s with a sine ease, a 1 s hold, one drop per stroke, the counter stepping on each landing, the receiving tube swapped after four strokes. Step 1 moves the pump left in 0.9 s and lifts the three numbers in with a 140 ms stagger; step 2 fades the labels, flies the pump into a 0.29 miniature in the bottom band and the numbers into one row in 0.95 s, and the three cards rise with 120 ms stagger; the clicked card grows to fill the stage in 480 ms and the other two dim; Escape reverses it.
- **S14.** Two columns, four blocks, one story; every photograph whole, only ever scaled. The taped photo opens large on the left and steps back as the sensor block arrives in the right; the leader draws onto the flow sensor and the trace draws itself jaggedly about a zero that sits on the x-axis, the one-standard-deviation band fading in across it and the twelve samples below it taking a dot; the balance block drops in under it — the weighing clip running beside the frame with the tilted box drawn on the reading; last, the left column closes — one bar rising to 3.39 under the 5.00 nominal line, the shortfall shaded between them and the 4.5 % whisker drawn after it. Each block scales down a step and dims to 55 % once it has been presented, and its annotations fade out with it, so no live type is ever painted below 18 px.
- **S15.** Three panels in a column, the active one taking the left half: the mount offset tweens up tenfold and the gap opens 1.82 to 2.22; the peg tapers and the roller tilts, then snaps straight; the printer step draws nothing on its photographs — the small coupon settles beside the rule figure, which wipes in one panel at a time, external rule then internal, while "±0.10" counts down; then the pump in parts, full width while "1.52" counts up, stepping back as the measured figure grows in beside it and leads out to "1.52" at three points, apex first.
- **S16.** Axes draw; the pipette benchmark dashes across; both series draw and their points drop with stagger; then a dashed stem draws up from the 180 rpm tick and one ring pops around both points there as the weighing clip starts; last "4.53" counts down from 5.00. Three cells under the chart light in turn, the earlier ones staying at 55 %.
- **S17.** Sheets fan in at small angles; they straighten and the chosen one lifts; the rule is boxed on the sheet and arrives in the column as one thought, and three rejected approaches are struck through under it; the rack render slides in, eight measured tubes drop in with stagger, a 22 mm dimension draws with a ghost cap-opener jaw in the gap, a tape draws to 154 mm.
- **S18.** Three columns; the active one widens; the clip plays while wide; the switch ring draws itself on the V2.1 photo. *(The two bars that followed were removed on 2026-09-23.)*
- **S19.** A rack glyph is fed onto the rail, then **indexes seven times with a real 0.62 s hold on each position**, takes the final stroke, **follows the two roughly 45 degree fishbone grooves down-right** and drops vertically into the out tray; crossfade to the isometric. No text.
- **S20.** Findings left; the two CAD renders arrive on the right, then step down to the bottom left as the as-built photograph takes the right region and three marks draw on it - the motor ringed with a leader arrow, the one fitted band ringed, and the 22 mm between the needles dimensioned.
- **S21.** Clip plays throughout; gauges light in pairs; a stream pours from the fine tips; a drop grows, necks and detaches from the wide tips, timed to the clip; a plastic tip repeats it faster; "nine of ten" counts.
- **S22.** Two screens at 2×; a red outline draws around the tiny button and a 44 by 44 square grows over it; the right screen's bottles fill; three candidate cards flip in below; "7:1" rises into the right column and a gradient bar draws the full width under it.
- **S23.** All six frames land at once, 60 ms apart, in under a second; they fold into a filmstrip and the live card grows into the space; click fills the stage.
- **S24.** Three photos slide in from the right in sequence; one circle draws around the air filter on the third; on step 4 a faint wireframe mesh overlays the parts.
- **S26.** Two cards rise side by side; under each, a one-line finding types in; the clicked card fills the stage.
- **S27.** (Replaced 2026-09-22.) No overlay animation: the control figure is presented whole, shrinks and slides to the left as the power tree rises into its place, and the production design fades in over the as-built plate.
- **S28 to S30b.** (Rebuilt 2026-09-22.) One accumulating bar along the bottom. On each slide the pictures are presented whole in the band above it, and on the closing beat of a category its representative picture **flies down and shrinks into its slot** — the slot starts at the big picture's own position and scale and tweens to 178 by 100 at the bottom, its colour chip fading in behind it. A slide never animates a slot it did not earn: the earlier ones are simply there at step 0. **S28 now opens on its title alone** and its first render arrives on the first click (2026-09-23), and **S30b is a single beat**: the plate and the four bar chips at rest, then the leaders, the three dimensions and the counting weight. (Both rebuilt again 2026-09-22: the thumbnail no longer parks over its source photograph at a resting step, and the kicker crossfades a stack of sibling labels rather than rewriting one node, so stepping backward always shows the label that belongs to that position.)
- **S31.** (Rebuilt 2026-09-22, repeatability restated 2026-09-23.) The 10 % band draws; the first bar runs out past the left edge and that edge flashes red; the bracket draws and both channel bars land inside; the per-stroke panel rises; and last the coefficient-of-variation block, which names what the number is and what it is of instead of the two unlabelled dots that used to sit there. The clip plays throughout.
- **S32.** (Rebuilt 2026-09-22.) Slow 2400 ms crossfade start to done with a 0 to 40 counter while the sped-up run plays beside it; **nothing is drawn on the photograph**; the tube thumbnails slide up; the off-target block fades in last, on its own beat.
- **S33.** (Re-animated 2026-09-22.) On the lid photo a green ring draws on the folded cap, then a red ring and a short reach arrow on the flat one; the battery glyph runs full with both rotors turning, drains while both judder, then one turns alone; the needle enters the disc and withdraws five times, a mark landing each time, then fifteen more at speed and beads on the tips. Both photo cards are contained, never cropped, and each card's overlay retires with the card.
- **S34.** (Rewired 2026-09-22, re-timed 2026-09-23.) Verdict chips fill colour per group, one column per press, Safety settling on its own beat; then **on the next press** the four excluded chips connect by drawn dotted lines, routed orthogonally down the gutters and along two collector rails, to **three** pills — "Enclosure", "Cleanable materials" and "Circuit Board (PCB)"; the electrical-safety line needs no rail and drops straight into its pill.
- **S35.** The four clips start together in a mosaic, the portrait one full height on the left; a clicked clip grows to fill the stage in 480 ms and the others slide off; the mini map's demo marker lights.
- **S36.** The demo slide holds still; a key press plays the fallback clips side by side.
- **S37.** Machine at 30 %; four lines light, each dimming the last; two test cards stand up.
- **S38.** (Rebuilt 2026-09-22.) The strategy table lights **a row at a time**, Depth then Breadth; the pump column deals three bottom-aligned slots, each at its own picture's ratio — photograph, portrait clip, render — with a "4 builds" chip landing last on the rotary; the alignment column shows fifty faint chips and one photo; and the rotor drawing and the v2.3 render rise last with the struck-through target. (The closing quotation and its beat were deleted later the same day.)
- **S39.** (Cut down and moved to the appendix 2026-09-22; its entry is in section D, under Discussion and reflection.) The working loop with the build stage outlined and its dashed "by hand" tag; the **Decisive for** chips, then **The boundary** chips dimmed; the quote fades up. **The timeline is gone entirely** — axis, months, the "one decision I would reverse" kicker and the market-search note — so nothing on this slide, or any other, now dates the market search.
- **S40.** The chain draws left to right; each node lights as named.
- **S41.** (Rebuilt 2026-09-22.) The photograph of the built machine rises with the drawn reader behind it at 22 %; the reader comes solid and the handoff arrow draws; the bus and the module rail draw, four modules land and Fluorescence seats into the bay; and last, a schematic code fills on the kit and stays. One narration line at a time, swapped per step. (The use-case beat that followed was deleted 2026-09-23.)
- **S42.** Dip to dark; the airport photo returns under the beats, then crossfades over 6 s to the machine outdoors; the droplet falls once more; dip to dark.
- **S43.** (Recomposed 2026-09-23.) No QR spiral and no tools grid any more: two display words rise, “Thank you.” over the names and “Questions?” over the mark, each with its own rule. Under “Questions?” the pump at work — the hold screen's figure, S13's pump without labels — runs its stop-and-go loop for the whole question session.
- **B26.** (New 2026-09-22.) Two panels hold still while the loop between them is drawn: the outward arm first, then the return arm **broken**, with an × landing in the gap and the target striking through; on the next press the × clears, the two halves of the return arm close and the whole loop goes orange. The foot band swaps one beat at a time, always in the same place.
- **B25.** (New 2026-09-22.) Nothing moves but a highlight bar: it slides down the six readout rows, the live row goes to full opacity and the rest to 0.4, and the judgement card under the table swaps for each. The lead line clears on the first press.
- **Backups.** 220 ms fade only; a "Backup" label top right.

## I. What changed from v2 (2026-09-20, second review)

- Sections A and B now say explicitly: be creative, use the full potential, invent per slide.
- S03 keeps the airport photo as a shrinking card in the corner (merge with S02 left as an option).
- Storage module moved to the end of Part II (S24); Part II order is pump, alignment, nozzle, interface, storage, the thesis's own order; the red thread rewritten to match.
- Pump tools embedded as three click-to-enlarge live cards on S13; the 26 % rotor slide folded into it (full version in backup B23).
- Architecture slide (S26) rebuilt around the process and the two embedded tools (explorer and choreography simulator); pin arithmetic moved to backup B14.
- Integration expanded to three image-heavy slides in the thesis order (S28 carriers, S29 nozzle and display, S30 battery and whole machine).
- A five-minute live demo (S36) placed after the validation and before the discussion, with fallback clips.
- Cuts to make room: the 26 % slide, the separate rack slide (folded into S17), the second interface slide (folded into S22), the separate site slide (folded into S09), the model-versus-prototypes slide (folded into S38). 44 slides plus backups.

## J. What changed from v3 (2026-09-20, third review)

- S02 and the time-axis slide merged into one eight-step slide; every later slide renumbered down by one (43 slides plus backups).
- The four whole-machine clips (from the thesis exports, `Full Prototype/`) placed: the 7 s landscape dispensing clip loops behind the cover; the 20 s sped-up run plays on the forty-tube slide; the 44 s outdoor run replaces the outdoor still on the whole-machine slide; all four together on a new slide before the demo (S35), click to grow.
- The demo slide notes that the machine arrives ready with dye and a rack.
- Convention added: less text, let the image speak; step sentences are speech and Italian captions, not on-screen text.
- Open questions replaced with the next set.

## K. Decisions of the fourth review (2026-09-20)

- Sound on for the machine clips; the longest clip on a slide carries the audio. Clips re-encoded with their audio tracks.
- Guest is a second laptop on the venue network.
- A presenter view on Sirio's laptop: current slide, next slide, minimal bullets, timer. Speaker notes become part of the build.
- Italian text: Claude drafts, Sirio corrects. No PDF handout.

## L. Dialect per slide (decided 2026-09-20 after the preview round)

Sirio kept all three previews. A (engineering sheet, `previews/a.html`) is the clearest and suits technical content; C (stacked cards, `previews/c.html`) is the best looking and suits the less technical modules; B (cinematic cut, `previews/b.html`) suits image-led moments, with the image brighter than in the preview. Assignment, to be bent where a slide asks for it:

| Dialect | Slides |
|---|---|
| B cinematic | S01 cover, S02 airport, S03 by hand, dividers S05 S11 S25, S30 whole machine (last step), S32 forty tubes, S35 machine in motion, S36 demo, S42 closing |
| A engineering sheet | S04 contents, S06 gap matrix, S07 requirements and modules, S09 AI tools, S13 concepts, S14 pump tools, S15 first pump, S16 three builds, S17 pump results, S27 architecture tools, S28 shared clock, S31 accuracy chart, S34 verdict table |
| C stacked cards | S08 house, S18 to S20 alignment, S21 to S22 nozzle, S23 to S24 interface, S24 storage, S33 failures, S37 to S41 discussion |
| record (own, 2026-09-22) | S28 carriers, S29 nozzle and screen holder, S30 battery cradle, S30b the finished machine — one category at a time above an accumulating bar of what integration produced |
| divider | S05, S09a, S11, S25, **S37a** (Part III-B, plain: no journey strip) |

Shared across all: the corner nav fades out after 3 s of no mouse movement while presenting; figures drawn for print sit on a warm paper frame (`#f6f3f0`), photos and clips sit on dark; the mini map bottom right; one GSAP timeline per slide with labels per step.
