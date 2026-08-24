# WWE Legacy v0.14.15 — Build Certification

**Build:** v0.14.15 — Pack Missing-Art Fallback Hotfix  
**Date:** 24 August 2026  
**Distribution:** verified no-assets overlay package

## Reported issue reproduced in code path

The Pack Reveal / Pack Complete collectible renderer already attempted to fall back to the canonical rules face after a failed card-front image load. That fallback depended on dynamically applying the 3D `is-flipped` transform. On iPhone/Safari, an image failure could leave the rendered collectible as an empty premium-glow frame instead of repainting the rotated rules face, which matches the reported unidentified Emerald card.

## Fix

- Added a dedicated `force-rules-face` state for unavailable card fronts.
- Final failure of layered, finished/custom or authored image candidates now marks the collectible `uses-rules-fallback force-rules-face`.
- The fallback CSS bypasses 3D flip/repaint entirely: the failed front is hidden and the canonical rules/details face is exposed directly.
- Cards known at render time to have no custom/authored front use the same direct fallback state.
- Pack Reveal and Pack Complete continue to use the same canonical collectible renderer, so the behavior is consistent in both surfaces and in card inspection.
- Premium tier glow/treatment remains outside the readable fallback face.

## Automated verification

Full verification against the inherited current flat asset library plus the exact supplied Cena plate:

- Node tests: **868 discovered / 770 passed / 0 failed / 98 intentionally skipped historical contracts**
- v0.14.15 targeted regression tests: **2/2 passed**
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**
- Collector ID audit: **782 cards / 782 manifest entries / 0 issues**
- Flow audit: **76 Superstars / 0 issues**
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**
- Counter/submission-state audit: **706 gameplay cards / 517 Moves / 0 issues**
- Flat asset audit: **618 image files / 310 installed gameplay-card fronts / 158 layered / 152 flat / 48 headshots / 39 menu portraits**

## Gameplay/data impact

No card stats/effects, deck composition, pack odds/collation, rewards, Season XP, Championship Road progression, Daily Live Event XP, Superstar pity, collection ownership or match rules changed from v0.14.14.

## Packaging

The user-facing ZIP contains **no `assets/` directory** and is intended to overlay the user's existing WWE Legacy installation.
