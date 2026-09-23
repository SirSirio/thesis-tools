# Rephrasing the deck with Gemini — slide by slide

**Deck:** `decks/thesis-defense/`
**Thesis LaTeX:** `D:\03. DTU - Offline\03. MASTER THESIS\01. Thesis Document LaTex\latex`

This is the working document. `HANDOVER-COPY-PART1.md` stays as the full
reference, but use this one: it is built to be run **one slide at a time**, so you
can paste a block, look at what comes back, and keep it or throw it away before
moving on.

---

## How to run it

1. Paste **§A The standing brief** into Antigravity once, at the start of the session.
2. Then paste **one slide block** from §C. Nothing else.
3. Read what comes back. Keep it, or say “again, shorter” and re-run that one block.
4. Send the lines you approve back to me. I paste them in, re-measure the layout at
   1280 × 720 and re-check every fact against the thesis.
5. Next slide.

You do not have to go in order, and you do not have to do all of them. Slides 5 and
14 have almost no text; slide 4 is structural. The ones worth your time are
**2, 6, 7, 8, 9, 15 and 16**.

---

## §A The standing brief — paste this once

> You are rewriting the on-screen text of slides for a 30-minute MSc thesis defense
> at DTU Bioengineering on 28 September 2026. The speaker is Sirio Vittorio Feltrin
> and he built the machine the talk is about. The thesis is *Design of an Automated
> and Portable Liquid Dispensing System in the µL scale for Biological Applications*.
> 
> I will give you one slide at a time. For each one you get: what the slide has to
> achieve, every string currently on it with its font size and a length budget, and
> what must not change. Return the same numbered list with your replacement for each
> string, and nothing else. If a line should be cut, write DELETE and one short reason.
> 
> Rules, in order of importance:
> 
> 1. **He narrates; the slide does not.** Anything he would say out loud does not
>    belong on screen. The slide shows the evidence; he supplies the sentences.
> 2. **Cut filler.** Delete any line that only announces what is coming, or labels
>    something already obvious. If a line can go without loss, say DELETE.
> 3. **A title states a finding, not a topic.** A full sentence, ending in a full stop.
> 4. **Everything else is a fragment** — two to six words, lower case unless it is a
>    proper noun.
> 5. **No marketing register.** No “seamless”, “cutting-edge”, “leverages”, “enables”,
>    “robust solution”. No exclamation marks and no rhetorical questions.
> 6. **Keep the real terms**: lyse, elute, peristaltic, coefficient of variation.
> 7. **British spelling.** Units with a space: 5 µL, 1000 µL, ±10 %, 0.4 mm.
> 8. **The module is called “alignment”, never “stage”.**
> 9. **Never print an internal code** — no S07, no D-04, no R3.
> 10. **Never change a number, unit, instrument name, author or year.** If a sentence
>     reads badly because of a number, rewrite around it and keep the number. If you
>     think a fact is wrong, say so in a note — do not quietly correct it.
> 11. **Respect the length budget.** The layout is fixed pixel geometry: a line that
>     doubles in length runs off the slide.
> 
> Confirm you have understood, then wait for the first slide.

---

## §B Where each slide comes from in the thesis

Gemini does not need to read any of this to rephrase — each slide block already
carries the facts. This table is for when an answer looks wrong and you want to
check it, or when a slide is fighting you and you want to paste it the source
paragraph.

| Slide | Cue | Read this |
|-------|-----|-----------|
| — | `s00` | Frontmatter (the title page). |
| 1 | `s01` | Frontmatter (the title page). |
| 2 | `s02` | `Chapters/01_Introduction.tex` §1.1 Motivation. |
| 3 | `s04` | `Chapters/01_Introduction.tex` §1.1; `Chapters/02_Background.tex` §2.1. |
| 4 | `s03` | No thesis source — this is the deck's own structure. |
| 5 | `s05` | No thesis source. |
| 6 | `s06` | `Chapters/02_Background.tex` §2.4 Existing solutions, and §2.6 The gap. |
| 7 | `s04b` | `Chapters/01_Introduction.tex` §1.3; `Backmatter/App-A-Protocol-Survey.tex`. |
 `Chapters/01_Introduction.tex` §1.1 (PANPOC); `Chapters/02_Background.tex` §2.1. |
| 8 | `s07` | `Chapters/05_Requirements-and-Decomposition.tex` §5.1 and §5.4 (Tables 5.3 and 5.4). |
| 10 | `s07b` | `Chapters/05_Requirements-and-Decomposition.tex` §5.5, Figure 5.3. |
| 11 | `s10` | `Chapters/05_Requirements-and-Decomposition.tex` §5.5, Figure 5.2. |
| 12 | `s09a` | Chapter 3 is titled 'Methodology'; chapter 4 is 'Engineering with AI: from Design to Documentation'. |
| 13 | `s09b` | `Chapters/03_Methodology.tex` §3.3; `Backmatter/App-C-Printer-Characterization.tex`. |
| 14 | `s08a` | Chapter 4 title: 'Engineering with AI: from Design to Documentation'. |
| 15 | `s08` | `Chapters/04_Engineering-with-AI.tex` §4.1 (the three failure modes and the house analogy), §4.2. |
| 16 | `s09` | `Chapters/04_Engineering-with-AI.tex` §4.2 (GSD and its five steps), §4.3 (the skills), §4.4 (the citation pipeline). |

Chapter 3 is `03_Methodology.tex`, chapter 4 is `04_Engineering-with-AI.tex`. The
appendix filenames do not match their printed letters — the AI appendix is the file
`App-H-AI-Use.tex` but prints as **Appendix E**. Do not print an appendix letter on a
slide without checking a real build.

---

## §C The slide blocks

Each block is self-contained. Paste one, fenced code and all.

---

### Slide — — `s00`

```
SLIDE —

What this slide has to achieve:
  Hold screen while the room fills.

Must not change:
  The title and subtitle are the thesis front matter word for word. Do not touch them.

The strings, as they are now:
  1. [34 px · ~84 characters per line]
     Design of an Automated and Portable Liquid Dispensing System in the µL scale for Biological Applications
  2. [22 px · stay within 15 % of the current length]
     Bringing sample preparation to the point of care
  3. [19 px · stay within 15 % of the current length]
     Sirio Vittorio Feltrin

Return the numbered list with your replacements.
```

---

### Slide 1 — `s01`

```
SLIDE 1

What this slide has to achieve:
  The cover: who, what, when.

Must not change:
  The title and subtitle are the thesis front matter word for word. Do not touch them. Supervisor names and the date are fixed.

The strings, as they are now:
  1. [19 px · stay within 15 % of the current length]
     MSc thesis defense · DTU Bioengineering · NaBIS
  2. [44 px · ~46 characters per line, 2 lines maximum]
     Design of an Automated and Portable Liquid Dispensing System in the µL scale for Biological Applications
  3. [26 px · ~84 characters per line]
     Bringing sample preparation to the point of care
  4. [27 px · ~84 characters per line]
     Sirio Vittorio Feltrin
  5. [19 px · stay within 15 % of the current length]
     Supervisors Maria Dimaki · Winnie Edith Svendsen · Lars Hvam · 28 September 2026

Return the numbered list with your replacements.
```

---

### Slide 2 — `s02`

```
SLIDE 2

What this slide has to achieve:
  Show that a lab test takes a day and a point-of-care test takes hours, and turn that into the talk.

Must not change:
  26 h, 2.6 h and the Collier citation. The 'under 1 h' row is the author's own target and has NO citation — the wording must not make it sound like a measured result.

The strings, as they are now:
  1. [44 px · ~46 characters per line, 2 lines maximum]
     A test that takes a day comes too late.
  2. [21 px · stay within 15 % of the current length]
     standard molecular testing, the hospital’s own lab
  3. [34 px · ~84 characters per line]
     >26 h
  4. [21 px · stay within 15 % of the current length]
     a portable molecular test at the point of care
  5. [34 px · ~84 characters per line]
     2.6 h
  6. [21 px · stay within 15 % of the current length]
     the target — an answer before they leave
  7. [30 px · ~84 characters per line]
     under 1 h
  8. [18 px · stay within 15 % of the current length]
     one study, same hospital, same patients · Collier et al. 2020
  9. [30 px · ~84 characters per line]
     The test can travel to the gate. The sample preparation cannot yet.

The slide also carries the time axis (0, 4 h, 8 h, 12 h, 16 h, 20 h, 24 h). That is
furniture, not prose — leave it out of your answer.

Return the numbered list with your replacements.
```

---

### Slide 3 — `s04`

```
SLIDE 3

What this slide has to achieve:
  One photograph of a field laboratory. The title carries the whole point.

Must not change:
  The image credit line.

The strings, as they are now:
  1. [44 px · ~46 characters per line, 2 lines maximum]
     Bringing the lab to the sample often still requires pipetting and an expert.
  2. [18 px · stay within 15 % of the current length]
     Carlier et al. 2022 · CC BY 4.0

Return the numbered list with your replacements.
```

---

### Slide 4 — `s03`

```
SLIDE 4

What this slide has to achieve:
  The table of contents. Five rows.

Must not change:
  Part I / Part II / Part III / Demo / Then — these five labels are reprinted in the corner of every later slide, so they must stay short and stay identical.

The strings, as they are now:
  1. [44 px · ~46 characters per line, 2 lines maximum]
     Contents
  2. [19 px · stay within 15 % of the current length]
     Part I
  3. [31 px · ~84 characters per line]
     Why this machine, and how I worked
  4. [20 px · stay within 15 % of the current length]
     the gap · the requirements and the modules · working with an AI
  5. [19 px · stay within 15 % of the current length]
     Part II
  6. [31 px · ~84 characters per line]
     The modules
  7. [20 px · stay within 15 % of the current length]
     pump · alignment · nozzle · interface · storage
  8. [19 px · stay within 15 % of the current length]
     Part III
  9. [31 px · ~84 characters per line]
     The machine
  10. [20 px · stay within 15 % of the current length]
     electronics · integration · validation
  11. [19 px · stay within 15 % of the current length]
     Demo
  12. [31 px · ~84 characters per line]
     Live demo
  13. [20 px · stay within 15 % of the current length]
     the machine runs, here, for five minutes
  14. [19 px · stay within 15 % of the current length]
     Then
  15. [31 px · ~84 characters per line]
     What I learned, what comes next
  16. [20 px · stay within 15 % of the current length]
     and the closing

Return the numbered list with your replacements.
```

---

### Slide 5 — `s05`

```
SLIDE 5

What this slide has to achieve:
  Part I divider. Large type, nothing else.

The strings, as they are now:
  1. [22 px · stay within 15 % of the current length]
     Part I
  2. [84 px · ~46 characters per line, 2 lines maximum]
     Why this machine, and how I worked.
  3. [24 px · ~84 characters per line]
     The gap, the requirements, the way of working.

Return the numbered list with your replacements.
```

---

### Slide 6 — `s06`

```
SLIDE 6

What this slide has to achieve:
  Show that no existing instrument is precise, portable, unattended and protocol-open at once.

Must not change:
  Every price, instrument name and CV. The two cobas liat figures are not from the thesis (reseller price; CADTH 2015 per-test) — leave them alone.

The strings, as they are now:
  1. [44 px · ~46 characters per line, 2 lines maximum]
     No instrument today is precise, portable, unattended and open to any protocol at once.
  2. [18 px · stay within 15 % of the current length]
     precise
  3. [18 px · stay within 15 % of the current length]
     across range
  4. [18 px · stay within 15 % of the current length]
     portable
  5. [18 px · stay within 15 % of the current length]
     unattended
  6. [18 px · stay within 15 % of the current length]
     any protocol
  7. [18 px · stay within 15 % of the current length]
     price
  8. [20 px · stay within 15 % of the current length]
     laboratory systems
  9. [18 px · stay within 15 % of the current length]
     Tecan Fluent
  10. [25 px · ~84 characters per line]
     $25–80k
  11. [18 px · stay within 15 % of the current length]
     used
  12. [20 px · stay within 15 % of the current length]
     integrated platforms
  13. [18 px · stay within 15 % of the current length]
     Roche cobas liat
  14. [25 px · ~84 characters per line]
     $11k
  15. [18 px · stay within 15 % of the current length]
     $100 per test
  16. [20 px · stay within 15 % of the current length]
     portable and open-source
  17. [18 px · stay within 15 % of the current length]
     Sidekick, Keesey 2022
  18. [25 px · ~84 characters per line]
     $710
  19. [18 px · stay within 15 % of the current length]
     build cost
  20. [20 px · stay within 15 % of the current length]
     what the field needs
  21. [18 px · stay within 15 % of the current length]
     Tecan · Roche · Keesey et al. 2022 (CC BY)

Return the numbered list with your replacements.
```

---

### Slide 7 — `s04b`

```
SLIDE 7

What this slide has to achieve:
  Show that the volume range was read out of real protocols, not guessed.

Must not change:
  5–1000 µL, 'up to six', and the five field names.

The strings, as they are now:
  1. [44 px · ~46 characters per line, 2 lines maximum]
     The range was read out of five field protocols, not estimated.
  2. [26 px · ~84 characters per line]
     Five off-site protocols representing different disciplines were evaluated in full, with all operational volumes recorded.
  3. [22 px · stay within 15 % of the current length]
     🧬
  4. [19 px · stay within 15 % of the current length]
     clinical and veterinary
  5. [18 px · stay within 15 % of the current length]
     the PANPOC protocol
  6. [22 px · stay within 15 % of the current length]
     🌱
  7. [19 px · stay within 15 % of the current length]
     plant and field molecular
  8. [22 px · stay within 15 % of the current length]
     💧
  9. [19 px · stay within 15 % of the current length]
     water chemistry
  10. [22 px · stay within 15 % of the current length]
     🌾
  11. [19 px · stay within 15 % of the current length]
     agriculture
  12. [22 px · stay within 15 % of the current length]
     🌲
  13. [19 px · stay within 15 % of the current length]
     soil chemistry
  14. [18 px · stay within 15 % of the current length]
     5 µL
  15. [18 px · stay within 15 % of the current length]
     1000 µL
  16. [44 px · ~46 characters per line, 2 lines maximum]
     5 – 1000 µL
  17. [20 px · stay within 15 % of the current length]
     per liquid
  18. [44 px · ~46 characters per line, 2 lines maximum]
     up to 6
  19. [20 px · stay within 15 % of the current length]
     reagents in one run
  20. [21 px · stay within 15 % of the current length]
     into tens of 1.5 and 2 mL tubes

Return the numbered list with your replacements.
```

---

### Slide 8 — `s07`

```
SLIDE 8

What this slide has to achieve:
  State the design problem, then the six pass/fail gates and the ranking criteria.

Must not change:
  The long sentence is the thesis's own design-problem block quote — treat it as a quotation. The eight criterion names are the thesis's eight opportunity classes.

The strings, as they are now:
  1. [44 px · ~46 characters per line, 2 lines maximum]
     The machine must dose 5 to 1000 µL of six liquids into forty tubes, on its own.
  2. [24 px · ~84 characters per line]
     Design a portable liquid dispenser capable of delivering
  3. [24 px · ~84 characters per line]
     5–1000 µL
  4. [24 px · ~84 characters per line]
     of up to
  5. [24 px · ~84 characters per line]
     six reagents
  6. [24 px · ~84 characters per line]
     across
  7. [24 px · ~84 characters per line]
     tens of 1.5 mL and 2 mL tubes
  8. [24 px · ~84 characters per line]
     ,
  9. [24 px · ~84 characters per line]
     unattended
  10. [24 px · ~84 characters per line]
     , at a precision
  11. [24 px · ~84 characters per line]
     equal or superior to manual pipetting
  12. [24 px · ~84 characters per line]
     , operated at the point of need by
  13. [24 px · ~84 characters per line]
     non-specialist personnel
  14. [24 px · ~84 characters per line]
     .
  15. [22 px · stay within 15 % of the current length]
     within ±10 % of target
  16. [22 px · stay within 15 % of the current length]
     5 to 1000 µL
  17. [22 px · stay within 15 % of the current length]
     six reagents
  18. [22 px · stay within 15 % of the current length]
     tens of tubes
  19. [22 px · stay within 15 % of the current length]
     no hands after setup
  20. [22 px · stay within 15 % of the current length]
     learnable in ten minutes
  21. [18 px · stay within 15 % of the current length]
     then ranked on
  22. [19 px · stay within 15 % of the current length]
     performance
  23. [19 px · stay within 15 % of the current length]
     maintenance
  24. [19 px · stay within 15 % of the current length]
     automation
  25. [19 px · stay within 15 % of the current length]
     portability
  26. [19 px · stay within 15 % of the current length]
     contamination
  27. [19 px · stay within 15 % of the current length]
     safety
  28. [19 px · stay within 15 % of the current length]
     feasibility
  29. [19 px · stay within 15 % of the current length]
     sustainability

Return the numbered list with your replacements.
```

---

### Slide 9 — `s07b`

```
SLIDE 9

What this slide has to achieve:
  Show the eight modules and what crosses each boundary.

Must not change:
  Module names are canonical: Pump, Alignment, Nozzle, Storage, Tube holding, User interface, Electronics and software, Enclosure. 'Alignment' is never 'stage'.

The strings, as they are now:
  1. [44 px · ~46 characters per line, 2 lines maximum]
     The machine is eight modules, and every boundary carries a volume or a signal.
  2. [20 px · stay within 15 % of the current length]
     Enclosure
  3. [18 px · stay within 15 % of the current length]
     specified, not built
  4. [22 px · stay within 15 % of the current length]
     Storage
  5. [18 px · stay within 15 % of the current length]
     six reagents
  6. [22 px · stay within 15 % of the current length]
     Pump
  7. [18 px · stay within 15 % of the current length]
     dose by step count
  8. [22 px · stay within 15 % of the current length]
     Nozzle
  9. [18 px · stay within 15 % of the current length]
     drop release
  10. [22 px · stay within 15 % of the current length]
     Alignment
  11. [18 px · stay within 15 % of the current length]
     indexes the rack
  12. [22 px · stay within 15 % of the current length]
     Tube holding
  13. [18 px · stay within 15 % of the current length]
     1.5 and 2 mL tubes
  14. [22 px · stay within 15 % of the current length]
     Electronics and software
  15. [18 px · stay within 15 % of the current length]
     one processor, one firmware
  16. [22 px · stay within 15 % of the current length]
     User interface
  17. [18 px · stay within 15 % of the current length]
     touchscreen
  18. [18 px · stay within 15 % of the current length]
     absorbed into alignment
  19. [18 px · stay within 15 % of the current length]
     Liquid
  20. [18 px · stay within 15 % of the current length]
     Data and control
  21. [18 px · stay within 15 % of the current length]
     Nothing wetted crosses
  22. [24 px · ~84 characters per line]
     Metering, positioning, dispensing, storing and coordinating cannot be one monolith.
  23. [24 px · ~84 characters per line]
     One job per module, developed in parallel, replaceable without redesigning the rest.

Return the numbered list with your replacements.
```

---

### Slide 10 — `s10`

```
SLIDE 10

What this slide has to achieve:
  A pyramid of the eight modules and nothing else, rebuilt from thesis figure 5.2.
  The apex inherits the fewest constraints and dictates downward; the base inherits
  everything. Reading it top to bottom is also the order Part II walks.

Must not change:
  The seven tier names and their order. 'Alignment' is never 'stage'. Do not propose
  any caption, arrow label or running-order list: all of those were deliberately
  deleted from this slide and must not come back.

The strings, as they are now:
  1. [44 px · ~46 characters per line, 2 lines maximum]
     The pump decides, and everything below it adapts.
  2. [26 px · a module name — DO NOT CHANGE]
     Pump
  3. [26 px · a module name — DO NOT CHANGE]
     Alignment
  4. [26 px · a module name — DO NOT CHANGE]
     Nozzle
  5. [26 px · a module name — DO NOT CHANGE]
     Storage
  6. [26 px · a module name — DO NOT CHANGE]
     User interface
  7. [26 px · a module name — DO NOT CHANGE]
     Electronics
  8. [26 px · a module name — DO NOT CHANGE]
     Enclosure

Only string 1 is yours to rewrite. Return it and nothing else.
```

---
### Slide 11 — `s09a`

```
SLIDE 11

What this slide has to achieve:
  Divider. Five seconds on screen. It names the two chapters that follow.

Must not change:
  These two lines are those two chapter titles. Keep them this short.

The strings, as they are now:
  1. [22 px · stay within 15 % of the current length]
     How I worked
  2. [76 px · ~46 characters per line, 2 lines maximum]
     Methods,
  3. [76 px · ~46 characters per line, 2 lines maximum]
     & engineering with AI.

Return the numbered list with your replacements.
```

---

### Slide 12 — `s09b`

```
SLIDE 12

What this slide has to achieve:
  A title over two objects: the part building itself layer by layer on the left with
  the tolerance under it, and a photograph of the printer on the right. Only string 1,
  the title, is yours to rewrite. Do not propose any new caption or label: every small
  text on this slide was deliberately deleted and must not return.

Must not change:
  ±0.1 mm is the honest repeatability figure. Do not replace it with the 0.01 mm that the thesis explicitly disowns.

The strings, as they are now:
  1. [44 px · ~46 characters per line, 2 lines maximum]
     Every custom part of this machine was printed in the room where it was designed.
  2. [72 px · a number — DO NOT CHANGE]
     ±0.1
  3. [30 px · a unit — DO NOT CHANGE]
     mm

Return the numbered list with your replacements.
```

---

### Slide 13 — `s08a`

```
SLIDE 13

What this slide has to achieve:
  A title card. It announces the subject and nothing else.

Must not change:
  These words are also the corner label on slide 15, so whatever you write has to work at 19 px AND at 49 px.

The strings, as they are now:
  1. [19 px · stay within 15 % of the current length]
     Engineering with AI

Return the numbered list with your replacements.
```

---

### Slide 14 — `s08`

```
SLIDE 14

What this slide has to achieve:
  Show the four ways an unconstrained AI fails, using one house.

Must not change:
  The house analogy is the thesis's own. The failures are structural, not mistakes — the wording has to keep that distinction.

The strings, as they are now:
  1. [19 px · stay within 15 % of the current length]
     Engineering with AI
  2. [44 px · ~46 characters per line, 2 lines maximum]
     Ask an AI to design a house and you see exactly where it fails.
  3. [18 px · stay within 15 % of the current length]
     the ask
  4. [23 px · stay within 15 % of the current length]
     “Design a house.”
  5. [18 px · stay within 15 % of the current length]
     the edit
  6. [23 px · stay within 15 % of the current length]
     “Add a window upstairs.”
  7. [18 px · stay within 15 % of the current length]
     the memory
  8. [23 px · stay within 15 % of the current length]
     An old instruction returns.
  9. [18 px · stay within 15 % of the current length]
     the fix
  10. [23 px · stay within 15 % of the current length]
     Specify, then verify.

Return the numbered list with your replacements.
```

---

### Slide 15 — `s09`

```
SLIDE 15

What this slide has to achieve:
  Show the environment built in response, and point at the live tools. Only the first
  two panels are on screen when the slide opens; the other two arrive on a press each.

Must not change:
  The site address is printed in the thesis — keep it exactly. 'Discuss, plan, execute, verify, ship' are the thesis's five step names.

The strings, as they are now:
  1. [44 px · ~46 characters per line, 2 lines maximum]
     So the AI worked inside written specs, a memory on disk, and checks it could not skip.
  2. [18 px · stay within 15 % of the current length]
     every model behind these decisions
  3. [24 px · DO NOT CHANGE — this address is printed in the thesis]
     sirsirio.github.io/thesis-tools
  4. [18 px · stay within 15 % of the current length]
     the specs
  5. [18 px · stay within 15 % of the current length]
     Discuss, plan, execute, verify, ship — and the next phase starts clean.
  6. [18 px · stay within 15 % of the current length]
     the loop
  7. [18 px · stay within 15 % of the current length]
     Design, build, test, learn. Printing, wiring and testing stayed physical.
  8. [18 px · stay within 15 % of the current length]
     the sources
  9. [18 px · stay within 15 % of the current length]
     AI-powered search tool.
  10. [18 px · stay within 15 % of the current length]
     the tools
  11. [18 px · stay within 15 % of the current length]
     Live website.

Return the numbered list with your replacements.
```
