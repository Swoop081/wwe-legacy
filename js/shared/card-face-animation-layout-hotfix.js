// WWE Legacy v1.1.50 animation composition hotfix — r5.
// Animated cards use no static artwork pixels at all. The animated state is:
// clean vector frame -> opaque blank set field -> centred animation -> approved
// Card Studio plaque -> approved dynamic text/stars -> set logo.
(function(){
  "use strict";
  if(typeof document==="undefined")return;

  for(const id of ["wwe-v1148-animation-layering-hotfix","wwe-v1150-animation-composition-r5"]){
    document.getElementById(id)?.remove();
  }

  const style=document.createElement("style");
  style.id="wwe-v1150-animation-composition-r5";
  style.textContent=`
    .ccg-card.has-active-animation .ccg-card-front{
      background:#070b12!important;
    }

    /* Absolutely no static/photo content may survive beneath an active animation. */
    .ccg-card.has-active-animation .ccg-card-art{
      background:transparent!important;
    }
    .ccg-card.has-active-animation .ccg-card-art:before,
    .ccg-card.has-active-animation .ccg-card-art:after,
    .ccg-card.has-active-animation .ccg-card-front:before,
    .ccg-card.has-active-animation .ccg-card-front:after{
      display:none!important;
    }
    .ccg-card.has-active-animation .ccg-card-art > *,
    .ccg-card.has-active-animation .ccg-layered-card-plate,
    .ccg-card.has-active-animation .ccg-finished-card-art-image,
    .ccg-card.has-active-animation .ccg-superstar-art-image,
    .ccg-card.has-active-animation .ccg-superstar-full-art,
    .ccg-card.has-active-animation .ccg-animation-static-segment{
      opacity:0!important;
      visibility:hidden!important;
      pointer-events:none!important;
    }

    /* Opaque blank Card Studio set field. This is what shows anywhere the
       animation itself does not fill the artwork bay. */
    .ccg-card.has-active-animation .ccg-animated-set-background{
      display:block!important;
      position:absolute!important;
      left:4.65%!important;
      right:4.65%!important;
      top:4.65%!important;
      bottom:22.75%!important;
      overflow:hidden!important;
      border-radius:0!important;
      z-index:2!important;
      opacity:1!important;
    }
    .ccg-card.type-move.has-active-animation .ccg-animated-set-background{
      bottom:25.95%!important;
    }

    /* GIF/WebP is centred only in the real artwork bay: below the inner top
       border and above the approved Card Studio plaque. */
    .ccg-card.has-active-animation .ccg-animated-card-surface{
      display:grid!important;
      place-items:center!important;
      position:absolute!important;
      left:4.8%!important;
      right:4.8%!important;
      top:4.8%!important;
      bottom:22.8%!important;
      overflow:hidden!important;
      background:transparent!important;
      border-radius:0!important;
      clip-path:none!important;
      -webkit-clip-path:none!important;
      z-index:3!important;
    }
    .ccg-card.type-move.has-active-animation .ccg-animated-card-surface{
      bottom:26%!important;
    }
    .ccg-card.has-active-animation .ccg-animated-card-plate{
      position:relative!important;
      inset:auto!important;
      width:100%!important;
      height:100%!important;
      max-width:100%!important;
      max-height:100%!important;
      object-fit:contain!important;
      object-position:center center!important;
      opacity:1!important;
      visibility:visible!important;
      border-radius:0!important;
      background:transparent!important;
    }

    /* Clean frame contains no photo pixels. */
    .ccg-animation-clean-frame{
      display:none;
      position:absolute!important;
      inset:0!important;
      width:100%!important;
      height:100%!important;
      pointer-events:none!important;
      z-index:5!important;
      overflow:visible!important;
    }
    .ccg-card.has-active-animation .ccg-animation-clean-frame{
      display:block!important;
    }

    /* Approved plaque comes from the same shared Card Studio drawPlaque()
       function used by the static face. */
    .ccg-animation-approved-plaque{
      display:none;
      position:absolute!important;
      inset:0!important;
      width:100%!important;
      height:100%!important;
      pointer-events:none!important;
      z-index:4!important;
      background:transparent!important;
    }
    .ccg-card.has-active-animation .ccg-animation-approved-plaque{
      display:block!important;
    }

    .ccg-card.has-active-animation .ccg-live-front-svg,
    .ccg-card.has-active-animation .ccg-live-superstar-rarity,
    .ccg-card.has-active-animation .ccg-superstar-nameplate{
      display:none!important;
    }

    /* Approved dynamic Card Studio ink sits over the approved plaque. */
    .ccg-card.has-active-animation .ccg-card-studio-ink{
      z-index:6!important;
      opacity:1!important;
      visibility:visible!important;
    }

    .ccg-card.has-active-animation .ccg-animated-set-logo{
      display:block!important;
      position:absolute!important;
      z-index:7!important;
      top:5.2%!important;
      right:7.5%!important;
      width:auto!important;
      max-width:25.5%!important;
      max-height:10.5%!important;
      object-fit:contain!important;
      object-position:right top!important;
      opacity:1!important;
      visibility:visible!important;
    }
  `;
  document.head.appendChild(style);

  const NS="http://www.w3.org/2000/svg";

  function cardPayload(card){
    const ink=card?.querySelector?.(".ccg-card-studio-ink");
    const raw=ink?.dataset?.cardStudioInk;
    if(!raw)return null;
    try{return JSON.parse(decodeURIComponent(raw));}
    catch{return null;}
  }

  function themeFor(data){
    return globalThis.WWELegacyCardFaceRenderer?.themeForSet?.(data?.setId)||{};
  }

  function ensureCleanFrame(card,data){
    const face=card.querySelector(".ccg-card-front");
    if(!face)return;
    let svg=face.querySelector(".ccg-animation-clean-frame");
    if(!svg){
      svg=document.createElementNS(NS,"svg");
      svg.setAttribute("viewBox","0 0 680 1000");
      svg.setAttribute("preserveAspectRatio","none");
      svg.setAttribute("aria-hidden","true");
      svg.classList.add("ccg-animation-clean-frame");
      face.appendChild(svg);
    }
    const theme=themeFor(data);
    const accent=theme.border||theme.accent||"#f0a04d";
    if(svg.dataset.accent===accent&&svg.childElementCount)return;
    svg.dataset.accent=accent;
    svg.replaceChildren();

    const rect=(x,y,w,h,rx,stroke,sw,opacity=1)=>{
      const r=document.createElementNS(NS,"rect");
      r.setAttribute("x",x);r.setAttribute("y",y);
      r.setAttribute("width",w);r.setAttribute("height",h);
      r.setAttribute("rx",rx);r.setAttribute("ry",rx);
      r.setAttribute("fill","none");
      r.setAttribute("stroke",stroke);
      r.setAttribute("stroke-width",sw);
      r.setAttribute("opacity",String(opacity));
      r.setAttribute("vector-effect","non-scaling-stroke");
      svg.appendChild(r);
    };

    // Card Studio-style layered frame, recreated without any source artwork.
    rect(14,12,652,976,42,accent,6.5,1);
    rect(24,22,632,956,36,"#17314f",3.2,.98);
    rect(31,29,618,942,31,accent,2.5,.90);
    rect(38,36,604,928,27,"#5c6473",1.8,.82);
  }

  function ensureApprovedPlaque(card,data){
    const face=card.querySelector(".ccg-card-front");
    const renderer=globalThis.WWELegacyCardFaceRenderer;
    if(!face||!renderer?.drawPlaque||!data)return;
    let canvas=face.querySelector(".ccg-animation-approved-plaque");
    if(!canvas){
      canvas=document.createElement("canvas");
      canvas.className="ccg-animation-approved-plaque";
      canvas.width=680;canvas.height=1000;
      canvas.setAttribute("aria-hidden","true");
      face.appendChild(canvas);
    }
    const theme=themeFor(data);
    const signature=JSON.stringify([data.kind,data.setId,theme?.border,theme?.accent]);
    if(canvas.dataset.signature===signature)return;
    canvas.dataset.signature=signature;
    const ctx=canvas.getContext("2d");
    if(!ctx)return;
    ctx.clearRect(0,0,680,1000);
    renderer.drawPlaque(ctx,data,{width:680,height:1000,theme});
  }

  function stripLegacyStaticSegments(card){
    card.querySelectorAll(".ccg-animation-static-segment").forEach(node=>node.remove());
  }

  function syncAnimatedCard(card){
    if(!card?.classList?.contains("has-active-animation"))return;
    stripLegacyStaticSegments(card);
    const data=cardPayload(card);
    ensureCleanFrame(card,data);
    ensureApprovedPlaque(card,data);
  }

  function syncAnimatedCards(){
    document.querySelectorAll(".ccg-card.has-active-animation").forEach(syncAnimatedCard);
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
    const logos=[...document.querySelectorAll(".ccg-card.set-summerslam-series-1.has-active-animation .ccg-animated-set-logo")];
    if(!logos.length)return;
    const embedded=await cardStudioLogo();
    if(!embedded)return;
    logos.forEach(img=>{
      if(img.dataset.cardStudioLogoApplied==="1"&&img.src===embedded)return;
      img.dataset.cardStudioLogoApplied="1";
      img.removeAttribute("loading");
      img.src=embedded;
      img.style.display="block";
    });
  };

  let queued=false;
  const schedule=()=>{
    if(queued)return;
    queued=true;
    queueMicrotask(()=>{
      queued=false;
      syncAnimatedCards();
      patchSummerSlamLogos();
    });
  };

  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{
    subtree:true,
    childList:true,
    attributes:true,
    attributeFilter:["class","src","data-card-studio-ink"]
  });
  document.addEventListener("load",event=>{
    if(event.target?.matches?.(".ccg-animated-card-plate,.ccg-animated-set-logo,.ccg-card-studio-ink"))schedule();
  },true);
  schedule();
})();
