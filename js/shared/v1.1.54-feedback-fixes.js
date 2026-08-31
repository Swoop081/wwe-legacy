// WWE Legacy v1.1.54 — user-feedback correction pass.
(function(){
  "use strict";
  if(typeof document==="undefined")return;

  const BUILD="1.1.54";
  const game=document.getElementById("game");
  if(!game)return;

  const seasonRewards=new Map([
    [2,{id:"trish-stratus-stratusphere",name:"Stratusphere",type:"EXCLUSIVE MOVE"}],
    [3,{id:"trish-stratus-chick-kick",name:"Chick Kick",type:"SIGNATURE · TRADEMARK"}],
    [5,{id:"trish-stratus-air-canada",name:"Air Canada",type:"SIGNATURE · TRADEMARK"}],
    [7,{id:"trish-stratus-stratusfaction",name:"Stratusfaction",type:"FINISHER"}],
    [10,{id:"special-trish-stratus",name:"Stratusfaction Guaranteed",type:"ACTION"}],
    [11,{id:"trish-stratus-stratusphere",name:"Stratusphere",type:"EXCLUSIVE MOVE"}],
    [13,{id:"trish-stratus-chick-kick",name:"Chick Kick",type:"SIGNATURE · TRADEMARK"}],
    [15,{id:"trish-stratus-air-canada",name:"Air Canada",type:"SIGNATURE · TRADEMARK"}],
    [17,{id:"trish-stratus-stratusfaction",name:"Stratusfaction",type:"FINISHER"}],
    [21,{id:"trish-stratus-stratusphere",name:"Stratusphere",type:"EXCLUSIVE MOVE"}],
    [23,{id:"trish-stratus-chick-kick",name:"Chick Kick",type:"SIGNATURE · TRADEMARK"}],
    [25,{id:"trish-stratus-air-canada",name:"Air Canada",type:"SIGNATURE · TRADEMARK"}],
    [27,{id:"trish-stratus-stratusfaction",name:"Stratusfaction",type:"FINISHER"}],
    [31,{id:"trish-stratus-stratusphere",name:"Stratusphere",type:"EXCLUSIVE MOVE"}],
    [33,{id:"trish-stratus-chick-kick",name:"Chick Kick",type:"SIGNATURE · TRADEMARK"}],
    [35,{id:"trish-stratus-air-canada",name:"Air Canada",type:"SIGNATURE · TRADEMARK"}],
    [37,{id:"trish-stratus-stratusfaction",name:"Stratusfaction",type:"FINISHER"}],
    [41,{id:"trish-stratus-stratusphere",name:"Stratusphere",type:"EXCLUSIVE MOVE"}],
    [43,{id:"trish-stratus-chick-kick",name:"Chick Kick",type:"SIGNATURE · TRADEMARK"}],
    [45,{id:"trish-stratus-air-canada",name:"Air Canada",type:"SIGNATURE · TRADEMARK"}],
    [47,{id:"trish-stratus-stratusfaction",name:"Stratusfaction",type:"FINISHER"}],
    [48,{id:"entrance-trish-stratus",name:"Time to Rock & Roll",type:"ENTRANCE"}],
    [50,{id:"superstar-trish-stratus",name:"Trish Stratus",type:"SUPERSTAR"}]
  ]);

  const packIdentity={
    "raw-series-1":{label:"RAW",logo:"https://upload.wikimedia.org/wikipedia/commons/8/86/WWE_RAW_Logo_2025.svg"},
    "smackdown-series-1":{label:"SMACKDOWN",logo:`./assets/images/branding-smackdown-series-1-smackdown-logo-official.png?v=${BUILD}`},
    "nxt-series-1":{label:"NXT",logo:"https://corporate.wwe.com/f/inline-images/NXT-logo.png"},
    "evolution-series-1":{label:"EVOLUTION",logo:`./assets/images/art-evolution-series-1-evolution-logo.png?v=${BUILD}`},
    "summerslam-series-1":{label:"SUMMERSLAM",logo:`./assets/images/art-summerslam-series-1-summerslam-2026-logo.png?v=${BUILD}`},
    "golden-era-series-1":{label:"GOLDEN ERA",logo:`./assets/images/set-logos/golden-era-set-logo.png?v=${BUILD}`},
    "new-generation-series-1":{label:"NEW GENERATION",logo:`./assets/images/branding-new-generation-series-1-new-generation-logo.png?v=${BUILD}`},
    "attitude-era-series-1":{label:"ATTITUDE ERA",logo:`./assets/images/branding-attitude-era-series-1-wwf-scratch-logo-card.png?v=${BUILD}`},
    "ruthless-aggression-series-1":{label:"RUTHLESS AGGRESSION",logo:"https://images.hobbydb.com/processed_uploads/subject_photo/subject_photo/image/39850/1526513686-11744-2621/WWE_20Ruthless_20Aggression_20logo_large.png"}
  };

  const tierFromNode=node=>{
    const m=String(node?.id||"").match(/^season-tier-(\d+)$/);
    return m?Number(m[1]):0;
  };

  let cardModulePromise=null;
  function loadCardModule(){
    if(!cardModulePromise){
      cardModulePromise=import(`../data/content.js?v=${BUILD}`).catch(()=>null);
    }
    return cardModulePromise;
  }

  function findById(value,id,seen=new Set(),depth=0){
    if(!value||depth>5)return null;
    if((typeof value!=="object"&&typeof value!=="function")||seen.has(value))return null;
    if(value?.id===id)return value;
    seen.add(value);
    const values=Array.isArray(value)?value:Object.values(value);
    for(const child of values){
      if(!child||(typeof child!=="object"&&typeof child!=="function"))continue;
      const hit=findById(child,id,seen,depth+1);
      if(hit)return hit;
    }
    return null;
  }

  function firstFinite(...values){
    for(const value of values){
      const n=Number(value);
      if(Number.isFinite(n))return n;
    }
    return null;
  }

  function buildMeta(card,fallback){
    if(card?.kind==="move"){
      const moveType=String(card.moveType||card.method||"MOVE").toUpperCase();
      return `MOVE • ${moveType}`;
    }
    if(card?.kind==="entrance")return "ENTRANCE";
    if(card?.kind==="superstar")return "SUPERSTAR";
    if(card?.kind==="action"||card?.kind==="special")return "ACTION";
    return fallback.type;
  }

  function buildStats(card){
    if(!card)return "";
    const pieces=[];
    const cost=firstFinite(card.cost,card.adrenalineCost,card.playCost);
    const damage=firstFinite(card.damage,card.baseDamage);
    if(cost!==null)pieces.push(`COST ${cost}`);
    if(damage!==null)pieces.push(`DMG ${damage}`);
    if(card?.requirements&&typeof card.requirements==="object"){
      const req=Object.entries(card.requirements)
        .filter(([,amount])=>Number(amount)>0)
        .map(([method,amount])=>`${String(method).slice(0,3).toUpperCase()} ${Number(amount)}`)
        .join(" · ");
      if(req)pieces.push(req);
    }
    return pieces.join(" · ");
  }

  async function decorateTrishRewards(){
    if(document.body?.dataset?.screen!=="seasons")return;
    const nodes=Array.from(game.querySelectorAll(".season-road-node"));
    const targets=nodes.filter(node=>seasonRewards.has(tierFromNode(node)));
    if(!targets.length)return;

    const module=await loadCardModule();
    for(const node of targets){
      const tier=tierFromNode(node),fallback=seasonRewards.get(tier);
      const visual=node.querySelector(".season-road-reward-visual");
      if(!visual||visual.querySelector(".season-reward-card-v1154-overlay"))continue;
      const image=visual.querySelector(".season-reward-static-card");
      if(!image)continue;

      const card=module?findById(module,fallback.id):null;
      const title=String(card?.name||fallback.name||"").trim();
      const meta=buildMeta(card,fallback);
      const stats=buildStats(card);

      const overlay=document.createElement("span");
      overlay.className="season-reward-card-v1154-overlay";

      const titleEl=document.createElement("strong");
      titleEl.className="season-reward-card-v1154-title";
      titleEl.textContent=title;
      overlay.appendChild(titleEl);

      const metaEl=document.createElement("span");
      metaEl.className="season-reward-card-v1154-meta";
      const typeEl=document.createElement("span");
      typeEl.textContent=meta;
      metaEl.appendChild(typeEl);
      if(stats){
        const statsEl=document.createElement("span");
        statsEl.className="season-reward-card-v1154-stats";
        statsEl.textContent=stats;
        metaEl.appendChild(statsEl);
      }
      overlay.appendChild(metaEl);
      visual.appendChild(overlay);
      visual.dataset.v1154Overlay="1";
    }
  }

  function setIdFromPack(pack){
    const direct=pack?.closest?.("[data-season-pack-set]")?.dataset?.seasonPackSet;
    if(direct)return direct;
    const className=Array.from(pack?.classList||[]).find(name=>name.startsWith("pack-set-"));
    return className?className.slice(9):"";
  }

  function ensureFallback(pack,identity){
    let fallback=pack.querySelector(".season-pack-logo-fallback,.pack-v1154-brand-fallback");
    if(!fallback){
      fallback=document.createElement("span");
      fallback.className="pack-v1154-brand-fallback";
      const inner=pack.querySelector(".season-pack-lightweight-inner,.pack-brand-lockup")||pack;
      inner.appendChild(fallback);
    }
    fallback.textContent=identity.label;
    return fallback;
  }

  function auditSeasonPackLogos(){
    if(document.body?.dataset?.screen!=="seasons")return;
    const packs=game.querySelectorAll(".season-pack-lightweight,.physical-booster-pack");
    packs.forEach(pack=>{
      const setId=setIdFromPack(pack);
      const identity=packIdentity[setId];
      if(!identity)return;

      let logo=pack.querySelector(".season-pack-set-logo,.pack-set-logo,.set-brand-logo");
      if(!logo&&identity.logo){
        logo=document.createElement("img");
        logo.className=pack.classList.contains("season-pack-lightweight")?"season-pack-set-logo":"pack-set-logo set-brand-logo";
        logo.alt=`${identity.label} logo`;
        logo.loading="lazy";
        logo.decoding="async";
        logo.referrerPolicy="no-referrer";
        const inner=pack.querySelector(".season-pack-lightweight-inner,.pack-brand-lockup")||pack;
        inner.prepend(logo);
      }
      if(logo&&identity.logo&&logo.dataset.v1154Source!==identity.logo){
        logo.dataset.v1154Source=identity.logo;
        logo.classList.remove("is-unavailable","is-source-logo-unavailable");
        logo.style.removeProperty("display");
        logo.src=identity.logo;
        logo.onerror=()=>{
          logo.classList.add("is-unavailable");
          const fallback=ensureFallback(pack,identity);
          fallback.style.removeProperty("display");
        };
        logo.onload=()=>{
          logo.classList.remove("is-unavailable","is-source-logo-unavailable");
          const fallback=pack.querySelector(".season-pack-logo-fallback,.pack-v1154-brand-fallback");
          if(fallback)fallback.style.display="none";
        };
      }
      const fallback=ensureFallback(pack,identity);
      if(logo&&logo.complete&&logo.naturalWidth>0){
        fallback.style.display="none";
      }else if(!logo||logo.classList.contains("is-unavailable")||logo.classList.contains("is-source-logo-unavailable")){
        fallback.style.removeProperty("display");
      }
      pack.dataset.v1154PackBrand="1";
    });
  }

  let frame=0;
  function schedule(){
    if(frame)return;
    frame=requestAnimationFrame(()=>{
      frame=0;
      auditSeasonPackLogos();
      decorateTrishRewards();
    });
  }

  const observer=new MutationObserver(schedule);
  observer.observe(game,{childList:true,subtree:true});
  document.addEventListener("click",schedule,true);
  window.addEventListener("pagehide",()=>{
    observer.disconnect();
    if(frame)cancelAnimationFrame(frame);
  },{once:true});
  schedule();
})();
