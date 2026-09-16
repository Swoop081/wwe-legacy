# WWE Legacy — Development Handoff — 16 September 2026

Repository: `Swoop081/wwe-legacy`  
Branch: `main`

Use this document as the canonical starting point for the next development chat. READ THIS ENTIRE FILE BEFORE MAKING OR PROPOSING CHANGES.

## CRITICAL WORKING INSTRUCTIONS — USER REQUIREMENTS
The user expects direct execution, not plans, promises, repeated summaries or descriptions of what the assistant intends to do. When the user says “do it”, perform the repository work if tools permit. Do not respond with “I will”, “from now on”, “I won’t do that again”, “next I’ll”, or similar future-behaviour promises instead of executing.

Do not call work “done”, “applied”, “implemented”, “certified”, “locked”, “fixed” or equivalent unless the actual production/game data has been changed and verified. A workflow trigger, staging file, audit counter, script, plan, generated report, commit message or runner completing is NOT evidence that player-facing/game data contains the intended result.

For card work, proof of completion means the actual resulting card data can be inspected. For a five-tier card, be able to show the card name/ID and its Base, Emerald, Sapphire, Ruby and Amethyst values including cost, damage, requirements and effects as applicable. Never infer completion merely from an audit count.

Do not make the user repeat decisions already made in this project. Before second-guessing, redesigning or inventing a replacement, inspect this handoff, relevant Git history and existing project decisions. If historical work appears missing from current runtime, recover it from Git history before recreating it.

Never fabricate wrestling moves, card decisions, balance values, verification results, commits or test results. Distinguish clearly between repository-verified facts and assumptions. If something has not been verified, say exactly that rather than filling the gap.

Keep responses concise and action/result focused. The user has repeatedly objected to long explanations after failures and to “word vomit” describing future work instead of performing it.

## CRITICAL FIVE-TIER CARD SYSTEM — LOCKED
This is a core production requirement and must not be replaced by generic rarity scaling.

Applicable cards use a deliberately authored Base → Emerald → Sapphire → Ruby → Amethyst progression. A higher rarity must be better overall, but improvement does NOT require +1 damage every tier and does NOT require every field to change every tier.

A normal Move can improve through any intentional combination of:
- lower Method/momentum cost;
- higher damage;
- stronger, additional or altered effect;
- improved requirements/conditions;
- or a combination of those.

It is valid and desirable for adjacent rarities to retain the same damage if the higher rarity improves elsewhere. The user specifically likes progressions where a regular Move might begin around 6 cost / 4 damage, have an intermediate tier retain damage but improve another property/effect, then later become around 5 cost / 6 damage, continuing to the strongest overall Amethyst printing. Do NOT flatten this design into a mechanical damage ladder.

Concrete previously approved example to preserve/recover: Diving Leg Drop used an authored damage progression of 7 → 8 → 8 → 9 → 10 across Base/Emerald/Sapphire/Ruby/Amethyst, with cost also improving across the rarity progression. The repeated 8 is intentional: the higher printing can improve somewhere other than damage.

Shared Move IDs are global identities. The exact same shared Move ID must have exactly the same five-tier cost/damage/effect/requirement progression for every wrestler who uses it. Never tune one shared ID differently by wrestler. If a wrestler-specific Trademark needs distinct balance, it must be a distinct card/ID.

Move-family hierarchy is intentional. Basic versions should remain below advanced/high-impact variations. Do not cluster unrelated strong Moves at one arbitrary value. Intermediate values matter.

Finishers are the major exception to the flexible ordinary-card progression: damaging Finishers use their locked fixed damage curves and have no effects/Method requirements. Do not use Finisher curve rules as a template for ordinary Moves or Trademarks.

## FIVE-TIER RECOVERY / PRIOR BATCH WORK — DO NOT DISCARD
A substantial ordinary offensive Move five-tier pass was performed in batches in Git history. The user was repeatedly told batches were being processed 20 cards at a time. Do NOT assume this work is lost and do NOT regenerate generic curves over it.

Git history contains the batch machinery and execution/audit commits. Confirmed examples include:
- Batch 1: `a79ee754` add first conversion batch; `e24fb8e9` run; `485e32f0` lock.
- Batch 2 includes the Roman-heavy shared five-tier work (`4aa4c500`, `fc28bcbf`, `f99931eb`).
- Batch 3: `ca049dcd`, `f2e23d82`, `f8924011`, followed by post-batch audit `1f77f934`.
- Batch 4: `aaa6c574`, `ce5c2d6c`, `b957de27`, followed by `f7285546` audit.
- Batches 5–16 continue with stage/run/lock/audit commits.
- Batch 17: `a08466a7` stage; `347d467b` run; `dfc801b7` post-Batch-17 scoped five-tier audit.

The post-Batch-17 state reported 77 remaining entries in the scoped/mixed pool. This must NOT be interpreted as 77 ordinary offensive Moves still unprocessed. The remaining pool included categories intentionally outside the ordinary offensive Move pass such as Submissions, defensive/control cards, Finishers/Trademarks and special cases. Later submission five-tier work reduced expected missing entries from 77 to 36.

Before doing any new global five-tier work, forensically inspect/recover the actual authored outputs from these commits and determine how they are represented in the game architecture (direct card data, overlays, generated data or runtime mutations). If later changes disconnected or overwrote them, restore the authored values rather than inventing replacements.

The earlier incorrect conclusion that “only Finishers have five-tier curves” came from inspecting the newer Finisher layer without first reconstructing the historical batch architecture. DO NOT repeat that conclusion without a complete repository/data audit.

For every future batch, “20/20 done” means 20 actual card identities have inspectable five-tier production values after the change. Staging/running a script alone is not completion.

## Runtime
The live game was booting successfully and PLAY NOW worked on the user's iPhone at the earlier handoff point. Boot repair removed duplicate Becky-pass declarations for `knees-up`, `dodge`, `catch-the-foot` while preserving the existing shared IDs, and repaired manifest drift by adding RAW1-090 through RAW1-095: Bex-Plex, Flying Fire-arm, Armbar, Calf Kick, Hammerlock, Grab the Ropes. Do not weaken collection integrity guards.

Current later build work reached v1.1.202, but do not assume all later runtime/card changes are correct merely because the version was stamped. Physical iPhone smoke for v1.1.202 remains pending unless separately verified.

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

A v1.1.201 Starter Draft implementation was attempted, but treat it as requiring verification rather than automatically canonical production code. It used a transitional profile-creation workaround and runtime overlay. Preserve the locked design above; inspect implementation before relying on it.

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

Important balance heuristic: max15 damaging Finishers are often intentional when that wrestler also has a Submission Finisher, balancing the total Finisher package/versatility. This is NOT an automatic universal rule. Known intentional examples include Charlotte Natural Selection15 alongside Figure Eight, Kurt Angle Slam15 alongside Ankle Lock, Becky Manhandle Slam15 alongside Dis-arm-her, and Mankind Double-Arm DDT15 alongside Mandible Claw. Do not normalize these to 16.

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

## Structural Finisher corrections / implementation
- Bret/Owen Sharpshooter: one shared Hart-family Submission/Finisher identity, direct damage 0, persistent Leg pressure. Max-level cost explicitly 16. Do not invent unresolved lower-tier cost curve.
- Jericho: remove Codebreaker from Attitude material; Walls of Jericho is the Attitude Finisher.
- Kane: Chokeslam From Hell becomes second Finisher max17; Kane also shares Tombstone17. Existing Chokeslam Tombstone search/draw/discount effect must not survive blindly if the card is converted to a Finisher.
- Bayley: Rose Plant Finisher16; Bayley-to-Belly becomes Trademark.
- Piper: display Piper’s Sleeper; Piper’s Pit is Action, not Finisher.
- Jake: display Jake’s DDT.
- Owen Diving Leg Drop = ordinary Move, not Finisher.
- Chad Gable: Gable’s Ankle Lock is Finisher; Chaos Theory is not.
- Rey 619 had special-case treatment; inspect current flags before changing.

v1.1.202 introduced a released-Finisher lock layer. Do not assume every structural correction in that layer is correct until its actual resulting card data is inspected. It must not overwrite/redefine the flexible five-tier architecture for ordinary Moves.

## Prior audit state
Ordinary offensive Move pass excluded reversals/defensive actions, Submissions, Finishers/Trademarks and special-case 619. Known deck-size exceptions: Becky58, Chelsea61, Damian62, British Bulldog57; do not change casually.

Prior certification reported roster82, unique Moves509, submissions44, finishers84, illegal Finisher methods0. Submission five-tier work reduced expected missing five-tier entries from 77 to 36. Re-audit after launch population cleanup rather than relying blindly on historical counts.

## Presentation/game locks to preserve
Mobile-first/iPhone. Clean rectangular plaque. Enlarged readable Cost/Damage/Type and secondary labels. Superstar names upright. Method dots Technical green, Strike red, Strength orange, Agility blue. Rarity Base/Emerald/Sapphire/Ruby/Amethyst with Amethyst purple glow. Approved card set-logo safe zones. WWE Legacy Rewards branding. Universal animated-card capability with static fallback and centered animation window. Card Studio finished overlays match in-game. HUD Superstar names ALL CAPS.

## CURRENT PRODUCTION RECOVERY PRIORITY
Production/card integrity now takes priority over further feature work.

First reconstruct the actual five-tier ordinary-Move state from Git history, especially Batches 1–17. Establish which authored progressions are present on current `main`, which are present but disconnected from runtime, and which survive only in historical commits. Restore disconnected historical authored work rather than recreating it.

Then produce a machine-verifiable released-card audit. At minimum establish: unique released Move IDs; damaging ordinary offensive Moves; Trademarks; damaging Finishers; Submissions; valid five-tier count in the canonical architecture; exact missing IDs; and shared-ID conflicts. NXT/Worlds Collide/future content must not contaminate launch certification.

Do not perform the mandatory global reset until the complete production/card audit is actually certified.

When the user starts a new chat and says to continue WWE Legacy development, this handoff is the required starting context. Do not second-guess locked decisions, ask the user to reconstruct them, or invent substitutes when the information can be recovered from this file, project history or Git history.
