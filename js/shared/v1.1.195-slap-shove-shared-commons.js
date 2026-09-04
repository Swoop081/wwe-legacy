// v1.1.195 — add Slap and Shove as shared Common fundamentals.
import { allGameplayCards } from "../data/content.js?v=1.1.132";
import { collectionCards, collectionCardsBySet, setCollections } from "../data/collection.js?v=1.1.132";

const SET_ID = "summerslam-series-1";

const CARDS = [
  {
    id: "slap",
    name: "Slap",
    kind: "move",
    setId: SET_ID,
    cardNumber: "S1",
    cardCode: "SS1-S01",
    cost: 1,
    damage: 2,
    requirements: { strike: 1 },
    moveType: "strike",
    method: "strike",
    superstarId: null,
    rarity: 1,
    boosterOnly: true,
    rulesText: "Shared. On Connect: opponent loses 1 Adrenaline.",
    groundOpponent: false,
    groundedOnly: false,
    stun: 0,
    selfDamage: 0,
    effects: [{ type: "loseOpponentAdrenaline", amount: 1 }],
    counterState: "arm-extended"
  },
  {
    id: "shove",
    name: "Shove",
    kind: "move",
    setId: SET_ID,
    cardNumber: "S2",
    cardCode: "SS1-S02",
    cost: 1,
    damage: 0,
    requirements: { strength: 1 },
    moveType: "grapple",
    method: "strength",
    superstarId: null,
    rarity: 1,
    boosterOnly: true,
    defensiveOnly: true,
    rulesText: "Shared Counter-only Reversal. Counter a front-control Grapple. On successful Counter, opponent becomes grounded.",
    groundOpponent: true,
    groundedOnly: false,
    stun: 0,
    selfDamage: 0,
    effects: [],
    counterState: "front-control",
    counterStates: ["front-control"]
  }
];

function addUnique(list, card) {
  if (!Array.isArray(list) || list.some(existing => existing?.id === card.id)) return;
  list.push(card);
}

for (const source of CARDS) {
  const card = { ...source, requirements: { ...source.requirements }, effects: source.effects.map(effect => ({ ...effect })) };
  if (source.counterStates) card.counterStates = [...source.counterStates];
  addUnique(allGameplayCards, card);
  addUnique(collectionCards, card);
  collectionCardsBySet[SET_ID] ??= [];
  addUnique(collectionCardsBySet[SET_ID], card);
}

const meta = setCollections?.[SET_ID];
if (meta && typeof meta === "object") {
  const list = collectionCardsBySet[SET_ID] ?? [];
  meta.cardCount = list.length;
  meta.superstarCount = list.filter(card => card?.kind === "superstar").length;
}

globalThis.WWE_LEGACY_SHARED_COMMONS_1195 = Object.freeze({
  slap: Object.freeze({ id: "slap", rarity: 1, cost: 1, damage: 2, requirement: "strike-1" }),
  shove: Object.freeze({ id: "shove", rarity: 1, cost: 1, damage: 0, requirement: "strength-1", reversal: true })
});
