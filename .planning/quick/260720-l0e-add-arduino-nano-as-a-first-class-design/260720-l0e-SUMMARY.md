---
quick_id: 260720-l0e
description: Add Arduino Nano as a first-class design option in the System Architecture Explorer plus sweep for other missing variants
date: 2026-07-20
status: complete
---

# Summary — Arduino Nano as a design option + missing-variant sweep

## What changed

Added the **Arduino Nano pump-node driving DRV8825** as two new variants and swept the rest of the
set for other genuinely-missing options. Set grew **20 → 22** variants.

**New variants** (`tools/system-architecture-explorer/index.html` `VARIANTS`):
- **`N2-nano-i2c`** — ESP32 brain + 1 Nano pump-node + 6× DRV8825 + carrier + 60 W PSU, I²C bus.
  Pin budget **11/15 (4 free)**, peripherals clean. `at:2`, `pinsC:0` (node absorbs the fan-out).
- **`N2-nano-485`** — same on RS-485 (3 nodes, +MAX485×3). Pin budget **14/15 (1 free)**, clean.

Both class as `satellite` topology / `panelnode` direction automatically (nano in BOM). Validated by
script: 22 variants parse, both fit with the expected free-pin counts.

## Sweep verdict (what else, and why not)

The Nano now holds **three represented roles**: alignment node (existing), ≤2-concurrent DRV8825
pump node (**new**), and TMC2209 relay node (`T9-node-485`, existing). Explicitly **not** added, with
reasons recorded in PIN-BUDGET-ANALYSIS.md §4 role-sweep table:
- Nano-as-brain — barred (cannot render GUI + logic).
- Nano-per-pump distributed — already covered by Pro-Mini `P6-dist-*`.
- A4988 / ESP32-S3 — part swaps, not new topologies.
- Nano-node on CAN — overkill for 3 nodes.

## Why the Nano-node matters (decision-relevant)

`N2-nano-i2c` is the **cheapest fully-single-vendor (all-bitbyg) build that still fits the pin
budget**, and the only one that **reuses hardware already in-house** (1 Nano + DRV8825s). Its 2
hardware-timer limit (~2 clean concurrent trains) is a non-constraint given the validated **U5 = 2**.

## Files touched

- `tools/system-architecture-explorer/index.html` — +2 variants; `directionOf` count comment 20→22.
- `tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md` — `N2-nano-*` added to the "fit" list
  + worked pin table + a "Where the Nano fits" role-sweep table.
- `tools/system-architecture-explorer/SPEC.md` — count 20→22 (4 places), variant-BOM rows, gallery
  `panelnode` list, capability-table Nano note, pinsC-absorbed list, satellite examples.

## Verification

- `node` extract-and-eval of `VARIANTS`: 22 entries, both new IDs present, pin budgets
  11/15 and 14/15 (no overrun), topology = satellite. ✓
- No stale hardcoded "20"-variant count left in the three files. ✓
- Data-only edits — no shared tokens, no layout/JS-logic change, no horizontal-scroll risk. ✓
