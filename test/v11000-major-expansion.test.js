import test from 'node:test';
import assert from 'node:assert/strict';
import { superstars } from '../js/data/superstars.js?v=1.1.118';
import { decks } from '../js/data/decks.js?v=1.1.118';
import { sets } from '../js/data/sets.js?v=1.1.118';
import { collectionCards } from '../js/data/collection.js?v=1.1.118';
import { playerReleasedCollectibleSetIds } from '../js/data/release.js?v=1.1.118';
import { PROFILE_VERSION, createProfile } from '../js/data/profile.js?v=1.1.118';
import { CARD_TIERS, TIER_PULL_WEIGHTS } from '../js/data/variants.js?v=1.1.118';
import { BOOSTER_GAMEPLAY_SLOTS, BOOSTER_MERCH_SLOTS, BOOSTER_SIZE, grantBooster, openBooster } from '../js/data/boosters.js?v=1.1.118';
import { MERCH_ITEMS, GENERIC_MERCH } from '../js/data/merch.js?v=1.1.118';
import { SUPERSTAR_VARIANTS } from '../js/data/superstar-variants.js?v=1.1.118';
import { DAILY_SPIN_COOLDOWN_MS, DAILY_SPIN_WEDGES, dailySpinState, spinDaily } from '../js/data/daily-spin.js?v=1.1.118';
import { canEnterSurvivorSeries, startSurvivorSeries, setSurvivorChallenge, autoSurvivorChallenge, resolveSurvivorSeriesMatch } from '../js/data/survivor-series-mode.js?v=1.1.118';
import { SEASON_1_COMPLETION_SUPERSTAR, tierReward } from '../js/data/seasons.js?v=1.1.118';
import { canonicalCardImagePath, canonicalBasePlatePath, canonicalSuperstarPath } from '../js/data/artwork.js?v=1.1.118';
await import('../js/data/superstar-nameplates.js?v=1.1.118');

const now = new Date('2026-08-29T00:00:00+10:00');
const released = [
  'raw-series-1','smackdown-series-1','nxt-series-1','evolution-series-1','summerslam-series-1',
  'golden-era-series-1','new-generation-series-1','attitude-era-series-1','ruthless-aggression-series-1'
];

test('v1.1 launch structure releases nine approved sets and retires Hall of Fame', () => {
  assert.deepEqual(playerReleasedCollectibleSetIds(now), released);
  assert.equal(sets['hall-of-fame-series-1'], undefined);
  assert.equal(Object.values(superstars).filter(s => s.setId === 'hall-of-fame-series-1').length, 0);
  assert.equal(collectionCards.filter(c => c.setId === 'hall-of-fame-series-1').length, 0);
});

test('SmackDown, NXT and Ruthless Aggression each have the approved eight-Superstar roster', () => {
  const names = id => Object.values(superstars).filter(s => s.setId === id).map(s => s.name).sort();
  assert.deepEqual(names('smackdown-series-1'), ['Blake Monroe','Chelsea Green','Damian Priest','Danhausen','Jacy Jayne','Shinsuke Nakamura','Tiffany Stratton','Trick Williams'].sort());
  assert.deepEqual(names('nxt-series-1'), ['Jaida Parker','Kelani Jordan','Kendal Grey','Lexis King','Mason Rook','Tatum Paxley','Tony D’Angelo','Zilla Fatu'].sort());
  assert.deepEqual(names('ruthless-aggression-series-1'), ['Batista','Edge','Eddie Guerrero','JBL','Jeff Hardy','John Cena','Randy Orton','Rob Van Dam'].sort());
});

test('expanded content has complete decks and Trish Stratus is the Season 1 chase', () => {
  assert.equal(Object.keys(superstars).length, 95);
  assert.equal(Object.keys(decks).length, 95);
  assert.equal(collectionCards.length, 936);
  for (const star of Object.values(superstars)) assert.equal(decks[star.id]?.length, 60, `${star.name} deck`);
  assert.equal(SEASON_1_COMPLETION_SUPERSTAR, 'trish-stratus');
  assert.equal(tierReward(50, now)?.superstarId, 'trish-stratus');
  assert.equal(superstars[Object.keys(superstars).find(k => superstars[k].id === 'john-cena')]?.setId, 'ruthless-aggression-series-1');
  assert.equal(superstars[Object.keys(superstars).find(k => superstars[k].id === 'randy-orton')]?.setId, 'ruthless-aggression-series-1');
});

test('Diamond is the fifth and final card printing tier', () => {
  assert.deepEqual(CARD_TIERS, ['normal','emerald','sapphire','ruby','diamond']);
  assert.equal(TIER_PULL_WEIGHTS.diamond, .005);
  assert.equal(CARD_TIERS.at(-1), 'diamond');
});

test('Merch has a large generic pool and exactly five stronger Superstar-specific cards for every Superstar', () => {
  assert.equal(GENERIC_MERCH.length, 40);
  assert.equal(MERCH_ITEMS.length, 515);
  for (const star of Object.values(superstars)) {
    const own = MERCH_ITEMS.filter(m => m.scope === 'superstar' && m.superstarId === star.id);
    assert.equal(own.length, 5, `${star.name} merch count`);
    assert.ok(own.every(m => [1,3,5].includes(m.duration)));
  }
  assert.equal(SUPERSTAR_VARIANTS.length, 95);
  assert.ok(SUPERSTAR_VARIANTS.every(v => v.ultraRare && v.hpBonus === 5));
});

test('every booster is exactly four collectible slots plus one guaranteed Merch card', () => {
  const p = createProfile('cm-punk');
  grantBooster(p, 1, 'raw-series-1');
  const pack = openBooster(p, () => .91, 'raw-series-1', now);
  assert.equal(BOOSTER_SIZE, 5);
  assert.equal(BOOSTER_GAMEPLAY_SLOTS, 4);
  assert.equal(BOOSTER_MERCH_SLOTS, 1);
  assert.equal(pack.length, 5);
  assert.equal(pack.slice(0, 4).filter(x => x.card.kind === 'merch').length, 0);
  assert.equal(pack[4].card.kind, 'merch');
  assert.equal(pack.filter(x => x.isMerch).length, 1);
});

test('Daily Spin has eight wedges and enforces one spin per 24 hours', () => {
  const p = createProfile('cm-punk');
  const t0 = new Date('2026-08-29T10:00:00+10:00');
  assert.equal(DAILY_SPIN_WEDGES.length, 8);
  assert.equal(DAILY_SPIN_COOLDOWN_MS, 86_400_000);
  assert.equal(dailySpinState(p, t0).available, true);
  const reward = spinDaily(p, () => .01, t0);
  assert.equal(reward.type, 'up');
  assert.equal(dailySpinState(p, new Date(t0.getTime()+1)).available, false);
  assert.equal(dailySpinState(p, new Date(t0.getTime()+DAILY_SPIN_COOLDOWN_MS)).available, true);
});

test('Survivor Series starts 4v4, alternates challenge turns and captures the losing Superstar', () => {
  const p = createProfile('cm-punk');
  p.unlockedSuperstars = ['cm-punk','roman-reigns','cody-rhodes','gunther','seth-rollins'];
  assert.equal(canEnterSurvivorSeries(p), true);
  const team = ['cm-punk','roman-reigns','cody-rhodes','gunther'];
  const run = startSurvivorSeries(p, team, () => .2, now);
  assert.equal(run.p1.length, 4); assert.equal(run.p2.length, 4); assert.equal(run.turn, 'p1');
  const captured = run.p2[0];
  setSurvivorChallenge(p, { attackerId: run.p1[0], targetId: captured });
  const r1 = resolveSurvivorSeriesMatch(p, true);
  assert.equal(r1.p1, 5); assert.equal(r1.p2, 3); assert.equal(r1.nextTurn, 'p2'); assert.ok(run.p1.includes(captured));
  const cpuChallenge = autoSurvivorChallenge(p, () => 0);
  const humanTarget = cpuChallenge.targetId;
  const r2 = resolveSurvivorSeriesMatch(p, false);
  assert.equal(r2.p1, 4); assert.equal(r2.p2, 4); assert.equal(r2.nextTurn, 'p1'); assert.ok(run.p2.includes(humanTarget));
});

test('v1.1 all 95 Superstars have premium nameplate identities aligned to their current set', () => {
  const profiles = globalThis.WWE_LEGACY_SUPERSTAR_NAMEPLATES;
  assert.equal(Object.keys(profiles).length, Object.keys(superstars).length);
  for (const star of Object.values(superstars)) {
    assert.ok(profiles[star.id], `missing nameplate ${star.id}`);
    assert.equal(profiles[star.id].setId, star.setId, `${star.id} nameplate set`);
  }
});

test('v1.1 Season 1 presentation is Trish Stratus, not the retired Cena chase branding', async () => {
  const app = (await import('node:fs')).readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
  assert.match(app, /STRATUSFACTION GUARANTEED/);
  assert.doesNotMatch(app, /THE LAST TIME IS NOW/);
  assert.match(app, /SEASON_ONE_TRISH_CARD_ID/);
});

test('v1.1 final Trick Williams and Danhausen balance corrections preserve 60-page decks', () => {
  const trick = decks['trick-williams'].map(c => c.id);
  const danhausen = decks['danhausen'].map(c => c.id);
  assert.equal(trick.length, 60);
  assert.equal(trick.filter(id => id === 'running-big-boot').length, 2);
  assert.equal(trick.filter(id => id === 'dropkick').length, 1);
  assert.equal(danhausen.length, 60);
  assert.equal(danhausen.filter(id => id === 'brainbuster').length, 3);
  assert.equal(danhausen.filter(id => id === 'running-big-boot').length, 2);
  assert.equal(danhausen.filter(id => id === 'ddt').length, 0);
});

test('v1.1 profile schema carries new systems and canonical readable asset paths are stable', () => {
  const p = createProfile('cm-punk');
  assert.equal(PROFILE_VERSION, 43); assert.equal(p.version, 43);
  assert.ok(p.dailySpin && p.survivorSeries && p.ownedMerch && p.ownedSuperstarVariants && p.equippedSuperstarVariants);
  const cutter = collectionCards.find(c => c.id === 'cody-rhodes-cody-cutter');
  assert.equal(canonicalCardImagePath(cutter), 'assets/images/cody-cutter-cody-rhodes.webp');
  assert.equal(canonicalBasePlatePath(cutter), 'assets/images/cody-cutter-cody-rhodes-base-plate.webp');
  assert.equal(canonicalSuperstarPath('cody-rhodes','superstar'), 'assets/images/cody-rhodes-superstar.webp');
});
