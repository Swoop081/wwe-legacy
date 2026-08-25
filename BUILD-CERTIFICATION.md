# WWE Legacy v0.15.00 — Build Certification

**Build:** v0.15.00 — Final Gameplay Certification  
**Date:** 25 August 2026  
**Distribution:** verified no-assets overlay package

## Objective

Begin the pre-v1.0 certification track by freezing the core gameplay rules behind a reproducible interaction matrix, performing a higher-confidence released-roster balance certification, and removing any engine duplication discovered during the pass.

## Rules Interaction Matrix

**23/23 scenarios passed.** Coverage includes Lead Off / Turn 1 draw behavior, Entrance Adrenaline, retained-Control replenishment, connected-Move Adrenaline, Counter/Control transfer, Tribal Chief, failed Pin and Pin-escape retention, Pin health gates, quick-pin modifiers, Submission lifecycle/persistence, Finisher Method exemption, Stun, Auto Counter, Once Too Often, Action Counter immunity, KO Show cancellation, Hustle Loyalty Respect, Playbook recycling and posture-vs-Counter-state legality.

The matrix is available through `npm run rules-matrix`.

## Engine hygiene

Removed a duplicate identical `attemptPin()` / `_pinChance()` method pair from `MatchEngine`. A v0.15.00 regression now requires exactly one canonical Pin implementation.

## Final roster balance

### Becky Lynch

A focused released-roster baseline at HP67 produced **686–914 (42.88%)** over 1,600 matches. Candidate testing gave:

- HP68: **44.50%**.
- HP69: **45.88%**.

The final build therefore locks **Becky Lynch HP 67 → 69**. Dis-arm-her, Manhandle Slam, The Man, Straight Fire and her deck composition remain otherwise unchanged.

### Two-seed released-roster certification

Two independent 16,400-match round robins were combined for the final balance read:

- **32,800 matches**.
- **41 released Superstars**.
- **1,600 matches per Superstar**.
- **0 stalls**.
- **26.82 average turns**.
- **27,590 Pins / 5,210 Submissions**.
- **0 hard outliers** where the 95% Wilson interval sits entirely below 42% or above 62%.

Top/reference results: André **61.44%**, Bret **58.75%**, Brock **58.44%**, Cody **57.44%**, Roman **57.12%**, Cena **56.50%**.

Lower edge: Becky **44.38%**, Doink **44.31%**, Piper **43.94%**, Paige **43.81%**. All remain statistically inside the approved launch floor rather than warranting another broad balance sweep.

## Card / deck health carried forward

- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**.
- Collector manifest: **782/782 / 0 issues**.
- Flow audit: **0 issues**.
- Structured effects: **390 effect-bearing cards / 0 issues**.
- Counter states: **517 Moves / 0 issues**.
- Reverse printed-text audit: **706 gameplay cards / 0 issues**.
- Rarity health: 2★ Uncommon Moves **64 / C5.11 / D6.66 / 1.30 D:C**; 3★ Rare Trademarks **94 / C5.43 / D8.07 / 1.52 D:C**.
- Four-tier scaling issues: **0**.
- Counter density unchanged: **13.59 structural / 14.59 effective average**, range **9–20**, with full 8-state / 4-Submission-target coverage in all 41 released decks.

## Automated verification

- v0.15.00 targeted regression tests: **3/3 passed**.
- Rules Interaction Matrix: **23/23 passed**.
- Full no-assets suite: **921 discovered / 817 passed / 94 intentionally skipped / 10 expected physical-asset-presence failures only**.

The 10 failures are the same no-assets physical-file assertions carried by verified overlay distributions and are not gameplay/data regressions.

## v1.0 gate status

**Completed:** Final gameplay interaction certification + final roster balance confidence pass.  
**Next gate:** Economy/progression end-to-end simulation and reward pacing certification.

## Packaging

The ZIP intentionally contains **no `assets/` directory**.
