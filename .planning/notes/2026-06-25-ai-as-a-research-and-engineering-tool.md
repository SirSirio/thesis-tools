---
title: How I Use AI as a Research & Engineering Tool
type: note
status: draft-wip
created: 2026-06-25
purpose: Raw capture of the AI-methodology narrative, fuller than the lab-meeting slide. Reuse later as a thesis paragraph/section.
source: Sirio's own description during the 2026-06-25 deck-building session.
needs: critical discussion, sharper framing, references, and honest treatment of limitations before it becomes thesis prose.
---

# How I Use AI as a Research & Engineering Tool

> **Status: working draft.** This is a capture, not finished writing. The claims
> below are mine, stated informally during a deck-building session. They are
> worth keeping, but they are *limited* and need more discussion before they go
> into the thesis (see [Open questions](#open-questions--to-sharpen)).

## 1. One-line claim

I used AI not as an answer-machine but as a **tool that compresses the distance
between an idea and its realization** — across research, design, tool-building,
data analysis, and documentation of a modular point-of-care liquid dispenser.

## 2. The four functions AI played

1. **Discuss & Design.** I talked through what to do with each prototype in a
   running, text-based conversation. AI acted as a thinking/sparring partner and
   proposed design directions and options.
2. **Build the tools.** AI helped me build the analytical tools that do the math
   for the prototypes — the calculators and models (e.g. rotor-geometry solver,
   occlusion / displaced-volume model) and the test-campaign app (DoE setup,
   randomization, Arduino command automation). I then used the **GSD** workflow
   to code them properly and publish them live on GitHub Pages.
3. **Analyze the data.** Once a prototype was built and tested, AI helped me
   process and analyze the results.
4. **Document — continuously.** Because the whole discussion happened in text,
   AI documented the process *as it happened*. The decisions, reasoning, and
   results were written down in real time, in a presentable format.

## 3. The cycle (the key insight)

These functions form a **loop**, not a pipeline:

- **Discuss & Design ⇄ Analyze** is the iterative core: I discuss what to build,
  it gets built and tested, the results are analyzed, and that feeds the next
  round of discussion. (`iterate`)
- **Document is the always-on hub at the center.** It is not a discrete step —
  it runs continuously *around* the loop. Every turn of the cycle is captured.
- **Building the tools sits outside the loop.** The tools are not self-standing
  fixtures — they evolve constantly. They are a supporting capability that feeds
  the cycle, not a stage within it.

**The payoff of documenting-in-text:** because the discussion, design rationale,
and analysis all happened in writing alongside AI, **my data and results arrive
already processed, already analyzed, and already in a presentation-ready form.**
The write-up is not a separate chore at the end — it is a byproduct of how the
work was done. (This is exactly why building the lab-meeting deck was fast: the
material was already written.)

## 4. Spec-driven development vs. GSD (keep these distinct)

- **Spec-driven development** is the *discipline*: lock decisions before plans,
  and plans before code. It keeps an AI agent's assumptions bounded.
- **GSD ("Get Sh*t Done")** is *one framework built on top of* spec-driven
  development that automates the loop (discuss → plan → execute, plus research,
  verification, atomic commits). I used GSD specifically for the **coding &
  publishing** of the tools.

These are not synonyms; GSD is one implementation of the broader idea.

## 5. Why this matters (reducing the idea→realization gap)

- AI as a **research partner**: surveys methods, models the physics, stress-tests
  assumptions before committing to a build.
- AI as a **build accelerator**: turns a validated concept into a live, offline
  tool in hours rather than weeks.
- AI as an **analysis partner**: processes experimental results.
- AI as a **documentation engine**: keeps a continuous, presentable record.

Net effect: the gap between "I have an idea for a prototype" and "I have a built,
tested, analyzed, and documented prototype" shrinks dramatically.

## 6. Concrete instances in this project

- **Math tools built with AI:** rotor-geometry solver; occlusion / displaced-
  volume model — the calculators that size the pump geometry.
- **Test-campaign app:** set DoE parameters → app designs & randomizes the run
  order → commands the Arduino directly (dose & parameters per run, no
  re-flashing) → I collect and weigh the tubes. Randomized order makes the
  experiments more statistically robust, and the whole thing runs far faster.
- **Tooling & publishing via GSD:** every tool coded and shipped live through the
  spec-driven GSD loop.
- **This documentation itself**, and the lab-meeting deck, are downstream
  artifacts of the same text-first process.

## 7. Open questions / to sharpen

These need real discussion before any of this becomes thesis text:

- **Limitations & failure modes.** Where did AI mislead or need correction? (e.g.
  the inline flow-sensor volume integration that didn't work out — gravimetric
  weigh-out is the working measure.) A thesis section must be honest about this.
- **Validation & reproducibility.** AI-assisted analysis still needs independent
  validation. How was correctness checked? What is reproducible by someone else?
- **Authorship & transparency.** How to frame AI's contribution honestly in an
  academic context — what I directed vs. what AI generated.
- **Scope of the claim.** "Already analyzed / presentation-ready" is a strong
  claim — qualify it (it speeds the *first draft* of analysis; it does not
  replace judgment or peer scrutiny).
- **Generalizability.** Is this a personal workflow anecdote, or a transferable
  method others could adopt? Decide the framing.
- **Tools-as-evolving.** The "tools change all the time" point is interesting for
  methodology — worth expanding on why that's a feature, not instability.

## 8. Possible thesis framing (parking lot)

- A short **Methodology / Tools** subsection: "AI-assisted design and analysis."
- Or a reflective passage in the discussion/conclusion on how the work was
  conducted and what that implies for solo, fast-iteration hardware research.
- Tie-in to the project's broader theme of *modularity* — the tooling is modular
  and disposable, mirroring the hardware philosophy.

---

*Related: [[2026-06-24-presentation-guidelines]] · the GSD Workflow Guide tool ·
the lab-meeting deck AI slides (AI-as-a-tool + AI-workflow-cycle).*
