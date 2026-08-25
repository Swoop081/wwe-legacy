# WWE Legacy v1.0.0 — Launch Release Certification

**Build:** v1.0.0 — Launch Release  
**Date:** 25 August 2026  
**Distribution:** verified app-icon overlay package

## Objective

Promote the externally and automatically certified v0.99.00 release candidate to stable v1.0.0 without changing the frozen gameplay/economy/save state, while installing the approved WWE Legacy logo as the official web app icon.

## Stable launch identity

`build.json` records:

- `version: 1.0.0`
- `releaseChannel: stable`
- `launchStatus: released`
- `featureFreeze: true`
- `criticalFixOnly: false`
- `physicalIphoneSmoke: passed-user-certified`

Profile schema remains **v42**.

The browser entrypoint, nested public JavaScript module graph, CSS, manifest and install-icon references are all stamped **v1.0.0**. The cache-stamping utility was also made semantic-version-safe for future v1.x releases.

## Approved launch branding / web app icon

The user-supplied square black-and-gold WWE Legacy logo is now the canonical installable web app icon.

Included branding files:

- `assets/images/branding-wwe-legacy-logo.png` — 1024×1024 lossless PNG master derived directly from the supplied image.
- `assets/images/app-apple-touch-icon.png` — 180×180 Apple touch icon.
- `assets/images/app-icon-192.png` — 192×192 PWA/browser icon and in-app top-bar brand icon.
- `assets/images/app-icon-512.png` — 512×512 PWA icon.

`index.html` wires the approved logo into iOS Home Screen installation, browser favicon/PWA presentation and the in-app top bar. `manifest.webmanifest` exposes the correct 192×192 and 512×512 launch icons.

No generated/redesigned logo artwork was used. The icon files are resized derivatives of the exact supplied logo.

## v1.0.0 promotion regression

Dedicated launch/freeze/icon invariants: **6/6 passed**.

Full overlay regression:

- **962 discovered**
- **858 passed**
- **94 intentionally skipped**
- **10 expected missing gameplay-art assertions**
- **0 new gameplay/data/save/economy/routing/version/icon regression failures**

The 10 failures are the same physical gameplay-art/library assertions expected from an overlay distribution that intentionally does not duplicate the complete existing WWE Legacy artwork library. The newly required launch logo/icon assets are physically included and independently verified at their exact dimensions.

## Final certification rerun

- Rules Interaction Matrix: **23/23 passed**.
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**.
- Collector/card-ID audit: **782 cards / 782 manifest entries / 0 issues**.
- Final released-roster audit: **41 Superstars / 16,400 matches / 0 stalls / 26.83 average turns / 0 hard outliers**.
- Ruby Cena audit: **3,200 matches / 59.94% win rate / 0 stalls / 24.64 average turns**.
- First-month economy target cadence: Tier 50 **day 28.1 mean**; structured ceiling remains **day 24**.
- Championship Road structured certification: **164 full clears / 6,560 wins / 1,640 checkpoint boosters / 160 intentional mirror matches**.
- Live Events structured certification: **365 days / 1,095 tower clears / 5,475 wins / 0 unreleased reward leaks**.
- Onboarding certification: **2/2 starter paths + 5/5 Welcome-set paths**, every resulting deck **60/60 playable pages**; Tier 50 Cena completion package remains valid.
- Save durability: **6/6 passed**.
- Long-session certification: **600 sequential matches / 0 stalls / 27.08 average turns / ~2.29 MiB retained heap delta**.
- Static iPhone viewport certification: **20/20** across 320×568, 375×667, 390×844 and 430×932.
- External physical-iPhone Safari/gesture gate remains **passed-user-certified** from the accepted v0.99 release-candidate gate.

## Functional-change boundary

No card stats/effects, Superstar balance, authored deck composition, economy, progression, rewards, Season XP, Daily Live Event XP, Championship Road rewards, pack odds/collation, pity, live-set state, collection-ownership rules or save/profile schema changed from v0.99.00.

The only launch-facing delta is the approved WWE Legacy logo/web-app icon plus stable v1.0.0 release metadata/cache identity. Test/tool version guards were updated only so the existing certification infrastructure correctly accepts semantic versions at **1.0.0 and above**.

## Packaging

This package is an **app-icon overlay**, not a complete physical-art archive. Overlay it on the current WWE Legacy installation so the existing card/character/artwork library remains in place while the v1.0.0 code, metadata and official web-app icon files are applied.

**Status: WWE Legacy v1.0.0 certified for launch.**
