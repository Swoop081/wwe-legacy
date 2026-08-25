# WWE Legacy v0.16.01 — Cena Ruby Season Completion

This verified no-assets overlay build supersedes v0.16.00 and corrects the Season 1 John Cena reward package so completing **The Last Time Is Now** gives the player Cena's best exclusive cards rather than lower-printing versions that can later be upgraded.

## Cena is Ruby-only

All eight Season 1 Cena collectibles are now fixed to **Ruby**. They do not have Normal, Emerald or Sapphire printings:

- Protobomb — 5 Ruby copies earned during Season 1.
- Five Knuckle Shuffle — 5 Ruby copies earned during Season 1.
- STF — 5 Ruby copies earned during Season 1.
- Attitude Adjustment — 5 Ruby copies earned during Season 1.
- Hustle, Loyalty, Respect — 1 Ruby copy.
- Never Give Up — 1 Ruby copy.
- The Time Is Now — 1 Ruby Entrance.
- John Cena — 1 Ruby Superstar card at Tier 50.

The four Moves are still distributed across the 50-tier Season so the player progressively builds Cena's package, but every awarded copy is already the best available printing.

Because Ruby is +1 over the authored Sapphire gameplay baseline, the four exclusive Move outcomes are now:

- Protobomb: **D11**.
- Five Knuckle Shuffle: **D11**.
- STF: **Pressure 8**.
- Attitude Adjustment: **D19**.

The established Costs, Method requirements and card effects remain unchanged.

## Tier 50 completion deck

Claiming the Tier 50 Cena Superstar reward now also:

- unlocks John Cena;
- equips **The Time Is Now** when its Ruby reward has been earned;
- assembles Cena's canonical authored **60-page deck** from the player's collection;
- uses the highest owned printing of each shared card when multiple printings are available;
- keeps every Cena-exclusive Season card at Ruby.

This does **not** grant missing shared cards. The completion action builds the strongest legal version available from what the player already owns, while Season 1 itself guarantees Cena's full exclusive package.

## Existing-save migration

Profile schema advances to **v41**. Existing profiles from v0.16.00 or earlier are repaired automatically:

- any Normal / Emerald / Sapphire copies of a Cena Season-exclusive card are collapsed into the equivalent Ruby ownership;
- saved-deck references to lower Cena printings are rewritten to Ruby;
- completed Cena Season profiles rebuild Cena's best owned authored deck and equip The Time Is Now where available.

No duplicate copies are created beyond the normal five-copy ownership cap.

## Balance and economy certification

The Ruby-only package was tested separately because increasing Cena's exclusive cards to Ruby also increases his playable power.

A focused **3,200-match released-roster audit** using Ruby Cena exclusives produced:

- **59.94% Cena win rate**;
- **1,918 wins / 1,282 losses**;
- **0 stalls**;
- **24.64 average turns**.

That keeps Cena in the intended elite Season-reward band without pushing him beyond the launch power ceiling.

The v0.16.00 first-month economy certification was also rerun. Reward pacing is unchanged: the target 30-match/day cohort still reaches Tier 50 on **day 28.1 mean** (day 28–29 observed), and the structured reward ceiling still reaches Tier 50 on day 24. No XP, booster quantity, pack odds, pity, UP or Set Milestone values changed.

## Verification

- v0.16.01 + inherited economy targeted tests: **8/8 passed**.
- Cena Ruby-specific tests: **5/5 passed**.
- Cena focused balance audit: **3,200 matches / 59.94% / 0 stalls**.
- First-month economy certification rerun: **20 target + 10 structured-ceiling simulations / all assertions passed**.
- Rules Interaction Matrix: **23/23 passed**.
- Full no-assets suite: **929 discovered / 825 passed / 94 intentionally skipped / 10 expected physical-asset-presence failures only**.
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**.
- Collector/card-ID audit: **782/782 / 0 issues**.
- Flow audit: **0 issues**.
- Structured card-effect audit: **390 effect-bearing cards / 0 issues**.
- Counter-state audit: **517 Moves / 0 issues**.
- Reverse printed-text audit: **706 gameplay cards / 0 issues**.
- Card-health/fixed-printing/four-tier audit: **0 issues**.

## v1.0 gate status

**Completed:** Final Gameplay Certification; First-Month Economy + Progression Certification; Cena Season 1 reward-integrity correction.  
**Next:** Championship Road + Live Events structured-mode certification.

## Packaging

The ZIP intentionally contains **no `assets/` directory**. Overlay it on the current WWE Legacy installation so the existing image library is retained.
