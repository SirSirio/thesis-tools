# Readout methods for the modular reader — defence prep

Background for §13.6 (*Beyond the dispenser: pairing preparation with detection*). Not thesis
content, not for the slides — this is so the question "what would the reader actually do?" has an
answer. Compiled 2026-09-22, mostly from a web sweep; unverified items are flagged at the foot.

**The frame.** The dispenser assembles the reaction; the reader does *signal transduction* —
turning the molecular event into an electrical number. PANPOC's own detection is probe-based
multiplex **fluorescent LAMP**, developed at DTU by Maria Dimaki and Ankita Mishra
(`pairconsortium-probebased-2025`), so fluorescence is the modality the reference protocol
already implies.

| Modality | How it works, in one line | Reader hardware | Reachable? |
|---|---|---|---|
| Fluorescence | Dye or probe lights up as amplicon accumulates; excite blue, read green | LED + 2 filters + photodiode, dark box, 65 °C heater | **Yes** — best sensitivity per euro |
| Colorimetric / absorbance | Amplification releases protons, phenol red goes pink→yellow; or gold nanoparticles aggregate red→blue | 1–2 LEDs + photodiode, heater | **Yes** — cheapest |
| Turbidimetry | LAMP's pyrophosphate precipitates with Mg²⁺ and clouds the tube (Mori 2001; Eiken sells it as the Loopamp Realtime Turbidimeter) | 650 nm LED + photodiode, heater | Yes, but LAMP-only and weak |
| Lateral-flow reader | Images the strip, measures test-line darkness against the control line | White LED, camera, fixed strip holder | **Yes** — no heater at all |
| Electrochemical | Binding/enzyme turnover becomes a current, voltage or impedance at an electrode | Potentiostat IC + disposable screen-printed strip | **Yes** — no optics whatsoever |
| Chemi-/electrochemiluminescence | The label emits its own light (no lamp); ECL switches it on electrically | PMT or SiPM, true light-tight chamber | Borderline |
| Magnetic (GMR) | Magnetic-bead labels shift a magnetoresistive sensor's resistance | Custom GMR die, bias coil, lock-in amp | No — custom silicon |
| SPR / photonic, SERS, nanopore | Refractive-index shift · Raman fingerprint · ionic-current blockade | Lasers, spectrometers, thermal stabilisation | No — lab-grade |

*The colorimetric and turbidimetry rows are one hardware module: see "One module for colour and
turbidity" at the foot (2026-09-23).*

## The five worth describing

**Fluorescence.** A dye intercalates into double-stranded DNA (SYBR Green) or is unquenched from
a probe as amplification proceeds. You excite at ~470 nm and read the longer-wavelength emission;
the Stokes shift lets a filter separate a weak signal from a strong source. Real-time, so it gives
a time-to-positive and is quantitative over orders of magnitude. The **heater dominates the power
budget, not the optics** — that is the battery argument. Reads RT-LAMP, RPA, qPCR, CRISPR-Cas
reporters. Commercial: GeneXpert, cobas liat, ID NOW (isothermal nicking-enzyme amplification
read by fluorescent molecular beacons).

**Colorimetric.** LAMP in a weakly buffered mix drops the pH and phenol red turns yellow — visible
by eye, quantified as a ratio of two LED channels. Gold nanoparticles are the immunoassay version:
red dispersed, blue aggregated. Cheapest possible reader. Its weakness is the thesis's own
argument in miniature: a crude, high-buffer sample can suppress the colour change and read as a
false negative, so it is sensitive to how well the prep worked.
*The same module also reads turbidity: see "One module for colour and turbidity" (2026-09-23).*

**Lateral-flow reader.** Wicked strip, labelled antibody captured at a test line; the reader
measures reflectance at that line against background and the control line. No heater, lowest power.
**The hard part is mechanical registration of the strip, not the optics** — which is precisely the
competence the alignment module demonstrates. Good line if asked what is adjacent to this work.

**Electrochemical.** No light path at all: hold an electrode at a fixed potential and measure the
current from a redox mediator (the glucose-meter lineage), or watch charge-transfer resistance rise
as mass binds. In 2026 a potentiostat is one IC. **Immune to ambient light and to sample turbidity
and colour**, so a bead-laden crude lysate does not matter — arguably the best fit for what this
dispenser hands over. Costs: strip-to-strip variation needs a calibration code, electrodes foul,
and electron transfer is temperature-dependent. The blood-glucose meter is the proof this class
scales to a battery-powered, untrained-user product.

**Magnetic (GMR).** Worth having as an answer because **the PANPOC prep already uses magnetic
beads**, and biology has no magnetic background, so the signal comes straight out of turbid
matrix. Reported sensitivity is in the picomolar range for proteins (~10 pM for phospho-SMC1,
and femtomolar for two cytokines, in Kim et al. 2013). But the sensor is a custom die, not a
catalogue part — attractive in principle, not a student-reachable module. Philips Magnotech is
the cautionary commercial case: Philips exited handheld diagnostics, spinning the platform out
as Minicare BV in 2018; Siemens Healthineers bought it in 2019 and the magnetic-bead readout now
sits inside its Atellica VTLi. So the *company* withdrew, not the technology.

## Two questions to expect

- **"Why not just use a phone?"** A phone gives a camera and compute for free, but no control of
  exposure geometry, no filters and no heater. It covers lateral flow and colorimetry, nothing
  below them.
- **"What does the dispenser buy the reader?"** Every modality above assumes the reaction mix was
  assembled correctly. The reader is the cheap half; preparation is the hard half. That is the
  thesis's argument, restated from the detection side.

## Verified vs not

Confirmed with DOIs in the sweep: Papadakis et al., portable real-time colorimetric LAMP device,
*Sci. Rep.* 12:3775 (2022), `10.1038/s41598-022-06632-7`; smartphone LFA quantification review,
*J. Immunol. Methods* (2024), `10.1016/j.jim.2024.113745`; Chen et al., smartphone-read
chemiluminescent LFA, *Analyst* (2023), `10.1039/d2an01499h`; ECL for POC, *Sensors & Diagnostics*
2:480 (2023); miniaturised Raman/SERS for POCT, *Biosensors* 12:590 (2022),
`10.3390/bios12080590`; GMR biosensors, *ACS Appl. Mater. Interfaces* (2022),
`10.1021/acsami.1c20141`.

**Checked 2026-09-22, now confirmed:**

- **Turbidity as the LAMP readout** — Mori Y, Nagamine K, Tomita N, Notomi T, *Detection of
  loop-mediated isothermal amplification reaction by turbidity derived from magnesium
  pyrophosphate formation*, **Biochem. Biophys. Res. Commun.** 289(1):150–154 (2001),
  `10.1006/bbrc.2001.5921`.
- **Eiken instrument** — real, sold as the **Loopamp Realtime Turbidimeter**, models **LA-320C**
  and **LA-500** (Eiken Chemical, Tokyo); it reads the magnesium-pyrophosphate turbidity, block
  held at 55–70 °C. Vendor/instrument pages and assay papers both name it. Say "Loopamp Realtime
  Turbidimeter", not "LA-320C" alone.
- **Roche Elecsys / cobas e** — yes, electrochemiluminescence (ECLIA): a
  tris(2,2′-bipyridyl)ruthenium(II) label with tripropylamine as co-reactant, light triggered at
  an electrode. Roche's own assay menu and the ECL literature agree.
- **Abbott ID NOW** — yes: isothermal **nicking endonuclease amplification (NEAR)** read by
  fluorescently labelled molecular beacons (Abbott / FDA instructions for use).
- **Philips Magnotech** — the claim needed correcting and the body text now carries the fix.
  Philips did stop its Handheld Diagnostics business, but the platform was spun out as Minicare
  BV (2018) and acquired by Siemens Healthineers (2019); the technology continues in the Atellica
  VTLi. Do **not** say "discontinued technology" — say Philips withdrew from the market.
- **GMR limit of detection** — the "<10 pM" figure is soft and the review is not the source. A
  primary paper reporting it: Kim D et al., *Modeling and experiments of magneto-nanosensors for
  diagnostics of radiation exposure and cancer*, **Biomed. Microdevices** 15(4):665–671 (2013),
  `10.1007/s10544-012-9678-z` — ~10 pM for phospho-SMC1, ~53 fM for G-CSF, ~460 fM for IL-6. So
  quote it as *picomolar, target-dependent*, not as a single "<10 pM" device figure.

**Still unconfirmed:** the exact difference between LA-320C and LA-500 (successive models, not
verified from Eiken directly), and whether the Atellica VTLi uses the same magnetic readout or
only descends from it.

Existing anchors already in `bibliography.bib` if any of this ever needs citing:
`wang-poc-diagnostics-2021` (the big POC review, methods to devices) and
`chen-portable-sensing-2026` (portable sensor technologies).

## One module for colour and turbidity (2026-09-23)

**What changed.** The table above lists colorimetric and turbidimetry as two modalities, and until
today S41 showed them as two detector cards. In hardware they are one module: a light source, the
sample, and a photodiode opposite it, read **in transmission**. Colorimetry reads colour, as the
ratio of one or two LED wavelengths; turbidity reads cloudiness, as the loss of light at a single
wavelength (the table above gives a 650 nm LED for the LAMP turbidity readout).
Both are an attenuation measurement on the same optical path, so one module with one or two LEDs
does both. **S41 now shows them as one card, "Absorbance: colour and turbidity"**, and the rail
holds three modules beside fluorescence in the bay.

**Where this comes from.** General optics, not the thesis and not the sources earlier in this
note, which list the hardware per method but never compare the two. Standard textbook treatment
of absorbance photometry, turbidimetry and nephelometry: Skoog, Holler and Crouch, *Principles of
Instrumental Analysis* (Cengage), the chapters on molecular absorption and on light scattering;
Beer–Lambert attenuation covers both cases, with scattering in place of absorption for turbidity.

**The exception.** Turbidity read at **90° to the beam (nephelometry)** measures scattered light,
not transmitted light. It needs a second photodiode placed off-axis, so it would not fit this
module as drawn. Transmission turbidimetry, which is what the LAMP turbidimeter does, does.

**How the slide relates to thesis §13.6.** The thesis
(`Chapters/13_Discussion-and-Reflection.tex`, line 152) names four **assay types**: colorimetric,
enzymatic, fluorescence and immunoassay. The slide now shows four **detector types**:
fluorescence, absorbance, lateral-flow strip reader and electrochemical. They are two different
lists. Colorimetric maps onto absorbance and fluorescence onto fluorescence. Enzymatic and
immunoassay tests are chemistries, not detectors: an enzymatic test is read as a colour change
(absorbance) or a current (electrochemical), an immunoassay as a strip line, a fluorescent label or
a current. So the slide complements the sentence rather than repeating it; whether to align the
rail with the thesis wording is still Sirio's call (PUNCHLIST (al)).
