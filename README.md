# WWE Legacy v1.0.2 — Launch Regression Hotfix

This stable v1.0.x patch packages the iPhone regressions identified after the v1.0.1 branding hotfix.

## v1.0.2 fixes

- Correct play-pile card aspect ratio and actual-printing tier data on front/back inspection.
- Correct tier-adjusted Submission copy (including Normal Guillotine +1 rather than Sapphire +3).
- Restore one-screen Pack Complete presentation and tap-to-enlarge card inspection at approximately 60% of the viewport.
- Simplify Daily Live Event timers to `Hh:MM:SS`.
- Restore **You Are in the Hold** as an overlay rather than inline page content.
- Draw 1 defender page after each successful locked-Submission pressure step; allow normal Auto Counter against locked non-Finisher Submissions; keep Finisher Submissions immune.
- Restore Tier Up as a full-viewport reward celebration.

Profile schema remains **v42**. No new content, economy, pack-odds/collation, progression-reward or authored card-stat changes are included.

## Verification

- Dedicated v1.0.2 regression tests: **4/4 passed**.
- Focused inherited rules/branding regression sample: **15/15 passed**.
- Full overlay regression: **969 discovered / 865 passed / 94 skipped / 10 expected missing-art assertions only**.
- Rules Matrix: **23/23**.
- Validation: **76 Superstars / 76 decks / 706 gameplay cards / 0 issues**.
- Printed-effect audit: **706 / 0 issues**; four-tier card-health scaling: **0 issues**.
- Card-ID audit: **782/782 / 0 issues**.
- Save durability: **6/6**.
- Static iPhone viewport certification: **20/20**.
- Long-session certification: **600 matches / 0 stalls / 26.84 average turns**.
- Ruby Cena audit: **3,200 matches / 60.75% / 0 stalls**.

### Balance note from the rules correction

The intended extra Submission-defense draw and locked-hold Auto Counter materially reduce some Submission specialists in CPU-vs-CPU simulation. The final 16,400-match audit completed with **0 stalls** but now flags **Doink the Clown (38.25%)** and **Rowdy Roddy Piper (35.50%)** as low hard outliers. No compensating balance changes are included because none were approved for this hotfix.

## Packaging

This is an **app-icon/branding overlay**, not a full physical-art package. Overlay it on the existing WWE Legacy installation and preserve the established gameplay-art library.

A quick physical-iPhone smoke is recommended after deployment for the corrected play-pile inspector, Pack Complete, Submission overlay/Auto Counter flow and Tier Up layout.

---

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
