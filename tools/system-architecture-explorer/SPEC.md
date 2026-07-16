# System Architecture Explorer — Tool Spec

**Tool:** System Architecture Explorer
**File:** `tools/system-architecture-explorer/index.html`
**Status:** Live — cost/complexity matrix + pin-budget engine + live SVG diagram (Phase 6)

---

## Purpose

Prices and compares the pump-system control electronics — which brain (MCU), which stepper
driver, and which system bus — across 20 candidate architectures ("variants"). For each variant
it computes: total cost (editable component prices, live), a design-complexity rating, a
pin-budget feasibility check against the brain's usable GPIO, and a live SVG system diagram
showing the three communication layers and the power block. It is the promoted, canonical version
of the cost/complexity matrix originally built in `prototypes/System-Architecture/index.html`
(D-08) — the tool's inline `<script>` is now the single source of truth for this data model.

---

## Whole-device module schema (Part 00 — D-01/D-02/D-03/D-04/D-05)

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

## Design directions (D-06/D-07/D-08/D-09/D-10)

Between the module schema and the theory section, a four-card gallery groups the 20 variants into
four curated "device personalities." Each direction is **derived**, not stored — `directionOf(v)`
classifies a variant from its existing `topoClassOf(v)` (fused/satellite/distributed/printer) and
`intBrainKey(v)` (integrated-screen board or not) fields, so a future variant added to `VARIANTS`
is classified automatically with no new per-variant field to remember to set.

| Direction key | Display name | Derivation | Variant IDs (count) |
|---|---|---|---|
| `modular` | Distributed Modules | `topoClassOf(v) === 'distributed'` | `P6-dist-485`, `P6-dist-can` (2) |
| `allinone` | All-in-One | integrated-screen board AND `topoClassOf(v) === 'fused'` | `ESPINT-fused-i2c`, `ESPINT-dumb-i2c` (2) |
| `console` | Console | discrete screen AND `topoClassOf(v) === 'fused'` | `S1-i2c`, `S1-485`, `D2-i2c`, `D2-485`, `T9-fused-i2c`, `T9-fused-485`, `T51-485`, `T51-72-485` (8) |
| `panelnode` | Panel + Node | everything else (`satellite` or `printer` topology) | `P6-rp-i2c`, `P6-rp-485`, `P6-stm-485`, `T9-node-485`, `ESPINT32-brain-i2c`, `B-ramps-drv`, `B-skr-drv`, `B-skr-tmc` (8) |

2 + 2 + 8 + 8 = 20 — every variant resolves to exactly one direction, no unclassified bucket.
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

Prices were sourced against the **bitbyg.dk catalogue on 2026-07-16** (D-07/D-11 default vendor).
DKK figures are the vendor's listed incl.-VAT prices; € = DKK × 0.134.

| Component | Role | Default € | Source | Confidence |
|---|---|:--:|---|:--:|
| ESP32 dev board | brain / fused controller | 9.05 | bitbyg "DOIT ESP32 30P IOT Mainboard", 67.50 DKK | **High** |
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
| **Shared block (constant, all variants when "whole-system" toggled on):** | | | | |
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

Prices are editable in the running tool; edits and the DKK→EUR rate persist to localStorage (see
Persistence below). Reset button restores all `DEFAULTS` and clears the persisted keys.

---

## Brain / MCU specs (RAM, PSRAM, GPIO, UI fluidity — D-12)

Every brain-class `DEFAULTS` entry carries `gpioUsable` (+ confidence), `ram`, `psram` (+
confidence), and a `uiNote` describing GUI-fluidity implications:

| Brain | Usable GPIO | Confidence | RAM | PSRAM | UI-fluidity note |
|---|:--:|:--:|---|---|---|
| ESP32 dev board | 15 | Medium | 520 KB SRAM | None | No PSRAM: single-buffered, redraw-on-demand UI is comfortable; full-screen animated transitions are tight |
| RP2040 (Pico) | 26 | Medium | 264 KB SRAM | None | Never drives the screen in any variant (pump-node co-processor only) — RAM is not a GUI concern here |
| STM32 Blue Pill | 30 | Medium | 20 KB SRAM | None | 20 KB is tight beyond step generation, but this MCU never drives the screen — non-issue for GUI fluidity |
| Arduino Pro-Mini | 18 | Medium | 2 KB SRAM | None | Not a brain candidate — per-pump-node role only, never drives the screen |
| Arduino Nano | 18 | Medium | 2 KB SRAM | None | Alignment/small-node role only, never drives the screen |
| ESP32-2432S024 (integrated) | 9 | **High** | 520 KB SRAM | None (32 Mbit flash) | No PSRAM: single-buffered UI comfortable. Integrated display eliminates all Layer-A wiring — the 9 free IO already accounts for the onboard screen + touch |
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

## Variant BOMs (20 total)

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
| P6-rp-485 | 6 | DRV8825 | RS-485 | STEP/DIR ×6 | ★★★☆☆ | esp32, rp2040, drv8825×6, carrier, psu150, max485×3 |
| P6-stm-485 | 6 | DRV8825 | RS-485 | STEP/DIR ×6 (timers) | ★★★☆☆ | esp32, stm32, drv8825×6, carrier, psu150, max485×3 |
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

The `ESPINT-*` rows are the integrated-screen variants added under D-10. `ESPINT-fused-i2c` and
`ESPINT-dumb-i2c` (bitbyg ESP32-2432S024, 2.4", 9 free IO) are a deliberate contrast pair:
the fused smart-driver build fits the 9 free IO, the dumb build does **not** even at single
concurrency — both shown rather than cherry-picking the flattering pairing, per D-11's honesty.

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

**Layer A — brain ↔ screen.** The touchscreen is a fixed, owned component: an ILI9341 3.2"
resistive-touch TFT (bitbyg, 174 DKK ≈ €23) wired SPI (owned board inspected and confirmed SPI;
8-bit parallel retained as a counterfactual — see Open Questions) straight to the brain. Because it must render a GUI, the brain is
ESP32-class in every variant. This link is not a per-variant field — it is either the selectable
`interfaceMode` scenario (external ILI9341) or entirely absorbed by the integrated `espscreen`
board (Layer A drawn as skipped in the diagram for those two variants).

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

`pinsOf(v)` mirrors `costOf(v)`'s aggregation shape — same Σ(fixed + per-variant loads) pattern,
applied to GPIO pins instead of euros — against the variant's brain (`espscreen` if present, else
`esp32`) usable-GPIO count (`gpioUsable`).

```
avail = brain.gpioUsable
used  = (brainKey !== 'espscreen')
          ? SCREEN_PINS[interfaceMode]                 // Layer A, skipped for integrated boards
            + (v.b === 'I²C' ? 0 : 2)                   // LM75 onboard temp sensor: shares I²C bus, else +2
                                                           //   (MPR121 rides this SAME I²C attachment — +0 pins)
          : 0
        + BUS_PINS[v.b]                                 // Layer B: brain's own bus attachment
        + v.pinsC                                        // Layer C: driver-link pins on the brain (0 if a
                                                           //   dedicated pump-node MCU or printer-board
                                                           //   socket absorbs the wiring instead)
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

Selectable in the running tool via the "Screen interface (Layer A)" control; defaults to SPI.
The owned board was **physically inspected (2026-07-15) and confirmed SPI** — SPI is now the
verified default at High confidence (`INTERFACE_CONF.spi = 'High'`). The 8-bit-parallel row is
retained as a selectable counterfactual (Low confidence) so the pin-budget sensitivity to the
interface choice stays visible. See Open Questions for the resolution record.

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
| Dedicated pump-node MCU or printer-board socket absorbs the wiring | 0 | P6-*, T9-node-485, B-ramps-*, B-skr-* |
| TMC2209 UART, shared segments | 4 | T9-fused-*, ESPINT-fused-i2c |
| TMC5160/TMC5072 SPI daisy-chain | 4 | T51-* |

The same physical component (e.g. 6× DRV8825) costs a different pin count depending on wiring
topology (S1 shared+EN = 8 vs D2 per-motor = 12) — this is why `pinsC` is an explicit per-variant
field mirroring the `bom` qty-map pattern, rather than derived generically from driver name alone.

### OVERRUN rule

A variant's readout is `${free} free` when `used ≤ avail`, or an `OVERRUN` badge when
`used > avail`. Both are paired with a confidence pill from `pinConfidenceOf(v)` — the **worst**
of: the Medium/ASSUMED tier covering the Layer-B/Layer-C tables, the screen-interface confidence
(`INTERFACE_CONF[interfaceMode]` — High for the verified SPI default, Low for the parallel
counterfactual; external-screen variants only), and the brain's own `gpioConf`. `esp32.gpioUsable`
is deliberately set to 15 (the upper end of the 10–15 "realistically usable" range cited in
06-RESEARCH.md) so the result set is genuinely mixed — S1/D2 always overrun even at SPI;
T9-fused-*/T51-*/P6-rp-i2c sit right at the SPI/parallel borderline; printer-board variants
comfortably fit — rather than an uninformative all-pass or all-fail set.

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
| `satellite` | one dedicated pump-node MCU (rp2040/stm32/nano) | 3 | P6-rp-*, P6-stm-485, T9-node-485 |
| `distributed` | six independent per-pump nodes (Pro-Mini ×6) | 8 | P6-dist-485, P6-dist-can |
| `printer` | a printer board (RAMPS/SKR) with driver sockets | 3 | B-ramps-drv, B-skr-drv, B-skr-tmc |

Rendered regions, top to bottom: **Layer A** (brain↔screen — external ILI9341 box + link line
labelled with `interfaceMode`/`interfaceConf`, or a single integrated brain+screen box for
`espscreen` variants; the brain box strokes red with a "⚠ pins overrun" caption when
`pinsOf(v).overrun`) → **Layer B** (bus line labelled `${v.b} bus · ${nodeCount} nodes`, the
constant alignment node) → **Layer C** (driver topology + all 6 driver→motor links, driver ICs
coloured by dumb/smart/motion, dashed connector lines for `satellite`/`printer` classes vs solid
for `fused`/`distributed`) → **Power** (PSU box, single-24V-rail-plus-two-bucks lines, common-ground
line — see Power-rail model below). The diagram
auto-selects the first visible (cheapest, by default sort) variant on load and after any
filter/sort that removes the current selection.

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
  screen, the alignment Nano, 2× 28BYJ-48 + ULN2003, the vibration motor, the IRF520 driver, the
  MPR121, and the two buck converters ≈ **€149.65** total) when "include shared block" is toggled
  to whole-system cost. Controller-electronics-only view (default) excludes the shared block.
- **Double-count guard:** an `espscreen`-based variant already prices its own integrated display as
  part of the brain component — `costOf()`/`bomHtml()` skip the `SHARED_BOM` screen line for
  those two variants so the display is never billed twice.
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

The Reset button restores all component prices to `DEFAULTS` and removes all three keys. These are
distinct from the site's shared `lang` localStorage key — no collision.

**`PRICES_VERSION` (defaults-invalidation).** Saved prices carry the `PRICES_VERSION` stamp in
force when they were written; on load, a snapshot stamped with an *older* version is discarded and
the fresh `DEFAULTS` are used. Without this, any reader who had ever edited a single price would
keep their whole stale set forever and would silently never receive re-sourced vendor prices — the
2026-07-16 bitbyg sourcing pass would have been invisible to exactly the users most engaged with
the tool. **Bump `PRICES_VERSION` whenever a `DEFAULTS` price changes.** Current value:
`2026-07-16-06-1-whole-system`.

---

## Open questions

1. **Screen SPI vs 8-bit parallel — RESOLVED 2026-07-15.** The owned bitbyg ILI9341 module's
   product-page title said "SPI Touch Screen," but the page body described a pin interface
   (A0–A3, D4–D13, I²C D0–D3) characteristic of **8-bit-parallel Uno-shield-class** modules — a
   **sourced vendor-page contradiction**, not a researcher guess. The difference is 8 pins (SPI)
   vs 13 pins (parallel) — enough to flip several 6-parallel variants between "fits" and
   "OVERRUN." **Resolution:** the owned board was physically inspected and confirmed to be **SPI**.
   The tool's default is now SPI at **High confidence** (`INTERFACE_CONF = { spi:'High',
   parallel:'Low' }`); the 8-bit-parallel scenario is retained as a selectable Low-confidence
   counterfactual so the pin-budget sensitivity to interface choice stays visible.
2. **TMC2209 UART wiring mode (T9-* variants).** `pinsC: 4` assumes 2 UART segments × TX/RX for
   6 drivers across the driver family's ≤4-drivers-per-line limit (per
   `prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md`). Whether this uses TMC2209's
   single-wire half-duplex UART mode (which would roughly halve the pin cost) or standard
   full-duplex TX/RX per segment is not confirmed against the Trinamic datasheet. Documented as
   **ASSUMED**, non-blocking for this phase.
3. **Bare ESP32-S3 as a brain candidate.** bitbyg's enumerated 12-product ESP32 catalogue has no
   bare ESP32-S3 (only an S3 board bundled with Ethernet + camera). Not added as a `DEFAULTS`
   entry — would require sourcing outside bitbyg, contradicting D-11's "lean toward what bitbyg
   stocks" guidance. Non-blocking.
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

---

## Cross-links (D-04/D-05/D-08)

This tool is now the **canonical source** for the reasoning prose and cost/pin-budget data model.
The three original decision records in `prototypes/System-Architecture/` remain the design-study
audit trail (fixed components, open questions, raw exploration) and point back here rather than
duplicating content:

- [`prototypes/System-Architecture/ARCHITECTURE.md`](../../prototypes/System-Architecture/ARCHITECTURE.md) — system-level electronics/comms decision record; fixed components (touchscreen, LM75), points to this tool's `#matrix`/`#theory` anchors
- [`prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md`](../../prototypes/System-Architecture/PUMP-CONTROL-CONCEPTS.md) — the seven-concept pump-control menu this tool's 20 variants supersede/extend; the driver-vs-MCU "mental model" section is trimmed to a pointer at this tool's `#theory` anchor
- [`prototypes/System-Architecture/SOLUTION-MATRIX.md`](../../prototypes/System-Architecture/SOLUTION-MATRIX.md) — the original static matrix (17 rows); trimmed to a human-readable snapshot explicitly marked as a reference view, not the source of truth (D-08)

The concurrency question this tool prices but does not answer (U5) is owned by
[`prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md`](../../prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md).

---

## Language support

**English only.** Unlike `rotor-solver` and other pre-i18n-era tools, this tool does not implement
the `data-i18n`/`lang` translation pattern — it was built and promoted after the site's language
switcher was already established, and English-only is the precedent for tools added post-i18n
(consistent with the site convention of not retrofitting translation onto every new tool).
