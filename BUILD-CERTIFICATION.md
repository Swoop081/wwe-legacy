# WWE Legacy v0.14.08 — Build Certification

**Build:** v0.14.08 — Cena Physical Card Renderer Hotfix  
**Date:** 23 August 2026  
**Distribution:** no-assets overlay package

## Verification

Full verification was executed with the inherited v0.14.00/current flat asset library temporarily mounted. The distributed ZIP excludes `assets/`.

- Node tests: **843 discovered / 745 passed / 0 failed / 98 intentionally skipped historical contracts**
- v0.14.08 targeted tests: **3/3 passed**
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**
- Collector ID audit: **782 cards / 782 manifest / 0 issues**
- Flow audit: **76/76 Superstars / 0 issues**
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**
- Counter/submission-state audit: **706 gameplay cards / 517 Moves / 0 issues**
- Inherited flat asset audit: **617 images / 310 installed gameplay-card fronts / 158 layered / 152 flat / 48 headshots / 39 menu portraits**

## Locked v0.14.08 fix

The Season 1 Cena reward card is now rendered as the actual authored physical card composition:

1. Prefer `assets/images/card-layered-superstar-john-cena.webp`.
2. Treat that file as a **layered card plate**, not a finished standalone image.
3. Add the canonical John Cena runtime Superstar nameplate over the blank authored nameplate bay.
4. If the layered plate is absent, try the exact finished `assets/images/card-custom-superstar-john-cena.webp` and suppress the runtime nameplate because a finished flat front may already contain it.
5. Never substitute Cena menu/profile artwork for a missing physical card front.

This directly fixes the v0.14.07 on-device result where Cena’s image appeared but the physical card had a blank black nameplate area.

## Carry-forward

All v0.14.07 and earlier tabled fixes remain present, including Cena Catalogue visibility, Tier 50 Season 1 copy, Live Event cleared-route reconstruction/check overlays, match Grounded/Stun recovery, Auto Counter scroll retention, 3 rotating Live Events + Money in the Bank ordering, and premium booster-printing collation.

## Packaging

The user-facing build **excludes the entire `assets/` directory** and is intended to overlay the existing current asset library.
