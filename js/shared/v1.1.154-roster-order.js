// v1.1.154 — player-controlled Superstar ordering for Deck Lab and character selectors.
import { loadProfile, saveProfile } from "../data/profile.js?v=1.1.132";
import { superstars } from "../data/superstars.js?v=1.1.132";

const starById = new Map(Object.values(superstars).map(star => [star.id, star]));
const ORDER_KEY = "rosterOrder";

function currentProfile() { try { return loadProfile(); } catch { return null; } }
function normalizedOrder(profile = currentProfile()) {
  const unlocked = [...new Set(profile?.unlockedSuperstars ?? [])].filter(id => starById.has(id));
  const stored = Array.isArray(profile?.[ORDER_KEY]) ? profile[ORDER_KEY].filter(id => unlocked.includes(id)) : [];
  return [...stored, ...unlocked.filter(id => !stored.includes(id))];
}
function saveOrder(order) {
  const profile = currentProfile();
  if (!profile) return;
  const unlocked = new Set(profile.unlockedSuperstars ?? []);
  profile[ORDER_KEY] = [...new Set(order)].filter(id => unlocked.has(id));
  saveProfile(profile);
}
function desiredIndexMap() { return new Map(normalizedOrder().map((id,index)=>[id,index])); }
function reorderCarousel(carousel) {
  if (!carousel) return;
  const cards = [...carousel.querySelectorAll(":scope > [data-select-star]")];
  if (cards.length < 2) return;
  const rank = desiredIndexMap();
  const desired = [...cards].sort((a,b) => (rank.get(a.dataset.selectStar) ?? 9999) - (rank.get(b.dataset.selectStar) ?? 9999));
  const alreadyOrdered = cards.every((card,index) => card === desired[index]);
  if (alreadyOrdered) return;
  const selected = cards.find(card => card.classList.contains("selected"));
  desired.forEach(card => carousel.appendChild(card));
  if (selected) requestAnimationFrame(()=>selected.scrollIntoView({inline:"center",block:"nearest"}));
}
function reorderAllSelectors(root = document) {
  if (root.matches?.(".superstar-select-carousel")) reorderCarousel(root);
  root.querySelectorAll?.(".superstar-select-carousel").forEach(reorderCarousel);
}
function starRow(id) {
  const star = starById.get(id);
  const name = star?.name ?? id;
  const nickname = star?.nickname ?? "";
  return `<li class="roster-order-row" data-roster-star="${id}"><button type="button" class="roster-order-grip" aria-label="Drag ${name}" title="Drag to reorder">☰</button><div><strong>${name}</strong>${nickname?`<small>${nickname}</small>`:""}</div><span class="roster-order-position"></span></li>`;
}
function refreshPositions(list) {
  [...list.querySelectorAll(".roster-order-row")].forEach((row,index)=>{ const label=row.querySelector(".roster-order-position"); if(label) label.textContent=String(index+1); });
}
function openRosterOrder() {
  document.querySelector(".roster-order-modal")?.remove();
  const order = normalizedOrder();
  const modal = document.createElement("div");
  modal.className = "roster-order-modal";
  modal.innerHTML = `<section class="roster-order-sheet" role="dialog" aria-modal="true" aria-label="Reorder Superstars"><header><div><span>DECK LAB</span><h2>Reorder Superstars</h2><p>Drag the list into your preferred order. This order is used in Deck Lab and character select.</p></div><button type="button" class="roster-order-close" aria-label="Close">×</button></header><ol class="roster-order-list">${order.map(starRow).join("")}</ol><button type="button" class="roster-order-done">SAVE ORDER</button></section>`;
  document.body.appendChild(modal);
  const list = modal.querySelector(".roster-order-list");
  refreshPositions(list);
  let dragging = null;
  let pointerId = null;
  const start = (event,row) => {
    dragging = row; pointerId = event.pointerId; row.classList.add("is-dragging"); row.setPointerCapture?.(pointerId); event.preventDefault();
  };
  list.querySelectorAll(".roster-order-row").forEach(row => {
    const grip = row.querySelector(".roster-order-grip");
    grip.addEventListener("pointerdown", event => start(event,row));
    row.draggable = true;
    row.addEventListener("dragstart", event => { dragging=row; row.classList.add("is-dragging"); event.dataTransfer.effectAllowed="move"; });
    row.addEventListener("dragend", () => { dragging?.classList.remove("is-dragging"); dragging=null; refreshPositions(list); });
  });
  const move = event => {
    if (!dragging) return;
    const target = document.elementFromPoint(event.clientX,event.clientY)?.closest?.(".roster-order-row");
    if (!target || target===dragging || !list.contains(target)) return;
    const rect=target.getBoundingClientRect();
    list.insertBefore(dragging, event.clientY < rect.top + rect.height/2 ? target : target.nextSibling);
    refreshPositions(list);
    event.preventDefault();
  };
  const end = event => { if(!dragging)return; try{dragging.releasePointerCapture?.(pointerId);}catch{} dragging.classList.remove("is-dragging"); dragging=null; pointerId=null; refreshPositions(list); event?.preventDefault?.(); };
  modal.addEventListener("pointermove",move,{passive:false});
  modal.addEventListener("pointerup",end,{passive:false});
  modal.addEventListener("pointercancel",end,{passive:false});
  list.addEventListener("dragover",event=>{event.preventDefault();move(event);});
  modal.querySelector(".roster-order-close").addEventListener("click",()=>modal.remove());
  modal.addEventListener("click",event=>{if(event.target===modal)modal.remove();});
  modal.querySelector(".roster-order-done").addEventListener("click",()=>{
    const ids=[...list.querySelectorAll(".roster-order-row")].map(row=>row.dataset.rosterStar);
    saveOrder(ids); modal.remove(); reorderAllSelectors(document);
  });
}
function ensureDeckLabButton(root=document) {
  const title = root.matches?.(".deck-lab-roster-selector .selector-title") ? root : root.querySelector?.(".deck-lab-roster-selector .selector-title");
  if (!title || title.querySelector(".roster-order-launch")) return;
  title.classList.add("has-roster-order");
  const button=document.createElement("button");
  button.type="button"; button.className="roster-order-launch"; button.innerHTML="<span>☰</span> REORDER"; button.setAttribute("aria-label","Reorder unlocked Superstars");
  button.addEventListener("click",openRosterOrder);
  title.appendChild(button);
}
function apply(root=document) { ensureDeckLabButton(root); reorderAllSelectors(root); }

const observer = new MutationObserver(records => {
  for (const record of records) for (const node of record.addedNodes) if (node.nodeType===1) apply(node);
});
observer.observe(document.documentElement,{childList:true,subtree:true});
apply(document);
