import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');

test('v0.14.08 Season splash composes Cena layered plate with canonical runtime nameplate', () => {
  const start = app.indexOf('const SEASON_ONE_CENA_CARD_ID');
  const end = app.indexOf('const SEASON_ONE_CENA_RENDER');
  const block = app.slice(start, end);
  assert.match(block, /SEASON_ONE_CENA_CARD_ID = "superstar-john-cena"/);
  assert.match(block, /card-layered-superstar-john-cena\.webp/);
  assert.match(block, /card-custom-superstar-john-cena\.webp/);
  assert.match(block, /superstarNameplateMarkup\(card\)/);
  assert.match(block, /season-one-cena-authored-collectible/);
  assert.match(block, /data-card-tier="ruby"/);
  assert.match(block, /data-season-cena-card="canonical-authored-card"/);
  assert.doesNotMatch(block, /SEASON_ONE_CENA_RENDER|menuSuperstarPhotoMarkup|superstarVisualMarkup/);
});

test('v0.14.08 flat finished Cena front suppresses runtime nameplate while layered plate keeps it', () => {
  const start = app.indexOf('const SEASON_ONE_CENA_CARD_ID');
  const end = app.indexOf('const SEASON_ONE_CENA_RENDER');
  const block = app.slice(start, end);
  assert.match(block, /classList\.add\('has-flat-superstar-front'\)/);
  assert.match(css, /\.ccg-card\.has-flat-superstar-front \.ccg-superstar-nameplate\{display:none!important\}/);
});

test('v0.14.08 splash Cena card remains centered and bounded as one physical card', () => {
  assert.match(css, /\.clean-launch-splash \.season-one-cena-actual-card>\.season-one-cena-authored-collectible\{[\s\S]*width:100%!important;[\s\S]*height:100%!important;/);
  assert.match(css, /\.season-one-cena-actual-card>[\s\S]*margin-inline:auto!important/);
});
