import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app=fs.readFileSync(new URL('../js/ui/app.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../css/game.css',import.meta.url),'utf8');
const studio=fs.readFileSync(new URL('../js/tools/card-art-studio.js',import.meta.url),'utf8');
const build=JSON.parse(fs.readFileSync(new URL('../build.json',import.meta.url),'utf8'));
const pkg=JSON.parse(fs.readFileSync(new URL('../package.json',import.meta.url),'utf8'));

test('v1.1.4-or-later version markers are aligned',()=>{
  assert.equal(build.version,pkg.version);
  assert.ok(Number(build.version.replace(/\./g,''))>=114);
});

test('v1.1.4 live layered fronts use the premium lower information plaque',()=>{
  assert.match(css,/(?:Premium collectible lower plaque|Clean collectible information band)/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-front-data::before/);
  assert.match(css,/\.ccg-card\.is-layered-front \.ccg-live-stat/);
  assert.match(app,/ccg-live-requirement/);
  assert.match(app,/MOVE • \$\{moveType\}/);
});

test('v1.1.4 Reward cards are a distinct premium frame family',()=>{
  assert.match(app,/function isPremiumRewardCard\(card\)/);
  assert.match(app,/is-premium-reward-card/);
  assert.match(app,/is-premium-reward-card/);
  assert.match(css,/\.ccg-card\.is-premium-reward-card \.ccg-card-front/);
  assert.match(studio,/function studioRewardSet\(card\)/);
  assert.match(studio,/branding-wwe-legacy-reward-logo\.png/);
});

test('v1.1.4 wires approved NXT and Ruthless Aggression logo sources',()=>{
  assert.match(app,/https:\/\/corporate\.wwe\.com\/f\/inline-images\/NXT-logo\.png/);
  assert.match(app,/images\.hobbydb\.com[\s\S]*WWE_20Ruthless_20Aggression_20logo_large\.png/);
  assert.match(studio,/SET_LOGO_ASSETS\["nxt-series-1"\]/);
  assert.match(studio,/SET_LOGO_ASSETS\["ruthless-aggression-series-1"\]/);
});

test('v1.1.4 gives NXT and Ruthless Aggression first-class Studio themes',()=>{
  assert.match(studio,/SETS\["nxt-series-1"\]/);
  assert.match(studio,/SETS\["ruthless-aggression-series-1"\]/);
  assert.match(studio,/function drawNxt\(c,w,h\)/);
  assert.match(studio,/function drawRuthlessAggression\(c,w,h\)/);
  assert.match(studio,/set==="nxt-series-1"\)drawNxt/);
  assert.match(studio,/set==="ruthless-aggression-series-1"\)drawRuthlessAggression/);
});

test('v1.1.4 keeps rarity stars and top set-logo rendering intact',()=>{
  assert.match(app,/ccg-live-rarity/);
  assert.match(app,/function setLogoMarkup\(setId/);
  assert.match(studio,/drawRarityStars\(\)/);
  assert.match(studio,/drawSetLogo\(\)/);
});
