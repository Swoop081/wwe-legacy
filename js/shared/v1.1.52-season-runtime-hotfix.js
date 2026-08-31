// WWE Legacy v1.1.52 — local Season 1 deadline + physical pack branding audit.
(function(){
  "use strict";
  if(typeof document==="undefined")return;

  // Season 1 runs through all of September 30 in the player's own timezone.
  // A Date built from numeric components is deliberately local-time, not UTC.
  const seasonEndLocal=()=>new Date(2026,9,1,0,0,0,0);

  const formatCountdown=ms=>{
    const remaining=Math.max(0,Number(ms)||0);
    const days=Math.floor(remaining/86400000);
    const hours=Math.floor((remaining%86400000)/3600000);
    const minutes=Math.floor((remaining%3600000)/60000);
    const seconds=Math.floor((remaining%60000)/1000);
    const pad=value=>String(value).padStart(2,"0");
    return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  function refreshSeasonDeadline(){
    const ms=seasonEndLocal().getTime()-Date.now();
    const label=ms<=0?"SEASON COMPLETE":formatCountdown(ms);
    document.querySelectorAll("[data-season-end-countdown]").forEach(node=>{
      if(node.textContent!==label)node.textContent=label;
      node.dataset.localSeasonDeadline="2026-10-01T00:00:00-local";
    });
  }

  const packFallbacks={
    "pack-set-raw-series-1":"RAW",
    "pack-set-smackdown-series-1":"SMACKDOWN",
    "pack-set-nxt-series-1":"NXT",
    "pack-set-evolution-series-1":"EVOLUTION",
    "pack-set-summerslam-series-1":"SUMMERSLAM",
    "pack-set-golden-era-series-1":"WWF",
    "pack-set-new-generation-series-1":"NEW GENERATION",
    "pack-set-attitude-era-series-1":"ATTITUDE ERA",
    "pack-set-ruthless-aggression-series-1":"RUTHLESS AGGRESSION"
  };

  function fallbackNameFor(pack){
    if(!pack)return "";
    for(const [className,label] of Object.entries(packFallbacks)){
      if(pack.classList.contains(className))return label;
    }
    return "WWE LEGACY";
  }

  function ensurePackBrand(pack){
    const lockup=pack?.querySelector?.(".pack-brand-lockup");
    if(!lockup)return;
    const image=lockup.querySelector("img.pack-set-logo");
    const imageUnavailable=!image||image.classList.contains("is-source-logo-unavailable")||image.style.display==="none";
    let fallback=lockup.querySelector(".pack-audited-brand-fallback");
    if(!imageUnavailable){
      fallback?.remove();
      return;
    }
    if(!fallback){
      fallback=document.createElement("span");
      fallback.className="pack-text-logo pack-audited-brand-fallback";
      fallback.setAttribute("aria-hidden","true");
      lockup.appendChild(fallback);
    }
    const label=fallbackNameFor(pack);
    fallback.innerHTML=`<b>${label}</b><small>SERIES 1</small>`;
  }

  function auditSeasonPacks(){
    document.querySelectorAll(".season-reward-pack .physical-booster-pack").forEach(ensurePackBrand);
  }

  let queued=false;
  function schedule(){
    if(queued)return;
    queued=true;
    queueMicrotask(()=>{
      queued=false;
      refreshSeasonDeadline();
      auditSeasonPacks();
    });
  }

  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{
    subtree:true,
    childList:true,
    characterData:true,
    attributes:true,
    attributeFilter:["class","style","src"]
  });
  document.addEventListener("load",event=>{
    if(event.target?.matches?.(".season-reward-pack img.pack-set-logo"))schedule();
  },true);

  // app.js refreshes its clocks once per second using the older deadline. Run
  // shortly after each tick so the visible value is always the new local date.
  setInterval(refreshSeasonDeadline,250);
  schedule();
})();
