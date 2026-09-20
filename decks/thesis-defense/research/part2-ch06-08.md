# DEFENSE PRESENTATION SOURCE PACK — Chapters 6, 7, 8

Read in full from `D:\03. DTU - Offline\03. MASTER THESIS\01. Thesis Document LaTex\latex\Chapters\`:
- `06_Pump-Module.tex` (1297 lines)
- `07_Alignment-Module.tex` (778 lines)
- `08_Nozzle-Module.tex` (446 lines)

Supporting reads for equations/constants the chapters delegate to appendices (needed for accuracy, not part of the brief but quoted where the chapter points to them):
- `..\Backmatter\App-K-Pump-Design-Models.tex`
- `..\Backmatter\App-L-Alignment-Module-Record.tex`

All numbers below are verbatim from the source, unrounded.

---
---

# CHAPTER 6 — PUMP MODULE (`\label{chap:pump-module}`)

## 6.1 Narrative of the chapter

The pump is the one module that decides how much liquid the instrument delivers — every other module positions it, feeds it, drives it or reports on it — so the accuracy and reproducibility requirements are met or missed here alone. About thirty mechanisms were gathered across six families, deliberately including implausible ones (a piano hammer shaking droplets off a vibrating string; a tattoo machine piercing a membrane) on the principle that an ideation returning only workable ideas has not searched far enough; seven survived screening, five were developed, split between the author and his companion-thesis partner Marius. The three displacement architectures (syringe, piston, diaphragm) were killed not by accuracy — a commercial laboratory syringe pump was benchmarked over 108 dispenses and stayed within nominal from 20 µL upward — but by the fact that the liquid touches the machine: plunger, barrel and check-valve leaflets are all wetted, and a decentralized instrument has no wash facility. The peristaltic principle closes the wetted boundary on the tube alone, and the rotary version beat the companion linear pinch pump 3485 to 3185, mainly because linear reciprocating pinching needs check valves and thus reintroduces exactly what disqualified the displacement pumps. The decisive design move was to stop metering time and start metering geometry: 0.51 mm bore PVC, four rollers, and a rotor that advances by discrete steps so that dosing becomes step counting rather than calibrated flow. Building the analytical chain revealed the turning point of the whole chapter — a roller does not pinch on a line, it flattens a finite contact length, and compensating for that pushed the pitch radius from 15.6 mm to 19.70 mm, a 26 % increase; a rotor sized without it would have under-delivered by roughly one fifth on every stroke. Then reality intervened twice: the first build never sealed at all and the measurement chain itself failed, because the inline thermal flow sensor scattered more widely than the quantity it was measuring (SD 1159 µL/min about a mean of 1104 µL/min), so gravimetry replaced it and closed-loop control was abandoned in favour of open-loop geometric metering. Three further builds were spent not on the fluid model but on manufacturing: an eccentric dovetail that opened the apex to 2.22 mm, 3D-printed pegs that tapered 0.085 mm and tilted the rollers 0.6°, and a slicer that shrinks concave internal arcs so a housing drawn at 1.52 mm printed at 1.75 mm. The fourth build (v2.3) read exactly 1.52 mm at the apex and at both ends of the track, and the qualified module then repeated an accumulated dose as well as a manual micropipette (CV 0.25–0.34 % against the pipette's 0.27 %) while sitting 9.4 % below its 5.0 µL nominal — a fixed geometric constant absorbed entirely in firmware. The sting in the tail came at integration: two heads printed from the identical qualified CAD files delivered 3.94 and 4.10 µL per stroke, so the bench calibration constant does not transfer between heads, and each print carries its own constant.

## 6.2 Prototype / version sequence

**Pre-prototype benchmark — commercial laboratory syringe pump (not a build, a reference)**
- What: 13 experimental conditions, two syringe capacities (10 mL and 20 mL, bores 14.85 mm and 19.20 mm), three flow rates (10, 200, 1000 µL/min), 5–11 replicates per condition, 108 total dispenses, measured with an inline thermal flow sensor.
- Why: to test whether syringe accuracy holds at the low end (5–1000 µL) when a single large syringe covers the whole range.
- Result: commanded 1 µL delivered 1.94 µL (+94.3 % deviation); volumes from 20 µL upward remained within nominal limits; error scaled with bore — the 20 mL barrel reached −29.0 % at 500 µL against −3.8 % on the 10 mL syringe.
- Verdict: accuracy did NOT rule the syringe pump out (a glass syringe sized to the volume would perform far better). Wetted plunger/barrel, the committed stroke, lead-screw travel and footprint, and duplication of published open-source syringe drivers ruled it out.

**Companion architecture — linear peristaltic chamber pump (Marius)**
- Stepper-driven lead screw translating a carriage on two parallel guide rods, pinching stationary PVC tubing against a rigid backing.
- Result: high volumetric accuracy at low flow rates with a blunt needle; stick-slip friction along the sliding contact zone; structural flexure in 3D-printed end mounts. Both architectures passed the mandatory ±10 % gates.
- Verdict: lost 3185 to 3485. Discarded because reciprocal linear pinching needs an array of inlet/outlet check valves to route multiple reagents — internal wetted moving parts, dead volume, cleaning burden. Also a thirty-minute batch throughput penalty and a larger footprint.

**proto-01 — 5 µL, four-roller baseline (first printed build)**
- What changed: first physical realization — four-roller rotor mounted directly to a stepper shaft, 3D-printed housing sliding over it, PVC tubing on the upper track, microcontroller driving the stepper open-loop. Head held down with tape (no positive clamp).
- Two parameters reached the build wrong: (1) contact-correction arc entered for a single roller (N_c = 1) instead of the two rollers actually engaged across a 180° track (N_c = 2), so the printed rotor radius was 17.70 mm instead of 19.70 mm; (2) tube wall thickness estimated rather than measured, so the housing gap was drawn at 1.75 mm.
- Result: the 1.75 mm gap was too loose to seal the lumen — zero forward delivery. A folded paper shim was forced under it; calipering the shim returned between 0.78 and 1.10 mm depending on how firmly the jaws were closed. Shimmed, on the balance: 678 µL against a commanded 1000 µL over three replicates = 3.39 µL per stroke against the nominal 5.0 µL, CV 4.5 %.
- Verdict: concept fabricable, model plausible (run for the shim thickness, the occlusion model predicted a delivery close to the one measured), but the shortfall repeated dose to dose, so it came from the shape of the parts and not from the motor. Once the wall was measured at 0.91 mm, a 1.75 mm gap *should* have sealed — it did not, so the printed gap had to be wider than drawn. Also killed the flow sensor as a volume meter and killed closed-loop control.

**Measurement-chain iteration (inside proto-01) — inline thermal flow sensor → gravimetry**
- Validation stage 1: custom driver vs manufacturer's reference software at three setpoints spanning 10–1600 µL/min; plateau averages agreed within 0.21 %, 0.32 % and 2.64 %, largest deviation at the lowest rate (only 0.3 µL/min in absolute terms).
- Validation stage 2: whole analysis pipeline (signal splitting, trapezoidal integration, anomaly screening) exercised on the laboratory syringe pump.
- Failure on the peristaltic pump: on a commanded 1 mL delivery the instantaneous signal had a standard deviation of 1159 µL/min about a mean of 1104 µL/min, apparent reverse flow on one sample in seven, rapid sign changes. Phase-averaging recovered a periodic cycle locked to roller passage at a 6.7 Hz fundamental (firmware timing). Lower sampling rate removed visual scatter but not irreproducibility: two recordings returned 585 and 707 µL for the same commanded delivery (a difference of a fifth).
- Head-to-head: integrated flow trace 600.1 µL across five replicates, CV 17.6 %; analytical balance 678.0 µL across three weighings, CV 4.5 %. The flow integral underestimated by 11.5 % and scattered four times as widely.
- Verdict: from this build on, gravimetry is the reference for every delivered volume in the thesis; flow traces kept only for what a balance cannot show (priming, ripple, backflow). Closed-loop control set aside; open-loop geometric metering adopted.

**v2.1 — the second build, "an unsealed apex"**
- What changed: all three proto-01 requirements met — corrected rotor compensation (N_c = 2 → 19.70 mm pitch radius), empirically measured wall thickness (w = 0.91 ± 0.02 mm, 2w = 1.82 mm), rigid screw clamp plus three radial inspection slots. Also changed how the housing was printed: the curved track now lies flat on the build plate so the gap is set by the print head's path rather than by stacked layers.
- Result: it still did not pump. Referencing every dimension to the motor shaft axis exposed two independent errors. (1) The printed rotor was undersized by thermal shrinkage: 39.04 mm across opposing roller bearings instead of the nominal 39.40 mm (0.18 mm radial error). (2) Fitting a circle through the three measured track radii showed the housing was not concentric with the shaft — a +0.45 mm vertical offset in the dovetail mount. Gap at the track ends 1.71–1.82 mm; gap at the apex 2.22 mm, against the 1.82 mm closure threshold. Rollers occluded at the sides and released the tube completely across the top of the arc.
- Verdict: neither fault could be fixed alone — centring the head with an undersized rotor leaves a marginal 1.77 mm gap with no safety factor; fixing the rotor alone leaves the apex open. Both corrections had to go into the next build together.

**v2.2 — the third build, "roller tilt and track shrinkage"**
- Change 1 (bearing alignment): each roller turns on a printed peg sized to the 5.0 mm inner bearing bore. A 0.4 mm nozzle could not resolve it; a 0.2 mm nozzle printed cleanly but exposed FDM draft — small vertical pegs taper roughly 0.085 mm base to tip. With two stacked bearings spanning the tube width, the lower gripped the wide base and the upper sat loose on the tapered tip, tilting the roller inward by 0.6°, pinching the tube unevenly and walking it axially. Adjusting peg diameter in CAD could not remove the taper. Resolution: delete the second bearing — one bearing on the wide, non-tapered peg base cannot tilt. Because one bearing halves the roller width, raised rims were added either side on the rotor to form a shallow channel the tube sits in, sized with clearance to guide rather than hold (a rim pressing on the tube would rub, wear it, and cost torque for nothing).
- Change 2 (dimensional): three housing variants were planned at target gaps of 1.52, 1.62 and 1.72 mm. The tightest (1.52 mm) was printed first and measured 1.75 mm — 0.23 mm wider than intended. Traced to standard slicer scaling rules, which scale internal concave curves as if they were solid exterior boundaries, whereas extruded beads pull inward on concave arcs so internal curves shrink.
- Verdict: prompted a dedicated printer characterization study on standardized test artifacts to establish empirical offset rules for concave internal tracks.

**v2.3 — the fourth build, "achieving uniform occlusion" (the qualified prototype)**
- What changed: the housing CAD track enlarged using the empirical printer calibration rules, and the dovetail mounting seat lowered by 0.35 mm to bring the track centre onto the motor shaft. The 0.35 mm came from calipering the physical motor mount: dovetail face to motor shaft measured 26.05 mm against the 25.70 mm assumed in CAD.
- Result: measured through the inspection slots before running, the installed gap read **exactly 1.52 mm across the apex and at both ends of the track**. Full concentricity, uniform radial interference, continuous sealing across the whole 180° arc.
- Verdict: the validated baseline. Lesson stated explicitly — the sealing failures were resolved not by revising the fluid model but by characterizing the printing process and measuring assembled parts against a physical datum.

**Two integrated heads (as-built, in the machine) — the replication step**
- What changed: two pump heads printed from the qualified CAD files, one per reagent channel, mounted in the assembled instrument. Fluid path no longer an open beaker: each head aspirates from a storage-module container through a needle, a Luer hub and a flexible sleeve, delivering through 450 mm of tubing to the nozzle. Printed net-shape (no hand-filing of the dovetail seat, which on earlier prototypes had masked print variation).
- Result (all commanded at 1000 µL, 180 rpm, n = 3 per channel):
  - Characterized bench head: gap ≈1.52 mm, 4.53 µL/stroke, CV 0.25–0.34 %.
  - Channel 1 as-built: gap ≈1.45 mm (20 % radial interference), 3.94 µL/stroke, −19.5 % error on the 4.53 constant, +1.3 % on its own constant (delivered 1012.7 µL), CV 1.04 %.
  - Channel 2 as-built: gap ≈1.52 mm (16 % interference), 4.10 µL/stroke, −17.8 % on 4.53, −4.5 % on its own constant (delivered 955.0 µL), CV 2.94 %.
- Verdict: **the calibration constant does not transfer between heads.** The tighter head delivers *less*, which rules out backflow and points to over-compression slowing viscoelastic recovery so the lumen does not fully re-expand between roller passes (a further 3.3 % loss) — which accounts for the 4 % difference between the heads and supports the 1.52 mm gap adopted in v2.3. Channel 2 shares the bench gap yet still delivers less, so printed geometry alone does not account for the whole ~10 % drop; the other candidates are suction-side flow resistance, tubing fatigue, and measurement methodology (bench = open weigh boat with evaporation compensation; integrated = 2 mL sample tubes weighed before and after, uncorrected). Each head therefore carries its own firmware calibration factor.
- Operational boundary found across sessions: between two sessions separated by line re-priming and a power supply swap, the delivery constants shifted by +1.3 % and −5.0 %.

## 6.3 Key facts and numbers (exact)

**Targets / requirements**
- Volume range: 5–1000 µL. Minimum volume 5 µL; nominal stroke volume set to 5 µL so any target is an integer number of strokes.
- Accuracy requirement: delivered volume within ±10 % of target **and** absolute error no greater than 10 µL (`tab:global-requirements`).

**Syringe benchmark**
- 13 conditions; 10 mL and 20 mL syringes; bore 14.85 mm and 19.20 mm; flow rates 10, 200, 1000 µL/min; 5–11 replicates; 108 total dispenses.
- 1 µL commanded → 1.94 µL (+94.3 %). ≥20 µL within nominal. 20 mL at 500 µL: −29.0 %; 10 mL at 500 µL: −3.8 %.
- (Editorial note in source: an old §3.4 gave 24 conditions / 204 replicates for the pipeline check; §6.1.2 and Appendix J give 13 conditions / 108 dispenses. Counts deliberately left out of §6.3 until source data settles.)

**Architecture scoring**
- Rotary peristaltic 3485 points vs linear peristaltic 3185 points.
- Linear lead screw carried a thirty-minute batch throughput penalty.

**Tube and geometry**
- Tube: Masterflex two-stop microbore PVC, Puri-Clear LL; inner diameter 0.51 mm; wall thickness w = 0.91 ± 0.02 mm; stacked double wall 2w = 1.82 mm; outer diameter 2.33 mm.
- Three independent wall measurements (ruler-calibrated optical microscopy of a cut cross-section, caliper on outer diameter, manufacturer reference) agreed within 1.5 %.
- Bore screening: 0.25 mm requires R > 86 mm at higher roller counts (exceeds standard tubing length) and was rejected on clogging risk with paramagnetic microparticles. 0.51 mm is the only bore geometrically feasible across N = 3 to 12.
- Feasibility table pitch radii (mm), 5.0 µL stroke: bore 0.25 → N3 50.2, N4 69.0, N5 86.2, N≥6 fail. **Bore 0.51 → N3 13.2, N4 19.7, N5 24.7, N6 32.7, N8 47.7, N10 64.8, N12 84.0.** Bore 0.76 → N5 13.9, N6 19.8, N8 30.6, N10 43.4, N12 58.3. Bore 1.02 → N6 15.2, N8 24.4, N10 35.6, N12 49.0. Bore 1.14 → N6 14.0, N8 22.8, N10 33.7, N12 46.6. Hub boss radius r_boss = 7 mm (shaft boss diameter 14 mm). Tube-length limit πR ≤ 300 mm.
- Roller radius R_r = 5.0 mm (MR105ZZ ball bearing, 10 mm outer diameter).
- Interference δ = 0.20 mm (nominal 11 % compression on the 1.82 mm wall stack). Conventional design range for interference: 10–20 % of the double wall thickness.
- Compliance / inflation factor k = 1.15 (the only empirical term in the analytical chain).
- Contact length L_c = 3.25 mm; engaged rollers N_c = 2; compensating arc N_c·L_c = 6.51 mm.
- Lumen area A = πd²/4 = 0.2043 mm²; delivering arc V/A = 24.48 mm; total arc per stroke = 30.98 mm.
- **Pitch radius R = 19.70 mm** with compensation, vs 15.6 mm without = a 26 % dimensional increase (without it, under-delivery of roughly one fifth per stroke).
- Printed gap G = 2w − δ = 1.62 mm (design-point table). Built/adopted gap 1.52 mm. Test set printed around the nominal 1.62 mm target at 1.52 / 1.62 / 1.72 mm; 1.52 mm adopted.
- Volume sensitivity to gap: 3.4 µL/mm — stated in the chapter as "a shift of only 0.1 mm changes the stroke volume by roughly seven percent."
- Resolution at quarter-stepping: 0.025 µL per step.
- Roller count: N = 3 leaves momentary unoccluded intervals across a 180° wrap (backflow); N = 4 is the minimum that keeps two rollers engaged. Continuous-flow pumps use six to eight rollers for pulsation, which is irrelevant for discrete stop-and-go delivery.
- Torque factor of safety at 12 V, quarter-stepping, 2000 steps/s, 150 rpm, 200 g load per engaged roller: N3 = 5.40, **N4 = 2.03**, N5 = 1.62, N6 = 0.90, N8 = 0.51, N10 = 0.32, N12 = 0.23. At 24 V: N3 = 8.11, N4 = 3.05, N5 = 2.43, N6 = 1.35, N8 = 0.76, N10 = 0.49, N12 = 0.34. Inductive ceiling at 12 V falls at 1333 steps per second → derating factor ≈ 0.67; 24 V eliminates it.
- Tensioned vs circular tube path: the two geometries differ by only one to two percent in delivered volume. A simplified chord model suggests a 10 % reduction; including the roller wrap reduces the discrepancy to a few percent. Sealing maintained up to axial pre-strain ε ≈ 28 %, against the typical 2–5 % encountered during manual tube insertion.

**Flow-sensor episode**
- Driver validation setpoints span 10–1600 µL/min; agreement 0.21 %, 0.32 %, 2.64 %; the worst case is 0.3 µL/min absolute.
- 1 mL delivery: SD 1159 µL/min about mean 1104 µL/min; reverse flow on one sample in seven; roller-passage fundamental 6.7 Hz.
- Low-rate repeats of the same commanded delivery: 585 µL and 707 µL.
- Flow integral 600.1 µL, n = 5, CV 17.6 %. Balance 678.0 µL, n = 3, CV 4.5 %. Underestimate 11.5 %; scatter 4×.

**proto-01 numbers**
- Rotor printed 17.70 mm instead of 19.70 mm. Gap drawn 1.75 mm. Paper shim 0.78–1.10 mm.
- Delivered 678 µL on a commanded 1000 µL, n = 3 → 3.39 µL/stroke vs nominal 5.0 µL, CV 4.5 %.

**v2.1 numbers**
- Rotor across opposing bearings: 39.04 mm measured vs 39.40 mm nominal (0.18 mm radial error).
- Dovetail vertical offset +0.45 mm. Gap at ends 1.71–1.82 mm; gap at apex 2.22 mm; closure threshold 1.82 mm; corrected-head-only case 1.77 mm.

**v2.2 numbers**
- Peg sized to 5.0 mm bearing bore; nozzle 0.4 mm → 0.2 mm; taper ≈0.085 mm; roller tilt 0.6°.
- Housing drawn 1.52 mm printed at 1.75 mm = 0.23 mm wider.

**v2.3 numbers**
- Dovetail seat lowered 0.35 mm; measured mount face-to-shaft 26.05 mm vs 25.70 mm in CAD.
- Installed gap exactly 1.52 mm at apex and both ends.

**Gravimetric method**
- Standard: ISO 23783-2 (automated liquid handling systems), chosen over ISO 8655 (manual piston pipettes).
- Balance: max 220 g, d = 0.0001 g, 0.1 mg readability. Deionized laboratory water, open weigh boat, draft shield open.
- Ambient ≈20 °C, relative humidity ≈20 % (below the recommended 45–70 % envelope).
- Evaporation steady-state loss rate 0.118 mg/s, multiplied by each delivery's *calculated* dispensing duration (from step count and speed) and added back to the recorded mass. Dispensing times ranged 4 to 75 s.
- Documented deviations: barometric pressure assumed standard; pure-water density without air-buoyancy adjustment (effect below 0.3 %); thermal equilibration 30 min rather than the specified 2 h. Mandatory practices followed: tubing pre-wetted, priming dispenses discarded, fully randomized run order.

**Gravimetric campaign**
- Full factorial: stroke counts 1 (5 µL nominal), 100 (500 µL), 300 (1500 µL) × rotor speeds 60, 120, 180, 240 rpm. **76 replicates, zero acquisition failures.**
- 100 and 300 strokes accumulate roughly 450 µL and 1350 µL per weighing; ISO 23783-2 admits a 0.1 mg balance for cumulative deliveries of 200 µL and above.
- Replicate counts: n = 5 at 100 strokes, n = 10 at 300 strokes, n = 3 single-stroke (n = 9 at 120 rpm).
- Refill window at 180 rpm on a four-roller rotor ≈ 83 ms. Sweep extended to 240 rpm to look past the assumed operating speed.

**Results**
- 100- vs 300-stroke per-stroke volumes agree within 0.5 % at every speed → proportional, not offset (no fixed priming loss or hanging droplet).
- Per-stroke volume falls monotonically by about 2 % across the sweep: 4.61 µL at 60 rpm → 4.50 µL at 240 rpm, with no sharp knee.
- CV at 180 rpm: 0.25 % at 100 strokes, 0.34 % at 300 strokes. Benchmark: manual laboratory micropipette, ten 50 µL replicates on the same balance, CV 0.27 %.
- Single 5 µL dispenses: extrapolated upper bound ≈6 % CV, dominated by measurement artifacts — 0.118 mg/s evaporation on a 4.6 mg droplet, and 0.1 mg readability quantizing a 5 µL dispense into fewer than 50 discrete counts.
- Operating point 180 rpm: best repeatability, loses only 1.7 % in volume per stroke vs the slowest setting, and dispenses three times faster than 60 rpm.
- **Calibration constant 4.53 µL per stroke** (100- and 300-stroke averages agree within 0.02 %), sitting **9.4 % below the nominal 5.0 µL**.
- Firmware correction: a 450 µL delivery is commanded as 99 strokes rather than 90. Uncorrected, the same proportional error leaves 450 µL short by 42 µL — failing both halves of the requirement, whereas a single uncalibrated stroke satisfies both.

**Final module**
- Four-roller rotor, 19.70 mm pitch radius, on a NEMA 17 stepper shaft, 180° outer track, measured 1.52 mm occlusion gap, one MR105ZZ bearing per roller on the wide peg base, dovetail mount with screw clamp and radial inspection slots.
- Interfaces: fluidic (single continuous tube, no wetted valve/fitting/joint in the module; the one coupling is at the needle), electrical (four-wire bipolar stepper, step + direction), mechanical (rigid bracket to chassis).
- Integration: 450 mm of tubing from head to nozzle; both heads commanded at 1000 µL.
- Production recommendations: replace 3D-printed roller pegs with precision-ground stainless steel dowel pins; replace the manual screw clamp with a quick-release toggle.

## 6.4 Message-style headlines (pump)

1. "Accuracy was therefore not what ruled the syringe pump out" — the wetted plunger and barrel did.
2. Where the liquid meets the machine decides the architecture: peristalsis closes the wetted boundary on the tube alone.
3. Metering by geometry turns dosing into step counting and removes the recalibration schedule a field instrument cannot keep.
4. The roller does not pinch on a line: compensating for the flattened contact pushed the rotor from 15.6 mm to 19.70 mm, a 26 % increase, and without it every stroke would have fallen a fifth short.
5. Four rollers is the smallest rotor that never leaves the tube open — and the largest that still has torque margin at 12 V (FoS 2.03; six rollers stall).
6. Proto-01 proved the parts were the problem, not the motor: the shortfall repeated from dose to dose.
7. The flow sensor scattered more widely than the quantity it was measuring, so the balance became the reference for every volume in this thesis.
8. Three builds were spent on the printer, not on the physics: an eccentric dovetail, a tapered peg and a shrinking concave arc.
9. "CAD dimensions are theoretical assumptions that must be anchored to physical datums."
10. Qualified at 180 rpm, the module repeats an accumulated dose as well as a manual micropipette (0.25–0.34 % CV vs 0.27 %) and its 9.4 % shortfall is one number in firmware.
11. The calibration constant does not transfer between heads: two prints of the same file delivered 3.94 and 4.10 µL per stroke.

## 6.5 Figures, tables, equations (pump)

### Figures (path relative to `Pictures/`)
| Label | File | Caption gist | Type | Flag |
|---|---|---|---|---|
| `fig:pump-principles` | `fig-pump-principles` | Three metering principles — syringe (a), reciprocating/diaphragm with check valves (b), peristaltic (c); moving parts in red, heavy line = wetted boundary | Diagram (schematic) | ★ DECISIVE — carries the whole concept-selection argument in one image |
| `fig:pump-parts` | `fig-pump-parts` | The pump taken apart from its final version (v2.3): motor, motor holder, two-half rotor, bearing rollers on pegs, pump head with curved track | Annotated photo | ★ STRIKING — the orientation image for any pump slide |
| `fig:rotor-geometry` | `fig-rotor-geometry` | The solver's view of the chosen four-roller configuration; tube as heavy arc over the half turn, two rollers on it at any instant | Screenshot + annotated composite | ★ decisive for "metering by geometry" |
| `fig:occlusion-across` (sub a) | `tool-occlusion-crosssection` | Tube cross-section across the tube: open circle vs flattened stadium, lumen closing to a slit | Screenshot of the calculator | ★ paired with (b), the model's centrepiece |
| `fig:occlusion-along` (sub b) | `fig-roller-footprint` | Along the tube: the roller flattens a finite axial length L_c; lumen profile at three stations (circle, stadium, slit); drawn to scale for the 5 µL point | Diagram | ★ DECISIVE — this is the chapter's key insight |
| `fig:pump-head-gap` | `fig-pump-head-gap` | Assembled pump head CAD showing the occlusion gap and the three red radial inspection slots; housing embossed 1.52 mm | CAD render (annotated) | ★ STRIKING — explains how the gap is measured, not assumed |
| `fig:proto01-built` | `proto01-built` | Proto-01 with the head retracted; white rotor with four bearings, tubing on the upper track, tape holding the head down, breadboard electronics at left | Photo | ★ STRIKING — the tape tells the story |
| `fig:proto01-bench` | `proto01-bench` | Test setup: reservoir → pump head → inline thermal flow sensor → collection vessel | Photo | |
| `fig:flow-oscillation` | `fig-flow-oscillation` | Instantaneous flow during a commanded 1 mL delivery: (a) whole delivery with commanded and recorded mean, (b) 2 s with phase-averaged roller cycle, (c) lower sampling rate | Plot (3-panel) | ★ DECISIVE — justifies abandoning the flow sensor |
| `fig:v21-gap` | `fig-v21-gap-around-arc` | (a) cross-section of the +0.45 mm dovetail offset (×10 exaggerated); (b) gap at the three slots vs the 1.82 mm closure threshold, apex at 2.22 mm | Diagram + plot | ★ DECISIVE — the diagnosis slide |
| `fig:roller-peg` | `fig-roller-peg-taper` | (a) peg taper ≈0.085 mm, stacked bearings, 0.6° tilt; (b) single bearing on the wide base plus rotor guide rims; photos of both printed rotor halves below | Diagram + photo | ★ STRIKING — manufacturing-reality slide |
| `fig:pump-v23` | `pump-v23-render` | The qualified v2.3 assembly: motor holder carrying the 180° track, four-roller rotor, inspection slots | CAD render | |
| `fig:gravimetric-setup` | `gravimetric-setup` | Weighing a delivery; balance max 220 g, d = 0.0001 g; open weigh boat, tip held clear, draft shield open | Photo | |
| `fig:pump-accuracy` | `fig-pump-accuracy` | Per-stroke volume vs cumulative stroke count across speeds; ±1 SD bars; open markers for single strokes | Plot | ★ decisive for "proportional, not offset" |
| `fig:pump-precision` | `fig-pump-precision` | CV of delivered volume vs rotor speed at 100 and 300 strokes; dotted line = 0.27 % micropipette benchmark | Plot | ★ DECISIVE — the "as good as a pipette" slide |

(Appendix-K figures a defense may want to pull: `tool-occlusion-calculator`, `tool-rotor-params`, `tool-rotor-results`, `fig:app-tensioned-path`, `fig:app-perry-pump`.)

### Tables
- `tab:pump-two-heads` — *in-chapter* — Delivery of the two integrated pump heads before and after recalibration (gap, µL/stroke, error on 4.53, error on own constant, CV).
- `tab:app-pump-shortlist` — the seven concepts that passed screening.
- `tab:app-pump-comparison` — pump architecture comparison, scored in full (rotary 3485 vs linear 3185).
- `tab:app-pump-feasibility` — geometric feasibility across bore and roller count (pitch radius in mm).
- `tab:app-pump-fos` — factor of safety against roller count at 12 V and 24 V.
- `tab:app-pump-design-point` — the pump design point (all nominal constants).
- `tab:app-occlusion-symbols`, `tab:app-occlusion-constants`, `tab:app-feasibility-conditions`, `tab:app-path-comparison` — supporting.
- `tab:global-requirements` — the ±10 % / 10 µL accuracy requirement (referenced, lives in ch. 5).

### Central equations (plain text)
1. **Stadium flat width** (`eq:app-flat-width`): `L_w = (π/2)·(d − h)` — the inner perimeter is conserved, so the flat contact width follows from the residual wall separation h.
2. **Residual lumen area** (`eq:app-stadium-area`): `A(h) = L_w·h + π·h²/4 = (π/2)·d·h − (π/4)·h²` — equals πd²/4 at h = d and 0 at h = 0. *This replaces the industry's "occlusion percentage", which is only a local indicator and cannot be converted into microlitres.*
3. **Printed gap** (`eq:app-gap`): `G = 2w − δ` — closure when the inner walls touch at a gap of 2w; δ is the deliberate radial interference, conventionally 10–20 % of 2w.
4. **Flattened contact length** (`eq:app-contact-length`): `L_c = k · 2·√(2·R_r·δ)`, with `k ≥ 1` the empirical tube-compliance inflation factor (k = 1.15).
5. **Arc compensation** (`eq:app-arc-compensation`): `ΔArc = V_roller / A = L_c`, `ΔArc_total = N_c · L_c` — *the bore area cancels: the extra arc per engaged roller equals its contact length, independent of tube bore.* Described in the source as "the most valuable result of the occlusion model."
6. **Rotor sizing** (`eq:app-rotor-radius`): `arc = V/A + N_c·L_c`, `R = N·arc / (2π)`, with `N_c = floor(N/2)` across a 180° track; R rounded to the nearest 0.1 mm.
7. **Feasibility conditions**: roller collision `arc − 2·R_r > 0`; hub clearance `(R − R_r) − r_boss > 0`; tube length `π·R ≤ 300 mm`.
8. **Inductive ceiling** (`eq:app-inductive-ceiling`): `f_max = V_supply / (2·L·I_rated)`; torque derated by `min(1, f_max/f_step)`; FoS = available rim torque ÷ worst-case tube compression load (200 g per roller).
9. **Taut tube packet** (`eq:app-taut-packet`): `L_packet = 2·R_cc·sin(α/2) + ρ·α`, `R_cc = R − R_r`, `ρ = R_r + OD/2`, `α = 2π/N`.
10. **Pre-strain scaling** (`eq:app-taut-strain`): `A_ε = πd²/(4λ)`, `w_ε = w/√λ`, `δ_ε = 2·w_ε − G`, with `λ = 1 + ε`.

## 6.6 Quotable sentences (verbatim, pump)

- "The pump is the module that determines how much liquid the instrument delivers."
- "Some entries were deliberately implausible---a piano hammer shaking droplets from a vibrating string, a tattoo machine piercing a membrane so that drops form underneath---on the principle that an ideation returning only workable ideas has not searched far enough."
- "Accuracy was therefore not what ruled the syringe pump out."
- "Sizing the rotor without accounting for this flattened contact zone would have resulted in an undersized pump that consistently under-delivered by roughly one fifth on every stroke."
- "the instantaneous signal scattered more widely than the quantity being measured"
- "From this build on, gravimetry was the reference for every delivered volume in this thesis, and flow traces were kept only for what a balance cannot show: the time course of a delivery, such as priming, ripple and backflow."
- "This iterative progression reinforced a central practical lesson: CAD dimensions are theoretical assumptions that must be anchored to physical datums."
- "In summary, the module repeats an accumulated dose as consistently as a manual pipette, and its $9.4\,\%$ accuracy shortfall is a fixed geometric constant absorbed entirely by the commanded stroke count."
- "delivered volume is set by geometry rather than active mechanical adjustment, but that geometry belongs uniquely to each print."
- "Short-term run-to-run precision ($\text{CV} \approx 0.2$ to $0.4\,\%$) should therefore not be assumed to guarantee identical day-to-day baseline calibration."

## 6.7 Open gaps and limitations the pump chapter admits

- The concept screen judged principles, not hardware: "an argument about what each mechanism can do rather than evidence about what any particular device did."
- The syringe benchmark used large plastic disposable syringes by design; a glass syringe sized to the volume "would perform far better at the low end."
- Source-data inconsistency flagged in a comment: 24 conditions / 204 replicates (old §3.4) vs 13 conditions / 108 dispenses (§6.1.2 and Appendix J) for the same pump.
- The analytical model is quasistatic — it neglects downstream fluidic resistance and assumes rapid elastic recovery behind each roller.
- The model assumes complete bore closure; if the printed gap is too wide the tube does not merely under-deliver, it fails to seal and backflows under hydrostatic pressure.
- Tube-path assumption: circular track vs taut chord differ by 1–2 % in delivered volume; the tubing was tested unanchored.
- k = 1.15 is provisional and is the only empirical term; the 9.4 % shortfall "reflects empirical tube compliance factors (k) that can be refined."
- Single-stroke repeatability is reported only as a conservative upper bound (≈6 % CV) because evaporation and balance readability cannot be decoupled from the pump's own output.
- Testing used deionized water at ambient laboratory conditions; real reagents (lysis buffers with chaotropic salts, ethanol, wash solutions) differ in viscosity, surface tension and volatility.
- Long-term tubing fatigue drift and reagent compatibility remain uncharacterized.
- Gap figures on the integrated heads are approximate — caliper access through the inspection slots is awkward.
- Day-to-day calibration drift observed (+1.3 % and −5.0 % across two sessions separated by re-priming and a power-supply swap).
- The ~10 % integrated-vs-bench drop is not fully explained; only the occlusion-gap mechanism is isolated by the data.
- Print-to-print arc variation sits inside the ±0.10 mm the printer calibration can promise and close to caliper resolution.

## 6.8 Likely committee questions (pump)

1. *"Your pump is 9.4 % off target — why is that acceptable?"* → Because it is proportional, not offset (100- and 300-stroke per-stroke volumes agree within 0.5 %), so it is a fixed geometric constant absorbed by the commanded stroke count; a 450 µL delivery is commanded as 99 strokes rather than 90. §6.4.3 *Results*.
2. *"Why abandon the flow sensor and closed-loop control — isn't feedback better?"* → The sensor could not delimit a discrete delivery: SD 1159 µL/min about a mean of 1104 µL/min, integral 11.5 % low with four times the scatter of a balance; feedback would also have added electronics, power and parts on a portable device. §6.3.1 *Measuring a discrete delivery*.
3. *"Why peristaltic and not a syringe pump, which is the laboratory standard?"* → Cleanability and fluid isolation: the plunger and barrel are wetted by each reagent and the instrument has no laboratory wash facility; accuracy was not the deciding factor. §6.1.2 *The displacement concepts*.
4. *"Why four rollers?"* → Four is the smallest count that keeps two rollers engaged across a 180° track (no backflow window), and the largest with adequate torque margin at 12 V (FoS 2.03; six rollers stall at 0.90); pulsation suppression, the usual reason for six to eight, is irrelevant for discrete delivery. §6.2.2 *The rotor geometry*.
5. *"Four prototypes just to seal a tube — what did you actually learn?"* → That the failures were manufacturing, not physics: a +0.45 mm dovetail offset, a 0.085 mm peg taper, and slicer rules that shrink concave internal arcs; the fix was measuring assembled parts against the motor-shaft datum. §6.3.4 *The fourth build*.
6. *"Why does the occlusion model matter — couldn't you have iterated empirically?"* → Because the contact correction changed the rotor by 26 % (15.6 → 19.70 mm); the model supplied the CAD dimensions directly, avoiding the reprint-and-correct loop, and the arc compensation turns out to equal the contact length independently of bore. §6.2.3 *Modeling the occlusion*.
7. *"Two heads from the same files gave different volumes — doesn't that break geometric metering?"* → No: it confirms it. Volume is set by geometry, but the geometry belongs uniquely to each print, so each head stores its own firmware constant — more reliable than re-tuning printed geometry toward an exact 5 µL. §6.5 *The module in the machine*.
8. *"Why ISO 23783-2 rather than ISO 8655?"* → 23783-2 specifies volumetric testing for automated liquid-handling systems; 8655 governs manual piston pipettes. It also explicitly supports accumulating deliveries, which is what makes a 0.1 mg balance legitimate for a 5 µL stroke. §6.4.1 *Weighing a delivery*.
9. *"How did you handle evaporation at 20 % relative humidity?"* → A measured 0.118 mg/s loss rate multiplied by each delivery's *calculated* duration (step count × speed, not wall-clock) and added back; dispensing times ranged 4–75 s, so a static blank would have been far less accurate. §6.4.1.
10. *"Why randomize the run order?"* → Tubing fatigue and ambient drift over a multi-hour campaign would otherwise be confounded with the operating factors; randomization converts systematic bias into random variance. §6.4.1.

## 6.9 Website tools referenced (pump)

- **Rotor Geometry Solver** — `\livetool` panel at line 371, `tool:rotor-solver`, address `sirsirio.github.io/thesis-tools/tools/rotor-solver/`, placed in §6.2.2 *The rotor geometry*. Blurb: "Set a stroke volume, a bore and a bearing, and every roller count is screened at once --- feasibility, rotor size and torque margin."
- **Peristaltic Occlusion & Displaced-Volume Model** — `\livetool` panel at line 447, `tool:occlusion-model`, address `sirsirio.github.io/thesis-tools/tools/peristaltic-roller-displaced-volume-model/`, placed in §6.2.3 *Modeling the occlusion*. Blurb: "Close the tube and watch the residual area fall, the contact length grow, and the compensating arc follow from them."
- **Tensioned Tube Path Model** — referred to via §`sec:app-tensioned-path`; listed as the third calculator in Appendix K §*The calculators*, alongside the other two, at `https://sirsirio.github.io/thesis-tools/`.
- §6.2.2 states both tools "were not written up after the fact… both were built as working instruments while the decisions were still open" and supplied the parametric CAD inputs (pitch radius, tube arc, printed gap).
- Appendix K figures are screenshots of the live tools: `tool-occlusion-crosssection`, `tool-occlusion-calculator`, `tool-rotor-params`, `tool-rotor-results`.

---
---

# CHAPTER 7 — ALIGNMENT MODULE (`\label{chap:alignment-module}`)

## 7.1 Narrative of the chapter

If the pump decides how much, the alignment module decides where it lands — and because it is the largest mechanical assembly, it also defines the instrument's footprint and serves as its structural chassis. The first decision was kinematic and was taken on reasoning rather than scoring: move the samples under fixed nozzles, not the nozzles over the samples, because static supply tubing does not flex and fatigue, because rack position shows run progress at a glance, and because stationary nozzles stay accessible for priming and tube replacement. Roughly fifty concepts across six families were gathered jointly with Marius, screened pass/fail against the mandatory requirements down to ten, of which four carry a rack past a fixed nozzle; six sketch sheets then re-diverged on paper over track layout, drive transmission and push orientation. Every subsequent decision was taken against one principle — cleanability first, feasibility second, fewer parts, seams and crevices always — which is what rejected grippers (push, never push-pull), ball carriages and bushings (a bare printed channel wipes clean), an underslung drive (overhead keeps the transmission clear of spills) and commercial enclosed lead screws (an open printed rack and pinion can be taken apart and washed). The rack itself is the hidden governing decision: eight tubes because molecular biology is standardized in multiples of eight, and a 22 mm pitch that is far wider than the tubes need — the extra clearance is the operating envelope for Pulkit's parallel cap-opener prototype, measured physically. That pitch then propagates through everything: nozzle spacing, indexing step, and the 174 mm rack length that makes the transport axis as long as it is. Three builds settled the drive: v1 proved a printed involute rack and pinion indexes repeatably, v2 moved the drive above the sample plane so gravity itself protects it, and v2.1 gave the stage an absolute home it can find by itself via a normally-closed microswitch and a three-pass homing sequence. Bench characterization passed everything except one number — 102.0 half-steps/mm exactly as calculated, ≤0.03 mm homing repeatability, zero step loss over 132 mm round trips, homing cut fivefold from 110 s to 22 s, only 1.6 % step stretch under shared-I²C stress — but the rail delivered ~140 mm of usable stroke against the 154 mm eight positions require. That geometric shortfall became the brief for v3, which added a second transverse axis, an input queue, an output tray and a passive fishbone cam that ejects a finished rack using nothing but the existing axis-1 travel, expanding the module into a 500 mm chassis that runs 40 tubes unattended. The chapter is honest about the module's one known failure mode, observed on the assembled instrument: a lid pushed fully flat rubs the chamfered lane wall, loading the rack with a friction the open-loop drive cannot sense, so the motor completes its steps, the rack lags, and the dose lands beside the tube instead of in it.

## 7.2 Prototype / version sequence

**Concept stage — two-stage funnel**
- Stage 1 (joint with Marius): roughly fifty concepts across six families — robotic arms, rotating carousels, gravity chutes, linear tracks, plus magnetic and pneumatic droplet steering. Qualitative pass/fail against mandatory requirements; ten survived, each worked up with a sketch and an account of operation; four of the ten carry a sample rack past a fixed nozzle.
- Stage 2 (individual): six sequential engineering sketch sheets, a fresh divergent exploration generating track-layout, drive-transmission and push-orientation variations not in the initial field.
- Carousel vs linear: linear selected on feasibility and cleanability — accepting and releasing racks from a rotating carrier adds mechanism a straight track does not need. Trade-off accepted: the stage spans roughly 50 cm.
- Lead screw rejected on engineering grounds, not just cleanability: heavier, slower, and its sub-micrometre resolution is wasted on an axis that indexes in 22 mm steps.
- Side vs overhead drive tied on direction alone and separated only once each was scored with a drive mechanism, where overhead led.

**v1 — side-push transmission testbed**
- What changed: first physical build. Motor at rail level on a printed bracket, pinion driving a green spur rack alongside the carriage; eight-position sample deck.
- Why side-push: purely because it was the simplest and fastest layout to fabricate and assemble on a bench — not because the orientation question was settled.
- Result: consistent step accuracy across repeated 22 mm index strokes.
- Verdict: **validated transmission precision** — a 3D-printed spur rack and pinion can index repeatably; validated on simplicity, low mass and manufacturing feasibility.

**v2 — overhead drive, gravity-protected isolation**
- What changed: drive train relocated above the sample deck; motor on an elevated bracket engaging a spur rack along the upper edge of the carriage; sample rack travels on the lower guide rail.
- Why: gravity-assisted fluid protection — liquids drain downward, so elevating motor, wiring and gear teeth above the sample plane isolates them geometrically, with no dynamic seal or cover.
- Result: works without any seal. Thermal bowing in the long guide rails mitigated through build-plate orientation, adjusted sliding clearances and localized thermal post-processing.
- Verdict: **established gravity-protected isolation.** Production machines would still get enclosures — sliding mechanical covers using a labyrinth path rather than a rubber seal, so that nothing wearing is added that must itself be cleaned.

**v2.1 — overhead drive with a homing reference (the bench-characterized build)**
- What changed: a microswitch at the left end of the rail, wired normally-closed in a fail-safe loop, plus a three-pass homing state machine — fast approach until the switch trips, a short back-off, and a slow debounced re-approach. Position is zeroed on the third pass only, because on the fast pass the carriage coasts past the switch before the reading is taken.
- Why: open-loop steppers hold only relative counts from power-up; without an absolute home the operator would register the carriage manually before every run, and unrecorded step loss would corrupt every subsequent dispense position. A severed lead or loose connector interrupts the NC circuit and halts motion rather than driving into a hard stop.
- Results (bench characterization, `tab:alignment-bench-results`): step resolution 102.0 half-steps/mm, matching the calculated value (9.8 µm per half-step); homing repeatability ≤0.03 mm (measured spread of 2 half-steps); return-to-zero error +0.03 to +0.13 mm across 132 mm round trips with zero step loss; homing duration cut from 110 s to 22 s via burst stepping and a 400 kHz I²C clock; shared-I²C stress with simultaneous sensor streaming cost +1.6 % step interval with zero packet loss or stalls; fail-safe disconnect halted in 3.2 s within 3.9 mm of the switch unplug; usable linear stroke 140 mm = 6 index moves.
- Verdict: **every functional criterion satisfied except total stroke length.** 154 mm is required (seven 22 mm index steps for eight positions); the rail gave ~140 mm. Because the limitation is strictly geometric rather than electro-mechanical, the drive mechanics, firmware state machine and resolution were fully validated. Lengthening the rail became the starting point for v3.

**v3 — the two-axis chassis (the final module)**
- What changed: a second transverse axis plus input and output queuing trays flanking the dispensing lane; the module becomes a ~500 mm platform and the instrument's structural chassis.
  - Axis 1: longitudinal indexing, drives a rack left to right in 22 mm increments until every tube has passed beneath the reagent nozzle window.
  - Axis 2: transverse, advances waiting racks through the input tray and transfers the leading rack into the dispensing lane at the start of each cycle.
  - Completed racks eject diagonally into the output tray at the far end of the stroke — a continuous U-shaped workflow path.
  - Both axes use identical drives (28BYJ-48, 16-tooth spur pinion, printed involute rack) and identical NC microswitches with the same three-pass homing.
  - Motorless ejection: a passive **fishbone cam track** — two angled ribs on the rack underside, two angled grooves recessed into the rail floor at the ejection station; a final 22 mm forward stroke of axis 1 converts longitudinal travel into diagonal displacement into the output tray, which sits 1 mm below the main lane.
  - Central walled volume becomes the electronics bay (open-topped, removable front panel, cable routing ducts, a ridge whose groove locates the display holder).
  - Chassis modeled as one CAD body and split into three sections (not two) so that changing one guide groove or wall requires reprinting only one-third; parting planes fall on the outer walls of the electronics bay, across a plain baseline section with no grooves, windows or sills. Interlocking dovetail keys, M3 screws from rear and bottom, flat reinforcement plates bridging each seam (one front, two rear).
- Result: active stroke 309 mm within a ~500 mm lane, full eight-position indexing plus ejection. Standard batch = five sample racks, 40 tubes (four queued, one pre-loaded on the rail). Both axes demonstrated reliable queue feeding, precision indexing and automated ejection across repeated full batch sequences.
- Second v3 iteration (only two full-scale builds were possible; each chassis section is ~8 h of print time): the axis-2 queue pusher's long dual-span arms showed minor torsional flex under the load of four full racks, absorbing drive displacement. Fixed by enlarging the chamfer where the toothed arm meets the cross bar — small in the first build, considerably deeper in the second — bracing the corner the load turns through.
- Verdict: resolves the v2.1 travel limit and delivers unattended 40-tube batch processing while becoming the instrument's structural foundation. One known failure mode remains (flat lid fouling, below).

## 7.3 Key facts and numbers (exact)

**Concept stage**
- Roughly fifty concepts, six families; ten survived screening; four of the ten carry a rack past a fixed nozzle; six sketch sheets in stage 2.
- Stage span: roughly 50 cm at concept stage; ~500 mm final.

**Sample rack**
- Eight positions, standard 1.5 mL or 2.0 mL microcentrifuge tubes, monolithic 3D print.
- **22 mm centre-to-centre pitch** — set by the measured operating envelope of Pulkit's working cap-opener prototype, not by tube diameter.
- Rack length 174 mm before pusher travel and queue clearance.
- Rationale for eight: 96-well microplates are 8 × 12; thermal cycler strips and multichannel pipettes work in eight-channel increments; magnetic bead separation racks share the geometry. The downstream PANPOC instrument is specified to analyze 16 samples at once — exactly two carriers.
- Passive kinematic constraint: a vertical bore sized to manufacturer dimensions plus a conical centering seat at the base cradling the tapered tube tip; no claws, springs or latches. Positions numbered 1–8 along the front chamfer. Generous fillets on external corners for wipe-down.
- Longitudinal guide rails on the underside added in the final iteration for motorless ejection.

**Drive and transmission**
- Four gear geometries evaluated: spur, helical, worm, herringbone. Straight-cut **spur rack and pinion** selected — helical/herringbone noise reduction and worm anti-backdriving are unnecessary on an intermittent low-speed indexing axis, and the motor's internal gearbox already prevents back-driving when unpowered.
- Modeled in Autodesk Fusion 360 with the dedicated spur-gear tool (true involute profiles, avoiding binding from straight-flank approximations at small scale).
- **Gear module 0.8 mm; 16 teeth; pinion pitch diameter 12.80 mm.**
- Motor: **28BYJ-48 unipolar geared stepper, 12 V variant**, internal ≈64:1 reduction gearbox, ample holding torque while unpowered.
- Driver: **ULN2003** Darlington transistor array, half-stepping, step sequences issued through an **I²C port expander** to conserve microcontroller GPIO for the pump channels. No active current chopping, so half-step is the finest increment available.
- **Resolution: 102 half-steps per millimetre ≈ 9.8 µm per half-step** — three orders of magnitude finer than the 22 mm tube pitch, so no rotary encoders and no microstepping.
- Derivation: 4096 half-steps per output revolution ÷ (π × 12.80 mm ≈ 40.21 mm) = 101.86 ≈ 102.0 half-steps/mm.
- Empirical verification: commanding 13 464 half-steps displaced the carriage by exactly 132.0 mm.

**Bench characterization (v2.1) — `tab:alignment-bench-results`**
| Parameter | Result | Remark |
|---|---|---|
| Step resolution | 102.0 half-steps/mm | matches calculated (9.8 µm/half-step) |
| Homing repeatability | ≤0.03 mm | measured spread of 2 half-steps |
| Return-to-zero error | +0.03 to +0.13 mm | across 132 mm round trips; zero step loss |
| Homing routine duration | 110 s → 22 s | burst stepping + 400 kHz I²C clock |
| Shared I²C bus stress | step interval +1.6 % | simultaneous sensor streaming; zero packet loss or stalls |
| Fail-safe disconnect | stop in 3.2 s | carriage halted within 3.9 mm of switch unplug |
| Usable linear stroke | 140 mm (6 index moves) | short of the 154 mm required for 8 positions |

**v3 geometry and capacity**
- Dispensing lane ≈500 mm; active stroke 309 mm.
- Standard batch: five racks / 40 tubes — four in the input queue, one pre-loaded on the rail. Operator configures number of active racks and tubes per rack on the touchscreen.
- Output tray sits 1 mm below the main lane. Ejection stroke: one final 22 mm forward move of axis 1.
- Chassis split into three printed sections; ~8 hours print time per section; only two full-scale build iterations carried out; M3 machine screws; three reinforcement plates (one front, two rear); dual recessed carrying handles.
- Slot markings: slot 1 on the rack lane, slots 2–5 back along the input queue. Markings drawn in pencil on the prototype (they lift with the same wipe that cleans the deck; engraved lettering would be a particulate trap). Production would use printed or painted graphics.
- Motor mounts fabricated as independent standalone brackets so axial position can be calibrated against the assembled rack in situ; microswitch seats molded as flat locating pads without pilot holes, drilled in situ at final calibration.
- Both drive pushers printed in two parts and joined at dovetail interfaces by localized thermal welding.

**Lid fouling failure mode**
- Standing lid: folded back to about 135°, clears the wall (photographed in position 2).
- Flat lid: pushed to 180°, projects sideways and reaches the lane wall, which is chamfered at 45° on the built chassis, where it rubs as the rack moves (photographed in position 3).
- Consequence: friction the drive cannot sense → motor completes its commanded steps, rack lags, firmware believes it reached a position it did not, and the dose lands beside the tube.
- Current mitigation: operating instruction to leave each lid standing rather than flat. Planned remedies: reshape the wall profile, and a firmware check comparing the step count on the return home against the commanded outward travel.

**Behavioural vs metric criterion**
- Behavioural requirement: all dispensed liquids must land reliably within the target tube mouth. On the bench, positioning repeatability (≤0.03 mm) stands in for it, being a small fraction of the tube opening — but that figure bounds the drive, not the rack, because the axis runs open-loop with no position feedback.

**Integration interfaces**
- A row of downward-opening dovetail sockets along the rear exterior wall accepts the multichannel pump module and reagent storage module, sliding in from above and locking without external fasteners.
- The stationary nozzle array mounts to a reinforced boss on the rear wall above the electronics bay.

**Verification debt (Appendix L)**
- Travel-budget fault trip verified by code review rather than physical execution, because running it would have stalled the motor against a hard stop for over 60 s.
- Supply rail and coil resistance not metered (no benchtop multimeter that session); 12 V operation validated through continuous kinematic performance and thermal stability.

## 7.4 Message-style headlines (alignment)

1. Move the samples, not the nozzles: static tubing does not flex, fatigue or block, and the rack's position is the progress bar.
2. Cleanability first, feasibility second — that single principle rejected grippers, ball carriages, an underslung drive and the lead screw.
3. The 22 mm tube pitch is not about tubes: it is the operating envelope of a cap opener, measured off a working prototype, and it sets the length of the whole instrument.
4. Eight tubes because biology counts in eights — 96-well plates, eight-channel pipettes, and a 16-sample PANPOC run that divides into exactly two racks.
5. v1 proved a printed involute rack and pinion indexes repeatably; that is why the rest of the architecture could stay printed.
6. Putting the drive above the samples protects it with gravity instead of a seal — and a seal is a wearing part that must itself be cleaned.
7. An open-loop stage needs an absolute home: a normally-closed switch and a three-pass approach make the zero land in the same place every time.
8. Every bench criterion passed except one, and it was geometric, not electro-mechanical: 140 mm of rail against the 154 mm eight positions demand.
9. A final 22 mm stroke ejects the rack — the fishbone cam adds no motor, no spring and no pivot.
10. The module's one known failure mode is a lid: pushed flat, it rubs the lane wall, the drive cannot feel it, and the dose lands beside the tube.

## 7.5 Figures, tables, equations (alignment)

### Figures (path relative to `Pictures/`)
| Label | File | Caption gist | Type | Flag |
|---|---|---|---|---|
| `fig:alignment-rack` | `alignment-rack-final` | The eight-position rack as built; 22 mm pitch bores for 1.5/2.0 mL tubes, positions numbered 1–8, underside guide rails for ejection | Photo / render of built part | ★ STRIKING — the consumable that sets the whole geometry |
| `fig:alignment-rack-seat` | `alignment-rack-seat-detail` | Cross-section through three sample positions showing the conical centering seat | CAD cross-section (wrapfigure) | |
| `fig:alignment-v1` | `alignment-v1-stage` | Prototype v1 side-push: motor at rail level, green spur rack alongside the carriage, eight-position deck with three tubes | Photo | ★ decisive for the iteration story |
| `fig:alignment-v21` | `alignment-v21-homing` | Prototype v2.1 overhead drive: elevated motor bracket driving the upper rack, carriage on the smooth lower rail, microswitch far left | Photo | ★ DECISIVE — the "drive above the sample plane" argument in one image |
| `fig:alignment-v3-layout` | `alignment-v3-top-annotated` + `alignment-v3-iso` | v3 in plan and isometric: input queue, axis-2 feed, axis-1 indexing, fishbone transfer to output tray, central electronics bay | CAD render, annotated (two stacked) | ★ DECISIVE — the whole-module slide |
| `fig:alignment-pushers` | `alignment-pusher-axis-2`, `alignment-pusher-axis-1` | The two drive pushers; shared rack profile, different arms; blue highlights on split dovetail joints that were thermally welded | CAD render pair | |
| `fig:alignment-lid-fouling` | `alignment-lid-fouling` | A standing lid (position 2, ~135°) vs a flat lid (position 3, 180°) reaching the chamfered lane wall | Photo | ★ STRIKING — the honest-failure slide |
| `fig:alignment-rack-ribs` | `alignment-rack-ribs` | The two angled ejection ribs on the rack underside, of differing width so the trailing rib bridges the leading groove | CAD render / photo | ★ decisive for the motorless ejector |
| `fig:alignment-v3-bottom` | `alignment-v3-bottom-annotated` | Underside of the v3 chassis: wiring channels into the electronics bay, dovetail sockets for pump and storage, pockets for joining plates | CAD render, annotated | |
| `fig:alignment-motor-holder` | `alignment-motor-holder-front`, `alignment-motor-holder-back` | Standalone stepper bracket, front face and rear reinforcing ribs | CAD render pair | |
| `fig:alignment-v3-left-end` | `alignment-v3-left-end-detail` | Left chassis end: axis-2 motor bracket, homing microswitch in its pocket, molded carrying handle, switch leads in the underside channel | CAD render / photo | |
| `fig:alignment-markings` | `alignment-v3-markings` | Zone markings from above: rack lane slot 1, slots 2–5 across the input queue with its arrow, output tray with its own arrow; all in pencil | Photo | ★ STRIKING — shows the assembled machine with pumps, nozzle, display and electronics on it |

(Appendix-L figures referenced from the chapter: `fig:app-alignment-sheet-5` (lead screw vs rack-and-pinion reasoning), `fig:app-alignment-sheet-6` (v1 transmission validation).)

### Tables
- `tab:alignment-bench-results` — *in-chapter* — summary of v2.1 bench characterization (seven parameters, results, remarks).
- `tab:app-alignment-shortlist` — the ten concepts that passed screening.
- `tab:app-alignment-bench` — the full bench test protocol with open verification items.

### Central equation
- **Step resolution** (`eq:alignment-resolution-derivation`): `Step Resolution = 4096 half-steps ÷ (π × 12.80 mm) = 101.86 ≈ 102.0 half-steps per millimetre`, i.e. ≈9.8 µm of linear travel per half-step. Verified empirically: 13 464 half-steps → exactly 132.0 mm.
- Implicit stroke arithmetic worth stating on a slide: 8 positions → 7 index steps × 22 mm = **154 mm required**; v2.1 delivered **~140 mm** (6 moves); v3 provides **309 mm** of active stroke in a ~500 mm lane.

## 7.6 Quotable sentences (verbatim, alignment)

- "While the pump module determines the volume of liquid delivered, the alignment module determines where that volume lands."
- "Every decision that followed was taken against one principle: cleanability first, feasibility second, and the fewer the parts, seams, and crevices, the better."
- "Pulling a rack back requires clamping it, and grippers are difficult to clean. A push contacts the rack without grasping it."
- "The physical footprint accepted during concept selection is therefore driven by the consumable payload rather than by the drive transmission."
- "Position is zeroed on that third pass only: on the fast pass the carriage coasts past the switch before the reading is taken, and on the slow one it barely moves between readings, so approaching slowly is what makes the zero land in the same place every time."
- "the motor completes its commanded steps, the rack lags behind them, and the stage holds a position the firmware believes it has reached."
- "Dispensing into a rack that has fallen short puts the dose beside the tube rather than in it."
- "Lettering cut into the deck is a crevice, and a marking laid on top identifies the same zone without introducing one."
- "pencil lifts with the same wipe that cleans the deck"

## 7.7 Open gaps and limitations the alignment chapter admits

- The ≤0.03 mm repeatability "bounds the drive, not the rack": the axis runs open-loop with no position feedback, so an external friction source leaves the step count intact while the rack falls short.
- The flat-lid fouling failure mode has been observed on the assembled instrument and is "the module's one known failure mode"; the only present mitigation is an operating instruction.
- The vertical envelope was drawn around a cap left standing and "does not cover every way an operator can leave one."
- v2.1's usable stroke (140 mm) never met the 154 mm requirement on that build; it was resolved only at v3.
- Only two full-scale v3 build iterations were possible because each chassis section takes ~8 hours to print.
- A source comment records outstanding verification: the full five-rack, 40-tube unattended run "is planned and expected to pass, but has not been run as of this date" (2026-09-11); the dye run of 2026-09-10 carried two racks. Marked "Confirm before hand-in --- OI-15." **This is the most defense-sensitive item in the chapter — the takeaway box claims 40-tube batch processing.**
- Verification debt in Appendix L: the travel-budget fault trip was verified by code review rather than hardware; supply-rail voltage under load and phase coil resistances were never metered.
- Production enclosure for the motors is anticipated but not built (sliding labyrinth covers outlined only).
- Pencil markings are a prototype expedient; production would need printed or painted graphics.
- Axis-2 pusher torsional flex was reduced by a deeper chamfer but is described only qualitatively.
- A source comment notes a missing self-reference to the integration chapter for mechanical docking.

## 7.8 Likely committee questions (alignment)

1. *"Why move the samples instead of the nozzles?"* → Fluid path integrity (static tubing does not flex, fatigue or block), visual status indication, and accessible maintenance; resolved early on functional reasoning rather than formal scoring. §7.1.1 *The field and the screen*.
2. *"A 500 mm instrument is not exactly portable — justify the footprint."* → The length is set by the 22 mm tube pitch, not by the architecture; feasibility and cleanability outrank compact footprint in the evaluation criteria, and 50 cm remains portable enough for a field workbench or a vehicle tailgate. §7.1.2 *Narrowing to a mechanism*.
3. *"Why 22 mm pitch when the tubes are much narrower?"* → The clearance is the measured operating envelope of Pulkit's working cap-opener prototype, so that gripping fingers can open a lid without colliding with adjacent samples. §7.2 *The sample rack*.
4. *"Why a printed rack and pinion instead of a lead screw?"* → Cleanability (an open transmission can be taken apart and washed), plus engineering grounds: heavier, slower, and sub-micrometre resolution wasted on an axis that indexes in 22 mm steps. §7.1.2 and §7.3.1.
5. *"Open-loop with no encoder — how do you know the rack arrived?"* → You do not, and the chapter says so: repeatability of ≤0.03 mm bounds the drive, not the rack; external friction produces exactly the observed lid-fouling failure. Proposed fix is a firmware comparison of return-home step count against commanded outward travel. §7.3.3 *Bench characterization* and §7.4.1.
6. *"Why is a 0.03 mm positioning figure meaningful for landing a droplet in a tube?"* → It is a metric stand-in for a behavioural requirement (liquid lands within the target tube mouth), chosen because it is a small fraction of the tube opening. §7.3.3.
7. *"How is the rack ejected without a second actuator?"* → A passive fishbone cam: two angled ribs on the rack underside run into two angled grooves in the rail floor, so a final 22 mm axis-1 stroke converts longitudinal travel into diagonal displacement into a tray 1 mm lower. No actuators, no stored elastic energy, no pivots. §7.4.2 *Motorless rack ejection mechanism*.
8. *"Why not spring-loaded ejection?"* → Spring kickers release energy at uncontrolled velocities, creating liquid agitation and aerosolization risks above open sample tubes. §7.4.2.
9. *"Have you actually run a full 40-tube unattended batch?"* → The chapter states both axes demonstrated reliable queue feeding, indexing and ejection across repeated full batch sequences; the source comment flags the complete five-rack run as planned and expected to pass but not yet executed as of 2026-09-11 (dye run of 2026-09-10 carried two racks). §7.4.1 + takeaway. **Prepare for this one.**
10. *"Why split the chassis into three parts rather than two?"* → To localize design changes: modifying one guide groove or wall requires reprinting only one-third, and the parting planes fall on a plain baseline section with no functional features. §7.4.3.

## 7.9 Website tools referenced (alignment)

**None.** Chapter 7 contains no `\livetool` panel and no `sirsirio.github.io` reference. (For slide purposes, the site does host an alignment-module record and a V3 two-axis-chassis page, but the thesis chapter itself does not cite them.) The relevant thesis-tools pointer nearest this material is the *Dispense Choreography & Throughput Simulator*, cited in Chapter 10 (`tool:throughput-simulator`, `sirsirio.github.io/thesis-tools/tools/dispense-throughput-simulator/`), which models the 6-nozzle indexing line and the 32-sample rack scheduling — worth mentioning if a committee member asks about batch throughput.

---
---

# CHAPTER 8 — NOZZLE MODULE (`\label{chap:nozzle-module}`)

## 8.1 Narrative of the chapter

The nozzle module holds six blunt needles in a fixed line above the transport rail, one fluid path per reagent, and its job is geometric rather than volumetric: every droplet must land within a 5 mm target radius from under 5 cm, with only gravity, inertia and surface tension acting between the tip and the meniscus. It arrived as a hand-over from Marius, and it arrived broken — the vibration motor's imbalance was too weak to shed a pendant droplet, and the assembly had no mounting interfaces to the chassis at all. It could not even be edited: Marius worked in OpenSCAD, which exports only polygonal meshes, so opening the files in Fusion 360 yielded an unmodifiable solid body and the module had to be remodelled from scratch off caliper measurements. The vibration-detachment principle was kept deliberately — with the timeline available, making a working principle functional and integrable beat exploring an unproven one — and two alternatives were evaluated and rejected on physics: a cantilever vibrating strip deflects through an arc, giving the tip a lateral velocity component that would violate the 5 mm landing radius, and a bare cannula pushed straight into the PVC line removes every fitting but is a fragile slippery cylinder needing tools to clamp. The rebuild's best idea was to stop clamping the steel and start indexing the plastic: the inherited set screw bore on the cannula, needed hand tools for every swap and readily crushed the thin wall, whereas a printed cavity cut as the negative imprint of the molded hub accepted the needle on a slip fit on the first print, tool-free, and works across gauges because hubs and Luer geometry are identical while only the bore varies. The eccentric mass was upgraded from a printed plastic arm to a magnet plus three offset steel nuts, which then created a new failure — the carrier walked up its guide posts and escaped the holder — solved not with fasteners (which would kill the compliance vibration needs) but with two elastic bands through drilled holes, slack through the working stroke and tensioned only at the travel limits. The chapter's real finding, though, comes at the end and is a consumable finding rather than a mechanism one: bore decides whether a droplet forms at all. Below about 0.26 mm the liquid leaves as a stream and the vibration burst has nothing to act on; above about 0.41 mm a droplet forms and grows as intended and the burst releases it. Plastic pipette tips outperformed all four steel needles, releasing small droplets as readily as large ones and never scattering — most likely because a polymer wets less readily than steel — so the module's clearest available improvement is a stock polypropylene tapered tip on a Luer hub that would seat in the existing socket with no change to the module at all. None was obtained within the project; the instrument was validated with 22 G steel needles, which is the dropping class but not the best class.

## 8.2 Prototype / version sequence

**Inherited build (Marius, handed over)**
- State: mechanical geometry partially established; **inoperative** — the vibration motor generated insufficient imbalance to overcome mechanical resistance and shed pendant droplets. No physical mounting interfaces to the instrument chassis.
- Retention: a set screw bearing directly against the steel cannula within a V-groove channel. Required hand tools for every needle swap; over-tightening readily crushed the thin-walled cannula, occluding the bore or bending the tip.
- Eccentric mass: a small 3D-printed plastic arm.
- Toolchain barrier: developed in OpenSCAD, which exports only polygonal surface meshes (STL) — no parametric features, sketches or editable dimensions; opened in Fusion 360 as an unmodifiable solid body. Module remodelled from scratch off calipers and bench measurements. (The same barrier hit the reagent storage module, outside the redesign scope.)
- Verdict: principle kept (he had experimentally validated vibration release on a single needle carrying a pendant droplet), hardware rebuilt.

**Rejected alternative A — cantilever vibrating strip**
- Needles along a thin flexible plastic strip fixed at one end, oscillated by an eccentric motor, "analogous to a flicked ruler." Eliminates all sliding joints and mechanical guides.
- Rejected on kinematic grounds: a cantilever deflects through an arc, not a pure linear translation, so the tip acquires a lateral velocity component and ejects droplets at unpredictable release angles, violating the 5 mm landing radius.

**Rejected alternative B — bare cannula direct insertion**
- Extract the steel cannula from its plastic hub and insert it directly into the PVC pump tubing, eliminating all fluidic fittings and wetted joints.
- Rejected: a bare cannula is a fragile, slippery cylinder with no mechanical locating features, requiring active tool-clamping and precise manual insertion — contradicts toolless, low-maintenance field operation.

**Stage 1 — component trials (test coupons, before the full chassis)**
- *Needle retention and locating geometry:* a 3D-printed test coupon with a cavity formed as the negative imprint of the molded hub, dimensioned from caliper measurements. **Accepted the needle with an exact slip fit on the first print.** Locates purely by passive kinematic constraint — no fasteners, no tools, no stress on the cannula, instantaneous replacement. Works across gauges because hub dimensions and Luer locking geometry are identical across commercial assortments while only the internal bore varies.
- *Fluidic coupling:* the same molded hub serves as both mounting seat and female Luer port; it connects to a standard male Luer-to-barb adapter, then a short soft-walled junction tube to the main PVC line back through the pump. Cost: one wetted fitting in the delivery line, against the unbroken pump tube path. Benefit: a rugged, user-serviceable interface untrained operators can disconnect and replace by hand.
- *Vibration drive optimization:* the printed plastic eccentric replaced on the bench with metallic mass — a compact permanent magnet taped to the motor shaft, loaded with three steel nuts on the eccentric side. Higher density plus a longer moment arm from offsetting the nuts → unbalanced momentum several times greater than the printed weight at the same speed.

**Stage 2 — carrier and holder (the two-part mechanism)**
- *Nozzle carrier:* rigid traveling carriage housing the vibration motor cradle at one end and aligning six hub seats in a linear array at the standard 22 mm pitch.
- *Fixed holder:* stationary bracket bolting to the rear wall of the alignment chassis.
- Coupling: vertical cylindrical guide posts molded into the carrier underside, constraining motion strictly to the vertical axis (1 DOF). Essential because the eccentric mass generates omnidirectional radial forces; the guides absorb lateral momentum so the needles translate purely up and down.
- Explicit caveat in the text: constraining the carrier is necessary for a droplet to leave vertically but not sufficient — whether the droplet departs without lateral velocity also depends on the tip fitted.

**Stage 3 — bench testing and the retaining bands**
- New failure mode: the increased momentum from the metal eccentric caused the carrier to walk upward along its guide posts until it disengaged completely from the holder.
- Rigid fasteners impossible — clamping the carrier would eliminate the compliance vibration requires.
- Fix: two horizontal holes drilled through the holder body and two elastic bands routed around the carrier. Slack throughout the small working amplitude (zero damping on the active cycle), taking up tension at the travel limits to prevent escape — a nonlinear restoring force that rigid fasteners and inextensible cords cannot provide (either too loose to retain or too tight to permit motion). Note: these two cross-drilled holes were machined into the physical prototype and do not appear in the CAD model.
- Second cause of binding, from drive geometry rather than retention: the motor body sits on the carrier centreline but the rotating eccentric mass (magnet and nuts) is offset to one side of the shaft, applying the dynamic excitation away from the carrier's centre. This produces a twisting moment alongside vertical oscillation, a slight tilt, and easier binding on the guide posts. Geometric solution: align the rotating centre of mass with the carrier centreline.
- FDM sliding-surface limits: layer-line roughness on printed PLA causes intermittent stick-slip friction along the guide posts; the slender posts show bending compliance under lateral eccentric loads. Both absorb vibrational kinetic energy. Motivates metal guide posts or machined bushings — smoother and stiffer, and they "would return to the stroke the energy that friction and flexure currently absorb."
- Restated verdict against the cantilever: "a rough linear guide that delivers purely vertical acceleration is fundamentally preferable to a frictionless guide that scatters droplets laterally."

**Tip trial — five tip types on the assembled machine (distilled water)**
| Tip | Bore | What leaves the tip | Vibration burst verdict |
|---|---|---|---|
| 27 G steel, clear | 0.21 mm | A fast stream; no droplet forms, and a small residue stays on the tip | **Nothing to act on** |
| 25 G steel, dark pink/red | 0.26 mm | As above, indistinguishable | **Nothing to act on** |
| 22 G steel, blue | 0.41 mm | A droplet forms and grows; most release, small ones often do not | **Releases, some scatter** |
| 21 G steel, violet | 0.51 mm | As above, indistinguishable | **Releases, some scatter** |
| Plastic pipette tip | not measured | A droplet forms at every volume tried, comparable in size to the 22 G; small droplets release as readily as large | **Releases cleanly** |

- Boundary: below roughly 0.26 mm bore the liquid streams; above roughly 0.41 mm a droplet forms and the burst releases it. The regime boundary lies between those bores and "is a property of the consumable rather than of the module."
- Plastic tips best of the five: no streaming at any commanded volume, small droplets released as readily as large — **nine of ten across an assorted range** — and no droplet was seen to leave sideways.
- Likely cause: material. A polymer surface wets less readily than steel, holding the droplet with less force and releasing it sooner. Explicitly flagged as a hypothesis because two variables were uncontrolled: the bore was not measured, and the tips were taped to the carrier rather than seated in it, so the tape may have damped the residual lateral motion that makes the steel needles scatter.
- On the plastic tips a **5 µL dose formed a droplet and released it** — the bottom of the instrument's specified range. Where a dose did stay on the tip, air in the line behind it was the cause rather than the volume, making it a fluid-path question rather than a nozzle one.
- The instrument was characterized and validated with **22 G needles on both channels**, placing the prototype in the dropping class: "the best of the tips available on a Luer seat, and it is not the best tip tried."
- Improvement identified: tapered dispensing tips molded in polypropylene with a Luer lock hub are a stock consumable offered across the same gauge range as the steel needles, so one would seat in the existing socket with no change to the module at all. None was obtained within the project.
- Explicit counter-warning: "A finer cannula is not an alternative to it: reducing the bore moves the tip toward the streaming regime, where the burst has nothing to release."

## 8.3 Key facts and numbers (exact)

- Six blunt dispensing needles in a fixed linear array at **22 mm pitch** (standard instrument pitch, inherited from the rack).
- Landing requirement: every dispensed droplet must land within a **5 mm target radius**, released from a dispensing height **under 5 cm**.
- Between the needle tip and the meniscus the droplet is influenced solely by gravity, inertia and its own surface tension.
- Vibration actuator: **RD520PA 3 V brushed DC motor**, operated from the instrument's **5 V bus** via an **IRF520 MOSFET** driver, with its duty cycle capped at **≈60 %** in firmware to prevent overheating.
- Eccentric mass: a compact permanent magnet taped to the motor shaft, loaded with **three steel nuts** on the eccentric side.
- Carrier constraint: **1 DOF**, vertical cylindrical guide posts.
- Retention: **two** horizontal holes drilled through the holder, **two** elastic bands around the carrier.
- Tip bores (internal diameters from the assortment data): 27 G = **0.21 mm**; 25 G = **0.26 mm**; 22 G = **0.41 mm**; 21 G = **0.51 mm**; plastic pipette tip = not measured.
- Streaming/dropping boundary: streams below roughly **0.26 mm**, drops above roughly **0.41 mm**.
- Plastic tips: small droplets released **nine of ten** across an assorted range; no sideways departure observed.
- Minimum dose released on plastic tips: **5 µL**.
- Fitted on the built prototype: **two channels**, each a **22 G** needle; the other **four** seats empty.
- Wetted additions to the fluid path: **one** Luer fitting (Luer-to-barb adapter + short soft junction tube).
- Material of printed sliding surfaces: **PLA**.
- Fluidic interface: six independent female Luer hubs mating with Luer-to-barb adapters.
- Electrical interface: high-current brushed DC motor circuit switched via an IRF520 MOSFET; the brushed motor generates EMI, so ceramic suppression/decoupling capacitors at the motor protect the shared I²C bus.
- Dispensing sequence: (1) fluid delivery — the pump meters the volume and, where the bore is wide enough, the liquid accumulates into a pendant droplet pinned by surface tension; (2) vibrational pulse — the MCU energizes the eccentric motor for a short burst; (3) inertial release — downward acceleration overcomes capillary pinning and the bands arrest overshoot without damping the active stroke.
- Physics citations for the pendant-droplet model: Tate (1864), Harkins (1919). Needle assortment source: Darwin blunt needles (2026). Proposed replacement tips: Fisnar tapered tips (2026). Hand-over source: Schiller, *Sample dispensing* (2026), Sec. 6.3.

## 8.4 Message-style headlines (nozzle)

1. The module arrived working in principle and inoperative in practice: the imbalance was too weak to shed a droplet, and there was nothing to bolt it to.
2. An STL is not a CAD model — OpenSCAD geometry could not be edited, so the module was remodelled from calipers.
3. Stop clamping the steel and start indexing the plastic: a printed negative of the molded hub took the needle on a slip fit on the first print.
4. Because every hub and Luer is identical and only the bore varies, one seat fits every gauge, toolless.
5. A cantilever strip has no friction and no joints — and deflects through an arc, which scatters droplets sideways past the 5 mm radius.
6. Metal beats plastic for an eccentric: a magnet and three offset nuts gave several times the momentum of the printed arm.
7. More momentum created a new failure: the carrier walked off its posts, and only elastic bands could retain it without killing the compliance vibration needs.
8. "A rough linear guide that delivers purely vertical acceleration is fundamentally preferable to a frictionless guide that scatters droplets laterally."
9. **Bore decides whether a droplet forms at all** — below 0.26 mm the liquid streams and the vibration burst has nothing to act on.
10. The best tip tried was not steel: plastic released nine of ten small droplets and never scattered, pointing at a stock polypropylene Luer tip as the module's clearest available improvement.
11. A finer cannula is not the fix — narrowing the bore drives the tip into the streaming regime.

## 8.5 Figures, tables, equations (nozzle)

### Figures (path relative to `Pictures/`)
| Label | File(s) | Caption gist | Type | Flag |
|---|---|---|---|---|
| `fig:nozzle-seat` | `nozzle-blunt-needle-assortment` (a), `nozzle-seat-detail-top` (b), `nozzle-seat-detail-underside` (c) | "The printed seat is the negative imprint of the molded hub" — the needle assortment with variable bores sharing one hub profile; the seat from above with the keyed slot matching the hub ears; from below with the cannula clearance bore | Photo (a) + CAD render (b, c) | ★ DECISIVE — the rebuild's core idea, and (a) is the gauge/colour chart the tip-regime table depends on |
| `fig:nozzle-carrier` | `nozzle-carrier-top` (a), `nozzle-carrier-underside` (b), `nozzle-carrier-in-holder-top` (c), `nozzle-carrier-in-holder-underside` (d) | Carrier from above with six hub seats and motor cradle; underside with the cylindrical guide posts; assembled carrier in holder from above and below; common relative scale | CAD render (4-panel) | ★ decisive for the 1-DOF argument; note the two cross-drilled retention holes exist only on the physical part |
| `fig:nozzle-built` | `nozzle-module-as-built` | The module mounted on the alignment chassis: two channels fitted with 22 G needles in hub sockets, Luer-to-barb adapters and soft junction tubes, four empty keyed seats, vibration motor in its cradle with the tape-wrapped eccentric mass and ceramic suppression capacitors, one elastic retaining band, two holder screws | Photo | ★★ MOST STRIKING — the whole chapter in one photograph, tape and all |

(Only three figure environments in this chapter — it is the most figure-poor of the three, so slides will likely need the site's nozzle-module media: needle assortment, carrier/holder renders, as-built and mounted views, and the droplet-release slow-motion clip.)

### Tables
- `tab:nozzle-tip-regimes` — *in-chapter, and the chapter's key result* — "Bore decides whether a droplet forms at all." Five tip types, distilled water, on the assembled instrument: tip, bore, what leaves the tip, and a rated verdict on the vibration burst (poor / partial / good). Full contents transcribed in §8.2 above.

### Equations
- **None.** Chapter 8 contains no numbered equations. Its physics is carried by the pendant-droplet references (Tate 1864, Harkins 1919) and by the qualitative regime boundary. The only quantitative relation treated as central is the regime rule itself, which can be written on a slide as:
  - `bore ≲ 0.26 mm → stream (no droplet, burst has nothing to release)`
  - `bore ≳ 0.41 mm → pendant droplet forms and grows (burst releases it)`

## 8.6 Quotable sentences (verbatim, nozzle)

- "A droplet that remains pinned to the needle tip represents a fatal delivery error that cannot be compensated by the pump, as the correctly metered volume never reaches the target tube."
- "Because the seat indexes against the standardized hub, any needle gauge fits interchangeably without tool adjustment."
- "a rough linear guide that delivers purely vertical acceleration is fundamentally preferable to a frictionless guide that scatters droplets laterally."
- "Bore decides whether a droplet forms at all."
- "The boundary between the two regimes therefore lies between those bores, and it is a property of the consumable rather than of the module."
- "That was the best of the tips available on a Luer seat, and it is not the best tip tried."
- "A finer cannula is not an alternative to it: reducing the bore moves the tip toward the streaming regime, where the burst has nothing to release."
- "a tip that delivers a stream rather than a droplet leaves the burst with nothing to release"

## 8.7 Open gaps and limitations the nozzle chapter admits

- The 1-DOF guide is necessary but not sufficient for vertical departure — the tip fitted also decides, "and §8.3.1 reports that it does not always."
- The 22 G steel needles used for characterization and validation release most droplets but not all; "a few of those that do release miss the tube mouth and land on the rack."
- The plastic-tip hypothesis (lower wetting) is explicitly unproven: the bore was never measured, and the tips were taped rather than seated, so the tape may have damped the lateral motion. "An untaped plastic tip of known bore would settle both, filmed at high speed."
- No polypropylene tapered Luer tip was obtained within the project, so the identified best improvement is untested on the real module.
- The eccentric mass is offset from the carrier centreline, producing a twisting moment, tilt and easier binding; aligning the rotating centre of mass is deferred to future refinements.
- FDM PLA guide posts give stick-slip friction and bending compliance, both absorbing vibrational energy; metal posts or machined bushings deferred.
- Two cross-drilled retention holes were machined into the physical prototype and do not appear in the CAD model — the built part and the model disagree.
- An explicit open item in the source: confirm from the physical assembly before final submission — (a) Luer lock vs slip adapter specification, (b) junction-tube step-down sizing, (c) vendor part reference.
- The module adds one wetted Luer fitting to an otherwise unbroken fluid path.
- Where a dose stayed on the tip, air in the line was the cause — a fluid-path issue left open rather than resolved.
- Only two of six channels were fitted on the built prototype.
- The brushed motor's EMI required dedicated decoupling capacitors to protect the shared I²C bus (handled in ch. 10, but flagged as a live constraint here).

## 8.8 Likely committee questions (nozzle)

1. *"Why keep an inherited mechanism that did not work?"* → Because the working principle was sound and had been validated on a single needle; with the project timeline, effort was better spent making it functional and integrable than exploring an unproven mechanism from scratch. §8.1 *Hand-over and a second ideation*.
2. *"Why rebuild the CAD instead of editing the inherited files?"* → OpenSCAD exports geometry strictly as polygonal surface meshes, so the files contained no parametric features, sketches or editable dimensions; in Fusion 360 they opened as an unmodifiable solid body. §8.1.
3. *"Why not the cantilever — it has no friction and no sliding joints?"* → A cantilever deflects through an arc rather than translating linearly, so the tip acquires a lateral velocity component and ejects droplets at unpredictable angles, violating the 5 mm landing radius. §8.1 and §8.2.3.
4. *"How do you hold the needle without a set screw?"* → The seat is a printed negative imprint of the molded hub, dimensioned from calipers; it accepted the needle on an exact slip fit on the first print and locates by passive kinematic constraint, so no tool touches the cannula. §8.2.1 *Component trials*.
5. *"Doesn't a different gauge need a different seat?"* → No — across commercial assortments the hub and Luer geometry are identical and only the internal bore varies, so any gauge fits interchangeably. §8.2.1.
6. *"Elastic bands on a laboratory instrument — is that not a bodge?"* → Rigid fasteners would eliminate the compliance vibration requires, and inextensible cords are either too loose to retain or too tight to permit motion; the bands are slack through the working amplitude and tension only at the travel limits, giving a nonlinear restoring force. §8.2.3 *Bench testing and the retaining bands*.
7. *"Your droplets sometimes miss the tube — what causes it?"* → Residual lateral motion, traced to an eccentric mass offset from the carrier centreline producing a twisting moment, plus the tip material; steel needles in the dropping class release most droplets but a few land on the rack. §8.2.3 and §8.3.1.
8. *"Why not just use a finer needle for smaller droplets?"* → Reducing the bore drives the tip into the streaming regime, where no droplet forms and the vibration burst has nothing to act on. §8.3.1 *Tip geometry and the dispensing regime*.
9. *"You say plastic tips are better but you validated with steel — why?"* → The 22 G steel needle was the best tip available on a Luer seat within the project; the taped plastic tips of the trial are not a substitute, and no polypropylene Luer-hub tapered tip was obtained. §8.3.1.
10. *"Can the module deliver the 5 µL minimum?"* → Yes on the plastic tips, where a 5 µL dose formed a droplet and released it — the bottom of the instrument's specified range; where a dose stayed on the tip, the cause was air in the line, a fluid-path question rather than a nozzle one. §8.3.1.

## 8.9 Website tools referenced (nozzle)

**None.** Chapter 8 contains no `\livetool` panel and no `sirsirio.github.io` reference. (The site hosts a nozzle-module record page and the droplet-release slow-motion clip, but the chapter does not cite them.)

---
---

# CROSS-CHAPTER NOTES FOR THE SLIDE WRITER

**Full inventory of thesis-tools pointers across the whole document** (only two fall inside these three chapters):
| Tool | Label | Address | Where cited |
|---|---|---|---|
| Rotor Geometry Solver | `tool:rotor-solver` | `sirsirio.github.io/thesis-tools/tools/rotor-solver/` | **Ch. 6 §6.2.2** |
| Peristaltic Occlusion & Displaced-Volume Model | `tool:occlusion-model` | `sirsirio.github.io/thesis-tools/tools/peristaltic-roller-displaced-volume-model/` | **Ch. 6 §6.2.3** |
| Tensioned Tube Path Model | (no panel) | via `https://sirsirio.github.io/thesis-tools/` | Appendix K §*The calculators* (referenced from Ch. 6 §6.2.4) |
| System Architecture Explorer | `tool:architecture-explorer` / `-app` | `.../tools/system-architecture-explorer/` | Ch. 10, Appendix N |
| Dispense Throughput Simulator | `tool:throughput-simulator` | `.../tools/dispense-throughput-simulator/` | Ch. 10 |
| UI Prototypes | `tool:ui-prototypes` | `.../tools/ui-prototypes/` | Ch. 9 |
| UI Mockup (commented out) | `tool:ui-mockup` | `.../tools/ui-mockup/` | Ch. 9 (currently commented) |
| Thesis Tools (site root) | `tool:site` | `sirsirio.github.io/thesis-tools/` | Preface |

**Internal inconsistency worth knowing before the defense:** §6.2.4's summary paragraph states the framework defines "a nominal gap of 1.52 mm", while `tab:app-pump-design-point` gives `G = 2w − δ = 1.62 mm` at δ = 0.20 mm, and `fig:pump-head-gap`'s caption calls 1.62 mm the nominal target with 1.52 mm as one of a printed test set. The *built and measured* gap on v2.3 is 1.52 mm (16 % interference on the 1.82 mm stack). Do not put "nominal 1.52 mm" and the design-point table on the same slide without a note.

**The three chapters share one spine that the slides can reuse:** each module's decisive failure was a manufacturing or consumable property, not a modelling error — a slicer that shrinks concave arcs (pump), a lid left flat against a chamfered wall (alignment), a cannula bore below 0.26 mm (nozzle) — and in each case the fix was to measure the physical thing rather than trust the drawing.
