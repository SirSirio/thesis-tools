---
id: solution-matrix
slug: solution-matrix
title: Pump-system solution matrix — every variant (driver × MCU × bus) with cost, complexity, comms
status: exploring
created: 2026-07-02
updated: 2026-07-02
---

# Pump-system solution matrix

The **big overview**: every meaningful variant of the pump-control + communication system, so they
can be compared side by side. Rows are *replicated across buses and driver/MCU choices on purpose* —
the point is to see the whole option space, not a pre-filtered shortlist. No scoring yet.

Parent docs: [ARCHITECTURE.md](ARCHITECTURE.md) · concept detail in
[PUMP-CONTROL-CONCEPTS.md](PUMP-CONTROL-CONCEPTS.md).

> **Reference view (D-08).** The live
> [System Architecture Explorer](../../tools/system-architecture-explorer/index.html#matrix)
> computes the authoritative numbers — editable prices, DKK↔EUR conversion, sort/filter, and full
> BOM breakdowns per variant. Everything below is a human-readable reference snapshot, not the
> source of truth.

---

## Component unit prices

Standalone BOM price reference — **all cost math below and in the
[System Architecture Explorer](../../tools/system-architecture-explorer/index.html#matrix) is
built from these**. Rough hobby-class EUR; edit them live in the tool. DKK→EUR at
**1 DKK ≈ €0.134** (screen: 174 DKK ≈ €23).

| Component | Role | ~€ each |
|---|---|:--:|
| ESP32 dev board | brain / fused controller | 5.0 |
| RP2040 (Pico) | 6-parallel pump node (PIO) | 4.0 |
| STM32 "Blue Pill" | 6-parallel pump node (timers) | 3.0 |
| Arduino Pro-Mini | per-pump node (distributed) | 2.5 |
| Arduino Nano | alignment node / small node | 3.0 |
| DRV8825 | dumb driver (STEP/DIR) | 1.5 |
| TMC2209 | smart driver (UART) | 3.5 |
| TMC5160 | motion-controller driver (SPI) | 12.0 |
| TMC5072 (dual-axis) | 2 motors/chip (SPI) | 14.0 |
| MAX485 module | RS-485 transceiver (per node) | 0.7 |
| MCP2515 module | CAN transceiver (per node) | 2.5 |
| BTT SKR / Octopus | 32-bit printer board | 30.0 |
| Mega2560 + RAMPS 1.4 | printer board bundle | 18.0 |
| Driver carrier PCB | holds 6 driver sockets | 4.0 |
| PSU 24 V ~60 W | 1–2 motors at once | 12.0 |
| PSU 24 V ~150 W | all-6 at once | 20.0 |
| **Shared (constant, all variants):** | | |
| ILI9341 3.2" touch | screen (174 DKK) | 23.0 |
| NEMA17 pump stepper ×6 | pumps | 6.0 |
| 28BYJ-48 12 V + ULN2003 | alignment motor #1 | 2.5 |
| Alignment motor #2 (TBD) | alignment | 6.0 |

**Shared system block** (added to any variant for whole-system cost): 6× NEMA17 (€36) + screen (€23)
+ alignment Nano (€3) + 28BYJ-48+ULN2003 (€2.5) + align motor #2 & driver (€7.5) ≈ **€72**.

## Constants across every variant

- **Brain:** ESP32 (the ILI9341 SPI/parallel touchscreen must be rendered by the brain → ESP32-class).
- **Layer A — screen link:** SPI (or 8-bit parallel) ESP32 ↔ TFT. Same everywhere; not a variable below.
- **Shared BOM excluded from the cost column** (identical in all rows): 6 steppers ≈ €36 · screen ≈ €23 ·
  frame/fluidics. The **~€** column is *controller electronics only* (brain + pump MCU(s) + drivers +
  bus transceivers + driver carrier + PSU), rough ±20 %, hobby-class EUR.
- **PSU scales with concurrency:** 1–2 at once → ~60 W (€12); all-6 → ~150 W (€20). This is a real
  hidden cost of parallel (plus heat, EMI, worse portability).

**The three comms layers** (see [ARCHITECTURE.md](ARCHITECTURE.md)):
**A** = brain↔screen (SPI, fixed) · **B** = brain↔modules *system bus* (the open choice) ·
**C** = pump-MCU↔drivers (set by the driver).

**Complexity:** ★ trivial → ★★★★★ hardest (firmware + wiring + nodes to maintain).

---

## The matrix

| ID | Pumps at once | Driver | Layer C (MCU↔driver) | Controller topology | Layer B (system bus) | Extra parts / carrier | ~€ (ctrl elec) | Complexity |
|----|:---:|---|---|---|---|---|:---:|:---:|
| **S1-i2c** | 1 | DRV8825 | STEP/DIR, shared bus + ENABLE | ESP32 **fused** (brain+pumps) | **I²C** to alignment | driver carrier PCB | ~29 | ★☆☆☆ |
| **S1-485** | 1 | DRV8825 | STEP/DIR, shared bus + ENABLE | ESP32 **fused** | **RS-485** | carrier + 2× MAX485 | ~30 | ★★☆☆ |
| **D2-i2c** | 2 | DRV8825 | STEP/DIR, per-motor | ESP32 **fused** | **I²C** | carrier PCB | ~29 | ★★☆☆ |
| **D2-485** | 2 | DRV8825 | STEP/DIR, per-motor | ESP32 **fused** | **RS-485** | carrier + 2× MAX485 | ~30 | ★★☆☆ |
| **P6-rp-i2c** | 6 | DRV8825 | STEP/DIR ×6 | ESP32 brain + **RP2040** node | **I²C** | carrier PCB | ~42 | ★★★☆ |
| **P6-rp-485** | 6 | DRV8825 | STEP/DIR ×6 | ESP32 brain + **RP2040** node | **RS-485** | carrier + 2× MAX485 | ~43 | ★★★☆ |
| **P6-stm-485** | 6 | DRV8825 | STEP/DIR ×6 (HW timers) | ESP32 brain + **STM32** node | **RS-485** | carrier + 2× MAX485 | ~41 | ★★★☆ |
| **P6-dist-485** | 6 | DRV8825 | STEP/DIR, 1 per node | ESP32 + **6× Pro-Mini** | **RS-485** (7 nodes) | 7× MAX485 | ~59 | ★★★★☆ |
| **P6-dist-can** | 6 | DRV8825 | STEP/DIR, 1 per node | ESP32 + **6× Pro-Mini** | **CAN** (7 nodes) | 7× MCP2515 | ~71 | ★★★★☆ |
| **T9-fused-i2c** | 6 | **TMC2209** | **UART** (velocity, driver self-steps) | ESP32 **fused** | **I²C** | 2× UART segment | ~50 | ★★☆☆ |
| **T9-fused-485** | 6 | **TMC2209** | **UART** | ESP32 **fused** | **RS-485** | 2× UART + 2× MAX485 | ~51 | ★★☆☆ |
| **T9-node-485** | 6 | **TMC2209** | **UART** | ESP32 brain + small node | **RS-485** | — | ~52 | ★★★☆ |
| **T51-485** | 6 | **TMC5160** | **SPI** (onboard ramp+position) | ESP32 **fused** | **RS-485** | SPI daisy-chain | ~102 | ★★★☆ |
| **T51-72-485** | 6 | **TMC5072** ×3 (dual-axis) | **SPI** | ESP32 **fused** | **RS-485** | 3 chips for 6 motors | ~80 | ★★★☆ |
| **B-ramps-drv** | 6 | DRV8825 | STEP/DIR (RAMPS sockets) | **Mega2560 + RAMPS 1.4** board | USB/UART to ESP32 host | RAMPS (5 sockets +1) | ~40 | ★★★☆ |
| **B-skr-drv** | 6 | DRV8825 | STEP/DIR (board sockets) | **BTT SKR / Octopus** 32-bit board | USB/UART/**CAN** | 32-bit board | ~59 | ★★★☆ |
| **B-skr-tmc** | 6 | **TMC2209** | UART (board) | **BTT SKR / Octopus** board | USB/UART/**CAN** | 32-bit board | ~71 | ★★★☆ |

---

## Reading the matrix — clusters & what each buys

**By concurrency (the dominant cost driver):**
- **1–2 at once (S1*, D2*)** → ~€29–30, ★–★★. Cheapest, smallest PSU, most portable. DRV8825 kept,
  ESP32 does everything on one board (no separate pump bus). *The difference between S1 and D2 is
  firmware only.*
- **6 at once** → €40–102 depending on how you make the 6 step streams.

**By how the 6 streams are made (only matters for 6-parallel):**
- **One capable MCU + DRV8825 (P6-rp*, P6-stm*)** → cheapest true-parallel (~€41–43). Keeps DRV8825.
  Cost = PIO/timer firmware.
- **One MCU per pump + DRV8825 (P6-dist-*)** → most modular / hot-swap (~€59–71), most nodes to
  maintain, needs a real fieldbus (RS-485 or CAN).
- **Smart driver, MCU idle (T9-*)** → simplest 6-parallel firmware (~€50–52); silent, cooler,
  sensorless homing; ~€8 dearer than P6-rp. **The option most people don't know exists.**
- **Motion-controller driver (T51-*)** → lab-grade fire-and-forget ramps (~€80–102); overkill for
  peristaltic dosing.
- **Buy a printer board (B-*)** → hardware solved, fastest to a working parallel rig (~€40–71);
  firmware (Klipper/Marlin) maps to dosing a bit awkwardly, big board to embed.

**By system bus (Layer B) — the concept-independent choice:**
- **I²C** — only sane for **few nodes in one small box** (S1/D2/T9-fused). Fragile near steppers; a
  wedged slave can hang the bus.
- **RS-485** — **recommended default.** Works from 2 to 8 nodes unchanged, differential (ignores
  motor EMI), €0.70/node. Pick once, valid for *every* row above.
- **CAN** — worth its extra cost only for **many nodes + fault-tolerance** (P6-dist-can, printer
  boards that have it native).

---

## The short list worth diagramming in the tool (candidates, not a decision)

| If you want… | Variant | ~€ | Why |
|---|---|:--:|---|
| Cheapest sane default (2 at once) | **D2-485** | 30 | keeps DRV8825, one ESP32, RS-485 future-proofs the bus |
| Cheapest *true* 6-parallel, keep DRV8825 | **P6-rp-485** | 43 | RP2040 PIO makes 6 clean trains |
| Simplest 6-parallel + silent/cool | **T9-fused-485** | 51 | TMC2209 offloads stepping; eye-opener option |
| Max modularity / hot-swap pumps | **P6-dist-485** | 59 | each pump a self-contained node |

All four share the **same Layer A (SPI screen)** and can share the **same Layer B (RS-485)** — which
is exactly why committing to RS-485 now de-risks the pump decision.
