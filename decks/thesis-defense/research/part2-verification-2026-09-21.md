# Part II verification pack — thesis vs deck

**Compiled 2026-09-21. Read-only; no deck file was edited.**
Sources read in full: `Chapters/06_Pump-Module.tex`, `07_Alignment-Module.tex`, `08_Nozzle-Module.tex`, `09_User-Interface-Module.tex`, `Backmatter/App-B-Dispensing-Error.tex`, `App-C-Printer-Characterization.tex`, `App-D-Test-System.tex`, `App-J-Pump-Concept-Record.tex`, `App-K-Pump-Design-Models.tex` (design-point and torque sections), `App-L-Alignment-Module-Record.tex`. Skimmed for module naming: `App-I-Requirements-Criteria.tex`, `App-A-Protocol-Survey.tex`. Additionally read because Part II depends on them: `Chapters/03_Methodology.tex` §3.3, `Chapters/05_Requirements-and-Decomposition.tex` (module table), `Chapters/11_Integration.tex` §11.1.
Deck source cross-checked: `decks/thesis-defense/parts/30-part2.html` (2414 lines, S11–S24).

Everything below is copied, not paraphrased. Where the thesis is silent it says **not in the thesis**.

---

## A. Module terminology

### A.1 Chapter titles, verbatim

| Label | `\chapter{...}` exactly as written |
|---|---|
| `chap:pump-module` | **Pump Module** |
| `chap:alignment-module` | **Alignment Module** |
| `chap:nozzle-module` | **Nozzle Module** |
| `chap:ui-module` | **User Interface Module** |

Supporting appendix titles: `app:pump-concept-record` = "Pump concept generation and selection record"; `app:alignment-record` = "Alignment module record"; `app:ui-manual` = "Operator manual: the machine and its interface"; `app:printer-calibration` = "3D printer geometric characterization"; `app:test-system` = "The test system"; `app:error-compounding` = "Dispensing error supplement".

### A.2 The canonical register — `tab:module-functions` (Ch. 5)

Caption: "The eight functional modules, the operational function each one carries, and where each was developed." The MODULE column reads, verbatim:

> Pump · Alignment · Nozzle · Storage · User interface · Electronics and software · Enclosure

(Tube holding is noted in the caption as "grouped within alignment, into which it was absorbed during prototyping".) The full table:

| Module | Function it carries | Developed by | Where |
|---|---|---|---|
| Pump | Meters the volume and moves it out of the reservoir | **Marius and I** | `chap:pump-module` |
| Alignment | Brings tube and nozzle together for every dispense, and holds the tube while it happens | **Sirio** | `chap:alignment-module` |
| Nozzle | Carries the metered volume out of the machine and lands the drop in the tube | **Marius, reworked by Sirio** | `chap:nozzle-module` |
| Storage | Holds the reagents on board and feeds them to the pump | **Marius** | **Companion thesis** |
| User interface | Lets the operator set up a run and reports what the machine is doing | **Marius, rebuilt by Sirio** | `chap:ui-module` |
| Electronics and software | Powers and drives the mechanisms, and carries the software that sequences a run | Sirio | `chap:electronics-module` |
| Enclosure | Houses the modules and shields the dispensing zone from the surroundings | — | Not built |

`App-I` reproduces eight evaluation matrices whose TOC entries name them: "Pump module", "Alignment module", "Nozzle module", "Electronics module", **"User interface"**, "Storage module", "Tube holding module", "Enclosure module".

`App-A-Protocol-Survey.tex` contains **no module naming at all** (zero occurrences of "module").

### A.3 Per module: one canonical name, and every variant found

**1. PUMP — canonical: "pump module".**
Variants in running text and captions: "the pump"; "the peristaltic pump module" (`fig:pump-v23` caption: "The peristaltic pump module as characterized"); "the pump head" (`fig:proto01-built`, `fig:pump-head-gap`, `tab:pump-two-heads` column "Head"); "the rotary peristaltic pump" / "rotary peristaltic architecture"; "the module"; the build names used as nouns — **proto-01, v2.1, v2.2, v2.3**; and "Channel 1 (as-built)" / "Channel 2 (as-built)" for the two integrated heads. No "pumping module", no "dispensing module". **Consistent.**

**2. ALIGNMENT — canonical: "alignment module". This is the one with real drift.** Every variant found:
- "alignment module" — 11 occurrences across Ch. 7, 8, 9, 11 and App-L (dominant)
- "**alignment stage**" — `tab:alignment-bench-results` caption: "Summary of experimental bench characterization results for the **alignment stage** (prototype v2.1)"
- "**the stage**" — passim in §7.3 ("the stage finds it by driving into the switch at start-up"; "the stage then reports a position it never reached")
- "**linear indexing stage**" — §`sec:alignment-narrowing`: "Concept selection therefore converged on a **linear indexing stage**"
- "**indexing stage**" — §7.4 "the longitudinal indexing stage"; App-L "The **indexing stage** was qualified on the bench"
- "**motion stage**" — §`sec:alignment-evolution` title: "Evolution of the **motion stage**: three builds, one argument"
- "**linear stage**" — "a circular carousel and a **linear stage**"
- "**linear motion stage**" — §7.2 "the **linear motion stage** that indexes it"
- "**the alignment chassis**" / "**the v3 chassis**" — §`sec:alignment-interfaces`, `fig:alignment-v3-bottom`
- component names: "the carriage", "the sample rack" / "the rack" (19 occurrences), "the rail", "the lane" / "dispensing lane"
- "**tube holder**" — 2 occurrences: the operating area "was subsequently divided into three distinct functional elements: the dispensing nozzle array, the **sample tube holder**, and the mechanism that aligns them… This chapter addresses the alignment mechanism and the tube holder as they got combined together." App-I keeps a separate "Tube holding module" matrix.
- "**positioning**" appears only as adjective or verb ("positioning repeatability", "tube positioning and indexing") — **never as the module's name**
- "dispensing head" (2×) refers to the *nozzle* side, not this module

**Deck rule: say "alignment module". Use "the alignment stage" only for the v1–v2.1 bench build. Never "positioning module", "indexing module", or bare "stage".**

**3. NOZZLE — canonical: "nozzle module".**
Variants: "the nozzle module" (Ch. 8 ×5, Ch. 11 ×3, Ch. 13 ×3, Ch. 9, Ch. 10); "the nozzle" (§`sec:nozzle-resulting` "The resulting nozzle"); "**the nozzle array**" / "stationary dispensing nozzle array" (Ch. 7 ×4, Ch. 11 ×2, App-L ×1); "the nozzle carrier" and "the fixed holder" (its two printed parts). "needle", "cannula", "hub", "tip", "seat" are **components**, never the module. **"needle module" does not exist in the thesis.** **Consistent.**

**4. USER INTERFACE — canonical: "user interface module" / "the user interface".**
Variants: "the user interface" (Ch. 5 ×3, Ch. 9 ×2, Ch. 10 ×2, Ch. 11 ×2); "the interface" (dominant in running text); "**operator interface**" — used **only** inside the two published-tool panel titles, `\livetool{Operator Interface Prototypes}` and the commented-out `\livetool{Operator Interface, Live}`, plus once in App-UI prose; "the interface firmware"; hardware words "the panel", "the display", "the touchscreen" (Ch. 10 ×4, Ch. 11 ×4, App-UI ×2); screen names "home screen", "service panel".
**"HMI" — zero occurrences. "display module" — zero. "screen module" — zero.**

**Deck rule: "user interface module" or "the user interface". "Operator interface" is reserved in the thesis for the two published tool names; using it as the module name invents a third name for one thing.**

### A.4 Reagent storage — whose module is it?

**Unambiguous: Marius Schiller's, credited by name, and the thesis says so in the strongest possible terms.**

- `tab:module-functions`: **Storage | Holds the reagents on board and feeds them to the pump | Marius | Companion thesis**
- Ch. 5: "Reagent storage was **engineered in parallel within the companion thesis by Marius** `\parencite{schiller-sample-dispensing-2026}` and is described here primarily in the context of system integration."
- Ch. 11 §`sec:storage-module` ("The inherited storage module"), first sentence: **"Reagent storage is the only module in the instrument whose physical design was not developed in this thesis. Marius designed and built it in a companion project, transferring it as functional hardware."**
- `fig:storage-parts` caption ends: **"Design by Marius `\parencite{schiller-sample-dispensing-2026}`; photographed for this thesis."**
- Performance is attributed, not claimed: "**Marius reports** that this measurement settles within `\SI{5}{\percent}` of the true liquid level, with no measurable divergence between different vials."

Canonical name: **"storage module"** (16 occurrences in Ch. 11) or **"reagent storage"**. Its three parts have fixed names in `fig:storage-parts`: **cartridge · sleeve · needle holder**. "Vial" is the glass container ("a standard glass vial sealed with a septum cap"), never the module. Note also: "**Only the 4 mL cartridge variant was fabricated for this prototype.**"

The nozzle and the user interface are the other two items inherited from Marius, but both were *reworked / rebuilt by Sirio*. Storage was **not** — it is the one module in Part II that is entirely someone else's work, and the deck's credit line is correct and necessary.

---

## B. The pump-principle comparison

### B.1 The screening chain — all numbers confirmed

| Number | What it counts, verbatim | Source |
|---|---|---|
| **30** | "Around **thirty mechanisms** were gathered and sketched." App-J: "**Approximately thirty mechanisms** were generated during the divergent ideation phase" | §`sec:pump-ideation`; App-J §`sec:app-pump-families` |
| **6 families** | "They fall into **six families**: squeezing a flexible tube, displacing liquid with a plunger in a barrel, pumping a chamber whose flow direction is enforced by check valves, feeding under gravity through a valve, opening and closing a restriction in a pressurized line, and exploiting the surface tension that holds a droplet at a narrow opening." `tab:app-pump-families` lists exactly six: Tube squeeze · Displacement-based · Check valve-based · Flow-control openable · Gravity · Surface tension | §`sec:pump-ideation`; `tab:app-pump-families` |
| **7** | "**Seven concepts survived**." App-J: "**Seven concepts cleared this screening gate**" | §`sec:pump-ideation`; `tab:app-pump-shortlist` |
| **5** | "We divided the **remaining five** between us and developed them separately." App-J: "**Five were advanced to prototype development**" | §`sec:pump-ideation`; App-J |
| **2** | **In the thesis's chain the 2 is the number DEFERRED, not built.** "**Two** of those were **set aside soon afterwards as too demanding to build within the project**: a tube driven along its length by a traveling tourniquet, and a chamber gated so that liquid alternates with air." App-J: "**two were deferred**" | §`sec:pump-ideation`; `tab:app-pump-shortlist` |

**A second "two" exists and is easy to confuse with it:** "**Two distinct peristaltic concepts were developed into functional prototypes** and evaluated in parallel: a rotary peristaltic pump developed here, and a linear peristaltic chamber pump developed in the companion thesis by Marius." (§`sec:pump-peristaltic`) — that is the two that were *built*.

`tab:app-pump-shortlist`, the seven, verbatim:

| Concept | Outcome |
|---|---|
| Continuous peristaltic pump | Developed; selected for final architecture |
| Discrete peristaltic pump | Developed |
| Classic syringe pump | Evaluated empirically using a commercial laboratory instrument |
| Reciprocating piston pump | Developed |
| Reciprocating diaphragm pump | Developed |
| Tube with a traveling tourniquet | Deferred; excessive mechanical complexity for prototype phase |
| Air-alternated gated chamber | Deferred; unresolved fluid-filling and bubble-entrapment dynamics |

### B.2 The two finalists and the scores

- Names used in the thesis: **"the rotary peristaltic pump developed here"** (also "rotary peristaltic architecture", "the rotary architecture") vs **"the linear peristaltic chamber pump developed in the companion thesis by Marius"** (also "the linear chamber", "linear pinch pumping", "the linear prototype").
- "The two architectures were scored against the pump evaluation matrix (`tab:app-pump-comparison`), where the **rotary architecture prevailed by 3485 to 3185 points**."
- `tab:app-pump-comparison` caption: "…the totals represent overall weighted sums. The rotary architecture prevailed by `\num{3485}` to `\num{3185}` points, **driven primarily by footprint, mass, and cleanability**."
- Scheme: **20 criteria, each scored 1–5, multiplied by a weight** (weights 100 down to 5). Rotary wins Footprint 5–3 (w 80), Lightweight 5–3 (w 60), Inexpensive 4–3, Dead volume 4–3, Ruggedness 4–3, Minimization of consumables 4–3, **Cleanable 3–1 (w 50)**. Linear wins Low calibration 4–3, Low-maintenance 4–3, Repairable 4–3, Versatility 4–3, **Accuracy 3–5 (w 10)**, **Reproducibility 3–5 (w 5)**.
- The margin, broken out verbatim: "The `\num{300}`-point scoring margin… The rotary architecture gained `\num{610}` weighted points across eight criteria, with **footprint, mass, and cleanability contributing `\num{380}` points**. Conversely, the linear architecture gained `\num{310}` points across six criteria, but its superior **accuracy and reproducibility contributed only `\num{30}` points combined**."
- Not in the matrix: batch throughput. "Due to lead-screw travel limits, multi-tube batch runs took approximately **thirty minutes longer** on the linear pump… the matrix is preserved here in its original historical form."

### B.3 The wetted-boundary argument

**Figure key: `fig:pump-principles`. Image: `Pictures/fig-pump-principles`. Short caption: "Three principles for metering a small volume".** Full caption, verbatim:

> Three principles for metering a small volume, drawn schematically and not to scale. **a)** a syringe, where a plunger sweeps a known bore and the delivered volume is a traveled length times a cross-section. **b)** a reciprocating pump, where a diaphragm on the side of a chamber changes its volume and two check valves set the direction of flow. **c)** a peristaltic pump, where rollers on a rotor occlude a flexible tube against a track and carry the trapped liquid forward; the liquid is broken wherever an engaged roller pinches the tube shut, and the slug held between two rollers is what one advance delivers. Two conventions run across all three panels: parts that move are drawn in red, and the heavy line marks the boundary wetted by the liquid. In **a)** and **b)** that boundary runs across the mechanism itself — **the bore, the plunger face, the valve leaflets** — while in **c)** it **closes on the tube alone and the rollers remain outside it**. Each check valve in **b)** is drawn as a pair of leaflets, in the manner of a venous valve: liquid passes with the chevron and is held against it, so the apex points the way that port carries flow. Both point upward here, because the chamber draws from below and delivers above.

Which parts are wetted, from the body text:

- **Syringe** (§`sec:pump-displacement`): "the **plunger and barrel** are wetted by each reagent, requiring extensive wash cycles or manual syringe replacement between different fluids to prevent cross-contamination." Second objection: "a syringe operates on a **committed stroke**: the plunger must complete its linear stroke and refill before subsequent volumes can be dispensed, while the lead-screw carriage requires substantial physical travel that increases instrument footprint."
- **Reciprocating piston / diaphragm**: "integrating **check valves** introduces **moving internal elements and elastomeric seals directly into the wetted fluid path**. These internal geometries create **dead-volume pockets** that complicate cleaning, increase priming losses, and heighten cross-contamination risks when switching between biological reagents."
- **Verdict**: "**Cleanability and fluid isolation ultimately eliminate all three displacement architectures.** Because the instrument must process multiple reagents in decentralized environments **without access to laboratory wash facilities or specialized maintenance personnel**, fluidic architectures that require rigorous internal decontamination introduce unacceptable operational risk."
- **Peristaltic**: "The peristaltic principle avoids wetted mechanical boundaries by squeezing an elastic tube from the outside, **keeping the fluid path fully isolated**." Three supports: the Lead Fluid WSP3000 precedent down to microlitre volumes; "the mechanism operates **without internal check valves or sliding seals**"; biopharmaceutical single-use tubing practice.
- **Accuracy explicitly did NOT decide it**: "These results bound what the benchmark can show. The syringes were large, plastic and disposable by design; a glass syringe sized to the volume being delivered would perform far better at the low end. **Accuracy was therefore not what ruled the syringe pump out.**"
- **The rotary-vs-linear decision**: "**The primary reason for discarding the linear chamber was its reliance on check valves**: because linear pinch pumping operates reciprocally, routing multiple reagents requires an array of inlet and outlet check valves. These valves introduce internal wetted moving parts, dead volume, and severe cleaning demands, disqualifying the concept for the same reasons that eliminated the piston and diaphragm designs." And: "**both architectures satisfied the mandatory ±10 % pass/fail gates**… With baseline accuracy assured, the rotary peristaltic architecture was selected because it **eliminated check valves entirely, occupied a smaller footprint, and avoided the thirty-minute batch throughput penalty** of the linear lead screw."

**Caveat for the deck.** For the *displacement* family, the wetted boundary is the decider, flatly. For *rotary vs linear*, the thesis's own matrix says the margin was "driven primarily by **footprint, mass, and cleanability**" (380 of the 610 points gained). "The wetted boundary decided it" is exact for the first comparison and a simplification of the second. See H-17.

Residual wetted fittings the thesis does name: the pump's path is unbroken ("no valve, fitting or joint is wetted anywhere in the module. The one coupling in the path sits at the tip, where the needle is joined") and Ch. 8 adds "this interface adds only a **single wetted Luer fitting**".

---

## C. The first build and the flow sensor

### C.1 The bench-setup figure

- **Figure key: `fig:proto01-bench`. Image: `Pictures/proto01-bench.jpg`, included at `width=0.86\textwidth`.**
- Short caption: **"The pump on the bench with the flow sensor inline"**.
- Full caption, verbatim: *"Experimental test setup during early closed-loop evaluations. Fluid is drawn from the reservoir at left, driven through the peristaltic pump head, **passed through the inline thermal flow sensor in the center**, and collected in the vessel at right."*
- Why it was there: "The inline flow sensor sat in the fluid path between the pump head and the collection vessel (`fig:proto01-bench`), because it was meant to do more than measure: **it was the feedback element of a closed-loop scheme** that would compensate for tubing wear by adjusting the commanded motor steps in real time."
- Sensor identity (App-D §`sec:app-ts-flow`): **"an inline Sensirion SLF3S-0600F thermal liquid flow sensor connected via a USB interface cable"**, I²C-over-serial.

**What is actually visible in the frame** — read from the image file, because the thesis describes only left→centre→right. The photo is a selective-colour shot, 1280 × 720, desaturated except four objects:

- **Left (x ≈ 22–40 %, y ≈ 45–90 %):** a bright **yellow** plastic tube rack holding a 50 mL Falcon conical tube with a **blue** screw cap, lying on its side — the reservoir. An **orange** tubing clamp sits on the line leaving it.
- **Centre-left, standing on top of that yellow rack (x ≈ 28–39 %, y ≈ 25–48 %):** the **white 3D-printed pump head**, rotor face toward the camera, the roller bearings visible through the open front.
- **CENTRE — THE FLOW SENSOR (x ≈ 41–59 %, y ≈ 46–59 %; centre of mass ≈ 50 % of width, 53 % of height):** a **flat, horizontal, transparent / clear plastic body** lying on a clear support plate, with a small **green** PCB or fitting at its left end, metal screw fittings, and clear tubing entering from the left and leaving to the right. It is the **lowest-contrast object in the frame** and reads as "a clear plastic slab on the bench" — it is genuinely easy to miss, which is why the deck needs the label. **A leader line from the upper left landing at roughly (50 %, 52 %) is the cleanest pointer.**
- **Right (x ≈ 58–75 %, y ≈ 46–60 %):** a **blue** plastic weigh boat / funnel with a black tube end in it, on a small white box — the collection vessel.
- Background, all desaturated: an AOYUE 888A hot-air rework station, a soldering-iron stand, a bag of Webril Handi-Pads, parts drawers.

### C.2 Flow-trace statistics, units and sign convention

All from §`sec:pump-flow-sensor`, on a **commanded 1 mL delivery** from proto-01:

- Mean: **1104 µL/min**
- Standard deviation of the instantaneous signal: **1159 µL/min** — larger than the mean. Verbatim: "the instantaneous signal scattered more widely than the quantity being measured: exhibiting a standard deviation of `$1159\,\mu\text{L/min}$` about a mean of `$1104\,\mu\text{L/min}$`, with **apparent reverse flow on one sample in seven** and **rapid sign changes**."
- Reverse-flow fraction: **one sample in seven** (≈ 14.3 %; the thesis gives the ratio, not a percentage).
- Roller-passage frequency: "averaging the signal in phase with the motor stroke rate reveals a **periodic cycle locked to roller passage at the fundamental frequency (`$6.7\,\text{Hz}$` based on firmware timing)**."
- Vibration sensitivity: "mechanical vibration transmitted along the tubing, to which the thermal sensor is exceptionally sensitive — **a light tap on the bench readily registers in the trace**."
- **Sampling-rate experiment:** "Sampling at lower rates filtered high-frequency visual noise without making the result any more repeatable: **the two recordings taken at the lower rate returned 585 and 707 µL for the same commanded delivery, a difference of a fifth.**" (Two recordings, in µL, against a commanded 1000 µL.)
- Conclusion: "delimiting a discrete delivery requires detecting clear start and stop thresholds, which is impossible when instantaneous noise exceeds the signal. Consequently, the inline flow sensor **could not serve as a reliable volume meter for discrete dispensing**."

**Sign convention — the answer the chart rebuild needs.**

- **Units: µL/min throughout. The quantity is instantaneous volumetric flow rate.** Zero is a real, physically meaningful value on that axis, and the sensor is bidirectional.
- **Does the recorded signal actually go negative? YES — the thesis asserts it in three independent places.**
  1. §`sec:pump-flow-sensor`: "**apparent reverse flow on one sample in seven and rapid sign changes**." "Sign changes" is unambiguous: the instantaneous value crosses zero.
  2. App-D §`sec:app-ts-trace`: every replicate is automatically screened against "**backflow excursions below baseline**, duration deviations, and volume outliers" — the pipeline was built to detect exactly this.
  3. §`sec:pump-flow-sensor` close: "flow traces were kept only for what a balance cannot show: the time course of a delivery, such as priming, ripple and **backflow**."
- **Magnitude of the negative excursions: NOT IN THE THESIS.** No figure, table or sentence in Ch. 6, App-B, App-C, App-D, App-J or App-K states how far below zero the trace goes, in µL/min or as a fraction of the mean. `fig:flow-oscillation`'s caption describes panel (b) as "Two seconds of the recording with individual samples and the roller-passage cycle recovered by phase-averaging against stroke timing" and quotes no amplitude.
- **Therefore:** a rebuilt chart may honestly put zero on the x-axis and show samples crossing below it (the thesis asserts they do, at roughly one in seven), but **must not put a number on the trough depth**. The only quantitative anchor available is the standard deviation: **σ = 1159 µL/min about a mean of 1104**, so the lower edge of a ±1σ band sits **≈ 55 µL/min below zero**. Drawing the ±1σ band and letting it cross the axis is the defensible way to make the negatives read — it is a published pair of numbers, not an invented trough.

**`fig:flow-oscillation`** — image `Pictures/fig-flow-oscillation`, short caption "Flow-sensor signal during a 1 mL delivery from the peristaltic prototype". Three panels: **(a)** the delivery as recorded, "with the dotted line marking the commanded rate and the solid line the recorded mean; the shaded window is expanded in (b)"; **(b)** two seconds with individual samples and the phase-averaged roller-passage cycle; **(c)** "The same delivery recorded at a lower sampling rate, which reduces visual scatter but fails to improve integration accuracy."

### C.3 The head-to-head — confirmed exactly

§`sec:pump-flow-sensor`, verbatim:

> Weighing the same deliveries settled the question. On a commanded `$1\,\text{mL}$` delivery, the integrated flow trace yielded **`$600.1\,\mu\text{L}$` across five replicates with a CV of `$17.6\%$`**, whereas an analytical balance recorded **`$678.0\,\mu\text{L}$` across three weighings with a CV of `$4.5\%$`**. The flow integral **underestimated the delivered volume by `$11.5\%$`** and **scattered four times as widely**. From this build on, gravimetry was the reference for every delivered volume in this thesis, and flow traces were kept only for what a balance cannot show: the time course of a delivery, such as priming, ripple and backflow.

**All five deck numbers confirmed verbatim: 600.1 µL · CV 17.6 % · n = 5 · 678.0 µL · CV 4.5 % · n = 3 · 11.5 % underestimate.** ("scattered four times as widely" = 17.6 / 4.5 ≈ 3.9.)

The two-stage validation of the sensor before it was trusted, for completeness: plateau averages against the manufacturer's reference software at three setpoints spanning **10–1600 µL/min** agreed within **0.21 %, 0.32 % and 2.64 %**, worst at the lowest rate, where "the difference is only `$0.3\,\mu\text{L/min}$` in absolute terms"; then the whole analysis pipeline was exercised on the laboratory syringe pump. *(A commented-out source note records an unresolved discrepancy between an old §3.4 count of 24 conditions / 204 replicates and the 13 conditions / 108 dispenses given in §6.1.2 and App-J; the counts were "left out here until the source data settles which is right." Do not quote a pipeline-check replicate count on stage.)*

### C.4 CRITICAL — the 3.39 µL question

**Verbatim, §`sec:pump-proto01-result` ("What the first build delivered"), complete first paragraph:**

> Read on the balance, the shimmed pump delivered `$678\,\mu\text{L}$` against a commanded `$1000\,\mu\text{L}$` **across three replicates**: `$3.39\,\mu\text{L}$` per stroke against the nominal `$5.0\,\mu\text{L}$`, **a repeatable systematic shortfall with a coefficient of variation (CV) of `$4.5\,\%$`**.

**1. Is 3.39 µL a single derived per-stroke figure? YES.** It is the *mean* 678 µL divided by the stroke count. The sentence structure is explicit: 678 µL is the quantity "across three replicates"; 3.39 µL is the single per-stroke figure computed from it. Ch. 13 restates it as one number: "The first 3D-printed rotary head delivered only `\SI{3.39}{\micro\liter}` of a nominal `\SI{5}{\micro\liter}` stroke."

**2. The stroke count: NOT PRINTED ANYWHERE in the thesis.** It is recoverable and unambiguous: 678.0 ÷ 3.39 = **200.00 strokes**, and 1000 µL commanded ÷ 5.0 µL nominal per stroke = **200 strokes**. App-D §`sec:app-ts-actuation` confirms the machine is driven that way: "**Actuation is commanded in discrete strokes, not liquid volume.** For the four-roller pump rotor, one full stroke corresponds to a 90° rotor turn (50 full motor steps at 1.8°/step, scaled by the microstepping factor)." So a commanded 1000 µL is issued as 200 commanded strokes. **200 is the only value consistent with every printed number, but the figure itself is not in the thesis — present it as a one-line derivation or not at all.**

**3. The three individual replicate weighings behind the 678.0 µL mean: THEY DO NOT EXIST ANYWHERE IN THE THESIS.**
Searched exhaustively: `grep -rn "678\|3\.39\|600\.1\|11\.5"` across every `.tex` file in `Chapters/` and `Backmatter/` returns **five hits total** — `03_Methodology.tex` line 353 (a source comment), `06_Pump-Module.tex` lines 708 / 710 / 711 (the head-to-head sentence), `06_Pump-Module.tex` lines 729 / 730 (the sentence above), and `13_Discussion-and-Reflection.tex` line 54. Specifically:
- **App-B** is about error compounding across chained aliquots on the Sidekick dispenser. **No proto-01 data.**
- **App-D** documents the test software, actuation, randomisation and the immutability rules. Its only replicate figures are *syringe-pump* flow traces (`fig:app-flow-clean`: 96.19 ± 2.68 µL, CV 2.78 %, ten deliveries; `fig:app-flow-flagged`: 4.94 ± 1.12 µL, CV 22.72 %, eleven replicates). **No proto-01 replicate table.**
- **App-J** is the concept record; its only measurement table is the commercial syringe-pump benchmark. **No proto-01 data.**
- **App-K** is the design models; it contains no measurements at all.

**What IS known about the three values: they had a CV of 4.5 %.** On a mean of 678.0 µL that is a standard deviation of **± 30.5 µL** — the three weighings spanned roughly ±30 µL around 678, and per-stroke they were emphatically **not** three times 3.39. **A chart drawing three identical 3.39 bars asserts a spread of zero, which the thesis's own CV disproves.**

**Honest replacements, best first:**
- **(a) One bar, not three.** "678 µL delivered on a commanded 1000 µL — 3.39 µL a stroke against a nominal 5.0", with "n = 3, CV 4.5 %" as a subscript. This is exactly what the thesis says and nothing more.
- **(b) One bar with an error whisker.** 3.39 µL with ± 4.5 % (± 0.15 µL) whiskers, labelled "mean of three weighings, CV 4.5 %". Arithmetically sound; adds no new claim.
- **(c) Three bars only if drawn as unlabelled scatter around a 3.39 mean line**, with the caption saying "three weighings, CV 4.5 %; the individual masses are not reported in the thesis". Riskiest — a viewer will read the bar heights as data.
- **Do not** draw three bars each labelled 3.39.

**4. Related:** the deck readout `#s14-n4` counts to **32** ("per cent short, every time"). 1 − 3.39/5.00 = **32.2 %**, arithmetically correct, but **the number 32 appears nowhere in the thesis**. The thesis's only headline shortfall percentage is the *later* one: **9.4 %** for the qualified v2.3 at 4.53 µL/stroke. See H-13.

**The rest of what the first build taught, verbatim:**

> Run for the thickness of the paper shim, the occlusion model predicted a delivery close to the one measured. With no slots to measure the real gap, this showed that the model was plausible, but not how precise it was.
>
> Two things were learned. Because the shortfall repeated from dose to dose, it came from **the shape of the parts, not from the motor**. And once the wall was measured at `$0.91\,\text{mm}$`, the housing drawn with a `$1.75\,\text{mm}$` gap should have sealed. It did not, so **the printed gap had to be wider than drawn**.

The shim itself: "a folded paper shim was inserted beneath it to force occlusion. The shim was an expedient rather than a component: **calipering it returned between 0.78 and 1.10 mm depending on how firmly the jaws were closed**, so its thickness was a range rather than a dimension."

---

## D. The design point

Source: `tab:app-pump-design-point` (App-K, short caption **"The pump design point"**), plus §`sec:pump-rotor-geometry`, §`sec:pump-occlusion-model`, §`sec:pump-gap`.

**The full table, verbatim:**

| Quantity | Value | Unit |
|---|---|---|
| Stroke volume V | 5.0 | µL |
| Tube bore d | 0.51 | mm |
| Lumen area A = πd²/4 | 0.2043 | mm² |
| Delivering arc V/A | 24.48 | mm |
| Roller radius R_r | 5.0 | mm |
| Interference δ | 0.20 | mm |
| Inflation factor k | 1.15 | — |
| Contact length L_c | 3.25 | mm |
| Engaged rollers N_c | 2 | — |
| Compensating arc N_c·L_c | 6.51 | mm |
| Total arc per stroke | 30.98 | mm |
| Roller count N | 4 | — |
| **Rotor radius R** | **19.7** | mm |
| Rotor radius without compensation | 15.6 | mm |
| Increase due to compensation | 26 | % |
| Wall thickness w | 0.91 | mm |
| Wall stack 2w | 1.82 | mm |
| **Printed gap G = 2w − δ** | **1.62** | mm |
| Volume sensitivity to gap | 3.4 | µL/mm |
| Resolution (quarter-stepping) | 0.025 | µL/step |

**Classification of the five values:**

| Value | Class | Evidence |
|---|---|---|
| **Tube bore 0.51 mm** | **CHOSEN INPUT**, selected from a screened field of standard bores | "Screening across standard tubing bores and roller configurations (`tab:app-pump-feasibility`) eliminates most candidate geometries…" and "**standard PVC tubing with a 0.51 mm inner diameter proved most appropriate**: it keeps the overall rotor envelope compact, provides high volumetric resolution per motor step, avoids particle clogging, and remains physically feasible across all evaluated roller configurations (N = 3 to 12)." 0.25 mm was rejected because it "requires excessive rotor diameters (R > 86 mm)" and for "significant clogging risks when processing suspensions containing paramagnetic microparticles". Wider bores are buildable only at N ≥ 6, where torque fails. The actual tubing: **Masterflex two-stop microbore PVC, Puri-Clear LL**. |
| **Single wall thickness 0.91 ± 0.02 mm** | **MEASURED PROPERTY** — and the thesis calls it the most critical parameter in the model | "**Because the required gap depends directly on the stacked wall thickness, the single wall thickness w is the most critical parameter in the model.** Because standard extrusion datasheets often have wide manufacturing tolerances, w was measured empirically through **three independent methods**: ruler-calibrated optical microscopy of a cut tube cross-section, caliper measurements of the outer diameter, and the manufacturer's reference dimensions for the tubing. These three methods agreed **within 1.5 %**, establishing **w = 0.91 ± 0.02 mm** and a stacked double-wall thickness of **1.82 mm**." |
| **Four rollers** | **COMPUTED / REASONED RESULT** of two converging constraints | See below. |
| **5 µL per stroke** | **CHOSEN INPUT**, and explicitly a free variable | "The nominal stroke volume was **set to 5 µL, the minimum volume specified in `sec:requirements-criteria`**. This base volume allows any target volume from 5 to 1000 µL to be delivered as an integer number of discrete strokes. **Stroke volume enters the analytical model as an independent variable, serving as an engineering starting point that can be re-resolved to alternative rotor dimensions without altering the underlying framework.**" |
| **Rotor pitch radius 19.70 mm** | **COMPUTED RESULT** — the output of the whole chain | "For the four-roller configuration (N = 4, with two rollers engaged at all times), the required pitch radius **expands from 15.6 mm (assuming ideal line contact) to R = 19.70 mm** — a **26 % dimensional increase**. Sizing the rotor without accounting for this flattened contact zone would have resulted in an undersized pump that **consistently under-delivered by roughly one fifth on every stroke**." |

**Why four rollers — both bounds, verbatim:**

- **Upper bound, torque.** "With the tube bore fixed at 0.51 mm, the roller count was selected by evaluating **motor torque derating and continuous fluid sealing**. While higher roller counts deliver more strokes per revolution and increase volumetric throughput at a given motor step rate, **stepper motor available torque decreases sharply at higher speeds due to winding inductance**. Under a 12 V supply, this torque derating severely restricts operating margins at high roller counts (`tab:app-pump-fos`)."
  `tab:app-pump-fos` at 12 V, quarter-stepping, 2000 steps/s, 150 rpm, 200 g load per engaged roller: **N=3 → R 14.8 mm, FoS 5.40 "Ample" · N=4 → R 19.7 mm, FoS 2.03 "Adequate" · N=5 → R 24.7 mm, FoS 1.62 "Tight" · N=6 → R 29.6 mm, FoS 0.90 "Stalls at 12 V" · N=8 → 0.51 · N=10 → 0.32 · N=12 → 0.23.** Legend: "A factor of safety **below 1.0 indicates motor stalling; between 1.0 and 2.0 represents marginal operation**." Text: "configurations with **six or more rollers stall** under 12 V operation. The four-roller configuration provides an adequate torque safety factor (FoS = 2.03 at 12 V, 3.05 at 24 V) while maintaining a compact rotor radius."
- **Lower bound, sealing.** "**The lower bound on roller count is dictated by fluid backflow prevention.** Across a 180° wrap angle, a three-roller configuration (N = 3) engages only a single roller during transitions, creating momentary intervals where the fluid path is unoccluded and susceptible to hydrostatic backflow. **Maintaining at least two simultaneously engaged rollers requires a minimum of four rollers (N = 4).** A four-roller rotor represents the **smallest configuration that guarantees continuous, valveless occlusion across a 180° track**, minimizing frictional drag and power consumption while eliminating backflow. While conventional continuous-flow peristaltic pumps frequently utilize six to eight rollers to attenuate flow pulsation, **pulsation suppression is irrelevant for discrete, stop-and-go aliquot delivery**."

### D.1 FLAG — what the deck loses by showing only 0.51 mm / 4 rollers / 5 µL

1. **Dropping the 0.91 mm wall breaks the causal chain the slide is claiming.** The thesis says the wall thickness is "**the most critical parameter in the model**". It is the **only measured quantity of the five**; the other four are chosen or computed. Remove it and the ladder stops being "measure the tube, choose a bore and a stroke, and the geometry falls out" and becomes three unconnected numbers with no input from the physical world. It also removes the direct antecedent of the S14 story ("the second discrepancy stemmed from **estimating rather than measuring the tubing wall thickness**") and of the **1.82 mm closure threshold** that S15's readout counts up from. **If only three values are shown, the wall is the wrong one to cut.**
2. **Dropping 19.70 mm removes the only computed output.** Without it the three remaining values look like a spec someone wrote down, not the result of a solver. 19.70 mm is what makes the occlusion model matter (15.6 → 19.70, +26 %) and it is the number proto-01 got wrong (17.70 instead of 19.70 — S14 draws exactly that). **S13's own tool card already reads "Why the rotor grew from 15.6 to 19.70 mm", so cutting the value leaves the card pointing at a number the slide no longer shows.**
3. **"5 µL per stroke" shown alone reads as an achieved result. It is not.** It is the *nominal target*. The qualified module delivers **4.53 µL** (9.4 % under); the two integrated heads deliver **3.94** and **4.10 µL**. S16 corrects this two slides later, but for two slides the audience carries "5 µL" as a measured capability. **If the ladder keeps 5 µL, put the word *nominal* on the slide, not only in the notes.**
4. Minor but quotable: App-K's design point gives the **printed gap as 1.62 mm** (G = 2w − δ, δ = 0.20 mm), while §`sec:pump-gap`'s summary sentence and the built v2.3 both say **1.52 mm**. `fig:pump-head-gap` reconciles them: "The housing shown has an embossed label of 1.52 mm, **part of a test set printed to evaluate gaps around the nominal 1.62 mm target**." See H-18.

**Gap sensitivity, for reference:** "delivered volume is sensitive to gap variation: **a shift of only 0.1 mm changes the stroke volume by roughly seven percent**" (§`sec:pump-gap`; App-K gives the coefficient as **3.4 µL/mm**, i.e. 0.34 µL on a 5.0 µL stroke = 6.8 %).

**The model's three boundaries** (§`sec:pump-gap`): it is quasistatic, "neglecting downstream fluidic resistance and assuming rapid elastic recovery of the tube behind each passing roller"; it assumes complete bore closure — "**If the printed gap is too wide, the tube does not merely under-deliver; it fails to seal**, allowing fluid to flow backwards under hydrostatic pressure"; and the tube path — "**The two geometries differ by only one to two percent** in delivered volume across the operating arc — a difference well below the manufacturing variations encountered during early prototyping."

---

## E. The printer characterisation

**Location warning: there is no `sec:pump-print`.** The main-text section is **§3.3 `sec:physical-prototyping` ("Physical prototyping"), in `Chapters/03_Methodology.tex`**. Ch. 6 only points at it: §`sec:pump-v22` says "This finding prompted a dedicated extensive printer characterization study on standardized test artifacts, detailed in `\cref{sec:physical-prototyping}` and `\cref{app:printer-calibration}`". The full record is **App-C, `app:printer-calibration`, "3D printer geometric characterization"**.

Machine: **Bambu Lab P1S**, **0.2 mm nozzle**, **3DE MAX PLA (1.75 mm)**, locked slicer profile, adaptive layer height disabled.

### E.1 The two failed attempts (context for why the rings exist)

- **Linear shrinkage bars** (`fig:app-shrink-bars`, image `Pictures/proto-shrink-bars`): two 100 mm bars along X and Y, measured after cooling to 21 °C. **0.26 % along X, 0.18 % along Y, mean 0.22 %.** Failed on identifiability: "a rectangular bar is measured between two convex outer faces", so `L_meas = s·L_nom + 2c` — **one equation, two unknowns**.
- **Single-part rotor model**: yielded **s = 1.00906, c = 0.11 mm**; fixed the bearing centre-to-centre span exactly, but "Applying the same solid-body scale factor to an internal arc… produced a part **0.23 mm wider than intended**. Regression analysis of the error revealed that almost all discrepancy originated from the scaling term rather than the boundary offset: **internal bores exhibit negligible scaling contraction**."

### E.2 The ring artifact — how many rings, what diameters, how measured

**Design, verbatim:** "The test coupon consists of **three concentric, mechanically unconnected rings** with a constant **3 mm wall thickness**, printed flat on the build plate using the locked 0.2 mm nozzle profile. The rings are physically separated to prevent connecting spokes or webs from mechanically constraining thermal contraction during cooling. **Three diameters span the functional operating envelope (22–88 mm)**, with the **intermediate ring (37 mm bore / 43 mm outer diameter) printed in triplicate** to quantify machine repeatability."

**So: three nominal sizes, five printed bodies.** Exact nominals from `tab:ring-artifact`: **Small 22.00 bore / 28.00 outer · Mid 37.00 / 43.00 (×3) · Large 82.00 / 88.00.** *(Verified against the image `Pictures/proto-calibration-rings.png`: the slicer plate carries **five** ring bodies — two mid rings at the left, and at the right a large ring with a mid ring and a small ring nested inside it.)*

**How measured, verbatim:** "Diameters were measured with a **calibrated digital caliper (0.01 mm resolution)**, **averaging two orthogonal measurements per feature** to account for any slight out-of-roundness. **Internal bores were measured using the caliper's knife-edge inside jaws, while external diameters were measured using the flat outside jaws.**" Uncertainty: "measuring a bore exerts outward pressure that tends to **over-read** diameter, whereas measuring an outer diameter compresses the ring and tends to **under-read**."

Repeatability floor from the triplicate: **0.03–0.05 mm**.

`tab:ring-artifact`, raw (nominal / reading 1 / reading 2 / deviation, mm): Small bore 22.00 / 21.81 / 21.87 / −0.16 · Small outer 28.00 / 27.88 / 27.90 / −0.11 · Mid 1 bore 37.00 / 36.90 / 36.72 / −0.19 · Mid 2 bore 37.00 / 36.83 / 36.83 / −0.17 · Mid 3 bore 37.00 / 36.90 / 36.90 / −0.10 · Mid 1 outer 43.00 / 42.81 / 42.83 / −0.18 · Mid 2 outer 43.00 / 42.76 / 42.79 / −0.22 · Mid 3 outer 43.00 / 42.77 / 42.77 / −0.23 · Large bore 82.00 / 81.95 / 81.91 / −0.07 · Large outer 88.00 / 87.47 / 87.53 / **−0.50**.

### E.3 The two compensation rules — exact coefficients

**Forward transfer functions** (what the printer does), OLS per feature class:

```
d_printed = 0.99354 · d_modeled + 0.068      (external)   [eq:cal-ext-forward]
d_printed = 1.00164 · d_modeled − 0.208      (internal)   [eq:cal-int-forward]
```

The internal slope is "statistically indistinguishable from unity (**t = 0.82, p > 0.4**)". Setting it to exactly 1.0 and refitting gives the **inverse rules actually used in CAD**:

```
d_modeled = 1.0065 · d_target − 0.07         (external)   [eq:cal-ext-inverse]
d_modeled = d_target + 0.14                  (internal)   [eq:cal-int-inverse]
```

Warning carried in the thesis: "The constant offset of **+0.14 mm** in `eq:cal-int-inverse` applies **strictly when scaling is fixed to unity**; it must not be combined with the unconstrained intercept in `eq:cal-int-forward`."

Ch. 3 §3.3 states the same two rules in plain language: "**external (convex) diameters exhibited uniform thermal contraction that scaled linearly with size (≈ 0.65 %)**, whereas **internal (concave) bores maintained nominal scaling but suffered a constant inward rim offset (≈ 0.14 mm on diameter)** due to extrusion bead curvature." (Both deck numbers — 0.65 % and 0.14 mm — confirmed.)

### E.4 Residual accuracy

- Residual standard error: **0.023 mm external, 0.040 mm internal** — "matching the machine's empirical repeatability floor (0.03–0.05 mm)".
- Slope separation: external 0.99354 vs internal 1.00164 "differ by **more than eight standard errors**".
- Out-of-sample: "When `eq:cal-ext-inverse,eq:cal-int-inverse` were applied to **an independent test component (the pump housing)**, predicted diameters agreed with measured values **within 0.01 mm**."
- **R² = 0.98 external, R² = 0.54 internal** — the low internal R² is "an arithmetic artifact of near-zero slope rather than poor predictive power".
- **The honest headline is ± 0.10 mm, not 0.01 mm.** Ch. 3: "In practice, measuring 3D-printed plastic parts with hand calipers is tricky, so this **0.01 mm figure was not especially reliable**. Moreover, testing a single part only checks the model fit rather than manufacturing repeatability: printing the same ring three times varied by 0.03–0.05 mm, placing the **realistic prediction accuracy at roughly ± 0.10 mm**." App-C: "Across the calibrated diameter envelope (**20–90 mm**), corrected features achieve a **95 % prediction interval of ± 0.10 mm on diameter**." **The deck's ± 0.10 mm is the right number to show.**
- Transfer cost: "approximately **20 caliper measurements and 20 minutes of analysis**."

### E.5 The figures — which carries the result

| Figure key | Image | What it is | Verdict |
|---|---|---|---|
| **`fig:app-ring-artifact`** (App-C) | `Pictures/proto-calibration-rings.png` | The coupon **arranged on the build plate before printing** (slicer screenshot). Caption: "The rings are separate bodies rather than one connected part: a spoke or web joining them would mechanically restrain thermal contraction." | **CONTEXT ONLY.** Shows the experimental design, not a single measurement. |
| **`fig:print-compensation`** (Ch. 3 §3.3 — *not* Ch. 6) | `Pictures/fig-print-compensation` | The **two rules drawn as a schematic**. Caption: "Each panel shows a small and a large diameter: the solid line is the printed edge, and the dashed line is the CAD boundary drawn to achieve it. **(a)** On an external surface (such as a disc), shrinkage increases with diameter, so the CAD model is scaled up by a percentage. **(b)** On an internal surface (such as a hole), the diameter shrinks by a fixed amount regardless of size, so the correction adds a constant offset. **Deviations are drawn twenty times true thickness for visibility; all numbers shown are the true values.**" | **THE RULE, explained.** Carries the true coefficients, but it is an explanatory diagram, not a data plot. This is the one that should dominate a slide about *what was learned*. |
| **`fig:printer-calibration`** (App-C) | `Pictures/fig-printer-calibration` | **The actual result.** Caption: "Deviation from the modeled diameter against nominal diameter, measured on the ring artifact, with the **least-squares line fitted to each feature class**. The external class deviates in proportion to size; the internal class holds its size and loses a roughly constant amount. The vertical spread of the three points at each of the middle diameters is the same ring printed and measured three times, and is therefore **how far the machine disagrees with itself between one print and the next** — the floor against which the residuals below are judged. **The pump head, drawn as an open diamond, was measured after the lines were fitted and took no part in fitting them.**" | **THE DATA.** Two fitted lines, the triplicate scatter, and the out-of-sample pump-head diamond, in one panel. |

**Answer to the question asked:** between the two figures the deck currently uses, **`fig-print-compensation` carries the result and `calibration-rings` is pure context.** Rebalancing so the compensation figure dominates is correct.
**But note: the deck does not use `fig:printer-calibration` at all** — the plot with the measured points, the fitted lines, the repeatability scatter *and* the out-of-sample validation diamond. If the intent is "the printer became predictable", that figure proves it where the schematic only asserts it. **A swap is a stronger move than a resize.**

---

## F. v2.1, v2.2, v2.3 — fault and fix, with every deck number

### F.0 The four-build frame (§`sec:pump-prototypes`)

> Translating the analytical rotor model into physical hardware required **four iterative Design–Build–Test–Learn (DBTL) prototyping cycles**… The first build (proto-01) uncovered **parameter transcription errors**, revealed the sensitivity of tube occlusion — an oversized gap fails to seal the lumen completely, causing backflow and zero delivery — and **changed how delivered volume was measured**. The subsequent three iterations (v2.1, v2.2, and v2.3) resolved **manufacturing process limitations**, addressing **rotor shrinkage, mounting eccentricity, 3D-printed bearing peg tapering, and slicer compensation errors**. Systematically measuring each physical part against the central motor shaft axis allowed the assembly to converge on a concentric, uniform occlusion gap.

Proto-01's two errors: (i) the contact-correction arc was entered for **one** engaged roller (N_c = 1) instead of **two**, so "the physical rotor was printed with a radius of **17.70 mm instead of the required 19.70 mm**"; (ii) an *estimated* wall thickness put the closure threshold too high, "leading to a housing **gap drawn at 1.75 mm**", which "was too loose to seal the lumen, **resulting in zero forward delivery**."
The three requirements set for the second prototype: corrected rotor compensation (N_c = 2 → 19.70 mm); empirically measured wall (w = 0.91 ± 0.02 mm, 2w = 1.82 mm); and "**Rigid locking and caliper slots:** The housing was equipped with a positive screw clamp and **three radial inspection slots**".

### F.1 v2.1 — "an unsealed apex" (§`sec:pump-v21`)

- Also changed the print orientation: "the curved track now **lies flat on the build plate**, so the gap is set by the path of the print head rather than by stacked layers, which would make it vary around the arc. **It still did not pump.**"
- Method: "referencing all physical dimensions **directly to the central motor shaft axis**, which acts as the common geometric datum for both the rotor and the outer housing."
- **Fault 1 — rotor shrinkage:** "the 3D-printed rotor was undersized due to thermal plastic shrinkage, measuring **39.04 mm across opposing roller bearings instead of the nominal 39.40 mm (0.18 mm radial error)**."
- **Fault 2 — eccentric mount:** "fitting a circle through the three measured track radii revealed a **+0.45 mm vertical offset in the dovetail mount**." ✔ deck's 0.45 mm.
- **Consequence:** "While this vertical shift had little effect at the track ends where the walls run parallel to the offset (**1.71–1.82 mm gap**), it opened the **apex gap to 2.22 mm** — well above the **1.82 mm sealing limit**. As a result, the rollers occluded the tube at the sides but **released it completely across the top of the arc**." ✔ deck's 2.22 vs 1.82.
- **Why both had to be fixed at once:** "centering the head with an undersized rotor would leave a **marginal 1.77 mm gap with no safety factor**, while fixing the rotor alone would leave the apex open."
- Figure: **`fig:v21-gap`**, image `Pictures/fig-v21-gap-around-arc`, short caption "The gap around the track on the second build". Panel **a)** cross-section, "the pump head is shifted vertically by +0.45 mm due to dovetail mounting offset (**exaggerated ×10 for visibility**)"; panel **b)** "Installed gap measured at the three housing slots compared against the 1.82 mm closure threshold."

### F.2 v2.2 — "roller tilt and track shrinkage" (§`sec:pump-v22`)

- **Fault 1, peg taper.** "Each roller turns on a 3D-printed cylindrical peg sized to the **5.0 mm inner bearing bore**. When printed with a standard **0.4 mm nozzle**, the small feature could not be resolved accurately. Switching to a **0.2 mm nozzle** enabled clean printing but revealed an inherent FDM printing artifact: **small vertical pegs print with a slight draft angle, forming truncated cones that taper by roughly 0.085 mm from base to tip**. In an arrangement using **two stacked bearings** to span the tube width, the lower bearing pressed firmly onto the wide base while the upper bearing remained loose on the tapered tip. This caused the roller assembly to **tilt inward by 0.6°**." ✔ deck's 0.085 mm and 0.6°.
- **Consequence:** "A tilted roller **pinches the tube unevenly across its width and walks the tube axially** during rotation." ✔ deck's "tilted and walked the tube".
- **Fix:** "**Attempting to adjust the peg diameter in CAD could not eliminate this taper.** The issue was resolved by **eliminating the second bearing entirely: a single roller bearing seated firmly on the wide peg base cannot tilt.**" Consequence handled too: "Using one bearing instead of two **halves the width of the roller**, so the tube has less room to sit on and can more easily slide off to one side. The rotor was therefore given a **raised rim on each side of the rollers**, forming a shallow channel… sized to guide the tube with a small clearance rather than to hold it: **a rim pressing on the tube would rub against it continuously, wearing it and costing motor torque for nothing.**"
- **Fault 2, slicer compensation.** "To characterize the relationship between gap interference and stroke volume, **three housing variants were planned with target gaps of 1.52, 1.62, and 1.72 mm**. The **tightest 1.52 mm housing was printed first. When measured, the installed gap read 1.75 mm — 0.23 mm wider than intended.** This discrepancy was traced to standard slicer scaling rules, which **scale internal concave curves as if they were solid exterior boundaries**. In reality, **extruded plastic beads pull inward on concave arcs, causing internal curves to shrink.**" ✔ deck's "A housing drawn at 1.52 mm printed at 1.75".
- Figure: **`fig:roller-peg`**, image `Pictures/fig-roller-peg-taper`, short caption "Roller tilt caused by peg taper and the single-bearing resolution". Notes: "**Peg taper and tilt angle are exaggerated for visual clarity.**" "Photographs below show the corresponding printed rotor halves: tall pegs for dual bearings (a) and short pegs with guide rims for a single bearing (b)."

### F.3 v2.3 — "achieving uniform occlusion" (§`sec:pump-v23`)

- "The fourth prototype (v2.3) **combined all geometric and manufacturing corrections**. The pump housing CAD model was updated to **enlarge the curved track using the empirical printer calibration rules**, and the dovetail mounting seat was **lowered by 0.35 mm** to align the track center with the motor shaft."
- The 0.35 mm, justified: "Caliper measurements of the physical motor mount showed that the distance from the dovetail mounting face to the motor shaft was **26.05 mm, compared to the 25.70 mm assumed in the original CAD model**."
- **The result, bolded in the thesis itself:** "When measured through the inspection slots before running, the installed gap of **the v2.3 build read exactly 1.52 mm across the apex and at both ends of the track**. The assembly achieved full concentricity, uniform radial interference, and continuous fluid sealing across the entire 180° arc." ✔ deck's three 1.52 callouts.
- **The lesson, verbatim — the deck's landing line is supported exactly:** "This iterative progression reinforced a central practical lesson: **CAD dimensions are theoretical assumptions that must be anchored to physical datums.** The sealing failures of early builds were resolved **not by revising the underlying fluid model**, but by characterizing the 3D-printing process and measuring assembled parts directly."
- Figures: **`fig:pump-v23`** (`Pictures/pump-v23-render`, "The qualified pump head, v2.3") and **`fig:pump-head-gap`** (`Pictures/fig-pump-head-gap`, "Where the occlusion gap is, and how it is read") — "Three radial inspection slots (highlighted in red) are cut through the housing wall — **one at each end of the 180° track and one at its apex** — allowing direct caliper and feeler gauge measurements of the installed gap."
- **Caveat worth knowing:** §`sec:pump-integrated` later reveals that on the prototypes the dovetail seat was **hand-filed** during fitting — "On earlier prototypes, this variation was masked by **hand-filing the dovetail seat during fitting** (`sec:pump-v23`). The integrated heads were printed net-shape to maintain a fixed, repeatable mounting datum, **exposing natural print-to-print variation**." That is the bridge from the "1.52 at all three slots" triumph on S15 to the "3.94 and 4.10 on two heads" sting on S16.

---

## G. Alignment, nozzle and user-interface chapters — compact but complete

### G.1 Alignment module (Ch. 7 + App-L)

**What it does.** "While the pump module determines the volume of liquid delivered, **the alignment module determines where that volume lands**. It hosts the biological sample tubes and **indexes them sequentially beneath the fixed dispensing nozzles**… As the **largest mechanical assembly** in the instrument, this module also **defines the physical footprint and serves as the structural chassis** of the device."

**The kinematic decision** (§`sec:alignment-ideation`), "resolved early **based on functional reasoning rather than formal scoring**". Three considerations favouring moving the tubes, verbatim:
1. **Fluid path integrity:** "Keeping supply tubing static avoids dynamic flexing, fatigue, and potential blockage."
2. **Visual status indication:** "The physical rack position directly displays run progress to an operator."
3. **Accessible maintenance:** "Stationary nozzles remain open for inspection, priming, and tubing replacement."

**The two-stage funnel.** Stage 1, jointly with Marius: "**roughly fifty concepts across six families** — including robotic arms, rotating carousels, gravity chutes, and linear tracks — alongside unconventional ideas like magnetic or pneumatic droplet steering." Qualitative pass/fail screen → "**Ten concepts survived**" (`tab:app-alignment-shortlist`: rotating samples, rotating gear system, scissor arm, scissor arm with elevator, floor on gantry, single-tube assembly line, rollers with walls, screw-based linear actuator, circular rotating rack assembly line, linear rack assembly line). "**Four of the ten carry a sample rack past a fixed nozzle**, and it is from that group that the module was developed." Stage 2, individually: **six sequential engineering sketch sheets**, `fig:app-alignment-sheet-1` … `fig:app-alignment-sheet-6`, explicitly "**a fresh divergent exploration on paper**", not a filter.
Sheet results worth quoting: **Sheet 4** — four drive orientations scored 1–5 on cleanability, feasibility, electrical safety, footprint: "**Side-push and top-push tied at 17 points; bottom-push scored 9 points** due to fluid ingress risks beneath open tubes." **Sheet 5** — "On the top-push configuration, cleanability is neutral (*liquids do not fall upward*). **The rack and pinion scored 24 points** (corrected from handwritten 23, as set in type on the plate), **leading the lead screw (23 points)**."

**The governing principle** (§`sec:alignment-narrowing`): "**cleanability first, feasibility second**, and the fewer the parts, seams, and crevices, the better." Four rules, verbatim headings: "**Push, not push–pull**" ("Pulling a rack back requires clamping it, and **grippers are difficult to clean**"); "**Bare rail guidance**" ("**Ball carriages, guide bushings, and telescopic slides were rejected** in favor of a printed channel that supports the rack directly and wipes clean"); "**Drive above the samples**" ("Driving from below places the transmission underneath open tubes"); "**Printed rack and pinion**" ("Commercial linear actuators and enclosed lead screws were rejected in favor of an open transmission that can be taken apart, inspected, and washed"). The lead screw "was rejected on engineering grounds rather than on cleanability alone: **it is heavier, it is slower, and its sub-micrometer resolution is wasted on an axis that indexes in 22 mm steps**." Carousel vs linear: "Linear motion was selected on feasibility and cleanability"; the trade-off is length — "The stage spans roughly **50 cm**… feasibility and cleanability outrank compact footprint."

**The sample rack** (§`sec:alignment-rack`, `fig:alignment-rack`, `Pictures/alignment-rack-final`): **eight** standard 1.5 mL or 2.0 mL microcentrifuge tubes in a monolithic 3D print at **22 mm centre-to-centre pitch**, positions numbered 1–8 on the front chamfer. "The rack is not confined to the instrument. It carries the tubes **from sample collection onward**."
*Why eight:* "Molecular biology automation is standardized around multiples of eight: standard 96-well microplates feature an **8 × 12** layout, thermal cycler strips and multichannel pipettes operate in eight-channel increments, and magnetic bead separation racks share the same geometry… the downstream **PANPOC instrument is specified to analyze 16 samples at once**, which the eight-tube rack divides into exactly two carriers."
*Why 22 mm:* "substantially wider than the physical diameter of the tubes requires. This extra clearance provides the mechanical envelope needed for an **automated tube cap opener**… actively developed in parallel by **Pulkit** within the same research group. **By physically measuring the operating envelope of Pulkit's working cap-opener prototype**, I established that a 22 mm pitch provides sufficient lateral clearance for the gripping fingers."
*Consequence:* "This 22 mm pitch **governs the geometry of the entire instrument**. It defines the spacing between adjacent dispensing nozzles… and sets the fundamental indexing step of the linear stage. Multiplied across eight tube positions, this pitch dictates the overall length of the transport axis: **the sample rack itself measures 174 mm in length** before accounting for pusher travel and queue clearance. The physical footprint… is therefore **driven by the consumable payload rather than by the drive transmission**."
*Retention:* passive — a **conical centering seat** at the base of each bore (`fig:alignment-rack-seat`). "**Eliminating active claws, springs, or moving latches removes the particulate traps and hidden crevices** a clamping mechanism would introduce." Generous fillets for wipe-down.

**Actuator and transmission** (§`sec:alignment-actuator`). Four gear geometries evaluated (spur, helical, worm, herringbone); a **straight-cut spur rack and pinion** chosen "as the simplest to 3D print, inspect, and keep clean" — "the motor's internal gearbox already prevents back-driving when unpowered". Modelled in **Fusion 360** with **true involute tooth profiles**, "avoiding the poor meshing and binding that occurs with simplified straight-flank approximations at small scales". **Gear module 0.8 mm; 16 teeth; pitch diameter 12.80 mm.** Motor: **28BYJ-48 unipolar geared stepper, 12 V variant**, **≈ 64:1** internal reduction, **ULN2003** Darlington array in **half-stepping**, commanded through an **I²C port expander** "to conserve microcontroller GPIO pins for the pump channels". Resolution: **102 half-steps per millimetre ≈ 9.8–10 µm per half-step**, "**three orders of magnitude finer than the 22 mm tube pitch**, enabling precise open-loop positioning without requiring secondary rotary encoders". Derivation (App-L `eq:alignment-resolution-derivation`): **4096 half-steps/rev ÷ (π × 12.80 mm = 40.21 mm) = 101.86 ≈ 102.0**; verified by commanding **13 464 half-steps** for exactly **132.0 mm**.

**Three builds** (§`sec:alignment-evolution`):
- **v1** — `fig:alignment-v1` (`Pictures/alignment-v1-stage`). "**validated transmission precision**". Side-push "selected purely because it was the simplest and fastest layout to fabricate and assemble on a bench". "Experimental tests confirmed **consistent step accuracy across repeated 22 mm index strokes**."
- **v2** — "**established gravity-protected isolation**." Drive relocated above the sample deck. "because liquids drain downward, elevating the motor, wiring, and gear teeth above the sample plane isolates them from accidental spills. This protects the drive mechanics geometrically, so **the prototype needs no dynamic seal or cover**… sliding mechanical covers have been outlined for it — **a labyrinth path rather than a rubber seal, so that the enclosure blocks liquid without adding a wearing part that must itself be cleaned**." Thermal bowing of the long rails mitigated by build-plate orientation, adjusted sliding clearances and localized thermal post-processing.
- **v2.1** — `fig:alignment-v21` (`Pictures/alignment-v21-homing`). "**gave the stage a starting point it can find by itself**". "Open-loop stepper drives maintain only relative step counts from power-up. Without an absolute home reference, the operator would have to manually register the carriage before every run, and unrecorded step loss would corrupt all subsequent dispense positions." A **microswitch at the left end of the rail**, "wired in a **normally-closed (NC) fail-safe loop**: a severed lead or loose connector interrupts the circuit, causing firmware to register an immediate endstop trigger and halt motion rather than driving the carriage into a mechanical hard stop." Homing is a **three-pass state machine**: "a fast approach until switch trip, a short back-off, and a slow debounced re-approach. **Position is zeroed on that third pass only**: on the fast pass the carriage coasts past the switch before the reading is taken, and on the slow one it barely moves between readings, **so approaching slowly is what makes the zero land in the same place every time**."

**Bench characterization** — `tab:alignment-bench-results`, short caption "Alignment stage bench characterization results". Qualified **31 July 2026** on the single-axis v2.1 build; **thirteen sequential checks** in App-L `tab:app-alignment-bench`, **two not completed** and recorded as "verification debt".

| Parameter / test | Result | Evaluation & remarks |
|---|---|---|
| Step resolution | **102.0 half-steps/mm** | Matches calculated value (9.8 µm per half-step) |
| Homing repeatability | **≤ 0.03 mm** | Measured spread of **2 half-steps** (App-L writes "≈ 0.02 mm") |
| Return-to-zero error | **+0.03 to +0.13 mm** | Across **132 mm** round trips; **zero step loss** |
| Homing routine duration | **110 s → 22 s** | Optimized via burst stepping and 400 kHz I²C clock |
| Shared I²C bus stress | Step interval **+1.6 %** | Simultaneous sensor streaming; zero packet loss or stalls |
| Fail-safe disconnect | Stop in **3.2 s** | Carriage halted within **3.9 mm** of switch unplug |
| **Usable linear stroke** | **140 mm (6 index moves)** | **Short of the 154 mm required for 8 positions (addressed in v3)** |

App-L raw counts: homing passes **1890 / 400 / 400** half-steps; repeatability commanded 800/1500/1100, counted **800 / 1502 / 1100**; return-to-zero commanded **13 464** outward, counted **13 470 / 13 467 / 13 477** (+0.06 / +0.03 / +0.13 mm); bus stress **75 consecutive sensor readings spaced 0.47–0.55 s apart against a 500 ms target**.
Verification debt: the **travel-budget fault trip** was "verified through code review rather than physical execution" (running it would have stalled the motor into a hard stop for over 60 s, risking gear wear); **supply rail voltage and phase coil resistances were not metered** (no benchtop multimeter that session).

**The methodological caveat the deck does not currently carry** (§`sec:alignment-bench`): "**That figure bounds the drive, not the rack.** The axis runs open-loop, with no position feedback, so it measures how faithfully the carriage follows its step count **when nothing obstructs it**. An external friction source acting on the rack leaves the step count intact while the rack itself falls short, and **the stage then reports a position it never reached** — at which point the dose is delivered where no tube is waiting to receive it. **Testing the assembled instrument found one such source.**"

**The stroke shortfall:** "Indexing an eight-tube rack across eight dispensing positions requires **seven index steps of 22 mm, totaling 154 mm** of linear travel. The v2.1 prototype rail delivered **approximately 140 mm**, executing **six index moves** reliably before the rack reached the end of the pinion. Because this limitation was **strictly geometric rather than electro-mechanical**, the drive mechanics, firmware state machine, and resolution were fully validated."

**v3, the two-axis chassis** (§`sec:alignment-final`; headline figure **`fig:alignment-v3-layout`**, images `Pictures/alignment-v3-top-annotated` + `Pictures/alignment-v3-iso`):
- **Axis 1** "drives a sample rack from left to right along the dispensing rail in discrete **22 mm** pitch increments until every tube has passed beneath the reagent nozzle window." **Axis 2** "operates transversely to feed the rail: it advances waiting sample racks forward through the input tray, transferring the leading rack into the dispensing lane at the start of each cycle." "The completed rack is ejected diagonally into the output tray at the far end of the stroke, forming a continuous **U-shaped workflow path**."
- Both axes use identical drives: **28BYJ-48 + 16-tooth spur pinion + printed involute rack**, same NC microswitch, same three-pass homing. Pushers differ (`fig:alignment-pushers`): the axis-1 pusher "extends downward from the overhead gear rack mounted along the rear wall to contact the back face of the active rack"; the axis-2 pusher "spans the full width of the input tray on two parallel legs, advancing the entire queue of waiting racks simultaneously."
- Capacity, bolded in the thesis: "A standard batch run accommodates **five sample racks (40 tubes total)**: **four waiting in the input queue and one pre-loaded directly onto the dispensing rail**. Pre-loading the first rack directly into the active lane maximizes batch capacity without requiring additional tray depth. The operator configures both the number of active racks and the number of sample tubes per rack via the touchscreen interface."
- Envelope: "**approximately 500 mm**", "providing an **active stroke of 309 mm** for complete eight-position indexing and rack ejection". The enclosed central compartment is the **electronics bay** — "an open-topped structural housing with a removable front panel containing the microcontroller, motor driver boards, and power distribution wiring."
- **Motorless ejection** (§`sec:alignment-ejection`, `fig:alignment-rack-ribs`). Three constraints, verbatim headings: "**No auxiliary actuators:** ejection had to be powered entirely by the existing travel of axis 1"; "**Zero stored elastic energy:** Spring-loaded kickers release energy at uncontrolled velocities, creating **liquid agitation and aerosolization risks** above open sample tubes"; "**Cleanability and wipe-down access:** Mechanisms requiring pivots, hinges, or slide bushings introduce particulate traps and fluid ingress paths."
  Solution: a **passive fishbone cam track**. "**Two angled ribs** protrude from the underside of each sample rack, and **two corresponding angled guide grooves** are recessed into the rail floor at the ejection station. As the rack completes position 8, the ribs align with the recessed floor grooves. **A final 22 mm forward stroke of axis 1** forces the ribs along the angled groove walls, converting longitudinal pusher travel into a smooth diagonal displacement that slides the rack into the output tray (positioned **1 mm below the main lane**). Because the cam geometry is molded directly into the structural floor and rack body, it **requires no moving parts, springs, or mechanical pivots**."
  Two geometric features: ribs are "**elongated rather than cylindrical**: an elongated rib provides line contact along the groove wall, **constraining rotational yaw** and preventing the rack from cocking"; and "**asymmetric widths**… the **wider trailing rib bridges over the narrower leading groove** without dropping in, **preventing premature ejection** during intermediate dispensing steps." Completed racks "accumulate passively in the output tray. Each newly ejected rack pushes the preceding racks forward across the low-friction floor, squaring the batch against the outer corner wall."
- **Fabrication** (§`sec:alignment-manufacture`): the 500 mm chassis "was modeled as a unified CAD body and then **split into three modular sections**" — three rather than two because "modifying a single guide groove or wall geometry requires reprinting **only one-third** of the chassis"; the parting planes sit at the electronics-bay outer walls "crossing a plain baseline section that contains no guide grooves, dispensing windows, or functional retaining sills." Dovetail keys + M3 screws + flat reinforcement plates (one front, two rear). Underside carries wiring ducts, microswitch pockets and **dual recessed carrying handles**. "**Each chassis section requires approximately eight hours of print time**, limiting the physical prototyping cycle, so **only two full-scale build iterations were carried out.**" The one redesign between them: the axis-2 queue pusher's "long dual-span arms exhibited **minor torsional flex under the load of four full sample racks**, absorbing drive displacement"; fixed by "**enlarg[ing] the chamfer where the toothed arm meets the cross bar**". Motor mounts are **standalone brackets** ("allows its axial position to be calibrated against the assembled gear rack in situ, ensuring proper gear meshing and minimal backlash"); microswitch seats are "**flat locating pads without fixed pilot holes**, allowing screw holes to be drilled in situ during final calibration."
- **Markings** (`fig:alignment-markings`): on the surface, never engraved — "**Lettering cut into the deck is a crevice**, and a marking laid on top identifies the same zone without introducing one." They name the input queue, the rack lane and the output tray, and number **five rack slots — slot 1 on the rack lane itself and slots 2 to 5 back along the input queue**. "**All markings are drawn in pencil**… pencil lifts with the same wipe that cleans the deck, whereas engraved lettering would remain a trap for particulates."
- **THE ONE KNOWN FAILURE MODE** (`fig:alignment-lid-fouling`), which the deck does not mention: "That envelope was drawn around a cap left standing, and it does not cover every way an operator can leave one. **A lid pushed all the way open, lying flat and parallel to the ground rather than standing at roughly 45° to it, projects sideways instead of upward and can reach the chamfered wall alongside the lane.** Contact there loads the rack with **a friction the drive cannot sense**… the motor completes its commanded steps, the rack lags behind them, and the stage holds a position the firmware believes it has reached. **Dispensing into a rack that has fallen short puts the dose beside the tube rather than in it. This has been observed on the assembled instrument, and it is the module's one known failure mode.** The present operating instruction is **to leave each lid standing rather than flat**; the remedies — reshaping the wall profile, which is chamfered at 45° on the built chassis, and a firmware check that compares the step count on the return home against the commanded outward travel — are taken up with the refinements owed to the prototype." Caption: "Left, in position 2: the lid is folded back to about **135°**, so it stands clear of the wall. Right, in position 3: the lid is pushed flat to **180°** and reaches the chamfered wall beside the lane, where it rubs as the rack moves."

**Takeaway, verbatim, with the unresolved editorial comment that sits inside it:**
> To preserve fluid path integrity, the alignment module indexes sample tubes beneath stationary nozzles. Driven by an overhead spur rack and pinion with ≤ 0.03 mm repeatability, the final two-axis 500 mm chassis integrates an automated input queue and a
> `% TO CONFIRM (student, 2026-09-11): the full five-rack, 40-tube unattended run is planned and expected to pass, but has not been run as of this date. The dye run of 2026-09-10 carried two racks. Confirm before hand-in --- OI-15.`
> motorless fishbone-cam ejector, **achieving unattended 40-tube batch processing** while serving as the instrument's structural foundation.

### G.2 Nozzle module (Ch. 8)

**What it does.** "the nozzle module governs fluidic delivery into the sample tubes. It positions **six blunt dispensing needles in a fixed linear array** above the sample transport rail, providing a dedicated fluid path for each onboard reagent. The primary functional requirement is **geometric placement rather than volumetric metering**: every dispensed droplet must land **within a 5 mm target radius when released from a dispensing height under 5 cm**. Between the needle tip and the liquid meniscus within the tube, the droplet is influenced solely by **gravity, inertia, and its own surface tension**."

**The hand-over.** "**Marius originally conceptualized and prototyped an initial version** of this module before handing it over for system integration. At the point of hand-over, the mechanical geometry was partially established, but **the mechanism was inoperative: the vibration motor generated insufficient imbalance to overcome mechanical resistance and shed pendant droplets.** Furthermore, **the inherited assembly lacked physical mounting interfaces** to integrate with the instrument chassis. **Both the mechanical redesign and the system integration fell within the scope of my work.**"
The principle was kept: "He experimentally validated this principle on a single needle carrying a pendant droplet before building the assembly. **I kept this vibration-detachment concept throughout the rebuild.** Given the project timeline, effort was best spent making this working principle functional and integrable rather than exploring an unproven mechanism from scratch."
The fatal-error framing: "A droplet that remains pinned to the needle tip represents **a fatal delivery error that cannot be compensated by the pump**, as the correctly metered volume never reaches the target tube."

**The CAD barrier.** "**Marius developed his models in OpenSCAD**, whereas I designed the instrument in Autodesk Fusion 360. Because OpenSCAD **exports geometry strictly as polygonal surface meshes (STLs)**, the files contained **no parametric features, sketches, or editable dimensions**. Opening the mesh in Fusion 360 yielded an **unmodifiable solid body**. Consequently, the module was **modeled from scratch in CAD, taking critical dimensions directly from physical calipers and bench measurements.** A similar toolchain barrier occurred with the reagent storage module."

**Two alternatives evaluated and rejected:**
1. **Cantilever vibrating strip** — "Needles were arranged along a thin, flexible plastic strip fixed at one end and oscillated by an eccentric motor, **analogous to a flicked ruler**. While this eliminates all sliding joints and mechanical guides, it was rejected on kinematic grounds. **A cantilever beam deflects through an arc rather than a pure linear translation**; consequently, the needle tip acquires a lateral velocity component, ejecting droplets at unpredictable release angles that violate the 5 mm landing radius requirement."
2. **Bare cannula direct insertion** — "the stainless steel cannula could be extracted from its plastic hub and inserted directly into the PVC pump tubing, **eliminating all fluidic fittings and wetted joints**. However, a bare cannula is a **fragile, slippery cylinder lacking mechanical locating features**; it requires active tool-clamping and precise manual insertion, contradicting the objective of toolless, low-maintenance field operation."

**Component trials** (§`sec:nozzle-trials`):
- **Retention and locating geometry.** Inherited: "a set screw bearing directly against the steel cannula within a V-groove channel. While this clamped the needle rigidly, it introduced severe operational flaws: **it required hand tools for every needle swap, and over-tightening the screw readily crushed the thin-walled cannula**, occluding the fluid bore or bending the tip." Fix: "**Across commercial needle assortments, the hub dimensions and Luer locking geometry remain identical, while only the internal cannula bore varies across gauges.** I 3D printed a test coupon featuring a cavity formed as **the negative imprint of the molded hub**. Dimensioned from caliper measurements of the hub, **the printed seat accepted the needle with an exact slip fit on the first print.** This geometry locates the needle purely through **passive kinematic constraint**: no fasteners or tools are required, eliminating mechanical stress on the cannula while enabling **instantaneous, toolless replacement**." Figure: **`fig:nozzle-seat`** (`Pictures/nozzle-blunt-needle-assortment`, `nozzle-seat-detail-top`, `nozzle-seat-detail-underside`).
- **Fluidic coupling.** "Mechanical retention and fluidic connection converge on the same physical feature: **the needle's molded hub serves simultaneously as the mounting seat and the female Luer fluidic port.** The hub connects to a standard **male Luer-to-barb adapter**. A short soft-walled junction tube connects this barb to the main PVC line running back through the peristaltic pump." Cost acknowledged: "While retaining the hub introduces **a single wetted fitting** into the delivery line — contrasting with the unbroken pump tube path — it provides a rugged, user-serviceable interface that untrained operators can disconnect and replace by hand." *(An OPEN ITEM comment still asks to confirm Luer lock vs slip, junction-tube step-down sizing and vendor part reference before submission — do not state these on stage.)*
- **Vibration drive.** "the inherited prototype failed to detach droplets because its eccentric mass consisted of **a small 3D-printed plastic arm**. On the bench, I replaced this plastic element with metallic mass: **a compact permanent magnet taped to the motor shaft, loaded with three steel nuts on the eccentric side.** Metal delivers significantly higher density, and offsetting the nuts increased the rotational moment arm, generating **an unbalanced momentum several times greater** than the original printed weight at equivalent rotational speeds." Actuator: "an **RD520PA 3 V brushed DC motor** operated from the instrument's **5 V bus via an IRF520 MOSFET driver**, with its **duty cycle capped at ≈ 60 % in firmware** to prevent overheating."

**Carrier and holder** (§`sec:nozzle-carrier`, `fig:nozzle-carrier`):
1. "**The nozzle carrier:** A rigid traveling carriage that houses the vibration motor cradle at one end and **aligns six hub seats in a linear array at the standard 22 mm pitch**."
2. "**The fixed holder:** A stationary mounting bracket that bolts to the rear wall of the alignment module chassis."
Coupling: "**vertical cylindrical guide posts** molded into its underside. These guide posts constrain carrier motion **strictly to the vertical axis**. This **1-DOF constraint** is essential to dispensing accuracy: while the eccentric mass generates omnidirectional radial forces, the linear guides absorb all lateral momentum, ensuring that the needles **translate purely up and down**." Explicit limit: "Constraining the carrier is **necessary for a droplet to leave vertically, but it is not sufficient**: whether the droplet itself departs without lateral velocity also depends on the tip fitted."

**Bench testing and the retaining bands** (§`sec:nozzle-retention`): "During initial dynamic testing of the assembled stage, the increased momentum from the metal eccentric weight introduced a new failure mode: **the intense vibration caused the carrier to walk upward along its guide posts until it disengaged completely from the holder.** Rigid mechanical fasteners could not be used, as clamping the carrier would eliminate the compliance necessary for vibration." Fix: "**two horizontal holes were drilled through the holder body, and two elastic bands were routed around the carrier.** The elastic bands **remain slack throughout the small working amplitude of the stroke, imposing zero damping on the active vibration cycle**, while **taking up tension at the travel limits** to prevent carrier escape. Unlike rigid fasteners or inextensible cords (which are either too loose to retain or too tight to permit motion), elastic bands provide **a nonlinear restoring force**."
Two remaining causes of binding, disclosed: (i) **eccentric offset** — "While the motor body sits along the carrier's centerline, the rotating eccentric mass (the magnet and nuts) is **offset to one side of the motor shaft**… the carrier experiences **a twisting moment alongside vertical oscillation**. This induces a slight tilt that causes it to bind on the guide posts"; the geometric fix is "aligning the rotating center of mass directly with the carrier centerline". (ii) **printed sliding surfaces** — "The **layer-line roughness of 3D-printed PLA causes intermittent stick-slip friction** along the guide posts, while the slender post geometry exhibits **slight bending compliance** under lateral eccentric loads. Both effects absorb a fraction of the vibrational kinetic energy", motivating "metal guide posts or machined bushings". And the closing comparison: "**a rough linear guide that delivers purely vertical acceleration is fundamentally preferable to a frictionless guide that scatters droplets laterally.**"

**The three-step sequence** (§`sec:nozzle-resulting`): **Fluid delivery** → **Vibrational pulse** ("The microcontroller energizes the eccentric brushed motor for a short burst; the rotating metal mass drives the carrier into high-frequency vertical oscillation") → **Inertial release** ("Downward acceleration overcomes droplet capillary pinning… The elastic retention bands arrest carrier overshoot without dampening the active stroke. **This step is conditional on the first: a tip that delivers a stream rather than a droplet leaves the burst with nothing to release**"). Three interfaces: mechanical (bolts to a reinforced boss on the alignment chassis rear wall), fluidic (six independent female Luer hubs), electrical (IRF520 MOSFET; "**because the brushed motor generates electromagnetic interference (EMI), suppressing its electrical noise required dedicated decoupling capacitors to protect the shared I²C bus**").

**Tip geometry and the dispensing regime** (§`sec:nozzle-evidence`, `tab:nozzle-tip-regimes`, short caption "Dispensing regime against tip bore", bolded lede **"Bore decides whether a droplet forms at all."**). **Five tip types, distilled water, on the assembled instrument** — four steel blunt needles from the assortment, named by hub colour, plus "a set of plastic biotech pipette tips".

| Tip | Bore | What leaves the tip | Vibration burst |
|---|---|---|---|
| 27 G steel, clear | **0.21 mm** | A fast stream; no droplet forms, and a small residue stays on the tip | **Nothing to act on** |
| 25 G steel, dark pink/red | **0.26 mm** | As above, indistinguishable | **Nothing to act on** |
| 22 G steel, blue | **0.41 mm** | A droplet forms and grows; most release, small ones often do not | **Releases, some scatter** |
| 21 G steel, violet | **0.51 mm** | As above, indistinguishable | **Releases, some scatter** |
| Plastic pipette tip | **not measured** | A droplet forms at every volume tried, comparable in size to the 22 G; small droplets release as readily as large | **Releases cleanly** |

Caption note: "The plastic tips **were not measured**, and their entry is **an inference from droplet size rather than a dimension**."
Boundary: "**Below roughly 0.26 mm** of bore the liquid leaves as a stream instead of accumulating. No droplet forms, a small residue remains on the tip, and no vibration burst moves it: the mechanism has nothing to act on. **Above roughly 0.41 mm** a droplet forms and grows as intended and the burst releases it. The boundary between the two regimes therefore lies between those bores, and it is **a property of the consumable rather than of the module**."
Plastic tips: "**The plastic tips performed best of the five.** No streaming appeared at any commanded volume, small droplets released as readily as large ones — **nine of ten across an assorted range** — and **no droplet was seen to leave sideways**. The steel needles in the dropping class release most droplets but not all, and **a few of those that do release miss the tube mouth and land on the rack**."
Hypothesis and its two uncontrolled variables: "A polymer surface wets less readily than steel, so it holds the droplet with less force and releases it sooner. **This remains a hypothesis, because two things were not controlled. The bore was not measured**… **And the tips were taped to the carrier rather than seated in it, so the tape may have damped the residual lateral motion** that makes the steel needles scatter. An untaped plastic tip of known bore would settle both, filmed at high speed."
Lower limit reached: "On the plastic tips a **5 µL dose formed a droplet and released it**, which is the volume at the bottom of the instrument's specified range. **Where a dose did stay on the tip, air in the line behind it was the cause rather than the volume**, which makes it a fluid-path question rather than a nozzle one."
What the machine ran on: "**The instrument was characterized and validated with 22 G needles on both channels**, which places the prototype in the dropping class. **That was the best of the tips available on a Luer seat, and it is not the best tip tried.** Tapered dispensing tips molded in **polypropylene with a Luer lock hub** are a stock consumable, offered across the same gauge range as the steel needles, so **one would seat in the existing socket with no change to the module at all. None was obtained within the project, and the taped tips of the trial are not a substitute for one.**" And: "**A finer cannula is not an alternative to it**: reducing the bore moves the tip toward the streaming regime, where the burst has nothing to release."

**Headline figure: `fig:nozzle-built`**, image `Pictures/nozzle-module-as-built`, short caption "The nozzle module as built" — "**Two channels are fitted, each with a 22 G needle** in its hub socket, joined through a Luer-to-barb adapter and a short soft junction tube to the line from the pump; **the four empty seats show the keyed slot**. The vibration motor sits in its cradle with the **tape-wrapped eccentric mass** on the shaft end and **ceramic suppression capacitors** at the motor. **An elastic retaining band passes over the carrier at the right, and two screws fix the holder to the chassis.**"

### G.3 User interface module (Ch. 9 + App-UI)

**Hardware envelope.** "a **3.2-inch resistive touchscreen (320 by 240 pixels)** managed by the same **dual-core ESP32-S3** microcontroller that sequences motor actuation." Detail: "≈ **125 dpi**, **16-bit RGB565 color depth (65 536 colors)**, **single-point resistive touch** sensing, and a backlight. Because resistive touch layers detect pressure rather than capacitance, the panel **registers discrete taps reliably but exhibits high friction and erratic coordinate tracking during continuous drag gestures**."
The design tension the chapter opens on: "Hardcoding a single protocol would make operation simple at the cost of clinical utility, while exposing all low-level parameters would create an error-prone dashboard. The system resolves this tension through **active guidance** — leading the operator through clear verification steps rather than requiring manual parameter setup."

**The inherited interface** (§`sec:ui-handover`, `fig:ui-v1-home`, image `Pictures/ui-v1-home`, short caption "The inherited home screen"): "an early graphical mockup. While the screens were drawn and responded to touch, **the underlying logic was largely unconnected to physical hardware**: only the SD memory card and the reagent storage module developed by Marius were electrically integrated. The home screen offered two primary navigation destinations, ***Volume Levels*** and ***Run***." The Run tile "executed a **simulated** protocol sequence that progressed on the display **without actuating motors**." Porting was easy: "The inherited code had been written for an earlier ESP32 development board; porting required **re-mapping display pin definitions** to the new pinout, while **the core graphical routines compiled cleanly**."
**The two flaws, verbatim headings:**
1. "**Navigation trap in calibration:** The sensor calibration flow omitted a cancel or back button during the measurement steps. An operator who entered calibration inadvertently, or encountered an unresponsive sensor, was **trapped in the flow and could only exit by power-cycling** the instrument."
2. "**Undersized touch targets:** Multiple interactive controls fell below standard touch-ergonomic baselines, with buttons reaching dimensions **down to 25 by 14 pixels** compared to the standard **44 × 44 pixel minimum** recommended for reliable fingertip activation."
Plus: "Beyond these specific defects, **the rest of the interface was simply unfinished**, reflecting an early prototype written before the pumps, the alignment module and the fluid path physically existed."
**Three reasons to redesign rather than extend:** "**Scope.** The inherited software addressed reagent storage alone, whereas a complete instrument demands end-to-end control"; "**Unmodeled machine workflows.** Operating the assembled dispenser introduced physical prerequisites absent from the inherited prototype: **axis referencing, line priming, multi-rack recipe mapping, and active fault handling**"; "**Target usability standard.**" What was kept: "**the underlying reagent storage logic, specifically the mathematical conversion of raw capacitive sensor counts into calibrated fluid levels.** The visual screens were rewritten from scratch after the porting was validated."

**The 240-pixel constraint** (§`sec:ui-constraints`): "a readable text line with adequate touch padding requires a **minimum row height of 50 to 60 pixels**. On a 240-pixel vertical canvas, a conventional list layout accommodates only **three visible rows** before overflowing. Consequently, the display cannot efficiently present dense tabular data or lengthy textual menus."
The answer, a **visual-first design strategy**: "**Physical component representations:** Abstract numbers are replaced with direct graphic representations of instrument hardware. Reagent bottles display dynamic liquid fill heights, sample racks render as 8-tube geometric arrays matching the physical pitch, and tube positions display proportional color-coded fluid bands." "**Persistent channel color indexing:** Six distinct qualitative colors identify the six reagent channels consistently across every screen." "**Rigorous contrast discipline:** **Color is never used as the sole indicator of system state**; every color-coded alert is paired with explicit textual status and iconography… ensuring a **minimum contrast ratio of ≥ 7:1** even after RGB565 color depth reduction."

**Self-auditing browser prototyping** (§`sec:ui-mockups`): candidates drawn "as web pages at the panel's exact **320 by 240 pixel native resolution**". Three advantages:
1. "**Self-auditing geometry:** each candidate was built from an explicit list of controls and their coordinates, so the page could **measure itself on every render** — the smallest touch target, any label long enough to be clipped, and the contrast of every piece of text against the colour actually drawn behind it. **Contrast was computed after the colours had been reduced to the panel's 16-bit depth**, and checked against the **7:1** ratio that international accessibility guidelines recommend for small text."
2. "**Complete interactive state exploration:** The entire screen graph was navigable."
3. "**Defects caught before implementation: the first palette failed its own contrast requirement at 6.2:1, one candidate carried three undersized controls, and a channel numeral placed directly on its saturated colour measured between 3.0:1 and 4.4:1. All were found and corrected in the browser, before any of them reached the device.**"
**Candidates:** "**Nine candidates were drawn and compared over three rounds**, and the field was kept deliberately wide." `fig:ui-round1` shows three of the first five: **Console** (`Pictures/ui-round1-console`), **Field** (`ui-round1-field`), **Machine state** (`ui-round1-machine-state`) — "**The third was shortlisted; the first two were not.**"
*(Note the two counts that coexist: §9.2 opens "The interface was developed across **five iterative design cycles**", and the printed `\livetool{Operator Interface Prototypes}` panel advertises "**All five rounds** of candidate screens". Three rounds is the candidate-comparison count.)*
Two decisions settled: "**ambient glare testing demonstrated that dark backgrounds suffer severe contrast loss under bright light**… A **light theme was therefore established as the default**, with an optional dark theme retained for dim environments"; and "card-based steps **without enforcing a rigid progression**. **An early prototype that locked users into a strict linear sequence was rejected** as overly restrictive for operators repeating familiar protocols."

**Stylus** (§`sec:ui-stylus`): "On this 3.2-inch panel a **44 pixel target is only about 8.9 mm** across — already below the fingertip minimum that every human-factors standard sets, and sizing every control to a genuinely finger-safe size would leave room for **only about three per column**. Rather than strip the interface back that far, the instrument ships with a **dedicated precision stylus, tethered to the display holder so that it cannot be lost**… the **1 mm stylus tip** enables effortless, accurate interaction with compact controls — such as individual tube positions on the 8-well rack selector and fine numeric steppers."

**Version history** — `tab:ui-version-evolution`, "Evolution of the user interface firmware… the four iterations from the inherited prototype (v1) to the final validated release (v2.2)":
- **v1** | Inherited hand-over | "Two-tile home screen; level monitoring for storage module only; unlinked motor flows; trapped calibration screen."
- **v2** | Comprehensive redesign | "A shared visual and state design across the whole screen set; plain everyday wording; levels reported as real volumes; built and walked against a simulated machine." Prose: "**around thirty screens** in the current build"; "***Fill tubing*** instead of *prime*, ***Reset position*** instead of *homing*, and ***Recipe*** instead of *Protocol*"; volumes quantised "to physical sensor steps (**1.0 mL on 40 mL bottles; 0.2 mL on 4 mL bottles**) **to ensure honest reporting**."
- **v2.1** | Usability feedback | "De-scrolled paged lists; consistent bottom-bar navigation; the overloaded word *tube* split into *line* and *tube*; bounded numeric inputs." Tested by "**two lab colleagues (Maria and Marius), neither of whom had seen this version before**". Three systematic weaknesses: navigation inconsistency; **terminological collision** — "the word *tube* was used for two different things — the liquid path from bottle to nozzle, and the 2 mL sample container in the rack — **a conflation the author could not catch alone, because he always knew which he meant**"; resistive-touch scrolling friction. Fix grounded in a survey: "**A review of eight commercial embedded medical devices revealed that small resistive panels universally avoid drag gestures in favor of discrete paging.** Consequently, all scrollable menus were replaced with **fixed 3-item paged lists**… and the overloaded *tube* was split into ***line*** (the liquid path — so *Fill tubing* became *Fill lines*) and ***tube*** (the sample container)."
- **v2.2** | Operational refinement | Table: "Redesigned **3-tile** home screen (*Run Recipe*, *Reagents*, *Settings*) with live system status banner and direct machine commissioning controls." **Prose disagrees with the table:** "Version 2.2 streamlined the top-level navigation into **two primary tiles, *Start a run* and *Recipes*, above a band showing the reagent levels**", and §`sec:ui-resulting` repeats the two-tile version — as do the device captures. **The deck's screens match the prose and the captures.** Also added: an on-machine commissioning menu for "rack pitch, feed travel, over-push and back-off margins… **saved to non-volatile memory at the machine rather than by tethering a laptop and reflashing**."

**The run, end to end** — **`fig:ui-run-flow`**, short caption "A dispensing run, end to end, on the panel". Six device captures in two rows of three: **`ui-v22-home-twopumps.png` → `ui-v22-picker.png` → `ui-v22-assign.png` → `ui-v22-check.png` → `ui-v22-run-move.png` → `ui-v22-done.png`.** Caption: "From *home* the operator chooses one or more recipes (*Which recipes?*), then places each into individual tube positions **across up to five racks** — **every drawn hole is the touch target**, and ALL/NONE fill or clear a whole rack at once. A pre-run check follows. The run then reports **the tube in progress, a live time-remaining and the rack counter**, with PAUSE and **a red on-screen STOP present throughout**; at the end **a summary is written to the card**."
All captures are "**captured directly from the instrument's panel over USB at its native 320 by 240 pixels and in the panel's own color, reproducing what the operator sees**", staged on the reference PANPOC protocol (App-UI header: "PANPOC Protocol 1: sixteen samples, two racks, recipe `Panpoc bind` = 5 µL IC-RNA + 300 µL ethanol + 50 µL beads").
Recipes (§`sec:ui-workflow`): "A recipe defines the volume of each liquid delivered into a single sample tube… previewing the selected recipe as a **2 mL tube filled with proportional color bands** for each liquid… the running total automatically **blocks SAVE if the cumulative volume exceeds the 2000 µL tube capacity**."

**The pre-run check** — **`fig:ui-check`**, short caption "The pre-run check blocking a start": "**a two-tier threshold: if a reagent falls short of the required volume, the start button is disabled and relabeled REFILL FIRST**; if the volume is sufficient but **within 10 % of the threshold**, it displays an **amber warning requiring operator confirmation** to start. Tapping the warning banner opens the corresponding bottle screen directly. The interface also displays **estimated runtime** and prompts the operator to prime any unfilled lines." Caption: "**the block holds from every page of the check**."

**The honesty rule** (§`sec:ui-honesty`, `fig:ui-honesty`): "**A rule the redesign holds to is that the interface never shows a value it cannot stand behind.** A liquid level is read through the bottle wall by a capacitive sensor; **where it cannot be read, the screen says so and shows no number**, rather than the flat '100 %' the inherited firmware showed and then let a run start on. **No state is carried by colour alone: every level and verdict also carries a word.** The one disclosed exception is the **battery indicator: its sensing circuit is designed but not fitted on this prototype, so the charge shown is a placeholder, not a measurement.**"

**Calibration** (`fig:ui-bottle`): "a **two-point guided sequence**: seat an empty container, then a full one, and the two readings set the channel's scale. **A live CANCEL on every screen** lets the operator abandon it at any point without restarting the machine — **closing the inherited firmware's trap**, whose calibration flow could be left only by a reboot."

**Settings and service panel** (§`sec:ui-settings`, `fig:ui-settings`): display theme (light default, dark optional), **five interface languages**, line-priming volumes, and entry to the diagnostic service panel. "**The *service panel* is the one screen held to a different standard than the rest.** Every operator screen is built to be learned in minutes and to withhold anything an untrained user could get wrong; **the service panel does the opposite**, giving a technician with the machine open complete manual control in one place. Across its pages it **doses any pump at a set volume or primes it, homes and jogs each alignment axis against a live position read-out, sets the rack pattern's distances and the steps-per-millimetre scale, fires a vibration burst, and shows the raw sensor counts, the enable-pin states and the calibration constants directly. It is what commissioned the machine**: the rack geometry the run depends on was measured at the bench and typed in here, not compiled in and reflashed. **A STOP is pinned on every page**, because unlike the old bench console this screen can turn a pump."

**Logging and safety.** "every run is logged to the SD card and reviewable on the instrument, displaying run outcome, duration, and tube count for each batch. **Since the prototype does not include a real-time clock, logged times are measured relative to system boot rather than wall-clock time and are explicitly labeled as such.**" E-stop (§`sec:ui-safety`): "**a dedicated physical emergency stop switch is planned for production enclosure revisions**; the current prototype relies on an on-screen abort routine… the stop control is **pinned to a persistent top-layer overlay active during any motion sequence. Actuation prioritizes safety by asserting the stepper driver disable lines directly before updating graphical state indicators.**"

**A live editorial flag inside §`sec:ui-resulting`** the builder should know about: a source comment dated 2026-09-15 says the section "is being rewritten as a figure-led OVERVIEW… **The provisional prose below predates the assembled machine and is inaccurate in places (internal-flash recipes, waste trays, animated transfer graphics, the requirements claims) — replace, do not extend.**" Nothing quoted in this pack comes from the flagged passages; all UI quotations above are from the retained figure captions and the surrounding rewritten prose.

---

## H. Contradictions — deck vs thesis

Ordered by severity. Deck text is quoted exactly from `parts/30-part2.html`; thesis text is quoted exactly.

---

### H-1 · S14 — three bars labelled "3.39" assert three measurements that do not exist · **HIGH**

**Deck** (`#s14-f4`):
```
<text class="dv s14-dl" x="175" y="290" text-anchor="middle">3.39</text>
<text class="dv s14-dl" x="355" y="290" text-anchor="middle">3.39</text>
<text class="dv s14-dl" x="535" y="290" text-anchor="middle">3.39</text>
<text class="dk" x="60" y="26">the same shortfall, weighing after weighing</text>
```
plus readout `#s14-ro3`: `<span class="sheet__label">µL weighed, three times</span>`.

**Thesis** (§`sec:pump-proto01-result`): "Read on the balance, the shimmed pump delivered `$678\,\mu\text{L}$` against a commanded `$1000\,\mu\text{L}$` across three replicates: `$3.39\,\mu\text{L}$` per stroke against the nominal `$5.0\,\mu\text{L}$`, a repeatable systematic shortfall with a **coefficient of variation (CV) of `$4.5\,\%$`**."

**The conflict.** 3.39 µL is **one** number, derived from the **mean** 678 µL (÷ 200 commanded strokes). The three weighings had **CV 4.5 %** — σ = ± 30.5 µL on 678 — so the three values were demonstrably different. Three equal 3.39 bars claim a spread of zero, which the thesis's own CV disproves. **The three individual weighings are not published anywhere:** exhaustive grep for `678`, `3.39`, `600.1`, `11.5` across all of `Chapters/` and `Backmatter/` returns only four narrative sentences (Ch. 6 ×2, Ch. 13 ×1, plus a Ch. 3 comment). App-B (Sidekick error compounding), App-D (test software; its only replicate data are syringe-pump traces) and App-J (concept record; syringe benchmark only) contain none of them. **Not in the thesis.** Replacements in §C.4.

---

### H-2 · S22 — "became 7.1:1" is a number the thesis never states · **HIGH (invented data)**

**Deck** (`#s22` JS): `count(tl, cr, 6.2, 7.1, 1, 5.7, 0.9);`
**Deck** (`#s22` notes): "a 6.2:1 palette was caught before it reached the device, **and became 7.1:1**."

**Thesis** (§`sec:ui-mockups`): "**the first palette failed its own contrast requirement at 6.2:1**, one candidate carried three undersized controls, and a channel numeral placed directly on its saturated colour measured between 3.0:1 and 4.4:1. **All were found and corrected in the browser**, before any of them reached the device." §`sec:ui-constraints`: "ensuring a **minimum contrast ratio of ≥ 7:1**".

**The conflict.** 6.2:1 confirmed. **7.1:1 appears nowhere** — `grep "7\.1:1"` across `Chapters/` and `Backmatter/` returns zero hits. The thesis states the *requirement* (≥ 7:1) and that the defect was corrected; it never publishes a corrected ratio. Animating 6.2 → 7.1 fabricates a measurement to one decimal place, on a slide whose whole subject is self-auditing rigour.
**Fix: animate 6.2 → 7.0 and present the 7.0 as the standard met, not as a measured result; or hold at 6.2 and draw the 7:1 threshold line it failed against.**

---

### H-3 · S19 — "40 tubes, unattended" carries an unresolved TO CONFIRM in the thesis · **HIGH**

**Deck** (`#s19`): `count(tl, q(el, '#s19-n'), 0, 40, 0, 6.9, 1.0);` with `<span class="s19-nu">tubes, unattended</span>`; note: "**Forty tubes**; and the chassis stopped being a module and became the frame of the instrument."

**Thesis** (Ch. 7 `\takeaway`, with this comment sitting inside the takeaway):
`% TO CONFIRM (student, 2026-09-11): the full five-rack, 40-tube unattended run is planned and expected to pass, but has not been run as of this date. The dye run of 2026-09-10 carried two racks. Confirm before hand-in --- OI-15.`
…followed by "…**achieving unattended 40-tube batch processing**".

**The conflict.** The printed sentence claims it; the author's own note says **the full 40-tube unattended run had not been run as of 2026-09-11, and the dye run carried two racks**. The body text supports only *capacity* ("A standard batch run **accommodates** five sample racks (40 tubes total)") and a repeat of the qualification protocols ("Both axes demonstrated reliable queue feeding, precision indexing, and automated ejection across repeated full batch sequences").
**Check OI-15 before the defense.** If still open: "the chassis **holds** forty tubes" / "five racks queue without a hand" — not "forty tubes, unattended" as a demonstrated result.

---

### H-4 · S19 — the deck asserts unattended running and omits the module's one known failure mode · **MEDIUM-HIGH (omission)**

**Deck** (`#s19` notes): "A second transverse axis pushes the next rack onto the lane, **so five racks run without a hand**." Nothing on S17–S19 mentions lid fouling.

**Thesis** (§`sec:alignment-final`, `fig:alignment-lid-fouling`): "**A lid pushed all the way open, lying flat… can reach the chamfered wall alongside the lane.** Contact there loads the rack with **a friction the drive cannot sense**… the motor completes its commanded steps, the rack lags behind them… **Dispensing into a rack that has fallen short puts the dose beside the tube rather than in it. This has been observed on the assembled instrument, and it is the module's one known failure mode. The present operating instruction is to leave each lid standing rather than flat.**"
And §`sec:alignment-bench`: "**That figure bounds the drive, not the rack**… the stage then reports a position it never reached."

**The conflict.** Not a wrong number — a missing one. The deck's 0.03 mm (S18) plus "five racks run without a hand" (S19) reads as a closed result, while the thesis explicitly qualifies 0.03 mm as a *drive-only* figure and names an observed failure on the assembled machine. An examiner who has read Ch. 7 will ask. **One line on S19 or in the notes closes it and turns a vulnerability into a strength.**

---

### H-5 · S11 — "in the order the liquid meets them" is the wrong order, and one stop is not in the fluid path · **MEDIUM**

**Deck** (`#s11`): `<p class="divider__sub">Five stops, in the order the liquid meets them.</p>`, strip reading **Pump → Alignment → Needle → Screen → Vial**; note: "From here the talk follows the liquid: pump, alignment, needle, screen, vial."

**Thesis** (Ch. 11 opening): "**Tracing the fluid path from vial to dispensing needle**…" §`sec:pump-integrated`: "each head now **aspirates from a container in the storage module** through a needle, a Luer hub, and a flexible sleeve, **delivering liquid through 450 mm of tubing to the nozzle**."

**The conflict.** The liquid's real order is **vial → pump → needle → the tube on the alignment rack**. The deck puts the **vial last** and the **screen fourth**; the screen is **not in the fluid path at all**, and the alignment module is where the liquid *arrives*, not something it passes through.
**Fix: either reorder (vial, pump, needle, tube) and treat the interface separately, or change the subtitle. "Five stops" is fine; "in the order the liquid meets them" is not.**

---

### H-6 · S11 and passim — the deck renames three of the four modules · **MEDIUM (Sirio's stated priority)**

**Deck** (`#s11` journey strip): `Pump` · `Alignment` · **`Needle`** · **`Screen`** · **`Vial`**. Slide titles vary it further: S20 "The **nozzle** was rebuilt", S22 "The inherited **screen**", S24 "The **reagent** waits in a sealed **vial**".

**Thesis** (`tab:module-functions`): **Pump · Alignment · Nozzle · Storage · User interface.** Chapter titles: **Pump Module · Alignment Module · Nozzle Module · User Interface Module.**

**The conflict.** "Needle" is a *component* of the nozzle module (the thesis uses "needle", "cannula", "tip" only for parts). "Screen" is the *panel*, not the module — "display", "panel", "touchscreen" are all hardware; the module is "user interface". "Vial" is the *glass container* inside the storage module, whose parts are cartridge, sleeve and needle holder.
**Fix: strip reads Pump · Alignment · Nozzle · Interface · Storage. Keep the friendly words for spoken narration if wanted.** For completeness: no variant of "HMI", "positioning module", "display module" or "screen module" exists anywhere in the thesis.

---

### H-7 · S12 — "two were built" collides with the thesis's 7/5/2 chain, where the two were DEFERRED · **MEDIUM**

**Deck** (`#s12` rail panel 2, and the notes): "**Seven passed, five were developed, two were built.**"

**Thesis** (§`sec:pump-ideation`): "**Seven concepts survived**… **Two** of those were **set aside soon afterwards as too demanding to build within the project**: a tube driven along its length by a traveling tourniquet, and a chamber gated so that liquid alternates with air. **We divided the remaining five between us and developed them separately.**" `tab:app-pump-shortlist`: "Five concepts advanced to physical prototyping; **two were deferred**."

**The conflict.** In the thesis the chain is **7 passed → 5 developed + 2 deferred**. The deck's phrasing makes the 2 a *subset of the 5* that were built. A true "two were built" fact does exist — "**Two distinct peristaltic concepts were developed into functional prototypes**" (§`sec:pump-peristaltic`) — but it is a different two, reached differently, and an examiner holding `tab:app-pump-shortlist` will hear a contradiction.
**Fix: "Seven passed, five were developed, two of those reached working hardware" — or "seven passed, two were set aside, five were developed, and two were built."**

---

### H-8 · S15 — the calibration-rings alt text says four rings of different diameters · **MEDIUM**

**Deck** (`#s15-f3`): `alt="Four calibration rings of different diameters laid out on the printer bed in the slicer."`

**Thesis** (App-C §`sec:app-ring-artifact`): "The test coupon consists of **three concentric, mechanically unconnected rings**… **Three diameters span the functional operating envelope (22–88 mm)**, with the **intermediate ring (37 mm bore / 43 mm outer diameter) printed in triplicate**."

**The conflict.** Neither four, nor four *different* diameters. Verified against the image itself (`Pictures/proto-calibration-rings.png`): **five ring bodies on the plate — two mid rings at the left, and a large / mid / small set nested at the right — in three nominal sizes (22/28, 37/43, 82/88 mm).** The triplicate is the whole point of the coupon: it is what measures print-to-print repeatability, the 0.03–0.05 mm floor that the ± 0.10 mm figure rests on.
**Fix: "Five calibration rings in three sizes, the middle one printed three times, laid out on the printer bed in the slicer."**

---

### H-9 · S16 — "0.25–0.34 %, the pump, over 76 replicates" attaches a 180-rpm-only figure to the whole campaign · **MEDIUM**

**Deck** (`#s16` ledger cell 1): `<div class="ledger__v">0.25–0.34 %</div><div class="ledger__k">the pump, over 76 replicates</div>`; note: "The pump sits at **0.25 to 0.34 % across 76 replicates**, so it repeats as well as a hand."

**Thesis** (§`sec:pump-results`): "**At 180 rpm**, the pump achieved a coefficient of variation (CV) of **0.25 % at 100 strokes and 0.34 % at 300 strokes**… and **it repeats best near the middle of the swept speed range**." §`sec:pump-campaign-design`: "a total of **76 replicates**" across **three stroke counts × four rotor speeds (60, 120, 180, 240 rpm)**.

**The conflict.** 0.25–0.34 % is the CV **at 180 rpm only**. The 76 replicates span all four speeds, where the CV is worse — **the deck's own chart, two inches to the left of that ledger cell, draws points up to ≈ 0.81 % at 60 rpm / 300 strokes.** The slide contradicts itself.
**Fix: "0.25–0.34 % at the 180 rpm operating point" (and, if 76 is wanted: "76 replicates across four speeds").**

---

### H-10 · S13 — "the largest with torque to spare at 12 V" overstates the torque table · **LOW-MEDIUM**

**Deck** (`#s13` notes): "Four rollers is the smallest count that never leaves the tube open, **and the largest with torque to spare at 12 V**."

**Thesis** (App-K `tab:app-pump-fos`): **N = 4 → FoS 2.03, "Adequate"; N = 5 → FoS 1.62, "Tight"; N = 6 → FoS 0.90, "Stalls at 12 V".** Legend: "A factor of safety **below 1.0 indicates motor stalling; between 1.0 and 2.0 represents marginal operation**." Text: "**configurations with six or more rollers stall** under 12 V operation."

**The conflict.** Five rollers do **not** stall at 12 V; they run marginally (FoS 1.62). Four is the largest with FoS ≥ 2, and the **smallest** that seals continuously — which is the argument the thesis actually rests on: "A four-roller rotor represents the **smallest configuration that guarantees continuous, valveless occlusion**, minimizing frictional drag and power consumption."
**Fix: "…and the last one with a safety factor above two at 12 V" — or drop the second clause entirely; the sealing argument is the load-bearing one.**

---

### H-11 · S21 — the plastic tip's bore is given as "tapered"; the thesis records "not measured" · **LOW-MEDIUM**

**Deck** (`#s21-bores`, bore 4): `<span class="bore__k">plastic</span><span class="bore__v">tapered</span><span class="bore__x">nine of ten, never sideways</span>`

**Thesis** (`tab:nozzle-tip-regimes`): the row reads "**Plastic pipette tip | not measured |** A droplet forms at every volume tried…", and the caption states "**The plastic tips were not measured, and their entry is an inference from droplet size rather than a dimension.**" §`sec:nozzle-evidence`: "**The plastic tips' bore was not measured**… This remains a hypothesis, because two things were not controlled. The bore was not measured… And **the tips were taped to the carrier rather than seated in it, so the tape may have damped the residual lateral motion** that makes the steel needles scatter."

**The conflict.** "Tapered" is the geometry of the **recommended future consumable** — "**Tapered dispensing tips molded in polypropylene with a Luer lock hub** are a stock consumable… **None was obtained within the project, and the taped tips of the trial are not a substitute for one**" — not a recorded property of the tips actually tested. Putting "tapered" in the *bore* column implies a measured dimension where the thesis explicitly declines to give one, **and silently merges the tested pipette tip with the untested recommended tip**.
**Fix: put "not measured" in the bore column. The "nine of ten, never sideways" result is fully supported and can stay** — one clause about the taping caveat would be worth it if the result is quoted aloud.

---

### H-12 · S13 — the Tensioned Tube Path is shown as a published tool alongside two that the thesis actually publishes · **LOW**

**Deck** (`#s13-c3`): a `tool-card` for "Tensioned Tube Path" linked to `../../tools/peristaltic-tensioned-path-model/index.html`, styled identically to the other two.

**Thesis.** `\livetool{}` panels — the thesis's mechanism for publishing a tool with a printed address — exist for **`tool:rotor-solver`** and **`tool:occlusion-model`** (and elsewhere for the UI prototypes, the architecture explorer and the throughput simulator). **There is no `\livetool` panel for the tensioned-path model** (verified: grep for `livetool` returns seven hits, none of them this tool). It appears only as App-K §`sec:app-tensioned-path`, a secondary geometric model. §`sec:pump-rotor-geometry` says of the *other two*: "**Both tools are published and remain interactive**; the panels in this chapter link to them directly."

**The conflict.** Mild, but the slide's premise is "**three tools set it**", and the thesis's account is that **two published tools** set the design point and a third model bounded a secondary effect at 1–2 %.
**Fix: "two published tools and one supporting model", or "three models, two of them published".** The card's own line — "A taut tube moves the dose by at most 2 %" — is correct: "The two geometries differ by only **one to two percent** in delivered volume across the operating arc."

---

### H-13 · S14 — "32 per cent short, every time" is a deck-computed figure · **LOW**

**Deck** (`#s14` JS): `count(tl, q(el, '#s14-n4'), 0, 32, 0, 8.7, 1.2);` with label `per cent short, every time`.

**Thesis.** 1 − 3.39/5.00 = 32.2 %, arithmetically. **But no proto-01 percentage is printed anywhere.** The thesis's only headline shortfall percentage is for the qualified v2.3: "sitting **9.4 % below the nominal 5.0 µL target**". "Every time" also re-asserts the zero spread of H-1, when the measured CV was 4.5 %.

**Fix.** Drop the percentage and let "3.39 of a nominal 5.00" carry it, or label it as derived. If it stays, replace "every time" — the thesis's phrase is "**a repeatable systematic shortfall**", a claim about direction and cause, not about identical values.

---

### H-14 · S22 — "in an afternoon" adds a duration the thesis does not give · **LOW**

**Deck** (`#s22` notes): "**Two colleagues found in an afternoon** that tube meant two things; it became line and tube."

**Thesis** (§`sec:ui-evolution`): "the interface was tested by **two lab colleagues (Maria and Marius), neither of whom had seen this version before**, to gather practical feedback on usability and workflow clarity." No session duration appears anywhere in Ch. 9 or App-UI. **Not in the thesis.** Two colleagues ✔, the *tube* collision ✔, the split into *line* and *tube* ✔; "in an afternoon" is invented colour — harmless on stage, but exactly the sort of detail a committee asks to see sourced.

---

### H-15 · S22 — "three rounds" is true but is not the count the printed tool page advertises · **LOW**

**Deck** (`#s22` notes): "**Nine candidates over three rounds**, each page auditing itself."

**Thesis.** §`sec:ui-mockups`: "**Nine candidates were drawn and compared over three rounds**" ✔. But §`sec:ui-design-and-iteration` opens "The interface was developed across **five iterative design cycles**", and the printed `\livetool{Operator Interface Prototypes}` panel — whose address is frozen in the thesis — advertises "**All five rounds of candidate screens**". The published page is built as five rounds in two arcs.

**The conflict.** Not wrong, but if the QR leads to a page headed "five rounds" while the speaker said "three rounds", the mismatch invites a question.
**Fix: "nine candidates over three rounds of comparison, five design cycles in all."**

---

### H-16 · S12 — "0 machine parts touch the liquid" is true of the pump and not of the instrument · **LOW**

**Deck** (`#s12-ro3`): `<span class="sheet__num">0</span><span class="sheet__label">machine parts touch the liquid</span>`

**Thesis** (§`sec:pump-resulting-design`): "A single, continuous length of flexible tubing runs from the reagent reservoir, across the pump track, and on to the dispense nozzle, **so no valve, fitting or joint is wetted anywhere in the module. The one coupling in the path sits at the tip, where the needle is joined.**" Ch. 8 `\takeaway`: "This interface adds only **a single wetted Luer fitting** to the fluid path." Ch. 11: the machine aspirates "**through a needle, a Luer hub, and a flexible sleeve**" from the storage module.

**The conflict.** Scoped to the pump module and to the three-way comparison on the slide, the zero is right. Stated bare as an instrument-level fact it is not — and **S20 and S24 both go on to show exactly those fittings**, so the bare "0" sets up a contradiction inside the deck itself.
**Fix: "machine parts in the pump touch the liquid", or "moving parts touch the liquid" — the latter holds everywhere.**

---

### H-17 · S12 — "the wetted boundary decided it" is exact for the displacement pumps and a simplification for the final · **LOW**

**Deck** (`#s12` notes): "**Accuracy did not decide it: the wetted boundary did.** A syringe and a diaphragm wet the machine, and there is no sink at a border post."

**Thesis.** For the displacement family, exact: "**Accuracy was therefore not what ruled the syringe pump out**"; "**Cleanability and fluid isolation ultimately eliminate all three displacement architectures.**" For rotary vs linear, three reasons: "the rotary peristaltic architecture was selected because it **eliminated check valves entirely, occupied a smaller footprint, and avoided the thirty-minute batch throughput penalty**", and `tab:app-pump-comparison`'s caption attributes the win to "**footprint, mass, and cleanability**", with App-J breaking out "footprint, mass, and cleanability contributing **380** points" of the 610 gained.

**The conflict.** The slide places the 3485–3185 score and the wetted-boundary figure side by side, which reads as "the wetted boundary produced that margin". It did not, on its own.
**Fix (notes only): "the wetted boundary threw out the syringe and the diaphragm; between the two peristaltics it was cleanliness, footprint and mass."**

---

### H-18 · S15 — 1.52 mm is presented as the target throughout; the design nominal is 1.62 mm · **LOW**

**Deck** (`#s15`): readout 4 counts to `1.52`; three callouts read `1.52`; note "A housing drawn at 1.52 mm printed at 1.75".

**Thesis.** App-K `tab:app-pump-design-point`: "**Printed gap G = 2w − δ | 1.62 | mm**". `fig:pump-head-gap`: "The housing shown has an embossed label of **1.52 mm**, part of a test set printed to evaluate gaps around the **nominal 1.62 mm target**." §`sec:pump-v22`: three variants planned at **1.52, 1.62, 1.72 mm**, the tightest printed first. §`sec:pump-gap` summary: "…at a **nominal gap of 1.52 mm**". §`sec:pump-v23`: v2.3 read "exactly **1.52 mm**".

**The conflict.** The thesis is internally inconsistent (§6.2.4 calls 1.52 "nominal"; App-K computes 1.62). **The deck's use of 1.52 is correct** — it is the built, measured and later-vindicated value ("supports the 1.52 mm gap adopted in `sec:pump-v23`", §`sec:pump-integrated`).
**Just don't call it "the nominal gap" aloud.** Say "the gap it was built to", or "1.52, the tightest of the three variants". If pressed: design nominal 1.62 (20 % interference on a 1.82 mm wall stack), built at 1.52, and the integrated-head comparison later justified it.

---

### H-19 · S16 — the pipette benchmark is drawn without its sample size or its "cumulative" qualifier · **LOW**

**Deck** (`#s16`): `<text class="pip-t">manual pipette, 0.27 %</text>`; ledger cell 0 "0.27 % — a hand with a pipette, same balance".

**Thesis** (§`sec:pump-results`): "manual laboratory pipetting of **ten 50 µL replicates** on the same balance yielded a CV of **0.27 %**." `fig:pump-precision` caption: "the benchmark repeatability of a manual laboratory micropipette delivering **ten 50 µL replicates (0.27 % CV)** on the same balance." And the claim itself is qualified: "**For cumulative dispensing volumes**, the peristaltic module matches the repeatability of a standard manual micropipette."

**The conflict.** Not contradiction — an omission that weakens the comparison and invites a hostile question. The pump's 0.25–0.34 % is over **cumulative** 100- and 300-stroke deliveries (≈ 450 and 1350 µL); the pipette's 0.27 % is over **ten single 50 µL** deliveries. The single-stroke picture is much weaker and the thesis says so: "Extrapolating multi-stroke variance estimates **an upper bound of ≈ 6 % CV for single strokes**", bounded by evaporation (**0.118 mg/s** on a **4.6 mg** droplet) and by the 0.1 mg balance readability quantising a 5 µL dispense "into **fewer than 50 discrete counts**".
**Fix: add "ten × 50 µL" to the pipette label, and keep "cumulative" in the spoken claim.**

---

### H-20 · S14 — the "zero flow" line floats above the x-axis · **LOW (already identified; evidence recorded)**

**Deck** (`#s14-f2`): axis baseline `M 62 276 L 688 276`; `#s14-zero` dashed at `y=192.8` labelled "zero flow"; `#s14-mean` at `y=139.8`. The drawn trace does dip below the zero line (samples at `y=235`, `y=239`), so the picture is technically honest — but the x-axis at 276 is an unlabelled floor **below** zero, which reads as "nothing goes negative".

**Thesis.** §`sec:pump-flow-sensor`: "with **apparent reverse flow on one sample in seven and rapid sign changes**." App-D §`sec:app-ts-trace`: replicates are screened for "**backflow excursions below baseline**". §`sec:pump-flow-sensor` close: traces kept for "priming, ripple and **backflow**".

**Answer to the rebuild question: put zero on the x-axis — the signal genuinely crosses it.** The frequency is quotable (**one sample in seven**). **The depth is not in the thesis** — no figure, table or sentence gives the magnitude of the negative excursions. The defensible way to make them read is the ±1σ band: **σ = 1159 µL/min about a mean of 1104**, so one standard deviation below the mean sits **≈ 55 µL/min below zero**. That is a published pair of numbers, not an invented trough.

---

### H-21 · Verified with no conflict — do not re-check these

- **S12:** "Thirty mechanisms in six families, some of them deliberately absurd" ✔ (six families named in §`sec:pump-ideation` and `tab:app-pump-families`; "a piano hammer shaking droplets from a vibrating string, a tattoo machine piercing a membrane" ✔ — "on the principle that an ideation returning only workable ideas has not searched far enough"). "3485 against 3185" ✔. The `fig-pump-principles` image and its three panels ✔; "machine wetted / machine wetted / tube only" ✔.
- **S13:** 0.51 mm ✔ · 0.91 mm ✔ · 4 rollers ✔ · 5 µL ✔ · 19.70 mm ✔ · "15.6 to 19.70 mm" ✔ · "at most 2 %" ✔ · "These were built while the decisions were open, not written up afterwards" ✔ ("Both were built as working instruments while the decisions were still open").
- **S14:** rotor 17.70 vs 19.70 ✔ · gap drawn 1.75 mm ✔ · mean 1104 ✔ · SD 1159 ✔ · reverse flow once in seven ✔ · flow 600.1 µL / CV 17.6 % / five replicates ✔ · balance 678.0 µL / CV 4.5 % / three weighings ✔ · "the balance is the reference" ✔ · "The parts were wrong, not the motor" ✔ · "Closed-loop control was dropped here" ✔ ("Without a sensor that could resolve a single delivery, active closed-loop control was set aside for subsequent prototypes").
- **S15:** 0.45 mm ✔ · 2.22 mm apex vs 1.82 mm closure ✔ · 0.085 mm peg taper ✔ · 0.6° roller tilt ✔ · one bearing on the wide base ✔ · outer 0.65 % / inner 0.14 mm ✔ · ± 0.10 mm ✔ · 1.52 mm at three slots ✔ · "a housing drawn at 1.52 printed at 1.75" ✔ · "CAD dimensions are assumptions until anchored to a physical datum" ✔.
- **S16:** 4.53 µL ✔ · 9.4 % under nominal ✔ · 76 replicates ✔ · 3.94 and 4.10 µL from two heads off the same files ✔ · the chart's 180 rpm points (0.24 and 0.33 read off the drawn geometry against thesis 0.25 and 0.34) ✔ · pipette line at 0.26–0.27 ✔.
- **S17:** "Fifty ideas with Marius, ten survived" ✔ · 22 mm ✔ · 154 mm of travel (7 × 22) ✔ · "room for a cap opener… measured off Pulkit's prototype" ✔ · "eight because biology counts in eights" ✔ · "the rack is the progress bar" ✔ · "still nozzles mean tubing that never bends" ✔ · grippers / ball carriages / a drive under the spills all three rejected ✔ · "push, never grip · clean first, build second" ✔.
- **S18:** v1 rack-and-pinion indexes 22 mm repeatably ✔ · v2 drive above the samples, protected by gravity ✔ · "a seal is a wearing part that must itself be cleaned" ✔ (verbatim in Ch. 7) · v2.1 normally-closed switch, three-pass home, 0.03 mm ✔ · no step loss over 132 mm ✔ · homing 110 s → 22 s ✔ · 140 mm delivered against 154 mm needed ✔.
- **S19:** input queue four racks + one preloaded ✔ · a second transverse axis feeds the lane ✔ · passive ejection, two ribs, two grooves, a final 22 mm ✔ · "no auxiliary actuators" ✔ · the chassis as the frame of the instrument ✔.
- **S20:** "too weak to shake a droplet off / nothing to bolt it to / a file that could not be edited" ✔ (all three verbatim faults) · six seats at 22 mm ✔ · a magnet and three steel nuts ✔ · "stop clamping the steel, start indexing the plastic" ✔ · slip fit on the first print, any gauge ✔ · one degree of freedom ✔ · two bands slack in the stroke, biting at the limits ✔ · "the carrier then walked off its posts" ✔.
- **S21:** 27 G 0.21 / 25 G 0.26 / 22 G 0.41 / 21 G 0.51 ✔ · stream / stream / droplet / droplet ✔ · "nine of ten, never sideways" ✔ · "the machine still ran on 22 G steel" ✔ · "the only thing changed is the bore" ✔ · water ✔ ("distilled water").
- **S22:** 25 × 14 px inherited ✔ · 44 × 44 px standard, 8.9 mm on this panel ✔ · "a calibration screen you could only leave by power-cycling" ✔ · "a 240-pixel canvas fits three list rows" ✔ · "the interface stopped being a list and became a picture of the machine" ✔ · each page auditing itself ✔ · *tube* → *line* and *tube* ✔ · the three round-one candidates and which was shortlisted ✔.
- **S23:** the six screens and their order ✔ (`fig:ui-run-flow`) · the check compares need against holdings and renames Start to Refill first ✔ · "The interface never shows a number it cannot stand behind" ✔ (verbatim).
- **S24:** inverted sealed vial with a reclosing septum ✔ · copper tape on the interior faces as the capacitive electrode ✔ · within 5 % ✔ (attributed in the thesis to Marius) · two spring-loaded probe pins carrying the signal across cap-height variation ✔ · two needles, one liquid one air ✔ · 0.22 µm filter, "fine enough to retain microorganisms, so the incoming air is effectively sterile" ✔ · "It arrived as a mesh, not a model, and that shaped the integration" ✔ · **"Designed and built by Marius Schiller" ✔ — correctly and prominently credited.**

Two small additions S24 could carry if there is room, both from Ch. 11: **"Only the 4 mL cartridge variant was fabricated for this prototype"**, and the lingering consequence of the mesh hand-over — "**the cartridge has no positive retention holding its electrode against the probe pins in the sleeve.** Marius identified a click-in catch as the permanent resolution and **rested a weight on top of the cartridge in its place**, and redrawing the parts to add such a catch was not possible without their source geometry. **In the assembled instrument the weight proved unnecessary, and the prototype runs without it.**"

---

## Figure and label index for Part II

**Ch. 6 / pump:** `fig:pump-principles` (`Pictures/fig-pump-principles`) · `fig:pump-parts` (`fig-pump-parts`) · `fig:rotor-geometry` (`fig-rotor-geometry`) · `fig:occlusion-crosssection` with `fig:occlusion-across` (`tool-occlusion-crosssection`) and `fig:occlusion-along` (`fig-roller-footprint`) · `fig:pump-head-gap` (`fig-pump-head-gap`) · `fig:proto01-built` (`proto01-built`) · **`fig:proto01-bench` (`proto01-bench.jpg`)** · `fig:flow-oscillation` (`fig-flow-oscillation`) · `fig:v21-gap` (`fig-v21-gap-around-arc`) · `fig:roller-peg` (`fig-roller-peg-taper`) · `fig:pump-v23` (`pump-v23-render`) · `fig:gravimetric-setup` (`gravimetric-setup`) · `fig:pump-accuracy` (`fig-pump-accuracy`) · `fig:pump-precision` (`fig-pump-precision`) · `tab:pump-two-heads`
Section labels: `sec:pump-concept` · `sec:pump-ideation` · `sec:pump-displacement` · `sec:pump-peristaltic` · `sec:pump-design` · `sec:pump-intent` · `sec:pump-rotor-geometry` · `sec:pump-occlusion-model` · `sec:pump-gap` · `sec:pump-prototypes` · `sec:pump-proto01` · **`sec:pump-flow-sensor`** · **`sec:pump-proto01-result`** · `sec:pump-v21` · `sec:pump-v22` · `sec:pump-v23` · `sec:pump-characterization` · `sec:pump-gravimetry` · `sec:pump-campaign-design` · `sec:pump-results` · `sec:pump-resulting-design` · `sec:pump-integrated`

**Ch. 3 / App-C / printer:** `sec:physical-prototyping` (**Ch. 3 §3.3 — there is no `sec:pump-print`**) · `fig:print-compensation` (`fig-print-compensation`) · `app:printer-calibration` · `fig:app-shrink-bars` (`proto-shrink-bars`) · `fig:app-ring-artifact` (`proto-calibration-rings`) · **`fig:printer-calibration` (`fig-printer-calibration`) — the result plot, unused by the deck** · `tab:ring-artifact` · `eq:cal-ext-forward` · `eq:cal-int-forward` · `eq:cal-ext-inverse` · `eq:cal-int-inverse`

**App-J / concepts:** `tab:app-pump-families` · `tab:app-pump-shortlist` · `tab:app-syringe-conditions` · `tab:app-pump-comparison` · `fig:app-pump-sketches` with `fig:sketch-discrete-peristaltic`, `fig:sketch-fixed-height`, `fig:app-perry-pump` · `fig:app-syringe-category-score` · `fig:app-syringe-accuracy-cv`

**App-K / models:** `tab:app-pump-design-point` · `tab:app-pump-fos` · `tab:app-pump-feasibility` · `tab:app-occlusion-constants` · `eq:app-gap` · `eq:app-contact-length` · `eq:app-arc-compensation` · `eq:app-rotor-radius` · `sec:app-tensioned-path` · `tab:app-path-comparison`

**App-D / test system:** `sec:app-ts-actuation` · `sec:app-ts-campaign` · `sec:app-ts-flow` · `sec:app-ts-trace` · `fig:app-flow-clean` · `fig:app-flow-flagged` · `sec:app-ts-gravimetric` · `fig:app-grav-percell` · `fig:app-grav-calibration`

**Ch. 7 / App-L / alignment:** `fig:alignment-rack` (`alignment-rack-final`) · `fig:alignment-rack-seat` · `fig:alignment-v1` (`alignment-v1-stage`) · `fig:alignment-v21` (`alignment-v21-homing`) · `tab:alignment-bench-results` · `fig:alignment-v3-layout` (`alignment-v3-top-annotated`, `alignment-v3-iso`) · `fig:alignment-pushers` · **`fig:alignment-lid-fouling`** · `fig:alignment-rack-ribs` · `fig:alignment-v3-bottom` · `fig:alignment-motor-holder` · `fig:alignment-v3-left-end` · `fig:alignment-markings` · `tab:app-alignment-shortlist` · `fig:app-alignment-sheet-1`…`-6` · `tab:app-alignment-bench` · `eq:alignment-resolution-derivation` · `sec:app-alignment-debt`

**Ch. 8 / nozzle:** `fig:nozzle-seat` (`nozzle-blunt-needle-assortment`, `nozzle-seat-detail-top`, `nozzle-seat-detail-underside`) · `fig:nozzle-carrier` · `fig:nozzle-built` (`nozzle-module-as-built`) · `tab:nozzle-tip-regimes` · `sec:nozzle-handover` · `sec:nozzle-trials` · `sec:nozzle-carrier` · `sec:nozzle-retention` · `sec:nozzle-evidence`

**Ch. 9 / App-UI / interface:** `fig:ui-v1-home` (`ui-v1-home`) · `fig:ui-round1` (`ui-round1-console`, `ui-round1-field`, `ui-round1-machine-state`) · `tab:ui-version-evolution` · `fig:ui-run-flow` · `fig:ui-recipe` · `fig:ui-check` · `fig:ui-honesty` · `fig:ui-bottle` · `fig:ui-settings` · `tool:ui-prototypes` · `app:ui-manual`

**Ch. 5 / Ch. 11 / storage:** `tab:module-functions` · `sec:storage-module` · `fig:storage-parts` (`storage-cartridge`, `storage-sleeve`, `storage-needle-holder`)
