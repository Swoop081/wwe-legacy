import { rollStarterDraft, createStarterDraftProfile } from "../data/starter-draft.js?v=1.1.210";
import { loadProfile, saveProfile } from "../data/profile.js?v=1.1.132";
import { superstars } from "../data/superstars.js?v=1.1.132";
import { collectionCards } from "../data/collection.js?v=1.1.132";
import { layeredCardArtFor } from "../data/artwork.js?v=1.1.132";

let route=null,step=0,selections=[],finishing=false;
const placeholder="./assets/images/card-temp-superstar-placeholder.svg";
function completedDraft(){const p=loadProfile();return !!(p?.starterDraft?.complete&&p?.onboarding?.complete);}
function ensureRoute(){if(!route){route=rollStarterDraft();step=0;selections=[];}return route;}
function star(id){return superstars[id]??Object.values(superstars).find(s=>s.id===id)??null;}
function superstarCard(id){return collectionCards.find(c=>c.id===`superstar-${id}`)??null;}
function cardArt(id){const card=superstarCard(id);return layeredCardArtFor(card??{id:`superstar-${id}`,kind:"superstar",superstarId:id})??placeholder;}
function choice(id){const s=star(id);return `<button type="button" class="starter-draft-choice" data-starter-draft-choice="${id}"><span class="starter-draft-photo starter-draft-superstar-card"><canvas width="680" height="1000" data-starter-card="${id}" role="img" aria-label="${s?.name??id} Superstar card"></canvas></span><strong>${s?.name??id}</strong><small>${s?.nickname??"CHOOSE SUPERSTAR"}</small></button>`;}
function paintCard(canvas,id){
  const card=superstarCard(id),renderer=globalThis.WWELegacyCardFaceRenderer;if(!canvas||!card||!renderer)return;
  const ctx=canvas.getContext("2d"),img=new Image();img.onload=()=>{ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);renderer.drawFace(ctx,card,{width:canvas.width,height:canvas.height,theme:renderer.themeForSet(card.setId)});};img.onerror=()=>{ctx.clearRect(0,0,canvas.width,canvas.height);renderer.drawFace(ctx,card,{width:canvas.width,height:canvas.height,theme:renderer.themeForSet(card.setId)});};img.src=cardArt(id);
}
function hydrateCards(root){root.querySelectorAll("canvas[data-starter-card]").forEach(canvas=>paintCard(canvas,canvas.dataset.starterCard));}
function render(){
  if(completedDraft()||finishing)return;
  if(document.body.dataset.screen!=="starter")return;
  const root=document.querySelector("#game");if(!root)return;
  const draft=ensureRoute(),round=draft[step];if(!round)return;
  root.innerHTML=`<section class="starter-draft-screen set-${round.setId}"><header class="starter-draft-head"><span>WWE LEGACY · STARTER DRAFT</span><h1>CHOOSE YOUR<br><b>SUPERSTAR</b></h1><p>ROUND ${step+1} OF 4 · ${round.setLabel.toUpperCase()}</p></header><div class="starter-draft-progress">${draft.map((r,i)=>`<i class="${i<step?'done':i===step?'current':''}"></i>`).join("")}</div><div class="starter-draft-rivalry"><div>${choice(round.choices[0])}</div><b>VS</b><div>${choice(round.choices[1])}</div></div><footer><small>Choose one. You will draft four Superstars from four different sets.</small></footer></section>`;
  hydrateCards(root);
  root.querySelectorAll("[data-starter-draft-choice]").forEach(btn=>btn.addEventListener("click",()=>pick(btn.dataset.starterDraftChoice),{once:true}));
}
function pick(id){
  if(finishing||completedDraft())return;
  const draft=ensureRoute(),round=draft[step];if(!round?.choices.includes(id))return;
  selections[step]=id;
  if(step<3){step++;render();return;}
  finishing=true;
  const profile=createStarterDraftProfile(draft,selections);
  saveProfile(profile);
  const persisted=loadProfile();
  if(!persisted?.starterDraft?.complete||!persisted?.onboarding?.complete){finishing=false;throw new Error("Starter Draft profile did not persist; reload blocked to prevent duplicate onboarding.");}
  route=null;step=0;selections=[];
  location.reload();
}
const observer=new MutationObserver(()=>{if(!completedDraft()&&document.body.dataset.screen==="starter"&&!document.querySelector(".starter-draft-screen"))queueMicrotask(render);});
observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["data-screen"]});
queueMicrotask(render);
