# WWE Legacy v0.13.96 — Onboarding Card + Pack Presentation

Supersedes v0.13.93. Presentation-only onboarding update; gameplay, rewards, card data, Season 1 Cena, Attitude Era Rock, four-tier progression, starter grants and live-set availability are unchanged.

## Starter Superstar presentation
- CM Punk and Roman Reigns are now shown as their actual collectible **Superstar card faces** during first-time starter selection.
- Both are displayed as **Normal-tier** cards, matching the fresh-save grant.
- The screen continues to award the selected Superstar's complete 60-page Normal starter deck.

## Welcome set presentation
- Evolution, New Generation, Golden Era, Attitude Era and SummerSlam are now represented by their **physical booster-pack designs** rather than generic set-logo tiles.
- The pack is the selection object only: choosing it still awards **one random eligible Superstar from that set plus a complete 60-page Normal deck**.
- The five packs use a compact 3-over-2 iPhone grid.
- New Generation receives a dedicated blue/yellow physical wrapper treatment.

## Welcome reveal
- v0.13.93's full-height Welcome Superstar card reveal remains unchanged.

## v0.13.96 — Asset Recovery + Flat Image Directory

- Recovered the user-supplied image library from the original GitHub export after the prior package omitted most card art.
- All retained image files now live in one flat `assets/images/` directory; no image remains in a move/action/headshot/set subfolder.
- Card Art Studio, live card resolver, Superstar fronts, HUD headshots, menu portraits, logos, templates, UI art and manifest/icon references now point to the flattened filenames.
- Recovered headshots are retained and renamed as `headshot-<superstar-id>.webp`.
- Current card fronts use clean names such as `card-layered-move-<id>.webp`, `card-custom-action-<id>.webp` and `card-custom-superstar-<id>.webp`.
- Missing card artwork still falls back to the canonical rules/details face; no obsolete image is substituted merely because an old path once existed.
- Removed known retired/dead legacy image files while preserving the supplied current artwork library.
- Welcome onboarding no longer inherits the persistent app-chrome top offset, removing the large black gap at the top of the iPhone Welcome screen.


## v0.13.96 — Card Face Overlay Cleanup + Welcome Spacing Hotfix

- Removed the redundant lower-right printing/stat badge from collectible Move card fronts. Labels such as `EMERALD D15` and `NORMAL D5` no longer cover the artwork/card frame.
- Printing identity and live tier values remain available through the existing tier treatment, surrounding UI, and card rules/details face; this is a presentation-only removal of the extra front overlay.
- Corrected the high-specificity persistent app-chrome selector so `welcome-superstar` is explicitly excluded from its top padding.
- Welcome Superstar reveal is top-anchored and its brand row is constrained, eliminating the large black band that could still remain above the WWE Legacy logo on iPhone.
- No gameplay, balance, collection, booster odds, tier values, rewards, deck data, live-set availability, or Season 1 progression changed.


## v0.13.97 — Card Art Studio Export Hotfix

- Fixed Card Art Studio export failure for **John Cena — Season 1: The Last Time Is Now** when the Studio is opened directly from an extracted local folder (`file://`).
- Root cause: locally loaded set-logo files could taint the export canvas even when the user-selected artwork itself was export-safe.
- Card Studio now embeds export-safe copies of every packaged set logo for local-file sessions, including Cena Season 1, New Generation, Attitude Era, RAW, SmackDown, Worlds Collide, Money in the Bank and Survivor Series.
- Corrected exported filenames so they exactly match the flat install path shown in the Studio rather than using only the card art key.
- Example Superstar layered export: `card-layered-superstar-john-cena.webp`.
- Example Move layered export: `card-layered-move-mr-perfect-perfect-plex.webp`.
- Legacy/custom-front and HUD-headshot exports follow the same canonical destination naming rule.
- PNG fallback preserves the canonical basename and changes only the extension.
- No gameplay, balance, card data, pack odds, rewards, progression, collection state or live-set availability changed.


## v0.13.98 — Razor Abdominal Stretch Replacement

- Retired **Razor’s Running Powerslam** from Razor Ramon’s exclusive New Generation signature block.
- **NG1-016** now belongs to **Razor’s Abdominal Stretch**, preserving the collector identity rather than adding or renumbering the set.
- Razor’s Abdominal Stretch is a **3★ Rare Trademark Submission**: **Cost 5**, **Technical 2**, standing opponent only, with **+5 persistent Chest damage per successful turn**.
- Razor’s authored 60-page deck replaces all three copies of the retired exclusive Running Powerslam with three copies of Razor’s Abdominal Stretch.
- Razor’s Fallaway Slam now discounts **Razor’s Chokeslam** directly so its combo remains legal after Fallaway Slam grounds the opponent.
- Existing player ownership migrates every Normal / Emerald / Sapphire / Ruby copy of the retired card one-for-one to Razor’s Abdominal Stretch. Saved Deck Lab references migrate to the new id as well.
- Card Art Studio uses the canonical replacement filename `card-layered-move-razor-ramon-abdominal-stretch.webp`.
- No changes to pack odds, reward economy, Season 1 Cena, live-set availability, Superstar HP, or the flat `assets/images/` layout.


## v0.13.99 — Attitude Rock Finisher Pass

- **Rock Bottom (AE1-058)** is now Attitude Era Rock’s **4★ Very Rare Finisher**: Cost 10 / Damage 17 / no Method requirement / grounds opponent.
- **People’s Elbow (AE1-057)** is now a **3★ Rare Trademark**: Cost 7 / Damage 12 / Strike 2 / grounded opponent only. On Connect it searches/draws Rock Bottom and gives it a 2-Cost discount for the current Control sequence.
- Retired **The Rock’s Samoan Drop** from AE1-060 and replaced it with **Lay The Smack Down**, preserving the collector identity. Lay The Smack Down is a 3★ Rare exclusive Strike at Cost 4 / Damage 7 / Strike 2; on Connect the opponent loses 1 Adrenaline.
- Attitude Rock’s authored 60-page deck uses three copies of Lay The Smack Down and retains two copies of the normal shared **Samoan Drop**.
- Existing ownership of the retired AE1-060 card migrates one-for-one across Normal / Emerald / Sapphire / Ruby printings, and saved Deck Lab references migrate to Lay The Smack Down.
- No pack odds, rewards, Season 1 progression, live-set availability, Superstar HP or unrelated card balance changed.

## v0.14.00 — Tabled UI Consolidation

- Rolled every outstanding item from the current WWE Legacy running/tabled change list into this build instead of shipping only the latest discussed item.
- Centered the physical **John Cena Season 1 completion Superstar card** inside the left-side launch/continue promo bay. The card remains the reward-card presentation on that screen; only its alignment changed.
- Added the official transparent **John Cena profile render from WWE.com** as `assets/images/art-wwe-menu-superstars-john-cena.webp` and use it for Season 1 character-hero presentation on the Home Season 1 tile and Season Road hero.
- Fixed the extra/duplicate Superstar name box seen on Live Event route cards. The renderer now distinguishes between layered Superstar fronts with a blank nameplate area and finished flat/custom fronts that already bake the Superstar name into the image. Runtime nameplates remain on layered fronts but are automatically hidden when the layered asset falls back to a finished flat Superstar front.
- This also prevents the same duplicate-nameplate condition on other surfaces that reuse those finished flat Superstar fronts, without stripping names from layered cards such as Razor Ramon.
- No gameplay, balance, pack odds, rewards, Season XP, Season tier structure, live-set availability, collection ownership or authored deck data changed.

## v0.14.01 — Tabled UX + Razor Technical Hotfix

- Rolled every currently outstanding running/tabled WWE Legacy change into the same build.
- Reordered **Challenges → Set Progress** to **SummerSlam → Evolution → Golden Era → New Generation → Attitude Era**. Set Milestone sections use the same order.
- Reworked the **Deck Lab Superstar selector** into a true horizontally swipeable rail of full physical Superstar cards. Cards preserve the authored full-card aspect ratio and no longer get clipped by the previous fixed-height mobile selector.
- Changed **Daily Tower victory → RETURN TO TOWER** from a neutral dark control to a colored primary CTA while keeping the existing placement and size.
- Reduced **Razor’s Abdominal Stretch (NG1-016)** from **Technical 2 to Technical 1**. It remains a 3★ Rare Trademark Submission at Cost 5 with +5 persistent Chest damage per successful turn; all other stats/effects and its three-copy Razor deck slot are unchanged.
- Regenerated Card Art Studio data so Razor’s Abdominal Stretch displays/exports with the current Technical 1 requirement.
- Distribution packaging now follows the user’s standing rule: the supplied build ZIP **excludes the entire `assets/` folder** and is intended to overlay the existing v0.14.00 flat asset library.
- No pack odds, rewards, Season XP/tier structure, live-set availability, collection ownership or unrelated gameplay balance changed.

## v0.14.02 — Razor Lead Off Rework

- Reworked Razor Ramon’s authored 60-page deck around the v0.14.01 Technical 1 requirement on **Razor’s Abdominal Stretch**.
- Razor’s **Lead Off 5** is now **Strength Momentum / Strike Momentum / Technical Momentum / Fallaway Slam / Punch**, guaranteeing his only Technical Momentum page in the opening hand.
- Razor’s authored Momentum distribution changes from **6 Strength / 4 Strike / 2 Technical** to **6 Strength / 5 Strike / 1 Technical**. Every Momentum page remaining in the shuffled Playbook after Lead Off is therefore Strength or Strike.
- Removed the shared **Bulldog** from Razor’s deck because its Technical 2 requirement would be unreachable with the new one-Technical plan. Replaced it with a third **Clothesline**.
- Razor’s remaining cards require at most Technical 1; Razor’s Abdominal Stretch itself is unchanged at Cost 5 / Technical 1 / +5 persistent Chest pressure.
- Fixed-seed cross-live-set CPU comparison: **1,560 matches / 0 stalls / 54.7% Razor win rate**, versus **56.3%** for the v0.14.01 deck under the same seeds.
- No pack odds, rewards, Season progression, live-set availability, collection ownership, card rarity, card cost/damage/effects, or unrelated Superstar balance changed.
- User-facing package continues to exclude the entire `assets/` directory.


## v0.14.03 — Razor Bulldog Replacement

- Retired **Razor’s Chokeslam** and reassigned **NG1-017** to **Razor’s Bulldog**, preserving New Generation collector numbering.
- Razor’s Bulldog is a **3★ Rare Trademark Grapple** at **Cost 5 / Damage 8 / Technical 1**. It grounds the opponent and uses Front Control as its counter state.
- On Connect, Razor’s Bulldog searches/draws **The Razor’s Edge** and makes The Razor’s Edge cost 1 less for the current Control sequence.
- Razor’s Fallaway Slam now discounts the next **Razor’s Bulldog** by 1 Cost, preserving the authored chain into the finisher.
- Razor’s 60-page deck replaces all three copies of Razor’s Chokeslam with three copies of Razor’s Bulldog. His v0.14.02 Momentum plan remains 6 Strength / 5 Strike / 1 Technical with the Technical page guaranteed in Lead Off 5.
- The shared generic Bulldog remains absent from Razor’s authored deck.
- Existing Normal / Emerald / Sapphire / Ruby ownership and saved Deck Lab references for Razor’s Chokeslam migrate one-for-one to Razor’s Bulldog.
- Card Art Studio uses the new canonical layered filename `card-layered-move-razor-ramon-bulldog.webp`.
- Fixed-seed cross-live-set CPU comparison: **1,560 matches / 0 stalls / 51.5% Razor win rate / 24.17 average turns**.
- No pack odds, rewards, Season progression, live-set availability, unrelated card balance, or asset-layout changes.
- User-facing package continues to exclude the entire `assets/` directory.

## v0.14.04 — Razor Lead Off Sync + Tabled UI

- Fixed the reported Razor Lead Off mismatch for existing profiles. Razor’s authored first five were already correct, but a valid older saved Razor deck could override the new authored ordering. Profile schema 39 now performs a one-time saved-deck sync for pre-v0.14.04 profiles.
- Existing Razor saves now lead with **Strength Momentum / Strike Momentum / Technical Momentum / Fallaway Slam / Punch** whenever the saved deck remains a valid 60 pages. The migration reorders the player’s existing saved entries only; it preserves card counts, printing tiers and all remaining deck choices.
- Razor remains on the approved **6 Strength / 5 Strike / 1 Technical** plan. No Razor card stats/effects change in this build.
- Season 1 launch/continue promo now uses the canonical John Cena collectible-card renderer so the installed authored physical Superstar front is used instead of a menu-render reconstruction. The Cena card is centered within its left reward bay.
- Home Season 1 increases John Cena’s character-render scale to match the visual weight of the Seth Rollins Deck Lab and Becky Lynch Challenges tiles while keeping the existing copy/progress layout.
- Pack Complete five-card summary receives responsive iPhone containment: all five pulls remain the same size, the screen can scroll vertically when needed, badges stay under their own cards, helper copy gets dedicated space, and the NEXT CTA is kept clear. Rules-fallback fronts use tighter summary-only typography to prevent text/stat clipping.
- User-facing distribution continues to exclude the entire `assets/` directory and is intended as an overlay on the existing current flat asset library.
- Verification against inherited v0.14.00 assets: **823 tests / 726 passed / 0 failed / 97 intentionally skipped**; validation, collector-ID, flow, card-effect and counter/submission-state audits report 0 issues.


## v0.14.05 — Consolidated Tabled UX + Booster Collation

- Live Events hub is capped at exactly three rotating tower cards. Birthday Bash and RAW LIVE limited-time towers displace generic rotating slots instead of creating a fourth/fifth rotating event.
- Money in the Bank remains always available as its own persistent event and now renders below the three rotating Live Events.
- Auto Counter hand selection preserves the horizontal hand-rail scroll position after each card is selected or deselected for the ditch cost.
- Season 1 launch/continue promo keeps John Cena’s authored physical Superstar card centered in the left reward bay, with explicit centering rules preventing legacy offsets from leaking into the card container.
- Defeated Live Event route opponents now receive a large green check overlay directly over their Superstar card for immediate completion readability.
- Standard five-card booster printing-tier collation is tightened: maximum two non-Normal printings per pack, with maximum one Sapphire-or-Ruby printing. A second premium printing may be Emerald; excess premium-tier results resolve to Normal.
- Superstar chase remains 2% per eligible pack with the 100-pack hard pity unchanged.
- No gameplay card balance, deck, Season progression, reward quantity, live-set availability, or collection ownership changes.
- User-facing ZIP excludes the entire `assets/` directory and overlays the existing current flat asset library.

## v0.14.06 — Match State Recovery + Season Splash

- Fixed the match-state bug that could leave both Superstars marked **GROUNDED** for the remainder of a match. When Control transfers to a grounded Superstar, they now automatically return to **Standing**, while grounded posture can still persist during an opponent's retained-Control grounded sequence.
- Fixed **Stun** enforcement. A Superstar with active Stun cannot play a normal Counter/reversal or use Auto Counter; CPU defenders obey the same restriction.
- Existing Stun clears when the opponent successfully Connects with a Move, when the stunned Superstar later commits a legal Move, or when the stunned Superstar passes. If the connecting Move applies a fresh Stun, the new Stun remains active after the old one is consumed.
- Kept all authored **standing-only and grounded-only card requirements** intact; the bug was corrected in match posture/state recovery instead of flattening card legality.
- Fully redesigned the **Season 1 launch/continue splash** into a larger premium John Cena hero/reward presentation.
- Corrected obsolete splash copy from the old 100-tier structure to the current **50-tier Season Road**, culminating in the **Tier 50 Ruby John Cena Superstar** reward.
- Season splash presentation was expanded for the 50-tier Cena completion reward. (The exact-card source policy is superseded by v0.14.07 below.)
- Ran the post-fix launch-roster balance audit: **41 Superstars / 16,400 matches / 0 stalls / 26.79 average turns / 14,172 pin finishes / 2,228 submission finishes**. No automatic balance retuning was applied.
- Verification: **834 tests / 737 passed / 0 failed / 97 intentionally skipped**, plus validation, collector-ID, flow, card-effect and counter/submission-state audits with 0 issues.
- User-facing ZIP continues to **exclude the entire `assets/` directory**.

## v0.14.07 — Cena Catalogue + Live Route Hotfix

- Fixed **John Cena Season 1 Catalogue visibility**. All eight authored `season-1-last-time-is-now` collectibles now appear in the player-facing Catalogue from day one, including when they are not yet owned. Ownership controls the NOT OWNED / owned state instead of hiding the cards entirely.
- The eight visible Season 1 Cena collectibles remain **Season-exclusive and booster-ineligible**: Protobomb, Five Knuckle Shuffle, STF, Attitude Adjustment, Hustle, Loyalty, Respect, The Time Is Now, Never Give Up, and the John Cena Superstar card.
- Changed the Season 1 launch/continue splash to an **exact-authored-front-only** Cena card policy. It tries `card-layered-superstar-john-cena.webp`, then `card-custom-superstar-john-cena.webp`, and never reconstructs a physical card from Cena's menu/profile render.
- Because user-facing builds intentionally exclude `assets/`, the exact Cena card front is not bundled in this overlay. If neither exact local Card Studio front exists, the splash now reports the missing authored front rather than showing the wrong card.
- Corrected remaining Cena completion metadata / Home Season copy from obsolete **Tier 100** wording to the locked **Tier 50** Season 1 structure.
- Fixed **Live Event defeated-route persistence**. Saved run opponents remain the route source of truth after returning to a tower, including after full completion, so previously cleared cards no longer revert to WAITING.
- Centered the large defeated check relative to the **physical Superstar card frame itself**. Every already-cleared opponent receives the check when the route is reconstructed.
- Tightened mobile launch-splash containment so the Season promo cannot overlap **Continue Your Legacy** or the entry CTA.
- No gameplay balance, deck composition, pack odds, rewards, live-set availability, or match-state rules changed from v0.14.06.
- Verification: **840 tests / 743 passed / 0 failed / 97 intentionally skipped**; targeted v0.14.07 tests **6/6**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**; collector, flow, card-effect and counter/submission-state audits report 0 issues.
- User-facing ZIP continues to **exclude the entire `assets/` directory**.

## v0.14.08 — Cena Physical Card Renderer Hotfix

- Fixed the Season 1 launch/continue splash John Cena card presentation again at the actual source of the v0.14.07 regression.
- `card-layered-superstar-john-cena.webp` is an authored **layered Superstar card plate**, not a finished standalone front. Its lower name area is intentionally blank because WWE Legacy adds the Superstar nameplate at runtime.
- v0.14.07 incorrectly displayed that layered plate as a complete image, producing the blank black name box seen on-device.
- The splash now composes the exact installed Cena layered plate inside the canonical physical-card shell and adds John Cena’s authored runtime nameplate, matching the way layered Superstar cards are intended to render throughout WWE Legacy.
- If the layered plate is absent, the splash may use the exact finished `card-custom-superstar-john-cena.webp`; when that finished flat front is used, the runtime nameplate is automatically suppressed so it cannot duplicate a printed nameplate.
- The splash **never falls back to Cena menu/profile art**. If neither authored card asset exists locally, it shows the explicit missing-card state.
- The Season completion card remains the **Tier 50 Ruby John Cena Superstar** and remains centered/bounded as one physical card in the reward bay.
- All v0.14.07 Cena Catalogue visibility, Live Event defeated-route persistence/check placement, v0.14.06 grounded/Stun fixes, v0.14.05 booster collation and other prior changes are preserved.
- No gameplay balance, deck composition, pack odds, reward quantities, Season progression, live-set availability or collection ownership changed.
- User-facing ZIP continues to exclude the entire `assets/` directory.

## v0.14.09 — Cena Exact Plate Composition Hotfix

- Corrected the Season 1 John Cena splash card using the **exact user-supplied 680×1000 `card-layered-superstar-john-cena.webp`** as the visual source of truth.
- Confirmed the supplied WebP already contains the complete physical card frame and its black/red/blue lower name bay. The splash now adds **text only** (`John Cena` / `SUPERSTAR`) inside that authored bay.
- Removed the generic runtime Superstar **nameplate background/panel** from this splash composition, eliminating the second dark/glossy name box that was covering the authored card design in v0.14.08.
- Removed the animated Ruby surface sweep from this splash-card presentation so the exact physical plate is not obscured. The surrounding Season UI still identifies the reward as the Tier 50 Ruby Superstar.
- A finished `card-custom-superstar-john-cena.webp` fallback is still supported; when used, all runtime Cena name text is suppressed so printed text cannot duplicate.
- The splash never reconstructs Cena's physical card from menu/profile artwork.
- All v0.14.08 and earlier fixes remain intact, including Cena Catalogue visibility, 50-tier Season copy, Live Event cleared-route reconstruction/checks, Grounded/Stun state recovery, Auto Counter scroll retention, Live Event hub ordering and booster-printing collation.
- No gameplay balance, deck composition, pack odds, rewards, Season progression or live-set availability changed.
- User-facing ZIP continues to exclude the entire `assets/` directory.
