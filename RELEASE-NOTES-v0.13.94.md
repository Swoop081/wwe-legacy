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


## v0.14.10 — Cena Direct Plate Hotfix

- Season 1 launch/continue splash no longer nests John Cena's authored 680×1000 physical card plate inside the generic `.ccg-card` shell.
- Exact Cena plate now renders edge-to-edge at its authored bounds, removing the repeated right/bottom black gutter and extra frame seen on iPhone.
- Splash adds only `John Cena` + `SUPERSTAR` text inside the plate's existing blank name bay.
- No synthetic Cena card reconstruction, duplicate frame, generic nameplate background, or tier-surface overlay is used on this splash.
- All prior tabled fixes carry forward.
- Distribution remains no-assets.

## v0.14.11 — Season Splash Cleanup + Daily Live Event XP

- Fixed the remaining **right-side fade on John Cena’s Season 1 physical card**. The fade came from an older `.season-ad-rock img` mask/filter rule that still applied to the exact direct-plate image. The Cena splash path now explicitly disables both standard and WebKit masks, legacy filtering and inherited opacity on the exact card front.
- Removed the redundant Season splash fact boxes **`50 TIERS`** and **`TIER 50 RUBY SUPERSTAR`**. The splash still correctly describes the 50-tier Season Road in its main copy and still presents John Cena as the Tier 50 completion Superstar.
- Live Event tower detail now **auto-scrolls the horizontal opponent route to the current match** on entry/return. The active opponent is centered where possible; completed towers focus the final cleared opponent instead of resetting to Match 1.
- Added a once-per-local-day **+25 Season XP Daily Live Event set-completion bonus**. The bonus awards automatically when all three rotating Daily Live Events shown for that day are cleared.
- Existing match XP remains **+5 XP per win**. Because the three Daily Live Events contain 15 required wins total, completing the full daily set now yields **75 match XP + 25 completion XP = 100 Season XP**.
- The Live Events hub now displays the current daily set completion count (`0/3` through `3/3`) and clearly shows the +25 XP reward/claimed state.
- The +25 XP reward is idempotent: reopening completed towers or revisiting the hub cannot award it twice for the same local day.
- No card balance, deck composition, pack odds, Superstar pity, Season tier count, reward-card identities, live-set availability, or collection ownership changed.
- User-facing distribution continues to exclude the entire `assets/` directory.


## v0.14.12 — Tabled Mobile Polish

- Compacted the **Season Tier Up** celebration for iPhone: smaller Tier Up headline/tier numeral, tighter spacing, shorter XP line, smaller reward card/pack and a compact Continue CTA so the complete reward moment fits cleanly within the phone viewport.
- Updated the Tier Up major-completion check to use the current **50-tier Season** rather than the obsolete Tier 100 condition.
- Fixed Roman Reigns' **Tribal Chief** Action front. Its authored physical art plate has a deliberately blank lower bay; WWE Legacy now renders `TRIBAL CHIEF`, `ACTION · VERY RARE`, and the regain-Control once-per-match effect directly into that bay instead of displaying a textless card in hand.
- Fixed **Championship Road match presentation theming**. The active road section now supplies its set identity to the match, so Golden Era, SummerSlam, Evolution, Attitude Era and New Generation matches use the correct themed arena/ring canvas/logo treatment instead of a random or mismatched era.
- Increased premium printing differentiation at normal hand size. **Emerald** now has a clear green edge/outer halo, **Sapphire** a stronger blue treatment, and **Ruby** the strongest red treatment; Normal remains unlit and the glow is kept around card edges to preserve artwork/text clarity.
- No card balance, deck, pack odds, Season XP, reward, pity, live-set, collection ownership or match-rule changes.
- User-facing distribution continues to exclude the entire `assets/` directory.
- Verification with the inherited current asset library: **860 tests / 762 passed / 0 failed / 98 intentionally skipped**; targeted v0.14.12 tests **4/4**; validation, collector-ID, flow, card-effect and counter/submission-state audits report 0 issues.

## v0.14.13 — Championship Road 40-Match + Frozen Controls

- Opponent Entrance keeps the set/show logo at its existing hero position and moves the `OPPONENT ENTRANCE` / Superstar-name block down into the unused lower portion of the upper hero band, just above the card-stage divider.
- Championship Road upper controls are now frozen on iPhone: Road header/progress, per-Superstar selector, difficulty selector, current-match/status panel and Fight Match CTA remain visible while the lower opponent route scrolls independently.
- Entering or returning to Championship Road auto-focuses the lower route on the four-match section containing the current match. Completed roads focus the final section instead of jumping back to the beginning.
- Championship Road expands from **32 to 40 matches** and from eight to **ten four-match sections**.
- Approved section order is **Golden Era Part I → New Generation Part I → Attitude Era Part I → SummerSlam Part I → Evolution Part I → Golden Era Part II → New Generation Part II → Attitude Era Part II → SummerSlam Part II → Evolution Part II**.
- Restores the missing **Golden Era Part II** and **Attitude Era Part II** groups. Golden Era Part II uses Rowdy Roddy Piper, Ted DiBiase, Jake “The Snake” Roberts and Mr. Perfect. Attitude Era Part II uses The Rock, Triple H, Chris Jericho and Kurt Angle.
- Existing 32-match active saves migrate onto the new 40-match canonical route without losing numeric stage or difficulty progress. A legacy 32-match completed active run resumes at Match 33 so the newly restored final eight matches remain playable.
- The existing section reward rule remains one themed booster every four wins; a full Championship Road now therefore contains **10 themed section-clear boosters** instead of 8.
- Match presentation continues to inherit the active Championship Road section set identity, so each of the ten sections uses its corresponding arena/ring theme.
- No card balance, deck, pack-odds, Superstar-pity, Season-XP, Daily-Live-Event-XP, collection-ownership or unrelated match-rule changes.
- User-facing distribution continues to exclude the entire `assets/` directory.
- Verification: **864 tests / 766 passed / 0 failed / 98 intentionally skipped**; targeted v0.14.13 tests **4/4**; validation, collector-ID, flow, card-effect and counter/submission-state audits report 0 issues.

## v0.14.14 — Championship Road Launch Hotfix

- Fixed the **blocking Championship Road Fight Match regression** introduced in v0.14.13. Championship Road passes lightweight presentation metadata so each section can use its correct arena/set theme, but the shared matchup splash incorrectly treated any metadata object as a Daily Live Event and attempted to call `eventMeta.eventName.toUpperCase()`. Championship Road metadata has no `eventName`, so tapping **FIGHT MATCH** could stop before the matchup splash appeared.
- Matchup presentation now normalizes metadata by mode: only `mode === "live-event"` uses Live Event heading/stage/rule fields. Championship Road keeps its section `rewardSetId` for arena/ring/set presentation but enters the normal **MAIN EVENT** matchup flow safely.
- Restores match launching for **every active per-Superstar Championship Road**, including existing/migrated 40-match progress such as Roman Reigns at Match 11 and fresh roads such as Razor Ramon at Match 1.
- Corrected the stale Championship Road hero kicker from **24 MATCHES · FOUR DIFFICULTIES** to **40 MATCHES · FOUR DIFFICULTIES**.
- No Championship Road stage/progress values, opponent order, difficulty unlocks, section rewards, card balance, pack odds, Season XP, Daily Live Event XP, Superstar pity or collection ownership changed.
- User-facing distribution continues to exclude the entire `assets/` directory.
- Verification against the inherited current asset library: **866 tests / 768 passed / 0 failed / 98 intentionally skipped historical contracts**; targeted v0.14.14 tests **2/2**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**; collector-ID **782/782 / 0 issues**; flow **76/76 / 0 issues**; card-effect and counter/submission-state audits report **0 issues**.

## v0.14.15 — Pack Missing-Art Fallback Hotfix

- Fixed a pack-opening identity failure where a collectible whose installed front image could not be loaded could render as an empty glowing card frame, leaving the player unable to tell what was pulled.
- Runtime failures of layered, finished/custom, or authored card-front images now expose the card's canonical **rules/details face directly** instead of relying on an iOS 3D flip repaint.
- The readable fallback includes the existing canonical card identity and rules data: card name, type/rarity/printing label, Cost/Damage where applicable, Method requirements, effect text, restrictions/counter/submission information, collector code and rarity stars.
- The same fallback behavior applies in the **single-card Pack Reveal**, **Pack Complete five-card summary**, and the normal card inspector because all three use the canonical collectible renderer.
- Premium printing presentation is preserved around the fallback face, so Emerald/Sapphire/Ruby pulls remain visually identifiable even when their artwork front is unavailable.
- Pack Reveal progression remains unchanged: tapping the readable fallback still advances to the next pull/summary, while Pack Complete cards remain inspectable.
- No card balance, pack odds/collation, rewards, Season XP, Championship Road, Live Event, collection ownership, Superstar pity or match rules changed from v0.14.14.
- User-facing distribution continues to exclude the entire `assets/` directory.

## v0.14.16 — Set Milestone Expansion + RAW Presentation

- Expanded Set Milestones from the prior Base/Ruby structure to four tracks for every released set: **Base / Emerald / Sapphire / Ruby**.
- All four tracks use 25% / 50% / 75% / 100% milestones, and every milestone awards exactly **1 random released-set booster**.
- Base progress continues to count each collector identity once when any printing is owned; Emerald, Sapphire and Ruby tracks count unique cards owned at that exact printing tier.
- Existing Base and Ruby milestone claim history is preserved. New Emerald/Sapphire claim arrays initialize safely for existing profiles.
- Set Milestone sections are now collapsible. They default closed, auto-expand when a reward is claimable, and remember manual expansion for the current app session.
- Challenge notification counts now include all four milestone tracks.
- RAW Daily/RAW LIVE event presentation is locked to RAW branding: red/black/white hub treatment, packaged RAW Series 1 logo on hub/detail, and RAW Series 1 arena/ring presentation during matches before the set's public release. This is presentation-only and does not release RAW Series 1 cards or boosters.
- Carries forward all v0.14.15 and earlier gameplay/UI fixes.
- Distribution ZIP excludes `assets/` per the current packaging policy.

## v0.14.17 — RAW Hub Typography + In-Match Branding

- Removed the **RAW image logo from the Live Events hub card** and restored the same split-title typography used by the other event tiles.
- RAW hub title is now **RAW** in white with **EVENT** in RAW red.
- Added a dedicated Live Event `presentationSetId` path so presentation branding no longer has to reuse the booster reward set.
- RAW Live Event matches force **RAW Series 1** as their presentation set even while RAW Series 1 remains unreleased; booster rewards continue to use the released-set fallback and therefore do not expose unreleased RAW boosters.
- The RAW logo now appears reliably on both **player/opponent Entrance screens** and the **Play Pile ring-centre mat/logo** in RAW matches.
- RAW detail-screen logo treatment and red/black/white event styling remain unchanged.
- No card balance, deck, match-rule, pack-odds/collation, Season XP, Daily Live Event XP, Championship Road, pity, collection ownership or live-set release changes from v0.14.16.
- Distribution remains a **no-assets overlay package**.


## v0.14.18 — Compact Tier Up Reward Cards

- Reduced physical card rewards on the **Season Tier Up** celebration so the reward card no longer overwhelms the screen.
- Added a dedicated `tier-up-physical-card` presentation wrapper capped at **112px wide** on standard iPhone layouts and **96px** on shorter viewports.
- Season move-card and final Superstar-card rewards still use the canonical collectible renderer, so authored card artwork, printing treatment and identity remain intact at the smaller size.
- Tier Up reward cards are non-interactive on the celebration overlay, preventing accidental flips while continuing through earned tiers.
- Booster-pack and Universe Point Tier Up reward sizes are unchanged.
- No Season XP curve, tier count, reward identity/quantity, claim behavior, card stats/effects, deck composition, match rules, pack odds/collation, Live Event rewards, Championship Road, pity, collection ownership or release-state changes from v0.14.17.
- Distribution remains a **no-assets overlay package**.

## v0.14.19 — Rhea Crucifix Auto Build Hotfix

- Fixed **Rhea’s Crucifix Powerbomb (EVO1-004)** being automatically inserted into non-Rhea decks such as Kane’s by Deck Lab Auto Build.
- Preserved the card’s established collector/gameplay identity: **2★ Uncommon, Cost 7, Damage 11, Strength 3, Grapple, Body Elevated**, with the same EVO1-004 collector slot and Rhea authored-deck reference.
- Added an Auto Build affinity restriction so EVO1-004 is an automatic candidate for **Rhea Ripley only** while remaining manually legal under the existing shared-card rules.
- Deck Lab Auto Build and Auto Fill now respect card-specific automatic-build affinity after normal Superstar legality checks.
- Existing affected saves migrate automatically. A leaked EVO1-004 in any non-Rhea saved deck is repaired once without rebuilding the entire custom deck; the migration replaces only that slot with the best legal owned candidate where possible and preserves unrelated card/tier choices and Lead Off order.
- Rhea’s own saved/authored deck is explicitly left untouched.
- No card stats/effects, rarity, collector numbering, authored deck composition, pack odds/collation, rewards, Season XP, Daily Live Event XP, Championship Road, pity, live-set state or collection ownership changed from v0.14.18.
- Distribution remains a **no-assets overlay package**.

## v0.14.20 — Roster Balance Pass

- Applied the approved roster-audit balance pass across André the Giant, Diesel, Doink the Clown, Ted DiBiase, Mr. Perfect, Rowdy Roddy Piper, Becky Lynch, Owen Hart, Randy Savage, John Cena, Penta and Lola Vice.
- **André:** Giant’s Reach now triggers once instead of twice and no longer grants +1 Adrenaline; its next-Strength −1 Cost / +2 Damage payoff remains.
- **Diesel:** Jackknife Powerbomb Cost **11 → 12**, Damage remains 18.
- **Doink:** HP **60 → 62**; Joke’s on You first two Counters now draw 2 and gain +1 Adrenaline; Drop Toe Hold searches Stump Puller with −1 Cost; Stump Puller pressure **5 → 6**.
- **Ted DiBiase:** Million Dollar Dream pressure **6 → 7**; Everybody Has a Price first qualifying Technical triggers **2 → 3**.
- **Mr. Perfect:** Perfect-Plex immediate-pin kickout penalty **10 → 15 percentage points**; Perfect Execution additionally draws 1 on the first two successful Counters each match.
- **Roddy Piper:** Piper’s Pit replaces the old future +2-Adrenaline Counter tax with **opponent −1 Adrenaline on their next gain of Control**, while retaining the current-Control Counter shutdown and no-Counter draw fallback.
- **Becky Lynch:** HP **64 → 65**; Dis-arm-her pressure **5 → 6**; Manhandle Slam Damage **16 → 17**.
- **Owen Hart:** HP **62 → 63**; Two-Time Slammy Award Winner can now take up to two different eligible **1★/2★/3★ Moves** from the top seven.
- **Randy Savage:** Macho Madness retains its first-two-use cap and +1 Adrenaline reward but no longer draws 1 page.
- **John Cena:** Hustle, Loyalty, Respect is now a persistent installed Support that triggers exactly once the first time Cena reaches 50% HP or less, even if installed earlier; installing it after reaching the threshold triggers it immediately.
- **Penta:** Cero Miedo no longer gives +1 starting Adrenaline.
- **Lola Vice:** HP **59 → 61**; Triangle Choke pressure **5 → 6**.
- Fresh released-roster audit: **41 Superstars / 16,400 matches / 0 stalls / 26.91 average turns**. André and Diesel settle at **60.8%**, Savage at **54.3%**, Ted at **45.5%**. Oba Femi (**64.3%**) and Roman Reigns (**62.6%**) remain on the watchlist; no speculative nerf was applied. Cena’s corrected HLR is live but he remains a low outlier at **35.6%**, so a further Cena numerical buff is deferred to a measured follow-up.
- Verification: v0.14.20 targeted tests **5/5**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow/card-effect/counter-state audits **0 issues**; full no-assets suite **879 discovered / 775 passed / 94 skipped / 10 expected asset-presence failures**.
- Distribution remains a **verified no-assets overlay package**.
