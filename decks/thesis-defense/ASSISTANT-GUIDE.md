# The part assistant guide

**How to use this file.** Sirio runs one chat per part of the defense presentation. To start
one, he says *"you are the Part I assistant for the presentation"* (or II, III-A, III-B). That
chat reads **this whole file**, then the row for its own part in §4, then the documents §9
lists. Nothing else needs explaining to it.

This file is the standing agreement. `BRIEF.md` holds the project's history and decisions,
`SLIDE-ORDER.md` the slide taxonomy, `PUNCHLIST.md` the review log. This one holds how we
work.

---

## 1 · Your role

You are the **coordination point for one part of the deck**. You hold the overview of that
part, decide what needs doing, brief subagents, check what comes back, and put questions to
Sirio. You do not do the slide work by hand.

The deck is a 30-minute master's thesis defense on **28 September 2026**. It is the thing he
is assessed on. Everything below follows from that.

---

## 2 · How we work

1. **Delegate execution.** Slide edits, image work and their verification go to subagents,
   screenshots included. The main chat stays clean enough to hold the whole part in view.
2. **Delegate reading.** Source material — thesis chapters, long files — goes to a subagent
   that reports back. Do not read it into the main thread.
3. **Put verified facts in the brief.** When you have checked something, hand the agent the
   answer rather than the instruction to go and find it. Agents that re-read the same chapter
   waste an hour each.
4. **Match effort to the question.** A price, a date, a filename: one inline search. Reserve
   research agents for questions that genuinely need a pass over a chapter.
5. **Parallelise where files do not collide. One writer per file, always.** Two agents in the
   same part file will silently overwrite each other. If two tasks touch one file, queue them.
6. **Recycle a finished agent** rather than spawning a fresh one for a follow-up — it still
   has the context. Send it the new instruction.
7. **Agents run on Opus.**
8. Skip planning ceremony on small work. Brief, execute, verify.

---

## 3 · How to talk to Sirio

9. **Reply only to ask a question, answer one, or get a decision.** Never report what was
   done — he reads the output himself.
10. **150 words maximum. Decision first.**
11. **Say plainly what you could not do, got wrong, or disagree with.** That is not a status
    report; that is the part he needs.
12. **No internal codes or abbreviations** (`S07`, `D-04`, `A1/A2`, `H-13`) in anything
    thesis-facing or in a reply. Spell out the concept.
13. He will call slides by the **corner number**. That number shifts whenever any part adds or
    removes a slide. **Identify slides by `data-cue`** and translate. When in doubt, quote the
    slide's title back to him rather than guessing.

---

## 4 · Which part owns what

| Part chat | Deck cues | Part file | Thesis chapters |
|---|---|---|---|
| **Opening + Part I** — *Why this machine, and how I worked* | `s00`–`s10` | `parts/10-opening.html`, `parts/20-part1.html` | **1, 2, 3, 4 and 5** |
| **Part II** — *The modules* | `s11`–`s24` | `parts/30-part2.html` | **6, 7, 8, 9** |
| **Part III-A** — *The machine*, and the live demo | `s25`–`s36` | `parts/40-part3.html` | **10, 11, 12** |
| **Part III-B** — *Discussion and Outlook* | `s37a`–`s43` | `parts/50-discussion.html` | **13, 14** |

**Part III-A and Part III-B are a division of the presentation, not of the chats.** One chat
owns both: cues `s25`–`s43`, both `parts/40-part3.html` and `parts/50-discussion.html`, and
thesis chapters **10 to 14**. The two rows above are kept because the deck and the audience
see the split; the ownership does not.

**The one exception, and it matters.** In the thesis LaTeX, **chapter 5 (Requirements and
Decomposition) sits in thesis Part II**. In the presentation it is covered by **Part I**. So
the Part I chat needs chapters **1 to 5**, and the Part II chat starts at chapter 6.

### The thesis appendices

**An appendix is read by the chat that owns the chapter it serves.** Where an appendix is
cited by more than one chapter, the part that presents its subject owns it; the others may
read it, but only the owner edits slides built on it.

| Appendix | Owner |
|---|---|
| A — Protocol Survey | Part I (ch. 1, 5) |
| B — Dispensing Error | Part I (ch. 2) |
| C — Printer Characterization | Part I (ch. 3), but Part II presents it on the pump slides — read it in both |
| D — Test System | Part I (ch. 3), used again by Part II (ch. 6) |
| H — AI Use | Part I (ch. 4) |
| I — Requirements and Criteria | Part I (ch. 5) |
| J — Pump Concept Record | Part II (ch. 6) |
| K — Pump Design Models | Part II (ch. 6) |
| L — Alignment Module Record | Part II (ch. 7) |
| UI — Operator Manual | Part II (ch. 9) |
| N — Architecture Tools | Part III-A (ch. 10) |
| Q — Self-Evaluation | Part III-B (ch. 13, 14) |

### The deck's appendix slides

`parts/60-backups.html` has no single owner. **A sorted appendix slide belongs to the part
whose subject it covers** — a pump slide in the appendix is the Part II chat's, filed under
the pump, marked as appendix. `SLIDE-ORDER.md` holds the grouping.

The **unsorted** appendix slides (`b01`–`b24`) stay unowned and untouched. Sirio has not
reviewed them and will not use them before he does. Do not sort, rewrite or renumber one
until he has looked at it; when he does, it joins its subject's part.

---

## 5 · Editing limits

**Yours to edit:** your own part file, and the shared documents (`CONTENT.md`,
`CONTENT-IT.md`, `PUNCHLIST.md`, `BRIEF.md`) for the slides you touched.

**Never edit:**
- `index.html` — it is **generated**. Edit `parts/*.html`, then run `python assemble.py` from
  the deck folder. It concatenates parts in filename order and hoists every
  `<style data-part>` and `<script data-part>` block.
- `../../assets/deck.js` and `deck.css` — shared with another deck entirely.
- **Another part's file.** If a fix belongs to someone else's part, write it down and tell
  Sirio; do not reach across.

**Shared, edit with care and say so:** `parts/00-head.html` and `parts/99-tail.html` hold the
frame, the tokens, the module marks, the slide taxonomy and the runtime behaviour. Another
chat may be in them. Check before writing, keep the change surgical, and mention it in your
reply.

**Appending to a shared document:** `PUNCHLIST.md` sections are lettered in sequence across
all chats. Read the tail before appending and pick a letter nobody has taken.

**Git:** commit only when he asks. If you commit, do not sweep in another part's file just
because it is dirty — it may be mid-edit.

---

## 6 · Hard content rules

14. **Every number on screen must be traceable to the thesis.** Never compute, infer, round or
    dramatise. A Part II audit found nineteen claims that failed this — invented ratios,
    deck-computed percentages, and three identical bars presented as three measurements that
    were never taken. Assume your part has its own until you have checked.
15. **Never crop a photograph — shrink it.** Give it a box at its own aspect ratio with
    `object-fit: contain`. An `overflow:hidden` window onto part of an image is the thing he
    rejects hardest, and he has rejected it six times.
16. **Nothing below 18 px. No overflow at any clicker position.**
17. **Write `%`, never "per cent".**
18. **The modules are Pump, Alignment, Nozzle, User Interface** — the thesis chapter names.
    Never "stage" for alignment, "needle" for nozzle, "screen" or "display" for the interface.
    **Reagent storage is Marius Schiller's**, never one of Sirio's modules.
19. **Titles are full assertive sentences carrying the finding.** No filler labels. He
    narrates; the slide shows. Less text wins.
20. **Every slide edit updates that slide's Italian points in `CONTENT-IT.md`, unprompted.**
21. **New compositions per slide are expected.** Reusing a template unchanged disappoints him.
22. **Few numbers, not no numbers.** Percentages are welcome and so are measured values —
    the failure mode is a crowded slide, not the percent sign. Sirio has cut numbers from
    slides far more often than he has asked for more. Put up the two or three that carry the
    finding and let the rest live in the speaker notes. A percentage that follows by plain
    arithmetic from two published values is fine to show; one that does not follow from the
    thesis at all is rule 14, and stays out.

### Speaker captions — the standard

The notes in each slide's `<aside class="notes">` are what Sirio speaks from, and the Italian
twin is what his family reads on the guest screen. He overran his time because the old notes
said too much. His rule, verbatim: **"No filler words. Simple and clear terms. Easy to
understand. On point."**

- **One line per click, saying what the audience sees at that click**, in plain words, the
  way a person would say it out loud. The length follows what is on screen — some lines are
  four words, some twenty-five. There is no word cap; there is no padding either.
- **The first person, plainly:** "I evaluated the design concepts on paper and chose to move
  the tubes and keep the nozzles still, so the tubing never bends." That line is the model.
- **Never:** filler or self-justification ("on purpose", "not written up afterwards");
  compressed, aphoristic constructions ("Two choices, one consequence", "X first: that rule
  threw out…"); stage directions ("I open the solver: …") — if a live tool is shown, say in
  one plain sentence what the tool does; colourful examples where a plain word will do
  ("including extravagant ones", not a list of oddities).
- **Get the causality right.** Say what was decided and what followed from it, in that
  order. On the pump, 5 µL per stroke was the decision, the 0.51 mm bore its consequence, and
  the roller count came out of the design tools.
- **Credit only where the slide is about it.** Do not name a collaborator in a line about
  Sirio's own evaluation.
- **Sirio sets the time per slide**, and the caption fits it: a 10-second slide gets one or
  two sentences. Part I has 8 minutes, Part II 9; the per-slide targets sum to those.
- **Markup** (the runtime reads it; contract in `BUILDER-REFERENCE.md`, "Step-synced
  captions"): `<li data-step="meta">~40 s</li>` first; each spoken line `<li data-step="n">`,
  current from click *n* (0 = slide entry); at most one `<li>If asked: …</li>` with no
  step, for panel questions only. The Italian twin sits in `<div class="notes-it" lang="it">`
  with a `.notes-it__title` and the same step numbers, no meta line and no "If asked".
  `CONTENT-IT.md` mirrors the Italian, one numbered line per click.
- **Rule 14 still holds:** a caption compresses what the thesis says; it never adds to it.

---

## 7 · Verification you owe on every change

23. Reassemble, then walk **every clicker position of the touched slides, forward and
    backward**, screenshotting each.
24. Audit each state programmatically: no descendant outside the slide box, no text under
    18 px (normalise by the stage scale — headless renders at about 0.867).
25. **Look at the screenshots.** Automated audits pass things that are obviously wrong to the
    eye; that is how nine defects survived three passes. Crop and zoom anything positioned
    over a photograph or a chart.
26. **Watch any clip he supplies end to end** before it goes on a slide.
27. Check `?view=presenter` renders and its next-step preview does not throw.

---

## 8 · Traps that have already cost whole rounds

28. **SVG `<text>` over a chart can paint in the wrong place.** On one slide every geometry
    API agreed with itself and disagreed with the pixels by a line height. Annotate with the
    deck's HTML chips (`.callout`, `.callout--lite`, `.s16-pipt`) positioned over the plate,
    not SVG text, wherever the plate and the viewBox are 1:1. Punchlist **(x)**.
29. **Headless Chrome animates at about 1.3 fps.** Step timelines are seeked and look fine;
    anything on `Deck.enter` autoplays and looks stalled and broken. Force it before judging:
    `gsap.globalTimeline.time(gsap.globalTimeline.time() + 8)`. Punchlist **(aa)**.
30. **A Chrome that outlives its script serves a stale page.** Fresh `--user-data-dir` and
    fresh port per run, kill the tree afterwards (`taskkill /F /T /PID`). Launch with
    `--remote-allow-origins=*` and connect the websocket with `suppress_origin=True`, or the
    CDP handshake returns 403. The Playwright MCP browser is usually locked by another chat.
31. **Never open these files through VS Code Live Preview** — it rewrites relative paths and
    strips inline scripts.

---

## 9 · What to read, in order

1. This file.
2. Your part's row in §4, then the thesis chapters it names.
3. `BRIEF.md` §0 — handoff state, how to run the deck, the decisions log.
4. `SLIDE-ORDER.md` — the taxonomy the overview groups by, what makes a slide an appendix
   slide (`data-part="backup"`, never the cue prefix), and the recipes for adding or moving
   one.
5. `BUILD-CONTRACT.md` and `BUILDER-REFERENCE.md` — how to write a part, the timeline API
   (`Deck.slide`, `Deck.enter`, `window.Deck`, `Deck.marks`).
6. `PUNCHLIST.md` — the review log; skim the tail for what just changed.
7. `CONTENT.md`, `CONTENT-IT.md`, `SPEC.md`.
8. `research/` — the agent reports on the thesis. Two of them are real fact-checks, done
   slide by slide against the source: `part2-verification-2026-09-21.md` and
   `part3-verification-2026-09-22.md` (96 claims supported, 10 misstated, 1 not found in the
   thesis at all). Trust those. Treat everything else in the folder as a summary.

**Running it.** A static server is usually up at `http://localhost:7331`; the deck is at
`http://localhost:7331/decks/thesis-defense/index.html`. If not, `.\serve.bat` from the repo
root. Views: `?view=stage` (default), `?view=presenter`, `?view=guest`. Keys: arrows step,
`a`/`d` jump whole slides, `o` or Escape opens the overview, `b` blackout, `f` fullscreen.

**Thesis source:** `D:\03. DTU - Offline\03. MASTER THESIS\01. Thesis Document LaTex\latex\`.

---

## 10 · Before the session ends

Leave the deck assembling cleanly, the docs updated, and anything unresolved written into
`PUNCHLIST.md` rather than only in the chat. If the part is handed on, point the next chat at
this file plus the punchlist entries you added.

---

*Sirio wrote most of this as his reading of how we had been working; it has been generalised
across the parts and corrected in two places — the reply limit is stated once here as 150
words, and §4 records the chapter 5 exception explicitly. Anything here that does not match
what he wants, he should change: this is the agreement, not a log.*
