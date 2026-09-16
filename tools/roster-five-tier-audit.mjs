import { deckIds } from '../js/data/decks.js';
import { allGameplayCards } from '../js/data/content.js';
import { superstars } from '../js/data/superstars.js';

const tiers=['base','emerald','sapphire','ruby','amethyst'];
const byId=new Map(allGameplayCards.map(c=>[c.id,c]));
const certifiedSetIds=new Set([
  'summerslam-series-1','evolution-series-1','raw-series-1','smackdown-series-1','nxt-series-1',
  'golden-era-series-1','new-generation-series-1','attitude-era-series-1','ruthless-aggression-series-1',
  'worlds-collide-series-1','season-1-last-time-is-now','rewards-october-2026'
]);
const utilityIds=new Set(['sidestep','up-and-over','standing-switch','rollover-counter','duck','chain-wrestling','no-sell','block','backflip-counter','leapfrog','test-of-strength']);
const specialCaseIds=new Set(['619']);
const superstarById=new Map(Object.values(superstars).map(s=>[s.id,s]));
const roster=Object.keys(deckIds).filter(id=>certifiedSetIds.has(superstarById.get(id)?.setId));
const used=new Map();
const unresolved=[];
const missing=[];
const submissions=[];
const finishers=[];
const missingClassification={ordinaryOffensive:[],submission:[],defensiveUtility:[],finisherTrademark:[],specialCase:[],other:[]};

for(const superstarId of roster){
  const deck=deckIds[superstarId];
  for(const id of deck){
    const c=byId.get(id);
    if(!c){ unresolved.push({superstarId,id}); continue; }
    if(c.kind!=='move') continue;
    if(!used.has(id)) used.set(id,{card:c,superstars:new Set()});
    used.get(id).superstars.add(superstarId);
  }
}
for(const [id,{card:c,superstars}] of used){
  const absent=tiers.filter(t=>!c.printingStats?.[t]);
  const isSubmission=c.moveType==='submission'||!!c.submission;
  if(absent.length){
    const row={id,name:c.name,absent,superstars:[...superstars]};
    missing.push(row);
    if(isSubmission) missingClassification.submission.push(row);
    else if(specialCaseIds.has(id)) missingClassification.specialCase.push(row);
    else if(c.finisher||c.trademark) missingClassification.finisherTrademark.push(row);
    else if(c.defensiveOnly||utilityIds.has(id)||Number(c.damage)<=0) missingClassification.defensiveUtility.push(row);
    else if(Number(c.damage)>0) missingClassification.ordinaryOffensive.push(row);
    else missingClassification.other.push(row);
  }
  if(isSubmission) submissions.push({id,name:c.name,cost:c.cost,damage:c.damage,pressure:c.submission?.pressure??null,absent,superstars:[...superstars]});
  if(c.finisher) finishers.push({id,name:c.name,method:c.method??null,requirements:c.requirements??{},absent,superstars:[...superstars]});
}
const report={certifiedSetIds:[...certifiedSetIds],rosterCount:roster.length,roster,
  deckSizes:Object.fromEntries(roster.map(id=>[id,deckIds[id].length])),uniqueMoveIds:used.size,unresolved,
  missingFiveTierCount:missing.length,missing,
  missingClassificationCounts:Object.fromEntries(Object.entries(missingClassification).map(([k,v])=>[k,v.length])),
  missingClassification,
  submissionCount:submissions.length,submissions,
  finisherCount:finishers.length,illegalFinisherMethods:finishers.filter(f=>f.method||Object.keys(f.requirements).length)};
console.log(JSON.stringify(report,null,2));
if(unresolved.length) process.exitCode=2;
