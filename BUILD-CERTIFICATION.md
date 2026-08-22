# WWE Legacy v0.14.05 — Build Certification

**Build:** v0.14.05 — Consolidated Tabled UX + Booster Collation  
**Date:** 23 August 2026  
**Distribution:** no-assets overlay package

## Verification

Tests were executed against the inherited v0.14.00/current flat asset library while the distributed ZIP excludes `assets/`.

- Node tests: **827 discovered / 730 passed / 0 failed / 97 intentionally skipped historical contracts**
- v0.14.05 targeted tests: **4/4 passed**
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**
- Collector ID audit: **782 cards / 782 manifest / 0 issues**
- Flow audit: **76/76 Superstars / 0 issues**
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**
- Counter/submission-state audit: **706 gameplay cards / 517 Moves / 0 issues**
- Inherited flat asset audit: **617 images / 310 installed gameplay-card fronts / 158 layered / 152 flat / 48 headshots / 39 menu portraits**

## Locked v0.14.05 behavior

1. Live Events hub: exactly 3 rotating events; limited-time Birthday Bash / RAW LIVE entries displace generic slots; Money in the Bank is persistent and listed after the rotating three.
2. Auto Counter: selecting/deselecting ditch cards does not reset the hand rail to the beginning.
3. Season 1 splash: authored John Cena physical card is explicitly centered in the left reward bay.
4. Live Event route: defeated Superstar cards receive a large check overlay.
5. Booster premium printing collation: max 2 non-Normal printings; max 1 Sapphire-or-Ruby; excess premium rolls become Normal.
6. Superstar chase remains 2%; hard pity remains 100 packs.
7. No gameplay balance or progression changes.
8. Distribution excludes `assets/`.
