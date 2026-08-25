import { allGameplayCards } from '../js/data/content.js';
import { isPlayerReleasedSetId } from '../js/data/release.js';
import { applyCardTier, TIER_DAMAGE_OFFSETS } from '../js/data/variants.js';
const live=allGameplayCards.filter(c=>isPlayerReleasedSetId(c.setId));
const uncommon=live.filter(c=>c.kind==='move'&&c.rarity===2);
const trademarks=live.filter(c=>c.kind==='move'&&c.rarity===3&&c.trademark);
const avg=(arr,key)=>arr.length?arr.reduce((s,c)=>s+(Number(c[key])||0),0)/arr.length:0;
const efficiency=arr=>arr.length?arr.reduce((s,c)=>s+((Number(c.damage)||0)/Math.max(1,Number(c.cost)||1)),0)/arr.length:0;
const tierIssues=[];
for(const c of allGameplayCards.filter(c=>c.kind==='move')){
  const n=applyCardTier(c,'normal'),e=applyCardTier(c,'emerald'),s=applyCardTier(c,'sapphire'),r=applyCardTier(c,'ruby');
  const variants=[n,e,s,r];
  const base=Number(c.damage)||0;
  const fixed=c.fixedPrintingTier ?? null;
  const expected=fixed
    ? Array(4).fill(base>0?Math.max(0,base+(TIER_DAMAGE_OFFSETS[fixed]??0)):0)
    : [Math.max(0,base-2),Math.max(0,base-1),base,base>0?base+1:0];
  const actual=variants.map(card=>card.damage);
  if(actual.some((v,i)=>v!==expected[i]))tierIssues.push(`${c.id}: damage ${actual.join('/')} expected ${expected.join('/')}`);
  if(fixed && variants.some(card=>card.tier!==fixed)) tierIssues.push(`${c.id}: fixed printing leaked ${variants.map(card=>card.tier).join('/')}`);
  if(c.submission?.pressure>0){
    const p=Number(c.submission.pressure);
    const ep=fixed
      ? Array(4).fill(Math.max(1,p+(TIER_DAMAGE_OFFSETS[fixed]??0)))
      : [Math.max(1,p-2),Math.max(1,p-1),p,p+1];
    const ap=variants.map(card=>card.submission.pressure);
    if(ap.some((v,i)=>v!==ep[i]))tierIssues.push(`${c.id}: pressure ${ap.join('/')} expected ${ep.join('/')}`);
  }
}
const byCost={};
for(const cost of [...new Set([...uncommon,...trademarks].map(c=>c.cost))].sort((a,b)=>a-b)){
 const u=uncommon.filter(c=>c.cost===cost),t=trademarks.filter(c=>c.cost===cost);
 if(u.length&&t.length)byCost[cost]={uncommonAvgDamage:+avg(u,'damage').toFixed(2),trademarkAvgDamage:+avg(t,'damage').toFixed(2),uncommonCount:u.length,trademarkCount:t.length};
}
console.log(JSON.stringify({
  releasedCards:live.length,
  uncommon:{count:uncommon.length,avgCost:+avg(uncommon,'cost').toFixed(2),avgDamage:+avg(uncommon,'damage').toFixed(2),damagePerCost:+efficiency(uncommon).toFixed(2)},
  rareTrademarks:{count:trademarks.length,avgCost:+avg(trademarks,'cost').toFixed(2),avgDamage:+avg(trademarks,'damage').toFixed(2),damagePerCost:+efficiency(trademarks).toFixed(2)},
  equalCost:byCost,
  tierScaling:{issues:tierIssues.length,fixedPrintingCards:allGameplayCards.filter(c=>c.fixedPrintingTier).length,details:tierIssues}
},null,2));
if(tierIssues.length)process.exit(1);
