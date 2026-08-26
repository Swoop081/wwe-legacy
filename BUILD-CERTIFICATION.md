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

# WWE Legacy v1.0.2 — Launch Regression Hotfix Certification

**Build:** v1.0.2 — Launch Regression Hotfix  
**Date:** 25 August 2026  
**Distribution:** verified app-icon/branding overlay package

## Hotfix scope

This patch packages the post-launch regressions identified during physical-iPhone play without introducing new content, economy experiments or unapproved stat rebalance.

- Restores correctly proportioned play-pile card inspection on front and back.
- Binds play-pile inspection to the actual physical printing tier (Normal / Emerald / Sapphire / Ruby), including tier-adjusted Submission text. Normal **Guillotine (SS1-035)** presents **+1** pressure instead of the Sapphire +3 value.
- Restores a compact one-screen iPhone Pack Complete layout and tap-to-inspect at approximately 60% of the viewport.
- Formats Daily Live Event countdowns as compact `Hh:MM:SS` without a redundant zero-day field.
- Restores **You Are in the Hold** as a fixed modal overlay so the match page is not pushed downward.
- Corrects Submission response flow: the defender draws 1 page after each successful pressure application before the next response window; a locked non-Finisher Submission can be Auto Countered under the normal escalating cost / minimum-hand rules; Finisher Submissions cannot be Auto Countered.
- Restores Tier Up as a full-viewport iPhone reward celebration using the available safe-area height.

Profile schema remains **v42**. No pack odds/collation, pity, collection ownership, Season reward structure, Championship Road reward structure, released set state or authored card-stat values changed.

## v1.0.2 verification

- Dedicated v1.0.2 regression tests: **4/4 passed**.
- Focused inherited rules/branding sample: **15/15 passed**.
- Full overlay regression: **969 discovered / 865 passed / 94 intentionally skipped / 10 expected missing gameplay-art assertions**.
- Rules Interaction Matrix: **23/23 passed**.
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**.
- Printed-effect audit: **706 cards / 0 issues**.
- Card-health four-tier scaling audit: **0 issues**.
- Collector/card-ID audit: **782 cards / 782 manifest entries / 0 issues**.
- Save durability: **6/6 passed**.
- Static iPhone viewport certification: **20/20** across 320×568, 375×667, 390×844 and 430×932.
- Long-session certification: **600 matches / 0 stalls / 26.84 average turns**.
- Ruby Cena audit: **3,200 matches / 60.75% win rate / 0 stalls / 24.62 average turns**.

The 10 full-suite failures are the known physical-art/library assertions caused by this overlay distribution intentionally omitting the complete gameplay artwork archive. No code, rules, save, economy, routing, version, card-tier or interaction regression failed in that suite.

## Balance consequence audit

Because the approved rules correction strengthens defense against multi-turn Submissions, the canonical final gameplay balance audit was rerun rather than silently carrying forward v1.0.1 numbers.

- **41 released Superstars / 16,400 matches / 0 stalls / 26.86 average turns**.
- **Doink the Clown: 38.25%** — low hard outlier.
- **Rowdy Roddy Piper: 35.50%** — low hard outlier.
- Additional low watchlist results include Owen Hart, Kurt Angle, Ted DiBiase and Charlotte Flair.

No compensating buffs or other balance edits were added because they were not part of the approved hotfix list. The build therefore preserves the requested Submission rules exactly and records the balance consequence for a later explicit decision.

## Packaging boundary

This remains an **overlay package**. Deploy it over the existing WWE Legacy installation so the complete gameplay-art library stays in place while the v1.0.2 code, styles, metadata and existing official WWE Legacy branding assets are updated.

The launch-line physical-iPhone gate remains recorded as `passed-user-certified`; because v1.0.2 changes several touch/layout surfaces, a quick physical-device smoke is recommended after deployment.

**Status: v1.0.2 functional/regression certification passed; known Submission-specialist balance impact recorded without unapproved rebalance.**
