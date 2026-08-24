# WWE Legacy v0.14.20 — Build Certification

**Build:** v0.14.20 — Roster Balance Pass  
**Date:** 25 August 2026  
**Distribution:** verified no-assets overlay package

## Implemented balance changes

### Top-end corrections

- **André the Giant:** Giant’s Reach max uses **2 → 1** and removes its +1 Adrenaline reward; its −1 Strength Cost / +2 Damage follow-up remains.
- **Diesel:** Jackknife Powerbomb **C11/D18 → C12/D18**.
- **Randy Savage:** Macho Madness removes its draw reward while retaining **+1 Adrenaline** and the existing **2-use** cap.

### Bottom-end / identity improvements

- **Doink:** HP **60 → 62**; first two successful Counters draw 2 and gain +1 Adrenaline; Drop Toe Hold searches Stump Puller with −1 Cost; Stump Puller pressure **5 → 6**.
- **Ted DiBiase:** Million Dollar Dream pressure **6 → 7**; Everybody Has a Price max uses **2 → 3**.
- **Mr. Perfect:** Perfect-Plex immediate-pin penalty **10 → 15 percentage points**; Perfect Execution additionally draws 1 on the first two successful Counters each match while keeping its existing once-per-Control Technical discount.
- **Roddy Piper:** Piper’s Pit replaces the old future Counter tax with **−1 opponent Adrenaline on their next gain of Control**, while retaining the current-Control Counter lock and no-Counter draw fallback.
- **Becky Lynch:** HP **64 → 65**; Dis-arm-her pressure **5 → 6**; Manhandle Slam Damage **16 → 17**.
- **Owen Hart:** HP **62 → 63**; Two-Time Slammy Award Winner rarity ceiling **2★ → 3★**.
- **John Cena:** Hustle, Loyalty, Respect becomes a persistent once-only 50%-HP trigger whether installed before or after reaching the threshold.
- **Penta:** Cero Miedo starting Adrenaline **+1 → 0**.
- **Lola Vice:** HP **59 → 61**; Triangle Choke pressure **5 → 6**.

## Runtime implementation notes

- Piper’s next-Control Adrenaline drain persists across Control-sequence resets, consumes exactly once when the affected opponent next gains Control, and is separate from the Counter that Piper’s Pit locks during the current sequence.
- Perfect Execution’s new draw counter is match-persistent while its Technical Cost reduction remains Control-sequence scoped.
- Cena’s HLR Support now checks the installed persistent effect whenever Cena takes connected Move damage, self-damage, or Brass Knuckles damage, and also resolves immediately if installed after Cena is already at/below 50% HP.
- Owen’s Slammy choice UI now exposes 1★/2★/3★ eligibility consistently with the gameplay filter.
- Card-effect audit coverage now recognizes the HLR persistent Support implementation.

## Automated verification

- v0.14.20 targeted tests: **5/5 passed**.
- Full no-assets test run: **879 discovered / 775 passed / 94 skipped / 10 expected asset-presence failures**. All 10 failures require files in the intentionally omitted `assets/` directory; no logic/data regression failures remain.
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**.
- Collector ID audit: **782 / 782 / 0 issues**.
- Flow audit: **76 Superstars / 0 issues**.
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**.
- Counter/submission-state audit: **706 gameplay cards / 517 Moves / 0 issues**.

## Balance simulation certification

Released-roster audit after the pass:

- **41 released Superstars**
- **16,400 CPU-vs-CPU matches**
- **0 stalls**
- **26.91 average turns**
- Finish mix: **14,024 pins / 2,376 submissions**

Key movement after the approved changes includes André and Diesel at **60.8%**, Randy Savage at **54.3%**, Ted DiBiase at **45.5%**, and Doink improving into the low-40s. Oba Femi (**64.3%**) and Roman Reigns (**62.6%**) remain watchlist items rather than receiving an unproven v0.14.20 nerf. Cena’s corrected HLR trigger is active in simulation but Cena remains a low outlier (**35.6%**), supporting a separate measured follow-up rather than an untested numerical change in this package.

## Gameplay/economy boundaries

No collector ID, card rarity, authored 60-page deck composition, pack odds/collation, Season XP, Daily Live Event XP, Superstar pity, Championship Road structure, live-set release state, collection ownership, or core pin/Control/Adrenaline/Counter rules changed except for the explicit card/Superstar balance effects listed above.

## Packaging

The ZIP intentionally contains **no `assets/` directory**. Overlay it on an existing WWE Legacy installation so the current asset library is retained.
