import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("../tools/card-art-studio.html",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../css/card-art-studio.css",import.meta.url),"utf8");
const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));

test("v1.1.18 adds one-pixel nudge controls to both Position sliders",()=>{
  assert.ok(Number(build.version.split(".")[2]) >= 18, `expected v1.1.18+ build, got ${build.version}`);
  for(const id of ["art-x-minus","art-x-plus","art-y-minus","art-y-plus"]) assert.match(html,new RegExp(`id="${id}"`));
  assert.match(html,/id="art-x-minus"[^>]*>−1 px<\/button>[\s\S]*id="art-x"[\s\S]*id="art-x-plus"[^>]*>\+1 px<\/button>/);
  assert.match(html,/id="art-y-minus"[^>]*>−1 px<\/button>[\s\S]*id="art-y"[\s\S]*id="art-y-plus"[^>]*>\+1 px<\/button>/);
});

test("v1.1.18 nudge buttons change the selected axis by exactly one displayed pixel",()=>{
  assert.match(studio,/function nudgeArtwork\(axis,delta\)[\s\S]*Math\.round\(state\[key\]\)\+delta/);
  assert.match(studio,/#art-x-minus"\)\.addEventListener\("click",\(\)=>nudgeArtwork\("x",-1\)\)/);
  assert.match(studio,/#art-x-plus"\)\.addEventListener\("click",\(\)=>nudgeArtwork\("x",1\)\)/);
  assert.match(studio,/#art-y-minus"\)\.addEventListener\("click",\(\)=>nudgeArtwork\("y",-1\)\)/);
  assert.match(studio,/#art-y-plus"\)\.addEventListener\("click",\(\)=>nudgeArtwork\("y",1\)\)/);
});

test("v1.1.18 keeps slider coarse control between compact nudge buttons",()=>{
  assert.match(css,/\.position-nudge-row\{[^}]*grid-template-columns:auto minmax\(0,1fr\) auto/);
  assert.match(css,/\.position-nudge\{[^}]*min-width:52px/);
  assert.match(html,/aria-label="Move artwork left 1 pixel"/);
  assert.match(html,/aria-label="Move artwork right 1 pixel"/);
  assert.match(html,/aria-label="Move artwork up 1 pixel"/);
  assert.match(html,/aria-label="Move artwork down 1 pixel"/);
});
