import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("../tools/card-art-studio.html",import.meta.url),"utf8");
const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
const animated=fs.readFileSync(new URL("../js/data/animated-card-art.js",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));

test("v1.1.21 linked animated URLs survive CORS-blocked raw fetches",()=>{
  assert.ok(Number(build.version.split(".")[2]) >= 21, `expected v1.1.21+ build, got ${build.version}`);
  assert.match(studio,/await new Promise\(\(resolve,reject\)=>\{const img=new Image\(\)/);
  assert.match(studio,/CORS is no longer required for linked playback/);
  assert.match(studio,/try\{\s*const response=await fetch\(url\.href,\{mode:"cors"/s);
  assert.match(studio,/catch\{\s*state\.animatedFile=null;\s*updateAnimationControls\(\);\s*animatedStatus\(`Linked animation saved and ready for the game/s);
});

test("v1.1.21 Studio persists and restores one linked animation URL per eligible card",()=>{
  assert.match(studio,/LINKED_ANIMATION_STORAGE_KEY="wweLegacyAnimatedCardLinks\.v1"/);
  assert.match(studio,/function saveLinkedAnimation\(card,url\)/);
  assert.match(studio,/state\.animatedLinkedUrl=savedLinkedAnimation\(currentCard\(\)\)/);
  assert.match(html,/id="remove-linked-animation"/);
  assert.match(html,/id="linked-animation-preview"/);
});

test("v1.1.21 live cards prefer the linked URL and fall back to packaged WebP then GIF",()=>{
  assert.match(animated,/export function linkedAnimatedCardUrl\(card\)/);
  assert.match(animated,/linked: linkedAnimatedCardUrl\(card\)/);
  assert.match(app,/data-animated-linked=/);
  assert.match(app,/const preferred = img\.dataset\.animationPreferred \|\| linked \|\| webp \|\| gif/);
  assert.match(app,/current === linked && webp/);
  assert.match(app,/current === webp && gif/);
});

test("v1.1.21 linked mode keeps raw export optional rather than failing the URL workflow",()=>{
  assert.match(html,/Direct GIF\/WebP links can be linked without CORS/);
  assert.match(studio,/state\.animatedFile=file;\s*updateAnimationControls\(\);/);
  assert.match(studio,/if\(button\)button\.disabled=!eligible\|\|!state\.animatedFile/);
});
