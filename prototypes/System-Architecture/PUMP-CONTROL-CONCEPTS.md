---
id: pump-control-concepts
slug: pump-control-concepts
title: Pump-control concept menu — drivers, MCUs, comms, cost (serial ↔ 6-parallel)
status: exploring
created: 2026-07-02
updated: 2026-07-02
---

# Pump-control concept menu

> **Scope note.** The ~€ prices below are **pre-bitbyg-sourcing estimates** (2026-07-02, hobby/
> AliExpress-class guesses), retained as-is as a **historical record** of how this concept menu was
> originally costed — not rewritten to preserve the audit trail of how the cost picture changed once
> real vendor prices landed. Current, sourced figures live in the System Architecture Explorer's
> [Component unit prices table](../../tools/system-architecture-explorer/index.html#matrix). The gap
> is substantial, not cosmetic: the 6× DRV8825 line alone moved from **~€9** (this file's guess) to
> **~€41** (`6 × €6.87 ≈ €41.22`, real bitbyg-sourced price) once sourced — every concept cost below
> understates reality by a comparable margin.

Seven concepts for driving the 5–6 pumps, spanning **serial → full-parallel** dispensing and
**dumb → smart → motion-controller** drivers. No formal scoring yet — this is the option space to
choose from. Rough EUR prices (hobby/AliExpress class), **controller electronics only**
(the 6 steppers ≈ €36, screen ≈ €12, frame are the *same in every concept* and excluded).

Sits under [ARCHITECTURE.md](ARCHITECTURE.md). Concurrency question = U5 in the
[multi-liquid architecture study](../Prototype-1-Pump-Module/multi-liquid-architecture/ARCHITECTURE-DECISION.md).

---

## The mental model: WHO makes the step pulses?

**Full write-up (the driver-vs-MCU insight) now lives in the tool:**
[System Architecture Explorer → Part 01, "The driver matters more than the MCU"](../../tools/system-architecture-explorer/index.html#theory).

Quick summary: dumb drivers (DRV8825, A4988) put pulse generation on the MCU; smart drivers
(TMC2209, UART) generate their own steps, so a plain MCU stays idle even at 6-parallel; motion
controllers (TMC5160/5130/5072, SPI) add onboard ramp + position generation on top. The seven
concepts below apply that idea across the full serial→parallel spectrum.

---

## The 7 concepts

### C1 — Serial, shared step-bus (your A1) · DRV8825
One MCU (a **Nano** suffices), all drivers share ONE STEP+DIR line, a per-driver **ENABLE** pin
selects which motor moves. Only one liquid dispenses at a time (co-enabled motors run in lockstep).
- **Concurrency:** 1 · **Comms:** none for pumps (single board); I²C/RS-485 only to reach other modules
- **Parts:** Nano €3 · 6× DRV8825 €9 · 60 W PSU €12 → **≈ €25**
- **Complexity:** ★☆☆☆ — the simplest thing that works
- **Trade:** a 6-liquid protocol runs 6 dispenses back-to-back (slowest throughput)

### C2 — Up-to-2 concurrent · one ESP32 · DRV8825  ⟵ value knee
Same DRV8825s, but an **ESP32** (dual-core, hardware pulse peripherals) generates 1–2 *independent*
step trains, and doubles as the **brain + touchscreen**. Runs two liquids at once; the rest queue.
- **Concurrency:** 2 · **Comms:** pumps on-chip (no bus); RS-485/I²C to other modules
- **Parts:** ESP32 €5 · 6× DRV8825 €9 · 60 W PSU €12 → **≈ €26**
- **Complexity:** ★★☆☆
- **Why it matters:** ~2× the throughput of C1 for almost no extra cost or power. The cost/complexity
  curve is steep from 2→6 but the time saved is only linear — **2 concurrent is the value sweet spot.**

### C3 — Full 6-parallel · one capable MCU · DRV8825  ⟵ cheapest true-parallel
Keep the DRV8825s; use an MCU that can make **6 independent hardware step trains**: an **RP2040**
(8 PIO engines — ideal) or an **STM32 "Blue Pill"** (timer channels). One pump *node*; the ESP32
brain commands it.
- **Concurrency:** 6 · **Comms:** brain ↔ pump-node over UART or RS-485
- **Parts:** ESP32 brain €5 · RP2040 €4 · 6× DRV8825 €9 · 150 W PSU €20 · 2× RS-485 €1.4 → **≈ €39**
- **Complexity:** ★★★☆ — PIO/timer firmware (well-trodden, but real)
- **Trade:** cheapest way to get all-6 while keeping DRV8825; firmware is the cost

### C4 — Full 6-parallel · one MCU per pump · DRV8825 (your "one Arduino per pump")
Each pump = **tiny MCU + DRV8825 + motor**, generating its own single train. Parallelism is *free*
(every node independent). Each pump is a self-contained, hot-swappable module; a dead node loses
only one pump.
- **Concurrency:** 6 · **Comms:** a real multi-node fieldbus — **RS-485 (Modbus)** or **CAN** with
  per-node addresses. CAN's error-handling shines with many noisy nodes.
- **Parts:** ESP32 €5 · 6× Pro-Mini €15 · 6× DRV8825 €9 · 150 W PSU €20 · 7× RS-485 €5 → **≈ €54**
  (CAN adds ~€12)
- **Complexity:** ★★★★ — 6 nodes to flash + address (firmware identical, but 6× the wiring/bus work)
- **Trade:** most *modular*, but most parts for the same capability C3/C5 give centrally

### C5 — Full 6-parallel · smart drivers · one plain MCU · TMC2209 (UART)  ⟵ simplest parallel
Swap DRV8825 → **TMC2209** in **UART velocity mode**: you send each driver a target speed and the
**driver steps itself**. Even a **Nano** can run all 6 at independent speeds over a shared UART
(≤4 drivers per UART line, so 6 = two short UART segments). Bonus: **near-silent, cooler running,
sensorless homing (StallGuard), up to ~2 A.**
- **Concurrency:** 6, MCU idle · **Comms:** UART to drivers; RS-485/I²C to modules
- **Parts:** ESP32 (brain+controller) €5 · 6× TMC2209 €21 · 150 W PSU €20 → **≈ €46**
- **Complexity:** ★★☆☆ — *simplest firmware for parallel* (no PIO, no 6 nodes)
- **Trade:** ~€12 more than C3 in drivers; velocity mode is *constant speed* (dose by speed × time —
  perfectly fine for peristaltic), no onboard position/ramp (that's C6)

### C6 — Full 6-parallel · motion-controller drivers · TMC5160/5130 (SPI)  ⟵ lab-grade
**TMC5160** (or integrated **TMC5130**, or dual-axis **TMC5072** = 3 chips for 6 motors) have an
**onboard ramp + position generator**. You send "move N steps with this accel" over SPI and the chip
executes the whole move autonomously, in parallel, with smooth acceleration → the tightest,
most repeatable dose control.
- **Concurrency:** 6, perfectly · **Comms:** SPI daisy-chain, one MCU
- **Parts:** ESP32 €5 · 6× TMC5160 €72 · 150 W PSU €20 → **≈ €97** (TMC5130/5072 cheaper: ~€65–80)
- **Complexity:** ★★☆☆ firmware (mature libraries) but **$$$** in parts
- **Trade:** overkill for peristaltic dosing unless you want fire-and-forget ramps and top precision

### C7 — Repurpose a 3D-printer / CNC controller board
A printer motherboard (**Arduino Mega + RAMPS**, or 32-bit **BTT SKR / Octopus**) already drives
5–8 steppers via **pluggable driver sockets** — drop in your DRV8825 *or* TMC2209 — and runs mature
firmware (**Klipper** does independent multi-stepper well; Marlin/GRBL are more CNC-coordinated).
- **Concurrency:** 6+ · **Comms:** board handles drivers; USB/UART/CAN to a host
- **Parts:** SKR board €30 · 6× driver (€9 DRV8825 … €21 TMC2209) · 150 W PSU €20 → **≈ €59–71**
- **Complexity:** ★★★☆ — hardware is *solved*, but firmware maps dosing→G-code/motion somewhat
  awkwardly, and it's a big board to embed
- **Trade:** "don't reinvent a 6-stepper platform" — fastest to a working parallel bench rig,
  least bespoke

---

## Side-by-side

| # | Concept | At once | Driver | MCU(s) | Inter-module comms | ~€ | Complexity |
|---|---|:--:|---|---|---|:--:|:--:|
| C1 | Serial shared-bus | 1 | DRV8825 | 1 Nano | I²C/RS-485 to modules | 25 | ★☆☆☆ |
| C2 | Up-to-2, one ESP32 | 2 | DRV8825 | 1 ESP32 | on-chip + RS-485 | 26 | ★★☆☆ |
| C3 | Parallel, capable MCU | 6 | DRV8825 | ESP32 + RP2040 | UART/RS-485 | 39 | ★★★☆ |
| C4 | Parallel, MCU-per-pump | 6 | DRV8825 | ESP32 + 6× Pro-Mini | RS-485 / CAN | 54 | ★★★★ |
| C5 | Parallel, smart driver | 6 | **TMC2209** UART | 1 (even Nano) | UART + RS-485 | 46 | ★★☆☆ |
| C6 | Parallel, motion ctrl | 6 | **TMC5160** SPI | 1 | SPI + RS-485 | 97 | ★★☆☆ |
| C7 | Printer/CNC board | 6+ | either | 1 board | USB/UART/CAN | 59–71 | ★★★☆ |

**Cost ranking, full-parallel:** C3 (€39) < C5 (€46) < C4 (€54) < C7 (€59–71) < C6 (€97).
**Cheapest overall:** C1/C2 (~€25) — but only 1–2 at once.

---

## Two things that cost more than the controller (read before choosing parallel)

1. **Power & heat.** See the tool's
   [theory section, "The U5 Concurrency Axis"](../../tools/system-architecture-explorer/index.html#theory)
   for the full PSU/heat/EMI cost breakdown of running 6 motors at once versus 1–2.
2. **Throughput is the *only* thing parallel buys.** A 6-liquid protocol finishes up to ~6× faster.
   Ask whether that speed matters for your protocol. If a dispense is a few seconds, serial may be
   fine; if it's tens of seconds ×6, parallel earns its keep. **2-at-once (C2) captures half the
   benefit for almost none of the cost** — that's why it's the knee of the curve.

---

## How to read this (recommendation lens)

- **If throughput doesn't matter →** C1 or C2. Keep DRV8825, one ESP32, done for ~€26. Cheapest,
  simplest, most portable.
- **If you want true 6-parallel and cost is king →** **C3** (DRV8825 + RP2040) is cheapest, and
  honors "keep DRV8825."
- **If you want 6-parallel with the least firmware pain and don't mind ~€12 more →** **C5** (TMC2209)
  — simplest parallel, and you gain silence + cooler running + sensorless homing as a side effect.
- **If each pump must be a hot-swap module →** C4 (accept more parts + a real fieldbus).
- **If you want lab-grade motion / fire-and-forget ramps →** C6 (pay for it).
- **If you want the fastest path to a working parallel bench rig →** C7 (buy a solved board).

**Open:** which of these get drawn in the [System Architecture Explorer's diagram](../../tools/system-architecture-explorer/index.html#diagram) once you've narrowed the field.
