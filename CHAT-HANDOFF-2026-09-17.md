# WWE Legacy — Next Chat Handoff — 17 September 2026

Repository: `Swoop081/wwe-legacy`
Branch: `main`

READ THIS FILE FIRST IN THE NEXT CHAT, then read `WWE-LEGACY-DEVELOPMENT-HANDOFF-2026-09-16.md` for the deeper project/card locks.

## USER WORKFLOW RULE — CRITICAL
Do the work instead of describing what you intend to do. Never stop after the first small successful change when directly related safe work remains. Use each development pass fully: continue through the next obvious related items until the related work is exhausted, a genuine technical blocker remains after actively searching alternatives, or a decision only the user can make is required.

When a path/tool fails, actively search available tools and alternative implementation routes. Do not immediately hand the blocker back to the user. Do not answer with promises such as “I’ll do X” instead of actually doing X. Keep replies short and state concrete completed changes and anything genuinely still unverified.

## CURRENT MAIN
At the end of this chat, `main` had reached commit `b737a1f0d00c37b008d04d88bae8387cedaf88c4` for the tap-anywhere launch splash work. Verify fresh HEAD before writing because later handoff/documentation commits may have advanced it.

`js/config/build.js` was corrected to `BUILD_VERSION = "1.1.207"` in commit `e0435ad9fb5dd2af0b20550b3bee4041651974b5`, aligning it with `index.html` and `build.json`.

## PHONE-VERIFIED WORKING BOOT BASELINE
The user physically verified v1.1.207 on iPhone and reported that it was fixed and substantially more responsive than before. Preserve the working boot architecture.

`js/runtime/current.js` v1.1.207 loads `js/ui/app.js` FIRST via dynamic import. Only after the core app boots does it load enhancement modules individually inside non-fatal try/catch, followed by classic compatibility scripts sequentially. Do NOT put static module imports above the app import; static imports are hoisted and can prevent the app from attaching the launch UI.

A v1.1.208 attempt (`c8e5e0f1e9c81a5a63dfec98c5afbd8f7b1a0e52`) aggressively deleted the historical runtime patch ladder and replaced the runtime with an app-only loader. The user then got stuck on the launch poster. Do NOT repeat that wholesale deletion. Future runtime consolidation must migrate functionality incrementally into canonical modules and preserve phone-tested behaviour.

## LAUNCH POSTER — IMMEDIATE NEXT TASK
The user supplied the exact replacement launch poster in chat. The actual JPEG was mounted locally during the chat as `/mnt/data/IMG_2162(2).jpeg`, 768×1376. It is the WWE Legacy / Trish Stratus poster with the corrected copy `REACH TIER 50 BEFORE OCTOBER 31` and a PLAY NOW graphic baked into the image.

User requirement: use that supplied image unchanged as the splash image. Do not generate/redesign/crop it. Do not add any HTML text, prompt, button or overlay on top. The entire splash screen is tappable; a tap anywhere proceeds to the main menu. The PLAY NOW graphic is merely part of the image and must NOT have a separately mapped hit area.

Tap-anywhere code was committed to `main` in `b737a1f0d00c37b008d04d88bae8387cedaf88c4` (`Wire tap-anywhere launch splash into canonical runtime`). Verify exactly what that commit added before altering it.

The binary poster replacement itself was NOT successfully committed before this handoff. The target repository asset is `assets/images/season1-stratusfaction-launch-poster.jpg`. Do not claim it is replaced until GitHub confirms the new blob/tree/commit.

Important discovery: the GitHub connector exposes `create_blob` and accepts `encoding: base64`, plus `create_tree`, `create_commit`, and `update_ref`. This provides a Git-data route for binary files. The previous assistant wasted time because it initially looked only at UTF-8 `update_file`. In the next chat, proactively use the binary Git-data route or another working binary route rather than stopping at the normal contents API limitation.

Also update any stale September 30 accessibility/alt copy in `index.html` or other poster references to October 31, but do not render additional visible text over the poster. Preserve cache/version consistency.

After committing, verify the repository asset actually changed and verify the splash still has tap-anywhere behaviour. Do not claim physical iPhone verification until the user confirms it on device.

## CARD/BALANCE WORK AFTER POSTER
Do not touch the phone-tested runtime patch architecture while doing the next card cleanup unless necessary.

Current architectural problem: `js/data/collection.js` still applies `applySharedMoveFamilyCurvesV11203(base)` as a late runtime/data override from `js/shared/v1.1.203-shared-move-family-curves.js`. `js/shared/v1.1.69-card-identity-pass.js` and `js/data/content.js` also contain historical five-tier/override logic. Multiple stacked balance layers can silently overwrite authored values. The goal is one canonical balance pipeline, but migrate approved curves carefully rather than deleting layers wholesale.

Locked ordinary-Move rule: absolute basic/common Moves such as Suplex, Punch, Elbow and Clothesline are Base-only. They do not receive Emerald/Sapphire/Ruby/Amethyst printings. Generic Suplex exists in actual `content.js` at cost 3 / damage 4 and sits below Snap Suplex and advanced/high-impact suplex variants.

The v1.1.203 suplex-family values are NOT final user-approved balance and omit actual `suplex` and `vertical-suplex`; reconcile/remove that late override during canonical consolidation rather than stacking another override.

Shared Move IDs are global identities and must have identical values for every wrestler. Wrestler-specific Trademarks requiring different balance use distinct IDs. Finishers are the fixed-curve exception and have no effects/Method requirements.

For full historical card locks, Starter Draft, Survivor Series, launch scope, Finisher classifications, five-tier batch recovery and presentation rules, read `WWE-LEGACY-DEVELOPMENT-HANDOFF-2026-09-16.md` before changing production data.

## RESPONSE STYLE
The user is frustrated by explanations of blockers and future promises. Execute first. Report only what actually changed, commit SHA(s), what was verified, and any genuine remaining issue. Do not make the user reconstruct prior decisions.