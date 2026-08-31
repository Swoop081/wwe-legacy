// WWE Legacy v1.1.62 — Home / My Legacy portrait only.
// Keep the existing command-tile geometry and image CSS untouched; only replace
// the portrait source with WWE.com's John Cena Superstar profile artwork.
(function(){
  "use strict";
  if(typeof document==="undefined")return;

  const CENA_WWE_PHOTO="https://www.wwe.com/f/styles/talent_champion_lg/public/rd-talent/Profile/John_Cena_pro.png";
  const root=document.getElementById("game");
  if(!root)return;

  function applyCenaPortrait(){
    const image=root.querySelector("#menu-profile .legacy-command-photo img");
    if(!image||image.dataset.homeLegacyCena==="1")return;
    image.dataset.homeLegacyCena="1";
    image.alt="John Cena";
    image.src=CENA_WWE_PHOTO;
  }

  applyCenaPortrait();
  const observer=new MutationObserver(applyCenaPortrait);
  observer.observe(root,{childList:true,subtree:true});
  window.addEventListener("pagehide",()=>observer.disconnect(),{once:true,passive:true});
})();
