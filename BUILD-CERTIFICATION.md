# WWE Legacy v0.14.25 — Build Certification

**Build:** v0.14.25 — Roster Balance + Reactive Control Consistency  
**Date:** 25 August 2026  
**Distribution:** verified no-assets overlay package

## Objective

Finish the next roster-balance pass while applying one consistent rule to reactive effects that stop a Pin, cancel utility, or regain/retain Control.

## Implemented balance

- Oba Femi — The Ruler threshold C6+ → C7+ Strength.
- Roman Reigns — Tribal Chief only after a countered non-Finisher Move.
- Doink the Clown — HP 62 → 63; Stump Puller pressure 6 → 7.
- Becky Lynch — HP 65 → 67; Dis-arm-her pressure 6 → 7.
- Mr. Perfect — HP 64 → 65; first 3 successful Counters each match draw 1 + gain 1 Adrenaline through Perfect Execution; Technical discount remains 2.

## Reactive Control consistency

- Best in the World and Shoulder Up stop the Pin, then normal failed-pin Control rules resolve.
- Welcome to the KO Show cancels the opponent utility and spends its Action/Support window without taking Control.
- The Deadman Rises and Veteran Instincts retain their authored bonuses but no longer imply a redundant special Control takeover.
- Roman’s Tribal Chief now matches the counter-specific design family rather than triggering after every Control loss.

## Focused balance verification

800 released-roster matches per listed Superstar, 0 stalls in every run:

- Oba Femi: **58.25%**
- Roman Reigns: **60.75%**
- Doink the Clown: **48.63%**
- Becky Lynch: **45.88%**
- Mr. Perfect: **49.38%**
- CM Punk: **49.63%**
- Kevin Owens: **54.75%**
- John Cena: **61.50%**

## Full released-roster verification

- **41 released Superstars / 16,400 matches / 0 stalls**
- **26.80 average turns**
- Pin finishes: **13,915**; Submission finishes: **2,485**
- Key results: Roman **61.4%**, Cena **61.1%**, Kevin Owens **59.0%**, Oba **55.8%**, Punk **49.1%**, Doink **46.0%**, Becky **45.6%**, Mr. Perfect **45.3%**

## Automated verification

- v0.14.25 targeted tests: **5/5 passed**.
- Full no-assets suite: **900 discovered / 796 passed / 94 intentionally skipped / 10 expected asset-presence failures only**.
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**.
- Collector audit: **782/782 / 0 issues**.
- Flow, card-effect and counter-state audits: **0 issues**.

## Packaging

The ZIP intentionally contains **no `assets/` directory**. Overlay it on the current WWE Legacy installation so the installed asset library is retained.
