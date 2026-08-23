import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');

const cenaBlock = () => {
  const start = app.indexOf('const SEASON_ONE_CENA_CARD_ID');
  const end = app.indexOf('const SEASON_ONE_CENA_RENDER');
  return app.slice(start, end);
};

test('v0.14.09 Season splash uses the exact authored Cena plate and text-only name treatment', () => {
  const block = cenaBlock();
  assert.match(block, /SEASON_ONE_CENA_CARD_ID = "superstar-john-cena"/);
  assert.match(block, /card-layered-superstar-john-cena\.webp/);
  assert.match(block, /card-custom-superstar-john-cena\.webp/);
  assert.match(block, /season-one-cena-name-text/);
  assert.match(block, /data-card-tier="ruby"/);
  assert.match(block, /data-season-cena-card="canonical-authored-card"/);
  assert.doesNotMatch(block, /superstarNameplateMarkup\(card\)/);
  assert.doesNotMatch(block, /ccg-tier-overlay/);
  assert.doesNotMatch(block, /SEASON_ONE_CENA_RENDER|menuSuperstarPhotoMarkup|superstarVisualMarkup/);
});

test('v0.14.09 Cena splash does not paint a second nameplate panel over the authored plate', () => {
  assert.match(css, /\.clean-launch-splash \.season-one-cena-name-text\{[\s\S]*background:none!important;[\s\S]*border:0!important;[\s\S]*box-shadow:none!important;[\s\S]*clip-path:none!important;/);
  assert.match(css, /bottom:2\.7%!important;[\s\S]*height:15\.8%!important;/);
});

test('v0.14.09 flat finished Cena front suppresses the text-only overlay', () => {
  const block = cenaBlock();
  assert.match(block, /classList\.add\('has-flat-superstar-front'\)/);
  assert.match(css, /\.season-one-cena-authored-collectible\.has-flat-superstar-front \.season-one-cena-name-text\{display:none!important\}/);
});

test('v0.14.09 splash Cena card remains centered and preserves the exact 680 by 1000 ratio', () => {
  assert.match(css, /\.season-one-cena-actual-card\{[\s\S]*aspect-ratio:680\/1000!important;/);
  assert.match(css, /\.season-one-cena-exact-front\{[\s\S]*object-fit:contain!important;[\s\S]*object-position:center center!important;/);
});
