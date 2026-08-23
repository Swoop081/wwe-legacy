# WWE Legacy v0.14.11 — Build Certification

**Build:** v0.14.11 — Season Splash Cleanup + Daily Live Event XP  
**Date:** 23 August 2026  
**Distribution:** verified no-assets overlay package

## Tabled fixes verified

- John Cena’s exact Season 1 physical card explicitly opts out of the legacy `.season-ad-rock img` right-edge mask/filter, so the direct card plate is not faded on the right.
- The redundant `50 TIERS` / `TIER 50 RUBY SUPERSTAR` splash fact boxes are removed from markup.
- Live Event route rendering computes the active saved stage on entry and scrolls the horizontal route to center that opponent; completed towers focus the final cleared card.
- Daily Live Event set completion is persisted by local day and awards +25 Season XP exactly once after all three rotating towers are cleared.
- A full 15-win three-tower day is verified as exactly **75 match XP + 25 completion XP = 100 Season XP**.

## Automated verification

Full test run with the inherited current flat asset library plus the exact user-supplied Cena physical card plate mounted for verification:

- Node tests: **856 discovered / 758 passed / 0 failed / 98 intentionally skipped historical contracts**
- v0.14.11 targeted tests: **5/5 passed**
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**
- Collector ID audit: **782 cards / 782 manifest entries / 0 issues**
- Flow audit: **76 Superstars / 0 issues**
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**
- Counter/submission-state audit: **706 gameplay cards / 517 Moves / 0 issues**
- Flat asset verification environment: **618 images / 310 installed gameplay-card fronts / 158 layered / 152 flat / 48 headshots / 39 menu portraits**

## Carry-forward

All v0.14.10 and earlier fixes remain present, including the exact Cena direct-plate renderer, John Cena Catalogue visibility, the 50-tier Season 1 structure, persistent/centered defeated checks, Grounded/Stun state recovery, Auto Counter hand-scroll retention, exactly three rotating Live Events plus Money in the Bank, booster premium-printing collation, Razor’s current deck/balance state, and the 100-pack Superstar hard pity.

## Packaging

The user-facing ZIP **contains no `assets/` directory**. It is intended to overlay the user’s existing current WWE Legacy asset library.
