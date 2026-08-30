# WWE Legacy v1.1.23 — Animated Art Window Hotfix Certification

## Release identity
- Version: **v1.1.23**
- Title: **Animated Art Window Hotfix**
- Date: **30 August 2026**
- Base: **v1.1.22 — Universal Animated Card Shell**
- Scope: repair the universal animation presentation so linked GIF/WebP artwork stays inside the intended artwork area instead of visually replacing the full collectible card shell.

## Implemented changes

### Runtime animated card presentation
- Animated-card rendering no longer adds a second live rarity/logo chrome layer.
- The runtime now treats animated GIF/WebP media as the **moving artwork layer only**.
- Animation is clipped into an interior artwork window, while the normal card frame, border, set logo, rarity stars and lower plaque remain the underlying canonical card face.
- Move, merch, superstar and other card families use tuned vertical clip bounds so animation does not run down through the lower plaque.
- Static card art/base-plate fallback behavior remains unchanged if no animation is present or an animation source fails.

### Card Art Studio guidance
- Studio copy now explicitly tells the user that animation is clipped into the artwork window only and that the standard shell remains intact.
- Existing linked-URL, local GIF/WebP and static-fallback workflows remain unchanged.

### Cache/versioning
- Runtime and Studio cache-busting were advanced to **v1.1.23** so the hotfix is fetched cleanly on deployment.

## Certification actually run for this package
- Focused animation regression tests: **8/8 passed**.
  - `test/v1119-animated-card-system.test.js`
  - `test/v1122-universal-animated-card-shell.test.js` (updated for v1.1.23 behavior)
- These focused tests cover universal eligibility, canonical animated path generation, runtime animation markup, artwork-window clipping rules, non-mirrored inspector back behavior and Card Art Studio animation availability/copy.
- Full suite: **1,071 discovered / 905 passed / 72 retained historical-contract failures / 94 skipped**.
- Direct comparison with v1.1.22: **0 added failing names / 0 removed failing names**; the inherited 72-failure set is identical.
- Rebuild validation: **95 Superstars / 95 decks / 835 gameplay cards / 0 orphans / 0 issues**.
- Collector ID audit: **930 cards / 930 manifest entries / 0 issues**.
- Flow audit: **95 Superstars / 0 issues**.
- Physical iPhone smoke: **pending-v1.1.23-user-smoke**.
