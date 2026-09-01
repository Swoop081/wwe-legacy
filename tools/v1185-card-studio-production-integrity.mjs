
import fs from 'node:fs';
import { collectionCards } from '../js/data/collection.js';
import { superstars } from '../js/data/superstars.js';
import { decks } from '../js/data/decks.js';
import { sets } from '../js/data/sets.js';
import { MERCH_ITEMS } from '../js/data/merch.js';
import { SUPERSTAR_VARIANTS } from '../js/data/superstar-variants.js';
import { canonicalImageKeyForCard, canonicalCardImagePath, canonicalBasePlatePath } from '../js/data/artwork.js';
import { fixedPrintingTierFor } from '../js/data/variants.js';

const studioJs=fs.readFileSync('js/tools/card-art-studio.js','utf8');
const all=[...collectionCards,...MERCH_ITEMS,...SUPERSTAR_VARIANTS];
const starIds=new Set(Object.values(superstars).map(s=>s.id)),setIds=new Set(Object.keys(sets));
const usage=new Map();
for(const [sid,deck] of Object.entries(decks))for(const c of deck??[]){if(!usage.has(c.id))usage.set(c.id,new Set());usage.get(c.id).add(sid);}

const issues=[],warnings=[];
const seenId=new Map(),seenFinished=new Map(),seenPlate=new Map(),seenImageKey=new Map();
const role=c=>c.kind==='superstar'?'Superstar':c.kind==='entrance'?'Entrance':c.finisher?'Finisher':c.trademark?'Trademark':c.kind;
for(const c of all){
 const src=c.id||'(missing-id)';
 if(!c.id)issues.push({type:'missing-id',card:c.name});
 if(!String(c.name||'').trim())issues.push({type:'missing-name',id:src});
 if(c.setId&&!setIds.has(c.setId))issues.push({type:'unknown-set',id:src,setId:c.setId});
 if(c.superstarId&&!starIds.has(c.superstarId))issues.push({type:'unknown-superstar',id:src,superstarId:c.superstarId});
 if(c.kind==='superstar'&&!c.superstarId){
   const sid=String(c.id||'').replace(/^superstar-/,'');
   if(!starIds.has(sid))issues.push({type:'superstar-card-unresolved',id:src});
 }
 if(c.finisher&&(c.method!==null&&c.method!==undefined))issues.push({type:'finisher-has-method',id:src,method:c.method});
 const fixed=fixedPrintingTierFor(c);
 if((c.kind==='superstar'||c.kind==='entrance')&&fixed!=='amethyst')issues.push({type:'fixed-tier-wrong',id:src,kind:c.kind,fixed});
 if(c.setId?.startsWith('season-')&&c.superstarId==='trish-stratus'&&fixed!=='amethyst')issues.push({type:'reward-tier-wrong',id:src,fixed});
 const key=canonicalImageKeyForCard(c),finished=canonicalCardImagePath(c),plate=canonicalBasePlatePath(c);
 if(!key)issues.push({type:'missing-image-key',id:src});
 if(!finished||!/^assets\/images\/.+\.webp$/.test(finished))issues.push({type:'bad-finished-path',id:src,finished});
 if(!plate||!/^assets\/images\/.+-base-plate\.webp$/.test(plate))issues.push({type:'bad-base-plate-path',id:src,plate});
 for(const [map,value,type] of [[seenId,c.id,'duplicate-id'],[seenFinished,finished,'finished-path-collision'],[seenPlate,plate,'base-plate-collision']]){
   if(!value)continue;
   if(map.has(value)&&map.get(value)!==c.id)issues.push({type,value,ids:[map.get(value),c.id]}); else map.set(value,c.id);
 }
 if(key){
   if(seenImageKey.has(key)&&seenImageKey.get(key)!==c.id)warnings.push({type:'image-key-reuse',key,ids:[seenImageKey.get(key),c.id]}); else seenImageKey.set(key,c.id);
 }
 if(c.superstarId&&!c.variantType&&c.kind!=='merch'&&c.kind!=='superstar'&&c.kind!=='entrance'&&!(usage.get(c.id)?.has(c.superstarId))){
   warnings.push({type:'specific-card-not-in-owner-deck',id:c.id,superstarId:c.superstarId});
 }
 if((c.finisher||c.trademark)&&!c.superstarId&&!Array.isArray(c.allowedSuperstarIds)){
   warnings.push({type:'shared-special-role',id:c.id,name:c.name,role:role(c)});
 }
}
// Card Studio set-logo coverage: every studio set must have an explicit theme and every collectible set must have some logo source.
const setThemeBlock=studioJs.match(/const SETS = (\{.*?\});\n/s)?.[1]??'{}';
let themed={};try{themed=JSON.parse(setThemeBlock);}catch{}
const logoAssignments=new Set([...studioJs.matchAll(/SET_LOGO_ASSETS\["([^"]+)"\]/g)].map(m=>m[1]));
for(const sid of setIds)if(studioJs.includes(`\"${sid}\"`)&&studioJs.includes('SET_LOGO_ASSETS'))logoAssignments.add(sid);
const embeddedBlock=studioJs.match(/const EMBEDDED_SET_LOGOS\s*=\s*(\{.*?\});/s)?.[1]??'{}';
let embedded={};try{embedded=JSON.parse(embeddedBlock);}catch{}
for(const sid of new Set(all.map(c=>c.setId).filter(Boolean))){
 if(!themed[sid]&&!sets[sid])issues.push({type:'studio-theme-missing',setId:sid});
 if(!logoAssignments.has(sid)&&!embedded[sid])warnings.push({type:'set-logo-source-not-explicit',setId:sid});
}

const report={
 version:'1.1.85',
 cards:all.length,
 collectorCards:collectionCards.length,
 merch:MERCH_ITEMS.length,
 variants:SUPERSTAR_VARIANTS.length,
 superstars:Object.keys(superstars).length,
 sets:Object.keys(sets).length,
 issues,warnings,
 summary:{
   issueCount:issues.length,warningCount:warnings.length,
   missingNames:issues.filter(x=>x.type==='missing-name').length,
   pathCollisions:issues.filter(x=>/collision/.test(x.type)).length,
   fixedTierErrors:issues.filter(x=>x.type.includes('tier')).length,
   brokenAttribution:issues.filter(x=>x.type.includes('superstar')).length,
   logoWarnings:warnings.filter(x=>x.type==='set-logo-source-not-explicit').length
 }
};
fs.writeFileSync('reports/v1.1.85-card-studio-production-integrity.json',JSON.stringify(report,null,2)+'\n');
const md=[
'# WWE Legacy v1.1.85 — Card Studio Production Integrity Audit','',
`- Studio entries audited: **${report.cards.toLocaleString()}**`,
`- Collector cards: **${report.collectorCards.toLocaleString()}**`,
`- Merch: **${report.merch}**`,
`- Variants: **${report.variants}**`,
`- Superstars: **${report.superstars}**`,
`- Sets: **${report.sets}**`,
`- Hard issues: **${issues.length}**`,
`- Warnings: **${warnings.length}**`,
'',
'## Hard issues','',
...(issues.length?issues.map(x=>`- \`${x.type}\` — ${JSON.stringify(x)}`):['- None.']),
'',
'## Warnings','',
...(warnings.length?warnings.map(x=>`- \`${x.type}\` — ${JSON.stringify(x)}`):['- None.'])
];
fs.mkdirSync('reports',{recursive:true});
fs.writeFileSync('reports/v1.1.85-card-studio-production-integrity.md',md.join('\n')+'\n');
console.log(JSON.stringify(report.summary,null,2));
