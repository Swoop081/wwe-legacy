import { superstars } from "./superstars.js?v=1.1.132";
import "../shared/v1.1.66-featured-superstar-ability-audit.js?v=1.1.132";
import { sets } from "./sets.js?v=1.1.132";
import { allGameplayCards } from "./content.js?v=1.1.132";
import { CARD_NUMBER_MANIFEST, CARD_NUMBER_BY_ID, CARD_IDS_BY_SET } from "./card-number-manifest.js?v=1.1.132";
import { rewardPrintingTierForSet } from "./reward-printings.js?v=1.1.132";
import { applySharedMoveFamilyCurvesV11203 } from "../shared/v1.1.203-shared-move-family-curves.js?v=1.1.203";

const rarityLabels = { 1: "Common", 2: "Uncommon", 3: "Rare", 4: "Very Rare" };
const orderedStars = Object.values(superstars);
const starCards = orderedStars.map(s => ({
  id: `superstar-${s.id}`,
  name: s.name,
  kind: "superstar",
  superstarId: s.id,
  subtitle: s.nickname,
  rarity: 4,
  fixedPrintingTier: "amethyst",
  setId: s.setId,
  rulesText: s.ability?.text ?? "",
  ability: s.ability ?? null,
  era: s.era ?? null,
}));

const mitbLaKnightRewards = [
  { id:"MITB01", name:"LA Knight", kind:"superstar", superstarId:"la-knight", setId:"season-1-last-time-is-now", rarity:4, fixedPrintingTier:"amethyst", cardNumber:1, cardCode:"MITB01" },
  { id:"MITB02", name:"YEAH!!", kind:"entrance", superstarId:"la-knight", setId:"season-1-last-time-is-now", rarity:4, fixedPrintingTier:"amethyst", cardNumber:2, cardCode:"MITB02" },
  { id:"MITB03", name:"Blunt Force Trauma", kind:"move", superstarId:"la-knight", setId:"season-1-last-time-is-now", rarity:4, fixedPrintingTier:"amethyst", finisher:true, cost:8, damage:16, cardNumber:3, cardCode:"MITB03" },
  { id:"MITB04", name:"The Megastar’s Elbow", kind:"move", superstarId:"la-knight", setId:"season-1-last-time-is-now", rarity:4, fixedPrintingTier:"amethyst", trademark:true, cardNumber:4, cardCode:"MITB04" },
  { id:"MITB05", name:"LA Elbow", kind:"move", superstarId:"la-knight", setId:"season-1-last-time-is-now", rarity:4, fixedPrintingTier:"amethyst", trademark:true, cardNumber:5, cardCode:"MITB05" },
  { id:"MITB06", name:"Burning Hammer", kind:"move", superstarId:"la-knight", setId:"season-1-last-time-is-now", rarity:4, fixedPrintingTier:"amethyst", trademark:true, cardNumber:6, cardCode:"MITB06" },
  { id:"MITB07", name:"Let Me Talk to Ya!", kind:"action", superstarId:"la-knight", setId:"season-1-last-time-is-now", rarity:4, fixedPrintingTier:"amethyst", cardNumber:7, cardCode:"MITB07" },
  { id:"MITB08", name:"LA Knight T-Shirt", kind:"merch", superstarId:"la-knight", setId:"season-1-last-time-is-now", rarity:4, fixedPrintingTier:"amethyst", cardNumber:8, cardCode:"MITB08" }
];

const base = [...allGameplayCards, ...starCards, ...mitbLaKnightRewards];
applySharedMoveFamilyCurvesV11203(base);
const baseById = new Map(base.map(card => [card.id, card]));

if (baseById.size !== base.length) {
  throw new Error("WWE Legacy collection contains duplicate active card IDs.");
}
const canonicalBase = base.filter(card => !String(card.id).startsWith("MITB"));
if (CARD_NUMBER_MANIFEST.length !== canonicalBase.length) {
  throw new Error(`Canonical card manifest has ${CARD_NUMBER_MANIFEST.length} entries for ${base.length} active cards.`);
}
for (const card of canonicalBase) {
  const manifest = CARD_NUMBER_BY_ID[card.id];
  if (!manifest) throw new Error(`Active card ${card.id} is missing from the canonical card-number manifest.`);
  if (manifest.setId !== card.setId) throw new Error(`Canonical manifest set mismatch for ${card.id}: ${manifest.setId} != ${card.setId}.`);
  card.cardNumber = manifest.cardNumber;
  card.cardCode = manifest.cardCode;
}
for (const manifest of CARD_NUMBER_MANIFEST) {
  if (!baseById.has(manifest.id)) throw new Error(`Canonical manifest contains inactive card ${manifest.id}.`);
}

export const collectionCardsBySet = {};
for (const setId of Object.keys(sets)) {
  const ids = CARD_IDS_BY_SET[setId] ?? [];
  const list = ids.map(id => baseById.get(id)).filter(Boolean);
  if (setId === "season-1-last-time-is-now") list.push(...mitbLaKnightRewards);
  collectionCardsBySet[setId] = list;
}

export const collectionCards = Object.values(collectionCardsBySet).flat();
export const setCollections = Object.fromEntries(
  Object.entries(collectionCardsBySet).map(([setId, list]) => [setId, {
    ...sets[setId],
    cardCount: list.length,
    superstarCount: list.filter(c => c.kind === "superstar").length,
    rarityLabels,
  }])
);
export const setCollection = setCollections["summerslam-series-1"];
export function cardsForSet(setId) { return collectionCardsBySet[setId] ?? []; }
export function setCollectionFor(setId) { return setCollections[setId] ?? null; }
