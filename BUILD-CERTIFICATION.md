# WWE Legacy v1.1.24 — Launch Poster Centering Hotfix

## Release identity
- Version: **v1.1.24**
- Title: **Launch Poster Centering Hotfix**
- Date: **30 August 2026**
- Base: **v1.1.23 — Animated Art Window Hotfix**
- Scope: iPhone launch-screen geometry correction only.

## Implemented correction
- Removes inherited legacy `.splash-screen` padding from the Season 1 promotional poster route.
- Pins `.launch-poster-splash` directly to the viewport with `position: fixed`, `inset: 0`, `100vw` width and `100svh/100dvh` height.
- Uses explicit zero margin/padding plus flex centering so the 768×1376 poster is horizontally and vertically centered instead of being shifted right by the old splash inset.
- The poster frame is explicitly reset to zero margin and no transform.
- Poster artwork remains uncropped via the existing contain-based frame sizing.
- The transparent PLAY NOW hotspot remains percentage-positioned inside the poster frame, so centering the poster also centers the interactive target correctly.
- No image asset changed; distribution remains a no-assets code overlay.
- No gameplay, animated-card behavior, Merch, balance, card data, roster, economy, progression or save-schema change from v1.1.23.

## Certification
- Launch poster + animation carry-forward focused checks: **9/9 passed**.
- Full suite: **1,072 discovered / 906 passed / 72 retained historical-contract failures / 94 skipped**.
- Failure-name comparison with the inherited v1.1.22/v1.1.23 historical set: **0 added / 0 removed**.
- Rebuild validation: **95 Superstars / 95 decks / 835 gameplay cards / 0 orphans / 0 issues**.
- Collector ID audit: **930 cards / 930 manifest entries / 0 issues**.
- Flow audit: **95 Superstars / 0 issues**.
- Cache/version stamp: **v1.1.24** across the public module graph.
- Physical iPhone visual smoke: **pending-v1.1.24-user-smoke**, specifically equal left/right poster placement and PLAY NOW target alignment.
