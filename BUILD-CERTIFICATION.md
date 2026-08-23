# WWE Legacy v0.14.13 — Build Certification

**Build:** v0.14.13 — Championship Road 40-Match + Frozen Controls  
**Date:** 23 August 2026  
**Distribution:** verified no-assets overlay package

## Tabled changes verified

- Opponent Entrance retains the existing top set/show logo position while the entrance label/Superstar name is anchored to the lower open portion of the hero band.
- Championship Road upper controls are grouped into a non-scrolling command deck; the lower road map owns vertical scrolling.
- Championship Road lower route automatically focuses the current four-match group on entry/return rather than resetting to Match 1.
- Championship Road is now 40 matches across ten four-match sections in the approved order: Golden Era I, New Generation I, Attitude Era I, SummerSlam I, Evolution I, then the same order for Part II.
- Missing Golden Era Part II and Attitude Era Part II are restored. The road uses 40 live-set opponents total.
- Legacy 32-match active runs migrate to the canonical 40-match opponent map without losing numeric stage/difficulty progress.
- Existing section-clear reward logic remains one themed booster every four wins, giving ten section rewards across a full 40-match road.

## Automated verification

Full verification was executed against the inherited v0.14.00 flat asset library plus the exact user-supplied Cena physical card plate and the current Tribal Chief front mounted only in the verification environment:

- Node tests: **864 discovered / 766 passed / 0 failed / 98 intentionally skipped historical contracts**
- v0.14.13 targeted tests: **4/4 passed**
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**
- Collector ID audit: **782 cards / 782 manifest entries / 0 issues**
- Flow audit: **76 Superstars / 0 issues**
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**
- Counter/submission-state audit: **706 gameplay cards / 517 Moves / 0 issues**
- Flat asset verification environment: **618 images / 310 installed gameplay-card fronts / 158 layered / 152 flat / 48 headshots / 39 menu portraits**

## Gameplay/data impact

No card stats, card effects, deck composition, match rules, pack odds, Superstar pity, Season XP values, Daily Live Event rewards, live-set availability or collection ownership changed in v0.14.13. Championship Road itself expands from 32 to 40 matches and, because the existing section reward rule remains unchanged, from eight to ten themed section-clear boosters per completed difficulty road.

## Packaging

The user-facing ZIP **contains no `assets/` directory** and is intended to overlay the user's existing current WWE Legacy asset library.
