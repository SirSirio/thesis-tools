---
name: diagnose-gap
description: >
  Activate when a prototype, module, or component does not perform as designed and Sirio
  wants to understand WHY before changing anything. Trigger on phrases like: "it should
  do X but it does Y", "why is it under/over-performing", "this measured worse than I
  designed for", "diagnose this", "what's causing the gap", "it's off by N%", "didn't hit
  the target", or any expected-vs-observed mismatch (dispensed volume, position accuracy,
  temperature, timing, force — any module). Use whenever the question is "what's wrong and
  what do I change?" rather than "build me a new thing". Generic across the whole system,
  not just the pump.
---

# Diagnose Gap

A repeatable procedure for diagnosing why a module misses its target — generic across any
prototype in the system (dispensing pump, positioning stage, thermal module, anything with
a designed target and a measured result). It brings the *method*; the folder brings the
*subject*. Run it under the `sparring-partner` posture: do not settle on the first plausible
cause, and tag every non-trivial claim `[Certain]` / `[Likely]` / `[Guessing]`.

The skill combines three generic methods:
1. **Error budget** — quantitative reconciliation from the governing model down to the measurement.
2. **Adapted fishbone** — breadth-first cause map so nothing obvious is missed.
3. **Is / Is-Not (change analysis)** — narrow and rank using the data that already exists.

---

## Step 0 — Ground yourself in context (always first)

Before reasoning, read the module's own documents. Look in the current folder (and the
prototype/module folder it points to) for `.md` files — typically a `PROTOTYPE.md`, a
`SPEC.md`, a tracker, or a test `REPORT.md`. Extract and state back:

- **What the module is** and what it's supposed to do
- **Target** — the designed/intended value (with units)
- **Observed** — the measured value(s), including *how* they were measured
- **Design parameters** — the dimensions/materials/settings that produced this build
- **Governing model** — any formula or tool that predicts the target (e.g. a SPEC's
  formulas, or one of the site's calculators)

If a needed number or document is missing, say so explicitly and proceed with what exists.
Never invent parameters — flag the gap and ask, or mark it `[Guessing]`.

---

## Step 1 — Frame the gap (error budget)

State the gap plainly: **target − observed = deficit (and % of target).**

Then build an **error budget**: start from what the governing model *predicts*, and account
for the deviation by subtracting (or adding) named mechanisms until the numbers reconcile
with the observed value. Each line is "mechanism → estimated contribution → confidence tag."

- When numbers exist, make it numeric — the deficit becomes an accounting problem, not a guess.
- When no model or numbers exist, fall back to a **qualitative** budget: list the expected
  behaviour, the observed behaviour, and the candidate mechanisms for the difference. Reason
  with numbers when you can, with structured logic when you can't.

The budget is a hypothesis, not an answer — its job is to expose which mechanisms could
plausibly be large enough to matter, and which are too small to explain the gap.

---

## Step 2 — Map causes broadly (adapted fishbone)

Before drilling, ensure breadth. Derive cause categories from the module's context; default
to the generic six (Method, Machine/Equipment, Material, Measurement, Environment, and
Design/Geometry), renaming them to fit the module. Under each category, list candidate
causes — including ones the error budget didn't surface.

Pay special attention to the **Measurement** category: a "gap" can be partly or wholly a
measurement artifact (wrong reference, calibration, two methods disagreeing). Rule this out
before chasing physical causes.

The output of this step is a complete candidate set, not a ranked one.

---

## Step 3 — Narrow and rank (Is / Is-Not + why-drill)

Now exploit whatever data varies, using **Is / Is-Not** change analysis:

- Where/when does the gap **appear**, and where/when does it **not**?
- Does it **scale** with something (commanded value, rate, load, time, temperature)?
- Do two measurement methods **disagree**, and by how much? (the disagreement is itself a clue)

Each contrast eliminates candidate causes (a cause that can't explain why the gap is absent
*here* but present *there* is demoted). For the surviving lead cause, run a short **why-drill**:
ask "why" down the chain to the most upstream controllable cause (the one you can actually
change in the next build).

Produce a **ranked shortlist** of causes, each with a confidence tag and the evidence that
supports or weakens it.

---

## Step 4 — Output: what to change, and how to confirm it

Close with a decision-ready summary:

1. **Ranked causes** — top 1–3, each with confidence tag and supporting evidence.
2. **The single change most likely to close the gap** — which design parameter or setting,
   in which direction, and the predicted effect on the target (numeric if possible).
3. **How to confirm it** — what to measure or vary next to distinguish the leading cause from
   the runners-up. This is the natural hand-off to `plan-the-test` (the suspected causes
   become the factors to test).

Keep it tight. The goal is an informed, explicit next move — not an exhaustive catalogue.

---

## Principles

- **Context first, always.** The method is generic; the answer comes from the module's own files.
- **Reason with numbers when they exist, structure when they don't.** Never let absence of
  data stop the diagnosis — make the uncertainty explicit instead.
- **Don't settle on the first cause.** Run all three methods; the error budget and the
  fishbone routinely surface a larger contributor than the obvious one.
- **Separate measurement artifacts from real causes** before recommending a physical change.
- **Tag confidence** on every non-trivial claim, exactly as `sparring-partner` does.
- **Stop when it's decision-ready.** A ranked shortlist + one recommended change + one
  confirming test is the finish line.

---

## Generic worked sketches

**Dispensing pump (under-dispense):** target 5 µL/stroke, observed 3.4 µL (−32%). Error
budget starts from the displaced-volume model's predicted swept volume, subtracts back-leak
from incomplete occlusion, restitution lag, and hand-off backflow. Fishbone adds a
Measurement branch (flow-meter vs gravimetric disagree → ~600 vs ~678 µL). Is/Is-Not asks
whether the deficit scales with commanded volume and why the two methods differ. Output:
ranked causes + which geometric parameter (e.g. occlusion arc / roller gap) to change + a
test to confirm.

**Positioning stage (misalignment):** target = sample centred under the nozzle, observed =
offset by N mm. Error budget (qualitative or numeric) accounts for backlash, belt stretch,
step loss, and home-reference error. Fishbone categories adapt to Method/Mechanism/Material/
Measurement/Environment/Geometry. Is/Is-Not asks whether the offset is constant or grows
with travel distance (constant → reference/zeroing; growing → steps-per-mm or slip). Output:
ranked causes + the one calibration/parameter to change + a confirming move.
