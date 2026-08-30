import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { allGameplayCards } from "../js/data/content.js?v=1.1.21";
import { isAnimatedCardEligible, canonicalAnimatedCardPaths } from "../js/data/animated-card-art.js?v=1.1.21";

const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("../tools/card-art-studio.html",import.meta.url),"utf8");
const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const studioData=fs.readFileSync(new URL("../js/tools/card-art-studio-data.js",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));

test("v1.1.19 animation eligibility is Entrance, Action and Finisher only",()=>{
  assert.ok(Number(build.version.split(".")[2]) >= 19, `expected v1.1.19+ build, got ${build.version}`);
  assert.equal(isAnimatedCardEligible({kind:"entrance"}),true);
  assert.equal(isAnimatedCardEligible({kind:"action"}),true);
  assert.equal(isAnimatedCardEligible({kind:"move",finisher:true}),true);
  assert.equal(isAnimatedCardEligible({kind:"move",finisher:false}),false);
  assert.equal(isAnimatedCardEligible({kind:"superstar"}),false);
  assert.equal(isAnimatedCardEligible({kind:"merch"}),false);
});

test("v1.1.19 all authored Entrances Actions and Finishers are eligible while ordinary moves are not",()=>{
  const entrances=allGameplayCards.filter(c=>c.kind==="entrance");
  const actions=allGameplayCards.filter(c=>c.kind==="action");
  const finishers=allGameplayCards.filter(c=>c.kind==="move"&&c.finisher);
  const ordinary=allGameplayCards.filter(c=>c.kind==="move"&&!c.finisher).slice(0,20);
  assert.ok(entrances.length>0&&actions.length>0&&finishers.length>0);
  for(const card of [...entrances,...actions,...finishers]) assert.equal(isAnimatedCardEligible(card),true,card.id);
  for(const card of ordinary) assert.equal(isAnimatedCardEligible(card),false,card.id);
});

test("v1.1.19 runtime uses canonical animated WebP then GIF with static base plate fallback",()=>{
  const action=allGameplayCards.find(c=>c.kind==="action");
  const paths=canonicalAnimatedCardPaths(action);
  assert.match(paths.relativeWebp,/^assets\/images\/.+-animated\.webp$/);
  assert.match(paths.relativeGif,/^assets\/images\/.+-animated\.gif$/);
  assert.match(app,/animatedCardPlateMarkup\(card\)/);
  assert.match(app,/data-animated-webp=/);
  assert.match(app,/data-animated-gif=/);
  assert.match(app,/IntersectionObserver/);
  assert.match(app,/unloadAnimatedCardPlate/);
  assert.match(app,/prefers-reduced-motion: reduce/);
  assert.match(css,/\.ccg-animated-card-plate\.is-animation-ready\{opacity:1!important\}/);
  assert.match(css,/\.ccg-live-front-data\{z-index:4!important\}/);
});

test("v1.1.19 Card Art Studio preserves GIF or animated WebP sources for eligible card families",()=>{
  assert.match(html,/id="animated-artwork-panel"/);
  assert.match(html,/Entrance · Action · Finisher/);
  assert.match(html,/id="animated-art-file"[^>]*accept="image\/gif,image\/webp,.gif,.webp"/);
  assert.match(html,/id="export-animated-art"/);
  assert.match(studio,/function isAnimationEligible\(card=currentCard\(\)\).*card\.kind==="entrance".*card\.kind==="action".*card\.finisher===true/);
  assert.match(studio,/async function fileIsAnimated\(file\)/);
  assert.match(studio,/ascii\.includes\("ANIM"\)\|\|ascii\.includes\("ANMF"\)/);
  assert.match(studio,/download\(state\.animatedFile,name\)/);
  assert.match(studio,/The ordinary Base Plate remains the static fallback/);
  assert.match(studioData,/"finisher":true/);
});
