---
status: complete
---

# Quick Task 260720-pbd — Summary

**Deep pin-budget analysis: explain what drains the pins on every overrun variant, research the
peripheral-level ("TX for two things") constraints, write a permanent cross-check doc, and add a
visual formula section to the tool's Part 3.**

## Deliverables

1. **`tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md`** (new, permanent cross-check)
   - The formula + per-hardware signal map (every pin figure traced to hardware).
   - **Ceiling #1** — usable GPIO count (what `pinsOf` computes): input-only 34/35/36/39, flash
     6–11, strapping pins, the 15 derivation.
   - **Ceiling #2** — peripheral instances (3 UART / 2 I²C / 2 SPI) that a count can't see. The
     concrete "TX for two things" case: 6× TMC2209 need 2 UART lines (2-bit address = 4/line), so
     `T9-fused-485` wants 4 UARTs from a 3-UART chip; `T9-fused-i2c` sidesteps it.
   - Every overrun variant (S1-i2c, S1-485, D2-i2c, D2-485, T9-fused-485, T51-485, T51-72-485,
     ESPINT-dumb-i2c) worked pin-by-pin with the dominant cause named.
   - Digital vs analog: near-moot here (all sensors digital I²C; only ADC2/Wi-Fi caveat).
   - Known model limitations + sources.

2. **`index.html` Part 3 — new "The Pin Budget — What Drains the GPIO" expandable**
   - Colored formula (terms tinted to match the ledger).
   - CSS pin-ledger visual: segmented bar (screen/bus/drivers/vibration) with a dashed usable-GPIO
     ceiling and a hatched red overflow zone — worked on S1-i2c (19 vs 15, over by 4).
   - Per-hardware table + the two-ceilings explanation, GPIO-matrix note, and the UART-contention
     caveat linking to PIN-BUDGET-ANALYSIS.md.
   - Scoped `.pin-formula` / `.pin-ledger` CSS only; shared tokens untouched.

3. **`SPEC.md`** — pin-budget section points to the analysis doc; new Open Question #6 logs the
   uncomputed peripheral-instance ceiling.

## Research
Verified vs primary sources: ESP32 GPIO matrix routes digital peripherals to any pin; 3 UART / 2
I²C / 2 usable SPI controllers; ADC2 dead under Wi-Fi; input-only pins have no output/pull-up;
TMC2209 ≤4 drivers/UART line. Key insight: on ESP32 the binding limits are output-capable-vs-input-only
and peripheral-instance counts, **not** a digital/analog split — and the peripheral ceiling is the
real "TX for two things" trap, invisible to a pin count.

## Verification
- `node --check` (no JS logic changed this round; section is HTML/CSS): pass.
- Browser (playwright, local server, 1100px): section renders, ledger segments 42.1/10.5/42.1/5.3%,
  ceiling at 78.9%, no horizontal overflow (1085 ≤ 1100); ceiling label clears the head line after a
  margin fix. Only console error is the pre-existing favicon 404.
