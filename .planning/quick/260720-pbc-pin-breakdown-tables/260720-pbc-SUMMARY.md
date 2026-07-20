---
status: complete
---

# Quick Task 260720-pbc — Summary

**Show the cause of a pin OVERRUN in the expanded row, and make the peripheral comparison a
readable row-by-row table instead of cramped inline text.**

## What changed (`tools/system-architecture-explorer/index.html`)

- **`pinsOf(v)` refactored** to return a `terms` breakdown (Screen/Sensors/Bus/Drivers/Microstep/
  Vibration, each with pins + a note). The matrix Pins-free column and the new expanded-row table now
  read the **same** computation — single source of truth, can't drift.
- **Expanded row now shows two mini-tables:**
  1. *Pin budget (ceiling #1)* — every term with its pin count, a note, then Pins used / Usable GPIO
     / Result (OVERRUN by N in red, or N free in green). This makes the overrun cause self-evident
     (e.g. S1-i2c: Screen 8 + Drivers 8 dominate the 19).
  2. *Peripheral controllers (ceiling #2)* — UART / I²C / SPI as rows (used · have · status), with
     the contention reasons and the fix note when tight. Replaces the old hard-to-read inline line.
- Scoped `.pin-mini` CSS (tabular numerals, one-line labels, red/green result). No shared tokens
  touched.

## Accuracy note
No new research — every figure was already verified against primary sources in the prior rounds
(`PIN-BUDGET-ANALYSIS.md`). Precision is guaranteed structurally: the tables render `pinsOf`/`periphOf`
output directly, the same functions that drive the matrix column.

## Verification
- `node --check`: pass.
- Browser (playwright): expanded S1-i2c → pin table sums 8+0+2+8+0+1 = 19 vs 15 = OVERRUN by 4;
  peripheral table UART 0/3 · I²C 1/2 · SPI 1/2 all ok. T9-fused-485 → 18 vs 15 = over by 3;
  peripheral UART 3/3 tight with reasons. Labels sit on one line after a width tweak. No horizontal
  overflow at 640px+ (the 380px matrix overflow is pre-existing table width, unchanged by this task —
  bodyW identical collapsed vs expanded). Only console error is the pre-existing favicon 404.
