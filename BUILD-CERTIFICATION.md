# WWE Legacy v1.1.22 — Build Certification

## Release identity
- Version: **v1.1.22**
- Title: **Universal Animation + Merch Transparency**
- Date: **30 August 2026**
- Base: **v1.1.21 — Linked Animated URL CORS Fallback**
- Scope: presentation/workflow correction only; universal optional animation plus final Merch base-plate alpha enforcement.

## Implemented changes

### Merch final alpha clear
- Merch layered/base-plate export now clears the live plaque rectangle using `destination-out` as the **final canvas composition operation**.
- The clear is performed after template, artwork, veil, set logo and frame work, preventing any later canvas draw from reintroducing opaque pixels underneath the live plaque.
- A small antialias-safe expansion is used without touching the outer card frame.

### Universal optional animation
- `isAnimatedCardEligible()` now accepts every collectible card identity.
- Linked URL → packaged animated WebP → packaged GIF → static artwork remains the runtime fallback order.
- Card Art Studio exposes local animated file upload and linked URL import for every selected collectible card.
- Animation remains optional; no card requires an animated asset.

### Physical-card shell retained during animation
- Animated media is clipped to the artwork window rather than covering the full card.
- Live rarity stars and the correct set/reward logo are restored above active animation.
- The existing lower information plaque and live name/stat/type overlays remain outside/above the animated window.
- Full-screen inspectors render the back directly rather than mirroring the rules text through a 3D transform.
- Large no-requirement Move type text is constrained inside the plaque.

## Carry-forward
- All v1.1.21 linked-animation CORS behavior remains intact.
- All v1.1.20 Live Events, Trish move corrections and authored Merch rules remain intact.
- No gameplay, card values, move requirements, decks, economy, roster, booster odds, progression, Merch effects or save schema changed.

## Certification
- Focused v1.1.19→v1.1.22 animation / Merch / inspector assertions: **20/20 passed**.
- Full suite: **1,074 discovered / 908 passed / 72 retained historical-contract failures / 94 skipped**.
- Direct comparison with v1.1.21: **0 added failing names / 0 removed failing names**; inherited 72-failure set is identical.
- Rebuild validation: **95 Superstars / 95 decks / 835 gameplay cards / 0 orphans / 0 issues**.
- Collector ID audit: **930 cards / 930 manifest entries / 0 issues**.
- Flow audit: **95 Superstars / 0 issues**.
- Browser JavaScript syntax checks: **passed** for live UI, animated-art helper and Card Art Studio.
- Cache/version stamp: **v1.1.22** with no stale v1.1.21 markers.
- Physical visual/interaction smoke: **pending-v1.1.22-user-smoke**, specifically Merch alpha beneath the plaque, animated card shell/frame/logo preservation, and linked animation playback across non-Entrance/Action/Finisher card types.
