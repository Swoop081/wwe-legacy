# WWE Legacy v0.14.06 — Build Certification

**Build:** v0.14.06 — Match State Recovery + Season Splash  
**Date:** 23 August 2026  
**Distribution:** no-assets overlay package

## Verification

Full verification was executed with the inherited v0.14.00/current flat asset library temporarily mounted. The distributed ZIP excludes `assets/`.

- Node tests: **834 discovered / 737 passed / 0 failed / 97 intentionally skipped historical contracts**
- v0.14.06 targeted engine/splash tests: **7/7 passed**
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**
- Collector ID audit: **782 cards / 782 manifest / 0 issues**
- Flow audit: **76/76 Superstars / 0 issues**
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**
- Counter/submission-state audit: **706 gameplay cards / 517 Moves / 0 issues**
- Inherited flat asset audit: **617 images / 310 installed gameplay-card fronts / 158 layered / 152 flat / 48 headshots / 39 menu portraits**

## Locked v0.14.06 engine behavior

1. **Grounded recovery:** a Superstar in `on-mat` / grounded posture automatically stands when Control transfers to them. Grounded can still persist while the opponent retains Control for legal grounded follow-ups.
2. **Stun defense lock:** while Stun is active, that Superstar cannot use a normal Counter/reversal or Auto Counter. The same rule applies to CPU players.
3. **Stun consumption:** existing Stun clears on the first of: an opponent Move successfully Connects; the stunned Superstar commits a legal Move after gaining Control; or the stunned Superstar passes.
4. **Fresh Stun preservation:** when the connecting Move both consumes an old Stun and inflicts a new Stun, the newly inflicted Stun remains.
5. Card standing/grounded requirements are unchanged.

## Season 1 launch splash

- Rebuilt as a premium two-column John Cena hero/reward splash.
- Copy now reflects the current **50-tier Season Road**.
- Completion messaging explicitly identifies **Tier 50 — Ruby John Cena Superstar**.
- The collectible reward card is centered and no longer disappears when a finished Cena card-front export is absent; it can render using the installed Cena character source inside the physical-card treatment.

## Post-fix Superstar balance audit

A fixed-seed launch-roster audit was run **after** the match-state correction. This is diagnostic only; v0.14.06 does not auto-retune any Superstar.

- **41 released/reward Superstars**
- **16,400 matches / 0 stalls**
- **26.79 average turns**
- Finishes: **14,172 pin / 2,228 submission**
- Razor Ramon: **56.6%**
- Mankind: **53.0%**
- Highest current audit rates: André the Giant **66.1%**, Diesel **65.0%**, Oba Femi **64.4%**
- Lowest current audit rates: John Cena **35.3%**, Ted DiBiase **35.0%**, Doink the Clown **27.1%**
- Largest state-fix movement vs v0.14.05: Liv Morgan **+7.8 pp**, Doink the Clown **−10.4 pp**, Shawn Michaels **−6.4 pp**

These outliers are flagged for a later balance decision; no balance changes were applied as part of this bug-fix build.

## Packaging

The user-facing build **excludes the entire `assets/` directory** and overlays the existing current asset library.
