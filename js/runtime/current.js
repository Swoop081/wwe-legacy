// WWE Legacy v1.1.224 — canonical player-facing runtime entry.
// Critical boot invariant: the application module loads FIRST. No static imports
// are allowed above it because ES-module imports are hoisted and one failing
// compatibility module would prevent app.js from ever attaching the launch UI.

const VERSION = "1.1.250";

function showBootError(error, stage = "Application boot") {
  const detail = String(error?.stack || error?.message || error || "Unknown error");
  globalThis.__WWE_LEGACY_BOOT_ERROR__ = detail;
  const paint = () => {
    document.body.innerHTML = `<main style="min-height:100vh;background:#09090b;color:#fff;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-sizing:border-box"><section style="max-width:760px;margin:8vh auto;background:#17171b;border:2px solid #d22;border-radius:16px;padding:20px;box-shadow:0 10px 40px #000"><h1 style="margin:0 0 12px;font-size:24px">WWE LEGACY BOOT ERROR</h1><p style="margin:0 0 12px;color:#ff8b8b;font-weight:800">${stage}</p><pre style="white-space:pre-wrap;overflow-wrap:anywhere;background:#050506;border-radius:10px;padding:14px;font-size:12px;line-height:1.45;user-select:text;-webkit-user-select:text">${detail.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]))}</pre><p style="margin:12px 0 0;color:#aaa;font-size:12px">Version ${VERSION} — take a screenshot of this screen.</p></section></main>`;
  };
  if (document.body) paint(); else addEventListener("DOMContentLoaded", paint, { once:true });
}

addEventListener("error", event => {
  if (!globalThis.__WWE_LEGACY_APP_BOOTED__) showBootError(event.error || event.message, "JavaScript error before boot completed");
});
addEventListener("unhandledrejection", event => {
  if (!globalThis.__WWE_LEGACY_APP_BOOTED__) showBootError(event.reason, "Unhandled promise rejection during boot");
});

const bootProbeModules = [
  "../config/build.js",
  "../config/update.js",
  "../data/superstars.js",
  "../data/content.js",
  "../data/premiere-gameplay.js",
  "../data/decks.js",
  "../data/sets.js",
  "../data/release.js",
  "../data/collection.js",
  "../data/artwork.js",
  "../data/animated-card-art.js",
  "../data/profile.js",
  "../data/boosters.js",
  "../data/store.js",
  "../data/matchmaking.js",
  "../data/deck-assistant.js",
  "../data/variants.js",
  "../data/cpu-tier-scaling.js",
  "../engine/MatchEngine.js",
  "../engine/rules.js",
  "../engine/utils.js",
  "../engine/health.js",
  "../ai/WrestlingAI.js",
  "../ui/turn-driver.js",
  "../ui/play-pile.js",
  "../ui/play-pile-mats.js",
  "../data/ladder.js",
  "../data/king-of-the-ring.js",
  "../data/championship-road.js",
  "../data/live-events.js",
  "../data/challenges.js",
  "../data/career.js",
  "../data/set-progression.js",
  "../data/move-types.js",
  "../data/counter-states.js",
  "../data/catalogue.js",
  "../data/deck-builder.js",
  "../data/deck-health.js",
  "../data/seasons.js",
  "../data/game-rules.js",
  "../data/save-backup.js",
  "../data/daily-spin.js",
  "../data/merch.js",
  "../data/superstar-variants.js",
  "../data/survivor-series-mode.js"
];

let bootProbeFailed = false;
for (const path of bootProbeModules) {
  try {
    await import(`${path}?bootprobe=${VERSION}`);
  } catch (error) {
    bootProbeFailed = true;
    console.error(`WWE Legacy boot probe failed: ${path}`, error);
    showBootError(error, `Failed module: ${path.replace("../", "js/")}`);
    break;
  }
}

if (!bootProbeFailed) {
  try {
    await import(`../ui/app.js?v=${VERSION}`);
    globalThis.__WWE_LEGACY_APP_BOOTED__ = true;
  } catch (error) {
    console.error("WWE Legacy application boot failed after module probes passed", error);
    showBootError(error, "All dependency probes passed — failed executing js/ui/app.js");
  }
}

function loadClassicScript(path) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = `${path}?v=${VERSION}`;
    script.async = false;
    script.onload = () => resolve(true);
    script.onerror = error => { console.error(`Non-fatal WWE Legacy compatibility script failed: ${path}`, error); resolve(false); };
    document.head.appendChild(script);
  });
}

// The shared card-face renderer is a dependency of Starter Draft, pack reveals,
// Deck Assistance and every other live collectible surface. Load it immediately
// after the app boot, before any enhancement can ask a card to paint itself.
await loadClassicScript("../shared/card-face-renderer.js");
await loadClassicScript("../shared/card-face-readability-hotfix.js");
await loadClassicScript("../shared/card-face-animation-layout-hotfix.js");
await loadClassicScript("../shared/card-face-animation-black-field-hotfix.js");
await loadClassicScript("../data/superstar-nameplates.js");

// app.js necessarily boots before compatibility scripts. Repaint the card canvases
// once the renderer exists so cards already present in the DOM are not left as
// bare printing plates with empty plaques.
try { globalThis.WWELegacyRenderCardFaces?.(document); }
catch (error) { console.error("Initial WWE Legacy card-face repaint failed", error); }


const enhancementModules = [
  "../shared/v1.1.66-featured-superstar-ability-audit.js",
  "../shared/v1.1.151-placeholder-card-cleanup.js",
  "../shared/v1.1.155-card-copy-pack-logo-nav.js",
  "../shared/v1.1.154-roster-order.js",
  "../shared/v1.1.177-championship-road-select.js"
];

for (const path of enhancementModules) {
  try { await import(`${path}?v=${VERSION}`); }
  catch (error) { console.error(`Non-fatal WWE Legacy enhancement failed: ${path}`, error); }
}

const classicScripts = [
  "../shared/v1.1.136-onboarding-local-assets.js",
  "../shared/v1.1.166-live-event-branding.js",
  "../shared/v1.1.172-survivor-series-unlock.js",
  "../shared/v1.1.56-consolidated-fixes.js",
  "../shared/v1.1.61-home-stat-links.js",
  "../shared/v1.1.62-home-cena-legacy.js",
  "../shared/v1.1.63-play-path-portraits.js",
  "../shared/v1.1.104-pack-reward-hotfix.js",
  "../shared/v1.1.148-pack-summary-runtime-layout.js"
];

for (const path of classicScripts) await loadClassicScript(path);

globalThis.__WWE_LEGACY_RUNTIME__ = Object.freeze({ version: VERSION, entry: "js/runtime/current.js", bootComplete: true });
