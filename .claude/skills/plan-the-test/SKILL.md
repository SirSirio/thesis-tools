---
name: plan-the-test
description: >
  Activate when Sirio wants to decide what to test and how to test it efficiently — before
  running experiments or building the next prototype to learn from it. Trigger on phrases like:
  "how should I test this", "what should I measure", "plan the experiment", "design a test",
  "what do I need to test", "how do I confirm the cause", "set up a DOE", "which variables
  matter", "I want to learn the most from one build". Use to turn suspected causes or design
  parameters into an efficient experiment plan. Generic across the whole system, not just the pump.
---

# Plan the Test

A repeatable procedure for designing an experiment that extracts the **most information per
build/run** — generic across any module. It turns suspected causes (from `diagnose-gap`) or
design parameters (from `design-for-target`) into a concrete test plan with a clear decision
rule. It brings the method; the folder brings the subject. Run under the `sparring-partner`
posture and tag non-trivial claims `[Certain]/[Likely]/[Guessing]`.

Core stance from DOE practice: **OFAT (one-factor-at-a-time) is the trap** — slow, and blind
to interactions. For a handful of physical builds, structured designs (full or fractional
factorial, screening arrays) get near-full insight at a fraction of the runs.

---

## Step 0 — Ground yourself in context (always first)

Read the relevant `.md` files: what's being built or changed, the target spec, and any prior
`diagnose-gap` shortlist or `design-for-target` parameters. State back the **purpose** of the
test in one line — that purpose decides everything downstream.

---

## Step 1 — Name the responses and the objective

- **Responses** — what you will actually measure (volume, CV, position error, temperature,
  time…), with units and how it's measured. A test with a fuzzy response teaches nothing.
- **Objective** — which experimentation stage is this? **Screening** (which factors matter?),
  **optimization** (what settings are best?), **robustness** (insensitive to noise?), or
  **verification** (does the fix work?). The objective sets the design type and size.

---

## Step 2 — Choose factors and levels

- **Factors** — the controllable variables to vary. Pull them directly from the upstream skill:
  `diagnose-gap`'s suspected causes become the factors to confirm; `design-for-target`'s open
  parameters become the factors to tune. Include only factors plausibly large enough to matter.
- **Levels** — the settings per factor. Choose levels **far enough apart** that the effect
  exceeds normal run-to-run variation — levels too close to each other hide a real effect.
- **Noise factors** — name what you can't control (temperature, tube batch, operator) so you can
  block, randomize, or at least record them.

---

## Step 3 — Pick the design (match to factor count and build budget)

- **1 factor:** a few levels, replicated — simplest case, but watch for confounding with noise.
- **2–3 factors:** **full factorial** (all combinations) — manageable and reveals interactions.
- **4+ factors, or runs are expensive:** **fractional factorial / screening (Plackett–Burman,
  Taguchi array)** — far fewer runs; accept that some interactions are confounded.
- Always: **randomize run order** where feasible, and **replicate** at least one point to
  estimate noise. State explicitly what each design can and cannot resolve.

If a numeric design is overkill (e.g. a quick qualitative check), say so and propose the
minimal confirming observation instead — reason with numbers when they help, not for ritual.

---

## Step 4 — Output: the test plan

Produce a decision-ready plan:

1. **Run table** — each run with its factor settings and the response(s) to record.
2. **What each run teaches** — tie runs back to the hypotheses they confirm or kill.
3. **Decision rule** — stated *before* running: what result would confirm the leading cause,
   what would exonerate it, and what the next move is in each case.
4. **Effort estimate** — number of runs/builds and a sanity check against the budget.

Keep it tight enough to actually execute.

---

## Principles

- **Most information per build.** Every run should change a belief; if a run can't change the
  decision, cut it.
- **Avoid OFAT** unless there's a real reason (e.g. only one factor, or safety). Prefer designs
  that expose interactions.
- **Levels wide, noise named.** Effects must beat the noise floor; record what you can't control.
- **Decision rule before data.** Decide what each outcome means before you run — this is what
  stops post-hoc rationalizing.
- **Close the loop.** Test results feed back into `diagnose-gap` (confirm the cause) or the next
  `design-for-target` iteration.
- **Tag confidence** on every non-trivial claim.
