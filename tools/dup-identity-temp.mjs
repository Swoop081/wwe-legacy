import { superstars } from '../js/data/superstars.js';
import fs from 'node:fs';
const bal=JSON.parse(fs.readFileSync(new URL('../balance-reports/v1.1.89-active-82-tiffany-identity-certification.json',import.meta.url)));
const ids=new Set(Object.keys(bal.stats));
const arr=Object.values(superstars).filter(s=>ids.has(s.id));
function stable(v){if(Array.isArray(v))return v.map(stable); if(v&&typeof v==='object')return Object.fromEntries(Object.keys(v).sort().filter(k=>!['name','text'].includes(k)).map(k=>[k,stable(v[k])])); return v}
const groups=new Map();
for(const s of arr){const key=JSON.stringify(stable({trigger:s.ability?.trigger||null,maxUses:s.ability?.maxUses||null,special:s.special||null})); if(!groups.has(key))groups.set(key,[]);groups.get(key).push(s)}
for(const g of groups.values()) if(g.length>1) console.log(g.map(s=>`${s.name} [${s.ability?.name}] / ${s.special?.type}`).join(' || '));
