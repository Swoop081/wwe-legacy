# WWE Legacy Development Handoff

Updated: 2026-09-29  
Branch: `main`  
Current release: **v1.1.434**  
Physical iPhone status: **Catalogue inspector confirmed working by user on v1.1.434**

## Immediate status

The Card Catalogue inspector issue is finally resolved. **Do not rewrite or refactor this working implementation.**

The user physically confirmed on iPhone that v1.1.434:
- Catalogue loads.
- Catalogue thumbnails are tappable.
- Tapping a thumbnail opens the full rendered card.
- Tapping the full card flips front/back.
- The explicit **× close button works** and exits the inspector.

This took 9+ hours and many failed approaches. Preserve the working implementation exactly unless the user explicitly asks for a later UI pass.

## Why the final Catalogue inspector works

Relevant file: `js/ui/app.js`.

The working inspector uses the existing full `collectibleCardMarkup()` renderer for ONE inspected card. It is initially rendered inside Catalogue, then the modal backdrop is moved out of `#game/.catalogue-screen` and appended directly to `document.body`.

This isolation is essential because the Catalogue stylesheet contains many historical thumbnail-specific overrides scoped under `.catalogue-screen`. Earlier inspector attempts opened the dark backdrop but made the full card invisible while it remained inside that CSS scope.

Critical implementation details:
- Modal classes: `superstar-card-modal deck-lab-card-modal catalogue-working-inspect`.
- Card uses `hud-superstar-modal-card deck-lab-inspect-card`.
- Flip attribute: `data-flip-catalogue-modal="1"`.
- Backdrop: `data-catalogue-modal-backdrop="1"`.
- Explicit close button: `data-close-catalogue-modal="1"`.
- After `document.body.appendChild(backdrop)`, the close handler MUST be bound against the moved backdrop/body DOM, not only against `#game`.
- The v1.1.433 close button was visible but did nothing because the binding queried `#game` after the modal had been moved out of it.
- v1.1.434 fixes this by binding the close control after the body mount and directly removing the backdrop/clearing `catalogueInspect`.

Do not move the inspector back under `.catalogue-screen`. Do not replace it with the failed native-clone implementation from v1.1.429.

## Catalogue architecture — keep lightweight

Never render hundreds of full `collectibleCardMarkup()` components in Catalogue. That previously crashed iPhone Safari.

The stable architecture is:
- Lightweight/static thumbnail composition for the catalogue grid.
- Full canonical card renderer for only the ONE card currently being inspected.

Current Catalogue ordering is approved:
- Release-set order first.
- Numeric card ID within each set.
- Premiere first, then Money in the Bank.
- PREM01 Roman is first.
- Do not alphabetize.

Current thumbnail plaque/layout is accepted **for now**. User explicitly said it can be revisited in the next UI pass. Do not alter it unless requested.

Outstanding future visual item: printing border colours/thumbnail polish may need another UI pass, but it is not part of the now-working inspector.

## Catalogue inspector failure history — do not repeat

Failed approaches:
- v1.1.425–427: repeated Catalogue-specific overlay/CSS sizing patches. Backdrop opened, card invisible.
- v1.1.428: attempted reuse of Season modal while still inside Catalogue CSS scope. Same invisible-card symptom.
- v1.1.429: custom DOM-clone/native inspector. Tap stopped working.
- v1.1.430: reused Deck Lab structure but still inside Catalogue scope. Returned to dark backdrop/invisible card.
- v1.1.431: moved the working full-card modal to `document.body`. Card became visible and flip worked.
- v1.1.432: attempted outside-tap close. Still unreliable on physical iPhone.
- v1.1.433: explicit × appeared, but its handler was bound from `#game` after modal relocation, so it did not fire.
- **v1.1.434: explicit × handler bound after body mount. User confirmed working.**

## App updater — still broken / next major issue

The **Check for Update** button has effectively never worked reliably on the user's pinned iPhone app.

On 2026-09-29 the user showed the Options screen still reporting **Installed v1.1.430** after v1.1.431 was published and after waiting/pressing Check for Update.

Repository state was verified at that time:
- `build.json` = 1.1.431
- `js/config/build.js` = 1.1.431
- `js/runtime/current.js` = 1.1.431
- `index.html` = 1.1.431

So this is not merely a version-stamping mismatch. The updater/handoff mechanism itself needs a proper redesign.

Current updater code:
- `js/config/update.js`: `fetchLatestBuild()` fetches `build.json?_=timestamp` with `cache:"no-store"`.
- `js/ui/app.js`: `checkForAppUpdate()` compares manifest version to `BUILD_VERSION`.
- `applyAppUpdate()` unregisters service workers, clears Cache Storage, stores `wweLegacyForcedBuild`, then navigates with `location.replace()` to `index.html?build=<version>&_update=<timestamp>`.

Automatic update checks were deliberately removed after an earlier iOS reload-loop incident. **Keep update checks manual-only.**

Next chat should investigate the actual GitHub Pages/pinned-iOS update path rather than adding another superficial cache parameter. The user wants the Check for Update button to genuinely work.

## Release/version discipline

Every release must keep these aligned:
- `package.json`
- `js/config/build.js`
- `js/runtime/current.js`
- `index.html` cache/query version and boot version
- `build.json` — publish this LAST

Current release is **1.1.434**.

Important: do not blanket-rewrite version-numbered stylesheet filenames in `index.html`. Real filenames such as:
- `css/v1.1.376-my-legacy-hub.css`
- `css/v1.1.404-challenges-hub.css`
- `css/v1.1.355-catalogue-five-printings.css`
- `css/v1.1.384-catalogue-five-printings.css`
must remain those filenames. Only their `?v=` cache query changes.

`js/runtime/current.js` dynamically imports app.js with the runtime version and a `Date.now()` boot token.

## Catalogue design locks

Section order:
1. Superstars
2. Entrances
3. Finishers
4. Trademarks
5. Moves
6. Actions
7. Merch
8. Momentum
9. Managers

Superstars/Entrances: one printing each, five cards across where space allows.

Five-printing cards: one card identity per row with Base/Emerald/Sapphire/Ruby/Amethyst across the row.

Ownership:
- ×N overlay.
- Unowned cards grayscale/dimmed, still identifiable.

Inspector:
- Full card around 60% phone width.
- Tap card to flip.
- Explicit × closes.
- User originally wanted outside-tap close too, but v1.1.434's confirmed reliable close path is the ×. Do not risk breaking the working inspector merely to remove the ×.

## Current released roster

17 released Superstars:
Roman Reigns, Cody Rhodes, Seth Rollins, CM Punk, Sami Zayn, Randy Orton, Rhea Ripley, Liv Morgan, IYO SKY, Becky Lynch, Alexa Bliss, Charlotte Flair, John Cena, Stone Cold Steve Austin, Tiffany Stratton, Trish Stratus, LA Knight.

AJ Styles is not currently released.

## Live Events

Rotating Live Events are working. Preserve the repaired implementation and do not reintroduce removed legacy `RAW_LIVE_EVENT` references.

Approved weekly schedule:
- Monday: Monday Night Raw — Roman; Big Time Becks — Becky; Never Give Up — Cena
- Tuesday: Finish the Story — Cody; Tokyo Shock — IYO; Legend Killer — Randy
- Wednesday: NXT Live — Rhea; Best in the World — CM Punk; Revenge Tour — Liv
- Thursday: Head of the Table — Roman; Twisted Bliss — Alexa; Bottom Line — Austin
- Friday: SmackDown — Cody; Justice for Sami — Sami; Tiffy Time — Tiffany
- Saturday: SNME — Liv; Burn It Down — Seth; Bow Down to Queen — Charlotte
- Sunday: My Brutality — Rhea; Megastar Tour — LA Knight; Stratusfaction — Trish

## Other preserved systems

My Legacy is a visual hub with Career Record and sub-screens. Challenges uses the same hub/sub-screen philosophy.

Season progression starts at Tier 1 and proceeds Tier 1 → Tier 2, not Tier 0 → Tier 1.

Rulebook should remain evergreen system documentation, not a dated list of events/rewards.

Five printing tiers:
Base, Emerald, Sapphire, Ruby, Amethyst.

Duplicate Universe Points table:

| Printing | Common 1★ | Uncommon 2★ | Rare 3★ | Very Rare 4★ |
|---|---:|---:|---:|---:|
| Base | 1 | 2 | 3 | 4 |
| Emerald | 2 | 4 | 6 | 8 |
| Sapphire | 4 | 8 | 12 | 16 |
| Ruby | 10 | 20 | 30 | 40 |
| Amethyst | 25 | 50 | 75 | 100 |

Five Set Collection milestone tracks exist: Base/Collection, Emerald, Sapphire, Ruby, Amethyst, each using 25/50/75/100 milestones.

## Development rules

- Push approved changes directly to `main`.
- Fetch latest SHA before each file update.
- User's physical iPhone is the authority for UI/stability confirmation.
- Never claim physical success before user confirms it.
- Preserve working gameplay and avoid unnecessary refactors.
- Keep mobile UI graphic-heavy, readable and compact.
- User supplies/approves card artwork; do not generate replacement artwork unless explicitly requested.
- Do not reintroduce automatic update checks.
- Most importantly: **v1.1.434 Catalogue inspector is physically confirmed working. Preserve it.**
