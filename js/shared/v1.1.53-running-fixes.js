// WWE Legacy v1.1.53 — post-v1.1.52 running-fix bundle.
(function(){
  "use strict";
  if(typeof document==="undefined")return;

  const BUILD="1.1.53";
  const game=document.getElementById("game");
  if(!game)return;

  const seasonCardArtByTier=new Map([
    [2,"stratusphere-trish-stratus-base-plate.webp"],[3,"chick-kick-trish-stratus-base-plate.webp"],[5,"air-canada-trish-stratus-base-plate.webp"],[7,"stratusfaction-trish-stratus-base-plate.webp"],[10,"stratusfaction-guaranteed-action-trish-stratus-base-plate.webp"],[11,"stratusphere-trish-stratus-base-plate.webp"],[13,"chick-kick-trish-stratus-base-plate.webp"],[15,"air-canada-trish-stratus-base-plate.webp"],[17,"stratusfaction-trish-stratus-base-plate.webp"],[21,"stratusphere-trish-stratus-base-plate.webp"],[23,"chick-kick-trish-stratus-base-plate.webp"],[25,"air-canada-trish-stratus-base-plate.webp"],[27,"stratusfaction-trish-stratus-base-plate.webp"],[31,"stratusphere-trish-stratus-base-plate.webp"],[33,"chick-kick-trish-stratus-base-plate.webp"],[35,"air-canada-trish-stratus-base-plate.webp"],[37,"stratusfaction-trish-stratus-base-plate.webp"],[41,"stratusphere-trish-stratus-base-plate.webp"],[43,"chick-kick-trish-stratus-base-plate.webp"],[45,"air-canada-trish-stratus-base-plate.webp"],[47,"stratusfaction-trish-stratus-base-plate.webp"],[48,"time-to-rock-roll-trish-stratus-base-plate.webp"],[50,"trish-stratus-superstar-base-plate.webp"]
  ]);

  const packIdentity={
    "raw-series-1":{label:"RAW",logo:"https://upload.wikimedia.org/wikipedia/commons/8/86/WWE_RAW_Logo_2025.svg"},
    "smackdown-series-1":{label:"SMACKDOWN",logo:"https://upload.wikimedia.org/wikipedia/commons/c/c9/WWE_SmackDown_%282024%29_Logo.svg"},
    "nxt-series-1":{label:"NXT",logo:"https://corporate.wwe.com/f/inline-images/NXT-logo.png"},
    "evolution-series-1":{label:"EVOLUTION",logo:"https://www.pngkey.com/png/detail/166-1668926_-img-wwe-evolution-png.png"},
    "summerslam-series-1":{label:"SUMMERSLAM",logo:"https://www.thesmackdownhotel.com/media/event-images/wwe-summerslam-2026-10th-august-2026-1760264859-uopR.avif"},
    "golden-era-series-1":{label:"GOLDEN ERA",logo:`./assets/images/set-logos/golden-era-set-logo.png?v=${BUILD}`},
    "new-generation-series-1":{label:"NEW GENERATION",logo:`./assets/images/branding-new-generation-series-1-new-generation-logo.png?v=${BUILD}`},
    "attitude-era-series-1":{label:"ATTITUDE ERA",logo:"https://www.pikpng.com/pngl/m/218-2186916_wwf-wwe-attitude-era-logo-clipart.png"},
    "ruthless-aggression-series-1":{label:"RUTHLESS AGGRESSION",logo:"https://images.hobbydb.com/processed_uploads/subject_photo/subject_photo/image/39850/1526513686-11744-2621/WWE_20Ruthless_20Aggression_20logo_large.png"}
  };

  const tierFromNode=node=>{const match=String(node?.id||"").match(/^season-tier-(\d+)$/);return match?Number(match[1]):0;};

  function replaceSeasonCardVisual(node,visual){
    const tier=tierFromNode(node),filename=seasonCardArtByTier.get(tier);
    if(!filename||visual.dataset.v1153Lightweight==="card")return false;
    const img=document.createElement("img");
    img.className="season-reward-static-card";img.src=`./assets/images/${filename}?v=${BUILD}`;img.alt=node.querySelector(".season-road-reward strong")?.textContent?.trim()||"Season reward card";img.loading="lazy";img.decoding="async";
    visual.replaceChildren(img);visual.dataset.v1153Lightweight="card";return true;
  }

  function packSetId(pack){if(!pack)return "";const className=Array.from(pack.classList).find(name=>name.startsWith("pack-set-"));return className?className.slice("pack-set-".length):"";}

  function replaceSeasonPackVisual(visual){
    if(visual.dataset.v1153Lightweight==="pack")return false;
    const oldPack=visual.querySelector(".physical-booster-pack");if(!oldPack)return false;
    const setId=packSetId(oldPack),identity=packIdentity[setId]||{label:setId.replaceAll("-"," ").toUpperCase()||"WWE LEGACY",logo:""};
    const pack=document.createElement("span");pack.className=`season-pack-lightweight pack-set-${setId||"legacy"}`;pack.setAttribute("aria-label",`${identity.label} Series 1 booster pack`);
    const inner=document.createElement("span");inner.className="season-pack-lightweight-inner";
    if(identity.logo){const logo=document.createElement("img");logo.className="season-pack-set-logo";logo.src=identity.logo;logo.alt=`${identity.label} logo`;logo.loading="lazy";logo.decoding="async";logo.referrerPolicy="no-referrer";logo.addEventListener("error",()=>logo.classList.add("is-unavailable"),{once:true});inner.appendChild(logo);}
    const fallback=document.createElement("span");fallback.className="season-pack-logo-fallback";fallback.textContent=identity.label;inner.appendChild(fallback);
    const series=document.createElement("b");series.className="season-pack-series";series.textContent="SERIES 1";inner.appendChild(series);
    pack.appendChild(inner);visual.replaceChildren(pack);visual.dataset.v1153Lightweight="pack";visual.dataset.seasonPackSet=setId;return true;
  }

  function lightweightSeasonRoad(){
    const road=game.querySelector(".season-reward-road");if(!road)return;
    road.querySelectorAll(".season-road-node").forEach(node=>{const visual=node.querySelector(".season-road-reward-visual");if(!visual)return;if(seasonCardArtByTier.has(tierFromNode(node)))replaceSeasonCardVisual(node,visual);else if(visual.classList.contains("season-reward-pack")||visual.querySelector(".physical-booster-pack"))replaceSeasonPackVisual(visual);});
    road.dataset.v1153Stabilized="1";
  }

  const seasonEndLocal=()=>new Date(2026,9,1,0,0,0,0);
  const formatCountdown=ms=>{const value=Math.max(0,Number(ms)||0),days=Math.floor(value/86400000),hours=Math.floor((value%86400000)/3600000),minutes=Math.floor((value%3600000)/60000),seconds=Math.floor((value%60000)/1000),pad=n=>String(n).padStart(2,"0");return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;};
  let countdownObserver=null,countdownNode=null;
  function correctSeasonCountdown(){const node=game.querySelector("[data-season-end-countdown]");if(!node){countdownObserver?.disconnect();countdownObserver=null;countdownNode=null;return;}const ms=seasonEndLocal().getTime()-Date.now(),expected=ms<=0?"SEASON COMPLETE":formatCountdown(ms);if(node.textContent!==expected)node.textContent=expected;node.dataset.localSeasonDeadline="2026-10-01T00:00:00-local";if(node===countdownNode)return;countdownObserver?.disconnect();countdownNode=node;countdownObserver=new MutationObserver(()=>correctSeasonCountdown());countdownObserver.observe(node,{childList:true,characterData:true,subtree:true});}

  let frame=0;function schedule(){if(frame)return;frame=requestAnimationFrame(()=>{frame=0;lightweightSeasonRoad();correctSeasonCountdown();});}
  const gameObserver=new MutationObserver(schedule);gameObserver.observe(game,{childList:true,subtree:true});
  function releaseSeasonResources(){countdownObserver?.disconnect();countdownObserver=null;countdownNode=null;if(frame){cancelAnimationFrame(frame);frame=0;}}
  document.addEventListener("click",event=>{if(document.body?.dataset?.screen!=="seasons")return;const leaving=event.target?.closest?.("#chrome-home,[data-mobile-nav]");if(!leaving)return;if(leaving.matches?.('[data-mobile-nav="seasons"]'))return;releaseSeasonResources();},true);
  window.addEventListener("pagehide",releaseSeasonResources,{passive:true});
  schedule();
})();
