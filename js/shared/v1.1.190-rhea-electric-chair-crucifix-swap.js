// v1.1.192 — Rhea Ripley Electric Chair Drop / Crucifix Powerbomb identity correction.
import { allGameplayCards } from "../data/content.js?v=1.1.132";
import { collectionCards, collectionCardsBySet, setCollections } from "../data/collection.js?v=1.1.132";

const SET_ID = "evolution-series-1";
const ELECTRIC_ID = "rhea-ripley-electric-chair-facebuster";
const CRUCIFIX_ID = "razor-s-edge";

function patchCard(card) {
  if (!card) return card;
  if (card.id === ELECTRIC_ID) {
    Object.assign(card, {
      name: "Electric Chair Drop",
      superstarId: null,
      rarity: 2,
      boosterOnly: true,
      rulesText: "Shared. Grounds opponent."
    });
    // Shared Moves must not carry Superstar-signature metadata at all. Some
    // presentation/classification paths key off field presence rather than the
    // boolean value, which made Electric Chair Drop appear as a Trademark for
    // every Superstar when trademark/signature were explicitly set to false.
    delete card.superstarId;
    delete card.trademark;
    delete card.signature;
  }
  if (card.id === CRUCIFIX_ID) {
    Object.assign(card, {
      name: "Rhea’s Crucifix Powerbomb",
      superstarId: "rhea-ripley",
      rarity: 3,
      boosterOnly: true,
      trademark: true,
      signature: false,
      rulesText: "Rhea Ripley-exclusive Trademark. Grounds opponent."
    });
  }
  return card;
}

for (const card of allGameplayCards) patchCard(card);
for (const card of collectionCards) patchCard(card);
for (const card of collectionCardsBySet?.[SET_ID] ?? []) patchCard(card);
for (const card of setCollections?.[SET_ID] ?? []) patchCard(card);

globalThis.WWE_LEGACY_RHEA_MOVE_SWAP_1190 = Object.freeze({
  electricChairDrop: Object.freeze({ id: ELECTRIC_ID, rarity: 2, shared: true, trademark: false }),
  crucifixPowerbomb: Object.freeze({ id: CRUCIFIX_ID, rarity: 3, superstarId: "rhea-ripley", trademark: true })
});
