import { superstars } from "./superstars.js?v=1.1.120";

const METHODS = ["strength", "strike", "technical", "agility"];
const STAR_BY_ID = new Map(Object.values(superstars).map(star => [star.id, star]));
const slug = value => String(value ?? "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const primaryMethod = star => METHODS.filter(m => star?.methodLimits?.[m] !== 0).sort((a,b)=>(Number(star?.starterMomentum?.[b]??0)-Number(star?.starterMomentum?.[a]??0)) || METHODS.indexOf(a)-METHODS.indexOf(b))[0] ?? "strength";
const labelMethod = method => method[0].toUpperCase()+method.slice(1);
const merchCard = ({id,name,scope="generic",superstarId=null,setId=null,rarity=1,duration=3,effect,rulesText,merchLevel=null,category="collectible",sourceNote=null}) => Object.freeze({
  id,name,kind:"merch",scope,superstarId,setId,rarity,duration,effect,rulesText,merchLevel,category,sourceNote,
  subtitle:`MERCH · ${duration} MATCH${duration===1?"":"ES"}`, boosterEligible:true, cardCode:`MERCH-${slug(id).toUpperCase()}`
});

const GENERIC_CATALOG = Object.freeze([
  {name:"WWE Logo T-Shirt",category:"t-shirt",effect:{type:"hp",amount:2},duration:5,text:"Start each match with +2 HP."},
  {name:"WWE Logo Stainless Steel Water Bottle",category:"drinkware",effect:{type:"adrenaline",amount:1},duration:1,text:"Start the match with +1 Adrenaline."},
  {name:"WWE World Heavyweight Championship Toy Title Belt",category:"title",effect:{type:"hp",amount:3},duration:3,text:"Start each match with +3 HP."},
  {name:"Undisputed WWE Championship Toy Title Belt",category:"title",effect:{type:"shield",multiplier:.5},duration:1,text:"Shield: take half damage from the first Move that Connects against you."},
  {name:"WWE Logo Stainless Steel Mug",category:"drinkware",effect:{type:"adrenaline",amount:1},duration:3,text:"Start each match with +1 Adrenaline."},
  {name:"WWE Logo Beach Towel",category:"towel",effect:{type:"hp",amount:2},duration:3,text:"Start each match with +2 HP."},
  {name:"WWE Logo Championship Fanny Pack",category:"accessory",effect:{type:"momentum",method:"technical",amount:1},duration:3,text:"Start each match with +1 Technical Momentum."},
  {name:"WWE Event Poster",category:"poster",effect:{type:"momentum",method:"strike",amount:1},duration:3,text:"Start each match with +1 Strike Momentum."}
]);
export const GENERIC_MERCH = Object.freeze(GENERIC_CATALOG.map((spec,index)=>merchCard({
  id:`merch-generic-${String(index+1).padStart(3,"0")}-${slug(spec.name)}`, name:spec.name,category:spec.category,rarity:index>=6?3:index>=2?2:1,duration:spec.duration,effect:spec.effect,rulesText:spec.text,
  sourceNote:"WWE Shop generic WWE-branded merchandise audit — September 2026"
})));

const STAR_EXTRAS = Object.freeze({
  "john-cena":[
    {name:"John Cena Never Give Up T-Shirt",category:"t-shirt"},{name:"John Cena Hustle Loyalty Respect T-Shirt",category:"t-shirt"},
    {name:"John Cena WrestleMania 42 Wristband Set",category:"wristbands",effect:{type:"shield",multiplier:.5},duration:3,text:"Shield: take half damage from the first Move that Connects against you."},
    {name:"John Cena Hustle Loyalty Respect Towel",category:"towel",effect:{type:"hp",amount:5},duration:3,text:"Start each match with +5 HP."},
    {name:"John Cena Funko Pop",category:"funko",effect:{type:"adrenaline",amount:1},duration:5,text:"Start each match with +1 Adrenaline."}],
  "stone-cold-steve-austin":[
    {name:"Stone Cold Steve Austin 3:16 T-Shirt",category:"t-shirt"},{name:"Stone Cold Steve Austin Don't Trust Anybody T-Shirt",category:"t-shirt"},
    {name:"Stone Cold Steve Austin Funko Pop",category:"funko",effect:{type:"adrenaline",amount:1},duration:5,text:"Start each match with +1 Adrenaline."},
    {name:"Stone Cold Smoking Skull Championship",category:"title",effect:{type:"hp",amount:5},duration:3,text:"Start each match with +5 HP."},
    {name:"Stone Cold Beer Can",category:"signature",effect:{type:"adrenaline",amount:2},duration:1,text:"Start the match with +2 Adrenaline."}],
  "bret-hart":[{name:"Bret Hart Hit Man T-Shirt",category:"t-shirt"},{name:"Bret Hart Sunglasses",category:"signature",effect:{type:"momentum",method:"technical",amount:2},duration:1,text:"Start the match with +2 Technical Momentum."}],
  "trish-stratus":[{name:"Trish Stratus Stratusfaction T-Shirt",category:"t-shirt"},{name:"Trish Stratus 8x10 Entrance Photo",category:"photo",effect:{type:"adrenaline",amount:1},duration:5,text:"Start each match with +1 Adrenaline."},{name:"Trish Stratus Funko Pop",category:"funko",effect:{type:"hp",amount:5},duration:3,text:"Start each match with +5 HP."}],
  "rey-mysterio":[{name:"Rey Mysterio 619 T-Shirt",category:"t-shirt"},{name:"Rey Mysterio Replica Mask",category:"signature",effect:{type:"momentum",method:"agility",amount:2},duration:1,text:"Start the match with +2 Agility Momentum."}],
  "the-undertaker":[{name:"The Undertaker Deadman T-Shirt",category:"t-shirt"},{name:"The Undertaker Urn",category:"signature",effect:{type:"shield",multiplier:.5},duration:5,text:"Shield: take half damage from the first Move that Connects against you."}],
  "the-rock":[{name:"The Rock Brahma Bull T-Shirt",category:"t-shirt"},{name:"The Rock Funko Pop",category:"funko",effect:{type:"adrenaline",amount:1},duration:5,text:"Start each match with +1 Adrenaline."}],
  "the-rock-attitude":[{name:"The Rock Brahma Bull T-Shirt",category:"t-shirt"},{name:"The Rock Funko Pop",category:"funko",effect:{type:"adrenaline",amount:1},duration:5,text:"Start each match with +1 Adrenaline."}],
  "hulk-hogan":[{name:"Hulk Hogan Hulkamania T-Shirt",category:"t-shirt"},{name:"Hulk Hogan Bandana",category:"signature",effect:{type:"hp",amount:5},duration:3,text:"Start each match with +5 HP."}],
  "randy-savage":[{name:"Randy Savage Macho Man T-Shirt",category:"t-shirt"},{name:"Randy Savage Sunglasses",category:"signature",effect:{type:"adrenaline",amount:2},duration:1,text:"Start the match with +2 Adrenaline."}],
  "cm-punk":[{name:"CM Punk Best in the World T-Shirt",category:"t-shirt"},{name:"CM Punk Funko Pop",category:"funko",effect:{type:"adrenaline",amount:1},duration:5,text:"Start each match with +1 Adrenaline."}],
  "cody-rhodes":[{name:"Cody Rhodes American Nightmare T-Shirt",category:"t-shirt"},{name:"Cody Rhodes Weight Belt",category:"signature",effect:{type:"momentum",method:"strength",amount:1},duration:5,text:"Start each match with +1 Strength Momentum."}],
  "roman-reigns":[{name:"Roman Reigns OTC T-Shirt",category:"t-shirt"},{name:"Roman Reigns Ula Fala",category:"signature",effect:{type:"hp",amount:5},duration:3,text:"Start each match with +5 HP."}],
  "shawn-michaels":[{name:"Shawn Michaels Heartbreak Kid T-Shirt",category:"t-shirt"},{name:"Shawn Michaels Heartbreak Kid Sunglasses",category:"signature",effect:{type:"momentum",method:"agility",amount:1},duration:5,text:"Start each match with +1 Agility Momentum."}],
  "triple-h":[{name:"Triple H The Game T-Shirt",category:"t-shirt"},{name:"Triple H Sledgehammer",category:"signature",effect:{type:"momentum",method:"strength",amount:2},duration:1,text:"Start the match with +2 Strength Momentum."}]
});
function standardSpec(star,type){ const method=primaryMethod(star); return type==="figure"
  ? {name:`${star.name} Action Figure`,category:"action-figure",effect:{type:"momentum",method,amount:1},duration:3,text:`Start each match with +1 ${labelMethod(method)} Momentum.`}
  : {name:`${star.name} T-Shirt`,category:"t-shirt",effect:{type:"hp",amount:2},duration:5,text:"Start each match with +2 HP."}; }
function normalizeExtra(star,spec){ if(spec.effect)return spec; if(spec.category==="t-shirt")return {...spec,effect:{type:"hp",amount:3},duration:3,text:"Start each match with +3 HP."}; return {...spec,effect:{type:"adrenaline",amount:1},duration:3,text:"Start each match with +1 Adrenaline."}; }
export const SUPERSTAR_MERCH = Object.freeze(Object.values(superstars).flatMap(star=>{
  const specs=[standardSpec(star,"shirt"),standardSpec(star,"figure"),...(STAR_EXTRAS[star.id]??[]).map(spec=>normalizeExtra(star,spec))];
  const seen=new Set();
  return specs.filter(spec=>{const key=spec.name.toLowerCase();if(seen.has(key))return false;seen.add(key);return true;}).map((spec,index)=>merchCard({
    id:`merch-${star.id}-${String(index+1).padStart(2,"0")}-${slug(spec.name.replace(`${star.name} `,""))}`,name:spec.name,category:spec.category,scope:"superstar",superstarId:star.id,setId:star.setId,
    rarity:spec.category==="signature"?4:spec.category==="funko"?3:2,duration:spec.duration??3,effect:spec.effect,merchLevel:index+1,rulesText:`${star.name} Merch. ${spec.text}`,
    sourceNote:index<2?"Locked universal Superstar merch rule: one T-shirt + one action figure":"Curated Superstar-specific merch/history audit"
  }));
}));

export const MERCH_ITEMS = Object.freeze([...GENERIC_MERCH,...SUPERSTAR_MERCH]);
export const MERCH_BY_ID = Object.freeze(Object.fromEntries(MERCH_ITEMS.map(item=>[item.id,item])));
export const merchForSuperstar = superstarId => SUPERSTAR_MERCH.filter(item=>item.superstarId===superstarId);
export function eligibleMerchForSet(setId){ return [...GENERIC_MERCH,...SUPERSTAR_MERCH.filter(item=>item.setId===setId)]; }
// Every booster contains exactly one Merch card. Monthly Reward Superstar
// merch is part of the normal booster Merch chase even though the Reward
// Superstar/gameplay cards themselves are never booster-eligible.
export const BOOSTER_MERCH_SUPERSTAR_IDS = Object.freeze(["trish-stratus"]);
export const SCHEDULED_BOOSTER_MERCH = Object.freeze({"aj-styles":"2026-10-01T00:00:00Z"});
export function boosterMerchSuperstarIds(now=new Date()){
  const t=new Date(now).getTime();
  return [...BOOSTER_MERCH_SUPERSTAR_IDS,...Object.entries(SCHEDULED_BOOSTER_MERCH).filter(([,at])=>t>=new Date(at).getTime()).map(([id])=>id)];
}
export function boosterSuperstarMerchPool(setId,now=new Date()){
  const scheduled=new Set(boosterMerchSuperstarIds(now));
  return SUPERSTAR_MERCH.filter(item=>item.setId===setId || scheduled.has(item.superstarId));
}
export function rollMerch(setId,rng=Math.random,now=new Date()){
  const starPool=boosterSuperstarMerchPool(setId,now);
  const useStar=starPool.length>0 && rng()<.25;
  const pool=useStar?starPool:GENERIC_MERCH;
  return pool[Math.max(0,Math.min(pool.length-1,Math.floor(rng()*pool.length)))];
}
export function grantMerch(profile,itemOrId,amount=1){
  const item=typeof itemOrId==="string"?MERCH_BY_ID[itemOrId]:itemOrId;
  if(!profile||!item) return 0;
  profile.ownedMerch??={};
  profile.ownedMerch[item.id]=Math.max(0,Number(profile.ownedMerch[item.id])||0)+Math.max(1,Math.floor(Number(amount)||1));
  return profile.ownedMerch[item.id];
}
export function merchEligibilityForSuperstar(starOrId,itemOrId){
  const star=typeof starOrId==="string"?STAR_BY_ID.get(starOrId):starOrId;
  const item=typeof itemOrId==="string"?MERCH_BY_ID[itemOrId]:itemOrId;
  if(!star||!item) return {legal:false,reason:"Merch or Superstar unavailable"};
  if(item.superstarId&&item.superstarId!==star.id){
    const owner=STAR_BY_ID.get(item.superstarId)?.name??item.superstarId;
    return {legal:false,reason:`${owner}-specific Merch`};
  }
  const effect=item.effect??{};
  if(effect.type!=="momentum") return {legal:true,reason:"Valid Merch"};
  const method=String(effect.method??"").toLowerCase();
  if(!METHODS.includes(method)) return {legal:false,reason:"Invalid Momentum Method"};
  const label=method[0].toUpperCase()+method.slice(1);
  const limit=star.methodLimits?.[method];
  const amount=Math.max(0,Number(effect.amount)||0);
  if(limit===0) return {legal:false,reason:`${star.name} cannot use ${label} Momentum`};
  if(Number.isFinite(limit)&&amount>limit) return {legal:false,reason:`Grants +${amount} ${label} Momentum · ${star.name} limit ${limit}`};
  return {legal:true,reason:`Compatible with ${star.name}'s ${label} limit`};
}
export function activeMerchSuperstarId(profile){
  const active=profile?.activeMerch;
  const item=active?.id?MERCH_BY_ID[active.id]:null;
  if(!item) return null;
  return active.superstarId??item.superstarId??profile?.starterId??null;
}
export function equipMerch(profile,id,superstarId=null){
  const item=MERCH_BY_ID[id]; if(!profile||!item) throw new Error("Merch item not found.");
  if(profile.activeMerch?.id) throw new Error("Finish or discard your active Merch before equipping another item.");
  const targetId=item.superstarId??superstarId;
  if(!targetId) throw new Error("Choose an eligible Superstar in Deck Lab before equipping Generic Merch.");
  const star=STAR_BY_ID.get(targetId);
  if(!star||(profile.unlockedSuperstars??[]).includes(targetId)===false) throw new Error(`Unlock ${star?.name??targetId} before using this Merch.`);
  const eligibility=merchEligibilityForSuperstar(star,item);
  if(!eligibility.legal) throw new Error(eligibility.reason);
  const owned=Math.max(0,Number(profile.ownedMerch?.[id])||0); if(owned<1) throw new Error("You do not own this Merch.");
  profile.ownedMerch[id]=owned-1;
  profile.activeMerch={id,superstarId:targetId,remainingMatches:item.duration,equippedAt:new Date().toISOString()};
  return profile.activeMerch;
}
export function discardActiveMerch(profile){ if(!profile) return null; const old=profile.activeMerch??null; profile.activeMerch=null; return old; }
export function activeMerchItem(profile,superstarId=null){
  const active=profile?.activeMerch; const item=active?.id?MERCH_BY_ID[active.id]:null;
  if(!item) return null;
  const targetId=activeMerchSuperstarId(profile);
  if(superstarId){
    if(targetId!==superstarId) return null;
    if(!merchEligibilityForSuperstar(superstarId,item).legal) return null;
  }
  return {...item,remainingMatches:Math.max(0,Number(active.remainingMatches)||0),equippedSuperstarId:targetId};
}
export function merchMatchModifier(profile,superstarId=""){ const item=activeMerchItem(profile,superstarId); if(!item)return null; const e=item.effect??{}; const out={name:item.name,ruleText:item.rulesText,startingMomentum:{p1:{}},startingAdrenaline:{},startingHpBonus:{},firstMoveDamageMultiplier:{}}; if(e.type==="hp")out.startingHpBonus.p1=e.amount??0; if(e.type==="momentum")out.startingMomentum.p1[e.method]=e.amount??1; if(e.type==="adrenaline")out.startingAdrenaline.p1=e.amount??1; if(e.type==="shield")out.firstMoveDamageMultiplier.p1=e.multiplier??.5; return out; }
export function consumeActiveMerchMatch(profile){ const a=profile?.activeMerch;if(!a?.id)return null; a.remainingMatches=Math.max(0,(Number(a.remainingMatches)||0)-1); const item=MERCH_BY_ID[a.id]??null; if(a.remainingMatches<=0)profile.activeMerch=null; return {item,remainingMatches:a.remainingMatches}; }
