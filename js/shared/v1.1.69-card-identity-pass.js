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
    const p=variationPattern[(index + stableHash(group[0].id)) % variationPattern.length];
    let cost=clamp(baseCost+p.cost,lim.cost[0],lim.cost[1]);
    let damage=clamp(baseDamage+p.damage,lim.damage[0],lim.damage[1]);
    if(card.finisher && card.moveType!=='submission'){
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

const scalableEffectTypes=new Set([
  'drawSelf','discardOpponent','gainAdrenaline','loseOpponentAdrenaline','bodyPressure',
  'discountNextByName','discountNextMethod','discountNextMoveType','search','buffNextByName'
]);

function hasScalableMoveEffect(card){
  return !!card?.submission || (card?.effects??[]).some(effect=>scalableEffectTypes.has(effect?.type));
}

function auditedTierGrowthProfile(card){
  if(card?.moveType==='submission' || card?.submission) return 'submission';
  if(card?.finisher) return 'damage';
  if(card?.defensiveOnly) return 'efficiency';
  const cost=Number(card?.cost)||0;
  const damage=Number(card?.damage)||0;
  const scalable=hasScalableMoveEffect(card);
  if(card?.trademark) return 'hybrid';
  if(damage>=8) return 'damage';
  if(!scalable && damage<=4 && cost>=3) return 'efficiency';
  return 'hybrid';
}

const APPROVED_AUDIT_OVERRIDES = Object.freeze({
  // SHARED_FIVE_TIER_BATCH_16_V11218 — wrestler-specific ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.
  'blake-monroe-monroe-kick': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'trick-williams-book-end': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'trick-williams-cyclone-boot': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'jacy-jayne-cannonball-senton': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'jacy-jayne-discus-boot': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'jacy-jayne-running-knee-smash': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'kendal-grey-olympic-takedown': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'kendal-grey-rolling-german-suplex': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'tony-dangelo-family-spinebuster': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'tony-dangelo-fisherman-buster': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'jaida-parker-hipnotic': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'jaida-parker-running-hip-attack': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'kelani-jordan-handspring-elbow': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'kelani-jordan-springboard-cutter': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'kelani-jordan-450-splash': {printingStats:{base:{cost:8,damage:9},emerald:{cost:8,damage:10},sapphire:{cost:7,damage:11},ruby:{cost:7,damage:11},amethyst:{cost:7,damage:12}}},
  'mason-rook-fallaway-slam': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'mason-rook-corner-big-boot': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'mason-rook-checkmate-slam': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'tatum-paxley-bridging-german-suplex': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'lexis-king-superkick': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},

  // SHARED_FIVE_TIER_BATCH_15_V11217 — wrestler-specific ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.
  'kevin-owens-swanton-bomb': {printingStats:{base:{cost:8,damage:9},emerald:{cost:8,damage:10},sapphire:{cost:7,damage:11},ruby:{cost:7,damage:11},amethyst:{cost:7,damage:12}}},
  'gunther-folding-powerbomb': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'sol-ruca-avalanche-x-factor': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'chelsea-green-rough-ryder': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'austin-theory-ataxia': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'austin-theory-rolling-thunder-blockbuster': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'austin-theory-patella-brainbuster': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'montez-ford-blockbuster': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'lola-vice-running-hip-attack': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'dragon-lee-operation-dragon': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'dragon-lee-incinerator': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'dragon-lee-double-foot-stomp': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'vikingo-mexican-destroyer': {printingStats:{base:{cost:8,damage:9},emerald:{cost:8,damage:10},sapphire:{cost:7,damage:11},ruby:{cost:7,damage:11},amethyst:{cost:7,damage:12}}},
  'vikingo-top-rope-poison-rana': {printingStats:{base:{cost:8,damage:9},emerald:{cost:8,damage:10},sapphire:{cost:7,damage:11},ruby:{cost:7,damage:11},amethyst:{cost:7,damage:12}}},
  'mr-iguana-iguanarana': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'mr-iguana-pongase-verde': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'chris-jericho-lionsault': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'chris-jericho-breakdown': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'john-cena-five-knuckle-shuffle': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'blake-monroe-glamour-ddt': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},

  // SHARED_FIVE_TIER_BATCH_14_V11216 — wrestler-specific ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.
  'the-undertaker-old-school': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'cody-rhodes-disaster-kick': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'liv-morgan-jersey-codebreaker': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'brock-lesnar-brocks-german': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'logan-paul-prime-splash': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'sol-ruca-springboard-splash': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'chad-gable-moonsault': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'raquel-rodriguez-big-boot': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'raquel-rodriguez-corkscrew-splash': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'three-amigos': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'penta-handstand-dropkick': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'el-grande-americano-jumping-headbutt': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'tiffany-stratton-handspring-back-elbow': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'running-knees-to-the-back': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'chelsea-green-missile-dropkick': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'randy-orton-draping-ddt': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'roxanne-perez-russian-leg-sweep': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'roxanne-perez-meteora': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'montez-ford-spinebuster': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'lola-vice-spinning-heel-kick': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},

  // SHARED_FIVE_TIER_BATCH_13_V11215 — wrestler-specific ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.
  'flair-chop': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'kane-flying-clothesline': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'kane-two-handed-choke-lift': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'the-undertaker-running-big-boot': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'the-undertaker-snake-eyes': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'ultimate-warrior-clothesline': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'ultimate-warrior-diving-shoulder-block': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'ultimate-warrior-gorilla-press-slam': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'rhea-ripley-electric-chair-facebuster': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'rhea-ripley-reverse-alabama-slam': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'cody-rhodes-dropdown-uppercut': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'cody-rhodes-bionic-elbow': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'oba-femi-running-elbow': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'oba-femi-one-handed-backbreaker': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'stone-cold-steve-austin-pointed-elbow-drop': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'stone-cold-steve-austin-mudhole-stomps': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'stone-cold-steve-austin-lou-thesz-press': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'gunther-gunther-s-chop': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'gunther-front-dropkick': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'gunther-burning-lariat': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},

  // SHARED_FIVE_TIER_BATCH_12_V11214 — ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.
  'iyo-sky-bullet-train-attack': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'mankind-clothesline': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'mankind-cactus-elbow': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'mankind-double-arm-ddt': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'hogans-big-boot': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'middle-rope-stunner': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'springboard-clothesline': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'diving-elbow-drop': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'cm-punk-corner-running-knee': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'paige-superkick': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'paige-rope-hung-knee-strikes': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'seth-rollins-turnbuckle-sto': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'seth-rollins-springboard-knee': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'ripcord-knee': {printingStats:{base:{cost:6,damage:7},emerald:{cost:6,damage:8},sapphire:{cost:5,damage:9},ruby:{cost:5,damage:9},amethyst:{cost:5,damage:10}}},
  'seth-rollins-buckle-bomb': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'andre-the-giant-headbutt': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'stephanie-vaquer-dragon-screw': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'stephanie-vaquer-svb': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'stephanie-vaquer-devils-kiss': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'randy-savage-machos-double-axe-handle': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},

  // SHARED_FIVE_TIER_BATCH_11_V11213 — ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.
  'mr-perfect-dropkick': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'mr-perfect-neck-snap': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'mr-perfect-knee-lift': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'triple-h-high-knee': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'triple-h-knee-facebuster': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'triple-h-spinebuster': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'fist-drop': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'chris-jericho-one-handed-bulldog': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'springboard-dropkick': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'single-leg-takedown': {printingStats:{base:{cost:4,damage:2},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:4},amethyst:{cost:3,damage:5}}},
  'kurt-angle-three-german-suplexes': {printingStats:{base:{cost:8,damage:9},emerald:{cost:8,damage:10},sapphire:{cost:7,damage:11},ruby:{cost:7,damage:11},amethyst:{cost:7,damage:12}}},
  'kurt-angle-moonsault': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'waistlock-takedown': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'the-rock-attitude-spinebuster': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'the-rock-attitude-lay-the-smack-down': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'john-cena-protobomb': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'shinsuke-nakamura-inverted-exploder': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'shinsuke-nakamura-landslide': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'shinsuke-nakamura-sliding-german-suplex': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'blake-monroe-glamour-shot': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},

  // SHARED_FIVE_TIER_BATCH_10_V11212 — ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.
  'fisherman-buster': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'leg-kick': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'spinning-back-kick': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'scissors-kick': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'top-rope-splash': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'bret-hart-inverted-atomic-drop': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'bret-hart-pendulum-backbreaker': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'bret-hart-second-rope-elbow-drop': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'shawn-michaels-flying-forearm': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'shawn-michaels-teardrop-suplex': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'shawn-michaels-top-rope-elbow-drop': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'razor-ramon-fallaway-slam': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'yokozuna-running-leg-drop': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'rowdy-roddy-piper-eye-poke': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'rowdy-roddy-piper-punch-combination': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'rowdy-roddy-piper-bulldog': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'ted-dibiase-million-dollar-fist-drop': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'ted-dibiase-backbreaker': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'ted-dibiase-piledriver': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'jake-roberts-short-arm-clothesline': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},

  // SHARED_FIVE_TIER_BATCH_9_V11211 — ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.
  'razor-ramon-bulldog': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'diesel-snake-eyes': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'diesel-big-boot': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'diesel-sidewalk-slam': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'doink-drop-toe-hold': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'doink-flying-body-press': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'yokozuna-savate-kick': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'yokozuna-belly-to-belly-suplex': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'dropkick-to-the-knee': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'owen-hart-enzuigiri': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'owen-hart-dragon-suplex': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'owen-hart-missile-dropkick': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'wheel-kick': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'gutbuster': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'bridging-german-suplex': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'step-up-enzuigiri': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'spinning-heel-kick': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'british-bulldog-delayed-vertical-suplex': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'british-bulldog-military-press-slam': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'knee-facebuster': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},

  // SHARED_FIVE_TIER_BATCH_8_V11210 — shared ordinary offensive Moves; reversals, submissions and special-case 619 excluded.
  'jawbreaker': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'corner-avalanche': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'leaping-rope-clothesline': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'cannonball': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'spinning-torture-rack-neckbreaker': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'front-backbreaker': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'biel-toss': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'reverse-elbow': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'running-uppercut': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'gorilla-press-slam': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'corner-shoulder-thrusts': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'ground-and-pound': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'clothesline-over-the-top-rope': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'dragon-screw': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'apron-german-suplex': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'brainbuster': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'pump-kick': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'cutter': {printingStats:{base:{cost:6,damage:7},emerald:{cost:6,damage:8},sapphire:{cost:5,damage:9},ruby:{cost:5,damage:9},amethyst:{cost:5,damage:10}}},
  'finlay-roll': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'swanton-bomb': {printingStats:{base:{cost:8,damage:9},emerald:{cost:8,damage:10},sapphire:{cost:7,damage:11},ruby:{cost:7,damage:11},amethyst:{cost:7,damage:12}}},

  // SHARED_FIVE_TIER_BATCH_7_V11209 — shared ordinary offensive Moves; reversals, submissions and 619 excluded.
  'blockbuster': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'falcon-arrow': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'back-elbow': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'double-axe-handle': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'mounted-punches': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'elbow': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'senton-splash': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'headlock-takeover': {printingStats:{base:{cost:4,damage:2},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:4},amethyst:{cost:3,damage:5}}},
  'monkey-flip': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'eye-rake': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'hair-pull-takedown': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'back-rake': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'forearm-club': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'club-to-the-back': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'running-body-avalanche': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'hammerlock-takedown': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'running-knee-lift': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'shoulder-breaker': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'front-powerslam': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'arm-wringer': {printingStats:{base:{cost:4,damage:2},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:4},amethyst:{cost:3,damage:5}}},

  // SHARED_FIVE_TIER_BATCH_6_V11208 — post-Batch-5 ordinary offensive pool; reversals and submissions excluded.
  'forearm-smash': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'diving-body-press': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'flying-clothesline': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'northern-lights-suplex': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'double-leg-takedown': {printingStats:{base:{cost:4,damage:2},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:4},amethyst:{cost:3,damage:5}}},
  'overhead-belly-to-belly-suplex': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'butterfly-suplex': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'asai-moonsault': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'drop-toe-hold': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'low-blow': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'front-dropkick': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'schoolboy-roll-up': {printingStats:{base:{cost:4,damage:2},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:4},amethyst:{cost:3,damage:5}}},
  'elbow-smash': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'high-knee': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'meteora': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'double-stomp': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'double-underhook-backbreaker': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'sunset-flip-powerbomb': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'swinging-neckbreaker': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'standing-shooting-star-press': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},

  // SHARED_FIVE_TIER_BATCH_5_V11207 — next coherent ordinary Move group; defensive/reversal/submission cards excluded.
  'hotshot': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'side-suplex': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'senton': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'running-shoulder-block': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'running-powerslam': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'running-knee': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'military-press-slam': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'knee-to-the-gut': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'knee-breaker': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'kick-to-the-gut': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'front-kick': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'backhand-chop': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'uppercut': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'turnbuckle-smash': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'tornado-ddt': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'tilt-a-whirl-backbreaker': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'spanish-fly': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'seated-shotgun-dropkick': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'roundhouse-kick': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'reverse-suplex': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},

  // SHARED_FIVE_TIER_BATCH_4_V11206 — next highest-reuse offensive ordinary Moves; reversals and submissions intentionally excluded.
  'sidewalk-slam': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'sling-blade': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'belly-to-belly-suplex': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'knee-strike': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'short-arm-clothesline': {printingStats:{base:{cost:4,damage:4},emerald:{cost:4,damage:5},sapphire:{cost:3,damage:6},ruby:{cost:3,damage:6},amethyst:{cost:3,damage:7}}},
  'standing-moonsault': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'tope-con-hilo': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  '450-splash': {printingStats:{base:{cost:8,damage:8},emerald:{cost:8,damage:9},sapphire:{cost:7,damage:10},ruby:{cost:7,damage:10},amethyst:{cost:7,damage:11}}},
  'atomic-drop': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'backstabber': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'chop': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'fallaway-slam': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'firemans-carry': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'fisherman-suplex': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'frog-splash': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'hip-toss': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'lariat': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'running-clothesline': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'running-knee-strike': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'standing-dropkick': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},

  // SHARED_FIVE_TIER_BATCH_3_V11205 — highest-reuse ordinary Moves from scoped audit; authored by impact, not formula.
  'superkick': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'body-slam': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'clothesline': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'hurricanrana': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'ddt': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'neckbreaker': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'running-forearm': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'back-suplex': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'back-body-drop': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'springboard-crossbody': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'tilt-a-whirl-headscissors': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'stomp': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'piledriver': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'chokeslam': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'elbow-drop': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'powerslam': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'running-big-boot': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'backbreaker': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'enzuigiri': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'moonsault': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},

  // ROMAN_EXCLUSIVE_FIVE_TIER_V11204 — Roman signature package; preserve card identity/effects.
  'roman-reigns-corner-clotheslines': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'roman-reigns-drive-by': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'roman-reigns-guillotine': {printingStats:{base:{cost:8,damage:0,submission:{pressure:3}},emerald:{cost:8,damage:0,submission:{pressure:4}},sapphire:{cost:7,damage:0,submission:{pressure:4}},ruby:{cost:7,damage:0,submission:{pressure:5}},amethyst:{cost:7,damage:0,submission:{pressure:6}}}},
  'roman-reigns-superman-punch': {printingStats:{base:{cost:8,damage:7},emerald:{cost:8,damage:8},sapphire:{cost:7,damage:9},ruby:{cost:7,damage:9},amethyst:{cost:7,damage:10}}},
  'roman-reigns-spear': {requirements:{},method:null,printingStats:{base:{cost:11,damage:12},emerald:{cost:11,damage:13},sapphire:{cost:10,damage:14},ruby:{cost:10,damage:15},amethyst:{cost:10,damage:16}}},
  // SHARED_FIVE_TIER_BATCH_2_V11203 — Roman-heavy shared pool; authored by move impact, not formula.
  'shoulder-tackle': {cost:2,damage:4,printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:3},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:4}}},
  'throat-thrust': {cost:2,damage:4,printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:3},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:4}}},
  'headbutt': {cost:3,damage:5,printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:5}}},
  'big-boot': {cost:4,damage:6,printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:5},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:6}}},
  'leaping-clothesline': {cost:4,damage:7,printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'samoan-drop': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'uranage': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'spinebuster': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'exploder-suplex': {cost:5,damage:7,printingStats:{base:{cost:6,damage:4},emerald:{cost:6,damage:5},sapphire:{cost:5,damage:6},ruby:{cost:5,damage:6},amethyst:{cost:5,damage:7}}},
  'tilt-a-whirl-slam': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'powerbomb': {cost:6,damage:10,printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  // SHARED_FIVE_TIER_BATCH_1_V11202 — authored global curves; preserve each card's existing requirements/effects.
  'suplex': {cost:3,damage:4,printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:3},ruby:{cost:3,damage:4},amethyst:{cost:3,damage:4}}},
  'vertical-suplex': {cost:4,damage:6,printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:5},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:6}}},
  'knee-drop': {cost:3,damage:5,printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:5}}},
  'russian-leg-sweep': {cost:3,damage:4,printingStats:{base:{cost:4,damage:2},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:3},ruby:{cost:3,damage:4},amethyst:{cost:3,damage:4}}},
  'diving-crossbody': {cost:4,damage:6,printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:5},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:6}}},
  'snap-powerslam': {cost:4,damage:7,printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'bulldog': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'gourdbuster': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'suicide-dive': {cost:5,damage:7,printingStats:{base:{cost:6,damage:4},emerald:{cost:6,damage:5},sapphire:{cost:5,damage:6},ruby:{cost:5,damage:6},amethyst:{cost:5,damage:7}}},
  'pescado': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'top-rope-bulldog': {cost:6,damage:9,printingStats:{base:{cost:7,damage:6},emerald:{cost:7,damage:7},sapphire:{cost:6,damage:8},ruby:{cost:6,damage:8},amethyst:{cost:6,damage:9}}},
  'alabama-slam': {cost:6,damage:10,printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'rear-naked-choke': {cost:6,damage:0,printingStats:{base:{cost:7,damage:0,submission:{bodyPart:'head',pressure:2}},emerald:{cost:7,damage:0,submission:{bodyPart:'head',pressure:3}},sapphire:{cost:6,damage:0,submission:{bodyPart:'head',pressure:3}},ruby:{cost:6,damage:0,submission:{bodyPart:'head',pressure:4}},amethyst:{cost:6,damage:0,submission:{bodyPart:'head',pressure:5}}}},
  // BECKY_FULL_FIVE_TIER_V11201 — shared IDs intentionally global.
  'punch': {cost:1,damage:3,printingStats:{base:{cost:2,damage:2},emerald:{cost:2,damage:2},sapphire:{cost:1,damage:2},ruby:{cost:1,damage:3},amethyst:{cost:1,damage:3}}},
  'arm-drag': {cost:3,damage:4,printingStats:{base:{cost:4,damage:2},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:3},ruby:{cost:3,damage:4},amethyst:{cost:3,damage:4}}},
  'missile-dropkick': {cost:6,damage:9,printingStats:{base:{cost:7,damage:6},emerald:{cost:7,damage:7},sapphire:{cost:6,damage:7},ruby:{cost:6,damage:8},amethyst:{cost:6,damage:9}}},
  'inverted-ddt': {cost:5,damage:7,printingStats:{base:{cost:6,damage:4},emerald:{cost:6,damage:5},sapphire:{cost:5,damage:5},ruby:{cost:5,damage:6},amethyst:{cost:5,damage:7}}},
  'leg-lariat': {cost:4,damage:7,printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:5},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'calf-kick': {cost:3,damage:5,printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:5}}},
  'hammerlock': {cost:3,damage:4,printingStats:{base:{cost:4,damage:2},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:3},ruby:{cost:3,damage:3},amethyst:{cost:3,damage:4}}},
  'european-uppercut': {cost:2,damage:3,printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:2},sapphire:{cost:2,damage:2},ruby:{cost:2,damage:3},amethyst:{cost:2,damage:3}}},
  'snap-suplex': {cost:3,damage:5,printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:5}}},
  'german-suplex': {cost:5,damage:7,printingStats:{base:{cost:6,damage:4},emerald:{cost:6,damage:5},sapphire:{cost:5,damage:5},ruby:{cost:5,damage:6},amethyst:{cost:5,damage:7}}},
  'superplex': {cost:7,damage:11,printingStats:{base:{cost:8,damage:7},emerald:{cost:8,damage:8},sapphire:{cost:7,damage:9},ruby:{cost:7,damage:10},amethyst:{cost:7,damage:11}}},
  'dropkick': {cost:2,damage:3,printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:2},sapphire:{cost:2,damage:2},ruby:{cost:2,damage:3},amethyst:{cost:2,damage:3}}},
  'becky-lynch-diving-leg-drop': {
    name:"Becky’s Diving Leg Drop", trademark:true, cost:6, damage:10,
    requirements:{agility:2}, method:'agility', moveType:'aerial', groundedOnly:true, groundOpponent:true,
    rulesText:"Becky Lynch-exclusive Trademark. Grounded opponent only. Grounds opponent.",
    printingStats:{
      base:{cost:7,damage:7}, emerald:{cost:7,damage:8}, sapphire:{cost:6,damage:8},
      ruby:{cost:6,damage:9}, amethyst:{cost:6,damage:10}
    }
  },
  'becky-lynch-manhandle-slam': {
    cost:9, damage:16, requirements:{}, method:null, finisher:true, groundOpponent:true,
    rulesText:"Becky Lynch-exclusive Finisher. No Method requirement. Grounds opponent.",
    printingStats:{
      base:{cost:10,damage:12}, emerald:{cost:10,damage:13}, sapphire:{cost:9,damage:14},
      ruby:{cost:9,damage:15}, amethyst:{cost:9,damage:16}
    }
  },
  'becky-lynch-dis-arm-her': {
    name:'Dis-arm-her', cost:9, damage:0, requirements:{}, method:null, moveType:'submission',
    submission:{bodyPart:'arms',pressure:6}, finisher:true, trademark:false,
    rulesText:'Becky Lynch-exclusive Finisher Submission. No Method requirement.',
    printingStats:{base:{cost:10,damage:0,submission:{bodyPart:'arms',pressure:3}},emerald:{cost:10,damage:0,submission:{bodyPart:'arms',pressure:4}},sapphire:{cost:9,damage:0,submission:{bodyPart:'arms',pressure:4}},ruby:{cost:9,damage:0,submission:{bodyPart:'arms',pressure:5}},amethyst:{cost:9,damage:0,submission:{bodyPart:'arms',pressure:6}}}
  },
  'chelsea-green-im-prettier': {
    name:'Un-Pretty-Her', cost:10, damage:16, requirements:{}, method:null, finisher:true, groundOpponent:true,
    rulesText:"Chelsea Green-exclusive Finisher. Un-Pretty-Her. No Method requirement. Grounds opponent.",
    printingStats:{
      base:{cost:11,damage:12}, emerald:{cost:11,damage:13}, sapphire:{cost:10,damage:14},
      ruby:{cost:10,damage:15}, amethyst:{cost:10,damage:16}
    }
  },
  'damian-priest-south-of-heaven': {
    name:'South of Heaven', cost:10, damage:16, requirements:{}, method:null, moveType:'grapple',
    finisher:true, trademark:false, groundOpponent:true, groundedOnly:false,
    rulesText:"Damian Priest-exclusive Finisher. South of Heaven. No Method requirement. Grounds opponent.",
    effects:[], searchOnConnectName:null, searchOnConnectDiscount:null, nextFinisherDiscountOnConnect:null,
    printingStats:{
      base:{cost:11,damage:12}, emerald:{cost:11,damage:13}, sapphire:{cost:10,damage:14},
      ruby:{cost:10,damage:15}, amethyst:{cost:10,damage:16}
    }
  },
  'damian-priest-razors-edge': {
    name:"Priest’s Razor’s Edge", cost:8, damage:11, requirements:{strength:3}, method:'strength',
    moveType:'grapple', trademark:true, finisher:false, groundOpponent:true,
    rulesText:"Damian Priest-exclusive Trademark. Priest’s Razor’s Edge. Grounds opponent. On Connect: opponent loses 1 Adrenaline.",
    printingStats:{
      base:{cost:9,damage:8}, emerald:{cost:9,damage:9}, sapphire:{cost:8,damage:9},
      ruby:{cost:8,damage:10}, amethyst:{cost:8,damage:11}
    }
  }
});

function applyApprovedAuditOverride(card){
  const override=APPROVED_AUDIT_OVERRIDES[card?.id];
  if(!override) return;
  Object.assign(card, override);
  card.balanceAuditVersion='v1.1.199';
  card.authenticityAudit='approved-2026-09';
}

const AUTHORED_HIGH_DAMAGE_CURVES=Object.freeze({
  'andre-the-giant-double-underhook-suplex':[7,8,9,10,11],
  'kevin-owens-avalanche-fishermans-buster':[7,8,9,10,11],
  'aj-styles-phenomenal-forearm':[7,8,9,10,11],
  'kevin-owens-package-piledriver':[7,8,9,10,11],
  'rey-fenix-mexican-destroyer':[7,8,9,10,11],
  'baron-corbin-deep-six':[7,8,9,10,11],
  'cody-rhodes-cody-cutter':[7,8,9,10,11],
  'finn-balor-1916':[7,8,9,10,11],
  'jacob-fatu-pop-up-samoan-drop':[7,8,9,10,11],
  'jaida-parker-samoan-drop':[7,8,9,10,11],
  'kane-chokeslam-from-hell':[7,8,9,10,11],
  'last-symphony':[7,8,9,10,11],
  'montez-ford-450-splash':[7,8,9,10,11],
  'nia-jax-avalanche-samoan-drop':[7,8,9,10,11],
  'penta-driver':[7,8,9,10,11],
  'pop-up-powerbomb':[7,8,9,10,11],
  'rob-van-dam-van-daminator':[7,8,9,10,11],
  'superplex':[7,8,9,10,11],
  'the-rock-attitude-people-s-elbow':[7,8,9,10,11],
  'trick-williams-trick-knee':[7,8,9,10,11],
  'vikingo-twisting-450-splash':[7,8,9,10,11],
  'bayley-diving-elbow':[6,7,8,9,10],
  'seth-rollins-phoenix-splash':[6,7,8,9,10]
});
function applyAuthoredHighDamageCurve(card){
  const curve=AUTHORED_HIGH_DAMAGE_CURVES[card?.id];
  if(!curve || card?.finisher || card?.submission || card?.moveType==='submission') return;
  card.damage=curve[4];
  card.printingStats={base:{damage:curve[0]},emerald:{damage:curve[1]},sapphire:{damage:curve[2]},ruby:{damage:curve[3]},amethyst:{damage:curve[4]}};
  card.balanceAuditVersion='v1.1.198';
}

const EXCEPTIONAL_FINISHER_IDS=new Set(['brock-lesnar-f-5']);
const LOWER_FINISHER_IDS=new Set([]);
function ensureFinisherPrintingCurve(card){
  if(!card?.finisher || card?.moveType==='submission' || card?.submission || card?.printingStats) return;
  const damage=EXCEPTIONAL_FINISHER_IDS.has(card.id) ? [13,14,15,16,17] : LOWER_FINISHER_IDS.has(card.id) ? [11,12,13,14,15] : [12,13,14,15,16];
  card.printingStats={base:{damage:damage[0]},emerald:{damage:damage[1]},sapphire:{damage:damage[2]},ruby:{damage:damage[3]},amethyst:{damage:damage[4]}};
}
function enforceAuditedMoveStructure(card){
  applyAuthoredHighDamageCurve(card);
  if(card?.finisher){ card.method=null; card.requirements={}; ensureFinisherPrintingCurve(card); }
  if(card?.moveType==='submission' || card?.submission) card.damage=0;
  card.tierGrowthProfile=auditedTierGrowthProfile(card);
  card.balanceAuditVersion=card.balanceAuditVersion ?? 'v1.1.198';
  card.authoredCost=Number(card.cost)||0;
  card.authoredDamage=Number(card.damage)||0;
}

export function applyCardIdentityPass(cards=[]){
  const moves=cards.filter(c=>c?.kind==='move');
  const groups=new Map();
  for(const card of moves){
    const key=JSON.stringify({cost:card.cost,damage:card.damage,sig:effectSignature(card)});
    if(!groups.has(key)) groups.set(key,[]);
    groups.get(key).push(card);
  }
  for(const group of groups.values()) broadenCloneGroup(group);
  seedMissingLowDamage(moves);
  for(const card of moves){
    applyApprovedAuditOverride(card);
    enforceAuditedMoveStructure(card);
  }
}

export function finalizeCardIdentityPass(cards=[]){
  const moves=cards.filter(c=>c?.kind==='move');
  for(const card of moves){
    applyApprovedAuditOverride(card);
    enforceAuditedMoveStructure(card);
  }
}
