// WWE Legacy v1.1.56 — consolidated tabled-fix runtime.
// One lightweight DOM observer serves Season visual repair and animated-card
// presentation. Season timing itself is now corrected at module level via the
// import-map wrapper; there is no Season countdown timer/observer in this file.
(function(){
  "use strict";
  if(typeof document==="undefined")return;

  const BUILD="1.1.56";
  const gameRoot=document.getElementById("game");
  if(!gameRoot)return;

  const SEASON_CARD_ART_BY_TIER=new Map([
    [2,"stratusphere-trish-stratus-base-plate.webp"],
    [3,"chick-kick-trish-stratus-base-plate.webp"],
    [5,"air-canada-trish-stratus-base-plate.webp"],
    [7,"stratusfaction-trish-stratus-base-plate.webp"],
    [10,"stratusfaction-guaranteed-action-trish-stratus-base-plate.webp"],
    [11,"stratusphere-trish-stratus-base-plate.webp"],
    [13,"chick-kick-trish-stratus-base-plate.webp"],
    [15,"air-canada-trish-stratus-base-plate.webp"],
    [17,"stratusfaction-trish-stratus-base-plate.webp"],
    [21,"stratusphere-trish-stratus-base-plate.webp"],
    [23,"chick-kick-trish-stratus-base-plate.webp"],
    [25,"air-canada-trish-stratus-base-plate.webp"],
    [27,"stratusfaction-trish-stratus-base-plate.webp"],
    [31,"stratusphere-trish-stratus-base-plate.webp"],
    [33,"chick-kick-trish-stratus-base-plate.webp"],
    [35,"air-canada-trish-stratus-base-plate.webp"],
    [37,"stratusfaction-trish-stratus-base-plate.webp"],
    [41,"stratusphere-trish-stratus-base-plate.webp"],
    [43,"chick-kick-trish-stratus-base-plate.webp"],
    [45,"air-canada-trish-stratus-base-plate.webp"],
    [47,"stratusfaction-trish-stratus-base-plate.webp"],
    [48,"time-to-rock-roll-trish-stratus-base-plate.webp"],
    [50,"trish-stratus-superstar-base-plate.webp"]
  ]);

  const PACK_IDENTITY={
    "raw-series-1":{label:"RAW",repairLogo:"https://upload.wikimedia.org/wikipedia/commons/8/86/WWE_RAW_Logo_2025.svg"},
    "smackdown-series-1":{label:"SMACKDOWN"},
    "nxt-series-1":{label:"NXT"},
    "evolution-series-1":{label:"EVOLUTION"},
    "summerslam-series-1":{label:"SUMMERSLAM"},
    "golden-era-series-1":{label:"GOLDEN ERA"},
    "new-generation-series-1":{label:"NEW GENERATION"},
    "attitude-era-series-1":{label:"ATTITUDE ERA"},
    "ruthless-aggression-series-1":{label:"RUTHLESS AGGRESSION"}
  };

  function tierFromNode(node){
    const match=String(node?.id||"").match(/^season-tier-(\d+)$/);
    return match?Number(match[1]):0;
  }

  function canonicalSeasonArt(filename){
    const url=new URL(`./assets/images/${filename}`,document.baseURI);
    url.searchParams.set("v",BUILD);
    return url.toString();
  }

  function markSeasonCardArtReady(img){
    if(!img)return;
    img.classList.add("is-art-ready");
    img.style.removeProperty("display");
    const card=img.closest(".ccg-card");
    if(!card)return;
    card.classList.remove("uses-rules-fallback","force-rules-face","static-finished-fallback");
    if(img.classList.contains("ccg-layered-card-plate")){
      card.classList.add("is-layered-front","has-layered-asset");
    }
  }

  function repairSeasonRewardCards(){
    if(document.body?.dataset?.screen!=="seasons")return;
    for(const node of gameRoot.querySelectorAll(".season-road-node")){
      const filename=SEASON_CARD_ART_BY_TIER.get(tierFromNode(node));
      if(!filename)continue;
      const visual=node.querySelector(".season-reward-card");
      const img=visual?.querySelector(".ccg-card-art img.ccg-load-guard");
      if(!img)continue;

      img.loading="eager";
      img.decoding="async";
      if(img.dataset.v1156SeasonArtBound!=="1"){
        img.dataset.v1156SeasonArtBound="1";
        img.addEventListener("load",()=>markSeasonCardArtReady(img));
      }

      const canonical=canonicalSeasonArt(filename);
      if(img.dataset.v1156SeasonCanonical!==canonical){
        img.dataset.v1156SeasonCanonical=canonical;
        if(img.src!==canonical)img.src=canonical;
      }
      if(img.complete&&img.naturalWidth>0)markSeasonCardArtReady(img);
    }
  }

  function setIdFromPack(pack){
    const className=[...pack.classList].find(name=>name.startsWith("pack-set-"));
    return className?className.slice("pack-set-".length):"";
  }

  function ensureSeasonPackBrand(pack){
    const setId=setIdFromPack(pack);
    const identity=PACK_IDENTITY[setId];
    if(!identity)return;
    const lockup=pack.querySelector(".pack-brand-lockup");
    if(!lockup)return;

    let fallback=lockup.querySelector(".pack-v1156-brand-fallback");
    if(!fallback){
      fallback=document.createElement("span");
      fallback.className="pack-v1156-brand-fallback";
      lockup.appendChild(fallback);
    }
    if(fallback.textContent!==identity.label)fallback.textContent=identity.label;

    let logo=lockup.querySelector("img.pack-set-logo,img.set-brand-logo");
    if(!logo&&identity.repairLogo){
      logo=document.createElement("img");
      logo.className="set-brand-logo pack-set-logo";
      logo.alt=`${identity.label} logo`;
      lockup.prepend(logo);
    }

    if(!logo){
      pack.classList.remove("is-v1156-logo-live");
      pack.dataset.v1156BrandReady="fallback";
      return;
    }

    if(logo.dataset.v1156BrandBound!=="1"){
      logo.dataset.v1156BrandBound="1";
      logo.addEventListener("load",()=>{
        logo.classList.remove("is-source-logo-unavailable","is-unavailable");
        logo.style.removeProperty("display");
        pack.classList.add("is-v1156-logo-live");
        pack.dataset.v1156BrandReady="logo";
      });
      logo.addEventListener("error",()=>{
        logo.classList.add("is-unavailable");
        pack.classList.remove("is-v1156-logo-live");
        pack.dataset.v1156BrandReady="fallback";
      });
    }

    const sourceUnavailable=logo.classList.contains("is-source-logo-unavailable")||logo.classList.contains("is-unavailable");
    if(setId==="raw-series-1"&&identity.repairLogo&&sourceUnavailable&&logo.dataset.v1156RawRepair!=="1"){
      logo.dataset.v1156RawRepair="1";
      logo.classList.remove("is-source-logo-unavailable","is-unavailable");
      logo.style.removeProperty("display");
      logo.src=identity.repairLogo;
    }

    if(logo.complete&&logo.naturalWidth>0&&!sourceUnavailable){
      pack.classList.add("is-v1156-logo-live");
      pack.dataset.v1156BrandReady="logo";
    }else{
      pack.classList.remove("is-v1156-logo-live");
      pack.dataset.v1156BrandReady="fallback";
    }
  }

  function repairSeasonPackBrands(){
    if(document.body?.dataset?.screen!=="seasons")return;
    gameRoot.querySelectorAll(".season-reward-pack .physical-booster-pack").forEach(ensureSeasonPackBrand);
  }

  function repairSeasonSurface(){
    if(document.body?.dataset?.screen!=="seasons")return;
    repairSeasonRewardCards();
    repairSeasonPackBrands();
  }

  function restartAnimatedSurface(card){
    const image=card?.querySelector?.(".ccg-animated-card-plate");
    if(!image)return;
    const src=image.getAttribute("src")||image.src;
    if(!src)return;
    image.removeAttribute("src");
    requestAnimationFrame(()=>{
      if(image.isConnected)image.setAttribute("src",src);
    });
  }

  function moveCardIntoOverlay(card,{className,caption="",duration=0,onDone=null,closeOnBackdrop=false}={}){
    if(!card?.isConnected)return null;
    const parent=card.parentNode;
    if(!parent)return null;
    const marker=document.createComment("wwe-v1156-card-home");
    parent.insertBefore(marker,card);

    const overlay=document.createElement("div");
    overlay.className=`superstar-card-modal ${className||""}`.trim();
    const inner=document.createElement("div");
    inner.className="superstar-card-modal-inner";
    overlay.appendChild(inner);
    inner.appendChild(card);
    if(caption){
      const small=document.createElement("small");
      small.textContent=caption;
      inner.appendChild(small);
    }
    document.body.appendChild(overlay);
    restartAnimatedSurface(card);

    let closed=false;
    let timer=0;
    const close=()=>{
      if(closed)return;
      closed=true;
      if(timer)clearTimeout(timer);
      if(marker.parentNode){
        marker.parentNode.insertBefore(card,marker);
        marker.remove();
      }
      overlay.remove();
      onDone?.();
    };
    if(closeOnBackdrop){
      overlay.addEventListener("click",event=>{
        if(event.target===overlay)close();
      });
    }
    if(duration>0)timer=setTimeout(close,duration);
    return {overlay,close};
  }

  // Season reward inspection moves the already-rendered shared Card Studio card
  // into the modal; it never draws a replacement Season-specific face.
  document.addEventListener("click",event=>{
    if(event.target?.closest?.(".season-card-inspect-v1155"))return;
    const card=event.target?.closest?.(".season-reward-card .ccg-card");
    if(!card||!gameRoot.contains(card))return;
    event.preventDefault();
    event.stopPropagation();
    moveCardIntoOverlay(card,{
      className:"season-card-inspect-v1155",
      caption:"Tap outside to close",
      closeOnBackdrop:true
    });
  },true);

  // Human animated cards get the approved four-second showcase, then the exact
  // original play button is invoked so normal engine/control sequencing resumes.
  let humanShowcaseActive=false;
  document.addEventListener("click",event=>{
    const button=event.target?.closest?.("[data-play-hand]");
    if(!button||button.disabled||!gameRoot.contains(button))return;
    if(button.dataset.v1156ShowcaseBypass==="1")return;
    if(humanShowcaseActive)return;
    const slot=button.closest(".hand-card-slot");
    const card=slot?.querySelector(".ccg-card.has-active-animation");
    if(!card)return;

    event.preventDefault();
    event.stopImmediatePropagation();
    humanShowcaseActive=true;
    moveCardIntoOverlay(card,{
      className:"animated-card-showcase-v1155",
      duration:4000,
      onDone:()=>{
        humanShowcaseActive=false;
        if(!button.isConnected)return;
        button.dataset.v1156ShowcaseBypass="1";
        try{button.click();}finally{delete button.dataset.v1156ShowcaseBypass;}
      }
    });
  },true);

  // CPU cards are already resolved by the engine. Present the latest animated
  // face over the resolved match state for four seconds, then reveal that state.
  let cpuShowcaseActive=false;
  let lastCpuShowcaseKey="";
  function maybeShowCpuAnimatedCard(){
    if(humanShowcaseActive||cpuShowcaseActive)return;
    const latest=gameRoot.querySelector(".play-pile-item.is-latest.from-cpu");
    const trigger=latest?.querySelector("[data-open-play-pile-index]");
    const card=trigger?.querySelector(".ccg-card.has-active-animation");
    if(!card)return;
    const key=`${trigger.dataset.openPlayPileIndex||""}:${trigger.getAttribute("aria-label")||""}:${gameRoot.querySelectorAll(".play-pile-item").length}`;
    if(key===lastCpuShowcaseKey)return;
    lastCpuShowcaseKey=key;
    cpuShowcaseActive=true;
    moveCardIntoOverlay(card,{
      className:"animated-card-showcase-v1155",
      duration:4000,
      onDone:()=>{cpuShowcaseActive=false;}
    });
  }

  let frame=0;
  function scheduleSync(){
    if(frame)return;
    frame=requestAnimationFrame(()=>{
      frame=0;
      repairSeasonSurface();
      maybeShowCpuAnimatedCard();
    });
  }

  const observer=new MutationObserver(scheduleSync);
  observer.observe(gameRoot,{childList:true,subtree:true});
  document.addEventListener("click",scheduleSync,true);

  window.addEventListener("pagehide",()=>{
    observer.disconnect();
    if(frame)cancelAnimationFrame(frame);
  },{once:true,passive:true});

  scheduleSync();
})();
