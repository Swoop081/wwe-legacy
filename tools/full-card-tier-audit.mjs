import { allGameplayCards } from '../js/data/content.js?v=1.1.198';
import { CARD_TIERS, applyCardTier, cardPrintingTiers, tierLabel } from '../js/data/variants.js?v=1.1.198';

const METHOD_KEYS = ['strength','strike','technical','agility'];
const BENEFICIAL_EFFECT_TYPES = new Set([
  'drawSelf','discardOpponent','gainAdrenaline','loseOpponentAdrenaline','bodyPressure',
  'discountNextByName','discountNextMethod','discountNextMoveType','search','buffNextByName'
]);

const finite = value => Number.isFinite(Number(value)) ? Number(value) : 0;

function effectPower(card){
  let score=0;
  for(const effect of card?.effects??[]){
    if(!BENEFICIAL_EFFECT_TYPES.has(effect?.type)) continue;
    if(Number.isFinite(Number(effect.amount))) score += finite(effect.amount);
    if(Number.isFinite(Number(effect.discount))) score += finite(effect.discount);
    if(Number.isFinite(Number(effect.damage))) score += finite(effect.damage);
  }
  score += finite(card?.drawOnCounter);
  return score;
}

function snapshot(card){
  return {
    cost: finite(card?.cost),
    damage: finite(card?.damage),
    pressure: finite(card?.submission?.pressure),
    effectPower: effectPower(card)
  };
}

function positiveMomentumRequirement(card){
  if(card?.method && METHOD_KEYS.includes(card.method)) return true;
  return METHOD_KEYS.some(method => finite(card?.requirements?.[method]) > 0);
}

function compareProgression(lower, higher){
  const a=snapshot(lower), b=snapshot(higher);
  const regressions=[];
  if(b.cost>a.cost) regressions.push(`cost ${a.cost}->${b.cost}`);
  if(b.damage<a.damage) regressions.push(`damage ${a.damage}->${b.damage}`);
  if(b.pressure<a.pressure) regressions.push(`pressure ${a.pressure}->${b.pressure}`);
  if(b.effectPower<a.effectPower) regressions.push(`effect ${a.effectPower}->${b.effectPower}`);
  const improved=b.cost<a.cost || b.damage>a.damage || b.pressure>a.pressure || b.effectPower>a.effectPower;
  return { regressions, improved, a, b };
}

const moves=allGameplayCards.filter(card=>card?.kind==='move');
const failures=[];
const warnings=[];
const profileCounts={};
let fiveTierMoves=0;
let fixedTierMoves=0;
let adjacentComparisons=0;

for(const card of moves){
  profileCounts[card.tierGrowthProfile]=(profileCounts[card.tierGrowthProfile]??0)+1;

  if(card.balanceAuditVersion!=='v1.1.198'){
    failures.push(`${card.id}: missing v1.1.198 full-library balance audit stamp`);
  }

  if(card.finisher && positiveMomentumRequirement(card)){
    failures.push(`${card.id}: Finisher has a Momentum/Method requirement`);
  }

  if((card.moveType==='submission' || card.submission) && finite(card.damage)!==0){
    failures.push(`${card.id}: Submission has ${card.damage} immediate damage`);
  }

  const supported=cardPrintingTiers(card);
  if(supported.length===1){
    fixedTierMoves += 1;
    const printed=applyCardTier(card,supported[0]);
    if(card.finisher && positiveMomentumRequirement(printed)) failures.push(`${card.id}/${supported[0]}: printed Finisher has a Momentum/Method requirement`);
    if((card.moveType==='submission' || card.submission) && finite(printed.damage)!==0) failures.push(`${card.id}/${supported[0]}: printed Submission has immediate damage`);
    continue;
  }

  fiveTierMoves += 1;
  const printings=CARD_TIERS.map(tier=>applyCardTier(card,tier));
  for(let index=0; index<printings.length; index+=1){
    const printed=printings[index];
    const tier=CARD_TIERS[index];
    if(card.finisher && positiveMomentumRequirement(printed)) failures.push(`${card.id}/${tier}: printed Finisher has a Momentum/Method requirement`);
    if((card.moveType==='submission' || card.submission) && finite(printed.damage)!==0) failures.push(`${card.id}/${tier}: printed Submission has immediate damage`);
  }

  for(let index=0; index<printings.length-1; index+=1){
    adjacentComparisons += 1;
    const lower=printings[index], higher=printings[index+1];
    const result=compareProgression(lower,higher);
    const pair=`${tierLabel(CARD_TIERS[index])}->${tierLabel(CARD_TIERS[index+1])}`;
    if(result.regressions.length) failures.push(`${card.id} ${pair}: regression (${result.regressions.join(', ')})`);
    if(!result.improved) failures.push(`${card.id} ${pair}: higher gem is not mechanically better (${JSON.stringify(result.a)})`);
  }

  // Finishers must leave visible raw-power room above Base. Effects are allowed;
  // Momentum requirements are not. This catches the old Base-16 Oblivion case.
  if(card.finisher){
    const base=printings[0], amethyst=printings.at(-1);
    if(finite(base.damage)>=finite(amethyst.damage)) failures.push(`${card.id}: Base Finisher damage ${base.damage} does not trail Amethyst ${amethyst.damage}`);
  }
}

// Duplicate IDs make any per-card audit ambiguous and therefore fail certification.
const seen=new Set();
for(const card of moves){
  if(seen.has(card.id)) failures.push(`${card.id}: duplicate gameplay Move ID`);
  seen.add(card.id);
}

console.log('WWE Legacy full gameplay Move tier audit');
console.log(`Moves audited: ${moves.length}`);
console.log(`Five-tier Moves: ${fiveTierMoves}`);
console.log(`Fixed-printing Moves: ${fixedTierMoves}`);
console.log(`Adjacent gem comparisons: ${adjacentComparisons}`);
console.log(`Growth profiles: ${JSON.stringify(profileCounts)}`);
if(warnings.length){
  console.log(`Warnings: ${warnings.length}`);
  for(const warning of warnings) console.log(`WARN ${warning}`);
}
if(failures.length){
  console.error(`FAIL: ${failures.length} issue(s)`);
  for(const failure of failures) console.error(` - ${failure}`);
  process.exitCode=1;
} else {
  console.log('PASS: every gameplay Move satisfies the v1.1.198 tier audit.');
}
