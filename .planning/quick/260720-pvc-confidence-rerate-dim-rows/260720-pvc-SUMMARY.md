---
status: complete
---

# Quick Task 260720-pvc — Summary

**Follow-through on the pinout audit: re-rate the confidence pills, de-emphasise the unfeasible
(OVERRUN) rows, add a thesis-ready bibliography, and clarify that the GPIO ceiling is per-brain.**

## What changed (`tools/system-architecture-explorer/index.html`)
- **Confidence re-rated** (`pinConfidenceOf`): Layer-B bus pins → **High** (datasheet-verified),
  Layer-C → High for DRV8825/TMC5160, **Medium only** for TMC2209 variants that wire the UART on the
  brain (`dk='smart' && pinsC>0`) — their one open figure (single-wire UART, Open Q#2). `esp32.gpioConf`
  Medium → **High** (DOIT 30-pin audit). Net: most rows now read High; fused-TMC-on-brain rows Medium.
- **OVERRUN rows de-emphasised** (Sirio's "Dim + sink to bottom"): `.vrow.infeasible` dimmed to 0.42
  opacity + normal-weight id; feasibility is now the **primary sort key** so unfeasible rows always sink
  below feasible ones regardless of the active sort. Full strength on hover / when expanded.
- `esp32` uiNote documents that 15 is a conservative floor (~16 safe outputs on the DOIT 30-pin).

## Docs
- `PIN-BUDGET-ANALYSIS.md`: §7 closing note updated (re-rating **applied**, not pending); the ceiling
  explained as **per-brain** (`brain.gpioUsable` — 15/9/3, keyed to the row's brain, never global; node
  MCUs never enter it); Sources replaced with a **thesis-ready IEEE-style bibliography** (14 numbered
  entries: primary datasheets with rev/doc-no where known + live links + accessed date, board/module
  refs, in-repo).
- `SPEC.md`: OVERRUN-rule confidence paragraph rewritten to match the re-rating and the per-brain ceiling.

## Answers to Sirio's questions
- **"What is Medium?"** — the pin-count confidence; worst-of its inputs. Now raised where the audit
  verified the figures; stays Medium only for the fused-TMC-on-brain UART count.
- **"Why a general 15?"** — it is NOT general: the ceiling is `brain.gpioUsable`, per-MCU (15/9/3).
  Bare-ESP32 rows share 15 because they use the same brain; nodes offload pins off the brain so they
  never change it.

## Verification
- `node --check`: pass.
- Browser: all 14 feasible rows on top (full strength), 8 OVERRUN rows dimmed (opacity 0.42) and sunk
  to the bottom; ordering correct under default sort. Confidence sample: S1-i2c/P6-rp-i2c/T9-node-485 =
  High; T9-fused-i2c/485 + ESPINT-fused = Medium. Screenshots reviewed. Favicon-404 is the only console error.

## Still open (Sirio's call)
- Whether to raise the bare-ESP32 ceiling 15 → 16 (audited) or add a strict/with-strapping toggle —
  left at 15, documented.
