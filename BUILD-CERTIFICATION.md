# WWE Legacy v0.14.09 — Build Certification

**Build:** v0.14.09 — Cena Exact Plate Composition Hotfix  
**Date:** 23 August 2026  
**Distribution:** no-assets overlay package

## Exact Cena asset verification

The exact user-supplied `card-layered-superstar-john-cena.webp` was inspected directly before packaging.

- Dimensions: **680 × 1000 WebP**
- The image already contains the full physical card frame.
- The lower black/red/blue name bay is baked into the image.
- A visual composition fixture was rendered using this exact asset with **text only** placed inside the baked name bay.
- v0.14.09 therefore does **not** draw the generic Superstar nameplate background over Cena's splash card and does **not** add the tier-surface sweep over the card face.

## Verification

Full verification was executed with the inherited v0.14.00/current flat asset library plus the exact supplied Cena card plate temporarily mounted. The distributed ZIP excludes `assets/`.

- Node tests: **847 discovered / 749 passed / 0 failed / 98 intentionally skipped historical contracts**
- Cena targeted tests: **7/7 passed**
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**
- Collector ID audit: **0 issues**, including all 8 Season 1 Cena collectibles
- Flow audit: **76 Superstars / 0 issues**
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**
- Counter/submission-state audit: **0 issues**
- Inherited flat asset audit with supplied Cena plate mounted: **618 images / 310 installed gameplay-card fronts / 158 layered / 152 flat / 48 headshots / 39 menu portraits**

## Carry-forward

All v0.14.08 and earlier tabled fixes remain present, including Cena Catalogue visibility, Tier 50 Season 1 structure, Live Event route persistence/check overlays, match Grounded/Stun recovery, Auto Counter scroll retention, 3 rotating Live Events + Money in the Bank ordering, and premium booster-printing collation.

## Packaging

The user-facing build **excludes the entire `assets/` directory** and is intended to overlay the existing current asset library.
