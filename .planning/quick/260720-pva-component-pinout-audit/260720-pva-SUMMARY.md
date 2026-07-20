---
status: complete
---

# Quick Task 260720-pva — Summary

**Do the full component-by-component datasheet pinout audit Sirio assumed had already been done,
record it in the appropriate md file, note that the search was done, and confirm it is indexed.**

## Why
The pin-budget confidence pill reads "Medium" because the Layer-B/Layer-C wiring figures and the
GPIO ceiling were standard-wiring *assumptions*, not a per-part datasheet audit. Sirio had assumed
the components + pinouts were already searched — they were not (only targeted verification had been
done). This task closes that gap.

## What changed
`tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md`
- New **§7 Component pinout audit (datasheet-verified 2026-07-20)** — a table checking every
  budget-contributing part against its datasheet/module reference: ESP32 DOIT DevKit v1 30-pin,
  ILI9341+XPT2046, LM75, MPR121, MAX485, MCP2515, DRV8825, TMC2209, TMC5160, IRF520.
- **Verification-log note** in the header recording that the audit was completed and its result.
- New datasheet source links.

`CLAUDE.md` — the index entry for PIN-BUDGET-ANALYSIS.md updated to mention the audit. (The file was
already listed in the folder-structure index; confirmed present, description refined.)

## Result of the audit
**No figure is wrong. Several are deliberately conservative:**
- ESP32 DOIT 30-pin exposes 25 GPIO → ~16 safe output pins (4 input-only, 5 strapping) → `15` is
  justified and slightly conservative.
- Screen 8 confirmed; could be 6 if RST is tied and T_IRQ polled. SCK/MOSI/MISO are a shareable SPI bus.
- MAX485 = 3 (RO/DI + DE·RE tied) — exact. IRF520 vibration = 1 (SIG) — exact.
- MCP2515 CAN = 4 standalone, but only 2 (CS+INT) if it shares the screen's SPI bus → conservative.
- LM75 (0x48) + MPR121 (0x5A) confirmed non-colliding on one I²C bus → sensors = 0 extra when bus is I²C.
- DRV8825 microstep jumperable (0 MCU pins); TMC2209 ≤4/UART line; TMC5160 SPI daisy-chain — all confirmed.

## Confidence implication (NOT yet applied — awaits sign-off)
The audit moves the Layer-B/Layer-C figures and the GPIO ceiling from "assumed" to "datasheet-sourced".
On that basis the tool's confidence pills could be re-rated (BUS_PINS verified; `gpioConf` Medium→High).
The only genuine remaining unknown is the TMC2209 single-wire UART (Open Q#2) and the absence of a
full physical pin-assignment for any variant. Re-rating the pills changes displayed verdicts, so it
is documented in §7 as a separate, unmade edit pending Sirio's decision.

## Not done (still pending Sirio's confirmation)
- Dimming + sink-to-bottom of OVERRUN rows (chosen style, awaiting go).
- Re-rating the confidence pills per the audit.

No `index.html` changes this task — documentation only.
