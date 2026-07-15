---
status: resolved
phase: 06-system-architecture-explorer-promote-the-electronics-archite
source: [06-VERIFICATION.md]
started: 2026-07-15T14:30:00Z
updated: 2026-07-15T15:45:00Z
---

## Current Test

[complete]

## Tests

### 1. Physical screen-interface inspection (ARCH-07 end-of-phase human-check)

expected: Physically inspect the owned bitbyg ILI9341 3.2" board (silkscreen / header labels) to resolve the SPI-vs-8-bit-parallel ambiguity from the vendor page. If SPI: raise the tool's screen-interface default confidence from Low to High. If 8-bit parallel: flip the default scenario in the tool and re-check the variants flagged OVERRUN.
result: passed — user physically inspected the owned board and confirmed it is **SPI**. Applied: `INTERFACE_CONF = { spi:'High', parallel:'Low' }`, default stays SPI now at High confidence; parallel retained as a selectable Low-confidence counterfactual. Tool UI, SPEC.md, and the owned-screen source note updated to "confirmed SPI (8 pins)". (A latent bug was caught doing this: the diagram still referenced the removed `interfaceConf` global — fixed to `INTERFACE_CONF[interfaceMode]`.)

### 2. Browser click-through pass

expected: Open tools/system-architecture-explorer/index.html via a local server (NOT VS Code Live Preview). Verify: editing a price persists across reload (localStorage sae-prices); Reset clears back to defaults; clicking a matrix row highlights it, expands the BOM, and redraws the SVG diagram; sort/filter controls behave; the SPI/parallel scenario toggle changes the pins-free column; no page-level horizontal scroll; theory section anchors navigate correctly.
result: passed — driven via Playwright against `python -m http.server` (localhost:7331). Verified: 19 variant rows; row click sets exactly one `.selected` row and redraws the diagram (content differs across topology classes); price edit ("9.99", "4.25") persists to `localStorage.sae-prices` with decimals intact (WR-01 fix confirmed) and survives a full reload; Reset restores defaults and clears storage; SPI→parallel toggle changes the pins readout/confidence; header reads "nineteen candidate architectures" (WR-03 fix); no page-level horizontal scrollbar at 375px (body `overflow-x:hidden`; the two wide tables scroll internally inside their `overflow-x:auto` cards, which CLAUDE.md permits); only console message is a benign favicon.ico 404. Not machine-checkable and left for a human eyeball: subjective diagram legibility on the distributed 6-node layout, and touch/scroll feel on a real phone.

## Summary

total: 2
passed: 2
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps
