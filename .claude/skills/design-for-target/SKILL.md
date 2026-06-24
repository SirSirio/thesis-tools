---
name: design-for-target
description: >
  Activate when Sirio wants to design a new module or the next version of a prototype toward
  a target spec — the forward direction, not diagnosis. Trigger on phrases like: "design X
  for a target of Y", "what should I build to hit", "spec the next version", "I need a module
  that does", "how should I design", "let's design proto-N", "what are my options for",
  "help me decide what to build". Use when the question is "build me an informed concept"
  rather than "what's wrong with this". Generic across the whole system (pump, positioning
  stage, thermal module, fixture — anything with a function to fulfil and a target to hit).
---

# Design for Target

A repeatable procedure for designing a module toward an explicit target — generic across any
prototype in the system. It produces an **informed, explicit decision**: what to build, why
that concept over the alternatives, and what it must be tested against. It brings the method;
the folder brings the subject. Run under the `sparring-partner` posture (challenge the target
and the assumptions before committing) and tag non-trivial claims `[Certain]/[Likely]/[Guessing]`.

The method chain, in order:
1. **Target & constraints** — pin down what "good" means before generating anything.
2. **Function–means decomposition** — break the job into subfunctions.
3. **Morphological chart** — subfunctions × candidate means → concepts.
4. **Pugh matrix** — score concepts against a datum (usually the prior prototype) and select.
5. **Design-rationale record** — the explicit decision, captured.

---

## Step 0 — Ground yourself in context (always first)

Read the relevant `.md` files in the current folder and any module/prototype folder it points
to: the target/spec, constraints, available materials/parts, and — critically — any
**`diagnose-gap` findings from the prior version**. If we're designing proto-N, the previous
prototype's diagnosis is the most valuable input: the cause we're trying to fix becomes a
design driver. State back what the module is, the target, and what we already learned.

If the target itself is fuzzy or missing, that's Step 1's job — don't generate concepts against
an undefined target.

---

## Step 1 — Define the target and constraints explicitly

Before any ideation, write down:

- **Target(s)** — the measurable goal(s) with units and tolerance (e.g. "5 µL/stroke, ±5%").
- **Hard constraints** — what cannot move (footprint, parts on hand, cost, manufacturability
  at Sirio's skill/tooling level, thesis deadline).
- **Drivers from the last version** — what the prior `diagnose-gap` says must change.

This list *is* half the "informed decision" — challenge a vague target here (`sparring-partner`
posture). A concept generated against a sloppy target is wasted.

---

## Step 2 — Function–means decomposition

Decompose the primary function into subfunctions (a function–means tree). State each as a
solution-neutral verb+noun ("occlude tube", "advance roller", "locate sample", "hold position")
so the means stay open. This is the backbone of the morphological chart.

---

## Step 3 — Morphological chart (discuss → agree before selecting)

Build the chart: **subfunctions in rows, candidate means in columns.** For each subfunction,
list 2–4 genuinely different means (use first-principles and adjacent-field thinking to widen
the options, not just variants of the current design). A **concept** is one mean chosen per row.

Discuss the means with Sirio and converge on the handful of complete concepts worth comparing.
**Do not auto-generate the visual artifact** — that's an explicit, on-request step (see below).

---

## Step 4 — Pugh matrix → select

Pick a **datum** (normally the current/prior prototype) and score each candidate concept against
it per criterion (the targets and constraints from Step 1), using +/0/−. Sum, then read the
result as guidance — not gospel. Look for a concept that dominates, or combine the strongest
columns into a hybrid and re-score. State *why* the winner wins, including where it's weak.

---

## Step 5 — Design-rationale record (the output)

Close with a tight, explicit record so the decision is reviewable later (and feeds the
prototype's page / design-log):

1. **What we're building** — the selected concept and its key parameters/dimensions.
2. **Why** — the decisive criteria, and what we rejected and why.
3. **What it must be tested against** — the targets it claims to hit (hands off to `plan-the-test`).
4. **Open risks / assumptions** — tagged, so the test plan can target them.

Keep it decision-ready, not exhaustive.

---

## Optional — visual artifact (ON REQUEST ONLY)

When — and only when — Sirio explicitly asks (e.g. "make the morphological chart", "build the
artifact", "visualize this"), generate a self-contained HTML artifact of the morphological
chart and/or Pugh matrix:

- Static HTML/CSS only, no build step, no CDN-only deps — matches the site's hard constraints
  so it can be **dropped into the report or integrated into the prototype page** later.
- Reuse `assets/style.css` tokens (dark glassmorphic theme) where it'll live on the site.
- Render the agreed functions × means (highlighting the selected concept's path) and/or the
  scored Pugh matrix.

**Never** produce this automatically — it costs tokens and only makes sense once the functions
and means are discussed and agreed. Generating it before convergence is a waste; wait for the word.

---

## Principles

- **Target before concepts.** Never ideate against an undefined goal.
- **Feed the loop.** The prior version's `diagnose-gap` output is a primary input; the chosen
  concept's targets are `plan-the-test`'s input. The three skills form a cycle.
- **Widen the means.** Use first-principles and adjacent-field lenses so the morphological chart
  holds real alternatives, not cosmetic variants.
- **The decision must be explicit.** The rationale record is the deliverable, not the chart.
- **Artifact only on request.** Discuss → agree → (if asked) visualize.
- **Tag confidence** on every non-trivial claim.
