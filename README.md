# WWE Legacy v1.1.21 — Linked Animated URL CORS Fallback

**Current working baseline.** v1.1.21 supersedes v1.1.20 and fixes the direct animated-URL workflow for hosts such as media CDNs that display GIFs normally but block JavaScript raw-byte fetches with CORS.

## What changed

Card Art Studio now has two valid animated-URL outcomes instead of treating CORS as a hard failure:

1. **Linked Animation** — the direct GIF/WebP URL is tested as a normal browser image. If it displays, Studio saves that URL against the selected Entrance, Action or Finisher immediately. CORS is not required.
2. **Local export, when available** — Studio then optionally attempts a CORS fetch. If the host permits it, **Export Animated Artwork** is enabled so the original GIF/WebP can be downloaded and installed locally. If the host blocks it, the linked animation remains usable and no error is raised.

Linked animation URLs persist per card in the browser, have a visible Studio preview, and can be removed with **Remove Linked Animation**.

## Runtime order

For animation-eligible cards, the game now tries:

**Linked URL → packaged animated WebP → packaged GIF → static base plate.**

That means a Tenor-style direct `.gif` link can play without being downloaded first, while packaged local assets remain the more durable fallback when you later install them.

## Carry-forward

Everything from v1.1.20 remains intact: 3-per-day Live Events with one-day cooldown, Birthday Bash retirement, Trish's Air Canada/Stratusfaction correction, authored Trish Merch, Merch expiry fronts/back rules/transparency, and Entrance/Action/Finisher animation eligibility.

See `BUILD-CERTIFICATION.md` for validation results.
