# Thesis Tools — Modular Automated Liquid Dispensing for Point-of-Care Use

> [!IMPORTANT]
> **TODO — file the v2.3 measurement media.** Two files from the gravimetric
> campaign sit loose at the repository root and are referenced by nothing:
>
> | File | Status |
> |---|---|
> | `pump-prototype-2-3-final-measurment-picture-cropped.jpg` | **In the thesis** — carried verbatim into §3.4 as the gravimetric setup figure (`latex/Pictures/gravimetric-setup.jpg`). The uncropped duplicate was deleted 2026-08-25. Still needs a home in this repo |
> | `pump-pprototype-2-3-measurement-video.mp4` | **Not placed anywhere yet.** Decide where it belongs — most likely beside the other prototype videos in this folder, and linked from the test results |
>
> Both belong under `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/`
> next to `PrototypePumpHeadV2.3Dispensing.mp4`. Note the video filename has a
> typo (`pprototype`) worth fixing when it moves.
>
> The photograph settled a detail the thesis had been carrying vaguely: the
> balance is marked `max = 220 g`, `d = 0.0001 g`, which is the 0.1 mg
> readability every ISO 23783-2 compliance claim in §3.4 rests on.
>
> *Added 2026-08-25.*

**Sirio Vittorio Feltrin** · DTU Bioengineering · 2025–2026

Interactive computational tools and design records from master's thesis research on a modular automated liquid dispensing device for point-of-care and field use. Each tool is a self-contained HTML/JS page: no installation, no build step, no internet required.

The landing page is a showcase of the finished instrument: it opens on the rotor motif and the problem statement, then shows the assembled machine in photographs with leader-line callouts and strips from the development. From there a seven stop journey follows one droplet through the device, vial, pump, nozzle, rack, screen, electronics and landing, with each tool anchored to the module it served, and closes on the method that produced it.

Every page shares one frame: a sticky nav carrying the Instruments panel, the same background wash and a common footer. The interface is English, with an Italian switch on the landing page (the Italian pass is still in progress).

**Live site:** [sirsirio.github.io/thesis-tools](https://sirsirio.github.io/thesis-tools/)

---

## Tools

| Tool | Description | Status |
|------|-------------|--------|
| [Instruments](tools/index.html) | The plain index of everything on the site: nine tools grouped by what they served (pump, electronics, interface, method) and three records (prototype journey, presentations, timeline), each with one line of purpose and a small mark. Same list the Instruments panel in the nav renders, but as an ordinary page that works with JavaScript off. | ✅ Live |
| [Peristaltic Rotor Geometry Solver](tools/rotor-solver/index.html) | Solves rotor radius analytically for a target stroke volume. Checks roller collision, hub clearance, and tube length feasibility across roller counts 3–12. Stroke geometry takes a manual arc-compensation (ΔArc_total) input pasted from the displaced-volume model, and a live top-down geometry diagram dimensions every parameter for a selected roller count. Motor & microstepping panel screens each configuration against Wantai 42BYGHW811 / DRV8825 torque margin (FoS), steps/stroke, µL/step resolution, and max step rate — voltage-dependent via inductive ceiling. Full EN/IT interface. | ✅ Live |
| [GSD Workflow Guide](tools/gsd-workflow-guide/index.html) | Interactive reference for the GSD spec-driven development workflow. Visual diagram of the discuss → plan → execute loop with optional quality gates and utility commands. Expandable intro to spec-driven development and getting-started guide for new and existing projects. | ✅ Live |
| [Peristaltic Occlusion & Displaced-Volume Model](tools/peristaltic-roller-displaced-volume-model/index.html) | Two-part geometric reference for tube-deformation mechanics of a rigid-backed peristaltic pump. Part 1: stadium cross-section model (constant-perimeter assumption, residual lumen area, interactive SVG). Part 2: axial contact length, displaced volume per roller, and arc compensation. LaTeX formulas, parameter tables, and assumption lists for thesis-level documentation. | ✅ Live |
| [Tensioned Tube-Path & Stroke Volume Model](tools/peristaltic-tensioned-path-model/index.html) | Alternative path geometry for a tube pinned at both ends under seating tension: straight roller-to-roller tangent runs with α/2 wraps replace the 180° wall-arc assumption. Applies incompressibility corrections for axial pre-strain (lumen area 1/λ, wall 1/√λ, effective interference loss), predicts net volume per stroke for an existing rotor, and solves the corrected rotor radius in closed form. Interactive top-down SVG comparing taut path vs. arc. | ✅ Live |
| [System Architecture Explorer](tools/system-architecture-explorer/index.html) | Whole-device architecture page for the pump's control electronics: an interactive six-module hardware schema (pump, alignment, nozzle, storage, UI, electronics), a design-direction gallery of device personas that filters the matrix, and a sortable/filterable comparison matrix (with a colour-coded Design type column) of driver/MCU/bus variants — editable BOM prices, a live DKK↔EUR converter, per-component source/confidence tags, a pins-used/free feasibility readout with overrun flags, and a live variant-driven SVG system diagram (click a row to redraw). English interface. | ✅ Live |
| [Dispense Choreography & Throughput Simulator](tools/dispense-throughput-simulator/index.html) | Configure up to 6 liquids and pump flow parameters, then schedule a 6-nozzle indexing line (32-sample rack) at a chosen concurrency (1…N). Row-per-station Gantt with bottleneck highlight; headline metrics for total run time, bottleneck station, A1 (lockstep) vs A2 (independent-rate) time saved, and throughput. Illustrative rack-indexing animation. | ✅ Live |
| [Pump Testing Protocol](tools/pump-testing/index.html) | A document-first, citable dispensing-accuracy qualification protocol for the peristaltic pump. Top layer: the market-grade ISO 23783-2 Annex D single-channel gravimetric method (balance grades, environmental limits, evaporation handling, mass→volume Z-factor, replicate convention, trueness/precision, reporting) benchmarked against the ISO 8655 pipette-equivalence standard, plus a lighter go-to-market map (safety/reliability, biocompatibility, QMS/regulatory pathway) and an alternate-methods comparison. Bottom layer: the actual prototype protocol, with each deviation from the ideal reasoned and justified. English interface. | ✅ Live |
| [Operator Interface Prototypes](tools/ui-prototypes/index.html) | The interface design record published as the live artifacts it was made on: nine candidate operator interfaces over five rounds (2026-07-31 → 2026-08-11), drawn as self-auditing web pages at the panel's real 320 × 240 before any firmware existed. Rounds 1–3 designed the interface (style → information architecture → the chosen pixel contract the LVGL firmware transcribes, with live touch-target/RGB565/sunlight probes and a per-render contrast audit); rounds 4–5 revisited only the home screen after use, as comparison boards with machine-state switches. Files are copied verbatim from the design record; the thesis cites this page's address. English interface. | ✅ Live |
| [Operator Interface, Live](tools/ui-mockup/index.html) | The finished operator interface as an interactive mock: all 30 firmware screens, 134 frames captured from the ESP32-S3 over USB in the panel's own RGB565 at 320 × 240 (staged example state, PANPOC Protocol 1, recipe Panpoc bind), each served pixel-exact with every button a tappable hotspot wired to the firmware's own navigation table. Machine conditions (position, card, lines, liquid, pumps fitted, theme, language) switch the captured variant the way the interlocks do; runs, fills, resets and bottle calibration play through their captured phases; the service panel's guided demo works. A screen map beside the panel lists every screen and frame, lights the current one and the ones reachable from it, and jumps the panel on click. The thesis prints this page's address (frozen path). English interface. | ✅ Live |
| [Prototype Design Space](prototypes/index.html) | Visual journey through the hardware prototypes, carrying **three module threads**: the pump that meters the dose (orange), the alignment stage that indexes the samples under it (violet) and the nozzle that releases the droplet (teal-blue). Each thread has its own curve, node set and scroll animation, and the three converge into one Integration node for the assembled instrument. Every built prototype has its own **record page**, co-located with that prototype's notes and media, giving purpose, as-built parameters, worked calculations, measured results and design reasoning. Authored from real test data throughout. | ✅ Live |
| [Nozzle Module record](prototypes/Prototype-3-Nozzle-Module/index.html) | The nozzle module as rebuilt, mounted and validated: six blunt needles in a fixed linear array over the sample rail, hub seats with elastic retaining bands, and an eccentric mass that shakes the pendant droplet loose. Covers the inherited mechanism and why it did not work, the rebuild, the tip trials that set the working boundary, the forty-tube validation run inside the 5 mm landing tolerance, and the slow-motion clip of the release. | ✅ Live |
| [Alignment Module V3 record](prototypes/Prototype-2-Alignment-Module/v3-two-axis-chassis/index.html) | The two-axis chassis that carries the whole instrument: an input queue of racks, a dispensing lane under the nozzles and an output tray, about 500 mm across, five racks of forty tubes. Written from the V3 section of the alignment module notes, alongside the earlier V2 and V2.1 record at the module root. | ✅ Live |
| [Presentations (HTML Decks)](decks/index.html) | The site's HTML slide deck runtime in the dark-glass theme. Two decks: the Lab Meeting (June 2026) with live tool embeds, and the Thesis Defense (28 September 2026): 43 slides plus 23 backups, GSAP-choreographed steps, embedded live tools, a presenter view with notes and timer, and a synchronised guest view for an Italian companion deck. | ✅ Live |
| [Thesis Roadmap & Timeline](tools/thesis-timeline/index.html) | Interactive Gantt of the whole thesis project, built from the original Miro plan and updated for the extended schedule (submission 15 Sep, defense 28 Sep 2026). Work streams are colour-coded by owner (author vs. thesis partner) and shaded by status (done / active / planned), with milestone flags, a today line, hover tooltips, and a live countdown. Data authored inline in a single `DATA` block — chart re-renders from it. | ✅ Live |

---

## Using offline

1. Download or clone this repository
2. Open `index.html` in any modern browser
3. Navigate from the landing page, from the Instruments panel in the nav, or from `tools/index.html`. Everything works without an internet connection

---

## Tech

Static HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no CDN, no install. Every page loads `assets/style.css`, then `assets/site.css` and `assets/site-nav.js`, which provide the shared nav, Instruments panel, background wash and footer; each tool keeps its own styles and calculation code inline. Photographs, renders and video live web-sized under `assets/media/`, and the landing page vendors GSAP core locally to drive its hero motif. Designed to run from a file system or a USB drive as well as GitHub Pages.

---

## Development workflow

New tools are built with [GSD](https://github.com/open-gsd/get-shit-done-redux) and Claude Code. Each tool has a `SPEC.md` alongside its `index.html` documenting inputs, outputs, formulas, and assumptions.

See `CLAUDE.md` for the full project orientation and `ROADMAP.md` for planned tools.

---

## Thesis context

The device under development combines a peristaltic pump (NEMA17 stepper, rotating peristaltic head, Sensirion flow sensor) with a modular fluidic interface for point-of-care diagnostics. These tools support design decisions made during the thesis and are cited in the written work with QR codes linking here.

---

*Technical University of Denmark · DTU Bioengineering*
