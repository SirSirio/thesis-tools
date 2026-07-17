# Phase 7: Thesis Showcase Landing Page - Research

**Researched:** 2026-07-17
**Domain:** Hand-built CSS/SVG motion design, self-hosted web font vendoring, video encoding, inline-only static-site remodelling
**Confidence:** HIGH (all five research targets verified against primary sources — repo files, official GitHub API/raw content, or direct ffprobe/tool inspection; no unverifiable claims left as guesses)

## Summary

This phase remodels a single 558-line file (`index.html`) with no new frameworks or build steps — the hard part is not *what* to use (CONTEXT.md's D-01/D-03 already settled that: hand-built CSS/SVG, no vendored runtime) but *how* to execute five concrete, checkable artifacts: (1) a filtered rule set from `taste-skill` with every Tailwind/React/GSAP-dependent prescription stripped out, (2) a legitimately-licensed, correctly self-hosted, subsetted Geist woff2, (3) an exact `ffmpeg` command for the real 9.9 MB portrait pump-head clip, (4) a named, concretely-scoped SVG/CSS animation technique for the hero rotor motif honoring the real proto-02 geometry, and (5) a small set of "how does the existing code extend" answers (IntersectionObserver reuse, `.bg-blobs` override safety, six-module graphic content).

All five were verified directly: the taste-skill SKILL.md files were fetched and their rules split into APPLICABLE (plain CSS/SVG achievable) vs NOT APPLICABLE (require Tailwind/Motion/GSAP/icon packages); Geist's license was confirmed as SIL OFL 1.1 from the authoritative `vercel/geist-font` repo's `LICENSE.txt`, and its release assets enumerated via the GitHub API (Bold weight — the site's existing `.site-title { font-weight: 700 }` — ships as `Geist-Bold.woff2`, 46.7 KB unsubset); the actual video file was probed with `ffprobe` (720×1280 portrait, H.264+AAC, 23.24 s, 9.9 MB, ~3.4 Mbps — not the ~9.5 MB CONTEXT.md estimated, and portrait, not landscape); `fonttools`/`pyftsubset` was confirmed installed locally (v4.25.0, via the project's Anaconda Python) for authoring-time subsetting; and the two most relevant in-repo animation precedents (`rotor-solver`'s `buildFigure()` and `prototypes/index.html`'s `alignNodesToPath()`) were read in full.

**Primary recommendation:** Build the hero rotor animation as a live-rebuilt SVG using `rotor-solver`'s exact template-string technique (not `getPointAtLength` sampling, which prototypes/index.html uses for static layout, not motion) — animate roller `<g>` transforms via CSS `@keyframes` on `transform: rotate()`, and represent the liquid packet as a `stroke-dashoffset` sweep along a fixed circular `<path>` matching the 180° contact arc. This satisfies D-03's transform/opacity-only rule natively, requires no vendored runtime, and can honor the real proto-02 numbers (N=4, R≈19.7 mm) exactly.

## Architectural Responsibility Map

Everything in this phase lives in one static HTML document with no server. The "tiers" below are conceptual layers within that single file, useful for keeping the planner's task boundaries clean.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Hero rotor motion (SVG build + CSS animation) | Browser / Client (inline `<script>` + `<style>`) | — | Pure client-side rendering; no data dependency |
| Video autoplay-on-scroll | Browser / Client (extends existing IntersectionObserver) | — | Same observer instance already drives `.reveal`; D-11 explicitly says extend, not duplicate |
| Six-module static graphic | Browser / Client (inline `<script>` SVG template string) | — | Simplified, non-interactive per D-16; content sourced from `tools/system-architecture-explorer/SPEC.md` at authoring time, not fetched at runtime |
| EN/IT narrative copy | Browser / Client (`LANG` dict + `applyLang()`) | — | Existing inline i18n pattern, no new architecture |
| Geist font delivery | Static / CDN-equivalent (self-hosted, `file://` + GitHub Pages) | — | No server logic; a local relative path must resolve identically under both delivery mechanisms |
| Video/poster asset delivery | Static / CDN-equivalent (relative path, git-committed) | — | Same dual-resolution constraint as the font |
| Whole-page motion budget (`prefers-reduced-motion`) | Browser / Client (CSS media query + JS guard) | — | Must gate hero animation, video autoplay, and reveal transitions consistently |

There is no "backend" or "API" tier in this phase — flagging this explicitly because the planner should not introduce one (e.g., no fetch of `SPEC.md` at runtime for the module graphic; content is drafted into the HTML at authoring time per D-16/D-19).

## User Constraints (from CONTEXT.md)

<user_constraints>

### Locked Decisions (D-01 through D-20 — do not relitigate)

- **D-01:** Hand-built CSS/SVG motion only. Rive, Lottie, Spline rejected. No vendored animation runtime.
- **D-02:** `taste-skill`'s `redesign-skill` method (scan → diagnose → fix) is the working method — authoring-time guidance only, ships no dependency.
- **D-03:** `taste-skill`'s library prescriptions (Tailwind v4, Motion/react, GSAP, icon packages) are REJECTED. Its motion rules (animate `transform`/`opacity` only; motivated motion; `prefers-reduced-motion` above intensity 3) DO apply.
- **D-04:** Dials locked at `DESIGN_VARIANCE 7 / MOTION_INTENSITY 6 / VISUAL_DENSITY 4` (taste-skill baseline is 8/6/4).
- **D-05:** Hero motif = the peristaltic wave (rollers compressing a tube, a liquid packet moving along it) — chosen over droplet/goo-filter and flow-diagram alternatives.
- **D-06:** Hero rotor uses real proto-02 geometry (4 rollers, R≈19.7 mm, correct proportions, tube wrap), stylized in the site's glass idiom, not a technical drawing.
- **D-07:** `.bg-blobs` overridden on the landing page only, in its own inline `<style>`; `assets/style.css` untouched; other pages keep blobs.
- **D-08:** Rotor animation owns the hero; video sits below the fold as the "it's real" beat.
- **D-09:** The pump-head clip is the video (`prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PrototypePumpHeadV2.3Dispensing.mp4`), not the alignment module.
- **D-10:** Re-encode before committing — one-time ffmpeg pass to ~1–3 MB, H.264, web-sized, no audio; original stays untracked as master.
- **D-11:** Autoplay on scroll into view, muted, looping, paused on exit, via the existing IntersectionObserver. Under `prefers-reduced-motion`, stays a static poster + play button.
- **D-12:** Desktop-first. Phone must look good but never wins a conflict with desktop. Weight budget relaxed.
- **D-13:** Narrative arc: problem → device → proof → journey, then resource sections.
- **D-14:** Grid collapses: one merged Tools section (5 cards), plus Roadmap and Presentations as their own sections. Five sections become three.
- **D-15:** Prototype journey moves up into the narrative as the "journey" beat.
- **D-16:** New, simplified, purpose-built six-module graphic — no payload chips, no interactivity — links to System Architecture Explorer. Do NOT port `buildSchema()`. Do not iframe the tool.
- **D-17:** Numbered eyebrows survive only below the fold (Tools, Roadmap, Presentations) — 3 eyebrows across ~7 sections.
- **D-18:** Full EN/IT parity via existing `data-i18n` + `LANG` dict pattern. No coverage regression (LANG-01–05 hold).
- **D-19:** Claude drafts narrative prose from `PROJECT.md`/architecture docs/prototype records; Sirio edits. Sirio's voice wins on every conflict. Do not lift prose from the written thesis.
- **D-20:** Vendor Geist for headlines only; body stays `system-ui`. Self-hosted `@font-face` woff2, subset to glyphs actually used. SIL Open Font License — verification mandatory. No CDN, no Google Fonts `<link>`.

### Claude's Discretion (this research makes an actual recommendation for each — see body below)

- Video poster: `head-result.jpeg` vs. an extracted frame from the D-10 encode pass → **see "Poster frame" below: extracted frame recommended.**
- Exact ffmpeg encode settings/target bitrate → **see "Concrete ffmpeg Command" below.**
- Exact visual treatment of the hero rotor (glass rendering, tube/roller styling, packet representation, loop timing, entrance choreography) → **see "Hero Rotor Animation Technique" below.**
- Visual design of the six-module graphic → **see "Six-Module Graphic Content" below.**
- Section headline wording / "problem" section argument → deferred to execution (D-19: Claude drafts, Sirio edits); not researched here, it is a writing task.
- Hero layout at 375px, how the rotor motif degrades on small screens → **see "Responsive hero" note below.**
- Whether the six-module graphic gets hover affordance → **recommendation: no, per the floor set by D-16; a static graphic with a single "See the full architecture →" link below it is sufficient and cheaper to build correctly.**
- `PRICES_VERSION`-style cache/versioning → confirmed not applicable (this page has no editable/persisted state comparable to the System Architecture Explorer's price table).

### Deferred Ideas (OUT OF SCOPE — do not implement)

- taste-skill's total em-dash ban — rejected, Sirio's copy stays as-is.
- Site-wide removal of `.bg-blobs` from `assets/style.css` — out of scope, landing page only.
- The 35 MB `Alignment_Module_V2.mp4` — not used here.
- An "AI-assisted design process" narrative section — candidate for a future phase, not this one.
- Body text in a vendored font — Geist scoped to headlines only.
- Interactive six-module graphic — explicitly rejected by D-16.

</user_constraints>

<phase_requirements>
## Phase Requirements

No formal REQ-IDs are mapped to Phase 7 in `.planning/REQUIREMENTS.md` (it is a page remodel, not a new tool with its own requirement block). The binding requirement carried into this phase is the existing i18n contract:

| ID | Description | Research Support |
|----|-------------|------------------|
| LANG-01 | Every page displays a language toggle; button shows the other language | `index.html`'s existing `.lang-switch`/`.lang-opt` markup (lines 267-273) is untouched by this phase — new narrative sections slot `data-i18n` keys into the existing `applyLang()` loop, verified at `index.html:512-523` |
| LANG-02 | Toggle re-renders all `data-i18n` elements without reload; dynamic values not translated | No dynamic numeric values are introduced by this phase (no calculators) — full-string translation only, same pattern as today |
| LANG-03 | Selected language persisted to `localStorage['lang']`, applied before first paint, defaults to English | Existing `try{...}catch{}` block at `index.html:509` is unchanged; no new localStorage keys needed for this phase (confirmed under Claude's Discretion / `PRICES_VERSION` note above — this page has no persisted state to version) |
| LANG-04 | All localStorage access wrapped in try/catch | Reused verbatim from `index.html:509`/`522` — no new localStorage read/write introduced |
| LANG-05 | No horizontal scroll at 1280px or 375px | The six-module graphic and hero rotor SVG must use `viewBox` + `width:100%` scaling (the exact pattern `rotor-solver`'s `buildFigure()` uses, `tools/rotor-solver/index.html:667`) rather than fixed pixel widths, to avoid overflow at 375px |

</phase_requirements>

## taste-skill: Distilled, Filtered Rule Set

Both SKILL.md files were fetched directly from `raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/{redesign-skill,taste-skill}/SKILL.md` and returned content (no 404). Rules below are filtered: **APPLICABLE** = achievable in plain CSS/SVG/inline JS under this project's constraints; **NOT APPLICABLE** = depends on the rejected toolchain (Tailwind, Motion/react, GSAP, icon packages, React/Next).

### `redesign-skill` — the method (D-02)

The three-phase process, quoted from the fetched SKILL.md:

1. **Scan:** *"Read the codebase. Identify the framework, styling method (Tailwind, vanilla CSS, styled-components, etc.), and current design patterns."* — [APPLICABLE, already done: this site is vanilla CSS/inline-JS, no framework, established in `CLAUDE.md`]
2. **Diagnose:** *"Run through the audit below. List every generic pattern, weak point, and missing state you find."* — [APPLICABLE — CONTEXT.md's baseline diagnosis table already did this during discuss-phase]
3. **Fix:** *"Apply targeted upgrades working with the existing stack. Do not rewrite from scratch. Improve what's there."* — [APPLICABLE — matches D-02's framing exactly; the planner should scope tasks as edits to `index.html`, not a rewrite]

Key rules, verbatim, all APPLICABLE (they are stack-agnostic hygiene rules, not library prescriptions):
- *"Work with the existing tech stack. Do not migrate frameworks or styling libraries."*
- *"Do not break existing functionality. Test after every change."*
- *"Before importing any new library, check the project's dependency file first."* — there is no dependency file in this project (no `package.json`); the equivalent check is "does this need a `<script src>`/CDN at all" — answer is no per D-01/D-03.
- *"Keep changes reviewable and focused. Small, targeted improvements over big rewrites."*

The audit's content structure (Typography, Color/Surfaces, Layout, Interactivity/States, Content, Component Patterns, Iconography, Code Quality, Strategic Omissions) is a useful checklist shape for the planner's verification tasks, independent of any library.

### `taste-skill` — the flagship, filtered (D-04)

**Dials (APPLICABLE — data, not library):** `DESIGN_VARIANCE`/`MOTION_INTENSITY`/`VISUAL_DENSITY`, baseline 8/6/4, confirmed by direct fetch. CONTEXT.md's D-04 lock of 7/6/4 is a deliberate one-notch pull-back from baseline on variance only — consistent with "designed, not chaotic."

**Anti-slop bans — applicability split:**
| Ban | Applicable? | Why |
|---|---|---|
| Em-dash ban | **NOT APPLIED** (deferred per CONTEXT.md — Sirio's actual voice) | Content rule, not a library dependency, but explicitly overridden by user decision |
| Serif-font-default ban | Moot | Geist Sans (D-20) and `system-ui` are both sans-serif; this project was never going to default to serif |
| Premium-palette-trap ban (beige+brass) | Moot | Site's accent is already orange→red (`#ff6b2b`→`#e83535`), not the banned palette |
| Eyebrow overuse (`≤ ceil(sectionCount/3)`) | **APPLICABLE, directly implements D-17** | CSS/markup rule, no library needed — see D-17's own math: 3 eyebrows / ~7 sections satisfies `ceil(7/3)=3` |

**Hero layout rules — all APPLICABLE (pure CSS constraints, no library):**
- Hero fits initial viewport without scroll
- Headline ≤ 2 lines desktop
- Subtext ≤ 20 words AND ≤ 3–4 lines — **current `site-subtitle` runs ~28 words per CONTEXT.md's own diagnosis table; must be cut when D-19 drafts new copy**
- CTAs visible without scrolling
- Top padding capped (`≈6rem`/`96px` — direct CSS equivalent of the `pt-24` Tailwind reference, no Tailwind needed)
- Hero stack limit: 4 text elements max (eyebrow OR brand strip + headline + subtext + CTAs)
- Banned in hero: tiny tagline below CTAs, trust micro-strips, feature bullet lists, logo walls

**Motion architecture — split:**
| Rule | Applicable? | Why |
|---|---|---|
| Only `transform`/`opacity` animate | **APPLICABLE — already how `.reveal` works** (`index.html:220-226`) | Pure CSS property constraint, no library |
| `window.addEventListener('scroll')` forbidden | **APPLICABLE, and already honored** — the site uses `IntersectionObserver`, not scroll listeners | This directly validates D-11's instruction to extend the existing observer rather than add scroll-position math |
| Motion's `useScroll()`/GSAP ScrollTrigger/CSS `scroll-driven-animations` as "allowed tools" | **NOT APPLICABLE** (Motion/GSAP rejected by D-03) — but **CSS `scroll-driven-animations`** (`animation-timeline: view()`) is itself framework-free and worth flagging as a possible future enhancement; **not required for this phase** since IntersectionObserver already satisfies the "no scroll listener" rule and has broader browser support (`animation-timeline` is Chromium-only as of this research, no Firefox/Safari support — [CITED: this matches the general Baseline-newly-available status reported by MDN/caniuse-class trackers; not independently re-verified this session, flagged LOW confidence if the planner wants to use it]) |
| Sticky-Stack / Horizontal-Pan canonical patterns | **NOT APPLICABLE** (GSAP ScrollTrigger `pin: true` dependent) |
| "Motion claimed = motion shown" (if `MOTION_INTENSITY > 4`, page must actually animate) | **APPLICABLE as a principle** — supports D-04's MOTION_INTENSITY 6 requiring real motion on load+scroll, not decorative-only |

**Stack prescriptions — ALL NOT APPLICABLE, rejected wholesale per D-03:** React/Next.js, Tailwind v4, Motion (`motion/react`), `next/font`, Phosphor/HugeIcons/Radix/Tabler icon packages, any of the "Design System Mapping" official packages (`@fluentui/react-components`, `@material/web`, `shadcn/ui`, etc.). None of these apply to a static-HTML/inline-JS/no-npm project.

**Pre-flight checklist — 44 points, filtered to what's checkable without the rejected toolchain:**

APPLICABLE (stack-agnostic, plain-CSS-checkable):
- Zero em-dashes → deferred per user decision, not enforced
- Hero fits viewport, headline ≤2 lines, subtext ≤20 words + ≤4 lines
- Hero top padding ≤ ~96px
- Hero stack ≤ 4 elements
- Eyebrow count ≤ ceil(sectionCount/3) → directly implements D-17
- No split-header pattern; no 3+ consecutive image+text-flip sections
- Navigation single line at desktop, height ≤ 80px — current `.top-nav` padding `13px 28px` easily satisfies this
- At least 4 different layout families across sections — worth checking once D-13's narrative sections are drafted (hero / prose+diagram / video / journey cards / card grid / wide rows — already ≥4 distinct families in the existing page)
- Mobile collapse explicit — the existing `@media (max-width: 600px/680px)` blocks already do this
- One accent color locked page-wide — already true (orange→red)
- One corner-radius scale — `assets/style.css`'s `--radius` token, unchanged
- One page theme (no mid-scroll light↔dark flips) — trivially true, dark theme throughout
- Button contrast WCAG AA — worth a manual check on new CTA button(s) once drafted
- No CTA label wraps to 2 lines at desktop — worth checking at execution time
- Button tactile feedback (scale/translate on active) — cheap to add, no library
- Reduced motion wrapper for `MOTION_INTENSITY > 3` — **directly required, D-11 and D-03 both call for it, and the existing `@media (prefers-reduced-motion: reduce)` block at `index.html:248-251` is the pattern to extend**
- No `window.addEventListener('scroll')` — already satisfied sitewide
- All animation event listeners have cleanup — applies to any new IntersectionObserver/video listeners added
- Real images used, no div-based fake screenshots — the hero uses live SVG, not an image, so N/A; the video section uses a real video, satisfies this
- No decorative hand-rolled SVGs banned by the checklist — **this specific line item (`"No hand-rolled decorative SVGs"`) directly CONTRADICTS D-01/D-05/D-06, which mandate a hand-rolled SVG rotor.** This is the one point in the checklist where taste-skill's own rule set assumes a component-library context (real icon packages, generated illustrations) that this project explicitly rejects. **Flag this contradiction explicitly for the planner: the hand-rolled SVG rotor is the correct call per D-01/D-05/D-06 and overrides this specific pre-flight line — taste-skill's rule exists to stop *lazy/generic* hand-rolled SVG filler, not a mechanically-accurate, subject-relevant diagram.**
- No version labels in hero (V0.6, BETA) — N/A, not applicable content
- No section-numbering eyebrows on narrative sections — directly implements D-17's "story ends, index begins" split
- No scroll cues or decorative status dots — worth avoiding in the hero

NOT APPLICABLE (require the rejected toolchain or a component ecosystem this project doesn't have):
- Bento grid cell-count matching, Chroma Grid, Sticky-Stack Sections, Horizontal-Pan Hijack — layout patterns assuming a grid/motion library
- Logo walls via Simple Icons SVGs — no icon package
- "Used by" strip — not relevant content for a thesis site
- Loading/empty/error states — this page has no async data fetching
- Dark mode tested in both modes — site is dark-only by design, no light mode exists or is planned

## Standard Stack

This phase introduces exactly one new binary asset dependency (the Geist woff2) and zero new libraries/CDNs/build tools. There is no "Standard Stack" table in the conventional npm-package sense — the project's stack is fixed (static HTML/CSS/JS) and this research finds no reason to deviate.

### Core
| Asset | Version | Purpose | Why Standard (for this project) |
|---|---|---|---|
| Geist Sans (self-hosted woff2, subsetted) | v1.7.2 (current `vercel/geist-font` release, per GitHub API `2026-06-01`) | Headline font (`.site-title` and other h1/h2-class elements per D-20) | SIL OFL 1.1 licensed, matches the existing `.site-title { font-weight: 700 }` requirement exactly with the `Geist-Bold.woff2` static weight |
| fonttools / pyftsubset | 4.25.0 (confirmed installed: `C:\Users\Sirio\anaconda3\Scripts\pyftsubset`) | Authoring-time-only woff2 subsetting | Already present in the local Anaconda Python environment — no new install needed; never runs at page-load or as a build step, matching the D-10 ffmpeg precedent for authoring-time-only tools |
| ffmpeg / ffprobe | 2023-06-19 build (confirmed installed: `C:\Program Files\ffmpeg\bin\`) | Authoring-time video re-encode (D-10) | Already present on the machine; same authoring-time-only distinction |

### Supporting

None. No JS libraries, no CSS frameworks, no icon packages — all rejected per D-01/D-03.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|---|---|---|
| Self-hosted Geist woff2 | Google Fonts `<link>` | Rejected outright by D-20 (CDN dependency, breaks offline/USB use) |
| `pyftsubset` (Python) | `fonttools` via `npx` / online subsetting tools (e.g., Transfonter, Font Squirrel webfont generator) | `npx` implies an npm dependency the project doesn't have; online tools require uploading the font and produce no reproducible/scriptable pipeline. `pyftsubset` is already installed locally and scriptable — no tradeoff, it is simply the better option here |
| CSS transform/SVG hand-built rotor animation | CSS `scroll-driven-animations` (`animation-timeline`) for scroll-linked hero effects | Not required for the hero (which animates on load, not on scroll); flagged above as a LOW-confidence future option for scroll-linked embellishment only, not a phase-7 requirement |

**Installation:**
```bash
# No npm install — fonttools/pyftsubset and ffmpeg are already present locally.
# Confirm before running (idempotent):
pyftsubset --help          # exits 0 if present
ffmpeg -version            # exits 0 if present
```

**Version verification:** `pyftsubset` version confirmed via `pip show fonttools` → `4.25.0`. `ffmpeg`/`ffprobe` version confirmed via `ffmpeg -version` → `2023-06-19-git-1617d1a752-full_build`. Geist release confirmed via `https://api.github.com/repos/vercel/geist-font/releases/latest` → tag `v1.7.2`, published `2026-06-01T14:49:59Z`.

## Package Legitimacy Audit

**Not applicable.** This phase installs zero npm/pip/cargo packages. The two authoring-time tools used (`fonttools`/`pyftsubset`, `ffmpeg`) are already installed on the machine and were verified present by direct command execution (`pip show fonttools`, `ffmpeg -version`) — not via `npm install`, `pip install`, or any package-manager trust chain that the slopcheck gate is designed to police. The Geist font itself is a binary asset fetched from the official `vercel/geist-font` GitHub repository (verified below), not a package-registry dependency.

## Architecture Patterns

### System Architecture Diagram — Hero Rotor Animation Data Flow

```
Page load
   │
   ▼
inline <script> runs buildHeroRotor() (rotor-solver's buildFigure() pattern)
   │
   ├─► reads hard-coded geometry constants: N=4, R=19.7mm, rollerR=5mm (proto-02 §5)
   │
   ▼
template-string assembles <svg> with:
   ├─ rotor disc + pitch circle (static)
   ├─ 4× roller <g> groups positioned via cos/sin at 90° spacing (static, computed once)
   ├─ 180° tube-wrap <path> (static)
   └─ liquid-packet <path> with stroke-dasharray (animation TARGET)
   │
   ▼
innerHTML assignment → SVG enters DOM
   │
   ▼
CSS @keyframes (defined in inline <style>, NOT JS) drive:
   ├─ rotor <g> (all 4 rollers as one group): transform: rotate() — continuous loop
   └─ packet <path>: stroke-dashoffset sweep — synced/looped via animation-duration
   │
   ▼
prefers-reduced-motion: reduce → @media query freezes both animations
   (animation: none, static single frame shown — mirrors index.html:248-251's existing pattern)
```

This mirrors `rotor-solver`'s `buildFigure()` exactly in the "build once, template-string, no persistent DOM mutation" sense (`tools/rotor-solver/index.html:574-668`), but diverges in the *animation* mechanism: `rotor-solver`'s figure is static (rebuilt only on control change); the hero motif needs continuous motion, which CSS `@keyframes` on `transform`/`stroke-dashoffset` provides without any per-frame JS (no `requestAnimationFrame`, satisfying taste-skill's "no scroll-linked JS state" spirit even though this isn't scroll-linked at all — it's load-triggered, looping, decorative-but-motivated motion).

### Recommended Project Structure

No new folders/files are created except the font vendor folder and the video/poster assets (both already scoped by CONTEXT.md to exist inside `index.html`'s reach and `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/` respectively):

```
/
├── index.html                          Remodelled — all narrative, hero SVG, six-module graphic inline
├── assets/
│   ├── style.css                       UNTOUCHED (D-07)
│   └── fonts/
│       └── geist/
│           ├── Geist-Bold.woff2        Subsetted (headline glyphs only)
│           └── LICENSE.txt             SIL OFL 1.1 — copied verbatim from vercel/geist-font
└── prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/
    ├── PrototypePumpHeadV2.3Dispensing.mp4   [ALREADY EXISTS, untracked — stays as master]
    ├── pump-head-web.mp4                     NEW — re-encoded, committed (D-10)
    └── pump-head-poster.jpg                  NEW — extracted frame or head-result.jpeg, committed
```

**Font folder location rationale:** `assets/` is the only site-wide shared folder (per `CLAUDE.md`); `assets/fonts/geist/` mirrors the existing `tools/peristaltic-roller-displaced-volume-model/katex/` per-consumer vendoring shape at the *site* level rather than the *tool* level, because Geist is used site-wide by every page's headlines once vendored here — but D-20 scopes it to *this phase's* headline usage on `index.html` only. **Recommendation: use `assets/fonts/geist/` (not a landing-page-local folder)** since `assets/` is explicitly the shared-resource location `CLAUDE.md` already sanctions, and the font is a static binary asset (no CSS/JS coupling) — this doesn't violate "no new shared files for tool-local logic" because it isn't logic, it's a font file, structurally identical to how `assets/style.css` itself is shared. The `@font-face` declaration referencing it lives inline in `index.html`'s `<style>` block (D-20 requirement), not in `assets/style.css`.

### Pattern 1: Self-Hosted Subsetted Web Font (D-20)

**What:** A single static-weight woff2, subsetted to the actual glyph set the headline copy uses, self-hosted at a relative path, declared via inline `@font-face`.

**When to use:** Exactly this phase's headline vendoring — `.site-title` and any new h2-class narrative headlines that should carry the Geist treatment.

**Exact `@font-face` block** (verified to resolve identically from `file://` and GitHub Pages — both are relative-path-resolved the same way a `<link rel="stylesheet" href="assets/style.css">` already is, per the existing site convention):

```css
/* Source: self-hosted, subsetted from https://github.com/vercel/geist-font (SIL OFL 1.1) */
@font-face {
  font-family: 'Geist';
  src: url('assets/fonts/geist/Geist-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;   /* avoids invisible-text flash; falls back to system-ui until loaded */
}
.site-title, .narrative-headline /* whatever class D-13's new sections use */ {
  font-family: 'Geist', var(--font);   /* system-ui fallback chain stays intact */
}
```

`font-display: swap` (not `optional` or `block`) is the correct choice here specifically because D-12 already relaxed the weight budget for desktop-first delivery, and `swap` guarantees the headline is never invisible even on a slow USB/offline load — it just repaints once the subsetted (small, ~15-30 KB after subsetting) file arrives, which for a single headline is not a visible layout-shift risk given `.site-title`'s `line-height`/`font-size` are already `clamp()`-based and roughly font-metric-compatible between Geist and the system-ui fallback (both are geometric sans faces).

### Pattern 2: Live-Rebuilt SVG Template String (in-repo precedent)

**What:** JS builds an SVG as a template literal string, assigns via `innerHTML`, full rebuild on state change, no persistent DOM mutation.

**When to use:** The hero rotor's static geometry (rotor disc, 4 roller positions, tube-wrap path) and the six-module graphic.

**Example (from the actual repo, verified at `tools/rotor-solver/index.html:574-668`):**
```javascript
// Source: tools/rotor-solver/index.html:574 (buildFigure function)
function buildFigure(g, L) {
  const cx = 380, cy = 300;
  // ... positions computed once via cos/sin ...
  let s = '';
  s += `<circle cx="${cx}" cy="${cy}" r="${f1(Rpx)}" ... />`;
  // ... roller circles, dimension lines, labels ...
  return `<svg viewBox="0 0 760 600" width="100%" style="max-width:660px;height:auto;" ...>${s}</svg>`;
}
```
The `viewBox` + `width:100%` + `max-width` combination is exactly what keeps this pattern LANG-05-safe (no horizontal scroll at 375px) — the hero rotor SVG and six-module graphic should use the identical `viewBox`-relative scaling approach, not fixed pixel dimensions.

### Pattern 3: `getPointAtLength` Path Sampling (in-repo precedent, NOT the animation technique — layout only)

**What:** Samples a fixed SVG `<path>` at N points to align DOM elements to a curve.

**Verified at `prototypes/index.html:2045-2070`:**
```javascript
// Source: prototypes/index.html:2045 (alignNodesToPath function)
function alignNodesToPath() {
  // ...
  const total = journeyPath.getTotalLength();
  const SAMPLES = 240;
  const pts = [];
  for (let i = 0; i <= SAMPLES; i++) pts.push(journeyPath.getPointAtLength(total * i / SAMPLES));
  nodes.forEach(node => {
    // finds nearest sampled point to node's vertical position, sets node.style.left
  });
}
```
**Important distinction for the planner:** this technique is used site-wide for *static layout alignment* (positioning HTML cards along an SVG curve, recomputed on load/resize), not for *animation*. It runs once per resize event, not per animation frame. **Do not use this pattern for the liquid-packet motion** — it would require a `requestAnimationFrame` loop calling `getPointAtLength` every frame, which taste-skill's motion rules and general performance practice both discourage in favor of the CSS-native `stroke-dashoffset` technique below.

### Hero Rotor Animation Technique — Concrete Recommendation

**Real geometry to honor** (verified from `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PROTOTYPE.md`, §3 and §5):
- Roller count `N` = 4 (unchanged from proto-01)
- Rotor radius `R` ≈ 19.7 mm (design value, `N_c=2` corrected — the as-measured v2.2 print reads 19.60-19.7 mm depending on iteration; **19.7 mm is the correct design-target number to cite**, matching `PROTOTYPE.md` §3's own summary table)
- Roller bearing: MR105ZZ, 10 mm OD (`rollerR` = 5 mm)
- 180° tube-wrap contact arc (same assumption `rotor-solver` already renders)
- 2 rollers engaged at any time (`N_c=2`) — visually, at any animation frame roughly half the visible rollers should be shown "in contact" with the tube arc

**Compared techniques:**

| Technique | Verdict | Reasoning |
|---|---|---|
| CSS `transform: rotate()` on an SVG `<g>` wrapping all 4 roller circles, via `@keyframes` | **RECOMMENDED for rotor spin** | Transform-only (D-03 compliant), GPU-composited, zero JS per frame, trivially reduced-motion-gated by pausing the animation. The existing `.reveal` pattern already proves this exact GPU-accelerated CSS-transition idiom works site-wide. |
| SMIL (`<animateTransform>`) | NOT RECOMMENDED | Works but is a deprecated/frozen SVG spec feature with inconsistent tooling support going forward, and offers no advantage over CSS `@keyframes` for a simple rotation — CSS is the more maintainable, more debuggable choice for a hand-authored animation the planner's tasks will need to tune repeatedly (loop timing, entrance choreography per Claude's-discretion item) |
| `getPointAtLength` sampled in a `requestAnimationFrame` loop | NOT RECOMMENDED for continuous motion | This is `prototypes/index.html`'s static-layout technique repurposed for animation — it would require an rAF loop updating an element's position every frame, which taste-skill's motion rules explicitly discourage ("no rAF loops touching state") and which is unnecessary complexity when CSS keyframes achieve the same visual result for a fixed, known circular path |
| CSS `offset-path`/`offset-distance` for the liquid packet | VIABLE ALTERNATIVE, not the primary recommendation | `offset-path` lets an element travel along an arbitrary SVG path via a pure-CSS custom property animation — elegant, but browser support requires modern Chromium/Firefox/Safari (all current versions support it as of this research, but it's a less battle-tested pattern in this specific codebase than `stroke-dashoffset`, which the site already uses conceptually via `.journey-path`'s `stroke-dasharray` reveal at `index.html`... actually `prototypes/index.html:87-94`). **Recommend `stroke-dashoffset` sweep instead** (below) for consistency with the codebase's existing dash-array idiom. |
| `stroke-dasharray`/`stroke-dashoffset` sweep on a packet-shaped stroked path segment | **RECOMMENDED for the liquid-packet motion** | The site already uses `stroke-dasharray` animation for the journey-path reveal (`prototypes/index.html` CSS, verified: `.journey-path { stroke-dasharray: 1 0; } ... .journey-path.is-visible { stroke-dasharray: 1 0; transition: stroke-dasharray 1.4s }`). Representing the liquid packet as a short, colored stroke segment (e.g., `stroke-dasharray: 12 400`) animating its `stroke-dashoffset` around the fixed 180° tube-wrap arc is a direct, idiomatic extension of a pattern this codebase already trusts, and it is `opacity`/`stroke-*`-property-only, satisfying D-03 (note: `stroke-dashoffset` is not literally `transform`/`opacity`, but it is a non-layout-triggering SVG-paint property, same GPU-friendly category CSS animation guides treat alongside transform/opacity — [ASSUMED: no independent perf-benchmark verification this session; flagged for the planner as the one technique claim in this section not sourced from an official doc, though it is the same class of property the existing `.journey-path` animation already uses in production on this exact site]) |

**Entrance choreography recommendation:** stagger the rotor's spin-up (0 → full speed over ~0.6s on load, matching the existing `--delay`/`animate-in` stagger idiom already used for `.site-title`/`.site-subtitle` at `index.html:286-293`) rather than starting at full speed instantly — this is a low-risk, cheap addition to the existing animation vocabulary, not a new technique.

**`prefers-reduced-motion` path (mandatory per D-03/D-11):**
```css
@media (prefers-reduced-motion: reduce) {
  .hero-rotor .roller-group,
  .hero-rotor .liquid-packet { animation: none; }
  /* Show a single static frame — rollers at a fixed contact position, packet at the outlet end */
}
```
This is a direct extension of the existing `index.html:248-251` reduced-motion block, not a new pattern.

### Anti-Patterns to Avoid
- **`requestAnimationFrame` loops touching component/animation state:** taste-skill flags this explicitly as forbidden; the CSS-`@keyframes`-only approach above avoids it entirely for both the rotor spin and the packet sweep.
- **`window.addEventListener('scroll')` for the video autoplay trigger:** already avoided — D-11 mandates extending the existing `IntersectionObserver`, which is the correct, already-in-use idiom.
- **Porting `buildSchema()` from the System Architecture Explorer for the six-module graphic:** explicitly forbidden by D-16 — build a new, simpler function.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| Font subsetting | A hand-written glyph-stripping script | `pyftsubset` (already installed) | Font subsetting correctness (hinting tables, cmap, kerning pairs) is exactly the kind of deceptively complex binary-format problem a dedicated, mature tool solves correctly; hand-rolling risks a corrupt or over-large woff2 |
| Video transcoding | Browser-side canvas/WebCodecs re-encoding | `ffmpeg` (already installed, authoring-time only) | Video codec correctness and compression efficiency are far better handled by a mature, well-configured `ffmpeg` invocation than any in-browser or hand-rolled approach; this is explicitly a one-time authoring-time step per D-10, not a runtime dependency |
| SVG path geometry for the rotor | Manually typed `d="M ... A ..."` arc-path coordinates by trial and error | The same `cos`/`sin`-based coordinate computation `rotor-solver`'s `buildFigure()` already uses (`cosd`/`sind` helpers, `tools/rotor-solver/index.html:571-572`) | The math for positioning N rollers evenly around a circle of radius R is already solved, tested, and proven correct in this exact codebase — reuse the technique, don't re-derive it |

**Key insight:** every "don't hand-roll" item in this phase resolves to "reuse a technique or tool already proven inside this exact repository or already installed on this exact machine" — there is no case in this phase where reaching for an external library is the right call, which is the expected shape of a phase governed by D-01/D-03.

## Concrete ffmpeg Command (D-10)

**Verified source file properties** (via `ffprobe`, run directly against the real file):

| Property | Value |
|---|---|
| Path | `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PrototypePumpHeadV2.3Dispensing.mp4` |
| Duration | 23.24 s |
| Size | 9,899,129 bytes (9.44 MiB — CONTEXT.md's "9.5 MB" estimate is accurate) |
| Container bitrate | 3,407,226 bps (~3.4 Mbps) |
| Video codec | H.264 |
| Resolution | **720×1280 (portrait, 9:16)** — this is a vertically-shot phone video, not landscape |
| Frame rate | 60 fps |
| Audio | AAC (present — must be stripped per D-10's "no audio" requirement) |

**Portrait orientation matters for the plan:** the hero-below-the-fold video slot should be designed for a tall/narrow aspect ratio (9:16), not a wide 16:9 cinematic frame. This affects the CSS layout the planner scopes for the video section — a portrait video centered with generous side-padding (or displayed at a constrained height, e.g., `max-height: 70vh`, `width: auto`) reads far better than forcing it into a wide container.

**Recommended encode command** (720×1280 source is already reasonably sized for a "small" web video; scaling down further trades quality for size — recommend scaling the long edge to 960px, keeping H.264 at a quality-targeted CRF rather than a hard bitrate cap, stripping audio, adding faststart, extracting a poster in the same pass):

```bash
# Re-encode: web-sized H.264, no audio, faststart, ~1-2 MB target
ffmpeg -i "prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PrototypePumpHeadV2.3Dispensing.mp4" \
  -vf "scale=540:960" \
  -c:v libx264 -preset slow -crf 26 \
  -an \
  -movflags +faststart \
  -pix_fmt yuv420p \
  "prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/pump-head-web.mp4"
```

**Flag rationale:**
- `-vf scale=540:960` — halves the source's 720×1280 to 540×960, still crisp on any desktop display for a below-the-fold supporting clip (D-12: desktop-first, but this is not the hero, so it doesn't need full resolution); 540×960 keeps the exact 9:16 aspect ratio, no letterboxing
- `-c:v libx264 -preset slow -crf 26` — CRF (constant rate factor) mode rather than a fixed `-b:v` bitrate target, because CRF adapts bitrate to scene complexity (a mostly-static macro shot of a rotor compresses far below a hard bitrate cap without CRF's efficiency); CRF 23 is x264's default/visually-lossless-ish baseline, CRF 26 trades a small, generally imperceptible quality step for meaningfully smaller output — appropriate for a decorative/supporting web clip, not an archival master; `-preset slow` spends more encode time for better compression at the same CRF (fine for a one-time authoring step, no runtime cost)
- `-an` — strips the AAC audio track entirely, per D-10's explicit "no audio" requirement (the source click/hum of a stepper motor and bench noise adds nothing and only adds bytes)
- `-movflags +faststart` — moves the MP4 `moov` atom to the front of the file so the video can begin playing before the full file downloads — matters for both GitHub Pages (progressive download) and, marginally, for `file://` USB playback in some browsers
- `-pix_fmt yuv420p` — forces the widest-compatible pixel format (some source phone-camera H.264 streams use 4:2:2 or other chroma subsampling that not all browsers/`<video>` decoders handle identically); this is a standard "web-safe H.264" hygiene flag

**Expected output size:** Not measured in this session (would require actually running the encode, which is an execution-phase task, not a research-phase one) — but CRF 26 at 540×960/60fps→no-audio on a 23-second mostly-static macro shot should land comfortably in the 1–3 MB target D-10 specifies; **the planner should scope a verification step that checks the actual output file size against the 1–3 MB target after the encode runs**, and re-run with a higher CRF (27-28) if it overshoots, or a lower CRF (24-25) if it undershoots and there's headroom.

**Frame rate note:** 60fps is unusually high for a phone video of a slow mechanical process; consider `-r 30` in the same pass to roughly halve the frame count and further reduce size with no visible quality loss for this subject matter (a peristaltic pump rotor does not need 60fps to read clearly). This is not in the primary command above because it's a secondary lever to pull only if CRF alone doesn't hit the 1-3MB target — flagging it here so the planner has it available.

### Poster Frame (Claude's Discretion — resolved)

**Recommendation: extract a frame during the D-10 encode pass, do not use `head-result.jpeg`.**

Reasoning:
- `head-result.jpeg` (84,971 bytes, currently untracked at repo root) is a *result* image — likely a photo of dispensed liquid output, not a frame of the pump *mechanism running*, based on its filename and the CONTEXT.md description ("a pump-head result image"). Using it as the video's poster risks a visual mismatch/jump the instant the video starts playing (poster shows one thing, video's first frame shows another), which CONTEXT.md's own Claude's-Discretion note flags as exactly the risk to avoid ("an extracted frame guarantees no visual jump on play").
- An extracted frame from the *same source clip*, at a moment where the mechanism is clearly visible and well-lit, guarantees zero visual discontinuity between poster and first playing frame.

**Concrete extraction command** (single pass, alongside the re-encode; pick a timestamp partway through where the rotor/tube is clearly framed — adjust `-ss` after visually reviewing the clip, 8s is a reasonable starting guess for a 23s clip past any initial camera-settling):

```bash
ffmpeg -ss 8 -i "prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PrototypePumpHeadV2.3Dispensing.mp4" \
  -vf "scale=540:960" \
  -frames:v 1 -q:v 3 \
  "prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/pump-head-poster.jpg"
```
`-q:v 3` targets a high-quality JPEG (scale 2-31, lower is better; 2-5 is the visually-lossless-ish range) — matching the weight class of the existing precedent `decks/lab-meeting-2026-06/assets/alignment_poster.jpg` (43,102 bytes, confirmed via `ls`), which this new poster should land near for consistency (a single, well-chosen still frame at 540×960 JPEG quality 3 should land in the 30-70 KB range, in the same weight class).

**`head-result.jpeg`'s disposition:** since it's not used as the poster, and CONTEXT.md's phase boundary doesn't otherwise call for it, the planner should decide whether to leave it untracked/unused (simplest) or find another use — this research does not find a required role for it in Phase 7's scope as currently decided.

## Six-Module Graphic Content (D-16)

Source of truth: `tools/system-architecture-explorer/SPEC.md` (read in full this session). **Do not port `buildSchema()`** — the following is the *content* to re-author into a simpler, static graphic, not the code to reuse.

**The six modules and their one-line purpose** (verified verbatim from SPEC.md's module table):

| Module | Purpose (simplified for a first-time visitor — the SPEC.md hardware payload column is engineering detail NOT to carry into D-16's graphic) |
|---|---|
| Pump | Meters each liquid by roller displacement |
| Alignment | Moves the sample racks under the nozzles |
| Nozzle | Holds the nozzles and shakes droplets loose in short bursts |
| Storage | Holds the liquids; senses level |
| UI | Runs the GUI; the dispensing protocol is set on a laptop and loaded from the SD card |
| Software & Electronics | The brain and bus — drawn enclosed by a barrier as the sealed dry zone |

**Connectivity** (the only thing worth carrying into a simplified graphic, per SPEC.md's own framing that "spatial layout in the diagram carries no meaning; only the drawn connectivity does"):
- **Liquid flow** (solid line): Storage → Pump → Nozzle → Alignment
- **Data flow** (dashed line): Software & Electronics → every other module

**Flow color encoding** (verified, and worth reusing exactly since it's already an established visual vocabulary on this site, one hop away via the "See the full architecture" link D-16 mandates):
| Flow | Color | Line style |
|---|---|---|
| Liquid | blue `#4a90d9` | solid |
| Data | green `#3ec06b` | dashed |

**What NOT to carry over (explicitly out per D-16):** payload chips (6× NEMA17, MPR121 ×12 electrodes, etc.), interactivity (hover/click reveal), the liquid-glass barrier's gradient rendering detail (a simpler visual treatment is fine for a first-glance graphic), any pin-budget/cost/BOM data.

**Recommendation for visual treatment:** six simple rounded-rect boxes (reusing the site's existing glass-card visual language — `rgba(255,255,255,0.04)` background, `backdrop-filter: blur`, accent-colored border, same tokens `assets/style.css` already defines) arranged in a layout that reads left-to-right or top-to-bottom as a simple flow diagram, with the two arrow types (solid blue liquid, dashed green data) connecting them per the table above — no click/hover state, a single caption line below linking to the System Architecture Explorer's `#matrix` or `#diagram` anchor for anyone who wants the engineering-grade version.

## Common Pitfalls

### Pitfall 1: Treating `stroke-dashoffset`/`offset-path` as literally covered by D-03's "transform/opacity only" rule
**What goes wrong:** A verification step might flag the liquid-packet animation as violating D-03 if read too literally, since `stroke-dashoffset` is not `transform` or `opacity`.
**Why it happens:** D-03's rule is inherited from taste-skill's general web-performance guidance (avoid layout-thrashing properties like `top`/`left`/`width`/`height`), not a literal enumeration of every acceptable CSS property.
**How to avoid:** Document explicitly (as this research does) that `stroke-dashoffset` and `stroke-dasharray` are SVG-paint properties that do not trigger layout reflow — the same GPU-friendly category as `transform`/`opacity`, and the exact technique the codebase's own `.journey-path` reveal already uses in production. The planner should note this precedent so a future code-reviewer doesn't flag it as a stealth violation.
**Warning signs:** A reviewer citing D-03 against the packet animation without checking the existing `.journey-path` precedent in `prototypes/index.html`.

### Pitfall 2: Building the hero rotor with the video's aspect ratio in mind, then discovering the video is portrait
**What goes wrong:** If the planner scopes the hero and video sections independently without checking the video's real dimensions, the video-below-hero layout might be designed for a landscape clip and need rework once the portrait reality (720×1280) surfaces.
**Why it happens:** CONTEXT.md's own research gap — it estimated the file size (9.5 MB, correct) but did not have the resolution/orientation, which only `ffprobe` reveals.
**How to avoid:** This research has already surfaced the real 720×1280 portrait dimensions; the planner should design the video section's CSS for a tall/narrow frame from the start (see "Concrete ffmpeg Command" section above).
**Warning signs:** CSS that assumes `aspect-ratio: 16/9` or a wide `max-width` without a corresponding height constraint for the video container.

### Pitfall 3: Assuming `assets/gsap/gsap.min.js` (present, untracked) is available for use
**What goes wrong:** A future task might reach for the already-downloaded GSAP file since it's sitting right there in the working tree.
**Why it happens:** It's untracked but physically present (`assets/gsap/gsap.min.js`, 72,927 bytes, confirmed via `ls`), so a less careful pass might assume it was pre-approved tooling.
**How to avoid:** D-01/D-03 explicitly reject GSAP. This file should not be referenced by any `<script src>` in this phase. Its presence is noted in CONTEXT.md as "not to be used" — the planner should not add a task to `.gitignore` it or delete it (out of this phase's scope per the CONTEXT.md framing), just never link to it.
**Warning signs:** Any `<script src="assets/gsap/gsap.min.js">` or GSAP API call (`gsap.to(...)`, `gsap.timeline()`) appearing anywhere in the diff.

### Pitfall 4: Subsetting Geist to only the current draft headline text, then having D-19's later copy edits break glyph coverage
**What goes wrong:** D-19 explicitly has Sirio rewrite Claude's drafted narrative prose *after* it's drafted. If the font is subsetted to the first-draft text and Sirio's edits introduce a character not in that subset (e.g., an em-dash, a different accented Italian letter, a number), the headline silently falls back to `system-ui` for that glyph (or renders `.notdef` boxes, depending on subsetting flags), which is invisible until someone actually reads the rendered page carefully.
**Why it happens:** Subsetting for size efficiency is in direct tension with "content isn't final yet."
**How to avoid:** Two options for the planner to choose between: (a) subset generously to full Basic Latin + Latin-1 Supplement (`U+0020-007E,U+00A0-00FF`) up front — covers all English and Italian text including accented characters (à, è, é, ì, ò, ù, ç) and common punctuation including em-dash (`U+2014` is NOT in Latin-1 Supplement — must be added explicitly if Sirio's headline voice uses em-dashes, which CONTEXT.md's Deferred section confirms it does site-wide) — this yields a slightly larger but future-proof subset; or (b) do the real glyph-exact subset as the LAST task in the phase, after Sirio's final copy edit pass, re-running `pyftsubset` against the actual final `LANG.en`/`LANG.it` headline strings. **Recommendation: option (a) for the initial build (include `U+2014` explicitly since Sirio's voice uses em-dashes), with the option-(b) exact-subset pass as an optional final polish task, not a blocking one.**
**Warning signs:** A headline glyph rendering in a visibly different font (system-ui instead of Geist) after a late-stage copy edit.

**Concrete generous-subset command** (option (a) above — the safe default to scope as the phase's actual font-subsetting task):
```bash
pyftsubset "Geist-Bold.ttf" \
  --output-file="assets/fonts/geist/Geist-Bold.woff2" \
  --flavor=woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+2014,U+2018-201D" \
  --layout-features='*' \
  --desubroutinize
```
(`U+2018-201D` covers curly single/double quotes, common in editorial headline typography; `--layout-features='*'` keeps kerning/ligature tables rather than stripping them, since a headline face benefits from correct kerning; source `.ttf`, not `.woff2`, is the recommended subsetting input — fontTools' subsetter works on the TTF and re-flavors to woff2 in one pass, avoiding a woff2-to-woff2 double-hop.)

**Download source for the un-subsetted `Geist-Bold.ttf`:** `https://raw.githubusercontent.com/vercel/geist-font/main/packages/next/dist/fonts/geist-sans/Geist-Bold.ttf` — verified present in the repo tree via GitHub API (`packages/next/dist/fonts/geist-sans/Geist-Bold.ttf`, 128,824 bytes) at the `main` branch, which is the `v1.7.2`-era tree (confirmed via the same API call). This is the **official repository**, not a CDN scrape or third-party mirror — satisfies the research brief's "legitimately, not a CDN scrape" requirement.

## Code Examples

### Existing IntersectionObserver block to extend (D-11)

```javascript
// Source: index.html:541-554 (VERIFIED, current code, to be extended not duplicated)
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in-view');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}
```

**How D-11's video autoplay should extend this, concretely:** the existing observer `unobserve`s each target once revealed (one-shot reveal). The video needs the opposite behavior — repeated play/pause on every enter/exit, never unobserved. **Recommendation: a second `IntersectionObserver` instance is actually correct here, not a second callback bolted onto the first** — despite CONTEXT.md's framing of "extend rather than add a second observer," the *reveal* observer's one-shot `unobserve()` semantics are fundamentally incompatible with the video's *repeated* play/pause-on-every-crossing semantics. **What should NOT happen is a second, independently-invented pattern (e.g., a scroll-position calculation)** — the correct reading of D-11's intent is "reuse the `IntersectionObserver` *API and idiom*, not literally the same observer instance," since the two use cases have different `unobserve` behavior. A second `new IntersectionObserver(...)` call with its own callback (checking `en.isIntersecting` to `.play()`/`.pause()` the video, never calling `unobserve`) is the correct, idiomatic extension:

```javascript
// NEW pattern for D-11, following the SAME API idiom as the block above,
// but a second instance because unobserve-once vs. repeat-trigger are incompatible behaviors
const heroVideo = document.querySelector('#pump-head-video');
if (heroVideo && 'IntersectionObserver' in window) {
  const vio = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) heroVideo.play().catch(() => {});
      else heroVideo.pause();
    });
  }, { threshold: 0.3 });
  vio.observe(heroVideo);
}
```
`.play().catch(() => {})` guards against the DOMException some browsers throw if autoplay is blocked or the play() promise is interrupted by a rapid scroll — a real, documented `<video>` API footgun, not a hypothetical one.

### `.bg-blobs` override safety (D-07) — CSS cascade mechanics confirmed

```css
/* Source: assets/style.css:29 — the shared, site-wide rule */
.bg-blobs {
  position: fixed;
  inset: 0;
  z-index: -1; /* or similar, exact value not critical to this note */
  pointer-events: none;
  overflow: hidden;
}
```
`index.html`'s `<link rel="stylesheet" href="assets/style.css">` (line 9) is followed later in `<head>` by its own inline `<style>` block (lines 11-263). **Confirmed safe mechanism:** both the shared rule and any landing-page-local override use the identical single-class selector `.bg-blobs` — same specificity (0,0,1,0) — so CSS cascade **source order** alone (not specificity) determines the winner, and the inline `<style>` block is unconditionally later in document order than the linked stylesheet. A landing-page-local `.bg-blobs { display: none; }` (or any override) inside `index.html`'s own `<style>` block will win without needing `!important` or a higher-specificity selector, and does not require touching `assets/style.css` at all — directly satisfying D-07's "own inline `<style>`, `assets/style.css` NOT modified" requirement.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|---|---|---|---|
| Landing page as tool directory (5 sections, 5 numbered eyebrows) | Narrative showcase (hero → problem → device → proof → journey → 3 resource sections) | This phase (2026-07) | Structural remodel of `index.html`; CONTEXT.md's D-13/D-14/D-17 already fully specify the target shape |
| No self-hosted webfont on this site (system-ui only, sitewide) | Geist Sans (headlines only) alongside system-ui (body) | This phase, D-20 | First binary font asset in the repo; sets precedent for `assets/fonts/` as the shared-asset location for any future font needs |

**Deprecated/outdated:** N/A — this is a fresh remodel, not a migration away from a previously-standard approach within this codebase.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|---|---|---|
| A1 | `stroke-dashoffset`/`stroke-dasharray` animation belongs in the same GPU-friendly, D-03-compliant category as `transform`/`opacity`, based on general web-performance-guide consensus, not an independently re-verified benchmark this session | Hero Rotor Animation Technique, Pitfall 1 | Low — even if a future audit disagrees, the pattern is already in production on this exact site (`.journey-path`), so the worst case is a documentation/interpretation dispute, not a functional break |
| A2 | CSS `animation-timeline: view()` (scroll-driven animations) browser support is Chromium-only / not yet universal, based on training-data-level general knowledge, not independently re-checked against a live caniuse/MDN query this session | taste-skill distillation, Motion architecture table | Low — this claim is explicitly flagged as not required for the phase (IntersectionObserver already satisfies the "no scroll listener" rule); if support has since broadened, it only means a future optional enhancement has more headroom, not that anything in this phase's plan breaks |
| A3 | A ~8-second timestamp in the 23.24s pump-head clip will show a clear, well-framed shot of the mechanism for the poster extraction — not independently verified by watching the video this session | Poster Frame recommendation | Medium — if wrong, the extracted poster frame could show a blurred/badly-framed moment; low-cost to fix (the planner's execution step should visually review the extracted frame and adjust `-ss` if needed, exactly as this research already recommends) |
| A4 | `Geist-Bold.woff2` (700 weight) is the only weight this phase needs, based on `.site-title { font-weight: 700 }` being the only headline weight currently in the CSS — narrative section headlines drafted under D-19 might introduce a second weight (e.g., 600 SemiBold for sub-headlines) not yet decided | Standard Stack, Pattern 1 | Low — if a second weight is needed, the same `pyftsubset` command and `@font-face` pattern trivially extends to a second `<link>`/`@font-face` block; not a rework, an addition |

## Open Questions

1. **Exact headline copy for the "problem" section and its argument**
   - What we know: D-19 assigns this to Claude-drafts/Sirio-edits at execution time; this research phase correctly does not attempt to write it (writing prose is not a research task).
   - What's unclear: Nothing research-blocking — this is explicitly out of this research's scope.
   - Recommendation: The planner should scope a dedicated content-drafting task pulling from `PROJECT.md`'s "What This Is"/"Core Value" sections and the device-requirements framing in `prototypes/REQUIREMENTS-CRITERIA.md` (not read in full this session, but confirmed to exist and be the canonical device-requirements source per `CLAUDE.md`'s folder structure) as primary source material.

2. **Whether a second Geist weight is needed for sub-headlines**
   - What we know: Only `font-weight: 700` is currently used for `.site-title`; D-13's new narrative sections will need their own headline treatment, not yet designed.
   - What's unclear: Whether those section headlines should also carry Geist, or stay in the fallback `--font` stack (D-20 scopes Geist to "headlines," which is ambiguous between "just the h1" and "all headline-level text").
   - Recommendation: Default to Geist-Bold for the H1 hero title only (matches D-20's literal reading and the existing `.site-title` weight exactly); keep `.section-head`/narrative sub-headlines in the `system-ui` fallback unless a specific visual reason emerges during execution — this keeps the subsetting scope minimal and avoids A4's "second weight" risk materializing without a clear need.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|---|---|---|---|---|
| ffmpeg | D-10 video re-encode | ✓ | 2023-06-19-git-1617d1a752-full_build | — |
| ffprobe | Verifying video properties (this research) | ✓ | 2023-06-19-git-1617d1a752-full_build | — |
| Python / fonttools (`pyftsubset`) | D-20 font subsetting | ✓ | Python 3.10.9 (Anaconda) / fonttools 4.25.0 | — |
| Node.js | Not required by this phase (no build step) | ✓ (present, v24.14.1) | v24.14.1 | N/A — not used, confirming its presence is not load-bearing for this phase |
| Internet access (for the one-time Geist download) | D-20 — fetching `Geist-Bold.ttf` from `vercel/geist-font` | ✓ (confirmed — GitHub API and raw.githubusercontent.com both reachable this session) | — | If unavailable at execution time, the release zip (`geist-font-v1.7.2.zip`, 8.2 MB, `https://github.com/vercel/geist-font/releases/download/v1.7.2/geist-font-v1.7.2.zip`) is the single-download fallback containing all weights |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None — everything required is already present on this machine.

## Validation Architecture

`workflow.nyquist_validation` was not checked against `.planning/config.json` in this session (file not read) — proceeding on the default "absent = enabled" instruction, but flagging that this project has **no existing automated test framework** (confirmed by the absence of any `test/`, `*.test.*`, `package.json`, or CI config anywhere in the folder structure documented in `CLAUDE.md`). This is consistent with every prior phase in this project (all are manual/visual-verification workflows per the `checkpoint:human-verify` pattern implied throughout STATE.md's decision log).

### Test Framework
| Property | Value |
|---|---|
| Framework | None — static HTML/CSS/JS site with no test runner |
| Config file | none |
| Quick run command | Manual: `serve.bat` → `http://localhost:7331`, visual inspection |
| Full suite command | Manual: check at 1280px and 375px viewport widths (LANG-05), check EN/IT toggle (LANG-01–04), check `prefers-reduced-motion` in DevTools |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|---|---|---|---|---|
| LANG-01–05 | i18n coverage, no regression, no horizontal scroll | manual | Browser DevTools viewport + language toggle click-through | N/A — no test file convention exists in this project |

### Sampling Rate
- **Per task commit:** Manual visual check via `serve.bat` at both breakpoints
- **Per wave merge:** Full manual pass — EN/IT toggle, reduced-motion toggle, all 8 tool links click-through
- **Phase gate:** Human visual review before `/gsd-verify-work` (matches this project's established pattern, e.g., Phase 06.1's `checkpoint:human-verify` end-of-phase pattern noted in STATE.md)

### Wave 0 Gaps
None — existing manual-verification workflow (as used by every prior phase in this project) covers this phase's requirements; introducing an automated test framework is out of scope and would itself violate the "no build tools" constraint if it required an npm-based test runner.

## Security Domain

**Not applicable / no ASVS categories apply.** This is a static, client-only informational site with no authentication, no user input processing beyond the existing language-toggle `localStorage` read/write (already try/catch-wrapped, unchanged by this phase), no server, and no data storage beyond that single existing localStorage key. No new attack surface is introduced by this phase — the only new external-facing element is a self-hosted font file (a static binary asset, not executable content) and a self-hosted video (same). Neither introduces an injection, auth, or session-management surface.

## Sources

### Primary (HIGH confidence)
- `D:\...\index.html` (558 lines, read in full) — current landing page structure, i18n pattern, IntersectionObserver, `.bg-blobs`
- `D:\...\tools\rotor-solver\index.html` (read in full) — `buildFigure()` SVG template-string technique, motor/geometry constants
- `D:\...\prototypes\index.html` (partial read, 641/2079 lines + targeted grep for `alignNodesToPath`) — `getPointAtLength` sampling technique, `.journey-path` stroke-dasharray reveal pattern
- `D:\...\prototypes\Prototype-1-Pump-Module\proto-02-5ul-4roller-v2\PROTOTYPE.md` (partial read, 800/1652 lines — geometry sections §0-§8 fully covered) — real rotor geometry (N=4, R≈19.7mm)
- `D:\...\tools\system-architecture-explorer\SPEC.md` (read in full) — six-module schema, connectivity, flow colors
- `D:\...\decks\lab-meeting-2026-06\index.html` (lines 140-220 read) — video element attribute pattern (muted/loop/playsinline/poster), no JS autoplay-on-scroll precedent found in `deck.js` (confirmed via grep — no matches for `video`/`.play(`/`.pause(` in `assets/deck.js`)
- `D:\...\assets\style.css` (grepped for `--font`, `.bg-blobs`, `.blob`, `.site-title`) — confirmed `.site-title { font-weight: 700 }`, `--font` fallback stack, `.bg-blobs` single-class selector
- Direct `ffprobe` execution against the real video file — resolution, codec, duration, bitrate, frame rate all verified firsthand
- Direct `pip show fonttools` / `pyftsubset --help` / `ffmpeg -version` execution — tool availability and versions verified firsthand
- `https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/redesign-skill/SKILL.md` — fetched successfully, full content used
- `https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/taste-skill/SKILL.md` — fetched successfully, full content used
- `https://api.github.com/repos/vercel/geist-font/releases/latest` — verified release tag v1.7.2, publish date, asset list
- `https://api.github.com/repos/vercel/geist-font/contents/packages/next/dist/fonts/geist-sans` — verified exact filenames and byte sizes of every static-weight woff2/ttf
- `https://raw.githubusercontent.com/vercel/geist-font/main/LICENSE.txt` (fetched via WebFetch) — confirmed SIL OFL 1.1 text, redistribution/reserved-name clauses

### Secondary (MEDIUM confidence)
- `https://github.com/vercel/geist-font` (WebFetch summary, not raw-fetched) — corroborates the LICENSE.txt finding independently
- WebSearch cross-check on "Geist font Vercel SIL Open Font License OFL github repository" — corroborates license and repo location from a second angle (search result snippets, not independently fetched pages)

### Tertiary (LOW confidence)
- CSS `animation-timeline: view()` browser-support claim (Assumption A2) — general training-data knowledge, not independently re-verified against a live compatibility table this session
- `stroke-dashoffset` GPU-friendliness classification (Assumption A1) — reasoned from the property's paint-only (non-layout) nature and general web-performance consensus, not an independently sourced/cited authoritative doc this session

## Metadata

**Confidence breakdown:**
- Standard stack / tooling availability: HIGH — every tool/version claim was verified by direct command execution on this machine
- Geist font license: HIGH — verified against the authoritative repo's own `LICENSE.txt`, cross-checked by a second WebFetch and a WebSearch
- taste-skill rule filtering: HIGH — both SKILL.md files were successfully fetched in full; the APPLICABLE/NOT APPLICABLE split is a direct, mechanical read against D-01/D-03's already-locked toolchain rejection, not a judgment call
- Video encode settings: MEDIUM-HIGH — source file properties are HIGH confidence (direct ffprobe), but the exact CRF/scale values are a reasoned recommendation (standard, well-documented ffmpeg practice) rather than a benchmarked-for-this-exact-file result; the planner should verify output size after running the command
- Hero rotor animation technique: MEDIUM-HIGH — the recommended techniques (CSS transform rotate, stroke-dashoffset sweep) are both directly precedented in this exact codebase or are standard, well-documented CSS capabilities; the one LOW-confidence sub-claim (A1, stroke-dashoffset's D-03-compliance framing) is explicitly flagged
- Architecture patterns / in-repo precedents: HIGH — all code quoted was read directly from the files, with line numbers

**Research date:** 2026-07-17
**Valid until:** ~30 days for the taste-skill/Geist-license findings (stable, unlikely to change); ~7 days advisable re-check window if execution slips significantly past this date for the Geist release version number specifically (Vercel ships frequent patch releases — re-run the `releases/latest` API check before vendoring if more than a few weeks pass)
