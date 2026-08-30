# WWE Legacy v1.1.4 — Canonical Image Path Guide

## Core naming rule
Use readable canonical filenames with the **actual printed name first**. For Superstar-linked cards, place the Superstar name last.

Examples:
- `you-cant-see-me-action-john-cena.webp`
- `you-cant-see-me-action-john-cena-base-plate.webp`
- `john-cena-superstar.webp`
- `john-cena-superstar-base-plate.webp`

## v1.1.4 premium frame targets
The rebuilt artwork library should now support these frame families:
- standard gameplay card front
- standard gameplay card base plate
- reward card front
- reward card base plate

## Locked standard-card redesign scope
The **top set-name area and rarity stars remain unchanged**.
Only the lower plaque/banner treatment is being redesigned visually, with larger and cleaner iPhone-first typography for:
- card name
- cost
- damage
- requirement
- card type / subtype line

## Reward-card frame lock
Reward cards should use their own premium frame family and should include relevant branding/logo treatment.

## Set-logo sources and final local targets
The v1.1.4 no-assets overlay wires the approved originals directly so the new identities render immediately when online:
- Ruthless Aggression source: `https://images.hobbydb.com/processed_uploads/subject_photo/subject_photo/image/39850/1526513686-11744-2621/WWE_20Ruthless_20Aggression_20logo_large.png`
- Current NXT source from WWE Corporate: `https://corporate.wwe.com/f/inline-images/NXT-logo.png`

When the rebuilt artwork library is materialized, the final local transparent WEBP targets remain:
- `assets/images/set-logos/ruthless-aggression-set-logo.webp`
- `assets/images/set-logos/nxt-set-logo.webp`

Card Art Studio loads the approved remote originals into export-safe memory and has an embedded fallback if a source is temporarily unavailable.

## Printing-plate rule
All printable card outputs require corresponding base plates, including:
- Superstars
- Moves
- Actions
- Entrances
- Momentum
- Merch
- Variants
- Reward-card families

## Studio/runtime alignment
Card Studio exports should target the same finished runtime path family used by the game and by `ASSET-MIGRATION.csv`.

## v1.1.17 launch-screen artwork
- Canonical Season 1 launch poster: `assets/images/season1-stratusfaction-launch-poster.jpg`
- Native supplied dimensions: **768 × 1376**.
- Preserve the complete artwork; do not crop the central poster to force a device aspect ratio.
- The clickable PLAY NOW region is an HTML hotspot aligned by percentages in `renderSplash()` / `.launch-poster-play-hotspot`; do not bake additional HTML text or buttons over the poster.


## v1.1.19 animated card assets

Entrances, Actions and Finisher Moves may install an animated base plate next to the existing flat/base-plate artwork using the same canonical image key:

- Preferred: `assets/images/<image-key>-animated.webp`
- GIF fallback: `assets/images/<image-key>-animated.gif`

The ordinary `assets/images/<image-key>-base-plate.webp` remains required/recommended as the static fallback. Animated assets should not bake mutable card text/stats into the media; the runtime live overlay renders those above the animated base plate.
## v1.1.20 animated URL + Merch plate rules

- Card Art Studio may ingest a direct `.gif` or animated `.webp` media URL for eligible Entrance, Action and Finisher cards. Remote media is preserved as animation; do not route it through the static image proxy.
- Canonical installed animation filenames remain `assets/images/<image-key>-animated.webp` or `assets/images/<image-key>-animated.gif`.
- For layered **Merch** base plates, the entire live lower-plaque footprint must remain **true alpha/transparent**. Product photography/background art must stop before or be cleared from that rectangle so the runtime plaque is the only footer layer.
