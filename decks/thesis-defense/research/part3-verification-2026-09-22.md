# Part III verification pack — thesis vs deck

**Compiled 2026-09-22. Read-only; no deck file was edited.**

Deck source audited: `decks/thesis-defense/parts/40-part3.html` (S25–S30b, S31–S36, 2051 lines incl. its `<style>`/`<script>`) and `decks/thesis-defense/parts/50-discussion.html` (S37a–S43, 1254 lines). On-screen text, numbers, chips, callouts, SVG `<text>`, strings typed in by the builder scripts, `aside.notes` speaker bullets and image `alt` text were all checked.

Sources read **in full**: `Chapters/10_System-Architecture-and-Electronics.tex`, `11_Integration.tex`, `12_System-Level-Validation.tex`, `13_Discussion-and-Reflection.tex`, `14_Conclusion.tex`, `Backmatter/App-N-Architecture-Tools.tex`, `App-Q-Self-Evaluation.tex`. Read in part, because a deck claim depends on them: `Chapters/06_Pump-Module.tex` §`sec:pump-integrated` and `tab:pump-two-heads`, `04_Engineering-with-AI.tex` §`sec:ai-limits`, `07_Alignment-Module.tex` (drive terminology), `Frontmatter/Preface.tex` (the names on S43). Two photographs were opened and read pixel by pixel because a deck `alt` makes a claim about what a screen says: `assets/media/device/validation-done.jpg` and `validation-battery.jpg`.

Everything below is copied, not paraphrased. Where the thesis is silent it says **not in the thesis**.

> **Note on S31, S32 and S33.** Another agent is rewriting these three slides while this pack is being compiled. Every S31/S32/S33 string below is quoted **as it stands in `40-part3.html` on 2026-09-22**, and may already have moved. The findings are still wanted: the rewrite may not cover them.

---

## 0. Score

| Verdict | Count |
|---|---|
| **SUPPORTED** | 96 |
| **MISSTATED** | 10 |
| **UNSUPPORTED** | 0 |
| **NOT FOUND** | 1 |
| Attribution gaps (true, but unattributed — see §H) | 2 |
| Supported-but-unlabelled (true, but the slide does not say what the number is) | 3 |

Part II carried 19 contradictions. Part III carries 11 breaks of the rule plus 2 attribution gaps. The character of the damage is different: Part III invents almost no numbers (the one number on screen that is not in the thesis is a photographed screen reading, not a computed one). Its failures are **naming** — a shaker that is a vibration motor, a vial that is a module, a "reference protocol" that is a benchmark load — plus two places where a thesis qualifier was dropped on the way to the slide (`Versatility met*`, `cleanability → enclosure`).

---

## A. S25 — the Part III divider

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| A-1 | `alt` "input queue at the left, dispensing lane in the middle, output queue at the right" | Ch. 11 §`sec:integrated-prototype`: "The input queue extends to the left of the linear dispensing lane, while the output queue is positioned to the right." | **SUPPORTED** |
| A-2 | `alt` "two pump and storage carriers along the rear wall and the battery at the front left" | Same §: "Along the rear chassis wall, the two pump--storage carriers support the fluid supply… and the battery pack at the front left." | **SUPPORTED** |
| A-3 | Journey stop "System Architecture & Electronics" | `\chapter{System Architecture and Electronics}` | **SUPPORTED** |
| A-4 | Journey stops "Integration" · "Validation" | `\chapter{Integration and the Integrated Prototype}` · `\chapter{System-Level Validation}` | **SUPPORTED** |
| A-5 | Notes "how it was wired, how the parts were bound together, what it delivered" | Structural; no numeric claim. | **SUPPORTED** |

---

## B. S26 — the two tools

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| B-1 | Title "**Twenty-five** ways to wire six pumps" | Ch. 10 §`sec:architecture-explorer`: "an interactive modeling tool that maps `\num{25}` electronic architectures across a structured decision matrix." | **SUPPORTED** |
| B-2 | Title "screened with two tools instead of a datasheet pile" | §`sec:architecture-options`: "Evaluating these candidates through datasheet review alone would have been slow… I therefore built two interactive tools, each of which settles a different half of the question." | **SUPPORTED** |
| B-3 | `#s26-q` "One small computer, a touchscreen, six pumps, two axes and **a shaker**." | See B-3 in full below. | **MISSTATED** |
| B-4 | Card A line "Twenty-five candidates, on real prices and real pins." | §`sec:architecture-explorer`: "Every option was costed line-by-line against real distributor catalog pricing and audited directly against the physical GPIO pin allocations of the microcontrollers." | **SUPPORTED** |
| B-5 | Typed finding A "Which driver, not which processor." | Finding 1: "driver intelligence---rather than raw clock speed---determines whether concurrent multi-channel pumping is computationally viable." | **SUPPORTED** |
| B-6 | Card B line "A rack of eight indexing under six nozzles." | §`sec:throughput-simulator`: "six fixed nozzles above a rack of eight tubes that steps beneath them". | **SUPPORTED** |
| B-7 | Typed finding B "The second pump buys **86 %** of the saving; four more buy almost nothing." | §`sec:throughput-simulator`: "Under the reference protocol the second pump accounts for roughly `\SI{86}{\percent}` of the total attainable saving." App-N §`sec:app-simulator` confirms at the 32-sample batch: 399 s serial, 245 s at two pumps, 221 s at six. | **SUPPORTED** |
| B-8 | Notes "twenty-five candidates in **four families**" | §`sec:architecture-explorer`: "They fall into four families, separated by where the operator's screen sits and where the work of driving the pumps is done". | **SUPPORTED** |
| B-9 | Notes "a datasheet review would have ended in whichever option I examined last" | §`sec:architecture-options`, verbatim: "would have ended in whichever option I happened to examine last." | **SUPPORTED** |

### B-3 — "a shaker" · **MISSTATED**

**Deck, `#s26-q`, on screen:** "One small computer, a touchscreen, six pumps, two axes and **a shaker**."

**Thesis.** The instrument has no shaker. The ninth actuator is the **nozzle vibration motor**: Ch. 10 §`sec:architecture-options` lists the actuators as "the six pump channels, the two alignment axes, and the **nozzle vibration motor**"; `tab:app-bom` names the part "RD520PA micro DC motor — Nozzle vibration".

**Why this one matters more than a synonym.** "Shaker" is a taken word in this thesis, and it is taken by the *other* side of the argument. Every occurrence of it names a **benchtop laboratory instrument the machine exists to spare the operator**:
- Ch. 1, `fig` caption: "(C)~a plate shaker and (D)~manual pipettes";
- App-A §Protocol survey: "Beyond pipettes and tubes, the protocol requires a magnetic rack, **a shaker**, and a fume hood".

A committee member who has read Chapter 1 hears "and a shaker" as *the machine contains a plate shaker*, which is exactly the kind of bundled lab equipment §1.1 says the instrument does without.

**Proposed wording:** "One small computer, a touchscreen, six pumps, two axes and a vibration motor." (Thesis word, and it keeps the rhythm.)

---

## C. S27 — control and power

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| C-1 | Title "One clock drives six pumps, because a dose is a number of steps." | §`sec:shared-clock`: "If every pump runs at the same rate, a single pulse train can drive all six… delivered volume is unaffected, because **a dose is a count of steps and not an elapsed time**." | **SUPPORTED** |
| C-2 | Control `alt` "one processor carrying the touchscreen and card reader, six numbered motor drivers on a shared step and direction clock with one enable line each, and a two-wire module bus carrying the level-sensor controller and the port expander" | `fig:architecture-selected` caption, verbatim: "One processor carries the screen and its card reader on a nine-line display bus, the six numbered pump drivers on a shared step and direction clock with one enable line each… The two-wire module bus (I²C) carries the level-sensing controller and the port expander". (The `alt` omits the nozzle vibration switch "on a pin of its own" — an omission, not an error.) | **SUPPORTED** |
| C-3 | Power `alt` (as built) "a twelve-volt tool battery or bench supply through the switch to the twelve-volt rail, which feeds the six pump drivers, the two alignment motors and the processor board, and through a converter the five-volt rail for the vibration motor" | §`sec:power-tree`: "A `\SI{12}{\volt}` rail powers the six peristaltic pump drivers, the two alignment axis drivers, and the VIN pin of the microcontroller board… An intermediate buck converter steps the `\SI{12}{\volt}` rail down to `\SI{5}{\volt}`, dedicated exclusively to the nozzle vibration motor". Verified against the deck's own rasterisation `assets/figs/fig-power-tree-as-built.png`. | **SUPPORTED** |
| C-4 | Power `alt` (production) "a twenty-four-volt battery pack, a twenty-four-volt motor rail feeding the six pump drivers, and a step-down stage ahead of the twelve-volt rail" | The deck figure is the thesis's own `Pictures/fig-power-tree.pdf`, split in two. Its dashed production boxes read, in the figure itself, **"Battery pack 24 V" → "24 V rail" → "Six pump drivers"**, with "buck" down to the 12 V rail. The `alt` describes the figure correctly. | **SUPPORTED** |
| C-5 | Notes "**Production: a 24 V pack** and a 24 V motor rail with a step-down ahead of the board." | See C-5 below. | **MISSTATED** |
| C-6 | Notes "The fitted **16 V bulk capacitors** have to be replaced before that rail can go in." | §`sec:power-tree`: "because the components fitted on the bench are rated for `\SI{16}{\volt}`, they physically preclude `\SI{24}{\volt}` operation until replaced by `\SI{35}{\volt}` alternatives." | **SUPPORTED** |
| C-7 | Notes "one processor, one shared step-and-direction clock for all six pump heads, one enable line each" | §`sec:shared-clock`: "The step and direction signals are wired to all six drivers in parallel. Each driver retains a dedicated *enable* line". | **SUPPORTED** |
| C-8 | Notes "The slower parts hang off a two-wire bus." | §`sec:selected-board`: "Slower tasks, such as moving the alignment axes and checking homing switches, are offloaded to an I²C port expander (MCP23017)." | **SUPPORTED** |

### C-5 — "a 24 V pack" · **MISSTATED**

**Deck, S27 `aside.notes`, third bullet:** "Production: **a 24 V pack** and a 24 V motor rail with a step-down ahead of the board."

**Thesis, Ch. 10 §`sec:power-tree` ("Untethered battery operation"), verbatim:**

> "The target specification is a `\SI{140}{\watt}` power bank of approximately `\SI{86}{\watt\hour}` (costing roughly €90), delivering **`\SI{28}{\volt}` under the USB PD 3.1 Extended Power Range profile** via a trigger board, with a buck converter supplying the `\SI{12}{\volt}` alignment branch."

and, on why not a raw pack:

> "A raw lithium battery pack exhibits substantial voltage sag during discharge: a six-cell pack that begins with a safety factor above three drops to approximately `\num{2.2}` as it nears depletion… In contrast, a USB-C Power Delivery (PD) power bank incorporates internal regulation, maintaining its negotiated voltage until depleted".

**The break.** The figure abstracts the source as a "24 V battery pack" at rail level, which is fine *as a rail diagram*. The spoken note turns that abstraction into a **procurement claim**, and the claim it makes is the one the thesis argues against: an unregulated pack is exactly what §`sec:power-tree` rejects, and the specified part is 28 V, not 24 V. If anyone asks "what battery?" the answer on the slide is wrong.

**Proposed wording:** "Production: a **regulated USB-C power bank** feeding a 24 V motor rail, with a step-down ahead of the board — a raw pack sags under motor load, which is what stalled the prototype."

---

## D. S28 to S30b — what the integration produced

### D.1 S28 — the pump–storage carrier

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| D-1 | Title "Each pump and its vial share one printed carrier, and the carriers hold each other." | §`sec:pump-storage-carrier`: "both are housed together in a single 3D-printed carrier"; "interlock with each other via lateral dovetails, providing mutual structural bracing." | **SUPPORTED** |
| D-2 | Callouts "pump, from above" · "vial, from the front" | "the pump drops in vertically from above, while the storage assembly slides in horizontally from the front". | **SUPPORTED** |
| D-3 | Callout "the shortest suction line" | "this pairing keeps the inlet suction line as short as possible". | **SUPPORTED** |
| D-4 | `alt` "three upright tabs, each with one clearance hole for a horizontal screw into the chassis rear wall" | `fig:carrier-central` caption, verbatim: "Three upright tabs, each with one clearance hole, take horizontal screws into the rear wall of the chassis." | **SUPPORTED** |
| D-5 | `alt` + callout "in place of the third, a tall flange carrying three screw holes in a column for the exterior side wall" / "flange into the side wall" | "in place of the third a tall flange with three screw holes in a column; this flange sits flush against the exterior side wall of the chassis and is fastened into it". | **SUPPORTED** |
| D-6 | Callout "every screw horizontal" | "Every fastener in both is horizontal." | **SUPPORTED** |
| D-7 | Callout "**2 of 6 channels**" | "Two complete channels were fabricated and installed on the prototype, populating one central and one left carrier." | **SUPPORTED** |
| D-8 | `alt` "with the green air-line filters between them" | `fig:carriers-mounted` caption: "The green discs are the air-line filters." | **SUPPORTED** |
| D-9 | Notes "Two variants, identical inside" | "Both share identical internal mounting geometry for the pump and storage modules, differing only in how they anchor to the main instrument chassis." | **SUPPORTED** |
| D-10 | Notes "Dovetails plus horizontal screws, because an operator does not know which part is load-bearing." | "An instrument intended to be carried has to survive being picked up and set down by an operator who does not know which part is load-bearing, and the dovetails alone were not trusted with that." | **SUPPORTED** |
| D-11 | Notes "Two of six channels built; **the rest is capacity, not hardware**." | "The six-channel capacity the instrument is designed around is not fully realized in hardware; it is supported architecturally by the microcontroller pin allocation, the shared step clock… rather than six physical pumps and vials." | **SUPPORTED** |
| D-12 | Notes "**the vial** slides in from the front" | See D-12 below. | **MISSTATED** |

#### D-12 — "the vial slides in from the front" · **MISSTATED**

**Deck, S28 `aside.notes`, first bullet:** "One carrier per channel: the pump drops in from above, **the vial** slides in from the front, and the suction line stays as short as it can be."

**Thesis, Ch. 11 §`sec:pump-storage-carrier`:** "the pump drops in vertically from above, while **the storage assembly** slides in horizontally from the front."

The vial is the glass container inside the module — Ch. 11 §`sec:storage-module`: "Each reagent is contained within **a standard glass vial sealed with a septum cap**… Three 3D-printed parts house the vial: a cartridge… a sleeve… a needle holder." A vial cannot slide into the carrier; the cartridge–sleeve–needle-holder assembly does, with the vial inside it. The slide's own `alt` gets this right ("the reagent storage module slid in from the front") — only the spoken line is wrong.

**Proposed wording:** "the pump drops in from above, **the storage module** slides in from the front".

### D.2 S29 — nozzle and screen

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| D-13 | Title "The nozzle bolts to the chassis; the screen tilts to 45 degrees so you look down at it." | §`sec:nozzle-in-place` + §`sec:screen-holder`: "The holder tilts the display upward at `\ang{45}`… at `\ang{45}` the screen faces someone standing over it." | **SUPPORTED** |
| D-14 | Callout "no new part" | Ch. 11 opening: "A fourth joint required no new component, the nozzle array bolting to a reinforced boss printed into the chassis itself." | **SUPPORTED** |
| D-15 | Callout "3 screws" + notes "two screws down and a third horizontally into the bay wall" | §`sec:nozzle-in-place`: "Two screws secure the holder to the chassis, and a third screw, driven horizontally on the left side into the wall of the electronics bay, makes the mount sturdy." | **SUPPORTED** |
| D-16 | Callout "**2 of 6 positions**" and `alt` "two of six needle positions fitted with Luer hubs" | `fig:nozzle-in-place` caption: "with two of its three screws visible and the two fitted channels arriving at their Luer hubs"; §11.2 names "the six needle positions in the nozzle holder". | **SUPPORTED** |
| D-17 | Notes "**450 mm** of tubing leaves each pump head and crosses the toothed drive rack to its needle hub, unguided, hand-disconnectable" | §`sec:nozzle-in-place`: "A `\SI{450}{\milli\meter}` length of PVC tubing… leaves each pump head, bridges over the toothed drive rack… the tubing is unguided: the lines hang freely across the span… while preserving the ability to disconnect and replace lines by hand." | **SUPPORTED** |
| D-18 | `alt` "3.2 inch touchscreen" | §`sec:screen-holder`: "runs on a `\num{3.2}`-inch resistive touchscreen". | **SUPPORTED** |
| D-19 | Callout "about ten prints" + notes "About ten prints in all." | "Developing the holder took about ten prints, counting reprints of single halves and small test pieces for the stylus clips". | **SUPPORTED** |
| D-20 | Callout "split on a dovetail" + notes "adding the stylus clips cost one half-print" | "the holder was fabricated in two pieces united by an integrated sliding dovetail joint… when stylus retention clips were introduced, only the upper half required reprinting". | **SUPPORTED** |
| D-21 | `alt` "the two screw holes that were used" | `fig:display-holder-cad` caption: "the two screw holes that fix the holder into the bay wall, and the third screw position on the left, which was never used." | **SUPPORTED** |
| D-22 | Callout "stylus, tethered" + `alt` "tethered by a coiled wire" | `fig:display-holder` caption: "the stylus seated in its two clips and tethered to the holder by a coiled wire." | **SUPPORTED** |
| D-23 | `alt` "the recessed pockets for the components behind the board, the holes for the pin headers and the cutout for the card reader" | `fig:display-holder-cad` caption a): "the pockets for the components on the back of the board, the holes the pin headers pass through, and the cutout for the SD card reader." | **SUPPORTED** |
| D-24 | Notes "on a table or the bed of a truck" | §`sec:screen-holder`, verbatim: "whether on a table or, in the field, on the bed of a truck". | **SUPPORTED** |

### D.3 S30 — the battery cradle

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| D-25 | Title "A **published** battery holder and **three screws** put the power on board." | §`sec:battery-cradle`: "the part was adapted from a published holder for DeWalt `\SI{12}{\volt}` batteries"; "Three horizontal M3 screws anchor the modified cradle to the front exterior wall of the chassis." | **SUPPORTED** |
| D-26 | Callout "re-cut for M3" + `alt` "the original mounting holes filled in CAD and re-cut for M3" | "its mounting holes were filled with solid volumes in CAD and re-cut for the M3 screws used on this prototype". | **SUPPORTED** |
| D-27 | Callout "3 horizontal screws" | As D-25. | **SUPPORTED** |
| D-28 | Callout "the bench supply's own socket" + notes "The pack replaces the bench supply on the same connector, with no internal rewiring." | "Because this lead plugs into the same connector fed by the benchtop mains supply, the battery replaces the external source on the primary `\SI{12}{\volt}` rail without modifying any internal instrument wiring." | **SUPPORTED** |
| D-29 | `alt` "the **12 volt** pack" | The pack is a "DeWalt DCB127 lithium-ion power-tool pack (`\SI{10.8}{\volt}` nominal, **sold as a `\SI{12}{\volt}` pack**)" (§`sec:battery-cradle`); Ch. 12 §`sec:validation-unattended` itself says "the `\SI{12}{\volt}` tool battery". | **SUPPORTED** |
| D-30 | Notes "a published **DeWalt** holder" | "adapted from a published holder for DeWalt `\SI{12}{\volt}` batteries `\parencite{kurkov-dewalt-holder-2025}`". | **SUPPORTED** |
| D-31 | Notes "The outdoor run is a **scenario, not a claim** — there is no enclosure yet." | Ch. 11 §`sec:integrated-prototype`: "while `\cref{fig:prototype-whole}`b illustrates the untethered prototype **staged in a potential field environment**, the exposed kinematics, breadboard wiring, and open dispensing zone currently **restrict reliable protocol execution to controlled indoor settings**." | **SUPPORTED** |

### D.4 S30b — the finished machine

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| D-32 | Title "**Four joints** turn the modules into one object of **3.3 kilograms**." | Ch. 11 opening: "**Three** custom 3D-printed assemblies bind the subsystems to the main alignment chassis: a dual-bay carrier…, an angled holder…, and a slide-in cradle…. **A fourth joint** required no new component". §`sec:integrated-prototype`: "Loaded with its sample racks and the battery, it weighs `\SI{3.3}{\kilo\gram}`." | **SUPPORTED** |
| D-33 | Counter animating 0.0 → **3.3 kg** | As above. One number, one value, no invented replicates. | **SUPPORTED** |
| D-34 | Callouts "**50 cm**" · "**35 cm**" · "**18 cm high**" | "The assembled instrument measures `\SI{50}{\centi\meter}` in width, `\SI{35}{\centi\meter}` in depth, and `\SI{18}{\centi\meter}` in height." | **SUPPORTED** |
| D-35 | "Loaded, with the racks and the battery aboard." | "Loaded with its sample racks and the battery". | **SUPPORTED** |
| D-36 | "Two recessed handles in the end walls, for two hands." | "Two handles recessed into the outer end walls of the chassis let it be lifted and carried with both hands." | **SUPPORTED** |
| D-37 | Chip "2 of 6 channels" | "The physical prototype incorporates two of the six reagent channels supported by the system architecture". | **SUPPORTED** |
| D-38 | Chip "breadboards, not a PCB" | "control circuitry remains mounted on solderless breadboards rather than a custom printed circuit board". | **SUPPORTED** |
| D-39 | Chip "no enclosure" | "a protective outer enclosure was deferred during functional decomposition". | **SUPPORTED** |
| D-40 | Notes "The battery accounts for **5.5 cm** of the depth; the storage modules set the height." | "The battery contributes `\SI{5.5}{\centi\meter}` to the total depth, and the height is set by the storage modules." | **SUPPORTED** |
| D-41 | Notes "no charge sensing" | "battery state-of-charge monitoring is not yet electrically implemented". | **SUPPORTED** |
| D-42 | Notes "the carrier, the nozzle mount, the screen holder, the battery cradle" as the four things integration produced | Ch. 11's own four sections: `sec:pump-storage-carrier`, `sec:nozzle-in-place`, `sec:screen-holder`, `sec:battery-cradle`. | **SUPPORTED** |

---

## E. S31 — the accuracy chart

**Every number on this chart is in Ch. 12 §`sec:validation-accuracy`.** This is the slide where Part II went wrong (three identical bars sold as three weighings); S31 does not repeat that mistake — it draws **one bar per channel**, no replicate bars, no error whiskers claiming a spread the thesis does not publish.

The governing paragraph, verbatim (Ch. 12 §`sec:validation-accuracy`):

> "System-level accuracy and reproducibility were verified by gravimetrically measuring delivery through the complete assembled fluid path. Two pump heads, fed from the storage module, dispensed a commanded `\SI{1000}{\micro\liter}` into tared microcentrifuge tubes on the rack, which were immediately capped and weighed. Using the nominal per-stroke constant from the isolated pump bench, **initial deliveries fell roughly `\SI{18}{\percent}` short**. Recalibrating the per-stroke constant on the assembled instrument brought delivery well inside the target `$\pm\SI{10}{\percent}$` envelope, outperforming the requirement with errors of only **`\SI{-3.4}{\percent}` on Channel~1 and `\SI{+0.6}{\percent}` on Channel~2**. Dispensing reproducibility was similarly tight, achieving **coefficients of variation between `\SI{0.2}{\percent}` and `\SI{1.0}{\percent}`**, comparable to the **`\SI{0.27}{\percent}` baseline recorded for manual micropipetting on the same analytical balance**."

and, on the drift:

> "Across separate sessions with re-primed lines and a different power supply, the per-step delivery constants shifted by **`\SI{+1.3}{\percent}` and `\SI{-5.0}{\percent}`**… this drift confirms that calibration depends on specific tubing tension and priming state rather than an immutable pump constant. Consequently, **field instruments require automated on-device recalibration** rather than relying on a single factory setting."

| # | Deck string | Verdict |
|---|---|---|
| E-1 | Title "Calibrated on itself, the machine lands within **3.4 %** of the target." | **SUPPORTED** (−3.4 % is the worse of the two channels) |
| E-2 | `#s31-bandt` "**±10 % allowed**" | **SUPPORTED** — "the target `$\pm\SI{10}{\percent}$` envelope"; `tab:validation-verdict` Accuracy: "Within `$\pm 10\,\%$` once each channel carries its measured per-stroke constant." |
| E-3 | `#s31-v1` "**−18 %**", row label "bench constant" | **SUPPORTED, unlabelled** — see E-3 note |
| E-4 | `#s31-v2` "**−3.4 %**", row label "channel 1" | **SUPPORTED** |
| E-5 | `#s31-v3` "**+0.6 %**", row label "channel 2" | **SUPPORTED** |
| E-6 | "dose to dose" dots "**0.2 %**" and "**1.0 %**" | **SUPPORTED** |
| E-7 | "**0.27 % by hand**" | **SUPPORTED** — Ch. 12; the primary record is Ch. 6 §`sec:pump-results`: "`$50\,\mu\text{L}$` replicates on the same balance yielded a CV of `$0.27\,\%$`" |
| E-8 | "between sessions" **+1.3 %** / **−5.0 %** | **SUPPORTED** |
| E-9 | Notes "One thousand microlitres, commanded through the whole assembled path, weighed on an analytical balance." | **SUPPORTED** |
| E-10 | Notes "The constant moved between sessions, so a field instrument has to recalibrate itself." | **SUPPORTED** — "field instruments require automated on-device recalibration" |

### E-3 note — "−18 %" is a rounded summary, and the slide should say so

Ch. 12 says "**roughly** `\SI{18}{\percent}` short". The per-channel figures live in Ch. 6 `tab:pump-two-heads`: **Channel 1 −19.5 %, Channel 2 −17.8 %** on the bench constant of 4.53 µL/stroke. The deck draws one bar for both, which is what Ch. 12 does in prose. That is fair — but "−18 %" set in tabular mono next to two figures given to one decimal reads as a third measurement of the same precision. One word fixes it: label the row **"bench constant, ≈ −18 %"** or say "roughly eighteen per cent" in the note (the note already does: "it fell about eighteen per cent short" — **SUPPORTED**; only the on-screen glyph is bare).

### E-3b — a trap worth knowing about

**+1.3 % appears twice in the thesis with two different meanings.** In Ch. 6 `tab:pump-two-heads` it is *Channel 1's calibrated error* (alongside Channel 2's −4.5 %); in Ch. 12 it is *the session-to-session drift of a per-step constant* (alongside −5.0 %). The deck uses the Ch. 12 pair (+1.3 / −5.0) for the drift and the Ch. 12 pair (−3.4 / +0.6) for the calibrated errors, which is internally consistent and correct. **Do not let a question pull the Ch. 6 pair (+1.3 / −4.5) onto this slide** — they are a different campaign.

---

## F. S32 — the forty-tube run

**Governing paragraphs, Ch. 12, verbatim.**

§`sec:validation-versatility`:

> "…executing a dual-reagent protocol (`\SI{100}{\micro\liter}` and `\SI{75}{\micro\liter}`) across a **forty-tube, five-rack batch to completion**."
>
> "Placement accuracy was evaluated using dyed solutions for visual contrast. Across forty tubes, the droplets landed on the tube openings, **inside the `\SI{5}{\milli\meter}` target radius the nozzle is specified against**. **Apart from the tube-lid fouling described below, only three droplets partly wetted the rack deck or the lane instead of falling into a tube.** Tubes lifted from the first and last racks held visually comparable volumes."

§`sec:validation-unattended`:

> "Autonomous operation was proven by running the full forty-tube protocol **from start to finish without any user help, powered by the bench DC supply**. To make this reliable, the linear axes were slowed down; slower speeds gave the stepper motors enough strength to push the loaded five-rack magazine without stalling, adding only a small delay to the cycle time."

§`sec:validation-containment`:

> "…the only liquid to leave a tube was **roughly three droplets that landed on the rack and lane rather than in their target**."

Ch. 11 §`sec:integrated-prototype`: "The input queue, by contrast, is complete: **all five racks were printed, and a full batch of `\num{40}` sample tubes ran unattended**."

| # | Deck string | Verdict |
|---|---|---|
| F-1 | Title "Forty tubes, five racks, nobody in the room." | **SUPPORTED** (pre-established finding 3) |
| F-2 | Counter animating 0 → **40 tubes** | **SUPPORTED** |
| F-3 | `#s32-sub` "**100 µL and 75 µL** in every tube" | **SUPPORTED** |
| F-4 | Callout "**5 mm**" | **SUPPORTED, unlabelled** — pre-established finding 2; see F-4 note |
| F-5 | `#s32-miss` "**3 of 40 landed on the deck**" | **MISSTATED** — pre-established finding 1; see F-5 |
| F-6 | Notes "three of forty wetted the deck or the lane instead" | **MISSTATED** — the same error, in the spoken line; see F-5 |
| F-7 | Caption "First rack and last rack, alike by eye" | **SUPPORTED** — "held visually comparable volumes" |
| F-8 | Notes "A dual-reagent protocol, 100 and 75 microlitres, across forty tubes in five racks, start to finish without any user help." | **SUPPORTED** |
| F-9 | Notes "What made it possible was slowing the linear axes so the steppers could push a loaded five-rack magazine without stalling." | **SUPPORTED** |
| F-10 | Notes "On the bench supply, not on battery." | **SUPPORTED** — "powered by the bench DC supply" |
| F-11 | `alt` "forty empty capped tubes standing in five racks in the input queue, the output queue empty" | **SUPPORTED** — `fig:validation-40`a "The racks loaded with empty tubes at the start" |
| F-12 | `alt` "the screen reading **done at eleven minutes six seconds**" | **NOT FOUND** — see F-12 |

### F-4 note — "5 mm" is true but the slide never says what it is

The chip reads only "5 mm", floating beside a circled tube. The thesis's phrase is "**inside the `\SI{5}{\milli\meter}` target radius the nozzle is specified against**" — it is a *specification the nozzle module was designed to*, carried over from Ch. 8, not something measured in this run. As it stands the audience can read it as "the droplets landed within 5 mm of each other", which is a precision claim nobody made.

**Proposed chip:** `5 mm target radius` — three extra characters, and the claim becomes the thesis's.

### F-5 — "3 of 40 landed on the deck" · **MISSTATED** (confirmed, not re-litigated)

Confirmed against both of the thesis's statements, quoted above. Three points, all of which the current wording gets wrong:

1. **Three droplets, not three tubes.** "only three **droplets** partly wetted the rack deck or the lane"; "roughly three **droplets** that landed on the rack and lane". "3 of 40" makes the denominator the forty tubes and turns it into a 7.5 % failure rate of the run. Nothing in the thesis supports a per-tube failure rate; the count of droplets dispensed in a dual-reagent forty-tube run is eighty, not forty.
2. **"the deck" drops the lane.** The thesis says "the rack deck **or the lane**" / "the rack **and lane**" both times.
3. **It silently absorbs the tube-lid fouling.** Ch. 12 begins the sentence "**Apart from the tube-lid fouling described below**, only three droplets…" — the three are explicitly the residue *after* the cap problem is set aside. S33 then presents the cap as its own failure. As written, S32 double-counts.

Also note the thesis hedges the second statement ("**roughly** three droplets") while the first does not. Quote the first.

**Proposed chip:** `3 droplets wetted the rack or the lane` (and, if the space allows, `— apart from the cap fouling`).
**Proposed note:** "Every droplet landed inside the 5 mm target radius the nozzle is specified against. Apart from the cap fouling I will come to, three droplets wetted the rack deck or the lane instead of falling into a tube."

### F-12 — "eleven minutes six seconds" · **NOT FOUND**

**Deck, `#s32-done` `alt`:** "After the run: five racks of eight tubes in the output queue, every tube carrying red dye, **the screen reading done at eleven minutes six seconds**."

**Thesis: no run duration is published anywhere.** Ch. 12 gives no cycle time; App-N's throughput table gives *simulated* times (the reference protocol at 32 samples: 399 s / 245 s / 221 s), which are model output for a different protocol and must never be read as a measurement of this run.

**What the photographs actually show.** Both were opened and read:
- `validation-done.jpg` — screen: `PUMPS OFF` / **`11 min 06 s`** / `4.00 mL` / `3.00 mL` / `DONE`. Five racks × 8 tubes, all red. ✔ matches the rest of the `alt`.
- `validation-battery.jpg` — screen: `RUN STOPPED` / `PUMPS OFF` / `40 tubes` / **`11 min 06 s`** / `4.00 mL` / `3.00 mL` / `DONE`. Two racks × 8 tubes.

**The same `11 min 06 s` is on the screen in both photographs**, one of which is the *aborted battery run that stopped at sixteen tubes*. So the reading cannot be attributed to the forty-tube run on the strength of the photograph: it is either a stale summary carried on the display, or the two captures share a session. Either way the deck cannot claim it, and the thesis does not.

This is `alt` text, so it is never spoken and never projected — the risk is that it migrates into a chip or an answer. **Proposed `alt`:** "After the run: five racks of eight tubes in the output queue, every tube carrying red dye, the screen reporting the batch done." Drop the time, and do not quote a run duration if asked — say the thesis does not report one.

---

## G. S33 — the three failures

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| G-1 | Title "The failures were a tube cap, a tired battery and a leaking septum." | The three are Ch. 12 §`sec:validation-versatility` (caps), §`sec:validation-unattended` (battery), §`sec:validation-containment` (septa). | **SUPPORTED** |
| G-2 | Callout "**135°**" | "If tube caps are left flat rather than folded back to `\ang{135}`…"; "Reliable execution currently requires folding all caps to `\ang{135}`". | **SUPPORTED** |
| G-3 | Callout "flat: it rubs the wall" | "they project laterally and rub the alignment lane wall." | **SUPPORTED** |
| G-4 | Card foot "An open-loop axis loses steps against friction, and the dose lands beside the tube." | "Because this axis runs open-loop, friction causes lost steps; the firmware registers the carriage as arrived while the rack lags behind, causing doses to land off-center." | **SUPPORTED** |
| G-5 | Notes "the firmware thinks the rack arrived while it lagged behind" | Same sentence. | **SUPPORTED** |
| G-6 | Callout "**16 samples**" | "The battery powered the machine through two full racks (`\num{16}` samples)." | **SUPPORTED** |
| G-7 | Card foot "Two racks, then the draining pack could not hold both pumps at once." | "After that, as the battery drained, running both pumps at the same time drew too much power and caused them to stall." | **SUPPORTED** |
| G-8 | Notes "The firmware cannot yet run one pump at a time." | "Because the current firmware cannot run one pump at a time, the test had to stop." | **SUPPORTED** |
| G-9 | Counter "**0 punctures**" → 5 → 20; card foot "It reseals about five times, and not reliably past twenty." | "its vial septa lose their seal after repeated puncture, leaving droplets on the needle tips --- **a spillage risk after about five punctures, and no reliable reseal past twenty**." | **SUPPORTED** |
| G-10 | Notes "that is where the spillage risk lives" | "a spillage risk after about five punctures". | **SUPPORTED** |
| G-11 | Notes "None of the three is kinematic." | "A recurring placement failure stemmed from **consumable handling rather than kinematic error**." (Cap.) The battery is electrical (§`sec:power-tree`) and the septum is a consumable (§`sec:validation-containment`). | **SUPPORTED** |
| G-12 | Notes "All three have known fixes." | Ch. 13: reshaped lane walls + stronger motors + closed-loop step-loss detection; "Adding a bus current sensor and updating firmware to run only one pump at a time"; "a different resealable septum should be used… paired with an active pinch valve on the air line". | **SUPPORTED** |
| G-13 | `alt` "the screen reading run stopped" | Verified against the photograph: the screen reads `RUN STOPPED`. | **SUPPORTED** |
| G-14 | `alt` "two racks, sixteen tubes filled with dye" | Verified against the photograph: two racks of eight, all red. | **SUPPORTED** |
| G-15 | "a leaking septum" presented as one of *the machine's* three failures | See §H-2. | **attribution gap** |

---

## H. Attribution — the reagent storage module

Ch. 11 §`sec:storage-module` opens with the strongest sentence in the thesis on this point:

> "**Reagent storage is the only module in the instrument whose physical design was not developed in this thesis. Marius designed and built it in a companion project, transferring it as functional hardware** `\parencite{schiller-sample-dispensing-2026}`."

and `fig:storage-parts` closes: "**Design by Marius `\parencite{schiller-sample-dispensing-2026}`; photographed for this thesis.**" The air-line filter is his too: "the tubing on the air needle ends in a syringe filter, so that nothing but air can be drawn into the vial `\parencite{schiller-sample-dispensing-2026}`."

**Sirio's own four modules are Pump, Alignment, Nozzle and User Interface.** Part III does **not** miscount them anywhere — no slide calls storage a fifth module of his, and no slide claims the level sensing or the cartridge. Two softer gaps remain:

**H-1 · S28 shows the storage module five times and never names Marius.** The slide's subject is the *carrier* (correctly Sirio's: "Rather than mounting the storage module and pump as separate assemblies on the chassis, both are housed together in a single 3D-printed carrier"). But five images and two `alt` texts put his hardware on the screen, the green air-line filters are called out in an `alt`, and nothing marks the boundary. If Part II's credit line is more than one slide back, a viewer will attach it to him by default.
**Proposed:** one clause in the S28 notes — "the storage module inside it is Marius's design, transferred as hardware; the carrier around it is mine."

**H-2 · S33 files the septum under "the failures" without saying whose part it is.** Ch. 12 §`sec:validation-containment` is careful to fence it off: "**A separate weakness belongs to the storage module:** its vial septa lose their seal after repeated puncture". The deck's card and note both read as a failure of Sirio's design.
**Proposed note:** "The third is not mine: the storage module's vial septum leaks after about five punctures…" — which is also the stronger line to say out loud.

---

## I. S34 — the requirement verdicts

**`tab:validation-verdict` counted by hand: 15 requirements in 5 groups.** The deck also carries 15 chips in 5 columns, and every verdict matches. The table, verbatim, against the deck:

| Group (thesis) | Requirement | Thesis verdict | Deck chip | Match |
|---|---|---|---|---|
| Performance | Accuracy | Met | `Accuracy / met` | ✔ |
| Performance | Reproducibility | Met | `Reproducibility / met` | ✔ |
| Performance | Versatility | **Met\*** | `Versatility / met` | ✘ **I-1** |
| Performance | Feasibility | n/a — "A concept-selection gate, not a test of the built device." | `Feasibility / a gate, not a test` | ✔ |
| Automation | Unattended operation | Met | `Unattended run / met` | ✔ |
| Automation | Training | Not tested | `Training / not tested` | ✔ |
| Field analysis and portability | Operating envelope | Excluded | `Operating envelope / excluded` | ✔ |
| Field analysis and portability | Portability | Partly met | `Portability / partly met` | ✔ |
| Contamination | Cross-contamination | By design | `Cross-contamination / by design` | ✔ |
| Contamination | Wind | Excluded | `Wind / excluded` | ✔ |
| Contamination | Cleanability | Excluded | `Cleanability / excluded` | ✔ (but see **I-2**) |
| Contamination | Fluid paths | Met | `Fluid paths / met` | ✔ |
| Safety | Spillage | Partly met | `Spillage / partly met` | ✔ |
| Safety | Operator exposure | Partly met | `Operator exposure / partly met` | ✔ |
| Safety | Electrical safety | Excluded | `Electrical safety / excluded` | ✔ |

Counts: **5 met · 1 by design · 3 partly met · 4 excluded · 1 not tested · 1 n/a = 15.** The deck's chip classes (`is-met` ×5, `is-design` ×1, `is-partly` ×3, `is-excluded` ×4, `is-untested` ×1, `is-na` ×1) match exactly. *(Corrected 2026-09-22: this line first read "6 met / `is-met` ×6". The file counts five `is-met` chips and the thesis table lists five "Met" plus one "By design" — which is exactly the miscount that put "Six requirements met" in the old S34 title.)* The column header "Portability" abbreviates the thesis's "Field analysis and portability" — cosmetic, fine.

### I-1 — "Versatility · met" drops the asterisk · **MISSTATED**

**Thesis, `tab:validation-verdict`:** Versatility · `\vgood{Met\textsuperscript{*}}` · "Two reagents tested (extensible to six by design), `\SIrange{5}{1000}{\micro\liter}`, full 40-tube run", with the table's own footnote:

> "\textsuperscript{*}The `\SI{5}{\micro\liter}` lower bound **is not yet validated but expected to pass**."

The deck's chip says plain `met`. Ten slides later **S37 contradicts it on screen**: `5 µL lower bound — not verified`. One of the two is wrong on the projector, and it is this one.

**Proposed chip:** `Versatility` / `met *` with a single footnote line under the Performance column — `* the 5 µL lower bound is not yet validated`. It costs one line and it inoculates the slide against the obvious question.

### I-2 — "cleanability waits on an enclosure" · **MISSTATED**

**Deck, `#s34-wire`:** the dashed line from the `Cleanability` chip is bundled with `Operating envelope` and `Wind` into the pill **`Enclosure`**. **Deck notes:** "Four requirements are excluded honestly: **they wait on an enclosure and a real circuit board**, not on the mechanisms."

**Thesis, `tab:validation-verdict`, the three bases side by side:**

| Requirement | Basis, verbatim |
|---|---|
| Operating envelope | "**No enclosure** or climate control on the prototype." |
| Wind | "**No enclosure**, and the requirement is not reproducible as written." |
| Cleanability | "**PLA fused-filament parts are not a cleanable surface.**" |

And Ch. 12 §`sec:validation-scope`: "and fused-filament **PLA parts lack cleanable, non-porous surfaces**". And Ch. 13 §13.5: "3D-printed PLA enabled rapid builds, but its **layered surface created friction and could not be sanitized, excluding cleanability from validation**"; the fix named there is material, not packaging — "its sliding surfaces should use **metal with certified clinical roughness, or high-performance engineering plastics such as polypropylene (PP)** that meet cleanability requirements."

**The break.** Cleanability is excluded because of **what the machine is printed in**, not because it lacks a shell. Putting an enclosure on it is the one change that would *not* fix it. A materials-minded examiner will catch this immediately, and the honest version is a better answer anyway — "the third one is not packaging, it is PLA; a field machine needs metal or PP sliding surfaces."

**Proposed:** a third pill, `Cleanable materials`, taking the Cleanability line; or, if three pills will not fit, route Cleanability to the `Enclosure` pill's neighbour and change the note to: "Four excluded honestly: two wait on an enclosure, one on a real circuit board, and one on a material that can be sanitised — none of them on the mechanisms."

### I-3 — the rest of S34, checked

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| I-3 | Notes "feasibility was a concept gate, not a test of the built device" | "A concept-selection gate, not a test of the built device." | **SUPPORTED** |
| I-4 | Notes "a complete forty-tube run finished without intervention" | "A complete 40-tube run finished without intervention." | **SUPPORTED** |
| I-5 | Notes "Training was deferred, so it stands as not tested." | "Deferred for time; the two-person evaluation of `\cref{chap:ui-module}` carries the argument at lower strength." | **SUPPORTED** |
| I-6 | Notes "cross-contamination is prevented by architecture, not by washing" | §`sec:validation-containment`: "Cross-contamination is prevented architecturally rather than through wash cycles." | **SUPPORTED** |
| I-7 | Pill "Circuit Board (PCB)" fed by `Electrical safety` | "Electrical safety · Excluded · **Breadboard electronics**; the low-battery run lockout is unmet by design." | **SUPPORTED** |

---

## J. S35, S36 — the clips and the demo

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| J-1 | S35 title "The machine is operational and ready to run live." | No measurable claim; the machine ran a full unattended batch (Ch. 12) and is demonstrated live. | **SUPPORTED** |
| J-2 | Clip label "battery run outdoors" | Ch. 11 `fig:prototype-whole`b: "Representative point-of-need deployment scenario, **operating outdoors on battery power**". | **SUPPORTED** |
| J-3 | Clip label "timelapse run" | Deck asset is the sped-up run clip; no thesis claim. | **SUPPORTED** |
| J-4 | S36 `alt` "in a representative point-of-need scenario" | Same caption, verbatim. | **SUPPORTED** |
| J-5 | S36 address chip "sirsirio.github.io/thesis-tools" | `Frontmatter/Preface.tex`: `\livetool{Thesis Tools}{…}{sirsirio.github.io/thesis-tools/}`. | **SUPPORTED** |
| J-6 | S36 notes "show the pre-run reagent check" | Ch. 11 §`sec:integrated-prototype`: "An automated pre-run routine validates available reagent levels against cumulative batch consumption, preventing execution if fluid is insufficient and prompting the operator to prime unfilled lines." | **SUPPORTED** |
| J-7 | S36 notes "caps folded back to 135 degrees" | Ch. 12: "Reliable execution currently requires folding all caps to `\ang{135}`". | **SUPPORTED** |
| J-8 | S36 notes "show the rack ejecting to the output queue" | "Once fully dispensed, the completed rack is transferred to the output queue". | **SUPPORTED** |

---

## K. S37a, S37 — the boundary of the evidence

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| K-1 | S37a "Discussion and Outlook." | `\chapter{Discussion and Outlook}`. | **SUPPORTED** |
| K-2 | S37 title "The concept is proven; the instrument is not." | Ch. 14: "**The concept is proven, but the instrument is not yet ready for field use.**" | **SUPPORTED** |
| K-3 | Row "Channels built — **2 of 6**" | Ch. 13 §`sec:discussion-evidence`: "Only two of six channels were built". | **SUPPORTED** |
| K-4 | Row "Liquids dispensed — **water, dye**" | "tests used only water and dye". | **SUPPORTED** |
| K-5 | Row "**5 µL** lower bound — **not verified**" | "the `\SI{5}{\micro\liter}` lower limit was not verified on the assembled machine". | **SUPPORTED** |
| K-6 | Row "Untrained users — **none**" | "no untrained user operated it"; and "no one outside the project and no prospective user has used it." | **SUPPORTED** |
| K-7 | Card "Test one: **The reference protocol**, run with its own reagents." | See K-7 below. | **MISSTATED** |
| K-8 | Card "Test two: A first-time user handling racks, tubes, lids and bottles." | "a complete walk-up trial in which **a first-time user handles racks, tubes, lids and bottles**, not only the screen." | **SUPPORTED** |
| K-9 | Notes "None of that is a failure of the concept; it is the boundary of the evidence." | Framing; §`sec:discussion-evidence` is titled "Scope and limits of the prototype evidence". | **SUPPORTED** |
| K-10 | `alt` "two reagent bottles behind the lane" | The containers are `\SI{4}{\milli\liter}` **glass vials** in printed cartridges (Ch. 11 §`sec:storage-module`), not bottles. `alt` only, never spoken. | **SUPPORTED** (loose; see note) |

### K-7 — "the reference protocol" · **MISSTATED**

**Deck, S37, Test-one card, on screen:** "**The reference protocol**, run with its own reagents."

**Thesis, Ch. 13 §`sec:discussion-evidence`:** "Two validation tests must come first: **running the PANPOC protocol with its real reagents**, and a complete walk-up trial…". Ch. 14 says the same: "every test used water or dye rather than **the actual reagents of the PANPOC protocol**."

**Why the substitution is not free.** "The reference protocol" is already spoken for in this thesis, by a *different object*: App-N §`sec:app-simulator` calls the four-reagent simulator benchmark "**The reference preparation protocol** --- four reagents, 300 µL, 5 µL, 300 µL and 50 µL", and Ch. 10 §`sec:throughput-simulator` quotes its 86 % figure as "Under the reference protocol". That benchmark is a set of volumes in a scheduler, not a wet-chemistry protocol with reagents of its own. On S26, ten slides earlier, this deck itself shows the simulator. Saying "the reference protocol, run with its own reagents" invites the audience to hear the simulator benchmark being run wet.

**Proposed card:** "**The PANPOC protocol**, run with its real reagents." (The note already says "the real protocol" — **SUPPORTED** — so only the card changes.)

**K-10 note.** If the alt text is ever revised, "two reagent **vials** behind the lane" is the thesis's word; `fig:storage-parts` fixes the three part names as **cartridge · sleeve · needle holder**, and the glass container is a **vial**.

---

## L. S38 — depth or breadth

`tab:strategies` (Ch. 13 §`sec:depth-breadth`), verbatim, against the deck's 2×2:

| Thesis cell | Deck cell | Verdict |
|---|---|---|
| "Brings a chosen concept to the precision it can reach (pump)" | "Brings a concept to the precision it can reach" | **SUPPORTED** |
| "Commits to a shape before its alternatives are built (alignment)" | "Commits to a shape before its alternatives are built" | **SUPPORTED** |
| "Compares alternatives as hardware rather than on paper (pump concepts)" | "Compares alternatives as hardware, not on paper" | **SUPPORTED** |
| "A quick build may compare two builds rather than two mechanisms" | "A quick build may compare two builds, not two mechanisms" | **SUPPORTED** |

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| L-1 | Title "The pump got depth because breadth came first; the alignment module got breadth on paper only." | "For the pump, going deep was the right choice **because breadth came first**." / "In contrast, **the alignment module had breadth on paper only**." | **SUPPORTED** |
| L-2 | Pump note "**4 rotary builds** · 1 linear pump · **1 syringe**" | See L-2 below. | **MISSTATED** |
| L-3 | Alignment note "**1 of about 50 concepts** built" | "We gathered around fifty concepts, and I worked the survivors out further on six hand-drawn sketch sheets… but **only the most feasible one was built**." | **SUPPORTED** |
| L-4 | Model panel "Target **5.0 µL**" (struck through) | "the target `\SI{5}{\micro\liter}` stroke was never reached". | **SUPPORTED** |
| L-5 | Model panel "Delivered **3.94 / 4.10 µL**" | "with the integrated heads delivering **3.94 and `\SI{4.10}{\micro\liter}` per stroke** (`\cref{tab:pump-two-heads}`)." Confirmed in Ch. 6 `tab:pump-two-heads`: Channel 1 3.94, Channel 2 4.10. | **SUPPORTED** |
| L-6 | "the model was never validated" | "However, **the model was never experimentally validated.**" | **SUPPORTED** |
| L-7 | "**±0.10 mm** printing makes a real rotor sweep worth running" | "The `\SI{\pm 0.10}{\milli\meter}` tolerance… **This dimensional repeatability is what makes an empirical, prototypes-first campaign practical**: differences between test rotors will reflect deliberate geometry rather than random print scatter." | **SUPPORTED** |
| L-8 | Quote "A concept built once is also not a concept tested." | Ch. 13 §`sec:depth-breadth`, **verbatim**. | **SUPPORTED** |
| L-9 | Notes "a carousel or a gantry might have been smaller" | "a circular carousel could have been more compact, and a gantry moving the needles might have reduced the footprint, **though at much higher build complexity**." The deck drops the complexity clause — worth restoring in one breath, but not a misstatement. | **SUPPORTED** |
| L-10 | Notes "The alignment module set the size of the machine" | "Because this module sets the size of the instrument, a quick prototype of the alternatives might have paid off here". | **SUPPORTED** |
| L-11 | `alt` "CAD render of the v2.3 pump head… labelled with a **1.52 mm** gap" | Ch. 13: "as confirmed when the v2.3 housing achieved its nominal `\SI{1.52}{\milli\meter}` occlusion gap". | **SUPPORTED** |
| L-12 | `alt` "the printed lane, the **rack-and-pinion** drive, the geared stepper on its holder and the homing microswitch" | Ch. 7: "a printed rack and pinion already resolves…"; §7.4 "the actuator and rack-and-pinion…". | **SUPPORTED** |
| L-13 | Notes "The model gave a starting point and was never validated" | "an analytical model provides a reasoned starting point"; "the model was never experimentally validated". | **SUPPORTED** |

### L-2 — "1 syringe" in the built-evidence column · **MISSTATED**

**Deck, S38, under the kicker `Pump`, on screen:** "4 rotary builds · 1 linear pump · **1 syringe**"

**Thesis, Ch. 13 §`sec:depth-breadth`:** "**A syringe pump was benchmarked** and a linear peristaltic pump was built and scored before the actual peristaltic pump was chosen". App-J `tab:app-pump-shortlist` is explicit about what happened to it: "Classic syringe pump — **Evaluated empirically using a commercial laboratory instrument**."

**The break.** The chip sits in an *evidence column headed "Pump"*, in a slide whose whole argument is **how many things were built as hardware**, in a list whose first two items are builds ("4 rotary builds", "1 linear pump"). Reading it as a third build is the natural reading, and it credits Sirio with building a syringe pump he did not build — it was a commercial laboratory instrument, run as a benchmark. The speaker note gets it right ("a syringe benchmarked, a linear pump built, four rotary builds"); only the chip is wrong.

**Proposed chip:** "4 rotary builds · 1 linear pump built · 1 syringe benchmarked".

---

## M. S39 — AI

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| M-1 | Title "The AI was the foundation of the digital work; the physical work stayed in my hands." | Ch. 13 §`sec:ai-retrospect`: "in this project it served as **a core foundation rather than a secondary aid**"; "**The true boundary lay in physical execution**". | **SUPPORTED** |
| M-2 | Kicker "Decisive for" | "For digital and analytical tasks, **this contribution was decisive**". | **SUPPORTED** |
| M-3 | Chips "Literature research · Experimental protocols · Measurement analysis · Firmware · Technical specifications" | "AI assisted in conducting **literature research, designing experimental protocols, analyzing measurement data, generating firmware, and drafting technical specifications**." Five items, five chips, same order. | **SUPPORTED** |
| M-4 | Chips "Printing · Assembly · Wiring · Lab testing" under "The boundary" | "**3D printing, component assembly, electrical wiring, and physical laboratory testing** remained hands-on tasks." | **SUPPORTED** |
| M-5 | "and **the CAD assembly it could not build**" | Ch. 4 §`sec:ai-limits`, cited from §13.4: "**Spatial and mechanical limits:** Programmatic generation of 3D mechanical assemblies **failed outright**; spatial layout, component tolerances, and physical assembly remained strictly human tasks." | **SUPPORTED** |
| M-6 | `alt` "a dashed note beside Build reads printing and assembly by hand" + tag "by hand" | Describes the deck's rasterisation of `fig-ai-working-loop`; consistent with M-4. | **SUPPORTED** |
| M-7 | Kicker "The one decision I would reverse" + "the market search landed at the start of the writing phase" | App-Q §`sec:app-self-eval-reflection`: "**The one major exception was significant: the comprehensive search of existing commercial and open-source devices only took place at the start of the writing phase.**" | **SUPPORTED** |
| M-8 | Notes "so the pump was engineered from scratch although open designs existed" | App-Q: "The peristaltic pump, for example, was engineered entirely from scratch, **even though open-source 3D-printed designs existed** that could have provided a solid foundation." | **SUPPORTED** |
| M-9 | Timeline axis FEB → SEP, marker in late summer | App-Q `fig:project-timeline`: "Project timeline, **February to September 2026**"; hand-in 19 September. | **SUPPORTED** |
| M-10 | Quote "Without AI embedded across the entire engineering workflow, completing an integrated prototype and this depth of experimental validation within a master's thesis timeline would not have been possible." | Ch. 13 §`sec:ai-retrospect`, **verbatim, word for word**. | **SUPPORTED** |

---

## N. S40 — the order of the next prototype

`fig:development-order` (Ch. 13 §`sec:development-order`), six stages, against the deck's six tiles:

| Thesis stage node | Deck tile | Verdict |
|---|---|---|
| "Pump, storage and nozzle together" (shaded group) | `01 The fluidic core` / `Pump · **Vial** · Nozzle` | **MISSTATED** (N-1) |
| "Tube-lid opener" | `02 Lid opener` | **SUPPORTED** |
| "Sample rack" | `03 Sample rack` | **SUPPORTED** |
| "Alignment: linear, circular or gantry" | `04 Alignment` | **SUPPORTED** |
| "Electronics and firmware" | `05 Electronics` | **SUPPORTED** |
| "Integration parts and enclosure" | `06 Enclosure` | **SUPPORTED** |

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| N-2 | Title "…in the order their geometry depends." | Caption: "**each later stage takes its shape from the stages before it**"; body: "Development should follow the sequence in `\cref{fig:development-order}`, where **each stage inherits its geometry from the stage before it**." | **SUPPORTED** |
| N-3 | Note "co-developed until the fluidic interfaces are stable" | §13.5.1, verbatim: "they must be **co-developed until their fluidic interfaces are stable**." | **SUPPORTED** |
| N-4 | Note "the last manual step, settled before the rack is frozen" | §13.5.2: "the operator currently has to fold every lid back by hand --- **the sole manual bottleneck** remaining in an otherwise unattended run"; "**the lid opener must be settled before finalizing the sample rack**." | **SUPPORTED** |
| N-5 | Note "stronger motors, closed-loop step-loss detection" | §13.5.3: "A revised design requires reshaped lane walls, **stronger stepper motors, and closed-loop step-loss detection** to halt operation if friction occurs." | **SUPPORTED** |
| N-6 | Note "one board, 24 V, charge sensing" | §13.5.4: "A custom printed circuit board is necessary"; "a `\SI{24}{\volt}` drive rail"; "because the system lacks state-of-charge monitoring… Adding a bus current sensor". | **SUPPORTED** |
| N-7 | Note "designed last, because it inherits everything" | §13.5.5: "The outer enclosure was intentionally deferred **because its shape depends on all underlying mechanisms**." | **SUPPORTED** |
| N-8 | Notes "Pump, vial and nozzle first and together — they set the delivered volume." | §13.5.1: "Because the peristaltic pump, reagent storage, and nozzle module **together dictate delivered volume**…" — the claim is right, the middle noun is not (same fault as N-1). | **MISSTATED** (folded into N-1) |
| N-9 | Notes "Parallel development was forced by **six weeks** of late tubing." | §`sec:development-order`: "However, **its tubing arrived six weeks late**, forcing us to develop the other modules in parallel while we waited." | **SUPPORTED** |
| N-10 | Notes "Lid opener before the rack: opening lids is what needs the tube positions." | "**Opening lids automatically requires locating tubes with high precision**, meaning the lid opener must be settled before finalizing the sample rack." | **SUPPORTED** |

### N-1 — "Pump · Vial · Nozzle" · **MISSTATED**

**Deck, S40 tile 01, on screen:** `The fluidic core` / "Pump · **Vial** · Nozzle". **Deck notes:** "Pump, **vial** and nozzle first and together".

**Thesis, `fig:development-order`, first node:** "Pump, **storage** and nozzle together". **§13.5.1 heading:** "Pump, **storage** and nozzle". **Body:** "Because the peristaltic pump, **reagent storage**, and nozzle module together dictate delivered volume, they must be co-developed until their fluidic interfaces are stable."

A vial is a consumable, not a module — it is bought, not developed, and nobody can spend the next prototype's first stage "developing the vial". The three things that must mature together are three **modules**: pump, reagent storage, nozzle. Two of those are Sirio's and one is Marius's, which is also the reason the thesis names it precisely.

**Proposed tile:** `Pump · Storage · Nozzle`. **Proposed note:** "Pump, storage and nozzle first and together — they set the delivered volume." (Ch. 13 also gives the reason to say it: "Developing reagent storage separately from the pump was a clear drawback: restriction in the feed line is a leading suspect for the 10 % delivery loss".)

---

## O. S41 — pairing with a reader

| # | Deck string | Thesis (Ch. 13 §`sec:beyond-dispenser`) | Verdict |
|---|---|---|---|
| O-1 | Title "A prepared sample is not an answer: pair the dispenser with a reader." | "A standalone dispenser solves the manual preparation bottleneck, but **field adoption ultimately hinges on delivering a complete answer**"; "**pair it with a matching modular reader**." | **SUPPORTED** |
| O-2 | "A modular reader — colorimetric · enzymatic · fluorescence · immunoassay" | "A companion instrument could host swappable sensor modules---such as **colorimetric, enzymatic, fluorescence, or immunoassay detectors**". | **SUPPORTED** |
| O-3 | "load and scan, not configure" | "The operator would then **load and scan rather than configure**". | **SUPPORTED** |
| O-4 | Coded tube (QR) between the two instruments | "**A QR code on the sample tube** or test kit, read by a scanner on the instrument, could tell both instruments what they need". | **SUPPORTED** |
| O-5 | "Livestock screening" · "Municipal water testing" | "The settings in `\cref{sec:stakeholders}`, from **livestock screening on farms to municipal water testing**". | **SUPPORTED** |
| O-6 | "one specification, pulled two ways" | "each **pull the instrument's specifications in different directions**". | **SUPPORTED** |
| O-7 | Notes "operators want an actionable result, not liquid handling for its own sake" | "operators and healthcare workers are interested in **actionable diagnostic results, not liquid handling for its own sake**." | **SUPPORTED** |
| O-8 | Notes "First, a sharper use case" | "**Before it, development requires a sharper use case.**" | **SUPPORTED** |

---

## P. S42, S43 — the close

| # | Deck string | Thesis | Verdict |
|---|---|---|---|
| P-1 | Notes "their swab must still travel to a central laboratory — this thesis shows that sample preparation does not have to" | Ch. 14, verbatim: "today, their swab must still travel to a central laboratory. **This thesis shows that sample preparation does not have to.**" | **SUPPORTED** |
| P-2 | Notes "a portable instrument can dispense precisely and unattended; before it stands at a gate it must be rebuilt from matured modules, tested on real reagents with real users, and paired with a reader" | Ch. 14: "A portable instrument can dispense liquids precisely and unattended. Before it can stand at an airport gate, it must be **rebuilt from matured modules, tested on real reagents with real users, and paired with a reader** that delivers the final diagnostic result." | **SUPPORTED** |
| P-3 | Notes "whether that traveller can one day be tested and cleared before leaving the terminal is an open question, but no longer one that only a central laboratory can answer" | Ch. 14: "**Whether that traveler can one day be tested and cleared before leaving the terminal remains an open question, but it is no longer one that only a central laboratory can answer.**" | **SUPPORTED** |
| P-4 | `alt` "An arrivals hall during an outbreak…" | Scene-setting for §1.1; no measurable claim. | **SUPPORTED** |
| P-5 | S43 Supervisors "Maria Dimaki · Winnie Edith Svendsen · Lars Hvam" | `Frontmatter/Preface.tex`: "supervised by Senior Researcher **Maria Dimaki**, Professor **Winnie Edith Svendsen**, and Professor **Lars Hvam**." | **SUPPORTED** |
| P-6 | S43 "And: Marius Dornonville de la Cour Schiller · Pulkit Saluja" | Preface: "to **Marius** for the partnership, and to the members of the NaBIS team for their support, **Pulkit Saluja** in particular for the guidance in the mechanical design and electronics." | **SUPPORTED** |
| P-7 | S43 URL "sirsirio.github.io/thesis-tools" | Preface `\livetool{Thesis Tools}`. | **SUPPORTED** |

**P-6 note (not a finding).** The Preface also thanks **Konstantinos** ("with whom I shared innumerable late nights in front of a laptop…"). He is not on S43. That is a choice, not an error — but it is the kind of omission that is noticed by the person it omits, and there is room on the slide.

---

## Q. What Part III gets right that Part II did not

Worth recording, because the pattern is the point:

1. **No computed percentages.** Part II's "32 per cent short" was arithmetic nobody published. Part III's every percentage — 18, 3.4, 0.6, 0.2, 1.0, 0.27, 1.3, 5.0, 86 — is printed in the thesis in that form.
2. **No fabricated replicates.** S31 draws one bar per channel and no error bars. Ch. 12 publishes n and CV; the deck shows neither as data, so it cannot assert a spread the thesis contradicts.
3. **Designed-vs-measured is kept straight nearly everywhere.** S30b's "still missing" chips, S30's "the outdoor run is a scenario, not a claim", S37's four "not verified / none / 2 of 6" rows and S38's "the model was never validated" are all the thesis's own hedges, carried over rather than sanded off. The two places the hedge was lost are I-1 (`Versatility met*`) and F-5 (three droplets → three tubes).
4. **Module attribution is not miscounted.** Nothing in Part III calls storage a fifth module of Sirio's, and nothing claims the level sensing, the cartridge or the septum design. The two gaps in §H are silences, not claims.

---

## R. The fix list, in the order a rebuild would apply it

| Cue | Change | Cost |
|---|---|---|
| s26 | `a shaker` → `a vibration motor` | one word on screen |
| s27 | Note: `a 24 V pack` → `a regulated USB-C power bank feeding a 24 V motor rail` | one note |
| s28 | Note: `the vial slides in` → `the storage module slides in`; add "the storage module is Marius's, the carrier is mine" | one note |
| s32 | `3 of 40 landed on the deck` → `3 droplets wetted the rack or the lane`; same in the note, with "apart from the cap fouling" | one chip + one note |
| s32 | `5 mm` → `5 mm target radius` | three characters |
| s32 | `alt`: drop "done at eleven minutes six seconds" | `alt` only |
| s33 | Note: name the storage module as the septum's owner | one note |
| s34 | `Versatility / met` → `met *` + footnote `* the 5 µL lower bound is not yet validated` | one chip + one line |
| s34 | Re-route `Cleanability` off the `Enclosure` pill; rewrite the note to "two wait on an enclosure, one on a board, one on a material that can be sanitised" | one wire + one note |
| s37 | `The reference protocol` → `The PANPOC protocol` | two words |
| s38 | `1 syringe` → `1 syringe benchmarked` (and `1 linear pump built`) | one chip |
| s40 | `Pump · Vial · Nozzle` → `Pump · Storage · Nozzle`; same in the note | one tile + one note |
