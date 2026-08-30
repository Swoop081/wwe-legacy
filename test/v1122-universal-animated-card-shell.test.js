import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { allGameplayCards } from "../js/data/content.js?v=1.1.22";
import { isAnimatedCardEligible, canonicalAnimatedCardPaths } from "../js/data/animated-card-art.js?v=1.1.22";
const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../css/game.css",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("../tools/card-art-studio.html",import.meta.url),"utf8");
const studio=fs.readFileSync(new URL("../js/tools/card-art-studio.js",import.meta.url),"utf8");
const build=JSON.parse(fs.readFileSync(new URL("../build.json",import.meta.url),"utf8"));

test("v1.1.22 every authored gameplay card is animation-capable with canonical static fallback",()=>{
  assert.equal(build.version,"1.1.22");
  assert.equal(allGameplayCards.length,835);
  for(const card of allGameplayCards){
    assert.equal(isAnimatedCardEligible(card),true,card.id);
    const paths=canonicalAnimatedCardPaths(card);
    assert.ok(paths,card.id);
    assert.match(paths.relativeWebp,/-animated\.webp$/);
    assert.match(paths.relativeGif,/-animated\.gif$/);
  }
});

test("v1.1.22 animation is clipped into the normal collectible shell with live chrome above",()=>{
  assert.match(app,/function animatedCardSurfaceMarkup\(card\)/);
  assert.match(app,/const animatedSurface = animatedCardSurfaceMarkup\(card\)/);
  assert.match(app,/ccg-card-face ccg-card-front">\$\{frontMarkup\}\$\{animatedSurface\}/);
  assert.match(css,/\.ccg-animated-card-surface\{/);
  assert.match(css,/left:4\.2%.*right:4\.2%.*top:3\.6%.*bottom:24\.2%/s);
  assert.match(css,/object-fit:cover!important/);
  assert.match(css,/\.ccg-animation-set-logo\{/);
  assert.match(css,/right:7\.5%.*top:5\.2%/s);
  assert.match(css,/\.ccg-animation-rarity\{/);
  assert.match(app,/setLogoMarkup\(card\.setId, "ccg-animation-set-logo"\)/);
});

test("v1.1.22 inspector back is a direct non-mirrored rules face and move text stays inside the plaque",()=>{
  assert.match(css,/\.superstar-card-modal \.ccg-card\.is-flipped \.ccg-card-inner\{transform:none!important/);
  assert.match(css,/\.superstar-card-modal \.ccg-card\.is-flipped \.ccg-card-front\{display:none!important/);
  assert.match(css,/\.superstar-card-modal \.ccg-card\.is-flipped \.ccg-card-rules\{display:flex!important;transform:none!important/);
  assert.match(css,/ccg-live-front-move \.ccg-live-type:not\(\.has-requirement\).*top:92\.2%/s);
});

test("v1.1.22 Card Art Studio exposes animated artwork controls for every selected card",()=>{
  assert.match(html,/Available for every card/);
  assert.match(html,/normal card dimensions, frame, set logo, rarity and information plaque live above it/);
  assert.match(studio,/function isAnimationEligible\(card=currentCard\(\)\)\{return !!card&&!!card\.id;\}/);
  assert.doesNotMatch(studio,/static-only\. Choose an Entrance, Action or Finisher/);
});
