import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import { collectionCards } from "../js/data/collection.js";
import { canonicalCardImagePath, canonicalBasePlatePath, legacyFinishedCardArtFor } from "../js/data/artwork.js";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const exists=rel=>{if(!rel)return false;const clean=String(rel).split("?")[0].replace(/^\.\//,"");return fs.existsSync(path.join(root,clean));};
let missing=[];
for(const c of collectionCards){
  if(c.kind==="momentum") continue; // Momentum uses generated graphic treatment, not photo plates.
  const candidates=[canonicalCardImagePath(c),canonicalBasePlatePath(c)];
  const legacy=legacyFinishedCardArtFor(c);if(legacy)candidates.push(String(legacy).split("?")[0]);
  if(!candidates.some(exists))missing.push(c.id);
}
console.log(JSON.stringify({cards:collectionCards.length,photoCardsAudited:collectionCards.filter(c=>c.kind!=="momentum").length,missing:missing.length,missingIds:missing.slice(0,100)},null,2));
if(missing.length)process.exit(1);
