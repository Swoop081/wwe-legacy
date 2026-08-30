import fs from "node:fs";
import { collectionCards } from "../js/data/collection.js";
import { CARD_NUMBER_MANIFEST, CARD_NUMBER_BY_ID } from "../js/data/card-number-manifest.js";

const issues=[];
const codes=new Set(), ids=new Set();
for(const entry of CARD_NUMBER_MANIFEST){
  if(ids.has(entry.id))issues.push(`duplicate manifest id ${entry.id}`); ids.add(entry.id);
  if(codes.has(entry.cardCode))issues.push(`duplicate collector code ${entry.cardCode}`); codes.add(entry.cardCode);
}
for(const card of collectionCards){
  const m=CARD_NUMBER_BY_ID[card.id];
  if(!m)issues.push(`missing manifest entry ${card.id}`);
  else if(m.cardCode!==card.cardCode||m.cardNumber!==card.cardNumber||m.setId!==card.setId)issues.push(`runtime mismatch ${card.id}`);
}
const perSet={};
for(const entry of CARD_NUMBER_MANIFEST)(perSet[entry.setId]??=[]).push(entry.cardNumber);
// Collector numbers already assigned to authored cards stay stable when a card package is re-homed.
// Randy Orton moved from the still-banked Survivor Series set to Ruthless Aggression in v1.1,
// so SVS1-013 through SVS1-018 remain intentionally reserved rather than renumbering every later SVS1 card.
const reservedNumbersBySet={
  'survivor-series-series-1': new Set([13,14,15,16,17,18]),
  // v1.1.44 merges the former Arm Drag Counter into EVO1-007 Arm Drag.
  // Keep its retired collector slot reserved so every later Evolution identity stays stable.
  'evolution-series-1': new Set([63]),
};
for(const [setId,numbers] of Object.entries(perSet)){
  numbers.sort((a,b)=>a-b);
  const reserved=reservedNumbersBySet[setId]??new Set();
  const max=Math.max(...numbers,...reserved);
  const actual=new Set(numbers);
  for(let expected=1;expected<=max;expected+=1){
    if(!actual.has(expected)&&!reserved.has(expected))issues.push(`${setId} gap/sequence mismatch at ${expected}`);
  }
}
const source=fs.readFileSync(new URL("../js/tools/card-art-studio-data.js",import.meta.url),"utf8");
const match=source.match(/const STUDIO_CARDS = (\[.*\]);\nconst STUDIO_SUPERSTARS/s);
if(!match)issues.push("Studio generated dataset unreadable");
else{
  const studio=JSON.parse(match[1]), byId=new Map(studio.map(card=>[card.id,card]));
  const collectorStudio=studio.filter(card=>card.source==="collector"||CARD_NUMBER_BY_ID[card.id]);
  if(collectorStudio.length!==collectionCards.length)issues.push(`Studio has ${collectorStudio.length} canonical collector cards; expected ${collectionCards.length}`);
  for(const card of collectionCards){const s=byId.get(card.id);if(!s)issues.push(`Studio missing ${card.id}`);else if(s.cardCode!==card.cardCode)issues.push(`Studio code mismatch ${card.id}: ${s.cardCode} != ${card.cardCode}`);}
}
console.log(JSON.stringify({cards:collectionCards.length,manifest:CARD_NUMBER_MANIFEST.length,sets:Object.fromEntries(Object.entries(perSet).map(([id,n])=>[id,{count:n.length,first:Math.min(...n),last:Math.max(...n)}])),issues},null,2));
if(issues.length)process.exit(1);
