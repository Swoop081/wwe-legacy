import { deckIds } from '../js/data/decks.js';
import { allGameplayCards } from '../js/data/content.js';
const tiers=['base','emerald','sapphire','ruby','amethyst'];
const byId=new Map(allGameplayCards.map(c=>[c.id,c]));
const ids=[...new Set(deckIds['becky-lynch'])];
for(const id of ids){
  const c=byId.get(id);
  if(!c || c.kind!=='move') continue;
  const row={id,name:c.name,cost:c.cost,damage:c.damage,finisher:!!c.finisher,submission:c.moveType==='submission'||!!c.submission,printing:{}};
  for(const t of tiers) row.printing[t]=c.printingStats?.[t]??null;
  console.log(JSON.stringify(row));
}
