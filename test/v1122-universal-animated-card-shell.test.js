import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { allGameplayCards } from "../js/data/content.js?v=1.1.45";
import { isAnimatedCardEligible, canonicalAnimatedCardPaths } from "../js/data/animated-card-art.js?v=1.1.45";
const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("../tools/card-art-studio.html",import.meta.url),"utf8");
const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));

test("v1.1.23+ every gameplay card is animation-capable with a static fallback",()=>{
  assert.ok(Number(build.version.split(".")[2]) >= 23, `expected v1.1.23+ build, got ${build.version}`);
  assert.equal(allGameplayCards.length,841);
  for(const card of allGameplayCards){assert.equal(isAnimatedCardEligible(card),true,card.id);const p=canonicalAnimatedCardPaths(card);assert.ok(p);assert.match(p.relativeWebp,/-animated\.webp$/);assert.match(p.relativeGif,/-animated\.gif$/);}
});

test("v1.1.23+ animation stays inside the live artwork window while keeping the shell intact",()=>{
  assert.match(app,/function animatedCardSurfaceMarkup\(card\)/);
  assert.match(app,/data-animated-card-kind=/);
  assert.match(css,/\.ccg-animated-card-surface\{/);
  // v1.1.38 supersedes the old plaque-anchored bay: artwork starts below the
  // top border and ends exactly at the Card Studio plaque boundary.
  assert.match(css,/\.ccg-card\.has-active-animation \.ccg-animated-card-surface\{[\s\S]*top:4\.8%!important;[\s\S]*bottom:22\.8%!important/);
  assert.match(css,/\.ccg-card\.type-move\.has-active-animation \.ccg-animated-card-surface\{bottom:26%!important\}/);
  assert.match(css,/\.ccg-animated-set-logo/);
  assert.doesNotMatch(app,/function animatedCardChromeMarkup\(card\)/);
});

test("v1.1.23+ inspector back is not a mirrored animated front",()=>{
  assert.match(css,/\.superstar-card-modal \.ccg-card\.is-flipped \.ccg-card-inner\{transform:none!important/);
  assert.match(css,/\.superstar-card-modal \.ccg-card\.is-flipped \.ccg-card-front\{display:none!important/);
  assert.match(css,/\.superstar-card-modal \.ccg-card\.is-flipped \.ccg-card-rules\{display:flex!important;transform:none!important/);
});

test("v1.1.23+ Studio offers animation for every selected card",()=>{
  assert.match(html,/Available for every card/);
  assert.match(html,/clips animation into the normal artwork window only/);
  assert.match(studio,/function isAnimationEligible\(card=currentCard\(\)\)\{return !!card&&!!card\.id;\}/);
});
