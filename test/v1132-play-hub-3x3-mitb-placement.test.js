import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');
const rules = fs.readFileSync(new URL('../js/data/game-rules.js', import.meta.url), 'utf8');

const play = app.slice(app.indexOf('function renderPlayMenu()'), app.indexOf('function showSurvivorSeries()'));
const live = app.slice(app.indexOf('function renderLiveEventHub()'), app.indexOf('function renderLiveEventTowerDetail'));

test('v1.1.32 Play hub is three modes per page with large page controls', () => {
  for (const id of ['play-exhibition','play-live-event','play-kotr','play-championship','play-survivor-series','play-ladder']) {
    assert.match(play, new RegExp(`id="${id}"`));
  }
  assert.match(play, /Six ways to build your WWE Legacy/);
  assert.match(play, /NEXT PAGE/);
  assert.match(css, /grid-template-rows:repeat\(3,minmax\(140px,auto\)\)!important/);
  assert.match(css, /\.play-mode-page-arrow\{[\s\S]*min-height:74px!important/);
  assert.doesNotMatch(css.slice(css.lastIndexOf('v1.1.32')), /legacy-mode-stack-featured/);
});

test('v1.1.32 Money in the Bank is no longer a Live Events hub card', () => {
  assert.doesNotMatch(live, /open-money-in-bank|money-in-bank-live-card|mitbCard/);
  assert.match(play, /modeLogoMarkup\("ladder",true\)/);
  assert.match(play, /money-in-the-bank-series-1/);
  assert.match(rules, /standalone Play mode on the second Choose Your Path page/);
});

test('v1.1.32 completed MITB returns to Play page 2 and Play nav stays active', () => {
  assert.match(app, /id="ladder-back-play"/);
  assert.match(app, /ladder-back-play"\)\?\.addEventListener\("click", showPlayMenuPage2\)/);
  assert.match(app, /screen === "survivor-series" \|\| screen === "ladder" \? "play-menu"/);
});
