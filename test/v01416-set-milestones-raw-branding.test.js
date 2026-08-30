import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createProfile, addOwnedCard } from '../js/data/profile.js?v=1.1.43';
import { cardsForSet } from '../js/data/collection.js?v=1.1.43';
import { boosterCreditsFor } from '../js/data/boosters.js?v=1.1.43';
import {
  COLLECTION_MILESTONES,
  EMERALD_MILESTONES,
  SAPPHIRE_MILESTONES,
  RUBY_MILESTONES,
  collectionProgress,
  availableMilestoneRewards,
  claimMilestone,
  setProgressState
} from '../js/data/set-progression.js?v=1.1.43';

const fixedRng = () => 0.314159;
const now = new Date(2026,7,24,12,0,0);
const setId = 'summerslam-series-1';
const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');

function ownUntil(p, tier, key, target=25) {
  for (const card of cardsForSet(setId)) {
    if (collectionProgress(p,setId)[key] >= target) break;
    addOwnedCard(p,card.id,{tier,amount:1});
  }
}

test('v0.14.16 exposes Base, Emerald, Sapphire and Ruby 25/50/75/100 milestone tracks at one booster each', () => {
  for (const list of [COLLECTION_MILESTONES, EMERALD_MILESTONES, SAPPHIRE_MILESTONES, RUBY_MILESTONES]) {
    assert.deepEqual(list.map(m=>[m.percent,m.reward]), [[25,1],[50,1],[75,1],[100,1]]);
  }
  const p=createProfile('cm-punk');
  const state=setProgressState(p,setId);
  assert.deepEqual(state.claimedEmerald,[]);
  assert.deepEqual(state.claimedSapphire,[]);
  ownUntil(p,'emerald','emeraldPercent');
  let rewards=availableMilestoneRewards(p,setId);
  assert.equal(rewards.emerald.some(m=>m.percent===25),true);
  const before=Object.values(p.boosterCreditsBySet??{}).reduce((a,b)=>a+b,0);
  const reward=claimMilestone(p,'emerald',25,setId,now,fixedRng);
  const after=Object.values(p.boosterCreditsBySet??{}).reduce((a,b)=>a+b,0);
  assert.equal(reward.packs,1);
  assert.equal(after,before+1);
});

test('v0.14.16 Challenges renders collapsible set sections and auto-opens claimable sets', () => {
  assert.match(app,/expandedMilestoneSetIds/);
  assert.match(app,/data-milestone-set/);
  assert.match(app,/readyCount > 0 \|\| expandedMilestoneSetIds\.has/);
  assert.match(app,/emerald: \{ label: 'EMERALD'/);
  assert.match(app,/sapphire: \{ label: 'SAPPHIRE'/);
  assert.match(app,/ruby: \{ label: 'RUBY'/);
  assert.match(css,/set-milestone-section>summary/);
  assert.match(css,/set-milestone-section\[open\]/);
});

test('v0.14.16 RAW Live presentation is locked red and uses the RAW Series 1 logo asset', () => {
  assert.match(app,/logoMode === 'raw'.*return 'red'/s);
  assert.match(app,/"raw-series-1": assetUrl\("assets\/images\/branding-raw-series-1-raw-logo\.webp"\)/);
  assert.match(app,/setLogoMarkup\('raw-series-1','event-brand-set-logo raw-event-logo'\)/);
  assert.match(app,/brand-raw raw-live-hub-card/);
  assert.match(css,/raw-live-hub-card/);
  assert.match(css,/rgba\(239,38,55/);
});
