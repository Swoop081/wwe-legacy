# WWE Legacy v0.14.10 — Build Certification

**Build:** v0.14.10 — Cena Direct Plate Hotfix  
**Date:** 23 August 2026  
**Distribution:** verified no-assets overlay package

## Visual verification

The exact user-supplied `card-layered-superstar-john-cena.webp` was mounted during verification.

- Source dimensions: **680 × 1000 WebP**
- The Season 1 splash component was rendered at the same 709px-wide iPhone layout used in the reported screenshots.
- The rendered card wrapper and the image occupy the same physical bounds with no generic `.ccg-card` shell.
- Visual preview confirmed the prior right/bottom black gutter and duplicate outer frame are absent.
- The only runtime overlay is the `John Cena / SUPERSTAR` text inside the authored blank name bay.

## Automated verification

Full test run with inherited current assets plus the exact supplied Cena plate mounted:

- Node tests: **851 discovered / 753 passed / 0 failed / 98 intentionally skipped historical contracts**
- v0.14.10 direct-Cena targeted tests: **4/4 passed**
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**
- Collector ID audit: **782 cards / 782 manifest entries / 0 issues**
- Flow audit: **76 Superstars / 0 issues**
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**
- Counter/submission-state audit: **706 gameplay cards / 517 Moves / 0 issues**

## Carry-forward

All v0.14.09 and earlier tabled fixes remain present, including Cena Catalogue visibility, the 50-tier Season 1 structure, Live Event defeated-state persistence/check overlays, Grounded/Stun recovery, Auto Counter scroll retention, Live Event ordering, and premium booster-printing collation.

## Packaging

The user-facing ZIP **contains no `assets/` directory**. It is intended to overlay the user's existing asset library, which already contains the exact Cena plate used for visual verification.
