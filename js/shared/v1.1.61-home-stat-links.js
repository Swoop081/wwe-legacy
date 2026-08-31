// WWE Legacy v1.1.61 — Home stage stat shortcuts.
(function(){
  "use strict";
  const routes=["deck-builder","collection","seasons"];

  function activateStat(stat){
    const group=stat?.parentElement;
    if(!group?.classList.contains("legacy-stage-stats"))return false;
    const stats=[...group.children];
    const index=stats.indexOf(stat);
    const route=routes[index];
    if(!route)return false;
    const nav=document.querySelector(`[data-mobile-nav="${route}"]`);
    if(!nav)return false;
    nav.click();
    return true;
  }

  document.addEventListener("click",event=>{
    const stat=event.target?.closest?.(".legacy-stage-stats > span");
    if(!stat)return;
    event.preventDefault();
    activateStat(stat);
  },true);

  document.addEventListener("keydown",event=>{
    if(event.key!=="Enter"&&event.key!==" ")return;
    const stat=event.target?.closest?.(".legacy-stage-stats > span");
    if(!stat)return;
    event.preventDefault();
    activateStat(stat);
  },true);

  function decorate(){
    document.querySelectorAll(".legacy-stage-stats > span").forEach((stat,index)=>{
      if(!routes[index])return;
      stat.setAttribute("role","button");
      stat.setAttribute("tabindex","0");
      stat.style.cursor="pointer";
      stat.style.touchAction="manipulation";
      stat.setAttribute("aria-label",index===0?"Open Deck Lab":index===1?"Open Collection":"Open Season");
    });
  }

  const game=document.getElementById("game");
  if(game){
    decorate();
    new MutationObserver(decorate).observe(game,{childList:true,subtree:true});
  }
})();
