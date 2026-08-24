import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');

test('v0.14.18 Tier Up physical card rewards use a dedicated compact wrapper', () => {
  assert.match(app, /class="tier-up-physical-card"/);
  assert.match(app, /collectibleCardMarkup\(card,\{extraClass:"tier-up-superstar-card",interactive:false\}\)/);
  assert.match(app, /collectibleCardMarkup\(starCard,\{extraClass:"tier-up-superstar-card",interactive:false\}\)/);
});

test('v0.14.18 Tier Up reward card is capped well below hero-card size on iPhone', () => {
  assert.match(css, /#tier-up-layer \.tier-up-superstar-reward \.tier-up-physical-card\{[\s\S]*?width:min\(112px,26vw\)!important;[\s\S]*?max-width:112px!important/);
  assert.match(css, /@media\(max-height:760px\)\{[\s\S]*?width:min\(96px,23vw\)!important;max-width:96px!important/);
  assert.match(css, /\.tier-up-physical-card>\.ccg-card,[\s\S]*?width:100%!important;[\s\S]*?pointer-events:none!important/);
});
