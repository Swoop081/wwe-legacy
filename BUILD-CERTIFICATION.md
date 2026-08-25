# WWE Legacy v0.18.00 — Build Certification

**Build:** v0.18.00 — Season 1 + Onboarding Certification  
**Date:** 25 August 2026  
**Distribution:** verified no-assets overlay package

## Objective

Complete the next pre-v1.0 gate: certify the full new-player start and turn Season 1 Tier 50 into a dedicated, persistent John Cena completion payoff rather than a generic Superstar unlock. No new game mode, economy rebalance or card-balance change is introduced.

## New-player onboarding certification

Fresh-start paths were certified end-to-end.

- Starter choices remain exactly **CM Punk / Roman Reigns**.
- Both starter choices immediately produce a complete **60-page playable Normal deck**.
- Fresh profiles receive **Amazing Entrance** plus **5 Normal copies of each Momentum Method** for collection/deck-building freedom.
- The one-time Welcome reward continues to offer all five launch-live sets.
- Every Welcome set path awards one eligible non-owned Superstar with a complete **60-page Normal deck** and zero missing recommended slots.
- The Welcome reveal now includes a compact horizontal **Match Basics** rail covering Momentum, Control, Adrenaline, Counters and finishing.
- The first-match guide is now state-aware instead of showing only generic copy. It teaches four practical phases: **Build Momentum → Control the Match → Defend with Counters → Finish the Match**, with a Submission-specific explanation when relevant.
- The guide remains optional via **HIDE GUIDE** and still ends automatically after the player's first completed match. Existing profiles are not forced back through onboarding.

Certification harness result:

- Starter paths certified: **2/2**.
- Welcome-era paths certified: **5/5**.
- Playable pages on every starter/Welcome deck: **60/60**.

## Season 1 completion experience

Claiming Tier 50 now raises a dedicated **Season 1 Complete — The Last Time Is Now** celebration.

- The celebration is stored as a persistent pending Season state before UI rendering, so closing/reloading immediately after the reward is claimed cannot silently lose the payoff.
- Cena no longer queues the generic Superstar-unlock celebration from the Tier 50 Season claim; the dedicated Season completion screen is the single authoritative reward moment.
- The screen presents the Ruby Cena Superstar card, confirms the complete **24-copy Ruby-exclusive package**, and reports whether the authored **60-page Cena deck** is ready.
- Completion actions provide direct routes to **Play as John Cena**, **Open Cena in Deck Lab**, or **View the completed Season Road**.
- Dismissing the celebration marks it seen and clears the pending flag; the Tier 50 reward itself remains permanently claimed.

The v0.16.01/v0.16.02 reward standard remains unchanged:

- 5 Ruby Protobombs.
- 5 Ruby Five Knuckle Shuffles.
- 5 Ruby STFs.
- 5 Ruby Attitude Adjustments.
- 1 Ruby Hustle, Loyalty, Respect.
- 1 Ruby Never Give Up.
- 1 Ruby The Time Is Now Entrance.
- 1 Ruby John Cena Superstar.

That is **24 reward-exclusive Ruby copies** in total, and the completed Cena authored deck remains 60 pages using the highest owned printing of shared cards.

## Automated verification

- v0.18.00 targeted tests: **5/5 passed**.
- Focused onboarding + inherited Cena/Welcome regression selection: **15 passed / 0 failed / 2 intentionally skipped**.
- New onboarding/Season certification harness: **all assertions passed**.
- Rules Interaction Matrix: **23/23 passed**.
- Full no-assets suite: **949 discovered / 845 passed / 94 intentionally skipped / 10 expected physical-asset-presence failures only**.
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**.
- Collector/card-ID audit: **782/782 / 0 issues**.
- Flow audit: **0 issues**.
- Structured card-effect audit: **390 effect-bearing cards / 0 issues**.
- Counter-state audit: **517 Moves / 0 issues**.
- Reverse printed-text audit: **706 cards / 0 issues**.
- Card-health/four-tier audit: **0 issues**.

The 10 full-suite failures are the same physical-file assertions expected from a package that intentionally excludes `assets/`; there are no gameplay/data regression failures.

## Packaging

The certified distribution contains **no `assets/` directory**.
