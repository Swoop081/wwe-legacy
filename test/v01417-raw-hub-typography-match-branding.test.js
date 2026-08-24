import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');

test('v0.14.17 RAW hub uses the standard split-title typography instead of the RAW image logo', () => {
  assert.match(app, /titleMarkup = isRaw \? `<h3 class="live-event-split-title title-raw"><span>RAW<\/span><b>EVENT<\/b><\/h3>`/);
  assert.doesNotMatch(app, /raw-live-hub-logo/);
  assert.match(css, /title-raw span\{color:#f7f8fb!important\}/);
  assert.match(css, /title-raw b\{color:#ef2637!important\}/);
});

test('v0.14.17 RAW match presentation is independent from the released-set booster reward', () => {
  assert.match(app, /matchPresentationSetId = eventMeta\?\.presentationSetId \?\? eventMeta\?\.rewardSetId \?\? randomMatchPresentationSet\(\)/);
  assert.match(app, /presentationSetId: tower\.event\.logoMode === "raw" \? "raw-series-1" : tower\.event\.rewardSetId/);
  assert.match(app, /rewardSetId: tower\.event\.rewardSetId/);
});

test('v0.14.17 RAW logo is used by Entrance presentation and the play-pile ring canvas', () => {
  assert.match(app, /entrance-intro-screen \$\{presentationThemeClass\(brandSetId\)\}/);
  assert.match(app, /setLogoMarkup\(brandSetId, "prematch-show-logo"\)/);
  assert.match(app, /setLogoMarkup\(matchPresentationSetId,"ring-centre-logo"\)/);
  assert.match(app, /"raw-series-1": assetUrl\("assets\/images\/branding-raw-series-1-raw-logo\.webp"\)/);
});
