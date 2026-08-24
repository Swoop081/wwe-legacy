# WWE Legacy v0.14.25 — Roster Balance + Reactive Control Consistency

This verified no-assets overlay build supersedes v0.14.24.

## What changed

- **Oba Femi:** The Ruler now requires a **C7+ Strength Move** instead of C6+ before its once-per-match draw triggers. HP and move damage remain unchanged.
- **Roman Reigns:** Tribal Chief can now regain Control only after one of Roman’s **non-Finisher Moves is successfully Countered**. Passing, failed pins, kickouts and other Control losses no longer offer the card.
- **Doink the Clown:** HP **62 → 63** and Stump Puller pressure **6 → 7**.
- **Becky Lynch:** HP **65 → 67** and Dis-arm-her pressure **6 → 7**. Manhandle Slam remains D17.
- **Mr. Perfect:** HP **64 → 65**. Perfect Execution now gives its draw + **1 Adrenaline** package on the first **3 successful Counters** each match; the per-Control-sequence Technical discount remains 2.

## Reactive Control consistency

- **Best in the World** and generic **Shoulder Up** now stop the Pin and then resolve Control using the normal failed-pin rules; they no longer override printed/ability-based failed-pin Control retention.
- **Welcome to the KO Show** still cancels an opponent Action or Support and consumes that window, but it no longer steals Control.
- **The Deadman Rises** and **Veteran Instincts** were clarified to use the Control change that already comes from a successful kickout or Counter rather than claiming a second special Control takeover.
- Counter-specific retain/regain effects such as Bloodline Rules, Hammer in the Boot and 173–0 remain tied to their authored counter triggers.

## Simulation targets

Focused released-roster audits (800 matches per Superstar) landed at: **Oba 58.25%**, **Roman 60.75%**, **Doink 48.63%**, **Becky 45.88%**, **Mr. Perfect 49.38%**, **CM Punk 49.63%**, **Kevin Owens 54.75%**, with **0 stalls** in every focused run. Cena remains elite at **61.50%**.

The full released-roster round robin is **41 Superstars / 16,400 matches / 0 stalls**, averaging **26.80 turns**. The primary post-pass results are Roman **61.4%**, Cena **61.1%**, Oba **55.8%**, Kevin Owens **59.0%**, Punk **49.1%**, Doink **46.0%**, Becky **45.6%**, and Mr. Perfect **45.3%**.

## Packaging

The ZIP intentionally contains **no `assets/` directory** and is designed to overlay the current WWE Legacy installation without replacing or deleting image assets.
