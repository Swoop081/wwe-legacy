// WWE Legacy monthly premium Rewards registry.
// Reward Superstars are definitive Amethyst-only collectibles. New monthly
// reward identities are appended here; previous monthly rewards remain in the
// Rewards collection rather than gaining Base/Emerald/Sapphire/Ruby printings.
export const seasonExclusiveSuperstars = {
  "trish-stratus": {
    id: "trish-stratus",
    name: "Trish Stratus",
    nickname: "Stratusfaction Guaranteed",
    persona: "Monthly Rewards chase",
    seasonId: "season-1",
    unlock: "tier-50-completion",
    postSeasonAvailability: "rewards-vault",
    boosterEligible: false,
    fullDeckReward: true,
    fixedPrintingTier: "amethyst"
  },
  "aj-styles": {id:"aj-styles",name:"AJ Styles",nickname:"The Phenomenal One",persona:"October 2026 Rewards chase",seasonId:"october-2026",unlock:"october-rewards-chase",postSeasonAvailability:"rewards-vault",boosterEligible:false,fullDeckReward:true,fixedPrintingTier:"amethyst",developmentOnly:true}
};

export const ACTIVE_REWARD_SUPERSTAR_IDS = Object.freeze(["trish-stratus","aj-styles"]);
export const REWARD_PRINTING_TIER = "amethyst";
