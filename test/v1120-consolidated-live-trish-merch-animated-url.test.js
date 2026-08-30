import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { allGameplayCards } from '../js/data/content.js?v=1.1.23';
import { SUPERSTAR_MERCH } from '../js/data/merch.js?v=1.1.23';
import { LAUNCH_THEME_TOWERS, LIVE_EVENT_ROTATION_POOL, activeLiveEventTowers, rotatingLiveEventTemplates } from '../js/data/live-events.js?v=1.1.23';
import { SEASON_1_CHASE_TIER_REWARDS } from '../js/data/seasons.js?v=1.1.23';

const studio = fs.readFileSync(new URL('../js/tools/card-art-studio.js', import.meta.url), 'utf8');
const studioHtml = fs.readFileSync(new URL('../tools/card-art-studio.html', import.meta.url), 'utf8');
const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const build = JSON.parse(fs.readFileSync(new URL('../build.json', import.meta.url), 'utf8'));

test('v1.1.20 rotates exactly three Live Events daily with a full one-day cooldown and no Birthday Bash', () => {
  assert.ok(Number(build.version.split('.')[2]) >= 20, `expected v1.1.20+ build, got ${build.version}`);
  assert.equal(LAUNCH_THEME_TOWERS.length, 9);
  assert.ok(LIVE_EVENT_ROTATION_POOL.some(event => event.id === 'submission-specialists'));
  const day1 = new Date('2026-08-30T12:00:00');
  const day2 = new Date('2026-08-31T12:00:00');
  const a = activeLiveEventTowers(day1).map(t => t.event.id);
  const b = activeLiveEventTowers(day2).map(t => t.event.id);
  assert.equal(a.length, 3);
  assert.equal(b.length, 3);
  assert.equal(a.some(id => /birthday-bash/i.test(id)), false);
  assert.equal(b.some(id => /birthday-bash/i.test(id)), false);
  assert.deepEqual(a.filter(id => b.includes(id)), [], 'an event active today cannot rotate back tomorrow');
  assert.deepEqual(rotatingLiveEventTemplates(day1).map(e => e.id), a);
});

test('v1.1.20 Trish uses Air Canada as Trademark and Stratusfaction as Finisher with role-appropriate balance', () => {
  const air = allGameplayCards.find(c => c.id === 'trish-stratus-air-canada');
  const strat = allGameplayCards.find(c => c.id === 'trish-stratus-stratusfaction');
  assert.ok(air?.trademark && !air?.finisher);
  assert.equal(air.rarity, 3);
  assert.equal(air.cost, 6);
  assert.equal(air.damage, 10);
  assert.deepEqual(air.requirements, { technical: 2 });
  assert.ok(strat?.finisher && !strat?.trademark);
  assert.equal(strat.rarity, 4);
  assert.equal(strat.cost, 9);
  assert.equal(strat.damage, 17);
  assert.deepEqual(strat.requirements, {});
  const rewardRows = Object.values(SEASON_1_CHASE_TIER_REWARDS);
  assert.ok(rewardRows.filter(r => r.cardId === air.id).every(r => /TRADEMARK/.test(r.label)));
  assert.ok(rewardRows.filter(r => r.cardId === strat.id).every(r => /FINISHER/.test(r.label)));
});

test('v1.1.20 Trish has the authored five-item Merch ladder and Funko Pop is level 1', () => {
  const merch = SUPERSTAR_MERCH.filter(item => item.superstarId === 'trish-stratus').sort((a,b) => a.merchLevel - b.merchLevel);
  assert.deepEqual(merch.map(m => m.name), [
    'Trish Stratus Funko Pop',
    "Trish's Big Shots Pillow",
    '100% Stratusfaction Guaranteed DVD',
    "Trish's Action Figure",
    '100% Stratusfaction Shirt'
  ]);
  assert.deepEqual(merch.map(m => m.merchLevel), [1,2,3,4,5]);
  assert.ok(merch.every(m => /^MERCH · \d+ MATCH/.test(m.subtitle)));
  const allLevelOne = SUPERSTAR_MERCH.filter(item => item.merchLevel === 1);
  assert.ok(allLevelOne.length > 90);
  assert.ok(allLevelOne.every(item => /Funko Pop$/.test(item.name)));
});

test('v1.1.20 Merch fronts show match expiry while rules remain on the back and layered Merch plate export is transparent under the plaque', () => {
  assert.match(app, /card\.kind === "merch" \? `MERCH • \$\{card\.duration \?\? 1\} MATCH/);
  assert.match(studio, /card\.kind==="merch"\?`MERCH • \$\{card\.duration\?\?1\} MATCH/);
  assert.match(studio, /state\.renderPlateOnly&&card\.kind==="merch"/);
  assert.match(studio, /ctx\.clearRect\(panelLeft,panelTop,panelWidth,panelBottom-panelTop\)/);
  assert.match(app, /card\.abilityText \?\? card\.effectText \?\? card\.rulesText/);
});

test('v1.1.20+ Card Art Studio supports direct animated GIF or WebP URLs without flattening them', () => {
  assert.match(studioHtml, /id="animated-art-url"/);
  assert.match(studioHtml, /id="load-animated-url"/);
  assert.match(studioHtml, /Direct GIF\/WebP links|direct media URL/i);
  assert.match(studio, /async function animatedUrlSelected\(rawUrl\)/);
  assert.match(studio, /normal <img> load does not require CORS|Never send animated sources through the static image proxy/);
  assert.match(studio, /new File\(\[blob\],`animated-source\.\$\{ext\}`/);
  assert.match(studio, /await fileIsAnimated\(file\)/);
});
