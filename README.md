# WWE Legacy v0.14.20 — Roster Balance Pass

This is a **verified no-assets overlay build**. Copy it over the current WWE Legacy installation while retaining the existing `assets/` folder.

## Current change

v0.14.20 implements the approved roster-audit balance pass across the current and authored upcoming roster without changing collector identities, rarity, deck size, pack economy or core match rules.

- **André the Giant — Giant’s Reach:** now triggers only the first time each match. It still gives the next Strength Move in that Control sequence **−1 Cost / +2 Damage**, but no longer grants +1 Adrenaline.
- **Diesel — Jackknife Powerbomb:** **Cost 11 → 12**; Damage remains 18.
- **Doink the Clown:** **HP 60 → 62**; The Joke’s on You now makes the first two successful Counters each match **draw 2 + gain 1 Adrenaline**; Drop Toe Hold now searches/draws Stump Puller and makes it cost 1 less that Control sequence; Stump Puller pressure **5 → 6**.
- **Ted DiBiase:** Million Dollar Dream pressure **6 → 7**; Everybody Has a Price now triggers on the first **3** qualifying Technical connects instead of 2.
- **Mr. Perfect:** Perfect-Plex immediate-pin kickout penalty **−10 → −15 percentage points**; Perfect Execution keeps its once-per-Control **Technical −2 Cost** reward and the first two successful Counters each match additionally draw 1 page.
- **Rowdy Roddy Piper:** Piper’s Pit still shuts down one Counter for the current Control sequence, but the old future +2 Adrenaline Counter tax is replaced by a cleaner effect: the opponent loses **1 Adrenaline the next time they gain Control**. If no Counter exists in hand, Piper still draws 1.
- **Becky Lynch:** **HP 64 → 65**; Dis-arm-her pressure **5 → 6**; Manhandle Slam Damage **16 → 17**.
- **Owen Hart:** **HP 62 → 63**; Two-Time Slammy Award Winner may now take eligible **1★/2★/3★ Moves** from the top seven pages, still capped at two different choices.
- **Randy Savage:** Macho Madness remains capped at the first two qualifying sequences, but its **draw 1 is removed**. It now grants only **+1 Adrenaline**, which was the first tested lever that produced a meaningful reduction without damaging the Flying Elbow chain.
- **John Cena:** Hustle, Loyalty, Respect is now a genuinely persistent installed Support. The **first time Cena reaches 50% HP or less**, it grants **+2 Adrenaline and draw 1**, even when installed earlier; installing it after Cena is already at/below the threshold triggers it immediately. It can trigger only once.
- **Penta:** Cero Miedo no longer gives +1 starting Adrenaline. Its authored starting Momentum package remains intact.
- **Lola Vice:** **HP 59 → 61**; Triangle Choke pressure **5 → 6**.

## Post-pass roster audit

A fresh released-roster CPU-vs-CPU audit completed **16,400 matches across 41 released Superstars with 0 stalls** and a **26.91-turn** average.

Notable post-pass positions: André **60.8%**, Diesel **60.8%**, Randy Savage **54.3%**, Ted DiBiase **45.5%**, Owen Hart **42.0%**, Doink **41.9%**, Mr. Perfect **41.9%**, Becky Lynch **40.9%**, and John Cena **35.6%**. Oba Femi (**64.3%**) and Roman Reigns (**62.6%**) remain on the audit watchlist; no speculative change was applied to either in this pass because the earlier candidate tests did not isolate a clean Roman lever and Oba’s identity-preserving lever still needs a dedicated follow-up choice.

Cena’s HLR fix is confirmed live in CPU matches; the fresh simulation shows he remains a low outlier even after the behavior correction, so any further Cena numerical buff should be a separate measured follow-up rather than bundled blindly into this pass.

## Carry-forward baseline

v0.14.20 carries forward the complete v0.14.19 baseline, including the Rhea Crucifix Auto Build repair, compact Tier Up rewards, four-track Set Milestones, RAW hub typography/in-match branding, 50-tier Season 1 structure, 40-match per-Superstar Championship Road, Live Event rewards/rotation, four-tier print system, booster collation and all previously locked gameplay/UI fixes.

## Verification

- v0.14.20 targeted roster-balance tests: **5/5 passed**.
- Full no-assets suite: **879 tests discovered / 775 passed / 94 skipped / 10 expected asset-presence failures**. The 10 failures are inherited tests that explicitly require the intentionally omitted `assets/` library.
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**.
- Collector ID audit: **782 cards / 782 manifest entries / 0 issues**.
- Flow audit: **76 Superstars / 0 issues**.
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**.
- Counter/submission-state audit: **706 gameplay cards / 517 Moves / 0 issues**.
- Released-roster balance audit: **41 Superstars / 16,400 matches / 0 stalls**.

## Packaging

The user-facing ZIP intentionally contains **no `assets/` directory** and is designed to overlay the current WWE Legacy installation without replacing or deleting image assets.
