// v1.1.188 — split the existing Shotgun Dropkick into a lighter standing version
// and a premium Diving Shot-Gun Dropkick without disturbing existing card IDs.
import { allGameplayCards } from "../data/content.js?v=1.1.132";
import { collectionCards, collectionCardsBySet, setCollections } from "../data/collection.js?v=1.1.132";
import { CARD_NUMBER_MANIFEST, CARD_NUMBER_BY_ID, CARD_IDS_BY_SET } from "../data/card-number-manifest.js?v=1.1.132";

const NORMAL_ID = "shotgun-dropkick";
const DIVING_ID = "diving-shot-gun-dropkick";
const DIVING_NAME = "Diving Shot-Gun Dropkick";
const SET_ID = "money-in-the-bank-series-1";

const normal = allGameplayCards.find(card => card?.id === NORMAL_ID);
const existingDiving = allGameplayCards.find(card =>
  card?.id === DIVING_ID || /diving\s+shot-?gun\s+dropkick/i.test(String(card?.name || ""))
);

if (normal && !existingDiving) {
  const originalEffects = Array.isArray(normal.effects)
    ? normal.effects.map(effect => ({ ...effect, ifSuperstarIds: Array.isArray(effect?.ifSuperstarIds) ? [...effect.ifSuperstarIds] : effect?.ifSuperstarIds }))
    : [];

  // The normal version becomes the cheaper setup option: lower cost, damage and payoff.
  normal.cost = 3;
  normal.damage = 5;
  normal.stun = 0;
  normal.rulesText = "Grounds opponent. When played by Finn Bálor, on connect search/draw Coup de Grâce; that searched Coup de Grâce costs 1 less during the current Control sequence.";
  normal.effects = originalEffects.map(effect =>
    effect?.type === "search" && effect?.name === "Coup de Grâce"
      ? { ...effect, discount: 1 }
      : effect
  );

  // The diving version inherits the former premium 5/8 profile, but is explicitly
  // an Agility aerial and keeps the stronger Finn-to-Coup-de-Grâce setup payoff.
  const diving = {
    ...normal,
    id: DIVING_ID,
    name: DIVING_NAME,
    setId: SET_ID,
    cost: 5,
    damage: 8,
    requirements: { agility: 2 },
    moveType: "aerial",
    method: "agility",
    superstarId: null,
    rarity: 3,
    rulesText: "Diving aerial. Grounds opponent. Stun 1. When played by Finn Bálor, on connect search/draw Coup de Grâce; that searched Coup de Grâce costs 3 less during the current Control sequence.",
    groundOpponent: true,
    groundedOnly: false,
    stun: 1,
    selfDamage: 0,
    effects: originalEffects.map(effect =>
      effect?.type === "search" && effect?.name === "Coup de Grâce"
        ? { ...effect, discount: 3 }
        : effect
    ),
    counterState: "diving-aerial",
    cardNumber: "19A",
    cardCode: "MITB1-019A"
  };

  allGameplayCards.push(diving);

  const setList = collectionCardsBySet?.[SET_ID];
  if (Array.isArray(setList) && !setList.some(card => card?.id === DIVING_ID)) setList.push(diving);
  if (Array.isArray(collectionCards) && !collectionCards.some(card => card?.id === DIVING_ID)) collectionCards.push(diving);
  if (setCollections?.[SET_ID]) setCollections[SET_ID].cardCount = setList?.length ?? setCollections[SET_ID].cardCount;

  // Runtime manifest insertion keeps downstream card-number consumers coherent
  // without renumbering the already-published Money in the Bank Series 1 set.
  const manifestEntry = Object.freeze({ id: DIVING_ID, setId: SET_ID, cardNumber: "19A", cardCode: "MITB1-019A" });
  if (!CARD_NUMBER_BY_ID[DIVING_ID]) {
    CARD_NUMBER_MANIFEST.push(manifestEntry);
    CARD_NUMBER_BY_ID[DIVING_ID] = manifestEntry;
    CARD_IDS_BY_SET[SET_ID] ??= [];
    const normalIndex = CARD_IDS_BY_SET[SET_ID].indexOf(NORMAL_ID);
    CARD_IDS_BY_SET[SET_ID].splice(normalIndex >= 0 ? normalIndex + 1 : CARD_IDS_BY_SET[SET_ID].length, 0, DIVING_ID);
  }

  globalThis.WWE_LEGACY_DIVING_SHOTGUN_188 = Object.freeze({
    normal: Object.freeze({ id: NORMAL_ID, cost: 3, damage: 5, stun: 0, coupDiscount: 1 }),
    diving: Object.freeze({ id: DIVING_ID, name: DIVING_NAME, cost: 5, damage: 8, stun: 1, coupDiscount: 3, method: "agility", requirement: 2 })
  });
}
