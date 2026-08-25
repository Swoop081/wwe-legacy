# WWE Legacy v1.0.1 — Launch Splash Branding Hotfix

This stable v1.0.x patch fixes the remaining launch-brand inconsistency discovered on the physical iPhone launch/continue screen.

## Patch status

- `version: 1.0.1`
- `releaseChannel: stable`
- `launchStatus: released`
- `featureFreeze: true`
- `physicalIphoneSmoke: passed-user-certified`
- profile schema remains **v42**

No gameplay, card balance, deck composition, economy, progression, reward, pack-collation/odds, release-state, collection-ownership or save-schema changes are included.

## Launch splash branding fix

The launch/continue screen no longer renders the old CSS-built WWE / silver LEGACY wordmark. It now renders the user-supplied black-and-gold **WWE Legacy** logo so the first screen matches the canonical v1.0 app identity.

- `assets/images/branding-wwe-legacy-logo.png` — 1024×1024 supplied-logo master.
- `assets/images/branding-wwe-legacy-lockup.png` — 800×410 non-generative crop of that supplied logo, optimized for the wide splash-header slot.
- `assets/images/app-apple-touch-icon.png` — 180×180 iOS Home Screen icon.
- `assets/images/app-icon-192.png` — 192×192 browser/PWA and in-app top-bar icon.
- `assets/images/app-icon-512.png` — 512×512 PWA icon.

The logo was not redrawn or AI-generated. The wide splash lockup is a direct crop/derivative of the supplied artwork.

## Packaging

This remains an **app-icon/branding overlay** rather than a full art package. Overlay it on the existing WWE Legacy installation so the established gameplay-art library remains present.

## v1.0 branch policy

**v1.0.0 remains the immutable launch baseline.** v1.0.1 is an explicit presentation hotfix. New features/content remain reserved for the separate v1.1 development line.

## Verification

- Dedicated v1.0 launch + v1.0.1 splash-brand tests: **6/6 passed**.
- Full overlay regression: **965 discovered / 861 passed / 94 intentionally skipped / 10 expected missing gameplay-art assertions only**.
- Static iPhone viewport certification: **20/20 passed** across 320×568, 375×667, 390×844 and 430×932.
- No new gameplay/data/save/economy/routing/version/icon regression failures.
