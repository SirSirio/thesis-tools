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

**S03. The sample is still prepared by hand: a dozen steps, six liquids, from 5 µL to 1 mL.**
- Visual: `fig-portable-qpcr` (mobile lab in Ethiopia, CC BY 4.0) with a spotlight on the pipettes; six liquid bars on a log axis; the pipetting scatter bars.
- Steps: (1) photo; (2) spotlight on the pipettes; (3) the six liquids; (4) "Trained hands are 28 times less consistent at 10 µL than at 1 mL, and experience does not help."
- IT: four captions.

**S04. Three parts, one droplet.** (contents) **A structured text slide — no photograph, no journey bar, no second map.**
- Visual: four blocks, each a mono part label at the left, a thin accent rule, a short title and one line of contents. Part I, why this machine, and how I worked — the gap · the requirements and the modules · working with an AI. Part II, the modules — pump · alignment · nozzle · interface · storage. Part III, the machine — electronics · integration · validation. Then: live demo, what I learned and what comes next, closing.
- Steps: one block lights per step and the ones before it drop to 34 %: (1) Part I; (2) Part II; (3) Part III; (4) the three closing stops together.
- Say: questions at the end; backup slides exist.
- IT: four captions.

### Part I. Why this machine, and how I worked (4 min)

**S05. Divider: Part I. Why this machine, and how I worked.**

**S06. No instrument today is precise, portable, unattended and open to any protocol at once.**
- Visual: a 3 by 4 matrix, three instrument families as line-art icons against four properties; the empty fourth row.
- Steps: (1) lab workstations; (2) cartridge platforms; (3) open-source portables; (4) the empty row.
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

**S11. Divider: Part II. The modules.** The mini map lights five stops: pump, alignment, needle, screen, vial.

#### Pump (orange)

**S12. Only a peristaltic pump keeps the liquid inside a tube you can throw away.**
- Visual: thirty concept chips thinning to two photos; `fig-pump-principles` with the wetted boundary drawn in orange.
- Steps: (1) thirty ideas in six families, some deliberately absurd; (2) seven passed, five developed, two built, rotary won 3485 to 3185; (3) in a syringe or a diaphragm the liquid touches the machine and the field has no sink; in a peristaltic pump only the tube is wet.
- IT: three captions.

**S13. Count steps, not seconds: the dose comes from the geometry, and three tools set it.** (tools embedded)
- Visual: left, the design point as a stat ladder (0.51 mm bore, 0.91 mm wall, four rollers, 5 µL per stroke, 19.70 mm rotor). Right, three live cards: Rotor Geometry Solver, Occlusion and Displaced-Volume Model, Tensioned Tube-Path Model. Click a card and it fills the stage.
- Steps: (1) the design point; (2) the three cards appear with one line each: which roller count is feasible; how much the roller flattens the tube and why the rotor grew from 15.6 to 19.70 mm; whether a taut tube changes the dose (at most 2 %); (3) Sirio clicks the solver and shows, in about 30 seconds, that four rollers is the smallest count that never leaves the tube open and the largest with torque to spare at 12 V.
- Say: the tools were built while the decisions were open, not written up afterwards.
- IT: a screenshot per tool with its one line; no iframes on the guest.

**S14. The first pump did not seal, and the flow sensor could not tell me why.**
- Visual: `pump/proto01-open.jpg` (tape holding the head down); the jagged flow trace; `pump/gravimetric.jpg` with one steady number.
- Steps: (1) a rotor 2 mm too small and a gap drawn from a guessed wall; with a paper shim, 3.39 µL of a nominal 5; (2) the inline flow sensor scattered more widely than the flow it measured; (3) the balance became the reference for every volume in the thesis; (4) the shortfall repeated dose to dose, so the parts were wrong, not the motor.
- IT: four captions.

**S15. Three more builds fixed the printing, not the physics.**
- Visual: three panels taking focus in turn (`fig-v21-gap-around-arc`, `fig-roller-peg-taper`, `method/calibration-rings.jpg` with the two printer rules), then `fig-pump-head-gap`.
- Steps: (1) v2.1: the mount sat 0.45 mm high and the gap opened to 2.22 mm at the top of the arc; (2) v2.2: printed pegs taper and tilted the rollers, fixed with one bearing on the wide base; (3) a housing drawn at 1.52 mm printed at 1.75, so the printer was characterized on rings: outer sizes shrink 0.65 %, inner bores lose a fixed 0.14 mm, parts predictable to ±0.10 mm; (4) v2.3: the gap read exactly 1.52 mm at three points.
- Say: "CAD dimensions are assumptions until anchored to a physical datum."
- IT: four captions.

**S16. The pump repeats a dose as well as a hand with a pipette.**
- Visual: `fig-pump-precision` with the 0.27 % pipette line drawn first; `video/pump-head.mp4` beside it.
- Steps: (1) the pipette line; (2) the pump, 0.25 to 0.34 % over 76 replicates; (3) 4.53 µL per stroke, 9.4 % under nominal, corrected once in firmware; (4) two heads from the same files gave 3.94 and 4.10 µL, so each print gets its own number.
- IT: four captions.

#### Alignment (violet)

**S17. Move the tubes, keep the nozzles still, and let the tube spacing set the size of the machine.**
- Visual: four sketch sheets fanned; `alignment/rack.png` arriving on the last steps.
- Steps: (1) fifty ideas, ten survived; still nozzles mean tubing that never bends and a rack that shows progress; (2) one principle: easy to clean first, easy to build second; push, never grip; an open rack and pinion; the drive above the spills; (3) the rack: eight tubes because biology counts in eights, 22 mm apart because a cap opener needs the room, 154 mm of travel; the footprint belongs to the consumable.
- IT: three captions.

**S18. Three builds made a printed alignment module that finds its own zero.**
- Visual: the V1 strip, `alignment/v21-homing.jpg`, `video/alignment-v2.mp4`, each widening in turn.
- Steps: (1) V1: a printed rack and pinion indexes 22 mm repeatably; (2) V2: the motor above the samples, protected by gravity; (3) V2.1: a switch and a three-pass homing, 0.03 mm repeatability, no lost steps over 132 mm; (4) the one miss: 140 mm of rail for 154 needed.
- IT: four captions.

**S19. The final chassis queues five racks and ejects them with no extra motor.**
- Visual: `alignment/v3-top-annotated.png`, then `v3-iso.png`; a rack glyph travels the U.
- Steps: (1) input queue, lane, output tray; (2) a second axis feeds the next rack; (3) two ribs and two grooves: the last 22 mm of travel drops the rack into the tray; (4) forty tubes, and the chassis becomes the frame of the whole instrument.
- IT: four captions.

#### Nozzle (teal)

**S20. The nozzle was rebuilt so any needle clicks in without tools.**
- Visual: `nozzle/as-built.jpg`; `nozzle/carrier-top.png`; `holder-vibr-top.png`.
- Steps: (1) inherited: too weak to shake a droplet off, nothing to mount it with, a file that could not be edited; (2) the seat is a print of the needle's own hub, slip fit on the first try, any gauge; (3) a magnet and three nuts for the shake, two elastic bands to keep the carrier on its posts.
- IT: three captions.

**S21. The needle bore decides whether a droplet forms at all.**
- Visual: `video/droplet-slowmo.mp4` throughout; `nozzle/needle-assortment.jpg` with the gauges lighting in turn.
- Steps: (1) five tips tried with water; (2) 0.21 and 0.26 mm: a stream, nothing to shake off; (3) 0.41 and 0.51 mm: a droplet forms and most release; (4) plastic tips released nine of ten small droplets and never scattered; the machine ran on 22 G steel.
- IT: four captions.

#### Interface

**S22. The inherited screen trapped the user, so it was redrawn in a browser that checked its own buttons.**
- Visual: `ui-v1-home` and `ui/screen-home.png` at the same size; the three round-1 candidates beneath; an audit strip.
- Steps: (1) a calibration screen with no way out but the power switch, buttons of 25 by 14 pixels; (2) rebuilt as a picture of the machine: bottles with their fill, racks at their pitch, three rows at most; (3) nine candidates over three rounds, each page measuring its own smallest button and contrast: a 6.2:1 palette caught before it reached the device; (4) two colleagues found that "tube" meant two things; it became "line" and "tube".
- IT: four captions.

**S23. One run, start to done, on one screen.** (tool embedded)
- Visual: six device frames (home, pick, assign, check, run, done), then the live interface mockup as a card that fills the stage on click.
- Steps: (1 to 6) the frames; (7) the live card: Start a run, and the check that renames Start to "Refill first".
- Say: the interface never shows a number it cannot stand behind.
- IT: seven captions; no iframe on the guest.

#### Storage (inherited, last)

**S24. The reagent waits in a sealed vial, read by a sensor and drawn by two needles.**
- Visual: `storage/cartridge.jpg`, `storage/sleeve.jpg`, `storage/needle-holder.jpg`, side by side; "designed and built by Marius".
- Steps: (1) the cartridge with a copper-tape electrode that reads the level; (2) the sleeve with spring pins; (3) the needle holder: one needle draws liquid, one lets air in through a 0.22 µm filter; (4) it arrived as an uneditable mesh, which shaped the integration.
- IT: four captions.

### Part III. The machine, wired, assembled, validated (5.5 min)

**S25. Divider: Part III. One machine.** Zoom out to the whole machine.

**S26. Twenty-five ways to wire six pumps, screened with two tools instead of a datasheet pile.** (tools embedded)
- Visual: two live cards side by side: the System Architecture Explorer and the Dispense Choreography and Throughput Simulator. One line of process under each. No pin arithmetic on the slide.
- Steps: (1) the question: how does one small computer drive a touchscreen, six pumps, two axes and a shaker; (2) the explorer card: 25 candidates in four families, costed on real prices, checked against real pins; the finding, "which driver, not which processor"; (3) the simulator card: a rack indexing under six nozzles; the finding, the second pump buys most of the time and four more buy almost nothing; (4) Sirio opens each briefly.
- Say: "datasheet review would have ended in whichever option I examined last."
- IT: two screenshots with their lines.

**S27. One clock drives six pumps, because a dose is a number of steps.**
- Visual: `fig-architecture-selected` animated; `device/electronics-bay.jpg` small and honest.
- Steps: (1) the best answer on paper was out of stock; (2) every pump meters a fixed volume per step at one speed, so one pulse train serves all six, each with its own enable line; (3) two surprises: a weak adapter stalled two pumps, and a motor casing radiated into the bus until one capacitor was taped to it.
- Say: breadboards; production is a board at 24 V with charge sensing, no firmware change.
- IT: three captions.

**S28. Each pump and its vial share one printed carrier, and the carriers hold each other.**
- Visual, image intense: the eight carrier renders from the thesis (central and left, front and back, empty and full) in a 4 by 2 grid that reorganises as the steps go; then `device/carriers-rear.jpg` and `carriers-side.jpg`.
- Steps: (1) the empty central carrier, front and back: the pump drops in from above, the vial slides in from the front; (2) full; (3) the left carrier: the same, plus a tall flange for the side wall (circled); (4) mounted: dovetails plus horizontal screws, because "an operator does not know which part is load-bearing".
- IT: four captions.

**S29. The nozzle bolts to the chassis; the screen tilts to 45 degrees so you look down at it.**
- Visual: `nozzle/mounted-front.jpg`, `nozzle/lines-over-rack.jpg`; `fig-display-holder` CAD, `ui/display-side.jpg`, `ui/display-top.jpg`.
- Steps: (1) the holder on the electronics bay, two of three screws visible; (2) the lines crossing the drive rack to the hubs; (3) the display holder in CAD, split on a dovetail so the stylus clips cost half a print; (4) at 45° on the bench, stylus tethered, about ten prints in all.
- IT: four captions.

**S30. A published battery holder and three screws put the power on board.**
- Visual: `device/battery-cradle-cad.png`, `device/battery-empty.jpg`, `device/battery-loaded.jpg`; then the whole machine: `device/top.jpg`, `inside-left.jpg`, `inside-right.jpg`, and on the last step `video/machine-outdoor-run.mp4` (the 44 s sped-up outdoor run on battery) playing where the outdoor still was.
- Steps: (1) the cradle: holes filled and re-cut for M3, the pack clips on; (2) empty and loaded; (3) the whole machine, 50 by 35 by 18 cm, 3.3 kg, two handles; (4) not yet: two of six channels, breadboards, no charge sensing, no enclosure; the outdoor run is a scenario, not a claim.
- IT: four captions.

**S31. Calibrated on itself, the machine lands within 3.4 % of the target.**
- Visual: a chart built for the deck, the ±10 % band first; `video/pump-gravimetric.mp4` beside it.
- Steps: (1) the band; (2) with the bench constant, about 18 % short; (3) recalibrated on the instrument, −3.4 % and +0.6 %; (4) scatter 0.2 to 1.0 % against 0.27 % for a hand pipette on the same balance; (5) the constant moved +1.3 % and −5.0 % between sessions, so a field instrument must recalibrate itself.
- IT: five captions.

**S32. Forty tubes, five racks, nobody in the room.**
- Visual: `device/validation-start.jpg` crossfading to `validation-done.jpg`; `video/machine-demo.mp4` (the 20 s sped-up run) playing beside the done photo; the two tube photos.
- Steps: (1) start; (2) done, 100 and 75 µL in every tube; (3) every drop inside the 5 mm circle, three drops on the deck in forty tubes; (4) first and last rack alike by eye.
- IT: four captions.

**S33. The failures were a tube cap, a tired battery and a leaking septum.**
- Visual: `alignment/lid-fouling.jpg`; `device/validation-battery.jpg`; a septum glyph.
- Steps: (1) a cap left flat rubs the wall, the rack lags, the drop lands beside the tube; (2) on battery, sixteen samples, then both pumps stalled; (3) the septum reseals about five times, not reliably past twenty.
- IT: three captions.

**S34. Six requirements met, three partly, four waiting for an enclosure and a circuit board.**
- Visual: the verdict table, colour coded, one group per step.
- Steps: (1) performance; (2) automation; (3) portability; (4) contamination; (5) safety.
- IT: five captions.

**S35. This is the machine, and it is in the room.**
- Visual: the four whole-machine clips together on one stage, all playing: the portrait dispensing clip (27 s) standing full height at the left; the short landscape dispensing clip (7 s, looping), the sped-up demo (20 s) and the outdoor run (44 s) tiled on the right. Only the longest clip, the outdoor run, plays its sound; a clicked clip grows to fill the stage and takes over the sound; Escape returns. The mini map's demo marker lights. No text beyond the title.
- Steps: (1) all four start together; (2 to 4) optional: each clip grows in turn if Sirio wants to point at something before walking to the bench.
- Say: this is what you are about to see for real.
- IT: one caption per clip saying what it shows.

### Live demo (5 min)

**S36. Live demo.** A quiet slide: the machine photo at 30 % and a short checklist for Sirio only in the speaker notes, not on screen. On screen: the title "The machine, live" and the site address. The machine comes to the room ready, with dye and a rack loaded.
- Suggested run, five minutes: load a rack, pick a recipe on the screen, show the pre-run check, run one or two tubes with dye, watch a droplet detach, show the rack eject. Fallback if the machine misbehaves: the pump-head and droplet clips play from this slide on a key press.
- IT: the checklist in Italian, on screen for the family, since they cannot see the bench well.

### What I learned, what comes next (3.5 min)

**S37. The concept is proven; the instrument is not.**
- Visual: the machine dimmed; four lines light in turn.
- Steps: (1) two of six channels; (2) water and dye, never the real reagents; (3) 5 µL expected, not verified; (4) no untrained user yet; (5) two tests first: the real protocol, and a first-time user handling racks, tubes, lids and bottles.
- IT: five captions.

**S38. The pump got depth because breadth came first; the alignment module got breadth on paper only.**
- Visual: the strategy table (depth, breadth, model first, prototypes first); photos of the two pumps built and the one alignment module built; the rotor drawing beside the v2.3 photo.
- Steps: (1) depth reaches the precision a concept can, but commits to a shape early; breadth compares hardware, but a quick build may compare two builds rather than two mechanisms; (2) the pump had both: a syringe benchmarked, a linear pump built, four rotary builds; (3) the alignment module set the size of the machine and only one of fifty concepts was built; a carousel or a gantry might have been smaller; (4) the model gave a starting point but was never validated, and the 5 µL stroke was never reached; the ±0.10 mm printer now makes a real sweep of rotors worth running; (5) "A concept built once is not a concept tested."
- IT: five captions.

**S39. The AI was the foundation of the digital work; the physical work stayed in my hands.**
- Visual: the working loop with the physical stages outlined; a small timeline.
- Steps: (1) decisive for literature, protocols, data, firmware and specs; (2) the boundary: printing, assembly, wiring, lab testing; the CAD assembly it could not build; (3) the one decision I would reverse: the market search came only at writing time, so the pump was built from scratch although open designs existed; (4) "Without AI across the whole workflow, an integrated prototype and this depth of testing would not have fit a master's thesis."
- IT: four captions.

**S40. The next prototype starts from the modules, in the order their geometry depends.**
- Visual: the six-stage chain, drawn left to right.
- Steps: (1) pump, vial and nozzle together; (2) lid opener, then rack; (3) the alignment module, stronger motors, step-loss detection; (4) electronics on a board at 24 V with charge sensing; (5) integration parts and enclosure last.
- Say: parallel development was forced by six weeks of late tubing; next time, in order.
- IT: five captions.

**S41. A prepared sample is not an answer: pair the dispenser with a reader.**
- Visual: dispenser and reader outlines; a tube with a QR code between them.
- Steps: (1) operators want a result, not liquid handling; (2) a modular reader with swappable detectors; (3) a code on the tube: load and scan rather than configure; (4) first, a sharper use case: livestock screening and water testing pull the specification apart.
- IT: four captions.

### Closing (1 min)

**S42. The arrivals hall, again.** No title. The airport photo returns under the text, then gives way to the machine outdoors.
- Steps: (1) "Returning, finally, to the traveler in the arrivals hall: today, their swab must still travel to a central laboratory. This thesis shows that sample preparation does not have to." (2) "A portable instrument can dispense liquids precisely and unattended. Before it can stand at an airport gate, it must be rebuilt from matured modules, tested on real reagents with real users, and paired with a reader that delivers the final diagnostic result." (3) "Whether that traveler can one day be tested and cleared before leaving the terminal remains an open question, but it is no longer one that only a central laboratory can answer."
- IT: three beats.

**S43. Thank you.** Site address and QR, supervisors, Marius, Pulkit. Hard cut into the backups.

---

## D. Backup slides (after S43, hard cuts)

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
- **B13.** The pump constant does not transfer between heads.
- **B14.** Six pumps on twenty-one pins works only because the step clock is shared (the pin budget lives here, not in the talk).
- **B15.** The whole electronics bill is about €248.
- **B16.** Battery runtime is governed by firmware discipline: 10 % duty turns one hour into eight.
- **B17.** The device is laboratory equipment, not an IVD, and that changes the paperwork, not the hardware.
- **B18.** The project ran late exactly as its own March risk register predicted.
- **B19.** The septum, the vent and the drained line are where the contamination risk lives.
- **B20.** What the AI got wrong: the CAD assembly, the error-budget weights, planning words leaking into prose.
- **B21.** The requirement verdicts, one row per requirement with the basis.
- **B22.** The two-person usability test, what it found and what it cannot claim.
- **B23.** The roller flattens the tube: the occlusion model in full (the 26 % rotor growth, cut from the talk).

## E. Tools embedded

| Slide | Tool | Mode |
|---|---|---|
| S09 | The site itself | address and QR; iframe only if time allows |
| S13 | Rotor Geometry Solver, Occlusion and Displaced-Volume Model, Tensioned Tube-Path Model | three live cards, click to fill the stage; Sirio opens the solver |
| S23 | Operator Interface, Live | live card, click to fill |
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
- **S05, S11, S25.** Wash brightens and drifts; numeral in Geist; the mini map segment fills. S25 zooms out from the module to the whole machine.
- **S06.** Three icons draw themselves; ticks and crosses draw; the empty row's dotted outline pulses once.
- **S07.** The statement alone; six key phrases light in orange; the statement shrinks up and five gate cards stand up with a small overshoot; tiles stack pump first; match cut to the machine; callouts land, the enclosure one on empty air.
- **S08.** A line-drawn house flickers villa to townhouse; a window appears where a balcony was; a wall moves back; a blueprint grid draws over it floor by floor with a check per floor.
- **S09.** Three figures in a row; the discussed one grows; the loop draws clockwise; the physical stages get an orange outline; 40 dots fall and 12 land; the QR draws in a spiral.
- **S12.** Thirty chips scatter in and settle; they thin by opacity to seven, five, two; the two become photos with scores counting; the orange wetted line draws around the plunger, the diaphragm, then the tube alone while the others grey out.
- **S13.** The stat ladder fades in; three cards rise with 120 ms stagger; the clicked card grows to fill the stage in 480 ms and the other two slide off; Escape reverses it.
- **S14.** The taped photo grows from the centre to the left 60 %; a hand-drawn circle around the tape; the flow trace draws itself jaggedly then freezes; the balance photo grows in with one steady number.
- **S15.** Three panels in a column, the active one taking the left half: the mount offset tweens up tenfold and the gap opens 1.82 to 2.22; the peg tapers and the roller tilts, then snaps straight; the rings take focus, an outer circle shrinks and an inner bore thickens inward, "±0.10" counts down; the v2.3 render with "1.52" at three points, apex first.
- **S16.** Axes draw; pipette line dashed; points drop with stagger; the clip starts; "4.53" counts; it splits into "3.94" and "4.10".
- **S17.** Sheets fan in at small angles; they straighten and the chosen one lifts; three rejected options are struck through; the rack render slides in, eight tubes drop in with stagger, a 22 mm dimension draws with a ghost cap-opener jaw in the gap, a tape draws to 154 mm.
- **S18.** Three columns; the active one widens; the clip plays while wide; a 154 mm bar draws, a 140 mm bar stops short and the shortfall flashes violet.
- **S19.** A rack glyph travels the U on a motion path: waits, is pushed sideways, ticks eight times, drops into the tray; crossfade to the isometric.
- **S20.** As-built photo left; the seat render slides in and a hub glyph clicks into it; the eccentric spins once, the carrier lifts, two bands draw, it settles.
- **S21.** Clip plays throughout; gauges light in pairs; a stream pours from the fine tips; a drop grows, necks and detaches from the wide tips, timed to the clip; a plastic tip repeats it faster; "nine of ten" counts.
- **S22.** Two screens at 2×; a red outline draws around the tiny button and a 44 by 44 square grows over it; the right screen's bottles fill; three candidate cards flip in below; "6.2:1" in red counts to "7.1:1" green; "tube" splits into "line" and "tube".
- **S23.** Six frames appear with a shutter; the grid shrinks to a filmstrip and the live card grows into the space; click fills the stage.
- **S24.** Three photos slide in from the right in sequence; two thin lines draw from the needle holder, one into the vial, one to a filter glyph; on step 4 a faint wireframe mesh overlays the parts.
- **S26.** Two cards rise side by side; under each, a one-line finding types in; the clicked card fills the stage.
- **S27.** Six pulse trains (moving dashes) merge into one; enables switch off one at a time and each driver's pulse stops; the breadboard photo slides in; a capacitor glyph docks onto a motor can.
- **S28.** The eight renders enter as a 4 by 2 grid; on each step the discussed pair grows to the left half while the grid compresses to the right; on step 4 the grid gives way to the two mounted photos and a red circle draws around the flange.
- **S29.** The mounted nozzle photo grows; the lines-over-rack photo slides in from the top edge; the CAD holder rotates 45° into place (a tween of rotate); the two bench photos land beside it.
- **S30.** The CAD cradle, then the empty and loaded photos as a pair; the pair shrinks into the corner and the top view fills the stage; dimensions draw along its edges and the mass counts; inside views slide in; the outdoor run clip fades over in 1200 ms and plays.
- **S31.** The band draws; the first bar lands outside it and the band edge flashes; two bars land inside; two CV dots by a dashed line; two drift arrows tilt; the clip plays throughout.
- **S32.** Slow 2400 ms crossfade start to done with a 0 to 40 counter while the sped-up run plays beside it; a 5 mm circle draws over a tube mouth; three dots by the racks; the tube photos slide up.
- **S33.** Angle arcs draw on the lid photo; a ghost rack offsets and a drop lands beside the tube; a battery glyph drains and two rotor glyphs stop mid-turn; a septum glyph is punctured five, then twenty times and beads.
- **S34.** Verdict chips fill colour per group; excluded chips connect by a drawn dotted line to "enclosure" and "board".
- **S35.** The four clips start together in a mosaic, the portrait one full height on the left; a clicked clip grows to fill the stage in 480 ms and the others slide off; the mini map's demo marker lights.
- **S36.** The demo slide holds still; a key press plays the fallback clips side by side.
- **S37.** Machine at 30 %; four lines light, each dimming the last; two test cards stand up.
- **S38.** The 2 by 2 strategy table lights cell by cell; the pump column fills with photos and build thumbnails; the alignment column shows fifty faint chips and one photo; the rotor drawing and the v2.3 photo appear with a dashed "never validated" line; the quote types in last.
- **S39.** The working loop with physical stages outlined; a small timeline shows the market search landing late; the quote fades up.
- **S40.** The chain draws left to right; each node lights as named.
- **S41.** Two outlines fade in; a tube with a QR slides between them; two use-case labels pull the specification line apart.
- **S42.** Dip to dark; the airport photo returns under the beats, then crossfades over 6 s to the machine outdoors; the droplet falls once more; dip to dark.
- **S43.** QR spiral; tools grid; the rotor mark turns once and stops.
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
| C stacked cards | S08 house, S18 to S20 alignment, S21 to S22 nozzle, S23 to S24 interface, S24 storage, S29 carriers, S30 nozzle and display, S33 failures, S37 to S41 discussion |

Shared across all: the corner nav fades out after 3 s of no mouse movement while presenting; figures drawn for print sit on a warm paper frame (`#f6f3f0`), photos and clips sit on dark; the mini map bottom right; one GSAP timeline per slide with labels per step.
