---
status: complete
---

# Quick Task 260720-msp — Summary

**Add a Microstepping (fixed | dynamic) control to the pin budget + verify all pin figures.**

## What changed

`tools/system-architecture-explorer/index.html`
- New `msMode` state ('fixed' default) + a **Pin budget → Microstepping** control in Controls.
- `pinsOf()` adds +3 (shared M0/M1/M2 bus) only for `dk==='dumb' && pinsC>0` variants under
  `dynamic`; smart/motion and offloaded variants unaffected.
- OVERRUN readout now shows **"OVERRUN by N"** (deficit = used − avail) so the control has a
  visible effect and rows show how far over budget they are.
- Layer-C theory prose now states the jumpered-microstepping assumption explicitly and names the
  real overrun driver (6-driver ENABLE/STEP-DIR fan-out, not microstepping).
- Load-time WR-04 DOM-restore guard extended to `fMicro`.

`tools/system-architecture-explorer/SPEC.md`
- Pin-budget formula gains the `msPins` term; new Microstepping table + verification note.

## Research
Full figure-by-figure verification in `260720-msp-RESEARCH.md`. All eight load-bearing figures
(ESP32 GPIO, DRV8825 microstep/RST-SLP, TMC2209 UART, SPI screen, I²C/RS-485/CAN) confirmed against
primary sources. Key correction: the model already assumed *fixed* microstepping, so the overrun is
a driver-fan-out problem, not a microstepping one.

## Verification
- `node --check` on the extracted script: pass.
- Browser (playwright, local server): control renders, defaults to fixed, and toggling to dynamic
  moves S1-i2c 4→7, D2-i2c 8→11, ESPINT-dumb 2→5, while T9-fused (smart) and P6-rp (offloaded)
  stay unchanged. Default `fixed` reproduces every prior number. Only console error is a
  pre-existing favicon 404.
