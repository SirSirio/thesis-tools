# Phase 7: Thesis Showcase Landing Page - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-17
**Phase:** 7-thesis-showcase-landing-page
**Areas discussed:** Motion technique, Hero & video, Page structure, Intro content & i18n

---

## Pre-discussion finding: the ROADMAP's video premise was wrong

The ROADMAP stated *"A hero video is planned but the asset does not exist yet — the phase
must define the slot and a graceful no-asset fallback, not block on the file."*

Scouting found **two videos already in the repo**:

- `prototypes/Prototype-2-Alignment-Module/Alignment_Module_V2.mp4` — 35 MB, **committed**,
  already autoplaying with a poster in the lab-meeting deck
- `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PrototypePumpHeadV2.3Dispensing.mp4`
  — 9.5 MB, untracked

The no-asset-fallback framing was therefore dropped. The real question became *which* clip
and how heavy first paint is allowed to be. `.git` was already 77 MB.

---

## Motion technique

### Q1 — How should the above-the-fold motion be built?

| Option | Description | Selected |
|--------|-------------|----------|
| Hand-built CSS/SVG | Existing idiom, zero new deps, nothing to learn, guaranteed offline | (via "Other") |
| Vendor Lottie | ~250 KB local copy; needs After Effects/LottieFiles authoring; binary asset | |
| Vendor Rive | ~300 KB wasm; best interactive motion; biggest new-skill investment | |
| You decide | Capture the constraint, let planning weigh it | ✓ |

**User's choice:** *"You can decide, also having a look at this:
https://github.com/Leonxlnx/taste-skill"*

**Notes:** The reference was fetched and read (repo tree via the GitHub API after two 404s on
guessed paths). It resolved the question — but not in the direction the repo's README
implies. Two skills matter and they pull opposite ways:

- **`redesign-skill`** — near-perfect fit. scan → diagnose → fix. *"Work with the existing
  tech stack. Do not migrate frameworks or styling libraries."* *"Do not break existing
  functionality."* Purely authoring-time; outputs plain CSS/HTML/JS; no shipped dependency.
- **`taste-skill`** (flagship) — excellent taste rules, but **prescribes a stack this project
  cannot have**: Tailwind v4, Motion (`motion/react`), GSAP + ScrollTrigger, icon packages.
  Collides head-on with no-build-tools / no-npm / no-frameworks / no-CDN.

**Decision recorded: hand-built CSS/SVG, no vendored runtime.** The reference *strengthened*
this rather than undermining it — taste-skill's own redesign variant says stay in your stack,
and its motion rules (`transform`/`opacity` not `top`/`left`; motion must be motivated;
honour `prefers-reduced-motion` above intensity 3) are all plain-CSS achievable.
**Take the taste, reject the toolchain.**

A diagnosis of the current page against taste-skill's checklist was produced and carried into
CONTEXT.md — the current hero is literally taste-skill's #1 listed AI tell (centred hero +
dark mesh gradient), the subtitle exceeds the 20-word hero cap, and eyebrow count is 5 where
2 is allowed.

### Q2 — Where should the page sit on the three dials?

| Option | Description | Selected |
|--------|-------------|----------|
| 7 / 6 / 4 — confident | Near taste-skill's 8/6/4 default, pulled back. Designed, not safe | ✓ |
| 5 / 4 / 4 — restrained | Academic-credible; nothing reading as a startup landing page | |
| 9 / 8 / 3 — showcase | Portfolio-grade; intensity 8 in hand-written CSS is a lot of work | |
| You decide | Let planning set dials from content | |

**User's choice:** 7 / 6 / 4 — confident

### Q3 — What actually carries the motion above the fold?

*First pass:*

| Option | Description | Selected |
|--------|-------------|----------|
| The liquid | Droplet/flow motif in inline SVG; motivated by the subject itself | ✓ (then reopened) |
| The device | The six-module schema animated | |
| The video | Existing footage as the hero motion | |
| Type & layout | Choreographed entrance, no subject-matter motif | |

**User's choice:** The liquid — **then asked to reopen**: *"Can you go back to the previous
question please? I would like to discuss that, not just with one question, but some more
explanation please"*

*Second pass, after a fuller written exploration of what "the liquid" could concretely mean —
naming the decorative-vs-explanatory tension, and that taste-skill's motivated-motion rule
splits the field:*

| Option | Description | Selected |
|--------|-------------|----------|
| Droplet, then wave | Goo-filter droplet in hero (legible in 1s), peristaltic wave deeper as the "how it works" beat | |
| Droplet only | One motif done well; cheapest; page gets quiet after the fold | |
| Peristaltic wave | The mechanism itself — rollers, tube, liquid packet. Most distinctive and thesis-honest | ✓ |
| Liquid glass | Gooey merging surfaces, refraction; most beautiful; decorates rather than explains | |

**User's choice:** Peristaltic wave

**Notes:** The braver choice. Its known weakness — it reads a beat slower to a cold visitor
than a falling drop — was accepted explicitly, on the grounds that the headline already says
"Modular Automated Liquid Dispensing". *Text explains; motion makes you care.* The
metaball/goo technique (SVG `feGaussianBlur` + `feColorMatrix`) was explored and set aside
with the droplet.

### Q4 — How literal should the peristaltic wave be?

| Option | Description | Selected |
|--------|-------------|----------|
| Real geometry, stylized | Actual proto-02 rotor (4 rollers, R≈19.7 mm) in the glass idiom | ✓ |
| Abstract flow | Travelling pinch on a plain tube; instantly legible but generic | |
| Full mechanism | Faithful cross-section; risks reading as a CAD screenshot | |

**User's choice:** Real geometry, stylized

**Notes:** The geometry is already solved and documented in proto-02's PROTOTYPE.md and the
rotor solver, so accuracy costs nothing extra.

### Q5 — What happens to `.bg-blobs`?

| Option | Description | Selected |
|--------|-------------|----------|
| Replace on landing only | Inline override; `assets/style.css` untouched; no blast radius | ✓ |
| Keep them | Zero risk, but keeps the tell and fights the rotor visually | |
| Remove site-wide | Most coherent; touches every page; needs its own visual pass | |

**User's choice:** Replace on landing only

---

## Hero & video

### Q1 — Where does video sit now that the rotor owns the hero?

| Option | Description | Selected |
|--------|-------------|----------|
| Below fold, pump clip | Rotor in hero; 9.5 MB pump-head clip below as the "it's real" beat | ✓ |
| Below fold, both clips | Pump + 35 MB alignment; 45 MB of video on one page | |
| Video in the hero | Heaviest first paint; partly wastes the rotor motif | |
| No video this phase | Define slot + fallback only; ship the animation | |

**User's choice:** Below fold, pump clip

**Notes:** Framed as "idealized mechanism, then hardware reality". This decision later
survived the audience reversal (Q — Audience) on its own merits.

### Q2 — How should the 9.5 MB untracked clip land in the repo?

| Option | Description | Selected |
|--------|-------------|----------|
| Re-encode, then commit | One-time ffmpeg pass to ~1–3 MB; keeps git history lean forever | ✓ |
| Commit as-is | Zero work; permanent 9.5 MB in history; ~10× heavier than needed | |
| You decide | Let planning set the encode target | |

**User's choice:** Re-encode, then commit

**Notes:** ffmpeg is authoring-time, not a build dependency — the same distinction that lets
the project take taste-skill's advice while rejecting its toolchain.

### Q3 — What serves as the video poster?

| Option | Description | Selected |
|--------|-------------|----------|
| head-result.jpeg | 84 KB, untracked at repo root, a pump-head result image | |
| Extract a frame | ffmpeg frame during the same encode pass; no jump on play | |
| You decide | Let planning pick with both in view | ✓ |

**User's choice:** You decide → **Claude's discretion**

### Q4 — How does the below-fold video behave?

| Option | Description | Selected |
|--------|-------------|----------|
| Autoplay on scroll | Muted loop via the existing IntersectionObserver; poster + play button under reduced-motion | ✓ |
| Click to play | Most respectful; but most visitors never click | |
| Autoplay always | Burns bandwidth on a clip nobody scrolled to | |

**User's choice:** Autoplay on scroll

---

## Page structure

### Q1 — What's the narrative arc above the tool grid?

| Option | Description | Selected |
|--------|-------------|----------|
| Problem → device → proof | Hero → why it matters → what it is → video → journey → resources | ✓ |
| Device → proof → how | Faster to the object; visitor never learns why it matters | |
| Problem → device → proof → process | Adds an AI-design-process section; a second thesis alongside the first | |
| You decide | Let planning derive the section list | |

**User's choice:** Problem → device → proof

**Notes:** The rejected "process" option was preserved as a deferred idea — genuinely
differentiating, but out of scope.

### Q2 — How do the five existing sections collapse?

| Option | Description | Selected |
|--------|-------------|----------|
| One Tools + two others | Calculators+Guides merge (5 cards); Roadmap and Presentations stay; Prototypes promoted to narrative | ✓ |
| One section, everything | All 8 items in one grid; loses real information about what each thing is | |
| Keep five sections | Grid isn't demoted, just postponed | |

**User's choice:** One Tools + two others

**Notes:** Framed on the observation that **not everything in the list is a tool** — the
prototype journey and the decks are *story*, and filing them beside a geometry solver is the
directory-thinking the phase exists to kill.

### Q3 — What does the "what the device is" section show?

| Option | Description | Selected |
|--------|-------------|----------|
| Simplified, purpose-built | New simple six-module graphic for a stranger; links to the explorer | ✓ |
| Port the real schema | Copy `buildSchema()`; engineering-grade detail; guarantees drift | |
| Iframe the explorer | Always in sync; fragile and heavy | |
| Photo or render instead | No assembled device exists yet — would show a pump head, not the system | |

**User's choice:** Simplified, purpose-built

### Q4 — What happens to the numbered eyebrows?

| Option | Description | Selected |
|--------|-------------|----------|
| Only below the fold | Narrative reads as story; the 3 resource sections keep numbers — register shift | ✓ |
| Drop entirely | Furthest from the tell; loses the July editorial structure | |
| Keep on all sections | The exact repeating-rhythm pattern taste-skill calls out | |

**User's choice:** Only below the fold

**Notes:** *"Story ends, index begins."* Lands at 3 eyebrows / ~7 sections, satisfying the
≤ ceil(sections/3) cap while making the numbering meaningful rather than decorative.

---

## Intro content & i18n

### Q1 — How much of the new narrative prose gets EN/IT translation?

| Option | Description | Selected |
|--------|-------------|----------|
| Everything, as now | Full parity; no LANG-01…05 regression | ✓ |
| Headlines only | Italian view becomes visibly second-class | |
| Drop IT from narrative | The switcher would imply a promise the page won't keep | |

**User's choice:** Everything, as now

### Q2 — Who writes the narrative copy, and in what voice?

| Option | Description | Selected |
|--------|-------------|----------|
| I draft, you edit | Claude drafts from repo sources; Sirio rewrites; his voice wins conflicts | ✓ |
| You write it | Guaranteed authentic voice; blocks the phase until copy exists | |
| Lift from the thesis | Consistent with the document, but written for examiners not strangers | |

**User's choice:** I draft, you edit

### Q3 — Is this page the thesis' front door for a QR-code/print audience?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, QR is primary | Phone on bad wifi; justifies the weight discipline | |
| No, desktop-first | Examiners on laptops; relaxes the weight budget | ✓ (via "Other") |
| Both, equally | "Both" usually means mobile quietly loses | |

**User's choice (free text):** *"This website is mainly meant for a website browse, it is a
thesis work, reading through the phone is a bit out of scope. I would like it to be
good-looking on a phone just to show to people, but this is not the primary aim. Also, in my
actual thesis, I will put the link of the website, not really a QR code, so the examiner can
just look at it on his PC. QR is a bit to show off to friends on the fly, but does not really
carry the main importance I would say."*

**Notes:** **This reverses the ROADMAP's open question 4** and the assumption the video
discussion had been running on. It was explicitly checked whether this reopened the two
decisions it appeared to undercut — it did not. The video stays below the fold because the
rotor motif earned the hero, not because of bytes; the re-encode stands because committed
bytes are permanent in git history regardless of viewer. Both surviving on independent
grounds was treated as a good sign rather than glossed over.

### Q4 — Change the type? (taste-skill bans default system fonts)

| Option | Description | Selected |
|--------|-------------|----------|
| Stay on system-ui | Zero bytes; site-wide consistency; the ban targets AI-default *choices* | |
| Vendor a display font | One woff2 for headlines; body stays system-ui; legal offline | ✓ |
| You decide | Let planning weigh weight-vs-polish | |

**User's choice:** Vendor a display font

**Notes:** Strengthened by the desktop-first reversal in Q3.

### Q5 — Which display font?

| Option | Description | Selected |
|--------|-------------|----------|
| Geist | Vercel; **SIL OFL** — unambiguously redistributable; technical/neutral register | ✓ |
| Outfit | Geometric, SIL OFL via Google Fonts; friendlier, less technical | |
| Satoshi | Most characterful; Fontshare license needs checking before shipping as a file | |
| You decide | Let planning pick and verify | |

**User's choice:** Geist

**Notes:** Licensing was raised as load-bearing rather than cosmetic — the site is
redistributed both via GitHub Pages and on a USB drive handed to people, so the font file
must be redistributable. OFL settles it.

---

## Claude's Discretion

- **Video poster** — `head-result.jpeg` vs an ffmpeg-extracted frame (explicit "You decide")
- **Motion technique** — delegated via "You can decide" + the taste-skill reference; resolved
  to hand-built CSS/SVG and recorded as D-01/D-02/D-03
- ffmpeg encode settings and target bitrate
- Exact visual treatment of the hero rotor animation (glass rendering, loop timing, entrance)
- Visual design of the simplified six-module graphic
- Section headline wording; the specific argument the "problem" section makes
- Hero layout and rotor degradation at 375px
- Whether the six-module graphic gets any hover affordance (D-16's "no interactivity" is a
  floor, not a target)

## Deferred Ideas

- **taste-skill's total em-dash ban** — *actively rejected.* The site's em-dash-heavy copy is
  Sirio's real voice, not generated slop; applying the ban means a site-wide rewrite to fix a
  non-problem.
- **Site-wide `.bg-blobs` removal** from `assets/style.css` — most coherent, but touches every
  page; needs its own visual pass.
- **The 35 MB alignment video's git weight** — pre-existing condition, already committed and
  used by the deck; not this phase's problem.
- **An "AI-assisted design process" narrative section** (GSD, tools-as-method) — considered
  and set aside as a second thesis alongside the first. Candidate for a future phase.
- **Body text in a vendored font** — Geist is scoped to headlines only.
- **Interactive six-module graphic on the landing page** — explicitly excluded; if the static
  version reads flat, fix the composition, don't duplicate the explorer.

### Reviewed Todos (not folded)

- **"Redesign and restructure landing page for many tools"** (score 0.9) — stale, already
  retired by the 2026-07-13 quick task. **Recommend closing.**
- **"Open tool links in new tab from prototype detail view"** (score 0.9) — belongs to
  `prototypes/index.html`. Unrelated.
- **"Clarify .agent vs .agents folder difference"** (score 0.6) — matched on generic keywords
  only. Unrelated.
