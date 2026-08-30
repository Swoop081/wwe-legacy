# WWE Legacy v1.1.43 — Complete Play-Pile Mats + Automatic Daily Launch Rewards

## Release identity
- Version: **v1.1.43**
- Date: **31 August 2026**
- Base: **v1.1.42 — Shared Top Rope Neckbreaker + Rear Naked Choke**
- Distribution: **no-assets code overlay**; existing Card Studio and other repository artwork assets remain untouched.

## Certified corrections
- Adds `js/ui/play-pile-mats.js` with an explicit play-pile mat theme for **all 16 defined set IDs**.
- The live pile mat is now CSS-rendered from set-specific canvas, accent and secondary variables, so it no longer disappears when the optional top-down ring artwork is absent.
- The active presentation set continues to drive the centre set logo and mat identity.
- RAW, SmackDown, NXT, Evolution, SummerSlam, Golden Era, New Generation, Attitude Era, Ruthless Aggression, Worlds Collide, Money in the Bank, Survivor Series and reward/development identities all resolve to a mat; audit result: **0 missing set mats**.
- Returning-profile **PLAY NOW** on the Trish Season 1 launch poster now checks the free 24-hour Season booster automatically.
- When available, the free booster is claimed and immediately enters the standard pack-opening experience without visiting Season/Open Packs first.
- Completing that launch pack routes directly into **Daily Spin** when the free spin is available.
- If the booster is unavailable but Daily Spin is ready, Daily Spin opens immediately; when neither reward is ready, the player continues to Home normally.
- First-time welcome-Superstar setup remains ahead of recurring daily rewards.

## Verification
- v1.1.43 dedicated assertions: **3/3**.
- Flow audit: **95 Superstars / 0 issues**.
- Rebuild validation: **95 decks / 840 gameplay cards / 0 orphans / 0 issues**.
- Card-ID audit: **935 collector cards / 935 manifest entries / 0 issues**.
- Full no-assets test suite: **924 passed / 97 failed / 97 skipped**.
- v1.1.42 baseline was 921 / 97 / 97, therefore this release adds **3 passes with 0 new carry-forward failures**.
- Physical iPhone smoke: **pending v1.1.43 user smoke**.

# WWE Legacy v1.1.42 — Shared Top Rope Neckbreaker + Rear Naked Choke

## Release identity
- Version: **v1.1.42**
- Date: **30 August 2026**
- Base: **v1.1.41 — Foundational Suplex**
- Distribution: **no-assets code overlay**.

## Certified additions
- `top-rope-neckbreaker` — **SS1-151**, shared 3★ Rare; Cost 7 / Damage 11 / Technical 2 + Agility 1; Technical Grapple; grounds opponent; Stun 1; Body Elevated counter state.
- `rear-naked-choke` — **SS1-152**, shared 2★ Uncommon Submission; Cost 6 / Technical 2; standing opponent only; +5 persistent Head pressure; Rear Control counter state.
- Both cards are booster-only, so all authored Superstar decks remain unchanged at 60 pages.
- Card Studio data regenerated with canonical finished/base-plate targets for both additions.
- Verification: v1.1.42 dedicated assertions **3/3**; flow **95 Superstars / 0 issues**; rebuild validation **95 decks / 840 gameplay cards / 0 orphans / 0 issues**; card-ID audit **935/935 / 0 issues**; Card Studio **1,545 cards**; full no-assets suite **921 passed / 97 failed / 97 skipped**, with **0 new carry-forward failures** versus v1.1.41.

# WWE Legacy v1.1.41 — Foundational Suplex

## Release identity
- Version: **v1.1.41**
- Date: **30 August 2026**
- Base: **v1.1.40 — Gunther’s Front Dropkick**
- Distribution: **no-assets code overlay**.

## Certified addition
- Adds `suplex` as **SS1-150** in SummerSlam — Series 1.
- 1★ Common shared Move; Cost 3 / Damage 4 / Technical 1.
- Grapple; Grounds opponent; Body Elevated counter state.
- Booster-only for v1.1.41; existing authored Superstar decks remain unchanged.
- Card Studio data regenerated with canonical Suplex finished/base-plate paths.
- Verification: v1.1.41 dedicated assertions **3/3**; flow **95 Superstars / 0 issues**; rebuild validation **95 decks / 838 gameplay cards / 0 orphans / 0 issues**; card-ID audit **933/933 / 0 issues**; full no-assets suite **918 passed / 97 failed / 97 skipped**, with **0 new carry-forward failures** versus v1.1.40.

# WWE Legacy v1.1.40 — Gunther's Front Dropkick

## Release identity
- Version: **v1.1.40**
- Title: **Gunther's Front Dropkick**
- Date: **30 August 2026**
- Base: **v1.1.39 — Bret Hart Ringpost Figure Four**
- Distribution: **no-assets code overlay**; existing repository artwork/animation assets are preserved.

## Certified addition
- Adds `SS1-149` **Gunther's Front Dropkick** as a Gunther-exclusive 3★ Rare Trademark.
- Cost 5 / Damage 9 / Strike 2; Strike Move; Leg Extended counter state.
- Gunther's authored 60-page deck replaces both shared Front Dropkick pages with two copies of the exclusive Trademark.
- Existing SummerSlam collector numbers remain unchanged; the set extends cleanly to SS1-149.
- Card Studio data includes the new card and canonical artwork paths; no artwork is packaged.

## Verification
- Dedicated v1.1.40 assertions: **3 passed / 0 failed**.
- Focused Gunther / Bret / rarity sample: **21 passed / 0 failed / 1 historical skip**.
- Flow audit: **95 Superstars / 0 issues**.
- Rebuild validation: **95 decks / 837 gameplay cards / 0 orphans / 0 issues**.
- Card-ID audit: **932 collector cards / 932 manifest entries / 0 issues**; SummerSlam is gap-free through `SS1-149`.
- Card-health and counter-density audits: **0 issues**.
- Full no-assets suite: **915 passed / 97 failed / 97 skipped**, versus v1.1.39 at 912 / 97 / 97 — **3 new passes and 0 new carry-forward failures**.
- Physical iPhone smoke: pending.

# WWE Legacy v1.1.39 — Bret Hart Ringpost Figure Four

## Release identity
- Version: **v1.1.39**
- Title: **Bret Hart Ringpost Figure Four**
- Date: **30 August 2026**
- Base: **v1.1.38 — Card Studio Runtime Parity + Set-Field Animation Fix**
- Distribution: **no-assets code overlay**; existing repository artwork/animation assets are preserved.

## Certified addition
- Adds `NG1-081` **Ringpost Figure Four** as a Bret Hart-exclusive 3★ Rare Trademark Submission.
- Cost 6 / Damage 0 / Technical 2.
- Grounded opponent only; targets Legs; +5 persistent Leg pressure per successful submission turn; on Connect, Bret’s next Sharpshooter costs 1 less this Control sequence.
- Bret Hart's authored deck carries 3 copies and remains exactly 60 pages.
- Replaces the shared Boston Crab plus one Back Suplex and one Elbow Drop; 2× Sharpshooter and the existing Momentum package are retained.
- Existing New Generation collector numbers remain unchanged; the set extends cleanly to NG1-081.
- Card Studio data includes the new card and canonical artwork paths; no artwork is packaged.

## Verification
- Dedicated v1.1.39 assertions: **3 passed / 0 failed**.
- Combined Bret / renderer / rarity focused sample: **21 passed / 0 failed / 1 historical skip**.
- Flow audit: **95 Superstars / 0 issues**.
- Rebuild validation: **95 decks / 836 gameplay cards / 0 orphans / 0 issues**.
- Card-ID audit: **931 collector cards / 931 manifest entries / 0 issues**; New Generation is gap-free through `NG1-081`.
- Card-health and counter-density audits: **0 issues**.
- Full no-assets suite: **912 passed / 97 failed / 97 skipped**, versus v1.1.38 at 909 / 97 / 97 — **3 new passes and 0 new carry-forward failures**.
- Physical iPhone smoke: pending.

# WWE Legacy v1.1.38 — Card Studio Runtime Parity + Set-Field Animation Fix

## Release identity
- Version: **v1.1.38**
- Title: **Card Studio Runtime Parity + Set-Field Animation Fix**
- Date: **30 August 2026**
- Base: **v1.1.37 — Tatum Paxley Finisher + Trademark Re-Audit**
- Distribution: **no-assets code overlay**; existing repository artwork/animation assets are preserved.

## Certified corrections
- Canonical `*-base-plate.webp` Card Studio exports are the first live render source for every non-Momentum collectible.
- Saved Superstar base plates are therefore picked up directly again in Deck Lab and all other collectible surfaces.
- A flat canonical/legacy finished export is used only if the saved base plate fails to load.
- Animation never replaces the static source. Animation activation occurs only after a linked/packaged animated asset loads successfully.
- Animated set field spans the full inner card page, inside the authored frame and behind the plaque.
- Animated media is centred between the bottom of the top border and the Card Studio plaque top: **4.8% → 74.0% for Moves**, **4.8% → 77.2% for non-Moves**.
- Plaque/text overlays remain above animation; set logo is restored above the animated field.
- SummerSlam uses its Card Studio blue/purple/orange field rather than the previous artwork-bay-only gradient.
- If animation is missing/fails, the saved static card remains completely untouched.
- Superstar live nameplates use the clean rectangular Card Studio lower-plaque footprint.

## Verification
- Dedicated v1.1.38 assertions: **4 passed / 0 failed**.
- Combined current rendering/content focused suite: **21 passed / 0 failed**.
- Flow audit: **95 Superstars / 0 issues**.
- Rebuild validation: **95 decks / 835 gameplay cards / 0 orphans / 0 issues**.
- Card-ID audit: **930 collector cards / 930 manifest entries / 0 issues**.
- Full no-assets suite: **909 passed / 97 failed / 97 skipped**.
- Baseline v1.1.37 full suite: **905 passed / 97 failed / 97 skipped**.
- Result: **4 new passing assertions, 0 new carry-forward failures**.
- Physical iPhone smoke: pending for saved Superstar fronts and animated-card framing.

# WWE Legacy v1.1.36 — Matrix Slide Shared Common Reversal

Current package adds SD1-072 Matrix Slide as a shared Common Counter-only reversal with Arm Extended + exact Clothesline/Lariat family coverage. User reference imagery is not packaged.

# WWE Legacy v1.1.35 — Exact Card Front Runtime + Clean Play Cards + Trish Reframe

## Release identity
- Version: **v1.1.35**
- Title: **Exact Card Front Runtime + Clean Play Cards + Trish Reframe**
- Date: **30 August 2026**
- Base: **v1.1.34 — Seated Shotgun Dropkick**
- Distribution: **no-assets code overlay**; no packaged image asset changed.

## Implemented changes
- Removes polygon/chamfer clipping from all six Play mode banners, their CTA tabs, and the full-width Next / Back buttons.
- Reframes Home Season One Trish so the full face/hat remains inside the physical-iPhone tile instead of being cut by the right edge.
- Restores finished Card Studio fronts as the primary live-game renderer for every non-Momentum collectible surface.
- Universal animation remains available, but animation now overlays only the artwork bay above the exact finished static front.
- Runtime fallback order: canonical finished front → legacy finished export → canonical base plate/live overlay → rules face.
- Finished fronts are contained at their authored aspect ratio instead of being cropped.
- No gameplay rules, card data, deck composition, progression, rewards, economy or mode logic changed.

## Verification
- v1.1.35 focused presentation assertions: **3 passed / 0 failed**.
- Combined current Play / animation / card-source checks: all new/current assertions pass; one pre-existing v1.1.22 count assertion still expects the pre-Jake-audit total of 835 rather than the current 834.
- Flow audit: **95 Superstars / 0 issues**.
- Rebuild validation: **95 decks / 834 gameplay cards / 0 orphans / 0 issues**.
- Card-ID audit: **929 collector cards / 929 manifest entries / 0 issues**.
- Full no-assets suite comparison: v1.1.34 baseline = 100 historical/asset-dependent failures; v1.1.35 = the same 100, therefore **0 new carry-forward failures**.
- Physical iPhone smoke: pending for Play corners, Trish framing and exact Card Studio-front rendering.

## Carry-forward certification

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

## v1.1.36 verification
- Focused v1.1.34–v1.1.36 regression sample: **9 passed / 0 failed**.
- Flow audit: **95 Superstars / 0 issues**.
- Rebuild validation: **95 decks / 835 gameplay cards / 0 orphans / 0 issues**.
- Card-ID audit: **930 collector cards / 930 manifest entries / 0 issues**; SmackDown Series 1 now runs through **SD1-072**.
- Counter-state and counter-density audits complete successfully; Matrix Slide adds a sixth no-gate Arm Extended reversal while its explicit exact-card list covers non-Arm-Extended Clothesline/Lariat variants.
- Full no-assets suite: **902 passed / 97 failed / 97 skipped** versus v1.1.35 baseline **896 passed / 100 failed / 97 skipped**; therefore **0 new carry-forward failures**.
- Physical-iPhone smoke remains pending.
