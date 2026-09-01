// v1.1.69 Full Card Identity pass
// Separates card identity from later competitive balance: clone-heavy authored
// stat lines are spread across a broader move hierarchy without rewriting the
// card's core effect, requirements, counter state or wrestling identity.

const stableHash = value => {
  let h = 2166136261;
  for (const ch of String(value ?? '')) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
};
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const sortedObject = obj => Object.fromEntries(Object.entries(obj ?? {}).sort(([a],[b])=>a.localeCompare(b)));
const effectSignature = card => JSON.stringify({
  rarity:card.rarity, method:card.method??null, moveType:card.moveType??null,
  requirements:sortedObject(card.requirements), groundOpponent:!!card.groundOpponent,
  groundedOnly:!!card.groundedOnly, standingOnly:!!card.standingOnly, stun:Number(card.stun)||0,
  selfDamage:Number(card.selfDamage)||0, finisher:!!card.finisher, trademark:!!card.trademark,
  submission:card.submission??null, bodyDamage:card.bodyDamage??null, effects:card.effects??[],
  defensiveOnly:!!card.defensiveOnly, counterState:card.counterState??null,
  counterStates:[...(card.counterStates??[])].sort(), searchOnConnectName:card.searchOnConnectName??null,
  searchOnConnectDiscount:card.searchOnConnectDiscount??null,
  opponentAdrenalineOnConnect:card.opponentAdrenalineOnConnect??null,
  pinKickoutPenalty:card.pinKickoutPenalty??null
});

const variationPattern = [
  {cost:-1,damage:-1},{cost:0,damage:-1},{cost:0,damage:0},{cost:0,damage:1},
  {cost:1,damage:1},{cost:-1,damage:1},{cost:1,damage:-1},{cost:-1,damage:0},
  {cost:1,damage:0},{cost:0,damage:2},{cost:0,damage:-2},{cost:-2,damage:0}
];

function limits(card){
  if(card.defensiveOnly) return {cost:[0,4],damage:[0,3]};
  if(card.moveType==='submission') return {cost:[3,12],damage:[0,0]};
  if(card.finisher) return {cost:[7,12],damage:[12,21]};
  if(card.trademark || card.rarity>=3) return {cost:[1,9],damage:[1,14]};
  if(card.rarity===2) return {cost:[1,7],damage:[1,11]};
  return {cost:[1,6],damage:[1,9]};
}

function broadenCloneGroup(group){
  if(group.length<2) return;
  group.sort((a,b)=>a.id.localeCompare(b.id));
  const baseCost=Number(group[0].cost)||0, baseDamage=Number(group[0].damage)||0;
  group.forEach((card,index)=>{
    const lim=limits(card);
    // Use a shifted pattern per group so repeated templates don't all fan out identically.
    const p=variationPattern[(index + stableHash(group[0].id)) % variationPattern.length];
    let cost=clamp(baseCost+p.cost,lim.cost[0],lim.cost[1]);
    let damage=clamp(baseDamage+p.damage,lim.damage[0],lim.damage[1]);
    if(card.finisher && card.moveType!=='submission'){
      // Finishers should occupy a real hierarchy rather than audit-driven +1 clones.
      const finisherBands=[
        [8,14],[9,15],[9,16],[10,17],[10,18],[11,19],[12,20],[8,17],[11,16]
      ];
      const [c,d]=finisherBands[(index+stableHash(card.id))%finisherBands.length];
      cost=c; damage=d;
    }
    card.identityOriginalCost=Number(card.cost)||0;
    card.identityOriginalDamage=Number(card.damage)||0;
    card.cost=cost;
    card.damage=damage;
    card.identityPass='v1.1.69';
  });
}

function seedMissingLowDamage(moves){
  // Ensure the full numerical vocabulary exists. Choose simple, non-exclusive
  // Common/Uncommon moves so tiny damage values represent setup moves rather
  // than weakening signatures/finishers.
  const candidates=moves.filter(c=>!c.finisher&&!c.trademark&&!c.superstarId&&!c.defensiveOnly&&c.moveType!=='submission')
    .sort((a,b)=>(stableHash(a.id)-stableHash(b.id))||a.id.localeCompare(b.id));
  const desired=[1,2,3,4,5,6,7,8,9,10,11,12];
  for(const damage of desired){
    if(moves.some(c=>Number(c.damage)===damage)) continue;
    const card=candidates.shift(); if(!card) break;
    card.identityOriginalCost ??= Number(card.cost)||0;
    card.identityOriginalDamage ??= Number(card.damage)||0;
    card.damage=damage;
    card.cost=clamp(Math.ceil(damage/2),1,7);
    card.identityPass='v1.1.69';
  }
}

export function applyCardIdentityPass(cards=[]){
  const moves=cards.filter(c=>c?.kind==='move');
  const groups=new Map();
  for(const card of moves){
    // Cost and damage intentionally included: we're identifying mechanically
    // identical stat/effect shells, not merely cards that share an effect.
    const key=JSON.stringify({cost:card.cost,damage:card.damage,sig:effectSignature(card)});
    if(!groups.has(key)) groups.set(key,[]);
    groups.get(key).push(card);
  }
  for(const group of groups.values()) broadenCloneGroup(group);
  seedMissingLowDamage(moves);

  // Give every move an explicit stable tier-growth profile. This guarantees
  // future balancing can tune one card without reverting to rarity templates.
  const scalableEffectTypes=new Set(['drawSelf','discardOpponent','gainAdrenaline','loseOpponentAdrenaline','bodyPressure','discountNextByName','discountNextMethod','discountNextMoveType','search','buffNextByName']);
  for(const card of moves){
    const hasScalableEffect=!!card.submission || (card.effects??[]).some(e=>scalableEffectTypes.has(e.type));
    const profiles=hasScalableEffect?['damage','efficiency','hybrid','effect']:['damage','efficiency','hybrid'];
    card.tierGrowthProfile=profiles[stableHash(card.id)%profiles.length];
    card.authoredCost=Number(card.cost)||0;
    card.authoredDamage=Number(card.damage)||0;
  }
  return cards;
}

export function finalizeCardIdentityPass(cards=[]){
  const moves=cards.filter(c=>c?.kind==='move').sort((a,b)=>a.id.localeCompare(b.id));
  const sig=card=>JSON.stringify({
    cost:card.cost,damage:card.damage,rarity:card.rarity,method:card.method??null,moveType:card.moveType??null,
    requirements:sortedObject(card.requirements),groundOpponent:!!card.groundOpponent,groundedOnly:!!card.groundedOnly,
    standingOnly:!!card.standingOnly,stun:Number(card.stun)||0,selfDamage:Number(card.selfDamage)||0,
    effects:card.effects??[],submission:card.submission??null,bodyDamage:card.bodyDamage??null,
    counterState:card.counterState??null,counterStates:[...(card.counterStates??[])].sort(),
    defensiveOnly:!!card.defensiveOnly,finisher:!!card.finisher,trademark:!!card.trademark
  });
  const seen=new Set();
  const deltas=[[0,0],[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,1],[1,-1],[-1,-1],[0,2],[2,0],[0,-2],[-2,0]];
  for(const card of moves){
    if(!seen.has(sig(card))){seen.add(sig(card));continue;}
    const lim=limits(card),baseCost=Number(card.cost)||0,baseDamage=Number(card.damage)||0;
    let resolved=false;
    for(const [dc,dd] of deltas.slice(1)){
      const nextCost=clamp(baseCost+dc,lim.cost[0],lim.cost[1]);
      const nextDamage=card.moveType==='submission'?0:clamp(baseDamage+dd,lim.damage[0],lim.damage[1]);
      const oldCost=card.cost,oldDamage=card.damage;
      card.cost=nextCost; card.damage=nextDamage;
      if(!seen.has(sig(card))){resolved=true;break;}
      card.cost=oldCost; card.damage=oldDamage;
    }
    if(!resolved){
      // Extremely unlikely fallback: a one-point cost shift keeps the move legal
      // while guaranteeing a separate authored shell.
      card.cost=clamp(baseCost+1,lim.cost[0],lim.cost[1]);
    }
    card.authoredCost=Number(card.cost)||0;
    card.authoredDamage=Number(card.damage)||0;
    card.identityPass='v1.1.69';
    seen.add(sig(card));
  }
  return cards;
}
