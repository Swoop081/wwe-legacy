# WWE Legacy v0.14.16 — Build Certification

**Build:** v0.14.16 — Set Milestone Expansion + RAW Presentation  
**Date:** 24 August 2026  
**Distribution:** verified no-assets overlay package

## Implemented running changes

### Set Milestones

- Every released set now has four completion tracks: **Base, Emerald, Sapphire and Ruby**.
- Each track awards **1 random released-set booster** at **25%, 50%, 75% and 100%**.
- **Base** preserves the existing overall unique-card logic: a collector identity counts once when any printing is owned.
- **Emerald / Sapphire / Ruby** count unique collector identities owned at that exact printing tier.
- Existing Base and Ruby claim history is preserved. Existing profiles safely initialize new Emerald and Sapphire claim arrays.
- Set milestone sections are **collapsible** to prevent the Challenges screen becoming an endless scroll.
- Sections are collapsed by default, automatically expand when at least one milestone is claimable, and remember manual expansion for the current app session.
- Challenge attention/badge counts include claimable milestones across all four tracks.

### RAW Live presentation

- RAW daily / RAW LIVE tiles are locked to the **RAW red / black / white** presentation instead of inheriting the rotating generic accent.
- The hub and detail screen use the packaged **RAW Series 1 logo** (`branding-raw-series-1-raw-logo.webp`).
- RAW matches continue to pass `raw-series-1` as the match presentation set, so the RAW arena/ring mat/logo presentation is used even before the set is publicly released.
- This is presentation-only. **RAW Series 1 remains unreleased** and is not added to the player booster/set pool.

## Automated verification

Verification was run against the inherited current flat asset library plus the exact supplied John Cena layered plate:

- Node tests: **871 discovered / 773 passed / 0 failed / 98 intentionally skipped historical contracts**
- v0.14.16 targeted regression tests: **3/3 passed**
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**
- Collector ID audit: **782 cards / 782 manifest entries / 0 issues**
- Flow audit: **76 Superstars / 0 issues**
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**
- Counter/submission-state audit: **706 gameplay cards / 517 Moves / 0 issues**
- Flat asset audit against inherited/current assets: **618 image files / 310 installed gameplay-card fronts / 158 layered / 152 flat / 48 headshots / 39 menu portraits**

## Gameplay/data impact

No card stats/effects, deck composition, match rules, pack odds/collation, Season XP, Daily Live Event XP, Superstar pity, Championship Road structure, live-set release state, or collection ownership changed from v0.14.15.

The only economy expansion is the explicitly requested additional **Emerald and Sapphire Set Milestone reward tracks**, each paying one random released-set booster at 25/50/75/100 completion.

## Packaging

The user-facing ZIP intentionally contains **no `assets/` directory** and is designed to overlay the user's existing WWE Legacy installation.
