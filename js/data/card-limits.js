export const DEFAULT_CARD_OWNERSHIP_CAP = 5;
export const UNIQUE_CARD_OWNERSHIP_CAP = 1;
export const MOMENTUM_CARD_OWNERSHIP_CAP = 5;

// v1.1.78: ordinary collectible identities can hold five copies of each of
// the five printing tiers (25 total). Superstar and Entrance identities are
// Amethyst-only unique collectibles. Superstar duplicates are prevented by
// booster collation; duplicate Entrances overflow to Universe Points.
export function isUniqueCollectionCard(cardOrId) {
  if (!cardOrId || typeof cardOrId === "string") return false;
  return cardOrId.kind === "superstar" || cardOrId.kind === "entrance";
}

export function ownershipCapFor(cardOrId) {
  return isUniqueCollectionCard(cardOrId) ? UNIQUE_CARD_OWNERSHIP_CAP : DEFAULT_CARD_OWNERSHIP_CAP;
}

export function totalOwnershipCapFor(cardOrId) {
  return isUniqueCollectionCard(cardOrId) ? UNIQUE_CARD_OWNERSHIP_CAP : DEFAULT_CARD_OWNERSHIP_CAP * 5;
}
