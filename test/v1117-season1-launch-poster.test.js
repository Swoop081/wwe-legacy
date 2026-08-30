import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const app=fs.readFileSync(path.join(root,"js/ui/app.js"),"utf8");
const css=fs.readFileSync(path.join(root,"css/game.css"),"utf8");
const splash=app.match(/function renderSplash\(\)[\s\S]*?function renderMainMenu\(\)/)?.[0] ?? "";

function jpegSize(file){
  const b=fs.readFileSync(file);
  assert.equal(b[0],0xff); assert.equal(b[1],0xd8);
  let i=2;
  while(i<b.length){
    if(b[i]!==0xff){ i+=1; continue; }
    const marker=b[i+1]; i+=2;
    if(marker===0xd8||marker===0xd9) continue;
    const len=b.readUInt16BE(i);
    if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)){
      return [b.readUInt16BE(i+5),b.readUInt16BE(i+3)];
    }
    i+=len;
  }
  throw new Error("JPEG dimensions not found");
}

test("v1.1.17 replaces the old launch composition with the supplied Season 1 poster",()=>{
  assert.match(splash,/season1-stratusfaction-launch-poster\.jpg\?v=\$\{BUILD_VERSION\}/);
  assert.match(splash,/class="splash-screen launch-poster-splash"/);
  assert.doesNotMatch(splash,/splashPromoMarkup\(\)/);
  assert.doesNotMatch(splash,/clean-splash-profile/);
  assert.doesNotMatch(splash,/id="enter-legacy"/);
});

test("v1.1.17 PLAY NOW artwork has a responsive percentage hotspot that enters Home for returning profiles",()=>{
  assert.match(splash,/id="launch-poster-play"/);
  assert.match(splash,/if \(profile\) showMainMenu\(\)/);
  assert.match(splash,/else \{ screen = "starter"; message = ""; renderStarter\(\); \}/);
  assert.match(css,/\.launch-poster-play-hotspot\{[\s\S]*left:15\.7%;[\s\S]*right:15\.7%;[\s\S]*top:87\.2%;[\s\S]*bottom:1\.55%;/);
  assert.match(css,/touch-action:manipulation/);
});

test("v1.1.17 launch poster remains uncropped while a full-bleed backdrop fills the viewport",()=>{
  assert.match(css,/\.launch-poster-splash::before\{[\s\S]*season1-stratusfaction-launch-poster\.jpg\?v=\d+\.\d+\.\d+[\s\S]*center\/cover no-repeat/);
  assert.match(css,/\.launch-poster-image\{[\s\S]*object-fit:contain/);
  assert.match(css,/aspect-ratio:768\/1376/);
});

test("v1.1.17 packages the supplied 768x1376 launch artwork locally",()=>{
  const file=path.join(root,"assets/images/season1-stratusfaction-launch-poster.jpg");
  assert.ok(fs.existsSync(file));
  assert.deepEqual(jpegSize(file),[768,1376]);
});
