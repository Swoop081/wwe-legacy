import { sets } from "./sets.js?v=1.1.99";

// Major character/reward-track collectibles use one definitive printing: Amethyst.
// This applies to current Season-exclusive sets and banked/future reward sets so
// previously-earned lower printings can be migrated without special-casing one
// wrestler at a time. Regular booster/event sets keep the normal four-tier chase.
export function rewardPrintingTierForSet(setId) {
  const type = sets?.[setId]?.type ?? null;
  return type === "season-exclusive" || type === "future-reward" ? "amethyst" : null;
}

export function isRubyOnlyRewardSetId(setId) {
  return rewardPrintingTierForSet(setId) === "amethyst";
}
