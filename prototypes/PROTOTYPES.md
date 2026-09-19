# Prototype Tracker

Single source of truth for every physical prototype across all hardware modules:
what it is, the design parameters used to make it, and where its test data lives.

This is the **shallow / few-token layer** — scan this table to know what exists.
Open a `proto-NN-*/PROTOTYPE.md` only when you need the deep detail.

## How this is organised

- **Modules:** Each hardware module has its own folder under `prototypes/`:
  `prototypes/Prototype-N-<Module-Name>/`
- **Naming:** number + descriptive slug — `proto-NN-<descriptor>` (e.g.
  `proto-01-5ul-4roller`).
- **One folder per prototype:** `prototypes/Prototype-N-<Module>/proto-NN-<slug>/PROTOTYPE.md`
  — with one exception: the **alignment module** keeps its `PROTOTYPE.md` and its page at
  **module root**, because its versions (V2, V2.1) are iterations of one machine rather
  than a streak of separately-numbered builds. Each module's table below may also carry its
  own column set; the schemas are deliberately allowed to differ.
- **One page per prototype:** an `index.html` sits beside each `PROTOTYPE.md`, linked from
  its card on the [Prototype Design Space](index.html) journey.
- **Design lives here** (this `02. Tools` repo) because prototypes are *born*
  here — designed with the **peristaltic roller displaced-volume solver** and
  the **rotor solver**.
- **Test data lives in `03. CODING`** under `lab-data/phase-*/SESSION.md`.
  Each `PROTOTYPE.md` links **forward** to its sessions; each `SESSION.md`
  links **back** to the prototype.
- **The loop:** design (here) → test (`03. CODING`) → redesign appears as a new
  version block in the *same* `PROTOTYPE.md`. The prototype file is the thread
  that runs through the whole circular process.
- **Discussions** use `/gsd:thread` — design debates here, test/runner debates
  in `03. CODING`.

---

## Prototype-1-Pump-Module

| ID | Slug | Status | µL/stroke (target → measured) | Test data | Notes |
|----|------|--------|-------------------------------|-----------|-------|
| 01 | proto-01-5ul-4roller | Built, redesign pending | 5.0 → ≈3.4 (grav) | `03. CODING` (see PROTOTYPE-INDEX.md) | Under-dispenses ~32%; flow + gravimetric, see REPORT.md |
| 02 | proto-02-5ul-4roller-v2 | **v2.3 TESTED ✅** (2026-07-23) | 5.0 → **4.56 (grav, −8.9 %)** — linear, calibratable | `proto-02.../Tests/` + `TEST-RESULTS.md` | v2.1 didn't seal; v2.2 rotor validated (2R=39.40) + head 0.23 loose → ring calibration → print model v2; v2.3 gap 1.52 measured/concentric, 76-rep gravimetric campaign: best precision @180 rpm, 100-stroke CV 0.25 % (< pipette 0.27 %), single-stroke CV ≤~6 % bounded. Method: TEST-PROTOCOL.md (ISO 23783-2-adapted) |

<!-- Add a row per pump prototype. Keep newest at the bottom. -->

### Architecture studies (not part of the proto-NN streak)

| Study | Folder | Status | Decides |
|-------|--------|--------|---------|
| Multi-liquid architecture | `multi-liquid-architecture/` | Provisional decision (A family: one motor per pump — A1 build-first, A2 upgrade), pending tests U3/U6 | Scaling to 5–6 liquids across 4 concepts: A1 (shared step bus) / A2 (independent control) / B (shared motor + pinch) / C (shared motor + engage). A1/A2 = 74–75 %, B/C = 58–59 %. Feeds future proto-04. |
| System architecture (control electronics) | `System-Architecture/` | Exploring — live cost/complexity matrix promoted to a first-class tool | Which MCU, stepper driver, and system bus for the pump-controller electronics, at what price/complexity. Interactive matrix + reasoning now live at the [System Architecture Explorer](../tools/system-architecture-explorer/index.html) (`tools/`); this folder keeps the three decision records (ARCHITECTURE.md, PUMP-CONTROL-CONCEPTS.md, SOLUTION-MATRIX.md) as design documentation. |

---

## Prototype-2-Alignment-Module

The stage that hosts the sample rack and indexes each tube under the dispensing nozzle —
it moves the samples, not the dispensing head.

> **Where the detail lives:** at **module root**, not in a `proto-NN-<slug>/` subfolder.
> Both versions below are documented in the single
> `Prototype-2-Alignment-Module/PROTOTYPE.md`, and the page is
> `Prototype-2-Alignment-Module/index.html`. Do not go looking for a `proto-03-*/` folder —
> there isn't one. Versions are numbered in this module's own V2 / V2.1 scheme.

| ID | Slug | Status | Key result | Notes |
|----|------|--------|------------|-------|
| V2 | *(module root)* | Built ✅ (2026-06-25) | Indexes one rack at a time, reliably | Rack-and-pinion stage, 28BYJ-48 geared stepper through a Ø12.80 mm pinion. Gravity-protected layout — motor and pusher mounted above the rail so spills cannot reach the drive train. Open-loop: no position reference, so the carriage had to be placed by hand at power-up |
| V2.1 | *(module root)* | **Built ✅ (2026-07-30) · bench-validated ✅ (2026-07-31)** | Repeatable zero **no worse than ~0.03 mm**; 132 mm home in **22 s** (was 110 s), no step loss; **102.0 half-steps/mm** confirmed by measurement | Adds an SPDT roller-lever homing microswitch at the left end of the rail, wired fail-safe (a severed wire reads as *at endstop*), plus a three-pass homing sequence — fast approach, 3.9 mm back-off, slow re-approach that alone sets the zero. Driven through an I²C port expander using zero controller GPIO; verified not to disturb the liquid-level sensor sharing the bus. ⚠ **One unmet pass criterion:** usable stroke ~140 mm against the 154 mm the 8-position pattern needs — six moves run cleanly, a seventh would push the rack off the pinion. Mechanical redesign to >170 mm stroke is the V3 priority. Axis 2 has never been wired |
| V3 | `v3-two-axis-chassis/` (subpage under module root) | **Built, run on the assembled instrument** (thesis ch. 7 sec. 7.4, ch. 12 sec. 12.3 and 12.4) | Two-axis chassis about 500 mm long, **309 mm** active stroke (closes the V2.1 stroke shortfall); **five racks, 40 tubes** per batch; an unattended 40-tube two-reagent run hit **all 40 tubes** within the 5 mm landing tolerance, three droplets partly on the rack or lane | Three dovetail-keyed printed sections, about 8 h print each, only two full-scale builds. Axis 1 indexes the lane in 22 mm steps; axis 2 pushes the whole input queue on two legs. Both axes: 28BYJ-48, 16-tooth pinion, printed involute rack, own microswitch with the V2.1 fail-safe loop and three-pass homing. Motorless fishbone-cam ejection into an output tray 1 mm below the lane. Electronics bay between the trays; dovetail sockets and a nozzle boss make the chassis the machine's structural foundation. Known failure mode: a lid pushed flat to 180 degrees rubs the 45 degree chamfered lane wall, the open-loop axis loses steps and the dose lands beside the tube; fold caps to 135 degrees. On the 12 V battery the machine ran two racks (16 samples) before the pumps stalled together. No V3-specific bench numbers are published; axis 2 still has none |

<!-- Add a row per alignment prototype version. Keep newest at the bottom. -->

---

## Prototype-3-Nozzle-Module

Six blunt dispensing needles in a fixed line above the sample rail, one dedicated path per
reagent, released by a vibration burst. Placement, not metering: every droplet must land within
5 mm of its target from under 5 cm.

> **Where the detail lives:** at **module root**, like the alignment module. The record is
> `Prototype-3-Nozzle-Module/PROTOTYPE.md` and the page is `Prototype-3-Nozzle-Module/index.html`.
> The thesis assigns no version numbers or build dates to this module; the record uses stage
> names. Media for this module live under `assets/media/nozzle/` and `assets/media/video/`.

| ID | Slug | Status | Key result | Notes |
|----|------|--------|------------|-------|
| nozzle | *(module root)* | Rebuilt, integrated, system-validated (two of six channels) | Droplets consistently inside the 5 mm landing tolerance over a forty-tube run; three partial wettings on the rack; tip bore decides the regime: below about 0.26 mm the tip streams and there is nothing to release, from 0.41 mm (22 G) a droplet forms and drops | Concept inherited from the companion thesis (blunt needles plus vibration release), received inoperative and without a chassis mount. Rebuilt around the needle's moulded hub (printed negative-imprint seat, exact slip fit first print, toolless swap of any gauge), one Luer-to-barb fitting per channel, a magnet plus three steel nuts as the eccentric mass on an RD520PA 3 V motor (5 V bus, IRF520, duty capped near 60 %), six seats at 22 mm pitch on vertical guide posts, two elastic bands to stop the carrier walking off its posts. Holder docks on the electronics bay of the V3 chassis with three screws; 450 mm lines bridge the drive rack. Open: polymer tapered tip on the same Luer seat (plastic released nine of ten small droplets and a 5 microlitre dose, hypothesis only, tips were taped), centre the eccentric mass, metal guide posts, Luer adapter specification unconfirmed |

<!-- Add a row per nozzle stage if the module is versioned later. Keep newest at the bottom. -->

---

## Test results contract (cross-repo)

Each prototype is judged by a **per-prototype test plan** declared in its
`PROTOTYPE.md` (setpoint grid + pass targets). The schema for that plan is being
designed — see `.planning/notes/2026-06-15-prototype-test-schema-decision.md`
(candidate for its own phase).

Flow: **design declares targets (here) → run + analyze (`03. CODING`) → emit
structured report (`03. CODING`) → distilled snapshot copied back into the
prototype folder here.** The `03. CODING` side has a contact point at its
`PROTOTYPE-INDEX.md` and is **waiting on the schema decision** before emitting
reports.
