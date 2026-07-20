---
status: complete
---

# Quick Task 260720-pcp — Summary

**Add a per-variant peripheral-instance ceiling check (`periphOf`) — the "TX for two things"
constraint a pin count can't see — and record that the 6×ENABLE fan-out is a wanted battery
power-gating feature.**

## What changed

`tools/system-architecture-explorer/index.html`
- New **`periphOf(v)`** + `PERIPH` const: models hardware-controller demand (UART/I²C/SPI) vs the
  ESP32's 3/2/2. Screen = 1 SPI; sensors + I²C bus share one I²C controller; RS-485 / printer-link =
  1 UART; brain-wired TMC2209 = 2 UART lines (6 drivers, ≤4/line); CAN + TMC5160 SPI share the
  screen's SPI controller; dumb DRV8825 STEP/DIR/ENABLE = plain GPIO (no controller).
- Matrix pin cell gains a **⚠ UART 3/3** (amber) / **⚠ bus** (red conflict) flag when a build spends
  all controllers. Every expanded row gains a **Peripheral controllers** line (UART x/3 · I²C x/2 ·
  SPI x/2 + fits/tight/conflict + reasons + the fix).
- Part-3 "Pin Budget" prose updated: the peripheral check is now live per-row, plus a new paragraph
  on ENABLE as deliberate battery power-gating and TMC2209's software enable/current (`IRUN`/`IHOLD`/
  `TOFF`) delivering the same benefit over UART without the 6-GPIO cost.

`SPEC.md` — Open Question #6 marked RESOLVED (now computed); pin-budget cross-check note updated to
"both ceilings computed."

`PIN-BUDGET-ANALYSIS.md` — §3 marked computed; new subsection "The six ENABLE lines are deliberate
(battery power-gating)" with the TMC2209-software-enable insight; Known-limitations #1 updated.

## Result
`periphOf` flags exactly one variant — **T9-fused-485** (UART 3/3: 2 TMC lines + RS-485, no console
left). Its I²C sibling **T9-fused-i2c** stays clean (UART 2/3), as does the offloaded **T9-node-485**
(UART 1/3) and every dumb/printer/distributed row. This validates the earlier analysis: the I²C-bus
fused variant is the clean choice.

## Verification
- `node --check`: pass.
- Browser (playwright, local server): `periphOf` over all 20 variants — only T9-fused-485 tight, no
  conflicts; DOM shows the ⚠ UART 3/3 flag on exactly that row; expanded rows render the correct
  controller line (T9-485 UART 3/3 tight, T9-i2c 2/3 fits, S1 0/3 fits); no horizontal overflow. Only
  console error is the pre-existing favicon 404.
