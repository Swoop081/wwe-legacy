import { grantSuperstarIdentityUnlockPackage, addOwnedCard, addUniversePoints } from "./profile.js?v=1.1.110";
import { isUnreleasedSetId, isPlayerReleasedSetId } from "./release.js?v=1.1.110";
import { buildBestOwnedRecommendedDraft, recommendedDeckMissingCount } from "./deck-builder.js?v=1.1.110";
export const SEASON_ID = "season-1";
export const SEASON_START = "2026-08-22T00:00:00";
export const SEASON_END = "2026-09-21T00:00:00";
export const SEASON_TIER_COUNT = 50;
export const XP_PER_TIER = 100;
export const MAX_SEASON_XP = SEASON_TIER_COUNT * XP_PER_TIER;
export const MATCH_XP = { win: 5, loss: 0 };
export const DAILY_CHALLENGE_XP = 10;
export const WEEKLY_CHALLENGE_XP = 25;
export const SEASON_1_COMPLETION_SUPERSTAR = "trish-stratus";
export const FEATURED_SET_IDS = ["raw-series-1", "smackdown-series-1", "nxt-series-1", "evolution-series-1", "summerslam-series-1", "golden-era-series-1", "new-generation-series-1", "attitude-era-series-1", "ruthless-aggression-series-1"];

// Season 1 prestige chase: Trish Stratus — Stratusfaction Guaranteed is assembled
// across a 50-tier / 30-day road. Trish Stratus’ Season-exclusive identities are
// Amethyst-only: there are no Normal, Emerald, Sapphire or legacy fifth-tier printings. Each of her
// four exclusive Moves is awarded as five separate Amethyst copies, with her Action,
// Entrance and Amethyst Superstar also earned on the road. Tier 50 then installs the best owned version of Trish’s
// authored deck so Season completion is immediately playable at maximum owned
// printing quality.
// Merch is deliberately NOT awarded on this 50-tier road. Trish-specific
// Merch remains in the universal one-Merch-per-booster pool and is collected
// independently from the premium Amethyst Rewards chase.
export const SEASON_1_CHASE_TIER_REWARDS = Object.freeze({
  2:  { cardId: "trish-stratus-stratusphere", name: "Stratusphere", amount: 1, rewardType: "exclusive-move", label: "AMETHYST EXCLUSIVE MOVE", printingTier: "amethyst" },
  3:  { cardId: "trish-stratus-chick-kick", name: "Chick Kick", amount: 1, rewardType: "signature", label: "AMETHYST SIGNATURE · TRADEMARK", printingTier: "amethyst" },
  5:  { cardId: "trish-stratus-air-canada", name: "Air Canada", amount: 1, rewardType: "signature", label: "AMETHYST SIGNATURE · TRADEMARK", printingTier: "amethyst" },
  7:  { cardId: "trish-stratus-stratusfaction", name: "Stratusfaction", amount: 1, rewardType: "finisher", label: "AMETHYST FINISHER", printingTier: "amethyst" },
  10: { cardId: "special-trish-stratus", name: "Stratusfaction Guaranteed", amount: 1, rewardType: "action", label: "AMETHYST ACTION", printingTier: "amethyst" },
  11: { cardId: "trish-stratus-stratusphere", name: "Stratusphere", amount: 1, rewardType: "exclusive-move", label: "AMETHYST EXCLUSIVE MOVE", printingTier: "amethyst" },
  13: { cardId: "trish-stratus-chick-kick", name: "Chick Kick", amount: 1, rewardType: "signature", label: "AMETHYST SIGNATURE · TRADEMARK", printingTier: "amethyst" },
  15: { cardId: "trish-stratus-air-canada", name: "Air Canada", amount: 1, rewardType: "signature", label: "AMETHYST SIGNATURE · TRADEMARK", printingTier: "amethyst" },
  17: { cardId: "trish-stratus-stratusfaction", name: "Stratusfaction", amount: 1, rewardType: "finisher", label: "AMETHYST FINISHER", printingTier: "amethyst" },
  21: { cardId: "trish-stratus-stratusphere", name: "Stratusphere", amount: 1, rewardType: "exclusive-move", label: "AMETHYST EXCLUSIVE MOVE", printingTier: "amethyst" },
  23: { cardId: "trish-stratus-chick-kick", name: "Chick Kick", amount: 1, rewardType: "signature", label: "AMETHYST SIGNATURE · TRADEMARK", printingTier: "amethyst" },
  25: { cardId: "trish-stratus-air-canada", name: "Air Canada", amount: 1, rewardType: "signature", label: "AMETHYST SIGNATURE · TRADEMARK", printingTier: "amethyst" },
  27: { cardId: "trish-stratus-stratusfaction", name: "Stratusfaction", amount: 1, rewardType: "finisher", label: "AMETHYST FINISHER", printingTier: "amethyst" },
  31: { cardId: "trish-stratus-stratusphere", name: "Stratusphere", amount: 1, rewardType: "exclusive-move", label: "AMETHYST EXCLUSIVE MOVE", printingTier: "amethyst" },
  33: { cardId: "trish-stratus-chick-kick", name: "Chick Kick", amount: 1, rewardType: "signature", label: "AMETHYST SIGNATURE · TRADEMARK", printingTier: "amethyst" },
  35: { cardId: "trish-stratus-air-canada", name: "Air Canada", amount: 1, rewardType: "signature", label: "AMETHYST SIGNATURE · TRADEMARK", printingTier: "amethyst" },
  37: { cardId: "trish-stratus-stratusfaction", name: "Stratusfaction", amount: 1, rewardType: "finisher", label: "AMETHYST FINISHER", printingTier: "amethyst" },
  41: { cardId: "trish-stratus-stratusphere", name: "Stratusphere", amount: 1, rewardType: "exclusive-move", label: "AMETHYST EXCLUSIVE MOVE", printingTier: "amethyst" },
  43: { cardId: "trish-stratus-chick-kick", name: "Chick Kick", amount: 1, rewardType: "signature", label: "AMETHYST SIGNATURE · TRADEMARK", printingTier: "amethyst" },
  45: { cardId: "trish-stratus-air-canada", name: "Air Canada", amount: 1, rewardType: "signature", label: "AMETHYST SIGNATURE · TRADEMARK", printingTier: "amethyst" },
  47: { cardId: "trish-stratus-stratusfaction", name: "Stratusfaction", amount: 1, rewardType: "finisher", label: "AMETHYST FINISHER", printingTier: "amethyst" },
  48: { cardId: "entrance-trish-stratus", name: "Time to Rock & Roll", amount: 1, rewardType: "entrance", label: "AMETHYST ENTRANCE", printingTier: "amethyst" },
  50: { cardId: "superstar-trish-stratus", name: "Trish Stratus — Stratusfaction Guaranteed", amount: 1, rewardType: "superstar", label: "AMETHYST SUPERSTAR", printingTier: "amethyst", superstarId: SEASON_1_COMPLETION_SUPERSTAR }
});
// Backwards-compatible export name for older internal tooling. Season 1 is no
// longer the Final Boss road.
export const FINAL_BOSS_TIER_REWARDS = SEASON_1_CHASE_TIER_REWARDS;

export const SEASON_1 = {
  id: SEASON_ID,
  number: 1,
  name: "Season 1",
  subtitle: "Stratusfaction Guaranteed",
  start: SEASON_START,
  end: SEASON_END,
  tierCount: SEASON_TIER_COUNT,
  xpPerTier: XP_PER_TIER,
  rotationPreview: [],
  roadmap: []
};

function ensure(profile) {
  profile.seasons ??= {};
  profile.seasons[SEASON_ID] ??= {
    xp: 0,
    claimedTiers: [],
    freePackLastClaimAt: null,
    freePacksClaimed: 0,
    matchXpEarned: 0,
    challengeXpEarned: 0,
    liveEventBonusXpEarned: 0,
    completionCelebrationPending: false,
    completionCelebrationSeen: false
  };
  const state = profile.seasons[SEASON_ID];
  state.xp = Math.max(0, Number(state.xp) || 0);
  state.claimedTiers ??= [];
  state.freePackLastClaimAt ??= null;
  state.freePacksClaimed ??= 0;
  state.matchXpEarned ??= 0;
  state.challengeXpEarned ??= 0;
  state.liveEventBonusXpEarned ??= 0;
  state.completionCelebrationPending ??= false;
  state.completionCelebrationSeen ??= false;
  return state;
}

export function seasonState(profile) { return ensure(profile); }
export function seasonTier(profile) { return Math.min(SEASON_TIER_COUNT, Math.floor(ensure(profile).xp / XP_PER_TIER)); }
export function seasonLevelProgress(profile) {
  const xp = ensure(profile).xp;
  const tier = seasonTier(profile);
  if (tier >= SEASON_TIER_COUNT) return { tier, xp, intoTier: XP_PER_TIER, needed: XP_PER_TIER, percent: 100 };
  const intoTier = xp % XP_PER_TIER;
  return { tier, xp, intoTier, needed: XP_PER_TIER, percent: Math.floor((intoTier / XP_PER_TIER) * 100) };
}
export function seasonTimeRemaining(now = new Date()) {
  const end = new Date(SEASON_END);
  const ms = Math.max(0, end.getTime() - now.getTime());
  return { ms, days: Math.ceil(ms / 86400000), ended: ms <= 0, end };
}
export function nextRoadmapNode(_now = new Date()) { return null; }
export function roadmapNodeStatus(_node, _now = new Date()) { return "unpublished"; }

export function awardSeasonXp(profile, amount, source = "other") {
  const state = ensure(profile);
  const add = Math.max(0, Number(amount) || 0);
  const before = state.xp;
  state.xp = Math.min(MAX_SEASON_XP, state.xp + add);
  const actual = state.xp - before;
  if (source === "match") state.matchXpEarned += actual;
  if (source === "challenge") state.challengeXpEarned += actual;
  if (source === "live-event-daily-set") state.liveEventBonusXpEarned += actual;
  return { awarded: actual, before, after: state.xp, tierBefore: Math.floor(before / XP_PER_TIER), tierAfter: seasonTier(profile) };
}
export function awardMatchSeasonXp(profile, result) {
  const amount = MATCH_XP[result] ?? MATCH_XP.loss;
  return awardSeasonXp(profile, amount, "match");
}

// v0.16.00 — Season booster rewards cycle evenly through the complete live
// launch-set pool. Earlier staged-release logic could heavily bias the 16
// booster tiers toward a subset of the launch pool. The cycle is now based on the
// ordinal booster reward, not the numeric Season tier, so non-pack chase/UP
// tiers cannot distort set distribution.
const SEASON_1_PACK_SET_IDS = Object.freeze([...FEATURED_SET_IDS]);

function seasonPackPoolForTier(_tier, now = new Date()) {
  const released = SEASON_1_PACK_SET_IDS.filter(setId => isPlayerReleasedSetId(setId, now));
  return released.length ? released : ["summerslam-series-1"];
}

function seasonBoosterOrdinal(tier) {
  let ordinal = 0;
  for (let candidate = 1; candidate < tier; candidate += 1) {
    if (SEASON_1_CHASE_TIER_REWARDS[candidate]) continue;
    if (candidate % 4 === 0) continue;
    ordinal += 1;
  }
  return ordinal;
}

export function tierReward(tier, now = new Date()) {
  const n = Math.max(1, Math.min(SEASON_TIER_COUNT, Number(tier) || 1));
  const chase = SEASON_1_CHASE_TIER_REWARDS[n];
  if (chase) return { tier: n, kind: "season-card", exclusive: true, ...chase };
  // Currency breaks up the pack cadence across the 50-tier road. Later tiers
  // pay more UP as the chase intensifies.
  if (n % 4 === 0) {
    const amount = n < 25 ? 100 : n < 50 ? 150 : n < 75 ? 200 : 250;
    return { tier: n, kind: "universe-points", amount };
  }
  const pool = seasonPackPoolForTier(n, now);
  const setId = pool[seasonBoosterOrdinal(n) % pool.length];
  return { tier: n, setId, amount: 1, kind: "booster" };
}
function grantSetBooster(profile, setId, amount = 1) {
  profile.boosterCreditsBySet ??= {};
  profile.boosterCreditsBySet[setId] = (profile.boosterCreditsBySet[setId] ?? 0) + amount;
  if (setId === "summerslam-series-1") profile.boosterCredits = profile.boosterCreditsBySet[setId];
}
export function claimSeasonTier(profile, tier, now = new Date()) {
  const state = ensure(profile), current = seasonTier(profile), n = Number(tier);
  if (!Number.isInteger(n) || n < 1 || n > SEASON_TIER_COUNT) throw new Error("Invalid Season tier");
  if (n > current) throw new Error("Season tier not reached");
  if (state.claimedTiers.includes(n)) throw new Error("Season tier already claimed");
  const reward = tierReward(n, now);
  if (reward.kind === "season-card") {
    if (reward.rewardType === "superstar") {
      // Tier 50 completes Trish Stratus’ Amethyst-only Season package. Shared cards are not
      // gifted, but the game immediately assembles the strongest owned version
      // of Trish's authored 60-page blueprint and equips her Ruby Entrance.
      grantSuperstarIdentityUnlockPackage(profile, reward.superstarId, { tier: reward.printingTier ?? "ruby", celebrate: false });
      profile.selectedEntrances ??= {};
      if ((profile.ownedCards?.["entrance-trish-stratus"]?.ruby ?? 0) > 0) profile.selectedEntrances[reward.superstarId] = "entrance-trish-stratus";
      profile.savedDecks ??= {};
      profile.savedDecks[reward.superstarId] = buildBestOwnedRecommendedDraft(profile, reward.superstarId);
      profile.deckNeedsCards ??= {};
      profile.deckNeedsCards[reward.superstarId] = recommendedDeckMissingCount(reward.superstarId, profile.savedDecks[reward.superstarId]);
      state.completionRewardClaimed = true;
      state.completionSuperstarId = reward.superstarId;
      state.completionCelebrationPending = true;
      state.completionCelebrationSeen = false;
    } else {
      addOwnedCard(profile, reward.cardId, { amount: reward.amount ?? 1, tier: reward.printingTier ?? "normal" });
    }
    if (reward.bonusUniversePoints) addUniversePoints(profile, reward.bonusUniversePoints);
  } else if (reward.kind === "universe-points") addUniversePoints(profile, reward.amount);
  else grantSetBooster(profile, reward.setId, reward.amount);
  state.claimedTiers.push(n);
  state.claimedTiers.sort((a,b) => a-b);
  return reward;
}
export function claimAllSeasonTiers(profile, now = new Date()) {
  const current = seasonTier(profile), rewards = [];
  for (let tier = 1; tier <= current; tier += 1) {
    if (ensure(profile).claimedTiers.includes(tier)) continue;
    rewards.push(claimSeasonTier(profile, tier, now));
  }
  return rewards;
}

const FREE_PACK_MS = 24 * 60 * 60 * 1000;
export function freePackStatus(profile, now = new Date()) {
  const state = ensure(profile);
  if (!state.freePackLastClaimAt) return { available: true, msRemaining: 0, nextAt: now };
  const last = new Date(state.freePackLastClaimAt).getTime();
  const nextAt = new Date(last + FREE_PACK_MS);
  const msRemaining = Math.max(0, nextAt.getTime() - now.getTime());
  return { available: msRemaining <= 0, msRemaining, nextAt };
}
export function claimFreeSeasonBooster(profile, rng = Math.random, now = new Date()) {
  const status = freePackStatus(profile, now);
  if (!status.available) throw new Error("Your next free booster is still counting down.");
  const releasedSets = FEATURED_SET_IDS.filter(setId => isPlayerReleasedSetId(setId, now));
  const activeSets = releasedSets.filter(setId => (profile.setProgress?.[setId]?.lifecycle ?? "featured") === "featured");
  const pool = activeSets.length ? activeSets : releasedSets;
  const index = Math.min(pool.length - 1, Math.floor(rng() * pool.length));
  const setId = pool[index];
  grantSetBooster(profile, setId, 1);
  const state = ensure(profile);
  state.freePackLastClaimAt = now.toISOString();
  state.freePacksClaimed += 1;
  return { setId, amount: 1, nextAt: new Date(now.getTime() + FREE_PACK_MS) };
}
