# WWE Legacy v0.14.14 — Build Certification

**Build:** v0.14.14 — Championship Road Launch Hotfix  
**Date:** 23 August 2026  
**Distribution:** verified no-assets overlay package

## Blocking regression fixed

- Reproduced the v0.14.13 Championship Road launch path in source: `startCurrentChampionshipMatch()` passes section metadata containing `rewardSetId` / `championshipSectionId` into `startMatch()`.
- Confirmed the shared matchup splash then treated any non-null metadata as a Live Event and evaluated `eventMeta.eventName.toUpperCase()`. Championship Road metadata does not define `eventName`, which blocks the transition immediately after tapping **FIGHT MATCH**.
- v0.14.14 normalizes splash metadata by mode. Only `mode === "live-event"` exposes Live Event heading/stage/rule fields; Championship Road metadata remains available for set/arena presentation without entering the Live Event rendering branch.
- Championship Road Fight Match therefore reaches the standard MAIN EVENT matchup splash again for all per-Superstar roads.
- Stale hero copy corrected from `24 MATCHES · FOUR DIFFICULTIES` to `40 MATCHES · FOUR DIFFICULTIES`.

## Automated verification

Full verification against the inherited current flat asset library plus the exact supplied Cena plate:

- Node tests: **866 discovered / 768 passed / 0 failed / 98 intentionally skipped historical contracts**
- v0.14.14 targeted regression tests: **2/2 passed**
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**
- Collector ID audit: **782 cards / 782 manifest entries / 0 issues**
- Flow audit: **76 Superstars / 0 issues**
- Card-effect audit: **574 scoped gameplay cards / 389 effect-bearing / 0 issues**
- Counter/submission-state audit: **706 gameplay cards / 517 Moves / 0 issues**

## Gameplay/data impact

No card stats/effects, decks, Championship Road progress, difficulty rules, opponent order, rewards, pack odds, Superstar pity, Season XP, Daily Live Event XP or collection ownership changed.

## Packaging

The user-facing ZIP contains **no `assets/` directory** and is intended to overlay the user's existing WWE Legacy installation.
