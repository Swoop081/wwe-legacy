import { decks } from "./decks.js?v=1.1.36";
import { collectionCards } from "./collection.js?v=1.1.36";
import { superstars } from "./superstars.js?v=1.1.36";
import { validateDeckDraft, selectedEntranceId, setSelectedEntrance, entranceEligibilityForSuperstar, recommendedDeckMissingCount } from "./deck-builder.js?v=1.1.36";
import { applyCardTier, CARD_TIERS, DEFAULT_AUTHORED_TIER, normalizeCardTier, tierDamageOffsetFor, tierLabel, tierRank } from "./variants.js?v=1.1.36";
import { MERCH_BY_ID, equipMerch, merchEligibilityForSuperstar } from "./merch.js?v=1.1.36";

const byId = new Map(collectionCards.map(c => [c.id, c]));
const starById = new Map(Object.values(superstars).map(s => [s.id, s]));
const tiersHighToLow = [...CARD_TIERS].sort((a,b)=>tierRank(b)-tierRank(a));
const normalizedEntry = entry => typeof entry === "string" ? { id: entry, tier: DEFAULT_AUTHORED_TIER } : { id: entry?.id, tier: normalizeCardTier(entry?.tier, entry?.foil ? "ruby" : DEFAULT_AUTHORED_TIER) };
const countId = (draft, id) => draft.reduce((n,e)=>n + (normalizedEntry(e).id === id ? 1 : 0), 0);
const countTier = (draft, id, tier) => draft.reduce((n,e)=>{const x=normalizedEntry(e);return n+(x.id===id&&x.tier===tier?1:0);},0);
const ownedTier = (profile,id,tier) => Math.max(0, Number(profile?.ownedCards?.[id]?.[tier]) || 0);

function bestUnusedOwnedTier(profile, draft, id) {
  return tiersHighToLow.find(tier => countTier(draft,id,tier) < ownedTier(profile,id,tier)) ?? null;
}

function preferOwnedTiers(profile, draft) {
  const out = draft.map(normalizedEntry), used = new Map();
  for (const entry of out) {
    const owned = profile?.ownedCards?.[entry.id] ?? {};
    let chosen = null;
    for (const tier of tiersHighToLow) {
      const key = `${entry.id}:${tier}`, n = used.get(key) ?? 0;
      if (n < (Number(owned[tier]) || 0)) { chosen = tier; used.set(key,n+1); break; }
    }
    entry.tier = chosen ?? entry.tier;
  }
  return out;
}

function playableCard(card, tier = DEFAULT_AUTHORED_TIER) { return card ? applyCardTier(card, tier) : null; }

export function buildPlayableDeck(profile, sid) {
  const saved = profile?.savedDecks?.[sid];
  if (Array.isArray(saved) && saved.length === 60) {
    const preferred = preferOwnedTiers(profile, saved);
    const materialized = preferred.map(raw => {
      const entry = normalizedEntry(raw), card = byId.get(entry.id);
      return card ? playableCard(card, entry.tier) : null;
    }).filter(Boolean);
    if (materialized.length === 60 && validateDeckDraft(profile, sid, preferred, selectedEntranceId(profile,sid)).healthy) return materialized;
  }
  return (decks[sid] ?? []).map(card => applyCardTier(card, "normal"));
}

function recommendedCounts(sid) {
  const counts = new Map();
  for (const card of decks[sid] ?? []) counts.set(card.id, (counts.get(card.id) ?? 0) + 1);
  return counts;
}

function findSafeBlueprintReplacement(profile, sid, draft, addId) {
  const recommended = recommendedCounts(sid);
  const desired = recommended.get(addId) ?? 0;
  if (!desired || countId(draft, addId) >= desired) return null;
  const candidates = [];
  for (let i = 0; i < draft.length; i += 1) {
    const remove = normalizedEntry(draft[i]);
    if (!remove.id || remove.id === addId) continue;
    const recommendedRemove = recommended.get(remove.id) ?? 0;
    if (countId(draft, remove.id) <= recommendedRemove) continue;
    candidates.push({ index: i, removeId: remove.id, lead: i < 5 });
  }
  candidates.sort((a,b)=>Number(a.lead)-Number(b.lead) || b.index-a.index);
  for (const candidate of candidates) {
    const next = draft.map(normalizedEntry);
    const without = next.filter((_,i)=>i!==candidate.index);
    next[candidate.index] = { id: addId, tier: bestUnusedOwnedTier(profile, without, addId) ?? "normal" };
    const preferred = preferOwnedTiers(profile,next);
    if (validateDeckDraft(profile, sid, preferred, selectedEntranceId(profile,sid)).healthy) return { ...candidate, next: preferred };
  }
  return null;
}

function bestUsedTier(draft,id) {
  return draft.filter(e=>normalizedEntry(e).id===id).map(e=>normalizedEntry(e).tier).sort((a,b)=>tierRank(b)-tierRank(a))[0] ?? null;
}
function hasHigherUnusedTier(profile,draft,id) {
  const current = bestUsedTier(draft,id);
  if (!current) return null;
  return tiersHighToLow.find(tier => tierRank(tier)>tierRank(current) && countTier(draft,id,tier)<ownedTier(profile,id,tier)) ?? null;
}

function merchEffectFitScore(star, item) {
  const effect=item?.effect??{};
  const authored=decks[star?.id]??[];
  if(effect.type==="momentum"){
    const method=effect.method;
    const methodMoves=authored.filter(card=>card?.kind==="move"&&card?.method===method);
    const requirementWeight=methodMoves.reduce((sum,card)=>sum+Math.max(0,Number(card?.requirements?.[method])||0),0);
    const starter=Math.max(0,Number(star?.starterMomentum?.[method])||0);
    const limit=star?.methodLimits?.[method];
    const openEnded=limit==null?24:Math.max(0,Number(limit)||0)*6;
    return 1000 + starter*12 + methodMoves.length*18 + requirementWeight*9 + openEnded;
  }
  if(effect.type==="hp") return 1000 + Math.max(0,80-Math.max(1,Number(star?.hp)||60))*8;
  if(effect.type==="shield") return 1000 + Math.max(0,82-Math.max(1,Number(star?.hp)||60))*7;
  if(effect.type==="adrenaline"){
    const moves=authored.filter(card=>card?.kind==="move");
    const avgCost=moves.length?moves.reduce((sum,card)=>sum+Math.max(0,Number(card?.cost)||0),0)/moves.length:0;
    const premiumMoves=moves.filter(card=>card?.trademark||card?.finisher).length;
    return 1000 + Math.round(avgCost*25) + premiumMoves*8;
  }
  return 1000;
}

export function bestMerchTarget(profile,item,unlockedIds=null){
  if(!profile||!item)return null;
  const unlocked=(unlockedIds??profile.unlockedSuperstars??[]).filter(id=>starById.has(id));
  const candidates=(item.superstarId?[item.superstarId]:unlocked)
    .filter(id=>unlocked.includes(id))
    .map((id,index)=>{const star=starById.get(id),eligibility=merchEligibilityForSuperstar(star,item);return {id,index,star,eligibility,score:eligibility.legal?merchEffectFitScore(star,item):-Infinity};})
    .filter(row=>row.eligibility.legal)
    .sort((a,b)=>b.score-a.score||a.index-b.index||a.star.name.localeCompare(b.star.name));
  return candidates[0]??null;
}

function merchRecommendationReason(target,item){
  const effect=item?.effect??{};
  if(effect.type==="momentum"){
    const label=String(effect.method??"").replace(/^./,c=>c.toUpperCase());
    const methodMoves=(decks[target.id]??[]).filter(card=>card?.kind==="move"&&card?.method===effect.method).length;
    return `${target.star.name} is the best legal fit for +${effect.amount??1} ${label} Momentum across your unlocked roster (${methodMoves} authored ${label} Move${methodMoves===1?"":"s"}).`;
  }
  if(effect.type==="hp") return `${target.star.name} is the best fit for this HP boost across your eligible unlocked roster.`;
  if(effect.type==="shield") return `${target.star.name} is the best fit for this defensive shield across your eligible unlocked roster.`;
  if(effect.type==="adrenaline") return `${target.star.name} is the best fit for this Adrenaline boost based on the cost profile of the authored deck.`;
  return `${target.star.name} is the best eligible fit for this Merch.`;
}

export function findPackUpgrades(profile, pack = []) {
  if (!profile || !Array.isArray(pack) || !pack.length) return [];
  const unlocked = (profile.unlockedSuperstars ?? []).filter(id => starById.has(id));
  const working = new Map();
  for (const sid of unlocked) {
    const saved = profile?.savedDecks?.[sid];
    if (Array.isArray(saved) && saved.length === 60) working.set(sid, saved.map(normalizedEntry));
  }
  const upgrades = [];

  for (const pull of pack) {
    const card = pull?.card;
    if (!card || pull.universePointsValue) continue;
    if (card.kind === "entrance") {
      for (const sid of unlocked) {
        const star = starById.get(sid);
        if (!star || star.entranceId !== card.id || selectedEntranceId(profile, sid) === card.id) continue;
        if (!entranceEligibilityForSuperstar(star, card).legal) continue;
        const currentEntranceId = selectedEntranceId(profile, sid);
        upgrades.push({ type:"entrance", superstarId:sid, pull, cardId:card.id, removeId:currentEntranceId, reason:`${card.name} is ${star.name}'s authored Entrance and is recommended over the shared Amazing Entrance.`, addName:`${tierLabel(pull.tier)} ${card.name}`, removeName:byId.get(currentEntranceId)?.name ?? "Current Entrance" });
      }
      continue;
    }
    // v1.1.14 — every usable Merch pull can produce one best-fit suggestion.
    // Generic Merch is assigned to exactly one unlocked Superstar; it is never
    // cloned into multiple decks. Method-granting Merch must pass the same hard
    // Superstar Method compatibility check used by manual Deck Lab equip.
    if (card.kind === "merch") {
      if (!profile.activeMerch?.id && !upgrades.some(row=>row.type==="merch") && Math.max(0, Number(profile.ownedMerch?.[card.id]) || 0) > 0) {
        const target=bestMerchTarget(profile,card,unlocked);
        if(target){
          const specific=!!card.superstarId;
          upgrades.push({
            type:"merch", superstarId:target.id, pull, cardId:card.id, removeId:null,
            reason:specific
              ? `${card.name} is ${target.star.name}-specific Merch and is legal for that Superstar. Your single Merch slot is empty, so it can be equipped for ${card.duration} completed match${Number(card.duration)===1?"":"es"}.`
              : `${merchRecommendationReason(target,card)} Equip it once to ${target.star.name}; the single consumable Merch item is not copied to any other deck and lasts ${card.duration} completed eligible match${Number(card.duration)===1?"":"es"}.`,
            addName:card.name, removeName:"Empty Merch Slot"
          });
        }
      }
      continue;
    }
    if (["superstar","variant"].includes(card.kind)) continue;
    for (const sid of unlocked) {
      let draft = working.get(sid);
      if (!draft) continue;
      let blueprintAdded = false;
      const recCount = recommendedCounts(sid).get(card.id) ?? 0;
      const beforeOwned = Math.max(0, Number(pull.ownershipBefore) || 0);
      if (recCount > beforeOwned && countId(draft, card.id) < Math.min(recCount, beforeOwned + 1)) {
        const swap = findSafeBlueprintReplacement(profile, sid, draft, card.id);
        if (swap) {
          const removed = byId.get(swap.removeId), addedTier = swap.next[swap.index]?.tier ?? "normal";
          const offset = tierDamageOffsetFor(card,addedTier);
          upgrades.push({ type:"blueprint", superstarId:sid, pull, cardId:card.id, removeId:swap.removeId, reason:`Restores a newly-owned copy from ${starById.get(sid)?.name ?? "this Superstar"}'s recommended build while keeping the deck valid. Uses ${tierLabel(addedTier)}${offset ? ` (${offset>0?"+":""}${offset} Damage vs authored)` : ""}.`, addName:`${tierLabel(addedTier)} ${card.name}`, removeName:removed?.name ?? swap.removeId });
          draft = swap.next; working.set(sid,swap.next); blueprintAdded = true;
        }
      }
      const upgradeTier = !blueprintAdded ? hasHigherUnusedTier(profile,draft,card.id) : null;
      if (upgradeTier) {
        const currentTier = bestUsedTier(draft,card.id) ?? "normal";
        upgrades.push({ type:"tier-upgrade", superstarId:sid, pull, cardId:card.id, targetTier:upgradeTier, reason:`${tierLabel(upgradeTier)} ${card.name} is a stronger owned printing than the ${tierLabel(currentTier)} copy currently used.`, addName:`${tierLabel(upgradeTier)} ${card.name}`, removeName:`${tierLabel(currentTier)} ${card.name}` });
        const next = draft.map(normalizedEntry);
        const index = next.findIndex(entry=>entry.id===card.id && tierRank(entry.tier)<tierRank(upgradeTier));
        if (index>=0) next[index]={id:card.id,tier:upgradeTier};
        draft=preferOwnedTiers(profile,next); working.set(sid,draft);
      }
    }
  }
  return upgrades;
}

export function applyUpgrade(profile, upgrade) {
  if (!profile || !upgrade?.superstarId) return false;
  const sid = upgrade.superstarId;
  if (upgrade.type === "entrance") return setSelectedEntrance(profile, sid, upgrade.cardId);
  if (upgrade.type === "merch") {
    const item = MERCH_BY_ID[upgrade.cardId];
    const star = starById.get(sid);
    if (!item || !star || profile.activeMerch?.id) return false;
    if (!(profile.unlockedSuperstars ?? []).includes(sid)) return false;
    if (!merchEligibilityForSuperstar(star,item).legal) return false;
    if (Math.max(0, Number(profile.ownedMerch?.[item.id]) || 0) < 1) return false;
    try { equipMerch(profile, item.id, sid); return true; } catch { return false; }
  }
  const saved = profile?.savedDecks?.[sid];
  if (!Array.isArray(saved) || saved.length !== 60) return false;
  const draft = saved.map(normalizedEntry);
  if (upgrade.type === "blueprint") {
    const recommended = recommendedCounts(sid), desired = recommended.get(upgrade.cardId) ?? 0;
    if (!desired || countId(draft, upgrade.cardId) >= desired) return false;
    const removeRecommended = recommended.get(upgrade.removeId) ?? 0;
    if (countId(draft, upgrade.removeId) <= removeRecommended) return false;
    const indices = draft.map((entry,index)=>entry.id===upgrade.removeId?index:-1).filter(index=>index>=0).sort((a,b)=>Number(a<5)-Number(b<5)||b-a);
    let next=null;
    for (const index of indices) {
      const candidate=draft.map(normalizedEntry), without=candidate.filter((_,i)=>i!==index);
      candidate[index]={id:upgrade.cardId,tier:bestUnusedOwnedTier(profile,without,upgrade.cardId)??"normal"};
      const preferred=preferOwnedTiers(profile,candidate);
      if (validateDeckDraft(profile,sid,preferred,selectedEntranceId(profile,sid)).healthy){next=preferred;break;}
    }
    if (!next) return false;
    draft.splice(0,draft.length,...next);
  } else if (upgrade.type === "tier-upgrade") {
    const target=normalizeCardTier(upgrade.targetTier), index=draft.findIndex(entry=>entry.id===upgrade.cardId&&tierRank(entry.tier)<tierRank(target));
    if (index<0 || countTier(draft,upgrade.cardId,target)>=ownedTier(profile,upgrade.cardId,target)) return false;
    draft[index]={id:upgrade.cardId,tier:target};
    const preferred=preferOwnedTiers(profile,draft); draft.splice(0,draft.length,...preferred);
  } else return false;
  if (!validateDeckDraft(profile,sid,draft,selectedEntranceId(profile,sid)).healthy) return false;
  profile.savedDecks[sid]=draft;
  profile.deckNeedsCards ??= {};
  profile.deckNeedsCards[sid]=recommendedDeckMissingCount(sid,draft);
  return true;
}
