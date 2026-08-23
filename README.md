# WWE Legacy v0.14.09 — Cena Exact Plate Composition Hotfix

This is a **no-assets overlay build**. Copy it over the current WWE Legacy installation while retaining the existing `assets/` folder.

The Season 1 launch/continue splash has been corrected against the exact user-supplied `card-layered-superstar-john-cena.webp` asset (680×1000).

Key rule:

- the WebP already contains the complete physical frame **and the black/red/blue name bay**;
- WWE Legacy now overlays **only `John Cena` + `SUPERSTAR` text** inside that existing bay;
- it no longer paints a second generic nameplate panel over the card;
- it no longer paints the animated Ruby surface sweep over this splash card;
- it never reconstructs the card from Cena menu/profile artwork;
- a finished `card-custom-superstar-john-cena.webp` fallback remains supported and suppresses the runtime text overlay.

Expected existing asset:

- `assets/images/card-layered-superstar-john-cena.webp`

This asset is intentionally not bundled because user-facing WWE Legacy builds exclude `assets/`.
