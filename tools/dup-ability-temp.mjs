import { superstars } from '../js/data/superstars.js'; import fs from 'node:fs';
const bal=JSON.parse(fs.readFileSync(new URL('../balance-reports/v1.1.89-active-82-tiffany-identity-certification.json',import.meta.url))); const ids=new Set(Object.keys(bal.stats));
function stable(v){if(Array.isArray(v))return v.map(stable);if(v&&typeof v==='object')return Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])]));return v}
const m=new Map(); for(const s of Object.values(superstars).filter(s=>ids.has(s.id))){const k=JSON.stringify(stable(s.ability?.trigger||{}));if(!m.has(k))m.set(k,[]);m.get(k).push(s)}
for(const [k,g] of m) if(g.length>1) console.log('\n'+g.map(s=>`${s.name} — ${s.ability?.name}`).join(' | ')+'\n'+k)
