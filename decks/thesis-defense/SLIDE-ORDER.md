# How the defense deck is sorted

**Written 2026-09-21, last changed 2026-09-22. Read this before you move, add
or renumber a slide in `decks/thesis-defense/`.**

*Added 2026-09-22: `s30b` (the finished machine, closing the integration run)
and `s37a` (the Part III-B divider). Both follow the deck's existing
letter-suffix convention for a slide inserted beside an existing cue — `s04b`,
`s07b`, `s09a`, `s12b` — and neither renames anything.*

The deck has two different orders and they are not the same thing:

- **File order** — the sequence of `<section class="slide">` elements across
  `parts/*.html`, which is the order the arrow keys walk. The talk first, the
  appendix after it.
- **Organisation** — the two-level taxonomy below, which is what the overview
  (press `o` or `Escape`) shows, so Sirio can find any slide in a second.

*Resolved 2026-09-22.* `s30b` and `s37a` are now in `SLIDE_ORDER`, and
`b25` was added beside `s41`. `s39` moved to the **appendix** on the same
day, simplified to the AI contrast alone with its timeline cut (Sirio:
"only focus on AI, and make it more simple, and put it on the appendix").
It keeps its `s39` cue, as appendix membership is `data-part="backup"`.

The taxonomy is implemented once, as the `SLIDE_ORDER` array at the top of the
script in **`parts/99-tail.html`** (section "0 · The slide taxonomy"). That
array and this file are the same table written twice. **Change one, change the
other.**

---

## 1 · The taxonomy

Two levels. The **band** is the part of the presentation and is the strongly
marked division — big heading, rule across the page. The **topic** is the
thesis chapter inside that band and is the lighter sub-heading.

| Band (strong) | Topic (sub-heading) | Thesis | Cues, in order |
|---|---|---|---|
| Opening | — | — | `s00` `s01` `s02` `s04` `s03` |
| Part I — Why this machine, and how I worked | The gap | ch. 1–2 | `s05` `s05b` `s06` `s04b` · appendix: `s04c` |
| | Requirements and decomposition | ch. 5 | `s07` `s07b` `s10` |
| | Method, and working with an AI | ch. 3–4 | `s09a` `s09b` `s08a` `s08` `s09` |
| Part II — The modules | Pump module | ch. 6 | `s11` `s12b` `s13` `s14` `s15` `s16` · appendix: `s12` `b26` |
| | Alignment module | ch. 7 | `s17` `s18` `s19` |
| | Nozzle module | ch. 8 | `s20` `s21` |
| | User interface module | ch. 9 | `s22` `s23` |
| | Reagent storage | — | `s24` |
| Part III — The machine | System architecture and electronics | ch. 10 | `s25` `s26` `s27` |
| | Integration | ch. 11 | `s28` `s29` `s30` `s30b` |
| | System-level validation | ch. 12 | `s31` `s32` `s33` `s34` `s35` |
| Live demo | — | — | `s36` |
| Discussion and close | Discussion and reflection | ch. 13 | `s37a` `s37` `s38` · appendix: `s39` |
| | Conclusion and outlook | ch. 14 | `s40` `s41` · appendix: `b25` |
| | Closing | — | `s42` `s43` |
| Appendix — not yet sorted | — | — | `b01` … `b24` |

Rules that come with the table:

- The four module names — **Pump · Alignment · Nozzle · User Interface** — are
  canonical and match the thesis chapter titles. Never substitute a component
  for a module: not "stage", not "needle", not "screen". (`BRIEF.md`
  decisions log, 2026-09-21.)
- **Reagent storage** is Marius Schiller's contribution. It is its own topic,
  and it is never counted among Sirio's four modules.
- A **divider** slide (`s11`, `s25`, `s09a`, `s37a`) opens its band and comes
  first in its group. `s37a` is Part III-B and is deliberately plain: no
  journey strip, no symbols, no travelling dot (Sirio, 2026-09-22).
- Inside a topic: **the shown slides first, in talk order, then that topic's
  appendix slides.**
- `b01`–`b24` are unrevised — Sirio has not read through them yet — so they
  stay in one flat "not yet sorted" band at the end, in their current order.
  Do not classify them on his behalf.

---

## 2 · The attributes that drive it

Everything is read off the slide's own `<section>`; nothing is hard-coded
against a position in a file.

| Attribute | What it means |
|---|---|
| `data-cue` | The slide's **stable address**: `s12`, `s09b`, `b07`. Used by the sync protocol between the host, presenter and Italian guest decks, by the `#/<slide>/<step>` hash, by `Deck.slide(cue, …)` and `Deck.enter(cue, …)`, and by `CONTENT.md` / `CONTENT-IT.md`. Equal to the `id`. **Never rename a cue** to say something about where a slide sits. |
| `data-part` | The band: `open`, `I`, `II`, `III`, `demo`, `disc`, `close`, `backup`. Drives the section rail and the mini map. |
| **`data-part="backup"`** | **This, and only this, is what makes a slide an appendix slide.** Not the cue prefix. `s12` lives in the appendix and keeps its `s12` cue. |
| `data-topic` | Optional. The `key` of a row in `SLIDE_ORDER` (`pump`, `alignment`, `nozzle`, `ui`, `storage`, `arch`, `integ`, `valid`, `disc`, `outlook`, `closing`, `gap`, `req`, `method`, `open`, `demo`, `unsorted`). It **wins over the cue table**, so a slide that moves parts carries its own group with it. Put it on every slide you move into the appendix. |
| `data-talk="no"` | The slide is outside the talk entirely. Only the hold screen `s00` has it: it sits on the projector before the talk starts, so it gets no number, no rail and no place in any total. |
| `data-accent`, `data-map` | Thread colour and module mark. Unrelated to sorting. |

**The fallback.** A slide whose cue is not in `SLIDE_ORDER` and that has no
`data-topic` inherits the group of the nearest **preceding** slide in the file
that has one; an unmapped slide with `data-part="backup"` falls into "not yet
sorted". Several sessions add and remove slides at once, so nothing may ever
vanish from the overview. Still, put new cues in the table — the fallback is a
safety net, not the design.

---

## 3 · Numbering and the appendix hue

- **Talk slides** get their plain position in the talk: 1, 2, 3 … The number
  is computed from position, so cutting or inserting a slide renumbers the
  deck automatically and no id changes.
- **Appendix slides** get `A01`, `A02`, … numbered in document order, in the
  appendix hue. `s12` is `A01` because it is the first appendix section in the
  file; `b01` is `A02`, and so on. (They used to read `B01`; `A` for appendix
  matches what the section rail has always said.)
- **The hold screen** (`data-talk="no"`) shows no number at all.
- **The hue** is `--appendix: #8b99ad`, a cool slate defined once in the
  `<style data-part="tail">` block of `parts/99-tail.html`. It is deliberately
  nowhere near the orange accent or the violet/teal module threads, and it
  means exactly one thing: **reference material, not part of the talk.** It is
  used on the corner counter, on the overview badge and border of an appendix
  thumb, and on the "Appendix — not yet sorted" band heading.
- In the **overview**, an appendix thumb keeps the slate badge, gets a dashed
  slate border and its clone is dimmed — visible, findable, obviously off the
  script.
- In the **presenter view**, the slide counter reads `A01` and the progress
  bar says "appendix" and holds where the talk left it. Both test
  `data-part="backup"` through `backupNo[]`, never the cue prefix.

---

## 4 · Where an appendix slide's code lives

When a `<section>` moves from one part file to another, **its `<style>` and
`<script data-part>` code stays where it was.** Two reasons:

1. `assemble.py` hoists every `<style data-part>` into the one document head
   and every `<script data-part>` to the end of the one body. There is only
   ever one document, so `#s12 .prin { … }` matches wherever the section sits.
2. Each part's script is one IIFE with its own helpers. The `s12` timeline
   builder closes over part II's `q`, `qa`, `armDraw`, `draw` and `EO`; those
   do not exist in `60-backups.html`. And `Deck.slide` / `Deck.enter` register
   **by cue**, not by file, so the slide animates correctly from anywhere.

So `s12` is a worked example: the section is in `parts/60-backups.html`, its
CSS and its two builders are in `parts/30-part2.html`, and a comment at each
of the three places points at the other two.

---

## 5 · Three recipes

### Add a slide

1. Write the `<section>` into the part file for its band, in the position it
   should occupy in the talk. Give it a fresh `data-cue` (= `id`), the right
   `data-part`, and `data-accent` / `data-map` if it is a module slide.
2. Add the cue to the right row of the table in **§1 above** and to
   `SLIDE_ORDER` in `parts/99-tail.html`, in the position it should occupy.
3. Add its entry to `CONTENT.md` and its bullet points to `CONTENT-IT.md`.
   **Updating the Italian points for any slide you touch is a standing rule
   for this deck.**
4. `python assemble.py`. Numbering, the rail, the overview and the presenter
   totals all follow on their own.

### Move a slide into the appendix

1. Cut the whole `<section>` out of its part file and paste it into
   `parts/60-backups.html`, in its topic's position among the sorted appendix
   slides (the moved-out-of-the-talk ones come before `b01`).
2. Change `data-part="…"` to `data-part="backup"` and **add
   `data-topic="<key>"`** naming the topic it belongs to.
3. **Keep `id` and `data-cue` unchanged.** Appendix membership is
   `data-part="backup"`; the cue is an address, and renaming it would break
   the sync protocol, `CONTENT.md`, `CONTENT-IT.md`, the `#sNN` CSS and the
   registered builders.
4. Leave its `<style>` rules and its `Deck.slide` / `Deck.enter` builders where
   they are (§4), with a comment at each saying where the section went.
5. In `SLIDE_ORDER`, move the cue to the **end** of its topic's `cues` list.
6. Move the slide's entries in `CONTENT.md` and `CONTENT-IT.md` into those
   files' appendix sections, under a heading that names its topic. Keep the
   content — only its place changes.
7. `python assemble.py` and check the overview.

### Add a new topic

1. Insert a new row into `SLIDE_ORDER` at the position it should appear,
   with `band` (copied **character for character** from the rows above and
   below it, or it will start a new band), a unique `key`, a `topic` name and
   a `thesis` string such as `'chapter 7'`.
2. Add the same row to the table in §1.
3. Slides join it by cue or by `data-topic="<key>"`.

---

## 6 · When Sirio revises a `bNN` slide

The "Appendix — not yet sorted" band is a holding pen, not a decision. When he
has read a backup slide and says where it belongs:

1. Give the section a `data-topic="<key>"`.
2. Move its cue out of the `unsorted` row of `SLIDE_ORDER` and into the end of
   its topic's `cues` list.
3. Move the section in `parts/60-backups.html` so the sorted appendix slides
   stay grouped at the top of the file, ahead of the ones still unsorted.
4. Its `A`-number changes, because those follow document order. That is fine —
   nothing addresses a slide by its number.

---

## 7 · Known gap

**The overview thumbnails render imperfectly.** The clones `deck.js` builds are
static copies, so anything a GSAP timeline draws is missing or mid-flight, and
a few dialects lay out wrongly at thumbnail scale. This is known, it is
Sirio's explicit "last thing we fix", and it is **out of scope for the sorting
work**. Until then, every thumb carries a caption with its cue and its title,
which is what actually makes a slide findable.

The runtime that builds the flat grid, `assets/deck.js` and `assets/deck.css`,
is **shared with `decks/lab-meeting-2026-06/` and must not be edited.** All the
grouping lives in `parts/99-tail.html`, which moves `deck.js`'s own thumb nodes
into band → topic containers without rebuilding them, so the click handlers
(closures over the slide index) keep working.
