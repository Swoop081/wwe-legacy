// WWE Legacy v1.1.191 — canonical Season 1 deadline + starting-tier reward wrapper.
// app.js imports the historical Season module specifier. index.html maps that
// specifier here so Season 1 policy can evolve without disturbing older data.
export * from "./seasons.js?v=1.1.191-base";
import * as base from "./seasons.js?v=1.1.191-base";
import { addOwnedCard } from "./profile.js?v=1.1.132";

export const SEASON_END = "2026-10-01T00:00:00";
export const SEASON_1 = Object.freeze({ ...base.SEASON_1, end: SEASON_END });

const STARTING_TIER = 1;
const STARTING_CARD_ID = "trish-stratus-stratusphere";
const STARTING_REWARD = Object.freeze({
  tier: 1,
  kind: "season-card",
  exclusive: true,
  cardId: STARTING_CARD_ID,
  name: "Stratusphere",
  amount: 1,
  rewardType: "exclusive-move",
  label: "AMETHYST EXCLUSIVE MOVE",
  printingTier: "amethyst"
});
const TIER_TWO_REWARD = Object.freeze({ tier: 2, setId: "raw-series-1", amount: 1, kind: "booster" });

function bootstrapStartingTier(profile) {
  const state = base.seasonState(profile);
  state.xp = Math.max(base.XP_PER_TIER * STARTING_TIER, Number(state.xp) || 0);
  state.claimedTiers ??= [];
  if (!state.claimedTiers.includes(STARTING_TIER)) {
    const alreadyOwned = Number(profile?.ownedCards?.[STARTING_CARD_ID]?.amethyst ?? 0) > 0;
    if (!alreadyOwned) addOwnedCard(profile, STARTING_CARD_ID, { amount: 1, tier: "amethyst" });
    state.claimedTiers.push(STARTING_TIER);
    state.claimedTiers.sort((a, b) => a - b);
  }
  return state;
}

export function seasonState(profile) {
  return bootstrapStartingTier(profile);
}

export function seasonTier(profile) {
  bootstrapStartingTier(profile);
  return base.seasonTier(profile);
}

export function seasonLevelProgress(profile) {
  bootstrapStartingTier(profile);
  return base.seasonLevelProgress(profile);
}

export function awardSeasonXp(profile, amount, source = "other") {
  bootstrapStartingTier(profile);
  return base.awardSeasonXp(profile, amount, source);
}

export function awardMatchSeasonXp(profile, result) {
  bootstrapStartingTier(profile);
  return base.awardMatchSeasonXp(profile, result);
}

export function tierReward(tier, now = new Date()) {
  const n = Math.max(1, Math.min(base.SEASON_TIER_COUNT, Number(tier) || 1));
  if (n === 1) return { ...STARTING_REWARD };
  if (n === 2) return { ...TIER_TWO_REWARD };
  return base.tierReward(n, now);
}

function grantTierTwoBooster(profile) {
  profile.boosterCreditsBySet ??= {};
  profile.boosterCreditsBySet["raw-series-1"] = (profile.boosterCreditsBySet["raw-series-1"] ?? 0) + 1;
}

export function claimSeasonTier(profile, tier, now = new Date()) {
  const state = bootstrapStartingTier(profile);
  const n = Number(tier);
  const current = base.seasonTier(profile);
  if (!Number.isInteger(n) || n < 1 || n > base.SEASON_TIER_COUNT) throw new Error("Invalid Season tier");
  if (n > current) throw new Error("Season tier not reached");
  if (state.claimedTiers.includes(n)) throw new Error("Season tier already claimed");
  if (n === 2) {
    grantTierTwoBooster(profile);
    state.claimedTiers.push(2);
    state.claimedTiers.sort((a, b) => a - b);
    return { ...TIER_TWO_REWARD };
  }
  return base.claimSeasonTier(profile, n, now);
}

export function claimAllSeasonTiers(profile, now = new Date()) {
  const state = bootstrapStartingTier(profile);
  const current = base.seasonTier(profile);
  const rewards = [];
  for (let tier = 1; tier <= current; tier += 1) {
    if (state.claimedTiers.includes(tier)) continue;
    rewards.push(claimSeasonTier(profile, tier, now));
  }
  return rewards;
}

export function seasonTimeRemaining(now = new Date()) {
  const end = new Date(SEASON_END);
  const ms = Math.max(0, end.getTime() - now.getTime());
  return { ms, days: Math.ceil(ms / 86400000), ended: ms <= 0, end };
}
