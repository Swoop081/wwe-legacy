# WWE Legacy v0.14.08 — Cena Physical Card Renderer Hotfix

This is a **no-assets overlay build**. Copy it over the current WWE Legacy installation while retaining the existing `assets/` folder.

The build fixes the Season 1 splash so John Cena’s layered Superstar export is treated correctly as a card plate and receives the canonical runtime John Cena nameplate. A finished flat/custom Cena front remains supported without receiving a duplicate runtime nameplate.

Expected existing Cena card asset candidates:

- `assets/images/card-layered-superstar-john-cena.webp` — preferred layered card plate
- `assets/images/card-custom-superstar-john-cena.webp` — exact finished flat/custom fallback

The splash does not synthesize a Cena physical card from menu/profile artwork.
