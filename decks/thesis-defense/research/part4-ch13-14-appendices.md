# DEFENSE-PRESENTATION SOURCE PACK

Read in full: `Chapters/13_Discussion-and-Reflection.tex`, `Chapters/14_Conclusion.tex`, `Chapters/12_System-Level-Validation.tex` (needed — it holds the requirement verdict table that Ch. 13 and 14 only cite), `Backmatter/App-A/B/D/I/J/K/L/N/Q`. Skimmed: `App-C`, `App-H`, `App-UI-Operator-Manual`. Also pulled the objectives list from `Chapters/01_Introduction.tex` §1.3 and the two-head calibration table from `Chapters/06_Pump-Module.tex`, because the Conclusion and Discussion both answer to them.

Root path for everything below: `D:\03. DTU - Offline\03. MASTER THESIS\01. Thesis Document LaTex\latex\`

---
---

# 1. CONCLUSION CHAPTER (`Chapters/14_Conclusion.tex`)

The chapter is short by design — the file carries the author's own ruling: *"under 1.5 pp; the takeaway of the whole thesis, answering Chapter 1 rather than repeating Chapter 13; voice 'I'; no tables, no outlook, no \takeaway{}; close on the airport passenger of §1.1, honestly future."* It is four paragraphs and nothing else.

## 1a. VERBATIM — the closing passage that returns to the airport scene

This is the entire final paragraph, exactly as written (the whole passage, for the final slide):

> Returning, finally, to the traveler in the arrivals hall: today, their swab must still travel to a central laboratory. This thesis shows that sample preparation does not have to. A portable instrument can dispense liquids precisely and unattended. Before it can stand at an airport gate, it must be rebuilt from matured modules, tested on real reagents with real users, and paired with a reader that delivers the final diagnostic result. Whether that traveler can one day be tested and cleared before leaving the terminal remains an open question, but it is no longer one that only a central laboratory can answer.

**Also verbatim, the opening two paragraphs** — useful as the opening slide of the talk, because they restate the problem in one breath:

> Diagnostic tests have begun to leave the central laboratory, but sample preparation has not followed. While a molecular test can run at an airport gate, the patient swab is still prepared by hand at a bench by a trained operator. This thesis asked whether precise liquid dispensing---the core task of sample preparation---can also leave the laboratory in an instrument that is portable, runs unattended, and is not tied to a single protocol.

> The answer is that it can, in principle. A portable dispenser built from 3D-printed and off-the-shelf parts was comparable to a manual pipette in precision, delivered target volumes accurately once calibrated on the instrument, and dispensed into forty tubes without intervention. The concept is proven, but the instrument is not yet ready for field use.

## 1b. Stated contributions

**Important caveat for slide-writing:** the thesis has **no explicitly labelled "Contributions" list**. `grep -rn "ontribution"` across all chapters returns only two hits, neither of them a contributions statement. What exists is (i) the six objectives declared in §1.3 (`sec:objectives`), which the Conclusion says "were each addressed", and (ii) the Conclusion's own third paragraph, which is the de-facto contributions statement. Both are given below in the thesis's own words.

**(i) The six objectives, verbatim from §1.3 — "The thesis sets out to:"**

1. Derive the requirements for portable liquid dispensing from sample-preparation protocols and field operating conditions, translating them into a modular architecture;
2. Design and build a functional prototype from off-the-shelf components and 3D-printed parts, dispensing 5 to 1000 µL across up to six liquids into several tens of standard tubes;
3. Investigate how the design scales across volumes, reagent channels, and sample capacity, and identify the resulting trade-offs in system complexity;
4. Characterize the accuracy and precision of the prototype against manual pipetting on the reference PANPOC protocol, using a defined measurement procedure;
5. Assess the completed system against the derived requirements, identifying which targets were met, partly met, or missed, and what the fabrication route contributed to that outcome;
6. Identify the technical and operational developments needed before the device can be deployed and validated in the field.

**(ii) The Conclusion's own contributions paragraph, verbatim** — this is the paragraph to put on a "what this work contributes" slide:

> Building the modules and integrating them into the final prototype presented a substantial challenge, especially without a formal background in design or engineering. The project required developing the electronics, writing the firmware, and bringing every module under a single microcontroller so that the peristaltic pumps, the alignment module, the nozzle module, and the user interface operated as a single system. While system integration proved to be the most demanding hurdle, the resulting machine has proven functional, although with some limitations. In the process, the 3D-printed peristaltic pump was engineered to determine its dose directly from its geometry, the 3D printer was characterized until compensation rules predicted printed diameters to within a fraction of a millimeter, and the models behind these decisions were published as interactive tools.

Distilled to three claims (the thesis's phrasing, compressed):
- The pump **determines its dose directly from its geometry** — dose is designed, not calibrated-in.
- The printer was characterized until **compensation rules predicted printed diameters to within a fraction of a millimeter**.
- The design models behind those decisions were **published as interactive tools** (open-access site).

**The Conclusion's own honest limit on the objectives, verbatim:**
> The objectives in §1.3 were each addressed, though those requiring a complete instrument and the real protocol were met only in part: two of the six reagent channels were built, and every test used water or dye rather than the actual reagents of the PANPOC protocol.

## 1c. FINAL VERDICT ON EACH REQUIREMENT

The verdict table is **not in the Conclusion** — it is `tab:validation-verdict` in Ch. 12, §12.1 (`Chapters/12_System-Level-Validation.tex`), which both Ch. 13 and Ch. 14 point to. This is the table to reproduce on a slide. Verbatim categories and bases:

| Group | Requirement | Verdict | Basis (thesis wording, condensed) |
|---|---|---|---|
| Performance | Accuracy | **Met** | Within ±10 % once each channel carries its measured per-stroke constant |
| Performance | Reproducibility | **Met** | Coefficient of variation 0.2–1.0 %, comparable to manual pipetting |
| Performance | Versatility | **Met\*** | Two reagents tested (extensible to six by design), 5–1000 µL, full 40-tube run |
| Performance | Feasibility | **n/a** | "A concept-selection gate, not a test of the built device" |
| Automation | Unattended operation | **Met** | A complete 40-tube run finished without intervention |
| Automation | Training | **Not tested** | "Deferred for time; the two-person evaluation of Ch. 9 carries the argument at lower strength" |
| Field/portability | Operating envelope | **Excluded** | No enclosure or climate control on the prototype |
| Field/portability | Portability | **Partly met** | A run on battery reached two racks; the complete run used mains |
| Contamination | Cross-contamination | **By design** | A dedicated line per reagent and non-contact dispensing |
| Contamination | Wind | **Excluded** | No enclosure, "and the requirement is not reproducible as written" |
| Contamination | Cleanability | **Excluded** | PLA fused-filament parts are not a cleanable surface |
| Contamination | Fluid paths | **Met** | Every wetted part is replaceable, and the line is drainable |
| Safety | Spillage | **Partly met** | Nothing escaped beyond the machine, but a few droplets landed on the rack; the storage septum leaks after repeated puncture |
| Safety | Operator exposure | **Partly met** | No contact during dispensing, but droplets left on the rack expose an operator who handles it |
| Safety | Electrical safety | **Excluded** | Breadboard electronics; the low-battery run lockout is unmet by design |

\* Table footnote verbatim: *"The 5 µL lower bound is not yet validated but expected to pass."*

**Tally for a slide: 6 Met (one by design, one asterisked) · 3 Partly met · 4 Excluded · 1 Not tested · 1 n/a.**

**Supporting numbers from §12.2 (the numbers a committee will ask for):**
- Uncalibrated (using the isolated bench per-stroke constant), initial deliveries fell **roughly 18 % short**.
- After recalibrating on the assembled instrument: error **−3.4 % on Channel 1**, **+0.6 % on Channel 2**, both inside ±10 %.
- CV **0.2 % to 1.0 %** intra-session, against a **0.27 %** manual-micropipetting baseline recorded on the same analytical balance.
- Between sessions, with lines re-primed and a different supply, the per-step delivery constants shifted **+1.3 %** and **−5.0 %**.
  - ⚠ **Inconsistency to be aware of:** `tab:pump-two-heads` (Ch. 6, line 1204) gives the Channel 2 error on its own constant as **−4.5 %**, while §12.2 and §13.1 both quote **−5.0 %**. If a committee member reads the table against the text, this is the seam. Use −5.0 % on slides (it is the figure both narrative chapters use) and be ready to name the table value.
- Both assembled heads deliver **roughly 10 % less volume per stroke** than the isolated bench head. Bench head 4.53 µL/stroke at 180 rpm; Channel 1 **3.94 µL**, Channel 2 **4.10 µL**. Channel 2 matches the bench head's measured occlusion gap (≈1.52 mm) and still under-delivers, "so the gap alone does not explain the loss."
- Placement: across 40 tubes, droplets landed inside the **5 mm target radius**; only **three droplets** partly wetted the rack deck or the lane.
- Battery: the 12 V tool battery powered **two full racks (16 samples)** before concurrent pump actuation stalled both motors.
- Vial capacity limit: at 1000 µL per dispense a standard **4 mL vial gives only three to four doses**.
- Septa: spillage risk **after about five punctures**, **no reliable reseal past twenty**.

## 1d. Future work items (from the Conclusion + §13.5, which is the actual outlook section)

From the Conclusion itself, the three conditions verbatim:
- "it must be rebuilt from matured modules"
- "tested on real reagents with real users"
- "paired with a reader that delivers the final diagnostic result"

From §13.5 *The next prototype* — the development order is `fig:development-order`, a six-stage flow where **"each stage inherits its geometry from the stage before it"**:

1. **Pump, storage and nozzle together** (shaded group — "sets the delivered volume and is developed first")
2. **Tube-lid opener**
3. **Sample rack**
4. **Alignment: linear, circular or gantry**
5. **Electronics and firmware**
6. **Integration parts and enclosure**

Item-level future work, grouped as the thesis groups it:

**Pump / storage / nozzle**
- Co-develop until the fluidic interfaces are stable; feed-line restriction is "a leading suspect for the 10 % delivery loss".
- Each channel requires its own calibration constant (two printed heads reproduced relative behaviour but differed in absolute output).
- Run the **systematic experimental sweep** across rotor diameters and occlusion gaps to calibrate the analytical model, "allowing pumps to be printed for a chosen volume per stroke".
- Test tube bores other than 0.51 mm and liquids other than water.
- **Extended ten-hour dispensing runs** with gravimetric checks before and after, to quantify delivery drift from mechanical tubing wear.
- Chemical validation of every wetted material: PVC tubing, stainless-steel cannulas, tubing-to-needle junctions, the septum and glass vial.
- Replace the septum with a different resealable type; smaller needles or an alternative piercing mechanism; **an active pinch valve on the air line** (the passive vent lets volatile reagent evaporate).
- **Hydrophobic polymer nozzle tips** — steel needles occasionally retain droplets.
- Centre the nozzle carrier's vibration motor mass (it tilts) and add **polished metal guide rods** (printed sliders stick-slip).
- Redesigned pump housing allowing **tubing replacement without undoing screws**.

**Lid opener and sample rack**
- Build the automated tube-lid opener — currently "the sole manual bottleneck remaining in an otherwise unattended run".
- Settle the lid opener **before** freezing the sample rack (opening lids requires locating tubes with high precision).
- Widen the queue entrance clearance so racks load without friction.
- Frozen rack geometry then dictates linear vs rotary carousel vs gantry.

**Alignment module**
- Reshaped lane walls, **stronger stepper motors**, and **closed-loop step-loss detection** to halt on friction.
- Higher-torque motors to restore travel speed (pushing five racks overloaded the cheap steppers; speeds had to be reduced).
- Freeze the alignment frame geometry first — it is the structural chassis for every other module.
- Sliding surfaces in **metal with certified clinical roughness, or high-performance engineering plastics such as polypropylene (PP)**.

**Electronics and firmware**
- **Custom PCB** — "solderless breadboards have reached their practical limit". Integrate regulated supplies and active bus current sensing.
- Populate the four remaining motor drivers with **dedicated pull-up resistors** and a **24 V drive rail**.
- Add a **state-of-charge monitor / bus current sensor**; firmware must run **only one pump at a time under low battery**.
- Select a higher-power battery once the pump module settles.
- Shield the storage sensor cabling; permanently solder the nozzle motor's noise-suppression capacitor or ground the motor casing.

**Integration and enclosure**
- Route the fluid tubing (currently hanging free above the drive rack) through **protective channels**; tether the stylus.
- Design the enclosure last (its shape depends on everything under it) — without it, temperature/dust/wind requirements stay unverified.
- A field-ready instrument needs a **physical emergency stop button**.
- Investigate **barcode or RFID sample tracking** to prevent specimen misidentification.

**Beyond the dispenser (§13.6)**
- Pair the dispenser with a **modular reader** hosting swappable sensor modules (colorimetric, enzymatic, fluorescence, immunoassay).
- A **QR code on the sample tube or test kit** tells both instruments what to do — "the operator would then load and scan rather than configure".
- Get a **sharper use case** before the redesign; engage stakeholders (livestock screening, municipal water testing) to decide between settings that "each pull the instrument's specifications in different directions".

## 1e. Message-style headlines for the Conclusion

1. Portable, unattended liquid dispensing at manual-pipette precision is mechanically viable — a 3D-printed instrument did it across forty tubes without intervention.
2. Once calibrated on the machine itself, the dispenser beat its own ±10 % accuracy target, delivering within −3.4 % and +0.6 %.
3. Precision was never the hard part: 0.2–1.0 % CV against a 0.27 % manual-pipetting baseline on the same balance.
4. The concept is proven and the instrument is not — two of six channels built, water and dye instead of real reagents, and no untrained user has touched it.
5. The pump's dose comes out of its geometry, not out of a lookup table, and the geometry came out of models that are now public and runnable.
6. Sample preparation does not have to travel to a central laboratory; what it still needs is matured modules, real reagents, real users, and a reader beside it.

---
---

# 2. DISCUSSION AND REFLECTION (`Chapters/13_Discussion-and-Reflection.tex`)

Chapter title as printed is **"Discussion and Outlook"**. Six sections: §13.1 Scope and limits of the prototype evidence · §13.2 Iterating one concept versus exploring alternatives · §13.3 Analytical models versus physical prototypes · §13.4 Role and boundaries of AI assistance · §13.5 The next prototype · §13.6 Beyond the dispenser.

## 2a. Narrative (8 sentences)

The validation confirms the core dispensing concept works and meets most measurable requirements, but the chapter opens by drawing the boundary hard: only two of six channels were built, only water and dye were dispensed, the 5 µL lower limit was never verified on the assembled machine, and no untrained user ever operated it. The chapter then traces most of the remaining gaps back to two method choices rather than to hardware failures. The first is depth versus breadth: the pump earned its depth because breadth came first — a syringe pump was benchmarked and a linear peristaltic pump was built and scored before the rotary head was chosen — whereas the alignment module had "breadth on paper only", fifty concepts narrowed on six sketch sheets but only one ever built, and the nozzle module had no breadth at all after the hand-over. The second is model-first versus prototypes-first: the author chose model-first for the pump because picking rotor diameters without a model "would have been guesswork", but then admits the model "was never experimentally validated" and the 5 µL target stroke was never reached, the integrated heads delivering 3.94 and 4.10 µL. The printer characterization is defended as what makes the missing prototypes-first campaign *possible* — ±0.10 mm dimensional repeatability means future rotors will differ by deliberate geometry rather than print scatter. On AI, the chapter is unambiguous and unhedged: it was "a core foundation rather than a secondary aid", decisive for everything digital and analytical, and the stated boundary is purely physical — printing, assembly, wiring and lab testing stayed hands-on. The outlook then refuses to iterate the assembled machine: the next build must start from individual modules in a fixed dependency order, because parallel module development was "dictated by circumstance rather than choice" after the pump tubing arrived six weeks late. Finally, the chapter questions its own market premise — a standalone dispenser solves the preparation bottleneck, but "field adoption ultimately hinges on delivering a complete answer", which is why the dispenser should be paired with a modular reader rather than shipped alone.

## 2b. EVERY honest limitation, trade-off and self-criticism (thesis wording)

**On the evidence (§13.1)**
- "Only two of six channels were built, tests used only water and dye, the 5 µL lower limit was not verified on the assembled machine, and no untrained user operated it."
- "Between measurement sessions, with the lines re-primed and the supply changed, the per-stroke volume of the two channels shifted by +1.3 % and −5.0 %, so repeatability within a session is not agreement across sessions."
- "PANPOC is, however, the only use case the design was developed around, and engaging further users could still adjust the volume range or batch size."
- "The instrument aims to be as simple to use as a microwave oven, but that simplicity has yet to be measured with real users."
- "So far the prototype has been evaluated only from inside the project, by me and my supervisor, and two colleagues tried the interface alone; no one outside the project and no prospective user has used it."
- Two validation tests "must come first": running PANPOC with its real reagents, and "a complete walk-up trial in which a first-time user handles racks, tubes, lids and bottles, not only the screen."

**On depth versus breadth (§13.2)** — the trade-off table `tab:strategies`, verbatim cells:
- Depth (one concept, many builds): strength — "Brings a chosen concept to the precision it can reach (pump)"; weakness — "Commits to a shape before its alternatives are built (alignment)".
- Breadth (several concepts, quick builds): strength — "Compares alternatives as hardware rather than on paper (pump concepts)"; weakness — "A quick build may compare two builds rather than two mechanisms".
- Model first: strength — "A reasoned set of dimensions to start from (pump)"; weakness — "Worth only as much as its validation, which needs many builds".
- Prototypes first: strength — "Measures the real part across a spread of dimensions"; weakness — "Needs printing precise enough that results reflect the dimensions, not the printer".
- "A concept built once is also not a concept tested" — with a cited counter-example: in one comparison of five commercial dispensers, "instruments sharing a mechanism varied more in precision than instruments built on different principles" (bammesberger-quantitative-2013). "A failed quick prototype may therefore reject a build rather than a mechanism."
- "In contrast, the alignment module had breadth on paper only. We gathered around fifty concepts, and I worked the survivors out further on six hand-drawn sketch sheets, but only the most feasible one was built."
- "Because this module sets the size of the instrument, a quick prototype of the alternatives might have paid off here: a circular carousel could have been more compact, and a gantry moving the needles might have reduced the footprint, though at much higher build complexity."
- "Finally, the nozzle module had no breadth after the hand-over, because rebuilding the inherited design was all the schedule allowed beside the other modules and the integration."
- Cost of depth, stated plainly: "The first 3D-printed rotary head delivered only 3.39 µL of a nominal 5 µL stroke. Reaching the achieved precision and accuracy required four physical builds, a characterization of the printer and a couple of months of work."

**On models versus prototypes (§13.3)**
- "However, the model was never experimentally validated."
- "Physical prototype builds focused on getting parts to print as drawn rather than evaluating the model's predictions."
- "Consequently, the target 5 µL stroke was never reached, with the integrated heads delivering 3.94 and 4.10 µL per stroke."
- "The ±0.10 mm tolerance describes the manufacturing process rather than fluidic behavior."
- "Ultimately, the two approaches are complementary: an analytical model provides a reasoned starting point, while systematic physical prototyping makes the output dependable."

**On the order of development (§13.5)**
- "However, its tubing arrived six weeks late, forcing us to develop the other modules in parallel while we waited. This parallel approach was dictated by circumstance rather than choice; it saved project time and is the smart way to work in a team, but it prevented individual modules from reaching full mechanical maturity."
- "Consequently, the next iteration should not begin with the assembled instrument, but with the individual modules."
- "3D-printed PLA enabled rapid builds, but its layered surface created friction and could not be sanitized, excluding cleanability from validation."
- "Developing reagent storage separately from the pump was a clear drawback: restriction in the feed line is a leading suspect for the 10 % delivery loss."
- "Draining leaves residual droplets in the lines and connectors, but the consequences of leaving droplets of harsh chemicals inside the lines remain untested."
- "This occurred because the original specification overlooked friction from consumables." (on tube lids rubbing the guide wall and causing open-loop step loss)
- "The alignment module was designed assuming an automated tube-lid opener would be added later. Because that mechanism remains unfinished and its footprint was never integrated, the operator currently has to fold every lid back by hand — the sole manual bottleneck remaining in an otherwise unattended run."
- "Solderless breadboards have reached their practical limit: hundreds of loose jumper wires make diagnosing electrical faults slow and fragile."
- "because the system lacks state-of-charge monitoring, simultaneous pump actuation caused voltage sags that stalled both motors on a depleted pack."
- "Without a protective shell, the prototype remains confined to controlled indoor environments, leaving environmental temperature, dust, and wind requirements unverified."
- "Freezing module boundaries too early would create unnecessary rework, as final geometries depend on earlier stages."

**On the product premise (§13.6)**
- "While our review identified a protocol-independent portable dispenser as a genuine gap in both academic research and commercial offerings, whether a standalone dispenser can succeed on the market is another question."
- "In decentralized settings, operators and healthcare workers are interested in actionable diagnostic results, not liquid handling for its own sake."
- "A standalone dispenser solves the manual preparation bottleneck, but field adoption ultimately hinges on delivering a complete answer."
- "However, modular versatility has a clear drawback: swapping modules adds operational complexity and requires user training, working against non-expert operators. How much configurability a field operator can manage is the first question this pairing must answer."
- "The next step for the dispenser is a redesign close to starting from scratch."
- "Before it, development requires a sharper use case."

**From App Q (self-evaluation) — the harshest self-criticism in the whole thesis**
- The comprehensive search of existing commercial and open-source devices "only took place at the start of the writing phase… Had I possessed that tool and the complete market picture from the outset, the project would likely have evolved differently. The peristaltic pump, for example, was engineered entirely from scratch, even though open-source 3D-printed designs existed that could have provided a solid foundation… it remains the clearest instance of a design decision made without information that was readily available."
- "Accurately forecasting development timelines is nearly impossible without prior experience building physical mechatronics, which I lacked."
- "My initial project plan from March explicitly identified task delays and late-stage integration bottlenecks as primary risks, and both materialized."
- "I compromised on the isolated perfection of individual modules to deliver a functioning prototype."
- "…even as it became evident along the way that our individual ambitions for the project's scope differed."

## 2c. What the thesis says about the AI-assisted engineering method, in hindsight

§13.4 *Role and boundaries of AI assistance* is one paragraph and is unusually unhedged. Bullets, thesis wording:

- "AI has become an essential tool for engineers and designers, and in this project it served as **a core foundation rather than a secondary aid**."
- "It supported nearly every phase of development, **removing everyday friction and drastically shortening the gap between conceiving an idea and realizing it**."
- The decisive domain is named explicitly: "For digital and analytical tasks, this contribution was decisive: AI assisted in **conducting literature research, designing experimental protocols, analyzing measurement data, generating firmware, and drafting technical specifications**."
- Quality claim, not just speed: "**Far from just saving time, it strengthened the maturity of our analytical models and experimental designs by enabling rapid, iterative refinement.**"
- The boundary is purely physical: "**The true boundary lay in physical execution**: 3D printing, component assembly, electrical wiring, and physical laboratory testing remained hands-on tasks."
- The counterfactual: "**Without AI embedded across the entire engineering workflow, completing an integrated prototype and this depth of experimental validation within a master's thesis timeline would not have been possible.**"
- From the Preface, the ownership line to have ready if challenged: "All architectural decisions, experimental interpretations, and final conclusions remain strictly my own."
- From App Q, the one hindsight *criticism* of the AI method — the capability arrived too late: the market search "only took place at the start of the writing phase. It was only then that my AI development skills had matured enough to build an automated search pipeline capable of covering that landscape thoroughly."
- From App Q, the durable skill claimed: "spec-driven AI development" is listed alongside embedded electronics, parametric CAD, 3D printing and formal engineering methods as the disciplines gained.
- The method is *documented*, not just asserted (App H): four plain-text procedures held in the project repository — `design-for-target`, `diagnose-gap`, `plan-the-test`, `sparring-partner` — three covering one phase each of a design–build–test–learn loop, each closing by naming the one that follows, plus a fourth that "sets the stance the other three are carried out in". Four shared procedural rules: **read the repository before reasoning, tag every non-trivial claim, never invent a parameter, and hand off explicitly.**

## 2d. Modularity as a strategy · point-of-care relevance

**Modularity — what it bought**
- Modularity is what makes the validation argument work at all: "Because the fluid lines are physically isolated and identical, testing two channels fully demonstrates the core fluidic behaviors" and "these multi-tube results extend directly to the full six-reagent configuration." Expanding two→six "affects electrical current draw rather than fluid behavior."
- Cross-contamination is solved *architecturally*, not procedurally: "Cross-contamination is prevented architecturally rather than through wash cycles. Each reagent travels an unbranched, dedicated line, and droplets detach across an air gap without contacting tubes or liquid."
- Modularity is the proposed route past the current gap: pair the dispenser with "a matching modular reader" hosting "swappable sensor modules — such as colorimetric, enzymatic, fluorescence, or immunoassay detectors — to analyze whatever assays the dispenser prepares."
- "Deployed together, the two instruments could be tailored to a specific field use case while retaining broad protocol flexibility."

**Modularity — what it cost**
- Module *independence* during development was the problem, not the principle: parallel development "prevented individual modules from reaching full mechanical maturity", and "bringing those decoupled modules together into a functioning instrument proved demanding. It required substantial forward planning because so many physical and electrical interfaces had to align simultaneously" (App Q).
- Developing storage separately from the pump was "a clear drawback" and the leading suspect for the 10 % delivery loss.
- The next build therefore makes modules **dependent by design**: "each stage inherits its geometry from the stage before it", and the pump+storage+nozzle group "must be co-developed until their fluidic interfaces are stable."
- The alignment frame is the structural chassis for everything else, so "its geometry must be frozen before designing surrounding mounts."
- The honest cost to the user: "modular versatility has a clear drawback: swapping modules adds operational complexity and requires user training, working against non-expert operators."

**Point-of-care relevance**
- The gap is real and was reviewed: "our review identified a protocol-independent portable dispenser as a genuine gap in both academic research and commercial offerings."
- But relevance ≠ adoption: "In decentralized settings, operators and healthcare workers are interested in actionable diagnostic results, not liquid handling for its own sake."
- The commercial benchmark named: "the Roche Cobas Liat, which delivers a finished test result in twenty minutes using an integrated cartridge."
- Why detection was excluded, and why the reasoning still holds: "while liquid preparation steps are largely shared across biological protocols, detection mechanisms are assay-specific." Integrating a reader "would predetermine which tests the dispenser could support."
- Regulatory consequence: "supplying the dispenser alongside a reader for validated diagnostic tests moves it toward the status of an accessory under the IVDR."
- The de-skilling proposal: "The operator would then load and scan rather than configure, which would reduce the skill the pair demands to the point where anyone could use it."
- Batch size is a point-of-care argument, not a throughput argument (App A): field throughput "sits on the order of tens of samples per site per day not because field instruments are hundreds of times slower, but because the demand at one site is hundreds of times smaller."

## 2e. Message-style headlines for the Discussion

1. The dispensing concept is proven; the instrument is not — and the chapter names exactly which four things are missing before it can be believed.
2. The pump earned its depth because breadth came first — and the alignment module, which sets the size of the whole machine, never got the same treatment.
3. The analytical model was never experimentally validated, which is why the 5 µL target stroke was never reached.
4. Characterizing the printer to ±0.10 mm is what now makes a prototypes-first pump campaign worth running: differences between rotors will be geometry, not print scatter.
5. AI was the foundation of this project, not an accessory — the boundary it never crossed was physical: printing, wiring, assembly and lab work.
6. The next prototype must be built from matured modules in dependency order, not iterated from the assembled machine.
7. A standalone dispenser solves the preparation bottleneck but does not deliver an answer — which is why the roadmap ends at a modular reader, not at a better pump.

## 2f. Quotable sentences (verbatim)

1. > "A concept built once is also not a concept tested."
2. > "A failed quick prototype may therefore reject a build rather than a mechanism."
3. > "Repeatability within a session is not agreement across sessions." *(actual full clause: "so repeatability within a session is not agreement across sessions")*
4. > "In contrast, the alignment module had breadth on paper only."
5. > "Without AI embedded across the entire engineering workflow, completing an integrated prototype and this depth of experimental validation within a master's thesis timeline would not have been possible."
6. > "In decentralized settings, operators and healthcare workers are interested in actionable diagnostic results, not liquid handling for its own sake."
7. The chapter's `\takeaway{}` box, verbatim — a ready-made summary slide:
   > "The prototype proves that portable, unattended liquid dispensing with manual-pipetting precision is mechanically viable. Transforming it into a field-ready platform requires maturing individual modules before integration---co-developing the fluidic core, selecting cleanable materials, and moving to custom electronics---while pairing the dispenser with a modular reader to deliver complete diagnostic answers rather than prepared samples alone."
8. Ch. 12's `\takeaway{}`, also quotable:
   > "Calibrated delivery outperformed the ±10 % target, and precision rivaled manual pipetting across a forty-tube run. The concept is now established on a working foundation, but turning it into a field-ready device calls for a redesign in which many of the prototype's choices are reconsidered."

---
---

# 3. APPENDICES

---

## APPENDIX A — Sample-preparation protocol survey
`Backmatter/App-A-Protocol-Survey.tex` · label `app:protocol-survey` · 344 lines · **read fully**

### 3a. Summary
Three sections. §A.1 derives the instrument's volume range and reagent count from five field-deployable sample-preparation protocols read in full, one per field of analysis, rather than from estimation — the appendix states plainly that "no review aggregates dispensed volumes across protocol types". §A.2 derives the forty-tube batch size from nine reported field deployments, separating per-run from per-day figures, and sets them against centralized laboratory throughput three orders of magnitude higher. §A.3 is a plain-language reader's summary of the PANPOC magnetic-bead RNA extraction protocol — the reference case — its seven steps, its six reagents and why each is there, and what it demands of the laboratory around it. The appendix is unusually candid about its own evidence, carrying an explicit "Three limitations of this evidence" subsection.

### 3b. Key numbers and tables

**`tab:protocol-survey` — five protocols, volumes, and the constraint each imposes**

| Field | Protocol | Liquids | Smallest | Largest | Principal constraint |
|---|---|---|---|---|---|
| Clinical and veterinary | Magnetic-bead RNA extraction (PANPOC) | 6 | 5 µL | 1000 µL | Bead suspension settles within 10 s of mixing; reagents require a cold chain |
| Plant and field molecular | Thermo-osmotic DNA extraction | 3 | 5 µL | 250 µL | Water dispensed near boiling; precision needed at the dilution steps but not at lysis |
| Water chemistry | Colorimetric phosphate assay | 3 | 20 µL | 600 µL | Sensitivity depends on the dispensed acid volume |
| Agriculture | Lateral-flow immunoassay, plant viruses | 6 | 2.5 µL | 1000 µL | Detection limit is expressed per 100 µL of sample |
| Soil chemistry | Pipette-tip extraction of benzo[a]pyrene | 2 | 300 µL | 10 mL | Solvent aspirated and dispensed ten times through the sample; extraction vessel is a 10 mL pipette tip |

- "Four of the five protocols work between single-digit microliters and about one milliliter, using three to six distinct liquids."
- The soil protocol is deliberately retained as the one that **does not fit** — it "falls outside the range, the dispensing-only boundary and the labware assumption at once, and marks where the scope adopted in §1.4 stops."
- Precision varies *within* one protocol: the thermo-osmotic procedure says precision is unimportant for the lysis water, then requires **5 µL transferred into 45 µL twice in succession**. "Accuracy is therefore a property the device must be able to vary across a run rather than hold at one value throughout."
- Hazard varies more than volume: one protocol needs a fume hood, another states the absence of chemical waste as an advantage. "A device serving both must contain the first case without being built around it."

**`tab:field-throughput` — nine reported deployments**

| Field | Deployment | Samples | Basis |
|---|---|---|---|
| Clinical, molecular | POC devices under development (as characterized by McCloskey) | under 10 | per run |
| Clinical and veterinary | PANPOC prototype, the reference case | 16 | per run |
| Plant virology | Leaf-disk sampling, ten-day infection series | 8 | per plant, one session |
| Water chemistry | Portable nutrient platform, Kongsfjorden cruise | 55 | one campaign day |
| Clinical, parasitology | Portable qPCR for malaria surveillance, Ethiopia | 1920 | six weeks; ≈60/day, derived |
| Clinical, molecular | Portable LAMP instrument (MINI) | 96 | per run |
| Clinical virology | Staffed mobile diagnostic laboratory, Ebola response | 110 | per day, four scientists |
| Military and biodefense | Deployed field laboratories, NATO exercise | 891 | whole exercise, four laboratories |
| Clinical virology | European Mobile Laboratory, Guéckédou | 5800 | 14 months |

**Centralized comparison figures:** Cornell testing hub >8000 pooled samples/day, >2 million across the programme · automated LAMP platform >40 000 samples/day · Taiwan's 249 laboratories 158 492 RT-PCR tests/day ≈ 640 per laboratory per day. Malaria deployment detail: 899 febrile + 1021 asymptomatic in six weeks, equipment carried in a suitcase. NATO: two laboratories (Germany, Hungary) handled 825 simultaneously at **98 % overall testing accuracy**. European Mobile Laboratory turnaround ≈ **four hours against several days** when samples were sent away. Benchtop Opentrons robot: **96 samples in about fifteen minutes** of unattended pre-PCR work.

**The forty-tube justification, quotable:**
> "It is two and a half times the batch of the reference protocol's own instrument, it covers a single-operator field day in one unattended load, and it is a fraction of what a staffed mobile laboratory turns over."
> "Against the instruments this device would actually stand beside --- portable, battery-capable, operated outside a laboratory --- forty is roughly four times the typical capacity."

**The three stated limitations of the evidence:** (1) "The evidence is concentrated in clinical work" — six of nine entries are clinical/veterinary/military, soil chemistry contributes none; (2) "Per-run and per-day figures must not be added"; (3) "The centralized figures are capacities, not routine workloads."

**PANPOC protocol facts:** three variants by collection medium (dry / guanidine thiocyanate / PBS), identical from bead addition onward. Seven steps: release and lyse → add control → bind → capture and discard → wash twice (70 % ethanol) → dry → elute. Six reagents: guanidine thiocyanate, ethanol 96–100 %, silica-coated magnetic beads, ethanol 70 %, synthetic control RNA, enzyme-free water. Cold chain: swabs at **−70 °C**, control RNA below **−15 °C**, beads **2–8 °C**; only the guanidine thiocyanate is room-stable. Bead suspension separates **within about ten seconds** of mixing. The protocol's **only stated acceptance criterion is visual** — a reference photograph of correctly and incorrectly mixed bead stock.

⚠ The file carries a comment recording **three inconsistencies in the source protocol document** that were deliberately not reproduced: a mini centrifuge listed in materials but used in none of the three protocols; a vortexer used in every protocol but absent from the materials list; and the control-RNA storage temperature given as −30 to −15 °C in one place and "below −40 °C" in another. Good material if asked how source documents were handled.

### 3c. Figures
None. Appendix A is **tables only** — `tab:protocol-survey` and `tab:field-throughput`. (Worth knowing: a "protocol survey" backup slide must be built from the tables, there is no figure to lift.)

### 3d. Committee question it answers
*"Where do your 5–1000 µL range, six reagents and forty-tube batch actually come from — did you just pick them?"*

---

## APPENDIX B — Dispensing error supplement
`Backmatter/App-B-Dispensing-Error.tex` · label `app:error-compounding` · 71 lines · **read fully**

### 3a. Summary
A two-page derivation of how dispensing error compounds when a large volume is assembled from repeated small aliquots, written because §2.3 was deliberately held to one page. Its point is that the two error components do **not** grow at the same rate: random error falls as 1/√n as a fraction of the delivered volume, while systematic offset is scale-invariant. It grounds the maths in a real instrument, the open-source Sidekick dispenser, and closes with two explicit qualifications about when the derivation stops applying. The appendix notes that the number of transfers "is worth this attention because it is a design choice rather than a property of the liquid or the room."

### 3b. Key numbers and equations
- The governing relation, `eq:cv-compounding`:
  **CV_total = (σ√n)/(n·V_aliquot) = (1/√n)·(σ/V_aliquot)**
  where n = number of aliquots, σ = per-aliquot standard deviation, V_aliquot = aliquot volume.
- The systematic offset s "is the same fraction of every aliquot, so it is the same fraction of their sum, whatever n is."
- **Sidekick worked example:** builds every volume above **10 µL** from repeated **10 µL** aliquots; measured per-aliquot standard deviation **0.1 µL (about 1 %)**; delivered volumes came out **roughly 11 % above target at every volume tested**.
- The Sidekick authors' own words, quoted: the offset "could be accounted for, should increased accuracy be desired" — but they did not correct it. And: "the error will scale with the square root of the number of dispenses required to obtain the target volume."
- **At 200 µL — twenty aliquots — the random component has fallen to roughly a fifth of what it was at a single one, while the systematic component is exactly where it started.**
- Conclusion, quotable: "An instrument built this way therefore grows more repeatable as the requested volume rises and no more accurate at all, and its error budget at the top of its range is almost entirely systematic."
- **Two qualifications:** (1) the equation assumes aliquots are independent — "a fault that biases consecutive dispenses in the same direction --- a partially blocked path, a drifting temperature --- breaks that assumption and the random component then falls more slowly than 1/√n, or not at all"; (2) it describes only per-transfer error, and says nothing about protocol-level error, "where dilutions carried out in series compound multiplicatively rather than additively."

### 3c. Figures
| Label | Path relative to `Pictures/` | Gist | Type |
|---|---|---|---|
| `fig:error-compounding` | `fig-error-types-b` | Random vs systematic error of the Sidekick dispenser as a target volume is assembled from repeated 10 µL aliquots — random component decays, systematic flat | Plotted graph (two curves vs n / volume) |

### 3d. Committee question it answers
*"Your pump meters in whole strokes — doesn't chaining strokes stack up error?"* (Answer: the random part shrinks, the systematic part does not, which is exactly why per-channel calibration constants matter more than per-stroke precision.)

---

## APPENDIX C — 3D printer geometric characterization
`Backmatter/App-C-Printer-Characterization.tex` · label `app:printer-calibration` · 268 lines · **skimmed as instructed, but summarized in full because it is a likely question**

### 3a. Summary
Documents three successive attempts to characterize one printer's dimensional error, and why the first two failed. Attempt 1 (100 mm shrinkage bars) was mathematically unidentifiable — one equation, two unknowns. Attempt 2 (a two-parameter model fitted on a single printed rotor) worked for external features and center-to-center spans but broke on internal bores. Attempt 3 succeeded with a purpose-designed coupon of three mechanically unconnected concentric rings, which decoupled external from internal feature classes and produced two separate compensation rules now baked into the CAD parameters. Machine and material are fixed throughout: a Bambu Lab P1S with a 0.2 mm nozzle, 3DE MAX PLA 1.75 mm, locked slicer profile.

### 3b. Key numbers and tables
- **Attempt 1:** contraction **0.26 % along X**, **0.18 % along Y**, mean **0.22 %**, cooled to **21 °C**. Fails because `L_meas = s·L_nominal + 2c` — one equation, two unknowns (`eq:bar-identifiability`).
- **Attempt 2:** fitted **s = 1.00906**, **c = 0.11 mm** on the pump rotor. Brought the bearing center-to-center span to nominal exactly, but applying the same scale to an internal arc produced a part **0.23 mm wider than intended**. Finding: "internal bores exhibit negligible scaling contraction."
- **Attempt 3 coupon:** three concentric unconnected rings, constant **3 mm wall**, printed flat; diameters span **22–88 mm**; the mid ring (**37 mm bore / 43 mm OD**) printed in **triplicate**. Caliper resolution **0.01 mm**, two orthogonal readings averaged.
- **`tab:ring-artifact` — the measurement set (deviation column):** Small bore 22.00 → −0.16 · Small outer 28.00 → −0.11 · Mid bores 37.00 → −0.19 / −0.17 / −0.10 · Mid outers 43.00 → −0.18 / −0.22 / −0.23 · Large bore 82.00 → −0.07 · Large outer 88.00 → **−0.50** (the largest single deviation, and the point that makes external contraction size-proportional).
- **Repeatability noise floor: 0.03–0.05 mm** from the triplicate mid rings.
- **Forward transfer functions:**
  external: `d_printed = 0.99354·d_modeled + 0.068`
  internal: `d_printed = 1.00164·d_modeled − 0.208`
- Internal slope statistically indistinguishable from unity (**t = 0.82, p > 0.4**), so it is fixed at 1.0 and refitted. **Inverse rules actually used in CAD:**
  external: `d_modeled = 1.0065·d_target − 0.07`
  internal: `d_modeled = d_target + 0.14`
  ⚠ Stated caveat: the +0.14 mm applies **strictly** when scaling is fixed to unity and "must not be combined with the unconstrained intercept."
- **Three validation criteria:** residual standard error **0.023 mm external / 0.040 mm internal** (inside the repeatability floor); external and internal slopes differ by **more than eight standard errors**; out-of-sample test on the pump housing agreed **within 0.01 mm**.
- R² = **0.98 external, 0.54 internal** — the low internal R² is explicitly defended as "an arithmetic artifact of near-zero slope rather than poor predictive power."
- **Operational envelope: 20–90 mm diameter, 95 % prediction interval ±0.10 mm.** Transfer protocol to another printer: "approximately 20 caliper measurements and 20 minutes of analysis."
- Literature contrast: Gebre et al. report roughly constant absolute deviations across feature sizes on similar PLA/FDM equipment, whereas these measurements show size-proportional external contraction plus a constant internal offset — "high-precision mechatronic prototyping requires empirical characterization of the specific equipment in use rather than generic literature constants."

### 3c. Figures
| Label | Path relative to `Pictures/` | Gist | Type |
|---|---|---|---|
| `fig:app-shrink-bars` | `proto-shrink-bars` | The two 100 mm bars embossed `10cm`, marked by build-plate axis — illustrates the confounded measurement | Photograph |
| `fig:app-ring-artifact` | `proto-calibration-rings` | The three concentric rings arranged on the build plate as separate bodies | Screenshot/render of build plate |
| `fig:printer-calibration` | `fig-printer-calibration` | Deviation vs nominal diameter with a least-squares line per feature class; the pump head shown as an open diamond, measured after fitting and not used in the fit | Scatter plot with regression lines |

### 3d. Committee question it answers
*"How do you know the pump's occlusion gap is the dimension you designed, and not whatever the printer happened to produce?"*

---

## APPENDIX D — The test system
`Backmatter/App-D-Test-System.tex` · label `app:test-system` · 328 lines · **read fully**

### 3a. Summary
Documents the custom laboratory software built to run the pump characterization campaigns: a local Python application with a browser interface plus a headless runner that talks to the pump microcontroller and the instruments. It is organized as the methods are: shared actuation and campaign machinery first, then each measurement method end to end (flow sensing, then gravimetry), then the handling common to both. The central design decision is that **actuation is commanded in discrete rotor strokes, never in liquid volume**, which keeps the command path strictly decoupled from calibration assumptions. The appendix also documents why the inline flow sensor was abandoned for low volumes, and the data-integrity rules (raw records immutable, every correction stored as a timestamped sidecar annotation).

### 3b. Key numbers and facts
- Four modes on the dashboard: **Data Collection · Analysis & Dashboard · Run Campaign · Gravimetric Analysis**.
- Actuation hardware: **NEMA 17** stepper + **DRV8825** microstepping driver + **Arduino Nano** over USB serial at **115 200 baud**, with acceleration ramping (needed because "starting a peristaltic rotor abruptly against an occluded tube induces instantaneous torque peaks that cause motor step loss").
- One stroke on the four-roller rotor = **90° rotor turn = 50 full motor steps at 1.8°/step**, scaled by the microstepping factor.
- Two serial-robustness features: ports selected explicitly, not auto-detected (flow sensor and Arduino use identical USB-serial bridge chips); handshake query instead of waiting for a bootloader banner, to avoid auto-reset motor twitching.
- Two randomization modes: **grouped** and **full randomization**. "Campaigns reported in this thesis utilized full randomization" — so that "temporal drift, ambient temperature changes, and cumulative tubing fatigue distribute evenly across all experimental conditions rather than biasing late-stage trials."
- Flow sensor: **Sensirion SLF3S-0600F** thermal liquid flow sensor, I²C-over-serial, two-thread acquisition with **pre-roll** (baseline) and **post-roll** (compliance drainage) windows; trapezoidal integration; automatic screening for backflow excursions, duration deviations and volume outliers.
- **The killer comparison (the reason gravimetry won):**
  - `fig:app-flow-clean`: syringe pump, **100 µL at 200 µL/min**, ten deliveries — mean **96.19 µL ± 2.68 µL, CV = 2.78 %**, **no replicates flagged**.
  - `fig:app-flow-flagged`: same syringe pump, **5 µL at 10 µL/min** — mean **4.94 µL ± 1.12 µL, CV = 22.72 %**; **ten of eleven replicates flagged for backflow**, one flagged as a volume outlier at **2.00 µL**.
  - "at 5 µL, fluid compliance and sensor response time distort the signal, producing severe backflow flags even on an ideal syringe pump."
- Gravimetric pipeline: evaporation modelled on the **calculated** dispensing duration (from commanded steps and speed), not wall-clock, "preventing operator delays during balance reading from corrupting the evaporation estimate."
- **Reporting rules:** per-stroke volume comes from the **slope** of a linear fit across **10–300 strokes**, not from single-stroke weighings (**≈5 mg**, near the balance noise floor of **0.1 mg**); **residual standard errors reported instead of R²**, "which is constrained near unity across wide stroke ranges"; large non-zero intercepts flagged as evaporation or droplet-breakoff artifacts rather than intrinsic pump properties.
- A referenced campaign had **76 replicates**.
- **Three data-integrity principles:** raw sensor logs and mass recordings strictly immutable; user edits stored as timestamped sidecar metadata; manual split points are immutable hard boundaries.
- **Three variables software cannot monitor** (stated as a limit): fluidic pre-wetting of new PVC tubing, consistent droplet touch-off technique, and ambient temperature/humidity monitoring.

### 3c. Figures — all are screenshots of the running software on real campaign data
| Label | Path relative to `Pictures/` | Gist | Type |
|---|---|---|---|
| `fig:app-landing` | `app-landing` | The four-mode entry dashboard | App screenshot |
| `fig:app-pump-sensor` | `app-pump-sensor-setup` | Hardware config: named backend driver, explicit ports, Test Hardware diagnostic | App screenshot |
| `fig:app-campaign-type` | `app-campaign-type` | Automatic (flow stream) vs gravimetric (pause for mass entry) campaign mode | App screenshot |
| `fig:app-randomization` | `app-randomization-scheme` | Full vs grouped execution-order randomization | App screenshot |
| `fig:app-flow-clean` | `app-flow-traces` | Ten clean 100 µL deliveries auto-segmented, CV 2.78 %, nothing flagged | Plot screenshot |
| `fig:app-flow-flagged` | `app-flow-traces-flagged` | Same pump at 5 µL — CV 22.72 %, 10 of 11 flagged | Plot screenshot |
| `fig:app-curation` | `app-curation` | Non-destructive curation panel: diagnostics left, manual splits/exclusions right | App screenshot |
| `fig:app-grav-percell` | `app-grav-percell` | 76-replicate per-condition summary: mean volume, per-stroke, dispersion, evaporation correction | Table screenshot |
| `fig:app-grav-calibration` | `app-grav-calibration` | Delivered volume vs commanded strokes per speed; slope = per-stroke volume, intercept = fixed offset | Regression plot screenshot |

### 3d. Committee question it answers
*"How were these hundreds of dispenses actually measured, and why should I trust the per-stroke numbers?"* — and specifically *"why did you abandon the inline flow sensor?"*

---

## APPENDIX H — AI use: the design-loop skills
`Backmatter/App-H-AI-Use.tex` · label `app:ai-use` · 78 lines · **skimmed as instructed**

### 3a. Summary
Documents the four plain-text working procedures held in the project repository that the AI assistant loads and follows when a task falls in scope. Three cover one phase each of the design–build–test–learn loop and each names its successor so the cycle runs without anyone remembering the order; the fourth sets the stance the other three are carried out in and is also used standalone to argue with an idea before committing to it. One of the four, `diagnose-gap`, is reproduced in full as a listing, chosen because Ch. 4 shows it in use on the first pump prototype. The appendix is explicit that the procedures "contain no code and change nothing about the underlying model."

### 3b. Key content — `tab:app-skills`
| Procedure | What it takes in | What it must produce |
|---|---|---|
| `design-for-target` | A performance target with units and tolerance, the constraints that cannot move, and the previous version's diagnosis | A selected concept, scored against the alternatives and against the prior build, with the reasoning recorded |
| `diagnose-gap` | A prototype that missed its target, its design parameters, and how it was measured | A ranked shortlist of causes, the single change most likely to close the gap, and the measurement that would confirm it |
| `plan-the-test` | Suspected causes or open design parameters, and the number of builds that can be afforded | A run table, what each run is able to settle, and a decision rule fixed before any data is taken |
| `sparring-partner` | An idea, a plan, or a line of reasoning offered for challenge | The weakest link named first, a competing frame, and an explicit confidence marker on every non-trivial claim |

The four shared procedural rules: **read the repository before reasoning · tag every non-trivial claim · never invent a parameter · hand off explicitly.**

Disclosure of what was edited out of the reproduced file — "Three things have been taken out and nothing has been added or reworded": the machine-read header listing trigger phrasings, the emphasis/code markers a renderer would consume, and two symbols the document font does not carry.

### 3c. Figures
No figures. One table (`tab:app-skills`) and one verbatim listing (`\lstinputlisting{Backmatter/skills/diagnose-gap.txt}`).

### 3d. Committee question it answers
*"What exactly did the AI do, and how was it kept from inventing numbers?"*

---

## APPENDIX I — System-level requirements and module evaluation matrices
`Backmatter/App-I-Requirements-Criteria.tex` · label `app:requirements-criteria` · 273 lines · **read fully**

### 3a. Summary
The complete historical specification record, in two hierarchical tiers. The system-level tier holds unweighted binary pass/fail requirements in five categories and unweighted ranking criteria in eight categories, both typeset directly from the design record with its original grouping and nesting preserved. Below them sit eight module evaluation matrices with localized numerical weights, reproduced as **original single-page PDF exports** rather than retypeset, "to preserve archival authenticity". Each system-level requirement is a binary gate: "A concept failing any requirement is eliminated prior to weighted criteria evaluation."

### 3b. Key numbers and content

**Three contextual details the appendix flags up front:**
1. In the original PDF exports, the *Opportunity* column header is visually truncated (appears as "Field Analysis & Po…") — all descriptions, definitions and weights are intact.
2. Two parameters were updated after the protocol survey: **reagent capacity expanded from five to six distinct fluids**, and **batch throughput generalized from a fixed eight-tube format to several tens of tubes per run**.
3. The electronics matrix is the shortest — **three requirements and eleven weighted criteria, against the pump module's thirty**. It specifies no supply voltage, drive current or channel count, and the appendix defends this: "a consequence of the module hierarchy described in §5.2 rather than an omission, as the functional demands on the electronics are defined entirely by the mechanisms it actuates."

**The system-level requirements, verbatim numbers (`tab:app-global-requirements`), five categories:**
- *Performance* — dispense reproducibly to within **±10 %, but not more than 10 µL**; accuracy **±10 %, but not more than 10 µL**; handle **up to at least five different liquids**; dispensing level **5 to 1000 µL**; compatible with **8 × 2 mL tubes at a time**; hold **up to at least 5 mL of each dispensed liquid**; feasibility "scored from 1 to 10 (10 is trivial to achieve, 1 is impossible)… An idea passes if it scores at least 5."
- *Automation* — "After initial setup, the device requires no further input from the user"; "Operating the device requires less than **10 minutes of training**."
- *Field analysis and portability* — indoors: temperature **18–25 °C**, humidity **20–60 %**, pressure **800 hPa (2000 m above sea level) to 1050 hPa**.
- *Avoid contamination* — prevent measurable cross-contamination as determined by running PANPOC under controlled conditions; "**Less than 5 % change in wind** must be detected under operation at the dispensing area, as measured by a wind sensor, while a fan is pointed at the device"; all contact surfaces cleanable without material degradation or disposable; all fluid paths completely drainable or disposable.
- *Safety* — no visible traces of outside spill **within 1 m**; no visible dye on the operator's arms and hands; a refilling protocol preventing hand contact; electronics: insulated or double-insulated, prevent arcing, **fail-safe (shut down immediately) on short circuit or power surge**, voltage ratings printed on the body, **low battery prevents the start of a new operation**, electronics separated from liquid-exposure areas (**consider IP44**).

**The system-level criteria (`tab:app-global-criteria`), eight categories, unweighted at system level:** Performance (reproducible, accurate, versatile across containers and modular storage, rugged during transport, feasible, low dead volume) · Maintenance (low-maintenance, low calibration requirements, repairable) · Automation (unsupervised after setup, operable by low-skilled users, minimize user steps, integrable into a larger device, monitor stored liquid levels, pleasant user experience) · Field and portability (lightweight, small footprint, outdoor conditions) · Contamination (prevent cross-contamination, wind-protected dispensing area, cleanable) · Safety (contain liquids between operations, avoid spillage, load hazardous liquids without exposure, insulated electrical equipment) · Feasibility (predominantly off-the-shelf parts and 3D printing, inexpensive to manufacture and assemble) · Sustainability (minimize consumables, design for end-of-life, sustainable materials).

**The eight module matrices** (PDF exports, `Pictures/cr-*`), structure uniform: *Title*, *Description*, *Opportunity* (one of eight classes), *Category* (requirement or criterion), *Weight* (**0–100 scale**). "Five of these subsystems are developed in this thesis and reagent storage in the companion thesis. **Tube holding was subsequently absorbed into the alignment module during development, and the enclosure was specified but not built.**"

### 3c. Figures — eight full-page PDF inclusions
| Label | Path relative to `Pictures/` | Gist | Type |
|---|---|---|---|
| `sec:app-cr-pump` | `cr-pump` | Pump module matrix — 30 weighted criteria, the largest | PDF page export |
| `sec:app-cr-alignment` | `cr-alignment` | Alignment module matrix | PDF page export |
| `sec:app-cr-nozzle` | `cr-nozzle` | Nozzle module matrix | PDF page export |
| `sec:app-cr-electronics` | `cr-electronics` | Electronics matrix — 3 requirements, 11 criteria, no functional parameter | PDF page export |
| `sec:app-cr-ui` | `cr-ui` | User interface matrix | PDF page export |
| `sec:app-cr-storage` | `cr-storage` | Storage module matrix (companion thesis) | PDF page export |
| `sec:app-cr-tube-holding` | `cr-tube-holding` | Tube holding matrix — module later absorbed into alignment | PDF page export |
| `sec:app-cr-enclosure` | `cr-enclosure` | Enclosure matrix — specified but never built | PDF page export |

### 3d. Committee question it answers
*"Show me the actual requirement you are grading yourself against — where is the specification, and who set the weights?"*

---

## APPENDIX J — Pump concept generation and selection record
`Backmatter/App-J-Pump-Concept-Record.tex` · label `app:pump-concept-record` · 322 lines · **read fully**

### 3a. Summary
The full design record behind the pump concept choice, in four parts: the divergent concept field (~thirty mechanisms sorted into six functional families), the seven concepts that cleared the requirements screen, an empirical benchmark of a commercial laboratory syringe pump across thirteen conditions, and the complete weighted scoring matrix that chose rotary peristaltic over the linear peristaltic chamber built in parallel by the thesis partner. Notably, the syringe principle was evaluated by **measuring a real commercial instrument rather than building one**, so the benchmark is about the principle rather than about the author's fabrication. The matrix is preserved in its original historical form, with an explicit note about a criterion that was missing from it.

### 3b. Key numbers and tables

**`tab:app-pump-families` — six families from ~30 concepts**
| Family | Concepts recorded |
|---|---|
| Tube squeeze | Continuous peristaltic pump; discrete peristaltic pump |
| Displacement-based | Syringe pump, in classic, commercially available, and two compact variants |
| Check valve-based | Diaphragm; piston, with linear-actuator, lever, and variable-pivot-point actuation |
| Flow-control openable | Pressurized chamber pump; ink jet; nozzle injector |
| Gravity | Pinch valve, in plain and fixed-height forms |
| Surface tension | Rotating wiper drawing a droplet from a narrow opening; air pressure overcoming surface tension at the outlet |

Bespoke concepts recorded separately in project notes: a pipetting assembly with a disposable tip, a handheld dispensing pen, a miniature submersible pump, a mechanical impulse actuator to detach hanging droplets. Deliberately divergent entries: **"a piano hammer striking a fluid-filled string and a tattoo needle piercing an elastomeric membrane."**

**`tab:app-pump-shortlist` — seven passed screening**
| Concept | Outcome |
|---|---|
| Continuous peristaltic pump | Developed; selected for final architecture |
| Discrete peristaltic pump | Developed |
| Classic syringe pump | Evaluated empirically using a commercial laboratory instrument |
| Reciprocating piston pump | Developed |
| Reciprocating diaphragm pump | Developed |
| Tube with a traveling tourniquet | **Deferred** — excessive mechanical complexity for prototype phase |
| Air-alternated gated chamber | **Deferred** — unresolved fluid-filling and bubble-entrapment dynamics |

**`tab:app-syringe-conditions` — commercial syringe pump benchmark, April 2026.** Thirteen conditions, two barrels, **108 dispenses total**, 5–11 replicates per condition, measured on the inline flow sensor.

*10 mL barrel, bore 14.85 mm:*
| Target | Flow rate | n | Mean delivered | Accuracy |
|---|---|---|---|---|
| 1 µL | 10 µL/min | 10 | 1.94 µL | **+94.3 %** |
| 5 µL | 10 µL/min | 10 | 5.21 µL | +4.2 % |
| 5 µL | 200 µL/min | 9 | 5.08 µL | +1.6 % |
| 20 µL | 200 µL/min | 11 | 19.46 µL | −2.7 % |
| 20 µL | 1000 µL/min | 11 | 19.28 µL | −3.6 % |
| 500 µL | 200 µL/min | 5 | 481.1 µL | −3.8 % |
| 500 µL | 1000 µL/min | 5 | 446.3 µL | −10.8 % |
| 1000 µL | 1000 µL/min | 5 | 897.6 µL | −10.2 % |

*20 mL barrel, bore 19.20 mm:*
| Target | Flow rate | n | Mean delivered | Accuracy |
|---|---|---|---|---|
| 5 µL | 200 µL/min | 9 | 5.76 µL | +15.2 % |
| 20 µL | 200 µL/min | 10 | 19.42 µL | −2.9 % |
| 20 µL | 1000 µL/min | 10 | 18.28 µL | −8.6 % |
| 500 µL | 200 µL/min | 8 | 355.2 µL | **−29.0 %** |
| 500 µL | 1000 µL/min | 5 | 449.2 µL | −10.2 % |

**Two findings:** (1) accuracy degrades severely at 1 µL (+94.3 %); (2) "volumetric error scaled directly with barrel diameter across all shared test points, demonstrating that wider bores magnify mechanical lead-screw positioning tolerances." Category scoring: **10 mL barrel scores 68 overall against 38 for the 20 mL barrel**; green ≥70, yellow 40–70, red <40; "the small-volume, slow-flow cell is the weakest on both."

**`tab:app-pump-comparison` — rotary peristaltic vs linear chamber, weighted (scores 1–5 × weight)**

| Criterion | Rotary | Linear | Weight |
|---|---|---|---|
| Feasibility | 3 | 3 | 100 |
| Footprint | 5 | 3 | 80 |
| Low calibration | 3 | 4 | 75 |
| Inexpensive | 4 | 3 | 75 |
| Low-maintenance | 3 | 4 | 70 |
| Repairable | 3 | 4 | 70 |
| Versatility | 3 | 4 | 65 |
| Dead volume | 4 | 3 | 60 |
| Unsupervised | 3 | 3 | 60 |
| Lightweight | 5 | 3 | 60 |
| Cleanable | 3 | 1 | 50 |
| Capable of integration | 3 | 3 | 45 |
| Off-the-shelf parts | 3 | 3 | 40 |
| End-of-life | 3 | 2 | 40 |
| Ruggedness | 4 | 3 | 35 |
| Outdoor conditions | 3 | 3 | 35 |
| Minimization of consumables | 4 | 3 | 20 |
| Accuracy | 3 | **5** | 10 |
| Sustainable materials | 3 | 3 | 10 |
| Reproducibility | 3 | **5** | 5 |
| **Weighted total** | **3485** | **3185** | |

**Margin breakdown:** 300-point margin. Rotary gained **610 weighted points across eight criteria**, of which **footprint, mass and cleanability contributed 380**. Linear gained **310 points across six criteria**, but "its superior accuracy and reproducibility contributed only **30 points combined**" — because accuracy and reproducibility are mandatory **pass/fail gates (±10 %)** and both designs cleared them, so post-gate selection was governed by footprint, mechanical simplicity and hygiene.

**The decisive disqualifier, quotable:** "the linear chamber pump was ultimately set aside due to its reliance on check valves… dispensing multiple reagents demands an array of inlet and outlet check valves. These valves introduce internal wetted moving elements, fluid traps, and cleaning burdens into an otherwise isolated flow path, disqualifying the design on the cleanability criterion."

**Honest note on a missing criterion:** batch throughput does not appear in the historical matrix — "its operational impact was only realized during physical testing. Due to lead-screw travel limits, multi-tube batch runs took **approximately thirty minutes longer** on the linear pump than on the rotary architecture. Including throughput would have widened an already decisive margin, and the matrix is preserved here in its original historical form."

### 3c. Figures
| Label | Path relative to `Pictures/` | Gist | Type |
|---|---|---|---|
| `fig:sketch-discrete-peristaltic` | `app-sketch-discrete-peristaltic` | Discrete peristaltic: a pump pressurizes the line, calibrated chambers isolated by pinch valves dispense 1/2/5/10/100 µL | Hand sketch (student's own) |
| `fig:sketch-fixed-height` | `app-sketch-fixed-height-gravity` | Fixed-height gravity: pump feeds a reservoir at fixed height under optical level control, discharging under constant head | Hand sketch (student's own) |
| `fig:app-perry-pump` | `app-perry-syringe-pump` | The Perry Pump — open-source syringe dispenser, 3D-printed chassis, stepper lead screw, brackets for five syringe sizes | Published figure, third party |
| `fig:app-syringe-category-score` | `app-syringe-category-score` | Both barrels scored by volume × flow-rate category, traffic-lighted; 68 vs 38 | Tool output / heat-map |
| `fig:app-syringe-accuracy-cv` | `app-syringe-accuracy-cv` | Volume accuracy and CV for each measured condition, both barrels | Plot |

⚠ **Rights note carried in the file for `fig:app-perry-pump`:** reproduced from Saugbjerg et al., *HardwareX* **19** (2024) under **CC BY-NC-ND 4.0**. Verbatim reproduction with attribution is permitted and uniform scaling is not an adaptation, **but the image must NOT be cropped or recoloured** or the NoDerivatives term is breached. **This matters directly for slides** — do not crop this figure into a slide layout.

### 3d. Committee question it answers
*"Why a peristaltic pump? Did you seriously consider a syringe pump, and why did you reject your partner's linear design?"*

---

## APPENDIX K — The pump design models
`Backmatter/App-K-Pump-Design-Models.tex` · label `app:pump-design-models` · 532 lines · **read fully**

### 3a. Summary
The two (really three) mathematical models that set the pump's physical dimensions, documented in full with equations, assumptions, empirical constants and the resulting baseline design point. They operate in series: the **occlusion model** evaluates a single roller compressing the tube and computes the compensating arc for fluid withheld by closed rollers; the **rotor geometry solver** takes that arc, adds the swept length for the target stroke volume, and computes the rotor pitch radius while checking three mechanical clearances and the motor torque margin. A third, the **tensioned tube path model**, bounds the error from assuming the tube hugs the housing wall. All three are published as interactive web calculators.

### 3b. Key equations, constants and tables

**Occlusion model — the stadium cross-section**
- Flat contact width: `L_w = (π/2)(d − h)`
- Residual lumen area: `A(h) = L_w·h + πh²/4 = (π/2)dh − (π/4)h²` — satisfies both limits: `A(d) = πd²/4`, `A(0) = 0`.
- Printed gap: **`G = 2w − δ`**. Standard practice sets δ to **10–20 % of the total wall stack (2w)**.
- Contact length: `L_c = k·2√(2·R_r·δ)`, with k ≥ 1.
- **The central result** — `ΔArc = V_roller/A = L_c`, so `ΔArc_total = N_c·L_c`. Quotable: *"This mathematical cancellation is the most valuable result of the occlusion model: the required arc compensation depends solely on roller radius and pinch depth, regardless of the tubing inner diameter."*
- Also quotable, the methodological jab: "Calculating the residual cross-sectional area directly replaces the ambiguous industry convention of quoting an 'occlusion percentage.' Occlusion is a local physical state under the roller; quoting a percentage provides no physical volume measure."

**`tab:app-occlusion-constants` — constants and sources**
| Quantity | Value | Source |
|---|---|---|
| Tube bore d | **0.51 mm** | Selected standard narrow PVC tubing |
| Wall thickness w | **0.91 mm** | Measured via optical microscopy of tube cross-sections and caliper readings |
| Roller radius R_r | **5.0 mm** | MR105ZZ ball bearing (10 mm OD) |
| Interference δ | **0.20 mm** | Nominal **11 %** compression on the 1.82 mm wall stack |
| Inflation factor k | **1.15** | Empirical, compliant elastomer spreading |

**Six stated assumptions:** perimeter conservation (P = πd) · rigid outer track · stadium cross-section (corner rounding absorbed by k) · quasistatic (neglects viscoelastic recovery) · **zero backpressure** · complete occlusion (the compensation equation fails if G > 2w, where fluid leaks backwards — "outside the model's domain").

**Rotor solver**
- `arc = V/A + N_c·L_c`, `R = N·arc/(2π)`, with `N_c = ⌊N/2⌋` engaged across a 180° track. R rounded to nearest 0.1 mm.
- **`tab:app-feasibility-conditions` — three conditions:** roller collision (`arc − 2R_r > 0`, else rotor cannot be assembled) · hub clearance (`(R − R_r) − r_boss > 0`, r_boss = 7 mm, else rollers interfere with the motor shaft boss) · tube length (`πR ≤ 300 mm`, else exceeds standard two-stop tube length).

**`tab:app-pump-feasibility` — required pitch radius R (mm) for a 5.0 µL stroke; ✗ = fails a condition**
| Bore (mm) | N=3 | N=4 | N=5 | N=6 | N=8 | N=10 | N=12 |
|---|---|---|---|---|---|---|---|
| 0.25 | 50.2 | 69.0 | 86.2 | ✗ | ✗ | ✗ | ✗ |
| **0.51** | 13.2 | **19.7** | 24.7 | 32.7 | 47.7 | 64.8 | 84.0 |
| 0.76 | ✗ | ✗ | 13.9 | 19.8 | 30.6 | 43.4 | 58.3 |
| 1.02 | ✗ | ✗ | ✗ | 15.2 | 24.4 | 35.6 | 49.0 |
| 1.14 | ✗ | ✗ | ✗ | 14.0 | 22.8 | 33.7 | 46.6 |

"A tube bore of d = 0.51 mm is the only size that remains geometrically feasible across all tested roller counts (N = 3 to 12)."

**Motor derating:** `f_max = V_supply / (2·L·I_rated)`; torque derated by `min(1, f_max/f_step)`; FoS = available rim torque ÷ worst-case tube compression load (**estimated at 200 g per roller**). At **12 V and 2000 steps/s (150 rpm, quarter-stepping)** the inductive ceiling falls at **1333 steps/s**, a derating factor of **≈0.67**. 24 V eliminates the derating.

**`tab:app-pump-fos` — factor of safety vs roller count**
| Rollers | Engaged | Rotor R (mm) | Margin @12 V | Margin @24 V | Verdict |
|---|---|---|---|---|---|
| 3 | 1 | 14.8 | 5.40 | 8.11 | Ample |
| **4** | 2 | **19.7** | **2.03** | 3.05 | **Adequate** |
| 5 | 2 | 24.7 | 1.62 | 2.43 | Tight |
| 6 | 3 | 29.6 | 0.90 | 1.35 | Stalls at 12 V |
| 8 | 4 | 39.5 | 0.51 | 0.76 | Stalls |
| 10 | 5 | 49.3 | 0.32 | 0.49 | Stalls |
| 12 | 6 | 59.2 | 0.23 | 0.34 | Stalls |

(The lower bound on roller count is set separately in Ch. 6: N = 3 engages only one roller during transitions, leaving the fluid path momentarily unoccluded and open to hydrostatic backflow — so **four rollers is the minimum that keeps two engaged**.)

**`tab:app-pump-design-point` — the baseline design point (the single most quotable table in the thesis)**
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
| Compensating arc N_c·L_c | **6.51** | mm |
| Total arc per stroke | 30.98 | mm |
| Roller count N | 4 | — |
| **Rotor radius R** | **19.7** | mm |
| Rotor radius without compensation | 15.6 | mm |
| **Increase due to compensation** | **26** | % |
| Wall thickness w | 0.91 | mm |
| Wall stack 2w | 1.82 | mm |
| Printed gap G = 2w − δ | **1.62** | mm |
| Volume sensitivity to gap | **3.4** | µL/mm |
| Resolution (quarter-stepping) | **0.025** | µL/step |

**Tensioned tube path model**
- Packet length: `L_packet = 2·R_cc·sin(α/2) + ρ·α`, with `R_cc = R − R_r`, `ρ = R_r + OD/2`, `α = 2π/N`.
- Why the wrap term matters: "while a simplified chord model suggests a **10 %** reduction in swept length, accounting for the physical roller wrap reduces the discrepancy to only a few percent."
- Pre-strain scaling (constant elastomer volume, λ = 1+ε): `A_ε = πd²/(4λ)`, `w_ε = w/√λ`, `δ_ε = 2w_ε − G`.
- **Sealing is maintained up to ε ≈ 28 %, "well above the typical 2–5 % strain encountered during manual tube insertion."**

**`tab:app-path-comparison` — swept length and stroke volume under three path assumptions** (at R = 19.7, N = 4, R_r = 5.0, d = 0.51, w = 0.91, δ = 0.20, k = 1.15, N_c = 2)
| Path assumption | Packet length | Stroke volume | Deviation |
|---|---|---|---|
| Rotor solver baseline arc | 30.98 mm | 5.00 µL | — |
| Wall-hugging arc (centerline) | 31.70 mm | 5.11 µL | +2.2 % |
| Straight path (ε = 0 %) | 30.70 mm | 4.95 µL | −1.0 % |
| Straight path (ε = 3 %) | 30.65 mm | 4.89 µL | −2.2 % |

"Across the full range from the circular outer wall to the tensioned path, the maximum volumetric deviation is only **2.2 %**. Inverting the models for a 5.0 µL stroke yields required rotor radii between **19.70 mm and 20.37 mm (<0.7 mm variation)**. Because this variation is well below the physical 3D-printing tolerances encountered during initial prototyping, the baseline rotor geometry was retained."

### 3c. Figures — all are screenshots of the published calculators
| Label | Path relative to `Pictures/` | Gist | Type |
|---|---|---|---|
| `fig:app-occlusion-calculator` | `tool-occlusion-calculator` | Occlusion calculator at the design point; primary output ΔArc_total = 6.51 mm, handed to the rotor solver | Tool screenshot |
| `fig:app-rotor-params` | `tool-rotor-params` | Rotor solver inputs at the design point with 6.51 mm carried across; verifies all roller counts feasible at 0.51 mm bore | Tool screenshot |
| `fig:app-rotor-results` | `tool-rotor-results` | Rotor solver across all roller counts: geometry and clearances left, drive parameters and torque margins right — eliminates N ≥ 6 | Tool screenshot |
| `fig:app-tensioned-path` | `tool-tensioned-path` | Two candidate tube paths for N = 4 — solid straight-with-wrap, dashed circular arc; ≈2 % volumetric difference | Tool-drawn geometry plot |

### 3d. Committee question it answers
*"Where does the 19.7 mm rotor radius come from, and why four rollers rather than six or eight?"*

---

## APPENDIX L — Alignment module record
`Backmatter/App-L-Alignment-Module-Record.tex` · label `app:alignment-record` · 375 lines · **read fully**

### 3a. Summary
Two halves. The first documents concept generation and selection: the ten concepts that survived a qualitative screen of roughly fifty candidate mechanisms, then six sequential hand-drawn engineering sketch sheets that narrow those architectures down to a physical mechanism, each sheet inheriting the previous outcome. The second half is the bench qualification of the resulting indexing stage — thirteen checks run on 31 July 2026, with two explicitly recorded as unfinished "verification debt". The appendix is also presented as a worked example of the whole thesis's design methodology: "systematically mapping the divergent concept space, declaring core criteria, performing coarse screening, and advancing surviving architectures through iterative levels of detail."

### 3b. Key numbers and tables

**Screening:** ~**fifty candidate mechanisms** generated jointly on collaborative boards; **ten survived** (`tab:app-alignment-shortlist`): rotating samples (carousel) · rotating gear system · scissor arm · scissor arm with elevator · floor on gantry · single-tube assembly line · rollers with walls · screw-based linear actuator · circular rotating rack assembly line · **linear rack assembly line** (selected). Four of the ten transport carriers beneath fixed nozzles.

**`tab:app-alignment-chain` — the six sketch sheets and the decision each settles**
| Sheet | Question | Outcome |
|---|---|---|
| 1 | Circular carousel or linear arrangement? | Linear — larger footprint, but simpler fabrication and easier decontamination |
| 2 | Which linear track layout? | Two-row layout: parallel in-queue and out-tray, compact footprint, push-only motion |
| 3 | What motion source and guidance system? | Smooth bare rail channel without external carriages, bushings, or slides — minimal crevices |
| 4 | Which push direction? | Side-push and top-push tie; both advanced to prototyping, bottom-push eliminated |
| 5 | Which drive transmission? | 3D-printed spur rack and pinion — selected over lead screw and belt drives |
| 6 | Does a 3D-printed rack and pinion work? | Validated on bench test — achieved precise 22 mm step indexing with low mass and high cleanability |

**Two methodological principles, stated:** (1) declaring criteria hierarchy before scoring — Sheet 3 formalized it as *"cleanability is the primary concern, and feasibility is second"*; (2) coarse screening before weighted matrices — Sheets 4 and 5 scored on a direct **1–5 unweighted scale across only the differentiating criteria**.

**Two ties, handled honestly:**
- Sheet 4: side-push and top-push **both scored 17 points**; bottom-push scored **9** due to fluid ingress risk beneath open tubes. Resolution: side-push built first in v1 as proof of concept, top-push adopted in v2 for gravity-assisted fluid protection.
- Sheet 5: the handwritten sheet recorded a tie at **23 points** from an arithmetic error — the rack-and-pinion scores **5, 5, 5, 4, 5 correctly sum to 24**. The corrected 24 is set in type on the reproduced plate and disclosed in both the text and the caption. Lead screw rejected regardless "due to excess mass, slow transit speeds, and unnecessary sub-micron resolution." Sheet 5 note: on top-push, cleanability is neutral — *"liquids do not fall upward."*
- Sheet 1 sizing: eight-tube sample rack at **≈25 mm center-to-center pitch (≈18 cm total length)**, leaving clearance for an automated tube-cap opener.

**`tab:app-alignment-bench` — thirteen bench qualification checks, 31 July 2026.** Hardware: one **28BYJ-48** geared stepper, one **ULN2003** Darlington driver board, one microswitch.
| Question | Result |
|---|---|
| Do the port expander and liquid-level sensor both respond on the shared I²C bus? | Both acknowledge; adding the expander did not disturb sensor communications |
| Does the endstop read correctly at rest and when actuated? | Lever unpressed reads *free*; carriage driven into switch reads *at endstop* |
| Which direction do positive steps move the carriage? | Positive steps translate rightward; endstop at the left datum |
| Do motor coils de-energize (park) after motion? | All four driver channel LEDs extinguish at rest |
| Homing pass step counts (fast / back-off / slow) | **1890 / 400 / 400 half-steps** |
| Homing repeatability across three runs from differing offsets | Spread of **2 half-steps (≈0.02 mm)**; commanded 800/1500/1100, counted **800/1502/1100** |
| Return-to-zero accuracy, three 132 mm round trips | Commanded **13 464** outward; counted **13 470 / 13 467 / 13 477** return (**+0.06 / +0.03 / +0.13 mm**). **Zero step loss** |
| Linear resolution vs calculated 102.0 half-steps/mm | **Exact agreement**: 13 464 half-steps across a measured 132 mm span |
| Shared-bus stress: home axis while level sensor streams | **Zero stalls**. **75 consecutive sensor readings**, each spaced **0.47–0.55 s** apart against a 500 ms target, across all three passes; step interval stretched by **1.6 %** |
| Fail-safe disconnect: endstop unplugged before homing | Correct fault state; carriage advanced **3.9 mm** and halted within **3.2 s** |
| Control loop integrity during motion | UI rendered continuously and responded to input without resets |
| Travel-budget fault execution (negative control) | **Not run on hardware** — firmware code review only |
| Supply rail voltage under load and coil resistance | **Not measured** — no benchtop multimeter available |

**Step resolution derivation (`eq:alignment-resolution-derivation`):** the 28BYJ-48 gives **4096 half-steps per output revolution**; pinion pitch diameter **12.80 mm** → circumference **π × 12.80 ≈ 40.21 mm**; therefore **4096 / 40.21 = 101.86 ≈ 102.0 half-steps per millimetre**, i.e. **≈9.8 µm per half-step**. Against the **22 mm tube pitch**, ≈10 µm per half-step is "more than three orders of magnitude finer positioning than required, rendering microstepping unnecessary." The ULN2003 has no current chopping, so the eight-phase half-step sequence is the finest increment available.

**Verification debt, stated openly:** (1) the travel-budget fault trip was verified by code review rather than hardware, because executing it "would have driven the carriage into a hard stop under motor stall for over 60 seconds"; (2) supply rail voltage under load and per-phase coil resistances were never metered — "proper 12 V motor operation was validated through continuous kinematic performance and thermal stability during extended runs."

### 3c. Figures — six full-page sideways plates, photographs of hand-drawn sheets
| Label | Path relative to `Pictures/` | Gist | Type |
|---|---|---|---|
| `fig:app-alignment-sheet-1` | `alignment-sketch-1-pushing-system` | Circular vs linear; module partitioned into in-queue, dispensing station, out-queue; rack sized ≈25 mm pitch / ≈18 cm | Hand sketch sheet (photo, flattened) |
| `fig:app-alignment-sheet-2` | `alignment-sketch-2-linear-layouts` | Three linear routings: straight-through, retractable push-pull, folded two-row (selected) | Hand sketch sheet |
| `fig:app-alignment-sheet-3` | `alignment-sketch-3-movement-and-guidance` | Filters actuators (rejects hydraulic, pneumatic, servo) and guidance (rejects carriages, bushings, telescopic slides) for a bare printed channel | Hand sketch sheet |
| `fig:app-alignment-sheet-4` | `alignment-sketch-4-push-direction-scoring` | Four push orientations scored 1–5; side and top tie at 17, bottom scores 9 | Hand sketch sheet with scoring |
| `fig:app-alignment-sheet-5` | `alignment-sketch-5-mechanism-scoring` | Transmission scoring; rack and pinion 24 (corrected from 23, set in type), lead screw 23 | Hand sketch sheet with scoring |
| `fig:app-alignment-sheet-6` | `alignment-sketch-6-rack-and-pinion-test` | Bench test plan and validation of printed rack-and-pinion at 22 mm index strokes | Hand sketch sheet |

⚠ **Disclosure carried in the file header, worth knowing before showing a plate:** the sheets were flattened for illumination and contrast-corrected "so the pencil reads in print. Nothing was redrawn, with one disclosed exception" — the corrected total on sheet 5.

### 3d. Committee question it answers
*"You said the alignment module had 'breadth on paper only' — show me the paper, and show me that the one mechanism you built was actually qualified."*

---

## APPENDIX N — The architecture tools, and the electronics as built
`Backmatter/App-N-Architecture-Tools.tex` · label `app:architecture-tools` · 485 lines · **read fully**

### 3a. Summary
Three sections. The first two document the two interactive tools that decided the control architecture — the **System Architecture Explorer** (prices and compares twenty-five candidate electronic designs, checks each against the processor's real pin count and its count of hardware communication controllers) and the **Dispense Choreography & Throughput Simulator** (models the machine as an indexing line and reports batch time, bottleneck station and samples per hour as the number of concurrently running pumps is swept). Each is documented as an instrument: what it models, the relations behind its outputs, the constants it holds fixed, and the assumptions a reader must accept. The third section is the machine that resulted — pin allocation, bill of materials and power tree — explicitly "the benchtop prototype as wired and tested, noting where physical compromises were made relative to the production-intent design."

### 3b. Key numbers, equations and tables

**Explorer — the three links a candidate answers:** processor→screen (fixed: owned SPI display, **8 pins**; a board with integrated screen costs **0**) · processor→modules (the open choice: **I²C 2 pins**, **RS-485 3 pins**, **CAN 4 pins**) · controller→motor drivers (set by the driver family).

Bus characterizations, quotable for a slide: I²C — "two wires, the simplest and cheapest, but reliable only over short runs inside a single enclosure." RS-485 — "sends each signal as the difference between two wires, so interference that hits both is cancelled out." CAN — "the bus designed for cars and industrial machinery… it checks every message for corruption and resends what did not arrive intact, so a device that fails does not take the whole bus down with it. That robustness costs more hardware at each module."

**Pin budget equation:** `pins used = screen + card reader + sensors + bus + drivers + microstepping + vibration`

**`tab:app-pin-terms`**
| Term | Pins | What sets it |
|---|---|---|
| Screen | 8, or 0 | Serial display and touch controller; zero with an integrated screen |
| Card reader | 1, or 0 | Chip-select only; data lines are the screen's |
| Sensors | 0, or 2 | Free when the module bus is I²C; otherwise a dedicated pair |
| Bus | 2 to 4 | I²C 2, RS-485 3, CAN 4; paid once by the processor, not per module |
| Drivers | 0 to 12 | 12 for individual step+direction, 8 for shared step with individual enables, 4 for a shared serial line, 0 when a separate node carries the wiring |
| Microstepping | 0, or 3 | Zero when set in hardware; three for run-time selection on a shared bus |
| Vibration | 1 | One timer-capable output for the nozzle motor's switch |

**Pins available (a property of the processor, not a constant):** bare bench processor **16 safe outputs**; the board finally selected **21**; boards with an integrated screen **3** — "which is why they can only ever be a display processor talking to a separate node."

**The second ceiling (peripheral instances):** the bare board has **three serial ports, two I²C controllers and two usable SPI interfaces**. The sharp case: "a smart driver whose address field allows only **four devices per serial line**, so six drivers need two lines; add a module bus on a third and the programming console has none left."

**Price provenance, stated honestly:** one Danish reseller's catalog on a single day in July 2026. **Seventeen of the twenty-six components quoted directly from a listing; two supplies are the nearest stocked wattage; seven components are not stocked by that reseller at all and carry unsourced estimates.** "Every figure it displays carries the lowest confidence of any input that fed it, so a computed number never appears more certain than its weakest source."

**Five stated assumptions/limits:** microstepping set in hardware · **CAN is costed pessimistically** (assumed its own wires; sharing the display's would cost 2–3 pins fewer) · smart-driver serial assumed full duplex (single-wire mode would roughly halve it) · a separate node's own pin budget is not checked · **"Costs are one reseller on one date. The ordering between architectures is the durable output; the absolute figures are not."**

**Throughput simulator — the model.** Six nozzles in a fixed row above a rack of eight tubes; the rack steps one nozzle spacing at a time. Station dispensing time:
`t_i = ⌈V_i / v_stroke⌉ / ((rpm/60) × n_rollers)` — numerator rounded up "because a pump delivers whole strokes."
Longest doses started first; a batch takes as long as its slowest member. Fill, steady and drain phases produced from a single loop.
**Fixed constants: rack index move = 1 second; rack changeover = 5 seconds; rack = 8 tubes, so four racks = 32 samples and 3 swaps** (the first rack is already in place).

**Three benchmark loads:** Light — two reagents, 100 µL and 25 µL · **Reference preparation protocol** — four reagents, 300 / 5 / 300 / 50 µL · Heavy — six reagents, from 1000 µL down to 5 µL.

**`tab:app-throughput` — run time, throughput and saving at 16 samples (two racks)**
| Load | One pump | Two pumps | Six pumps |
|---|---|---|---|
| Light, 2 reagents | 55 s · 1041/h · baseline | 49 s · 1174/h · −11 % | 49 s · 1174/h · −11 % |
| Reference protocol, 4 reagents | 199 s · 290/h · baseline | 126 s · 458/h · −37 % | 115 s · 502/h · −42 % |
| Heavy, 6 reagents | 426 s · 135/h · baseline | 335 s · 172/h · −21 % | 301 s · 191/h · −29 % |

**At the full 32-sample batch, the reference protocol runs 399 s strictly serially, 245 s with two pumps, 221 s with all six. "The second pump accounts for about 86 % of the attainable saving there."** The headline finding: "the second pump carries most of the benefit and the remaining four add progressively less." The light load stops improving after two pumps because it has only two reagents.

**Five simulator assumptions/limits:** every pump runs at the same stroke rate (volumes metered by stroke count, not speed — "also the operating decision the control architecture rests on") · rack changeovers added once at the end rather than interrupting the line ("A model that paused and refilled the line at each changeover would be more faithful and materially more complex") · roller count and volume per stroke identical at every station · only dispensing and the index move are counted (priming, calibration, homing and operator action are outside the model) · the animated rack view is illustrative, "not a timing-accurate playback."

**The electronics as built.** Processor: **ESP32-S3-Nano** (Arduino Nano form factor) with ESP32-S3R8 — **dual 32-bit Xtensa LX7 cores at 240 MHz, 512 kB internal SRAM, 8 MB embedded octal PSRAM**. PSRAM is doubly advantageous: memory depth for the graphical touch interface, and its internal bus consumes no user GPIO. **Of 21 available GPIO, 19 assigned and 2 spare.**

**`tab:app-pin-map` — GPIO allocation**
| Silk | GPIO | Pins | Function |
|---|---|---|---|
| D13, D11, D12 | 48, 38, 47 | 3 | SPI bus (SCK, MOSI, MISO) shared by display, touch, SD reader |
| D2, D3, D4 | 5, 6, 7 | 3 | Display select, data/command, reset |
| D5 | 8 | 1 | Touch controller chip select |
| D6 | 9 | 1 | MicroSD card reader chip select |
| A4, A5 | 11, 12 | 2 | I²C module bus (MPR121 level sensor, MCP23017 expander) |
| D7 | 10 | 1 | Shared step clock (all six pump drivers) |
| D8 | 17 | 1 | Shared direction line (all six pump drivers) |
| D9, D10, A0, A1, A3, A6 | 18, 21, 1, 2, 4, 13 | 6 | Pump enable, one dedicated line per channel |
| A7 | 14 | 1 | Nozzle vibration motor MOSFET gate |
| TX, RX | 43, 44 | 2 | *Free* (reserve; debug console uses native USB-CDC) |

Design rationale: the six enable lines connect **directly to native microcontroller pins** "to guarantee single-instruction cut-off and ensure fail-safe stopping if the peripheral bus stalls." Two pins conserved by bench findings: touch polled rather than interrupt-driven, and UART free because debugging uses native USB-CDC. **A subtle collision found and fixed:** the vendor board-support package's default I²C pins overlapped two SPI chip-select lines — "Invoking the default bus constructor would have caused bus transactions to toggle peripheral select lines silently"; firmware therefore binds I²C explicitly to A4/A5. Alignment stages and homing switches hang off an **MCP23017 16-bit I²C expander**, 10 of 16 channels used (4 control lines per axis × 2 = 8, plus 2 limit-switch inputs), **six channels spare**.

**`tab:app-bom` — bill of materials, single Danish distributor incl. 25 % VAT, July 2026**
| Qty | Component | Role | Unit (€) |
|---|---|---|---|
| 6 | NEMA17 stepper, 42BYGHW811 | Pump drive | 14.41 |
| 6 | DRV8825 stepper driver | Pump driver module | 6.87 |
| 1 | Six-socket driver carrier board | Driver mounting | 4.00 |
| 2 | 28BYJ-48 stepper (12 V) with ULN2003 | Alignment axes | 5.86 |
| 2 | Roller-lever microswitch | Rack homing limit | 2.01 |
| 1 | RD520PA micro DC motor | Nozzle vibration | 2.35 |
| 1 | IRF520 MOSFET module | Vibration switching | 1.84 |
| 1 | ILI9341 display with XPT2046 touch | Operator touchscreen | 23.32 |
| 1 | MPR121 capacitive touch controller | Liquid-level sensing (6 ch) | 6.37 |
| 1 | MCP23017 I/O expander | Alignment and homing I/O | 6.53 |
| 1 | Benchtop DC power supply | Motor and system supply | 31.66 |
| 1 | XL6009 buck-boost converter | 5 V vibration rail | 3.18 |

**Totals: ≈ €248 for the complete electronics and electromechanical inventory, of which the control electronics alone (excluding motors and external supply) is ≈ €103.**

**Partial population hazard, stated:** the bench build wires two of six channels. "Because an undriven DRV8825 enable pin defaults to active, installing a driver without its companion pull-up resistor would create an unconstrained power-on current hazard; each future driver and its pull-up must be installed simultaneously."

**Power tree:** single **12 V DC** laboratory supply current-limited to **2.5 A**, one converted lower-voltage branch. Three loads: (1) 12 V rail → stepper drivers, two alignment driver boards, microcontroller VIN; (2) microcontroller's internal linear regulator → 3.3 V logic domain (level sensor, I/O expander, pull-ups); (3) dedicated DC-DC → 5 V for the nozzle vibration motor and its MOSFET. Unified common ground plane.

**Why 12 V was kept on the bench despite a 24 V production spec:** pump calibration (**4.53 µL per stroke at 180 rpm**) was established at 12 V, so retaining it "preserves identical electrical operating dynamics"; and because the DRV8825 is a constant-current PWM chopper, moving to 24 V "requires no adjustments to driver current limits or firmware pulse timings. It requires only an upgraded DC power supply, a step-down regulator for the 12 V alignment motors, and replacement of the 16 V-rated bulk decoupling capacitors with 35 V variants."

**Thermal note:** the ESP32-S3-Nano exposes only VIN/3.3 V/GND, no 5 V input, and its onboard regulator needs **6–21 V**, so it runs from 12 V — dropping 12 V to 3.3 V across a linear regulator dissipates **≈1.3–2 W**. It operates within thermal limits without brownouts or resets, but production revisions will add an intermediate buck to **≈6.5 V** ahead of VIN, "reducing regulator thermal dissipation roughly threefold."

**One firmware rule from the power budget:** "the two alignment axes execute homing routines sequentially rather than concurrently, preventing overlapping current surges."

### 3c. Figures
| Label | Path relative to `Pictures/` | Gist | Type |
|---|---|---|---|
| `fig:app-matrix` | `tool-architecture-matrix` | The foot of the live 25-candidate comparison matrix: identifier, description, pumps at once, driver family, module bus, driver reach, complexity, cost, free pins; the selected row highlighted, with the tool's own recommendation and the term-by-term pin budget beneath | Tool screenshot, full-page sideways |

Stated reason there is no typeset candidate table: "Reproducing twenty-five such rows as a typeset table would produce a snapshot that is stale on the day it is set." Twenty-one further candidates sit above what is shown.

### 3d. Committee question it answers
*"You have six pumps on one microcontroller — does it actually have the pins, and what did running them concurrently buy you?"*

---

## APPENDIX Q — Self-evaluation
`Backmatter/App-Q-Self-Evaluation.tex` · label `app:self-evaluation` · 81 lines · **read fully**

### 3a. Summary
The author's own account of how the project ran against the plan it was registered with, explicitly framed as "a reflection on the process, not a result: every technical claim it touches is stated, and evidenced, in the chapters." Two sections: a plan-versus-outcome timeline figure with a note on how the comparison was constructed, and a four-paragraph reflection covering the one major research failure, the difficulty of time estimation without mechatronics experience, how the partner's departure shaped the final phase, and what was gained. It is the most personal text in the thesis and by some distance the most quotable in a defense.

### 3b. Key numbers and facts
- Project span: **February to September 2026**; hand-in extended to **19 September 2026**; the March project plan "was never formally revised when that date moved, and the figure is drawn this way so the two tracks can be compared against the same deadline."
- Verdict on the timeline: "**The front end held. Everything downstream of the first prototype ran later than planned, and integration and system-level validation fell into the final two weeks.**"
- The single biggest process failure: the comprehensive commercial/open-source device search "only took place at the start of the writing phase. It was only then that my AI development skills had matured enough to build an automated search pipeline capable of covering that landscape thoroughly."
- Its consequence: "The peristaltic pump, for example, was engineered entirely from scratch, even though open-source 3D-printed designs existed that could have provided a solid foundation. I do not consider that time wasted---designing it from first principles taught me far more than adapting existing CAD files ever could---but **it remains the clearest instance of a design decision made without information that was readily available.**"
- On planning: "My initial project plan from March explicitly identified task delays and late-stage integration bottlenecks as primary risks, **and both materialized.**" The intended mitigation — incremental integration throughout — "was derailed by extended shipping delays on core pump components."
- On the partner: "By the time my thesis partner finished, **only the storage module had reached maturity, and even that was not adapted for integration.** That left me with every other subsystem partially completed and an integrated machine still to construct."
- The effort figure: "**The solution was brute force: working from nine in the morning until past ten at night, weekends included, for the final two months.**"
- The trade made: "I compromised on the isolated perfection of individual modules to deliver a functioning prototype, systematically troubleshooting mechanical, electrical, and firmware issues until the machine operated as a coherent whole."
- On collaboration: "Working alongside Marius was a genuinely positive experience… even as it became evident along the way that our individual ambitions for the project's scope differed."
- The five disciplines gained: "**embedded electronics, parametric CAD, 3D printing, formal engineering methods, and spec-driven AI development.**"
- Closing line, highly quotable: "While the prototype has clear, documented limitations, **I conclude this thesis equipped with the engineering skills and confidence to build physical systems that were entirely beyond my reach in February.**"

### 3c. Figures
| Label | Path relative to `Pictures/` | Gist | Type |
|---|---|---|---|
| `fig:project-timeline` | `fig-project-timeline` | Plan vs outcome, Feb–Sep 2026; the planned March track rescheduled onto the 19 Sep hand-in, with the extension period shaded. Sources: the project plan, the prototype records, and the project changelog | Two-track Gantt / timeline chart |

### 3d. Committee question it answers
*"What would you do differently, and do you know why the project ran late?"* — the single best-prepared answer in the thesis.

---

## APPENDIX UI — Operator manual: the machine and its interface
`Backmatter/App-UI-Operator-Manual.tex` · label `app:ui-manual` · 375 lines · **skimmed as instructed**

### 3a. Summary
The manual-style companion to Ch. 9, written "to be read by someone standing in front of the instrument". It walks the machine and the whole interface in the order the operator meets them: the machine at a glance, turning it on, resetting position, loading reagents and racks, filling the lines, recipes, running a batch, liquid levels, settings, and then a service panel, run history and faults section aimed at a technician. Every screen is a capture taken from the instrument's own panel at its native **320 × 240 pixels**, staged throughout on the reference PANPOC preparation.

### 3b. Key facts and numbers
- Staging used for every capture: **PANPOC Protocol 1 — sixteen samples, two racks, recipe "Panpoc bind" = 5 µL IC-RNA + 300 µL ethanol + 50 µL beads.**
- Four things the machine presents to the operator: the **rack lane** (input queue → dispensing nozzles → output tray, the three zones marked on the deck), the **storage modules** behind the lane (one bottle each), the **touchscreen** at the front, and a tethered **stylus** ("the interface works with a bare fingertip, but the stylus makes the smaller controls easier and cannot be lost"). Recipes and run history live on a memory card.
- Status bar on every screen: state in one word — **READY, RESETTING, FILLING, DISPENSING, PAUSED or PROBLEM** — turning accent navy with white text while a pump is energised; **"red is kept for a problem and for the STOP control."** Right side carries a battery indicator and a crossed-out card symbol when no card is fitted.
- ⚠ **Honest disclosure right in the manual:** "The charge-sensing circuit is not fitted on this prototype, so the **battery figure is a placeholder, not a reading**."
- On a fresh power-up a **red "Position unknown" strip** replaces the home title until the axes are reset. A **dark theme** exists.
- Twelve sections, each with its own label: `app:ui-parts`, `app:ui-power`, `app:ui-reset`, `app:ui-loading`, `app:ui-fill`, `app:ui-recipes`, `app:ui-run`, `app:ui-liquids`, `app:ui-settings-app`, `app:ui-service`, `app:ui-logs`, `app:ui-faults`.
- A figure is still owed and is tracked as such: "a labelled photograph of the assembled machine showing the power switch and the load points."

### 3c. Figures
Principal photograph: `fig:app-machine` → `Pictures/fig-power-switch` — the assembled instrument with the power switch marked, racks loading at the right, reagent bottles behind the lane, touchscreen at the front (photograph). Everything else is a device screen capture rendered through the `\uishot` macro from `Pictures/ui/device-shots/`, e.g. `ui-v22-home.png`, `ui-v22-home-unhomed.png`, `ui-v22-home-dark.png` (`fig:app-home`), plus figure groups for resetting position, calibrating a bottle, filling the lines, recipes (`fig:app-reclist`), setting up a run, running and finishing, liquid levels, settings and language, the service panel, run history (`fig:app-logs-list`) and a fault screen.

### 3d. Committee question it answers
*"You claim it is as simple to use as a microwave — show me what the operator actually sees and does."*

---
---

# 4. BACKUP SLIDE CANDIDATES

Eighteen topics. Each is unlikely to fit a 30-minute talk but is a live question. Title given as an assertive sentence; then the 2–4 facts to show; then the figure or table to pull.

**1. The volume range was read out of five protocols, not estimated.**
- Four of five protocols work between single-digit µL and ~1 mL using three to six distinct liquids; PANPOC spans 5 µL to 1000 µL on its own with six liquids.
- Precision requirements vary *inside* one protocol: thermo-osmotic says precision is unimportant for lysis water, then requires 5 µL into 45 µL twice in succession.
- The soil-chemistry protocol (300 µL – 10 mL, aspirates as well as dispenses, uses a pipette tip as the vessel) was deliberately kept in the table as the case that marks where the scope stops.
- **Show:** `tab:protocol-survey` (App A). No figure exists — build the slide from the table.

**2. Forty tubes is sized to a field site's day, not to a laboratory's capacity.**
- Field band: <10 per run for POC devices under development, 16 per run for the PANPOC prototype, ~55–60 per single-operator day, 110 per day for a four-scientist mobile laboratory.
- Centralized comparison: >8000 pooled samples/day (Cornell), >40 000/day (automated LAMP), 640/laboratory/day (Taiwan's 249 labs) — three orders of magnitude.
- The explanation is queue, not machine: "a deployed unit serves only the samples its own site generates."
- Forty is ~2.5× the reference instrument's batch and ~4× a typical portable instrument's per-run capacity.
- **Show:** `tab:field-throughput` (App A).

**3. Error from chaining aliquots shrinks in the random component and never in the systematic one.**
- CV_total = (1/√n)·(σ/V_aliquot); the systematic offset s is scale-invariant.
- Sidekick measured at 0.1 µL (≈1 %) per 10 µL aliquot and ~11 % high at every volume tested; at 200 µL (20 aliquots) random error is ~1/5 of its single-aliquot value, systematic unchanged.
- Two stated breakpoints: correlated faults (blocked path, drifting temperature) break the 1/√n law; serial dilutions compound multiplicatively, not additively.
- **Show:** `fig:error-compounding` → `Pictures/fig-error-types-b`.

**4. The printer was characterized only after two measurement designs failed.**
- Shrinkage bars were mathematically unidentifiable: L_meas = s·L_nominal + 2c, one equation, two unknowns.
- The single-rotor fit (s = 1.00906, c = 0.11 mm) nailed the bearing span but made an internal arc 0.23 mm too wide; internal bores show negligible scaling contraction.
- Three unconnected concentric rings decoupled the classes; external slope 0.99354, internal 1.00164 (t = 0.82, p > 0.4 against unity), differing by >8 standard errors.
- Final rules: external `d_modeled = 1.0065·d_target − 0.07`; internal `d_modeled = d_target + 0.14`. Out-of-sample on the pump housing: within 0.01 mm. Envelope 20–90 mm, 95 % PI ±0.10 mm.
- **Show:** `fig:printer-calibration` → `Pictures/fig-printer-calibration`, with `tab:ring-artifact` as backup-to-the-backup.

**5. The inline flow sensor was abandoned because it fails at the volumes that matter.**
- On an ideal commercial syringe pump at 100 µL / 200 µL·min⁻¹: mean 96.19 ± 2.68 µL, CV 2.78 %, zero replicates flagged.
- Same pump at 5 µL / 10 µL·min⁻¹: mean 4.94 ± 1.12 µL, CV 22.72 %, ten of eleven flagged for backflow plus one volume outlier at 2.00 µL.
- Cause: fluid compliance and sensor response time at micro-litre scale.
- **Show:** `fig:app-flow-clean` (`Pictures/app-flow-traces`) beside `fig:app-flow-flagged` (`Pictures/app-flow-traces-flagged`) — a two-panel slide.

**6. Per-stroke volume is a regression slope, not a weighing.**
- Slope taken across 10–300 strokes, because a single-stroke weighing is ≈5 mg against a balance noise floor of 0.1 mg.
- Residual standard errors reported instead of R², "which is constrained near unity across wide stroke ranges."
- Evaporation corrected on calculated dispensing duration, not wall-clock, so operator delay at the balance cannot corrupt it.
- Campaigns fully randomized so drift, temperature and tubing fatigue spread across conditions.
- **Show:** `fig:app-grav-calibration` (`Pictures/app-grav-calibration`), with `fig:app-grav-percell` for the 76-replicate summary.

**7. Every measurement in the thesis was taken by software that cannot overwrite its own raw data.**
- Raw sensor logs and entered masses strictly immutable; every correction is a timestamped sidecar annotation; manual split points are hard boundaries automatic re-splitting cannot overwrite.
- Actuation commanded in rotor strokes, never in volume — "ensures that actuation remains strictly decoupled from calibration assumptions."
- Three variables the software explicitly cannot control: tube pre-wetting, droplet touch-off technique, ambient temperature and humidity.
- **Show:** `fig:app-curation` (`Pictures/app-curation`).

**8. The requirements are a binary gate, and the criteria only run after it.**
- Every system-level requirement is pass/fail: "A concept failing any requirement is eliminated prior to weighted criteria evaluation." Feasibility is itself scored 1–10, pass at ≥5.
- Eight module matrices with weights on a 0–100 scale; pump has 30 criteria, electronics only 3 requirements and 11 criteria — defended by module hierarchy, not conceded as an omission.
- Two parameters were revised by the protocol survey: five → six fluids, and a fixed eight-tube format → several tens of tubes per run.
- Tube holding was absorbed into alignment; the enclosure was specified but never built.
- **Show:** `tab:app-global-requirements` (App I) plus one module matrix page, e.g. `Pictures/cr-pump`.

**9. The syringe pump was rejected on measured performance, not on preference.**
- 108 dispenses, 13 conditions, two barrels, April 2026, on a commercial laboratory instrument rather than a home-built one.
- At 1 µL the 10 mL barrel delivered 1.94 µL — **+94.3 %**.
- Error scales with barrel bore: the 20 mL barrel hit **−29.0 %** at 500 µL / 200 µL·min⁻¹ where the 10 mL barrel was −3.8 %.
- Category score 68 (10 mL) vs 38 (20 mL); the small-volume, slow-flow cell is the weakest on both.
- **Show:** `tab:app-syringe-conditions`, or `fig:app-syringe-category-score` (`Pictures/app-syringe-category-score`) for a one-look version.

**10. Rotary beat the linear chamber pump on hygiene and size, after both cleared the accuracy gate.**
- 3485 vs 3185 weighted points. Rotary gained 610 points over eight criteria, 380 of them from footprint, mass and cleanability.
- The linear pump's superior accuracy (5 vs 3) and reproducibility (5 vs 3) were worth only 30 points combined, because accuracy and reproducibility are ±10 % pass/fail gates both designs already cleared.
- The disqualifier was structural: multi-reagent reciprocating pumping needs an array of check valves, introducing "internal wetted moving elements, fluid traps, and cleaning burdens".
- Missing criterion disclosed: throughput was never in the matrix; batch runs took ~30 minutes longer on the linear pump.
- **Show:** `tab:app-pump-comparison` (App J).

**11. About thirty pump mechanisms were generated before two were built.**
- Six families: tube squeeze, displacement, check-valve, flow-control openable, gravity, surface tension.
- Seven cleared screening; five were developed, two deferred (traveling tourniquet — mechanical complexity; air-alternated gated chamber — unresolved bubble entrapment).
- The field was deliberately wide: a piano hammer striking a fluid-filled string, a tattoo needle piercing an elastomeric membrane.
- **Show:** `tab:app-pump-families` + `tab:app-pump-shortlist`; sketches `Pictures/app-sketch-discrete-peristaltic` and `app-sketch-fixed-height-gravity`. ⚠ Do **not** crop `app-perry-syringe-pump` — CC BY-NC-ND.

**12. The compensating arc is independent of the tube bore — that is the model's real result.**
- The withheld volume V_roller = A·L_c divided by A cancels the bore: ΔArc = L_c, ΔArc_total = N_c·L_c.
- At the design point: L_c = 3.25 mm, N_c = 2, compensating arc 6.51 mm, delivering arc 24.48 mm, total 30.98 mm.
- Compensation is what makes the rotor 19.7 mm instead of 15.6 mm — a **26 % increase**.
- Sensitivity to be honest about: 3.4 µL per mm of gap error, on a 1.62 mm nominal gap.
- **Show:** `tab:app-pump-design-point` (App K), plus `Pictures/tool-occlusion-calculator`.

**13. Four rollers is the only count that satisfies geometry, backflow and torque at once.**
- 0.51 mm bore is the only tested bore feasible across N = 3 to 12 (wide bores collide with the 7 mm hub boss, narrow bores exceed the 300 mm tube length).
- N = 3 leaves the path momentarily unoccluded during transitions → hydrostatic backflow, so ≥2 engaged rollers are needed.
- Torque: FoS 2.03 at 12 V (3.05 at 24 V) for N = 4; N = 6 falls to 0.90 and stalls at 12 V; N ≥ 8 stalls outright.
- At 12 V / 2000 steps·s⁻¹, the inductive ceiling is 1333 steps·s⁻¹ → ≈0.67 derating, which 24 V removes.
- **Show:** `tab:app-pump-fos` and `tab:app-pump-feasibility`, or `Pictures/tool-rotor-results` for the live version.

**14. A tube that stretches straight instead of hugging the wall changes the dose by at most 2.2 %.**
- Chord-only reasoning suggests a 10 % reduction; including the roller wrap term collapses it to a few percent.
- Four path assumptions span 30.65–31.70 mm packet length, 4.89–5.11 µL, −2.2 % to +2.2 %.
- Inverting for 5.0 µL gives rotor radii 19.70–20.37 mm, <0.7 mm spread — below the print tolerance, so the baseline was kept.
- Sealing survives axial pre-strain up to ε ≈ 28 %, against 2–5 % from manual insertion.
- **Show:** `tab:app-path-comparison` and `fig:app-tensioned-path` (`Pictures/tool-tensioned-path`).

**15. Fifty alignment concepts were narrowed on six sketch sheets — and only one was ever built.**
- Ten survived the qualitative screen; the decision chain is sheet-by-sheet, each inheriting the last.
- Criteria hierarchy declared before scoring: "cleanability is the primary concern, and feasibility is second".
- Two honest ties: side-push vs top-push at 17 each (resolved by building both); rack-and-pinion vs lead screw, where the handwritten 23 was an arithmetic error and the corrected 24 is set in type on the plate.
- This is exactly the "breadth on paper only" the Discussion criticizes.
- **Show:** `tab:app-alignment-chain` plus one plate, e.g. `Pictures/alignment-sketch-4-push-direction-scoring` or `alignment-sketch-5-mechanism-scoring`.

**16. The indexing stage passed eleven of thirteen bench checks and the two it did not are named.**
- Return-to-zero over three 132 mm round trips: commanded 13 464, counted 13 470 / 13 467 / 13 477 — **zero step loss**, +0.06 / +0.03 / +0.13 mm.
- Resolution: 4096 half-steps ÷ (π × 12.80 mm) = 102.0 half-steps/mm ≈ 9.8 µm per half-step, against a 22 mm tube pitch — three orders of magnitude finer than needed.
- Homing repeatability 2 half-steps ≈ 0.02 mm; shared-bus stress test zero stalls across 75 sensor readings, step interval stretched 1.6 %.
- Verification debt: the travel-budget fault trip was code-reviewed rather than run (it would have stalled the motor into a hard stop for >60 s), and rail voltage / coil resistance were never metered.
- **Show:** `tab:app-alignment-bench` (App L).
- **Pair this with the failure:** the same stage lost steps in the integrated machine when unfolded tube caps rubbed the lane wall — "Positioning repeatability holds only when external friction is absent." (§12.3)

**17. The second pump buys most of the time; the remaining four buy little.**
- Reference protocol, 32 samples: 399 s serial → 245 s with two pumps → 221 s with six. The second pump accounts for ~86 % of the attainable saving.
- At 16 samples: reference load −37 % on two pumps and only −42 % on six; the light two-reagent load stops improving after two pumps entirely.
- Fixed constants the numbers rest on: 1 s rack index, 5 s rack changeover, 8 tubes per rack, all pumps at one stroke rate.
- Stated exclusions: priming, calibration, homing and operator action are outside the model; the animation is illustrative, not timing-accurate.
- **Show:** `tab:app-throughput` (App N).

**18. Six pumps on twenty-one pins works only because the step clock is shared.**
- One step line and one direction line drive all six DRV8825s in parallel; six dedicated active-low enables go to native pins "to guarantee single-instruction cut-off… if the peripheral bus stalls".
- 19 of 21 GPIO assigned, 2 free; alignment axes and limit switches moved onto an MCP23017 expander (10 of 16 channels used).
- The second ceiling is peripheral instances, not pins: three serial ports, two I²C, two usable SPI; a smart driver allowing four devices per serial line would need two lines for six drivers and leave the console with none.
- A real collision found: the vendor BSP's default I²C pins overlapped two SPI chip-selects and would have toggled select lines silently; firmware binds I²C explicitly to A4/A5.
- **Show:** `tab:app-pin-map` and `fig:app-matrix` (`Pictures/tool-architecture-matrix`).

**19. The whole electronics bill is about €248, and the control electronics alone about €103.**
- Twelve line items, single Danish distributor including 25 % VAT, July 2026; the NEMA17s (6 × €14.41) and the touchscreen (€23.32) dominate.
- Provenance stated: 17 of 26 components quoted from a listing, 2 supplies are the nearest stocked wattage, 7 carry unsourced estimates; every displayed figure inherits its weakest input's confidence.
- "The ordering between architectures is the durable output; the absolute figures are not."
- The build is deliberately partial — two of six channels wired, and each future driver must be installed together with its pull-up or an undriven DRV8825 enable defaults to active.
- **Show:** `tab:app-bom` (App N).

**20. The project ran late in exactly the way its own March risk register predicted.**
- The plan named task delays and late-stage integration bottlenecks as primary risks; both materialized. "The front end held. Everything downstream of the first prototype ran later than planned."
- The mitigation — incremental integration — was derailed by six weeks of shipping delay on the pump tubing, forcing parallel module tracks.
- At the partner's finish only the storage module was mature, and not adapted for integration.
- The recovery was hours: 09:00 to past 22:00, weekends included, for the final two months.
- The one decision the author would reverse: engineering the pump entirely from scratch without having run the open-source landscape search first.
- **Show:** `fig:project-timeline` (`Pictures/fig-project-timeline`).

---
---

# 5. WEBSITE TOOLS REFERENCED

Every pointer to `https://sirsirio.github.io/thesis-tools/` or a named tool, found by grepping `sirsirio|thesis-tools|livetool` across `Chapters/`, `Backmatter/` and `Frontmatter/`. Nine live references plus one commented-out.

| # | Tool name as printed | URL as printed | Where | Blurb (verbatim) |
|---|---|---|---|---|
| 1 | **Thesis Tools** | `sirsirio.github.io/thesis-tools/` | `Frontmatter/Preface.tex:48` | "Interactive models, explorers, videos, and prototype test records built alongside this thesis." |
| 2 | **Rotor Geometry Solver** | `.../tools/rotor-solver/` | `Chapters/06_Pump-Module.tex:371` (§6.x, rotor geometry / torque derating) | "Set a stroke volume, a bore and a bearing, and every roller count is screened at once --- feasibility, rotor size and torque margin." |
| 3 | **Peristaltic Occlusion & Displaced-Volume Model** | `.../tools/peristaltic-roller-displaced-volume-model/` | `Chapters/06_Pump-Module.tex:447` (occlusion cross-section) | "Close the tube and watch the residual area fall, the contact length grow, and the compensating arc follow from them." |
| 4 | **Operator Interface Prototypes** | `.../tools/ui-prototypes/` | `Chapters/09_User-Interface-Module.tex:200` | "All five rounds of candidate screens, drawn at the panel's real size. Switch on the touch-target overlay, re-quantise the colours to the panel's own depth, and read the contrast audit each candidate runs on itself." |
| 5 | **System Architecture Explorer** | `.../tools/system-architecture-explorer/` | `Chapters/10_System-Architecture-and-Electronics.tex:91` (§10.x, Weighing the options) | "Twenty-five candidate electronic architectures, costed against a real supplier catalog and audited against microcontroller pin allocations." |
| 6 | **Dispense Throughput Simulator** | `.../tools/dispense-throughput-simulator/` | `Chapters/10_System-Architecture-and-Electronics.tex:156` (§10.x, How much parallelism is worth buying) | "Set the reagent volumes and the pump speed, then sweep how many pumps run at once and watch the batch time, the bottleneck station and the schedule move with it." |
| 7 | **System Architecture Explorer** (second panel, appendix version) | `.../tools/system-architecture-explorer/` | `Backmatter/App-N-Architecture-Tools.tex:188` (§N.1) | "All twenty-five candidates with their costs, pin verdicts and bills of materials --- sortable, filterable, and with every component price open to edit." |
| 8 | Site root, cited as the home of all three pump calculators | `https://sirsirio.github.io/thesis-tools/` (printed as a `\url`) | `Backmatter/App-K-Pump-Design-Models.tex:529` (§K.4 *The calculators*) | "These calculators are openly accessible at: … The underlying source code is archived alongside the digital project deliverables." |
| 9 | The three calculators named in App K §K.4 | (all under the site root above) | `Backmatter/App-K-Pump-Design-Models.tex` §`sec:app-model-tools` | (a) Peristaltic Occlusion & Displaced-Volume Model — "Computes the stadium cross-section, contact length L_c, and compensating arc"; (b) Peristaltic Rotor Geometry Solver — "Evaluates rotor feasibility, torque margins, and nominal dimensions across all roller counts"; (c) **Tensioned Tube Path Model** — "Plots candidate tube paths and calculates volume deviations under axial strain" |
| 10 | ⚠ **Operator Interface, Live** | `.../tools/ui-mockup/` | `Chapters/09_User-Interface-Module.tex:374–375` — **COMMENTED OUT** | "Walk every screen of the finished operator interface in your browser, at the panel's real size." |

**Notes that matter for the defense:**
- The **Tensioned Tube Path Model** is named only in App K §K.4 and has **no `\livetool` panel of its own** anywhere in the thesis — it is the one tool without a printed call-out box.
- The **ui-mockup** panel at `Chapters/09_User-Interface-Module.tex:374` is commented out with the note: *"TRY IT LIVE -- fill the address once the UI-mockup tool page exists, then uncomment."* The tool page now exists in the site repo (`tools/ui-mockup/`, untracked in git status), so **this is a live discrepancy: the thesis as submitted does not print a link to the finished interface mock, only to the five prototype rounds.** If a committee member browses the site they will find a tool the document never points at.
- The **ui-prototypes address is a frozen contract**: the source file carries the comment *"The address is a contract with repo 02: the printed QR cannot be re-pointed after hand-in."* Ch. 9 prints that address, so `tools/ui-prototypes/` must never move.
- App N states both architecture tools "run in a browser and both are public; their addresses are given beside the sections that use them."
- The Preface makes the site part of the thesis's argument, verbatim: *"describing an interactive instrument in print is like summarizing a film with stills and text---it conveys the outcome, but misses the moving mechanism. Readers are warmly invited to explore the living record directly."* This is the line to use if the committee asks why a thesis has a website.

---
---

# APPENDIX TO THIS REPORT — three flags for slide accuracy

1. **−5.0 % vs −4.5 %.** `tab:pump-two-heads` (Ch. 6, l. 1204) gives Channel 2's error on its own constant as **−4.5 %**; §12.2 and §13.1 both say **−5.0 %**. Put −5.0 % on the slide (both narrative chapters use it) and know the table value exists.
2. **"Five mL of each dispensed liquid" vs the 4 mL vial.** The requirement in App I says the device must hold "up to at least 5 mL of each dispensed liquid"; §12.3 reports the built machine using a **4 mL vial** giving three to four doses at 1000 µL. This requirement is not separately graded in `tab:validation-verdict` — it sits inside "Versatility", which is marked *Met\**. A sharp examiner could press here.
3. **The Conclusion has no contributions list.** If the talk needs one, it must be built from §1.3's six objectives plus the Conclusion's third paragraph. Do not present a numbered contributions list as a verbatim quotation from the Conclusion — it is not there.
