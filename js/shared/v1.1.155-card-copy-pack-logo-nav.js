// v1.1.155 — production copy cleanup, sealed-pack logo hardening, premium nav icons.
// v1.1.165 — stale-build update recovery for iPhone Safari.
// v1.1.186 — Evolution shared Short-Arm Clothesline balance pass.
import { allGameplayCards } from "../data/content.js?v=1.1.132";
import "./v1.1.163-wwe-photo-refresh.js?v=1.1.163";

for (const card of allGameplayCards) {
  if (!card || card.superstarId != null || typeof card.rulesText !== "string") continue;
  card.rulesText = card.rulesText
    .replace(/^Shared fundamental\.\s*/i, "")
    .replace(/^Shared canonical\.\s*/i, "")
    .replace(/^Shared Counter-only reversal\.\s*/i, "Counter-only reversal. ")
    .replace(/^Shared\.\s*/i, "")
    .replace(/^Shared\s+(?:RAW|SmackDown|NXT|Evolution|SummerSlam|Golden Era|New Generation|Attitude Era|Ruthless Aggression)\s+move\.\s*/i, "");
}
for (const card of allGameplayCards) {
  if (card?.name !== "Front Kick" || card?.superstarId != null) continue;
  if (/smackdown/i.test(String(card.setId || ""))) card.rulesText = "";
}

// Keep Jake Roberts' trademark identity separate. The existing shared card is
// promoted into Evolution Series 1 and tuned between the basic Clothesline
// (3/5) and the stronger running/leaping family (4/7).
const sharedShortArm = allGameplayCards.find(card => card?.id === "short-arm-clothesline" && card?.superstarId == null);
if (sharedShortArm) {
  Object.assign(sharedShortArm, {
    name: "Short-Arm Clothesline",
    kind: "move",
    setId: "evolution-series-1",
    cost: 4,
    damage: 6,
    requirements: { strike: 1 },
    moveType: "strike",
    method: "strike",
    superstarId: null,
    rarity: 1,
    rulesText: "Grounds opponent.",
    groundOpponent: true,
    groundedOnly: false,
    stun: 0,
    selfDamage: 0,
    effects: [],
    counterState: "arm-extended",
    trademark: false,
    finisher: false
  });
}

const LOGOS = {
  "raw-series-1":"./assets/images/pack-logos/raw-series-1-transparent.svg?v=1.1.155",
  "smackdown-series-1":"./assets/images/pack-logos/smackdown-series-1-transparent.svg?v=1.1.155",
  "nxt-series-1":"./assets/images/pack-logos/nxt-series-1-transparent.svg?v=1.1.155",
  "evolution-series-1":"./assets/images/pack-logos/evolution-series-1-transparent.svg?v=1.1.155",
  "summerslam-series-1":"./assets/images/pack-logos/summerslam-series-1-transparent.svg?v=1.1.155",
  "golden-era-series-1":"./assets/images/pack-logos/golden-era-series-1-transparent.svg?v=1.1.155",
  "new-generation-series-1":"./assets/images/pack-logos/new-generation-series-1-transparent.svg?v=1.1.155",
  "attitude-era-series-1":"./assets/images/pack-logos/attitude-era-series-1-transparent.svg?v=1.1.155",
  "ruthless-aggression-series-1":"./assets/images/pack-logos/ruthless-aggression-series-1-transparent.svg?v=1.1.155"
};
function setFromPack(pack) {
  const classes = [...pack.classList];
  const direct = classes.find(c => c.startsWith("pack-set-"));
  if (direct) return direct.slice(9);
  const text = `${pack.closest(".pack-opening-screen")?.textContent || ""} ${pack.textContent || ""}`.toLowerCase();
  if (text.includes("smackdown")) return "smackdown-series-1";
  if (text.includes("raw")) return "raw-series-1";
  if (text.includes("nxt")) return "nxt-series-1";
  if (text.includes("evolution")) return "evolution-series-1";
  if (text.includes("summerslam")) return "summerslam-series-1";
  if (text.includes("golden era")) return "golden-era-series-1";
  if (text.includes("new generation")) return "new-generation-series-1";
  if (text.includes("attitude era")) return "attitude-era-series-1";
  if (text.includes("ruthless aggression")) return "ruthless-aggression-series-1";
  return "";
}
function hardenPackLogo(pack) {
  if (!(pack instanceof HTMLElement)) return;
  const src = LOGOS[setFromPack(pack)];
  if (!src) return;
  let logo = pack.querySelector(":scope > .v1155-pack-logo");
  if (!logo) {
    logo = document.createElement("img");
    logo.className = "v1155-pack-logo";
    logo.alt = "";
    logo.setAttribute("aria-hidden", "true");
    (pack.querySelector(".pack-face,.pack-body,.pack-front,.physical-pack-face") || pack).appendChild(logo);
  }
  logo.src = src;
  pack.classList.add("v1155-has-pack-logo");
}
const ICONS = {
  menu:'<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4.5 15.3 16 5.7l11.5 9.6v11.2h-8v-7.8h-7v7.8h-8z"/><path d="M2.8 15.9 16 4.8l13.2 11.1"/></svg>',
  'play-menu':'<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 5.7 26 16 9 26.3z"/><path d="M6.5 3.8v24.4"/></svg>',
  'deck-builder':'<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="8" y="7" width="15" height="20" rx="1.5"/><path d="M12 3.8h15v20M4.8 11h3.2M4.8 16h3.2M4.8 21h3.2"/></svg>',
  seasons:'<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="7.2"/><path d="M16 9.5v7l5 3"/></svg>',
  challenges:'<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 5h14v23H9z"/><path d="M12 3h8v5h-8zM12.5 14l2.2 2.2 4.8-5M12.5 22h7"/></svg>'
};
function premiumNav() {
  const nav = document.querySelector("#mobile-game-nav");
  if (!nav) return;
  for (const [key,svg] of Object.entries(ICONS)) {
    const icon = nav.querySelector(`[data-mobile-nav="${key}"] .nav-icon`);
    if (icon && icon.dataset.v1155 !== "1") { icon.innerHTML = svg; icon.dataset.v1155 = "1"; }
  }
}

// v1.1.165: never strand a stale bundle on ?build=<latest>.
// A manual UPDATE NOW must always be able to force a fresh document request.
async function hardUpdateToLatest() {
  try {
    const manifest = new URL("./build.json", location.href);
    manifest.searchParams.set("_", String(Date.now()));
    const response = await fetch(manifest.toString(), { cache: "no-store" });
    if (!response.ok) throw new Error("build check failed");
    const latest = String((await response.json())?.version || "").trim();
    if (!latest) throw new Error("missing build version");
    try { sessionStorage.removeItem(`wwe-legacy-update-attempts:${latest}`); } catch {}
    const target = new URL(location.href);
    target.searchParams.set("build", latest);
    target.searchParams.set("_update", String(Date.now()));
    target.searchParams.set("_hard", String(Date.now()));
    location.replace(target.toString());
    return true;
  } catch {
    const target = new URL(location.href);
    target.searchParams.set("_hard", String(Date.now()));
    location.replace(target.toString());
    return false;
  }
}

// Capture before app.js so its stale loop-protection cannot swallow the button.
document.addEventListener("click", event => {
  const button = event.target?.closest?.("#apply-app-update");
  if (!button) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  hardUpdateToLatest();
}, true);

function apply(root=document) {
  root.querySelectorAll?.(".physical-booster-pack").forEach(hardenPackLogo);
  if (root.matches?.(".physical-booster-pack")) hardenPackLogo(root);
  premiumNav();
}
const start=()=>{ apply(document); new MutationObserver(records=>{ for(const record of records) for(const node of record.addedNodes) if(node.nodeType===1) apply(node); premiumNav(); }).observe(document.documentElement,{childList:true,subtree:true}); };
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start,{once:true}); else start();
