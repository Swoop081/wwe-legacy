import fs from 'node:fs';
import { superstars } from '../js/data/superstars.js';
import { deckIds } from '../js/data/decks.js';
import { allGameplayCards } from '../js/data/content.js';
const bal=JSON.parse(fs.readFileSync(new URL('../balance-reports/v1.1.89-active-82-tiffany-identity-certification.json', import.meta.url)));
const activeIds=Object.keys(bal.stats);
const byId=new Map(allGameplayCards.map(c=>[c.id,c]));
const ssById=new Map(Object.values(superstars).map(s=>[s.id,s]));
const methods=['strength','strike','technical','agility'];
function abilityType(s){return s?.ability?.trigger?.type||s?.ability?.type||s?.special?.type||'none'}
const rows=[];
for(const id of activeIds){
 const s=ssById.get(id); const ids=deckIds[id]||[]; const cards=ids.map(x=>byId.get(x)).filter(Boolean);
 const mom=Object.fromEntries(methods.map(m=>[m,ids.filter(x=>x===`momentum-${m}`).length]));
 const moves=cards.filter(c=>c.kind==='move');
 const reqMax=Object.fromEntries(methods.map(m=>[m,Math.max(0,...moves.map(c=>Number(c.requirements?.[m]||0)))]));
 const inaccessible=[];
 for(const c of moves){for(const m of methods){const req=Number(c.requirements?.[m]||0); const limit=s?.methodLimits?.[m]; if(req>0 && limit===0) inaccessible.push(`${c.id}:${m}${req}>limit0`); else if(req>0 && Number.isFinite(limit)&&req>limit) inaccessible.push(`${c.id}:${m}${req}>limit${limit}`); else if(req>0 && mom[m]===0 && !(s?.entrance?.preMatchMomentum?.[m]>0)) inaccessible.push(`${c.id}:${m}${req}:no momentum`);}}
 const exclusive=cards.filter(c=>c.superstarId===id);
 const finishers=exclusive.filter(c=>c.finisher||/finisher/i.test(c.rulesText||''));
 const trademarks=exclusive.filter(c=>c.trademark||/trademark/i.test(c.rulesText||''));
 const actions=exclusive.filter(c=>c.kind==='action'||c.kind==='support');
 const reversals=cards.filter(c=>c.kind==='counter'||c.kind==='reversal'||c.counterStates?.length||c.reversal||/counter/i.test(c.kind||'')).length;
 const uniqueMethods=[...new Set(moves.map(c=>c.method).filter(Boolean))];
 const signatureMissing=(s?.signatures||[]).filter(x=>!ids.includes(x));
 rows.push({id,name:s?.name||bal.stats[id].name,setId:s?.setId,hp:s?.hp,winRate:+(bal.stats[id].wins/bal.stats[id].matches*100).toFixed(2),ability:s?.ability?.name||'',abilityType:abilityType(s),specialType:s?.special?.type||'',methodLimits:s?.methodLimits,starterMomentum:s?.starterMomentum,deckMomentum:mom,reqMax,methodCount:uniqueMethods.length,methods:uniqueMethods,deckSize:ids.length,missingCards:ids.filter(x=>!byId.has(x)),inaccessible:[...new Set(inaccessible)],exclusiveCount:exclusive.length,exclusiveActions:actions.map(c=>c.id),finishers:finishers.map(c=>c.id),trademarks:trademarks.map(c=>c.id),reversalLike:reversals,signatureMissing});
}
fs.writeFileSync('/mnt/data/architecture_rows.json',JSON.stringify(rows,null,2));
console.log('active',rows.length,'hp',Math.min(...rows.map(r=>r.hp)),Math.max(...rows.map(r=>r.hp)));
console.log('deck size !=60',rows.filter(r=>r.deckSize!==60).map(r=>[r.name,r.deckSize]));
console.log('missing card ids',rows.filter(r=>r.missingCards.length).map(r=>[r.name,r.missingCards]));
console.log('inaccessible',rows.filter(r=>r.inaccessible.length).map(r=>[r.name,r.inaccessible]));
console.log('signature missing',rows.filter(r=>r.signatureMissing.length).map(r=>[r.name,r.signatureMissing]));
console.log('no finishers',rows.filter(r=>r.finishers.length===0).map(r=>r.name));
console.log('no exclusive actions',rows.filter(r=>r.exclusiveActions.length===0).map(r=>r.name));
console.log('HP low',rows.slice().sort((a,b)=>a.hp-b.hp).slice(0,15).map(r=>[r.name,r.hp,r.winRate,r.methods]));
console.log('HP high',rows.slice().sort((a,b)=>b.hp-a.hp).slice(0,18).map(r=>[r.name,r.hp,r.winRate,r.methods]));
const types={}; for(const r of rows)types[r.abilityType]=(types[r.abilityType]||0)+1; console.log('ability types',types);
