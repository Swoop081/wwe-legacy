# WWE Legacy v1.0.0 — Launch Release

This package promotes the certified **v0.99.00 Critical-Fix-Only Release Candidate** to the first stable WWE Legacy release.

## Launch status

- `version: 1.0.0`
- `releaseChannel: stable`
- `launchStatus: released`
- `featureFreeze: true`
- `criticalFixOnly: false`
- `physicalIphoneSmoke: passed-user-certified`
- profile schema remains **v42**

No gameplay, card balance, deck composition, economy, progression, reward, pack-collation/odds, release-state, collection-ownership or save-schema changes were made during the v0.99.00 → v1.0.0 promotion.

## New launch branding / web app icon

The user-supplied square black-and-gold **WWE Legacy** logo is now the canonical installable web app icon.

This overlay includes only the launch branding files required to wire that logo into the web app:

- `assets/images/branding-wwe-legacy-logo.png` — 1024×1024 lossless master derived directly from the supplied logo.
- `assets/images/app-apple-touch-icon.png` — 180×180 iOS Home Screen icon.
- `assets/images/app-icon-192.png` — 192×192 browser/PWA icon and in-app top-bar brand icon.
- `assets/images/app-icon-512.png` — 512×512 installable PWA icon.

`index.html` and `manifest.webmanifest` reference the v1.0.0-stamped icon files. No generated or redesigned logo artwork is used; the app icons are resized derivatives of the exact supplied logo.

## Packaging

This is an **app-icon overlay** rather than a full art package. It intentionally does not duplicate the existing WWE Legacy card/character/artwork library. Overlay it on the current installation so existing assets remain in place while the new launch app-icon files are added/replaced.

## v1.0 branch policy

v1.0.0 is the immutable launch baseline. Any post-launch changes should be made as explicit patch releases (v1.0.x) for defects, or on the separate v1.1 development line for new features/content.

## Launch certification

v1.0.0 passed the dedicated launch/icon invariants **6/6**. The full overlay regression remains **962 discovered / 858 passed / 94 intentionally skipped / 10 expected missing gameplay-art assertions only**, with no new functional regression. Rules, validation, collector IDs, released-roster balance, Ruby Cena, progression/economy, structured modes, onboarding, save durability, long-session stability and static iPhone viewport certification were rerun successfully for launch.
