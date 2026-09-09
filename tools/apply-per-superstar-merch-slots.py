from pathlib import Path
import re


def replace_once(text, old, new, label):
    if old not in text:
        raise RuntimeError(f"{label}: expected source not found")
    return text.replace(old, new, 1)

# --- Merch data model: one independent slot per owned Superstar ---
merch_path = Path('js/data/merch.js')
merch = merch_path.read_text()
start = merch.find('export function activeMerchSuperstarId(profile){')
if start < 0:
    raise RuntimeError('merch.js: active Merch function block not found')
new_tail = r'''function activeMerchMap(profile){
  if(!profile) return {};
  profile.activeMerchBySuperstar??={};
  const legacy=profile.activeMerch;
  if(legacy?.id){
    const item=MERCH_BY_ID[legacy.id]??null;
    const legacyTarget=legacy.superstarId??item?.superstarId??profile?.starterId??null;
    if(legacyTarget&&!profile.activeMerchBySuperstar[legacyTarget]) profile.activeMerchBySuperstar[legacyTarget]={...legacy,superstarId:legacyTarget};
    profile.activeMerch=null;
  }
  return profile.activeMerchBySuperstar;
}
export function activeMerchSuperstarId(profile,superstarId=null){
  const map=activeMerchMap(profile);
  const requested=String(superstarId??"").trim();
  if(requested) return map[requested]?.id?requested:null;
  const activeIds=Object.keys(map).filter(id=>map[id]?.id);
  return activeIds.length===1?activeIds[0]:null;
}
export function equipMerch(profile,id,superstarId=null){
  const item=MERCH_BY_ID[id]; if(!profile||!item) throw new Error("Merch item not found.");
  const targetId=String(item.superstarId??superstarId??"").trim();
  if(!targetId) throw new Error("Choose an eligible Superstar in Deck Lab before equipping Generic Merch.");
  const star=STAR_BY_ID.get(targetId);
  if(!star||(profile.unlockedSuperstars??[]).includes(targetId)===false) throw new Error(`Unlock ${star?.name??targetId} before using this Merch.`);
  const eligibility=merchEligibilityForSuperstar(star,item);
  if(!eligibility.legal) throw new Error(eligibility.reason);
  const active=activeMerchMap(profile);
  if(active[targetId]?.id) throw new Error(`${star.name} already has active Merch. Finish or discard it before equipping another card.`);
  const owned=Math.max(0,Number(profile.ownedMerch?.[id])||0); if(owned<1) throw new Error("You do not own this Merch.");
  profile.ownedMerch[id]=owned-1;
  active[targetId]={id,superstarId:targetId,remainingMatches:item.duration,equippedAt:new Date().toISOString()};
  return active[targetId];
}
export function discardActiveMerch(profile,superstarId=null){
  if(!profile) return null;
  const active=activeMerchMap(profile);
  const targetId=String(superstarId??activeMerchSuperstarId(profile)??"").trim();
  if(!targetId||!active[targetId]?.id) return null;
  const old=active[targetId];
  delete active[targetId];
  return old;
}
export function activeMerchItem(profile,superstarId=null){
  const active=activeMerchMap(profile);
  const targetId=String(superstarId??activeMerchSuperstarId(profile)??"").trim();
  if(!targetId) return null;
  const slot=active[targetId];
  const item=slot?.id?MERCH_BY_ID[slot.id]:null;
  if(!item||!merchEligibilityForSuperstar(targetId,item).legal) return null;
  return {...item,remainingMatches:Math.max(0,Number(slot.remainingMatches)||0),equippedSuperstarId:targetId};
}
export function merchMatchModifier(profile,superstarId=""){ const targetId=String(superstarId??"").trim(); if(!targetId)return null; const item=activeMerchItem(profile,targetId); if(!item)return null; const e=item.effect??{}; const out={name:item.name,ruleText:item.rulesText,startingMomentum:{p1:{}},startingAdrenaline:{},startingHpBonus:{},firstMoveDamageMultiplier:{}}; if(e.type==="hp")out.startingHpBonus.p1=e.amount??0; if(e.type==="momentum")out.startingMomentum.p1[e.method]=e.amount??1; if(e.type==="adrenaline")out.startingAdrenaline.p1=e.amount??1; if(e.type==="shield")out.firstMoveDamageMultiplier.p1=e.multiplier??.5; return out; }
export function consumeActiveMerchMatch(profile,superstarId=null){ const active=activeMerchMap(profile); const targetId=String(superstarId??activeMerchSuperstarId(profile)??"").trim(); const a=targetId?active[targetId]:null; if(!a?.id)return null; a.remainingMatches=Math.max(0,(Number(a.remainingMatches)||0)-1); const item=MERCH_BY_ID[a.id]??null; if(a.remainingMatches<=0)delete active[targetId]; return {item,superstarId:targetId,remainingMatches:Math.max(0,Number(a.remainingMatches)||0)}; }
'''
merch = merch[:start] + new_tail
merch_path.write_text(merch)

# --- Profile schema + migration ---
profile_path = Path('js/data/profile.js')
profile = profile_path.read_text()
profile = replace_once(profile, 'export const PROFILE_VERSION = 46;', 'export const PROFILE_VERSION = 47;', 'profile version')
profile = replace_once(profile, '    ownedMerch: {},\n    activeMerch: null,', '    ownedMerch: {},\n    activeMerchBySuperstar: {},\n    activeMerch: null,', 'new profile merch state')
profile = replace_once(profile, '  p.ownedMerch ??= {};\n  p.activeMerch ??= null;', '''  p.ownedMerch ??= {};
  p.activeMerchBySuperstar ??= {};
  if(p.activeMerch?.id){
    const legacyTarget=p.activeMerch.superstarId??p.starterId??null;
    if(legacyTarget&&!p.activeMerchBySuperstar[legacyTarget]) p.activeMerchBySuperstar[legacyTarget]={...p.activeMerch,superstarId:legacyTarget};
    p.activeMerch=null;
  }
  p.activeMerch ??= null;''', 'profile Merch migration')
profile_path.write_text(profile)

# --- UI + match consumption ---
app_path = Path('js/ui/app.js')
app = app_path.read_text()
app = replace_once(app,
'import { MERCH_ITEMS, MERCH_BY_ID, activeMerchItem, activeMerchSuperstarId, merchEligibilityForSuperstar, equipMerch, discardActiveMerch, merchMatchModifier, consumeActiveMerchMatch } from "../data/merch.js?v=1.1.132";',
'import { MERCH_ITEMS, MERCH_BY_ID, activeMerchItem, merchEligibilityForSuperstar, equipMerch, discardActiveMerch, merchMatchModifier, consumeActiveMerchMatch } from "../data/merch.js?v=1.1.132";',
'app Merch import')

old_profile_merch = '''  const activeMerch = activeMerchItem(profile);
  const activeMerchTargetId = activeMerchSuperstarId(profile);
  const ownedMerch = MERCH_ITEMS.filter(item => Math.max(0, Number(profile.ownedMerch?.[item.id]) || 0) > 0).sort((a,b)=>(Number(b.rarity)||0)-(Number(a.rarity)||0)||a.name.localeCompare(b.name));
  const merchCards = ownedMerch.length ? ownedMerch.map(item => { const owned=Math.max(0,Number(profile.ownedMerch?.[item.id])||0); const locked=item.superstarId&&!hasSuperstar(profile,item.superstarId); const directStar=item.superstarId?superstarById[item.superstarId]:null; const compatibility=directStar?merchEligibilityForSuperstar(directStar,item):{legal:true,reason:''}; const incompatible=!!directStar&&!compatibility.legal; const needsDeckLab=!item.superstarId; return `<article class="merch-inventory-card ${item.scope==='superstar'?'is-superstar-merch':'is-generic-merch'} ${locked||incompatible?'is-locked':''}"><div><span>${item.scope==='superstar'?'SUPERSTAR MERCH':'GENERIC MERCH'} · ${item.duration} MATCH${item.duration===1?'':'ES'}</span><strong>${item.name}</strong><p>${item.rulesText}</p>${item.superstarId?`<small>${incompatible?compatibility.reason:(superstarById[item.superstarId]?.name??item.superstarId)}</small>`:`<small>Choose the best eligible Superstar in Deck Lab</small>`}</div><b>×${owned}</b><button type="button" class="nav-button" data-equip-merch="${item.id}" ${activeMerch||locked||incompatible||needsDeckLab?'disabled':''}>${locked?'BASE SUPERSTAR REQUIRED':incompatible?'NOT COMPATIBLE':activeMerch?'MERCH ACTIVE':needsDeckLab?'USE DECK LAB':'EQUIP'}</button></article>`; }).join('') : `<div class="premium-empty-state"><strong>No Merch owned yet</strong><small>Every booster contains one guaranteed Merch card, and Daily Spin can award more.</small></div>`;'''
new_profile_merch = '''  const equippedMerch = (profile.unlockedSuperstars??[]).map(superstarId=>({superstarId,item:activeMerchItem(profile,superstarId)})).filter(entry=>entry.item);
  const ownedMerch = MERCH_ITEMS.filter(item => Math.max(0, Number(profile.ownedMerch?.[item.id]) || 0) > 0).sort((a,b)=>(Number(b.rarity)||0)-(Number(a.rarity)||0)||a.name.localeCompare(b.name));
  const merchCards = ownedMerch.length ? ownedMerch.map(item => { const owned=Math.max(0,Number(profile.ownedMerch?.[item.id])||0); const locked=item.superstarId&&!hasSuperstar(profile,item.superstarId); const directStar=item.superstarId?superstarById[item.superstarId]:null; const compatibility=directStar?merchEligibilityForSuperstar(directStar,item):{legal:true,reason:''}; const incompatible=!!directStar&&!compatibility.legal; const needsDeckLab=!item.superstarId; const targetOccupied=!!(item.superstarId&&activeMerchItem(profile,item.superstarId)); return `<article class="merch-inventory-card ${item.scope==='superstar'?'is-superstar-merch':'is-generic-merch'} ${locked||incompatible?'is-locked':''}"><div><span>${item.scope==='superstar'?'SUPERSTAR MERCH':'GENERIC MERCH'} · ${item.duration} MATCH${item.duration===1?'':'ES'}</span><strong>${item.name}</strong><p>${item.rulesText}</p>${item.superstarId?`<small>${incompatible?compatibility.reason:(superstarById[item.superstarId]?.name??item.superstarId)}</small>`:`<small>Equip to any eligible owned Superstar in Deck Lab</small>`}</div><b>×${owned}</b><button type="button" class="nav-button" data-equip-merch="${item.id}" ${locked||incompatible||needsDeckLab||targetOccupied?'disabled':''}>${locked?'BASE SUPERSTAR REQUIRED':incompatible?'NOT COMPATIBLE':targetOccupied?'SLOT FILLED':needsDeckLab?'USE DECK LAB':'EQUIP'}</button></article>`; }).join('') : `<div class="premium-empty-state"><strong>No Merch owned yet</strong><small>Every booster contains one guaranteed Merch card, and Daily Spin can award more.</small></div>`;
  const equippedMerchCards = equippedMerch.length ? equippedMerch.map(({superstarId,item})=>`<article class="active-merch-card"><span>${superstarById[superstarId]?.name??superstarId} · ${item.remainingMatches} MATCH${item.remainingMatches===1?'':'ES'} LEFT</span><strong>${item.name}</strong><p>${item.rulesText}</p><button type="button" class="nav-button" data-discard-merch-star="${superstarId}">DISCARD</button></article>`).join('') : `<div class="active-merch-card is-empty"><span>NO MERCH EQUIPPED</span><p>Every owned Superstar has their own Merch slot. Equip one Generic card or one Superstar-specific card per Superstar.</p></div>`;'''
app = replace_once(app, old_profile_merch, new_profile_merch, 'profile Merch variables')

profile_panel_pattern = re.compile(r'<section class="premium-panel merch-loadout-panel"><div class="section-title"><div><h3>Merch Loadout</h3>.*?<div class="merch-inventory-grid">\$\{merchCards\}</div></section>')
profile_panel_new = '<section class="premium-panel merch-loadout-panel"><div class="section-title"><div><h3>Merch Loadouts</h3><small>One Merch slot for every owned Superstar · bonuses apply only to that Superstar</small></div><span>${equippedMerch.length} EQUIPPED</span></div><div class="active-merch-loadouts">${equippedMerchCards}</div><div class="merch-inventory-grid">${merchCards}</div></section>'
app, count = profile_panel_pattern.subn(profile_panel_new, app, count=1)
if count != 1:
    raise RuntimeError('profile Merch panel: expected source not found')

app = replace_once(app,
'  root.querySelectorAll("[data-equip-merch]").forEach(btn=>btn.addEventListener("click",()=>{try{const item=MERCH_BY_ID[btn.dataset.equipMerch];equipMerch(profile,btn.dataset.equipMerch,item?.superstarId??null);saveProfile(profile);message="Merch equipped for its assigned Superstar.";}catch(e){message=e.message;}renderProfile();}));\n  $("#discard-active-merch")?.addEventListener("click",()=>{const old=discardActiveMerch(profile);saveProfile(profile);message=old?"Active Merch discarded.":"No active Merch to discard.";renderProfile();});',
'  root.querySelectorAll("[data-equip-merch]").forEach(btn=>btn.addEventListener("click",()=>{try{const item=MERCH_BY_ID[btn.dataset.equipMerch];equipMerch(profile,btn.dataset.equipMerch,item?.superstarId??null);saveProfile(profile);message=`${item?.name??"Merch"} equipped to ${superstarById[item?.superstarId]?.name??"its Superstar"}.`;}catch(e){message=e.message;}renderProfile();}));\n  root.querySelectorAll("[data-discard-merch-star]").forEach(btn=>btn.addEventListener("click",()=>{const sid=btn.dataset.discardMerchStar;const old=discardActiveMerch(profile,sid);saveProfile(profile);message=old?`Merch discarded from ${superstarById[sid]?.name??sid}.`:"No Merch equipped for that Superstar.";renderProfile();}));',
'profile Merch listeners')

app = replace_once(app,
'''  const activeMerchRecord = profile.activeMerch?.id ? MERCH_BY_ID[profile.activeMerch.id] ?? null : null;
  const activeMerchTargetId = activeMerchSuperstarId(profile);
  const activeMerchForStar = activeMerchItem(profile, deckBuilderStarId);
  const activeMerchMatches = Math.max(0, Number(profile.activeMerch?.remainingMatches) || 0);''',
'''  const activeMerchForStar = activeMerchItem(profile, deckBuilderStarId);
  const activeMerchRecord = activeMerchForStar;
  const activeMerchMatches = Math.max(0, Number(activeMerchForStar?.remainingMatches) || 0);''',
'Deck Lab Merch variables')

app = replace_once(app,
'      subtitle = `One active Merch slot · effects never stack · each card expires after 1, 3 or 5 completed eligible matches. Choose Generic Merch or ${star.name}-specific Merch.`;',
'      subtitle = `One Merch slot for ${star.name} · effects never stack on the same Superstar · each card expires after 1, 3 or 5 completed eligible matches. Choose Generic Merch or ${star.name}-specific Merch.`;',
'Deck Lab Merch picker subtitle')
app = replace_once(app,
'        .map(card => { const base=merchEligibilityForSuperstar(star,card); return { card, eligibility: activeMerchRecord ? { legal:false, reason:"The single Merch slot is already occupied. Discard or expire the active Merch first." } : base }; });',
'        .map(card => { const base=merchEligibilityForSuperstar(star,card); return { card, eligibility: activeMerchForStar ? { legal:false, reason:`${star.name} already has Merch equipped. Discard or expire it first.` } : base }; });',
'Deck Lab Merch picker eligibility')

old_deck_panel = '''    <section class="deck-merch-loadout ${activeMerchRecord ? 'has-active-merch' : 'is-empty'}">
      <div class="section-title"><div><h3>Merch Slot</h3><small>1 active item · non-stackable · expires after completed eligible matches</small></div><span>${activeMerchRecord ? `${activeMerchMatches} MATCH${activeMerchMatches===1?'':'ES'} LEFT` : 'EMPTY'}</span></div>
      ${activeMerchForStar ? `<div class="deck-merch-active">
        <div class="deck-merch-card">${collectibleCardMarkup(activeMerchForStar,{tier:'normal',extraClass:'deck-merch-ccg',flipAttr:`data-deck-lab-inspect="${activeMerchForStar.id}"`})}</div>
        <div class="deck-merch-copy"><span>ACTIVE FOR THIS SUPERSTAR</span><strong>${activeMerchForStar.name}</strong><p>${activeMerchForStar.rulesText}</p><small>${activeMerchForStar.duration} match card · ${activeMerchMatches} remaining · assigned only to ${star.name} · one use consumed after each completed eligible match.</small></div>
        <button id="discard-deck-merch" type="button" class="secondary">DISCARD ACTIVE MERCH</button>
      </div>` : activeMerchRecord ? `<div class="deck-merch-empty deck-merch-occupied"><div><span>SLOT OCCUPIED</span><strong>Merch assigned to ${superstarById[activeMerchTargetId]?.name ?? 'another Superstar'}</strong><p>The active Merch card and its match bonus apply only to ${superstarById[activeMerchTargetId]?.name ?? 'the assigned Superstar'}. It is not equipped to ${star.name}.</p></div></div>` : `<div class="deck-merch-empty"><div><span>FREE MERCH SLOT</span><strong>Add a temporary match boost</strong><p>Equip eligible Generic Merch or ${star.name}-specific Merch. Generic Merch is assigned to this Superstar only. Method boosts are blocked when this Superstar cannot legally use that Method.</p></div><button id="change-merch" type="button" class="primary">ADD MERCH</button></div>`}
    </section>'''
new_deck_panel = '''    <section class="deck-merch-loadout ${activeMerchForStar ? 'has-active-merch' : 'is-empty'}">
      <div class="section-title"><div><h3>${star.name} Merch Slot</h3><small>1 item for this Superstar · non-stackable · other Superstars have their own slots</small></div><span>${activeMerchForStar ? `${activeMerchMatches} MATCH${activeMerchMatches===1?'':'ES'} LEFT` : 'EMPTY'}</span></div>
      ${activeMerchForStar ? `<div class="deck-merch-active">
        <div class="deck-merch-card">${collectibleCardMarkup(activeMerchForStar,{tier:'normal',extraClass:'deck-merch-ccg',flipAttr:`data-deck-lab-inspect="${activeMerchForStar.id}"`})}</div>
        <div class="deck-merch-copy"><span>ACTIVE FOR ${star.name.toUpperCase()}</span><strong>${activeMerchForStar.name}</strong><p>${activeMerchForStar.rulesText}</p><small>${activeMerchForStar.duration} match card · ${activeMerchMatches} remaining · only ${star.name} receives this bonus.</small></div>
        <button id="discard-deck-merch" type="button" class="secondary">DISCARD ACTIVE MERCH</button>
      </div>` : `<div class="deck-merch-empty"><div><span>FREE MERCH SLOT</span><strong>Add a temporary match boost for ${star.name}</strong><p>Equip one eligible Generic Merch card or one ${star.name}-specific Merch card. This does not affect any other Superstar's Merch slot.</p></div><button id="change-merch" type="button" class="primary">ADD MERCH</button></div>`}
    </section>'''
app = replace_once(app, old_deck_panel, new_deck_panel, 'Deck Lab Merch panel')

app = replace_once(app,
'  $("#discard-deck-merch")?.addEventListener("click", () => { const old = discardActiveMerch(profile); saveProfile(profile); message = old ? "Active Merch discarded. The single Merch slot is free." : "No active Merch to discard."; renderDeckBuilder(); });',
'  $("#discard-deck-merch")?.addEventListener("click", () => { const old = discardActiveMerch(profile,deckBuilderStarId); saveProfile(profile); message = old ? `${star.name} Merch discarded. This Superstar slot is free.` : `No Merch equipped for ${star.name}.`; renderDeckBuilder(); });',
'Deck Lab discard listener')

app = replace_once(app,
'    merchApplied: !!equippedMerchModifier,',
'    merchApplied: !!equippedMerchModifier,\n    merchSuperstarId: equippedMerchModifier ? p1Id : null,',
'match Merch context')
app = replace_once(app,
'  const merchUse = activeMatchContext?.merchApplied ? consumeActiveMerchMatch(profile) : null;',
'  const merchUse = activeMatchContext?.merchApplied ? consumeActiveMerchMatch(profile,activeMatchContext?.merchSuperstarId??state.players[HUMAN].superstar.id) : null;',
'match Merch consumption')
app_path.write_text(app)

print('Applied independent per-Superstar Merch slots.')
