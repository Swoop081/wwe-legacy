import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');
const block = app.slice(app.indexOf('const SEASON_ONE_CENA_CARD_ID'), app.indexOf('const SEASON_ONE_CENA_RENDER'));

test('v0.14.10 Season splash renders the exact Cena plate directly with no generic card shell', () => {
  assert.match(block, /card-layered-superstar-john-cena\.webp/);
  assert.match(block, /<img[^>]+class="season-one-cena-exact-front"/);
  assert.doesNotMatch(block, /class="ccg-card/);
  assert.doesNotMatch(block, /ccg-card-inner|ccg-card-face|ccg-card-art/);
});

test('v0.14.10 direct Cena plate owns the exact 680 by 1000 bounds edge-to-edge', () => {
  assert.match(css, /\.season-one-splash-v2 \.season-one-cena-actual-card\{[\s\S]*aspect-ratio:680\/1000!important;[\s\S]*padding:0!important;[\s\S]*border:0!important;[\s\S]*background:transparent!important;/);
  assert.match(css, /\.season-one-cena-actual-card>\.season-one-cena-exact-front\{[\s\S]*inset:0!important;[\s\S]*width:100%!important;[\s\S]*height:100%!important;[\s\S]*object-fit:fill!important;[\s\S]*object-position:center!important;/);
});

test('v0.14.10 Cena plate receives text only in its authored name bay', () => {
  assert.match(block, /season-one-cena-name-text/);
  assert.doesNotMatch(block, /ccg-tier-overlay|superstarNameplateMarkup\(card\)/);
  assert.match(css, /\.clean-launch-splash \.season-one-cena-name-text\{[\s\S]*background:none!important;[\s\S]*border:0!important;[\s\S]*box-shadow:none!important;/);
});

test('v0.14.10 flat finished Cena front suppresses the runtime text', () => {
  assert.match(block, /classList\.add\('uses-flat-cena-front'\)/);
  assert.match(css, /\.season-one-cena-actual-card\.uses-flat-cena-front \.season-one-cena-name-text\{display:none!important\}/);
});
