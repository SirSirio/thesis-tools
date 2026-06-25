---
id: align-01
module: Prototype-2-Alignment-Module
title: Alignment Module — sample-rack indexing stage (V2)
status: prototype-validated-single-rack
created: 2026-06-25
updated: 2026-06-25
---

# Alignment Module

The alignment module **hosts the samples and indexes them under the dispensing
nozzle**. It is one of the core mechanical subsystems of the modular
point-of-care liquid dispenser. (Note: it does *not* move the dispensing head —
it moves the samples.)

## Purpose

- **Hosts the samples.** Samples arrive in microcentrifuge tubes (1.5 or 2 mL),
  stored in a **custom-made rack of 8**.
- **Designed to integrate with Pulkit's tube opener** — the wide spacing between
  sample positions exists specifically so the tube-opener mechanism can fit.
- **Eases transport.** The rack holds the samples together so a whole set can be
  moved and loaded at once.
- **Indexes under the nozzle.** The system moves the rack so each tube can be
  placed, in turn, under the dispensing module (nozzle) that delivers the liquid.

## Design priorities

The design was driven by three priorities: **cleanliness**, **compactness**, and
**safety from cross-contamination**.

### Gravity-protected layout (spillage safety)

- The **stepper motor** (chosen for precision) and the **pusher** are mounted on
  **top** of the assembly — see the snapshot from the V2 video.
- Mounting them up high keeps them **safe from spillage**: liquid travels
  **downward**, not upward, so splashes and spills cannot reach the drive train.
- The **moving parts and gear** — which are hard to clean — are therefore
  **inaccessible to liquid**. Gravity acts as the protector.
- The **pusher travels on the vertical axis**, which lets the nozzle deliver and
  dispense in a **linear** way.

## Status & validation

- **Current build (V2):** moves **one rack at a time**, and does this job well
  enough — **this step is proven**.

## Next steps / future perspective

- Add an **input queue** and an **output queue** so the module can hold and
  handle a queue of **at least four racks**.
- Handle those racks **automatically**, for **seamless, fast** processing of a
  **higher throughput** of samples.

---

## Media

- `Alignment_Module_V2.mp4` — V2 in motion (used in the lab-meeting deck).

*Design iterations will continue to be documented here.*
