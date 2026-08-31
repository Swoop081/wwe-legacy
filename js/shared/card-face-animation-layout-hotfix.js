// WWE Legacy v1.1.48 animation composition hotfix — r4.
// Animated cards must never expose the saved static artwork. The saved base plate
// is used only for its authored border and original plaque; the artwork bay is an
// opaque set field with the animation centered inside it. Dynamic Card Studio ink
// remains above the plaque so Cost/Damage/name/requirements stay editable.
(function(){
  "use strict";
  if(typeof document==="undefined")return;

  const STYLE_ID="wwe-v1148-animation-layering-hotfix";
  document.getElementById(STYLE_ID)?.remove();
  const style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent=`
    /* Hide the complete static front while an animation is active. Its approved
       border/plaque are restored by clipped copies created below. */
    .ccg-card.has-active-animation .ccg-layered-card-plate{
      opacity:0!important;visibility:hidden!important;
    }
    .ccg-card.has-active-animation .ccg-card-art:after{display:none!important}

    /* Opaque blank set field. It intentionally overlaps a fraction beneath the
       restored frame/plaque so no static artwork or coloured seam can leak out. */
    .ccg-card.has-active-animation .ccg-animated-set-background{
      display:block!important;position:absolute!important;
      left:4.55%!important;right:4.55%!important;top:4.55%!important;bottom:22.65%!important;
      overflow:hidden!important;border-radius:0!important;z-index:2!important;
      opacity:1!important;
    }
    .ccg-card.type-move.has-active-animation .ccg-animated-set-background{bottom:25.75%!important}

    /* Animation bay: centered between the bottom of the top border and the top
       edge of the original Card Studio plaque. */
    .ccg-card.has-active-animation .ccg-animated-card-surface{
      display:grid!important;place-items:center!important;position:absolute!important;
      left:4.8%!important;right:4.8%!important;top:4.8%!important;bottom:22.8%!important;
      overflow:hidden!important;background:transparent!important;border-radius:0!important;
      clip-path:none!important;-webkit-clip-path:none!important;z-index:3!important;
    }
    .ccg-card.type-move.has-active-animation .ccg-animated-card-surface{bottom:26%!important}
    .ccg-card.has-active-animation .ccg-animated-card-plate{
      position:relative!important;inset:auto!important;width:100%!important;height:100%!important;
      max-width:100%!important;max-height:100%!important;object-fit:contain!important;
      object-position:center center!important;opacity:1!important;border-radius:0!important;
      background:transparent!important;
    }

    /* Exact pixels from the saved base plate, clipped so only the authored frame
       and original lower plaque survive. No artwork from the static card is shown. */
    .ccg-animation-static-segment{
      display:none;position:absolute!important;inset:0!important;width:100%!important;height:100%!important;
      max-width:none!important;max-height:none!important;object-fit:cover!important;object-position:center!important;
      pointer-events:none!important;margin:0!important;transform:none!important;z-index:4!important;
    }
    .ccg-card.has-active-animation .ccg-animation-static-segment{display:block!important}
    .ccg-animation-frame-top{clip-path:inset(0 0 95.25% 0);-webkit-clip-path:inset(0 0 95.25% 0)}
    .ccg-animation-frame-left{clip-path:inset(0 95.25% 0 0);-webkit-clip-path:inset(0 95.25% 0 0)}
    .ccg-animation-frame-right{clip-path:inset(0 0 0 95.25%);-webkit-clip-path:inset(0 0 0 95.25%)}
    .ccg-animation-plaque{clip-path:inset(76.85% 0 0 0);-webkit-clip-path:inset(76.85% 0 0 0)}
    .ccg-card.type-move .ccg-animation-plaque{clip-path:inset(73.7% 0 0 0);-webkit-clip-path:inset(73.7% 0 0 0)}

    /* Approved dynamic text/stars are the highest card-data layer. */
    .ccg-card.has-active-animation .ccg-card-studio-ink{z-index:6!important}
    .ccg-card.has-active-animation .ccg-animated-set-logo{
      display:block!important;z-index:7!important;top:5.2%!important;right:7.5%!important;
      width:auto!important;max-width:25.5%!important;max-height:10.5%!important;
      object-fit:contain!important;object-position:right top!important;
    }
  `;
  document.head.appendChild(style);

  function installStaticSegments(card){
    if(!card?.classList?.contains("has-active-animation"))return;
    const face=card.querySelector(".ccg-card-front");
    const plate=card.querySelector(".ccg-layered-card-plate");
    if(!face||!plate)return;
    const src=plate.currentSrc||plate.getAttribute("src")||"";
    if(!src)return;

    const existing=[...face.querySelectorAll(".ccg-animation-static-segment")];
    if(existing.length===4&&existing.every(img=>img.dataset.source===src))return;
    existing.forEach(node=>node.remove());

    for(const cls of ["ccg-animation-frame-top","ccg-animation-frame-left","ccg-animation-frame-right","ccg-animation-plaque"]){
      const copy=document.createElement("img");
      copy.className=`ccg-animation-static-segment ${cls}`;
      copy.alt="";copy.setAttribute("aria-hidden","true");copy.decoding="async";
      copy.dataset.source=src;copy.src=src;
      face.appendChild(copy);
    }
  }

  function syncAnimatedCards(){
    document.querySelectorAll(".ccg-card.has-active-animation").forEach(installStaticSegments);
  }

  let summerSlamLogoPromise=null;
  const cardStudioLogo=async()=>{
    if(summerSlamLogoPromise)return summerSlamLogoPromise;
    summerSlamLogoPromise=(async()=>{
      try{
        const url=new URL("./js/tools/card-art-studio.js",document.baseURI);
        url.searchParams.set("_logo",String(Date.now()));
        const source=await fetch(url,{cache:"no-store"}).then(r=>r.ok?r.text():"");
        const match=source.match(/"summerslam-series-1":"(data:image\/png;base64,[^"]+)"/);
        return match?.[1]||"";
      }catch{return "";}
    })();
    return summerSlamLogoPromise;
  };

  const patchSummerSlamLogos=async()=>{
    const logos=[...document.querySelectorAll(".ccg-card.set-summerslam-series-1 .ccg-animated-set-logo")];
    if(!logos.length)return;
    const embedded=await cardStudioLogo();
    if(!embedded)return;
    logos.forEach(img=>{
      if(img.dataset.cardStudioLogoApplied==="1"&&img.src===embedded)return;
      img.dataset.cardStudioLogoApplied="1";
      img.removeAttribute("loading");img.src=embedded;img.style.display="block";
    });
  };

  let queued=false;
  const schedule=()=>{
    if(queued)return;queued=true;
    queueMicrotask(()=>{queued=false;syncAnimatedCards();patchSummerSlamLogos();});
  };
  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["class","src"]});
  document.addEventListener("load",event=>{
    if(event.target?.matches?.(".ccg-layered-card-plate,.ccg-animated-card-plate,.ccg-animated-set-logo"))schedule();
  },true);
  schedule();
})();
