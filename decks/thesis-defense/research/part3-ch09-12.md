# DEFENSE PRESENTATION SOURCE PACK — Chapters 9, 10, 11, 12

Source files read in full (no `.bak`, no `obsolete/`, nothing modified):
- `D:\03. DTU - Offline\03. MASTER THESIS\01. Thesis Document LaTex\latex\Chapters\09_User-Interface-Module.tex` (581 lines)
- `...\Chapters\10_System-Architecture-and-Electronics.tex` (783 lines)
- `...\Chapters\11_Integration.tex` (579 lines)
- `...\Chapters\12_System-Level-Validation.tex` (163 lines)

Conventions below: all figure paths are given relative to `Pictures/` as written in the source. Device screen captures are inserted with the `\uishot{<file>}{<width>}` macro (defined in `Setup/Preamble.tex`), so only the filename appears in the source; everything else uses `\includegraphics{Pictures/<name>}`. Verbatim quotes have LaTeX macros unwrapped to plain units/dashes only — wording is untouched.

---
---

# CHAPTER 9 — USER INTERFACE MODULE (`\label{chap:ui-module}`)

## 9.1 Narrative (the story, with its turning points)

The instrument's interface is the point where the whole decentralization premise either works or fails: an operator with no laboratory training has to configure and run a multi-reagent protocol after a brief orientation. The design brief was a genuine tension — hardcode one protocol and operation is trivial but clinically useless; expose every low-level parameter and you get an error-prone dashboard — and the thesis resolves it by **active guidance**, leading the operator through verification steps instead of asking for parameter setup. A working interface was inherited from Marius at hand-over, and the first turning point of the chapter is the decision *not* to extend it: porting it to the new pinout was straightforward and the graphics compiled cleanly, but bench evaluation exposed a calibration flow with no cancel button (escapable only by power-cycling) and touch targets down to 25 × 14 px against a 44 × 44 px standard, on top of an interface that was simply unfinished because the pumps, alignment module and fluid path did not exist when it was written. The second turning point is the realization that the display itself dictates the information architecture: on a 240-pixel-tall canvas, a conventional list fits only three rows, so text menus were abandoned for a visual-first layout — bottles that show their own fill height, racks drawn as 8-tube arrays at the physical pitch, tubes drawn as proportional colour bands. The third turning point is the prototyping method: instead of paying a compile-and-reflash cycle for every idea, candidate screens were drawn as web pages at the panel's exact 320 × 240 resolution, each built from an explicit list of controls and coordinates so the page could **audit itself** on every render — smallest touch target, clipped labels, and contrast computed *after* reduction to the panel's 16-bit depth. That audit caught real defects before any of them reached the device: the first palette failed its own 7:1 requirement at 6.2:1, one candidate carried three undersized controls, and a channel numeral on its own saturated colour measured 3.0:1 to 4.4:1. Nine candidates over three rounds settled two foundational decisions — a **light** default theme (dark backgrounds lose contrast badly under glare) and card-based guidance without a rigid linear lock-step. The fourth turning point is external: two lab colleagues who had never seen the build found three *systematic* weaknesses rather than isolated bugs — inconsistent back/cancel placement, drag-scroll friction on a resistive panel, and a terminology collision where *tube* meant both the liquid path and the 2 mL sample container, "a conflation the author could not catch alone, because he always knew which he meant." Version 2.1 answered all three (paged 3-item lists after reviewing eight commercial embedded medical devices, a permanent bottom action bar, and *tube* split into *line* and *tube*), and version 2.2 put the home screen on two tiles above a reagent-level band and added an on-machine commissioning menu. The final state is roughly thirty screens in five languages on a 3.2-inch panel, a two-tier pre-run check that can disable *Start* and rename it *Refill first*, an honesty rule that shows no number where a sensor cannot answer, and a technician service panel that is what actually commissioned the machine — rack geometry was measured at the bench and typed in, not compiled in and reflashed.

## 9.2 Version / decision sequence

**A. The hand-over decision (§9.1, `sec:ui-handover`)**
1. **Port the inherited firmware** — re-mapped display pin definitions to the new ESP32-S3 pinout; core graphical routines compiled cleanly. Storage module connected, capacitive level readings and SD protocol parsing verified. *Result:* port works. *Verdict:* porting is not the problem.
2. **Bench evaluation finds two flaws** — (i) navigation trap: calibration flow has no cancel/back during measurement; escape only by power-cycling; (ii) undersized touch targets down to **25 × 14 px** vs the **44 × 44 px** minimum. *Verdict:* defects, plus an unfinished remainder.
3. **Redesign vs. extend** — three reasons to redesign: **scope** (inherited software addressed reagent storage alone), **unmodeled machine workflows** (axis referencing, line priming, multi-rack recipe mapping, fault handling all absent), **target usability standard** (commercial-instrument self-explanatory, not bench prototype). *Verdict:* complete redesign, "informed by what Marius had built rather than discarding it." **Preserved:** the reagent-storage logic — the mathematical conversion of raw capacitive counts into calibrated fluid levels. **Discarded:** all visual screens.

**B. Browser prototyping rounds (§9.2.2, `sec:ui-mockups`)**
4. **Nine candidates over three rounds**, all drawn at 320 × 240 native. Field kept deliberately wide. Three of the first five are shown:
   - **(a) Console** — every channel at once in a dense monochrome table, controls reduced to three plain words. *Verdict:* not shortlisted.
   - **(b) Field** — four very large targets in black and white, designed for the worst viewing conditions, accepting that almost nothing else fits. *Verdict:* not shortlisted.
   - **(c) Machine state** — home screen as a picture of the machine's own state (what it is doing, what each channel holds, whether pumps are live), every other screen laid over it. *Verdict:* **shortlisted**.
5. **Self-audit results** — first palette failed its own contrast requirement at **6.2:1** (target ≥ 7:1); one candidate carried **three** undersized controls; a channel numeral placed directly on its saturated colour measured **3.0:1 to 4.4:1**. All corrected in the browser before reaching the device.
6. **Decision 1 — light theme by default.** Ambient glare testing showed dark backgrounds suffer severe contrast loss under bright light (consistent with `dobres-legibility-2017`). Optional dark theme retained for dim environments.
7. **Decision 2 — guided cards, not a rigid sequence.** An early prototype that locked users into a strict linear progression was **rejected** as overly restrictive for operators repeating familiar protocols.
8. **Decision 3 — stylus (§9.2.3).** On this panel a 44 px target is only ≈ **8.9 mm**; sizing every control finger-safe would leave room for about **three per column**. Rather than strip the interface that far, a **1 mm-tip dedicated precision stylus** ships tethered to the display holder. Interface remains fully operable by bare fingertip for all primary navigation tiles and confirmation buttons.

**C. Firmware version sequence (§9.2.4, `tab:ui-version-evolution`)**
| Version | Primary driver | What changed | Verdict |
|---|---|---|---|
| **v1** | Inherited hand-over | Two-tile home (*Volume Levels*, *Run*); level monitoring for storage module only; unlinked motor flows; trapped calibration screen | Baseline, replaced |
| **v2.0** | Comprehensive redesign | Entire codebase replaced; new multi-screen architecture (**~30 screens** in the current build); shared visual and state design across the whole screen set; plain-language wording from consumer medical devices (*Fill tubing* not *prime*, *Reset position* not *homing*, *Recipe* not *Protocol*); levels reported as calibrated **mL** instead of abstract percentages, quantised to physical sensor steps (**1.0 mL** on 40 mL bottles, **0.2 mL** on 4 mL bottles) "to ensure honest reporting"; built and walked against a **simulated machine** | Shipped |
| **v2.1** | Usability feedback from **two lab colleagues (Maria and Marius)**, neither of whom had seen the version | De-scrolled: all scrollable menus → **fixed 3-item paged lists** with discrete pagination buttons (after reviewing **eight commercial embedded medical devices**, which universally avoid drag gestures on small resistive panels); navigation standardised into a **permanent bottom-docked action bar**; *tube* split into **line** (liquid path; *Fill tubing* → *Fill lines*) and **tube** (sample container); bounded numeric inputs | Shipped |
| **v2.2** | Operational refinement / machine commissioning | Top-level navigation streamlined to **two primary tiles — *Start a run* and *Recipes*** — above a reagent-level band; on-machine **commissioning menu** added so mechanical parameters (rack pitch, feed travel, over-push and back-off margins) are tuned and saved to non-volatile memory *at the machine* instead of tethering a laptop and reflashing; that menu later folded into the wider **service panel** (§9.3.3) | **Final validated release**; this is what the assembled machine was commissioned through |

> ⚠ **Internal inconsistency to be aware of before you put it on a slide:** `tab:ui-version-evolution` describes v2.2 as a "Redesigned **3-tile** home screen (*Run Recipe*, *Reagents*, *Settings*)", while the body text of §9.2.4 and §9.3 both say **two primary tiles, *Start a run* and *Recipes*, above a reagent-monitoring bar**. The body text and the device captures are the current truth; the table row is stale. Use two tiles.

> ⚠ Second bookkeeping note: the chapter opens §9.2 with "**five iterative design cycles**" but the prose only narrates **three rounds / nine candidates**. Rounds 4–5 (which revisited the home screen after use) exist only on the published UI-prototypes tool page, not in the chapter prose.

**D. Resulting run flow (§9.3, staged on the reference PANPOC protocol)**
Home → *Which recipes?* picker → assign recipes to individual tube positions across up to **five racks** (every drawn hole is a touch target; ALL/NONE fill or clear a whole rack) → pre-run check → run (tube in progress, live time-remaining, rack counter, PAUSE and a red on-screen STOP throughout) → done, summary written to the SD card.

**E. Pre-run check thresholds (§9.3.1)** — two tiers: reagent **short** of required volume ⇒ *Start* disabled and relabelled **REFILL FIRST** (the block holds from every page of the check); reagent **sufficient but within 10 %** of threshold ⇒ amber warning requiring operator confirmation. Tapping the warning banner opens the corresponding bottle screen. Check also displays estimated runtime and prompts priming of unfilled lines.

**F. Calibration redesign (§9.3.2)** — two-point guided sequence: seat an empty container, then a full one; the two readings set the channel's scale. A live **CANCEL on every screen** — explicitly closing the inherited firmware's trap.

## 9.3 Key facts and numbers

- Display: **3.2 inch** diagonal, **320 × 240 px**, ≈ **125 dpi**, **16-bit RGB565** (**65 536** colours), **single-point resistive** touch, backlit.
- Microcontroller: **dual-core ESP32-S3**, shared with motor sequencing.
- Inherited button minimum dimension: **25 × 14 px**. Standard minimum: **44 × 44 px**.
- 44 px on this panel ≈ **8.9 mm**. Finger-safe sizing ⇒ ≈ **3 controls per column**.
- Stylus tip: **1 mm**. Stylus nominal diameter **5 mm** (ch. 11).
- Ergonomic row height for readable text + touch padding: **50–60 px** ⇒ only **three visible rows** on a 240 px canvas.
- Contrast target: **≥ 7:1** for small text, computed after RGB565 quantisation. Failures caught: **6.2:1** (first palette), **3.0:1–4.4:1** (numeral on saturated colour).
- Candidates: **9** drawn, over **3** rounds (chapter opener claims **5** design cycles total).
- Reagent channels colour-indexed: **6** distinct qualitative colours.
- Screen count in the current build: **~30**.
- Volume quantisation: **1.0 mL** on **40 mL** bottles; **0.2 mL** on **4 mL** bottles.
- Usability testers: **2** (Maria and Marius). Commercial devices reviewed for paging convention: **8**.
- Paged list size: **3 items** per page.
- Sample tube: **2 mL**; recipe editor blocks SAVE above **2000 µL** total.
- Pre-run amber band: within **10 %** of the threshold.
- Interface languages: **5**.
- Racks addressable per run: up to **5**; rack = **8** tubes.
- No real-time clock ⇒ logged times are **relative to system boot**, and explicitly labelled as such.
- Battery indicator: sensing circuit **designed but not fitted**; the charge shown is a **placeholder, not a measurement** (disclosed exception to the honesty rule).

## 9.4 Message-style headlines (candidate slide titles)

1. "Porting the inherited interface was easy; finishing it was not — so it was rebuilt from the ground up."
2. "A calibration screen you could only leave by power-cycling the instrument is what ended the inherited firmware."
3. "A 240-pixel-tall screen fits three list rows, so the interface stopped being a list and became a picture of the machine."
4. "Browser mockups that audit their own contrast and touch targets caught a 6.2:1 palette before it ever reached the device."
5. "Nine candidates over three rounds settled two things: light theme by default, and guidance without lock-step."
6. "Ambient glare, not taste, made the light theme the default."
7. "Two colleagues found in an afternoon the word collision the author could never have caught alone: *tube* meant two different things."
8. "Resistive panels cannot be dragged, so every scrolling list became a three-item page."
9. "The interface never shows a number it cannot stand behind — a channel with no sensor shows no number at all."
10. "The service panel is what commissioned the machine: rack geometry was typed in at the bench, not compiled in and reflashed."
11. "A pre-run check that renames *Start* to *Refill first* is cheaper than a failed run."
12. "On a 3.2-inch panel a finger-safe button is 8.9 mm — so the instrument ships with a tethered 1 mm stylus."

## 9.5 Figures and tables

| Label | Path (rel. `Pictures/`) | Caption gist | Type |
|---|---|---|---|
| `fig:ui-v1-home` | `ui-v1-home` | The inherited v1 home screen: two tiles (*Volume Levels*, *Run*) + battery indicator | Screenshot (wrapfigure, right, 0.34\textwidth) |
| `fig:ui-round1-console` | `ui-round1-console` | Round-1 candidate (a): dense monochrome laboratory-console table | Screenshot / browser mockup |
| `fig:ui-round1-field` | `ui-round1-field` | Round-1 candidate (b): four oversized black-and-white targets | Screenshot / browser mockup |
| `fig:ui-round1-machine` | `ui-round1-machine-state` | Round-1 candidate (c): home as a picture of machine state, six channels always visible — **the one shortlisted** | Screenshot / browser mockup |
| `fig:ui-round1` | (composite of the three above) | "Three of the five first-round candidates", each at real 320 × 240 | Composite subfigure |
| `fig:ui-run-flow` | `ui-v22-home-twopumps.png`, `ui-v22-picker.png`, `ui-v22-assign.png`, `ui-v22-check.png`, `ui-v22-run-move.png`, `ui-v22-done.png` | "A dispensing run, end to end" — six device captures, 2 × 3, TikZ arrows in the gaps | Device screenshots (USB capture, native res, panel colour) |
| `fig:ui-recipe` | `ui-v22-recipes.png`, `ui-v22-redit.png` | Recipe list previews the selection as a banded 2 mL tube; EDIT opens the same drawing as a live editor. "*Panpoc bind* uses three of the six channels" | Device screenshots |
| `fig:ui-check` | `ui-v22-check-short.png` | "The check that will not be dismissed" — short reagent disables START, renames it REFILL FIRST | Device screenshot |
| `fig:ui-honesty` | `ui-v22-liquid-ok.png`, `ui-v22-liquid-nosensor.png` | "Known and unknown" — quantised volume + green light + word (left); no number at all when no sensor answers (right) | Device screenshots |
| `fig:ui-bottle` | `ui-v22-bottle-s0.png` … `ui-v22-bottle-s4.png`, `ui-v22-liquid-ok.png` | Six-step guided two-point bottle calibration with a persistent CANCEL at every step | Device screenshots, arrowed flow |
| `fig:ui-settings` (`fig:ui-set-settings`, `fig:ui-set-lang`, `fig:ui-set-service`, `fig:ui-set-dark`) | `ui-v22-settings.png`, `ui-v22-lang.png`, `ui-v22-diag.png`, `ui-v22-home-dark.png` | Settings; five-language picker; diagnostic service panel; home in dark theme | Device screenshots, 2 × 2 |
| **`tab:ui-version-evolution`** | — | "Evolution of the user interface firmware" — four iterations v1 → v2 → v2.1 → v2.2, with primary driver and key architectural changes | Table |

**Most striking / decisive (use these 5):**
- ⭐ `fig:ui-run-flow` — the whole run in six real device frames; this is the single best slide in the chapter.
- ⭐ `fig:ui-round1` — the three first-round candidates side by side; it makes the design-space argument visually in one beat.
- ⭐ `fig:ui-honesty` — the "known vs unknown" pair; it dramatises the honesty rule against the inherited firmware's flat 100 %.
- ⭐ `fig:ui-check` — START renamed REFILL FIRST; a single frame that carries the whole error-prevention argument.
- ⭐ `fig:ui-v1-home` vs `fig:ui-v22-home-twopumps` — before/after of the home screen; put them on one slide even though the thesis does not.
- (secondary) `fig:ui-set-service` — the service panel, which commissioned the machine.

## 9.6 Quotable sentences (verbatim)

1. "The system resolves this tension through active guidance—leading the operator through clear verification steps rather than requiring manual parameter setup."
2. "A rule the redesign holds to is that the interface never shows a value it cannot stand behind."
3. "the word *tube* was used for two different things — the liquid path from bottle to nozzle, and the 2 mL sample container in the rack — a conflation the author could not catch alone, because he always knew which he meant."
4. "It is what commissioned the machine: the rack geometry the run depends on was measured at the bench and typed in here, not compiled in and reflashed."
5. "A STOP is pinned on every page, because unlike the old bench console this screen can turn a pump."
6. "the first palette failed its own contrast requirement at 6.2:1, one candidate carried three undersized controls, and a channel numeral placed directly on its saturated colour measured between 3.0:1 and 4.4:1."

## 9.7 Open gaps and limitations the chapter admits

- **No physical emergency stop.** The prototype relies on an on-screen abort routine; a dedicated physical E-stop switch is "planned for production enclosure revisions" (`sec:field-instrument`).
- **Battery indicator is fake.** "its sensing circuit is designed but not fitted on this prototype, so the charge shown is a placeholder, not a measurement."
- **No real-time clock**, so run logs carry boot-relative times only.
- **Usability evidence is thin.** Only two testers, both lab colleagues (one of whom wrote the inherited firmware), and the formal training requirement was never tested (see ch. 12).
- Touch targets are only finger-safe for primary navigation tiles and confirmation buttons; compact controls (rack tube positions, numeric steppers, text entry) genuinely depend on the stylus.
- The chapter's own editorial note flags that the §9.3 prose "predates the assembled machine and is inaccurate in places (internal-flash recipes, waste trays, animated transfer graphics, the requirements claims)".

## 9.8 Likely committee questions (with the thesis's own answer)

1. *"Why throw away working inherited software?"* — Because it addressed reagent storage alone, the machine's real workflows (homing, priming, multi-rack recipe mapping, fault handling) had to be structured from scratch anyway, and the usability target was a commercial instrument, not a bench prototype. §9.1.
2. *"Isn't a browser mockup just a drawing?"* — No: each candidate was built from an explicit list of controls and coordinates, so it measured its own smallest touch target, clipped labels, and post-RGB565 contrast on every render. §9.2.2.
3. *"A stylus is a usability failure — why not bigger buttons?"* — A finger-safe 44 px target is 8.9 mm on this panel; sizing everything that way leaves ~3 controls per column. The interface stays fingertip-operable for all primary navigation; the stylus is for compact controls and is tethered so it cannot be lost. §9.2.3.
4. *"Two testers is not a usability study."* — Conceded. The two-person evaluation "carries the argument at lower strength"; the formal training requirement was deferred for time. §9.2.4 and ch. 12 `tab:validation-verdict`.
5. *"Why a light theme on a medical instrument?"* — Ambient glare testing showed dark backgrounds suffer severe contrast loss under bright light, consistent with published legibility findings; a dark theme is retained as an option. §9.2.2.
6. *"What stops an operator starting a run that will run dry?"* — A two-tier automated pre-run check: short reagent disables START and relabels it REFILL FIRST from every page; within 10 % raises an amber warning requiring confirmation. §9.3.1.
7. *"How fast can you stop the machine?"* — The STOP is a persistent top-layer overlay active during any motion sequence, and actuation asserts the stepper driver disable lines **before** updating graphical state. §9.3.4.
8. *"Who commissioned the mechanical constants?"* — The service panel: rack pitch, feed travel, over-push and back-off margins were measured at the bench and typed in on the machine, saved to non-volatile memory, with no reflash. §9.3.3.

## 9.9 Website tools referenced

- **`\livetool{Operator Interface Prototypes}`** → `sirsirio.github.io/thesis-tools/tools/ui-prototypes/`, label `tool:ui-prototypes`, placed in **§9.2.2 (`sec:ui-mockups`)**. Blurb: "All five rounds of candidate screens, drawn at the panel's real size. Switch on the touch-target overlay, re-quantise the colours to the panel's own depth, and read the contrast audit each candidate runs on itself." A source comment notes the address "is a contract with repo 02: the printed QR cannot be re-pointed after hand-in."
- **`\livetool{Operator Interface, Live}`** → `sirsirio.github.io/thesis-tools/tools/ui-mockup/`, label `tool:ui-mockup`, in **§9.3 (`sec:ui-resulting`)** — **COMMENTED OUT in the submitted source**, with the note "fill the address once the UI-mockup tool page exists, then uncomment." ⚠ So the mockup tool is *not* printed in the thesis, even though `tools/ui-mockup/` now exists in the repo. Worth saying at the defense that the live mockup exists as a supplement.
- Cross-references to the appendix operator manual: `\cref{app:ui-manual}` (full screen-by-screen walkthrough, log screens).

---
---

# CHAPTER 10 — SYSTEM ARCHITECTURE AND ELECTRONICS (`\label{chap:system-architecture}` / `\label{chap:electronics-module}`)

## 10.1 Narrative

Unlike every mechanical module, the electronics were not iterated through prints — they are "a selection problem governed by system-level constraints," decided last, because the electrical and computational requirements are dictated by the physical assemblies above them. The architecture had to answer three interlocking questions: how the processor drives the touchscreen, how it talks to peripheral sensor modules, and how it drives six pumps, two alignment axes and a vibration motor. The display was fixed earliest and set the floor — an Arduino Nano-class board can carry either the display or the machine logic, but not both. The first turning point is methodological: rather than settling the rest by datasheet review, which "would have ended in whichever option I happened to examine last," two interactive tools were built. The architecture explorer mapped **25** candidate architectures across driver family × processing topology × inter-board bus, costed line-by-line against real distributor pricing and audited against actual GPIO allocations, and it returned three findings: driver intelligence, not clock speed, decides whether concurrent pumping is computable; **pin availability is the primary feasibility bottleneck** (SPI display takes 8 pins, SD a 9th, leaving ~7 of ~16 safe GPIOs, while six dumb drivers need 12); and cost does not decide anything, because every feasible candidate sits within roughly **10 %** of the others. The throughput simulator answered the second half — is parallelism worth buying? — and across three benchmark loads at one, two and six pumps the answer was the same every time: **the second pump captures the large majority of the saving (≈ 86 % under the reference protocol), and the four after it add little**, because one station always carries a far larger volume and becomes the structural bottleneck. Analytically this pointed at smart drivers (TMC2209) on a single board — and that is the chapter's sharpest turning point, because **the analytically optimal answer was unbuildable**: component shortages put smart drivers out of reach on schedule, they carried a ≈ **€13** premium, and DRV8825s were already on hand from the pump characterization. The escape was a re-framing of the problem rather than a compromise: because a peristaltic head meters a fixed volume per roller occlusion, **dosing is a count of steps, not a speed**, and because every channel uses identical motors and tubing at a shared speed, six independent frequency domains collapse into **one synchronized clock**. Step and direction wire to all six drivers in parallel; each driver keeps its own enable line and drops out of the group at its own step count. That buys less to compute, less to build, and **8 pins instead of 12**. The chapter then admits the boundary honestly: a 0.5 A adapter that ran one pump stalled both when the second was energized (audible hum, zero rotation — current starvation, not a timing fault), a 3 A bench supply fixed it, only two of six channels are populated so full-system current was never metered, and **electrical power, not firmware or GPIO, is the real scalability ceiling**. Two integration surprises complete the picture: the vibration motor's floating metal can radiated brush-arcing transients that killed the I²C bus until a single **22 nF** capacitor bonded the casing to a power terminal fixed it (ten consecutive bursts, zero errors); and the DRV8825's active-low enable meant floating GPIOs at power-up would energize the coils before the first firmware instruction ran, so external pull-ups hold every driver disabled through boot. The final state is one ESP32-S3-Nano, twenty of twenty-one native pins allocated, an MCP23017 expander carrying the slow alignment axes, three voltage domains from one 12 V input, everything on solderless breadboards, and a clear four-step path to the intended design that touches no firmware.

## 10.2 Version / decision sequence

**A. Fixed first**
1. **Display choice fixes the processor floor.** Selecting a 3.2-inch colour touchscreen set an immediate floor on processor performance and memory. An Arduino Nano-class board "has enough capacity to manage either the display or the core machine logic, but cannot support both simultaneously." *Verdict:* Nano-class ruled out.

**B. Architecture explorer screening (§10.1.1, `sec:architecture-explorer`)**
2. **25 candidates** parameterized by (motor driver family) × (single vs multi microcontroller) × (inter-board communication bus). Costed against real distributor catalog pricing; audited against physical GPIO allocations.
3. **Four families**, separated by where the screen sits and where pump-driving work is done: (i) one small controller board per pump; (ii) a single board carrying screen and processor together; (iii) a discrete screen wired to one processor that does everything; (iv) a screen-facing processor with a separate node beneath it.
4. **Finding 1 — driver intelligence dictates computational load.** Dumb step/direction drivers (DRV8825) need a GPIO toggle per microstep ⇒ continuous high-frequency timer interrupt load. Smart drivers (TMC2209) generate their own step pulses from a serial target speed. *Verdict:* driver intelligence, not clock speed, decides viability.
5. **Finding 2 — pin availability is the primary feasibility bottleneck.** A standard ESP32 gives ~**16** safe unreserved GPIO. SPI display = **8**, SD card = **9th**, leaving **7** before any motor. Six dumb drivers with dedicated step+dir = **12** pins; shared step with discrete enable selection = **8**. *Verdict:* a single MCU cannot drive six dumb drivers directly without pin expansion.
6. **Finding 3 — cost does not decide.** Candidates that satisfy the GPIO budget fall within roughly **10 %** of each other in total component cost. *Verdict:* BOM expense alone does not choose the architecture.

**C. Throughput simulator screening (§10.1.2, `sec:throughput-simulator`)**
7. **Model:** an indexing line — six fixed nozzles above a rack of eight tubes stepping beneath them; each station takes as long as its assigned volume needs at the pump's stroke rate. Concurrency swept from strictly serial to fully parallel.
8. **Three benchmark loads:** light = **2 reagents**; reference preparation protocol = **4 reagents**; heavy = **6 reagents spanning 1000 µL down to 5 µL**. Each run at **1, 2 and 6** pumps.
9. **Result:** the same pattern every time — the **second pump captures the large majority of the saving; the four after it add little**. Under the reference protocol the second pump accounts for roughly **86 %** of the total attainable saving. The lightest load stops improving after two pumps because it only uses two reagents.
10. **Reason:** structural, not protocol-specific — one station carries a far larger volume and becomes the only one still dispensing, so the batch cannot advance faster whatever the other pumps do. *Verdict:* full concurrency is not worth buying; two-channel concurrency is the economically justified baseline.

**D. The synthesis and the procurement reversal (§10.1 closing)**
11. Combining both: full concurrency offers minimal runtime advantage over two-channel, while six discrete step/dir channels exceed a single MCU's native GPIO budget. Two viable options remain: **(a) offload pulse synthesis to a co-processor**, or **(b) smart drivers over a serial bus**.
12. **Analytically, smart drivers win** — no timer-interrupt burden, no multi-board firmware overhead, quieter steppers.
13. **Practically, smart drivers lose.** Component shortages left them unavailable from project suppliers within the build schedule; price premium ≈ **€13** over the next viable candidate; DRV8825s already on hand from pump characterization. *Verdict:* "an architectural adaptation" — concurrent multi-channel motion with basic step/direction drivers on a single-MCU topology.

**E. The shared clock (§10.2.1, `sec:shared-clock`)**
14. **Re-framing:** each pump head displaces a fixed calibrated volume per roller occlusion ⇒ dosing is governed strictly by **step count**, not continuous speed; every channel uses identical motors and tubing at a shared speed ⇒ "the motion control problem reduces from six independent frequency domains to a single synchronized clock."
15. **Implementation:** one pulse train, step + direction wired to all six drivers in parallel; each driver keeps a dedicated **enable** line; a pump advances only while enabled and drops out at its target step count. A dedicated stepping task runs on **its own processor core** and schedules each step edge against an **absolute microsecond timeline** (not a fixed inter-step delay), so firmware overhead cannot accumulate into drift. The task yields to housekeeping, leaving the achieved rate **about 1 % under nominal** — delivered volume unaffected, because a dose is a step count, not an elapsed time.
16. **What it buys:** (i) less to compute — six ramping trains become one; (ii) less to build — no second MCU, firmware, toolchain or inter-board protocol; (iii) fewer wires — **8 pins instead of 12** (1 step + 1 direction + 6 enable).
17. **Datasheet risk, honestly stated:** the datasheet **confirms** a disabled driver ignores step pulses while holding its internal microstep phase (no phantom steps). Two edge behaviours are **undocumented**: disabling mid-microstep cuts holding torque and lets the rotor settle to the nearest detent (error bounded within a fraction of a step), and whether a re-enabled driver resumes smoothly from that exact microstep position. Both evaluated on the assembled instrument; residual settling "remains smaller than experimental measurement scatter."
18. **Scope honesty:** individual dose termination via enable gating is **quantitatively verified** (it underpins every weighed dispense in ch. 12); concurrent multi-channel motion is **demonstrated functionally on two of six** channels. Gravimetric replicates were recorded one channel at a time so a second moving pump could not enter accuracy figures as an uncontrolled variable.

**F. Board and pin allocation (§10.2.2, `sec:selected-board`)**
19. **Priority split:** the six **enable lines stay on native MCU pins** — they are what shuts off each pump, guaranteeing immediate stop and ensuring pumps can be cut even if the peripheral bus hangs. Slow tasks (alignment axis motion, homing switches) go to an I²C port expander (**MCP23017**).
20. **Board chosen: ESP32-S3-Nano.** Same compact form factor as the Arduino Nano used in bench prototyping; dual-core 32-bit, expanded memory, **21 usable GPIO**. **20 of 21** native pins allocated; the expander occupies **10 of its 16** channels.
21. **Cost of the choice:** ≈ **€10** over the lowest-cost configuration that meets pin requirements; ≈ **€13** over the baseline two-pump-concurrency configuration justified by throughput modelling. *Verdict:* modest premium buys a single-processor architecture and keeps dose-critical enable signals off a shared bus.
22. **Empirical backup:** planning a dual-board prototype "highlighted the friction of managing two distinct firmware images, synchronizing build dependencies, and repeatedly flashing two targets."

**G. As built (§10.2.3, `sec:as-built-circuit`)**
23. Display + SD on a **9-line SPI** bus (SD needs only an extra chip-select). Six pump drivers on the shared step/dir clock with individual enable traces to dedicated native GPIOs. **I²C** two-wire bus carries exactly two external devices: the capacitive level-sensing controller and the MCP23017. The expander in turn drives the two alignment axes' step/dir inputs and reads their homing switches. Nozzle vibration motor switched through a discrete **MOSFET** from a native GPIO to allow PWM.
24. **Power-on hazard fix:** DRV8825 enable is **active-low**, so an undriven/floating pin *enables* the output stage, and MCU GPIOs default high-impedance during power-up before firmware runs ⇒ coils would energize at boot. **External pull-up resistors** tie each enable line high until firmware pulls it low. "Because this hazard exists before the first instruction runs, software alone cannot mitigate it." Verified under power on the two fitted channels; each remaining channel must get its pull-up installed simultaneously with its driver.

**H. Power tree (§10.2.4, `sec:power-tree`)**
25. **Three voltage domains from one external supply:** **12 V** rail → six pump drivers, two alignment-axis drivers, MCU VIN. MCU's **onboard linear regulator** → **3.3 V** for the capacitive level controller, the port expander, and stepper driver logic inputs. An intermediate **buck** → **5 V**, dedicated exclusively to the nozzle vibration motor and its MOSFET.
26. **Master switch:** single-pole rocker in the positive lead ahead of every internal rail, carrying the complete 12 V system load including all motor currents. One deliberate bypass: the MCU's **USB** input, so the board can be programmed and diagnosed while the 12 V motor rail is unpowered and no motor can move.
27. **One connector for both sources:** a single DC barrel jack on the enclosure panel; bench supply and battery cable terminate in matching plugs. Switching between mains and battery = unplug one, insert the other. No internal rewiring, tools, or multiple enclosure openings.
28. **One load out of spec:** vibration motor rated **3 V**, run from the **5 V** rail to avoid a fourth supply domain; firmware clamps PWM duty to hold the effective time-averaged potential to ≈ **3 V**. Flagged as "a latent vulnerability during future firmware modifications."
29. **Supply sizing, learned by failure:** a **12 V / 0.5 A** adapter ran one pump fine; connecting the second driver stalled **both** motors — coils buzzed and held position without stepping, failing at both calibrated and reduced step rates. Audible hum + zero rotation = **continuous current starvation**, not a software timing fault. A **3 A** bench supply restored smooth concurrent motion.
30. **Worst-case load is protocol-bounded:** dispensing is strictly sequential — while reagents are metered, the rack and nozzle module are stationary, enforced by firmware interlocks. The only concurrent actuators are the peristaltic pumps.
31. **Rail decision — 12 V now, 24 V in production.** 12 V is the simpler prototype (one supply feeds pump drivers, the 12 V alignment motors and the MCU; pump calibration and the **180 rpm** operating point were both characterized at 12 V). 24 V gives dynamic headroom to run all six pumps at speed (forces current into windings faster, preserving torque, preventing skipped steps); 12 V leaves a much narrower torque margin and draws double the current for the same power. **Migration needs no software change** — the DRV8825 is a current-chopping driver. Physical migration needs: a 24 V supply, a step-down converter for the 12 V alignment motors, and upgraded bulk caps. Currently **470 µF** electrolytics sit across each driver's motor supply; the fitted parts are rated **16 V**, which "physically preclude 24 V operation until replaced by **35 V** alternatives."
32. **Thermal concession:** stepping 12 V → 3.3 V across the MCU's onboard linear regulator dissipates ≈ **1–2 W**. The 5 V rail cannot relieve it — the ESP32-S3-Nano has no external 5 V input pin and its VIN requires **6–21 V**. Production fix: an efficient buck ahead of the board set to ≈ **6.5 V** (just above dropout), cutting linear dissipation roughly **threefold**.

**I. Battery (§10.2.4, `Untethered battery operation`)**
33. **Pack used:** three-cell lithium-ion power-tool battery, **DeWalt DCB127**, nominal **10.8 V**, **21.6 Wh**. Reaches the same 12 V rail through the same barrel jack on a purpose-made lead; carried on a printed slide-in bracket. *Result:* the instrument executed a complete dispensing protocol unattended on battery — untethered functionality verified.
34. **Operating boundary found:** the pack acts as a **2 A-class** source. Partially discharged it could not sustain concurrent two-channel dispensing — at low pump speeds the motors **stalled completely**, at higher speeds they **lost steps, causing an unreported shortfall in delivered volume**. A **3 A** mains supply powered both channels concurrently without error. *Verdict:* fully portable, but a depleted battery restricts reliable dispensing to one channel at a time.
35. **No charge sensing.** A resistive divider on an analog input and an I²C current-sensing device were specified but not populated, "to avoid modifying verified breadboard wiring." Consequence: no state-of-charge evaluation, no run lockout, and "gradual volumetric under-delivery rather than a clean system stop."

**J. The energy arithmetic and the production power target**
36. **Copper losses dominate:** at rated phase current, resistive coil dissipation ≈ **15.6 W per motor** (**94 W** across six active channels) vs only **8.7 W** of useful mechanical output at operating speed. This dictated the external supply's **150 W** rating. At **24 V**, that peak draws ≈ **4 A**.
37. **The non-obvious result:** the true constraint is **idle** power. Continuously energized, six stationary drivers would exhaust an **86 Wh** pack in **under an hour**. Disabling drivers between dispensing bursts drops average duty to ≈ **10 %**, extending endurance to **eight hours**. Peristaltic pumps pinch the tubing closed and cannot be back-driven, so rotors hold position mechanically with coils unpowered. "Battery runtime is therefore governed by firmware discipline rather than battery capacity."
38. **Source type decision — regulated over raw cells.** A raw six-cell pack sags: it "begins with a safety factor above three [and] drops to approximately 2.2 as it nears depletion." A USB-C PD power bank holds its negotiated voltage until depleted then terminates cleanly, holding a constant torque margin through the whole discharge.
39. **Target specification:** a **140 W** power bank of ≈ **86 Wh** (≈ **€90**), delivering **28 V** under **USB PD 3.1 Extended Power Range** via a trigger board, with a buck converter supplying the 12 V alignment branch. Three supporting properties: **universal charging** (≈ **1 hour** recharge over bidirectional USB-C, no onboard charger), **aviation compliance** (86 Wh < the **100 Wh** carry-on limit), **off-the-shelf consumable** (hot-swappable in the field). Trade-off: many commercial 140 W units negotiate **no higher than 20 V**.
40. **Verdict on the tool battery:** "adopted as a pragmatic proof of concept rather than a production specification."

**K. Construction and control/communication findings (§10.2.4 close, §10.3)**
41. **Everything on solderless breadboards.** PCB transition deferred for schedule and manufacturing lead times. Breadboard construction "increased susceptibility to lead inductance, contact degradation, and electromagnetic noise" — and the chapter explicitly says every electrical finding in it is qualified by construction of this kind.
42. **Four hardware steps to the intended design, none touching firmware:** (1) intermediate step-down switching converter ahead of the MCU board; (2) install the four unpopulated pump channels, each with its pull-up resistor and bulk decoupling capacitor; (3) raise the motor rail to 24 V, upgrading driver bulk caps from 16 V to 35 V; (4) replace breadboard wiring with a custom PCB.
43. **Bus-sharing trade-off (§10.3):** because alignment stepping runs over the I²C expander, every half-step generates bus traffic competing with display redraw on the same core. Mitigated by writing **entire port bytes** rather than individual pins and interleaving steps with display refresh. *Result:* slightly reduced touchscreen responsiveness during rack motion, but **full positional stepping accuracy preserved**.
44. **EMI failure and fix (§10.3):** actuating the nozzle vibration motor in a **2 s** burst triggered repeated I²C communication failures — starting immediately on energization, ceasing the moment the motor stopped, bus recovering autonomously. Root cause: the brushed DC motor's **metallic casing was electrically floating**; internal brush arcing capacitively coupled high-frequency transients into the can, making it an unshielded radiating antenna. Standard decoupling caps across the motor terminals failed because the casing lies outside that differential current loop. **Fix: a single 22 nF ceramic capacitor bonded between the metallic motor casing and one power terminal** ⇒ **ten consecutive vibration bursts with zero bus transmission errors**. In the prototype the capacitor is **taped** to the casing (the plating resisted solder adhesion), mechanically captive in the printed motor cradle; production needs a bonded joint or an internally grounded motor chassis.
45. **Dosing execution (§10.3):** the dosing routine generates the shared pulse train on an independent timer task and de-asserts each channel's enable at its target step count, so a multi-reagent dose "takes only as long as the single largest individual volume rather than the cumulative sum." The run sequence controls no motor pin directly — it asks for a dose and waits, which keeps procedure steps from overlapping.
46. **The one fluid assumption inside that arithmetic:** commanded volumes are converted to steps and rounded **at the step, not at the whole roller stroke**, so a sub-stroke dose is taken to deliver in proportion to the fraction of a stroke commanded. **5 µL is a single stroke**, and rounding to whole strokes instead "would overdeliver that dose by more than eighty per cent." Sub-stroke proportionality "was not isolated experimentally, and it is the first thing to suspect if small doses are ever found to weigh wrong."
47. **No current sensing at all.** Electrical figures in the chapter are theoretical, from phase resistance and rated current. Adding an I²C current sensor would give continuous power monitoring without consuming GPIO, plus state-of-charge tracking.

## 10.3 Key facts and numbers

- Architecture candidates modelled: **25**, in **4** families.
- Standard ESP32 safe unreserved GPIO: **≈ 16**. SPI display: **8** pins. SD card reader: **+1** (**9** total). Remaining before motors: **7**.
- Six dumb drivers, dedicated step+dir: **12** pins. Shared step + discrete enable: **8** pins.
- Cost spread among pin-feasible candidates: within ≈ **10 %**.
- Smart-driver price premium: ≈ **€13** over the next viable candidate.
- ESP32-S3-Nano premium: ≈ **€10** over the lowest-cost pin-compliant configuration; ≈ **€13** over the two-pump-concurrency baseline.
- ESP32-S3-Nano: dual-core 32-bit, **21** usable GPIO, **20** allocated. MCP23017: **16** channels, **10** occupied.
- Shared-clock pin saving: **8 instead of 12** = 1 step + 1 direction + 6 enable.
- Achieved step rate: **≈ 1 % under nominal**.
- Benchmark loads: **2**, **4** and **6** reagents; heavy load spans **1000 µL down to 5 µL**; concurrency swept at **1, 2, 6** pumps.
- Second pump ≈ **86 %** of total attainable saving under the reference protocol.
- Rails: **12 V** (motors + MCU VIN), **5 V** (buck, vibration motor only), **3.3 V** (MCU onboard LDO → level controller, expander, driver logic).
- Vibration motor rated **3 V**, run from **5 V**, PWM-clamped to ≈ **3 V** effective.
- Failed supply: **12 V / 0.5 A**. Working supply: **3 A** bench.
- Bulk decoupling: **470 µF** electrolytic per driver, currently **16 V** rated, must become **35 V**.
- LDO dissipation: ≈ **1–2 W**. ESP32-S3-Nano VIN range: **6–21 V**. Production pre-regulator: ≈ **6.5 V**, cutting linear dissipation ≈ **3×**.
- Pump operating point: **180 rpm**, characterized at **12 V**.
- Battery: **DeWalt DCB127**, **10.8 V** nominal, **21.6 Wh**, behaves as a **2 A**-class source.
- Motor losses: **15.6 W** resistive per motor; **94 W** across six channels; **8.7 W** useful mechanical output. External supply rating: **150 W**. At 24 V, peak ≈ **4 A**.
- Idle endurance: **86 Wh** pack exhausted in **under 1 hour** with coils always energized; **~10 %** duty with drivers disabled between bursts ⇒ **8 hours**.
- Six-cell raw pack torque safety factor: **> 3** at full charge → ≈ **2.2** near depletion.
- Production power target: **140 W** / ≈ **86 Wh** USB-C PD bank, ≈ **€90**, **28 V** under **USB PD 3.1 EPR**, recharge ≈ **1 hour**, below the **100 Wh** aviation carry-on limit. Many 140 W banks only negotiate **20 V**.
- EMI fix: **22 nF** ceramic, casing-to-terminal; **2 s** burst was the trigger; **10** consecutive clean bursts after the fix.
- Rounding: **5 µL = 1 stroke**; whole-stroke rounding would overdeliver by **> 80 %**.
- Channels populated: **2 of 6**.

## 10.4 Message-style headlines

1. "Datasheet review would have ended in whichever option I examined last, so I built two tools instead."
2. "Pin count, not processing power, was the real feasibility bottleneck: nine pins go to the screen before a single motor is connected."
3. "Driver intelligence, not clock speed, decides whether six pumps can run at once."
4. "Every architecture that fits the pin budget costs within 10 % of the others — so cost decided nothing."
5. "The second pump captures 86 % of the saving; the next four add almost nothing."
6. "The analytically optimal architecture was unbuildable: smart drivers were out of stock and €13 dearer, so the design had to adapt."
7. "Because a dose is a count of steps and not a speed, six independent clocks collapse into one."
8. "One shared step clock and six enable lines drove six pumps on eight pins instead of twelve."
9. "Two motors stalled on a 0.5 A adapter — the buzzing told us the bottleneck was current, not code."
10. "Electrical power, not firmware or GPIO, is the scalability ceiling of this prototype."
11. "A floating motor can was radiating into the I²C bus; one 22 nF capacitor bonded to the casing gave ten clean bursts in a row."
12. "The DRV8825 enables itself when its pin floats, so the motors would spin before the firmware ran — only a pull-up resistor could stop that."
13. "The prototype remains at 12 V; production moves to 24 V — and the driver's current chopping means no firmware changes."
14. "Battery runtime is governed by firmware discipline, not battery capacity: 10 % duty turns one hour into eight."
15. "A raw pack's torque margin falls from above three to 2.2 as it drains — an instrument that works in the morning and skips steps in the afternoon fails point-of-care."

## 10.5 Figures and tables

| Label | Path (rel. `Pictures/`) | Caption gist | Type |
|---|---|---|---|
| `fig:tool-directions` | `tool-architecture-directions` | "The four families the candidates fall into" — where the screen sits, how many enclosures/boards each implies | Screenshot (architecture explorer) |
| `fig:tool-choreography` | `tool-dispensing-choreography` | "The dispensing line as the simulator draws it" — one rack of 8 tubes indexing beneath 6 fixed nozzles, layer height ∝ dose volume; explicitly *illustrative, not timing-accurate* | Screenshot / diagram |
| `fig:tool-benchmarks` | `tool-benchmark-comparison` | Three dispensing loads at 1, 2, 6 pumps, bar length = total run time on one common scale | Screenshot / bar plot |
| `fig:architecture-selected` | `fig-architecture-selected` | "The control architecture as built" — one processor, 9-line display bus, six numbered drivers on shared step/dir + one enable each, nozzle vibration switch on its own pin, I²C carrying level controller + expander, expander carrying the two alignment motors and two homing switches | Diagram (block/signal) |
| `fig:power-tree` | `fig-power-tree` | "The power tree as built" — two rails from one external supply plus the MCU's LDO 3.3 V; master switch in the positive lead ahead of every rail; **dashed** supply = the planned 24 V production design, blocked by the fitted 16 V bulk caps | Diagram |
| `fig:electronics-bay` | `fig-electronics-bay` | The electronics bay from above, with its jumper wiring | Photo |
| `fig:electronics-front` | `fig-electronics-front` | Beneath the display: processor board with USB connector, the barrel jack, rocker switch at top right | Photo |
| `fig:electronics-as-built` | (composite of the two above) | "The electronics as built, on solderless breadboards" — "every electrical finding in this chapter is qualified by construction of this kind" | Composite |

**Tables:** none in the chapter body. It cites `tab:app-pump-fos` (pump factor-of-safety table) in the appendix, and points to `sec:app-explorer` (cost model, pin-budget formula, full 25-candidate list) and `sec:app-simulator` (scheduling model, fixed timings, full run times), plus `sec:app-as-built` (detailed pin assignments, component specs, voltage rail allocations).

**Most striking / decisive (use these 5):**
- ⭐ `fig:architecture-selected` — the single diagram that shows the shared clock and enable-gating idea; this is the chapter's thesis in one picture.
- ⭐ `fig:tool-benchmarks` — the 86 % result; a bar chart that kills the six-pump argument in three seconds.
- ⭐ `fig:power-tree` — the dashed 24 V path makes the prototype-vs-production distinction visible instead of verbal.
- ⭐ `fig:electronics-bay` — the honest breadboard photo; use it deliberately, it pre-empts the question.
- ⭐ `fig:tool-directions` — the four families; good for setting up the decision before revealing the verdict.

## 10.6 Quotable sentences (verbatim)

1. "Evaluating these candidates through datasheet review alone would have been slow, and would have ended in whichever option I happened to examine last."
2. "driver intelligence—rather than raw clock speed—determines whether concurrent multi-channel pumping is computationally viable."
3. "the motion control problem reduces from six independent frequency domains to a single synchronized clock."
4. "If every pump runs at the same rate, a single pulse train can drive all six."
5. "Selecting dumb drivers over smart drivers represents an engineering adaptation rather than a compromise of convenience."
6. "Because this hazard exists before the first instruction runs, software alone cannot mitigate it."
7. "The prototype remains at 12 V; production moves to 24 V."
8. "Battery runtime is therefore governed by firmware discipline rather than battery capacity."
9. "An instrument that dispenses reliably in the morning but skips steps in the afternoon fails the requirements of point-of-care testing."
10. "Electrical power consumption, rather than firmware scheduling or GPIO availability, represents the primary scalability constraint identified by this prototype."

## 10.7 Open gaps and limitations the chapter admits

- **Full six-channel current draw was never metered** — only 2 of 6 channels populated; total consumption of a fully expanded instrument is unmeasured. This is named as *the* open boundary.
- **No current sensing at all** on the prototype; all electrical figures are theoretical (phase resistance × rated current). The instrument cannot detect supply sag.
- **No battery state-of-charge sensing**; the specified divider and I²C current sensor were not populated. Degrading voltage produces silent volumetric under-delivery rather than a clean stop.
- **Two undocumented DRV8825 edge behaviours** (mid-microstep disable torque loss; smooth resume from that phase) — evaluated empirically only, asserted to be smaller than measurement scatter.
- **Concurrent multi-channel motion is functional, not gravimetric** — validation replicates were taken one channel at a time.
- **Sub-stroke proportionality was never isolated experimentally** — explicitly named as "the first thing to suspect if small doses are ever found to weigh wrong."
- **Everything is on solderless breadboards** — lead inductance, contact degradation, EMI pickup; every electrical finding is qualified by this.
- **The vibration motor runs out of spec**, protected only by a firmware PWM clamp — "a latent vulnerability during future firmware modifications."
- **The EMI capacitor is taped, not soldered** to the motor casing.
- **16 V bulk capacitors physically block** the 24 V migration until replaced.
- **~1–2 W burnt in the MCU's linear regulator**, unfixable on the current board.

## 10.8 Likely committee questions (with the thesis's own answer)

1. *"Why not just use TMC2209 smart drivers, as your own analysis recommends?"* — They were unavailable from project suppliers within the build schedule and carried a ≈ €13 premium, while DRV8825s were already on hand from pump characterization. §10.1 (Architectural synthesis).
2. *"Can one pulse train really drive six different doses?"* — Yes, because dosing is a step count, not a speed: all channels share one clock and each drops out when its own enable line is de-asserted at its target step count. §10.2.1.
3. *"Doesn't disabling a driver mid-microstep lose position?"* — The datasheet confirms a disabled driver ignores pulses while holding its microstep phase; the rotor may settle to the nearest detent, but the error is bounded within a fraction of a step and "remains smaller than experimental measurement scatter." §10.2.1.
4. *"Why put the alignment motors on a slow I²C expander?"* — Rack indexing is slow and tolerant of jitter, whereas pump pulse trains are time-critical; the premise held in practice, at the cost of slightly reduced touchscreen responsiveness during rack motion, with full positional accuracy preserved. §10.2.2 and §10.3.
5. *"Will this scale to six channels?"* — Architecturally yes (pins, shared clock, six nozzle positions); electrically unknown — full-system current was never metered, and this is named the primary scalability constraint. §10.2.4.
6. *"Why only two pumps, if you designed for six?"* — Throughput modelling showed the second pump captures ≈ 86 % of the attainable saving, so two-channel concurrency is the economically justified baseline; the remaining four were not built within schedule. §10.1.2 and ch. 11.
7. *"Is 12 V an engineering error?"* — No, a deliberate prototype choice: it matches the 180 rpm/12 V pump characterization and needs no conversion stage. Production moves to 24 V, and because the DRV8825 chops current, that needs no firmware change — only a supply, a step-down for the alignment motors, and 35 V bulk caps. §10.2.4.
8. *"Your instrument can under-deliver silently on a flat battery — is that acceptable?"* — It is not; the chapter says so. The lockout is unbuilt because charge sensing was never populated, and the fix is a current-sensing device on the existing I²C bus. §10.2.4, §10.3.
9. *"How did you find the I²C failures?"* — By observing that errors began exactly on vibration-motor energization and ceased the moment it stopped; the casing was floating and radiating brush-arc transients, and standard terminal decoupling missed it because the can sits outside the differential loop. §10.3.

## 10.9 Website tools referenced

- **`\livetool{System Architecture Explorer}`** → `sirsirio.github.io/thesis-tools/tools/system-architecture-explorer/`, label `tool:architecture-explorer`, in **§10.1.1 (`sec:architecture-explorer`)**. Blurb: "Twenty-five candidate electronic architectures, costed against a real supplier catalog and audited against microcontroller pin allocations." `fig:tool-directions` is a screenshot of it. A source comment notes "[FIGURE OWED: Screenshot of the Architecture Explorer matrix (Part 4) --- OI-10]" — i.e. the matrix screenshot was planned and may or may not be in the final PDF.
- **`\livetool{Dispense Throughput Simulator}`** → `sirsirio.github.io/thesis-tools/tools/dispense-throughput-simulator/`, label `tool:throughput-simulator`, in **§10.1.2 (`sec:throughput-simulator`)**. Blurb: "Set the reagent volumes and the pump speed, then sweep how many pumps run at once and watch the batch time, the bottleneck station and the schedule move with it." `fig:tool-choreography` and `fig:tool-benchmarks` are both screenshots of it.
- **Pin budget** is *not* a live-tool link in this chapter: it is referenced as appendix `\cref{sec:app-explorer}` ("The system architecture explorer" — cost model, pin-budget formula, assumptions, full 25-candidate list, and the 8-pins-instead-of-12 accounting). The repo holds the standing analysis at `tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md`.
- Scheduling model / full run times: appendix `\cref{sec:app-simulator}`. As-built pin assignments and rail allocations: appendix `\cref{sec:app-as-built}`.

---
---

# CHAPTER 11 — INTEGRATION AND THE INTEGRATED PROTOTYPE (`\label{chap:integration}`)

## 11.1 Narrative

Every module worked on its own bench; none of them were an instrument. Integration meant registering modules to a common frame, bridging fluid paths across subassembly boundaries without contamination or leaks, and physically packaging operator controls and a power source for portable use — and because their geometry depended entirely on the final dimensions of the mechanisms they unite, **the integration parts were the last components designed in the project**. Three custom printed assemblies do the binding — a dual-bay carrier pairing each pump with its reagent storage, an angled display-and-stylus holder, and a slide-in battery cradle — while a fourth joint, the nozzle array, needed no new part because it bolts to a reinforced boss printed into the chassis itself. The chapter's first turning point is an inherited constraint that bites physically: the storage module arrived as **exported mesh geometry, not native parametric CAD**, and the meshes refused to convert or import — despite other meshes in identical formats importing fine — so nothing on it could be referenced, dimensioned, or modified. The carrier therefore had to be designed **around the physical hardware** rather than mated parametrically, and a specific consequence persists in the assembled machine: the cartridge has no positive retention holding its electrode against the sleeve's probe pins, because the click-in catch Marius identified could not be drawn without source geometry. (The small mercy: the weight he rested on top in its place "proved unnecessary, and the prototype runs without it.") The contrast is made explicit later — the third-party DeWalt cradle mesh imported cleanly and was modified without error, and the nozzle holder, modelled directly against the finalized V3 chassis CAD, needed four or five reprints for its own features but **not one** to correct its chassis interface. The second turning point is a judgement about how the instrument will be handled: the carriers slide into downward-opening dovetails and interlock laterally for mutual bracing, but "an instrument intended to be carried has to survive being picked up and set down by an operator who does not know which part is load-bearing, and the dovetails alone were not trusted with that" — so fastener clearance holes were drilled through the chassis wall after printing and every fastener in both carriers is horizontal. The display holder is the most iterated part in the chapter (**about ten prints**), tilted at **45°** because the instrument is designed to sit below eye level — on a table or the bed of a truck — and split across a sliding dovetail so that adding stylus clips only required reprinting the upper half. The battery cradle is the cheapest win: a published DeWalt holder, holes filled in CAD and re-cut for M3, three horizontal screws, and the pack now travels with the instrument. What comes out is a **50 × 35 × 18 cm, 3.3 kg** two-channel machine with recessed carrying handles, an input queue at the left, dispensing lane in the middle, output queue at the right, carriers along the rear wall, nozzle holder above the lane, screen at centre front and battery front-left. The chapter closes by naming exactly what the object does *not* contain: four of six channels unbuilt, electronics on breadboards, no charge sensing, no enclosure — and the last of those is the one that matters, because the exposed kinematics, breadboard wiring and open dispensing zone "currently restrict reliable protocol execution to controlled indoor settings," which makes the outdoor photograph a staged scenario and not a claim.

## 11.2 Version / decision sequence (integration steps, in order)

**§11.1 The inherited storage module (`sec:storage-module`)**
1. **What was inherited:** designed and built by Marius, transferred as functional hardware. Each reagent in a standard glass vial with a **septum cap** whose elastomer disc reseals after needle withdrawal. Three printed parts: **cartridge** (grips the vial), **sleeve** (slides over the needle holder, guides and aligns the needles), **needle holder**. Cartridge inserts into sleeve from the opposite end.
2. **Sensing:** copper tape on the cartridge's interior faces forms the capacitive electrode; a compliant printed mechanism maintains constant contact pressure so nominally identical vials read repeatably. **Two spring-loaded probe pins** in the sleeve transfer the signal to the needle holder across variations in cap height. Two-point (empty/full) calibration, linear interpolation. Marius reports the measurement settles **within 5 %** of true level with no measurable divergence between vials. Reading is slow but only used pre-run, not to meter dispensing. Controller: **MPR121**, on the shared I²C bus.
3. **Two needles per vial:** a **liquid needle** draws reagent toward the pump; an **air needle** vents the container to displace withdrawn volume — essential, because without it internal pressure drops and extraction halts long before the vial empties. The air line terminates in a **syringe filter marked 0.22 µm**, fine enough to retain microorganisms, so incoming air is effectively sterile — "That exceeds what a preparation reagent strictly requires, but it closes the one path by which the outside environment reaches the liquid." Vial mounted **inverted**: liquid needle just inside the septum, air needle in the headspace.
4. **Only the 4 mL cartridge variant was fabricated** for this prototype.
5. **The mesh problem and its permanent consequence:** meshes failed to convert/import; features could not be referenced, dimensioned or modified. ⇒ carrier designed around physical hardware. ⇒ **no positive retention** holding the cartridge electrode against the probe pins. Marius's permanent fix (a click-in catch) could not be drawn; his interim fix was resting a weight on the cartridge. *Result in the assembled machine:* the weight proved unnecessary; the prototype runs without it.

**§11.2 The pump–storage carrier (`sec:pump-storage-carrier`)**
6. **Decision:** house pump and storage together in **one** printed carrier rather than mounting them separately, because each reagent's fluid path is unbranched from vial to nozzle — keeps the inlet suction line as short as possible and makes each channel a self-contained modular unit.
7. **Internal fluid run inside the carrier:** vial → liquid needle → Luer hub → flexible sleeve → pump inlet → out of the pump head via tubing onward to the nozzle.
8. **Geometry:** perpendicular axes — pump drops in **vertically from above**, storage slides in **horizontally from the front**.
9. **Two variants, identical internals:** **central carrier** = three upright tabs, each with one clearance hole, horizontal screws into the chassis **rear wall**. **Left carrier** = two such tabs plus, in place of the third, a **tall flange with three screw holes in a column**, sitting flush against the **exterior side wall** and fastened into it. *Not mirrored pairs* — the left carrier uses the adjacent side wall for lateral bracing, a surface unavailable at the central position. **Every fastener in both is horizontal.**
10. **Chassis attachment:** both carriers slide into **downward-opening dovetail slots** along the rear exterior wall of the alignment chassis and **interlock with each other via lateral dovetails** for mutual structural bracing. **Mechanical fasteners reinforce** these slide-in joints; clearance holes were **drilled through the chassis wall after printing**.
11. **Why fasteners at all:** the carriers support the heaviest subsystems — stepper motors, pump heads, reagent vials. A 4 mL vial adds negligible mass, but the cartridge geometry is specified for containers up to **40 mL**. Carrying-handling argument (quoted in §11.6 below).
12. **Result:** **two complete channels** fabricated and installed — one central, one left carrier. Six-channel capacity is supported *architecturally* (MCU pin allocation, shared step clock, six needle positions in the nozzle holder), not by six physical pumps and vials.

**§11.3 The nozzle in place (`sec:nozzle-in-place`)**
13. **Mount:** the nozzle holder **docks directly atop the electronics bay** — the enclosed central compartment between the input and output queues housing the MCU, drivers and power wiring — to keep rigid alignment without shifting relative to the sample rail. The holder's underside conforms to the bay wall profile so the chassis locates the part before fasteners are applied. **Two screws** secure it to the chassis, and **a third, driven horizontally on the left side into the electronics bay wall**, makes the mount sturdy.
14. **Contrast with the storage module:** the inherited nozzle module arrived without any chassis mount, but unlike the storage meshes, the rebuilt holder was **modelled directly against the CAD geometry of the finalized V3 chassis** with fit tolerances incorporated. Reprinted **four or five times** to refine its own features (compliant motor cradle, rounded edges throughout, clearance for the eccentric weights to spin) — **none of those reprints was to correct its chassis interface**.
15. **The tubing run:** **450 mm of PVC tubing** leaves each pump head, bridges over the **toothed drive rack** of the alignment module, and terminates at the junction tube and Luer-to-barb adapter on the corresponding needle hub. Left carrier feeds the **leftmost** needle, central carrier feeds the **adjacent** position, so the two lines do not cross. Between pump outlet and needle hub **the tubing is unguided** — hanging freely across the span, supported by its own flexural stiffness, with the Luer fitting as its single fixed anchor. Functional on the prototype without fouling the moving drive rack, and hand-disconnectable for replacement; a production instrument "would need the tubing placed deliberately."

**§11.4 The display and stylus holder (`sec:screen-holder`)**
16. **Angle:** the 3.2-inch resistive touchscreen sits in a printed holder on the **front vertical wall of the electronics bay**, tilted upward at **45°** — "the instrument is designed to rest below the operator's eye level, whether on a table or, in the field, on the bed of a truck, and at 45° the screen faces someone standing over it."
17. **Iteration count:** "about **ten prints**, counting reprints of single halves and small test pieces for the stylus clips"; most cycles refined the size and position of the component pockets, then the fit on the chassis.
18. **Split into two pieces** joined by an integrated **sliding dovetail** — chosen for print quality, and it paid off during development: when stylus retention clips were introduced, **only the upper half needed reprinting**; either half can still be replaced alone. All exterior edges filleted.
19. **Board mounting:** display fastened to the front face with corner screws; **recessed pockets** for each component protruding from the back of the board; **dedicated holes** let the pin headers pass through to the far side where cables connect; a **cutout in the lower edge** clears the SD card reader and card insertion.
20. **Chassis registration:** on the left, a ridge printed into the chassis wall forms a **90° locating groove** seating the holder corner at its 45° tilt before fastening. On the right, **two horizontal screws** thread into the bay wall. A **third screw position on the left was never used** — not enough room for the available tools to make its hole in the chassis; the two screws plus the locating groove hold it securely. Consequence: detaching the holder requires disconnecting the display cables as well as removing screws.
21. **Stylus:** two clips for a stylus **nominally 5 mm** in diameter (measuring slightly less); of **two test prints**, one tighter and one looser, the **looser fit was chosen**. Tether = a length of wire taken from a jumper cable, one end screwed to the holder, the other passed through a hole in the stylus and secured with electrical tape. The insulated wire was too thick for the hole, so **only its bare conductor passes through — the weak point of the tether**. "It holds as a proof of concept."

**§11.5 The battery cradle (`sec:battery-cradle`)**
22. **Pack:** DeWalt **DCB127** lithium-ion power-tool pack (**10.8 V nominal, sold as a 12 V pack**), mounted directly to the chassis exterior so the battery travels with the instrument rather than lying beside it.
23. **Source of the part:** adapted from a published holder for DeWalt 12 V batteries (`kurkov-dewalt-holder-2025`) rather than drafted from scratch. Design **clips lightly onto the battery casing** — the pack cannot wobble or fall out, yet comes off **without the release button being pressed**.
24. **Modification:** original mounting holes were **filled with solid volumes in CAD and re-cut for M3**. Explicit contrast: "In contrast to the uneditable meshes of the storage module, this third-party mesh imported cleanly into the CAD environment and could be modified without error."
25. **Licensing consequence:** the source model is shared under the **MakerWorld Standard Digital File License**, which restricts redistributing derivative digital files, so **the modified cradle model is not included** in the thesis's supplementary digital deliverables.
26. **Mounting:** **three horizontal M3 screws** to the front exterior chassis wall, to the left of the electronics bay. Pack slides on and is held by its clip. A short lead runs from the pack to the supply socket near the display — the **same connector** fed by the benchtop mains supply, so the battery replaces the external source on the 12 V rail **without modifying any internal wiring**.

**§11.6 The integrated prototype (`sec:integrated-prototype`)**
27. **Layout:** unified standalone unit anchored to the central alignment chassis. Input queue **left** of the linear dispensing lane, output queue **right**. Two pump–storage carriers along the rear wall; stationary nozzle holder directly above the lane; touchscreen centre front on the electronics bay; battery front left. Electronics bay centrally between the queues holds MCU, drivers and power distribution, on solderless breadboards.
28. **Envelope:** **50 cm wide × 35 cm deep × 18 cm high**. Battery contributes **5.5 cm** to total depth; **height is set by the storage modules**. Loaded with sample racks and battery: **3.3 kg**. **Two recessed handles** in the outer end walls for two-handed carrying.
29. **Run sequence in the object:** operator loads racks into the input queue → selects recipes → assigns to tube positions → automated pre-run reagent check (blocks if insufficient, prompts priming) → linear axes home if not referenced → intake advances the first rack onto the lane → each tube indexes beneath the stationary nozzles → pump delivers target volume → inertial vibration burst detaches the pendant droplet → completed rack transfers to the output queue → next rack drawn in.
30. **Manual post-processing required:** because the storage geometry could not be edited in CAD, material was **mechanically relieved from the printed sleeves** — localized relief cuts to clear the mounting fasteners of the adjacent pump head and to provide travel clearance for the **gear rack of the input queue**.
31. **What is complete vs not:** **2 of 6** reagent channels built; the remaining four pumps and storage modules not built within schedule. Control circuitry on breadboards, not a PCB. Battery state-of-charge monitoring not electrically implemented. **The input queue, by contrast, is complete: all five racks printed, and a full batch of 40 sample tubes ran unattended.**
32. **Enclosure deferred** during functional decomposition to prioritize core mechanism development. Consequence: exposed kinematics, breadboard wiring and open dispensing zone "currently restrict reliable protocol execution to controlled indoor settings."

## 11.3 Key facts and numbers

- Storage: **4 mL** vials (only variant fabricated); cartridge geometry specified for containers up to **40 mL**.
- Level sensing settles **within 5 %** of true liquid level; no measurable divergence between vials. Controller: **MPR121** on I²C. Two **spring-loaded** probe pins.
- Air-line syringe filter: **0.22 µm** pore (rating read off the fitted filter itself).
- Needles per vial: **2** (liquid + air vent).
- Carrier variants: **2** (central = 3 tabs; left = 2 tabs + 1 flange with **3** screw holes in a column). All fasteners **horizontal**.
- Channels fabricated: **2** of **6**.
- Nozzle holder: **2** vertical screws + **1** horizontal screw into the bay wall = **3** total. Reprinted **4–5** times, none for chassis fit.
- Tubing from pump head to needle hub: **450 mm** PVC, unguided across the span.
- Display: **3.2 inch**, tilted **45°**, **90°** locating groove, **2** horizontal screws used, **1** screw position abandoned. Holder iterations: **~10 prints**. Split into **2** halves on a sliding dovetail.
- Stylus: nominal **5 mm** diameter; **2** test prints, looser chosen.
- Battery cradle: **3 × M3** horizontal screws; pack = DeWalt **DCB127**, **10.8 V** nominal (sold as 12 V).
- Assembled envelope: **500 mm × 350 mm × 180 mm** (50 × 35 × 18 cm); battery adds **5.5 cm** depth; **3.3 kg** loaded; **2** recessed handles.
- Racks printed: **5**; unattended batch: **40** sample tubes.

## 11.4 Message-style headlines

1. "The parts that hold the instrument together were the last ones designed, because their geometry depended on everything above them."
2. "Three printed assemblies and one printed boss are the whole of the integration hardware."
3. "Pairing each pump with its own reagent vial in one carrier turned each channel into a self-contained module with the shortest possible suction line."
4. "The dovetails were not trusted with an operator who does not know which part is load-bearing, so every joint got a horizontal screw as well."
5. "An inherited module that arrived as uneditable mesh had to be designed around rather than designed with — and it still has no positive retention today."
6. "Modelled against the real chassis CAD, the nozzle holder was reprinted five times for its own features and not once for its interface."
7. "The screen sits at 45° because the instrument is meant to be looked down at — on a table, or on the bed of a truck."
8. "Splitting the display holder across a sliding dovetail meant adding stylus clips cost one half-print, not a whole part."
9. "A published battery holder, its holes filled and re-cut for M3, put the power pack on the chassis for the cost of three screws."
10. "The finished instrument is 50 by 35 by 18 centimetres and weighs 3.3 kilograms with racks and battery aboard."
11. "Five racks and forty tubes make the input queue the one subsystem that is complete."
12. "Without an enclosure, the outdoor photograph is a scenario, not a claim."

## 11.5 Figures and tables

| Label | Paths (rel. `Pictures/`) | Caption gist | Type |
|---|---|---|---|
| `fig:storage-parts` | `storage-cartridge`, `storage-sleeve`, `storage-needle-holder` | The storage module as handed over, in its three parts: cartridge with copper-tape electrode holding a 4 mL vial; sleeve showing a spring-loaded probe pin; needle holder with two needles, copper contact pads and the green-housed syringe filter. "Design by Marius; photographed for this thesis." | Photos (3) |
| `fig:carrier-central` | `carrier-central-front-empty`, `carrier-central-back-empty`, `carrier-central-front-full`, `carrier-central-back-full` | The central carrier alone and loaded, front and rear; pump enters from above, storage from the front; three upright tabs take horizontal screws into the rear wall. All four cropped identically from one capture so proportions compare directly. | Photos (2 × 2) |
| `fig:carrier-left` | `carrier-left-front-empty`, `carrier-left-back-empty`, `carrier-left-front-full`, `carrier-left-back-full` | Same four views, same scale; the difference — the tall flange with three holes in a column — is **circled in red** (via `\circleon`) | Photos (2 × 2, annotated) |
| `fig:carriers-mounted` | `carriers-mounted-rear`, `carriers-mounted-side` | Both carriers on the assembled instrument, each storage module standing above its pump head; red circle marks the left flange and its three fasteners; "The green discs are the air-line filters." | Photos (2, annotated) |
| `fig:nozzle-in-place` | `nozzle-mounted-front`, `nozzle-lines-over-rack` | (a) Holder fixed above the electronics bay, two of three screws visible, the two fitted channels arriving at their Luer hubs (repeat of `fig:nozzle-built`); (b) from above and behind, dispense lines leaving the pump heads and **crossing the toothed drive rack** to reach the hubs | Photos (2) |
| `fig:display-holder-cad` | `fig-display-holder` | CAD model without the display: (a) the face the board screws to, with component pockets, pin-header holes, SD cutout; (b) stylus clips on the upper half, the dovetail between halves, the two used screw holes, and "the third screw position on the left, which was never used" | CAD render |
| `fig:display-holder` | `display-holder-side`, `display-holder-top` | (a) screen tilted at 45° on the front of the electronics bay, with the power switch and supply socket beneath it; (b) from above, stylus in its two clips, tethered by a coiled wire | Photos (2) |
| `fig:battery-cradle-cad` | `fig-battery-cradle-cad` | The cradle after modification: (a) from above with the three holes re-cut for M3; (b) three-quarter view of the rails the pack slides onto | CAD render |
| `fig:battery-cradle` | `battery-cradle-empty`, `battery-cradle-loaded` | (a) cradle on the front chassis wall, pack removed and lying beside it with its lead attached; (b) pack seated | Photos (2) |
| `fig:prototype-whole` | `prototype-whole`, `prototype-whole-outdoor` | (a) "Physical architecture viewed from above, detailing the left-to-right sample rack motion path, rear fluidic supply bays, and central electronics bay"; (b) "Representative point-of-need deployment scenario, operating outdoors on battery power" | Photos (2) |

**Tables:** none in chapter 11.

**Most striking / decisive (use these 5):**
- ⭐ `fig:prototype-whole` (a) — the top-down architecture shot; this is the "here is the machine" slide for the whole defense.
- ⭐ `fig:prototype-whole` (b) — the outdoor battery shot; the emotional payoff slide. Pair it with the honest caveat so it is not oversold.
- ⭐ `fig:carriers-mounted` — the two channels standing on the machine; it shows modularity physically.
- ⭐ `fig:nozzle-in-place` (b) — lines crossing the drive rack; it is the single image that shows how close the fluidics run to the moving parts.
- ⭐ `fig:display-holder` (a) — the 45° screen with the switch and socket below it; the operator-facing face of the instrument.
- (secondary) `fig:storage-parts` — needed to explain the inherited module and the mesh problem.

## 11.6 Quotable sentences (verbatim)

1. "Because their geometry depended entirely on the final dimensions of the mechanisms they unite, the components that perform these integration roles were the last parts designed in the project."
2. "An instrument intended to be carried has to survive being picked up and set down by an operator who does not know which part is load-bearing, and the dovetails alone were not trusted with that."
3. "In the assembled instrument the weight proved unnecessary, and the prototype runs without it."
4. "the instrument is designed to rest below the operator's eye level, whether on a table or, in the field, on the bed of a truck, and at 45° the screen faces someone standing over it."
5. "In contrast to the uneditable meshes of the storage module, this third-party mesh imported cleanly into the CAD environment and could be modified without error."
6. "It holds as a proof of concept; a tether designed for production is left to [§13.6]."
7. "the exposed kinematics, breadboard wiring, and open dispensing zone currently restrict reliable protocol execution to controlled indoor settings."

## 11.7 Open gaps and limitations the chapter admits

- **No positive retention on the storage cartridge** — the click-in catch could not be drawn without source geometry.
- **Uneditable inherited meshes forced manual post-processing** — material mechanically relieved from printed sleeves to clear pump-head fasteners and to give the input-queue gear rack travel clearance.
- **Tubing is unguided** between pump outlet and needle hub, anchored only at the Luer fitting; production would need it held clear of every moving part, "the drive rack above all."
- **The stylus tether's weak point is a bare conductor** through a hole, taped at one end.
- **A third display-holder screw position exists but was never used** — no tool clearance to drill it.
- **Four of six channels unbuilt**; six-channel capacity exists only architecturally.
- **Electronics on solderless breadboards**, not a PCB; **battery state-of-charge monitoring not electrically implemented**.
- **No protective enclosure** — deferred at functional decomposition; restricts reliable execution to controlled indoor settings, and an environmental enclosure shielding the fluid path from drafts and airborne particulates "remains a prerequisite for true point-of-need deployment."
- **The modified battery cradle model cannot be redistributed** (MakerWorld Standard Digital File License).

## 11.8 Likely committee questions (with the thesis's own answer)

1. *"Why did you design the integration parts last?"* — Their geometry depended entirely on the final dimensions of the mechanisms they unite. Chapter opening.
2. *"Why pair pump and storage in one carrier?"* — Each reagent's fluid path is unbranched from vial to nozzle, so pairing keeps the inlet suction line as short as possible and turns each channel into a self-contained modular unit. §11.2.
3. *"Dovetails plus screws is belt and braces — why both?"* — Because the carriers support the heaviest subsystems and the instrument is meant to be picked up by an operator who does not know which part is load-bearing. §11.2.
4. *"Why does the storage module have no retention catch?"* — It was transferred as exported mesh, not parametric CAD; the meshes would not import, so the parts could not be redrawn. §11.1.
5. *"Isn't 3.3 kg heavy for a point-of-care device?"* — The chapter states the mass and provides two recessed carrying handles; it makes no lighter claim, and the enclosure and PCB are still to come. §11.6.
6. *"Is the outdoor photograph a real field deployment?"* — No: it is a "representative point-of-need deployment scenario"; without an enclosure the exposed kinematics, breadboard wiring and open dispensing zone restrict reliable execution to controlled indoor settings. §11.6.
7. *"Why not design the battery holder yourself?"* — A published DeWalt holder existed; it imported cleanly, its holes were filled in CAD and re-cut for M3, and it clips onto the pack without needing the release button. §11.5.
8. *"Can the tubing foul the moving drive rack?"* — On the prototype it has not, but the line is unguided and held only by its own stiffness and the Luer anchor; a production instrument would need it routed deliberately. §11.3.

## 11.9 Website tools referenced

**None.** Chapter 11 contains no `\livetool` macro and no `sirsirio.github.io` address. Its external references are to `kurkov-dewalt-holder-2025` (the published DeWalt holder) and `schiller-sample-dispensing-2026` (Marius's companion project). *(For the defense, the natural web anchors for this chapter's content are the prototype records — the pump, alignment and nozzle module pages — but the thesis does not print them here.)*

---
---

# CHAPTER 12 — SYSTEM-LEVEL VALIDATION (`\label{chap:validation}`) — THE CLIMAX

## 12.1 Narrative

This is the chapter where the modules stop being promises. Validation was deliberately scoped to what only emerges in the complete device — coordinated fluid delivery through assembled lines, automated rack handling, and containment across dispensing cycles — with bench results from the module chapters cited rather than repeated, and with several requirements openly **excluded** because the prototype proves functional feasibility rather than commercial packaging (no enclosure ⇒ no temperature or wind fixture; breadboards ⇒ no electrical safety certification; PLA ⇒ no cleanable non-porous surface). Two of six channels were populated, and the argument for why that suffices is structural: the fluid lines are physically isolated and identical, so two channels fully demonstrate line priming, volumetric accuracy and droplet detachment, and expanding to six "affects electrical current draw rather than fluid behavior." The first turning point is the accuracy result, and it starts as a failure: dispensing a commanded **1000 µL** through the complete assembled path using the **nominal per-stroke constant from the isolated pump bench**, deliveries fell roughly **18 % short**. Recalibrating the per-stroke constant *on the assembled instrument* brought delivery not merely inside but well inside the ±10 % envelope — **−3.4 % on Channel 1 and +0.6 % on Channel 2** — with coefficients of variation of **0.2 % to 1.0 %**, against a **0.27 %** manual-micropipetting baseline recorded on the same analytical balance. The second turning point is a caveat with real engineering consequence: across separate sessions with re-primed lines and a different power supply, the per-step constants shifted by **+1.3 %** and **−5.0 %** — still inside ±10 %, but enough to prove calibration depends on tubing tension and priming state rather than an immutable pump constant, so "field instruments require automated on-device recalibration rather than relying on a single factory setting." And the thesis does not paper over the residual mystery: both assembled heads deliver roughly **10 % less per stroke** than the isolated bench head, and Channel 2 matches the bench head's measured occlusion gap and still under-delivers, so the gap alone does not explain it — print tolerance elsewhere (the unmeasured rotor radius), tubing batch variance, tube fatigue and back-pressure all remain live suspects. The third turning point is the throughput run: a dual-reagent protocol (**100 µL and 75 µL**) across a **forty-tube, five-rack batch**, run start to finish **without any user help**, on the bench DC supply — with the linear axes deliberately slowed so the steppers had enough strength to push the loaded five-rack magazine without stalling, at a small cost in cycle time. Placement across those forty tubes landed inside the **5 mm** target radius, with only about **three droplets** partly wetting the rack deck or lane. The fourth turning point is a failure mode that has nothing to do with kinematics: if tube caps are left flat instead of folded back to **135°**, they project laterally and rub the lane wall, and because that axis is **open-loop**, friction causes lost steps — "the firmware registers the carriage as arrived while the rack lags behind," so doses land off-centre. Positioning repeatability holds only when external friction is absent. The fifth turning point is portability's ceiling: on the 12 V tool battery the machine got through **two full racks (16 samples)** before the draining pack could no longer support both pumps running together, and because the current firmware cannot run one pump at a time, the test had to stop — so **16 samples is the demonstrated battery batch**, and larger batches need a one-pump-at-a-time firmware mode. The final state is a verdict table in which accuracy, reproducibility, versatility, unattended operation, cross-contamination and fluid-path replaceability all pass; portability, spillage and operator exposure are **partly met**; training is untested; and operating envelope, wind, cleanability and electrical safety are explicitly excluded.

## 12.2 The validation runs, described precisely

### Run A — Gravimetric accuracy and precision (§12.2, `sec:validation-accuracy`)
- **What was dispensed:** a commanded **1000 µL** per dose, through the **complete assembled fluid path** (storage module → liquid needle → pump head → 450 mm line → nozzle needle).
- **Channels:** **two** pump heads, fed from the storage module, measured **one channel at a time** (per ch. 10, so a second moving pump could not enter the accuracy figures as an uncontrolled variable).
- **Method:** dispensed into **tared microcentrifuge tubes on the rack**, which were **immediately capped and weighed** on an analytical balance.
- **Result, before recalibration:** using the **nominal per-stroke constant from the isolated pump bench**, deliveries fell **roughly 18 % short**.
- **Result, after recalibrating the per-stroke constant on the assembled instrument:** **Channel 1 = −3.4 %**, **Channel 2 = +0.6 %** — "well inside the target ±10 % envelope, outperforming the requirement."
- **Precision:** coefficient of variation **0.2 % to 1.0 %** (intra-session, across consecutive doses), against a **0.27 %** baseline for **manual micropipetting on the same analytical balance**.
- **Inter-session drift:** across separate sessions with **re-primed lines and a different power supply**, the per-step delivery constants shifted by **+1.3 %** and **−5.0 %**. Both still inside ±10 %.
- **Power:** these accuracy figures were taken on a **bench power supply, not battery**. Explicitly disclosed.
- **Unexplained residual:** both assembled heads deliver **roughly 10 % less volume per stroke** than the isolated bench head. Channel 2 **matches the bench head's measured occlusion gap and still under-delivers**, so the gap alone does not explain the loss. Candidate causes named: print tolerance elsewhere in the head (e.g. the **unmeasured rotor radius**), tubing batch variance, tube fatigue, back-pressure.
- **Verdict:** Accuracy **Met**, Reproducibility **Met**.

### Run B — Forty-tube unattended throughput run (§12.3 + §12.4, `sec:validation-versatility`, `sec:validation-unattended`)
- **What was dispensed:** a **dual-reagent protocol — 100 µL and 75 µL** — one reagent per populated channel.
- **Scale:** **forty tubes across five racks** (8 tubes per rack), run **to completion**.
- **Autonomy:** "from start to finish without any user help," powered by the **bench DC supply**.
- **Enabling change:** the **linear axes were slowed down** — slower speeds gave the stepper motors enough strength to push the loaded five-rack magazine without stalling, "adding only a small delay to the cycle time."
- **Needles:** **blunt 22-gauge**, matching the droplet-detachment regime characterized in ch. 8 (nozzle module). Multi-rack dye trials confirmed the regime held across the full protocol.
- **Placement accuracy:** evaluated with **dyed solutions** for visual contrast. Across the forty tubes, droplets landed on the tube openings, **inside the 5 mm target radius** the nozzle is specified against. Apart from tube-lid fouling, **only three droplets** partly wetted the rack deck or the lane instead of falling into a tube.
- **Cross-rack consistency:** tubes lifted from the **first and last racks** held **visually comparable volumes** (qualitative, by eye — see `fig:validation-sample`).
- **Failure mode found:** tube caps left **flat** rather than folded back to **135°** project laterally and rub the alignment lane wall. Because that axis runs **open-loop**, friction causes **lost steps**; the firmware registers the carriage as arrived while the rack lags behind, so doses land off-centre. **Mitigation currently required of the operator:** fold all caps to 135°, avoid lateral cap overlap, maintain rack clearance. **Production fix:** open the tube caps automatically.
- **Vial-capacity ceiling found:** at **1000 µL per dispense, a standard 4 mL vial provides only three to four doses**, so for high-volume protocols batch size is limited by **vial capacity, not mechanical throughput**.
- **Verdict:** Versatility **Met\***, Unattended operation **Met**.

### Run C — Untethered battery run (§12.4, `sec:validation-unattended`)
- **A separate run**, on the **12 V tool battery** (DeWalt DCB127).
- **Result:** the battery powered the machine through **two full racks — 16 samples**.
- **Failure:** after that, as the battery drained, **running both pumps at the same time drew too much power and caused them to stall**. Because the current firmware **cannot run one pump at a time**, the test had to stop.
- **Conclusion:** "This shows that the battery can handle up to 16 samples. For larger batches on battery, future firmware must run one pump at a time."
- **Verdict:** Portability **Partly met** — "A run on battery reached two racks; the complete run used mains."

### Run D — Containment, spillage and exposure (§12.5, `sec:validation-containment`)
- **Method:** assessed **visually during the dye runs, with the machine standing on a white laboratory bench**.
- **Result:** **no dye escaped the machine onto the bench or reached the operator.** The only liquid to leave a tube was **roughly three droplets** that landed on the rack and lane.
- **Storage-module weakness found:** vial **septa lose their seal after repeated puncture**, leaving droplets on the needle tips — "a spillage risk after about **five** punctures, and no reliable reseal past **twenty**."
- **Second storage weakness:** the air vent is **never closed**, so a volatile reagent evaporates slowly through the filter; a production storage module "would need an inline pinch valve."
- **Fluid path:** all fluid-contact components are **disposable and replaceable** — pump tubing, blunt needles, storage fittings, sterile vent filters. The path is **reversible and drainable into the storage vial** to re-store reagents. **But** reverse pumping leaves **scattered microdroplets along the lumen and capillary retention in the nozzle Luer fitting**, so lines cannot be switched between chemicals without a thorough wash or replacement.
- **Cross-contamination:** prevented **architecturally, not by wash cycles** — each reagent travels an unbranched dedicated line, and droplets detach **across an air gap** without contacting tubes or liquid. Reagent cross-contamination and tube-to-tube carryover "are therefore eliminated by design."
- **Verdicts:** Cross-contamination **By design**; Fluid paths **Met**; Spillage **Partly met**; Operator exposure **Partly met**.

## 12.3 The verdict table (`tab:validation-verdict`) — every row, verbatim basis

**Performance**
| Requirement | Verdict | Basis |
|---|---|---|
| Accuracy | **Met** | "Within ±10 % once each channel carries its measured per-stroke constant" (§12.2) |
| Reproducibility | **Met** | "Coefficient of variation 0.2 % to 1.0 %, comparable to manual pipetting" (§12.2) |
| Versatility | **Met\*** | "Two reagents tested (extensible to six by design), 5–1000 µL, full 40-tube run" (§12.3) |
| Feasibility | **n/a** | "A concept-selection gate, not a test of the built device." |

**Automation**
| Requirement | Verdict | Basis |
|---|---|---|
| Unattended operation | **Met** | "A complete 40-tube run finished without intervention" (§12.4) |
| Training | **Not tested** | "Deferred for time; the two-person evaluation of [ch. 9] carries the argument at lower strength." |

**Field analysis and portability**
| Requirement | Verdict | Basis |
|---|---|---|
| Operating envelope | **Excluded** | "No enclosure or climate control on the prototype." |
| Portability | **Partly met** | "A run on battery reached two racks; the complete run used mains" (§12.4) |

**Contamination**
| Requirement | Verdict | Basis |
|---|---|---|
| Cross-contamination | **By design** | "A dedicated line per reagent and non-contact dispensing" (§12.5) |
| Wind | **Excluded** | "No enclosure, and the requirement is not reproducible as written." |
| Cleanability | **Excluded** | "PLA fused-filament parts are not a cleanable surface." |
| Fluid paths | **Met** | "Every wetted part is replaceable, and the line is drainable" (§12.5) |

**Safety**
| Requirement | Verdict | Basis |
|---|---|---|
| Spillage | **Partly met** | "Nothing escaped beyond the machine, but a few droplets landed on the rack; the storage septum leaks after repeated puncture" (§12.5) |
| Operator exposure | **Partly met** | "No contact during dispensing, but droplets left on the rack expose an operator who handles it" (§12.5) |
| Electrical safety | **Excluded** | "Breadboard electronics; the low-battery run lockout is unmet by design." |

**Table footnote, verbatim:** "The 5 µL lower bound is not yet validated but expected to pass."

**Scorecard for a slide: 6 Met (one "by design"), 3 Partly met, 1 Not tested, 4 Excluded, 1 n/a.**

## 12.4 Key facts and numbers

- Commanded dose in the gravimetric test: **1000 µL**. Channels measured: **2**, one at a time.
- Uncalibrated shortfall using the bench constant: **≈ 18 %**.
- Post-recalibration error: **−3.4 %** (Ch 1), **+0.6 %** (Ch 2). Requirement: **±10 %**.
- Intra-session CV: **0.2 %–1.0 %**. Manual micropipetting baseline CV on the same balance: **0.27 %**.
- Inter-session per-step constant drift: **+1.3 %** and **−5.0 %**.
- Assembled heads vs isolated bench head: **≈ 10 % less volume per stroke**.
- Volume range claimed: **5–1000 µL** (5 µL lower bound **not yet validated**).
- Protocol run: **100 µL + 75 µL**, **2** reagents, **40** tubes, **5** racks, **8** tubes per rack.
- Vial ceiling: a **4 mL** vial gives **3–4** doses at **1000 µL** each.
- Placement: inside the **5 mm** target radius; **~3** droplets missed onto rack deck or lane.
- Needles: blunt **22-gauge**.
- Cap fold angle required: **135°**.
- Battery run: **2** racks = **16** samples.
- Septum: spillage risk after **~5** punctures; **no reliable reseal past 20**.
- Training requirement (untested): learn to run the machine in **under ten minutes** without lab experience; **2** non-expert users tried the touchscreen in ch. 9.
- Channels populated: **2 of 6**.

## 12.5 Message-style headlines

1. "Calibrated on the bench, the assembled machine was 18 % short — calibrated on itself, it hit −3.4 % and +0.6 %."
2. "Against a ±10 % requirement, the instrument delivered within 3.4 %."
3. "Precision matched a human with a pipette: 0.2–1.0 % CV against a 0.27 % manual baseline."
4. "The pump constant is not a property of the pump — it moved 5 % between sessions, so field instruments must recalibrate themselves."
5. "Both assembled heads lose 10 % per stroke that the occlusion gap alone does not explain."
6. "Forty tubes, five racks, two reagents, start to finish with nobody in the room."
7. "Slowing the linear axes was what made forty tubes unattended possible."
8. "Every droplet landed inside the 5 mm target radius; three out of forty tubes' worth wetted the deck instead."
9. "The worst placement failure was not kinematic — it was a tube cap left unfolded rubbing an open-loop axis into lost steps."
10. "On battery the machine ran sixteen samples, then the pumps stalled — because the firmware cannot yet run one pump at a time."
11. "Cross-contamination is eliminated by architecture, not by wash cycles: one dedicated line per reagent, and every droplet crosses an air gap."
12. "At 1000 µL per dose, a 4 mL vial holds three doses — batch size is limited by the vial, not the machine."
13. "The septum reseals about five times and not reliably past twenty, which is where the spillage risk actually lives."
14. "Six requirements met, three partly met, one untested, four excluded — and the excluded ones all wait on an enclosure and a PCB."

## 12.6 Figures and tables

| Label | Paths (rel. `Pictures/`) | Caption gist | Type |
|---|---|---|---|
| **`tab:validation-verdict`** | — | "Validation outcome against the system-level requirements" — every requirement from `tab:global-requirements` with verdict (Met / by design / partly met / excluded) and basis | **Table — the single most important artifact in the chapter** |
| `fig:validation-40` | `validation-40-start`, `validation-40-done` | "The forty-tube throughput run, before and after." (a) five racks loaded with empty tubes at the start; (b) the same racks afterwards, every tube filled. Dispensed unattended to completion with a two-reagent recipe | Photos (2) |
| `fig:validation-sample` | `validation-sample-back`, `validation-sample-front` | "Dispensed sample tubes from different racks." A tube lifted from the back rack (a) and the front rack (b), "holding comparable delivered volume by eye" | Photos (2) |

**Most striking / most decisive (all four, this chapter is small and every asset earns its place):**
- ⭐⭐ `tab:validation-verdict` — build the closing slide directly on this table. Colour-code Met / Partly / Excluded.
- ⭐⭐ `fig:validation-40` — the before/after of forty tubes is *the* payoff image of the entire defense. Put (a) and (b) side by side and let it land.
- ⭐ `fig:validation-sample` — the two tubes from first and last rack; honest about being a by-eye comparison, which is a good moment to pre-empt the question.
- ⭐ A numbers slide you must build yourself (no figure exists): **18 % → −3.4 % / +0.6 %**, with the ±10 % band drawn. The chapter's headline result has no plot in the thesis, so make one.

> ⚠ **Video/photo evidence:** chapter 12 cites **only** the two photo figures above — there is **no video reference in the chapter text**. The repo does hold web clips that fit this chapter (`assets/media/video/pump-gravimetric`, `alignment-v2`, `droplet-slowmo`, `pump-head`; `machine-dispensing.mp4` is a reserved, unfilmed slot), plus untracked files in the working tree (`pump-pprototype-2-3-measurement-video.mp4`, `pump-prototype-2-3-final-measurment-picture-cropped.jpg`). If you want moving evidence of the validation run at the defense, it has to come from the repo/media, not from a chapter citation.

## 12.7 Quotable sentences (verbatim)

1. "Using the nominal per-stroke constant from the isolated pump bench, initial deliveries fell roughly 18 % short."
2. "Recalibrating the per-stroke constant on the assembled instrument brought delivery well inside the target ±10 % envelope, outperforming the requirement with errors of only −3.4 % on Channel 1 and +0.6 % on Channel 2."
3. "this drift confirms that calibration depends on specific tubing tension and priming state rather than an immutable pump constant."
4. "Channel 2 matches the bench head's measured occlusion gap and still under-delivers, so the gap alone does not explain the loss."
5. "Positioning repeatability holds only when external friction is absent."
6. "Cross-contamination is prevented architecturally rather than through wash cycles."
7. "For high-volume protocols, batch size is therefore limited by vial capacity rather than mechanical throughput."
8. "The concept is now established on a working foundation, but turning it into a field-ready device calls for a redesign in which many of the prototype's choices are reconsidered."

## 12.8 Open gaps and limitations the chapter admits

- **Four requirements excluded outright:** operating envelope, wind, cleanability, electrical safety — all consequences of no enclosure, PLA parts and breadboard electronics.
- **Training requirement never formally tested** (under ten minutes, no lab experience). Only two non-expert users tried the touchscreen, and "formal tests with beginners are still needed."
- **5 µL lower bound not validated**, only "expected to pass."
- **Accuracy figures are on mains, not battery.**
- **The ~10 % per-stroke loss on both assembled heads is unexplained**; the rotor radius was never measured.
- **Cross-rack volume consistency is by eye only**, not gravimetric.
- **Battery batch ceiling is 16 samples**, and the firmware cannot fall back to one pump at a time.
- **No battery sensor at all** — cannot check charge or shut down safely; motors lose strength before the electronics turn off, so "the pumps could dispense the wrong amount of liquid before anyone notices." The low-battery lockout from the requirements table "is therefore not yet built into the hardware."
- **The open-loop alignment axis has no way to detect a lost step** — friction from an unfolded cap silently misplaces doses.
- **Operator must fold every cap to 135°** and maintain rack clearance; automatic cap opening is left to production.
- **Reverse pumping does not clean a line** — microdroplets along the lumen and capillary retention in the Luer fitting mean lines cannot be switched between chemicals without wash or replacement.
- **Septum seal degrades**: risk after ~5 punctures, unreliable past 20. **Air vent never closes**, so volatile reagents evaporate; needs an inline pinch valve.
- **Spillage and operator exposure only partly met** — droplets on the rack put reagent exactly where an operator picks it up, and pierced septa leave residue on vial change.

## 12.9 Likely committee questions (with the thesis's own answer)

1. *"An 18 % error is enormous — how is this a pass?"* — That figure is the *uncalibrated* case, using the isolated bench head's constant on a different assembled path. Once each channel carries its own measured per-stroke constant the errors are −3.4 % and +0.6 %, well inside ±10 %. §12.2.
2. *"Then your calibration is not transferable. Isn't that a fatal weakness?"* — It is a design requirement, not a defect: the per-step constant shifted +1.3 % and −5.0 % across sessions with re-primed lines, so "field instruments require automated on-device recalibration rather than relying on a single factory setting." §12.2.
3. *"Why do the assembled heads lose 10 % per stroke?"* — Not fully explained. Channel 2 matches the bench head's occlusion gap and still under-delivers, so print tolerance elsewhere (the unmeasured rotor radius), tubing batch variance, tube fatigue and back-pressure remain the candidates. §12.2.
4. *"Two channels is not six. Why does validating two suffice?"* — The fluid lines are physically isolated and identical, so two channels fully demonstrate priming, volumetric accuracy and droplet detachment; going to six affects electrical current draw, not fluid behaviour, and six-channel capacity is provisioned in pins and the shared step clock. §12.1.
5. *"How precise is it really?"* — CV of 0.2 % to 1.0 % intra-session, against a 0.27 % baseline for manual micropipetting measured on the same analytical balance. §12.2.
6. *"You claim 5 to 1000 µL, but did you test 5 µL?"* — No. The table footnote states the 5 µL lower bound "is not yet validated but expected to pass"; ch. 10 adds that 5 µL is a single roller stroke and that sub-stroke proportionality was never isolated experimentally. `tab:validation-verdict`, §10.3.
7. *"What actually broke during the 40-tube run?"* — Nothing mechanical. The recurring placement failure came from consumable handling: flat tube caps rubbing the lane wall cause lost steps on an open-loop axis, so the firmware thinks the carriage arrived while the rack lags. §12.3.
8. *"Is this portable or not?"* — Partly. It ran a complete protocol untethered, but the battery reached only two racks (16 samples) before concurrent pumping stalled, and the complete 40-tube run used mains. §12.4, `tab:validation-verdict`.
9. *"What happens if the battery dies mid-run?"* — There is no battery sensor, so the motors lose strength before the electronics stop and the machine under-delivers silently. The low-battery lockout is explicitly unmet, and the fix named is a battery monitor chip. §12.4.
10. *"How do you know there is no cross-contamination, with no wash step?"* — Because there is nothing to wash between: each reagent has its own unbranched dedicated line, and droplets detach across an air gap without contacting tubes or liquid, so carryover is eliminated by design rather than by cleaning. §12.5.
11. *"Where is the real spillage risk?"* — Not the dispensing: no dye escaped onto the bench or reached the operator. It is the storage module's septa, which are a risk after about five punctures and do not reliably reseal past twenty. §12.5.

## 12.10 Website tools referenced

**None.** Chapter 12 contains no `\livetool` macro and no `sirsirio.github.io` address.

---
---

# CROSS-CHAPTER NOTES FOR THE DECK

## All website / tool pointers in these four chapters (complete)
| Tool name as printed | URL | Chapter/section | Status |
|---|---|---|---|
| **Operator Interface Prototypes** | `sirsirio.github.io/thesis-tools/tools/ui-prototypes/` | §9.2.2 `sec:ui-mockups` (`tool:ui-prototypes`) | **Live in the submitted thesis.** Address is frozen — the printed QR cannot be re-pointed. |
| **Operator Interface, Live** | `sirsirio.github.io/thesis-tools/tools/ui-mockup/` | §9.3 `sec:ui-resulting` (`tool:ui-mockup`) | **COMMENTED OUT — not printed.** Exists in the repo; mention it verbally as a supplement. |
| **System Architecture Explorer** | `sirsirio.github.io/thesis-tools/tools/system-architecture-explorer/` | §10.1.1 `sec:architecture-explorer` (`tool:architecture-explorer`) | Live. Source of `fig:tool-directions`. |
| **Dispense Throughput Simulator** | `sirsirio.github.io/thesis-tools/tools/dispense-throughput-simulator/` | §10.1.2 `sec:throughput-simulator` (`tool:throughput-simulator`) | Live. Source of `fig:tool-choreography` and `fig:tool-benchmarks`. |
| Pin budget | — | appendix `sec:app-explorer` | Appendix, not a live-tool link. Repo copy: `tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md`. |
| — | — | ch. 11, ch. 12 | **No tool links at all.** |

## The four turning points worth building the whole 30 minutes around
1. **Ch 9:** "The inherited interface could only be escaped by unplugging the machine" → total redesign → a self-auditing browser prototyping loop that catches contrast and touch failures *before* the device.
2. **Ch 10:** "The best architecture was out of stock" → re-framing dosing as a *step count* rather than a *speed* → one shared clock, six enable lines, eight pins.
3. **Ch 11:** "The parts that hold it together were designed last" → a 50 × 35 × 18 cm, 3.3 kg instrument that carries its own battery.
4. **Ch 12:** "18 % short → −3.4 % and +0.6 %" and "forty tubes, nobody in the room."

## Numbers most likely to be misquoted — double-check against this list
- ±10 % is the **requirement**; −3.4 % / +0.6 % are the **results**; 18 % is the **uncalibrated** error; ~10 % is the **assembled-vs-bench per-stroke deficit**; +1.3 % / −5.0 % is the **inter-session drift**. Five different percentages, all in one paragraph of §12.2.
- 16 samples is the **battery** ceiling; 40 tubes is the **mains** run.
- €13 appears twice in ch. 10 with different meanings: the smart-driver premium over the next viable candidate, **and** the ESP32-S3-Nano premium over the two-pump baseline. €10 is the Nano premium over the lowest-cost pin-compliant configuration.
- 86 % (throughput saving from the second pump) vs 86 Wh (target power bank) — unrelated, adjacent in the chapter.
- The v2.2 home screen has **two** tiles in the body text and **three** in the stale table row. Use two.
