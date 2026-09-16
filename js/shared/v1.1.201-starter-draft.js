import { rollStarterDraft, createStarterDraftProfile } from "../data/starter-draft.js?v=1.1.201";
import { saveProfile } from "../data/profile.js?v=1.1.132";
import { superstars } from "../data/superstars.js?v=1.1.132";
import { collectionCards } from "../data/collection.js?v=1.1.132";
import { finishedCardArtFor, superstarCardArtFor, superstarArtwork } from "../data/artwork.js?v=1.1.132";

let route=null,step=0,selections=[];
const placeholder="./assets/images/card-temp-superstar-placeholder.svg";
function ensureRoute(){if(!route){route=rollStarterDraft();step=0;selections=[];}return route;}
function star(id){return superstars[id]??Object.values(superstars).find(s=>s.id===id)??null;}
function superstarCard(id){return collectionCards.find(c=>c.id===`superstar-${id}`)??null;}
function cardArt(id){
  const card=superstarCard(id);
  return finishedCardArtFor?.(card??{id:`superstar-${id}`,superstarId:id})
    ?? superstarCardArtFor?.(id)
    ?? superstarArtwork[id]
    ?? placeholder;
}
function choice(id){const s=star(id),src=cardArt(id);return `<button type="button" class="starter-draft-choice" data-starter-draft-choice="${id}"><span class="starter-draft-photo starter-draft-superstar-card"><img src="${src}" alt="${s?.name??id} Superstar card" onerror="this.onerror=null;this.src='${placeholder}'"></span><strong>${s?.name??id}</strong><small>${s?.nickname??"CHOOSE SUPERSTAR"}</small></button>`;}
function render(){
  if(document.body.dataset.screen!=="starter")return;
  const root=document.querySelector("#game");if(!root)return;
  const draft=ensureRoute(),round=draft[step];if(!round)return;
  root.innerHTML=`<section class="starter-draft-screen set-${round.setId}"><header class="starter-draft-head"><span>WWE LEGACY · STARTER DRAFT</span><h1>CHOOSE YOUR<br><b>SUPERSTAR</b></h1><p>ROUND ${step+1} OF 4 · ${round.setLabel.toUpperCase()}</p></header><div class="starter-draft-progress">${draft.map((r,i)=>`<i class="${i<step?'done':i===step?'current':''}"></i>`).join("")}</div><div class="starter-draft-rivalry"><div>${choice(round.choices[0])}</div><b>VS</b><div>${choice(round.choices[1])}</div></div><footer><small>Choose one. You will draft four Superstars from four different sets.</small></footer></section>`;
  root.querySelectorAll("[data-starter-draft-choice]").forEach(btn=>btn.addEventListener("click",()=>pick(btn.dataset.starterDraftChoice)));
}
function pick(id){
  const draft=ensureRoute(),round=draft[step];if(!round?.choices.includes(id))return;
  selections[step]=id;
  if(step<3){step++;render();return;}
  const profile=createStarterDraftProfile(draft,selections);
  profile.onboarding={complete:true,step:4};
  saveProfile(profile);
  route=null;step=0;selections=[];
  location.reload();
}
const observer=new MutationObserver(()=>{if(document.body.dataset.screen==="starter"&&!document.querySelector(".starter-draft-screen"))queueMicrotask(render);});
observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["data-screen"]});
queueMicrotask(render);
