import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));

test("v1.1.24 launch poster is viewport-centered with no inherited splash padding",()=>{
  assert.equal(build.version,"1.1.24");
  assert.match(css,/\.launch-poster-splash\{[\s\S]*position:fixed!important;[\s\S]*inset:0!important;[\s\S]*width:100vw!important;[\s\S]*padding:0!important;[\s\S]*align-items:center!important;[\s\S]*justify-content:center!important;/);
  assert.match(css,/\.launch-poster-frame\{[\s\S]*margin:0!important;[\s\S]*transform:none!important;/);
});
