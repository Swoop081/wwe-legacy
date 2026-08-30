# WWE Legacy v1.1.21 — Build Certification

## Release identity
- Version: **v1.1.21**
- Title: **Linked Animated URL CORS Fallback**
- Date: **30 August 2026**
- Base: **v1.1.20 — Live Events + Trish Corrections + Authored Merch + Animated URL Import**
- Scope: fixes direct animated-media URL authoring when a host displays GIF/WebP normally but blocks browser `fetch()` with CORS.

## Implemented changes

### CORS-free linked animation workflow
- Card Art Studio no longer treats a failed cross-origin raw-byte fetch as a failed animated URL.
- A direct `.gif` or `.webp` URL is first validated through a normal browser image load, which does **not** require CORS and matches the live game's playback path.
- A successfully displayed URL is saved immediately as the selected card's **Linked Animation**.
- Linked URLs persist per card in same-origin local storage under `wweLegacyAnimatedCardLinks.v1` and are restored when that card is selected again in Studio.
- Studio shows the linked animation in a dedicated preview and provides **Remove Linked Animation**.
- Raw `fetch()` is now optional. If the host permits CORS, Studio also preserves the original GIF/WebP bytes and enables **Export Animated Artwork**. If the host blocks CORS, linked playback remains successful and export simply stays unavailable.

### Live runtime fallback order
- Eligible Entrance / Action / Finisher cards prefer the saved linked URL first.
- If the linked host later fails, runtime falls back to packaged animated WebP, then packaged GIF, then the existing static base plate.
- Viewport-aware animation loading and reduced-motion behavior from v1.1.19 remain unchanged.

## Carry-forward
- All v1.1.20 Live Events, Trish correction, authored Merch ladder/presentation/transparency and animated-card eligibility behavior remain unchanged.
- No gameplay, card values, deck, economy, roster, booster, progression, Merch effect, Live Event or save-schema changes.

## Certification
- Dedicated v1.1.21 linked-animation assertions: **4/4 passed**.
- Combined v1.1.20 + v1.1.21 focused assertions: **9/9 passed**.
- Full suite: **1,067 discovered / 901 passed / 72 retained historical-contract failures / 94 skipped**.
- Direct comparison with v1.1.20: **0 added failing names / 0 removed failing names**; inherited 72-failure set is identical.
- Rebuild validation: **95 Superstars / 95 decks / 835 gameplay cards / 0 orphans / 0 issues**.
- Collector ID audit: **930 cards / 930 manifest entries / 0 issues**.
- Flow audit: **95 Superstars / 0 issues**.
- Browser JavaScript syntax checks: **passed** for live UI, animated-art helper and Card Art Studio.
- Cache/version stamp: **v1.1.21**.
- Physical visual/interaction smoke: **pending-v1.1.21-user-smoke**, specifically direct Tenor-style linked GIF use in Studio and live-card playback.
