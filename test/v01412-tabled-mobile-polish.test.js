import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { championshipRoadSectionForStage } from '../js/data/championship-road.js?v=1.1.129';
import { collectionCards } from '../js/data/collection.js?v=1.1.129';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const app = fs.readFileSync(path.join(root, 'js/ui/app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css/game.css'), 'utf8');

test('v0.14.12 Championship Road passes the active road section set into match presentation', () => {
  assert.equal(championshipRoadSectionForStage(0).setId, 'golden-era-series-1');
  assert.equal(championshipRoadSectionForStage(1).setId, 'golden-era-series-1');
  assert.equal(championshipRoadSectionForStage(12).setId, 'summerslam-series-1');
  assert.match(app, /const roadSection = championshipRoadSectionForStage\(run\.stage\)/);
  assert.match(app, /eventMeta:\s*\{\s*rewardSetId:\s*roadSection\?\.setId/);
});

test('v0.14.12 Tribal Chief authored plate receives live front name, type and effect copy', () => {
  const tribal = collectionCards.find(card => card.id === 'special-roman-reigns');
  assert.ok(tribal);
  assert.equal(tribal.kind, 'action');
  assert.match(tribal.rulesText, /regain Control/i);
  assert.match(app, /function tribalChiefFrontOverlayMarkup/);
  assert.match(app, /TRIBAL CHIEF/);
  assert.match(app, /After Roman’s non-Finisher Move is Countered: play this to regain Control\. Once per match\./);
  assert.match(app, /has-tribal-chief-live-front/);
  assert.match(css, /\.ccg-card\.has-tribal-chief-live-front \.ccg-tribal-chief-front-data/);
});

test('v0.14.12 Tier Up presentation is explicitly compact on mobile', () => {
  assert.match(css, /#tier-up-layer \.tier-up-reward \.ccg-card\.tier-up-superstar-card[\s\S]*?width:min\(136px,30vw\)!important/);
  assert.match(css, /#tier-up-layer \.tier-up-card h1\{font-size:clamp\(2rem,8\.5vw,3\.6rem\)!important/);
  assert.match(app, /event\.tier === SEASON_TIER_COUNT/);
});

test('v0.14.12 printing tiers have stronger graduated edge glow', () => {
  assert.match(css, /tier-emerald\.is-tier-glow[\s\S]*?18px 5px rgba\(38,229,113,\.50\)/);
  assert.match(css, /tier-sapphire\.is-tier-glow[\s\S]*?23px 7px rgba\(56,151,255,\.60\)/);
  assert.match(css, /tier-ruby\.is-tier-glow[\s\S]*?29px 9px rgba\(239,44,67,\.69\)/);
});
