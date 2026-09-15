import { sets } from "./sets.js?v=1.1.132";

// Major character/reward-track collectibles use one definitive printing: Amethyst.
// This applies to current Season-exclusive sets and banked/future reward sets so
// previously-earned lower printings can be migrated without special-casing one
// wrestler at a time. Regular booster/event sets keep the normal five-tier chase.
export function rewardPrintingTierForSet(setId) {
  const type = sets?.[setId]?.type ?? null;
  return type === "season-exclusive" || type === "future-reward" ? "amethyst" : null;
}

export function isRubyOnlyRewardSetId(setId) {
  return rewardPrintingTierForSet(setId) === "amethyst";
}

// Gameplay printing tiers are deliberately separate from collector rarity.
// A card keeps one canonical identity/ID while its playable printing supplies
// the appropriate damage/cost values. Higher tiers should generally finish
// matches faster through stronger damage and/or better cost efficiency.
export const GAMEPLAY_PRINTING_TIERS = Object.freeze([
  "base",
  "emerald",
  "sapphire",
  "ruby",
  "amethyst",
]);

export const STANDARD_FINISHER_DAMAGE_BY_TIER = Object.freeze({
  base: 12,
  emerald: 13,
  sapphire: 14,
  ruby: 15,
  amethyst: 16,
});

export const LOWER_FINISHER_DAMAGE_BY_TIER = Object.freeze({
  base: 11,
  emerald: 12,
  sapphire: 13,
  ruby: 14,
  amethyst: 15,
});

export const EXCEPTIONAL_FINISHER_DAMAGE_BY_TIER = Object.freeze({
  base: 13,
  emerald: 14,
  sapphire: 15,
  ruby: 16,
  amethyst: 17,
});

export function normalizeGameplayPrintingTier(tier) {
  const normalized = String(tier ?? "base").trim().toLowerCase();
  return GAMEPLAY_PRINTING_TIERS.includes(normalized) ? normalized : "base";
}

export function gameplayStatsForPrinting(card, tier) {
  if (!card) return card;
  const printingTier = normalizeGameplayPrintingTier(tier);
  const curve = card.printingStats?.[printingTier] ?? null;
  if (!curve) return { ...card, printingTier };
  return {
    ...card,
    printingTier,
    ...(Number.isFinite(curve.damage) ? { damage: curve.damage } : {}),
    ...(Number.isFinite(curve.cost) ? { cost: curve.cost } : {}),
    ...(curve.submission ? { submission: { ...(card.submission ?? {}), ...curve.submission } } : {}),
  };
}
