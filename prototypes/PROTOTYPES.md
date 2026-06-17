# Prototype Tracker

Single source of truth for every physical pump prototype: what it is, the
design parameters used to make it, and where its test data lives.

This is the **shallow / few-token layer** — scan this table to know what exists.
Open a `proto-NN-*/PROTOTYPE.md` only when you need the deep detail.

## How this is organised

- **Naming:** number + descriptive slug — `proto-NN-<descriptor>` (e.g.
  `proto-01-5ul-4roller`).
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
| 01 | proto-01-5ul-4roller | Built, redesign pending | 5.0 → ≈3.4 (grav) | `03. CODING` (see PROTOTYPE-INDEX.md) | Under-dispenses ~32%; flow + gravimetric, see REPORT.md |
| 02 | proto-02-5ul-4roller-v2 | Design in progress | 5.0 → TBD | (pending build) | Fixes proto-01: N_c=2 (R≈19.7), 4-head gap sweep, screw-clamp lock, 0.10mm fit; targets CV≤5% |

<!-- Add a row per prototype. Keep newest at the bottom. -->

## Test results contract (cross-repo)

Each prototype is judged by a **per-prototype test plan** declared in its
`PROTOTYPE.md` (setpoint grid + pass targets). The schema for that plan is being
designed — see `.planning/notes/2026-06-15-prototype-test-schema-decision.md`
(candidate for its own phase).

Flow: **design declares targets (here) → run + analyze (`03. CODING`) → emit
structured report (`03. CODING`) → distilled snapshot copied back into the
prototype folder here.** The `03. CODING` side has a contact point at its
`PROTOTYPE-INDEX.md` and is **waiting on the schema decision** before emitting
reports.
