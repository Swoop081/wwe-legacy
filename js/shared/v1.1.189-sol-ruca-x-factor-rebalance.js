// v1.1.189 — Sol Ruca X-Factor authenticity + balance correction.
import { allGameplayCards } from "../data/content.js?v=1.1.132";
import { collectionCards, collectionCardsBySet, setCollections } from "../data/collection.js?v=1.1.132";

const CARD_ID = "sol-ruca-avalanche-x-factor";
const SET_ID = "raw-series-1";

function patchCard(card) {
  if (!card || card.id !== CARD_ID) return card;
  Object.assign(card, {
    name: "X-Factor",
    cost: 4,
    damage: 7,
    requirements: { agility: 1 },
    moveType: "grapple",
    method: "agility",
    rulesText: "Sol Ruca-exclusive. Grounds opponent.",
    groundOpponent: true,
    groundedOnly: false,
    standingOnly: false,
    stun: 0,
    selfDamage: 0,
    effects: [],
    counterState: "front-control"
  });
  delete card.tacticalType;
  delete card.counterStates;
  return card;
}

for (const card of allGameplayCards) patchCard(card);
for (const card of collectionCards) patchCard(card);
for (const card of collectionCardsBySet?.[SET_ID] ?? []) patchCard(card);
for (const card of setCollections?.[SET_ID] ?? []) patchCard(card);

globalThis.WWE_LEGACY_SOL_RUCA_X_FACTOR_119 = Object.freeze({
  id: CARD_ID,
  name: "X-Factor",
  cost: 4,
  damage: 7,
  method: "agility",
  requirement: 1,
  groundOpponent: true,
  stun: 0,
  counterState: "front-control"
});
