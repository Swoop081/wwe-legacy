# WWE Legacy Development Handoff

Updated: 2026-09-29  
Branch: `main`  
Current release: **v1.1.402**

## Immediate status

The active work is the **Card Catalogue redesign**. The game itself loads, but the Catalogue has repeatedly crashed iPhone Safari when too many complex card-renderer DOM trees/layers are created at once.

**v1.1.402 is a crash hotfix.** It restores the lightweight Catalogue thumbnail path that was stable around v1.1.399 while preserving the corrected ordering and tap-to-inspect work. The user has not yet confirmed whether v1.1.402 opens Catalogue successfully.

Do not reintroduce the full `collectibleCardMarkup()` renderer into every Catalogue thumbnail. v1.1.400 did this and tapping Catalogue caused Safari's “A problem repeatedly occurred” page. v1.1.401 attempted lighter layered overlays but Catalogue still crashed.

## Catalogue design approved by user

The Catalogue should be a compact mobile collector view.

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

Ordering inside every section is **release set first, then numeric card ID**:
- Premiere is the first release.
- Money in the Bank is the second release.
- Therefore Superstar order is PREM01, PREM02, … PREM16, then MITB01.
- Roman/PREM01 must always appear first where applicable.
- Do not alphabetize cards.

Superstars and Entrances have one printing each in the current collection model and should be shown as **five different cards across per row**.

Cards with five printings (Finishers, Trademarks, Moves, etc.) should show **one card identity per row with its five printing variants across the row**. Do not show the card name/card ID in a separate left-hand column. The five cards should use the same available width as the five-across Superstar/Entrance rows.

Printing names do not need to be written under thumbnails because the printing border communicates the tier.

Ownership:
- Overlay `×0`, `×1`, etc. in the top-left of the thumbnail.
- Unowned cards must be grayscale/dimmed but still clearly identifiable.
- The accepted brightness treatment in v1.1.397 was approximately grayscale(.72), brightness(.68), contrast(.92), not near-black.

Interaction approved:
- Tap a Catalogue thumbnail to open the actual card centered at roughly **60% of phone width**.
- Tap the enlarged card to flip it.
- Tap it again to return to the front.
- Tap outside the card to close it.
- The expensive/full card renderer is acceptable for this **single inspected card**, but not for every thumbnail.

## Remaining Catalogue visual problem

The stable lightweight thumbnails do not yet show the complete card presentation.

User specifically requires:
- Superstar cards must include their proper card background/baseplate, not just the wrestler cutout.
- Entrances, Finishers, Trademarks, Moves and other cards must show their normal text overlays/card-face presentation.
- Thumbnails should visually resemble the finished cards while remaining lightweight enough for iPhone Safari.

The next solution should avoid constructing hundreds of live card components. Prefer a lightweight/static thumbnail composition or pre-rendered/final card-face asset path. Investigate existing finished Card Studio exports and whether the complete visual face can be represented by a single image per card/printing. Do not simply add many overlay DOM nodes to every thumbnail.

## Catalogue implementation notes

Relevant files:
- `js/ui/app.js` — `renderCardCatalogue()`, thumbnail rendering, inspect overlay.
- `js/data/catalogue.js` — filtering/sorting/page size.
- `css/v1.1.384-catalogue-five-printings.css` — active Catalogue stylesheet despite old filename.
- `index.html` — must continue loading the above stylesheet; previous version bumps accidentally changed the filename to nonexistent files.
- `js/data/artwork.js` — finished/layered artwork lookup.
- `js/data/variants.js` — printing tier behavior.

Important sorting fix in v1.1.399:
- Catalogue sorting now extracts the numeric collector number directly from `cardCode`/ID.
- Set order is explicitly Premiere, then Money in the Bank, then later sets.
- User confirmed the ordering shown in v1.1.399 was correct.

Catalogue page size was previously raised to 500 so grouping sees the whole released catalogue before rendering sections. This contributes to memory pressure if thumbnails are complex. If needed, redesign rendering/virtualization rather than returning to incorrect pre-group pagination.

## Version/update system

A major updater bug was found: `js/config/build.js` had remained hard-coded at v1.1.368 while other files were being bumped.

Current release files that must stay synchronized on every release:
- `js/config/build.js`
- `js/runtime/current.js`
- `js/ui/app.js` where version strings occur
- `index.html`
- `build.json`

The Check for Update flow was improved around v1.1.392 to update service workers, clear caches, add cache-busting query parameters and force navigation.

Be careful with blanket version replacement in `index.html`: the real Catalogue stylesheet filename is permanently `css/v1.1.384-catalogue-five-printings.css`. Only its query/cache version should change. A previous replacement changed the filename itself to a nonexistent `v1.1.395-...` file, causing several builds to appear visually unchanged.

## Current released roster

17 released Superstars:
1. Roman Reigns
2. Cody Rhodes
3. Seth Rollins
4. CM Punk
5. Sami Zayn
6. Randy Orton
7. Rhea Ripley
8. Liv Morgan
9. IYO SKY
10. Becky Lynch
11. Alexa Bliss
12. Charlotte Flair
13. John Cena
14. Stone Cold Steve Austin
15. Tiffany Stratton
16. Trish Stratus
17. LA Knight

Do not assume AJ Styles is released; he is not in the current released `superstars.js`.

## Live Events

The rotating Live Events were previously repaired and are working. Preserve the launch mechanics from the working v1.1.368-era fix. Do not reintroduce the removed `RAW_LIVE_EVENT` object/reference.

Approved weekly 3-per-day schedule:
- Monday: Monday Night Raw — Roman; Big Time Becks — Becky; Never Give Up — Cena
- Tuesday: Finish the Story — Cody; Tokyo Shock — IYO; Legend Killer — Randy
- Wednesday: NXT Live — Rhea; Best in the World — CM Punk; Revenge Tour — Liv
- Thursday: Head of the Table — Roman; Twisted Bliss — Alexa; Bottom Line — Austin
- Friday: SmackDown — Cody; Justice for Sami — Sami; Tiffy Time — Tiffany
- Saturday: SNME — Liv; Burn It Down — Seth; Bow Down to Queen — Charlotte
- Sunday: My Brutality — Rhea; Megastar Tour — LA Knight; Stratusfaction — Trish

## My Legacy / Challenges

My Legacy is now a visual hub with Career Record at top and separate sub-screens. Superstar Records uses small rendered Superstar cards. The Superstar denominator was corrected to unique roster count (17).

Challenges were similarly redesigned into a hub/sub-screen structure.

Achievements readability was fixed in v1.1.379.

## Season progression

New seasons start with Tier 1 unlocked and progress Tier 1 → Tier 2 rather than Tier 0 → Tier 1.

Season screen duplicate stat boxes were removed and hero enlarged.

## Rulebook

Rulebook is intended to be evergreen system documentation, not a list of current events/rewards/content. It should only need changing when rules or modes change.

It documents five printing tiers:
- Base
- Emerald
- Sapphire
- Ruby
- Amethyst

Avoid hard-coded current Season rewards, dated Live Event schedules, specific chase rewards, etc.

## Duplicate Universe Points

Approved duplicate conversion table:

| Printing | Common 1★ | Uncommon 2★ | Rare 3★ | Very Rare 4★ |
|---|---:|---:|---:|---:|
| Base | 1 | 2 | 3 | 4 |
| Emerald | 2 | 4 | 6 | 8 |
| Sapphire | 4 | 8 | 12 | 16 |
| Ruby | 10 | 20 | 30 | 40 |
| Amethyst | 25 | 50 | 75 | 100 |

Implemented in `js/data/store.js`; booster duplicate conversion passes the printing tier.

## Set Collection milestones

Five milestone tracks exist:
- Base/Collection
- Emerald
- Sapphire
- Ruby
- Amethyst

Each uses the 25/50/75/100 milestone structure.

## General development rules

- User expects approved changes to be pushed directly to `main`.
- Always fetch the latest SHA before updating a file.
- Do not claim something is fixed/tested unless tool results or the user's physical iPhone test confirm it.
- User tests frequently on a physical iPhone and screenshots/recordings are authoritative for UI behavior.
- Preserve working gameplay mechanics and avoid unnecessary refactors.
- Mobile readability and compact use of screen space are priorities.
- The user supplies/approves card artwork; do not generate replacement artwork unless explicitly requested.
