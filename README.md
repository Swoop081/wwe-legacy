# WWE Legacy v0.15.00 — Final Gameplay Certification

This verified no-assets overlay build supersedes v0.14.28 and begins the pre-1.0 certification track.

## Final gameplay certification

v0.15.00 adds a dedicated **Rules Interaction Matrix** for the core gameplay combinations most likely to fail when individually-correct systems interact. The matrix currently certifies **23/23** scenarios covering:

- Lead Off 5 / no Turn 1 automatic draw.
- first-Control Entrance Adrenaline.
- retained-Control draw behavior.
- connected-Move Adrenaline shift.
- successful Counters and Control transfer.
- Roman Reigns / Tribal Chief Counter-specific regain logic.
- failed Pins, Pin escapes and failed-pin Control-retention effects.
- Green-health Pin lockout and Amber/Red Pin windows.
- quick-pin kickout modifiers.
- Submission response, maintenance, persistent body damage, release and current-HP tap threshold.
- Finisher Method-requirement exemption while still paying Cost.
- Stun interaction with Moves, passing, normal Counters and Auto Counter.
- Auto Counter escalation and minimum two-page remainder.
- Finishers / Counter-attacks being protected from Auto Counter.
- Once Too Often repeat-only legality and self/counter-attack exclusions.
- ordinary Actions remaining outside normal Move Counter windows.
- KO Show utility cancellation retaining the opponent's Control.
- Cena's Hustle, Loyalty, Respect threshold trigger.
- discard-to-Playbook recycling.
- proactive Standing-only restrictions not invalidating otherwise-legal Counter-state reversals.

The MatchEngine also had an old duplicate `attemptPin()` / `_pinChance()` implementation block removed. The two copies were identical, so this is an engine-hygiene cleanup with no intended rules change; a regression test now requires one canonical implementation.

## Final roster balance

A second independent simulation seed showed Becky Lynch was still the only released Superstar repeatedly sitting on the intervention edge. Her earlier 67 HP build produced **42.88%** in a focused 1,600-match released-roster audit.

- **Becky Lynch HP 67 → 69**.
- Dis-arm-her remains Pressure 7.
- Manhandle Slam remains Damage 17.
- The Man ability remains unchanged.

Focused post-change Becky audit: **1,600 matches / 45.88% / 0 stalls**.

For final roster certification, two independent full released-roster round robins were combined:

- **41 released Superstars**.
- **32,800 matches total**.
- **1,600 matches per Superstar**.
- **0 stalls**.
- **26.82 average turns**.
- **27,590 Pins / 5,210 Submissions**.
- **0 hard balance outliers** using the launch intervention gates and 95% Wilson intervals.

Key results:

- André the Giant **61.44%**.
- Bret Hart **58.75%**.
- Brock Lesnar **58.44%**.
- Cody Rhodes **57.44%**.
- Roman Reigns **57.12%**.
- John Cena **56.50%**.
- Becky Lynch **44.38%** combined / **45.88%** focused.
- Doink the Clown **44.31%**.
- Rowdy Roddy Piper **43.94%**.
- Paige **43.81%**.

Those lower-edge results remain inside the accepted specialist/high-variance launch band; none has a 95% confidence interval wholly below the 42% intervention floor.

## Card / Counter health

The existing v0.14.26–v0.14.28 health safeguards remain clean:

- **706/706** gameplay cards pass reverse printed-text → runtime auditing.
- Structured card-effect audit: **390 effect-bearing cards / 0 issues**.
- Counter-state audit: **517 Moves / 0 issues**.
- Released 2★ Uncommon Moves: **64**, avg C5.11 / D6.66 / 1.30 D:C.
- Released 3★ Rare Trademarks: **94**, avg C5.43 / D8.07 / 1.52 D:C.
- Normal / Emerald / Sapphire / Ruby Damage and Submission Pressure scaling: **0 issues**.
- Counter density is unchanged from v0.14.28: **13.59 structural / 14.59 effective average**, effective range **9–20**, with **41/41** released decks retaining 8/8 Counter-state + 4/4 Submission-target coverage.

## Verification

- v0.15.00 targeted tests: **3/3 passed**.
- Rules Interaction Matrix: **23/23 passed**.
- Full no-assets suite: **921 discovered / 817 passed / 94 intentionally skipped / 10 expected physical-asset-presence failures only**.
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**.
- Collector/card-ID audit: **782/782 / 0 issues**.
- Flow audit: **0 issues**.
- Structured card-effect audit: **390 effect-bearing cards / 0 issues**.
- Counter-state audit: **517 Moves / 0 issues**.
- Reverse printed-text audit: **706 gameplay cards / 0 issues**.
- Card-health/tier audit: **0 issues**.

## Packaging

The ZIP intentionally contains **no `assets/` directory**. Overlay it on the current WWE Legacy installation so the existing image library is retained.
