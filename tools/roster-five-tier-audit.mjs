import { deckIds } from '../js/data/decks.js';
import { allGameplayCards } from '../js/data/content.js';

const tiers=['base','emerald','sapphire','ruby','amethyst'];
const byId=new Map(allGameplayCards.map(c=>[c.id,c]));
const roster=Object.keys(deckIds);
const used=new Map();
const unresolved=[];
const missing=[];
const submissions=[];
const finishers=[];

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
  if(absent.length) missing.push({id,name:c.name,absent,superstars:[...superstars]});
  if(isSubmission) submissions.push({id,name:c.name,cost:c.cost,damage:c.damage,pressure:c.submission?.pressure??null,absent,superstars:[...superstars]});
  if(c.finisher) finishers.push({id,name:c.name,method:c.method??null,requirements:c.requirements??{},absent,superstars:[...superstars]});
}

const report={
  rosterCount:roster.length,
  deckSizes:Object.fromEntries(roster.map(id=>[id,deckIds[id].length])),
  uniqueMoveIds:used.size,
  unresolved,
  missingFiveTierCount:missing.length,
  missing,
  submissionCount:submissions.length,
  submissions,
  finisherCount:finishers.length,
  illegalFinisherMethods:finishers.filter(f=>f.method||Object.keys(f.requirements).length),
};
console.log(JSON.stringify(report,null,2));
if(unresolved.length) process.exitCode=2;
