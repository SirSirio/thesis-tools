# Pin-Budget Analysis — cross-check reference

Companion to `SPEC.md` and the **Part 3 → "The Pin Budget"** section of `index.html`.
This is the permanent, checkable record of *why* each variant fits or overruns, the per-hardware
signal map every pin figure is fetched from, and the deeper peripheral-instance limit a raw pin
**count** cannot see. Last verified **2026-07-20**.

> **Verification log — 2026-07-20:** a full **component-by-component datasheet pinout audit** was
> completed (§7 below). Every pin figure in the tool was cross-checked against the manufacturer
> datasheet / module reference for each part (ESP32 DOIT DevKit v1 30-pin, ILI9341+XPT2046, LM75,
> MPR121, MAX485, MCP2515, DRV8825, TMC2209, TMC5160, IRF520). **Result: no figure is wrong;
> several are deliberately conservative** (screen 8 could be 6; CAN 4 could be 2 on a shared SPI
> bus). This is what the confidence pill's inputs should now be re-rated against — see §7's closing note.

The tool computes **both** ceilings: `pinsOf(v)` the GPIO count (#1), and `periphOf(v)` the
hardware-controller demand (#2). Ceiling #2 is flagged per-row — a ⚠ UART 3/3 pill on the pin
column and a **Peripheral controllers** line in every expanded row.

---

## 1. The formula

```
pins_used = screen(A) + sensors + bus(B) + drivers(C) + microstep + vibration
fits when: pins_used ≤ usable_GPIO
usable_GPIO: bare ESP32 (DOIT 30-pin) = 16 · integrated 2.4" (ESP32-2432S024) = 3 · integrated 3.2" (ESP32-2432S032R) = 3   [per-brain, audited 2026-07-20]
```

| Term | Pins | Source of the number |
|---|---|---|
| **screen (A)** | 8 (bare) / 0 (integrated) | ILI9341 SPI: SCK·MOSI·MISO·CS + DC·RST + touch T_CS·T_IRQ. Owned board inspected 2026-07-15. Integrated boards fold the display into their free-IO count. |
| **sensors** | 0 (I²C bus) / +2 | LM75 temp + MPR121 touch/level, both I²C. Ride the system bus when it is I²C (0 extra); a dedicated SDA/SCL pair otherwise (+2). MPR121 (0x5A) shares LM75's bus (0x48) — no extra pins. |
| **bus (B)** | I²C 2 · RS-485 3 · CAN 4 · USB/UART 2 | Brain's own attachment to the module bus, paid once (not per node). |
| **drivers (C)** | 0 · 4 · 8 · 12 | DRV8825 shared step-bus + 6×ENABLE = 8; DRV8825 per-motor STEP/DIR = 12; TMC2209 shared UART = 4; TMC5160/5072 SPI = 4; **0** when a pump-node MCU or printer-board socket absorbs the wiring. |
| **microstep** | 0 (fixed) / +3 (dynamic) | DRV8825 M0/M1/M2. Jumpered = 0 MCU pins; a shared MCU bus for runtime resolution = +3. Applies only to brain-wired dumb variants (`dk='dumb' && pinsC>0`). Smart/motion drivers set it over UART/SPI. |
| **vibration** | 1 | One LEDC-capable GPIO driving the mixing/anti-clog motor's MOSFET. Fixed on every variant. |

---

## 2. Ceiling #1 — usable GPIO (what the tool computes)

`esp32.gpioUsable = 16` is the audited safe-output count for the DOIT 30-pin ESP32-WROOM-32:

- 33 GPIO exist on the module, but **6–11 are the SPI flash** (gone) and **34/35/36/39 are
  input-only** (no output, no pull-up).
- The safe, output-capable set is GPIO 4, 5, 13, 14, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32,
  33 = **16** (GPIO5 is a strapping pin but reliable as an output; TX0/RX0 excluded). The more
  delicate strapping pins 0/2/12/15 would push it to ~18–20 if used with care.
- Input-only pins are **not wasted** — a touch-IRQ, a driver FAULT line, or an ADC1 probe can live
  on them. But STEP/DIR/EN/CS outputs cannot, which is why the usable count for *this* system (heavy
  on outputs) sits at the low end.

Integrated boards: `espscreen` (2.4″, ESP32-2432S024) exposes only **3** free GPIO (21/22/35, 35
input-only) after its onboard display/touch/SD — corrected 2026-07-20 from an erroneous 9; `espscreen32`
(3.2″) exposes **3** (22/27/35). Both are enough only to be a pure brain over a 2-pin I²C link, never
to fuse pump control.

---

## 3. Ceiling #2 — peripheral instances (computed by `periphOf(v)`)

A pin count cannot see that the ESP32 has a limited number of each *controller*:

| Peripheral | Instances | Notes |
|---|---|---|
| UART | **3** | UART0 is the USB programming/debug console; UART1 & UART2 are free. |
| I²C | **2** | Both routable to any output-capable GPIO. |
| SPI (usable) | **2** | SPI2/SPI3 (HSPI/VSPI); SPI0/1 serve the flash. |
| LEDC PWM | 16 ch | Plentiful — vibration + any soft-PWM needs. |
| RMT / MCPWM | 8 / 2 | Hardware step-pulse generation for dumb drivers (offloads the CPU, not the pin count). |

**Why this matters — the "TX for two things" trap.** Because of the **GPIO matrix**, almost every
digital function routes to almost any free pin, so *which* pin is rarely the problem — but *how many
of each controller* is. The sharp case:

- A TMC2209's UART address field is **2 bits = 4 drivers max per line**. Six pumps therefore need
  **two** UART lines = two UART controllers.
- `T9-fused-485` at six drivers wants: 2 UART (TMC lines) + 1 UART (RS-485 bus) + UART0 (console) =
  **4 UARTs from a 3-UART chip.** It **passes ceiling #1** (18 > 15 — actually it overruns on count
  too here, see §4 — but even a hypothetically pin-cheaper 485 smart variant would hit this).
- **Resolution:** bit-bang one TMC line on SoftwareSerial, or give up the debug console after
  flashing, or — cleanly — use `T9-fused-i2c`: an I²C system bus spends **zero** UARTs, leaving both
  free UARTs for the two TMC lines. This is a concrete reason to prefer the I²C-bus fused variant.

**SPI sharing (count is conservative here).** The CAN variants model MCP2515 as a full +4 SPI bus,
but MCP2515 can share the screen's SPI bus (one extra CS + INT), so real CAN builds may cost ~2–3
pins less than the tool shows. Documented as pessimistic-safe, not corrected.

---

## 4. Every overrun variant, worked pin-by-pin (fixed microstepping, the default)

`used = screen + sensors + bus + drivers + vibration` · deficit = used − usable.

| Variant | screen | sensors | bus | drivers | vib | **used** | usable | **deficit** | Dominant cause |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|---|
| **S1-i2c** | 8 | 0 | 2 | 8 | 1 | **19** | 16 | **+3** | 6×ENABLE driver fan-out |
| **S1-485** | 8 | 2 | 3 | 8 | 1 | **22** | 16 | **+6** | driver fan-out + RS-485 + dedicated sensor I²C |
| **D2-i2c** | 8 | 0 | 2 | 12 | 1 | **23** | 16 | **+7** | per-motor STEP/DIR ×6 |
| **D2-485** | 8 | 2 | 3 | 12 | 1 | **26** | 16 | **+10** | per-motor STEP/DIR + RS-485 + sensor I²C |
| **T9-fused-485** | 8 | 2 | 3 | 4 | 1 | **18** | 16 | **+2** | external screen (8) + RS-485 + sensor I²C — *plus* the UART-instance trap in §3 |
| **T51-485** | 8 | 2 | 3 | 4 | 1 | **18** | 16 | **+2** | same shape as T9-485 (TMC5160 SPI driver) |
| **T51-72-485** | 8 | 2 | 3 | 4 | 1 | **18** | 16 | **+2** | same shape (3× TMC5072) |
| **ESPINT-fused-i2c** | 0 | 0 | 2 | 4 | 1 | **7** | 3 | **+4** | 3-free-pin integrated board can't fuse — even a smart driver overruns |
| **ESPINT-dumb-i2c** | 0 | 0 | 2 | 8 | 1 | **11** | 3 | **+8** | driver fan-out on a 3-free-pin integrated board |

**Reading the two failure families:**

1. **Dumb-driver fused (S1/D2):** the **drivers** term (8–12) is the killer — one brain cannot fan
   STEP/DIR/ENABLE out to six physical DRV8825s. Fixed vs dynamic microstepping barely moves this;
   the fix is a smart driver (self-steps over 4 shared UART pins) or offloading to a pump node.
2. **Smart/motion + RS-485 on a bare ESP32 (T9-485, T51-485):** here the driver is cheap (4), but
   **external screen (8) + RS-485 (3) + a dedicated sensor I²C (2)** tip an 18 over 16. The fix is the
   I²C-bus sibling (`T9-fused-i2c` = 15/16, 1 free) — the overrun is specifically the *external-screen
   + RS-485* pairing, not the driver. (An integrated board is **not** an escape here: with only 3 free
   pins it can't host RS-485 + drivers at all — it can only be a pure I²C brain.)

**Variants that fit (for contrast):** `T9-fused-i2c` (15/16, 1 free), `ESPINT32-brain-i2c` (3/3, 0
free — 3.2″ integrated board as a *pure brain* over I²C), `P6-rp-i2c` (RP2040 node absorbs all driver
wiring), `N2-nano-i2c` (**11/16, 5 free**) and `N2-nano-485` (**14/16, 2 free**) — a single Arduino
Nano node absorbs the DRV8825 fan-out at 2-concurrent — all printer-board rows (sockets absorb it),
and the distributed rows (per-pump nodes). The pattern: **fitting means the six-driver fan-out is paid
by something other than the brain** — and, for the integrated boards, that the brain does *nothing but*
talk I²C to that something. (`ESPINT-fused-i2c` no longer fits — see the table above; the 3-free-pin
board cannot fuse.)

### The Nano-node DRV8825 rows (`N2-nano-*`) — worked

The only *dumb-driver* rows that fit a bare-ESP32 brain do so by offloading the six DRV8825s to a
**single Arduino Nano** pump-node (`topoClassOf → satellite`, so `pinsC = 0` — the brain sees the
node, not the drivers). The Nano itself holds the fan-out (6× STEP/DIR on its ~16 free GPIO after
the I²C/RS-485 bus), and its **2 usable hardware timers cap it at ~2 clean concurrent step trains** —
which is exactly the validated `U5 = 2`, so the timer limit is not a constraint here. Brain-side budget:

| Variant | screen | sensors | bus | drivers | vib | used | usable | free | periph |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|---|
| `N2-nano-i2c` | 8 | 0 | 2 | 0 | 1 | **11** | 15 | +4 | 0 UART / 1 I²C / 1 SPI — clean |
| `N2-nano-485` | 8 | 2 | 3 | 0 | 1 | **14** | 15 | +1 | 1 UART / 1 I²C / 1 SPI — clean |

Both are **all-bitbyg-sourceable** (ESP32 + Nano + DRV8825 + MAX485 all stocked) and run on the
**60 W** PSU (2-concurrent), making `N2-nano-i2c` the cheapest *fully-single-vendor* build that
still fits the pin budget — and the one that reuses hardware already in-house (1 Nano + DRV8825s).

### Where the Nano fits across the system (role sweep)

The Nano is an ATmega328 (16 MHz, ~20 GPIO, 3 timers / 2 usable for stepping, no display-grade RAM).
That fixes exactly where it belongs and where it does not:

| Role | Viable? | Why |
|---|:--:|---|
| **Alignment node** (2× 28BYJ-48 over ULN2003) | ✅ existing | Trivial one-node job; already the modelled alignment MCU. |
| **Pump node, ≤2 concurrent DRV8825** | ✅ **added** (`N2-nano-*`) | 2 hardware timers → 2 clean trains = U5; holds the 6-driver fan-out off the brain. |
| **Pump node, TMC2209** | ✅ existing (`T9-node-485`) | Drivers self-step over UART; the Nano just relays targets. |
| **Pump node, true 6-parallel** | ⚠️ marginal | Only 2 hardware timers; 6 independent trains need RP2040 PIO / STM32 timers (`P6-rp/stm`). Moot at U5=2. |
| **System brain / GUI host** | ❌ excluded | Cannot render the ILI9341 GUI + hold system logic — ESP32-class required (stated in the tool). |

So the Nano earns two represented pump roles (dumb ≤2, or TMC2209 relay) plus the alignment node —
it is **not** absent from the option space; it is just correctly barred from the brain seat.

### The six ENABLE lines are deliberate (battery power-gating)

The 6×ENABLE fan-out that makes the dumb-driver rows overrun on count is a **design requirement,
not waste**. This is a battery-powered device: switching each DRV8825's ENABLE (active-low) in
software gates that motor's current draw, so idle pumps draw ~0. Independent ENABLE per driver is
therefore wanted — the pin cost is bought on purpose.

Two consequences worth recording:

- **ENABLE is cheap on ceiling #2.** ENABLE lines are plain GPIO — they cost the count (ceiling #1)
  but **zero** peripheral controllers (ceiling #2). The very thing that sinks S1/D2 on pins is free
  on controllers.
- **A smart driver gives the same power-gating without the pins.** TMC2209 exposes software
  enable/disable and per-driver run/hold current over the shared UART (`IRUN`/`IHOLD`, and `TOFF=0`
  to disable) — set by register, no GPIO spent. So the fused-TMC path keeps the battery benefit
  (per-motor current control, idle pumps drawing hold-current or nothing) while spending 4 shared
  UART pins instead of 6+ ENABLE GPIO. For a battery device this is the strongest single argument
  for TMC2209 over DRV8825.

---

## 5. Digital vs analog — the honest answer

Sirio's instinct that there is a digital/analog distinction is right in general but **nearly moot
for this system**:

- Every peripheral here is **digital** (SPI screen, I²C sensors, UART/SPI drivers, PWM vibration).
- The only analog trap on ESP32 is **ADC2 becoming unusable whenever Wi-Fi is active** (ADC2 is
  shared with the radio). It only bites if a future analog probe is added, and even then **ADC1
  (GPIO 32–39) stays available** with Wi-Fi on.
- So the *load-bearing* pin distinctions for this build are **output-capable vs input-only** and
  **peripheral-instance limits**, not digital vs analog.

---

## 6. Known limitations of the current model (logged for cross-check)

1. **Peripheral-instance ceiling (§3) — now computed** by `periphOf(v)` (added 2026-07-20). Models
   UART/I²C/SPI controller demand vs 3/2/2, flags `T9-fused-485` as UART-tight. Assumes SPI-sharing
   (CAN MCP2515 and TMC5160 chains ride the screen's SPI controller) and does not yet model RMT/MCPWM
   step-generation channel limits (8 RMT / 2 MCPWM — ample for 6 step trains, so non-binding).
2. **RST/SLP wiring** for DRV8825 is folded into the `8`/`12` figures as an assumption, not itemised.
3. **CAN SPI-sharing** is modelled pessimistically (+4 as a standalone bus; a shared screen-SPI bus
   would be ~2–3 less).
4. **TMC2209 single-wire vs full-duplex UART** (`pinsC:4`) is assumed full-duplex; single-wire could
   roughly halve it. Tracked in SPEC Open Questions #2.

---

## 7. Component pinout audit (datasheet-verified 2026-07-20)

Every component that contributes to the pin budget, checked against its datasheet / module
reference. "MCU pins" = signals the ESP32 must actually spend (shared SPI/I²C lines counted once).

| Component | Role | MCU-side signals | Pins | Tool figure | Verdict |
|---|---|---|---|---|---|
| **ESP32-WROOM-32** (DOIT DevKit v1, **30-pin**) | brain | — | 25 GPIO broken out; **4 input-only** (34/35/36/39), **5 strapping** (0/2/5/12/15), flash 6–11 not exposed → **16 safe output pins** | `gpioUsable 16` | ✅ **verified** — 16 = the safe output-capable set (GPIO5 the one strapping pin kept) |
| **ESP32-2432S024** (2.4″ CYD, integrated) | brain+screen | — | only **3** GPIO broken out: 21, 22, 35 (35 input-only, 21 = backlight) | `gpioUsable 3` (was 9) | ✅ **verified, corrected** — onboard screen consumes the rest; pure-brain-over-I²C only |
| **ESP32-2432S032R** (3.2″ CYD, integrated) | brain+screen | — | only **3** GPIO free: 22, 27, 35 (35 input-only) | `gpioUsable 3` | ✅ **verified** — pure-brain-over-I²C only |
| **ILI9341 + XPT2046** (owned 3.2″ SPI TFT+touch) | screen (A) | SCK·MOSI·MISO (shared bus) + CS·DC·RST + T_CS·T_IRQ | **8** (min **6** if RST tied to reset & T_IRQ polled) | `SCREEN_PINS.spi 8` | ✅ **verified, conservative**; SCK/MOSI/MISO are a shareable SPI bus |
| **LM75(A)** temp sensor | sensors | SDA·SCL (+ OS unused) | 0 (shares I²C) | `sensors 0/+2` | ✅ **verified** — addr **0x48** (A0–A2=GND) |
| **MPR121** touch/level | sensors | SDA·SCL (+ IRQ optional) | 0 (shares LM75's I²C) | `sensors +0` | ✅ **verified** — addr **0x5A**, no clash with 0x48 |
| **MAX485** RS-485 transceiver | bus (B) | RO→RX · DI→TX · DE+RE (tied) | **3** | `BUS_PINS['RS-485'] 3` | ✅ **verified, exact** |
| **MCP2515** CAN controller | bus (B) | SCK·SI·SO (shared SPI) + CS + INT | **4** standalone / **2** if SPI shared | `BUS_PINS['CAN'] 4` | ✅ **verified, conservative** — 4 assumes a private SPI bus; sharing the screen's → CS+INT = 2 |
| **DRV8825** dumb driver | drivers (C) | STEP·DIR·EN (M0/M1/M2 jumpered, RST/SLP tied) | 3/motor + shared; S1 = 8, D2 = 12 | `pinsC 8 / 12` | ✅ **verified** — microstep jumpered = 0 MCU pins (matches the Microstepping control) |
| **TMC2209** smart driver | drivers (C) | PDN_UART (1-wire, ≤4/line via MS1/MS2 addr) | 2/line → 6 drivers = **4** | `pinsC 4` | ✅ **verified**; single-wire half-duplex could halve it (SPEC Open Q#2) |
| **TMC5160 / TMC5072** motion driver | drivers (C) | SCK·SDI·SDO (shared) + CSN, daisy-chain | **4** | `pinsC 4 (T51-*)` | ✅ **verified** — SPI motion mode, chainable |
| **IRF520** MOSFET module | vibration | SIG (PWM); VCC optional | **1** | `+1 vibration` | ✅ **verified, exact** |

**What the audit changes:** nothing in the arithmetic — every figure held. What it changes is the
**basis of confidence**. Before today the Layer-B/Layer-C figures and the GPIO ceiling were tagged
`Medium (ASSUMED — standard wiring)`; they are now **datasheet-sourced**. On that basis the pill's
inputs could reasonably be re-rated:

- `BUS_PINS` (I²C 2 / RS-485 3 / CAN 4) — MAX485 and MCP2515 confirmed → the Layer-B assumption is
  now **verified** (CAN conservatively high).
- `esp32.gpioUsable` — set to the audited **16** (safe output-capable set on the DOIT 30-pin);
  `gpioConf` raised Medium → **High**. Integrated boards corrected to their audited free-GPIO counts
  (2.4″ 9→3, 3.2″ 3), which makes the fused-on-integrated variants correctly overrun.
- The remaining genuine unknown keeping any single count at Medium is **TMC2209 single-wire UART**
  (Open Q#2) and the fact that no variant has had a *full physical pin-assignment* built yet.

**Applied 2026-07-20:** the tool's confidence pills were re-rated on this basis — Layer-B bus pins and
`esp32.gpioConf` moved Medium → **High**; `pinConfidenceOf` now rates Layer-C wiring High **except**
TMC2209 variants that wire the UART on the brain (`dk='smart' && pinsC>0`), which stay **Medium**
pending the single-wire-UART resolution. So most rows now read High; the fused-TMC rows read Medium —
honestly reflecting their one open figure.

**The GPIO ceiling is per-brain, not a global number.** The feasibility gate is `brain.gpioUsable`
for whichever brain the row actually uses — it is already MCU-specific:

| Brain (the row's controller) | Ceiling | Basis (audited 2026-07-20) |
|---|:--:|---|
| Bare ESP32 (DOIT DevKit v1, 30-pin) | **16** | the safe output-capable set: GPIO 4,5,13,14,16–19,21–23,25–27,32,33 (25 exposed − flash 6–11 − input-only 34–39 − TX0/RX0; GPIO5 the one strapping pin kept). ~20 if 0/2/12/15 used with care |
| Integrated 2.4″ (ESP32-2432S024) | **3** | only GPIO 21, 22, 35 broken out (35 input-only, 21 = backlight) → ~1–2 usable outputs. Corrected from an erroneous 9 |
| Integrated 3.2″ (ESP32-2432S032R) | **3** | only GPIO 22, 27, 35 free after onboard display/touch/SD (35 input-only) |

Both integrated boards land at **3** free pins — only enough to be a *pure brain over a 2-pin I²C bus*
to a separate pump controller; **neither can fuse pump control** (ESPINT-fused-i2c overruns). This is
the direct consequence of the onboard screen already consuming almost every GPIO — and because you
never attach a *second* screen, the external-screen Layer-A cost is **0** for these boards, which the
model already reflects (`Screen (A) = 0` for integrated brains).

Every *bare-ESP32* row shares 16 because they genuinely use the **same** brain — that is correct, not
a shortcut. **Node MCUs (RP2040/STM32/Pro-Mini) never enter this ceiling:** the budget measures the
*brain's* pins, and the node is exactly what offloads the driver wiring off the brain (`pinsC → 0`).
The node's own pin budget (does an RP2040 have enough pins for 6 DRV8825s? — yes, 26 GPIO) is a
separate check the tool does **not** yet run; non-binding in practice, logged as a known gap.

The audited bare-ESP32 headroom is **~16 safe outputs** (up to **~20** using strapping pins with
care), so `15` is a deliberately conservative floor — a bare-ESP32 variant reading "OVERRUN by 1–2"
may still be buildable with careful assignment. The value is **left at 15** pending a decision on
whether to raise it to the audited 16 (or expose a "strict / with-strapping" toggle); its confidence
is now High because the *count method* is datasheet-sourced.

---

## Bibliography (thesis-ready)

Citations for the component pinout audit (§7) and the pin-budget model, in a numbered style ready to
lift into a thesis reference list. Each carries the live link and the access date. Manufacturer names
and titles are the stable citation elements; where a reseller-hosted copy was the retrieved file it is
noted. All accessed **20 July 2026**.

**Primary datasheets**

[1] Espressif Systems, *ESP32 Series Datasheet*, v5.2, 2024. [Online]. Available:
    https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf

[2] Texas Instruments, *DRV8825 Stepper Motor Controller IC*, datasheet, Rev. F, 2014. [Online].
    Available: https://www.ti.com/lit/ds/symlink/drv8825.pdf

[3] Analog Devices (Trinamic), *TMC5160/TMC5160A — Universal high voltage controller/driver for two-phase
    stepper motors*, datasheet, Rev. 1.17. [Online]. Available:
    https://www.analog.com/media/en/technical-documentation/data-sheets/TMC5160A_datasheet_rev1.17.pdf

[4] Analog Devices (Trinamic), *TMC2209 — Stepper driver for 2-phase bipolar motors, UART/STEP-DIR*,
    datasheet. UART addressing (MS1/MS2 = up to 4 nodes per one-wire bus) corroborated by the
    janelia-arduino/TMC2209 library. [Online]. Available: https://github.com/janelia-arduino/TMC2209

[5] Microchip Technology, *MCP2515 — Stand-Alone CAN Controller with SPI Interface*, datasheet,
    DS20001801J. [Online]. Available:
    https://ww1.microchip.com/downloads/en/DeviceDoc/MCP2515-Stand-Alone-CAN-Controller-with-SPI-20001801J.pdf

[6] Maxim Integrated (now Analog Devices), *MAX481/MAX483/MAX485/MAX487–MAX491 — Low-Power,
    Slew-Rate-Limited RS-485/RS-422 Transceivers*, datasheet. [Online]. Available (hosted copy):
    https://dratek.cz/docs/produkty/1/1075/max485.pdf

[7] NXP Semiconductors, *LM75A — Digital temperature sensor and thermal watchdog*, product data sheet.
    [Online]. Available: https://www.nxp.com/docs/en/data-sheet/LM75A.pdf

[8] Freescale Semiconductor (now NXP), *MPR121 — Proximity Capacitive Touch Sensor Controller*,
    datasheet, Rev. 4, Feb. 2013. [Online]. Available: https://www.nxp.com/docs/en/fact-sheet/MPR121FS.pdf

**Board, module & application references**

[9]  CIRCUITSTATE Electronics, "DOIT ESP32 DevKit V1 Wi-Fi Development Board — Pinout Diagram &
     Arduino Reference." [Online]. Available:
     https://www.circuitstate.com/pinouts/doit-esp32-devkit-v1-wifi-development-board-pinout-diagram-and-reference/

[10] Random Nerd Tutorials, "ESP32 DOIT DevKit V1 Board — Pinout (30 GPIOs)" and "ESP32 Pinout
     Reference: Which GPIO pins should you use?" [Online]. Available:
     https://randomnerdtutorials.com/esp32-doit-devkit-v1-board-pinout-30-gpios-copy/ ·
     https://randomnerdtutorials.com/esp32-pinout-reference-gpios/

[10a] espboards.dev, "CYD ESP32-2432S024 Development Board Pinout" (2.4″ — 3 free GPIO: 21/22/35);
      Random Nerd Tutorials / ESP32s.com, "Cheap Yellow Display (CYD) Pinout" (2.8″/3.2″ — free
      GPIO 22/27/35, 35 input-only). [Online]. Available:
      https://www.espboards.dev/esp32/cyd-esp32-2432s024/ ·
      https://randomnerdtutorials.com/esp32-cheap-yellow-display-cyd-pinout-esp32-2432s028r/

[11] Espressif Systems, "GPIO Matrix and Pin Mux — Arduino-ESP32 documentation." [Online]. Available:
     https://docs.espressif.com/projects/arduino-esp32/en/latest/tutorials/io_mux.html

[12] ControllersTech, "ILI9341 + XPT2046 Touch: Wiring, Calibration & UI"; and B. Siegel (Bodmer),
     *TFT_eSPI* Arduino library. [Online]. Available:
     https://controllerstech.com/ili9341-arduino-touchscreen-tutorial/ · https://github.com/Bodmer/TFT_eSPI

[13] ProtoSupplies, "IRF520 N-Ch MOSFET Module" (SIG/VCC/GND + Vin/OUT wiring reference). [Online].
     Available: https://protosupplies.com/product/irf520-n-ch-mosfet-module/

**In-repo**

[14] `06-RESEARCH.md` §pin-budget (S1 = 2 shared STEP/DIR + 6×ENABLE = 8) · `SPEC.md` §Pin-budget model.
