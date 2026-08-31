// WWE Legacy v1.1.55 — tabled feedback batch.
// Keeps approved shared Card Studio faces intact; this file only adds interaction,
// safe presentation timing, exact Card Studio pack-logo reuse, and Season clock correction.
(function(){
  "use strict";
  if(typeof document==="undefined")return;

  const BUILD="1.1.55";
  const gameRoot=document.getElementById("game");
  if(!gameRoot)return;

  const CARD_STUDIO_SET_IDS=[
    "raw-series-1","smackdown-series-1","nxt-series-1","evolution-series-1",
    "summerslam-series-1","golden-era-series-1","new-generation-series-1",
    "attitude-era-series-1","ruthless-aggression-series-1"
  ];

  const escapeRegExp=value=>String(value).replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  let cardStudioLogoPromise=null;

  /* Reuse the exact embedded logo sources from Card Studio. This deliberately
     does not invent a Season-specific logo map. If a set is not embedded in the
     Studio source, the existing shared setLogoMarkup() output remains untouched. */
  function loadCardStudioSetLogos(){
    if(cardStudioLogoPromise)return cardStudioLogoPromise;
    cardStudioLogoPromise=(async()=>{
      const found=new Map();
      try{
        const url=new URL("./js/tools/card-art-studio.js",document.baseURI);
        url.searchParams.set("_logos",BUILD);
        const source=await fetch(url,{cache:"force-cache"}).then(response=>response.ok?response.text():"");
        if(!source)return found;
        for(const setId of CARD_STUDIO_SET_IDS){
          const safe=escapeRegExp(setId);
          const match=source.match(new RegExp(`["']${safe}["']\\s*:\\s*["']((?:data:image\\/(?:png|webp|jpeg|svg\\+xml);base64,|https?:\\/\\/|assets\\/images\\/)[^"']+)["']`));
          if(match?.[1])found.set(setId,match[1]);
        }
      }catch{}
      return found;
    })();
    return cardStudioLogoPromise;
  }

  async function applyCardStudioPackLogos(){
    if(!gameRoot.querySelector(".seasons-screen"))return;
    const packs=[...gameRoot.querySelectorAll(".season-reward-pack .physical-booster-pack")];
    if(!packs.length)return;
    const studioLogos=await loadCardStudioSetLogos();
    if(!gameRoot.querySelector(".seasons-screen"))return;

    for(const pack of packs){
      const cls=[...pack.classList].find(name=>name.startsWith("pack-set-"));
      const setId=cls?.slice("pack-set-".length)||"";
      const src=studioLogos.get(setId);
      if(!src)continue;
      let logo=pack.querySelector(".pack-set-logo");
      if(!logo){
        const lockup=pack.querySelector(".pack-brand-lockup");
        if(!lockup)continue;
        logo=document.createElement("img");
        logo.className="set-brand-logo pack-set-logo";
        logo.alt="Set logo";
        lockup.prepend(logo);
      }
      if(logo.dataset.v1155CardStudioSource===src)continue;
      logo.dataset.v1155CardStudioSource=src;
      logo.classList.remove("is-source-logo-unavailable","is-unavailable");
      logo.removeAttribute("style");
      logo.src=src;
      logo.style.display="block";
    }
  }

  function currentSeasonCountdown(){
    const end=new Date(2026,9,1,0,0,0,0);
    const ms=end.getTime()-Date.now();
    if(ms<=0)return "SEASON COMPLETE";
    const days=Math.floor(ms/86400000);
    const hours=Math.floor((ms%86400000)/3600000);
    const minutes=Math.floor((ms%3600000)/60000);
    const seconds=Math.floor((ms%60000)/1000);
    const pad=n=>String(n).padStart(2,"0");
    return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  let countdownNode=null;
  let countdownObserver=null;
  function syncSeasonCountdown(){
    const node=gameRoot.querySelector("[data-season-end-countdown]");
    if(!node){
      countdownObserver?.disconnect();
      countdownObserver=null;
      countdownNode=null;
      return;
    }
    const expected=currentSeasonCountdown();
    if(node.textContent!==expected)node.textContent=expected;
    node.dataset.localSeasonDeadline="2026-10-01T00:00:00-local";
    if(node===countdownNode)return;
    countdownObserver?.disconnect();
    countdownNode=node;
    countdownObserver=new MutationObserver(()=>{
      const text=currentSeasonCountdown();
      if(node.isConnected&&node.textContent!==text)node.textContent=text;
    });
    countdownObserver.observe(node,{childList:true,characterData:true,subtree:true});
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
    const marker=document.createComment("wwe-v1155-card-home");
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

  /* Season reward inspect. The DOM node moved here is the exact shared
     collectibleCardMarkup()/Card Studio face already rendered by app.js. */
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

  /* Human animated-card showcase. Delay only the UI click that would play the
     card; the engine is untouched. After four seconds the exact original button
     is clicked again with a one-shot bypass flag, so normal play-pile/effect/
     Control sequencing proceeds through app.js exactly as before. */
  let humanShowcaseActive=false;
  document.addEventListener("click",event=>{
    const button=event.target?.closest?.("[data-play-hand]");
    if(!button||button.disabled||!gameRoot.contains(button))return;
    if(button.dataset.v1155ShowcaseBypass==="1")return;
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
        button.dataset.v1155ShowcaseBypass="1";
        try{button.click();}finally{delete button.dataset.v1155ShowcaseBypass;}
      }
    });
  },true);

  /* CPU cards have already been resolved by the engine when their play-pile DOM
     appears. Show the approved animated face over the current match state for
     four seconds; the modal blocks interaction, then simply reveals the already
     correct resumed state underneath. */
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
      syncSeasonCountdown();
      if(gameRoot.querySelector(".seasons-screen"))applyCardStudioPackLogos();
      maybeShowCpuAnimatedCard();
    });
  }
  const observer=new MutationObserver(scheduleSync);
  observer.observe(gameRoot,{childList:true,subtree:true});

  window.addEventListener("pagehide",()=>{
    observer.disconnect();
    countdownObserver?.disconnect();
    if(frame)cancelAnimationFrame(frame);
  },{once:true});

  scheduleSync();
})();
