# WWE Legacy v1.1.27 — Jake Roberts Trademark Audit

## v1.1.27 — Jake Roberts Trademark Audit

- Removes `GE1-061 Jake’s Gutwrench Gutbuster` and `GE1-062 Jake’s Running Knee Lift` completely from gameplay data, Collection, Card Studio, asset migration and collector numbering.
- Jake Roberts intentionally has two fewer personal Trademark moves than the prior uniform Legend template: Jake’s Short-Arm Clothesline and Jake’s DDT remain his only personal moves for now.
- Replaces the eight removed deck pages with existing authentic shared offense: +4 Clothesline, +3 Atomic Drop and +1 Neckbreaker.
- Jake remains on a legal 60-page deck; Clothesline finishes at four copies while Atomic Drop and Neckbreaker each finish at five. His approved reactive-defense density remains 10 pages.
- Golden Era collector numbering closes the removed-card gap and now runs `GE1-001` through `GE1-082`.

# WWE Legacy v1.1.26 — Card Presentation Consistency Hotfix

## v1.1.26 — Card Presentation Consistency Hotfix

- Live-game Superstar card nameplates now render every Superstar name in full uppercase, including `CM PUNK` and `ROMAN REIGNS` on first-time onboarding.
- Keeps the existing live-game nameplate font, sizing, spacing, colour, stroke and layout unchanged.
- Replaces the styled-text logo inside the sealed onboarding Superstar Pack with the exact approved WWE Legacy launch lockup asset.
- Extends Merch animated artwork across the full card face so it continues behind and underneath the lower plaque instead of stopping at the plaque boundary.
- No card data, gameplay, onboarding grants, Season Road rewards, economy values or image assets change.

# WWE Legacy v1.1.25 — Onboarding Superstar Pack + Season Road Visual Overhaul

- Keeps the initial **CM Punk / Roman Reigns** starter choice and full starter deck unchanged, then replaces the old five-era Welcome choice with one random **Superstar Pack**.
- Superstar Packs are now a reusable reward primitive. A pack grants exactly five Normal identity cards for one released Superstar: **Superstar + Entrance + 1 Finisher + 1 Trademark + 1 Action**. The onboarding pack excludes already-owned Superstars and does not manufacture a second full 60-page deck.
- The reusable pack library covers **72/72 currently released player-visible Superstars** before exclusions. Shared identity moves are supported; **Bayley-to-Belly** is now Bayley's 3★ Trademark (existing C5/D8/Strength 2/effect unchanged) so Bayley has a complete five-card pack package.
- Home/Season portrait surfaces that were showing broken `?` images now prefer WWE.com profile art for Roman Reigns, CM Punk, Trish Stratus, Seth Rollins, Becky Lynch, Rhea Ripley, Stone Cold Steve Austin and Liv Morgan, with the existing local-art fallback chain retained.
- Season Road tiers are rebuilt as large full-width reward rectangles at roughly twice the previous mobile row height. Tier numbers are much larger and every tier now shows the reward visually: the actual collectible card, correct physical booster packet, or dedicated gold WWE Legacy UP medallion.
- Existing 50-tier reward values, claim state, Season XP, booster odds, Merch, Live Events, animation and save-schema behavior remain unchanged.
- Certification: focused **11/11**; full suite **1,078 / 909 passed / 72 inherited historical failures / 97 skipped**, with **0 added or removed failing names** vs v1.1.24. Validation **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; pack coverage **72/72 released Superstars**; collector IDs **930/930 / 0 issues**; flow **95 / 0 issues**.

# WWE Legacy v1.1.24 — Launch Poster Centering Hotfix

- Fixes the Season 1 launch poster being shifted right on iPhone.
- Root cause was inherited legacy `.splash-screen` padding still applying to the new full-viewport poster screen.
- The launch poster surface is now fixed to the real viewport with zero margin/padding and explicit horizontal/vertical centering.
- The poster frame also has zero margin/transform so the 768×1376 artwork remains uncropped and centered with equal side space whenever letterboxing is required.
- PLAY NOW remains poster-relative and scales with the same centered frame.
- Certification: launch/animation focused checks **9/9 passed**; full suite **1,072 / 906 passed / 72 inherited historical failures / 94 skipped** with **0 added or removed failure names**; validation **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector IDs **930/930 / 0 issues**; flow **95 / 0 issues**.
- No gameplay, animation, Merch, balance, roster, economy, progression or save-schema changes.

# WWE Legacy v1.1.23 — Animated Art Window Hotfix

- Repairs the new universal animated-card presentation so linked GIF/WebP media behaves as the **moving artwork layer only** rather than visually replacing the full collectible card shell.
- Animated media is now clipped inside the intended interior artwork window, preserving the normal card aspect ratio, outer frame, border treatment and lower identity plaque.
- Removes the extra live animation chrome layer from runtime card fronts, so cards keep the canonical built-in set logo / rarity presentation instead of trying to draw a second overlay on top.
- Card-family clip bounds are tuned so animation does not spill down behind the move/merch plaque area.
- Card Art Studio help copy now explicitly explains that animation is clipped into the artwork window while the standard shell stays intact.
- Cache/version stamping advances to **v1.1.23** for clean deployment pickup.
- Certification: focused animation assertions **8/8 passed**; full suite **1,071 discovered / 905 passed / 72 retained historical failures / 94 skipped**, with **0 added or removed failure names** vs v1.1.22; validation **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector audit **930/930 / 0 issues**; flow **95 / 0 issues**.
- No gameplay, balance, economy, save-schema, roster, progression or reward changes from v1.1.22.

# WWE Legacy v1.1.21 — Linked Animated URL CORS Fallback

- Fixes Card Art Studio direct animated URLs when a host allows normal GIF/WebP display but blocks JavaScript raw-byte `fetch()` with CORS.
- Studio now validates direct `.gif` / `.webp` links through a normal image load first. A successful display is saved immediately as a **Linked Animation** for the selected Entrance, Action or Finisher; CORS is not required.
- Linked animation URLs persist per card in same-origin browser storage, are restored when the card is reselected, have a dedicated animated preview and can be removed with **Remove Linked Animation**.
- Raw fetch/export is optional: hosts that allow CORS also enable **Export Animated Artwork**; hosts that block CORS keep linked playback working instead of showing the old `Failed to fetch` failure.
- Live runtime preference order is now **linked URL → packaged animated WebP → packaged GIF → static base plate**. If a linked host later fails, the game falls through automatically.
- No gameplay, Live Events, Merch, Trish, card-value, deck, economy, roster, booster, progression or save-schema changes from v1.1.20.
- Certification: focused **9/9** across v1.1.20+v1.1.21; full suite **1,067 / 901 passed / 72 inherited historical failures / 94 skipped**, with **0 added or removed failure names** vs v1.1.20; validation **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector audit **930/930 / 0 issues**; flow **95 / 0 issues**.

# WWE Legacy v1.1.20 — Live Events + Trish Corrections + Authored Merch + Animated URL Import

- Consolidates all tabled work after v1.1.19 into one build.
- Live Events now show exactly **3 towers per local day** from a combined launch-theme + specialist pool, with a **1-day cooldown** preventing an event from appearing on consecutive days.
- Adds Current RAW, Current SmackDown, Current NXT, women-only Evolution, SummerSlam, Golden Era, New Generation, Attitude Era and Ruthless Aggression launch-theme towers. Existing Submission Specialists, High Risk Showcase, Fight Night, Giants & Monsters, Legends Collide, Champions Clash, Method Masterclass and Evolution Showcase remain in rotation.
- **Birthday Bash is retired** from active Live Events; its old definitions remain only for compatibility with historical references/saves.
- Corrects Trish Stratus: **Air Canada** is now the 3★ Trademark at C6/D10/Technical 2; **Stratusfaction** is the 4★ Finisher at C9/D17/no Method requirement. Season reward labels and lead-off references are corrected too.
- Superstar Merch now supports authored identity ladders. Level 1 defaults to a **Funko Pop** for every Superstar. Trish's five items are Trish Stratus Funko Pop, Trish's Big Shots Pillow, 100% Stratusfaction Guaranteed DVD, Trish's Action Figure and 100% Stratusfaction Shirt.
- Merch fronts now show **MERCH · N MATCHES** while effect/rules text stays on the normal card back. Merch base-plate export clears the plaque footprint to true transparency so no opaque artwork block sits underneath the live plaque.
- Card Art Studio gains **Animated Artwork URL** import for direct GIF/animated-WebP media URLs. It preserves the original animated bytes rather than flattening them; CORS-blocked hosts can still use the local file picker.
- v1.1.19 animation eligibility remains Entrance / Action / Finisher only.
- Certification: v1.1.20 focused **5/5**; full suite **1,063 / 897 passed / 72 inherited historical failures / 94 skipped**, with **0 added or removed failure names** vs v1.1.19; validation **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector audit **930/930 / 0 issues**; flow **95 / 0 issues**.

## v0.99.00 — Critical-Fix-Only Release Candidate

- Promotes the feature-frozen v0.90.00 branch into the final **critical-fix-only** stage before v1.0. No gameplay, balance, economy, reward, progression or save-schema change is included.
- Records the external physical-iPhone RC gate as **passed-user-certified** after approximately a week and a half of sustained real-device testing by the project owner. The sandbox does not claim independent physical-device execution.
- Build metadata now records `criticalFixOnly: true` while retaining `releaseChannel: release-candidate`, `featureFreeze: true` and profile schema **v42**.
- v0.99 critical-fix/freeze invariants: **6/6 passed**.
- Full no-assets regression: **962 discovered / 858 passed / 94 intentionally skipped / 10 expected physical-asset-presence failures only**. There are **0 new gameplay/data/save/economy/routing failures**.
- All v0.90.00 certified launch results carry forward unchanged: Rules Matrix 23/23; 41-Superstar roster audit 16,400 matches / 0 stalls / 0 hard outliers; Ruby Cena 3,200 matches / 59.94%; economy Tier 50 day 28.1 mean; 164 Championship Road clears including 160 intentional mirror matches; 365-day Live Event certification with 0 unreleased reward leaks; save durability 6/6; 600-match long-session harness; static iPhone viewport audit 20/20.
- Distribution remains a verified **no-assets overlay package**.
- From this build until v1.0, only release-blocking defects qualify for change. If no blocker is reported, the next promotion is **v1.0.0**.

## v0.90.00 — Release Candidate + Feature Freeze

- Enters the formal **v1.0 release-candidate feature freeze**. No new modes, progression systems, launch-set releases, balance experiments or economy changes are permitted from this point unless they resolve a release-blocking defect.
- Build metadata now explicitly declares `releaseChannel: release-candidate` and `featureFreeze: true`; cache/version stamping is advanced to v0.90.00 without changing gameplay data or profile schema.
- Adds five RC freeze invariants covering build identity, certified launch-content counts, Ruby-only major reward sets, no-assets packaging and profile-schema stability. **5/5 passed**.
- Full no-assets regression: **961 discovered / 857 passed / 94 intentionally skipped / 10 expected physical-asset-presence failures only**. The 10 failures are unchanged tests that require omitted image/template files; no gameplay, data, save, economy or routing regression failed.
- Final gameplay balance rerun: **41 released Superstars / 16,400 matches / 0 stalls / 26.83 average turns / no hard outliers**. John Cena remains elite at 57.38% in the full-roster run and 59.94% in the dedicated Ruby-Cena 3,200-match audit.
- Economy certification rerun: target 30-match cadence still reaches Tier 50 on **day 28.1 mean**; structured reward ceiling remains **day 24**; Season booster distribution remains 4/3/3/3/3 across the five live launch sets.
- Structured-mode certification remains clean: **164 complete Championship Roads / 6,560 wins / 160 intentional mirror matches**, plus **365 days / 1,095 Live Event tower clears / 0 unreleased reward leaks**.
- Save durability remains **6/6**; long-session certification remains **600 matches / 0 stalls / ~2.36 MiB retained heap delta**; static iPhone viewport certification remains **20/20** across 320×568, 375×667, 390×844 and 430×932.
- Validation remains **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow, structured-effect, Counter-state, reverse printed-text, card-health/four-tier and Counter-density audits remain clean.
- The only remaining RC gate that cannot be completed inside the build sandbox is a **real-device iPhone Safari visual/interaction smoke test**. After that, development moves to **v0.99 critical-fix-only** and then v1.0.
- Distribution remains a verified **no-assets overlay package**.

## v0.19.00 — Save Durability + Performance + iPhone Certification

- Completed the code-side pre-v1.0 durability/performance/UI gate without changing gameplay balance or economy.
- Local profile persistence now keeps a rolling **last-known-good recovery copy** beside the primary save. Corrupt/truncated primary JSON automatically restores from that copy through the normal migration path.
- Rejected storage writes no longer throw through the game or clear the previous durable save. The current profile remains playable in-memory and My Legacy warns when persistence has fallen back to volatile session mode.
- `localStorage` access itself is guarded, so Safari/private/security modes that throw on the storage getter no longer abort startup.
- The current profile is flushed on **pagehide**, **beforeunload** and background visibility changes. Reset Progress clears primary/recovery metadata together.
- My Legacy Save & Backup now reports **Local Save Protected / Recovered / Needs Attention** while preserving the existing one-file external backup/import and one-step import rollback workflow.
- Long-session harness: **600 sequential matches / 0 stalls / 27.08 average turns / 50 max turns / 441 max log entries / 10,471-byte profile / ~2.4 MiB retained heap delta after explicit GC**.
- UI background work was reduced: global two-button-row MutationObserver work is coalesced and the one-second Season clock refresh pauses while the document is hidden.
- Final mobile containment layer adds `100svh` + `100dvh`, root horizontal-overflow guards and `width:100% / max-width:100% / min-width:0` constraints across launch screen families, plus a <=340px fallback for compact profile/save controls.
- Automated iPhone CSS/template guardrail audit covers **320×568 / 375×667 / 390×844 / 430×932** and passes **20/20 checks**. Interactive browser navigation is blocked in the build sandbox, so real-device/pixel smoke testing remains an RC gate.
- Verification: v0.19.00 targeted tests **7/7**; save durability **6/6**; Rules Interaction Matrix **23/23**; full no-assets suite **956 discovered / 852 passed / 94 skipped / 10 expected physical-asset failures only**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow/effect/Counter-state/printed-text/card-health audits all clean.
- No card stats/effects, Superstar balance, deck composition, pack odds/collation, XP, structured-mode rewards, pity, milestone thresholds, release state or collection ownership rules changed from v0.18.00.
- Distribution remains a **verified no-assets overlay package**.

## v0.17.01 — Championship Road Mirror Match Restoration

- Reverses the mistaken v0.17.00 no-self Championship Road change. **Mirror matches are intentional and remain part of Championship Road.**
- Every Road again uses the canonical 40-opponent launch map without replacing the selected Superstar's slot with John Cena.
- Each of the 40 launch-live Superstars therefore has exactly one mirror match on their Road. Cena continues to use the canonical 40 and has no self slot because he is not part of that canonical opponent map.
- Saves briefly migrated by v0.17.00 to a no-self route automatically restore the canonical opponent map while preserving stage, difficulty and clear history.
- All other v0.17.00 structured-mode protections remain intact: owned/released player eligibility, immutable Championship match-origin routing, structured restart/retry behavior, actual saved-route rendering, full 365-day Live Event certification and repaired Birthday Bash coverage.
- Championship certification: **41 released Superstars × 4 difficulties = 164 full Road clears**, **6,560 wins**, **1,640 checkpoint boosters**, **40 mirror-bearing launch Roads** and **160 mirror matches exercised across the four difficulties**.
- Verification: targeted structured-mode tests **11/11**; Rules Interaction Matrix **23/23**; full no-assets suite **944 discovered / 840 passed / 94 intentionally skipped / 10 expected physical-asset-presence failures only**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**.
- Distribution remains a verified no-assets overlay package. Next v1.0 gate remains **Season 1 completion experience + new-player onboarding certification/polish**.

## v0.16.02 — Reward Ruby Migration + Grandfathering

- Generalized the Cena Season 1 rule into a system-wide **major reward printing standard**: collectibles from `season-exclusive` and `future-reward` sets are Ruby-only and cannot materialize as Normal, Emerald or Sapphire.
- The rule currently covers **29 reward-exclusive collector identities** across Cena Season 1, the banked Final Boss reward, Goldberg Season 2 and parked Chyna content. Banked/future rewards remain unreleased and are not newly granted or booster-eligible.
- Profile schema advances to **v42**. Any reward-exclusive card already owned at Normal/Emerald/Sapphire automatically consolidates into Ruby on migration; saved-deck entries are rewritten to Ruby.
- Previously earned banked reward cards are now grandfathered instead of being removed by unreleased-content cleanup. A banked reward Superstar remains unlocked only when its Superstar card genuinely existed in the incoming save.
- Grandfathering snapshots incoming ownership **before** historical migration helpers run, so manually injected/unearned unreleased Superstar state still gets stripped and cannot manufacture future rewards.
- Current Season 1 Cena rewards and balance remain unchanged from v0.16.01; focused Ruby Cena audit remains **3,200 matches / 59.94% / 0 stalls / 24.64 average turns**.
- Regular booster/event-set cards keep the standard four-tier Normal / Emerald / Sapphire / Ruby system.
- First-month economy certification remains unchanged: target Tier 50 **day 28.1 mean**, structured ceiling day 24, and Season booster distribution **4 / 3 / 3 / 3 / 3** across the five live launch sets.
- Verification: v0.16.02 reward + inherited Cena targeted tests **9/9**; full no-assets suite **933 discovered / 829 passed / 94 skipped / 10 expected asset-presence failures only**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow/effect/Counter-state/printed-text/card-health audits clean; Rules Interaction Matrix **23/23**.
- Distribution remains a verified no-assets overlay package. Next v1.0 gate remains Championship Road + Live Events structured-mode certification.

## v0.16.01 — Cena Ruby Season Completion

- Corrected the Season 1 John Cena reward model so **all eight Cena-exclusive collectibles are Ruby-only**. Normal, Emerald and Sapphire versions of those cards no longer exist.
- Season 1 awards **5 Ruby copies each** of Protobomb, Five Knuckle Shuffle, STF and Attitude Adjustment, plus **1 Ruby** Hustle, Loyalty, Respect; Never Give Up; The Time Is Now; and John Cena Superstar.
- Ruby gameplay values are Protobomb **D11**, Five Knuckle Shuffle **D11**, STF **Pressure 8**, and Attitude Adjustment **D19**. Costs, Method requirements and effects remain unchanged.
- Added fixed-printing enforcement across tier materialization, ownership, Collection display and saved decks so requesting or loading a lower Cena printing resolves to Ruby.
- Tier 50 now assembles Cena's canonical **60-page best-owned deck** from the player's collection, using the highest owned printing for shared cards, keeps all Cena-exclusive entries at Ruby, and equips The Time Is Now. Missing shared cards are not gifted.
- Profile schema advances to **v41**. Existing lower-printing Cena Season rewards are migrated into Ruby ownership and saved deck tiers are repaired automatically; completed Cena profiles rebuild the best owned deck.
- Focused Ruby-Cena balance audit: **3,200 matches / 59.94% win rate / 0 stalls / 24.64 average turns**, keeping the Season completion reward in the intended elite high-50s/low-60s band.
- The complete v0.16.00 economy certification was rerun with no pacing change: target Tier 50 remains **day 28.1 mean**, and the structured ceiling remains day 24. No XP, pack quantity, odds, pity, UP or milestone values changed.
- Verification: v0.16.01 + inherited economy targeted tests **8/8**; Cena Ruby-specific tests **5/5**; Rules Interaction Matrix **23/23**; full no-assets suite **929 discovered / 825 passed / 94 skipped / 10 expected asset-presence failures only**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow/effect/Counter-state/printed-text/card-health audits all clean.
- Distribution remains a verified no-assets overlay package. Next v1.0 gate remains Championship Road + Live Events structured-mode certification.

## v0.16.00 — First-Month Economy + Progression Certification

- Completes the next pre-v1.0 gate with a reproducible 30-day Season simulation using the live Season XP, Daily/Weekly Challenges, free pack, Daily Live Event, Exhibition, booster collation, Superstar pity, duplicate-UP and Set Milestone systems.
- Fixed a real Season booster-distribution bug. v0.15.00's raw-tier modulo logic produced the 16 Season boosters as SummerSlam 4 / Evolution 2 / New Generation 0 / Golden Era 8 / Attitude Era 2. v0.16.00 cycles the actual booster reward ordinal across the five launch-live sets for a balanced **4 / 3 / 3 / 3 / 3** distribution. Unreleased sets remain ineligible.
- Target cadence certification (20 complete month simulations): 30 matches/day, all three Daily Live Events, 50% wins across the other 15 matches, all available challenge goals and live reward systems. Tier 50 was reached in 20/20 runs on day 28–29 (28.1 mean), with 210 mean packs, 67.9% mean released-card unique completion, 1362.8 mean UP and 8.2 mean total unlocked Superstars.
- XP pacing remains unchanged and certified: 20 matches/day under the same assumptions projects to 4,650 XP; 25/day to 5,025; 30/day to 5,400 raw XP. Thirty matches/day with only two Daily Challenge claims on average still projects to 5,100 XP.
- Structured reward ceiling (10 complete month simulations using Daily Live Events + MITB + KOTR inside the same 30-match/day cap): Tier 50 day 24, 269.1 mean packs, 72.8% mean unique collection, 1471.8 mean UP and 8.8 mean unlocked Superstars. Premium printing completion remains far from exhausted.
- Target cohort Set Milestones average 10.7 Base claims and 4.3 Emerald claims, with 0 Sapphire and 0 Ruby claims in month one. Mean printing pulls are 708.3 Normal / 243.4 Emerald / 75.3 Sapphire / 23.0 Ruby, with all premium collation caps preserved.
- Every target run verifies the full Tier 50 Cena payoff: Cena unlocked, 5 Normal copies each of Protobomb / Five Knuckle Shuffle / STF / Attitude Adjustment, plus Ruby The Time Is Now and Ruby John Cena Superstar.
- No Season XP value, reward quantity, booster size, pack odds, printing-tier weights, Superstar pity threshold, duplicate-UP rate, milestone threshold, card balance, match rule or release-state change was made beyond the Season booster set-distribution correction.
- Verification: v0.16.00 targeted tests 3/3; economy certification 20 target + 10 structured-ceiling simulations with all assertions passed; Rules Interaction Matrix 23/23; full no-assets suite 924 discovered / 820 passed / 94 skipped / 10 expected asset-presence failures only; validation 76 Superstars / 76 decks / 706 gameplay cards / 0 issues; collector audit 782/782 / 0 issues; flow, structured-effect, Counter-state, reverse printed-text and card-health/tier audits all clean.
- Distribution remains a verified no-assets overlay package. Next v1.0 gate: Championship Road + Live Events structured-mode certification.

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

## v0.14.21 — Cena Season Reward Power Pass

- Promoted John Cena into the intended elite Season 1 reward band after v0.14.20 confirmed that the corrected HLR trigger alone left him underpowered.
- Cena Lead Off 5 now opens with **Strength Momentum + Strike Momentum** rather than Strength + Technical, and his authored 12-page Momentum split becomes **5 Strength / 4 Technical / 3 Strike**.
- **Five Knuckle Shuffle** Strike requirement **2 → 1**, making Protobomb’s intended search chain consistently reachable. Cost 6 / Damage 10 / rarity remain unchanged.
- **STF** persistent Leg pressure **6 → 7**; Cost remains 9.
- **Hustle, Loyalty, Respect** keeps its once-only 50%-HP trigger and +2 Adrenaline reward but now **draws 2 pages** instead of 1.
- **Attitude Adjustment remains C11/D18**, preserving the established elite 18-Damage Cost premium.
- Cena HP remains 68; The Champ Is Here, The Time Is Now and Never Give Up are unchanged.
- Focused Cena simulation: **3,200 matches / 59.31% / 0 stalls / 25.04 average turns**.
- Full released-roster audit: **41 Superstars / 16,400 matches / 0 stalls / 26.74 average turns**; Cena finishes **493–307 (61.63%)**, behind Oba Femi and Roman Reigns and inside the intended high-50s/60 Season-reward band.
- Verification: v0.14.21 targeted tests **4/4**; focused regression set **11/11**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow/card-effect/counter-state audits **0 issues**; full no-assets suite **883 discovered / 779 passed / 94 skipped / 10 expected asset-presence failures**.
- Distribution remains a **verified no-assets overlay package**.

## v0.14.22 — Live Event Rematch Progress Hotfix

- Fixed the Daily Live Event result-routing bug where a completed Live Event could be treated as an Exhibition match, expose **REMATCH**, and route that button into an Exhibition instead of the active tower.
- Match launch mode is now snapshotted for the full lifetime of the match rather than relying on mutable navigation/setup `activeMode` state at result time.
- Live Event tower identity is snapshotted with the match so the correct tower always receives the win/loss result.
- Challenges, career records, rewards and structured-mode progression now read the immutable match snapshot when a match completes.
- Live Event result screens cannot render the Exhibition **REMATCH** action; their CTA remains **RETURN TO TOWER**.
- Defensive restart routing also uses the immutable snapshot, so a stale Rematch control cannot convert a Live Event retry/continuation into Exhibition.
- Existing tower rules are unchanged: losses retry the current stage with no progress loss; wins advance exactly once; clear rewards and Daily Live Event XP remain unchanged.
- Verification: v0.14.22 targeted tests **4/4**; Live Event persistence/retry **6/6**; focused Live Event/UI regressions **32 passed / 0 failed / 1 skipped**; full no-assets suite **887 discovered / 783 passed / 94 skipped / 10 expected asset-presence failures**; validation/collector/flow/card-effect/counter-state audits all report **0 issues**.
- Distribution remains a **verified no-assets overlay package**.


## v0.14.23 — Live Event Opening Superstar Switch

- Daily Live Event towers now allow the player to **change to any owned, player-visible Superstar while Match 1 is still unbeaten**.
- The switch remains available after any number of Match 1 losses because a loss leaves tower progress at 0/5.
- The moment Match 1 is won and the tower advances to Match 2, the selected Superstar is **locked for the remainder of that tower**.
- Active Match 1 detail screens expose a compact **CHANGE SUPERSTAR** control. It opens an owned-Superstar selector without expanding the fixed iPhone event-detail layout.
- Tower setup copy now explicitly says the Superstar **locks after Match 1 is won**, replacing the old “locked once started” wording.
- Changing Superstar preserves the existing opponent route wherever possible, preventing the selector from becoming a free route-reroll mechanic. If the newly selected Superstar is already scheduled as an opponent, only the invalid self-match is repaired with an eligible replacement.
- The data layer independently rejects unowned/unreleased Superstar choices and rejects all changes once the run has advanced beyond stage 0.
- Existing Live Event win/loss progress, one-pack clear reward, Daily Live Event XP, result routing and rematch hotfix behavior are unchanged.
- No card stats/effects, Superstar balance, decks, pack odds/collation, Season XP, Championship Road, pity, release state or collection ownership changed from v0.14.22.
- Verification: v0.14.23 targeted tests **5/5**; combined Live Event routing/switch/UI regression set **18/18**; full no-assets suite **892 discovered / 788 passed / 94 skipped / 10 expected asset-presence failures**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow/card-effect/counter-state audits **0 issues**.
- Distribution remains a **verified no-assets overlay package**.

## v0.14.24 — Counter-State Clarity Pass

- Renamed the Move card-back field **COUNTER STATE** to **CAN BE COUNTERED AS** so the exposed state is no longer confused with a reversal ability.
- A card such as Razor's Abdominal Stretch now reads **CAN BE COUNTERED AS · Rear Control**; this describes how the defender may respond and does not imply the move reverses Rear Control.
- Actual defensive state-reversal abilities retain the separate **REVERSES** label.
- Collection and Deck Lab text summaries now use **Countered as** for the same exposed-state metadata.
- Expanded the Rulebook Counter State glossary to distinguish an incoming Move's exposed state from a card's actual reversal capability.
- No Counter legality, Counter State mapping, Submission targeting, card stats/effects, Superstar balance, decks, rewards, progression, pack odds/collation, release state or collection ownership changed from v0.14.23.
- Verification: v0.14.24 targeted tests **3/3**; focused counter-system + v0.14.24 selection **25 passed / 0 failed / 1 intentionally skipped**; full no-assets suite **895 discovered / 791 passed / 94 skipped / 10 expected asset-presence failures only**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow/card-effect/counter-state audits **0 issues**.
- Distribution remains a **verified no-assets overlay package**.

## v0.14.25 — Roster Balance + Reactive Control Consistency

- **Oba Femi:** The Ruler once-per-match draw now requires a **C7+ Strength Move** instead of C6+.
- **Roman Reigns:** Tribal Chief now offers only after one of Roman’s **non-Finisher Moves is successfully Countered**. It no longer triggers from a pass, failed pin/kickout, or other generic Control loss.
- **Doink the Clown:** HP **62 → 63**; Stump Puller persistent Leg pressure **6 → 7**.
- **Becky Lynch:** HP **65 → 67**; Dis-arm-her persistent Arm pressure **6 → 7**.
- **Mr. Perfect:** HP **64 → 65**. Perfect Execution keeps its once-per-Control-sequence −2 Technical Cost payoff, while the first **3** successful Counters each match now also **draw 1 + gain 1 Adrenaline**.
- Standardized reactive Control effects: **Best in the World** and **Shoulder Up** now stop the Pin and then use normal failed-pin Control rules; **Welcome to the KO Show** cancels the utility and spends that Action/Support window without stealing Control; **The Deadman Rises** and **Veteran Instincts** now describe the normal Control transfer already produced by a kickout/Counter.
- Counter-specific retention cards already using narrow triggers (including Bloodline Rules, Hammer in the Boot and 173–0) remain unchanged.
- Focused released-roster simulations (800 matches each, 0 stalls): **Oba 58.25%, Roman 60.75%, Doink 48.63%, Becky 45.88%, Mr. Perfect 49.38%, Punk 49.63%, Kevin Owens 54.75%, Cena 61.50%**.
- Full released-roster round robin: **41 Superstars / 16,400 matches / 0 stalls / 26.80 average turns**. Key post-pass results: **Roman 61.4%, Cena 61.1%, Kevin Owens 59.0%, Oba 55.8%, Punk 49.1%, Doink 46.0%, Becky 45.6%, Mr. Perfect 45.3%**.
- No changes to pack odds/collation, Season XP, Daily Live Event XP, Championship Road, pity, release state or collection ownership.
- Distribution remains a **verified no-assets overlay package**.


## v0.14.26 — Move Health + Lower-Roster Balance

- Completed the approved move-health pass and added a reverse **printed-text → runtime** audit so promises written on cards are checked against actual implementation, not only structured-effect data. Current result: **706 gameplay cards / 0 issues**.
- Fixed live/runtime mismatches for **Bulldog** (opponent ditches 1), **Cody Rhodes — Disaster Kick** (+1 additional Adrenaline), **Swanton Bomb** (Grounded-only), **Running Uppercut** (Rear Control + Neck/Head Submission reversals), and **Oba Femi — One-Handed Backbreaker** (+3 persistent Back damage).
- Enforced `standingOnly` for ordinary proactive Moves at engine level. Owen Hart’s Missile Dropkick and every other authored Standing-only Move now obey the printed restriction.
- Counter windows now use the incoming Move’s exposed Counter state/Submission target rather than proactive Standing/Grounded restrictions, preventing stale posture state from invalidating a legal reversal.
- Preserved intended same-Control setup chains despite strict Standing-only enforcement by explicitly allowing **Exploder → Helluva Kick, Pump Kick → Jaded, Military Press Powerslam → Goldberg’s Spear, and Goldberg’s Spear → Jackhammer** to use their searched follow-up after the named setup.
- Rewired **Bron Breakker’s Spear** to the live prior-Agility discount implementation.
- Gave **Schoolboy Roll-Up, Bridging German Suplex and British Bulldog’s Crucifix** a real quick-pin identity: their immediate Amber/Red Pin applies **−5 percentage points to kickout chance**.
- Certified rarity health: released **3★ Rare Trademarks** average **C5.43 / D8.06 / 1.52 Damage-per-Cost** versus released **2★ Uncommon Moves** at **C5.11 / D6.66 / 1.30**. Zero-Damage Submission Trademarks make raw Damage-only comparisons misleading at some individual Cost bands, so rarity remains a total-package standard rather than a blanket Damage rule.
- Certified four-tier scaling with **0 issues**: Sapphire remains authored baseline; Normal/Emerald/Sapphire/Ruby apply **−2 / −1 / 0 / +1** to Move Damage and Submission Pressure where applicable.
- Lower-roster balance: **Piper** Sleeper Hold P7 + Hot Rod 3 uses; **Owen** HP65 + Sharpshooter P7; **Charlotte** HP66 + Genetically Superior 3 uses; **IYO** Over the Moonsault D17 + Genius of the Sky 3 uses; **Austin** Glass Shatters +2 starting Adrenaline; **Jake Roberts** HP66 + Jake’s DDT D17; **Triple H** HP68 + Cerebral Assassin qualifying Grapple +2 Damage.
- Final released-roster simulation: **41 Superstars / 16,400 matches / 0 stalls / 26.83 average turns**, with 13,835 Pins and 2,565 Submissions. Key rates: Roman 60.3%, André 59.6%, Cena 59.3%, Charlotte 47.6%, Owen 46.6%, Piper 46.5%, Jake 45.3%, IYO 44.3%, Triple H 43.5%. Austin remains a measured watchlist outlier at 41.3%; no extra unapproved stat package was silently added.
- Dedicated Counter-density audit: average **14.07 structural Counter pages** per released deck and **15.07 effective reactive-defense pages** including Once Too Often, range **9–24**. All 41 released decks cover all **8 Counter states + 4 Submission targets**. Highest density is Liv Morgan 24, then Mankind 21 and Shawn Michaels/Stephanie Vaquer 20. Density has essentially zero linear relationship with current CPU win rate (Pearson ≈ 0.03), so no blind deck-wide pruning was bundled into this build.
- Verification: v0.14.26 targeted tests **9/9**; full no-assets suite **909 discovered / 805 passed / 94 skipped / 10 expected asset-presence failures only**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow/card-effect/counter-state/printed-effect/tier audits all report **0 issues**.
- Distribution remains a **verified no-assets overlay package**.

## v0.14.27 — Counter Density + Focused Balance

- Applied the approved targeted Counter-density cleanup rather than forcing every deck to one reversal count.
- **Liv Morgan 24→17**, **Mankind 21→17**, **Stephanie Vaquer 20→18**, **Gunther 19→17**, **IYO SKY 19→18**, **Oba Femi 19→17**, **Paige 19→18**, **Rhea Ripley 19→18** effective reactive-defense pages.
- All affected decks remain exactly 60 pages and retain **8/8 Counter-state + 4/4 Submission-target coverage**.
- **Shawn Michaels remains at 20** effective reactive pages by design. Candidate pruning materially weakened his already non-elite result, so his offensive reversals are treated as archetype-critical rather than redundant.
- Released-roster average structural Counter density falls **14.07→13.59**; effective density including Once Too Often falls **15.07→14.59**; range becomes **9–20**. Final density/win-rate Pearson remains effectively zero at approximately **−0.05**.
- **Stone Cold Steve Austin:** HP **66→67**; And That’s the Bottom Line first-Countered-Move rewards **2→3 uses**.
- **Ted DiBiase:** HP **65→67**; his existing Million Dollar Championship / Everybody Has a Price / Million Dollar Dream package is otherwise unchanged.
- **Mr. Perfect:** HP **65→66**; Absolutely Perfect starting Adrenaline **+1→+2**, with physical Entrance card data synchronized.
- **Triple H:** Cerebral Assassin qualifying Grapple bonus **+2→+3 Damage**; runtime execution is regression-tested.
- Final released-roster audit: **41 Superstars / 16,400 matches / 0 stalls / 26.75 average turns**. Austin **46.9%**, Mr. Perfect **46.3%**, Ted **45.6%**, Triple H **45.5%**. Cena remains elite at **57.4%**, Roman **57.5%**, André **61.4%**.
- Current lower watchlist after redistribution: Shawn Michaels **41.4%**, Kurt Angle **41.4%**, IYO SKY **42.9%**. No silent post-audit buffs were added.
- Verification: v0.14.27 targeted tests **5/5**; full no-assets suite **914 discovered / 810 passed / 94 skipped / 10 expected asset-presence failures only**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow/card-effect/counter-state/printed-effect/card-health audits all clean.
- Distribution remains a **verified no-assets overlay package**.

## v0.14.28 — Watchlist Balance Pass

- Resolved the remaining v0.14.27 lower-roster watchlist with a narrow Shawn Michaels / Kurt Angle / IYO SKY pass rather than another broad roster sweep.
- **Shawn Michaels:** HP **61 → 64**; Flying Forearm Damage **6 → 7** at unchanged Cost 4. Heartbreak Kid, The Showstopper, Sweet Chin Music and his intentionally preserved high Counter-density archetype remain unchanged.
- **Kurt Angle:** HP **65 → 66**; Ankle Lock persistent Leg pressure **6 → 7**. Olympic Gold Medalist and Angle's Action/technical package remain unchanged.
- **IYO SKY:** HP **57 → 58** only, preserving her role as one of the roster's lowest-HP high-agility Superstars. Genius of the Sky and Over the Moonsault remain unchanged.
- Focused released-roster audits, 800 matches each / 0 stalls: Shawn **48.00%**, Kurt **49.00%**, IYO **46.25%**.
- Final released-roster audit: **41 Superstars / 16,400 matches / 0 stalls / 26.77 average turns**; Shawn **46.5%**, Kurt **46.9%**, IYO **45.0%**. Cena remains **56.5%**, Roman **57.4%**, André **61.4%**.
- Counter density is unchanged from v0.14.27: **13.59** structural / **14.59** effective average, **9–20** effective range, **41/41** decks retain 8/8 Counter-state and 4/4 Submission-target coverage; density/win-rate correlation remains approximately **−0.04**.
- Card-health remains clean. Released 3★ Rare Trademarks now average **D8.07 at C5.43 / 1.52 D:C**, remaining clearly ahead of released 2★ Uncommon Moves at **D6.66 at C5.11 / 1.30 D:C**. Four-tier scaling issues remain **0**.
- Verification: v0.14.28 targeted tests **4/4**; full no-assets suite **918 discovered / 814 passed / 94 skipped / 10 expected asset-presence failures only**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow/card-effect/counter-state/printed-effect/card-health audits all clean.
- Distribution remains a **verified no-assets overlay package**.

## v0.15.00 — Final Gameplay Certification

- Began the pre-v1.0 certification track with a new **23-case Rules Interaction Matrix** covering the highest-risk combinations across Control, Counters, Pins, Submissions, Stun, Auto Counter, Once Too Often, reactive Superstar cards, Action cancellation, Playbook recycling and posture restrictions. **23/23 pass**.
- Removed the duplicate identical `attemptPin()` / `_pinChance()` block from MatchEngine and added a regression requiring one canonical Pin implementation. No intended Pin-rule change.
- Final balance confidence testing identified **Becky Lynch** as the only released Superstar repeatedly sitting on the intervention edge. Her focused HP67 result was **42.88%** over 1,600 released-roster matches; HP68 tested at **44.50%** and HP69 at **45.88%**. Final change: **Becky Lynch HP 67 → 69**. Her moves, ability and deck remain otherwise unchanged.
- Final two-seed released-roster certification combines **32,800 CPU-vs-CPU matches / 1,600 per Superstar / 0 stalls / 26.82 average turns / 27,590 Pins / 5,210 Submissions**.
- No hard balance outliers remain under the launch intervention gates using 95% Wilson intervals. Key results: André **61.44%**, Bret **58.75%**, Brock **58.44%**, Cody **57.44%**, Roman **57.12%**, Cena **56.50%**. Lower edge: Becky **44.38%**, Doink **44.31%**, Piper **43.94%**, Paige **43.81%**.
- Existing card-health and Counter-density certification remains clean: **706/706** printed-effect runtime checks, **390** structured effect-bearing cards / 0 issues, **517** Counter-state Moves / 0 issues, four-tier scaling 0 issues, released 3★ Rare Trademarks remain ahead of 2★ Uncommons on overall authored efficiency, and all 41 released decks retain 8/8 Counter-state + 4/4 Submission-target coverage.
- Verification: v0.15.00 targeted tests **3/3**; Rules Interaction Matrix **23/23**; full no-assets suite **921 discovered / 817 passed / 94 skipped / 10 expected asset-presence failures only**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow/card-effect/counter-state/printed-effect/card-health audits all clean.
- Distribution remains a **verified no-assets overlay package**.

## v0.18.00 — Season 1 + Onboarding Certification

- Completed the next pre-v1.0 gate: **Season 1 completion experience + new-player onboarding certification/polish**.
- Tier 50 now raises a dedicated, persistent **Season 1 Complete — The Last Time Is Now** celebration instead of queuing Cena through the generic Superstar unlock presentation.
- The Season completion screen confirms the complete **24-copy Ruby-exclusive Cena package** and the status of Cena's authored 60-page deck, with direct actions to **Play as John Cena**, open **Deck Lab**, or return to the completed Season Road.
- Tier 50 sets the dedicated completion celebration pending before UI rendering, so an immediate close/reload cannot silently lose the reward moment. Dismissing it marks the presentation seen without altering the claimed reward.
- Cena's established Ruby reward contents and balance are unchanged: 5× each exclusive Move plus Ruby HLR, Never Give Up, The Time Is Now and Ruby John Cena.
- Starter onboarding remains CM Punk/Roman Reigns with a complete 60-page Normal deck, Amazing Entrance access and 5 Normal copies of every Momentum Method.
- The Welcome Superstar reveal now includes a compact horizontal **Match Basics** rail explaining Momentum, Control, Adrenaline, Counters and finishing before the player enters the main game.
- The first-match coach is now state-aware and teaches **Build Momentum → Control the Match → Defend with Counters → Finish the Match**, with a Submission-specific explanation when a Submission battle is active. It can still be hidden and automatically ends after the first completed match.
- New certification harness verifies **2/2 starter paths**, **5/5 Welcome set paths**, all resulting decks **60/60 playable pages**, and the Tier 50 Cena completion package/deck/celebration state.
- Verification: v0.18.00 targeted tests **5/5**; focused onboarding/Cena/Welcome selection **15 passed / 0 failed / 2 intentionally skipped**; Rules Interaction Matrix **23/23**; full no-assets suite **949 discovered / 845 passed / 94 skipped / 10 expected asset-presence failures only**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; collector audit **782/782 / 0 issues**; flow/card-effect/counter-state/printed-effect/card-health audits all clean.
- No card stats/effects, Superstar balance, deck composition, pack odds/collation, Season XP, Daily Live Event XP, Championship rewards, pity, milestone thresholds, release state or collection ownership rules changed from v0.17.01.
- Distribution remains a **verified no-assets overlay package**.


## v1.0.0 — Launch Release + WWE Legacy Web App Icon

- Promoted the fully certified **v0.99.00 Critical-Fix-Only Release Candidate** to the first stable WWE Legacy release.
- Build/package/cache identity is now **1.0.0** with `releaseChannel: stable` and `launchStatus: released`.
- The certified physical-iPhone Safari/gesture gate remains recorded as **passed-user-certified** and the profile schema remains **v42**.
- Added the user-supplied black-and-gold WWE Legacy logo as the canonical launch/web-app brand asset.
- Added exact resized derivatives for **180×180 Apple touch icon**, **192×192 PWA/browser icon**, and **512×512 PWA icon**; the 192 icon also powers the in-app top-bar brand button.
- Corrected the manifest 512 icon path to `assets/images/app-icon-512.png` and stamped all web/module/icon cache references to **v1.0.0**.
- No gameplay, card stats/effects, Superstar balance, authored deck composition, economy, progression, rewards, Season XP, Daily Live Event XP, Championship Road, pack odds/collation, pity, release-state, collection-ownership rules or save/profile schema changed from v0.99.00.
- Distribution is a **verified app-icon overlay**: it includes only the launch logo/icon assets and intentionally relies on the existing installed gameplay-art library for all other physical assets.
- Updated historical/version-certification guards and the cache-stamping utility to accept **1.x semantic versions**, preventing the pre-v1 `0.x` assumptions from falsely rejecting the stable launch build; no gameplay/runtime rule change.
- v1.0.0 certification: dedicated launch/icon invariants **6/6**; full overlay suite **962 discovered / 858 passed / 94 skipped / 10 expected missing gameplay-art assertions only**; Rules Matrix **23/23**; validation **76/76/706 / 0 issues**; collector audit **782/782 / 0 issues**; released-roster sim **16,400 matches / 0 stalls / 0 hard outliers**; Ruby Cena **3,200 / 59.94% / 0 stalls**; save durability **6/6**; long session **600 / 0 stalls**; static iPhone checks **20/20**.

## v1.0.1 — Launch Splash Branding Hotfix

- Replaced the old CSS-built WWE / silver LEGACY splash wordmark on the launch/continue screen with the **user-supplied black-and-gold WWE Legacy logo**, matching the canonical v1.0 web-app icon identity.
- Added `branding-wwe-legacy-lockup.png`, a **non-generative crop/derivative of the supplied logo** optimized for the wide splash-header slot; no artwork was redesigned or synthesized.
- The existing 180×180, 192×192 and 512×512 installable web-app icons remain the supplied-logo derivatives from v1.0.0.
- No gameplay, card data, Superstar balance, decks, economy, progression, rewards, pack collation/odds, release state, collection ownership or save/profile schema changed.
- v1.0.0 remains the immutable launch baseline; this is an explicit **v1.0.x presentation hotfix** for launch-brand consistency.

## v1.0.2 — Launch Regression Hotfix

- Restores correctly proportioned play-pile card inspection and binds the inspector to the actual Normal / Emerald / Sapphire / Ruby printing that was played.
- Corrects tier-adjusted Submission effect copy on card backs; confirmed Normal Guillotine now presents +1 rather than the authored Sapphire +3 pressure.
- Restores a one-screen iPhone Pack Complete layout and makes every result tile tappable for the ~60% viewport card inspector.
- Daily Live Event countdowns now use compact `Hh:MM:SS` presentation with no redundant zero-day field.
- Restores the defender Submission status as a true overlay instead of an inline panel that pushes the match page downward.
- Defender draws 1 page after each successful Submission pressure application before the next response window. Locked non-Finisher Submissions can now be Auto Countered under the normal escalating cost / two-pages-remaining rule; Finisher Submissions remain protected.
- Restores Tier Up as a full-viewport iPhone reward celebration with the reward occupying the available central space and Continue anchored toward the lower safe area.
- No profile-schema, economy, pack-odds/collation, release-state, progression-reward or authored card-stat changes. Profile schema remains v42.
- Verification: dedicated v1.0.2 regression **4/4**; focused inherited sample **15/15**; full overlay suite **969 discovered / 865 passed / 94 skipped / 10 expected missing gameplay-art assertions only**; Rules Matrix **23/23**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; printed-effect audit **706/0**; collector/card-ID audit **782/782 / 0 issues**; save durability **6/6**; static iPhone checks **20/20**; long-session **600 matches / 0 stalls**.
- Final gameplay balance rerun after the intended Submission-defense correction: **41 Superstars / 16,400 matches / 0 stalls / 26.86 average turns**. Doink the Clown **38.25%** and Rowdy Roddy Piper **35.50%** are now low hard outliers. No compensating balance changes were silently added; this consequence is recorded for a later explicit balance decision.
- Ruby Cena remains elite and stable at **3,200 matches / 60.75% / 0 stalls**.

## v1.0.3 — Card Identity + Doink/Piper Balance

- Repairs the v1.0.2 Doink/Piper hard-low balance results through **non-Submission pin-damage routes** rather than inflating their Submission pressure.
- **Doink:** 2× Reverse Chinlock → 2× Alabama Slam. Stump Puller, HP and The Joke’s on You! remain unchanged. Final full-roster rate: **46.63%**.
- **Piper:** 2× Neckbreaker → 2× Alabama Slam and 1× Atomic Drop → 1× Running Big Boot, while retaining all 4× Running Knee copies. Sleeper Hold pressure remains unchanged. Final full-roster rate: **42.88%**, no longer a hard outlier.
- Introduces a priority card-identity invariant: different-name exact mechanical clones are no longer allowed when they are **same-set duplicates**, carry a **rarity mismatch**, or involve a **Superstar-exclusive/signature Move**. Same-name reprints and basic cross-set Common templates remain valid.
- **Brainbuster** is differentiated from Alabama Slam with **+1 persistent Head damage on Connect** while retaining C6 / D10 / Technical 2 / Grapple / grounds-opponent.
- Differentiates the remaining priority same-set/rarity/signature exact-clone groups with restrained thematic secondary effects using existing supported mechanics; no new engine effect type or save field is introduced.
- Verification: v1.0.3 targeted tests **4/4**; full overlay suite **973 discovered / 869 passed / 94 skipped / 10 expected missing-art assertions only**; Rules Matrix **23/23**; validation **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**; printed effects **706/706**; card IDs **782/782**; save durability **6/6**; iPhone static UI **20/20**; long session **600 / 0 stalls**.
- Final released-roster audit: **41 Superstars / 16,400 matches / 0 stalls / 26.80 average turns / 0 hard outliers**. Ruby Cena: **3,200 / 60.41% / 0 stalls**.
- Profile schema remains **v42** and the approved black/gold WWE Legacy launch branding/web-app icons remain unchanged. Distribution remains a verified **app-icon/branding overlay package**.


---

# v1.1.0 — Major Expansion: Ruthless / Trish / Premium Asset Reset

**Released:** 29 August 2026

- Expands the player-facing set structure to nine sets: RAW, SmackDown, NXT, Evolution, SummerSlam, Golden Era, New Generation, Attitude Era and Ruthless Aggression. Hall of Fame is retired; other future authored sets remain banked.
- Completes SmackDown Series 1 at eight Superstars and launches NXT Series 1 with eight Superstars.
- Adds Ruthless Aggression Series 1: John Cena, Randy Orton, Batista, JBL, Eddie Guerrero, Edge, Jeff Hardy and Rob Van Dam. Cena moves out of Season 1; Randy moves out of the banked Survivor Series set with the vacated collector-code range reserved rather than renumbering later cards.
- Replaces the Season 1 Cena chase with **Trish Stratus** and updates the reward road/presentation to Trish's completion package and **STRATUSFACTION GUARANTEED** identity.
- Adds **Survivor Series** 4v4 capture mode with the WWE Legacy logo at the center of a 3×3 board, alternating challenge turns and 8–0 victory condition.
- Adds **Daily Spin**: one free eight-segment spin per 24 hours with stored-result animation and meaningful progression/economy/pack/Merch rewards.
- Adds **Merch** consumables. Every booster is exactly **4 collectible cards + 1 guaranteed Merch card**. There are 515 authored Merch cards: 40 generic and exactly five stronger Superstar-specific items for each of 95 Superstars. Merch lasts 1/3/5 matches, one item may be active, and Merch never stacks.
- Adds **95 Ultra Rare Superstar Variants**. Variants require the base Superstar to equip, do not create separate roster identities/decks, grant +5 HP and one bounded premium extra ability/passive.
- Adds **Diamond** as the fifth/final printing tier: Normal → Emerald → Sapphire → Ruby → Diamond.
- Completes the premium card-presentation pass with stronger runtime tier glows/effects and canonical base-plate paths for every non-Momentum collector card.
- Resets gameplay-art naming to readable kebab-case `assets/images/` paths. `ASSET-MIGRATION.csv` contains 1,825 logical rows resolving to 3,270 unique gameplay-art file targets; `IMAGE-PATH-GUIDE.md` is the naming source of truth for the user's full GitHub image-library rebuild.
- Final balance corrections: Trick Williams swaps 2× Dropkick to 2× Running Big Boot; Danhausen swaps 3× DDT to 3× Brainbuster and 2× Big Boot to 2× Running Big Boot. Jeff Hardy's Swanton Bomb and Rob Van Dam's Split-Legged Moonsault are correctly flagged grounded-opponent-only.
- Final released-roster certification: **73 Superstars / 52,560 matches / 0 stalls / 26.31 average turns / 0 hard outliers**. Trick finishes at 45.49%; Danhausen 43.54%.
- Validation: **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**. Collector audit: **930/930 / 0 issues**. Printed-effect audit: **835/835**. Rules Matrix **23/23**. Save durability **6/6**. Static iPhone viewport certification **20/20**. Long-session certification **600 matches / 0 stalls**.
- Profile schema advances to **v43**. Official black/gold WWE Legacy launch branding/app icons remain unchanged.
- Distribution remains a code/data/branding overlay. Full gameplay art is intentionally omitted because the GitHub image library is being rebuilt from the canonical v1.1 paths. Physical-iPhone v1.1 smoke certification remains pending until that artwork is uploaded.


## v1.1.1 — Action Consolidation + Search-Friendly Asset Naming

- Retires **Support** as a player-facing card type. The four existing Support identities — Crowd Support, What?, People’s Championship and Hustle, Loyalty, Respect — are migrated in place to **Action** cards with the same IDs, ownership and core effects.
- Migrated persistent effects now consume the normal one-Action-per-turn channel and are limited to one play of that card per match.
- Removes Support from Deck Lab / Collection filters, rules copy and Card Art Studio categories.
- Renames Trick Williams’s Action from **Whoop That Trick** to **Trick Willy** so the Entrance alone owns **Whoop That Trick**.
- Locks Action image naming to `<actual-name>-action-<superstar-id>.webp` for Superstar Actions and `<actual-name>-action.webp` for generic Actions. Base plates use the same stem plus `-base-plate`.
- Updates the canonical asset migration manifest before the new GitHub artwork rebuild begins.
- Certification: dedicated v1.1.1 invariants **6/6**; validation **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector audit **930/930**; printed effects **835/835**; Rules Matrix **23/23**; save durability **6/6**; iPhone static viewport checks **20/20**; long session **600 matches / 0 stalls**.
- Nine released recommended decks already use one or more migrated persistent Actions, so v1.1.1 receives a fresh full-roster balance gate rather than carrying v1.1.0 forward.
- Final balance corrections caused by the unified Action economy: André the Giant swaps 1× Double Underhook Suplex → 1× Military Press Slam; Montez Ford preserves his Lead Off Dropkick and swaps the other 2× Dropkick → 2× Running Big Boot.
- Final v1.1.1 roster certification: **73 Superstars / 52,560 matches / 0 stalls / 26.27 average turns / 0 hard outliers**. André finishes at 58.61%; Montez at 41.60%.
- Historical all-version test comparison finds the exact same 72 superseded-contract failures as v1.1.0 and **0 new historical-suite failures**.

## v1.1.2 — Card Studio Superstar Library + Printing Plates

- Makes a base/printing plate mandatory for **every collectible/card-like item**, including Superstar cards, Moves, Actions, Entrances, Managers, Momentum, Merch and Superstar Variants.
- Confirms **1,540/1,540** card-like items have unique non-empty base-plate targets: 930 collector cards, 515 Merch cards and 95 Superstar Variants. All **95/95 Superstar cards** have dedicated `<superstar-id>-superstar-base-plate.webp` targets.
- Expands Card Studio to the complete **1,540-item** card ecosystem instead of collector cards alone.
- Adds a Superstar-first **Complete Superstar Library** filter combining that Superstar's collector card, recommended-deck pages, exclusive/specific cards, Actions/Entrances, five linked Merch cards and Variant cards. Adds specific-only and recommended-deck-only scope filters.
- Adds card-type filtering for Superstar, Superstar Variant, Move, Entrance, Manager, Action, Momentum and Merch. Support remains retired.
- Adds an on-screen Superstar library summary with total / deck / Action / Merch / Variant counts.
- Changes Studio production export paths to the canonical runtime/migration paths: readable finished front, matching `-base-plate.webp`, and `<superstar-id>-headshot.webp`. Deprecated `card-layered-*` and `card-custom-*` export namespaces are removed.
- Updates `ASSET-MIGRATION.csv`, `IMAGE-PATH-GUIDE.md` and packaging so the image-path guide ships with the overlay.
- No gameplay, deck, balance, economy, booster, progression, release-state or profile-schema change; profile schema remains **v43**. The certified v1.1.1 **73-Superstar / 52,560-match / 0-stall / 0-hard-outlier** balance result therefore carries forward.
- Verification: dedicated v1.1.2 tests **5/5**; focused current Studio/Action group **14/14**; validation **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector IDs **930/930**; printed effects **835/835**; plate audit **1,540/1,540**; canonical Studio/manifest path audit **1,540/1,540 / 0 mismatches**.
- Historical corpus: **996 tests / 830 passed / 72 superseded-contract failures / 94 skipped**. The failing-test names are the exact same 72 retained historical contracts as v1.1.1, so v1.1.2 introduces **0 new historical-suite regressions**.



## v1.1.3 — Premium Card Frame + Reward Redesign + Set Logos
- Supersedes **v1.1.2 — Card Studio Superstar Library + Printing Plates** as the current working baseline.
- Locks a focused presentation/art-system pass for the rebuilt gameplay image library.
- Standard card redesign target is now explicitly the **lower information banner / plaque only**: card name, cost, damage, requirement and type line receive a more premium layout with larger iPhone-first typography.
- Explicitly preserves the existing **rarity stars** and **top set-name / set-logo area placement**.
- Adds a separate **reward-card premium frame direction**, including logo/branding integration for earned/reward cards.
- Locks the supplied **Ruthless Aggression** branding as the approved set-logo source and adds the canonical runtime target `assets/images/set-logos/ruthless-aggression-set-logo.webp`.
- Locks the **official WWE.com NXT logo** as the approved NXT branding source and adds the canonical runtime target `assets/images/set-logos/nxt-set-logo.webp`.
- Both set logos are expected as transparent-background **WEBP** runtime assets.
- No gameplay, economy, deck or roster structure changes; v1.1.2 certification carries forward.
- Packaging: artwork-reset overlay only; use `ASSET-MIGRATION.csv` and `IMAGE-PATH-GUIDE.md` as the source of truth when rebuilding the GitHub artwork library.

## v1.1.4 — Premium Card Frame + Reward Identity + Set Logos
- Implements the presentation work that v1.1.3 only specified; v1.1.3 itself did not contain the runtime card/reward redesign or the new set-logo wiring.
- Rebuilds the Layered-card lower information area as an angular glass/metal plaque while preserving the existing rarity-star rail and upper set/show identity area. Card name, Cost, Damage, Method requirement and Move/type hierarchy are now separated for better iPhone readability.
- Gives Season/future Reward cards a dedicated `is-premium-reward-card` family with gold/red earned-card trim, a distinct lower plaque and WWE Legacy Reward source lockup. This is presentation-only.
- Adds **NXT — Series 1** as a first-class Studio theme using WWE Corporate's current silver NXT logo source: `https://corporate.wwe.com/f/inline-images/NXT-logo.png`.
- Adds **Ruthless Aggression — Series 1** as a first-class Studio theme using the project-approved HobbyDB logo source supplied by the user.
- Card Art Studio now includes dedicated NXT and Ruthless Aggression backgrounds, frame palettes, logo sizing, and an export-safe remote-logo load path with embedded fallback rendering if a source cannot be reached.
- Corrects stale v1.1.2 build/package/cache markers carried by the v1.1.3 package and aligns the browser module graph to **v1.1.4**.
- No gameplay, economy, decks, roster structure, card values, booster odds or progression rules changed.
- Focused v1.1.4 presentation certification: **14/14 passed**. Core validation: **95 Superstars / 95 decks / 835 gameplay cards / 0 issues / 0 orphans**. Collector ID audit and flow audit: **0 issues**.
- Historical suite comparison: uploaded v1.1.3 baseline had **74** retained failures; v1.1.4 has **72**, with **0 new failing historical contracts** and two stale baseline failures resolved by version/cache alignment.

## v1.1.5 — Clean Card Plaque + Reward Logo + Exact Set Branding
- Supersedes the v1.1.4 lower-card treatment after physical visual review found the nested boxes, chamfered plaque top and decorative lines too busy.
- Replaces the lower information area with **one clean rectangular band**. There are no cut/diagonal plaque corners, no decorative top slashes, and no Cost/Damage boxes inside the plaque.
- Keeps Cost and Damage as large standalone figures, with requirement and Move/type text cleanly aligned in the same single band.
- Removes the duplicate/overflowing Reward source copy from the bottom of Reward cards.
- Adds `assets/images/branding-wwe-legacy-reward-logo.png`, built from the existing WWE Legacy lockup with **REWARD** underneath, and uses it in the normal top-right set-logo zone for Reward cards.
- Removes the v1.1.4 generated-text fallback versions of the NXT and Ruthless Aggression marks. Card Studio now attempts the exact approved WWE Corporate NXT source and project-approved HobbyDB Ruthless Aggression source even in local-file use; if the source cannot be loaded, it does not invent a substitute logo.
- Reward Card Studio frames are unified to premium gold/red rather than inheriting a bright set-specific outer border.
- No gameplay, economy, deck, roster, card-value, booster, progression or save-schema changes.
- Certification: focused v1.1.5 presentation/superseded-plaque tests **10/10 passed**; rebuild validation **95 Superstars / 95 decks / 835 gameplay cards / 0 issues / 0 orphans**; collector ID and flow audits **0 issues**; historical suite **1,006 discovered / 840 passed / 72 retained historical-contract failures / 94 skipped**, with **0 new failing names versus v1.1.4**.


## v1.1.8 — Secondary Label Readability + Golden Era Transparency (30 Aug 2026)
- Extends the v1.1.7 readability pass to every non-move card family: **SUPERSTAR, ACTION, ENTRANCE, MANAGER, MOMENTUM, MERCH and SUPERSTAR VARIANT** secondary/type labels now use the same doubled small-text treatment rather than the old undersized footer typography.
- Live layered utility-card type labels are doubled from 2.35cqw to 4.7cqw; live Superstar nameplate secondary labels are doubled from 2.6cqw to 5.2cqw with matching stronger weight.
- Replaces the Golden Era square/checker-background source with a true-transparent local PNG derived from the exact project-approved classic blue/white/orange WWF reference.
- Removes the generated gold-only Golden Era Studio override completely. Golden Era now uses the same visible-alpha trimming and apparent-size envelope as Attitude Era / New Generation (`maxW .235 / maxH .105`) inside the shared top-right safe zone.
- No gameplay, economy, deck, card-value, move-requirement, roster, booster, progression or save-schema changes.
- Certification: focused v1.1.7 + v1.1.8 presentation assertions **11/11 passed**; rebuild **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector IDs **930/930 / 0 issues**; flow **95 / 0 issues**; full suite **1,020 discovered / 854 passed / 72 retained historical failures / 94 skipped**, with **0 new failing names versus v1.1.7**.

## v1.1.7 — Card Readability + Era Logo Correction (30 Aug 2026)
- Doubles Method-dot size and removes Method-group spacing differences; all requirement dots now form one evenly spaced centered sequence.
- Lifts the lower move-card plaque clear of the bottom border and removes the plaque shadow/bleed.
- Doubles the COST/DAMAGE label typography while retaining the large numeric figures.
- Doubles MOVE/type typography and makes Studio wrapping content-aware: the line stays single-line when it fits and wraps only when necessary.
- Corrects Attitude Era logo presentation by trimming transparent source padding and matching the approved New Generation apparent-size envelope/right-corner anchor.
- Replaces the incorrect Golden Era logo with the approved blue/white/orange classic WWF mark matching the supplied reference.
- Removes the obsolete Golden Era export-safe fallback so local/file-protocol Studio mode cannot reintroduce the superseded logo.
- No gameplay, economy, deck, card-value, roster, booster, progression or save-schema changes.
- Certification: **1,015 tests discovered / 849 passed / 72 retained historical failures / 94 skipped**, with **0 new failing names vs v1.1.6**; rebuild validation **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector-ID and flow audits **0 issues**.

## v1.1.6 — Logo Safe Zone + Method Requirement Dots + Reward Consistency (29 Aug 2026)
- Standardised every Card Art Studio top-right set/event logo into one protected safe zone mirroring the rarity-star inset on the left.
- Reduced NXT and SmackDown logo scale and tightened all current set-logo profiles so no mark touches the card frame.
- Removed the stale Trish Season 1 Reward-logo source and forced all Reward-family sets to the WWE Legacy REWARD mark, including export-safe/file-protocol Studio use.
- Replaced text-heavy front Method requirements with colour-coded dots: Strength orange, Strike red, Technical green, Agility blue. Mixed requirements render grouped dots in authored order.
- Rules-side requirement text remains unchanged for full readability. No gameplay/economy/card-value changes.

## v1.1.9 — Golden Era Hi-Res Logo (30 Aug 2026)

- Replaces the low-resolution Golden Era primary logo source with the higher-resolution transparent **WWF 1985–1998 3D** PNG from Loodibee.
- Keeps the v1.1.8 local transparent Golden Era PNG as a one-time offline/source-failure fallback only.
- Retains the exact v1.1.8 visible-alpha cropping, `.235 × .105` apparent-size profile and 7.5% right / 5.2% top protected safe zone.
- No gameplay, economy, card-value, move-requirement, deck, roster, booster, progression or save-schema changes.
- Certification: focused presentation assertions **14/14 passed**; rebuild **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector IDs **930/930 / 0 issues**; flow **95 / 0 issues**; full suite **1,023 discovered / 857 passed / 72 retained historical failures / 94 skipped**, with **0 new failing names versus v1.1.8**.

## v1.1.10 — New Generation Logo Hotfix (30 Aug 2026)

- Repairs the New Generation logo regression where physical-iPhone rendering could leave only a narrow blue backing block in the protected top-right logo area.
- Replaces the fragile New Generation SVG runtime dependency with a packaged high-resolution transparent PNG rendered from the same approved yellow/blue WWF New Generation vector artwork.
- Card Art Studio file/local export now uses an embedded PNG data URI rather than the SVG data URI, preventing Safari from partially rendering the SVG during canvas composition/export.
- Live UI and Card Art Studio both use the same packaged PNG. The legacy SVG is retained only as source/reference artwork, not as the runtime logo.
- New Generation logo scale and placement are unchanged: `.235 × .105` apparent-size envelope inside the 7.5% right / 5.2% top protected safe zone.
- No gameplay, economy, card-value, move-requirement, deck, roster, booster, progression or save-schema changes.

## v1.1.11 — Upright Superstar Name Consistency — 30 August 2026

- Standardized every Superstar name to upright/non-italic typography across live layered cards, Card Art Studio, generated Superstar previews and the Season 1 Cena splash.
- Removed all authored `italic: true` Superstar nameplate flags and hardened runtime/Studio renderers so legacy profile metadata cannot reintroduce italics.
- Preserved Superstar-specific font family, weight, tracking, scale, stroke, glow and colour treatments.
- Presentation-only hotfix; no gameplay, economy, card values, deck, roster, booster, progression or save-schema changes.

## v1.1.12 — Merch Footer Background Hotfix — 30 August 2026

- Fixed Merch card product photography with white source backgrounds painting a large white block behind/below the lower identity plaque.
- Card Art Studio now clips Merch photography at the lower identity-panel boundary (`77.2%` card height), leaving the set template visible in the footer/gutter while the plaque overlays cleanly.
- No changes to Merch effects, rarity, duration, ownership, gameplay, economy, card values, decks, progression, save schema or roster structure.


## v1.1.13 — Deck Lab Merch + Upgrade Assistant — 30 August 2026

- Adds a dedicated **Merch Slot** to each Superstar's Deck Lab editor, outside the 60-page deck and Entrance selection.
- Preserves the locked Merch contract: only **one active Merch item** at a time, Merch **never stacks**, and cards expire after **1, 3 or 5 completed eligible matches**, consuming one match only when the effect was actually eligible/applied.
- Deck Lab's Merch picker shows owned Generic Merch plus Merch specific to the selected Superstar. Superstar-specific Merch cannot be equipped for a different Superstar.
- Deck Lab shows the active Merch card, rules text and matches remaining, and allows the player to discard the active item to free the slot.
- Booster **Deck Assistance / Upgrade Assistant** now recognizes newly pulled Superstar-specific Merch when the associated Superstar is already unlocked and the single Merch slot is empty.
- Ask mode presents an **EQUIP** suggestion; Auto-upgrade can equip it automatically; Manual mode leaves it as a suggestion only.
- Merch suggestions are suppressed if the Superstar is not unlocked or another Merch item is already active.
- No card values, deck size/copy rules, booster odds, economy values, Superstar roster, progression or save-schema structure changed.
- Certification: dedicated v1.1.13 Merch/Deck Lab/Assistant assertions **4/4 passed**; focused Merch + recent presentation checks **23/23 passed**; rebuild **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector IDs **930/930 / 0 issues**; flow **95 / 0 issues**; full suite **1,038 discovered / 872 passed / 72 retained historical failures / 94 skipped**, with the exact same inherited 72 failure names as v1.1.12.


## v1.1.14 — Merch Compatibility + Smart Recommendations — 30 August 2026

- Generic Merch is now assigned to **one eligible unlocked Superstar** when equipped; the single consumable is never copied across multiple decks.
- Upgrade Assistant now recommends newly pulled **Generic Merch** when the global Merch slot is empty, choosing one best legal fit based on the card's actual effect.
- Method Momentum Merch uses a shared hard compatibility rule across Deck Lab, manual equip, Ask Me and Auto-upgrade: a Superstar with a `0` Method limit cannot equip that Method's Merch, and a Merch bonus cannot exceed a finite Method limit.
- Generic Method boosts are ranked using the Superstar's authored deck Method usage, requirements and starter Momentum; HP/Shield/Adrenaline use effect-specific fit scoring.
- If no unlocked Superstar can legally use a Generic Merch pull, no recommendation is shown.
- Illegal equip attempts do not consume inventory. Existing 1/3/5-match expiry and non-stacking rules remain unchanged.

## v1.1.15 — Plaque Shadow Hotfix — 30 August 2026

- Removes the remaining Card Art Studio dark fade/vignette that sat behind the lower information plaque and made the plaque appear to cast a wide shade into the artwork.
- Set artwork now runs cleanly to the plaque boundary; the plaque itself is the only dark rectangle in the footer area.
- Retains the existing clean rectangular plaque geometry, border clearance, enlarged labels, Method dots and all v1.1.14 Merch behavior.
- Presentation-only hotfix; no gameplay, economy, card-value, deck, roster, booster, progression or save-schema changes.
- Certification: dedicated plaque assertions **2/2 passed**; focused plaque/readability checks **11/11 passed**; rebuild **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector IDs **930/930 / 0 issues**; flow **95 / 0 issues**; full suite **1,045 discovered / 879 passed / 72 retained historical failures / 94 skipped**, with **0 added or removed failure names versus v1.1.14**.

## v1.1.16 — Money in the Bank Plaque Shading Hotfix — 30 August 2026

- Removes the remaining **Money in the Bank-specific translucent shading band** above the lower information plaque. This was part of the MITB background template itself rather than the global plaque-shadow layer removed in v1.1.15.
- MITB artwork now runs cleanly to the plaque edge while retaining its purple/green gradient, radial glow, diagonal line system, frame and logo identity.
- No gameplay, Merch, economy, card-value, deck, roster, booster, progression or save-schema changes.
- Certification: dedicated MITB assertions **2/2 passed**; combined v1.1.15/v1.1.16 plaque assertions **4/4 passed**; rebuild **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector IDs **930/930 / 0 issues**; flow **95 / 0 issues**; full suite **1,047 discovered / 881 passed / 72 retained historical failures / 94 skipped**, with the exact same 72 failure names as v1.1.15.

## v1.1.17 — Season 1 Launch Poster — 30 August 2026

- Replaces the previous constructed launch/splash UI with the supplied full-screen **WWE Legacy · Get Some Stratusfaction · Reach Tier 50 before September 30** promotional artwork.
- Adds the poster locally at `assets/images/season1-stratusfaction-launch-poster.jpg` so launch does not depend on a remote image.
- Preserves the complete poster without cropping; a blurred/darkened full-bleed copy fills excess space on taller/narrower displays.
- The red **PLAY NOW** artwork now has a responsive percentage-based invisible HTML button over it. Returning profiles enter the Home Hub; new installs retain starter/onboarding before Home.
- Removes the old rendered splash profile block and separate ENTER WWE LEGACY / START NEW LEGACY CTA from the active launch screen.
- No gameplay, Merch, card values, decks, economy, booster odds, progression, roster or save-schema changes.
- Certification: dedicated launch-poster assertions **4/4 passed**; rebuild **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector IDs **930/930 / 0 issues**; flow **95 / 0 issues**; full suite **1,051 discovered / 885 passed / 72 retained historical failures / 94 skipped**, with the exact same 72 failure names as v1.1.16.

## v1.1.18 — Card Art Studio 1px Position Nudges — 30 August 2026

- Adds **−1 px / +1 px precision buttons** to both Horizontal and Vertical artwork-position sliders in Card Art Studio.
- Sliders remain the coarse positioning control; the new buttons provide exact final alignment for HUD headshots and card artwork.
- Each click snaps the displayed coordinate to its integer pixel position and moves it exactly one pixel in the requested direction.
- Horizontal buttons move left/right; Vertical buttons move up/down. Controls work in both Card Front and HUD Headshot modes and retain their independent saved layouts.
- No card, gameplay, economy, Merch, deck, roster, progression or save-schema changes.
- Certification: dedicated precision-position assertions **3/3 passed**; rebuild **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector IDs **930/930 / 0 issues**; flow **95 / 0 issues**; full suite **1,054 discovered / 888 passed / 72 retained historical failures / 94 skipped**, with the exact same 72 failure names as v1.1.17.

## v1.1.19 — Animated Entrance / Action / Finisher Cards — 30 August 2026

- Adds the animated-card foundation with a locked content rule: **Entrances, Actions and Finishers are animation-eligible**; ordinary Moves and other card families remain static.
- Current authored eligibility is **314 cards**: 96 Entrances, 120 Actions and 98 Finishers.
- Runtime prefers animated WebP and falls back to GIF, while the existing static base plate remains underneath as a no-animation/error fallback.
- Animated assets load only near/inside the viewport and unload when off-screen; reduced-motion users retain the static presentation.
- Live card data remains layered above the animation so names, rarity, stats, Method dots and type labels stay current and are not baked into animated media.
- Card Art Studio adds an Animated Card workflow for eligible cards, accepts GIF/animated WebP sources and preserves the original animated file instead of flattening it through canvas export.
- Canonical animated filenames are `assets/images/<image-key>-animated.webp` or `.gif`.
- No gameplay, card values, Merch rules, deck structure, economy, roster, boosters, progression or save-schema changes.

## v1.1.23 — Universal Animated Card Shell — 30 August 2026

- Expands optional animated artwork support from Entrance/Action/Finisher-only to **every collectible card**.
- Keeps the fallback order **linked URL → animated WebP → animated GIF → static front/base plate**.
- Raw animation is now clipped into the normal card artwork window rather than replacing the entire card, preserving card dimensions, frame, rarity stars, protected top-right set logo and lower plaque/live text.
- Enlarged card inspectors use a direct canonical rules-face swap so iOS Safari cannot show a mirrored animated front as the back.
- Card Art Studio exposes Animated Card controls for every selected card.
- No gameplay, economy, deck, roster, Merch, Live Event, card-value, booster, progression or save-schema changes.
- Certification: focused animation/URL assertions **17/17 passed**; dedicated v1.1.23 assertions **4/4 passed**; full isolated suite **1,071 / 905 passed / 72 inherited failures / 94 skipped** with the exact same inherited failure-name set as v1.1.21; rebuild **95 Superstars / 95 decks / 835 gameplay cards / 0 issues**; collector IDs **930/930 / 0 issues**; flow **95 / 0 issues**.


## v1.1.67 — NXT + Ruthless Aggression Superstar Ability Source Audit — 1 September 2026

- Audits all 16 Superstar identities across NXT — Series 1 and Ruthless Aggression — Series 1.
- Confirms John Cena and Randy Orton already had fully authored bespoke Superstar abilities.
- Replaces bulk-template ability copy in the core Superstar source for Kendal Grey, Tony D’Angelo, Jaida Parker, Kelani Jordan, Mason Rook, Tatum Paxley, Lexis King, Zilla Fatu, Batista, JBL, Eddie Guerrero, Edge, Jeff Hardy and Rob Van Dam with the already approved v1.1.66 individual ability text/effects.
- Moves these 14 identities into the core `superstars.js` source of truth instead of relying only on the late runtime override, keeping direct Superstar-data consumers safe from generic fallback copy.
- Adds a regression test requiring all 16 NXT/RA Superstar abilities to have authored text, supported triggers and distinct trigger payloads.
- No gameplay rebalance: the live effects remain the same as v1.1.66. No deck-page composition, artwork, economy, progression, save-schema or booster-odds changes.

## v1.1.68 — Authentic Merch Catalogue Foundation — 1 September 2026

- Replaces the universal five-item Superstar Merch template (Funko / figure / replica gear / wristbands / poster) with an identity-led catalogue.
- Every Superstar now has the locked minimum of one Superstar T-shirt and one Superstar action figure; lower-profile/NXT talent can legitimately stop at this two-card floor.
- Adds curated deeper pools only where the Superstar identity supports them, including John Cena wristbands and Hustle Loyalty Respect towel, Stone Cold 3:16 / Don't Trust Anybody shirts, Funko, Smoking Skull Championship and beer-can collectible, Bret Hart sunglasses, Trish Stratus 8x10 entrance photo, Rey Mysterio replica mask and other signature items.
- Replaces the 40-item generic filler pool with eight WWE-branded merchandise cards grounded in WWE Shop categories/products: WWE logo shirt, stainless steel water bottle, toy title belts, stainless steel mug, beach towel, championship fanny pack and event poster.
- Keeps generic Merch usable by any eligible Superstar while Superstar Merch remains identity-locked.
- Regenerates Card Art Studio data so Darby's production list now reflects the new definitive Merch catalogue and filenames.
- Merch catalogue is now 235 cards total: 8 generic WWE items plus 227 Superstar-specific items across 95 Superstar identities.
- Adds regression coverage requiring every Superstar to retain a T-shirt and action figure and protecting the signature-merch exceptions.
- Includes the v1.1.67 NXT + Ruthless Aggression Superstar ability source cleanup.
- Rebuild certification: 95 Superstars / 95 decks / 841 gameplay cards / 0 issues.


## v1.1.69 — Full Move Identity + Five-Tier Progression — 1 September 2026

- Rebuilds the 614-Move gameplay library around a broad move hierarchy instead of repeated rarity stat templates.
- Exact mechanical Move clones are reduced to zero after the authored identity pass: cost/damage shells are differentiated while preserving each card's core effect, Method, requirements, Counter state and wrestling identity.
- Restores the full low-to-high numerical vocabulary: authored Sapphire Move damage now intentionally includes 1, 2, 3, 4, 5 and onward rather than clustering almost entirely around 4/7/8-style templates.
- Finishers are spread across a real cost/damage hierarchy rather than receiving audit-driven +1 Damage patches; later competitive deck balance should strengthen weak decks through better Common/Uncommon recommendations instead of inflating Finishers.
- Replaces the universal Sapphire ± Damage tier rule with per-card growth profiles: Damage, Efficiency, Hybrid and Effect.
- All 599 variable-printing Moves have five distinct playable Base / Emerald / Sapphire / Ruby / Amethyst versions.
- Effect-growth cards can increase existing numerical effects at high tier (for example Draw 1 becoming Draw 2) without rewriting the underlying effect identity.
- Submissions scale through cost and submission pressure rather than fake printed Damage.
- Defensive Counter-only Moves scale through cost efficiency and then high-tier Counter draw rewards so all five tiers remain mechanically distinct.
- Fixed-tier Reward cards remain fixed by design.
- This is an identity/collection pass, not the final competitive balance pass; deck simulation and tuning follow after the new card foundation is locked.


## v1.1.70 — Complete Five-Tier Gameplay Library (1 September 2026)

- Extends the v1.1.69 Base → Emerald → Sapphire → Ruby → Amethyst identity system from Moves to the complete gameplay-card library.
- 120 Actions now retain their authored trigger/identity while numeric payloads, costs, damage or tier utility improve across printings.
- 96 Entrances now have five meaningful pre-match packages; higher tiers strengthen Adrenaline/Momentum without changing the Superstar entrance identity.
- 7 Managers now have five tier states; authored Manager effects scale where numeric, while bespoke legacy Manager logic receives tier utility without being rewritten.
- 4 Momentum cards now scale within their own Method from Base through Amethyst.
- The v1.1.70 regression audit requires five distinct printings for every variable Action, Entrance, Manager and Momentum card and checks adjacent printings across the entire variable gameplay library.
- Preserves v1.1.69's 614-Move identity hierarchy, zero exact Move mechanical clones and the correction away from audit-driven Finisher damage inflation.
- Competitive deck balance remains intentionally deferred until after the card-identity foundation is complete.


## v1.1.71 — Rewards Vault Reset (1 September 2026)

- Locks WWE Legacy Rewards cards to one definitive **Amethyst-only** premium printing.
- Resets the active monthly Rewards Superstar collection to **Trish Stratus — Stratusfaction Guaranteed** only.
- Retires the obsolete pre-launch Reward identities for **Final Boss Rock**, **Chyna**, and **Goldberg**, including their reward-only gameplay-card packages and reward sets.
- Confirms that **Attitude Era Rock** remains untouched as a separate Attitude Era collectible identity.
- Confirms that **John Cena** remains the Ruthless Aggression Series 1 identity; the old Last Time Is Now reward identity is no longer part of the active reward pool.
- Establishes an additive monthly Rewards registry: future monthly premium Reward Superstars are added alongside Trish, and remain Amethyst-only.
- Active rebuild after cleanup: 92 Superstars, 92 decks, 823 gameplay cards, 0 orphans, 0 issues.


## v1.1.72 — Trish Merch Booster Pool (1 September 2026)

- Keeps the Season 1 50-tier Trish Stratus premium reward road strictly focused on Amethyst Reward gameplay cards; no Merch is granted from the 50 tiers.
- Confirms every booster contains exactly one Merch card.
- Adds all Trish Stratus Merch cards to the normal booster Merch chase pool across released booster sets, independent of Trish's Amethyst-only Reward set.
- Reward gameplay cards remain excluded from boosters; this exception applies only to Reward Superstar Merch.
- Establishes the forward rule that active monthly Reward Superstar Merch can join the normal booster Merch pool while the Superstar and gameplay package remain premium Rewards.


## v1.1.73 — Clean Card Studio Reward Catalogue (1 September 2026)

- Regenerates Card Studio from the cleaned v1.1.72 active catalogue so Darby's production workspace contains no retired Reward identities.
- Removes Final Boss Rock, Chyna and Goldberg cards/variants/sets from Card Studio.
- Keeps Trish Stratus as the sole active premium Rewards Superstar and retains her booster-eligible Merch cards.
- Card Studio now contains 1,234 production entries: 915 collector cards, 227 Merch cards and 92 Superstar variants across 92 active Superstars and 13 active sets.


## v1.1.74 — Future Set Roadmap + Full Balance Roster (1 September 2026)

- Makes the pre-release roadmap a first-class internal balance/Card Studio catalogue while keeping future sets player-hidden until their event release gates.
- Worlds Collide — Series 1 is locked at 8 Superstars: Rey Mysterio, Dominik Mysterio, Penta, El Grande Americano, Lola Vice, Dragon Lee, Hijo del Vikingo and Mr. Iguana.
- Money in the Bank — Series 1 is locked at 8 Superstars: Jey Uso, LA Knight, Alexa Bliss, Finn Bálor, Giulia, Carmelo Hayes, Baron Corbin and Rey Fenix.
- Survivor Series — Series 1 is locked at 8 Superstars: Bron Breakker, Drew McIntyre, Sami Zayn, Jacob Fatu, Solo Sikoa, Jade Cargill, Nia Jax and Jimmy Uso. Randy Orton remains in Ruthless Aggression.
- Fully authors Giulia, Carmelo Hayes, Baron Corbin, Rey Fenix and Jimmy Uso with Superstar identities, abilities, Entrances, Actions, three Trademarks, one Finisher and 60-page recommended decks.
- All 24 future event-set Superstars now participate in internal deck balancing before public release.
- Release roadmap: Worlds Collide 26 Sep 2026; Money in the Bank 10 Oct 2026; Survivor Series: WarGames 28 Nov 2026.
- Regenerates Card Studio so Darby can produce artwork for the complete future roadmap ahead of release.


## v1.1.75 — Recommended Deck Realism Audit (1 September 2026)

- Audits all 97 active/internal recommended Superstar decks before the numerical balance pass.
- Keeps legitimate shared real-life moves shared rather than creating fake duplicate Superstar-only identities.
- Adds Jade Cargill's Reverse Alabama Slam and Eye of the Storm to Survivor Series and moves them into her recommended deck.
- Adds Logan Paul's Prime Splash to RAW Series 1 and moves it into his recommended deck.
- Reweights Tiffany Stratton toward Alabama Slam and Falcon Arrow while retaining Swanton Bomb and Prettiest Moonsault Ever.
- Corrects Chelsea Green's Trademark display name from “I’m Prettier” to current WWE naming “Un-Pretty-Her” while preserving the canonical card ID/number.
- Adds `WWE-Legacy-v1.1.75-Recommended-Deck-Authenticity-Audit.md` as the permanent pre-balance realism audit.
- Future move-card additions must pass wrestler-usage authenticity before entering recommended decks or boosters.
- Cleans Charlotte Flair signature metadata so the dedicated Charlotte Spear is the single Spear identity expected by her recommendation, and retains Flipping Lariat as RAW booster-only depth rather than recommendation filler.

## v1.1.76 — Five-Tier Physical Card Frame Redesign — 1 September 2026

- Replaces glow-first printing-tier identification with a substantial physical outer frame while preserving every approved card-content overlay and layout.
- Locked printing identities: Base = white, Emerald = green, Sapphire = blue, Ruby = red, Amethyst = purple.
- The new frame scales with card width and remains visible on fronts, rules backs, full-art Superstar cards, finished fronts and fallback/rules cards.
- Existing digital rarity glow/surface sweeps are deliberately reduced to supporting finishes so the frame is the primary rarity read at pack-opening and collection scale.
- Card Studio gains a five-tier Printing Tier Preview control using the same physical-frame palette.
- Layered Base Plate exports remain tier-neutral so one authored artwork file can serve all five printings; Finished Front exports can include the selected physical printing frame.
- Rewards remain fixed Amethyst and therefore use the purple physical printing treatment.
- No gameplay balance, card text, recommended-deck composition, set identity, plaque layout, Method dots, artwork crop or collector numbering changed in this release.

## v1.1.77 — Five-Tier Collection Ownership Cap
- Locks ordinary collectible ownership to **5 copies per printing tier**: 5 Base + 5 Emerald + 5 Sapphire + 5 Ruby + 5 Amethyst = **25 maximum stored copies per card identity**.
- A sixth copy of an already-maxed printing tier converts to Universe Points even when other printing tiers are not yet full.
- **Superstar and Entrance cards are unique collection exceptions**: only one printing of that identity may be stored across all tiers; every later copy converts to Universe Points.
- Deck-construction limits remain separate from collection ownership limits.
- Duplicate UP value continues to follow intrinsic rarity rather than printing tier.


## v1.1.78 — Amethyst-Only Superstar + Entrance Enforcement
- Locks every Superstar card and every Entrance card to **Amethyst only** at the catalogue/printing source of truth; Base, Emerald, Sapphire and Ruby versions do not exist for these card types.
- Superstar booster chase now selects exclusively from **unowned Superstars**, so a duplicate Superstar can never be pulled and no Superstar-to-UP conversion event occurs.
- Entrances remain in the normal booster candidate pool after ownership. A duplicate Entrance can therefore be pulled, but because Entrance ownership is unique the extra copy immediately overflows to its normal Universe Points conversion value.
- Ordinary collectible cards retain the v1.1.77 limit of **5 copies per tier / 25 total**.
- Card Studio now stamps Superstar/Entrance entries as fixed Amethyst and disables the printing-tier selector for those cards, preventing production of nonexistent lower-tier versions.
- Existing profile normalization collapses any historical Superstar/Entrance printing into the single Amethyst ownership slot.

## v1.1.79 — Full 97-Superstar Balance Laboratory
- Adds `tools/full-roster-balance-lab.mjs`, a deterministic full-roster matchup and deck-health laboratory.
- Audits all 97 recommended 60-page decks before any v1.2 balance changes.
- Baseline screen covers all 4,656 unique Superstar pairings with alternating first-player position: 18,624 simulated matches, 0 stalls, 25.59 average turns.
- Finish mix: 16,915 pins / 1,709 submissions.
- Writes permanent machine-readable and human-readable reports under `reports/`.
- First high-side candidates: Jade Cargill, Baron Corbin, Brock Lesnar, Roman Reigns and Penta.
- First emergency low-side finding: Giulia at 9.38%, treated as a deck-construction/Method-access diagnosis before any card-stat buff.
- This is deliberately an evidence-only build: no Cost, Damage, HP, ability or deck balance values were changed by the laboratory release.


## v1.1.80 — AJ Styles + Active 81 Balance Laboratory (2026-09-01)
- Adds AJ Styles as the locked October Rewards chase, Amethyst-only and internal-balance active.
- Styles Clash is the Finisher. Phenomenal Forearm, Calf Crusher, Ushigoroshi and Pele Kick are Trademarks.
- Adds The Face That Runs the Place and The House That AJ Styles Built Actions plus The Phenomenal One Entrance.
- Adds a 60-page AJ Styles recommended deck built around mixed-Method Technical/Agility offense.
- Narrows the active balance certification roster to 81: 72 released Superstars, 8 Worlds Collide, and AJ Styles. Later MITB/Survivor content remains authored but is deferred from current tuning.

## v1.1.81 — Active 81 Deep Balance Refinement (2026-09-01)
- Adds `CURRENT-DEVELOPMENT-STATUS.md` as the permanent in-build development handoff file and locks it into the normal release workflow.
- Adds a resumable active-roster shard runner so deep simulations can complete reliably across execution-time limits.
- Final certification matrix: **81 Superstars / 3,240 unique pairings / 25 games per pairing / 81,000 matches / 0 stalls / 25.68 average turns**.
- Final finish mix: **72,772 pins / 8,228 submissions**.
- Permanent certification reports: `balance-reports/v1.1.81-active-81-deep-balance-lab.md` and `.json`.
- **AJ Styles:** Phenomenal conditional draw uses 2→1; The Face That Runs the Place tutor discount 2→1; HP 63→62. Final deep result **59.45%**, down from 66.75%.
- **Roman Reigns:** HP 67→64; authentic move package and Head of the Table ability unchanged. Final deep result **58.20%**, down from 63.10%.
- **Yokozuna:** Super Heavyweight ground-resist uses 2→1; HP 71→70. Final deep result **57.95%**, down from 60.50%.
- **Lola Vice:** Counter Striker now draws 1 and gives +1 Adrenaline after a successful Counter, with the next Strike at -2 Cost / +2 Damage; HP 61→62. Final deep result **43.35%**, up from 32.35%.
- **Owen Hart:** King of Harts sequencing now also grants +1 Adrenaline; Owen’s Sharpshooter pressure 7→9. Final deep result **42.90%**, up from 38.45%.
- **Chad Gable:** first two Strength→Technical Olympic Pedigree payoffs also gain +1 Adrenaline; Gable’s Ankle Lock pressure 6→8. Final deep result **41.80%**, up from 39.75%.
- **Penta:** retains the earlier v1.1.81 targeted trim: Zero Fear, Zero Mercy bonus +2→+1; Fearless Assault Cost discount 2→1. Final deep result **56.65%**.
- **Rey Mysterio:** The Ultimate Underdog now triggers on the first two successful kickouts, each drawing 1 and gaining +1 Adrenaline. Final deep result **45.20%**.
- **Jacy Jayne realism/balance correction:** Rolling Encore is the Finisher; Running Knee Smash is a Strike Trademark rather than an incorrect submission Finisher; inherited Piper wording removed; the obsolete impossible Agility draw rider is removed from the Fatal Influence Action; her Superstar ability uses two 4+ Damage Strike triggers that force a random opponent ditch. Final deep result **50.15%**.
- Bret Hart settles at **57.45%** and is no longer an urgent high-side target.
- No global shared-card nerf or global submission-rule rewrite was introduced. The pass remains targeted and identity-preserving.

## v1.1.82 — Watchlist + AJ October + Darby Card Studio (2026-09-01)
- **Card Studio simplified for Darby:** adds two top-level workflow tabs. `NORMAL CARDS` is the default and completely hides GIF/WebP animation tools; `ANIMATED CARDS` isolates the advanced animation workflow for later use without changing the selected card.
- Normal Card production retains the full static artwork, positioning, printing-tier preview, base-plate/finished-front export and canonical filename workflow.
- Animated Card production retains linked GIF / animated WebP source, preview, install-path and animated export tools, but those controls no longer appear in Darby’s normal workflow.
- Adds `tools/v1182-watchlist-matchup-spread.mjs` plus permanent JSON/Markdown matchup-spread reports so balance decisions can distinguish broad dominance/weakness from narrow matchup effects.
- Watchlist audit covered **25,725 watched matches with 0 stalls** at 25 games per watched pairing.
- **El Grande Americano:** Masked Opportunist 2 uses→1. Final deep result **54.70%**.
- **Brock Lesnar:** The Beast Incarnate one-use big-hit reduction 5→2. Final deep result **57.60%**.
- **Montez Ford:** HP 60→62; Take Flight discount 1→2 and first two triggers draw 1. Final deep result **52.25%**.
- **Kendal Grey identity correction:** Ankle Lock is now a grounded Submission Trademark; Olympic Slam is now a damage Grapple Finisher rather than the previous inverted move-type data. Final deep result **54.70%**.
- **Rob Van Dam identity correction:** Five-Star Frog Splash is now his Finisher; Split-Legged Moonsault is a Trademark. Final deep result **49.35%**.
- **AJ October readiness:** explicit `rewards-october-2026` gate at **2026-10-01T00:00:00Z**; AJ’s normal Superstar Merch enters booster Merch chase from that gate and not before.
- **AJ printed/runtime parity:** Phenomenal Forearm now executes its printed +2 Damage when AJ connected with a different Method earlier in the Control sequence; The House That AJ Styles Built now actually draws 1 and arms its printed -1 Cost different-Method follow-up.
- Final full active-81 certification: **81 Superstars / 3,240 pairings / 25 games per pairing / 81,000 matches / 0 stalls / 25.62 average turns**.
- Final finish mix: **72,827 pins / 8,173 submissions**.
- AJ Styles finishes at **59.95%** after runtime-parity activation and remains a mild high-side watch item rather than an emergency outlier.
- Remaining clearest low-side watches are Kurt Angle **39.15%** and Tiffany Stratton **39.75%**; no automatic follow-up buff is applied in this build.

## v1.1.83 — NXT + Ruthless Aggression Move Identity Audit (2026-09-01)
- Triggered by the Kendal Grey data inversion found during v1.1.82; audits all Superstar-specific Moves for all 8 NXT — Series 1 and all 8 Ruthless Aggression — Series 1 Superstars.
- Adds permanent `audit-reports/v1.1.83-nxt-ruthless-move-identity-audit.md` documenting every correction and every deliberately provisional item.
- **Kendal Grey:** current WWE-finisher identity corrected to **Shades of Grey** while preserving existing canonical card ID; Ankle Lock remains a grounded Technical Submission Trademark.
- **Tony D’Angelo:** Finisher renamed to **Dead to Rights**; Fisherman Buster corrected from submission data to Technical grapple; Crowbar search retargeted.
- **Jaida Parker:** Finisher renamed to **Deja Vu**; Running Hip Attack corrected to Strike/Strike; Samoan Drop search retargeted; fake inherited `Jaida Parker Driver` search removed.
- **Kelani Jordan:** **One of a Kind Split-Legged Moonsault** becomes the aerial Finisher; 450 Splash becomes an Agility aerial Trademark; Springboard Cutter posture/type corrected; recommended deck reweighted.
- **Mason Rook:** package audited but Finisher remains provisional because current WWE results show multiple power moves and explicitly show a sit-out powerbomb failing to finish; no speculative rename introduced.
- **Tatum Paxley:** Cemetery Drive verified and retained as Finisher.
- **Lexis King:** **Coronation DDT** becomes the Finisher; King’s Landing becomes a Technical grapple Trademark; recommended deck reweighted.
- **Zilla Fatu:** Island Driver corrected from diving-aerial/grounded-only to grapple/no-Method Finisher; fake inherited Running Leg Drop search removed. Finisher name remains provisional pending clearer WWE match-ending evidence.
- **Randy Orton:** RKO and Punt Kick Finishers now correctly have no Method under the global Finisher rule.
- **JBL:** Clothesline from Hell corrected from grapple to strike.
- **Eddie Guerrero:** Frog Splash corrected from Submission Finisher to aerial Finisher; Lasso from El Paso corrected from grapple to grounded Technical Submission Trademark; Jericho clone wording removed; Hurricanrana posture corrected.
- **Edge:** Edge-O-Matic and Impaler DDT corrected to grapples; Edgecution no longer incorrectly grounded-only.
- **Jeff Hardy:** Swanton Bomb corrected to aerial Finisher; Whisper in the Wind corrected to Agility/aerial.
- **Rob Van Dam:** Five-Star Frog Splash remains the aerial Finisher; Split-Legged Moonsault is an Agility aerial Trademark; Rolling Thunder becomes Agility/aerial; Van Daminator becomes Strike/strike; fake `Rob Van Dam Driver` search removed. The Whole F’n Show ability uses 3→2 after the authentic move hierarchy initially pushed RVD to 61.35%.
- Cross-set integrity audit finds no remaining audited Finisher with a Method requirement, no foreign-Superstar clone-name residue, and no broken search target among the 16 audited Superstar packages.
- Final active-81 certification after corrections: **81 Superstars / 3,240 pairings / 25 games per pairing / 81,000 matches / 0 stalls / 25.53 average turns**.
- Final finish mix: **73,166 pins / 7,834 submissions**.
- Audited final deep results include RVD **58.45%**, Lexis King **58.85%**, JBL **58.65%**, Randy Orton **58.60%**, Kendal Grey **53.85%**, Tony D’Angelo **54.40%**, Jaida Parker **54.60%**, Kelani Jordan **53.05%**, Tatum Paxley **51.55%**, Eddie Guerrero **49.30%**, Jeff Hardy **47.30%**, Batista **46.45%**.

## v1.1.84 — Remaining Released Set Move Identity Audit (2026-09-01)
- Audits all **56 Superstars** across RAW, SmackDown, Evolution, SummerSlam, Golden Era, New Generation and Attitude Era after the NXT/Ruthless Aggression v1.1.83 pass.
- Checks Finisher/Trademark role, physical move type, gameplay Method, submission flags, grounded/standing requirements, named search targets, cloned Superstar wording and recommended-deck reachability.
- Locks the key hard corrections:
  - IYO SKY Bullet Train Attack → Strike move type.
  - Raquel Rodriguez Big Boot → Strike move type.
  - Hulk Hogan Big Boot → Strike; Atomic Leg Drop → Aerial.
  - Ultimate Warrior Shoulder Block → Strike.
  - Bret Hart Second-Rope Elbow Drop → Aerial/Agility.
  - Razor Ramon Bulldog cloned wording corrected.
  - Tiffany Stratton PME Finisher Method cleared.
  - Chelsea Green: **Un-Pretty-Her is the Finisher**, Green With Envy the Trademark setup; balance compensation Cost 10 / tutor discount 1.
  - Damian Priest Hit the Lights Finisher Method cleared.
  - Shinsuke Nakamura Inverted Exploder and Sliding German Suplex corrected to physical Grapples while retaining their Strike/Agility gameplay Method lanes.
  - Blake Monroe Kick → physical Strike; Top-Rope Double Stomp → Aerial.
  - Trick Williams Cyclone Boot, Trick Knee and Trick Shot → physical Strikes; Trick Shot no longer grounded-only.
  - Jacy Jayne Cannonball Senton → physical Aerial while retaining Strike Method.
- Move type and Method are now explicitly treated as separate concepts so authenticity fixes do not destroy deck Momentum access.
- All Finishers in the seven-set audit scope now have no Method requirement.
- Shared `Spear` Finisher also has its stale Strength Method removed; it is used only by banked future decks, so active-81 certification is unaffected.
- No real broken named search target remains in the seven-set scope.
- Final active-81 certification: **81,000 matches / 0 stalls / 25.53 average turns / 73,244 pins / 7,756 submissions**.
- Chelsea Green finishes at **55.00%** after the authentic finisher hierarchy + balance compensation.
- Tiffany Stratton remains the clearest low-side watch at **38.65%**; no blind buff is applied here.

## v1.1.85 — Card Studio Production Integrity + Trish Reward Positioning (2026-09-01)
- Full Card Studio production-integrity audit across **1,299 entries**.
- Verifies names, set IDs/logo coverage, Superstar attribution, fixed printing tiers, canonical finished/base-plate paths, export-path collisions and Finisher Method legality.
- Final Card Studio audit: **0 hard issues**, **0 missing names**, **0 path collisions**, **0 fixed-tier errors**, **0 attribution errors**, **0 set-logo coverage warnings**.
- Three intentional shared-role warnings remain: Pump Kick and Gorilla Press Slam as shared Trademarks, and shared Spear as a Finisher.
- October Rewards now explicitly uses the WWE Legacy Rewards logo in Card Studio.
- Eight banked future Finishers exposed by the Studio audit have stale Method values removed.
- Trish Stratus is promoted into the balance certification population; active field becomes **82 Superstars**.
- Trish initial benchmark was **48.35%**, too ordinary for the first premium Rewards chase.
- Trish physical identities corrected: Chick Kick = physical Strike, Stratusphere/Air Canada = physical Aerial, Stratusfaction remains Finisher.
- Gameplay Method architecture is intentionally retained separately from physical move type.
- Trish starter-template ability copy removed. Final Reward ability: first different-Method connect each match draws 1 and gains +1 Adrenaline.
- Trish HP **63→64**.
- Final active-82 certification: **3,321 pairings / 25 games each / 83,025 matches / 0 stalls / 25.52 average turns**.
- Finish mix: **75,184 pins / 7,841 submissions**.
- Trish final certified result: **57.88%**, deliberately inside the premium ~58–60% target band without becoming an auto-win.
