import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");

function functionBlock(name,nextName){
  const start=studio.indexOf(`function ${name}`);
  assert.notEqual(start,-1,`${name} must exist`);
  const end=studio.indexOf(`function ${nextName}`,start+1);
  return studio.slice(start,end>start?end:studio.length);
}

test("v1.1.16 Money in the Bank template has no set-specific band above the lower plaque",()=>{
  const block=functionBlock("drawMoneyInTheBank(c,w,h)","drawWorldsCollide");
  assert.doesNotMatch(block,/const brief=c\.createLinearGradient/);
  assert.doesNotMatch(block,/fillRect\(w\*\.10,h\*\.72,w\*\.80,h\*\.12\)/);
  assert.match(block,/v1\.1\.16[^\n]*Money in the Bank set field clean above the plaque/);
});

test("v1.1.16 MITB retains its normal background identity after removing the plaque-adjacent band",()=>{
  const block=functionBlock("drawMoneyInTheBank(c,w,h)","drawWorldsCollide");
  assert.match(block,/createLinearGradient\(0,0,w,h\)/);
  assert.match(block,/createRadialGradient\(w\*\.66,h\*\.18/);
  assert.match(block,/strokeStyle="#7cf14b"/);
  assert.match(block,/strokeStyle="#a855f7"/);
});
