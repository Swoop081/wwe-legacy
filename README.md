# WWE Legacy v1.1.23 — Universal Animated Card Shell

**Current working baseline.** v1.1.23 supersedes v1.1.21.

## What changed

Every collectible card can now optionally have an animated version. Animation is no longer restricted to Entrances, Actions and Finishers.

Runtime order remains:

**Linked animation URL → packaged animated WebP → packaged GIF → existing static front/base plate.**

The important renderer change is that animated media is now only the **moving artwork layer inside the normal WWE Legacy card shell**. It cannot replace the whole card. The normal card dimensions, border/frame, rarity stars, protected top-right set logo, lower information plaque and live text remain above it.

This directly fixes the first Roman's Spear linked-GIF test where the raw GIF swallowed the frame/logo and caused the large live text to collide with the plaque.

Card inspectors also use a direct front/back face swap instead of relying on an iOS Safari 3D backface for the enlarged card, preventing the rules side from appearing as a mirrored animated front.

## Card Art Studio

The Animated Card controls are now available for **every selected card**. GIF and animated WebP local files and direct linked URLs continue to work, with the normal static version always retained as fallback.

## Carry-forward

All v1.1.21 linked-animation CORS fallback behavior and all v1.1.20 Live Events, Trish, Merch and prior card-presentation/gameplay systems remain unchanged.

See `BUILD-CERTIFICATION.md` for validation results.
