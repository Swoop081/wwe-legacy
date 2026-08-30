import { superstars } from "./superstars.js?v=1.1.45";

const METHODS = ["strength", "strike", "technical", "agility"];
const STAR_BY_ID = new Map(Object.values(superstars).map(star => [star.id, star]));
const slug = value => String(value ?? "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const primaryMethod = star => METHODS.filter(m => star?.methodLimits?.[m] !== 0).sort((a,b)=>(Number(star?.starterMomentum?.[b]??0)-Number(star?.starterMomentum?.[a]??0)) || METHODS.indexOf(a)-METHODS.indexOf(b))[0] ?? "strength";
const merchCard = ({id,name,scope="generic",superstarId=null,setId=null,rarity=1,duration=3,effect,rulesText,merchLevel=null}) => Object.freeze({
  id,name,kind:"merch",scope,superstarId,setId,rarity,duration,effect,rulesText,merchLevel,
  subtitle:`MERCH · ${duration} MATCH${duration===1?"":"ES"}`,
  boosterEligible:true,
  cardCode:`MERCH-${slug(id).toUpperCase()}`
});

const GENERIC_NAMES = [
  "WWE Legacy T-Shirt","Replica Championship","Collector Figure","Foam Finger","Wristbands","Entrance Towel","Snapback Cap","Arena Poster","Logo Hoodie","Replica Gloves",
  "Tour Program","Collector Pin","Mini Championship","Superstar Mug","Ring Apron Patch","Event Pennant","Training Tee","Fan Scarf","Replica Boots","Collector Standee",
  "Premium Lanyard","Legacy Backpack","Souvenir Jacket","Signed-Style Print","Ring Bell Miniature","Championship Keyring","Arena Flag","Collector Coin","Superstar Socks","Legacy Beanie",
  "Event Shirt","Photo Card Set","WWE Legacy Bottle","Replica Armband","Premium Poster","Collector Plaque","Foam Championship","Legacy Track Jacket","Mini Figure","Event Wristband"
];
const genericEffects = [
  {effect:{type:"hp",amount:2},duration:5,text:"Start each match with +2 HP."},
  {effect:{type:"hp",amount:3},duration:3,text:"Start each match with +3 HP."},
  {effect:{type:"momentum",method:"strength",amount:1},duration:3,text:"Start each match with +1 Strength Momentum."},
  {effect:{type:"momentum",method:"strike",amount:1},duration:3,text:"Start each match with +1 Strike Momentum."},
  {effect:{type:"momentum",method:"technical",amount:1},duration:3,text:"Start each match with +1 Technical Momentum."},
  {effect:{type:"momentum",method:"agility",amount:1},duration:3,text:"Start each match with +1 Agility Momentum."},
  {effect:{type:"adrenaline",amount:1},duration:1,text:"Start the match with +1 Adrenaline."},
  {effect:{type:"shield",multiplier:.5},duration:1,text:"Shield: take half damage from the first Move that Connects against you."}
];
export const GENERIC_MERCH = Object.freeze(GENERIC_NAMES.map((name,index)=>{
  const spec=genericEffects[index%genericEffects.length];
  return merchCard({id:`merch-generic-${String(index+1).padStart(3,"0")}-${slug(name)}`,name,rarity:index%10===9?3:index%3===2?2:1,duration:spec.duration,effect:spec.effect,rulesText:spec.text});
}));

const DEFAULT_SPECIFIC_MERCH_NAMES = Object.freeze({
  1: "Funko Pop",
  2: "Collector Figure",
  3: "Replica Gear",
  4: "Premium Wristbands",
  5: "Limited Poster"
});
const SUPERSTAR_MERCH_NAME_OVERRIDES = Object.freeze({
  "trish-stratus": Object.freeze({
    1: "Trish Stratus Funko Pop",
    2: "Trish's Big Shots Pillow",
    3: "100% Stratusfaction Guaranteed DVD",
    4: "Trish's Action Figure",
    5: "100% Stratusfaction Shirt"
  })
});
function specificMerchName(star, level){
  const override=SUPERSTAR_MERCH_NAME_OVERRIDES[star.id]?.[level];
  if(override) return override;
  return `${star.name} ${DEFAULT_SPECIFIC_MERCH_NAMES[level] ?? `Merch Level ${level}`}`;
}
export const SUPERSTAR_MERCH = Object.freeze(Object.values(superstars).flatMap(star=>{
  const method=primaryMethod(star);
  // The five-level Superstar ladder is authored by identity. Level 1 is the
  // universal Funko Pop slot; levels 2–5 can be replaced with Superstar-specific
  // real-world merchandise as each wrestler's art is produced.
  const specs=[
    {level:1,effect:{type:"hp",amount:5},duration:3,text:`Start each match with +5 HP.`},
    {level:2,effect:{type:"momentum",method,amount:1},duration:5,text:`Start each match with +1 ${method[0].toUpperCase()+method.slice(1)} Momentum.`},
    {level:3,effect:{type:"adrenaline",amount:1},duration:5,text:"Start each match with +1 Adrenaline."},
    {level:4,effect:{type:"shield",multiplier:.5},duration:3,text:"Shield: take half damage from the first Move that Connects against you."},
    {level:5,effect:{type:"momentum",method,amount:2},duration:1,text:`Premium boost: start the match with +2 ${method[0].toUpperCase()+method.slice(1)} Momentum.`}
  ];
  return specs.map((spec,index)=>merchCard({
    id:`merch-${star.id}-${spec.level}-${slug(specificMerchName(star,spec.level).replace(`${star.name} `,""))}`,
    name:specificMerchName(star,spec.level),
    scope:"superstar",superstarId:star.id,setId:star.setId,rarity:spec.level>=4?4:3,duration:spec.duration,effect:spec.effect,merchLevel:spec.level,
    rulesText:`${star.name} Merch. ${spec.text}`
  }));
}));

export const MERCH_ITEMS = Object.freeze([...GENERIC_MERCH,...SUPERSTAR_MERCH]);
export const MERCH_BY_ID = Object.freeze(Object.fromEntries(MERCH_ITEMS.map(item=>[item.id,item])));
export const merchForSuperstar = superstarId => SUPERSTAR_MERCH.filter(item=>item.superstarId===superstarId);
export function eligibleMerchForSet(setId){ return [...GENERIC_MERCH,...SUPERSTAR_MERCH.filter(item=>item.setId===setId)]; }
export function rollMerch(setId,rng=Math.random){
  const starPool=SUPERSTAR_MERCH.filter(item=>item.setId===setId);
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
