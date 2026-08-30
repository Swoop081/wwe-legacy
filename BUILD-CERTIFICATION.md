# WWE Legacy v1.1.34 — Seated Shotgun Dropkick

## Release identity
- Version: **v1.1.34**
- Title: **Seated Shotgun Dropkick**
- Date: **30 August 2026**
- Base: **v1.1.33 — Trish Home Banner Position Hotfix**
- Distribution: **no-assets code overlay**; the user's reference image is not included.

## Implemented changes
- Adds `seated-shotgun-dropkick` to Evolution Series 1 as `EVO1-076`.
- Shared 2★ Uncommon; Cost 4 / Damage 7; Agility 2; Strike; Grounded opponent only; Stun 1.
- IYO SKY, Liv Morgan and Tiffany Stratton each carry two copies in their authored 60-page decks.
- Existing lead-off Dropkick access remains intact for all three.
- Card Studio data is regenerated and exposes the new collector card with a canonical, currently unbundled artwork path.
- No supplied screenshot/reference image is copied into the package.

## Verification
- Focused regression sample: **7 passed, 0 failed, 1 historical skip**.
- Flow audit: **95 Superstars / 0 issues**.
- Rebuild validation: **95 decks / 834 gameplay cards / 0 orphans / 0 issues**.
- Card-ID audit: **929 collector cards / 929 manifest entries / 0 issues**; Evolution Series 1 is gap-free through `EVO1-076`.
- Card-health audit completed successfully; the new Uncommon remains within the existing low-rarity efficiency band.
- Counter-density audit completed successfully with full 8-state / 4-submission-target roster coverage.
- Physical iPhone smoke: pending.

## Carry-forward certification

# WWE Legacy v1.1.33 — Trish Home Banner Position Hotfix

## Release identity
- Version: **v1.1.33**
- Title: **Trish Home Banner Position Hotfix**
- Date: **30 August 2026**
- Base: **v1.1.32 — Play Hub 3+3 Pagination + Money in the Bank Move**
- Distribution: **no-assets code overlay**; no packaged image asset changed in this release.

## Implemented changes

### v1.1.33 Trish Home banner position hotfix
- Physical-iPhone screenshot showed Trish still occupying the XP-bar lane in the compact Home Season One banner.
- Keeps Trish at exactly 2× scale.
- Repositions the render farther right and slightly upward, preserving her full head/face while allowing lower-body crop.
- No gameplay, progression, reward, economy or card-data changes.

### v1.1.32 Play hub 3+3 / MITB placement
- Page 1 contains exactly Exhibition Showcase, Live Events and King of the Ring.
- Page 2 contains exactly Championship Road, Survivor Series and Money in the Bank.
- Championship Road and Survivor Series return to the same standard banner height as the Page 1 modes.
- Removes the unused fourth grid row that created the large blank gap before the v1.1.31 Next control.
- Replaces the tiny Next/Back treatment with a large full-width navigation button directly after the third card.
- Removes Money in the Bank from the Live Events hub and makes its Play-page card the primary entry point.
- Completed Money in the Bank runs return to Play page 2, and the bottom Play tab remains active while inside Money in the Bank.
- No ladder gameplay, lives, opponent generation, rewards, Live Event tower logic, Championship Road logic or Survivor Series rules change.


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
- Focused v1.1.32 Play pagination / MITB placement / carry-forward portrait assertions: **17 passed / 0 failed / 1 historical skip** across the targeted suite.
- Money in the Bank daily-tower rules remain intact in the targeted regression run: 8 opponents, 3 lives, same-day field retention and 2-pack clear reward.
- Flow audit: **95 Superstars / 0 issues**.
- JavaScript syntax checks passed for `js/ui/app.js` and `js/data/game-rules.js`.
- No packaged image assets are included or changed in v1.1.32.
- Cache/version stamp: **v1.1.32**.
- Physical iPhone visual smoke remains pending for the tightened three-cards-plus-navigation layout on both Play pages and the Money in the Bank page-card presentation.
