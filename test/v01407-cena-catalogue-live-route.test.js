import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');
const seasonExclusive = fs.readFileSync(new URL('../js/data/season-exclusive.js', import.meta.url), 'utf8');

test('v0.14.07 exposes the complete current Cena Season reward set to player-facing Catalogue before ownership', () => {
  assert.match(app, /const rewardCards = collectionCards\.filter\(card => card\.setId === "season-1-last-time-is-now"\);/);
  assert.doesNotMatch(app, /card\.setId === "season-1-last-time-is-now" && \(CARD_TIERS\.some/);
  assert.match(app, /out\["season-1-last-time-is-now"\] = setCollections\["season-1-last-time-is-now"\]/);
});

test.skip('v0.14.07 splash exact-front-only contract superseded by v0.14.09 canonical plate + runtime nameplate composition', () => {
  assert.match(app, /card-layered-superstar-john-cena\.webp/);
  assert.match(app, /card-custom-superstar-john-cena\.webp/);
  assert.match(app, /data-season-cena-card="exact-authored-front"/);
  assert.match(app, /AUTHORED SUPERSTAR CARD ART NOT INSTALLED/);
  const cenaFn = app.slice(app.indexOf('const seasonOneCenaCardMarkup'), app.indexOf('const SEASON_ONE_CENA_RENDER'));
  assert.doesNotMatch(cenaFn, /collectibleCardMarkup|superstarPreviewCardMarkup|SEASON_ONE_CENA_RENDER|menuSuperstar/);
});

test('v0.14.07 corrects all live John Cena tier-100 presentation metadata to Tier 50', () => {
  assert.match(seasonExclusive, /"john-cena"[\s\S]*unlock: "tier-50-completion"/);
  assert.match(app, /legacy-season-foot[\s\S]*TIER \$\{SEASON_TIER_COUNT\} · JOHN CENA/);
  assert.doesNotMatch(app, /TIER 100 · JOHN CENA/);
});

test('v0.14.07 completed Live Event routes reconstruct saved opponents as cleared and render checks', () => {
  assert.match(app, /const hasSavedRoute = Array\.isArray\(run\?\.opponents\)/);
  assert.match(app, /const opponentIds = hasSavedRoute \? run\.opponents/);
  assert.match(app, /const stateClass = cleared \? 'cleared'/);
  assert.match(app, /const stateLabel = cleared \? 'DEFEATED'/);
  assert.match(app, /live-tower-route-card-frame/);
  assert.match(app, /live-tower-defeated-check/);
});

test('v0.14.07 defeated check is centered against the physical card frame, not the whole route tile', () => {
  assert.match(css, /\.live-tower-route-card-frame\{[\s\S]*position:relative!important;[\s\S]*width:fit-content!important/);
  assert.match(css, /\.live-tower-route-card-frame>\.live-tower-defeated-check\{[\s\S]*left:50%!important;[\s\S]*top:50%!important;[\s\S]*translate\(-50%,-50%\)/);
});

test('v0.14.07 splash layout reserves real vertical space so Season promo cannot overlap profile CTA', () => {
  assert.match(css, /body\[data-screen="splash"\] \.clean-splash-content\{[\s\S]*grid-template-rows:auto auto auto auto auto!important/);
  assert.match(css, /body\[data-screen="splash"\] \.clean-launch-splash\{[\s\S]*overflow-y:auto!important/);
});
