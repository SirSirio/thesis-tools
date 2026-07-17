# Phase 7: Thesis Showcase Landing Page - Context

**Gathered:** 2026-07-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Remodel `index.html` from a directory of tools into a **showcase of the thesis itself**.
A visitor who has never heard of the project lands, and through an introduction, media, and
motion that starts on load, immediately understands what "modular automated liquid dispensing
for point-of-care use" *is* — only then meeting the tools, presented as one section of a
larger story rather than the whole page.

**In scope:** `index.html` only — its inline `<style>`, inline `<script>`, and markup; a
vendored Geist woff2 subset; a re-encoded pump-head video + poster committed into the
proto-02 folder.

**Not in scope:** any change to `assets/style.css`; any other page on the site; any new tool;
building new content that doesn't already exist somewhere in the repo.

**Hard invariants:** every existing tool stays reachable; EN/IT i18n coverage does not
regress (LANG-01…LANG-05); no horizontal scroll at 1280px or 375px; no CDN-only dependency;
no build tools, npm, or frameworks; all logic/styles inline.

</domain>

<decisions>
## Implementation Decisions

### Motion technique

- **D-01:** **Hand-built CSS/SVG motion. No vendored animation runtime.** Rive, Lottie, and
  Spline are all explicitly rejected. The site's existing hand-built motion (prototypes
  journey `getPointAtLength` path sampling, deck transitions, rotor-solver live SVG, card
  spotlight) is the proven idiom and stays the idiom.
- **D-02:** **`taste-skill`'s `redesign-skill` is the working method** for this phase:
  scan → diagnose → fix; *"work with the existing tech stack, do not migrate frameworks or
  styling libraries"*; *"do not break existing functionality"*. It is authoring-time guidance
  only and ships no dependency.
- **D-03:** ***`taste-skill`'s library prescriptions DO NOT APPLY and must be actively
  rejected.*** The flagship `taste-skill/SKILL.md` mandates Tailwind v4, Motion
  (`motion/react`), GSAP + ScrollTrigger, and icon packages. Every one of these violates
  this project's no-build-tools / no-npm / no-frameworks / no-CDN constraints. **Take the
  taste, reject the toolchain.** Its *motion rules* are all achievable in plain CSS and DO
  apply: animate `transform`/`opacity` never `top`/`left`/`width`/`height`; motion must be
  motivated (communicate hierarchy, storytelling, feedback, or state); honour
  `prefers-reduced-motion` for anything above intensity 3.
- **D-04:** **Dials locked at `DESIGN_VARIANCE 7 / MOTION_INTENSITY 6 / VISUAL_DENSITY 4`**
  (taste-skill's baseline is 8/6/4). Asymmetric hero, real motion on load and scroll,
  generous spacing. Reads as "modern and quite dynamic, but still professional" — designed,
  not safe, and not a startup landing page.
- **D-05:** **The hero motif is the peristaltic wave** — the mechanism itself: rollers
  compressing a tube, a liquid packet moving along it. Chosen over a droplet/goo-filter
  motif, a flow-through-the-system diagram, and decorative "liquid glass". Rationale: it is
  the most thesis-honest and most distinctive option, and it satisfies taste-skill's
  motivated-motion rule natively because **the motion IS the subject matter**. Accepted
  trade-off: it reads a beat slower to a cold visitor than a falling drop would — the
  headline carries the meaning, the motion carries the interest.
- **D-06:** **Real geometry, stylized.** The hero rotor uses **actual proto-02 geometry —
  4 rollers, R≈19.7 mm, correct proportions, tube wrap** — rendered in the site's glass
  idiom, not as a technical drawing. The geometry is already solved and documented, so
  accuracy costs nothing extra.
- **D-07:** **`.bg-blobs` is overridden on the landing page only**, in its own inline
  `<style>`; that space goes to the rotor motif. `assets/style.css` is **NOT** modified and
  every other page keeps its blobs untouched. (Rationale: the dark centred hero + mesh
  gradient is taste-skill's single most-cited AI tell, and a blurred mesh behind an animated
  mechanism would fight it visually. Site-wide removal is out of scope — see Deferred.)

### Hero & video

- **D-08:** **The rotor animation owns the hero; video sits below the fold** as the "it's
  real" beat — the same mechanism, actually running. Idealized mechanism, then hardware
  reality. **This holds on its own merits, not on weight** (see D-12).
- **D-09:** **The pump-head clip is the video**, not the alignment module.
  `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PrototypePumpHeadV2.3Dispensing.mp4`
  (currently **untracked**, 9.5 MB). The 35 MB `Alignment_Module_V2.mp4` is not used here.
- **D-10:** **Re-encode before committing.** One-time ffmpeg pass to ~1–3 MB (H.264, sized
  for web, no audio); commit only the compressed version. The 9.5 MB original stays untracked
  on disk as the master. Rationale: committed bytes are permanent in git history (`.git` is
  already 77 MB with the 35 MB alignment video in it) — this is true regardless of audience.
  ffmpeg is an authoring-time step, not a build dependency — same distinction that lets us
  take taste-skill's advice while rejecting its toolchain.
- **D-11:** **Autoplay on scroll into view**, muted, looping, paused on exit — via the
  IntersectionObserver already present in `index.html`. Matches the deck's autoplay
  precedent ([decks/lab-meeting-2026-06/index.html:173](../../../decks/lab-meeting-2026-06/index.html#L173)).
  **Under `prefers-reduced-motion` it stays a static poster with a play button** — respects
  the opt-out without hiding the content.

### Audience

- **D-12:** **Desktop-first. The examiner opens a URL on a PC.** Sirio's words: *"This
  website is mainly meant for a website browse… reading through the phone is a bit out of
  scope. I would like it to be good-looking on a phone just to show to people, but this is
  not the primary aim. In my actual thesis I will put the link of the website, not really a
  QR code, so the examiner can just look at it on his PC. QR is a bit to show off to friends
  on the fly, but does not really carry the main importance."*
  **Implication:** the first-paint weight budget is relaxed; the phone must look good but
  **never wins a conflict** with the desktop experience. This supersedes the ROADMAP's
  QR-code framing (open question 4 — answered: no).

### Page structure

- **D-13:** **Narrative arc: problem → device → proof → journey.** Hero (rotor motion +
  headline) → why point-of-care liquid dispensing matters → what the device is (six-module
  schema) → see it running (video) → the prototype journey → then the resource sections. A
  stranger gets motive, object, and evidence before ever meeting a calculator.
- **D-14:** **The grid genuinely collapses.** Below the narrative: **one `Tools` section**
  (Calculators' 4 cards + Guides' 1 card merged = 5 cards), plus **Roadmap** and
  **Presentations** as their own light sections. Five sections become three.
- **D-15:** **The prototype journey moves up into the narrative** as the "journey" beat — it
  is story, not a directory entry. (`prototypes/index.html` itself is untouched; only its
  card's placement on the landing page changes.)
- **D-16:** **A new, simplified, purpose-built six-module graphic** carries "what the device
  is" — module names, liquid vs data flow, **no payload chips, no interactivity** — linking
  through to the System Architecture Explorer for the real thing. **Do NOT port
  `buildSchema()`** from the tool: it is engineering-grade detail (6× NEMA17, LM75,
  capacitive sensing) aimed at someone who just arrived, and duplicating it guarantees drift.
  Do not iframe the tool either.
- **D-17:** **Numbered eyebrows survive only below the fold.** Narrative sections (problem,
  device, proof, journey) get **no** eyebrows — they are a story and should read like one.
  The three resource sections (Tools, Roadmap, Presentations) keep numbered eyebrows as a
  **deliberate shift in register: story ends, index begins**. Lands at 3 eyebrows across
  ~7 sections, satisfying taste-skill's ≤ ceil(sections/3) cap, and makes the numbering
  meaningful rather than decorative.

### Content & i18n

- **D-18:** **Full EN/IT parity — everything translates**, via the existing `data-i18n` +
  inline `LANG` dictionary pattern, `localStorage` key `lang`, try/catch wrapped. No
  coverage regression (LANG-01…LANG-05 hold). A page that switches to Italian and then hits
  English paragraphs looks broken — partial coverage is worse than none.
- **D-19:** **Claude drafts, Sirio edits.** Draft narrative prose from `PROJECT.md`, the
  architecture docs, and the prototype records; Sirio rewrites what doesn't sound like him.
  **Sirio's voice wins on every conflict.** Do not lift prose from the written thesis — it's
  written for examiners, not for a stranger.
- **D-20:** **Vendor Geist for headlines; body stays `system-ui`.** Self-hosted `@font-face`
  woff2, **subset to the glyphs the headlines actually use**. **SIL Open Font License** —
  license verification is mandatory and non-negotiable because the site is redistributed
  both via GitHub Pages and on a USB drive handed to people. No CDN, no Google Fonts `<link>`.

### Claude's Discretion

- **Video poster** — either `head-result.jpeg` (84 KB, untracked at repo root, a pump-head
  result image; move into the proto-02 folder and commit, matching the deck's
  `alignment_poster.jpg` pattern) or a frame extracted during the D-10 encode pass. Pick once
  both can be inspected; an extracted frame guarantees no visual jump on play.
- Exact ffmpeg encode settings and target bitrate for D-10, derived from the real clip.
- Exact visual treatment of the hero rotor animation — glass rendering, tube/roller styling,
  packet representation, loop timing, entrance choreography.
- Visual design of the simplified six-module graphic (D-16).
- Section headline wording and the specific argument the "problem" section makes.
- Hero layout at 375px and how the rotor motif degrades on small screens (must look good;
  D-12 means it does not win conflicts against desktop).
- Whether the six-module graphic gets any hover affordance at all (D-16 says no
  interactivity — treat as a floor, not a target).
- `PRICES_VERSION`-style cache/versioning concerns do not apply to this page.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### The design method (user-referenced — READ FIRST)

- `https://github.com/Leonxlnx/taste-skill` — **Sirio referenced this directly during
  discussion.** Portable agent skills for anti-generic frontend design. Repo tree:
  `skills/{taste-skill,redesign-skill,taste-skill-v1,minimalist-skill,brutalist-skill,soft-skill,output-skill,brandkit,...}/SKILL.md`.
- `https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/redesign-skill/SKILL.md`
  — **THE method for this phase (D-02).** scan → diagnose → fix. Preserves the existing
  stack, outputs plain CSS/HTML/JS, ships no dependency. Directly compatible with this
  project's constraints.
- `https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/taste-skill/SKILL.md`
  — **Dials (D-04), anti-slop checklist, hero rules, motion rules, 43-point pre-flight
  checklist.** ⚠ **Its stack prescriptions (Tailwind v4, Motion/react, GSAP, icon packages,
  design-system packages) MUST be rejected — see D-03.** Its hero rules are directly usable:
  hero fits initial viewport; headline ≤ 2 lines desktop; subtext ≤ 20 words AND ≤ 3–4 lines;
  ≤ 4 stack elements; one accent colour page-wide.

### The file being remodelled

- `index.html` — 558 lines. Current 2026-07-13 redesign idiom: fixed glass `.top-nav` with
  segmented EN/IT switch, `.bg-grid` overlay, `.hero-meta` chips, `.section-head` +
  `.section-index` numbered eyebrows, `.tool-card` icon tiles with mouse spotlight
  (`--mx`/`--my`), `.tool-card--wide` for single-item sections, `.reveal` +
  IntersectionObserver scroll reveals, inline `LANG` dict (~40 keys × EN/IT), `applyLang()`.

### Diagnosis baseline — how the current page scores against taste-skill

*(Established during discussion; the `redesign-skill` "diagnose" phase is partly done.)*

| taste-skill rule | Current `index.html` |
|---|---|
| "Centered hero with dark mesh gradient" = top AI tell | **Fails** — exactly that. Addressed by D-05/D-07 |
| Hero subtext ≤ 20 words | **Fails** — `site-subtitle` runs ~28 |
| Eyebrow count ≤ ceil(sections/3) | **Fails** — 5 eyebrows / 5 sections, allowed 2. Addressed by D-17 |
| "Three equal-width feature cards" | **Fails** — `.tools-grid`. Addressed by D-04's asymmetry |
| One accent colour, consistently | **Passes** — orange→red throughout |
| Zero em-dashes | Fails — **but deliberately ignored, see Deferred** |

### Content sources for the narrative (D-19)

- `.planning/PROJECT.md` — thesis framing, core value, constraints, hardware under
  development. Primary source for the "problem" and "device" sections.
- `tools/system-architecture-explorer/SPEC.md` — the six-module model, module payloads,
  liquid/data flow definitions. Source for D-16's simplified graphic.
- `tools/system-architecture-explorer/index.html` — `buildSchema()` is the **reference, not
  the source** for D-16; do not port it.
- `prototypes/PROTOTYPES.md` — shallow prototype registry; scan before opening deep files.
- `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PROTOTYPE.md` — **real rotor
  geometry for D-06** (4 rollers, corrected N_c=2 → R≈19.7 mm, gap sweep).
- `prototypes/index.html` — the journey page the D-15 narrative beat links to.

### Precedents & technique

- `tools/rotor-solver/index.html` — **the rotor geometry solver itself** (source of truth for
  the D-06 numbers) *and* the live-SVG template-string rebuild technique.
- `prototypes/index.html` — `alignNodesToPath()` / `getPointAtLength` path sampling; proof
  that hand-built motion (D-01) carries this site.
- `decks/lab-meeting-2026-06/index.html` §L173 — **the `<video>` autoplay + poster precedent
  for D-11** (`muted`, poster, local relative `src`).
- `decks/lab-meeting-2026-06/assets/alignment_poster.jpg` — 44 KB; the poster-weight and
  naming pattern for D-11.
- `tools/peristaltic-roller-displaced-volume-model/katex/` — **the vendoring precedent for
  D-20** (local copy of a third-party asset, no CDN).

### Guardrails

- `CLAUDE.md` — inline-only rule; offline/USB + GitHub Pages; no-horizontal-scroll;
  **`assets/style.css` is the only shared stylesheet**; ⚠ **never use VS Code Live Preview**
  (rewrites relative paths and strips inline `<script>` blocks) — use `serve.bat` →
  `http://localhost:7331`.
- `assets/style.css` — design tokens (`--accent` `#ff6b2b`, `--accent-2` `#e83535`, `--text`
  `#f0ece8`, `--text-muted` `#7a7068`, glass tokens). **MUST NOT change this phase (D-07).**
- `.planning/REQUIREMENTS.md` — LANG-01…LANG-05 are the i18n contract D-18 must not regress.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- **IntersectionObserver block** ([index.html:541-554](../../../index.html#L541-L554)) —
  already wired for `.reveal`; **D-11's autoplay-on-scroll extends this rather than adding a
  second observer.**
- **`applyLang()` + `LANG` dict** ([index.html:427-529](../../../index.html#L427-L529)) —
  D-18's new narrative keys slot straight in; `innerHTML` assignment already supports the
  `<br>` in `site-title`, so multi-line prose works.
- **`.reveal` / `--rd` stagger + `prefers-reduced-motion` guard**
  ([index.html:219-251](../../../index.html#L219-L251)) — the reduced-motion escape hatch
  D-11 and D-03 both need already exists and is correctly written.
- **Mouse-spotlight card treatment** (`--mx`/`--my`, `.tool-card::after`) — survives into
  D-14's merged Tools section unchanged.
- **`buildDiagram()` / `buildSchema()` SVG template-string technique** in the architecture
  explorer, and `alignNodesToPath()` in `prototypes/index.html` — the two best in-repo
  precedents for D-05/D-06's hand-built rotor animation.

### Established Patterns

- Inline `<style>` + inline `<script>`, English-first with a full IT mirror, `localStorage`
  key `lang`, `document.documentElement.classList.add('js')` gate before first paint.
- `.js`-gating for anything that would break without JS — the `.reveal` pattern is the model.
- Vendored third-party assets live in a subfolder next to the page that uses them
  (`tools/peristaltic-roller-displaced-volume-model/katex/`) — **the shape D-20's Geist
  woff2 should follow.**

### Integration Points

- **Every tool link must survive D-14's collapse.** Current set: `tools/rotor-solver/`,
  `tools/peristaltic-roller-displaced-volume-model/`, `tools/peristaltic-tensioned-path-model/`,
  `tools/system-architecture-explorer/`, `tools/gsd-workflow-guide/`, `prototypes/`,
  `tools/thesis-timeline/`, `decks/`. That is **8 destinations** — 5 in the merged Tools
  section, 1 in Roadmap, 1 in Presentations, 1 (prototypes) promoted into the narrative.
- The re-encoded video + poster land in
  `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/` and are referenced by
  relative path from `index.html` — must resolve from both `file://` (USB) and GitHub Pages.
- `README.md` / repo-root `ROADMAP.md` / `CLAUDE.md` may need a copy refresh if the landing
  page's self-description changes materially.

</code_context>

<specifics>
## Specific Ideas

- **"Take the taste, reject the toolchain."** The one-line summary of this phase's
  relationship to `taste-skill`.
- **"Idealized mechanism, then hardware reality."** The hero-to-video sequence: a stylized
  but geometrically real rotor turning, then footage of the actual thing running.
- **"Story ends, index begins."** The eyebrow rule (D-17) as a register shift, not a
  formatting rule.
- **"Text explains; motion makes you care."** Why the peristaltic wave (D-05) can afford to
  read a beat slower than a droplet — the headline already says "Modular Automated Liquid
  Dispensing".
- Sirio chose the **most thesis-honest** option at every creative fork (peristaltic wave over
  droplet; real geometry over abstract flow). Bias future creative discretion the same way.
- The "liquid glass" aesthetic Sirio named in Phase 6.1 (D-05 there) is the rendering
  vocabulary for the rotor — glass idiom, not technical drawing.

</specifics>

<deferred>
## Deferred Ideas

- **taste-skill's total em-dash ban** — *rejected, deliberately.* taste-skill treats em-dashes
  as an unconditional AI tell with "no limited-use allowance". Sirio's existing copy is
  em-dash-heavy across the whole site and it is **his actual writing voice**, not generated
  slop. Applying the ban would mean a site-wide copy rewrite to fix a non-problem. **Do not
  strip em-dashes.**
- **Site-wide removal of `.bg-blobs`** from `assets/style.css` — the most coherent outcome,
  but it touches every page and needs its own visual pass. Out of scope (D-07 confines the
  change to the landing page).
- **The 35 MB `Alignment_Module_V2.mp4`** — already committed and already used by the
  lab-meeting deck. Not used on the landing page (D-09). Its git-history weight is a
  pre-existing condition, not this phase's problem.
- **An "AI-assisted design process" narrative section** (GSD, tools-as-method) — genuinely
  differentiating, and Sirio considered it, but it's a second thesis running alongside the
  first. The GSD Workflow Guide card in the Tools section covers it for now. Candidate for a
  future phase.
- **Body text in a vendored font** — D-20 scopes Geist to headlines only; body stays
  `system-ui`. Revisit only if the pairing looks wrong in practice.
- **Interactive six-module graphic on the landing page** — D-16 explicitly says no. If the
  simplified graphic proves too flat, the fix is a better static composition, not
  interactivity duplicated from the explorer.

### Reviewed Todos (not folded)

- **"Redesign and restructure landing page for many tools"**
  (`.planning/todos/pending/2026-06-17-landing-page-restructure-many-tools.md`, matched at
  score 0.9) — **stale; already retired** by the 2026-07-13 homepage-redesign quick task,
  which restyled the directory. This phase changes what the page is *about*, which is a
  different job. **Recommend closing this todo** — no work here.
- **"Open tool links in new tab from prototype detail view"** (score 0.9) — belongs to
  `prototypes/index.html`'s Parameters table, not the landing page. Unrelated.
- **"Clarify .agent vs .agents folder difference"** (score 0.6) — meta/tooling question,
  matched on generic keywords only. Unrelated.

</deferred>

---

*Phase: 7-Thesis Showcase Landing Page*
*Context gathered: 2026-07-17*
