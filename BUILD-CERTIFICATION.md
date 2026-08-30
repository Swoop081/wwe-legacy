# WWE Legacy v1.1.31 — Play Hub Two-Page Navigation + WWE.com Portrait Fix

## Release identity
- Version: **v1.1.31**
- Title: **Play Hub Two-Page Navigation + WWE.com Portrait Fix**
- Date: **30 August 2026**
- Base: **v1.1.30 — Trish Season Banner Framing Hotfix**
- Distribution: **no-assets code overlay**; no packaged image asset changed in this release.

## Implemented changes

### v1.1.31 Play hub / portrait correction
- Splits the five Play destinations across two pages to eliminate the long mobile scroll.
- Page 1 order is Exhibition Showcase, Live Events, King of the Ring, then a large Next arrow.
- Page 2 contains enlarged Championship Road and Survivor Series banners, then a matching Back arrow.
- Live Events uses Cody Rhodes' current WWE.com profile/headshot render (`CODY_RHODES_PROFILE.png`) instead of the prior WWE.com in-ring action image.
- Survivor Series uses Hulk Hogan's WWE.com profile/headshot render (`Hulk_Hogan_pro.png`) instead of Randy Orton.
- Survivor Series now uses the shared `modeLogoMarkup()` typography treatment and dedicated cyan accent, matching the visual system used by the other Play modes.
- Gameplay and progression logic are unchanged.


### v1.1.30 Jake Roberts audit
- Removes Jake’s Gutwrench Gutbuster and Jake’s Running Knee Lift completely.
- Jake’s personal move library intentionally contracts to Jake’s Short-Arm Clothesline and Jake’s DDT.
- Replaces the eight removed deck pages with four shared Clotheslines, three Atomic Drops and one Neckbreaker.
- Jake remains at 60 pages and all non-Momentum copies remain within the five-copy ceiling.
- Golden Era contracts from 84 to 82 collector cards and is renumbered gap-free through `GE1-082`.
- Global gameplay/collector counts contract from 835/930 to **833/928**.

### v1.1.26 presentation corrections
- Live-game Superstar card names render in full uppercase while preserving the existing nameplate typography and layout.
- The sealed onboarding Superstar Pack uses the exact approved `branding-wwe-legacy-lockup.png` launch identity asset.
- Merch animated artwork fills the card face and continues behind the lower plaque; the plaque remains an overlay.
- No gameplay, card data, reward, economy or packaged image asset changes.

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
- Focused v1.1.31 Play hub / portrait / typography assertions: **3/3 passed**.
- Structured-mode + Live Event + v1.1 carry-forward sample: **33 passed / 7 retained baseline failures / 1 skipped**. The uploaded v1.1.30 baseline produces the same **7** failures in the same carry-forward sample, so v1.1.31 adds **0 new failures** there.
- JavaScript syntax check passed for `js/ui/app.js`.
- Focused v1.1.26 presentation + v1.1.25 onboarding carry-forward assertions: **13/13 passed**.
- No-assets package-context full suite: **1,077 discovered / 902 passed / 78 retained failures / 97 skipped**.
- The attached v1.1.25 no-assets baseline produces the same **78** package-context failures; v1.1.26 adds **0 new failing contracts**.
- The three additional skips are obsolete pre-v1.1.25 player-facing Welcome-era/full-second-deck presentation contracts explicitly superseded by Superstar Pack onboarding.
- Rebuild validation: **95 Superstars / 95 decks / 833 gameplay cards / 0 orphans / 0 issues**.
- Superstar Pack coverage: **72 / 72 released player-visible Superstars pack-ready** before profile exclusions.
- Collector ID audit: **928 cards / 928 manifest entries / 0 issues**.
- Flow audit: **95 Superstars / 0 issues**.
- JavaScript syntax checks passed for live UI, profile and Superstar Pack module.
- Cache/version stamp: **v1.1.31**.
- Physical iPhone visual smoke remains pending for the v1.1.31 two-page Play hub, Cody/Hogan WWE.com headshots, Survivor Series typography, and all carried-forward presentation surfaces.
