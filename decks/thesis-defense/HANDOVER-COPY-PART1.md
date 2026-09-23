# Copy handover — the opening and Part I

**For:** a language model rewriting the on-screen copy (Gemini, via Antigravity).
**From:** the deck build. **Deck:** `decks/thesis-defense/`. **Date:** 21 September 2026.

Everything below is text that is **printed on a slide**. Rewrite it. Do not touch the
code — you are writing strings, and someone else pastes them back and re-checks the
facts against the thesis.

---

## 1 · What this deck is

A 30-minute MSc thesis defense at DTU Bioengineering, 28 September 2026. The thesis
is *Design of an Automated and Portable Liquid Dispensing System in the µL scale for
Biological Applications*, subtitled *Bringing sample preparation to the point of
care*. The speaker is Sirio
Vittorio Feltrin, and he built the machine the talk is about.

The talk runs: opening → **Part I, why this machine and how I worked** → Part II, the
modules → Part III, the machine → live demo → what I learned → closing. This document
covers **the opening and all of Part I only**: the hold screen and slides 1 to 16,
out of 75. The numbers used here are the ones printed in the corner of each slide.
Part I was cut twice for length — the modules-on-the-machine slide was dropped and
the precision-and-accuracy slide moved to the appendix — so these numbers have
shifted since the first version of this document. Work from the numbers here.

---

## 2 · The voice — read this before writing a word

These are the rules the deck is built on. They are not style preferences; copy that
breaks them gets rejected.

1. **He narrates. The slide does not.** Anything he would say out loud does not
   belong on screen. The slide shows the evidence; he supplies the sentences.
2. **No filler.** Delete any line that only announces what is about to be said, or
   that labels something already obvious. If a line can be removed without loss,
   remove it.
3. **A title states a finding, not a topic.** "The range was read out of five field
   protocols, not estimated" — not "Protocol survey". Titles are full sentences and
   end with a full stop.
4. **Short fragments elsewhere.** Labels, captions and chips are two to six words.
   Lower case unless it is a proper noun.
5. **No marketing register.** No "revolutionary", "seamless", "cutting-edge",
   "leverages", "enables", "robust solution". No exclamation marks. No rhetorical
   questions.
6. **Plain words over jargon**, except where the jargon is the real term — *lyse*,
   *elute*, *peristaltic*, *coefficient of variation* all stay.
7. **British spelling.** Metric units with a thin space: 5 µL, 1000 µL, ±10 %, 0.4 mm.
8. **The module is called "alignment", never "stage".** ("Stage" means the 1280×720
   canvas in this codebase.)
9. **Never print an internal code** — no S07, no D-04, no R3/C1.
10. **Numbers are load-bearing.** Do not round, adjust, or "simplify" any figure.
    If a sentence reads badly *because* of a number, rewrite around it, keep the number.

---

## 3 · What must not change

- **Every numeral, unit, tolerance, instrument name, author name and year.**
- **Direct quotations from the thesis**, marked ⚑ below.
- Anything in a `[keep]` marker.

If you think a fact is wrong, say so in a note. Do not silently fix it.

**Two figures that are not from the thesis:** the thesis carries no price for the Roche
cobas liat. The **$11k** is a reseller's asking price (Dipylon Medical); the **$100 per
test** comes from the Canadian health-technology review of point-of-care influenza
testing (CADTH, reporting a 2015 figure). Leave both numbers exactly as they are. Every
other number in this document is the thesis's own.

---

## 4 · How to give the copy back

For each slide, return the same structure: the slide's position and cue, then each
string with its replacement. Keep the numbering. If you would delete a line, write
`DELETE` and one line of why. If you want to split or merge lines, say so explicitly —
the layout is fixed pixel geometry and a line that doubles in length will overflow.

**Length discipline matters.** Each string below carries its rendered size in pixels
and, where it is tight, a character budget. A title at 44 px fits about **46
characters per line** and may run to two lines, no more. A 24–26 px reading line fits
about **84 characters per line**. Chips and labels at 18–22 px should stay within the
character count of what is already there, ±15 %.

---

## 5 · The slides

Format: **number · cue** — the framing, then every visible string with its
rendered size. The numbers here are the numbers printed in the corner of each
slide, so they match what the audience sees. Speaker notes are given as *context*:
they are **not** on screen, and you may rewrite them too.

---

### — · `s00` · hold screen
Shown while the room fills. Not numbered, and the timer has not started. Minimal by design.

| # | px | string |
|---|----|--------|
| —.1 | 34 | Design of an Automated and Portable Liquid Dispensing System in the µL scale for Biological Applications |
| —.2 | 22 | Bringing sample preparation to the point of care |
| —.3 | 19 | Sirio Vittorio Feltrin |

*Context — what he says (not on screen):*
- Hold here while the room settles. Nothing is running yet — no timer, no slide number, and this screen is not counted in the progress bar.
- The next press is slide 1 and starts the clock.

---

### 1 · `s01` · cover
**[keep] the title and subtitle are fixed** — they are the thesis front matter, word for word. Do not shorten or rephrase them.

| # | px | string |
|---|----|--------|
| 1.1 | 19 | MSc thesis defense · DTU Bioengineering · NaBIS |
| 1.2 | 44 | Design of an Automated and Portable Liquid Dispensing System in the µL scale for Biological Applications |
| 1.3 | 26 | Bringing sample preparation to the point of care |
| 1.4 | 27 | Sirio Vittorio Feltrin |
| 1.5 | 19 | Supervisors Maria Dimaki · Winnie Edith Svendsen · Lars Hvam · 28 September 2026 |

*Context — what he says (not on screen):*
- Let the clip run a few seconds before speaking; the sound is part of it.
- Name the title, the group and the three supervisors.
- This is the machine, working; the talk explains how it got here.

---

### 2 · `s02` · a test that takes a day
One study, one hospital, one set of patients, on a single 0-24 h axis. The three rows are the evidence; the closing line is the turn into the talk.

| # | px | string |
|---|----|--------|
| 2.1 | 44 | A test that takes a day comes too late. |
| 2.2 | 18 | 0 |
| 2.3 | 18 | 4 h |
| 2.4 | 18 | 8 h |
| 2.5 | 18 | 12 h |
| 2.6 | 18 | 16 h |
| 2.7 | 18 | 20 h |
| 2.8 | 18 | 24 h |
| 2.9 | 21 | standard molecular testing, the hospital’s own lab |
| 2.10 | 34 | >26 h |
| 2.11 | 21 | a portable molecular test at the point of care |
| 2.12 | 34 | 2.6 h |
| 2.13 | 21 | the target — an answer before they leave |
| 2.14 | 30 | under 1 h |
| 2.15 | 18 | one study, same hospital, same patients · Collier et al. 2020 |
| 2.16 | 30 | The test can travel to the gate. The sample preparation cannot yet. |

*Context — what he says (not on screen):*
- A passenger lands in a crowded arrivals hall in the first weeks of an outbreak, with a fever.
- The officer takes a nasal swab, but confirming the virus means sending that tube to a central laboratory.
- Hold them a day or two and it is an operational nightmare; wave them through and an unconfirmed infection leaves the terminal.
- The whole axis is one day. Standard testing takes more than 26 hours — and that is the hospital using its own in-house lab, not a sample shipped away.
- A portable molecular test, same study, same hospital, same patients: 2.6 hours. Next to a day it is almost nothing — which is the point.
- Last press: the same axis rescales to its first three hours. Under an hour is the target that settles the dilemma at the gate.

---

### 3 · `s04` · the field laboratory
A photograph. The title is the only copy besides the credit, which now sits under the
photo at its left edge, clear of the slide number and the section rail.

| # | px | string |
|---|----|--------|
| 3.1 | 44 | Bringing the lab to the sample often still requires pipetting and an expert. |
| 3.2 | 18 | Carlier et al. 2022 · CC BY 4.0 |

*Context — what he says (not on screen):*
- A mobile molecular laboratory for malaria surveillance in Ethiopia — cycler, magnetic block, shaker.
- And four manual pipettes doing everything in between. That is the whole automation.
- A dozen steps, six liquids, 5 µL to 1 mL, every one of them by hand.

---

### 4 · `s03` · contents
Five rows. **[keep] Part I / Part II / Part III / Demo / Then** — these five labels also appear in the corner of every later slide, so they must stay short and stay identical.

| # | px | string |
|---|----|--------|
| 4.1 | 44 | Contents |
| 4.2 | 19 | Part I |
| 4.3 | 31 | Why this machine, and how I worked |
| 4.4 | 20 | the gap · the requirements and the modules · working with an AI |
| 4.5 | 19 | Part II |
| 4.6 | 31 | The modules |
| 4.7 | 20 | pump · alignment · nozzle · interface · storage |
| 4.8 | 19 | Part III |
| 4.9 | 31 | The machine |
| 4.10 | 20 | electronics · integration · validation |
| 4.11 | 19 | Demo |
| 4.12 | 31 | Live demo |
| 4.13 | 20 | the machine runs, here, for five minutes |
| 4.14 | 19 | Then |
| 4.15 | 31 | What I learned, what comes next |
| 4.16 | 20 | and the closing |

*Context — what he says (not on screen):*
- Part I: the gap this machine fills, and the way of working behind it.
- Part II: the five modules, in the order the liquid meets them.
- The five marks beside each row are the same five that sit in the bottom corner from here on: one lights for whichever section we are in, so the room can always see how far through we are.
- The demo stands on its own: five minutes, the machine running here in the room.
- Part III: electronics, integration, validation, then five minutes of live demo.
- Questions at the end; there are backup slides for the detail.

---

### 5 · `s05` · Part I divider
Large type, nothing else.

| # | px | string |
|---|----|--------|
| 5.1 | 22 | Part I |
| 5.2 | 84 | Why this machine, and how I worked. |
| 5.3 | 24 | The gap, the requirements, the way of working. |

*Context — what he says (not on screen):*
- Two questions in this part: why build it, and how the work was run.
- Four minutes; the modules start right after.

---

### 6 · `s06` · the gap
A four-row comparison with a price column. The last row is the machine this thesis builds, so it has no product name and no price.

| # | px | string |
|---|----|--------|
| 6.1 | 44 | No instrument today is precise, portable, unattended and open to any protocol at once. |
| 6.2 | 18 | precise |
| 6.3 | 18 | across range |
| 6.4 | 18 | portable |
| 6.5 | 18 | unattended |
| 6.6 | 18 | any protocol |
| 6.7 | 18 | price |
| 6.8 | 20 | laboratory systems |
| 6.9 | 18 | Tecan Fluent |
| 6.10 | 25 | $25–80k |
| 6.11 | 18 | used |
| 6.12 | 20 | integrated platforms |
| 6.13 | 18 | Roche cobas liat |
| 6.14 | 25 | $11k |
| 6.15 | 18 | $100 per test |
| 6.16 | 20 | portable and open-source |
| 6.17 | 18 | Sidekick, Keesey 2022 |
| 6.18 | 25 | $710 |
| 6.19 | 18 | build cost |
| 6.20 | 20 | what the field needs |
| 6.21 | 18 | Tecan · Roche · Keesey et al. 2022 (CC BY) |

*Context — what he says (not on screen):*
- Four properties across the top, three families of instrument, one row each.
- Even the smallest Fluent takes 1.15 by 0.79 metres of bench; it covers 0.5 to 1000 microlitres, but its imprecision at half a microlitre is about thirty times its best, and Tecan itself says calibration may be needed at and below five.
- Each family fails at least one property, and never the same one.
- The fourth row has no picture because no instrument fills it — that is the machine.

---

### 7 · `s04b` · where the range came from
Two presses: the five protocol fields, then the two numbers that fall out of them. Each number carries a small drawing.

| # | px | string |
|---|----|--------|
| 7.1 | 44 | The range was read out of five field protocols, not estimated. |
| 7.2 | 26 | Five off-site protocols representing different disciplines were evaluated in full, with all operational volumes recorded. |
| 7.3 | 22 | 🧬 |
| 7.4 | 19 | clinical and veterinary |
| 7.5 | 18 | the PANPOC protocol |
| 7.6 | 22 | 🌱 |
| 7.7 | 19 | plant and field molecular |
| 7.8 | 22 | 💧 |
| 7.9 | 19 | water chemistry |
| 7.10 | 22 | 🌾 |
| 7.11 | 19 | agriculture |
| 7.12 | 22 | 🌲 |
| 7.13 | 19 | soil chemistry |
| 7.14 | 18 | 5 µL |
| 7.15 | 18 | 1000 µL |
| 7.16 | 44 | 5 – 1000 µL |
| 7.17 | 20 | per liquid |
| 7.18 | 44 | up to 6 |
| 7.19 | 20 | reagents in one run |
| 7.20 | 21 | into tens of 1.5 and 2 mL tubes |

*Context — what he says (not on screen):*
- Not an estimate, and not one protocol: five, chosen for being usable outside a laboratory and for covering different fields.
- Each was read in full and every stated volume recorded.
- No review aggregates dispensed volumes across protocol types — reviews describe instruments, primary papers report only their own protocol — so they had to be read one by one.
- The clinical and veterinary one is the PANPOC magnetic-bead protocol itself: the reference protocol sits inside the survey, it is not a sixth case.
- All of it runs unattended, in one load.
- What falls out is the specification: 5 to 1000 µL per liquid, up to six reagents, into tens of tubes, unattended.
- The five-row table with each protocol’s own range is a backup slide.

---

### 8 · `s07` · the design problem and the gates
The brief as one sentence with the binding phrases picked out, then six gates, then the ranking criteria. The sentence is **verbatim from the thesis** (its design-problem block quote) — treat it as a quotation.

| # | px | string |
|---|----|--------|
| 8.1 | 44 | The machine must dose 5 to 1000 µL of six liquids into forty tubes, on its own. |
| 8.2 | 24 | Design a portable liquid dispenser capable of delivering |
| 8.3 | 24 | 5–1000 µL |
| 8.4 | 24 | of up to |
| 8.5 | 24 | six reagents |
| 8.6 | 24 | across |
| 8.7 | 24 | tens of 1.5 mL and 2 mL tubes |
| 8.8 | 24 | , |
| 8.9 | 24 | unattended |
| 8.10 | 24 | , at a precision |
| 8.11 | 24 | equal or superior to manual pipetting |
| 8.12 | 24 | , operated at the point of need by |
| 8.13 | 24 | non-specialist personnel |
| 8.14 | 24 | . |
| 8.15 | 22 | within ±10 % of target |
| 8.16 | 22 | 5 to 1000 µL |
| 8.17 | 22 | six reagents |
| 8.18 | 22 | tens of tubes |
| 8.19 | 22 | no hands after setup |
| 8.20 | 22 | learnable in ten minutes |
| 8.21 | 18 | then ranked on |
| 8.22 | 19 | performance |
| 8.23 | 19 | maintenance |
| 8.24 | 19 | automation |
| 8.25 | 19 | portability |
| 8.26 | 19 | contamination |
| 8.27 | 19 | safety |
| 8.28 | 19 | feasibility |
| 8.29 | 19 | sustainability |

*Context — what he says (not on screen):*
- This is the design problem, in the words the thesis sets it in.
- Every one of these is a gate, not a score: a concept that fails any of them is out before anything is weighed.
- Then, and only then, the survivors get ranked — on eight opportunities, unweighted at the system level. The weights come later, one set per module, once the decomposition exists.
- A high score never buys back a failed requirement.

---

### 9 · `s07b` · how the modules relate
The module diagram from the thesis: eight boxes, and what crosses each boundary.

| # | px | string |
|---|----|--------|
| 9.1 | 44 | The machine is eight modules, and every boundary carries a volume or a signal. |
| 9.2 | 20 | Enclosure |
| 9.3 | 18 | specified, not built |
| 9.4 | 22 | Storage |
| 9.5 | 18 | six reagents |
| 9.6 | 22 | Pump |
| 9.7 | 18 | dose by step count |
| 9.8 | 22 | Nozzle |
| 9.9 | 18 | drop release |
| 9.10 | 22 | Alignment |
| 9.11 | 18 | indexes the rack |
| 9.12 | 22 | Tube holding |
| 9.13 | 18 | 1.5 and 2 mL tubes |
| 9.14 | 22 | Electronics and software |
| 9.15 | 18 | one processor, one firmware |
| 9.16 | 22 | User interface |
| 9.17 | 18 | touchscreen |
| 9.18 | 18 | absorbed into alignment |
| 9.19 | 18 | Liquid |
| 9.20 | 18 | Data and control |
| 9.21 | 18 | Nothing wetted crosses |
| 9.22 | 24 | Metering, positioning, dispensing, storing and coordinating cannot be one monolith. |
| 9.23 | 24 | One job per module, developed in parallel, replaceable without redesigning the rest. |

*Context — what he says (not on screen):*
- Mapping the operational sequence gave eight functions, so eight modules: pump, alignment, nozzle, storage, tube holding, user interface, electronics and software, and the enclosure around all of it. A machine that meters microlitres, positions tubes, dispenses droplets, manages reagents, talks to an operator and coordinates actuation cannot be engineered as a monolithic system.
- The rule that set the boundaries: an interface boundary is physically justified only if the transferred mass or information can be precisely defined. Here every subsystem interaction is strictly either a defined volumetric fluid transfer or an electrical control signal. Nothing else crosses.
- Tube holding is dashed because it was conceived standalone and then physically absorbed into alignment during prototyping, once fabrication showed the tubes could not be indexed independently of the positioning carriage.
- The boundaries were guidelines, not walls: a concept spanning two domains, storage with direct displacement metering for instance, was judged on merit rather than eliminated for crossing a line. The enclosure is dashed for a different reason: it was specified and never built, because its geometry depends on the aggregate of everything inside it.

---

### 10 · `s10` · the hierarchy
**A pyramid and nothing else**, rebuilt from thesis figure 5.2: the apex inherits
the fewest constraints and dictates downward, the base inherits everything. Reading
it top to bottom *is* the order Part II walks, which is why no separate list of that
order is drawn any more. The arrows, the side notes and the running-order chips were
all deleted — do not propose bringing any of them back. Only the title is rewritable;
the seven tiers are module names.

| # | px | string |
|---|----|--------|
| 10.1 | 44 | The pump decides, and everything below it adapts. |
| 10.2 | 26 | Pump |
| 10.3 | 26 | Alignment |
| 10.4 | 26 | Nozzle |
| 10.5 | 26 | Storage |
| 10.6 | 26 | User interface |
| 10.7 | 26 | Electronics |
| 10.8 | 26 | Enclosure |

*Context — what he says (not on screen):*
- Rank the modules by how much each one depends on the others and you get the order the work had to follow.
- The pump sits at the top because it carries the tightest volume requirement and sets the operating principle for everything else — thirty-one rows in its evaluation matrix.
- The electronics matrix has three requirements and eleven criteria and names no voltage and no driver count, because its demands are just the sum of everything upstream. The enclosure was never built on purpose: its shape is the sum of the mechanisms inside it.
- Whenever two modules disagreed, the lower one gave way. Part II walks down that list.

---

### 11 · `s09a` · divider - the method
Five seconds on screen. The two lines are the titles of thesis chapters three and four. Nothing else, deliberately.

| # | px | string |
|---|----|--------|
| 11.1 | 22 | How I worked |
| 11.2 | 76 | Methods, |
| 11.3 | 76 | & engineering with AI. |

*Context — what he says (not on screen):*
- Part I asked two questions. The why is answered; this is the how.
- Four principles: diverge then decide, split the machine into modules, build physically early, let the discrepancy tell you the next move.
- The loop only turns as fast as its slowest step. Printing in-house took a turn from weeks to hours — that is the next slide.
- AI was used throughout, inside written specs, a memory on disk and checks. The two slides after the printer show why those rules were needed and what they were. Printing, wiring, assembly and testing stayed mine.

---

### 12 · `s09b` · 3D printing
**A title and one number.** The part builds itself layer by layer on the left with
±0.1 mm under it; the printer photograph sits on the right. Every caption and the
weeks → hours pair were deleted and must not come back — no small text on this slide.
Only the title is rewritable.

| # | px | string |
|---|----|--------|
| 12.1 | 44 | Every custom part of this machine was printed in the room where it was designed. |
| 12.2 | 72 | ±0.1 |
| 12.3 | 30 | mm |

*Context — what he says (not on screen):*
- Every mechanical part came off one printer in the room: a Bambu Lab P1S in PLA, one locked profile, a 0.4 mm nozzle for most of it and 0.2 mm wherever a fit decided something.
- That is what made the loop turn. A change drawn in the morning was on the bench the same day, so turnaround went from weeks to hours.
- The price: a printed part is not the part you drew. The precision interfaces needed a tenth of a millimetre, so the printer itself had to be measured — these were the first test bars, and how that went comes back in Part Two.

---

### 13 · `s08a` · Engineering with AI
A title card: the Claude Code mark and the chapter-four title, centred and large. It then shrinks into the top-right corner of the next slide and stays there, so **these two words are also the corner label on slide 15** — whatever you write has to work at both sizes.

| # | px | string |
|---|----|--------|
| 13.1 | 19 | Engineering with AI |

*Context — what he says (not on screen):*
- No words on this slide. Just say what it is.
- AI was in this project from the first week, as a working tool: Claude Code, in a terminal on the actual project — reading files, writing files, running the commands that check them. That is why it could be held to something written down instead of only talked to.
- Its share was the written and the computed: design documents, the calculations, the interactive models published on the site, and the tooling around the work.
- Printing, wiring, assembling and testing stayed mine, and every reference was checked and approved by hand.
- Used unconstrained it does not make occasional mistakes — it fails in the same structural ways every time. That is the next slide, and the reason the answer was an environment with rules rather than better prompting.
- Chapter four is about this, and an appendix documents the use.

---

### 14 · `s08` · the house
**Opens held:** at first the only thing on screen is the "Engineering with AI" lockup
from slide 14, still centred and large, so the speaker can introduce the subject for as
long as he likes. One press shrinks it into the top-right corner and brings in the
title, the drawing board and the cards. Slide 15's title is therefore **not** the first
thing the audience reads — it arrives on the second press.

Four captioned beats of the same failure. The captions are deliberately tiny; the quoted asks are what the audience reads. The lockup from slide 14 sits in the top-right corner.

| # | px | string |
|---|----|--------|
| 14.1 | 19 | Engineering with AI |
| 14.2 | 44 | Ask an AI to design a house and you see exactly where it fails. |
| 14.3 | 18 | the ask |
| 14.4 | 23 | “Design a house.” |
| 14.5 | 18 | the edit |
| 14.6 | 23 | “Add a window upstairs.” |
| 14.7 | 18 | the memory |
| 14.8 | 23 | An old instruction returns. |
| 14.9 | 18 | the fix |
| 14.10 | 23 | Specify, then verify. |

*Context — what he says (not on screen):*
- Asked only to design a house it will give you a villa or a townhouse, both structurally valid, neither what was meant — and here it is finished, complete, before anything goes wrong.
- Ask for a window upstairs and it lands half off the wall, because nothing on disk recorded where the wall was.
- Then an instruction from three sessions ago resurfaces, a load-bearing wall moves, and the roof comes with it.
- Building without a specification is deciding the rooms after the walls are up; check the floor after the furniture is in and you either empty the house or live with a crooked floor.

---

### 15 · `s09` · the working environment
Four panels and the site address. **Only the first two are on screen when the slide
opens**; the sources and the tools arrive on a press each, so the rail starts quiet. The address is printed in the thesis — **[keep] it exactly**. Two panels are now label-only by choice: do not write sentences back into them.

| # | px | string |
|---|----|--------|
| 15.1 | 44 | So the AI worked inside written specs, a memory on disk, and checks it could not skip. |
| 15.2 | 18 | every model behind these decisions |
| 15.3 | 24 | sirsirio.github.io/thesis-tools |
| 15.4 | 18 | the specs |
| 15.5 | 18 | Discuss, plan, execute, verify, ship — and the next phase starts clean. |
| 15.6 | 18 | the loop |
| 15.7 | 18 | Design, build, test, learn. Printing, wiring and testing stayed physical. |
| 15.8 | 18 | the sources |
| 15.9 | 18 | AI-powered search tool. |
| 15.10 | 18 | the tools |
| 15.11 | 18 | Live website. |

*Context — what he says (not on screen):*
- Decisions are locked in writing before anything is planned or built.
- The physical stages stayed mine: printing, wiring, assembling, testing.
- References came through a retrieval pipeline, and I approved every one.
- The site address is on the screen; three of its tools open later in this talk.

---

## 6 · Known weak spots — worth your attention

These are the lines the build is least happy with. Fixing them is the highest-value
part of the job.

1. **7.1 and 7.2 overlap heavily** — the title and the lead underneath it both say
   the range was read from five protocols. One of them should go, or change job.
2. **15.2, 15.4, 15.6, 15.8** — "the ask", "the edit", "the memory", "the fix" are
   filler labels of exactly the kind rule 2 bans, and they sit under quotes that
   already say what they are. Strong candidates for DELETE.
3. **8.1** is 88 characters and runs to two full lines at 44 px. It is at the limit.
4. **10.22 and 10.23** are both abstract statements about modularity with no concrete
   noun in either, one after the other.
5. **13.9** repeats "the repeatability" immediately under the number it describes.
6. **2.13 and 2.14** — "the target — an answer before they leave" / "under 1 h" must
   not read as a measured result. It is the author's target, it has **no citation
   anywhere in the thesis**, and it is drawn as a dashed band for that reason. The
   wording has to carry that.
7. **6.20** — the last row of the gap table is the machine this thesis builds, so it
   has no product name and no price. "what the field needs" is a placeholder phrase
   and could be much better.
8. **11.9** says "thirty-one criteria weighed". The thesis says thirty-one **rows**
   in the pump matrix, which is requirements *and* criteria together — and its own
   appendix says thirty. Safest rewrite drops the number or says "about thirty rows".

---

## 7 · After you

The copy comes back to the deck build, which will:
check every ⚑ line against the thesis source, check every number, paste the strings
in, re-measure the layout at 1280 × 720 (several of these lines sit in fixed-width
boxes and a longer string will overflow), and re-run the whole deck for console
errors and overflow.

So: **write freely, but flag anything you changed that carries a fact.**
