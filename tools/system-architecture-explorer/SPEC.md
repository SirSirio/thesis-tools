# System Architecture Explorer — Tool Spec

**Tool:** System Architecture Explorer
**File:** `tools/system-architecture-explorer/index.html`
**Status:** Live — cost/complexity matrix + pin-budget engine + live SVG diagram (Phase 6)

---

## Purpose

Prices and compares the pump-system control electronics — which brain (MCU), which stepper
driver, and which system bus — across 25 candidate architectures ("variants"). For each variant
it computes: total cost (editable component prices, live), a design-complexity rating, a
pin-budget feasibility check against the brain's usable GPIO, and a live SVG system diagram
showing the three communication layers and the power block. It is the promoted, canonical version
of the cost/complexity matrix originally built in `prototypes/System-Architecture/index.html`
(D-08) — the tool's inline `<script>` is now the single source of truth for this data model.

---

## Whole-device module schema (Part 1 — D-01/D-02/D-03/D-04/D-05)

Above the cost/complexity matrix, the tool draws a static SVG (`buildSchema()`) of the six
hardware modules that make up the whole device — the **hardware-requirements baseline** (D-04)
this tool's variants must satisfy, not itself a variant or a design decision. Spatial layout in
the diagram carries no meaning; only the drawn connectivity does (D-05).

| Module | Hardware payload | Purpose |
|---|---|---|
| **Pump** | 6× NEMA17 42BYGHW811, 6× peristaltic pumps | Meters each liquid by roller displacement. |
| **Alignment** | 2× 28BYJ-48 12V, 2× ULN2003, custom rack | Moves the sample racks under the nozzles. The custom rack lives in this module — the old, separately-imagined tube-holding module no longer exists as a distinct module. |
| **Nozzle** | 3V micro motor (RD520PA), IRF520 + flyback diode, eccentric mass (DIY) | Holds the nozzles and shakes droplets loose in short bursts. |
| **Storage** | 6× containers, MPR121 ×12 electrodes | Holds the liquids; senses level by level-crossing / threshold detection, not continuous volume (see New components below for the unverified container-material precondition). |
| **UI** | ILI9341 3.2" touch, SD slot, LM75 | Runs the GUI; the dispensing protocol is set on a laptop and loaded from the SD card. Carries the D-17 temperature note (below). |
| **Software & Electronics** | ESP32-class brain, system bus (I²C/RS-485/CAN), stepper drivers ×6 | The brain and bus this tool's matrix compares — drawn enclosed by a liquid-glass barrier as the sealed dry zone. |

**Connectivity** (the only thing spatial position in the diagram encodes): a solid liquid-flow
path **Storage → Pump → Nozzle → Alignment**, and a dashed data-flow link from **Software &
Electronics to every other module**. The Software & Electronics module is drawn inside a
liquid-glass-styled barrier — the design intent that this module is the sealed dry zone the other
five modules' liquid path must never breach.

**Flow encoding.** Colour is named by meaning in `buildSchema()` (`liq` / `dat`), not written as
loose hex values:

| Flow | Colour | Line | Arrow |
|---|---|---|---|
| Liquid | blue `#4a90d9` | solid, 2.6 wide | filled triangle |
| Data | green `#3ec06b` | dashed `5 4`, 1.3 wide | open chevron |

Liquid is blue to match the liquid-glass barrier and its `liquidGlass` gradient, which were already
blue — one colour means "liquid" everywhere in the schema. Colour is the *secondary* cue: weight,
dash pattern and arrowhead each carry the distinction independently, so the diagram still reads in
greyscale.

**No data link may pass through a module box.** Because connectivity is the only thing the layout
encodes, a data line crossing a box reads as "routes through it". Alignment sits directly between
Electronics and the Pump/Nozzle boxes, so those two links touch down on their targets' **outer
bottom corners** rather than their centres (x=330 is exactly Alignment's left edge; x=540 is inside
it), and the anchors fan wide enough to clear Alignment's x-span of 330–550. Re-check this
invariant if `LAYOUT` changes.

Hover, click, or keyboard-focus (Tab + Enter/Space) any module box to reveal its full payload and
purpose text in the adjacent note panel — `selectModule()`/`wireSchemaInteractivity()` in the
script, mirroring the matrix's existing "one function, several writers" state pattern.

**D-17 temperature note.** The UI module documents one future software hook, no hardware, no cost
impact, no modelling: viscosity dominates a liquid's temperature sensitivity near room temperature
(water ≈2–2.5%/°C — ≈1.00 mPa·s at 20°C → ≈0.89 mPa·s at 25°C), while liquid thermal expansion is
a much smaller secondary effect (≈0.02–0.04%/°C). Confidence: **High** (established physical
constants). This is why the note leads with viscosity even though the originally-raised concern
was volume expansion — dispensing-accuracy compensation from temperature would need to correct for
flow-rate-through-viscosity change, not container-volume change.

---

## Part 5 — Architecture Decision & Recommendation (thesis synthesis)

A static, prose-and-table section at the bottom of the page (`id="decision"`, after the
selected-variant diagram, before `</main>`) that synthesises this tool and the Dispense Throughput
Simulator into a single recommendation written to be copied into the thesis. It is **narrative, not
computed** — the numbers are quoted from the two tools' engines, not re-derived live — so its
figures must be re-checked whenever a `DEFAULTS` price, a BOM, `pinsOf()`, or the simulator's model
changes.

Structure (each an `.dec-block`; styles scoped under `#decision`):

1. **Decision framework & fixed premises** — the three settled givens: portable single-enclosure →
   I²C bus; priorities ordered feasibility > cost > run-time; shared step rate (volumes metered by
   step count, no independent-rate control needed).
2. **Step 1 — Concurrency** — PANPOC throughput table (K=1 399.3 s, K=2 245.2 s / −38.6 %, K=6
   220.8 s / −44.7 %); K=2 captures ~86 % of the max saving → adopted operating point.
3. **Step 2 — Feasibility** — opens by motivating the **ESP32-class brain** (GPIO + headroom for a
   GUI, plus built-in Wi-Fi/Bluetooth, at low cost) and frames the real question as *single controller
   vs. helper*. Notes the six-driver fan-out is **independent of concurrency** (all six must be
   addressable even at K=2). Pin-fit table: `N2-nano-i2c` 12/16, `P6-rp-i2c` 12/16, `T9-fused-i2c`
   16/16 (zero spare) fit; `S1-i2c` 20/16 and `D2-i2c` 24/16 overrun (screen 8 + SD 1 leave no room to
   fan six dumb drivers off a bare ESP32). States explicitly that overrunning designs are excluded
   from further consideration.
4. **Step 3 — Cost** — sourced-price table (ctrl / whole-system): `N2-nano-i2c` €81.24 / €234.91 (K=2
   baseline) · `SC6-exp-i2c` €92.46 / €237.42 · `SC6-rp-i2c` €93.30 / €238.26 · **`SC6-s3exp-i2c`
   €103.34 / €248.30** · `T9-fused-i2c` €107.71 / €261.38. Carries an **"On the prices" note** (not a
   price-sensitivity caveat): the tool costs
   builds against the project's primary vendor (bitbyg, a Danish reseller — fast shipping, higher unit
   cost) and is reusable by entering cheaper direct-import prices; absolute costs shift with vendor and
   market, but the tool's structure is vendor-independent. It is a general instrument proven on this
   prototype case.
5. **Motion, priming & calibration** — volume = step-count × µL/step (speed-independent); one shared
   trapezoidal ramp for all pumps, brute stop OK (peristaltic self-braking); priming/calibration run
   one pump at a time via per-motor ENABLE, calibration compensated in step count not speed.
6. **Recommendation — presented as two builds:**
   - **Final design: `SC6-s3exp-i2c`** (6-at-once, €103.34 / €248.30). A single **ESP32-S3-Nano**
     brain, no co-processor: all six pumps on one shared STEP/DIR clock with per-pump ENABLE on
     **direct GPIO**, and one MCP23017 I²C expander carrying only the slow alignment motors + homing
     switches. Rationale: shared-clock already makes 6-parallel ~free (SC6-rp ≈ N2-nano ±€3), so the
     goal becomes fewest MCUs + smoothest UI. One MCU deletes an entire inter-processor protocol (the
     biggest firmware cost on a one-person thesis); the S3's larger pin count is what keeps the
     dose-critical ENABLE lines on real GPIO (deterministic + can kill pumps if I²C hangs) instead of
     behind the expander; and its LX7 core + octal PSRAM serve the GUI. Chosen over `SC6-exp-i2c`
     (€237.42, dose-critical ENABLE behind a full 16/16 expander) and `SC6-rp-i2c` (€238.26, two MCUs)
     — the ~€10 premium buys single-firmware simplicity, GPIO-level fault tolerance, and UI headroom.
   - **Prototype build:** DOIT ESP32 (€9.05, bought regardless) + the **two Arduino Nanos already
     in-house**, same shared-clock firmware. Validates the one unproven behaviour — ENABLE-gated dose
     accuracy — on owned hardware; start with just 2 DRV8825s + the 72 W supply since it is a per-pump
     property. Migration to the final design is a board swap (2 Nanos → 1 S3) + firmware port.
   - **Flagged experiment (both builds):** bench-verify ENABLE-gating dose accuracy; secondary:
     confirm the S3-Nano pinout vs the manufacturer diagram (final design is at 20/21).
7. **References** — 11-entry bibliography ([1] this tool · [2] throughput simulator · [3]
   PIN-BUDGET-ANALYSIS · [4] multi-liquid architecture study · [5] ESP32 datasheet · [6] DRV8825 ·
   [7] TMC2209 · [8] NEMA17 42BYGHW811 · [9] Graham 1969, LPT bound · [10] Acarnley, stepper
   pull-in/ramps · [11] bitbyg catalogue).

**Consistency pass (2026-07-20).** Adding Part 5 surfaced page-wide inconsistencies that were then
fixed so Part 5 does not contradict the rest of the tool:
- Part 3's driver/concurrency folds asserted `T9-fused-i2c` is the cheapest row and "full concurrency
  is the cheap end" — true only at the shipped €3.50 TMC placeholder, and it cited the now-infeasible
  `S1-i2c`. Rewritten to the **price-honest, price-independent** claim: a smart driver deletes the
  co-processor (structural fact), but whether it is *cheaper* depends on vendor pricing, and the
  primary vendor stocks no Trinamic driver — so the sourced build is dumb-driver based.
- **GSD `U`-number abbreviations removed from all user-facing prose** (Part 3 "U5 Concurrency Axis"
  fold → "The Concurrency Axis"; the `N2-nano-i2c` variant note's "matches U5=2"), since a thesis
  reader has no way to decode them.
- **Stale integrated-board pin counts corrected**: the `ESPINT-*` variant notes and a `pinsOf()`
  comment claimed "9 free IO" for the ESP32-2432S024; the audited figure is **3**, and both fused
  integrated-board variants overrun — the notes now say so. Nano-node notes updated `/15`→`/16` to
  match the audited `esp32.gpioUsable = 16`.

---

## Design directions (D-06/D-07/D-08/D-09/D-10)

Between the module schema and the theory section, a four-card gallery groups the 25 variants into
four curated "device personalities." Each direction is **derived**, not stored — `directionOf(v)`
classifies a variant from its existing `topoClassOf(v)` (fused/satellite/distributed/printer) and
`intBrainKey(v)` (integrated-screen board or not) fields, so a future variant added to `VARIANTS`
is classified automatically with no new per-variant field to remember to set.

| Direction key | Display name | Derivation | Variant IDs (count) |
|---|---|---|---|
| `modular` | Distributed Modules | `topoClassOf(v) === 'distributed'` | `P6-dist-485`, `P6-dist-can` (2) |
| `allinone` | All-in-One | integrated-screen board AND `topoClassOf(v) === 'fused'` | `ESPINT-fused-i2c`, `ESPINT-dumb-i2c` (2) |
| `console` | Console | discrete screen AND `topoClassOf(v) === 'fused'` | `S1-i2c`, `S1-485`, `D2-i2c`, `D2-485`, `SC6-exp-i2c`, `SC6-s3exp-i2c`, `T9-fused-i2c`, `T9-fused-485`, `T51-485`, `T51-72-485` (10) |
| `panelnode` | Panel + Node | everything else (`satellite` or `printer` topology) | `N2-nano-i2c`, `N2-nano-485`, `P6-rp-i2c`, `P6-rp-485`, `P6-stm-485`, `SC6-rp-i2c`, `T9-node-485`, `ESPINT32-brain-i2c`, `B-ramps-drv`, `B-skr-drv`, `B-skr-tmc` (11) |

2 + 2 + 10 + 11 = 25 — every variant resolves to exactly one direction, no unclassified bucket.
`directionOf(v)` checks `distributed` first in an ordered if-chain (mirroring `topoClassOf(v)`'s
own shape) so it can never be shadowed by the fused-vs-not-fused branches below it.

The `DIRECTIONS` object (name, colour class, one-sentence copy) is the single vocabulary shared by
three surfaces (D-10): the gallery cards (`renderDirections()`), the matrix's 2nd column ("Design
type", a sortable, colour-coded `directionPill(v)` chip immediately after ID), and a shared
`selectedDirection` filter driven by both the gallery cards and a `#fDir` dropdown — the same
"one state variable, several writers" shape the matrix's other filters already use.

---

## Confidence-tag legend (D-11)

Every sourced fact in this tool — component prices, pin counts, RAM/PSRAM specs — carries one of
three confidence tags, applied to the *specific claim*, not the source wholesale (a vendor page
can state two contradictory things in the same listing; see the screen open question below):

| Tag | Meaning |
|-----|---------|
| **High** | Vendor product page or datasheet states the fact directly |
| **Medium** | Reputable secondary source (tutorial site, cross-checked across ≥2 sources) or a near-identical variant/part family |
| **Low** | Estimate, forum figure, or unsourced assumption |

A computed readout (e.g. the "Pins free" column) shows the **worst** (lowest) confidence of any
input that fed it — `worstConf()` in the script — so a number never looks more certain than its
weakest source (this mirrors 06-RESEARCH.md's Pitfall 1).

---

## Component price table

Rendered live in the "Component unit prices" section (`#compTable`), editable per-row (typing a
€ or DKK value updates `COMP[k].eur` and persists to localStorage). Defaults below are the
`DEFAULTS` object's shipped values. DKK→EUR conversion rate defaults to **0.134** (editable).

The section is a **collapsible fold** (`<details id="pricesFold" class="sae-fold">`), **closed by
default** — 26 rows of reference data that every cost on the page already reflects, opened to audit
or edit rather than read top-to-bottom. `renderComps()` still runs at init regardless of the fold's
state, so the table is fully populated the instant it opens and no cost math depends on it being
visible.

Prices were sourced against the **bitbyg.dk catalogue on 2026-07-16** (D-07/D-11 default vendor).
DKK figures are the vendor's listed incl.-VAT prices; € = DKK × 0.134.

| Component | Role | Default € | Source | Confidence |
|---|---|:--:|---|:--:|
| ESP32 dev board | brain / fused controller | 9.05 | bitbyg "DOIT ESP32 30P IOT Mainboard", 67.50 DKK | **High** |
| ESP32-S3-Nano (ESP32-S3R8) | brain / single-MCU controller | 19.93 | bitbyg "ESP32-S3-Nano Development Board", 148.75 DKK — LX7, 8 MB octal PSRAM, ~21 usable GPIO | **High** (price); GPIO count Medium |
| RP2040 (Pico) | 6-parallel node (PIO) | 4.0 | ⚠ **NOT STOCKED** at bitbyg — no bare Pico/RP2040 board (nearest: LiLyGo T-PicoC3 123.75 DKK, a different RP2040+ESP32-C3 combo). Unsourced estimate | Low |
| STM32 Blue Pill | 6-parallel node (timers) | 13.23 | bitbyg "STM32F103C8T6 ARM STM32 System Development Board", 98.75 DKK | **High** |
| Arduino Pro-Mini | per-pump node | 7.37 | bitbyg "Pro Mini 5V", 55.00 DKK (3.3V same price) | **High** |
| Arduino Nano | alignment / small node | 8.71 | bitbyg "Nano V3.0 ATmega328 16M 5V CH340G", 65.00 DKK | **High** |
| ESP32-2432S024 (2.4" integrated LVGL touch) | brain + screen, one part | 24.62 | bitbyg, 183.75 DKK resistive (198.75 DKK capacitive) — resolution/touch chip not stated | **High** |
| ESP32-2432S032R (3.2" integrated ST7789 touch) | brain + screen, one part | 16.0 | Sunton "CYD v2", 3.2" 240×320 + XPT2046 resistive touch — ~€13–18 AliExpress, NOT stocked at bitbyg | Low |
| DRV8825 | dumb driver (STEP/DIR) | 6.87 | bitbyg "DRV8825 stepmotor driver", 51.25 DKK — ~4.5× the generic estimate previously assumed | **High** |
| TMC2209 | smart driver (UART) | 3.5 | ⚠ **NOT STOCKED** at bitbyg — catalogue carries **no Trinamic TMC drivers at all**. Unsourced estimate | Low |
| TMC5160 | motion driver (SPI) | 12.0 | ⚠ **NOT STOCKED** at bitbyg — no TMC drivers. Unsourced estimate | Low |
| TMC5072 dual-axis | 2 motors/chip (SPI) | 14.0 | ⚠ **NOT STOCKED** at bitbyg — no TMC drivers. Unsourced estimate | Low |
| MAX485 module | RS-485 transceiver / node | 2.51 | bitbyg "TTL til RS-485 Modul", 18.75 DKK | **High** |
| MCP2515 module | CAN transceiver / node | 8.21 | bitbyg "MCP2515 CAN Bus Modul TJA1050 SPI", 61.25 DKK | **High** |
| BTT SKR / Octopus | 32-bit printer board | 30.0 | ⚠ **NOT STOCKED** at bitbyg — no BigTreeTech 32-bit boards. Unsourced estimate | Low |
| Mega2560 + RAMPS | printer board bundle | 36.52 | bitbyg bundle: "ArduinoTech MEGA2560 R3" 173.75 + "Ramper 1.6 Kontroltavle" 98.75 = 272.50 DKK | **High** |
| Driver carrier PCB | 6 driver sockets | 4.0 | ⚠ **NOT STOCKED** at bitbyg — no CNC shield / multi-driver carrier. Unsourced estimate (or fabricate custom) | Low |
| PSU 24V ~60W | 1–2 motors at once | 18.26 | bitbyg "24V 3A Transformer 72W", 136.25 DKK — 72 W not 60 W, near-equivalent substitution | Medium |
| PSU 24V ~150W | all-6 at once | 31.66 | bitbyg "12V-24V 200W-600W" PSU from 236.25 DKK (200 W variant) — nearest ≥150 W, near-equivalent | Medium |
| MCP23017 I²C I/O expander | 16 I/O for 0 brain pins | 6.53 | bitbyg "MCP23017, 16-Bit I/O Expander med I2C Interface", 48.75 DKK — in stock (verified 2026-07-21) | **High** |
| **Shared block (constant, all variants when "whole-system" toggled on):** | | | | |
| Micro switch, roller lever ×2 | rack homing endstops | 2.01 (×2) | bitbyg "Micro Switch med Rulle", 15.00 DKK. SPDT, 1 MCU pin each. Plain-lever version (10.00 DKK) is electrically identical; roller chosen for wear under repeated rack strikes | **High** |
| ILI9341 3.2" touch screen (owned) | screen | 23.32 | bitbyg, 174 DKK — inspected, confirmed SPI (8 pins) | **High** |
| NEMA17 pump stepper ×6 | pump motor | 14.41 (×6) | bitbyg "Steppermotor NEMA17 42BYGHW811", 107.50 DKK — cheapest stocked (others 116–161 DKK) | **High** |
| 28BYJ-48 12V + ULN2003 ×2 | alignment motor ×2 | 5.86 (×2) | bitbyg bundle: 28BYJ-48 25.00 + "Stepmotor Driver Board ULN2003" 18.75 = 43.75 DKK — 12V winding is the researched choice (D-15) | **High** |
| 3V micro motor (RD520PA) | nozzle vibration motor | 2.35 | bitbyg, 17.50 DKK — ⚠ no datasheet locatable; rated/stall current unsourced (price is High, the electrical rating is not — see New components below) | **High** |
| IRF520 MOSFET driver module | vibration motor PWM switch | 1.84 | bitbyg, 13.75 DKK — ⚠ not a logic-level MOSFET; gate-drive from 3.3V GPIO needs verification (see New components below) | **High** |
| MPR121 capacitive touch controller | storage level sensing ×6 | 6.37 | bitbyg, 47.50 DKK — chip facts High; the level-crossing *application* is Medium (see New components below) | **High** |
| LM2596 adjustable buck (→12V) | 24V → 12V alignment rail | 3.18 | bitbyg, 23.75 DKK | **High** |
| 5V/5A synchronous buck | 24V → 5V logic rail | 5.70 | bitbyg, 42.50 DKK | **High** |

**17 of 26 components are now High-confidence, directly sourced from bitbyg listings.** Two PSUs
are Medium (nearest stocked wattage, not exact). Seven components are **not stocked by bitbyg** and
retain unsourced estimates — flagged inline in the tool's Source column with a ⚠ marker:

- **No Trinamic TMC driver of any kind** is in bitbyg's catalogue. This affects every *smart*
  (TMC2209) and *motion* (TMC5160/TMC5072) variant — a large share of the matrix — so those rows
  cost out against unsourced prices and need a second vendor before they can be trusted or ordered.
- **No bare RP2040/Pico**, **no BigTreeTech SKR/Octopus**, and **no CNC-shield/driver carrier**.
- **No bare ESP32-2432S032R (3.2" integrated board)** at bitbyg either — sourced from a hobbyist
  teardown site (Sunton/mischianti), not the default vendor, despite High-confidence pin data.

The alignment-motor-#2 placeholder that previously occupied this table is resolved: the alignment
module uses **2× 28BYJ-48**, both priced from the same bitbyg listing, not a second unsourced part.

### New components — unresolved risks (D-13/D-14/D-15/D-16)

The five new shared-block components above (`vibMotor`, `vibDriver`, `capTouch`, `buck12`,
`buck5`) all carry **High** price confidence — real bitbyg listing prices — but three of them
carry a real, unresolved technical risk that the price tag does not cover:

- **RD520PA (vibration motor) — unsourced current rating.** No datasheet is locatable for this
  exact part number; its rated/stall current is not stated anywhere. Any current figure used
  elsewhere in this spec (see Power-rail model below) is an **estimate pending measurement** once
  the part is ordered. Tag: **Low** for the electrical rating specifically — the €2.35 price
  itself remains High.
- **IRF520 (vibration-motor driver) — not a logic-level MOSFET.** Its gate-drive adequacy from the
  ESP32's 3.3V GPIO is unverified; a logic-level MOSFET or a BC547/2N2222-class NPN transistor is
  the documented fallback if bench testing shows it does not switch cleanly. A flyback diode
  (1N5819-class) across the motor is **mandatory, not optional** — PWM-switching an inductive
  motor without one destroys the MOSFET within a few cycles. Tag: **Medium**.
- **MPR121 (storage level sensing) — chip facts vs. application.** The chip identification itself
  is **High** confidence: MPR121, 12 electrodes (≥ 6 containers needed), I²C at address 0x5A (no
  collision with the LM75's 0x48), 2.5–3.6V supply (runs off the ESP32's 3V3 pin, not
  5V-tolerant). The **application** — repurposing a capacitive touch/proximity controller for
  through-wall liquid **level-crossing** detection — is a separate claim: a **Medium-confidence
  technique with an unverified precondition**. It requires **non-conductive (plastic/glass)
  containers**, and the storage containers' actual material is not stated anywhere in the project
  (RESEARCH Assumption A4). Risk if wrong is **High** — metal containers would make the whole
  capacitive-sensing approach infeasible, not just less accurate. Capacitive level sensing is
  **not** documented here as a validated capability; it is a technique pending a
  container-material confirmation (see Open questions below).

---

Sourcing revealed that bitbyg's real prices run substantially above the generic hobby-class
estimates the tool originally shipped (DRV8825 €1.5 → €6.87; NEMA17 €6 → €14.41; MAX485 €0.7 →
€2.51). **Absolute costs therefore rose sharply across every variant**; the relative ranking between
architectures is the more durable output. Vendor listings change without notice — re-check before
ordering.

Prices are editable in the running tool; edits, pasted source links and the DKK→EUR rate persist
to localStorage (see Persistence below). Reset restores all `DEFAULTS`, clears the user's
provenance, resets the live rate, and removes the persisted keys.

### Price provenance (D-11)

A price and its confidence tag are one claim, so they move together. `provenanceOf(k)` is the
single place that decides both, and it is **derived, never stored** — typing a price back to its
shipped value restores the shipped tag with no sticky "edited" flag left behind.

| State | Trigger | Confidence | Source shown | Date |
|---|---|:--:|---|---|
| `shipped` | untouched | the `DEFAULTS` tag | the bitbyg vendor link | `PRICES_SOURCED_ON` (2026-07-16), tagged *bitbyg* |
| `user-estimate` | price edited, no link | **Low** | "Your estimate — no source given" | edit date, tagged *you* |
| `user-sourced` | a valid `https?://` link pasted | **High** | "Your source — manually verified", link clickable | edit/paste date, tagged *you* |

Rationale: a price the user changed is no longer the vendor's claim, so it drops to Low **and the
now-lying vendor link is dropped with it**; pasting a real link raises it to High because a manual
search is exactly what High means under this tool's own definition. Before this existed, editing a
price left the bitbyg link and its green High pill untouched — vouching for a number bitbyg never
quoted — and `worstConf()` propagated that fake High into the computed readouts.

Per-component user state lives in a `USER` side-car (`{url, editedOn}`), not inside `COMP`, so
`COMP` stays a clean deep-copy of `DEFAULTS` and "has the user touched this?" is never ambiguous.
Rows carry a `data-prov` attribute driving a coloured left edge (amber = your estimate, green =
your source), so ownership is visible while scanning, not only when reading the pill.

---

## Brain / MCU specs (RAM, PSRAM, GPIO, UI fluidity — D-12)

Every brain-class `DEFAULTS` entry carries `gpioUsable` (+ confidence), `ram`, `psram` (+
confidence), and a `uiNote` describing GUI-fluidity implications:

| Brain | Usable GPIO | Confidence | RAM | PSRAM | UI-fluidity note |
|---|:--:|:--:|---|---|---|
| ESP32 dev board (DOIT 30-pin) | 16 | **High** | 520 KB SRAM | None | No PSRAM: single-buffered, redraw-on-demand UI is comfortable; full-screen animated transitions are tight. Audited 2026-07-20 (§7) |
| **ESP32-S3-Nano (ESP32-S3R8)** | **21** | Medium | 512 KB SRAM | **8 MB octal** | Best brain here for a smooth GUI — faster LX7 core for LVGL compositing + fast octal PSRAM for buffers/assets. 22 header pins − A2/GPIO3 strapping ≈ 21; octal-PSRAM pins (33–37) and USB (19/20) are off-header, so PSRAM costs 0 header pins. ⚠ vendor-stated, not datasheet-audited — verify vs Waveshare pinout (final design sits at 20/21) |
| RP2040 (Pico) | 26 | Medium | 264 KB SRAM | None | Pump-node co-processor only; never drives the screen — RAM is not a GUI concern here |
| STM32 Blue Pill | 30 | Medium | 20 KB SRAM | None | 20 KB is tight beyond step generation, but this MCU never drives the screen — non-issue for GUI fluidity |
| Arduino Pro-Mini | 18 | Medium | 2 KB SRAM | None | Not a brain candidate — per-pump-node role only, never drives the screen |
| Arduino Nano | 18 | Medium | 2 KB SRAM | None | Alignment node, or a ≤2-concurrent DRV8825 pump node (`N2-nano-*`, capped by its 2 hardware timers) — never drives the screen |
| ESP32-2432S024 (2.4" integrated) | 3 | **High** | 520 KB SRAM | None (32 Mbit flash) | Only 3 free GPIO (21, 22, 35 — 35 input-only, 21 backlight) after the onboard display/touch/SD; corrected 2026-07-20 from an erroneous 9. Integrated display costs 0 extra Layer-A pins (no second screen). Like the 3.2" board, realistically a pure brain over I²C only — cannot fuse pump control |
| ESP32-2432S032R (3.2" integrated) | 3 | **High** | 520 KB SRAM | None (4 MB flash) | Only 3 free GPIO (22, 27, 35-input-only) after the onboard display/touch/SD. Can ONLY be a pure brain over a 2-pin I²C bus to a separate pump controller — cannot fuse pump control. Same 240×320 as the owned screen; ST7789 not ILI9341 (cosmetic under LVGL) |

**Framebuffer arithmetic (once, per 06-RESEARCH.md):** 320×240 @ 16-bit colour ≈ 150 KB; a
full-frame double-buffer needs ~300 KB. Base ESP32's 520 KB SRAM fits one 150 KB framebuffer
comfortably alongside application logic, but a double-buffer is tight once WiFi/BT stack overhead
is accounted for — hence "single-buffered comfortable, animated double-buffer tight," stated once
here rather than re-derived per brain row. WROVER-class boards with 8 MB PSRAM (not currently a
`DEFAULTS` entry, see Open Questions) would make this trivial. RP2040 and STM32 never drive the
screen in any current variant, so their small SRAM is explicitly a non-issue for GUI fluidity, not
an oversight.

---

## Variant BOMs (25 total)

Each row: `id` · concurrency (`at once`) · driver · comms bus (Layer B) · Layer C link description
· complexity (★, 1–5 scale, half-stars shown) · BOM (`bom` object, component→qty). Full BOM detail
(qty × unit price × line total) expands on click in the running tool (`bomHtml()`).

| ID | At once | Driver | Bus (B) | C link | Complexity | BOM |
|---|:--:|---|---|---|:--:|---|
| S1-i2c | 1 | DRV8825 | I²C | STEP/DIR shared+EN | ★☆☆☆☆ | esp32, drv8825×6, carrier, psu60 |
| S1-485 | 1 | DRV8825 | RS-485 | STEP/DIR shared+EN | ★★☆☆☆ | esp32, drv8825×6, carrier, psu60, max485×2 |
| D2-i2c | 2 | DRV8825 | I²C | STEP/DIR per-motor | ★★☆☆☆ | esp32, drv8825×6, carrier, psu60 |
| D2-485 | 2 | DRV8825 | RS-485 | STEP/DIR per-motor | ★★☆☆☆ | esp32, drv8825×6, carrier, psu60, max485×2 |
| P6-rp-i2c | 6 | DRV8825 | I²C | STEP/DIR ×6 | ★★★☆☆ | esp32, rp2040, drv8825×6, carrier, psu150 |
| **SC6-rp-i2c** | 6 | DRV8825 | I²C | shared STEP/DIR + 6×EN (on RP2040 node) | ★★★☆☆ | esp32, rp2040, drv8825×6, carrier, psu150 · `absorbsAlign` |
| **SC6-exp-i2c** | 6 | DRV8825 | I²C | shared STEP/DIR + 6×EN via I²C expander | ★★½☆☆ | esp32, gpioExp, drv8825×6, carrier, psu150 · `absorbsAlign` |
| **SC6-s3exp-i2c** | 6 | DRV8825 | I²C | shared STEP/DIR + 6×EN on GPIO, alignment on I²C expander | ★★½☆☆ | esp32s3, gpioExp, drv8825×6, carrier, psu150 · `absorbsAlign` |
| P6-rp-485 | 6 | DRV8825 | RS-485 | STEP/DIR ×6 | ★★★☆☆ | esp32, rp2040, drv8825×6, carrier, psu150, max485×3 |
| P6-stm-485 | 6 | DRV8825 | RS-485 | STEP/DIR ×6 (timers) | ★★★☆☆ | esp32, stm32, drv8825×6, carrier, psu150, max485×3 |
| N2-nano-i2c | 2 | DRV8825 | I²C | STEP/DIR ×6 (on Nano node) | ★★½☆☆ | esp32, nano, drv8825×6, carrier, psu60 |
| N2-nano-485 | 2 | DRV8825 | RS-485 | STEP/DIR ×6 (on Nano node) | ★★½☆☆ | esp32, nano, drv8825×6, carrier, psu60, max485×3 |
| P6-dist-485 | 6 | DRV8825 | RS-485 | STEP/DIR, 1/node | ★★★★½ | esp32, promini×6, drv8825×6, psu150, max485×8 |
| P6-dist-can | 6 | DRV8825 | CAN | STEP/DIR, 1/node | ★★★★½ | esp32, promini×6, drv8825×6, psu150, mcp2515×8 |
| T9-fused-i2c | 6 | TMC2209 | I²C | UART (self-steps) | ★★☆☆☆ | esp32, tmc2209×6, carrier, psu150 |
| T9-fused-485 | 6 | TMC2209 | RS-485 | UART (self-steps) | ★★☆☆☆ | esp32, tmc2209×6, carrier, psu150, max485×2 |
| T9-node-485 | 6 | TMC2209 | RS-485 | UART (self-steps) | ★★★☆☆ | esp32, nano, tmc2209×6, carrier, psu150, max485×3 |
| T51-485 | 6 | TMC5160 | RS-485 | SPI (ramp+pos) | ★★★½☆ | esp32, tmc5160×6, carrier, psu150, max485×2 |
| T51-72-485 | 6 | TMC5072×3 | RS-485 | SPI | ★★★½☆ | esp32, tmc5072×3, carrier, psu150, max485×2 |
| B-ramps-drv | 6 | DRV8825 | USB/UART | STEP/DIR sockets | ★★★½☆ | esp32, ramps, drv8825×6, psu150, max485×2 |
| B-skr-drv | 6 | DRV8825 | USB/UART/CAN | STEP/DIR sockets | ★★★½☆ | esp32, skr, drv8825×6, psu150, max485×2 |
| B-skr-tmc | 6 | TMC2209 | USB/UART/CAN | UART sockets | ★★★½☆ | esp32, skr, tmc2209×6, psu150, max485×2 |
| **ESPINT-fused-i2c** | 6 | TMC2209 | I²C | UART (self-steps) | ★★☆☆☆ | espscreen, tmc2209×6, carrier, psu150 |
| **ESPINT-dumb-i2c** | 1 | DRV8825 | I²C | STEP/DIR shared+EN | ★☆☆☆☆ | espscreen, drv8825×6, carrier, psu60 |
| **ESPINT32-brain-i2c** | 6 | DRV8825 | I²C | STEP/DIR ×6 (on node) | ★★★☆☆ | espscreen32, rp2040, drv8825×6, carrier, psu150 |

The `ESPINT-*` rows are the integrated-screen variants added under D-10. On the corrected pin count
(ESP32-2432S024 = **3** free GPIO, audited 2026-07-20), **neither** `ESPINT-fused-i2c` nor
`ESPINT-dumb-i2c` fits — both overrun, because a 3-free-pin board cannot fuse pump control at all
(the onboard screen has already consumed almost every GPIO). This is the honest result: the 2.4"
and 3.2" integrated boards are viable **only** as a pure brain over a 2-pin I²C bus to a separate
pump node (e.g. `ESPINT32-brain-i2c`, which fits at 3). The earlier "fused smart build fits the 9
free IO" framing was based on the over-estimated 9 and no longer holds.

`ESPINT32-brain-i2c` adds the **3.2" integrated board (ESP32-2432S032R)** — the size/resolution
match to the owned screen. Its defining constraint is **only 3 free GPIO**: it spends 2 on the
I²C bus and has **no pins left to fuse pump control**, so its *only* viable shape is a pure brain
talking I²C to a separate pump node (here an RP2040 driving 6 DRV8825). It fits with **zero** pins
to spare (3 available = 2 I²C + 1 vibration PWM) — the D-13 vibration pin consumes the last free
GPIO, so this variant has no headroom for any further fixed load.
Cost trade-off vs the discrete-screen equivalent `P6-rp-i2c` (bare ESP32 brain + owned ILI9341):
whole-system **€223.21 vs €239.58** — the integrated board saves €16.37, one part, and all Layer-A
wiring; controller-only it reads **€96.88 vs €89.93** (+€6.95) because that view credits no screen
either way, so the integrated board's built-in display is "unpaid for". The board is **not stocked
at bitbyg** (the default vendor) — hence Low sourcing confidence despite High-confidence pin data.
(Recompute these four figures whenever a `DEFAULTS` price or `SHARED_BOM` changes — same trigger
as `PRICES_VERSION`.)

Cost is always `Σ(component € × qty in bom)`, plus the shared block (below) when "include shared
block" is toggled on. Shared-block cost double-counting is guarded for integrated-screen variants
(see Cost-model assumptions).

---

## The three comms layers

Every variant is built from the same three communication links; only their implementation changes
row to row.

The page's Part 3 renders this reasoning as three **collapsible folds** (`.theory-section.sae-fold`),
**closed by default** — the page's spine is Part 1 schema → Part 2 directions gallery → Part 4 matrix, and the
theory is reference material opened on demand. Each fold's prose is written in the `DIRECTIONS`
vocabulary so the funnel stays continuous: Layer A is where **All-in-One** splits from **Console** /
**Panel + Node** (integrated board absorbs the link entirely); Layer B is why **Distributed Modules**
wants RS-485 while single-box directions can use I²C; Layer C is why **Panel + Node** exists at all —
a second board whose only job is generating pulses a dumb driver forces onto the MCU, a bill a smart
driver deletes.

**Layer A — brain ↔ screen.** The touchscreen is a fixed, owned component: an ILI9341 3.2"
resistive-touch TFT (bitbyg, 174 DKK ≈ €23) wired **SPI, 8 pins** — owned board physically
inspected and confirmed on 2026-07-15 (D-09). Because it must render a GUI, the brain is
ESP32-class in every variant. This link is not a per-variant field and **no longer a control**:
`interfaceMode` is a `const 'spi'`. It is either that fixed scenario (external ILI9341) or
entirely absorbed by an integrated `espscreen` board (Layer A drawn as skipped in the diagram for
those variants). The 13-pin 8-bit-parallel figure survives only in `SCREEN_PINS`/`INTERFACE_CONF`
so the written counterfactual below stays checkable against a real number.

**Layer B — the system bus.** How the brain talks to the other modules (pump controller,
alignment node) is a genuinely open choice: **I²C**, **RS-485**, or **CAN**. I²C only makes sense
for a few nodes sharing one small enclosure; **RS-485 is the recommended default** — differential,
ignores motor EMI, ~€0.70/node, unchanged from 2 to 8 nodes; CAN earns its extra cost only with
many nodes and a real need for fault tolerance. The matrix's `Bus (B)` column and the diagram's
Layer-B label show this choice with the variant's real node count.

**Layer C — pump-controller ↔ drivers.** How the controller talks to the six stepper drivers is
set entirely by the driver family: bare STEP/DIR wires for a dumb driver (DRV8825), a shared UART
for a smart driver (TMC2209), or an SPI daisy-chain for a motion controller (TMC5160/TMC5072).
This is the axis the tool's Part-01 theory section argues matters more than brain choice — a smart
driver keeps the MCU idle even at full 6-parallel (`T9-fused-*` rows), while a dumb driver forces
the brain (or a dedicated pump-node MCU) to generate every step pulse.

---

## Pin-budget model (D-09)

> **Deep cross-check:** `PIN-BUDGET-ANALYSIS.md` (co-located) is the permanent reference — the full
> per-hardware signal map, both ceilings (GPIO count **and** peripheral-instance limits), the
> digital/analog reality, and every overrun variant worked pin-by-pin. The tool computes **both**
> ceilings: `pinsOf(v)` the GPIO count, and `periphOf(v)` the hardware-controller demand (UART/I²C/SPI
> vs the ESP32's 3/2/2), flagged per-row (⚠ UART 3/3 pill + a **Peripheral controllers** line in each
> expanded row). Mirrored in `index.html` Part 3.

`pinsOf(v)` mirrors `costOf(v)`'s aggregation shape — same Σ(fixed + per-variant loads) pattern,
applied to GPIO pins instead of euros — against the variant's brain (`espscreen` if present, else
`esp32`) usable-GPIO count (`gpioUsable`).

```
avail = brain.gpioUsable
used  = (brainKey !== 'espscreen')
          ? SCREEN_PINS[interfaceMode]                 // Layer A, skipped for integrated boards
            + SD_PINS                                   // +1: SD card chip-select. Rides the screen's
                                                           //   SPI bus (SCK/MOSI/MISO already paid by
                                                           //   Layer A), so only its select line costs
                                                           //   a pin. Skipped for integrated boards,
                                                           //   whose onboard SD is already inside their
                                                           //   audited free-GPIO count. (Added 2026-07-21)
            + (v.b === 'I²C' ? 0 : 2)                   // LM75 onboard temp sensor: shares I²C bus, else +2
                                                           //   (MPR121 rides this SAME I²C attachment — +0 pins)
          : 0
        + BUS_PINS[v.b]                                 // Layer B: brain's own bus attachment
        + v.pinsC                                        // Layer C: driver-link pins on the brain (0 if a
                                                           //   dedicated pump-node MCU or printer-board
                                                           //   socket absorbs the wiring instead)
        + msPins                                         // +3 only when msMode='dynamic' AND v.dk='dumb'
                                                           //   AND v.pinsC>0 (shared M0/M1/M2 bus on the
                                                           //   brain-wired dumb drivers); 0 otherwise
        + 1                                              // vibration-motor PWM pin (any LEDC-capable GPIO,
                                                           //   fixed, every variant — D-13)
free    = avail - used
overrun = used > avail
```

**New pin-budget terms (D-13/D-16).** The vibration motor costs **+1** fixed PWM pin on every
variant — any ESP32 GPIO via the LEDC peripheral, added unconditionally in the formula above. The
MPR121 costs **0** additional pins: it shares the LM75's existing I²C attachment (its 0x5A address
does not collide with the LM75's 0x48), so it never appears as a separate term. Neither change
alters any variant's relative feasibility ranking (RESEARCH Risk #7) — that is exactly why both
are written as flat constants in the aggregation shape above rather than tracked as a per-variant
field.

### SCREEN_PINS (Layer A, external ILI9341 only)

| Scenario | Pins | Confidence | Basis |
|---|:--:|:--:|---|
| SPI (**default, verified**) | 8 | **High** | SCK+MOSI+MISO+CS (4) + DC+RST (2) + touch T_CS/T_IRQ (2) = 8 |
| 8-bit parallel | 13 | Low | 8 data bits + RS/DC+CS+RD+WR+RST ≈ 13; touch already counted in the A0–A3 range |

**Fixed at SPI — not selectable.** The owned board was **physically inspected (2026-07-15) and
confirmed SPI** (`INTERFACE_CONF.spi = 'High'`), so `interfaceMode` is a `const 'spi'` and the
"Screen interface (Layer A)" control was **removed**: Controls holds live decisions, and this
question is answered. The 8-bit-parallel row is retained here as a *written* counterfactual — had
the vendor listing's parallel hint been right, Layer A would cost 13 pins instead of 8, enough to
push the tightest brains over their GPIO budget, which is why the question was worth resolving
rather than assuming. See Open Questions for the resolution record.

### BUS_PINS (Layer B, per brain's own bus attachment — not multiplied by node count)

| Bus | Pins | Confidence |
|---|:--:|:--:|
| I²C | 2 | Medium (ASSUMED — standard wiring) |
| RS-485 | 3 | Medium (ASSUMED — standard MAX485 half-duplex wiring) |
| CAN | 4 | Medium (ASSUMED — standard MCP2515 SPI wiring) |
| USB/UART | 2 | Medium (ASSUMED) |
| USB/UART/CAN | 2 | Medium (ASSUMED) |

### Layer C driver-link pins (`pinsC`, per variant — attached explicitly, not derived generically)

| Wiring style | Pins | Variants |
|---|:--:|---|
| DRV8825, shared step-bus + per-driver ENABLE | 8 | S1-*, ESPINT-dumb-i2c |
| DRV8825, per-motor STEP/DIR ×6 | 12 | D2-* |
| Dedicated pump-node MCU or printer-board socket absorbs the wiring | 0 | N2-nano-*, P6-*, T9-node-485, B-ramps-*, B-skr-* |
| TMC2209 UART, shared segments | 4 | T9-fused-*, ESPINT-fused-i2c |
| TMC5160/TMC5072 SPI daisy-chain | 4 | T51-* |

The same physical component (e.g. 6× DRV8825) costs a different pin count depending on wiring
topology (S1 shared+EN = 8 vs D2 per-motor = 12) — this is why `pinsC` is an explicit per-variant
field mirroring the `bom` qty-map pattern, rather than derived generically from driver name alone.

**These `pinsC` values assume jumpered (fixed) microstepping** — M0/M1/M2 tied to VCC/GND for a
fixed resolution, costing 0 MCU pins (06-RESEARCH.md decomposes S1 as `2 shared STEP/DIR + 6×ENABLE
= 8`, with no microstep lines). This is exposed as the **Microstepping** control (`msMode`, default
`fixed`):

| `msMode` | Effect | Applies to |
|---|---|---|
| `fixed` (default) | +0 — M0/M1/M2 jumpered; every shipped number unchanged | — |
| `dynamic` | **+3** — a shared M0/M1/M2 bus for runtime-selectable resolution (3 pins total, not per-driver: all pumps run one resolution) | dumb-driver variants with `pinsC > 0` (S1-\*, D2-\*, ESPINT-dumb-i2c) |

Smart/motion drivers (TMC2209/TMC5160/TMC5072) set microstepping over their own UART/SPI link, so
`dynamic` adds nothing to them; offloaded dumb variants (`pinsC = 0`) pay the microstep bus on the
pump node, not the brain, so they are unaffected too. The takeaway the control makes visible: the
S1/D2 overrun is driven by ENABLE/STEP-DIR fan-out to six physical drivers, **not** by microstepping
wiring — the model was already generous on microstepping, and `dynamic` only makes the tight rows
tighter.

**Verification (2026-07-20):** the four load-bearing pin figures were re-checked against primary
sources — ESP32-WROOM-32 usable GPIO (15, conservative end of the safe non-strapping set), DRV8825
M0/M1/M2 jumper-vs-MCU wiring, TMC2209 ≤4-drivers-per-UART, and SPI screen 8-pin count. All confirmed;
see `.planning/quick/*-verify-pin-calculations/*-RESEARCH.md`.

### OVERRUN rule

A variant's readout is `${free} free` when `used ≤ avail`, or an `OVERRUN` badge when
`used > avail`. Both are paired with a confidence pill from `pinConfidenceOf(v)` — the **worst**
of: Layer-B bus pins (**High** — datasheet-verified in the §7 audit), Layer-C driver wiring
(**High** for DRV8825/TMC5160; **Medium** only for TMC2209 variants that wire the UART on the brain,
`dk='smart' && pinsC>0`, whose pin count still rides the unresolved single-wire-vs-full-duplex UART
question — SPEC Open Q#2), the screen-interface confidence (`INTERFACE_CONF[interfaceMode]` — High,
SPI verified; external-screen variants only), and the brain's own `gpioConf` (**esp32 now High**
after the 2026-07-20 DOIT 30-pin audit). Net effect: most rows read High; the fused-TMC2209-on-brain
rows read Medium, honestly reflecting their one open figure.

The ceiling is **per-brain**, not a global constant — `brain.gpioUsable`, keyed to whichever brain the
variant uses, each set to its **audited** free-GPIO count (2026-07-20): bare ESP32 (DOIT 30-pin) =
**16** (the safe output-capable set), integrated 2.4″ (ESP32-2432S024) = **3** (corrected from an
erroneous 9), integrated 3.2″ (ESP32-2432S032R) = **3**. Both integrated boards land at 3 because the
onboard screen already consumes almost every GPIO — the direct, correct expression of "the screen took
the pins" — so they can only be pure brains over a 2-pin I²C bus (`Screen (A) = 0`, since no second
screen is attached). Bare-ESP32 headroom extends to ~20 if the delicate strapping pins are used with
care. Full per-component audit + bibliography: `PIN-BUDGET-ANALYSIS.md` §7.

---

## Power / PSU model

| Concurrency | PSU | Rail |
|---|---|---|
| 1–2 motors at once | 24V ~60W (€18.26) | Single 24V rail from the PSU; two on-board buck converters step it down to 12V (alignment) and 5V (logic) — see Power-rail model below |
| All 6 at once | 24V ~150W (€31.66) | Same single-24V-rail-plus-two-bucks topology, higher-current supply |

The PSU choice is derived from `v.at` (concurrency), not a separate field: `v.bom.psu150` present
⇒ 150 W, else 60 W. This is drawn explicitly in the live diagram's Power block, alongside the
single 24V rail, the two buck-converter drop-lines (12V/5V), and the common-ground line. Six motors moving at once draw roughly six times the
peak current of one — a real hidden cost of parallel dispensing (bigger PSU, more heat, thicker
wiring, more EMI), on top of whatever the step-generation solution itself costs. This is the tool's
"U5 concurrency axis" finding: concurrency, not driver family or bus choice, sets the cost/PSU
floor.

---

## Power-rail model (SC-5)

The Power / PSU model above only ever sized the PSU for driver/motor concurrency; it never
accounted for logic, alignment, or screen current. This section documents the researched answer
for those secondary rails.

**28BYJ-48 winding: 12V is the researched choice (D-15).** The bitbyg listing offers a 5V/60Ω and
a 12V/200Ω winding at the **identical price** on the same dropdown. The 12V winding draws **less**
current (~60 mA/phase) than the 5V winding (~83 mA/phase) and delivers **more** pull-in torque
(≥34.3 mN·m vs ≥29.4 mN·m) — a strict improvement, no trade-off. Confidence: **High** (manufacturer
datasheet + the live vendor page).

**Topology: one 24V PSU output, two local buck converters — not a wall-supplied "12V + 24V dual
rail."** The single 24V PSU output feeds three destinations:
- 24V straight to the 6× driver ICs / NEMA17 steppers (unchanged from the model above).
- 24V → an **LM2596 buck** (`buck12`, trimmed to 12V) → the 2× 28BYJ-48 alignment motors.
- 24V → a fixed **5V/5A synchronous buck** (`buck5`) → ESP32 + screen + SD + LM75 + MPR121 + the
  vibration-motor drive.

**The arithmetic:**
- 12V rail: ≈0.24 A load (2× 28BYJ-48 at ~60 mA/phase) → 2.88 W out → ≈3.39 W in at ~85% buck
  efficiency → **≈0.14 A** drawn off the 24V input.
- 5V rail: ≈0.78 A nominal / ~1.1 A transient (ESP32 + screen + SD + LM75 + MPR121 + vibration
  drive) → ≈5 W out → ≈5.88 W in → **≈0.25 A** drawn off the 24V input.
- **Total new draw ≈ 0.39 A ≈ 9.4 W** — negligible against the existing 60W/150W PSU sizing.
  **No PSU wattage change is required.**

**Confidence: Medium** — and specifically why: the rail-voltage choice and the buck-converter
sourcing are both High, but the ESP32/screen/SD current figures feeding the arithmetic above are
typical datasheet-class estimates, not bench measurements of the specific bitbyg parts (RESEARCH
Assumption A2), and the RD520PA vibration motor's contribution to the 5V rail is entirely
unsourced (see New components above). The ESP32 dev board's onboard 3V3-regulator current rating
is also an unsourced build-time check (RESEARCH Risk #4) — very likely fine given the MPR121's
few-mA draw, but not a verified fact.

**Why 7805-class linear regulation was rejected.** At 24V → 5V with a 0.5A load, a linear
regulator dissipates (24−5)×0.5 = **9.5 W** as heat inside an enclosed device — thermally
infeasible without a large heatsink, and it wastes ~80% of the input power versus a buck
converter's ~85–92% efficiency. This follows directly from P = ΔV × I, not a vendor claim.

**Why DRV2605L-class haptic drivers were rejected.** These chips are purpose-built for closed-loop
ERM/LRA haptic actuators — a mismatch for open-loop mechanical shaking of a generic brushed motor
(RD520PA). Adding one would cost an extra I²C chip and firmware complexity for no benefit over the
simple IRF520 PWM-switch approach already used.

---

## Live system diagram (D-01/D-02/D-03)

Selecting a matrix row (`selectVariant(v)`, the diagram's only control per D-02 — no dropdown, no
"follow cheapest" auto-mode) redraws a fixed-viewport (880×600) hand-authored SVG via
`buildDiagram(v)`, mirroring `rotor-solver`'s `buildFigure()` technique: template-string assembly,
full rebuild on every state change, no persistent DOM mutation.

**Topology classes** (`topoClassOf(v)`, derived from the variant's existing `bom` keys — no new
data field):

| Class | Trigger | Node count on Layer B | Variants |
|---|---|:--:|---|
| `fused` | brain IS the pump controller (no extra MCU) | 2 (brain + alignment) | 10 variants: S1-*, D2-*, T9-fused-*, T51-*, ESPINT-* |
| `satellite` | one dedicated pump-node MCU (rp2040/stm32/nano) | 3 | N2-nano-*, P6-rp-*, P6-stm-485, T9-node-485 |
| `distributed` | six independent per-pump nodes (Pro-Mini ×6) | 8 | P6-dist-485, P6-dist-can |
| `printer` | a printer board (RAMPS/SKR) with driver sockets | 3 | B-ramps-drv, B-skr-drv, B-skr-tmc |

Rendered regions, top to bottom: **Layer A** (brain↔screen — external ILI9341 box + link line
labelled `SPI · 8 pins` / `High confidence — verified`, or a single integrated brain+screen box for
`espscreen` variants; the brain box strokes red with a "⚠ pins overrun" caption when
`pinsOf(v).overrun`) → **Layer B** (bus line labelled `${v.b} bus · ${nodeCount} nodes`, the
constant alignment node) → **Layer C** (driver topology + all 6 driver→motor links, driver ICs
coloured by dumb/smart/motion, dashed connector lines for `satellite`/`printer` classes vs solid
for `fused`/`distributed`) → **Power** (PSU box, single-24V-rail-plus-two-bucks lines, common-ground
line — see Power-rail model below). The diagram
auto-selects the first visible (cheapest, by default sort) variant on load and after any
filter/sort that removes the current selection.

---

## Controls

The Controls card is grouped by **what a control does**, because its inputs do three different
jobs and used to be rendered identically:

| Group | Contains | Effect |
|---|---|---|
| **Cost model** | Shared block, Power supply, DKK→EUR rate, DKK converter | Changes what every number on the page *means* |
| **Filters** | Max price, Max complexity, Concurrency, Design direction | Only changes which rows are *visible* — never a cost |
| **Actions** | Reset prices | Destructive; discards edits, links and the rate |

Reading a €207 cost correctly depends on knowing whether the shared block and PSU are inside it —
a different question from "why is this row hidden", so the layout says so. A **Clear filters**
button appears in the Filters header only while a filter is active (`syncClearFilters()`, called
from `renderMatrix()` since every filter path lands there) and resets *only* the four filters —
touching the cost-model selects there would silently change what every price means.

The **"Screen interface (Layer A)"** control was removed once D-09 resolved (see Open questions).

---

## Cost-model assumptions (SC-5, ARCH-05)

- The large majority of components (17 of 26) are now bitbyg-sourced, High-confidence listing
  prices — not the hobby-class ±20% estimates this section originally described (plan 06.1-01
  already removed the matching ±20% footnote from the running tool itself). Two PSUs are Medium
  (nearest stocked wattage, not exact); seven components (the three Trinamic TMC drivers, RP2040,
  SKR/Octopus, the driver carrier, and the 3.2" integrated board) remain unsourced Low-confidence
  estimates pending a second vendor. Per-component confidence tags, not a blanket percentage, are
  the source of truth for price certainty.
- `costOf(v) = Σ(COMP[k].eur × qty)` over `v.bom`, plus `SHARED_BOM` (6× NEMA17, the ILI9341
  screen, the alignment Nano, 2× 28BYJ-48 + ULN2003, **2× homing micro switch**, the vibration motor,
  the IRF520 driver, the MPR121, and the two buck converters ≈ **€153.67** total) when "include shared
  block" is toggled to whole-system cost. Controller-electronics-only view (default) excludes it.
- **`skipShared(v,k)` — one rule, three readers.** `costOf()`, `bomWorstConf()` and `bomHtml()` all
  route their `SHARED_BOM` membership test through this single function, so the three can never
  describe different sets of parts. It encodes exactly two exclusions:
  - `screen` — an `espscreen` variant already prices its integrated display inside `v.bom` (the D-10
    double-count guard; the display is never billed twice).
  - `nano` — the shared *alignment* node. A variant flagged **`absorbsAlign: true`** drives the two
    28BYJ-48s from its own pump node or I/O expander, so no separate alignment MCU is bought
    (shared block → **€144.96**). The diagram mirrors this: `alignNodeCount` drops to 0 and the
    alignment box is replaced by an "alignment folded into the pump node" caption, so the SVG never
    draws a board the BOM does not buy.
- **PSU toggle (`includePsu`, default on).** The supply stays in each variant's own `v.bom` rather
  than the shared block, because its size is a per-variant *consequence*: 1–2-at-once rows take
  `psu60` (€18.26), 6-at-once rows are forced up to `psu150` (€31.66). Setting Power supply to
  "Excluded" skips `PSU_KEYS` in `costOf()`/`bomWorstConf()` without moving them out of the model
  that explains them; `bomHtml()` still lists the line struck through and marked *excluded*, so the
  reader can see which supply the concurrency forces and what excluding it took off. Reference
  point: the cheapest row reads €65.71 with the PSU and €34.05 without.
- **Per-line confidence in the expanded BOM.** Each BOM line carries its own price-confidence pill,
  and the total carries `bomWorstConf(v)` — the worst across everything the total is built from,
  the same "never look more certain than your weakest input" rule `worstConf()` applies to the pin
  budget. `bomWorstConf()` mirrors `costOf()`'s membership exactly (same shared-block rule, same
  integrated-screen skip, same PSU exclusion) so the tag can never describe a different set of
  parts than the number above it.
- Complexity (★, 1–5, half-stars) is a qualitative design/firmware/wiring-maintenance rating, not
  a derived formula — assigned per variant based on node count, driver firmware complexity, and
  bus robustness.
- The DKK→EUR conversion rate (default 0.134) is user-editable and applies uniformly to any DKK
  price typed into the component table; it does not retroactively re-derive already-set € values.

---

## Persistence (D-06)

Edited component prices and the DKK→EUR rate persist to **`localStorage`**, restored on page load,
all access wrapped in `try/catch` (mirrors the site-wide `lang` key idiom):

| Key | Contents |
|---|---|
| `sae-prices` | JSON snapshot of `{componentKey: eur}` for every `COMP` entry |
| `sae-prices-v` | The `PRICES_VERSION` stamp the snapshot was saved under |
| `sae-rate` | The DKK→EUR conversion rate as a string |
| `sae-user` | Provenance side-car: `{componentKey: {url, editedOn}}` — pasted source links and edit dates |

Reset restores all component prices to `DEFAULTS`, clears `USER` (so no row keeps claiming "your
source" for a price that is once again bitbyg's), resets the **live** `rate` as well as the stored
one, and removes all four keys. These are distinct from the site's shared `lang` localStorage
key — no collision.

`sae-user` is **re-validated on load, not trusted**: a `url` must match `https?://` (so a
hand-edited store cannot smuggle a `javascript:`/`data:` URL into an `<a href>`) and `editedOn`
must be `YYYY-MM-DD`. Anything else is dropped field-by-field — the same fail-closed posture as the
`v >= 0` price guard. `sae-user` is versioned by the same `PRICES_VERSION` stamp, because a
re-sourced `DEFAULTS` set invalidates the user's "I checked this" claims too: the vendor price they
were checked against has changed underneath them.

**`PRICES_VERSION` (defaults-invalidation).** Saved prices carry the `PRICES_VERSION` stamp in
force when they were written; on load, a snapshot stamped with an *older* version is discarded and
the fresh `DEFAULTS` are used. Without this, any reader who had ever edited a single price would
keep their whole stale set forever and would silently never receive re-sourced vendor prices — the
2026-07-16 bitbyg sourcing pass would have been invisible to exactly the users most engaged with
the tool. **Bump `PRICES_VERSION` whenever a `DEFAULTS` price changes.** Current value:
`2026-07-17-06-2-provenance`.

---

## Open questions

1. **Screen SPI vs 8-bit parallel — RESOLVED 2026-07-15.** The owned bitbyg ILI9341 module's
   product-page title said "SPI Touch Screen," but the page body described a pin interface
   (A0–A3, D4–D13, I²C D0–D3) characteristic of **8-bit-parallel Uno-shield-class** modules — a
   **sourced vendor-page contradiction**, not a researcher guess. The difference is 8 pins (SPI)
   vs 13 pins (parallel) — enough to flip several 6-parallel variants between "fits" and
   "OVERRUN." **Resolution:** the owned board was physically inspected and confirmed to be **SPI**.
   The tool now fixes SPI at **High confidence** (`interfaceMode` is a `const 'spi'`;
   `INTERFACE_CONF = { spi:'High', parallel:'Low' }`), and the "Screen interface (Layer A)"
   control has been **removed** — a resolved question is not a live decision, and Controls is for
   live decisions. The 8-bit-parallel scenario survives as a *written* counterfactual here and in
   Part 01, with `SCREEN_PINS.parallel = 13` retained so that reasoning stays checkable against a
   real number.
2. **TMC2209 UART wiring mode (T9-* variants).** `pinsC: 4` assumes 2 UART segments × TX/RX for
   6 drivers across the driver family's ≤4-drivers-per-line limit (per
   `prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md`). Whether this uses TMC2209's
   single-wire half-duplex UART mode (which would roughly halve the pin cost) or standard
   full-duplex TX/RX per segment is not confirmed against the Trinamic datasheet. Documented as
   **ASSUMED**, non-blocking for this phase.
3. **Bare ESP32-S3 as a brain candidate — RESOLVED 2026-07-22, now stocked and added.** An earlier
   read of bitbyg's catalogue found no bare ESP32-S3. bitbyg now stocks the **ESP32-S3-Nano
   (ESP32-S3R8)** at 148.75 DKK (≈ €19.93), so it is added as the `esp32s3` `DEFAULTS` brain
   (gpioUsable 21, Medium; 8 MB octal PSRAM) and used by the recommended `SC6-s3exp-i2c` variant.
   The S3's larger pin count is what enables the single-MCU final design. One caveat stands: the
   21-usable-GPIO figure is vendor-stated + strapping-adjusted, **not** a full datasheet audit like
   the DOIT's 16 — the Waveshare pinout should be confirmed before a build that sits near the ceiling
   (`SC6-s3exp-i2c` is at 20/21). Octal-PSRAM pins (GPIO33–37) and USB (19/20) are not on the header,
   so PSRAM costs 0 header pins — unlike a WROVER, which loses GPIO16/17.
4. **Storage container material — blocks validating capacitive level sensing.** The MPR121-based
   level-crossing sensing in the Storage module (see New components above) requires
   non-conductive (plastic/glass) containers; the actual container material has not been specified
   anywhere in the project. **Resolution:** confirm the material once the storage/container
   design is chosen; if the containers turn out to be metal, capacitive level-crossing sensing
   does not work and the Storage module's hardware baseline needs a new phase, not a fix to this
   one.
5. **RD520PA electrical rating — no datasheet.** The vibration motor's rated/stall current is
   unsourced (see New components above); any current figure used in the Power-rail model is an
   estimate. **Resolution:** measure the part directly (bench multimeter, stall-current test) once
   it is ordered from bitbyg, and update the Power-rail model's arithmetic with the measured
   value.
6. **Peripheral-instance ceiling — RESOLVED 2026-07-20, now computed.** `pinsOf(v)` checks GPIO
   *count*; `periphOf(v)` now adds the second ceiling — hardware-controller demand (UART/I²C/SPI)
   vs the ESP32's 3/2/2. Six TMC2209s need two UART lines (2-bit address = 4 drivers/line), so
   `T9-fused-485` (2 TMC UART + RS-485 UART) spends all three UARTs, leaving none for the console —
   flagged `tight` with a ⚠ UART 3/3 pill in the matrix and a **Peripheral controllers** line in
   every expanded row. `T9-fused-i2c` stays clean (I²C bus spends no UART). SPI-sharing (MCP2515 CAN
   and TMC5160 chains ride the screen's SPI controller) is modelled as +0 controllers. Fully worked
   in `PIN-BUDGET-ANALYSIS.md` §3.

---

## Cross-links (D-04/D-05/D-08)

This tool is now the **canonical source** for the reasoning prose and cost/pin-budget data model.
The three original decision records in `prototypes/System-Architecture/` remain the design-study
audit trail (fixed components, open questions, raw exploration) and point back here rather than
duplicating content:

- [`prototypes/System-Architecture/ARCHITECTURE.md`](../../prototypes/System-Architecture/ARCHITECTURE.md) — system-level electronics/comms decision record; fixed components (touchscreen, LM75), points to this tool's `#matrix`/`#theory` anchors
- [`prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md`](../../prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md) — the seven-concept pump-control menu this tool's 25 variants supersede/extend; the driver-vs-MCU "mental model" section is trimmed to a pointer at this tool's `#theory` anchor
- [`prototypes/System-Architecture/SOLUTION-MATRIX.md`](../../prototypes/System-Architecture/SOLUTION-MATRIX.md) — the original static matrix (17 rows); trimmed to a human-readable snapshot explicitly marked as a reference view, not the source of truth (D-08)

The concurrency question this tool prices but does not answer (U5) is owned by
[`prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md`](../../prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md).

---

## Language support

**English only.** Unlike `rotor-solver` and other pre-i18n-era tools, this tool does not implement
the `data-i18n`/`lang` translation pattern — it was built and promoted after the site's language
switcher was already established, and English-only is the precedent for tools added post-i18n
(consistent with the site convention of not retrofitting translation onto every new tool).
