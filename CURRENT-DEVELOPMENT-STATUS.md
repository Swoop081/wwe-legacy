# WWE Legacy — Current Development Status

## Current local build
- **v1.1.85 — Card Studio Production Integrity + Trish Reward Positioning**
- Date: **1 September 2026**
- Last verified GitHub Pages baseline remains **v1.1.66** unless a later complete overlay is explicitly published.

## Trish Stratus — first Rewards Superstar
Trish is now explicitly inside the certified balance population.

- Before dedicated Reward tuning: **48.35%** vs the active field.
- Final v1.1.85: **57.88%** across 2,025 Trish matches.
- Locked premium target: roughly **58–60%**.
- HP: **64**.
- Stratusfaction remains Finisher.
- Chick Kick physical type: Strike.
- Stratusphere / Air Canada physical type: Aerial.
- Gameplay Method remains separate from physical move type so her Momentum architecture is preserved.
- Ability: first different-Method connect each match draws 1 and gains +1 Adrenaline.
- Obsolete starter-template ability wording removed.

## Active balance field
The old active-81 lab is superseded by **active 82**:
- 72 released-set Superstars
- 8 Worlds Collide
- AJ Styles
- Trish Stratus

Final v1.1.85:
- **82 Superstars**
- **3,321 pairings**
- **25 games per pairing**
- **83,025 matches**
- **0 stalls**
- **25.52 average turns**
- **75,184 pins / 7,841 submissions**

Trish: **57.88%**.
Current top five: JBL 59.01%, Lexis King 58.96%, AJ Styles 58.77%, Randy Orton 58.37%, RVD 58.32%.

## Card Studio production integrity
Darby’s `NORMAL CARDS` workflow remains default; `ANIMATED CARDS` remains separate.

v1.1.85 audit covers all **1,299 Studio entries**:
- 962 collector cards
- 239 Merch
- 98 variants
- 98 Superstars
- 14 sets

Final audit:
- **0 hard issues**
- **0 missing names**
- **0 canonical path collisions**
- **0 fixed printing-tier errors**
- **0 Superstar attribution errors**
- **0 set-logo coverage warnings**

Intentional shared-role warnings only:
- Pump Kick — shared Trademark
- Gorilla Press Slam — shared Trademark
- Spear — shared Finisher

Permanent report:
- `reports/v1.1.85-card-studio-production-integrity.md`

## Immediate next priorities
1. Darby can safely continue normal-card production against the corrected Studio metadata.
2. Physical iPhone smoke test v1.1.85.
3. Diagnose Tiffany Stratton / Kurt Angle separately if continuing balance refinement.
4. Keep future animation work isolated in `ANIMATED CARDS`.
5. Publish GitHub only when a complete safe overlay is possible.

## v1.1.86 — Tiffany Stratton + Kurt Angle Targeted Balance (2026-09-01)
- Targeted diagnosis found Tiffany's v1.1.75 authenticity substitutions introduced Alabama Slam and Falcon Arrow (Technical 2) while her authored package only supported Technical 1, leaving those cards structurally inaccessible and weakening her Strength→Agility sequencing.
- Tiffany: HP 62→63; Technical limit 1→2; authored momentum distribution Agility 7 / Technical 1 → Agility 6 / Technical 2. Strength remains 4. This preserves the authentic Alabama Slam/Falcon Arrow package while making it legally reachable.
- Kurt Angle: HP 66→68. His signature package, Ankle Lock pressure 7, Olympic Gold Medalist ability, entrance and deck identity remain unchanged; this is a narrow durability correction rather than another mechanics rewrite.
- Quick deterministic 5-game-per-pair diagnostic across the active 82 field moved Tiffany's matchup mean from the low-side watch region to ~43.7% and Kurt to ~45.4%, with 0 stalls in the targeted run. Treat these as directional because of the deliberately small diagnostic sample; full certification remains appropriate before any further balance changes.
- Physical iPhone smoke test is intentionally deferred to 2026-09-02.


## v1.1.87 — Hierarchy-Preserving Balance Certification (2026-09-01)
- Corrects the v1.1.86 balance philosophy after review: **HP is not a generic win-rate tuning lever.** Superstar durability must preserve the roster's physical hierarchy; heavyweights/super-heavyweights should generally carry the higher HP profiles, while lighter/technical/athletic Superstars earn strength through card quality, Actions, sequencing, abilities and effects.
- Reverted the v1.1.86 HP increases: Tiffany Stratton **63→62** and Kurt Angle **68→66**, restoring their authored durability from v1.1.85.
- Retained Tiffany's genuine structural repair only: Technical limit remains **2**, with **2 Technical Momentum**, because Alabama Slam and Falcon Arrow are Technical 2 cards and were otherwise inaccessible. Her HP and core Strength→Agility identity are unchanged from the pre-balance hierarchy.
- Kurt Angle receives **no artificial durability increase**. His v1.1.85 HP 66, Olympic Gold Medalist ability and three exclusive Actions remain unchanged pending a future mechanics/card-effect diagnosis.
- Full deterministic active-82 certification: **3,321 pairings × 25 games = 83,025 matches**, **0 stalls**, **25.54 average turns**, **75,200 pins / 7,825 submissions**. Tiffany finished **40.89%**; Kurt **39.01%**. These figures are now diagnostic signals, not targets that must be forced toward 50%.
- Top end remains stable: JBL 58.96%, Lexis King 58.86%, AJ Styles 58.72%, Randy Orton 58.37%, RVD/Diesel 58.27%. This confirms reverting the HP buffs did not destabilise the established upper hierarchy.
- Permanent certification: `balance-reports/v1.1.87-active-82-hierarchy-preserving-certification.json`.
- Future balance rule: first fix illegal/inaccessible deck routes; then prefer Superstar-specific Actions, abilities, move effects, sequencing and card composition. Change HP only when the Superstar's physical/durability archetype itself justifies it.

## v1.1.88 — Kurt Angle Technical Identity Refinement (2026-09-01)
- Diagnosed Kurt Angle as a **mechanics/card-flow problem rather than a durability problem**. His HP remains **66**; no physical-hierarchy change was made.
- Tested several isolated approaches against the active-82 field. Extra HP remains rejected. Increasing Angle Slam's Ankle Lock discount from 2→3 produced effectively no meaningful change; adding a draw to Intensity was only a small improvement. The clearest identity-consistent lever was **Olympic Gold Medalist**.
- Olympic Gold Medalist now reads: **the first time each Control sequence Angle connects with a Technical Move immediately after another connected Technical Move, draw 2 pages** (previously draw 1).
- This rewards Angle for doing what his character/deck is supposed to do — chain elite technical wrestling — rather than making him artificially harder to damage. Intensity, Integrity, Intelligence, Angle Slam, Ankle Lock pressure, entrance, Momentum profile and HP are otherwise unchanged.
- Targeted 1,215-match diagnostic moved Kurt from **41.40% → 48.23%** under the same seeds with 0 stalls. This diagnostic was used to select the mechanic, not as a requirement to hit 50%.
- Full active-82 certification: **3,321 pairings × 25 games = 83,025 matches**, **0 stalls**, **25.53 average turns**, **75,131 pins / 7,894 submissions**. Kurt finished **45.38%** across the complete field. Tiffany remained **41.04%** with no further changes.
- Upper hierarchy remains stable: JBL 58.91%, Lexis King 58.81%, AJ Styles 58.57%, Randy Orton 58.47%, RVD/Diesel 58.22%. Kurt's improvement therefore did not flatten or displace the established heavyweight/premium hierarchy.
- Permanent certification: `balance-reports/v1.1.88-active-82-kurt-angle-certification.json`.
- Balance philosophy remains locked: use HP for physical/durability identity; use Actions, abilities, move effects, sequencing and deck construction to express competitive strength for technical/athletic Superstars.


## v1.1.89 — Tiffany Stratton Athletic Sequencing Refinement (2026-09-01)
- Continued the hierarchy-preserving balance philosophy: Tiffany remains **62 HP**. No durability increase was used or tested as the selected fix.
- Diagnosis showed her repaired Technical 2 access is valid, but her once-per-match **Tiffany Epiphany** Action was discarding half of its own intended Strength→Agility setup: it found one Strength Move and one Agility Move, then only kept whichever best fit the immediate board position.
- Tiffany Epiphany now searches **one Strength Move and one Agility Move and draws both**. This gives Tiffany a deliberate two-card athletic sequence without changing her HP, Finisher damage, Momentum caps, entrance, or physical hierarchy.
- Rejected alternatives: increasing Tiffy Time's Agility discount 1→2 produced no meaningful movement under matched seeds; increasing Handspring Back Elbow's PME discount 3→4 produced only a small improvement. The Action refinement was both more effective and more faithful to Tiffany's Strength→Agility identity.
- Matched-seed 10-game-per-pair diagnostic moved Tiffany from **39.14% baseline → 42.22%** with the selected Action behavior.
- Full active-82 certification: **3,321 pairings × 25 games = 83,025 matches**, **0 stalls**, **25.53 average turns**, **75,135 pins / 7,890 submissions**. Tiffany finished **43.46%**; Kurt Angle remained **45.43%**.
- Upper hierarchy remains stable: JBL **58.91%**, Lexis King **58.77%**, AJ Styles **58.57%**, Randy Orton **58.47%**, Rob Van Dam/Diesel **58.22%**. The change improves Tiffany's competitive tools without flattening the roster.
- Permanent certification: `balance-reports/v1.1.89-active-82-tiffany-identity-certification.json`.
- Balance philosophy remains locked: HP represents physical/durability hierarchy; athletic and technical Superstars compete through stronger sequencing, Actions, abilities and move effects.

## v1.1.90 — Roster Architecture Integrity + Hierarchy Pass (2026-09-01)
- Completed the full active-82 architecture-audit remediation pass. **HP remains a physical/archetype stat, not a generic win-rate tuning lever.**
- Confirmed reachability repairs: Bret Hart now has **2 Agility Momentum** for Second-Rope Elbow Drop (Agility 2); AJ Styles now has **1 Strength Momentum** for Ushigoroshi (Technical 2 + Strength 1). Both recommended decks remain exactly 60 pages.
- HP hierarchy corrections: Becky Lynch **69→65**, Roman Reigns **64→67**, Randy Orton **65→67**, Trish Stratus **64→62**.
- Exact audited ability-template overlaps were separated: Blake Monroe no longer duplicates Stephanie Vaquer; Shinsuke Nakamura no longer duplicates Shawn Michaels; Trish Stratus no longer duplicates El Grande Americano.
- Mechanics-only refinements: Chad Gable Strength→Technical Olympic Pedigree draw **1→2**; Owen Hart different-Method draw **1→2**; Piper qualifying Hot Rod strikes now also draw 1; Lola Vice Counter Striker draw **1→2**; Ted DiBiase receives stronger Million Dollar resource/conversion tools and Million Dollar Dream pressure **7→8**, with HP unchanged at 67.
- Final active-82 certification: **3,321 pairings × 25 = 83,025 matches**, **0 stalls**, **25.51 average turns**, **74,850 pins / 8,175 submissions**. Selected results: Roman 60.89%, Orton 59.46%, Trish 57.43%, Piper 54.57%, Bret 53.04%, AJ 50.62%, Lola 50.27%, Owen 48.15%, Shinsuke 46.57%, Chad 45.88%, Blake 43.46%, Becky 43.11%, Ted 42.81%. These remain diagnostic rather than mandatory targets.
- Card Studio regenerated after the changes: **1,299 entries / 962 collector / 239 Merch / 98 variants / 98 Superstars / 14 sets**.
- Permanent files: `reports/v1.1.90-roster-architecture-integrity.md`, `balance-reports/v1.1.90-active-82-architecture-certification.json`, `test/v1190-roster-architecture-integrity.test.js`.
- Physical iPhone smoke remains deferred/pending.

## Current immediate priorities after v1.1.90
1. Physical iPhone smoke test remains deferred until the user is available to test.
2. Treat the v1.1.90 active-82 architecture as the current gameplay baseline; do not rebalance toward 50% by HP.
3. Continue normal Card Studio production against regenerated 1,299-entry metadata.
4. Any future low-end balance work should begin with mechanics/identity diagnosis, with HP changes requiring physical-archetype justification.
5. Keep `ANIMATED CARDS` isolated from the normal-card production workflow.

## v1.1.91 — Submission Ecosystem Certification + Diagnostic Integrity (2026-09-01)
- Audited the active-82 pin/submission ecosystem without changing gameplay to force a target finish ratio.
- 26,568-match all-pair sample: **0 stalls**, **25.51 average turns**, **23,919 pins / 2,649 submissions**, submission share **9.97%**.
- Submission specialists retain strong route identity: Kurt Angle 61.0% of wins by submission; Bret Hart 56.7%; Owen Hart 55.0%; Piper 51.3%; Charlotte 49.1%.
- Conclusion: the overall pin-heavy distribution is primarily roster-composition driven because pinning is universal while submission finishing is specialist-driven. There is no evidence supporting a global submission buff or pin nerf.
- Corrected the old submission-strategy diagnostic: `doomedStarts` was misleading because WWE Legacy banks persistent body-part damage across repeated holds. The audit now reports repeat-application/setup starts and hand-limited starts without classifying them as failures.
- Pin timing audit remains healthy: 20,604 attempts, 46.8% average escape chance, 0 attempts in 0–19% escape bands.
- **No gameplay balance values were changed in v1.1.91.** v1.1.90 gameplay architecture remains intact; v1.1.91 improves certification/diagnostic integrity.
- Physical iPhone smoke remains pending/deferred.

## v1.1.92 — Economy + Progression Stress Certification (2026-09-01)
- Completed a non-iPhone economy/progression audit covering booster collation, global Superstar pity, Merch supply, Season XP, Daily Spin, Live Events, Store pricing and Championship Road.
- **No economy values were changed.**
- Season 1 remains 50 × 100 XP = 5,000 XP over 30 days (**166.7 XP/day** average requirement). A fully engaged daily loop produces about **177.5 XP/day before weekly challenges**, and weekly challenges can add 175 XP/week.
- Season reward composition: **23 Trish chase tiers, 16 booster tiers, 11 UP tiers / 1,350 UP**.
- Daily Spin EV: **33.33 UP + 7.5 XP + 0.167 booster + 0.167 standalone Merch per day**.
- 1,000-profile / 30-day highly engaged stress scenario: all reached Tier 50; 90 Live Event boosters/profile; average unlocked Superstars **2.81 including starter**, median 3, P10–P90 1–5; average natural Superstar hits 1.81; average pity position 40.45.
- Championship Road pays **10 set boosters per 40-win clear** (one every four victories), which remains compatible with the global 2% / 100-miss Superstar chase.
- Guaranteed one-Merch-per-booster creates high raw Merch volume, but Merch remains consumable and lasts 1/3/5 matches. Keep unchanged until real play data shows inventory saturation or presentation fatigue.
- Main watch item for physical testing is **reward-density/presentation fatigue**, not numerical economy inflation.
- Permanent harness/report: `tools/economy-progression-stress-v1.1.92.mjs`, `reports/v1.1.92-economy-progression-stress-certification.md`.

## v1.1.93 — Locked Core Rules Regression Certification (2026-09-01)
- Added permanent `test/v1193-locked-core-rules-regression.test.js` covering Lead Off/no Turn-1 draw, normal Control transfer, retained-Control defender draw, Momentum permanence, failed-pin Control transfer, pin probability, persistent submissions/current-HP threshold, Auto Counter escalation/restrictions, and Stun/Grounded recovery.
- New locked-rules suite: **9/9 passed**.
- Combined current gameplay gate: **30/30 passed** across v1.1.93 plus existing Auto Counter, retained-Control, persistent-submission, pin-health, submission-response and launch-regression gameplay suites.
- A broader 37-test run found one stale historical UI assertion in `v01406-grounded-stun-splash.test.js` expecting retired Cena Season splash copy. Its gameplay assertions pass; this is test-harness debt, not a gameplay failure.
- **No gameplay or balance values changed.**
- Permanent report: `reports/v1.1.93-locked-core-rules-regression-certification.md`.
- Physical iPhone smoke remains pending/deferred.

## v1.1.94 — Trustworthy Current Release Test Gate (2026-09-01)
- Reworked automated-test architecture so historical release snapshots no longer falsely fail the current build.
- Preserved historical tests unchanged rather than rewriting old version history.
- Added `test/current-release-manifest.json` and `tools/run-current-release-tests.mjs`.
- `npm test` / `npm run test:current` now run the explicit current release gate; `npm run test:historical` retains the complete historical scan for archaeology/debt review.
- Current release gate: **73/73 passed, 0 failed, 0 skipped**.
- Historical failures are classified rather than hidden: Cena Season snapshots, four-tier/Diamond assertions, old fixed catalogue counts, superseded balance locks, old Rewards registry assumptions, old generic Merch logic and no-assets-incompatible physical asset checks.
- **No gameplay/economy/balance values changed.**
- `physicalIphoneSmoke` marker standardized to `pending-v1.1.94-user-smoke`.
- Permanent report: `reports/v1.1.94-current-release-test-gate.md`.

## v1.1.95 — iPhone Infinite Update Reload Hotfix (2026-09-02)
- Physical iPhone screen recording confirmed a full-page update/reload loop: Season splash repeatedly dropped to black and repainted, preventing interaction.
- Root cause: release manifest had advanced beyond the runtime cache identity; `build.json` was newer while `js/config/build.js` and module imports still reported/stamped **v1.1.86**.
- Canonical cache stamper run for v1.1.95: runtime `BUILD_VERSION`, release manifest and module cache tokens now align.
- Added same-build navigation guard to `applyAppUpdate()` so a stale bundle cannot repeatedly auto-navigate to the same target build.
- Added `test/v1195-iphone-update-reload-loop-hotfix.test.js` to the current release gate.
- No gameplay/economy/balance changes.
- Physical iPhone smoke must be rerun against v1.1.95 after deployment.

