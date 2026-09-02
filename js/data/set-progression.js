import { cardsForSet } from './collection.js?v=1.1.127';
import { ownedCount } from './profile.js?v=1.1.127';
import { grantRandomBoosters } from './boosters.js?v=1.1.127';
import { CARD_TIERS } from './variants.js?v=1.1.127';

export const SET_LIFECYCLES = ['featured','vaulted','returning'];
export const COLLECTION_MILESTONES = [
  { percent: 25, reward: 1 }, { percent: 50, reward: 1 }, { percent: 75, reward: 1 }, { percent: 100, reward: 1 }
];
// v0.14.16 — all four collection-printing tracks share the same simple
// 25/50/75/100 reward cadence. Base remains the overall unique-card track
// (own any printing); Emerald/Sapphire/Ruby count unique cards at that exact tier.
export const EMERALD_MILESTONES = COLLECTION_MILESTONES;
export const SAPPHIRE_MILESTONES = COLLECTION_MILESTONES;
export const RUBY_MILESTONES = COLLECTION_MILESTONES;
export const FOIL_MILESTONES = RUBY_MILESTONES; // legacy internal alias
export const MILESTONE_TRACKS = Object.freeze(['collection','emerald','sapphire','ruby']);

function ensure(profile, setId = 'summerslam-series-1') {
  profile.setProgress ??= {};
  profile.setProgress[setId] ??= { lifecycle: 'featured', claimedCollection: [], claimedEmerald: [], claimedSapphire: [], claimedRuby: [] };
  const state = profile.setProgress[setId];
  state.claimedCollection ??= [];
  state.claimedEmerald ??= [];
  state.claimedSapphire ??= [];
  state.claimedRuby ??= state.claimedFoil ?? [];
  delete state.claimedFoil;
  return state;
}
export function setProgressState(profile, setId = 'summerslam-series-1') { return ensure(profile, setId); }
export function setLifecycle(profile, lifecycle, setId = 'summerslam-series-1') {
  if (!SET_LIFECYCLES.includes(lifecycle)) throw new Error('Invalid set lifecycle');
  ensure(profile,setId).lifecycle = lifecycle; return lifecycle;
}
export function collectionProgress(profile, setId = 'summerslam-series-1') {
  const collectionCards = cardsForSet(setId), total = collectionCards.length;
  const ownsAny = c => CARD_TIERS.some(tier => ownedCount(profile,c.id,tier)>0);
  const ownedUnique = collectionCards.filter(ownsAny).length;
  const emeraldUnique = collectionCards.filter(c=>ownedCount(profile,c.id,'emerald')>0).length;
  const sapphireUnique = collectionCards.filter(c=>ownedCount(profile,c.id,'sapphire')>0).length;
  const rubyUnique = collectionCards.filter(c=>ownedCount(profile,c.id,'ruby')>0).length;
  return {
    setId,total,ownedUnique,emeraldUnique,sapphireUnique,rubyUnique,
    percent: total ? Math.floor((ownedUnique/total)*100) : 0,
    emeraldPercent: total ? Math.floor((emeraldUnique/total)*100) : 0,
    sapphirePercent: total ? Math.floor((sapphireUnique/total)*100) : 0,
    rubyPercent: total ? Math.floor((rubyUnique/total)*100) : 0,
    foilUnique: rubyUnique, foilPercent: total ? Math.floor((rubyUnique/total)*100) : 0
  };
}
export function availableMilestoneRewards(profile, setId = 'summerslam-series-1') {
  const state = ensure(profile,setId), progress = collectionProgress(profile,setId);
  return {
    collection: COLLECTION_MILESTONES.filter(m => progress.percent >= m.percent && !state.claimedCollection.includes(m.percent)),
    emerald: EMERALD_MILESTONES.filter(m => progress.emeraldPercent >= m.percent && !state.claimedEmerald.includes(m.percent)),
    sapphire: SAPPHIRE_MILESTONES.filter(m => progress.sapphirePercent >= m.percent && !state.claimedSapphire.includes(m.percent)),
    ruby: RUBY_MILESTONES.filter(m => progress.rubyPercent >= m.percent && !state.claimedRuby.includes(m.percent)),
    foil: []
  };
}
export function claimMilestone(profile, type, percent, setId = 'summerslam-series-1', now = new Date(), rng = Math.random) {
  const normalizedType = type === 'foil' ? 'ruby' : type;
  const trackConfig = {
    collection: { list: COLLECTION_MILESTONES, claimedKey: 'claimedCollection', progressKey: 'percent' },
    emerald: { list: EMERALD_MILESTONES, claimedKey: 'claimedEmerald', progressKey: 'emeraldPercent' },
    sapphire: { list: SAPPHIRE_MILESTONES, claimedKey: 'claimedSapphire', progressKey: 'sapphirePercent' },
    ruby: { list: RUBY_MILESTONES, claimedKey: 'claimedRuby', progressKey: 'rubyPercent' }
  }[normalizedType];
  if (!trackConfig) throw new Error('Invalid milestone track');
  const state = ensure(profile,setId);
  const list = trackConfig.list;
  const claimed = state[trackConfig.claimedKey];
  const progress = collectionProgress(profile,setId), actual = progress[trackConfig.progressKey];
  const milestone = list.find(m => m.percent === Number(percent));
  if (!milestone) throw new Error('Milestone not found');
  if (actual < milestone.percent) throw new Error('Milestone not reached');
  if (claimed.includes(milestone.percent)) throw new Error('Milestone already claimed');
  claimed.push(milestone.percent);
  const packSetIds = grantRandomBoosters(profile, milestone.reward, rng, now);
  return { reward: milestone.reward, packs: packSetIds.length, packSetIds, milestone };
}
export function boosterSetAvailable(profile, setId = 'summerslam-series-1') { return ensure(profile,setId).lifecycle !== 'vaulted'; }
