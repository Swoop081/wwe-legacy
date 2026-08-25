import { allGameplayCards } from '../js/data/content.js';

const issues=[];
const byName=new Map(allGameplayCards.map(c=>[c.name,c]));
const hasEffect=(c,type,pred=()=>true)=>(c.effects??[]).some(e=>e.type===type&&pred(e));
for(const c of allGameplayCards){
  const t=String(c.rulesText??'');
  if(c.kind==='move'&&/Grounded opponent only/i.test(t)&&!c.groundedOnly) issues.push(`${c.id}: printed Grounded-only restriction is not enforced`);
  if(c.kind==='move'&&/Standing opponent only/i.test(t)&&!c.standingOnly) issues.push(`${c.id}: printed Standing-only restriction is not enforced`);
  const ditch=t.match(/opponent ditches\s+(\d+)/i);
  if(c.kind==='move'&&ditch&&!hasEffect(c,'discardOpponent',e=>(e.amount??1)>=Number(ditch[1]))) issues.push(`${c.id}: printed opponent ditch has no matching runtime effect`);
  const addAd=t.match(/gain \+(\d+) additional (?:Attitude|Adrenaline)/i);
  if(c.kind==='move'&&addAd&&!hasEffect(c,'gainAdrenaline',e=>(e.amount??1)>=Number(addAd[1]))&&!(c.counterAdrenalineOnConnect>=Number(addAd[1]))) issues.push(`${c.id}: printed additional Adrenaline has no matching runtime effect`);
  const back=t.match(/\+(\d+) persistent Back (?:damage|pressure)/i);
  if(c.kind==='move'&&back&&!c.submission&&!(c.bodyDamage?.bodyPart==='back'&&(c.bodyDamage.amount??c.bodyDamage.pressure??0)>=Number(back[1]))&&!hasEffect(c,'bodyPressure',e=>e.bodyPart==='back'&&(e.amount??1)>=Number(back[1]))) issues.push(`${c.id}: printed persistent Back damage has no matching runtime effect`);
  if(/May Counter a Rear Control Move/i.test(t)&&!(c.counterStates??[]).includes('rear-control')) issues.push(`${c.id}: printed Rear Control reversal missing counterStates data`);
  if(/Neck\s*\/\s*Head-targeting Submission/i.test(t)&&!(c.counterSubmissionTargets??[]).includes('neck-head')) issues.push(`${c.id}: printed Neck/Head submission reversal missing target data`);
  if(c.id==='bron-breakker-breakkers-spear'&&/Agility Move earlier in this Control sequence, costs 2 less/i.test(t)){
    const d=c.discountIfMethodConnectedThisControl;
    if(!(d?.method==='agility'&&d?.amount===2))issues.push(`${c.id}: printed prior-Agility discount is not wired to the runtime discount field`);
  }
  if(/immediate Pin gives them −5 percentage points/i.test(t)&&c.pinKickoutPenalty!==5)issues.push(`${c.id}: printed quick-pin modifier missing pinKickoutPenalty=5`);
  if(c.kind==='move'&&c.groundOpponent){
    for(const e of (c.effects??[])){
      if(e?.type!=='search'||!e.name)continue;
      const target=byName.get(e.name);
      const sameControlDiscount=(e.discount??0)>0||(c.effects??[]).some(x=>x?.type==='discountNextByName'&&x.name===e.name&&(x.amount??0)>0);
      if(target?.standingOnly&&sameControlDiscount&&target.standingChainAfter!==c.name) issues.push(`${c.id} -> ${target.id}: same-Control searched standing-only follow-up is blocked by grounding without standingChainAfter`);
    }
  }
}
console.log(JSON.stringify({checked:allGameplayCards.length,issues:issues.length,details:issues},null,2));
if(issues.length)process.exit(1);
