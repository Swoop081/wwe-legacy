# WWE Legacy v1.1.25 — Onboarding Superstar Pack + Season Road Visual Overhaul

## Release identity
- Version: **v1.1.25**
- Title: **Onboarding Superstar Pack + Season Road Visual Overhaul**
- Date: **30 August 2026**
- Base: **v1.1.24 — Launch Poster Centering Hotfix**
- Distribution: **no-assets code overlay**; no packaged image asset changed in this release.

## Implemented changes

### New-player onboarding
- Keeps the approved first choice between **CM Punk** and **Roman Reigns** unchanged, including the complete starter deck grant.
- Replaces the old five-era Welcome Superstar selection with a single premium **Superstar Pack** opening after the starter choice.
- The onboarding Superstar Pack randomly selects from the released roster while excluding a Superstar the profile already owns.
- Each Superstar Pack grants exactly five Normal collectibles for its selected Superstar:
  1. Superstar
  2. Entrance
  3. one Finisher
  4. one Trademark
  5. one Action
- The second Superstar does **not** receive a manufactured 60-page deck. The five pack cards are owned immediately and Deck Lab/collection progression fills the rest of that Superstar's deck normally.
- The system is reusable through `grantSuperstarPack()` for future rewards/modes rather than being hard-coded only to onboarding.
- The pack candidate library covers all **72 currently released player-visible Superstars** when no exclusions are supplied.
- Shared Superstar moves are valid pack identity cards where appropriate (for example the shared Tombstone Piledriver Finisher for Kane / The Undertaker).
- **Bayley-to-Belly** is now formally flagged as Bayley's 3★ Trademark so Bayley has a complete Superstar Pack identity package; its existing Cost 5 / Damage 8 / Strength 2 requirements and search effect remain unchanged.

### WWE.com Home / Season headshots
- The Home/Season surfaces that were showing broken `?` image placeholders now prefer WWE.com profile imagery for the personalities used on those panels: Roman Reigns, CM Punk, Trish Stratus, Seth Rollins, Becky Lynch, Rhea Ripley, Stone Cold Steve Austin and Liv Morgan.
- Each remote WWE.com portrait retains the existing local menu/headshot/Superstar-art fallback chain, then the generic placeholder if both remote and local artwork fail.
- The new Superstar Pack reveal uses the same portrait resolver.

### Season Road reward presentation
- Season reward tiers are rebuilt as large full-width rectangular reward panels instead of compressed rows.
- Mobile tier rows are roughly twice the previous height, with a **large rectangular tier-number slab** and substantially larger tier numerals.
- Every reward row now contains an actual visual representation of the reward:
  - Season card rewards use the real collectible card renderer.
  - Booster rewards use the physical booster-pack renderer for the correct set.
  - Universe Point rewards use a dedicated gold WWE Legacy **UP** reward medallion.
- Current/reached/claimed/final-reward colour identities remain intact.
- Claim / claimed / locked status remains attached to each tier and the existing 50-tier reward logic is unchanged.

## Compatibility
- Existing old Welcome-era/full-deck APIs remain in source for historical save/test compatibility, but the player-facing onboarding route uses the new Superstar Pack system.
- No save-schema bump is required; the Welcome Superstar state accepts the new pack metadata/card list while older data can still migrate through the existing profile path.
- No booster odds, economy values, Season XP thresholds, Merch rules, animation rules, Live Event rules or card printing tiers change.

## Certification
- Focused v1.1.25 + launch/animation carry-forward assertions: **11/11 passed**.
- Full suite: **1,078 discovered / 909 passed / 72 retained historical-contract failures / 97 skipped**.
- Compared with v1.1.24's inherited failure-name set: **0 added failing names / 0 removed failing names**.
- The three additional skips are obsolete pre-v1.1.25 player-facing Welcome-era/full-second-deck presentation contracts explicitly superseded by Superstar Pack onboarding.
- Rebuild validation: **95 Superstars / 95 decks / 835 gameplay cards / 0 orphans / 0 issues**.
- Superstar Pack coverage: **72 / 72 released player-visible Superstars pack-ready** before profile exclusions.
- Collector ID audit: **930 cards / 930 manifest entries / 0 issues**.
- Flow audit: **95 Superstars / 0 issues**.
- JavaScript syntax checks passed for live UI, profile and Superstar Pack module.
- Cache/version stamp: **v1.1.25**.
- Physical iPhone visual smoke remains pending for the new onboarding pack/reveal, WWE.com portrait replacement surfaces and the enlarged Season tier panels.
