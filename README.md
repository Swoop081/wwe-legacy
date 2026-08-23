# WWE Legacy v0.14.10 — Cena Direct Plate Hotfix

This is a **verified no-assets overlay build**. Copy it over the current WWE Legacy installation while retaining the existing `assets/` folder.

## Season 1 Cena splash fix

The Season 1 launch/continue splash now renders the exact user-supplied `card-layered-superstar-john-cena.webp` (680×1000) **directly**, without nesting it inside WWE Legacy's generic `.ccg-card` shell.

That generic shell was the source of the repeated black gutter / extra frame on iPhone. v0.14.10 removes it from this splash path entirely.

The splash now:

- renders the authored Cena plate edge-to-edge at its true 680:1000 ratio;
- adds only `John Cena` + `SUPERSTAR` text inside the plate's existing blank name bay;
- does not draw a second card shell, frame, tier overlay, or nameplate background;
- never reconstructs the card from Cena menu/profile artwork;
- keeps finished flat/custom Cena fronts supported and suppresses runtime name text for those finished fronts.

Expected existing asset:

`assets/images/card-layered-superstar-john-cena.webp`

The `assets/` directory is intentionally excluded from this distribution.

All v0.14.09 and earlier fixes carry forward.
