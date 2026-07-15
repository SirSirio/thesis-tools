# Prototype Tracker

Single source of truth for every physical prototype across all hardware modules:
what it is, the design parameters used to make it, and where its test data lives.

This is the **shallow / few-token layer** — scan this table to know what exists.
Open a `proto-NN-*/PROTOTYPE.md` only when you need the deep detail.

## How this is organised

- **Modules:** Each hardware module has its own folder under `prototypes/`:
  `prototypes/Prototype-N-<Module-Name>/`
- **Naming:** number + descriptive slug — `proto-NN-<descriptor>` (e.g.
  `proto-01-5ul-4roller`).
- **One folder per prototype:** `prototypes/Prototype-N-<Module>/proto-NN-<slug>/PROTOTYPE.md`
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

---

## Prototype-1-Pump-Module

| ID | Slug | Status | µL/stroke (target → measured) | Test data | Notes |
|----|------|--------|-------------------------------|-----------|-------|
| 01 | proto-01-5ul-4roller | Built, redesign pending | 5.0 → ≈3.4 (grav) | `03. CODING` (see PROTOTYPE-INDEX.md) | Under-dispenses ~32%; flow + gravimetric, see REPORT.md |
| 02 | proto-02-5ul-4roller-v2 | 2.1 built, redesign to 2.2 pending | 5.0 → partial occlusion (not yet pumped) | (pending) | 2.1: measured 2R=39.04 (R=19.52) + non-concentric wall; two causes — undersized rotor (shrink + bearing play) + head seated ~0.45mm high. 2.2: fix rotor + centre head. See PROTOTYPE.md §11 |

<!-- Add a row per pump prototype. Keep newest at the bottom. -->

### Architecture studies (not part of the proto-NN streak)

| Study | Folder | Status | Decides |
|-------|--------|--------|---------|
| Multi-liquid architecture | `multi-liquid-architecture/` | Provisional decision (A family: one motor per pump — A1 build-first, A2 upgrade), pending tests U3/U6 | Scaling to 5–6 liquids across 4 concepts: A1 (shared step bus) / A2 (independent control) / B (shared motor + pinch) / C (shared motor + engage). A1/A2 = 74–75 %, B/C = 58–59 %. Feeds future proto-04. |
| System architecture (control electronics) | `System-Architecture/` | Exploring — live cost/complexity matrix promoted to a first-class tool | Which MCU, stepper driver, and system bus for the pump-controller electronics, at what price/complexity. Interactive matrix + reasoning now live at the [System Architecture Explorer](../tools/system-architecture-explorer/index.html) (`tools/`); this folder keeps the three decision records (ARCHITECTURE.md, PUMP-CONTROL-CONCEPTS.md, SOLUTION-MATRIX.md) as design documentation. |

---

## Prototype-2-Alignment-Module

| ID | Slug | Status | Notes |
|----|------|--------|-------|
| — | (none yet) | Not yet designed | Module folder created; design work to begin. |

<!-- Add a row per alignment prototype. Keep newest at the bottom. -->

---

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
