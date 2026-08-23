# WWE Legacy v0.14.11 — Season Splash Cleanup + Daily Live Event XP

This is a **verified no-assets overlay build**. Copy it over the current WWE Legacy installation while retaining the existing `assets/` folder.

## Included tabled changes

- **Season 1 splash:** removes the inherited right-edge fade/mask from John Cena’s exact authored physical card so the card renders at full opacity edge-to-edge.
- **Season 1 splash:** removes the redundant `50 TIERS` and `TIER 50 RUBY SUPERSTAR` fact boxes. The 50-tier structure remains stated naturally in the Season copy and the reward remains the Tier 50 John Cena Superstar.
- **Live Event route:** opening or returning to a tower automatically scrolls the opponent rail to the current match and centers it where possible. Completed towers open at the final cleared opponent.
- **Daily Live Event XP:** the three rotating Daily Live Events remain 5 matches each. Wins continue to award **5 Season XP per match** (15 wins = 75 XP). Clearing all three rotating Daily Live Events on the same local day automatically awards a **one-time +25 Season XP** completion bonus, making the full three-event daily routine **100 Season XP**.
- The Live Events hub now shows daily set progress (`0/3` through `3/3`) and the +25 XP completion reward/claimed state.

All v0.14.10 and earlier fixes carry forward, including the exact Cena direct-plate renderer, grounded/stun recovery, Live Event defeated-state checks, Auto Counter scroll retention, 3-event + MITB ordering, booster premium-printing collation, and 100-pack Superstar pity.

## Packaging

The `assets/` directory is intentionally excluded from this ZIP. It overlays the current WWE Legacy asset library.
