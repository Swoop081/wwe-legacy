# WWE Legacy v0.18.00 — Season 1 + Onboarding Certification

This verified no-assets overlay build supersedes v0.17.01 and completes the next pre-v1.0 release gate: **Season 1 completion experience + new-player onboarding certification/polish**.

## Season 1 now finishes like a true major reward

Tier 50 no longer falls through to the standard Superstar-unlock celebration. Claiming the final Season reward now opens a dedicated **Season 1 Complete** presentation centered on John Cena and the full Ruby package.

The completion screen confirms:

- **24/24 Ruby-exclusive reward copies** are earned across the Season.
- John Cena is unlocked at Ruby.
- The Time Is Now is equipped when owned.
- Cena's authored 60-page deck has been assembled from the highest owned printings of shared cards.

The player can immediately **Play as John Cena**, open him in **Deck Lab**, or return to the completed Season Road. The celebration is saved as pending before it renders, so a reload immediately after Tier 50 cannot lose the completion moment.

The established reward package itself is unchanged: 5 Ruby copies each of Protobomb, Five Knuckle Shuffle, STF and Attitude Adjustment, plus Ruby Hustle Loyalty Respect, Never Give Up, The Time Is Now and the John Cena Superstar.

## New-player onboarding polish

The existing onboarding structure remains lightweight rather than becoming a forced tutorial.

- Starter choice remains **CM Punk or Roman Reigns**, each with a complete playable 60-page Normal deck.
- Fresh profiles retain Amazing Entrance plus 5 Normal copies of every Momentum Method.
- The Welcome reward still gives a second complete 60-page Normal deck from one of the five launch-live sets.
- The Welcome reveal now includes a horizontal **Match Basics** rail: Momentum, Control, Adrenaline, Counters and finishing.
- The first-match coach is now context-aware and progresses through **Build Momentum / Control the Match / Defend with Counters / Finish the Match**, with a Submission explanation when relevant.
- Players can hide the guide at any time; it ends automatically after the first completed match. Existing saves are not pushed back through onboarding.

## Certification

- v0.18.00 targeted tests: **5/5 passed**.
- Focused onboarding/Cena/Welcome regressions: **15 passed / 0 failed / 2 intentionally skipped**.
- Starter certification: **2/2 paths**, all 60-page playable decks.
- Welcome certification: **5/5 set paths**, all 60-page playable Normal decks.
- Season completion certification: Cena unlocked, **24 Ruby-exclusive copies**, **60-page authored deck**, persistent dedicated completion state.
- Rules Interaction Matrix: **23/23**.
- Full no-assets suite: **949 discovered / 845 passed / 94 intentionally skipped / 10 expected physical-asset-presence failures only**.
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**.
- Collector/card-ID audit: **782/782 / 0 issues**.
- Flow/effect/Counter-state/printed-text/card-health audits: **0 issues**.

## v1.0 gate status

**Completed:** Final Gameplay Certification; first-month Economy + Progression Certification; Ruby reward standard/migration; Championship Road + Live Events certification; Season 1 completion + new-player onboarding certification.

**Next:** save durability/recovery + long-session/performance + final iPhone-wide UI consistency certification.

## Packaging

The ZIP intentionally contains **no `assets/` directory**. Overlay it on the current WWE Legacy installation so the existing image library is retained.
