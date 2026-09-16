# WWE Legacy — Development Handoff — 16 September 2026

Repository: `Swoop081/wwe-legacy`  
Branch: `main`

Use this document as the canonical starting point for the next development chat.

## Runtime
The live game is booting successfully again and PLAY NOW works on the user's iPhone. Boot repair removed duplicate Becky-pass declarations for `knees-up`, `dodge`, `catch-the-foot` while preserving the existing shared IDs, and repaired manifest drift by adding RAW1-090 through RAW1-095: Bex-Plex, Flying Fire-arm, Armbar, Calf Kick, Hammerlock, Grab the Ropes. Do not weaken collection integrity guards.

## Launch scope
Current priority is launch readiness/core card integrity, not future content.

NXT Series 1 is authored but UNRELEASED and not launch-required. Preserve the authored files but hide Kendall Grey, Tony D’Angelo, Jaida Parker, Kelani Jordan, Mason Rook, Tatum Paxley, Lexis King and Zilla Fatu and all NXT cards from player-facing collection/catalogue/store/boosters/rotation/unlocks. Remove or replace NXT Championship Road and Live Event references. Exclude NXT from onboarding and the current balance/Finisher audit.

Worlds Collide is outside the current pass and releases roughly 10 days after this handoff. Audit it separately closer to release. The future November Survivor Series collectible set, planned to include Sami Zayn, Bron Breakker, Drew McIntyre etc., is separate from Survivor Series gameplay mode and must not affect launch/onboarding.

`season-1-last-time-is-now` is scrapped and should be removed from active/player-facing structures. October Rewards Superstar is planned as AJ Styles; Styles Clash = 16 Finisher ceiling.

## Mandatory restart
The completed launch/balance overhaul will require a mandatory global fresh start. No migration compatibility is needed for current saves, collections, decks, progression, currencies or obsolete card identities. Do NOT reset during intermediate commits. Reset once when the complete audited build is certified.

## Starter Draft — LOCKED
Replace championship/brand onboarding with permanent rivalry onboarding.

Six eligible sets, two rivalries each:
- SummerSlam: Cody Rhodes vs Roman Reigns; Seth Rollins vs CM Punk.
- Evolution: Liv Morgan vs Rhea Ripley; Becky Lynch vs Charlotte Flair.
- Golden Era: Hulk Hogan vs André the Giant; Ultimate Warrior vs Randy Savage.
- New Generation: Bret Hart vs Shawn Michaels; Razor Ramon vs Diesel.
- Attitude Era: Stone Cold Steve Austin vs The Rock; Undertaker vs Kane.
- Ruthless Aggression: John Cena vs Randy Orton; Rob Van Dam vs Jeff Hardy.

Algorithm: randomly choose 4 DIFFERENT sets from the 6 without replacement. For each selected set randomly choose 1 of its 2 rivalries. Present the four choices one at a time. Player chooses one Superstar from each and starts with exactly 4 owned Superstars from 4 different sets. A set cannot appear twice in the same onboarding. Fresh restart rerolls sets and rivalries.

RAW, SmackDown, NXT, Worlds Collide, Rewards and future sets are excluded from Starter Draft selection.

## Survivor Series mode
Survivor Series gameplay mode is 4-v-4 capture-the-opponent. It is separate from the future November collectible set. It MUST be playable immediately after onboarding because Starter Draft supplies exactly four owned Superstars. No additional collection/progression/match unlock gate. Captured opponents are temporary to that mode/match and are NOT permanently added to the collection. Deeper mode mechanics can wait.

## Pack presentation
Every sealed booster everywhere must visibly display its corresponding transparent set logo: Store, owned Packs and pack-opening presentation. Blank coloured wrappers are wrong.

The previous SVG-wrapper approach could reference another image and fail on iPhone Safari. Pack hardening was changed to use actual logo sources as real image elements. Latest pack correction commit before this handoff: `00bee48cb75424771b64716f09d4caa1dc58b7be`. This still needs visual confirmation on deployed iPhone. NXT can remain in technical logo mapping temporarily but must disappear player-facing during launch cleanup.

## Card authenticity/balance — LOCKED
Audit every released wrestler deck. Remove invented, obsolete, era-inappropriate or no-longer-used wrestler-specific moves/actions and replace only with verified authentic material. Never fabricate wrestling content.

Audit every damaging Move, not only Finishers/Trademarks. Identical shared Move IDs must have identical damage/cost/effects globally. Never vary one shared ID per wrestler. A wrestler-specific Trademark must be a distinct ID if it needs distinct balance.

Build intentional impact/move-family hierarchies. Basic move versions should sit below advanced/high-impact variations. Do not cluster unrelated strong Moves at one arbitrary damage value. Use intermediate values deliberately.

Higher gem tiers must be better. Effects can carry some tier improvement, but Finishers have no effects and ignore Method.

Damaging Finisher curves: max15 = 11/12/13/14/15; max16 = 12/13/14/15/16; max17 = 13/14/15/16/17. Submission “16” is classification shorthand; direct submission damage remains 0.

## Released Finisher classifications
NXT and Worlds Collide excluded for now.

SummerSlam: Roman Spear17; CM Punk GTS16; Brock F-517; Undertaker Tombstone17; Liv ObLIVion16; Cena Attitude Adjustment17; Orton RKO16; Cody Cross Rhodes16.

RAW: Joe Hendry Standing Ovation16; Roxanne Perez Pop Rox16; Austin Theory A-Town Down16; Montez Ford From the Heavens16; Sol Ruca Sol Snatcher16; Logan Paul Paulverizer16; Chad Gable Gable’s Ankle Lock16 submission; Raquel Rodriguez Tejana Bomb16.

SmackDown: Danhausen Triple D16; Tiffany Stratton Prettiest Moonsault Ever16; Chelsea Green Un-Pretty-Her16; Damian Priest South of Heaven16; Shinsuke Nakamura Kinshasa16; Blake Monroe Top-Rope Double Stomp16; Trick Williams Trick Shot16; Jacy Jayne Rolling Encore16.

Evolution: IYO SKY Over the Moonsault16; Bayley Rose Plant16; Paige Paige Turner15; Stephanie Vaquer Vaquer Inferno16; Charlotte Natural Selection15; Rhea Riptide16; Liv ObLIVion16; Becky Manhandle Slam15.

Golden Era: Hogan Atomic Leg Drop16; André Sitdown Splash17; Savage Flying Elbow Drop16; Warrior Warrior Splash17; Piper Piper’s Sleeper16 submission; DiBiase Million Dollar Dream16 submission; Jake Roberts Jake’s DDT16; Mr Perfect Perfect-Plex16.

New Generation: Bret Sharpshooter16 submission; Shawn Sweet Chin Music16; Diesel Jackknife17; Razor Razor’s Edge16; Doink Whoopee Cushion15; Yokozuna Banzai17; Owen Sharpshooter16 submission; Bulldog Running Powerslam16.

Attitude: Austin Stunner16; Undertaker Tombstone17; Kane Tombstone17 + Chokeslam From Hell17; Mankind Double Arm DDT15; Triple H Pedigree16; Jericho Walls of Jericho16 submission; Kurt Angle Slam15; Rock Rock Bottom16.

Ruthless Aggression: Cena AA17; Orton RKO16; Batista Bomb16; JBL Clothesline from Hell17; Eddie Frog Splash16; Edge Spear16; Jeff Hardy Swanton16; RVD Five-Star Frog Splash17.

Other current locks: Seth Rollins Curb Stomp16; AJ Styles Styles Clash16; Trish Stratus Stratusfaction16.

## Structural Finisher corrections pending
- Bret/Owen Sharpshooter: one shared Hart-family Submission/Finisher identity, direct damage 0, persistent Leg pressure. Max-level cost explicitly 16. Do not invent unresolved lower-tier cost curve.
- Jericho: remove Codebreaker from Attitude material; Walls of Jericho is the Attitude Finisher.
- Kane: Chokeslam From Hell becomes second Finisher max17; Kane also shares Tombstone17. Inspect existing Chokeslam Tombstone search/draw/discount effect before conversion.
- Bayley: Rose Plant Finisher16; Bayley-to-Belly becomes Trademark.
- Piper: display Piper’s Sleeper; Piper’s Pit is Action, not Finisher.
- Jake: display Jake’s DDT.
- Owen Diving Leg Drop = ordinary Move, not Finisher.
- Chad Gable: Gable’s Ankle Lock is Finisher; Chaos Theory is not.
- Rey 619 had special-case treatment; inspect current flags before changing.

## Prior audit state
Ordinary offensive Move pass excluded reversals/defensive actions, Submissions, Finishers/Trademarks and special-case 619. Known deck-size exceptions: Becky58, Chelsea61, Damian62, British Bulldog57; do not change casually.

Prior certification reported roster82, unique Moves509, submissions44, finishers84, illegal Finisher methods0. Submission five-tier work reduced expected missing five-tier entries from 77 to 36. Re-audit after launch population cleanup rather than relying blindly on historical counts.

## Presentation/game locks to preserve
Mobile-first/iPhone. Clean rectangular plaque. Enlarged readable Cost/Damage/Type and secondary labels. Superstar names upright. Method dots Technical green, Strike red, Strength orange, Agility blue. Rarity Base/Emerald/Sapphire/Ruby/Amethyst with Amethyst purple glow. Approved card set-logo safe zones. WWE Legacy Rewards branding. Universal animated-card capability with static fallback and centered animation window. Card Studio finished overlays match in-game. HUD Superstar names ALL CAPS.

## Next action
First visually verify the sealed-pack logo correction on deployed iPhone.

Then do launch-population cleanup before more balancing: hide NXT everywhere player-facing while preserving authored files; remove/replace NXT Championship Road and Live Event references; keep Worlds Collide/November future content unreleased; remove Last Time Is Now from active/player-facing structures; verify the resulting released population.

Then implement the locked four-Superstar Starter Draft and test a brand-new profile through all four choices into immediately playable Survivor Series.

Only after launch population/onboarding are stable should released Finisher implementation and the remaining authenticity audit resume.
