# Quick Task 260720-msp — Pin-calculation research round

**Gathered:** 2026-07-20
**Scope:** Verify every figure in `pinsOf()` against primary sources, before adding the
Microstepping control. Tool: `tools/system-architecture-explorer/index.html`.

---

## Headline finding (corrects a sparring-round premise)

The current model contains **no M0/M1/M2 microstep pins at all**. `06-RESEARCH.md` decomposes the
DRV8825 dumb-driver cost as `2 shared STEP/DIR + 6×ENABLE = 8` — i.e. it *already* assumes
microstepping is jumpered (fixed) in hardware, the favourable assumption.

Consequence: the S1/D2 **OVERRUN is not caused by microstepping wiring**. It is caused by fanning
ENABLE (S1) or STEP/DIR (D2) out to six physical drivers on one brain. Fixing microstepping in
hardware saves nothing that isn't already saved; a *dynamic* (runtime-selectable) resolution only
*adds* pins. So the control's honest default is `fixed`, and `dynamic` is the penalty case.

---

## Figure-by-figure verification

| Figure | Tool value | Verdict | Source basis |
|---|---|---|---|
| ESP32-WROOM-32 usable GPIO | `gpioUsable: 15` (Medium) | **Confirmed, conservative** | Safe non-strapping, output-capable set = GPIO 4,5,13,14,16,17,18,19,21,22,23,25,26,27,32,33 (~16); drop GPIO5 (strapping) → 15. Flash pins 6–11 and input-only 34–39 correctly excluded. |
| DRV8825 microstep select (M0/M1/M2) | not counted (jumpered) | **Confirmed** | M0/M1/M2 have internal pulldowns; standard practice is hard-wire to GND/VCC for a fixed mode, or wire to MCU only if runtime control is wanted. 3 pins, shareable as one bus across all drivers. |
| DRV8825 RST/SLP | folded into the `8`/`12` model | **Plausible (ASSUMED)** | RESET commonly tied to SLEEP and pulled up. Not independently itemised in-repo; unchanged this task. |
| TMC2209 UART (`pinsC: 4`) | 4 pins for 6 drivers | **Confirmed** | ≤4 TMC2209 share one RX/TX pair via MS1/MS2 slave addresses → 6 drivers need 2 segments → 2×(TX/RX) = 4. (Single-wire half-duplex could halve this — still an open question, already logged in SPEC.) |
| SPI screen (`SCREEN_PINS.spi: 8`) | 8 pins | **Confirmed (owned board inspected)** | SCK+MOSI+MISO+CS (4) + DC+RST (2) + touch T_CS/T_IRQ (2) = 8. Physically confirmed SPI 2026-07-15. |
| I²C bus (`BUS_PINS`) | 2 | **Confirmed** | SDA+SCL. |
| RS-485 (`BUS_PINS`) | 3 | **Confirmed (ASSUMED)** | MAX485 half-duplex: DI+RO+DE/RE tied = 3. |
| CAN (`BUS_PINS`) | 4 | **Confirmed (ASSUMED)** | MCP2515 over SPI (SCK/MOSI/MISO/CS). |

No figure was found to be wrong. The one *modelling* gap was that the fixed-microstepping
assumption was invisible — now surfaced as a control.

---

## Decision implemented

Add `msMode` ('fixed' | 'dynamic', default 'fixed'):
- `dynamic` adds **+3** (a shared M0/M1/M2 bus) **only** to `v.dk === 'dumb' && v.pinsC > 0`
  variants (S1-\*, D2-\*, ESPINT-dumb-i2c).
- Smart/motion drivers configure microstepping over UART/SPI → +0.
- Offloaded dumb variants (`pinsC = 0`) pay it on the pump node, not the brain → +0.
- Default `fixed` leaves every shipped number identical.

Also changed the OVERRUN readout from a bare badge to **"OVERRUN by N"** (N = `used − avail`), so
the control has a visible effect on already-overrun rows and the reader can see *how far* over budget
a variant is.

## Sources

- [ESP32 pinout — Random Nerd Tutorials](https://randomnerdtutorials.com/esp32-pinout-reference-gpios/)
- [ESP32-WROOM-32 pinout — Last Minute Engineers](https://lastminuteengineers.com/esp32-wroom-32-pinout-reference/)
- [DRV8825 module pinout — Last Minute Engineers](https://lastminuteengineers.com/drv8825-stepper-motor-driver-arduino-tutorial/)
- [DRV8825 datasheet (TI, Rev. F)](https://www.ti.com/lit/ds/symlink/drv8825.pdf)
- [janelia-arduino/TMC2209 (UART, ≤4 drivers/line)](https://github.com/janelia-arduino/TMC2209)
- [TMC2209 + ESP32 UART wiring — Arduino Forum](https://forum.arduino.cc/t/tmc2209-and-esp32-uart-wiring/1362812)
- In-repo: `.planning/phases/06-system-architecture-explorer-promote-the-electronics-archite/06-RESEARCH.md` §pin-budget
