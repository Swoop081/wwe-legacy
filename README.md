# WWE Legacy v1.1.36 — Matrix Slide Shared Common Reversal

Current package adds SD1-072 Matrix Slide as a shared Common Counter-only reversal with Arm Extended + exact Clothesline/Lariat family coverage. User reference imagery is not packaged.

# WWE Legacy v1.1.35 — Exact Card Front Runtime + Clean Play Cards + Trish Reframe

**Current working baseline.** v1.1.35 supersedes v1.1.34.

## v1.1.35 presentation source-of-truth hotfix

The six Play mode banners and the Next / Back controls no longer use chamfered or cut-off corners. Their outer frames are clean rectangles with ordinary rounded corners.

The Home Season One Trish portrait is brought back inside the right edge after the v1.1.33 position visibly cut half of her face off on physical iPhone. The excessive 2× zoom is relaxed only on this compact Home tile so her complete face and hat are visible.

Most importantly, the live game once again treats the **finished Card Studio front as authoritative**. Every non-Momentum collectible first renders its installed finished Card Studio WebP. Optional animation is layered only inside the artwork bay and cannot replace or reconstruct the authored frame, stars, set logo, plaque or typography. If a canonical finished front is absent, the fallback chain is legacy finished export → canonical base plate/live overlay → rules face.

## v1.1.34 shared Evolution move

Adds **Seated Shotgun Dropkick** as `EVO1-076`, a shared 2★ Uncommon Evolution move. It is Cost 4 / Damage 7, requires Agility 2, is playable only against a grounded opponent, and applies Stun 1 on Connect. Iyo Sky, Liv Morgan and Tiffany Stratton each begin with two copies in their authored 60-page decks. No artwork is packaged for the card; its Card Studio slot is ready for user-supplied art.

## v1.1.33 Trish Home banner framing

The Home Season One tile keeps Trish at the approved 2× scale, but positions her farther right and slightly higher so her complete head/face sits in the open right-side portrait lane rather than behind the Season XP progress bar. The lower body is allowed to crop naturally inside the compact banner.

## v1.1.32 Play hub layout

**Choose Your Path** now uses exactly three standard-size mode cards per page. Page 1 contains Exhibition Showcase, Live Events and King of the Ring. Page 2 contains Championship Road, Survivor Series and Money in the Bank. The oversized v1.1.31 Road/Survivor treatment is removed, and both pages use a large full-width Next/Back button immediately after the third mode card. Money in the Bank is no longer listed inside the Live Events hub.

## Play hub two-page layout

**Choose Your Path** is now split into two iPhone-first pages. Page 1 contains Exhibition Showcase, Live Events and King of the Ring, with a large Next arrow. Page 2 contains enlarged Championship Road and Survivor Series banners, with a matching Back arrow. Live Events uses Cody Rhodes' WWE.com profile render; Survivor Series uses Hulk Hogan's WWE.com profile render and the same shared mode-logo typography as the other Play cards.

## Jake Roberts audit

Jake’s Gutwrench Gutbuster and Jake’s Running Knee Lift have been removed completely. His 60-page deck replaces those eight pages with shared Clothesline, Atomic Drop and Neckbreaker cards. Jake intentionally carries only two personal moves for now: Jake’s Short-Arm Clothesline and Jake’s DDT.

## Superstar card nameplates

Live-game Superstar card names now render in full uppercase, matching the capitalization used by Card Studio. The existing live-game font, sizing, spacing, colour, stroke and nameplate layout are unchanged.

## Superstar Pack branding

The sealed onboarding Superstar Pack now uses the exact approved WWE Legacy image lockup already used by the launch identity instead of rebuilding the logo from styled text.

## Merch full-face artwork

Merch animated artwork now fills the complete card face and continues behind the lower plaque. The plaque remains an overlay and no longer acts as the bottom edge of the Merch artwork window.

## New-player flow

The approved **CM Punk / Roman Reigns** starter choice remains unchanged and still grants the selected starter's complete deck.

After that choice, the old era/set Welcome selector is replaced by one random **Superstar Pack**. A Superstar Pack is a reusable WWE Legacy reward type containing exactly five Normal identity cards for one released Superstar:

- Superstar
- Entrance
- one Finisher
- one Trademark
- one Action

The onboarding pack excludes already-owned Superstars. It does not create a second complete 60-page deck; the player builds that Superstar's wider deck through normal collection progression and Deck Lab.

The current pack library supports **72/72 released player-visible Superstars** before exclusions.

## Home / Season portraits

Home and Season panels that previously showed broken image placeholders now prefer WWE.com profile artwork for the featured Superstars used by those panels, while retaining the existing local-art and generic-placeholder fallback chain.

## Season Road

The 50-tier Season Road now uses large full-width reward rectangles at roughly twice the old mobile row height. Each tier has a large tier-number slab and shows the reward itself:

- actual collectible card for card rewards
- physical booster packet for booster rewards
- WWE Legacy UP medallion for Universe Points

The existing reward values, XP thresholds and claim rules are unchanged.

## Carry-forward

v1.1.24 launch-poster centering, v1.1.23 animated-art window behavior, v1.1.20+ Live Events / Trish / Merch work, and all existing gameplay systems carry forward unless specifically noted in `BUILD-CERTIFICATION.md`.

See `BUILD-CERTIFICATION.md` and the canonical release-notes file for certification details.
