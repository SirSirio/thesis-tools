---
title: Prototype tracker + thesis-discussion architecture (handover)
date: 2026-06-15
context: Decision from a /gsd:explore session run in 03. CODING. This note is the
  handover so work can continue in THIS (02. Tools) repo.
---

# Prototype tracker & discussion architecture — handover

**Read this first.** It is the entry point for the prototype-documentation work.
It captures a decision made in a Claude Code session rooted in `03. CODING`;
since sessions are folder-rooted and ephemeral, the handover is this file (not a
chat log). After reading, `/gsd:resume-work` or just continue.

## The decision

Track prototypes in a dedicated **prototype tracker in this repo** (`02. Tools`),
because prototypes are *designed* here with the **peristaltic roller
displaced-volume solver** and the **rotor solver**.

- Tracker root: `prototypes/` → `PROTOTYPES.md` (index) + `proto-NN-*/PROTOTYPE.md`.
- The **prototype is the spine** of the circular process:
  design (here) → test (`03. CODING/lab-data`) → redesign (new version block in
  the same PROTOTYPE.md).
- **Two-tier knowledge** (the explicit goal): `PROTOTYPES.md` table + STATE.md =
  shallow/few-token grab; `PROTOTYPE.md` bodies = deep, resurfaced on demand.
- **Test data is NOT duplicated here** — it stays in `03. CODING` and is
  cross-linked. `PROTOTYPE.md` → `SESSION.md` forward; `SESSION.md` → prototype
  back.

## Why not a new tool (Cowork/Notion) or a custom skill

- Discussions feed the LaTeX thesis (`01. Thesis Document LaTex`); keeping them
  in-repo avoids a sync/fragmentation problem.
- GSD already provides the machinery — no custom skill needed:
  - `/gsd:thread` = persistent saved discussions (design debates here;
    test/runner debates in `03. CODING`).
  - `/gsd:extract-learnings` = distills a finished thread into one-liners for the
    shallow layer.

## What was created in this handover

- `prototypes/PROTOTYPES.md` — index + conventions.
- `prototypes/proto-01/PROTOTYPE.md` — first entry, pre-filled with known facts
  (≈3.5 µL/stroke vs 5.0 target; redesign pending; manual data exists in
  `03. CODING/manual-dispense-check/`). Has TODO placeholders for the design
  params that weren't in the handover.

## Next steps

1. Back-fill proto-01 design params (roller count, tube ID, rotor geometry,
   solver displaced-volume) from the solver/build notes.
2. When starting the redesign, open `/gsd:thread proto-01 redesign` here and add
   a v2 block to `PROTOTYPE.md`.
3. Add a reciprocal "Prototype: proto-01" line to the relevant
   `03. CODING/lab-data/phase-*/SESSION.md`.

## Related (other repo)

- `03. CODING/.planning/todos/pending/2026-06-15-prototype-documentation-system.md`
  — the original capture that started this.
