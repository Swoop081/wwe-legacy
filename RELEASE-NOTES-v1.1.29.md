# WWE Legacy v1.1.30 — Card Presentation Corrections

## v1.1.34 — Seated Shotgun Dropkick

- Adds **Seated Shotgun Dropkick** as the new shared Evolution 2★ Uncommon, collector number `EVO1-076`.
- Card profile: Cost 4 / Damage 7 / Agility 2; Strike move; Grounded opponent only; Stun 1.
- Seeds two copies into the authored 60-page decks for **IYO SKY**, **Liv Morgan**, and **Tiffany Stratton**, while preserving their existing lead-off basic Dropkick access.
- No image from the reference screenshot is imported or packaged. The Card Studio entry is generated with the normal canonical art path so artwork can be added later in Card Studio.
- Evolution Series 1 expands from 75 to **76 collector cards**.
- No Superstar abilities, momentum totals, deck sizes, gameplay engine rules, economy, modes or rewards change.
- Verification: focused regression sample 7 passed / 0 failed / 1 historical skip; flow audit 95 Superstars / 0 issues; rebuild validation 0 issues; card-ID audit 0 issues.


## v1.1.33 — Trish Home Banner Position Hotfix

- Corrects the remaining Home Season One Trish framing issue visible on physical iPhone.
- Keeps the approved 2× Trish WWE.com render scale.
- Moves Trish substantially farther right and slightly upward so her full head/face occupies the clean right-side portrait lane instead of sitting beneath the Season XP bar and copy.
- The lower body continues to crop naturally inside the compact Season banner.
- No Season progression, rewards, Home navigation, gameplay, economy or card data changes.


## v1.1.32 — Play Hub 3+3 Pagination + Money in the Bank Move

- Makes **Choose Your Path** a true 3+3 two-page menu: Page 1 is Exhibition Showcase, Live Events and King of the Ring; Page 2 is Championship Road, Survivor Series and Money in the Bank.
- Returns Championship Road and Survivor Series to the same standard mode-card height used on Page 1.
- Removes the empty fourth grid row that caused the large blank area before the Next control.
- Rebuilds Next/Back as large full-width navigation buttons immediately after the third mode card.
- Moves **Money in the Bank** out of the Live Events hub and into the third slot on Play page 2.
- Money in the Bank uses its existing WWE set branding as the page-card visual and retains its existing 8-level / 3-life / 2-pack rules.
- Completed Money in the Bank runs return to Play page 2; the bottom Play tab now stays active while in Money in the Bank.
- No gameplay balance, rewards, economy, live-event rotation, Championship Road progression or Survivor Series capture logic changes.


## v1.1.31 — Play Hub Two-Page Navigation + WWE.com Portrait Fix

- Splits **Play → Choose Your Path** into two focused pages instead of one long five-mode scroll.
- Page 1 is **Exhibition Showcase → Live Events → King of the Ring**, followed by a large full-width **Next →** control.
- Page 2 is **Championship Road → Survivor Series**, with both mode banners enlarged and a matching full-width **← Back** control.
- Replaces the old Cody Rhodes WWE.com action photo with Cody's WWE.com transparent profile/headshot render for Live Events.
- Survivor Series now uses Hulk Hogan's WWE.com transparent profile/headshot render instead of Randy Orton.
- Survivor Series now uses the shared WWE Legacy mode-logo typography system (`SURVIVOR` / `SERIES`) and matching cyan mode accent rather than its one-off text treatment.
- No gameplay rules, rewards, economy, card data, Live Event schedule, Championship Road progression or Survivor Series capture rules change.


## v1.1.30 — Trish Season Banner Framing Hotfix

- Keeps Trish's requested 2× Home-screen scale.
- Re-anchors her Season One banner render to the top-right so her full head remains visible.
- Allows the lower portion of the render to crop naturally within the banner instead of cropping her face.

- Merch photography now continues across the full card face behind its plaque; the previous solid reward-colour strip is removed.
- Animated Merch is layered above the base plate and below the plaque.
- Trish Stratus is rendered at exactly 2× scale in the Home Season One tile, anchored bottom-right.
- Deck Lab Superstar selectors use the exact finished Card Studio front with no reconstructed stars, logo, frame or nameplate, plus the Amethyst tier sweep/glow.
- Deck Lab Lead Off and section cards use finished Card Studio fronts as their presentation shell.
- Animated cards retain their finished Card Studio stars, set logo, frame and plaque while animation is contained in the plaque-aware artwork bay.
- SummerSlam animated Moves use a solid SummerSlam blue-purple set background.
- Missing or failed animation restores the exact finished Card Studio front automatically.
