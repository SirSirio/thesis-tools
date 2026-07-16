---
id: system-architecture
slug: system-architecture
title: System electronics & communication architecture — brain, pump controller, bus
status: exploring
created: 2026-07-02
updated: 2026-07-02
---

# System electronics & communication architecture

How the modules (touchscreen/HMI, alignment, nozzle-shaker, pump bank) are **controlled and
wired together**. This is the **system-level** decision that sits above the per-module designs.
Visual comparison: the live [System Architecture Explorer](../../tools/system-architecture-explorer/index.html#matrix).

**→ Full pump-control option menu (7 concepts, serial ↔ 6-parallel, dumb ↔ smart drivers, with
costs): [PUMP-CONTROL-CONCEPTS.md](PUMP-CONTROL-CONCEPTS.md).**

> **Scope note.** The [pump-module criteria table](../REQUIREMENTS-CRITERIA.md) does **not** apply
> here — it is pump-only. This is a separate, system-level decision; no formal scoring yet.

---

## Fixed components (decided)

- **Touchscreen / HMI:** [bitbyg 3.2" TFT](https://bitbyg.dk/shop/3-2-inch-tft-lcd-display-module-spi-touch-screen-onboard-temperature-sensor-pen/)
  — **ILI9341, 240×320, resistive touch** (pen), onboard **LM75 temp sensor on I²C (0x48)**, 5 V,
  ~174 DKK (~€23). **Resolved 2026-07-15: SPI confirmed.** The product-page title said *SPI* but the
  page body's quoted pin map (A0–A3, D4–D13) read like an **8-bit parallel Uno-shield** module — a
  sourced vendor-page contradiction, not a guess. The owned board was physically inspected
  (silkscreen/headers) and confirmed **SPI, High confidence**; full resolution in
  [SPEC.md — Open questions, #1](../../tools/system-architecture-explorer/SPEC.md#open-questions).
  **Layer A = SPI to the brain** — 8-bit parallel survives in the tool only as a selectable
  Low-confidence counterfactual, not the default.
- **Implication:** the brain must render the GUI → **ESP32-class brain confirmed** (a Nano can't
  hold a GUI + system logic). The LM75 means the brain already needs an I²C bus.
- **Alignment module motors (2× 28BYJ-48):**
  - **2× 28BYJ-48 (12 V winding)**, each with its own **ULN2003 driver board** — both motors
    identical, unipolar steppers, each driven by **direct 4-wire coil sequencing over 4 GPIO**
    (⚠ *not* STEP/DIR — no DRV8825 anywhere in the alignment module). **€5.86 each incl. driver**
    (bitbyg bundle: 25.00 DKK motor + 18.75 DKK ULN2003 board = 43.75 DKK), matching the tool's
    shipped `align28byj` price at qty 2 — the earlier `~€2.5` figure was a stale pre-bitbyg estimate.
    The **12 V winding is a researched choice (D-15)**, not an inherited assumption: at 12 V the
    motor draws **~60 mA/phase** and delivers **≥34.3 mN·m** pull-in torque, versus **~83 mA/phase**
    and **≥29.4 mN·m** on the 5 V winding — less current *and* more torque at the identical bitbyg
    price, so there is no trade-off.
  - These hang off the **alignment node** (its own Arduino), *not* the pump controller — so they are
    a **constant added to every variant**, they don't change the pump architecture or the matrix
    ranking. They confirm the distributed/RS-485 direction.
  - **Rail topology (researched, D-15):** there is **one 24 V PSU output** (unchanged), and
    everything below 24 V is generated locally by **two buck converters** — an LM2596 trimmed to
    12 V for the alignment motors, and a fixed 5 V/5 A synchronous buck for logic (ESP32, screen,
    SD, LM75, capacitive module) — not a raw 12 V + 24 V dual supply. Total new draw ≈**0.39 A /
    9.4 W** on the 24 V rail; no PSU wattage change needed. Full arithmetic:
    [SPEC.md — Power-rail model (SC-5)](../../tools/system-architecture-explorer/SPEC.md#power-rail-model-sc-5).

**Component unit prices** (the standalone BOM used for all cost math) live in
[SOLUTION-MATRIX.md](SOLUTION-MATRIX.md#component-unit-prices) and are **editable live** in the
[System Architecture Explorer](../../tools/system-architecture-explorer/index.html#matrix) (with
a DKK↔EUR converter; the solution table there sorts/filters by price and complexity).

## Full solution matrix

**→ [SOLUTION-MATRIX.md](SOLUTION-MATRIX.md)** — every concept × driver × MCU-topology × bus
variant, with cost, complexity, and all three comms layers. The big-picture comparison table.

## The one axis that decides everything: concurrency (U5)

**How many pumps must move at the exact same instant?** This is the single axis that dominates
the whole cost/complexity matrix — see the tool's
[theory section, "The U5 Concurrency Axis"](../../tools/system-architecture-explorer/index.html#theory)
for the full reasoning (PSU sizing, node count, heat/EMI).

Sirio's current stance: **1 liquid at a time, maybe 2 at a time max.** That lands firmly in the
cheap/easy regime — full 6-way simultaneity is **not** required.

## The insight: the *driver* matters more than the MCU

**Full write-up now lives in the tool:**
[System Architecture Explorer → Part 01, "The driver matters more than the MCU"](../../tools/system-architecture-explorer/index.html#theory).

Quick summary: a dumb driver (DRV8825) puts pulse generation on the MCU — the only reason to
"need" an RP2040/STM32; a smart driver (TMC2209, UART) generates its own steps, so even a plain
ESP32 stays fused at 6-parallel. Since a driver is bought either way, the ~€2/driver premium for
TMC2209 buys full parallel capability outright.

## Pump-controller options (cheaper alternatives to RP2040)

| Option | Independent trains | ~Cost | Best when |
|---|---|---|---|
| **Nano + A4988 (dumb)** | 1 (2 marginal) | € | Strictly serial dispensing |
| **ESP32 + A4988** (RMT/dual-core) | up to ~8 | € | 1–2 at once; ESP32 also = the brain |
| **TMC2209 (UART) + any MCU** ⭐ | all 6, MCU idle | €€ | Want parallel cheaply/robustly — driver you buy anyway does the work |
| **RP2040 (Pico) PIO + A4988** | 8 | € | Full parallel in one cheap chip |
| **STM32 "Blue Pill" + A4988** | several (HW timers) | € | Cheap, comfortable with STM32 |
| **One Pro-Mini/Nano per pump** on the bus | all 6 (trivially) | €€ | Max modularity / hot-swap pumps |

⭐ = best value if you want the door to parallel open. For strictly serial, **Nano alone** is
genuinely enough.

## "Different Arduino per pump" (Sirio's idea) — verdict

Legit and on-theme: each pump = motor + driver + tiny MCU, replicated, all on the bus. Each MCU
has a trivial one-motor job so parallelism is *free* (every node is independent) and a dead node
kills only one pump — maximally modular. **Cost:** 6 MCUs to flash + 6 bus addresses + more solder.
Compared with **TMC2209-UART on one MCU**, which gets the same parallelism with *fewer* parts, the
per-pump-MCU approach wins only if you specifically want each pump to be a physically self-contained,
hot-swappable unit. Otherwise it's more hardware for the same capability.

## How it all connects

**Brain + HMI:** ESP32 (drives touchscreen, holds the sequence).
**Bus between modules:** RS-485 (robust near steppers) — or I²C if everything is in one small box.
**Nodes:** pump controller · alignment Arduino · nozzle-shaker (piggy-backed on nearest node).
**Power:** separate motor rail (12/24 V) and logic rail (5/3.3 V) with a **common ground**;
keep it clear of fluidics (R11).

See the live diagram in the [System Architecture Explorer](../../tools/system-architecture-explorer/index.html#diagram).

## Open questions to lock it

- **U5 — real concurrency need** (serial / 2 / all). Current: serial-to-2. If it stays there,
  the whole thing is cheap and a Nano-class controller suffices.
- **Screen type** — smart serial display (Nextion, own CPU) vs raw TFT (brain must render).
- **Physical layout** — one enclosure (I²C viable) vs modules separated by cables (RS-485/CAN).
