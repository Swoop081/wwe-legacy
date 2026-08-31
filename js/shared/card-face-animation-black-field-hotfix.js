// WWE Legacy v1.1.52 — animated-card solid-black field + plaque/border cleanup.
(function(){
  "use strict";
  if(typeof document==="undefined")return;

  for(const id of ["wwe-v1151-animation-black-field-cleanup","wwe-v1152-animation-black-field-cleanup"]){
    document.getElementById(id)?.remove();
  }

  const style=document.createElement("style");
  style.id="wwe-v1152-animation-black-field-cleanup";
  style.textContent=`
    /* Animated cards use one uninterrupted solid-black field wherever the
       GIF/WebP does not fill the artwork bay. Set-colour frame borders, live
       Card Studio ink and the set logo remain untouched. */
    .ccg-card.has-active-animation .ccg-card-front,
    .ccg-card.has-active-animation .ccg-card-art,
    .ccg-card.has-active-animation .ccg-animated-set-background,
    .ccg-card.has-active-animation .ccg-animated-card-surface{
      background:#000!important;
      background-image:none!important;
    }

    /* Keep the authored set-colour frame above every animation/plaque layer so
       the lower frame can never be visually clipped by the plaque cleanup. */
    .ccg-card.has-active-animation .ccg-animation-clean-frame{
      z-index:8!important;
    }

    /* Mask only the old plaque overflow at the bottom. The v1.1.51 coloured
       separator line is intentionally removed so MOVE • STRIKE / move-type text
       flows directly into the clean black breathing gap above the lower frame. */
    .ccg-animation-plaque-bottom-cleanup{
      display:none;
      position:absolute!important;
      left:5.2%!important;
      right:5.2%!important;
      top:94.7%!important;
      bottom:3.8%!important;
      z-index:5!important;
      pointer-events:none!important;
      background:#000!important;
      border:0!important;
    }
    .ccg-card.has-active-animation .ccg-animation-plaque-bottom-cleanup{
      display:block!important;
    }

    .ccg-card.has-active-animation .ccg-card-studio-ink{
      z-index:6!important;
    }
    .ccg-card.has-active-animation .ccg-animated-set-logo{
      z-index:7!important;
    }
  `;
  document.head.appendChild(style);

  function ensurePlaqueCleanup(card){
    const face=card?.querySelector?.(".ccg-card-front");
    const plaque=face?.querySelector?.(".ccg-animation-approved-plaque");
    if(!face||!plaque)return;

    let mask=face.querySelector(".ccg-animation-plaque-bottom-cleanup");
    if(!mask){
      mask=document.createElement("span");
      mask.className="ccg-animation-plaque-bottom-cleanup";
      mask.setAttribute("aria-hidden","true");
      face.appendChild(mask);
    }

    mask.dataset.plaqueSignature=String(plaque.dataset.signature||"");
    mask.dataset.plaqueReady="1";
  }

  function sync(){
    document.querySelectorAll(".ccg-card.has-active-animation").forEach(ensurePlaqueCleanup);
  }

  let queued=false;
  const schedule=()=>{
    if(queued)return;
    queued=true;
    queueMicrotask(()=>{
      queued=false;
      sync();
    });
  };

  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{
    subtree:true,
    childList:true,
    attributes:true,
    attributeFilter:["class","data-signature"]
  });
  document.addEventListener("load",event=>{
    if(event.target?.matches?.(".ccg-animation-approved-plaque,.ccg-animated-card-plate"))schedule();
  },true);
  schedule();
})();
