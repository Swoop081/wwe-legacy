import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');
const splash = app.slice(app.indexOf('function splashPromoMarkup()'), app.indexOf('function renderSplash()'));

test('v0.14.09 premium splash renders the canonical Cena card helper', () => {
  assert.match(splash, /seasonOneCenaCardMarkup\("season-ad-cena"\)/);
  assert.match(splash, /50-tier Season Road/);
  assert.match(splash, /TIER 50/);
});

test('v0.14.09 Cena exact plate is never reconstructed from menu art', () => {
  const block = app.slice(app.indexOf('const SEASON_ONE_CENA_CARD_ID'), app.indexOf('const SEASON_ONE_CENA_RENDER'));
  assert.doesNotMatch(block, /SEASON_ONE_CENA_RENDER|official-wwe-cena-render|menuSuperstarPhotoMarkup/);
  assert.match(block, /supplied 680x1000[\s\S]*actual authored card plate/);
});

test('v0.14.09 Cena splash applies text only inside the baked name bay', () => {
  assert.match(css, /\.season-one-cena-name-text strong\{/);
  assert.match(css, /\.season-one-cena-name-text small\{/);
  assert.match(css, /\.season-one-cena-authored-collectible \.ccg-tier-overlay\{display:none!important\}/);
});
