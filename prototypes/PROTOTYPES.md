# Prototype Tracker

Single source of truth for every physical pump prototype: what it is, the
design parameters used to make it, and where its test data lives.

This is the **shallow / few-token layer** — scan this table to know what exists.
Open a `proto-NN-*/PROTOTYPE.md` only when you need the deep detail.

## How this is organised

- **One folder per prototype:** `prototypes/proto-NN-<slug>/PROTOTYPE.md`
- **Design lives here** (this `02. Tools` repo) because prototypes are *born*
  here — designed with the **peristaltic roller displaced-volume solver** and
  the **rotor solver**.
- **Test data lives in `03. CODING`** under `lab-data/phase-*/SESSION.md`.
  Each `PROTOTYPE.md` links **forward** to its sessions; each `SESSION.md`
  links **back** to the prototype.
- **The loop:** design (here) → test (`03. CODING`) → redesign appears as a new
  version block in the *same* `PROTOTYPE.md`. The prototype file is the thread
  that runs through the whole circular process.
- **Discussions** use `/gsd:thread` — design debates here, test/runner debates
  in `03. CODING`.

## Registry

| ID | Slug | Status | µL/stroke (target → measured) | Test data | Notes |
|----|------|--------|-------------------------------|-----------|-------|
| 01 | proto-01 | Built, redesign pending | 5.0 → ≈3.5 | [03. CODING lab-data] | Under-dispenses ~29%; manual redesign data collected |

<!-- Add a row per prototype. Keep newest at the bottom. -->
