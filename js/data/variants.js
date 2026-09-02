import { rewardPrintingTierForSet } from "./reward-printings.js?v=1.1.123";

// WWE Legacy five-tier collectible printing system.
// v1.1.70: the five-tier identity system now covers the complete gameplay
// library. Sapphire remains the authored midpoint; Moves, Actions, Entrances,
// Managers and Momentum cards all receive mechanically meaningful printings
// without replacing the card's core identity.
export const CARD_TIERS = Object.freeze(["normal", "emerald", "sapphire", "ruby", "amethyst"]);
export const TIER_LABELS = Object.freeze({ normal: "Base", emerald: "Emerald", sapphire: "Sapphire", ruby: "Ruby", amethyst: "Amethyst" });
export const TIER_RANK = Object.freeze({ normal: 0, emerald: 1, sapphire: 2, ruby: 3, amethyst: 4 });
export const TIER_PULL_WEIGHTS = Object.freeze({ normal: .645, emerald: .25, sapphire: .08, ruby: .02, amethyst: .005 });
export const DEFAULT_AUTHORED_TIER = "sapphire";
export const DEFAULT_STARTER_TIER = "normal";

const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const clone = value => value && typeof value === 'object' ? (Array.isArray(value) ? value.map(clone) : Object.fromEntries(Object.entries(value).map(([k,v])=>[k,clone(v)]))) : value;

export function normalizeCardTier(value, fallback = "normal") {
  const key = String(value ?? "").toLowerCase();
  return CARD_TIERS.includes(key) ? key : fallback;
}
export function fixedPrintingTierFor(card) {
  if (card?.kind === "superstar" || card?.kind === "entrance") return "amethyst";
  const raw = String(card?.fixedPrintingTier ?? "").toLowerCase();
  if (CARD_TIERS.includes(raw)) return raw;
  return rewardPrintingTierForSet(card?.setId);
}
export function cardPrintingTiers(card) {
  const fixed = fixedPrintingTierFor(card);
  return fixed ? [fixed] : CARD_TIERS;
}
export function resolveCardTier(card, requested = DEFAULT_AUTHORED_TIER, fallback = DEFAULT_AUTHORED_TIER) {
  return fixedPrintingTierFor(card) ?? normalizeCardTier(requested, fallback);
}
export function tierLabel(value) { return TIER_LABELS[normalizeCardTier(value)] ?? TIER_LABELS.normal; }
export function tierRank(value) { return TIER_RANK[normalizeCardTier(value)] ?? 0; }
export function isTierHigher(a, b) { return tierRank(a) > tierRank(b); }

const MOVE_PROFILES = Object.freeze({
  damage: {
    normal:{cost:0,damage:-2,effect:-1}, emerald:{cost:0,damage:-1,effect:0}, sapphire:{cost:0,damage:0,effect:0}, ruby:{cost:0,damage:1,effect:0}, amethyst:{cost:0,damage:2,effect:1}
  },
  efficiency: {
    normal:{cost:2,damage:0,effect:-1}, emerald:{cost:1,damage:0,effect:0}, sapphire:{cost:0,damage:0,effect:0}, ruby:{cost:-1,damage:0,effect:0}, amethyst:{cost:-2,damage:0,effect:1}
  },
  hybrid: {
    normal:{cost:1,damage:-1,effect:-1}, emerald:{cost:1,damage:0,effect:0}, sapphire:{cost:0,damage:0,effect:0}, ruby:{cost:0,damage:1,effect:0}, amethyst:{cost:-1,damage:1,effect:1}
  },
  effect: {
    normal:{cost:1,damage:-1,effect:-1}, emerald:{cost:1,damage:0,effect:0}, sapphire:{cost:0,damage:0,effect:0}, ruby:{cost:0,damage:0,effect:1}, amethyst:{cost:-1,damage:1,effect:1}
  }
});

function moveTierSpec(card,tier){
  const profile=MOVE_PROFILES[card?.tierGrowthProfile] ?? MOVE_PROFILES.hybrid;
  let spec={...(profile[normalizeCardTier(tier,DEFAULT_AUTHORED_TIER)] ?? profile.sapphire)};
  if(card?.moveType==='submission' || Number(card?.damage)===0){
    // Submissions communicate strength through cost + pressure, never fake damage.
    const rank=tierRank(tier)-tierRank('sapphire');
    spec={cost:-rank,damage:0,effect:rank<0?-1:rank>0?1:0};
  } else {
    const t=normalizeCardTier(tier,DEFAULT_AUTHORED_TIER);
    const baseCost=Number(card?.authoredCost ?? card?.cost ?? 0);
    const baseDamage=Number(card?.authoredDamage ?? card?.damage ?? 0);
    // Floor-aware fallbacks guarantee low-cost/low-damage cards still visibly
    // improve at every printing instead of collapsing two tiers onto one stat line.
    if(t==='normal' && baseDamage<=2 && (spec.damage??0)<0) spec.cost=(spec.cost??0)+1;
    if(t==='amethyst' && baseCost+(spec.cost??0)<=1) spec.damage=(spec.damage??0)+1;
  }
  return spec;
}

export function tierDamageOffsetFor(card, tier = DEFAULT_AUTHORED_TIER) {
  if (!card || card.kind !== "move") return 0;
  const base = Number(card.authoredDamage ?? card.damage ?? 0);
  if (!(base > 0)) return 0;
  return moveTierSpec(card,resolveCardTier(card,tier,DEFAULT_AUTHORED_TIER)).damage ?? 0;
}
export function tierCostOffsetFor(card,tier=DEFAULT_AUTHORED_TIER){
  if(!card || (card.kind!=="move" && card.kind!=="action")) return 0;
  if(card.kind==='move') return moveTierSpec(card,resolveCardTier(card,tier,DEFAULT_AUTHORED_TIER)).cost ?? 0;
  return -(tierRank(resolveCardTier(card,tier,DEFAULT_AUTHORED_TIER))-tierRank('sapphire'));
}
export function tierSubmissionPressureOffsetFor(card, tier = DEFAULT_AUTHORED_TIER) {
  const base = Number(card?.authoredSubmissionPressure ?? card?.submission?.pressure ?? 0);
  if (!(base > 0)) return 0;
  const rank=tierRank(resolveCardTier(card,tier,DEFAULT_AUTHORED_TIER))-tierRank('sapphire');
  return rank;
}

function scaleBeneficialNumber(value,delta,{min=0,max=99}={}){
  if(!Number.isFinite(Number(value))) return value;
  return clamp(Number(value)+delta,min,max);
}
function scaleEffectArray(effects,delta){
  if(!delta) return effects;
  return (effects??[]).map(effect=>{
    const out={...effect};
    if(['drawSelf','discardOpponent','gainAdrenaline','loseOpponentAdrenaline','bodyPressure'].includes(out.type) && Number.isFinite(Number(out.amount))) out.amount=scaleBeneficialNumber(out.amount,delta,{min:1,max:6});
    if(['discountNextByName','discountNextMethod','discountNextMoveType'].includes(out.type) && Number.isFinite(Number(out.amount))) out.amount=scaleBeneficialNumber(out.amount,delta,{min:0,max:6});
    if(out.type==='search' && Number.isFinite(Number(out.discount))) out.discount=scaleBeneficialNumber(out.discount,delta,{min:0,max:6});
    if(out.type==='buffNextByName' && Number.isFinite(Number(out.damage))) out.damage=scaleBeneficialNumber(out.damage,delta,{min:0,max:6});
    return out;
  });
}
function scaleSpecialObject(obj,delta){
  if(!obj || typeof obj!=='object' || !delta) return obj;
  const out=clone(obj);
  for(const key of ['draw','adrenaline','amount','discount','bonusDamage','damage','reduce','strengthDiscount','agilityDraw']){
    if(Number.isFinite(Number(out[key]))) out[key]=scaleBeneficialNumber(out[key],delta,{min:key==='draw'?1:0,max:9});
  }
  if(Number.isFinite(Number(out.opponentAdrenaline))) out.opponentAdrenaline=scaleBeneficialNumber(out.opponentAdrenaline,delta,{min:0,max:6});
  return out;
}
function tierBonusText(card,tier,effectDelta,costOffset,damageOffset){
  if(normalizeCardTier(tier)==='sapphire') return '';
  const bits=[];
  if(costOffset) bits.push(`${costOffset<0?'cost '+Math.abs(costOffset)+' less':'cost +'+costOffset}`);
  if(damageOffset) bits.push(`${damageOffset>0?'+':''}${damageOffset} Damage`);
  if(effectDelta) bits.push(`${effectDelta>0?'+':''}${effectDelta} effect magnitude`);
  return bits.length ? `${tierLabel(tier)} printing: ${bits.join(', ')}.` : `${tierLabel(tier)} printing.`;
}


const rankDeltaFromSapphire = tier => tierRank(tier)-tierRank('sapphire');
const steppedDelta = tier => {
  const d=rankDeltaFromSapphire(tier);
  return d<0?-1:d>0?1:0;
};
function scaleActionPayload(obj,delta){
  if(!obj || typeof obj!=='object' || !delta) return obj;
  const out=clone(obj);
  // These are beneficial magnitudes. Thresholds such as hpPct/minDamage/maxCost
  // deliberately remain authored so a higher printing never changes the trigger.
  for(const key of ['draw','adrenaline','amount','discount','damage','bonusDamage','reduce','adrenalineIfInHand']){
    if(Number.isFinite(Number(out[key]))) out[key]=scaleBeneficialNumber(out[key],delta,{min:key==='draw'?1:0,max:9});
  }
  return out;
}
function tierIdentityNote(card,tier){
  const label=tierLabel(tier);
  if(card.kind==='momentum') return `${label} printing: grants ${applyMomentumAmount(card,tier)} permanent ${card.method?.[0]?.toUpperCase()+card.method?.slice(1)} Momentum.`;
  if(card.kind==='entrance') return `${label} Entrance printing.`;
  if(card.kind==='manager') return `${label} Manager printing.`;
  if(card.kind==='action') return `${label} Action printing.`;
  return `${label} printing.`;
}
function applyMomentumAmount(card,tier){
  // Five distinct permanent-Momentum printings without rewriting the Method:
  // Base 1, Emerald 2, Sapphire 3, Ruby 4, Amethyst 5.
  return Math.max(1,1+tierRank(tier));
}
function entranceTierPackage(card,tier){
  const rank=tierRank(tier);
  const baseMomentum=clone(card.preMatchMomentum??{});
  const methods=Object.keys(baseMomentum);
  const outMomentum={};
  // Base keeps one point in the entrance's primary Method. Higher printings
  // progressively restore/strengthen the authored package.
  if(methods.length){
    const primary=methods[0];
    for(const m of methods) outMomentum[m]=0;
    outMomentum[primary]=1;
    if(rank>=1 && methods[1]) outMomentum[methods[1]]=1;
    if(rank>=2) for(const m of methods) outMomentum[m]=Math.max(outMomentum[m]??0,Number(baseMomentum[m])||0);
    if(rank>=3) outMomentum[primary]=Math.max(outMomentum[primary],2);
    if(rank>=4){
      outMomentum[primary]=Math.max(outMomentum[primary],2);
      if(methods[1]) outMomentum[methods[1]]=Math.max(outMomentum[methods[1]],2);
    }
  }
  const authoredAdr=Math.max(0,Number(card.preMatchAdrenaline)||0);
  // Keep the entrance identity but make every printing visible even on simple
  // +1 Momentum/+1 Adrenaline entrances.
  const adrenaline=Math.max(0,authoredAdr + [-1,0,0,1,2][rank]);
  return {momentum:outMomentum,adrenaline};
}

export function applyCardTier(card, tier = DEFAULT_AUTHORED_TIER) {
  if (!card) return card;
  const resolvedTier = resolveCardTier(card, tier, DEFAULT_AUTHORED_TIER);
  const rankDelta=tierRank(resolvedTier)-tierRank('sapphire');
  const authoredDamage = Number(card.authoredDamage ?? card.damage ?? 0);
  const authoredCost = Number(card.authoredCost ?? card.cost ?? 0);
  const damageOffset = tierDamageOffsetFor({ ...card, damage: authoredDamage, authoredDamage }, resolvedTier);
  const costOffset = tierCostOffsetFor({ ...card, cost: authoredCost, authoredCost },resolvedTier);
  const authoredSubmissionPressure = Number(card.authoredSubmissionPressure ?? card.submission?.pressure ?? 0);
  const pressureOffset = tierSubmissionPressureOffsetFor({ ...card, authoredSubmissionPressure }, resolvedTier);
  const moveEffectDelta=card.kind==='move' ? (moveTierSpec(card,resolvedTier).effect??0) : rankDelta<0?-1:rankDelta>0?1:0;
  const tieredSubmission = card.submission && authoredSubmissionPressure > 0
    ? { ...card.submission, pressure: Math.max(1, authoredSubmissionPressure + pressureOffset) }
    : card.submission;
  const out={...card,tier:resolvedTier};

  if(card.kind==='move'){
    out.authoredDamage=authoredDamage;
    out.authoredCost=authoredCost;
    out.tierDamageOffset=damageOffset;
    out.tierCostOffset=costOffset;
    out.damage=Math.max(0,authoredDamage+damageOffset);
    out.cost=Math.max(card.defensiveOnly?0:1,authoredCost+costOffset);
    out.effects=scaleEffectArray(card.effects,moveEffectDelta);
    if(card.defensiveOnly && tierRank(resolvedTier)>tierRank('sapphire')){
      const counterTypes=[card.counterState,...(card.counterStates??[]),...(card.counters??[])].filter(Boolean);
      out.drawOnCounterTypes=[...new Set([...(card.drawOnCounterTypes??[]),...counterTypes])];
      out.drawOnCounter=tierRank(resolvedTier)-tierRank('sapphire');
    }
    if(card.submission){out.authoredSubmissionPressure=authoredSubmissionPressure;out.tierSubmissionPressureOffset=pressureOffset;out.submission=tieredSubmission;}
  } else if(card.kind==='action'){
    out.tierActionRank=tierRank(resolvedTier);
    // Actions keep their authored trigger/identity. Numeric payloads scale while
    // Actions with no numeric payload gain a tier utility draw rather than a
    // completely different effect.
    const delta=steppedDelta(resolvedTier);
    if(Number.isFinite(Number(card.cost))){
      out.authoredCost=authoredCost;
      const actionCostDelta=[2,1,0,-1,-2][tierRank(resolvedTier)];
      out.cost=Math.max(0,authoredCost+actionCostDelta);
    }
    if(Number.isFinite(Number(card.damage))){out.authoredDamage=authoredDamage;out.damage=Math.max(0,authoredDamage+rankDelta);}
    out.special=scaleActionPayload(card.special,delta);
    out.effect=scaleActionPayload(card.effect,delta);
    const hasNumericPayload=JSON.stringify([card.special,card.effect]).match(/"(draw|adrenaline|amount|discount|damage|bonusDamage|reduce|adrenalineIfInHand)":\s*\d/);
    if(!Number.isFinite(Number(card.cost)) && !Number.isFinite(Number(card.damage)) && !hasNumericPayload){
      out.tierUtilityDraw=[0,1,2,3,4][tierRank(resolvedTier)];
    }
  } else if(card.kind==='entrance'){
    const pkg=entranceTierPackage(card,resolvedTier);
    out.preMatchAdrenaline=pkg.adrenaline;
    out.preMatchMomentum=pkg.momentum;
    if(Number.isFinite(Number(card.preMatchCounterDiscount))) out.preMatchCounterDiscount=Math.max(0,Number(card.preMatchCounterDiscount)+steppedDelta(resolvedTier));
    out.tierEntranceRank=tierRank(resolvedTier);
  } else if(card.kind==='momentum'){
    out.amount=applyMomentumAmount(card,resolvedTier);
  } else if(card.kind==='manager'){
    const delta=steppedDelta(resolvedTier);
    out.effect=scaleActionPayload(card.effect,delta);
    // Legacy Managers whose bespoke logic is represented by their ID/rules
    // rather than an effect object still receive a meaningful tier reward.
    out.tierManagerDraw=[0,1,2,3,4][tierRank(resolvedTier)];
  }

  const note=card.kind==='move'
    ? tierBonusText(card,resolvedTier,moveEffectDelta,costOffset,damageOffset)
    : (normalizeCardTier(resolvedTier)==='sapphire' ? tierIdentityNote(card,resolvedTier) : tierIdentityNote(card,resolvedTier));
  if(note){out.tierRulesText=note;out.rulesText=`${card.rulesText}${card.rulesText?' ':''}${note}`;}
  return out;
}

export function rollCardTier(rng = Math.random, allowedTiers = CARD_TIERS, weights = TIER_PULL_WEIGHTS) {
  const tiers = CARD_TIERS.filter(tier => allowedTiers.includes(tier));
  if (!tiers.length) return "normal";
  const total = tiers.reduce((sum, tier) => sum + Math.max(0, Number(weights[tier]) || 0), 0);
  if (!(total > 0)) return tiers[0];
  let roll = rng() * total;
  for (const tier of tiers) {
    roll -= Math.max(0, Number(weights[tier]) || 0);
    if (roll <= 0) return tier;
  }
  return tiers.at(-1);
}

export function highestOwnedTier(owned = {}, preferred = CARD_TIERS) {
  const ordered = [...preferred].sort((a,b)=>tierRank(b)-tierRank(a));
  return ordered.find(tier => Math.max(0, Number(owned?.[tier]) || 0) > 0) ?? null;
}
