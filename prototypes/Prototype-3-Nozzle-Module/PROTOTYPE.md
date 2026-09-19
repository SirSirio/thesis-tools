---
id: nozzle-01
module: Prototype-3-Nozzle-Module
title: Nozzle Module, six-needle dispensing array with vibration release
status: rebuilt-integrated-validated-two-channels
created: 2026-09-18
updated: 2026-09-18
source: Thesis chapter 8 (Nozzle Module), section 11.3 (The nozzle in place), chapter 12 (System-Level Validation) nozzle rows
---

# Nozzle Module

The nozzle module **governs fluidic delivery into the sample tubes**. While the
pump module meters the volume, the nozzle positions **six blunt dispensing
needles in a fixed linear array** above the sample transport rail, one
dedicated fluid path per onboard reagent. Between the needle tip and the liquid
in the tube, the droplet is influenced solely by gravity, inertia and its own
surface tension.

> This is a **rebuilt, integrated and system-validated** module. The concept
> (blunt needles, vibration release) was inherited from Marius Schiller's
> companion thesis; at hand-over the mechanism was inoperative and had no
> chassis mount. The rebuild made it work, mounted it on the instrument, and
> the tip trials on the assembled machine found the boundary that decides
> whether it does anything at all.

Every fact and number in this file comes from the thesis chapters listed in the
front matter. Section numbers are cited inline. The thesis assigns **no version
numbers and no build dates** to the nozzle stages; the log below uses stage
names instead.

---

## Version status

| Stage | State | Where |
|-------|-------|-------|
| **Inherited** | Received from the companion thesis. Geometry partially established, mechanism inoperative, no mounting interface. | 8 (opening), 8.1 |
| **Rebuilt** | **BUILT.** Hub-seat carrier, fixed holder, metal eccentric mass, elastic retaining bands. Two of six channels fitted. | 8.2, 8.3 |
| **Integrated** | **MOUNTED.** Holder docked on the electronics bay of the V3 alignment chassis, three screws, lines routed from the pumps. | 11.3 |
| **Validated** | **SYSTEM-TESTED.** 22 G needles on both channels, forty-tube run, droplets consistently inside the 5 mm landing tolerance. | 12.3, 12.5 |
| **Next** | **NOT STARTED.** Polymer tapered tip on the existing Luer seat, centred eccentric mass, metal guide posts or bushings. | 8.2.3, 8.3.1 |

---

## 1. Purpose

- **Delivers each reagent into the tube.** Six needles, one per reagent line,
  in a fixed line above the sample transport rail (chapter 8 opening).
- **Places the droplet.** The primary functional requirement is geometric
  placement rather than volumetric metering: every droplet must land within a
  **5 mm target radius** when released from a dispensing height under
  **5 cm** (chapter 8 opening, citing the design requirements).
- **Releases the droplet.** A droplet that stays pinned to the needle tip is a
  fatal delivery error the pump cannot compensate: the correctly metered
  volume never reaches the tube (8.1).
- **Non-contact.** The droplet crosses an air gap; the needle touches neither
  the tube nor the liquid, which is what removes tube-to-tube carryover by
  design (12.5).

---

## 2. Requirement and pass criteria

| Quantity | Target | Status |
|----------|--------|--------|
| **Landing radius** | Within 5 mm of the target from under 5 cm | **Met.** Across forty tubes, droplets consistently hit the tube openings within the 5 mm tolerance (12.3) |
| **Droplet release** | Every dose leaves the tip | **Met with the tip fitted (22 G).** In the dropping class most droplets release; small ones often do not, and a few scatter (8.3.1). Over the forty-tube run only three droplets showed partial wetting on the rack deck or lane, outside a consumable interference mode (12.3) |
| **Lower volume bound** | 5 microlitre dose released | **Shown on the plastic tip only.** A 5 microlitre dose formed a droplet and released it on the taped plastic pipette tip (8.3.1). The system-level verdict notes the 5 microlitre bound is not yet validated on the instrument but expected to pass (12.1) |
| **Toolless service** | Needle swap by hand, no tools | **Met.** The hub seat locates the needle by passive kinematic constraint; the Luer coupling disconnects by hand (8.2.1) |
| **Spillage and operator exposure** | Nothing leaves a tube except into its target | **Partly met.** Nothing escaped the machine; roughly three droplets landed on the rack and lane, exactly where an operator picks the rack up (12.5) |

---

## 3. Hand-over and the second ideation (8.1)

A non-contact dispensing tip must do two conflicting things: transport liquid
from the pump with zero residual dead volume, and cleanly release the pendant
droplet at the tip.

**What was inherited.** Industrial **blunt dispensing needles**: flat-ended
stainless steel cannulas in moulded plastic hubs, available across gauges at
consumable pricing. For release, an **active vibration mechanism**: a compact
brushed DC motor with an unbalanced shaft mass shakes the needle array and
imparts downward momentum to overcome capillary pinning. Marius validated the
principle on a single needle carrying a pendant droplet before building the
assembly. **The vibration-detachment concept was kept throughout the rebuild.**

**Why the CAD could not be reused.** The inherited models were OpenSCAD, which
exports only polygonal surface meshes (STL). Opened in Fusion 360 they were
unmodifiable solids with no parametric features, sketches or editable
dimensions. The module was modelled from scratch, taking critical dimensions
from callipers and bench measurements.

**Two alternatives evaluated and rejected before the rebuild:**

| Concept | Why it was rejected |
|---------|---------------------|
| **Cantilever vibrating strip.** Needles on a thin flexible strip fixed at one end, oscillated by an eccentric motor, like a flicked ruler. No sliding joints or guides. | Kinematics. A cantilever deflects through an arc, not a pure linear translation, so the tip acquires a lateral velocity and ejects droplets at unpredictable angles, violating the 5 mm landing radius |
| **Bare cannula direct insertion.** Pull the steel cannula out of its hub and push it straight into the PVC pump tubing. No fittings, no wetted joints. | Serviceability. A bare cannula is a fragile, slippery cylinder with no locating feature; it needs tool clamping and precise manual insertion, which contradicts toolless, low-maintenance field operation |

---

## 4. Concept and working principle (8.2, 8.3)

### 4.1 Hub seat: the needle locates on its moulded hub (8.2.1)

The inherited design clamped each needle with a **set screw bearing on the
steel cannula in a V-groove**. Rigid, but it needed hand tools for every swap
and over-tightening readily crushed the thin-walled cannula, occluding the bore
or bending the tip.

The moulded plastic **hub** is the better locating feature. Across commercial
needle assortments the hub dimensions and Luer locking geometry are identical;
only the internal cannula bore varies with gauge. A 3D-printed test coupon
with a cavity formed as the **negative imprint of the hub**, dimensioned from
calliper measurements, accepted the needle with an **exact slip fit on the
first print**. The seat has a keyed slot matching the hub ears (seen from
above) and a cannula clearance bore (seen from below). No fasteners, no tools,
no stress on the cannula, any gauge fits interchangeably.

### 4.2 Fluidic coupling: one wetted Luer fitting (8.2.1)

Retention and fluidic connection converge on the same feature: the hub is at
once the mounting seat and the **female Luer port**. It takes a standard **male
Luer-to-barb adapter**; a **short soft-walled junction tube** joins the barb to
the main PVC line running back through the peristaltic pump to the reservoir.
This puts a single wetted fitting in the delivery line (unlike the unbroken
tube path through the pump), in exchange for a rugged, user-serviceable joint
an untrained operator can disconnect by hand.

> The thesis carries an open item on this coupling: Luer lock versus slip
> adapter, the junction-tube step-down sizing and the vendor part reference
> were **not confirmed** in the text.

### 4.3 Vibration drive: metal eccentric mass (8.2.1)

The inherited prototype failed to detach droplets because its eccentric mass
was a **small 3D-printed plastic arm**. On the bench it was replaced with
metal: a **compact permanent magnet taped to the motor shaft, loaded with
three steel nuts on the eccentric side**. Metal is denser and offsetting the
nuts lengthens the moment arm, giving an unbalanced momentum several times the
printed weight at the same speed.

| Element | As built |
|---------|----------|
| Motor | **RD520PA, 3 V brushed DC** |
| Supply | Instrument **5 V bus** |
| Driver | **IRF520 MOSFET** |
| Duty cycle | Capped at **about 60 %** in firmware, to prevent overheating |
| Suppression | Ceramic suppression capacitors at the motor; the brushed motor's electromagnetic interference needed dedicated decoupling to protect the shared I2C bus (8.3, detail in chapter 10) |

### 4.4 Carrier and holder (8.2.2)

| Part | Role |
|------|------|
| **Nozzle carrier** | A rigid travelling carriage: the vibration-motor cradle at one end, **six hub seats in a line at the standard 22 mm pitch** |
| **Fixed holder** | A stationary bracket that bolts to the rear wall of the alignment-module chassis |

The carrier couples to the holder through **vertical cylindrical guide posts**
moulded into its underside. They constrain the carrier to **one degree of
freedom, vertical**. The eccentric mass generates omnidirectional radial
forces; the guides absorb the lateral component so the needles translate purely
up and down. Constraining the carrier is necessary for a vertical departure but
not sufficient: whether the droplet itself leaves without lateral velocity also
depends on the tip fitted (section 6).

### 4.5 Retaining bands and what the bench showed (8.2.3)

With the metal mass, the first dynamic test produced a new failure: the carrier
**walked upward along its guide posts until it disengaged from the holder**.
Rigid fasteners were ruled out; clamping the carrier would remove the
compliance the vibration needs.

**Fix:** two horizontal holes drilled through the holder body and **two elastic
bands** routed around the carrier. The bands stay slack through the small
working amplitude (zero damping on the active stroke) and take up tension only
at the travel limits. A rigid fastener or an inextensible cord is either too
loose to retain or too tight to permit motion; the bands' nonlinear restoring
force does both jobs. The two cross-drilled holes were machined into the
physical part and do not exist in the CAD model.

Two further observations, both carried forward as open gaps:

- **Off-centre excitation.** The motor body sits on the carrier centreline but
  the rotating mass (magnet and nuts) is offset to one side of the shaft. The
  carrier therefore sees a twisting moment alongside the vertical oscillation,
  tilts slightly, and binds on the posts more readily than centred excitation
  would. Aligning the rotating centre of mass with the carrier centreline is the
  geometric fix.
- **Printed sliding surfaces.** Layer-line roughness of FDM PLA gives
  intermittent stick-slip friction on the posts, and the slender posts flex
  under lateral eccentric loads. Both absorb part of the vibrational energy.
  Metal guide posts or machined bushings would return that energy to the
  stroke.

The rejected cantilever would have avoided sliding friction entirely, but its
curvilinear arc still rules it out: a rough linear guide that delivers purely
vertical acceleration beats a frictionless guide that scatters droplets.

### 4.6 The dispensing sequence (8.3)

1. **Fluid delivery.** The pump meters the target volume through the selected
   channel. Where the tip bore is wide enough, the liquid accumulates into a
   pendant droplet pinned by surface tension.
2. **Vibrational pulse.** The microcontroller energises the motor for a short
   burst; the rotating mass drives the carrier into high-frequency vertical
   oscillation along its posts.
3. **Inertial release.** Downward acceleration overcomes capillary pinning and
   the droplet leaves with vertical momentum into the tube below. The bands
   arrest overshoot without damping the active stroke. This step is conditional
   on the first: a tip that streams instead of dropping leaves the burst with
   nothing to release, or a droplet too small to be detached.

---

## 5. As built (8.3)

A compact two-piece printed assembly: six blunt needles in a rigid line at
22 mm pitch directly above the tube indexing axis. Each needle sits in its hub
socket and connects to its pump through a dedicated Luer-to-barb fitting,
giving independent, toolless replacement on every channel.

| Item | As built |
|------|----------|
| Needle positions | **6**, at **22 mm** pitch |
| Channels fitted on the prototype | **2**, each with a **22 G** needle (blue hub) |
| Fluidic joint per channel | Female Luer hub, male Luer-to-barb adapter, short soft junction tube, PVC line to the pump |
| Vibration motor | RD520PA 3 V brushed DC in a compliant printed cradle, tape-wrapped eccentric mass on the shaft end, ceramic suppression capacitors at the motor |
| Retention | Elastic band over the carrier, through two cross-drilled holes in the holder |
| Fixing | Two screws hold the holder to the chassis (a third, horizontal, is described in 11.3) |

Three interfaces:

| Domain | Interface |
|--------|-----------|
| Mechanical | Holder bolts to a reinforced mounting boss on the alignment chassis rear wall; rigid axial alignment with the sample deck |
| Fluidic | Six independent female Luer hubs, Luer-to-barb adapters, soft PVC lines from the pumps |
| Electrical | Brushed DC motor circuit switched by an IRF520 MOSFET; decoupling capacitors to keep motor noise off the shared I2C bus |

---

## 6. Measured results

### 6.1 Tip geometry decides the regime (8.3.1)

The mechanism was designed against a **pendant droplet**: liquid emerges
slowly, surface tension holds it, a vertical impulse releases it. Whether the
assembled instrument behaves that way depends on the tip, and the dependence
is strong enough to decide whether the module does anything at all.

Five tip types were run on **distilled water on the assembled machine**: four
steel blunt needles from the assortment the module was built around (gauges
coded by hub colour; bores are internal diameters from the assortment data)
and a set of plastic biotech pipette tips.

| Tip | Bore | What leaves the tip | Vibration burst |
|-----|------|---------------------|-----------------|
| 27 G steel, clear | 0.21 mm | A fast stream; no droplet forms, a small residue stays on the tip | Nothing to act on |
| 25 G steel, dark pink/red | 0.26 mm | As above, indistinguishable | Nothing to act on |
| 22 G steel, blue | 0.41 mm | A droplet forms and grows; most release, small ones often do not | Releases, some scatter |
| 21 G steel, violet | 0.51 mm | As above, indistinguishable | Releases, some scatter |
| Plastic pipette tip | not measured | A droplet forms at every volume tried, comparable in size to the 22 G; small droplets release as readily as large | Releases cleanly |

**Findings:**

- Below roughly **0.26 mm** of bore the liquid streams and no droplet forms;
  the mechanism has nothing to act on. Above roughly **0.41 mm** a droplet
  forms and the burst releases it. The boundary lies between those bores and
  is a **property of the consumable, not of the module**.
- The plastic tips performed best of the five: no streaming at any commanded
  volume, small droplets released as readily as large (**nine of ten** across
  an assorted range), and no droplet was seen to leave sideways.
- Steel needles in the dropping class release most droplets but not all, and a
  few that release miss the tube mouth and land on the rack.
- **Most likely reason: material.** A polymer surface wets less readily than
  steel, so it holds the droplet with less force. This is a **hypothesis**:
  the plastic bore was not measured (droplet size points near the 22 G), and
  the tips were **taped to the carrier rather than seated**, so the tape may
  have damped the residual lateral motion that makes steel needles scatter.
- On the plastic tips a **5 microlitre** dose formed a droplet and released it,
  the bottom of the instrument's specified range. Where a dose stayed on the
  tip, **air in the line** was the cause, a fluid-path question rather than a
  nozzle one.
- A finer cannula is not an alternative: reducing the bore moves the tip
  toward the streaming regime.

### 6.2 Placement on the forty-tube run (12.3, 12.5)

The instrument was characterised and validated with **22 G needles on both
channels**, which places the prototype in the dropping class.

| Question | Result |
|----------|--------|
| Landing inside the 5 mm tolerance | Across **forty tubes** (five racks of eight, two reagents, dyed solutions for contrast), droplets consistently hit the tube openings within the 5 mm tolerance |
| Droplets missing the tube | Outside a consumable interference mode, only **three** droplets showed partial wetting on the rack deck or lane. During the dye runs no dye escaped the machine onto the bench or reached the operator; the only liquid to leave a tube was roughly three droplets on the rack and lane |
| Regime held over a full protocol | Multi-rack dye trials confirmed the 22 G dropping regime held across the whole protocol |
| The consumable interference mode | Tube caps left flat rather than folded back to 135 degrees project laterally and rub the alignment lane wall. That axis runs open-loop, so friction costs steps and the rack lags the firmware position; doses land off-centre. This is an alignment and cap-handling failure, not a nozzle one |
| Residue after draining | Reverse pumping leaves capillary retention in the nozzle Luer fitting. With a dedicated line per reagent this causes no cross-contamination in single-reagent use, but lines cannot be switched between chemicals without a thorough wash or replacement |

---

## 7. Integration (11.3)

- **Where it sits.** From the pump carriers at the rear, the fluid path
  converges at the stationary nozzle module, which suspends the needles
  directly above the tube axis. The holder **docks atop the electronics bay**,
  the enclosed central compartment of the chassis between the input and output
  queues that houses the microcontroller, motor drivers and power wiring.
- **How it locates.** The underside of the printed holder conforms to the
  profile of the bay walls, so the chassis locates the part before any
  fastener. **Two screws** fix the holder down and a **third screw, driven
  horizontally on the left side into the bay wall**, makes the mount sturdy.
- **Designed against the chassis CAD.** Unlike the storage module, whose
  uneditable meshes forced a carrier designed around physical hardware, the
  holder was modelled directly against the CAD of the finalised V3 chassis
  with fit tolerances incorporated. It was reprinted **four or five times** to
  refine its own features (the compliant motor cradle, rounded edges
  throughout, clearance for the eccentric weights to spin), and **none of
  those reprints was needed to correct the chassis interface**.
- **Lines.** A **450 mm** length of PVC tubing leaves each pump head, bridges
  over the toothed drive rack of the alignment module, and ends at the junction
  tube and Luer-to-barb adapter on its hub. The left carrier feeds the leftmost
  needle and the central carrier the adjacent position, so the two lines do not
  cross. Between pump outlet and hub the tubing is **unguided**: it hangs
  freely on its own flexural stiffness, with the Luer fitting as the single
  fixed anchor. Functional on the prototype without fouling the drive rack, and
  lines still disconnect by hand. A production instrument would route the
  tubing deliberately, clear of every moving part.

---

## 8. Open gaps

1. **A polymer tip on a Luer hub is the clearest available improvement (8.3.1).**
   Tapered polypropylene dispensing tips with a Luer lock hub are a stock
   consumable across the same gauge range as the steel needles and would seat
   in the existing socket with no change to the module. None was obtained
   within the project; the taped pipette tips of the trial are not a
   substitute. An **untaped plastic tip of known bore, filmed at high speed**,
   would settle both uncontrolled variables of the material hypothesis.
2. **The eccentric mass is off the carrier centreline (8.2.3).** The resulting
   twisting moment tilts the carrier and makes it bind on the posts. Centring
   the rotating mass is the geometric fix and would cut the lateral loads the
   bands absorb.
3. **Printed guide posts lose energy (8.2.3).** Stick-slip on PLA layer lines
   and post flexure absorb part of the stroke. Metal guide posts or machined
   bushings are the next step.
4. **The Luer coupling is not fully specified (8.2.1).** Lock versus slip
   adapter, junction-tube step-down sizing and the vendor part reference were
   not confirmed in the thesis text.
5. **Small droplets on steel (8.3.1).** In the dropping class small droplets
   often do not release and a few scatter onto the rack; three did so over
   forty tubes (12.3).
6. **The 5 microlitre bound on the instrument (12.1).** Released on the taped
   plastic tip only; not yet validated on the fitted 22 G needles, expected to
   pass.
7. **Free-hanging tubing (11.3).** Acceptable on the prototype; a production
   instrument needs it held clear of the drive rack and placed for replacement.

---

## 9. Version log

| Stage | What changed | What was learned | Source |
|-------|--------------|------------------|--------|
| **Inherited** | Blunt-needle array with a set-screw V-groove clamp and a brushed DC motor swinging a printed plastic eccentric arm. OpenSCAD meshes only. | The vibration-release principle works on a single needle, but the printed mass gave too little imbalance to shed droplets from the assembly; no chassis mount existed; the CAD could not be edited. | 8 (opening), 8.1 |
| **Ideation** | Cantilever strip and bare-cannula insertion evaluated against a guided rebuild of the inherited concept. | Arc deflection scatters droplets (fails the 5 mm radius); a bare cannula cannot be handled without tools. Keep the guided vibrating array. | 8.1 |
| **Trials** | Printed hub-seat coupon (negative imprint of the moulded hub); Luer-to-barb coupling with a soft junction tube; magnet plus three steel nuts as the eccentric mass; RD520PA on the 5 V bus through an IRF520, duty capped near 60 %. | Exact slip fit on the first print; any gauge locates on its hub without tools; metal mass gives momentum several times the printed weight. | 8.2.1 |
| **Carrier and holder** | Two-part mechanism: carrier with motor cradle and six seats at 22 mm pitch on vertical guide posts; fixed holder for the chassis rear wall. | One vertical degree of freedom is necessary for a vertical departure, but the tip decides whether the droplet itself leaves straight. | 8.2.2 |
| **Retaining bands** | Two holes drilled through the holder, two elastic bands around the carrier (machined into the physical part, not in CAD). | The metal mass walks the carrier off its posts; slack bands retain without damping. Off-centre mass tilts and binds the carrier; PLA posts stick-slip and flex. | 8.2.3 |
| **As built** | Two channels fitted with 22 G needles, capacitors at the motor, band over the carrier, holder screwed to the chassis. | Three-step sequence: deliver, pulse, release. Release is conditional on a droplet having formed. | 8.3 |
| **Tip trials** | 27 G, 25 G, 22 G, 21 G steel and a taped plastic pipette tip on distilled water, on the assembled machine. | Below about 0.26 mm bore the tip streams; above about 0.41 mm it drops. Plastic releases nine of ten small droplets with no sideways departure; 5 microlitres released on plastic. Material hypothesis, two variables uncontrolled. | 8.3.1 |
| **Integrated** | Holder docked on the electronics bay of the V3 chassis, three screws; 450 mm lines bridged over the drive rack; four or five reprints for the holder's own features. | The chassis interface was right first time; the reprints were for the cradle, edges and weight clearance. Free-hanging lines are acceptable on the prototype only. | 11.3 |
| **Validated** | Forty-tube, five-rack, two-reagent run with 22 G on both channels, dyed solutions. | Droplets consistently inside 5 mm; three partial wettings on the rack; regime held across the protocol; flat tube caps cause off-centre doses through the open-loop axis, not through the nozzle. | 12.3, 12.5 |

---

## Media

All nozzle media are web-sized copies under the site's shared media folder,
`assets/media/nozzle/` and `assets/media/video/`, referenced from the subpage
with `../../assets/media/...` paths.

| File | Shows | Thesis figure |
|------|-------|---------------|
| `nozzle/mounted-front.jpg` | The holder fixed to the chassis above the electronics bay, two screws visible, two channels arriving at their Luer hubs. Hero image. | 11.3, figure a |
| `nozzle/as-built.jpg` | The module as built on the alignment chassis: two 22 G needles seated, Luer-to-barb adapters and junction tubes, motor in its cradle with the tape-wrapped mass and suppression capacitors, elastic band at right. | 8.3, as-built figure |
| `nozzle/lines-over-rack.jpg` | From above and behind: the dispense lines leaving the pump heads and crossing the toothed drive rack to reach the hubs. | 11.3, figure b |
| `nozzle/needle-assortment.jpg` | The blunt-needle assortment the module was built around: different cannula bores, one moulded hub profile. | 8.2.1, seat figure a |
| `nozzle/carrier-top.png` | CAD render of the carrier from above: six keyed hub seats, the motor cradle, the guide posts beneath. | 8.2.2, carrier figure a |
| `nozzle/holder-vibr-top.png` | CAD render of the carrier seated in the holder, from above. | 8.2.2, carrier figure c |
| `nozzle/holder-vibr-bottom.png` | CAD render of the assembled carrier and holder from below: cannula clearance bores. | 8.2.2, carrier figure d |
| `nozzle/carrier-in-holder-top.png` | Closer CAD crop of the carrier in the holder from above. | 8.2.2, carrier figure c (crop) |
| `video/droplet-slowmo.mp4` + `droplet-slowmo-poster.jpg` | Slow-motion clip of a droplet leaving a tip. | not a thesis figure |

The CAD renders predate the retaining bands: the two cross-drilled holes exist
only on the physical part (8.2.2).

*Design iterations will continue to be documented here.*
