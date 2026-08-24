# WWE Legacy v0.14.16 — Pack Missing-Art Fallback Hotfix

## v0.14.16 — Set Milestone Expansion + RAW Presentation

- Set Milestones now expose four completion tracks for every released set: **Base, Emerald, Sapphire and Ruby**.
- Every track awards **1 random released-set booster** at **25%, 50%, 75% and 100%**. Base remains the overall unique-card track; Emerald/Sapphire/Ruby count unique cards at that exact printing.
- Each set milestone panel is now **collapsible** to prevent endless scrolling. Sets are collapsed by default and automatically open when they contain a claimable reward; manually opened sets remain open for the current session.
- Challenges attention/badge counts include claimable Emerald and Sapphire milestones.
- RAW Daily/RAW LIVE presentation is locked to the **RAW red/black/white identity**, uses the packaged **RAW Series 1 logo** on the hub/detail presentation, and continues to use the RAW Series 1 arena/ring presentation even while the set itself remains unreleased.
- No assets are included in this distribution package; overlay it on the current WWE Legacy asset library.


This is a **verified no-assets overlay build**. Copy it over the current WWE Legacy installation while retaining the existing `assets/` folder.

## Current change

- Pack Reveal and Pack Complete can no longer show an unidentified blank/glowing card when a collectible front image is missing or fails to load.
- Layered, finished/custom and authored-front load failures now expose the card's canonical **rules/details face directly**.
- The fallback keeps the pull identifiable with card name, type/printing, Cost/Damage where relevant, Method requirements, effect text, restrictions/counter/submission information, collector code and rarity stars.
- Emerald / Sapphire / Ruby presentation remains visible around the readable fallback face.
- The single-card reveal still advances normally when tapped; Pack Complete fallback cards still open the normal inspector.

## Carry-forward baseline

v0.14.16 includes the complete v0.14.14 baseline and all previously tabled changes, including the 40-match per-Superstar Championship Road, current-group auto-focus/frozen upper controls, correct Championship Road match launching/theme inheritance, Daily Live Event +25 completion XP, grounded/Stun recovery, Auto Counter rail retention, Live Event defeated checks, booster premium-printing collation, Cena Season 1/Catalogue fixes, Tier Up compact presentation, Tribal Chief front text and premium printing glow differentiation.

## Verification

Verified against the inherited v0.14.00 flat asset library plus the exact current John Cena layered plate supplied during development:

- **868 tests discovered / 770 passed / 0 failed / 98 intentionally skipped historical contracts**
- v0.14.16 targeted regression tests: **2/2 passed**
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**
- Collector ID audit: **782 cards / 782 manifest entries / 0 issues**
- Flow audit: **76 Superstars / 0 issues**
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**
- Counter/submission-state audit: **706 gameplay cards / 517 Moves / 0 issues**
- Flat asset audit in verification overlay: **618 images / 310 installed gameplay-card fronts / 158 layered / 152 flat / 48 headshots / 39 menu portraits**

## Packaging

The user-facing ZIP intentionally contains **no `assets/` directory**. It is designed to overlay the user's existing current WWE Legacy folder without replacing or deleting image assets.
