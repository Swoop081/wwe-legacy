# WWE Legacy v0.14.14 — Championship Road Launch Hotfix

This is a **verified no-assets overlay build**. Copy it over the current WWE Legacy installation while retaining the existing `assets/` folder.

## Critical fix

v0.14.13 introduced a blocking Championship Road launch regression. Tapping **FIGHT MATCH** supplied Championship Road section metadata to the shared matchup splash so the correct era arena/ring theme could be used. The splash mistakenly treated that metadata as Daily Live Event metadata and read an `eventName` field that Championship Road does not have, stopping the transition before the match could begin.

v0.14.14 separates the two metadata paths:

- Live Event metadata drives Live Event headings and rule panels only when the mode is actually `live-event`.
- Championship Road metadata continues to provide the active section set identity for the correct Golden Era / New Generation / Attitude Era / SummerSlam / Evolution presentation.
- **FIGHT MATCH** now proceeds through the normal MAIN EVENT matchup flow for Championship Road.
- The stale Championship Road header copy is corrected from **24 MATCHES** to **40 MATCHES**.

All v0.14.13 tabled changes remain intact: 40-match ten-section road order, Golden Era Part II and Attitude Era Part II, per-Superstar progress, legacy 32→40 migration, frozen upper control deck, lower-route current-group focus, Opponent Entrance spacing, and all earlier WWE Legacy fixes.

## Verification

Verified against the inherited current asset library:

- **866 tests discovered / 768 passed / 0 failed / 98 intentionally skipped historical contracts**
- v0.14.14 targeted tests: **2/2 passed**
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 orphans / 0 issues**
- Collector ID audit: **782 / 782 / 0 issues**
- Flow audit: **76 / 76 / 0 issues**
- Card-effect audit: **0 issues**
- Counter/submission-state audit: **0 issues**

## Packaging

The `assets/` directory is intentionally excluded from this ZIP. No image assets are added, removed, renamed or replaced by this hotfix.
