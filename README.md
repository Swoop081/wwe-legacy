# WWE Legacy v0.14.06 — Match State Recovery + Season Splash

This is a **no-assets overlay build** for the current WWE Legacy flat-asset installation. Copy these files over the existing v0.14.05/current game folder and **keep your existing `assets/` directory in place**.

Included in v0.14.06:
- fixes the permanent-grounded match-state bug: a grounded Superstar automatically returns to Standing when they gain Control;
- fixes Stun so a stunned Superstar cannot Counter or Auto Counter, including CPU defenders;
- Stun clears when the opponent successfully Connects, when the stunned Superstar plays a legal Move, or when the stunned Superstar passes; a fresh Stun inflicted by the connecting Move remains active;
- keeps all authored standing-only / grounded-only card requirements intact;
- fully redesigns the Season 1 launch/continue page as a premium John Cena splash;
- corrects Season 1 splash messaging to the current **50-tier** road and **Tier 50 Ruby John Cena Superstar** reward;
- makes the Cena reward card robust when a finished Cena card-front export is not installed by using the existing Cena character art inside the collectible-card renderer rather than leaving the card blank;
- carries forward every v0.14.05 tabled UX, Live Event and booster-collation change.

The supplied ZIP intentionally **does not contain an `assets/` folder**.
