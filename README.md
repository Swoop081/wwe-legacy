# WWE Legacy v1.1.22 — Universal Animation + Merch Transparency

**Current working baseline.** v1.1.22 supersedes v1.1.21.

## What changed

### Merch base-plate transparency finalisation
- Merch base-plate export now performs a **final destination-out alpha clear** over the entire live plaque footprint after every template, artwork, veil, logo and frame composition step.
- No product-photo background, set treatment, shadow or prior plaque pixel can survive underneath the live Merch plaque.
- The live card renderer remains responsible for the clean rectangular Merch plaque and `MERCH · N MATCHES` front label.

### Optional animation for every collectible card
- Every card may now have a linked or packaged animated GIF/WebP version.
- Static artwork remains the automatic fallback when no animation exists, the source fails, the card is off-screen, or reduced motion is enabled.
- Card Art Studio exposes animated file/URL controls for **all card types**, rather than only Entrances, Actions and Finishers.

### Animated cards retain the normal physical card
- Animated media is now treated as the **artwork layer**, clipped inside the card artwork window.
- It no longer replaces the full card image.
- Normal card aspect ratio, border/frame, rarity stars, top-right set logo, lower plaque, Cost/Damage, Method dots and card name/type remain live above the animation.
- Full-screen card inspectors show the back as a direct non-mirrored rules face.

## Carry-forward

All v1.1.21/v1.1.20 systems remain intact, including linked-animation CORS fallback, three-per-day Live Events, Trish's corrected Air Canada/Stratusfaction roles, authored Trish Merch, smart Merch compatibility, and all existing card presentation/gameplay systems.

See `BUILD-CERTIFICATION.md` for validation results.
