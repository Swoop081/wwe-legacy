// WWE Legacy v1.1.350 — retired pre-relaunch consumable Merch compatibility surface.
// Collectible T-shirt cards now live in the canonical set card data (PREM/MITB).
// This module intentionally contains no legacy catalogue and cannot manufacture old Merch.
export const GENERIC_MERCH = Object.freeze([]);
export const SUPERSTAR_MERCH = Object.freeze([]);
export const MERCH_ITEMS = Object.freeze([]);
export const MERCH_BY_ID = Object.freeze({});
export const BOOSTER_MERCH_SUPERSTAR_IDS = Object.freeze([]);
export const SCHEDULED_BOOSTER_MERCH = Object.freeze({});
export const merchForSuperstar = () => [];
export const eligibleMerchForSet = () => [];
export const boosterMerchSuperstarIds = () => [];
export const boosterSuperstarMerchPool = () => [];
export const rollMerch = () => null;
export const grantMerch = () => 0;
export const merchEligibilityForSuperstar = () => ({ legal:false, reason:"Legacy consumable Merch is retired." });
export const activeMerchSuperstarId = () => null;
export const equipMerch = () => { throw new Error("Legacy consumable Merch is retired."); };
export const discardActiveMerch = () => null;
export const activeMerchItem = () => null;
export const merchMatchModifier = () => null;
export const consumeActiveMerchMatch = () => null;
