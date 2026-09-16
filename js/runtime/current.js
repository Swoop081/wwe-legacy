// WWE Legacy v1.1.210 — canonical player-facing runtime entry.
// Critical boot invariant: the application module loads FIRST. No static imports
// are allowed above it because ES-module imports are hoisted and one failing
// compatibility module would prevent app.js from ever attaching the launch UI.

const VERSION = "1.1.210";

try {
  await import(`../ui/app.js?v=${VERSION}`);
  globalThis.__WWE_LEGACY_APP_BOOTED__ = true;
} catch (error) {
  globalThis.__WWE_LEGACY_BOOT_ERROR__ = String(error?.stack || error?.message || error);
  console.error("WWE Legacy application boot failed", error);
  throw error;
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

// Launch poster is presentation-only: no visible button/text. The app's existing
// launch action remains authoritative, with its hit target expanded to the viewport.
try { await import(`./splash-tap-anywhere.js?v=${VERSION}`); }
catch (error) { console.error("Non-fatal launch splash interaction failed", error); }

const enhancementModules = [
  "../shared/v1.1.66-featured-superstar-ability-audit.js",
  "../shared/v1.1.151-placeholder-card-cleanup.js",
  "../shared/v1.1.155-card-copy-pack-logo-nav.js",
  "../shared/v1.1.201-starter-draft.js",
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
