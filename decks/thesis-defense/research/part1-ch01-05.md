# Thesis defense source report — Chapters 1–5 + frontmatter

Source: `D:\03. DTU - Offline\03. MASTER THESIS\01. Thesis Document LaTex\latex\`
Read in full: `Frontmatter/Abstract.tex`, `Frontmatter/Preface.tex`, `Chapters/01_Introduction.tex`, `Chapters/02_Background.tex`, `Chapters/03_Methodology.tex`, `Chapters/04_Engineering-with-AI.tex`, `Chapters/05_Requirements-and-Decomposition.tex`. Main file is `main.tex` (a `main-full.tex` also exists that forces a whole-thesis build). Also consulted, for the requirements section only: `Backmatter/App-I-Requirements-Criteria.tex` and `Chapters/14_Conclusion.tex` (15 lines, read because the intro→conclusion airport callback was asked for).

---

## 1. PART STRUCTURE

From `main.tex` (the three `\part` headings do **not** reset the chapter counter; chapters run 1–14 straight through):

**Part I — "Introduction, Background and Methods"**
- Ch. 1 Introduction
- Ch. 2 Background
- Ch. 3 Methodology
- Ch. 4 Engineering with AI: from Design to Documentation

**Part II — "Problem Analysis and Module Development"**
- Ch. 5 Requirements and System Decomposition
- Ch. 6 Pump Module
- Ch. 7 Alignment Module
- Ch. 8 Nozzle Module
- Ch. 9 User Interface Module

**Part III — "Integration and Conclusions"**
- Ch. 10 System Architecture and Electronics
- Ch. 11 Integration
- Ch. 12 System-Level Validation
- Ch. 13 Discussion and Reflection
- Ch. 14 Conclusion

After Ch. 14 there is a one-page **"Summary of findings"** that auto-collects every chapter's `\takeaway{}` in order (a trial feature added 2026-09-19). Appendices: A Protocol Survey, B Dispensing Error, C Printer Characterization, D Test System, H AI Use, I Requirements & Criteria, J Pump Concept Record, K Pump Design Models, L Alignment Module Record, UI Operator Manual, N Architecture Tools, Q Self-Evaluation.

Note: chapters 1–3 carry one chapter-level takeaway each, except **Chapter 1 has no `\takeaway{}` at all**, and Chapter 3's takeaway is the one at §3.4 (the §3.5 summary with its own takeaway is commented out and does not compile).

---

## 2. THE AIRPORT SCENE (verbatim)

Opening paragraph of §1.1 "Motivation: bringing sample preparation to the point of care" (`01_Introduction.tex`, lines 20–29). Verbatim, no citations in this paragraph:

> A passenger steps off a long-haul flight into a crowded arrivals hall during the first weeks of a viral outbreak. They have a fever. A border officer pulls them aside and collects a nasal swab, but verifying the virus means sending that tube to a central laboratory. In that moment, screening runs into an impossible dilemma. Keeping an exhausted traveler and their seatmates confined in an airport holding room for 24 to 48 hours is an operational nightmare; yet waving them through customs risks sending an unconfirmed infection onto trains, buses, and crowded city streets. An automated test delivering an answer in under an hour resolves the tension at the gate, isolating cases before anyone leaves the terminal. When confirmation takes a full day, the test comes too late to inform decisions at the border.

**Where it returns.** Chapter 14 (Conclusion) is explicitly written to close on it — the chapter's own authoring note says: *"close on the airport passenger of §1.1, honestly future."* The conclusion opens with "While a molecular test can run at an airport gate, the patient swab is still prepared by hand at a bench by a trained operator (§1.1)" and its final paragraph is, verbatim:

> Returning, finally, to the traveler in the arrivals hall: today, their swab must still travel to a central laboratory. This thesis shows that sample preparation does not have to. A portable instrument can dispense liquids precisely and unattended. Before it can stand at an airport gate, it must be rebuilt from matured modules, tested on real reagents with real users, and paired with a reader that delivers the final diagnostic result. Whether that traveler can one day be tested and cleared before leaving the terminal remains an open question, but it is no longer one that only a central laboratory can answer.

This is the single strongest open/close device in the thesis — use the first paragraph on the opening slide and the last on the closing slide, verbatim.

---

## 3. PER-CHAPTER MATERIAL

### ABSTRACT

**a. Narrative.** Automated liquid dispensing is precise inside the laboratory and largely absent outside it, which keeps the sample preparation behind point-of-care molecular tests tied to a bench. The thesis designs, builds and tests a portable dispenser that serves multiple protocols rather than one assay: 5 µL to 1000 µL, up to six reagents, forty tubes unattended. Requirements and weighted criteria were derived from five sample-preparation protocols across clinical, veterinary and environmental testing, and the instrument was decomposed into modules ordered by how strongly each constrains the others. Pump, alignment, nozzle, user interface and electronics were each developed through repeated design–build–test–learn cycles; reagent storage came from a companion thesis. Parametric CAD and a characterized 3D printer kept the cycles short, and the engineering ran alongside an AI coding assistant inside a deliberately structured environment (written specs, repository working memory, a separate literature-retrieval pipeline). The resulting two-channel prototype matched manual pipetting in repeatability, met ±10 % accuracy after per-head calibration and completed a forty-tube run without intervention. The abstract is candid about the asymmetry: the pumps were experimentally validated but their real stroke volumes diverged from theory and needed empirical calibration, while the alignment module was explored broadly on paper and built in only one configuration — which nonetheless set the machine's footprint.

**b. Key facts and numbers.**
- Volume span: **5 µL to 1000 µL**
- Reagents: **up to six**
- Tubes per unattended run: **forty**
- Requirement source: **five sample-preparation protocols**, clinical / veterinary / environmental
- Accuracy requirement met: **±10 %**, *after per-head calibration*
- Prototype built as **two-channel** (two of six reagent channels)
- Repeatability: **matched manual pipetting**

**c. Message-style headlines.**
- "A portable dispenser can match manual pipetting — but only after calibrating each pump head on the instrument"
- "Five protocols, not one assay, set the specification: 5–1000 µL across six reagents"
- "The prototype ran forty tubes unattended and never needed the operator"
- "The pumps' real stroke volume is not their theoretical one"
- "One alignment kinematics was built, and it set the footprint of the whole machine"

**d. Figures.** None (abstract).

**e. Quotable sentences.**
- "Automated liquid dispensing is precise inside the laboratory and largely absent outside it, keeping the sample preparation behind point-of-care molecular tests bound to the bench."
- "The resulting two-channel prototype matched manual pipetting in repeatability, met the ±10 % accuracy requirement after per-head calibration, and completed a forty-tube run without intervention."
- "...field users ultimately require an actionable diagnostic result rather than an isolated prepared sample."

**f. Likely committee questions.**
- *Why two channels and not six?* — Scaling was a paper study; the build proved the architecture on two heads (abstract, "engineering trade-offs" paragraph; detail in Ch. 12/13).
- *"Met ±10 % after per-head calibration" — is that meeting the requirement?* — The requirement is on delivered volume, and calibration of systematic offset is explicitly sanctioned by ISO 8655 (Ch. 2 §2.2).
- *Why did stroke volume diverge from theory?* — Tube elastic recovery and printed-geometry tolerance; diagnosed via the printer characterization (Ch. 3 §3.3, Ch. 6).
- *Was it ever tested on real reagents?* — No; water and dye only (stated in Ch. 14 and Ch. 13).

---

### PREFACE (brief)

32.5 ECTS, MSc Biotechnology, DTU Department of Bioengineering, NanoBio Integrated Systems (NaBIS) group, **February to September 2026**. Supervisors: Senior Researcher **Maria Dimaki**, Professor **Winnie Edith Svendsen**, Professor **Lars Hvam**. Close collaboration with **Marius Dornonville de la Cour Schiller**, who submitted a companion thesis on the shared platform; because Sirio's timeline ran longer, he integrated, wired and evaluated the complete prototype. He entered from a biotechnology background with only some prior CAD / prototyping / electronics / AI-assisted engineering. Thanks include Pulkit Saluja (mechanical design and electronics guidance) and Konstantinos.

Two lines worth putting on a slide:
- "describing an interactive instrument in print is like summarizing a film with stills and text---it conveys the outcome, but misses the moving mechanism."
- "All architectural decisions, experimental interpretations, and final conclusions remain strictly my own".

The preface carries the first `\livetool` panel: **Thesis Tools — sirsirio.github.io/thesis-tools/** (label `tool:site`).

Two OPEN ITEMS remain as LaTeX comments in the preface (the Maria thanks clause is flagged as a placeholder). Not defense-relevant, but do not quote that sentence as final.

---

### CHAPTER 1 — INTRODUCTION

**a. Narrative.** The chapter opens on the airport scene and converts it into a measured claim: delay is the defining failure of centralized testing, and it is measurable. Point-of-care testing removes the transport step, but the expansion of decentralized diagnostics has been concentrated in lateral-flow strips, which are less sensitive than molecular tests; anything requiring multi-step sample preparation still defaults to a central laboratory. The EU Horizon project PAIR and its portable instrument PANPOC make the gap concrete: PANPOC can detect at the gate, but its magnetic-bead preparation is about a dozen manual steps with six liquids from 5 µL to 1 mL. Rather than build an accessory for PANPOC, the thesis generalizes the mechanical task — portable, automatic dispensing across multiple reagents and tubes — because protocols from clinical, veterinary, plant, water, agricultural and soil work place similar demands. §1.2 argues why this is hard: microlitre volumes where relative error surges, several liquids with different physics, strict carry-over prevention, and a field that removes both the controlled environment and the technician. Four existing approaches are then shown each to fail on at least one of precise / portable / automated / protocol-independent. §1.3 states the problem and six objectives; §1.4 draws the boundary (dispensing only, no detection, no bead manipulation, engineering prototype not a product); §1.5 lays out the three parts.

**b. Key facts and numbers.**
- Airport holding room dilemma: **24 to 48 hours** confinement vs. an automated test answering in **under an hour**
- Standard molecular testing in-hospital: **median turnaround >26 h** swab-to-result, vs **2.6 h** at the point of care with a portable molecular test (Collier 2020)
- Cameroon, **seventeen** national reference laboratories: **3.9 %** of HIV viral-load specimens rejected on arrival; **nearly two thirds** of rejections from specimen identification errors
- Point-of-care instrument market projected to **nearly double between 2024 and 2033**
- PANPOC preparation protocol: **about a dozen steps** (11–12 numbered), **six different liquids**, **5 µL to 1 mL**
- Pipetting by 20 laboratory professionals: inconsistency rises from **0.2 % at 1 mL** to **5.7 % at 10 µL**; **years of experience made no difference** (Lippi 2017)
- Device specification: **5 to 1000 µL per liquid**, **up to six distinct reagents**, **several tens of standard 1.5 mL and 2 mL tubes**, unattended
- Protocol survey: **four of five** surveyed procedures operate between single-digit µL and ~1 mL, requiring **three to six** distinct reagents
- Field throughput reality: central labs process **thousands of samples daily**; deployed field sites collect **tens of samples per day**
- **Six numbered objectives** (see below)
- Named comparators: Tecan Fluent (lab robot), Roche cobas liat (cartridge), suitcase qPCR in Ethiopia, West African Ebola mobile labs
- PAIR = Pandemic Information to Support Rapid Response, Horizon Europe, DTU a partner

The six objectives (verbatim-condensed, §1.3, all assessed in Ch. 13):
1. Derive requirements for portable liquid dispensing from sample-preparation protocols and field conditions, translating them into a modular architecture
2. Design and build a functional prototype from off-the-shelf components and 3D-printed parts, dispensing 5–1000 µL across up to six liquids into several tens of standard tubes
3. Investigate how the design scales across volumes, reagent channels and sample capacity, and identify the resulting trade-offs in system complexity
4. Characterize accuracy and precision of the prototype against manual pipetting on the reference PANPOC protocol, using a defined measurement procedure
5. Assess the completed system against the derived requirements — met, partly met, missed — and what the fabrication route contributed
6. Identify the technical and operational developments needed before field deployment and validation

**c. Message-style headlines.**
- "Detection can travel to the airport gate; the sample preparation cannot"
- "A swab answered in 26 hours is answered too late to act on"
- "Rapid strips went portable because they skipped sample preparation — molecular tests cannot"
- "Trained hands are 28× less consistent at 10 µL than at 1 mL, and experience does not help"
- "Don't build an accessory for one assay: generalize the mechanical task instead"
- "No existing instrument is precise, portable, automated and protocol-independent at the same time"

**d. Figures.**
- `fig:portable-qpcr` — `Pictures/fig-portable-qpcr`, width 0.55\linewidth. Gist: equipment of a mobile molecular testing laboratory for malaria surveillance in Ethiopia — (A) magnetic induction cycler, (B) magnetic block, (C) plate shaker, (D) manual pipettes; reproduced under CC BY 4.0. **Type: photo.** This is the only figure in the chapter, and it is the best "the field still pipettes by hand" visual in the thesis.
- No tables in Ch. 1.
- Note: a pipetting-precision plot (`fig-pipetting-precision`) was cut on 2026-09-13 after supervisor feedback; the script survives in `assets/graphs/` if a slide chart is wanted for the 0.2 %→5.7 % claim.

**e. Quotable sentences.**
- "Detection can travel to the gate; the upstream preparation cannot."
- "Point-of-care testing removes the transport step entirely."
- "The objective is not to outperform human skill, but to make reliable dispensing independent of it."
- "Raw samples cannot be read directly."

**f. Likely committee questions.**
- *Why not just build the PANPOC accessory?* — Because five protocols across unrelated fields share the same dispensing demands, so an open reconfigurable architecture is a platform rather than another single-assay tool (§1.1 final paragraph).
- *Why tens of tubes and not hundreds?* — Field sites collect tens of samples per day; centralized throughput is not the target (§1.3, with figures in App. A §sec:app-throughput).
- *Why is manual pipetting the benchmark and not a lab robot?* — Protocols are written around manual pipettes, so the practiced technician is the practical baseline; the goal is to match them at the top of the range and beat them at the bottom (§1.3).
- *Why exclude magnetic separation / liquid removal?* — Those operations vary in presence and order between assays; integrating them would lock the hardware to one workflow. A separate magnetic-separation instrument is being developed in the same group by Pulkit Saluja (§1.4).
- *Why no detection?* — Detection is assay-specific and would predetermine which tests the dispenser supports (§1.4).

---

### CHAPTER 2 — BACKGROUND

**a. Narrative.** The chapter establishes that whatever the chemistry, the shared physical operation of sample preparation is dispensing measured volumes into tubes — so one dispenser can serve many protocols. It walks three preparation families (nucleic acid extraction, colorimetric, lateral-flow immunoassay), identifies nucleic acid extraction as the most liquid-intensive and the one PANPOC uses, and steps through the magnetic-bead sequence. §2.2 imports the ISO 8655 vocabulary — systematic error is calibratable, random error is not — and lists five physical causes of deviation (the liquid, the environment, the mechanism, the operator, the procedure), noting that automation removes the operator term outright. §2.3 shows what leaving the lab costs: power, environment, operator skill, reagent supply and calibration are all withdrawn, and introduces ASSURED/REASSURED plus the key structural insight that the upstream third of the sample-to-answer chain is protocol-independent while everything downstream is assay-specific. §2.4 surveys three classes of existing instruments with prices and specs; §2.5 compares five dispensing mechanisms and shows that only air displacement, positive displacement and peristaltic pumping cover 5–1000 µL. §2.6 scores the three instrument classes against four required properties and finds that no instrument has all four.

**b. Key facts and numbers.**
*PANPOC protocol:* six distinct reagents; **5 µL** (internal control RNA) to **1000 µL** (guanidine thiocyanate lysis solution); **three steps remove liquid**, the rest add it; two wash cycles with **70 % ethanol**; volumes are nominal, **without tolerances**.
*Error framework:* ISO 8655 (`iso-8655-1-2022`), systematic error vs random error (expressed as **CV**). Five causes: liquid, environment, mechanism, operator, procedure.
*Point-of-care:* annual service agreements typically **10–12 % of instrument purchase price**; on a $100,000 installation ≈ **$10,000/year**. REASSURED = Real-time connectivity, Ease of specimen collection, Affordable, Sensitive, Specific, User-friendly, Rapid and robust, Equipment-free, Deliverable to end-users. Sample-to-answer stages **1–3 protocol-independent, 4–8 assay-specific**.
*Laboratory systems:*
- Opentrons Flex: 5–1000 µL per pipette; **2.5 % CV at 5 µL**; the 5–1000 µL pipette has **>3× the imprecision** of the 1–50 µL pipette at 5 µL; **$25k list**
- Tecan Fluent: 0.5–1000 µL on one arm; **6.0 % CV at 0.5 µL**, roughly **30× higher** imprecision than at its best volume; manufacturer notes calibration may be needed **at and below 5 µL**; smallest model **1.15 m × 0.79 m**; **$20–25k used**
- Myra: 1–50 µL, **10 kg**, ≤10 % CV at 1 µL, **$29.5k list**
- Thermo Multidrop Combi: peristaltic cassettes, 0.5–2500 µL, **±10 % at 2 µL** (small-tube cassette) to **±1 % at 100 µL** (standard), 9.1 kg, **$4.5–8k used**
- Lead Fluid WSP3000: peristaltic, **1 µL–3 mL**, **±0.1 µL up to 20 µL** with narrowest bore, rated for magnetic-bead suspensions and lysis buffer, **$13.5k list**
- Formulatrix MANTIS: valve chip, from **0.1 µL**, **≤2 % CV**, **$63k list**
- Dispendix I.DOT: **8 nL–30 µL**, 0.1 nL resolution, **$33k used**
- Beckman Echo 525: acoustic, **25–5000 nL**, **<8 % CV**, **$65k used**; Echo 650 weighs **117 kg**, specified **16–26 °C**
- Tecan Cavro XCalibur: syringe, 50 µL–5 mL syringes, **≤0.05 % CV at full stroke**, degrading tenfold to **≤0.5 % at a tenth stroke**, **0.8 kg**
- Market range: automated liquid handlers "tens of thousands of dollars to >$100,000"
- Calibration burden: a Tecan "liquid class" required tuning **twenty-five parameters** over "at least one full day of workload"; a dispenser left uncalibrated **four years** kept repeatability **within 1 % CV** yet delivered **≈50 % more volume than programmed**
*Integrated platforms:*
- Roche cobas liat: **3.76 kg**, result in **twenty minutes**, **<1 minute hands-on**
- Alere i: influenza A and B in **under fifteen minutes**; supports **only three tests**
- Four-module GeneXpert **$19,000**, cartridges **$8–15** (discounted high-burden-country agreements)
- BIOFIRE instrument **≈$37,500**, respiratory panel reimbursed **$417 per test**
- Smartphone-coupled cartridge system: **829 g**, battery powered
- Yin 2026 handheld: moves beads not liquid; **10 cm cube**, **0.76 kg**
*Portable / open-source:*
- OTTO, FINDUS move commercial manual pipettes; the **$170–360** pipette is omitted from published build costs
- poseidon syringe platform: built for **under $400**
- Sidekick: four solenoid pumps, **10 µL increments**, **±0.1 µL** repeatability, **$710 build**, but delivered **11 % above nominal** uncalibrated and was characterized **exclusively with pure water**
- PHIL: 3D-printed peristaltic heads, within **±2 µL** of target across all tested volumes
- Das 2017: peristaltic with level sensing, **≈99.5 % accuracy over 1–100 µL**, **±150 nL**, **≈$150** hardware, needs no periodic calibration
- Nanopipette: pneumatic from **3 nL**, switching to air displacement above **0.5 µL**, up to **1 mL**; **±4.4 % at 1 µL**; tethered wand to a mains desktop unit, manual alignment
*Mechanisms:* peristaltic volume step as coarse as **0.5 µL** (down to 0.1 µL); air displacement holds precision over only **~one order of magnitude per channel**; "instruments sharing the same mechanism varied more in precision than instruments built on contrasting physical principles."

**c. Message-style headlines.**
- "Three different assay families, one shared operation: measured volumes into tubes"
- "Systematic error can be calibrated away; random scatter needs a better mechanism"
- "Automation eliminates one of the five error sources outright — the operator"
- "The upstream third of every point-of-care workflow is the same; only detection is assay-specific"
- "Precision without calibration decays silently: 1 % CV and 50 % over target after four years"
- "Only three of five dispensing mechanisms can reach from 5 µL to 1 mL at all"
- "Every property exists in some instrument; no instrument has all four"

**d. Figures and tables.**
| Label | File (in `Pictures/`) | Gist | Type |
|---|---|---|---|
| `fig:preparation-families` | `fig-preparation-families` | Step sequences for nucleic-acid, colorimetric and lateral-flow preparation, each step classified liquid added / removed / none | diagram (own, adapted) |
| `fig:bead-sequence` | `fig-bead-sequence` | The PANPOC magnetic-bead sequence tube by tube; RNA as filled discs, beads as ringed discs, magnet shown where it holds | diagram (own, adapted) |
| `fig:error-types` | `fig-error-types-a` | The two components of dispensing error: arrow from centre = systematic, dashed ring = random scatter | diagram (own) |
| `fig:pipette-anatomy` | `instr-pipette-principle` (h 74 mm) | Air-displacement pipette and cross-section; piston displaces a sealed air cushion. **KNAUER image — permission not yet requested** | vendor illustration |
| `fig:sample-to-answer` | `chen-sample-to-answer` (full width) | The eight-stage sample-to-answer workflow with reagent storage and waste underlying it; CC BY | diagram (reproduced) |
| `fig:instr-workstations` (`fig:instr-opentrons-flex`, `fig:instr-tecan-fluent`) | `instr-opentrons-flex`, `instr-tecan-fluent` (h 58 mm) | Two air-displacement workstations, not to a common scale. **Manufacturer images, permission not sought** | product photos |
| `fig:instr-leadfluid` (`fig:leadfluid-unit`, `fig:leadfluid-head`) | `instr-leadfluid-unit`, `instr-leadfluid-head` | Lead Fluid WSP3000 benchtop unit filling cuvettes, and its peristaltic head with rollers squeezing the tube | product photos |
| `fig:instr-mantis` | `instr-mantis` (0.62 width) | Formulatrix MANTIS: bottles feed disposable valve chips carrying the whole wetted path | product photo |
| `fig:instr-cobas-liat` | `instr-cobas-liat-tube` (0.66 width) | The cobas liat segmented assay tube — reagents sealed into segments at manufacture | product photo |
| `fig:instr-yin` | `instr-yin-handheld` (full width) | Yin 2026 all-in-one tube + handheld instrument; rotating magnetic field drags beads through stationary liquids | figure reproduced from paper |
| `fig:instr-sidekick` | `instr-sidekick` (0.72 width) | Sidekick: four solenoid displacement pumps feeding a nozzle on a jointed arm over a microplate; CC BY | figure reproduced |
| `fig:instr-phil` (`fig:phil-robot`, `fig:phil-pump`) | `instr-phil-robot`, `instr-phil-pump` | PHIL pipetting robot over a well plate, and one of its printed peristaltic pump heads; CC BY | photos |
| `fig:instr-das` | `instr-das-level-sensing` (0.92 width) | Das 2017 metering by level sensing: conventional pump-displacement arrangement vs a level-sensing unit between reservoir and pump; B is the unit in section | diagram reproduced (not open access) |

Tables:
- `tab:lab-vs-portable` — laboratory vs point-of-need across time to result, infrastructure, operator, cost, calibration, decision proximity. **Excellent slide table.**
- `tab:mechanism-envelopes` — the five mechanisms (air displacement, positive displacement, peristaltic, jetting, acoustic) against volume range, resolution, sensitivity, wetted path. Colour-coded good/partial/poor. **This is the concept-selection slide.**
- `tab:dispensing-instruments` (sidewaystable) — 15 instruments grouped lab / integrated / open-source, with mechanism, range, figures, price, portable, any-protocol. Landscape; needs splitting for slides.
- `tab:gap` — the three instrument groups × four required properties (precise across range, portable, unattended, any protocol). **The single most defensible "gap" slide in the thesis.**

**e. Quotable sentences.**
- "Most of this work consists of adding liquids, which makes sample preparation the stage where a dispensing instrument is needed."
- "Random scatter cannot be eliminated by calibration; it must be reduced by a better mechanism, or averaged down over repeated transfers."
- "Automating the transfer removes this operator variance entirely."
- "While each property is realized individually in existing hardware, no available instrument combines all four."
- Chapter takeaway: "While biological sample preparation relies on dispensing measured volumes of multiple reagents into tubes, no existing instrument delivers comparable precision across the full volume span in an unattended, portable, and protocol-flexible format."

**f. Likely committee questions.**
- *Why peristaltic rather than syringe or air displacement?* — Only the tube lumen is wetted, so the fluid path is cheap to replace and cross-contamination is controlled; the cost is tube-wear drift and a coarse volume step (§2.5, and the concept selection in Ch. 6).
- *Peristaltic tubes drift as they wear — how is that handled?* — Acknowledged explicitly as the mechanism's compromise (§2.5, citing Hostettler 2023); the answer in the build is on-instrument per-head calibration.
- *Is ±10 % actually competitive?* — The Multidrop Combi is specified at ±10 % at 2 µL and Sidekick was 11 % off uncalibrated; ±10 % sits inside the commercial envelope at the low end (§2.4, `tab:dispensing-instruments`).
- *Why compare against water-only work?* — That is stated as a limitation of the whole open-source class, and the thesis inherits it ("characterized almost exclusively with water", §2.4 summary) — which is also why Ch. 13 flags real-reagent testing as future work.
- *Why not acoustic or jetting, which are contactless and carry-over-free?* — Neither reaches the hundreds of microlitres; the one portable jetting system that does falls back to air displacement above 0.5 µL (§2.5 closing paragraph).

---

### CHAPTER 3 — METHODOLOGY

**a. Narrative.** Because volumetric accuracy, compactness and field robustness interact, development could not be linear. The chapter presents the design method (design thinking, Double Diamond, and a module-level design–build–test–learn loop), the parametric CAD that made geometry changes cheap, the additive manufacturing that made builds fast, and the measurement method that itself evolved. The first Double Diamond (problem space) maps onto Chapters 1–2; the second diamond's *Develop* and *Deliver* phases merged into continuous module-level iteration, with *Deliver* being the cumulative state of the prototype when development stopped rather than a terminal handover. Parametric modelling in Fusion 360 with a central parameter table let a single dimension change propagate across every mating part, and some parameters were written as expressions carrying empirical fit and shrinkage corrections. Printing constraints were treated as design parameters (orientation, warping, self-tapping pilot holes). The key methodological result is the printer characterization: a first coupon design failed because it confounded a size-proportional error with a size-independent one; the successful ring coupon separated them into two distinct compensation rules. Measurement passed through three methods — inline thermal flow sensor, gravimetric weighing adapted from ISO 23783-2, and finally in-tube weighing on the integrated machine.

**b. Key facts and numbers.**
- Printer: **Bambu Lab P1S**; **PLA** filament (3DE MAX, **1.75 mm**)
- Nozzles: **0.4 mm** default, **0.2 mm** for precision mechanisms (pump rotor, bearing seats); slicer profile locked
- Fasteners: pilot holes sized so **M2.5 and M3** screws form their own threads — no captive nuts
- Filament melts above **215 °C**; a temperature-controlled soldering iron above that threshold used for shaping and for **thermal welding of dovetail joints**
- Precision interface target: dimensional repeatability within **±0.1 mm**
- Calibration coupon: unconnected concentric rings spanning **22–88 mm**, middle size printed **in triplicate**, on the locked 0.2 mm profile, following **ISO/ASTM test-artefact methodology**; treated as linear transfer-function fitting and inverse prediction per the **NIST e-handbook**
- **Two compensation rules**: external (convex) diameters shrink **≈0.65 %**, scaling with size → CAD scaled up by a percentage; internal (concave) bores keep nominal scaling but lose a constant **≈0.14 mm on diameter** from extrusion bead curvature → CAD gets a constant offset
- Independent validation part: predicted to within **0.01 mm** (the caliper's display resolution, explicitly called unreliable); three prints of the same ring varied by **0.03–0.05 mm**; realistic prediction accuracy stated as **≈±0.10 mm**
- Prototype turnaround reduced "from weeks to hours"
- Three measurement methods in order: **inline thermal flow sensor** (concept selection) → **gravimetric weighing on an analytical balance**, procedure adapted from **ISO 23783-2** with a measured evaporation correction and a fully randomized test sequence → **in-tube weighing** on the integrated instrument
- Frameworks: Double Diamond (**Design Council, 2005**), design thinking (Dekker 2020), DBTL loop adapted from the **iGEM engineering cycle**, prototype definition from Ulrich & Eppinger
- *(Not compiled, but available:)* the commented-out §3.5 summary records that the flow sensor read **11.5 % low with four times the scatter** of a weighing on a discrete peristaltic dispense. This is the sharpest justification for abandoning it — but it is **not in the printed thesis**, so if used on a slide, present it as bench experience rather than citing a section.

**c. Message-style headlines.**
- "Characterize the tool once, and every part after it comes for free"
- "The first calibration coupon failed because it confounded two different errors"
- "Printed parts shrink proportionally on the outside and by a fixed amount on the inside — two rules, not one"
- "±0.10 mm was enough to print a peristaltic pump that meters consistently"
- "A fast measurement you cannot trust is worse than a slow one you can"
- "Deliver is not a phase here: it is wherever the prototype stood when the clock ran out"

**d. Figures.**
| Label | File | Gist | Type |
|---|---|---|---|
| `fig:double-diamond` | `Pictures/fig-double-diamond` | Two diamonds, divergent/convergent; problem space then solution space, design brief at the junction. Own drawing after the Design Council model | diagram (own) |
| `fig:design-loop` | `Pictures/fig-design-build-test` | The DBTL loop per module: enter at Design, discard before fabrication or after testing, advance to next iteration or integration. Own drawing, stages after iGEM | diagram (own) |
| `fig:print-compensation` | `Pictures/fig-print-compensation` | Two panels, small and large diameter: (a) external surfaces shrink with diameter → scale up by a percentage; (b) internal bores shrink a fixed amount → add a constant offset. Deviations drawn 20× true thickness | diagram (own) |

No tables in Ch. 3.

**e. Quotable sentences.**
- "A first coupon design did not work: it could not separate an error that grows with size from one that does not, and applying its single figure produced a part that missed its target."
- "In practice, measuring 3D-printed plastic parts with hand calipers is tricky, so this 0.01 mm figure was not especially reliable."
- "part orientation on the build plate was treated as a design parameter rather than a slicing detail."
- Chapter takeaway: "Iterative prototyping relied on a development and testing toolchain that matured through its own design--build--test--learn cycles: parametric CAD for rapid geometry updates, decoupled 3D printing compensation rules for dimensional fit, and a measurement method that moved from inline flow sensing to evaporation-corrected gravimetry as the prototypes exposed what each could resolve."

**f. Likely committee questions.**
- *Why abandon the flow sensor?* — It could not reliably isolate the short, pulsating deliveries of the first prototype; gravimetry became the arbiter (§3.4, with detail in Ch. 6 §6.3.2).
- *Is ±0.10 mm a defensible figure when you quote 0.01 mm elsewhere?* — The thesis itself says the 0.01 mm is at caliper display resolution and not reliable, and that print-to-print scatter of 0.03–0.05 mm puts the realistic figure at ±0.10 mm (§3.3). This self-correction is a strength; say it before they do.
- *Are the two compensation rules generalizable or printer-specific?* — Grgic 2023 reports the same division in PLA on a desktop machine (tenth-of-a-millimetre internal compensation, none external), so the structure generalizes even if the constants do not (§3.3).
- *Why ISO 23783-2 and not ISO 8655?* — 23783-2 is the gravimetric method for automated dispensing devices; 8655 supplies the error vocabulary and the pipette-equivalence benchmark (§3.4, Ch. 2 §2.2, and the pump-testing protocol).
- *How much of the "weeks to hours" claim is method vs. just owning a printer?* — The claim is attributed to in-house printing plus the parameter table; the fixed costs (coupons, parameter table, test app) are acknowledged as only affordable across many iterations (§3.3, and the unprinted §3.5).

---

### CHAPTER 4 — ENGINEERING WITH AI

**a. Narrative.** The chapter argues that unstructured AI use fails in physical engineering not by crashing but by producing plausible output that quietly diverges from unstated constraints, and that the remedy is environmental rather than conversational. It names three systemic failure modes — underspecification, context degradation, and instruction re-emergence — and illustrates them with a house-design analogy. The response is spec-driven development executed through GSD, an open-source framework that externalizes project memory into version-controlled markdown and runs each phase through discuss → plan → execute → verify → ship in fresh subagent contexts, with human effort concentrated at the two strategic ends (writing the spec, judging the verification evidence). An experimental extension into CAD (GSD-CAD, via a custom Fusion MCP interface) established a hard capability boundary: the assistant verified live parametric models well and caught fit errors before printing, but autonomous 3D generation failed — a small drafting board took roughly three hours of steering, and the alignment assembly was not feasible at all. §4.3 generalizes the lesson to hardware: four repositories acted as working memory, documentation was strictly layered (shallow registry first, deep records on demand), naming was uniform, and the DBTL loop was encoded into four reusable skills with four procedural rules. §4.4 routes literature retrieval away from the model entirely, because a fabricated citation has no physical backstop; a seven-database pipeline with reciprocal rank fusion and a cross-encoder reranker supplies the only records the assistant ever sees. §4.5 describes a five-phase writing workflow in which an interview stage extracts tacit knowledge, and splits drafting and prose polishing between two different models. §4.6 states the safeguards, the honest limits and the cost.

**b. Key facts and numbers.**
- Environment: **Visual Studio Code** + **Claude Code** agent, everything under **Git**
- Model comparison table (`tab:ai-model-comparison`), all superseded generations: references fabricated of 120 questions — Claude **3.1 %**, Gemini **60.6 %**, ChatGPT **27.7–52.9 %**; references fully accurate — **80.8 %** / **2.7 %** / **5.6–7.3 %**; code-generation prompts passed of 20 — **95 %** / **60 %** / **20 %**. Within-vendor spread noted: **Claude 3 Opus fabricated 18.3 %** of references in the same study that returned 3.1 %
- **Three** conversational failure modes: underspecification, context degradation, instruction re-emergence ("vibe coding")
- GSD = "Get Sh*t Done", open source, **release 1.7.0**; **five** steps: discuss, plan, execute, verify, ship; optional research step between discuss and plan
- GSD-CAD: custom **Model Context Protocol** interface to Autodesk Fusion; **Claude Fable 5**; small drafting board of several simple parts generated and printed after **roughly three hours** of steering; the alignment assembly **not feasible at all**
- **Four** repositories as working memory: design, testing (firmware + logs), CAD verification, thesis
- Naming convention **`proto-NN-<descriptor>`**
- **Four** skills encoding the DBTL loop: `design-for-target`, `diagnose-gap`, `plan-the-test`, `sparring-partner`
- **Four** procedural rules: context grounding first; explicit confidence tagging **[Certain] / [Likely] / [Guessing]**; zero parameter invention; explicit workflow hand-offs
- Worked example 1 — electronics: the assumption that six pumps needed a fast processor or several MCUs was redirected to the *drivers*; smart stepper drivers identified, then ruled out by supply shortage, leaving commodity drivers sharing one step clock from a single microcontroller
- Worked example 2 — pump: first prototype **underdelivered by 32 %** from incomplete occlusion caused by uncompensated printing tolerances; diagnosing it produced the printer characterization model (**±0.10 mm**); when the assistant proposed an over-engineered calibration matrix, human oversight cut it to a **single-coupon test**
- Citation fabrication evidence: reference lists of **eleven systematic reviews** → **471 citations** with extensive fabrications; audit of **120 technical prompts** → even the best model hallucinated **about one reference in thirty**
- **Four** literature rules: external database retrieval only; bounded summarization; claim-level traceability; mandatory human verification
- Pipeline: **seven databases in parallel** — PubMed, Scopus, Semantic Scholar, OpenAlex, IEEE Xplore, arXiv, Europe PMC; dedup by DOI / PubMed / arXiv ID / title; **Reciprocal Rank Fusion**; a neural **cross-encoder reads the forty leading candidates and returns twelve**, the only records the assistant sees; on a micro-peristaltic occlusion query two domain papers ranked poorly by RRF were elevated with relevance scores **0.447 and 0.373**; backward and forward citation-graph searching added
- **32 verified non-academic references** (vendor datasheets) feeding the commercial review in §2.4
- Writing: **five locked phases** — Scope, Structure, Interview, Draft, Review
- Model split: **Claude Opus 5** for multi-file synthesis, technical reasoning and drafting; **Gemini 3.7 Flash** in **Antigravity** for prose refinement and LaTeX typesetting
- Cost: subscription tiers from **Pro €20/month** to **Max €85–170/month**
- Honest limits: programmatic 3D assembly generation **failed outright**; the assistant **misweighted tolerance terms in the pump's analytical error budget**, corrected by hand; planning language from loaded project documents **leaked into the prose**, requiring an external checking script

**c. Message-style headlines.**
- "In mechatronics the AI failure mode is not a crash — it is a plausible answer that quietly breaks an unstated constraint"
- "Three structural failures: underspecification, context decay, and instructions that come back from the dead"
- "The fix is not better prompting; it is external memory, written specs and verifiable checkpoints"
- "AI can verify a CAD model against a spec; it cannot build the assembly"
- "A fabricated citation has no physical backstop — so retrieval was taken away from the model entirely"
- "Every AI claim was anchored to an external arbiter: a balance, a bench test, an API, or a hand calculation"
- "The assistant never verifies itself"

**d. Figures.**
| Label | File | Gist | Type |
|---|---|---|---|
| `fig:gsd-loop` | `Pictures/fig-gsd-loop` | The five GSD steps per phase with the artifact each produces and the shared state file they write into; dashed box = optional research step; failed verification re-enters as fix plans. Filled steps = worked by the author, outlined = delegated; the checkpoint marks where each result was judged | diagram (redrawn from framework docs, two own marks) |
| `fig:ai-working-loop` | `Pictures/fig-ai-working-loop` | The DBTL loop annotated with what the assistant contributed at each stage, documentation at the centre; Build is the one stage the loop did not govern throughout | diagram (own) |
| `fig:cite-search-pipeline` | `Pictures/fig-cite-search-pipeline` | Seven databases queried in parallel → dedup into unique works → Reciprocal Rank Fusion → cross-encoder reads 40, returns 12 → the only records the assistant sees; shared browser session for full text; no reference enters without approval | diagram (own) |

Table: `tab:ai-model-comparison` — two independent comparisons of language models on unrelated tasks, with the explicit caveat that the numbers "support a choice and not a ranking."

**e. Quotable sentences.**
- "models excel at generating plausible, functional outputs that quietly diverge from unspoken physical constraints or prior decisions---all while communicating with unvarying confidence."
- "the assistant's self-assessment is never accepted as verification."
- "Where the search pipeline prevents the assistant from inventing facts, the interview prevents it from dictating claims."
- "AI collaboration did not replace engineering judgment; instead, it structured trade-off analyses, formalized mathematical models, and evaluated empirical data within a closed loop grounded by physical measurement."
- Chapter takeaway: "Generative AI accelerated technical drafting and analysis, but engineering rigor required external memory and structural verification. By anchoring every interaction to version-controlled specifications, physical measurements, and explicit human gatekeeping, this environment transformed a conversational assistant into a grounded, verifiable engineering tool."

**f. Likely committee questions.**
- *How do we know the work is yours?* — Every requirement, geometry, firmware architecture, derivation and text revision was directed, evaluated and approved by the author; the chapter opening states it and App. H carries the full declaration (§4 opening, §4.6, Preface).
- *Did the AI write the thesis?* — Drafting was split (Opus 5 for synthesis and drafting, Gemini 3.7 Flash for polish) inside a five-phase workflow where the **interview** phase extracts the author's own tacit knowledge, and approval remained the author's, "supported by repeated manual line-by-line reading" (§4.5).
- *How are the citations trustworthy?* — Retrieval was structurally removed from the model: seven databases, RRF + cross-encoder, and no reference enters the bibliography without manual inspection (§4.4).
- *Where did the AI actually fail?* — Autonomous 3D assembly generation failed outright; it misweighted tolerance terms in the pump error budget; planning language leaked into prose (§4.2 CAD extension, §4.6).
- *Is this a methodology or a tools list?* — It is presented as a methodology with two named engineering outcomes: the driver-vs-MCU redirection and the 32 % underdelivery diagnosis that produced the printer model (§4.3 "the loop in practice").
- *What did it cost?* — €20/month to €85–170/month across subscription tiers (§4.6).

---

### CHAPTER 5 — REQUIREMENTS AND SYSTEM DECOMPOSITION

**a. Narrative.** The chapter converts the qualitative problem into three engineering artefacts: quantifiable pass/fail requirements, weighted criteria for ranking concepts, and module boundaries. It begins by separating the five error sources by remedy — automation kills the operator term, calibration kills reproducible offsets, leaving fluid properties, environment and mechanism as the real design problem — then formalizes the need with 5W2H and arrives at a single design-problem statement that governs the rest of the thesis. §5.2 surveys stakeholders and use cases, reduces seven candidate focus areas to three (hazardous biological samples, unconditioned outdoor environments, non-professional users) and maps five functional opportunities on value against complexity; notably portability is *not* in the top value tier because it degrades gracefully, whereas contamination, reliability, safety and automation are all-or-nothing. §5.3 is a regulatory scan concluding that the dispenser is general laboratory equipment rather than an IVD accessory — because it examines nothing and names no particular diagnostic device — while noting both pathways impose nearly identical physical engineering obligations. §5.4 sets the system-level binary requirements and unweighted criteria, and explains the deliberate decoupling: requirements are gates, criteria rank only what already passed. §5.5 decomposes the instrument into eight functional modules ordered by dependency load, with the pump at the apex because it dictates everything downstream and the enclosure at the base because it inherits everything.

**b. Key facts and numbers.**
- The governing design problem (verbatim, italic block quote): *"Design a portable liquid dispenser capable of delivering 5–1000 µL of up to six reagents across tens of 1.5 mL and 2 mL tubes, unattended, at a precision equal or superior to manual pipetting, operated at the point of need by non-specialist personnel."*
- **5W2H** problem analysis (`tab:problem-analysis`), seven questions
- **Seven** candidate focus areas evaluated → **three** selected: hazardous biological samples, unconditioned outdoor environments, non-professional operators. Sample throughput ranked lowest and excluded; indoor dispensing treated as a subset of outdoor
- **Five** functional opportunities: portability, contamination prevention, automation, reliability and reproducibility, operator safety
- **Four** stakeholder groups: healthcare and diagnostics; research and science; component manufacturers and suppliers; regulatory bodies
- Operator benchmark: a **single operator with no specialized training**, proficient after **approximately ten minutes of instruction**, workflow "analogous to a rapid antigen test"
- Regulation: **IVDR (EU) 2017/746** applies only to specimens **taken from the human body**; the accessory pathway (Art. 2(4)) needs an intent tied to **particular** named devices; MDCG classification guidance puts general laboratory products (canonically a **manual pipette**) outside scope. **Class A** is the lowest of four risk classes and the only one self-certifiable
- Standards named: **IEC 61010-1** (electrical safety), **IEC 61010-2-101** (IVD supplement), **IEC 61326-1** / **IEC 61326-2-6** (EMC), **EN 61010-1**, and in §5.4's closing gap note **IEC 62133-2** and **UN38.3** (battery)
- **Machinery Directive 2006/42/EC until January 2027, then Regulation (EU) 2023/1230**; Annex III 1.1.3 (filling, use, recovery, draining), 1.6.5 (internal parts cleanable without entering the machine), 2.1 (no leaching — belongs to food/cosmetic/pharma machinery, **adopted voluntarily** here)
- **Battery Regulation (EU) 2023/1542**: from **February 2027** portable batteries must be user-removable and replaceable — a geometric constraint on the enclosure
- Also cited: **EU RoHS/REACH/WEEE**, **EU Cyber Resilience Act 2024** (secure-by-default firmware with a declared support period), **US CLIA waiver** criteria
- Two parameters revised after the protocol survey: reagent capacity **five → six** fluids; sample capacity **fixed eight-tube format → several tens of tubes per run, still in an eight-tube-per-rack format**
- Module matrix sizes: electronics has **three requirements and eleven weighted criteria**; pump matrix has **thirty-one rows** per §5.5 — note the appendix says **thirty**, a small internal inconsistency; avoid quoting the exact count on a slide
- Weights quoted in-chapter: pump — unattended operation **60**, system integration **45**, compact footprint **80**, low mass **60**, accuracy **10**, reproducibility **5**; the highest automation criterion overall, operator-step minimization **85**, is allocated to storage and user interface, not the pump
- Criteria scale: weights **0–100**; concepts scored **0–100** relative to alternatives on the same matrix, not against an absolute external scale; weighted products summed for ranking

**c. Message-style headlines.**
- "The hard part is not metering fluid; it is metering fluid once the laboratory is taken away"
- "Automating the transfer deletes one error source; calibration deletes a second; three remain for the hardware"
- "Portability is a criterion, not a gate — because it degrades gracefully and contamination does not"
- "This machine examines nothing and names no assay, so it is general laboratory equipment, not an IVD"
- "Choosing the lighter regulatory pathway changes the paperwork, not the hardware"
- "Requirements are gates; criteria rank only what already passed — no score compensates for a failed threshold"
- "Accuracy carries the lowest weight in the pump matrix, precisely because it is already mandatory"
- "The pump sits at the apex: it constrains every other module, so every other module adapts to it"

**d. Figures and tables.**
| Label | File | Gist | Type |
|---|---|---|---|
| `fig:opportunity-matrix` | `Pictures/fig-opportunity-matrix` | The five functional opportunities plotted on value vs complexity; explicitly qualitative engineering judgment, no numerical scoring implied | diagram (own) |
| `fig:module-hierarchy` | `Pictures/fig-module-hierarchy` | The modules ordered by design independence and dependency load; apex dictates downward, base inherits and adapts. Tube holding nested inside alignment; enclosure drawn with open boundaries because deferred | diagram (own) |
| `fig:module-relationships` | `Pictures/fig-module-relationships` | Functional module relationships: liquid path storage → pump → nozzle → tube, control/data radiating from central electronics, a liquid barrier around the electronics, dashed enclosure boundary, tube holding dashed | diagram (own) |

Tables:
- `tab:problem-analysis` — the 5W2H unpacking of the dispensing problem. Good narrative slide.
- `tab:regulatory-paths` (sidewaystable) — general laboratory equipment vs Class A diagnostic accessory, row by row: what decides classification, then CE marking, notified body, EUDAMED, technical documentation, performance evaluation, electrical safety, EMC, machinery law, battery/materials/firmware. **Punchline: below the two particular standards the last two columns are identical.**
- `tab:global-requirements` — the system-level binary requirements in five categories. **Central slide.**
- `tab:global-criteria` — the system-level criteria in eight opportunity classes, unweighted at system level. **Central slide.**
- `tab:module-functions` — the eight modules, the function each carries, who developed it, and where it is written up. **Central slide.**

**e. Quotable sentences.**
- "The core technical problem is to maintain high volumetric accuracy and reliability once the external infrastructure of a centralized laboratory is removed."
- "Pass/fail requirements remain strictly decoupled from this scoring arithmetic: requirements operate as prerequisite gates, and a high weighted score cannot compensate for failing a mandatory threshold."
- "Choosing the general laboratory pathway reduces documentation and clinical audit burdens, but it does not alter the physical hardware or excuse lower engineering rigor."
- "an interface boundary is physically justified only if the transferred mass or information can be precisely defined."
- Chapter takeaway: "Translating decentralized operational needs into quantifiable engineering metrics establishes a two-tiered specification framework of binary pass/fail gates and weighted evaluation matrices, decomposing the instrument into eight functional modules ordered by design dependency."

**f. Likely committee questions.**
- *Why is portability not a requirement when it is the thesis title's premise?* — Because it degrades gracefully: a transportable instrument that needs a shelter is still useful, whereas contamination, unreliability, unsafety and manual intervention are binary failures (§5.2, reinforced in §5.4).
- *Why is the operating envelope indoor (18–25 °C) if the target is the field?* — A bounded mandatory envelope gives a verifiable characterization baseline, while the weighted criteria push the hardware toward field readiness (§5.4, penultimate paragraph).
- *Is this device an IVD?* — No: it examines no specimen, returns no diagnostic result, and names no particular device; the classification only changes if the documentation claims "validated for use with" a named assay, or if a system integrator bundles it (§5.3).
- *Why does accuracy carry a weight of 10 and reproducibility 5 in the pump matrix?* — They are already enforced as ±10 % pass/fail gates, and exceeding the protocol threshold has diminishing value; the weights therefore discriminate on footprint, cleanability and maintenance (§5.5, final paragraph).
- *Doesn't early decomposition constrain the concept space?* — Boundaries were treated as guidelines, and boundary-crossing concepts (e.g. an integrated reservoir with direct displacement metering) were evaluated on merit (§5.5).
- *Why is the enclosure never built?* — It sits at the base of the dependency hierarchy and its geometry depends on the aggregate volume of everything inside it (§5.5, `tab:module-functions` and `fig:module-hierarchy`).
- *Why were battery safety, EMC and leaching not in the requirement tables?* — Project chronology: the tables came from the initial define phase, the regulatory review came later; rather than retrofit the tables, they are carried as considerations for later development phases (§5.4, final paragraph). **Expect this question — the thesis pre-empts it explicitly.**

---

## 4. REQUIREMENTS, CRITERIA AND MODULE DECOMPOSITION (central to the talk)

### 4.1 System-level requirements — binary pass/fail gates
Any concept failing *any* of these is eliminated before scoring begins. From `tab:global-requirements` (Ch. 5 §5.4), with the fuller phrasing from `tab:app-global-requirements` (App. I) where it adds detail.

**Performance**
- **Accuracy** — delivered volume within **±10 %** of target, maximum absolute deviation **≤ 10 µL**
- **Reproducibility** — repeated dispenses of the same target agree within **±10 %**, absolute variation **≤ 10 µL**
- **Versatility** — compatible with **up to six distinct reagents** (originally "at least five"); delivery range **5–1000 µL** per dispense; batch processing of **several tens of 1.5 mL and 2 mL microcentrifuge tubes** (original record: 8 × 2 mL tubes at a time; generalized to several tens, still 8 tubes per rack); holding capacity **≥ 5 mL per reagent**
- **Feasibility** — technically realizable within project constraints; concepts scored **1–10** against comparable commercial/academic systems (10 = trivial, 1 = impossible); **pass requires ≥ 5**

**Automation**
- **Unattended operation** — autonomous execution of the dispensing sequence with no operator intervention after initial setup
- **Training** — operational proficiency achievable with **less than ten minutes** of instruction

**Field analysis and portability**
- **Operating envelope** — ambient temperature **18–25 °C**, relative humidity **20–60 %**, atmospheric pressure **800–1050 hPa** (altitudes up to **2000 m**)

**Contamination**
- **Cross-contamination** — **zero measurable carryover** between reagents or samples, validated by running the PAIR/PANPOC protocol under controlled conditions
- **Wind** — shielding limits air velocity at the dispensing zone to **less than 5 % above still-air baseline** under directed fan airflow (measured with a wind sensor)
- **Cleanability** — all sample- or reagent-contacting surfaces cleanable without material degradation, or designed as single-use disposables
- **Fluid paths** — every fluid path fully drainable or disposable

**Safety**
- **Spillage** — **zero visible fluid leakage within a 1 m radius** during dispensing or transport (tested with dyes)
- **Operator exposure** — **zero chemical contact** with operator hands or arms during dispensing; refilling protocol designed to prevent any visible dye reaching the operator's hands
- **Electrical safety** — live parts insulated (double-insulated where ungrounded); arc prevention; automatic fail-safe shutdown on short circuit or power surge; input/output voltage ratings printed on the device body; **low-battery lockout preventing the start of a new run**; electrical isolation from fluid zones to **IP44**

### 4.2 System-level evaluation criteria — unweighted at system level, eight opportunity classes
From `tab:global-criteria` and `tab:app-global-criteria`:

- **Performance** — reproducible (high precision); accurate; versatile across protocols (different containers: PCR tubes, Eppendorfs, plates; modular liquid storage); rugged during transport; feasible; low dead volume
- **Maintenance** — low-maintenance; low calibration requirements; repairable (parts easily replaceable)
- **Automation** — runs unsupervised after setup; operable by low-skilled or inexperienced users; minimizes operator steps; integrable into a larger device; monitors stored liquid levels; pleasant user experience
- **Field analysis and portability** — lightweight; small footprint; tolerant of outdoor temperature, humidity and pressure
- **Contamination** — prevents cross-contamination; dispensing area protected from wind; cleanable
- **Safety** — safely contains sample and loaded liquids between operations; avoids spillage and environmental contamination during and after operation; liquids loaded in a format that does not expose the user; electrical equipment safely insulated
- **Feasibility** — predominantly off-the-shelf parts and 3D printing; inexpensive to manufacture and assemble
- **Sustainability** — minimizes consumables; designed for end-of-life (recycling, disassembly, part recirculation); sustainable/recyclable materials

**How they are used:** weights 0–100 assigned *per module* once decomposition is fixed; competing concepts scored 0–100 *relative to each other* on the same matrix; score × weight, summed, ranks the concepts. Weights are stated to be "our joint qualitative judgment." Requirements never enter the arithmetic.

### 4.3 The pump-module weighted matrix (the one worked example, with numbers)
The chapter quotes individual weights; the full pump matrix (exported as a PDF page in App. I §sec:app-cr-pump, and held in the repo at `prototypes/REQUIREMENTS-CRITERIA.md`) reads:

| Weight | Category | Criterion |
|---|---|---|
| 100 | Performance | Feasibility |
| 80 | Field analysis & portability | Small footprint |
| 75 | Maintenance | Low calibration |
| 75 | Feasibility | Inexpensive |
| 70 | Maintenance | Low-maintenance |
| 70 | Maintenance | Repairable |
| 65 | Performance | Versatility |
| 60 | Performance | Dead volume |
| 60 | Automation | Run unsupervised |
| 60 | Field analysis & portability | Lightweight |
| 50 | Contamination | Cleanable |
| 45 | Automation | Capable of integration |
| 40 | Feasibility | Off-the-shelf parts and 3D printing |
| 40 | Sustainability | End-of-life design |
| 35 | Performance | Ruggedness |
| 35 | Field analysis & portability | Outdoor conditions |
| 20 | Sustainability | Minimization of consumables |
| 10 | Performance | Accuracy |
| 10 | Sustainability | Sustainable materials |
| 5 | Performance | Reproducibility |

The message that carries the slide: *"Among concepts that all hit ±10 % dispensing, prefer the one that is easiest to actually build, smallest, cheapest to keep calibrated, and easiest to fix — not the one that dispenses most precisely."* Also note operator-step minimization, the highest automation criterion in the whole set at **85**, is deliberately *not* in the pump matrix — it belongs to storage and user interface.

### 4.4 Module decomposition — eight functional modules
From `tab:module-functions`. (The abstract and most of the talk speak of **six** modules — that is these eight minus tube holding, absorbed into alignment, and minus the enclosure, never built.)

| Module | Function it carries | Developed by | Where |
|---|---|---|---|
| **Pump** | Meters the volume and moves it out of the reservoir | Marius and Sirio | Ch. 6 |
| **Alignment** | Brings tube and nozzle together for every dispense, and holds the tube while it happens | Sirio | Ch. 7 |
| **Nozzle** | Carries the metered volume out of the machine and lands the drop in the tube | Marius, reworked by Sirio | Ch. 8 |
| **Storage** | Holds the reagents on board and feeds them to the pump | Marius | Companion thesis |
| **User interface** | Lets the operator set up a run and reports what the machine is doing | Marius, rebuilt by Sirio | Ch. 9 |
| **Electronics and software** | Powers and drives the mechanisms, and carries the software that sequences a run | Sirio | Ch. 10 |
| **Tube holding** | (absorbed into alignment during prototyping — tubes could not be indexed securely independently of the positioning carriage) | — | grouped with alignment |
| **Enclosure** | Houses the modules and shields the dispensing zone from the surroundings | — | **Not built** (specified at system level only) |

**Boundary rationale worth a slide:** metering and delivery were split because the pump governs volumetric displacement while the nozzle governs fluid separation and landing without splashback; alignment was isolated as a dedicated tube positioning/indexing mechanism.

**Hierarchy rule (the operational decision rule of the whole project):** modules ranked by dependency load; when a geometric or electromechanical trade-off arose between subsystems, **lower-tier modules adapted to higher-tier ones**. The **pump is at the apex** because it carries the most stringent volumetric requirements and dictates the operating principles of everything else; the **enclosure is at the base** because its geometry is the sum of everything inside it — which is why it was deferred.

**Interface validation rule:** every subsystem interaction is strictly either a defined volumetric fluid transfer or an electrical control signal; a boundary is justified only if the transferred mass or information can be precisely defined.

---

## 5. THE AI-ENGINEERING METHOD (Ch. 4) — 8–10 bullets

1. **The diagnosis first:** in applied mechatronics the AI failure mode is not a crash but plausible output that silently violates an unstated physical constraint or a decision made earlier — delivered with unvarying confidence. Three named structural failures: **underspecification** (the model fills gaps with arbitrary defaults presented as facts), **context degradation** (attention to earlier turns decays; a fresh session restores sharpness but wipes memory), **instruction re-emergence** (a superseded instruction is still in the transcript and comes back).
2. **The workflow: spec-driven development via GSD** (open source, release 1.7.0) — requirements and interfaces are locked into persistent version-controlled markdown *before* any code is generated, and each unit of work runs through **discuss → plan → execute → verify → ship**, with an optional research agent between discuss and plan that cites source pages and tags unverified assumptions. Planning and execution run in fresh isolated subagent contexts that read the spec and commit results to disk, so project memory lives in files rather than in a conversation.
3. **Human effort was concentrated at the two strategic ends** of that loop — authoring the specification and judging the verification evidence — with intermediate execution delegated. Every piece of software in the project passed through it, including the dispenser firmware and the *Pump Validator* test application.
4. **The repository as working memory:** four repositories (design, testing/firmware, CAD verification, thesis) acted as the assistant's external memory, with documentation strictly layered (a shallow prototype registry scanned first, deep derivations and failure logs retrieved only when relevant), a uniform `proto-NN-<descriptor>` naming convention, and machine-parseable logs under Git. Human oversight still caught cases where long documents were not parsed in full.
5. **The design loop was encoded as four reusable skills** under the Agent Skills specification: `design-for-target` (concept generation from target specs), `diagnose-gap` (failure diagnosis), `plan-the-test` (test planning), `sparring-partner` (adversarial review before a physical build) — each enforcing four rules: read repository context first; tag every assertion **[Certain] / [Likely] / [Guessing]**; invent no parameter, report it as a gap; name the next step in the cycle.
6. **Tools built:** the GSD-based phase workflow itself; the four skills; a custom **Model Context Protocol interface to Autodesk Fusion (GSD-CAD)**; a **Python seven-database literature pipeline** (PubMed, Scopus, Semantic Scholar, OpenAlex, IEEE Xplore, arXiv, Europe PMC) with DOI/ID/title deduplication, Reciprocal Rank Fusion, a neural cross-encoder reranker (reads 40 candidates, returns 12) and backward/forward citation-graph search; the **Pump Validator** test application; and the published interactive tools on the thesis website.
7. **Where AI genuinely changed an engineering outcome — two documented cases.** (a) *Electronics:* the working assumption that six pumps needed a fast processor or multiple microcontrollers was redirected by structured requirements analysis to the *drivers*; smart stepper drivers were identified as cleaner, and when supply shortages killed them the same analysis framed the built alternative — commodity drivers sharing one step clock from one MCU. (b) *Pump:* a first prototype underdelivering **32 %** through incomplete occlusion was diagnosed with the assistant, producing the printer characterization model that predicts printed features to **±0.10 mm** — while human oversight cut the assistant's over-engineered calibration matrix down to a single coupon.
8. **Citation integrity was solved architecturally, not by trusting the model.** Evidence: reference lists of eleven systematic reviews returned **471 citations with extensive fabrications**; even the best model in a 120-prompt audit hallucinated about **one reference in thirty**. So: retrieval only through verified academic APIs, summarization bounded to records the pipeline returned, claim-level traceability to a result-table entry, and mandatory manual approval before anything enters the bibliography. 32 vendor datasheet references were gathered separately by hand.
9. **Writing used a five-phase locked workflow** — Scope, Structure, **Interview**, Draft, Review — where the interview phase is the safeguard against ungrounded claims: the assistant reads the repository logs and code, then interrogates the author on rationale, trade-offs and physical observations the written record lacks. Drafting and reviewing were split between **Claude Opus 5** (multi-file synthesis, technical reasoning, drafting) and **Gemini 3.7 Flash in Antigravity** (prose polish, LaTeX), because an assistant holding a drafting spec cannot review its own prose impartially.
10. **The honest assessment.** The assistant's self-assessment is never accepted as verification — every claim is anchored to an external arbiter (gravimetric measurement, bench tests on real hardware, academic API queries, manual calculation). Hard limits found empirically: **programmatic generation of 3D mechanical assemblies failed outright** (a small drafting board took ~3 hours of steering; the alignment assembly was infeasible), spatial layout and tolerancing stayed human; the assistant **misweighted tolerance terms in the pump's analytical error budget**; and **planning language leaked from loaded project documents into the prose**, requiring an external checking script. Cost: **€20/month up to €85–170/month**. The verdict: it structured trade-off analyses, formalized models and evaluated data inside a loop grounded by physical measurement — it did not replace engineering judgment.

*Note for the talk:* the chapter contains a reserved, unwritten paragraph on an examiner-style thesis audit pass that was never run — do not claim it was used.

---

## 6. WEBSITE / TOOL REFERENCES IN THE THESIS TEXT

Every `\livetool` panel and URL pointing at **https://sirsirio.github.io/thesis-tools/**, by location:

| Location | Tool name in the text | URL | Label |
|---|---|---|---|
| **Preface** (`Frontmatter/Preface.tex:48`) | **Thesis Tools** — "Interactive models, explorers, videos, and prototype test records built alongside this thesis." | `sirsirio.github.io/thesis-tools/` | `tool:site` |
| **Ch. 6 Pump Module** (line 371) | **Rotor Geometry Solver** — "Set a stroke volume, a bore and a bearing, and …" | `…/tools/rotor-solver/` | `tool:rotor-solver` |
| **Ch. 6 Pump Module** (line 447) | **Peristaltic Occlusion & Displaced-Volume Model** — "Close the tube and …" | `…/tools/peristaltic-roller-displaced-volume-model/` | `tool:occlusion-model` |
| **Ch. 9 User Interface Module** (line 200) | **Operator Interface Prototypes** — "All five rounds of candidate screens …" | `…/tools/ui-prototypes/` | `tool:ui-prototypes` |
| **Ch. 9 User Interface Module** (lines 374–375) | **Operator Interface, Live** — "Walk every screen of the finished operator interface in your browser, at the panel's real size." — **currently COMMENTED OUT in the LaTeX, i.e. not printed** | `…/tools/ui-mockup/` | `tool:ui-mockup` |
| **Ch. 10 System Architecture and Electronics** (line 91) | **System Architecture Explorer** — "Twenty-five candidate electronic … microcontroller pin allocations." | `…/tools/system-architecture-explorer/` | `tool:architecture-explorer` |
| **Ch. 10 System Architecture and Electronics** (line 156) | **Dispense Throughput Simulator** — "Set the reagent volumes and the pump …" | `…/tools/dispense-throughput-simulator/` | `tool:throughput-simulator` |
| **App. K Pump Design Models** (line 529) | Bare URL to the site root | `https://sirsirio.github.io/thesis-tools/` | — |
| **App. N Architecture Tools** (line 188) | **System Architecture Explorer** (second panel) — "All twenty-five candidates with their … edit." | `…/tools/system-architecture-explorer/` | `tool:architecture-explorer-app` |

**Important for the defense:** within Chapters 1–5 there is **exactly one** tool reference and it is in the **Preface**, not in any of the five chapters. Chapter 4 describes the tooling *method* (GSD, skills, the literature pipeline) but never links the public site. The thesis roadmap tool (`thesis-timeline`) and the pump-testing protocol page are **not** referenced from the LaTeX at all. The UI-mockup panel exists but is commented out — if the defense demos it, do not say the thesis prints its address (though the repo's CLAUDE.md records that chapter 9 reserves that path).

---

## 7. SMALL FLAGS WORTH KNOWING BEFORE SLIDES ARE WRITTEN

- `build-scope.tex` currently restricts local builds to Chapters 13–14 plus two appendices; irrelevant to content, but a full PDF needs `python scripts/scope.py all` or `main-full.tex`.
- Chapter 1 carries no `\takeaway{}`, so it will be absent from the "Summary of findings" page.
- Several figures in Ch. 2 are manufacturer or journal images with LaTeX comments saying **permission not yet requested** (`instr-pipette-principle` KNAUER, `instr-opentrons-flex`, `instr-tecan-fluent`, `instr-leadfluid-*`, `instr-mantis`, `instr-cobas-liat-tube`, `instr-yin-handheld`, `instr-das-level-sensing`). Reusing them in a public slide deck carries the same open question; the CC-BY ones (`fig-portable-qpcr`, `chen-sample-to-answer`, `instr-sidekick`, `instr-phil-*`) are safe with attribution.
- Internal inconsistency: pump matrix row count is "thirty-one" in Ch. 5 §5.5 and "thirty" in App. I. Avoid the number on a slide.
- Chapter 5 §5.2 mentions "eight opportunity classes" for the criteria table while §5.2 derives "five functional opportunities" — these are different groupings (opportunity classes in the design record vs opportunities from focus areas); do not conflate them on one slide.
- The strongest unprinted number available is the flow sensor reading **11.5 % low with 4× the scatter of a weighing** — it lives only in a commented-out §3.5 and can be spoken but not cited.
