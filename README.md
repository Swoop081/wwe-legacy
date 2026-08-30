# WWE Legacy v1.1.43 — Complete Play-Pile Mats + Automatic Daily Launch Rewards

**Current working baseline.** v1.1.43 supersedes v1.1.42.

This release hardens the in-match **Play Pile** presentation so no WWE Legacy set can lose its ring mat. Every defined set now has an explicit self-contained play-pile theme, rendered from set-specific canvas/accent variables rather than depending on the optional top-down ring image. The current set logo still sits at centre mat, while the procedural canvas/rope treatment remains visible even when a logo or optional artwork source fails. Coverage is **16 / 16 defined set IDs, 0 missing mats**.

The Season 1 Trish Stratus launch poster now also becomes the automatic daily reward entry point for returning profiles. Pressing **PLAY NOW** checks the rolling 24-hour free booster first. If ready, that booster is claimed and taken directly into the normal pack-ripping flow. When the pack flow is finished, an available **Daily Spin** opens automatically. If no pack is ready but the spin is ready, the wheel opens immediately; if neither is ready, the player proceeds directly to Home. First-time welcome setup still takes priority before recurring rewards.

Verification: dedicated v1.1.43 assertions **3/3**; flow **95 Superstars / 0 issues**; rebuild validation **95 decks / 840 gameplay cards / 0 orphans / 0 issues**; card-ID audit **935/935 / 0 issues**; full no-assets suite **924 passed / 97 historical failures / 97 skipped**, exactly **3 new passes and 0 new failures** versus v1.1.42.

# WWE Legacy v1.1.42 — Shared Top Rope Neckbreaker + Rear Naked Choke

**Current working baseline.** v1.1.42 supersedes v1.1.41.

Adds two shared SummerSlam — Series 1 booster cards: **Top Rope Neckbreaker** (`SS1-151`), a **3★ Rare** Cost 7 / Damage 11 Technical Grapple requiring Technical 2 + Agility 1 that grounds and Stuns 1; and **Rear Naked Choke** (`SS1-152`), a **2★ Uncommon** standing Technical submission at Cost 6 / Technical 2 with **+5 persistent Head pressure** per successful maintain turn. Both are booster-only in this release, preserving every authored 60-page Superstar deck.

# WWE Legacy v1.1.41 — Foundational Suplex

**Current working baseline.** v1.1.41 supersedes v1.1.40.

Adds **Suplex** as a foundational shared SummerSlam — Series 1 Move at **SS1-150**. It is a **1★ Common**, Cost **3** / Damage **4**, requires **Technical 1**, is a Grapple, grounds the opponent, and exposes the **Body Elevated** counter state. It is booster-only in this release so no authored 60-page Superstar deck is silently rewritten. Card Studio data is regenerated with canonical `assets/images/suplex.webp` and `assets/images/suplex-base-plate.webp` targets.

# WWE Legacy v1.1.40 — Gunther's Front Dropkick

**Current working baseline.** v1.1.40 supersedes v1.1.39.

Adds `SS1-149` **Gunther's Front Dropkick** as a Gunther-exclusive 3★ Rare Trademark. It is Cost 5 / Damage 9 / Strike 2 with the Leg Extended counter state. Gunther's two shared Front Dropkick deck pages are replaced one-for-one by this exclusive version, keeping his deck at exactly 60 pages while preserving his existing Gojira Clutch Finisher package and all other gameplay identity. Card Studio receives the canonical blank art paths; no artwork is packaged.

# WWE Legacy v1.1.39 — Bret Hart Ringpost Figure Four

**Current working baseline.** v1.1.39 supersedes v1.1.38.

Adds **Ringpost Figure Four** as Bret Hart's new 3★ Rare Trademark submission in New Generation — Series 1. The card is `NG1-081`, Cost 6, Damage 0, requires Technical 2, is playable against a grounded opponent, targets the Legs, applies 5 persistent Leg submission pressure per successful turn, and makes Bret’s next Sharpshooter cost 1 less that Control sequence.

Bret's authored 60-page deck now carries **3× Ringpost Figure Four**. The new Trademark replaces the shared Boston Crab plus one Back Suplex and one Elbow Drop, keeping the deck at exactly 60 pages while preserving Bret's existing 2× Sharpshooter Finisher package and 12 starting Momentum pages.

The new card is included in Card Studio with canonical blank artwork targets `assets/images/ringpost-figure-four-bret-hart.webp` and `assets/images/ringpost-figure-four-bret-hart-base-plate.webp`; no image asset is packaged in this no-assets overlay. New Generation — Series 1 expands from 80 to **81 collector cards** without renumbering any existing card.

Verification: v1.1.39 dedicated assertions 3/3; focused current suite 21/21 with 1 historical skip; flow 95/0; rebuild 95 decks / 836 gameplay cards / 0 issues; card IDs 931/931; full suite **912 passed / 97 failed / 97 skipped**, with **0 new failures** versus v1.1.38.

# WWE Legacy v1.1.38 — Card Studio Runtime Parity + Set-Field Animation Fix

**Current working baseline.** v1.1.38 supersedes v1.1.37.

This release restores the saved Card Studio **base-plate front as the live source of truth** across Deck Lab, gameplay, packs, inspectors and other collectible surfaces. This fixes the regression where already-authored Superstar and Move cards could render as missing/reconstructed fronts even though their saved `*-base-plate.webp` files were installed.

Animated cards now follow one strict presentation rule. The saved static Card Studio card always remains underneath. Only after a linked/packaged animation successfully loads does the runtime place a **full-card set field** inside the authored border, then centre the animation in the artwork bay from the **bottom of the top border to the top of the plaque**. Move plaques begin at 74% card height; non-Move plaques begin at 77.2%, matching Card Studio geometry. The plaque/text and set logo remain above the animated artwork.

SummerSlam animated cards now use the same blue → purple → orange SummerSlam field authored by Card Studio rather than the previous animation-bay-only blue/purple strip. Equivalent set-field treatments are supplied for the other current/legacy/reward sets.

If no animation exists or every animation source fails, **nothing is rebuilt or swapped**: the exact saved static Card Studio base plate remains visible. Flat finished exports are retained only as a fallback when a base plate itself is absent. Superstar lower plaques are also returned to the same clean rectangular Card Studio footprint.

Verification: v1.1.38 dedicated assertions 4/4; combined focused rendering/current-content suite 21/21; flow audit 95 Superstars / 0 issues; rebuild validation 95 decks / 835 gameplay cards / 0 orphans / 0 issues; card-ID audit 930/930 / 0 issues. Full no-assets suite: **909 passed / 97 failed / 97 skipped**, versus v1.1.37 at 905 / 97 / 97 — four new passes and **0 new carry-forward failures**.

# WWE Legacy v1.1.36 — Matrix Slide Shared Common Reversal

Current package adds SD1-072 Matrix Slide as a shared Common Counter-only reversal with Arm Extended + exact Clothesline/Lariat family coverage. User reference imagery is not packaged.

# WWE Legacy v1.1.35 — Exact Card Front Runtime + Clean Play Cards + Trish Reframe

**Current working baseline.** v1.1.35 supersedes v1.1.34.

## v1.1.35 presentation source-of-truth hotfix

The six Play mode banners and the Next / Back controls no longer use chamfered or cut-off corners. Their outer frames are clean rectangles with ordinary rounded corners.

The Home Season One Trish portrait is brought back inside the right edge after the v1.1.33 position visibly cut half of her face off on physical iPhone. The excessive 2× zoom is relaxed only on this compact Home tile so her complete face and hat are visible.

Most importantly, the live game once again treats the **finished Card Studio front as authoritative**. Every non-Momentum collectible first renders its installed finished Card Studio WebP. Optional animation is layered only inside the artwork bay and cannot replace or reconstruct the authored frame, stars, set logo, plaque or typography. If a canonical finished front is absent, the fallback chain is legacy finished export → canonical base plate/live overlay → rules face.

## v1.1.34 shared Evolution move

Adds **Seated Shotgun Dropkick** as `EVO1-076`, a shared 2★ Uncommon Evolution move. It is Cost 4 / Damage 7, requires Agility 2, is playable only against a grounded opponent, and applies Stun 1 on Connect. Iyo Sky, Liv Morgan and Tiffany Stratton each begin with two copies in their authored 60-page decks. No artwork is packaged for the card; its Card Studio slot is ready for user-supplied art.

## v1.1.33 Trish Home banner framing

The Home Season One tile keeps Trish at the approved 2× scale, but positions her farther right and slightly higher so her complete head/face sits in the open right-side portrait lane rather than behind the Season XP progress bar. The lower body is allowed to crop naturally inside the compact banner.

## v1.1.32 Play hub layout

**Choose Your Path** now uses exactly three standard-size mode cards per page. Page 1 contains Exhibition Showcase, Live Events and King of the Ring. Page 2 contains Championship Road, Survivor Series and Money in the Bank. The oversized v1.1.31 Road/Survivor treatment is removed, and both pages use a large full-width Next/Back button immediately after the third mode card. Money in the Bank is no longer listed inside the Live Events hub.

## Play hub two-page layout

**Choose Your Path** is now split into two iPhone-first pages. Page 1 contains Exhibition Showcase, Live Events and King of the Ring, with a large Next arrow. Page 2 contains enlarged Championship Road and Survivor Series banners, with a matching Back arrow. Live Events uses Cody Rhodes' WWE.com profile render; Survivor Series uses Hulk Hogan's WWE.com profile render and the same shared mode-logo typography as the other Play cards.

## Jake Roberts audit

Jake’s Gutwrench Gutbuster and Jake’s Running Knee Lift have been removed completely. His 60-page deck replaces those eight pages with shared Clothesline, Atomic Drop and Neckbreaker cards. Jake intentionally carries only two personal moves for now: Jake’s Short-Arm Clothesline and Jake’s DDT.

## Superstar card nameplates

Live-game Superstar card names now render in full uppercase, matching the capitalization used by Card Studio. The existing live-game font, sizing, spacing, colour, stroke and nameplate layout are unchanged.

## Superstar Pack branding

The sealed onboarding Superstar Pack now uses the exact approved WWE Legacy image lockup already used by the launch identity instead of rebuilding the logo from styled text.

## Merch full-face artwork

Merch animated artwork now fills the complete card face and continues behind the lower plaque. The plaque remains an overlay and no longer acts as the bottom edge of the Merch artwork window.

## New-player flow

The approved **CM Punk / Roman Reigns** starter choice remains unchanged and still grants the selected starter's complete deck.

After that choice, the old era/set Welcome selector is replaced by one random **Superstar Pack**. A Superstar Pack is a reusable WWE Legacy reward type containing exactly five Normal identity cards for one released Superstar:

- Superstar
- Entrance
- one Finisher
- one Trademark
- one Action

The onboarding pack excludes already-owned Superstars. It does not create a second complete 60-page deck; the player builds that Superstar's wider deck through normal collection progression and Deck Lab.

The current pack library supports **72/72 released player-visible Superstars** before exclusions.

## Home / Season portraits

Home and Season panels that previously showed broken image placeholders now prefer WWE.com profile artwork for the featured Superstars used by those panels, while retaining the existing local-art and generic-placeholder fallback chain.

## Season Road

The 50-tier Season Road now uses large full-width reward rectangles at roughly twice the old mobile row height. Each tier has a large tier-number slab and shows the reward itself:

- actual collectible card for card rewards
- physical booster packet for booster rewards
- WWE Legacy UP medallion for Universe Points

The existing reward values, XP thresholds and claim rules are unchanged.

## Carry-forward

v1.1.24 launch-poster centering, v1.1.23 animated-art window behavior, v1.1.20+ Live Events / Trish / Merch work, and all existing gameplay systems carry forward unless specifically noted in `BUILD-CERTIFICATION.md`.

See `BUILD-CERTIFICATION.md` and the canonical release-notes file for certification details.
