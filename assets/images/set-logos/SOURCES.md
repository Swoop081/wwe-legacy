# WWE Legacy set-logo sources — v1.1.7

## Global top-right logo contract
All set, event and Reward marks are rendered inside the same protected top-right safe zone. The right inset is 7.5% of card width, visually mirroring the rarity-star safe area on the left; the top inset is 5.2% of card height.

v1.1.7 additionally sizes Card Art Studio logos from their **visible alpha bounds** rather than the full source canvas. This prevents transparent padding inside a source file from making the visible logo appear undersized or shifted left.

## Golden Era — Series 1
Approved visual reference supplied during v1.1.7 review:
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRItn4fyJd25t5aMC_YOicWgyII9WbHDi_QeBFBSwvACw&s

Runtime transparent equivalent of that same blue/white/orange classic WWF mark:

The previous gold-only substitute is not the approved Golden Era identity.

## Attitude Era — Series 1
The existing WWF scratch identity remains the correct mark. v1.1.7 changes its presentation: transparent padding is trimmed before sizing and its apparent-size profile now matches New Generation (`maxW .235 / maxH .105`) at the shared safe-zone anchor.

## Ruthless Aggression — Series 1
Exact approved source supplied by the project owner:
https://images.hobbydb.com/processed_uploads/subject_photo/subject_photo/image/39850/1526513686-11744-2621/WWE_20Ruthless_20Aggression_20logo_large.png

## NXT — Series 1
Current silver WWE NXT identity sourced from WWE Corporate / WWE.com:
https://corporate.wwe.com/f/inline-images/NXT-logo.png

No generated or text substitute is allowed for NXT or Ruthless Aggression. Card Art Studio attempts an export-safe source fetch and, if the approved source is unavailable, leaves the logo absent rather than inventing a different mark.

## WWE Legacy Reward
Local project asset:
assets/images/branding-wwe-legacy-reward-logo.png

All Reward-family sets use this mark, including Season 1 / Trish Stratus, Final Boss, Who’s Next and parked Chyna content. The Studio export-safe map uses this exact local Reward mark so local/file-protocol exports cannot fall back to the older `Rewards / Season Exclusive` badge.
