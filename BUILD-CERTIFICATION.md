# WWE Legacy v0.16.01 — Build Certification

**Build:** v0.16.01 — Cena Ruby Season Completion  
**Date:** 25 August 2026  
**Distribution:** verified no-assets overlay package

## Objective

Correct the Season 1 John Cena reward model so every Cena-exclusive collectible is a Ruby-only Season reward and completing Tier 50 leaves the player with Cena's strongest exclusive package plus the best legal version of his authored deck available from their owned shared cards.

## Certified reward model

The following Season 1 collectibles are fixed to **Ruby** and cannot exist as Normal, Emerald or Sapphire printings:

| Cena reward | Season quantity | Ruby gameplay value where applicable |
|---|---:|---:|
| Protobomb | 5 | D11 |
| Five Knuckle Shuffle | 5 | D11 |
| STF | 5 | Pressure 8 |
| Attitude Adjustment | 5 | D19 |
| Hustle, Loyalty, Respect | 1 | Ruby fixed printing |
| Never Give Up | 1 | Ruby fixed printing |
| The Time Is Now | 1 | Ruby fixed printing |
| John Cena Superstar | 1 | Ruby fixed printing |

Fixed-printing enforcement exists in card materialization, ownership grants, Collection rendering and saved-deck tier resolution. Requests for a lower Cena printing resolve to Ruby rather than creating an illegal alternate printing.

## Tier 50 completion behavior

The Tier 50 reward now:

1. grants the Ruby Cena Superstar;
2. confirms the complete Season-exclusive Ruby package;
3. equips the Ruby **The Time Is Now** Entrance when owned;
4. builds Cena's canonical 60-page authored deck using the highest owned printing of each shared card;
5. preserves all Cena-exclusive entries as Ruby.

No missing shared cards are gifted by this auto-build.

## Profile migration

Profile schema advances from v40 to **v41**.

For older profiles:

- all ownership of fixed Cena cards across Normal/Emerald/Sapphire/Ruby is collapsed into Ruby, respecting the five-copy cap;
- saved-deck Cena entries are rewritten to Ruby;
- completed Cena profiles rebuild the best owned authored Cena deck;
- The Time Is Now is equipped when the Ruby Entrance is owned.

Migration regression coverage confirms legacy lower-printing Cena rewards cannot survive as alternate printings.

## Focused Cena balance certification

**Method:** 3,200 CPU-vs-CPU matches against the released roster. Cena's Season-exclusive cards are materialized as Ruby; shared cards remain at the authored baseline for isolation of the reward-package power change.

**Result:**

- Matches: **3,200**.
- Wins: **1,918**.
- Losses: **1,282**.
- Win rate: **59.94%**.
- Stalls: **0**.
- Average turns: **24.64**.

Cena remains inside the intended high-50s/low-60s elite Season-reward band.

## Economy regression certification

The complete v0.16.00 30-day economy harness was rerun after the Ruby correction.

- Target cohort: **20/20** completes Tier 50; mean completion day remains **28.1**.
- Structured ceiling: **10/10** reaches Tier 50 on day **24**.
- Season booster distribution remains **SummerSlam 4 / Evolution 3 / Golden Era 3 / New Generation 3 / Attitude Era 3**.
- XP values, booster counts, printing odds, pity threshold, duplicate-UP values and milestone thresholds are unchanged.

## Automated verification

- v0.16.01 + inherited economy targeted regression selection: **8/8 passed**.
- Cena Ruby-specific tests: **5/5 passed**.
- Rules Interaction Matrix: **23/23 passed**.
- Full no-assets suite: **929 discovered / 825 passed / 94 intentionally skipped / 10 expected physical-asset-presence failures only**.
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**.
- Collector/card-ID audit: **782/782 / 0 issues**.
- Flow audit: **0 issues**.
- Structured effects: **390 effect-bearing cards / 0 issues**.
- Counter-state audit: **517 Moves / 0 issues**.
- Reverse printed-text audit: **706 gameplay cards / 0 issues**.
- Card-health / fixed-printing / four-tier audit: **0 issues**.

The 10 full-suite failures are the known physical-file assertions expected from a package that intentionally excludes `assets/`; there are no gameplay/data regression failures.

## v1.0 gate status

**Completed:** Final Gameplay Certification; First-Month Economy + Progression Certification; Cena Season 1 Ruby reward integrity.  
**Next:** Championship Road + Live Events structured-mode certification.

## Packaging

The certified distribution contains **no `assets/` directory**.
