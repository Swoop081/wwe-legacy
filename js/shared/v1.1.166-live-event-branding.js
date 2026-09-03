// v1.1.176 — branded rotating Live Events with official WWE.com Superstar profile photography.
const EVENTS = Object.freeze({
  "daily-raw": { title:["DAILY","RAW"], hero:"Logan Paul", src:"https://www.wwe.com/f/styles/talent_champion_lg/public/all/2022/07/Logan_Paul_PROFILE--479a7c8503950ea02f1b6f2819b79f81.png" },
  "daily-smackdown": { title:["DAILY","SMACKDOWN"], hero:"Chelsea Green", src:"https://www.wwe.com/f/styles/talent_champion_lg/public/2026/08/Chelsea_08022026MM_28291_PROFILE.png" },
  "daily-nxt": { title:["DAILY","NXT"], hero:"Kelani Jordan", src:"https://www.wwe.com/f/styles/talent_champion_lg/public/2026/05/Kelani_Jordan_PROFILE.png" },
  "womens-evolution": { title:["WOMEN’S","EVOLUTION"], hero:"Becky Lynch", src:"https://www.wwe.com/f/styles/talent_champion_lg/public/2026/07/BeckyLynch_05232026_CN_00288_PROFILE.png" },
  "ruthless-aggression": { title:["RUTHLESS","AGGRESSION"], hero:"Randy Orton", src:"https://www.wwe.com/f/styles/talent_champion_lg/public/all/2024/03/Randy_Orton_11272023rf_071_Profile--9f48e983c9e721c0a5659fc639f1c14a.png" },
  "golden-era": { title:["GOLDEN","ERA"], hero:"Ultimate Warrior", src:"https://www.wwe.com/f/styles/talent_champion_lg/public/rd-talent/Profile/Ultimate_Warrior_pro.png" },
  "attitude-era": { title:["ATTITUDE","ERA"], hero:"The Rock", src:"https://www.wwe.com/f/styles/talent_champion_lg/public/all/2024/03/The_Rock_PROFILE--927b15797eefad54a3bca4d2a15e4921.png" },
  "new-generation": { title:["NEW","GENERATION"], hero:"Shawn Michaels", src:"https://www.wwe.com/f/styles/talent_champion_lg/public/all/2025/07/HBK_Profile--95e0878a2f324c6fec5668b9cbcaab2d.png" },
  "submission-specialists": { title:["SUBMISSION","SPECIALISTS"], hero:"Kurt Angle", src:"https://www.wwe.com/f/styles/talent_champion_lg/public/all/2019/04/Kurt_Angle_Pro--fbea630c97a81dc7c4d0a9717a90cb0e.png" },
  "high-flyers": { title:["HIGH","FLYERS"], hero:"Rob Van Dam", src:"https://www.wwe.com/f/styles/talent_champion_lg/public/rd-talent/Profile/Rob_Van_Dam_pro.png" },
  "power-houses": { title:["POWER","HOUSES"], hero:"Brock Lesnar", src:"https://www.wwe.com/f/styles/talent_champion_lg/public/2025/09/brock_lesnar_Profile.png" },
  "monster-mayhem": { title:["MONSTER","MAYHEM"], hero:"Kane", src:"https://www.wwe.com/f/styles/talent_champion_lg/public/all/2020/01/Kane_Pro--97fd51c6219810ef02070c332958e10a.png" }
});

function eventIdFor(card){
  const key=String(card?.dataset?.openLiveTower||"");
  return key.split(":").pop()||"";
}
function forceBrandColours(card,id){
  const cta=card.querySelector(".live-tower-enter");
  if(id==="daily-smackdown"&&cta){
    cta.style.setProperty("background","#82ddff","important");
    cta.style.setProperty("border-color","#a8e8ff","important");
    cta.style.setProperty("color","#fff","important");
    cta.querySelector("i")?.style.setProperty("color","#fff","important");
  }
  if(id==="daily-nxt"){
    const accent=card.querySelector(".live-event-split-title b");
    accent?.style.setProperty("color","#555b63","important");
    accent?.style.setProperty("text-shadow","none","important");
    if(cta){
      cta.style.setProperty("background","#555b63","important");
      cta.style.setProperty("border-color","#747b84","important");
      cta.style.setProperty("color","#fff","important");
      cta.querySelector("i")?.style.setProperty("color","#fff","important");
    }
  }
}
function brandCard(card){
  if(!(card instanceof HTMLElement))return;
  const id=eventIdFor(card),cfg=EVENTS[id];
  if(!cfg)return;
  card.dataset.liveBrand=id;
  const title=card.querySelector(".live-event-split-title");
  if(title){
    title.classList.remove("title-raw");
    title.innerHTML=`<span>${cfg.title[0]}</span><b>${cfg.title[1]}</b>`;
  }
  let hero=card.querySelector(":scope > .v1166-live-event-hero");
  if(!hero){
    hero=document.createElement("img");
    hero.className="v1166-live-event-hero";
    hero.loading="eager";
    hero.decoding="async";
    hero.referrerPolicy="no-referrer-when-downgrade";
    card.appendChild(hero);
  }
  hero.src=cfg.src;
  hero.alt=cfg.hero;
  forceBrandColours(card,id);
}
function apply(root=document){
  if(root.matches?.("[data-open-live-tower]"))brandCard(root);
  root.querySelectorAll?.("[data-open-live-tower]").forEach(brandCard);
}
function start(){
  apply(document);
  new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1)apply(node);}).observe(document.documentElement,{childList:true,subtree:true});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
