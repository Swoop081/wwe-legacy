import { createProfile, claimWelcomeSuperstar, ownedCount, totalOwnedCopies } from '../js/data/profile.js';
import { activeLiveEventTowers, startLiveEventTower, recordLiveEventTowerMatch, LIVE_EVENT_LENGTH } from '../js/data/live-events.js';
import { startLadderRun, recordLadderMatch, LADDER_LENGTH } from '../js/data/ladder.js';
import { startKingOfTheRing, recordKingOfTheRingMatch, KING_OF_THE_RING_ROUNDS } from '../js/data/king-of-the-ring.js';
import { awardMatchSeasonXp, claimAllSeasonTiers, claimFreeSeasonBooster, seasonTier, seasonState, tierReward, SEASON_TIER_COUNT } from '../js/data/seasons.js';
import { grantRandomBoosters, openBooster, boosterCreditsFor, finalizePackUniversePoints, MAX_NON_NORMAL_PRINTINGS, MAX_SAPPHIRE_OR_RUBY_PRINTINGS } from '../js/data/boosters.js';
import { challengeState, recordChallengeMetric, claimChallenge } from '../js/data/challenges.js';
import { availableMilestoneRewards, claimMilestone, collectionProgress } from '../js/data/set-progression.js';
import { LAUNCH_LIVE_SET_IDS } from '../js/data/release.js';
import { superstars } from '../js/data/superstars.js';
import { collectionCards } from '../js/data/collection.js';

const DAY_MS = 86400000;
const START = new Date('2026-08-22T12:00:00');
const REPS = Math.max(4, Number(process.env.ECONOMY_REPS) || 24);
const releasedStarIds = Object.values(superstars).filter(star => !star.developmentOnly && LAUNCH_LIVE_SET_IDS.includes(star.setId)).map(star => star.id);
const releasedCards = collectionCards.filter(card => LAUNCH_LIVE_SET_IDS.includes(card.setId));

function seededRng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function q(values, percentile) {
  const sorted = [...values].sort((a,b) => a-b);
  return sorted[Math.floor((sorted.length - 1) * percentile)];
}
function summarize(values, digits = 1) {
  const mean = values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
  return { mean: +mean.toFixed(digits), p10: q(values,.1), p50: q(values,.5), p90: q(values,.9), min: Math.min(...values), max: Math.max(...values) };
}
function totalLaunchCredits(profile) {
  return LAUNCH_LIVE_SET_IDS.reduce((sum, setId) => sum + boosterCreditsFor(profile, setId), 0);
}
function assertNoUnreleasedCredits(profile) {
  const leaked = Object.entries(profile.boosterCreditsBySet ?? {}).filter(([setId, count]) => Number(count) > 0 && !LAUNCH_LIVE_SET_IDS.includes(setId));
  if (leaked.length) throw new Error(`Unreleased booster credit leak: ${JSON.stringify(leaked)}`);
}
function openAll(profile, rng, now, stats) {
  let guard = 0;
  while (totalLaunchCredits(profile) > 0 && guard++ < 10000) {
    for (const setId of LAUNCH_LIVE_SET_IDS) {
      while (boosterCreditsFor(profile, setId) > 0) {
        const unlockedBefore = profile.unlockedSuperstars.length;
        const pack = openBooster(profile, rng, setId, now);
        stats.packs += 1;
        stats.cards += pack.length;
        stats.packSetCounts[setId] = (stats.packSetCounts[setId] ?? 0) + 1;
        const premium = pack.filter(pull => pull.tier !== 'normal').length;
        const highPremium = pack.filter(pull => pull.tier === 'sapphire' || pull.tier === 'ruby').length;
        if (premium > MAX_NON_NORMAL_PRINTINGS || highPremium > MAX_SAPPHIRE_OR_RUBY_PRINTINGS) throw new Error('Premium printing collation violation');
        stats.duplicateUp += finalizePackUniversePoints(profile, pack);
        stats.packSuperstarUnlocks += Math.max(0, profile.unlockedSuperstars.length - unlockedBefore);
        stats.maxPity = Math.max(stats.maxPity, Number(profile.packsSinceSuperstarUnlock) || 0);
        for (const pull of pack) stats.tierPulls[pull.tier] = (stats.tierPulls[pull.tier] ?? 0) + 1;
      }
    }
  }
  assertNoUnreleasedCredits(profile);
}
function claimMilestoneCascade(profile, rng, now, stats) {
  for (let pass = 0; pass < 100; pass += 1) {
    let claimedAny = false;
    for (const setId of LAUNCH_LIVE_SET_IDS) {
      const available = availableMilestoneRewards(profile, setId);
      for (const type of ['collection','emerald','sapphire','ruby']) {
        for (const milestone of available[type]) {
          const result = claimMilestone(profile, type, milestone.percent, setId, now, rng);
          stats.milestonePacks += result.packs;
          stats.milestones[type] += 1;
          claimedAny = true;
        }
      }
    }
    if (!claimedAny) return;
    openAll(profile, rng, now, stats);
  }
  throw new Error('Milestone cascade failed to settle');
}
function recordHighEngagementChallengeMetrics(profile, now, { matches = 30, wins = 20, ladderRungs = 4, championshipWins = 3 } = {}) {
  for (const [metric, amount] of [
    ['matches', matches], ['wins', wins], ['finishers', 5], ['counters', 12], ['packs', 5], ['ladderRungs', ladderRungs], ['championshipWins', championshipWins]
  ]) recordChallengeMetric(profile, metric, amount, now);
}
function claimReadyChallenges(profile, rng, now, stats) {
  const state = challengeState(profile, now);
  for (const challenge of state.daily) {
    if (!challenge.claimed && (challenge.progress ?? 0) >= challenge.target) {
      const result = claimChallenge(profile, challenge.id, now, rng);
      stats.dailyChallengeClaims += 1;
      stats.challengeXp += result.xp;
    }
  }
  for (const challenge of state.weekly) {
    if (!challenge.claimed && (challenge.progress ?? 0) >= challenge.target) {
      const result = claimChallenge(profile, challenge.id, now, rng);
      stats.weeklyChallengeClaims += 1;
      stats.challengeXp += result.xp;
      stats.weeklyChallengePacks += result.packs;
    }
  }
}
function baseStats() {
  return {
    packs: 0, cards: 0, freePacks: 0, liveEventPacks: 0, exhibitionPacks: 0, ladderPacks: 0, kingPacks: 0,
    seasonPacks: 0, weeklyChallengePacks: 0, milestonePacks: 0, duplicateUp: 0, challengeXp: 0,
    dailyChallengeClaims: 0, weeklyChallengeClaims: 0, packSuperstarUnlocks: 0, maxPity: 0,
    milestones: { collection: 0, emerald: 0, sapphire: 0, ruby: 0 },
    tierPulls: { normal: 0, emerald: 0, sapphire: 0, ruby: 0 }, packSetCounts: {}
  };
}
function clearDailyLiveEvents(profile, rng, now, stats) {
  const towers = activeLiveEventTowers(now, profile);
  if (towers.length !== 3) throw new Error(`Expected exactly 3 Daily Live Events, got ${towers.length}`);
  for (const tower of towers) {
    startLiveEventTower(profile, tower.key, profile.starterId, releasedStarIds, rng, now);
    for (let match = 0; match < LIVE_EVENT_LENGTH; match += 1) {
      awardMatchSeasonXp(profile, 'win');
      const result = recordLiveEventTowerMatch(profile, tower.key, 'win', now, rng);
      if (result.status === 'cleared') stats.liveEventPacks += result.packCount ?? 0;
    }
  }
}
function clearDailyStructuredModes(profile, rng, now, stats) {
  startLadderRun(profile, profile.starterId, releasedStarIds, rng, 'daily', now);
  for (let i = 0; i < LADDER_LENGTH; i += 1) {
    awardMatchSeasonXp(profile, 'win');
    const result = recordLadderMatch(profile, 'win', now, rng);
    if (result.status === 'cleared') stats.ladderPacks += result.packCount ?? 0;
  }
  startKingOfTheRing(profile, profile.starterId, releasedStarIds, rng);
  for (let i = 0; i < KING_OF_THE_RING_ROUNDS.length; i += 1) {
    awardMatchSeasonXp(profile, 'win');
    const result = recordKingOfTheRingMatch(profile, 'win', rng, now);
    if (result.status === 'cleared' && result.packAwarded) stats.kingPacks += 1;
  }
}
function claimSeasonAndOpen(profile, rng, now, stats) {
  const beforeUp = profile.universePoints;
  const rewards = claimAllSeasonTiers(profile, now);
  stats.seasonPacks += rewards.filter(reward => reward.kind === 'booster').reduce((sum, reward) => sum + (reward.amount ?? 1), 0);
  stats.seasonUp = (stats.seasonUp ?? 0) + Math.max(0, profile.universePoints - beforeUp);
  openAll(profile, rng, now, stats);
  claimMilestoneCascade(profile, rng, now, stats);
}
function finalSnapshot(profile, stats, tier50Day, welcomeSet) {
  const unique = releasedCards.filter(card => totalOwnedCopies(profile, card.id) > 0).length;
  const setProgress = Object.fromEntries(LAUNCH_LIVE_SET_IDS.map(setId => {
    const progress = collectionProgress(profile, setId);
    return [setId, { base: progress.percent, emerald: progress.emeraldPercent, sapphire: progress.sapphirePercent, ruby: progress.rubyPercent }];
  }));
  return {
    xp: seasonState(profile).xp,
    tier: seasonTier(profile),
    tier50Day: tier50Day ?? 99,
    unlockedSuperstars: profile.unlockedSuperstars.length,
    universePoints: profile.universePoints,
    uniquePct: +(100 * unique / releasedCards.length).toFixed(2),
    maxPity: stats.maxPity,
    setProgress,
    stats,
    welcomeSet
  };
}
function certifyCena(profile) {
  if (!profile.unlockedSuperstars.includes('john-cena')) throw new Error('Tier 50 did not unlock John Cena');
  for (const id of ['john-cena-protobomb','john-cena-five-knuckle-shuffle','john-cena-stf','john-cena-attitude-adjustment']) {
    if (ownedCount(profile, id, 'ruby') !== 5) throw new Error(`${id} did not finish at five Ruby copies`);
  }
  for (const id of ['john-cena-hustle-loyalty-respect','special-john-cena','entrance-john-cena','superstar-john-cena']) if (ownedCount(profile, id, 'ruby') !== 1) throw new Error(`${id} Ruby completion reward is incomplete`);
  for (const id of ['john-cena-protobomb','john-cena-five-knuckle-shuffle','john-cena-stf','john-cena-attitude-adjustment','john-cena-hustle-loyalty-respect','special-john-cena','entrance-john-cena','superstar-john-cena']) for (const tier of ['normal','emerald','sapphire']) if (ownedCount(profile,id,tier) !== 0) throw new Error(`${id} leaked a non-Ruby printing`);
  if ((profile.savedDecks?.['john-cena'] ?? []).length !== 60) throw new Error('Cena best-owned completion deck was not assembled');
  if (profile.selectedEntrances?.['john-cena'] !== 'entrance-john-cena') throw new Error('Cena Ruby Entrance was not equipped on completion');
}
function simulateTarget(seed, { structured = false } = {}) {
  const rng = seededRng(seed);
  const profile = createProfile(rng() < .5 ? 'cm-punk' : 'roman-reigns');
  const welcomeSet = LAUNCH_LIVE_SET_IDS[Math.floor(rng() * LAUNCH_LIVE_SET_IDS.length)];
  claimWelcomeSuperstar(profile, welcomeSet, rng);
  const stats = baseStats();
  let exhibitionWins = 0, tier50Day = null;
  for (let day = 1; day <= 30; day += 1) {
    const now = new Date(START.getTime() + (day - 1) * DAY_MS);
    claimFreeSeasonBooster(profile, rng, now); stats.freePacks += 1;
    openAll(profile, rng, now, stats);
    clearDailyLiveEvents(profile, rng, now, stats);
    if (structured) clearDailyStructuredModes(profile, rng, now, stats);
    const remainingMatches = structured ? 4 : 15;
    let dailyOtherWins = 0;
    for (let match = 0; match < remainingMatches; match += 1) {
      const win = rng() < .50;
      awardMatchSeasonXp(profile, win ? 'win' : 'loss');
      if (win) {
        dailyOtherWins += 1;
        exhibitionWins += 1;
        if (exhibitionWins % 5 === 0) { grantRandomBoosters(profile, 1, rng, now); stats.exhibitionPacks += 1; }
      }
    }
    openAll(profile, rng, now, stats);
    claimMilestoneCascade(profile, rng, now, stats);
    recordHighEngagementChallengeMetrics(profile, now, { matches: 30, wins: 15 + (structured ? 11 : 0) + dailyOtherWins, ladderRungs: structured ? 8 : 4, championshipWins: 3 });
    claimReadyChallenges(profile, rng, now, stats);
    openAll(profile, rng, now, stats);
    claimMilestoneCascade(profile, rng, now, stats);
    claimSeasonAndOpen(profile, rng, now, stats);
    if (!tier50Day && seasonTier(profile) >= 50) tier50Day = day;
  }
  if (seasonTier(profile) !== SEASON_TIER_COUNT) throw new Error('30-match target cadence failed to complete Season 1');
  certifyCena(profile);
  return finalSnapshot(profile, stats, tier50Day, welcomeSet);
}

const seasonBoosterSets = [];
for (let tier = 1; tier <= SEASON_TIER_COUNT; tier += 1) {
  const reward = tierReward(tier, START);
  if (reward.kind === 'booster') seasonBoosterSets.push(reward.setId);
}
const seasonBoosterDistribution = Object.fromEntries(LAUNCH_LIVE_SET_IDS.map(setId => [setId, seasonBoosterSets.filter(id => id === setId).length]));
if (seasonBoosterSets.length !== 16 || seasonBoosterSets.some(setId => !LAUNCH_LIVE_SET_IDS.includes(setId))) throw new Error('Season booster reward pool is invalid');
if (Math.max(...Object.values(seasonBoosterDistribution)) - Math.min(...Object.values(seasonBoosterDistribution)) > 1) throw new Error('Season booster reward distribution is not balanced');

const target = Array.from({length: REPS}, (_, i) => simulateTarget(10000 + i * 7919));
const structured = Array.from({length: Math.max(4, Math.ceil(REPS / 2))}, (_, i) => simulateTarget(50000 + i * 6151, { structured: true }));

function aggregate(rows) {
  const field = key => rows.map(row => row[key]);
  const setProgress = Object.fromEntries(LAUNCH_LIVE_SET_IDS.map(setId => [setId, Object.fromEntries(['base','emerald','sapphire','ruby'].map(track => [track, summarize(rows.map(row => row.setProgress[setId][track]))]))]));
  const statNames = ['packs','freePacks','liveEventPacks','exhibitionPacks','ladderPacks','kingPacks','seasonPacks','weeklyChallengePacks','milestonePacks','duplicateUp','packSuperstarUnlocks','maxPity'];
  return {
    reps: rows.length,
    tier50Day: summarize(field('tier50Day')),
    unlockedSuperstars: summarize(field('unlockedSuperstars')),
    universePoints: summarize(field('universePoints')),
    uniquePct: summarize(field('uniquePct')),
    stats: Object.fromEntries(statNames.map(name => [name, summarize(rows.map(row => row.stats[name]))])),
    milestoneClaims: Object.fromEntries(['collection','emerald','sapphire','ruby'].map(track => [track, summarize(rows.map(row => row.stats.milestones[track]))])),
    tierPulls: Object.fromEntries(['normal','emerald','sapphire','ruby'].map(tier => [tier, summarize(rows.map(row => row.stats.tierPulls[tier]))])),
    packSetCounts: Object.fromEntries(LAUNCH_LIVE_SET_IDS.map(setId => [setId, summarize(rows.map(row => row.stats.packSetCounts[setId] ?? 0))])),
    setProgress
  };
}

const expectedPace = {
  twentyMatchesAllChallengesAt50PctOtherWins: 3000 + 30*5*.5*5 + 900 + 375,
  twentyFiveMatchesAllChallengesAt50PctOtherWins: 3000 + 30*10*.5*5 + 900 + 375,
  thirtyMatchesAllChallengesAt50PctOtherWins: 3000 + 30*15*.5*5 + 900 + 375,
  thirtyMatchesTwoDailyChallengesAvgAt50PctOtherWins: 3000 + 30*15*.5*5 + 600 + 375
};

console.log(JSON.stringify({
  build: '0.16.01',
  seasonBoosterDistribution,
  expectedPace,
  target30Matches: aggregate(target),
  structured30MatchCeiling: aggregate(structured)
}, null, 2));
