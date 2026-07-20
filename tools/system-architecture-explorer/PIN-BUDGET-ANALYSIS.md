# Pin-Budget Analysis — cross-check reference

Companion to `SPEC.md` and the **Part 3 → "The Pin Budget"** section of `index.html`.
This is the permanent, checkable record of *why* each variant fits or overruns, the per-hardware
signal map every pin figure is fetched from, and the deeper peripheral-instance limit a raw pin
**count** cannot see. Last verified **2026-07-20**.

The tool's `pinsOf(v)` computes ceiling #1 below (the GPIO count). Ceiling #2 (peripheral
instances) is **documented here but not yet computed by the tool** — see Known limitations.

---

## 1. The formula

```
pins_used = screen(A) + sensors + bus(B) + drivers(C) + microstep + vibration
fits when: pins_used ≤ usable_GPIO
usable_GPIO: bare ESP32 = 15 · integrated 2.4" (espscreen) = 9 · integrated 3.2" (espscreen32) = 3
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

`esp32.gpioUsable = 15` is the conservative end of the realistic range for an ESP32-WROOM-32:

- 33 GPIO exist on the module, but **6–11 are the SPI flash** (gone) and **34/35/36/39 are
  input-only** (no output, no pull-up).
- The safe, output-capable, non-strapping set is GPIO 4, 13, 14, 16, 17, 18, 19, 21, 22, 23, 25,
  26, 27, 32, 33 ≈ **15**. (GPIO 5 is output-capable but a strapping pin, so it is excluded to be
  safe; including it and the more delicate strapping pins 0/2/12/15 would reach ~18–20.)
- Input-only pins are **not wasted** — a touch-IRQ, a driver FAULT line, or an ADC1 probe can live
  on them. But STEP/DIR/EN/CS outputs cannot, which is why the usable count for *this* system (heavy
  on outputs) sits at the low end.

Integrated boards: `espscreen` (2.4") exposes **9** free IO after its onboard display/touch/SD;
`espscreen32` (3.2") exposes only **3** — enough to be a pure brain over a 2-pin I²C link, never to
fuse pump control.

---

## 3. Ceiling #2 — peripheral instances (documented, not yet computed)

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
| **S1-i2c** | 8 | 0 | 2 | 8 | 1 | **19** | 15 | **+4** | 6×ENABLE driver fan-out |
| **S1-485** | 8 | 2 | 3 | 8 | 1 | **22** | 15 | **+7** | driver fan-out + RS-485 + dedicated sensor I²C |
| **D2-i2c** | 8 | 0 | 2 | 12 | 1 | **23** | 15 | **+8** | per-motor STEP/DIR ×6 |
| **D2-485** | 8 | 2 | 3 | 12 | 1 | **26** | 15 | **+11** | per-motor STEP/DIR + RS-485 + sensor I²C |
| **T9-fused-485** | 8 | 2 | 3 | 4 | 1 | **18** | 15 | **+3** | external screen (8) + RS-485 + sensor I²C — *plus* the UART-instance trap in §3 |
| **T51-485** | 8 | 2 | 3 | 4 | 1 | **18** | 15 | **+3** | same shape as T9-485 (TMC5160 SPI driver) |
| **T51-72-485** | 8 | 2 | 3 | 4 | 1 | **18** | 15 | **+3** | same shape (3× TMC5072) |
| **ESPINT-dumb-i2c** | 0 | 0 | 2 | 8 | 1 | **11** | 9 | **+2** | driver fan-out on a 9-IO integrated board |

**Reading the two failure families:**

1. **Dumb-driver fused (S1/D2):** the **drivers** term (8–12) is the killer — one brain cannot fan
   STEP/DIR/ENABLE out to six physical DRV8825s. Fixed vs dynamic microstepping barely moves this;
   the fix is a smart driver (self-steps over 4 shared UART pins) or offloading to a pump node.
2. **Smart/motion + RS-485 on a bare ESP32 (T9-485, T51-485):** here the driver is cheap (4), but
   **external screen (8) + RS-485 (3) + a dedicated sensor I²C (2)** tip an 18 over 15. Every one of
   these has an I²C-bus sibling that fits (`T9-fused-i2c` = 15) or an integrated-board sibling
   (`ESPINT-fused-i2c` = 7 used, 2 free) that fits — the overrun is specifically the
   *external-screen + RS-485* pairing, not the driver.

**Variants that fit (for contrast):** `T9-fused-i2c` (15/15, 0 free), `ESPINT-fused-i2c` (2 free),
`P6-rp-i2c` (4 free — RP2040 node absorbs all driver wiring), all printer-board rows (sockets
absorb it), and the distributed rows (per-pump nodes). The pattern: **fitting means the six-driver
fan-out is paid by something other than the brain.**

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

1. **Peripheral-instance ceiling (§3) is not computed.** The tool checks the GPIO count only. The
   UART-contention on `T9-fused-485` is real and currently only caught by this document. *Next step
   if wanted:* add a `periphOf(v)` check (UART/I²C/SPI demand vs 3/2/2) and a second badge.
2. **RST/SLP wiring** for DRV8825 is folded into the `8`/`12` figures as an assumption, not itemised.
3. **CAN SPI-sharing** is modelled pessimistically (+4 as a standalone bus; a shared screen-SPI bus
   would be ~2–3 less).
4. **TMC2209 single-wire vs full-duplex UART** (`pinsC:4`) is assumed full-duplex; single-wire could
   roughly halve it. Tracked in SPEC Open Questions #2.

---

## Sources

- [ESP32 GPIO matrix & pin mux — Espressif/Arduino-ESP32 docs](https://docs.espressif.com/projects/arduino-esp32/en/latest/tutorials/io_mux.html)
- [ESP32 datasheet v5.2 (peripheral counts) — Espressif](https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf)
- [ESP32 pinout / input-only / strapping — Random Nerd Tutorials](https://randomnerdtutorials.com/esp32-pinout-reference-gpios/)
- [Why avoid ADC2 with Wi-Fi — ESP-IDF ADC docs](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/adc.html)
- [TMC2209 ≤4 drivers per UART line — janelia-arduino/TMC2209](https://github.com/janelia-arduino/TMC2209)
- In-repo: `06-RESEARCH.md` §pin-budget (S1 = 2 shared STEP/DIR + 6×ENABLE = 8) · `SPEC.md` §Pin-budget model
