// WWE Legacy v1.1.205 — single player-facing runtime overlay entry point.
// Historical implementation filenames are imported here only as implementation modules;
// index.html no longer executes a version ladder directly.
import "../shared/v1.1.66-featured-superstar-ability-audit.js?v=1.1.205";
import "../shared/v1.1.151-placeholder-card-cleanup.js?v=1.1.205";
import "../shared/v1.1.155-card-copy-pack-logo-nav.js?v=1.1.205";
import "../shared/v1.1.201-starter-draft.js?v=1.1.205";
import "../shared/v1.1.154-roster-order.js?v=1.1.205";
import "../shared/v1.1.177-championship-road-select.js?v=1.1.205";

import "../ui/app.js?v=1.1.205";

const classicScripts = [
  "../shared/card-face-renderer.js",
  "../shared/card-face-readability-hotfix.js",
  "../shared/card-face-animation-layout-hotfix.js",
  "../shared/card-face-animation-black-field-hotfix.js",
  "../data/superstar-nameplates.js",
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

// The pack-branding shim contained no behavior beyond setting a legacy global flag;
// it is intentionally retired from the runtime.
for (const path of classicScripts) {
  const script = document.createElement("script");
  script.src = `${path}?v=1.1.205`;
  script.async = false;
  document.head.appendChild(script);
}

globalThis.__WWE_LEGACY_RUNTIME__ = Object.freeze({ version: "1.1.205", entry: "js/runtime/current.js" });
