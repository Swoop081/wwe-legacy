# v1.1.43 — Complete Play-Pile Mats + Automatic Daily Launch Rewards — 31 August 2026

- Rebuilt the Play Pile mat resolver so **all 16 defined WWE Legacy set IDs** have an explicit self-contained set mat; audit result is **0 missing mats**.
- Replaced the fragile dependency on the optional top-down ring image with a CSS-rendered set canvas/rope field using per-set colours, while retaining the active set logo in the centre.
- Changed the Trish Season 1 launch poster **PLAY NOW** flow for returning profiles to automatically check the rolling 24-hour free booster.
- If the free booster is ready, it is claimed and enters the normal sealed-pack/rip/reveal flow immediately—no Season or Open Packs menu detour.
- After that pack is completed, **Daily Spin launches automatically** when its 24-hour reward is available.
- If no free pack is due but Daily Spin is ready, the spin opens immediately. If neither is due, PLAY NOW proceeds straight to Home.
- Preserved first-time welcome setup ahead of recurring launch rewards.
- No card stats, decks, collector IDs, booster collation, progression rewards or match rules changed.
- Verification: 3/3 dedicated assertions; 95 Superstars / 0 flow issues; 95 decks / 840 gameplay cards / 0 validation issues; 935 collector cards / 935 manifest entries; full suite **924 passed / 97 historical failures / 97 skipped**, with **0 new failures** versus v1.1.42.

# v1.1.42 — Shared Top Rope Neckbreaker + Rear Naked Choke — 30 August 2026

- Added **Top Rope Neckbreaker** (`SS1-151`) as a shared **3★ Rare** SummerSlam — Series 1 Move: Cost 7 / Damage 11 / Technical 2 + Agility 1; Technical Grapple; grounds opponent; Stun 1; Body Elevated counter state.
- Added **Rear Naked Choke** (`SS1-152`) as a shared **2★ Uncommon** SummerSlam — Series 1 Submission: Cost 6 / Technical 2; standing opponent only; +5 persistent Head pressure per successful turn; Rear Control counter state.
- Both additions are booster-only, preserving all existing authored 60-page decks.
- Regenerated Card Studio data and added dedicated v1.1.42 regression coverage.
- Verification: 3/3 dedicated assertions; 95 Superstars / 0 flow issues; 95 decks / 840 gameplay cards / 0 validation issues; 935 collector cards / 935 manifest entries; Card Studio 1,545 cards; full suite 921 passed / 97 historical failures / 97 skipped, with 0 new failures.

# v1.1.41 — Foundational Suplex — 30 August 2026

- Added **Suplex** (`SS1-150`) to SummerSlam — Series 1 as a shared **1★ Common** Move.
- Stats: Cost 3 / Damage 4 / Technical 1; Grapple; grounds opponent; Body Elevated counter state.
- Kept the card booster-only for this release so no existing 60-page deck composition changes implicitly.
- Regenerated Card Studio data and added dedicated v1.1.41 regression coverage.
- Verification: 3/3 dedicated assertions; 95 Superstars / 0 flow issues; 95 decks / 838 gameplay cards / 0 validation issues; 933 collector cards / 933 manifest entries; full suite 918 passed / 97 historical failures / 97 skipped, with 0 new failures.

# WWE Legacy v1.1.40 — Gunther's Front Dropkick

- Adds **Gunther's Front Dropkick** as `SS1-149`, a Gunther-exclusive **3★ Rare Trademark** in SummerSlam — Series 1.
- Cost 5 / Damage 9 / Strike 2; Strike Move; Leg Extended counter state.
- Replaces the two shared Front Dropkick pages in Gunther's authored 60-page deck with two copies of his exclusive Trademark.
- Gunther's 2× Gojira Clutch Finisher package, existing Momentum structure, abilities and other exclusive moves remain unchanged.
- SummerSlam — Series 1 expands from 148 to **149 collector cards** without renumbering any existing card.
- Card Studio receives the new canonical card entry/art paths; no artwork is packaged.
- No gameplay-engine, economy, reward, progression or mode logic changes.
- Verification: dedicated v1.1.40 **3/3**; focused Gunther/Bret/rarity sample **21 passed / 0 failed / 1 historical skip**; flow **95/0**; rebuild **95 decks / 837 gameplay cards / 0 issues**; card IDs **932/932**; full suite **915 passed / 97 failed / 97 skipped**, therefore **3 new passes and 0 new carry-forward failures** versus v1.1.39.

# WWE Legacy v1.1.39 — Bret Hart Ringpost Figure Four

- Adds **Ringpost Figure Four** as `NG1-081`, a Bret Hart-exclusive **3★ Rare Trademark Submission** in New Generation — Series 1.
- Cost 6 / Damage 0 / Technical 2; grounded opponent only; targets Legs; +5 persistent Leg pressure per successful turn; on Connect, Bret’s next Sharpshooter costs 1 less that Control sequence.
- Adds 3 copies to Bret Hart's authored 60-page deck, replacing the shared Boston Crab, one Back Suplex and one Elbow Drop.
- Retains Bret's 2× Sharpshooter Finisher package and existing 12-page Momentum structure.
- New Generation — Series 1 expands from 80 to **81 collector cards** with no renumbering of existing cards.
- Card Studio receives the new canonical card entry/art paths; no artwork is packaged.
- No other Superstar, gameplay-engine, economy, reward, progression or mode logic changes.
- Verification: dedicated v1.1.39 3/3; focused current suite 21/21 with 1 historical skip; flow 95/0; rebuild 95 decks / 836 gameplay cards / 0 issues; card IDs 931/931; full suite **912 passed / 97 failed / 97 skipped**, with **0 new failures** versus v1.1.38.

# WWE Legacy v1.1.38 — Card Studio Runtime Parity + Set-Field Animation Fix

- Restores saved Card Studio **base plates** as the first runtime source for all non-Momentum collectible fronts. This directly fixes saved Superstar/Move fronts not appearing even though the repo contains their `*-base-plate.webp` files.
- Flat canonical/legacy finished cards remain fallback-only when a base plate is genuinely unavailable.
- Animated cards now activate their special presentation only after a real animation source loads. Missing/failed animation leaves the static Card Studio card untouched.
- Adds a full inner-card **set background layer** behind animated media and the live plaque.
- Centres animated artwork between the bottom of the top border and the top of the plaque: Moves use 4.8%–74.0%; all other animated collectible types use 4.8%–77.2%, matching Card Studio plaque geometry.
- Plaque and text remain over the set field; the set logo is restored above the animation.
- Corrects SummerSlam animated presentation to the Card Studio blue/purple/orange set field instead of the old blue-purple fill applied only inside the animation window.
- Adds matching animated full-page set fields for Evolution, SmackDown, Raw, NXT, Ruthless Aggression, Golden Era, Attitude Era, New Generation, Survivor Series, Money in the Bank, Worlds Collide and Reward cards.
- Superstar lower identity treatment uses the clean rectangular Card Studio plaque footprint instead of a separate clipped runtime name box.
- No card balance, deck composition, rewards, progression, economy or mode logic changes.
- Verification: dedicated v1.1.38 4/4; focused rendering/current-content 21/21; flow 95/0; rebuild 95 decks / 835 gameplay cards / 0 issues; card IDs 930/930; full suite **909 passed / 97 failed / 97 skipped**, with **0 new failures** versus v1.1.37.

# WWE Legacy v1.1.30 — Card Presentation Corrections

## v1.1.37 — Tatum Paxley Finisher + Trademark Re-Audit

- Corrects **Cemetery Drive (`NXT1-032`)**: it is Tatum Paxley’s Finisher, not a Submission. It becomes 4★, Cost 9 / Damage 17, Grapple, Front Control, no Method requirement, grounds the opponent, and deals +1 persistent Back damage.
- Removes Cemetery Drive’s incorrect Submission, Leg-pressure, grounded-only and Technical 2 fields.
- Rebalances **Psycho Trap (`NXT1-031`)** to a 3★ Trademark at Cost 5 / Damage 8 / Technical 1 while retaining its Cemetery Drive search/discount setup.
- Corrects **Bridging German Suplex (`NXT1-033`)** to a 3★ Rear-Control Grapple Trademark at Cost 5 / Damage 8 / Technical 2; it is no longer incorrectly treated as a Diving Aerial against an already-grounded opponent.
- Reclassifies **Diving Knee Drop (`NXT1-034`)** from the old Finisher slot to a 3★ Trademark at Cost 6 / Damage 10 / Agility 2.
- Tatum’s authored 60-page deck now carries 3× Psycho Trap, 3× Bridging German Suplex, 3× Diving Knee Drop and 2× Cemetery Drive, matching the standard three-Trademark / two-Finisher NXT structure.
- Collector IDs/numbers and artwork paths remain unchanged; existing Card Studio fronts should be re-exported to bake in the corrected labels, rarity and Cost/Damage values.
- No other Superstar, mode, economy, progression or reward data changes.
- Verification: dedicated Tatum audit 3/3; flow audit 95 Superstars / 0 issues; rebuild validation 95 decks / 835 gameplay cards / 0 issues; card-ID audit 930/930 / 0 issues; full no-assets suite 905 passed / 97 failed / 97 skipped with **0 new failures** versus v1.1.36.


## v1.1.35 — Exact Card Front Runtime + Clean Play Cards + Trish Reframe

- Removes the chamfered / cut-corner treatment from all six **Choose Your Path** mode banners, their in-card CTA tabs, and the full-width Next / Back controls. Play cards now use clean rectangular edges with normal rounded corners.
- Corrects the physical-iPhone Home Season One framing again: the v1.1.33 top-right position pushed half of Trish Stratus' face outside the tile. The portrait is brought back inside the right edge and the excessive zoom is reduced so her complete face and hat are visible.
- Fixes the collectible-card presentation regression that caused already-designed Card Studio fronts to stop matching the live game.
- **Finished Card Studio fronts are now the runtime source of truth on every non-Momentum collectible surface**, including Deck Lab, gameplay hand, play pile, inspectors, collection, packs and mode card previews.
- Universal animation support no longer makes the game choose the base-plate / reconstructed-overlay front by default. Animated media is confined to the existing artwork bay above the exact finished front, so authored frame, stars, set logo, plaque and typography stay unchanged.
- Runtime fallback order is now canonical finished front → legacy finished Card Studio export → canonical base plate with live overlay → canonical rules face.
- Exact finished fronts use `object-fit: contain` so an authored 680×1000 card is never cropped by the live renderer.
- No packaged image assets, gameplay rules, decks, rewards, economy or modes change in this hotfix.
- Verification: new v1.1.35 assertions 3/3; flow audit 95 Superstars / 0 issues; rebuild validation 95 decks / 834 gameplay cards / 0 orphans / 0 issues; card-ID audit 929 collector cards / 929 manifest entries / 0 issues. Full no-assets historical suite retains the exact same 100 asset-dependent / historical failures as v1.1.34, with **0 new carry-forward failures**.


## v1.1.34 — Seated Shotgun Dropkick

- Adds **Seated Shotgun Dropkick** as the new shared Evolution 2★ Uncommon, collector number `EVO1-076`.
- Card profile: Cost 4 / Damage 7 / Agility 2; Strike move; Grounded opponent only; Stun 1.
- Seeds two copies into the authored 60-page decks for **IYO SKY**, **Liv Morgan**, and **Tiffany Stratton**, while preserving their existing lead-off basic Dropkick access.
- No image from the reference screenshot is imported or packaged. The Card Studio entry is generated with the normal canonical art path so artwork can be added later in Card Studio.
- Evolution Series 1 expands from 75 to **76 collector cards**.
- No Superstar abilities, momentum totals, deck sizes, gameplay engine rules, economy, modes or rewards change.
- Verification: focused regression sample 7 passed / 0 failed / 1 historical skip; flow audit 95 Superstars / 0 issues; rebuild validation 0 issues; card-ID audit 0 issues.


## v1.1.33 — Trish Home Banner Position Hotfix

- Corrects the remaining Home Season One Trish framing issue visible on physical iPhone.
- Keeps the approved 2× Trish WWE.com render scale.
- Moves Trish substantially farther right and slightly upward so her full head/face occupies the clean right-side portrait lane instead of sitting beneath the Season XP bar and copy.
- The lower body continues to crop naturally inside the compact Season banner.
- No Season progression, rewards, Home navigation, gameplay, economy or card data changes.


## v1.1.32 — Play Hub 3+3 Pagination + Money in the Bank Move

- Makes **Choose Your Path** a true 3+3 two-page menu: Page 1 is Exhibition Showcase, Live Events and King of the Ring; Page 2 is Championship Road, Survivor Series and Money in the Bank.
- Returns Championship Road and Survivor Series to the same standard mode-card height used on Page 1.
- Removes the empty fourth grid row that caused the large blank area before the Next control.
- Rebuilds Next/Back as large full-width navigation buttons immediately after the third mode card.
- Moves **Money in the Bank** out of the Live Events hub and into the third slot on Play page 2.
- Money in the Bank uses its existing WWE set branding as the page-card visual and retains its existing 8-level / 3-life / 2-pack rules.
- Completed Money in the Bank runs return to Play page 2; the bottom Play tab now stays active while in Money in the Bank.
- No gameplay balance, rewards, economy, live-event rotation, Championship Road progression or Survivor Series capture logic changes.


## v1.1.31 — Play Hub Two-Page Navigation + WWE.com Portrait Fix

- Splits **Play → Choose Your Path** into two focused pages instead of one long five-mode scroll.
- Page 1 is **Exhibition Showcase → Live Events → King of the Ring**, followed by a large full-width **Next →** control.
- Page 2 is **Championship Road → Survivor Series**, with both mode banners enlarged and a matching full-width **← Back** control.
- Replaces the old Cody Rhodes WWE.com action photo with Cody's WWE.com transparent profile/headshot render for Live Events.
- Survivor Series now uses Hulk Hogan's WWE.com transparent profile/headshot render instead of Randy Orton.
- Survivor Series now uses the shared WWE Legacy mode-logo typography system (`SURVIVOR` / `SERIES`) and matching cyan mode accent rather than its one-off text treatment.
- No gameplay rules, rewards, economy, card data, Live Event schedule, Championship Road progression or Survivor Series capture rules change.


## v1.1.30 — Trish Season Banner Framing Hotfix

- Keeps Trish's requested 2× Home-screen scale.
- Re-anchors her Season One banner render to the top-right so her full head remains visible.
- Allows the lower portion of the render to crop naturally within the banner instead of cropping her face.

- Merch photography now continues across the full card face behind its plaque; the previous solid reward-colour strip is removed.
- Animated Merch is layered above the base plate and below the plaque.
- Trish Stratus is rendered at exactly 2× scale in the Home Season One tile, anchored bottom-right.
- Deck Lab Superstar selectors use the exact finished Card Studio front with no reconstructed stars, logo, frame or nameplate, plus the Amethyst tier sweep/glow.
- Deck Lab Lead Off and section cards use finished Card Studio fronts as their presentation shell.
- Animated cards retain their finished Card Studio stars, set logo, frame and plaque while animation is contained in the plaque-aware artwork bay.
- SummerSlam animated Moves use a solid SummerSlam blue-purple set background.
- Missing or failed animation restores the exact finished Card Studio front automatically.


## v1.1.36 — Matrix Slide Shared Common Reversal
- Adds **Matrix Slide** as `SD1-072`, a new shared **1★ Common** booster-only Counter card in SmackDown — Series 1.
- Matrix Slide costs 1, deals 0 damage, has no Method requirement, and is Counter-only.
- Its primary reversal state is **Arm Extended**. It also carries explicit exact-card coverage across the high Clothesline / Lariat family so aerial/elevated variants remain valid targets even when their exposed state is Running Aerial, Diving Aerial or Body Elevated.
- Explicit family coverage includes standard, running, short-arm, corner, flying, springboard, leaping, flipping and Superstar-specific Clotheslines/Lariats, including Clothesline from Hell.
- **Leg Lariat is intentionally excluded** because it is a leg-strike family move rather than the high arm Clothesline depicted by Matrix Slide.
- The user's uploaded screenshot is reference-only and is not copied, imported or packaged. Card Studio exposes blank canonical targets at `assets/images/matrix-slide.webp` and `assets/images/matrix-slide-base-plate.webp` for later authoring.
- No existing deck composition is changed in this pass.
