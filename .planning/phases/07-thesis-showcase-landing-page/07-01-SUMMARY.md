---
phase: 07-thesis-showcase-landing-page
plan: 01
subsystem: infra
tags: [ffmpeg, fonttools, pyftsubset, woff2, video-encoding, asset-vendoring]

# Dependency graph
requires: []
provides:
  - "prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/pump-head-web.mp4 -- re-encoded, audio-free, faststart H.264 clip (1,746,708 bytes)"
  - "prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/pump-head-poster.jpg -- poster frame from same source clip (46,689 bytes)"
  - "assets/fonts/geist/Geist-Bold.woff2 -- generously subsetted headline font (20,576 bytes)"
  - "assets/fonts/geist/LICENSE.txt -- verbatim SIL OFL 1.1 license text"
affects: [07-02, 07-03, 07-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Authoring-time-only binary asset prep (ffmpeg re-encode, pyftsubset subsetting) kept separate from markup plans, outputs committed as binaries"
    - "assets/fonts/<family>/ vendoring shape mirrors tools/peristaltic-roller-displaced-volume-model/katex/ per-consumer vendoring precedent, but at the site-shared assets/ level since Geist is usable by any page"

key-files:
  created:
    - prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/pump-head-web.mp4
    - prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/pump-head-poster.jpg
    - assets/fonts/geist/Geist-Bold.woff2
    - assets/fonts/geist/LICENSE.txt
  modified: []

key-decisions:
  - "CRF 26 at 540x960 (half of source 720x1280) hit the 1-3 MB target on the first pass (1,746,708 bytes) -- no re-run with alternate CRF or -r 30 frame-rate reduction was needed"
  - "Poster extracted at -ss 8 from the same source clip (not head-result.jpeg) -- visually confirmed the pump-head mechanism (rotor, tubing, dispensing head) is clearly framed and in focus at that timestamp, guaranteeing no visual jump when playback starts"
  - "Generous glyph subset (U+0020-007E,U+00A0-00FF,U+2014,U+2018-201D) used per RESEARCH Pitfall 4 option (a) rather than an exact-glyph subset, since D-19's copy-edit pass hasn't landed yet"

patterns-established:
  - "Video/poster pairs for future decks or hero sections: re-encode with ffmpeg -an -movflags +faststart -pix_fmt yuv420p at half the source resolution, verify with ffprobe before committing, and never commit the raw master"

requirements-completed: []

# Metrics
duration: 5min
completed: 2026-07-17
---

# Phase 7 Plan 1: Authoring-Time Asset Preparation Summary

**Re-encoded pump-head clip to 1.75 MB portrait H.264 + poster, and vendored a 20.6 KB generously-subsetted Geist-Bold woff2 with its SIL OFL 1.1 license -- zero HTML touched.**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-07-17T10:58:22Z (session start, per STATE.md)
- **Completed:** 2026-07-17T13:00:51+02:00 (last task commit)
- **Tasks:** 2 completed
- **Files modified:** 4 created, 0 modified

## Accomplishments
- Re-encoded the 9,899,129-byte 720x1280/60fps/H.264+AAC pump-head master to a 1,746,708-byte (1.75 MB) 540x960 audio-free faststart clip in a single ffmpeg pass (crf 26 hit the 1-3 MB target with no re-run needed)
- Extracted a 46,689-byte poster frame from the same source clip at `-ss 8`, visually verified to clearly show the pump-head mechanism (rotor, tubing, dispensing head) with no camera-settle blur
- Downloaded the official `Geist-Bold.ttf` (128,824 bytes, byte-for-byte match to RESEARCH's verified size) and `LICENSE.txt` from `raw.githubusercontent.com/vercel/geist-font/main`, confirmed SIL OFL 1.1
- Subsetted to a 20,576-byte woff2 (well under the 47,820-byte ceiling) using the generous Basic Latin + Latin-1 Supplement + em-dash + curly-quotes range; verified via fontTools that the cmap contains U+2014 (em-dash), U+00E0 (à), U+00E9 (é), and U+2019 (curly apostrophe)

## Task Commits

Each task was committed atomically:

1. **Task 1: Re-encode the pump-head clip and extract its poster frame** - `5c8a1c8` (feat)
2. **Task 2: Vendor Geist-Bold -- download, subset, and ship its OFL license** - `d7f1834` (feat)

**Plan metadata:** (this commit)

## Files Created/Modified
- `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/pump-head-web.mp4` - 540x960, audio-free, faststart H.264, 1,746,708 bytes; the video plan 07-02/07-03 embeds below the fold
- `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/pump-head-poster.jpg` - 540x960 JPEG, 46,689 bytes; poster attribute for the same `<video>`
- `assets/fonts/geist/Geist-Bold.woff2` - subsetted Geist Bold/700, 20,576 bytes; referenced by an inline `@font-face` in a later plan's `index.html` edit, not here
- `assets/fonts/geist/LICENSE.txt` - verbatim SIL OFL 1.1 text, mandatory to travel with the redistributed font (GitHub Pages + USB)

## Decisions Made
- CRF 26 at 540x960 landed the encode at 1.75 MB on the first attempt -- no need to invoke the crf 24/28 or `-r 30` fallback levers RESEARCH offered
- `-ss 8` poster frame accepted after visual review (clear framing of rotor/tubing/dispensing head); no re-extraction needed
- Generous glyph-range subsetting chosen over an exact-glyph subset, per RESEARCH Pitfall 4's explicit recommendation, since Sirio's copy-edit pass (D-19) has not yet landed on the final headline text

## Deviations from Plan

None - plan executed exactly as written. Both tasks' automated verify commands and acceptance criteria (file existence, byte-size bounds, ffprobe stream checks, fontTools cmap assertions, `git status`/`git diff` checks on the untracked master and untouched `assets/style.css`) passed without requiring any fallback branch (alternate CRF, alternate `-ss` timestamp, or option-(b) exact-glyph resubset).

## Issues Encountered
None.

## User Setup Required

None - no external service configuration required. Both `ffmpeg` and `pyftsubset` were already installed locally (confirmed by RESEARCH and re-confirmed at execution start); no packages were installed.

## Next Phase Readiness
- All four artifacts plan 07-02/07-03 need (`pump-head-web.mp4`, `pump-head-poster.jpg`, `assets/fonts/geist/Geist-Bold.woff2`, `assets/fonts/geist/LICENSE.txt`) exist at their documented paths and pass every size/format/content assertion in the plan
- The 9,899,129-byte `PrototypePumpHeadV2.3Dispensing.mp4` master remains untracked, as required by D-10
- `assets/style.css` is byte-identical to before this plan; no HTML file was touched
- No CDN or Google Fonts reference was introduced anywhere
- Next plan (07-02) can proceed directly to wiring the `@font-face` declaration and `<video poster="...">` markup into `index.html`

---
*Phase: 07-thesis-showcase-landing-page*
*Completed: 2026-07-17*
