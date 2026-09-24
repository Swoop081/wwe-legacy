import { superstars } from "./superstars.js?v=1.1.132";
import "../shared/v1.1.66-featured-superstar-ability-audit.js?v=1.1.132";
import { sets } from "./sets.js?v=1.1.132";
import { allGameplayCards } from "./content.js?v=1.1.132";
import { CARD_NUMBER_MANIFEST, CARD_NUMBER_BY_ID, CARD_IDS_BY_SET } from "./card-number-manifest.js?v=1.1.132";
import { rewardPrintingTierForSet } from "./reward-printings.js?v=1.1.132";

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

const premiereStarterSuperstars = [
  ["PREM01","Roman Reigns","roman-reigns"],["PREM02","Cody Rhodes","cody-rhodes"],["PREM03","CM Punk","cm-punk"],["PREM04","Seth Rollins","seth-rollins"],
  ["PREM05","Randy Orton","randy-orton"],["PREM06","Sami Zayn","sami-zayn"],["PREM07","Stone Cold Steve Austin","stone-cold-steve-austin"],["PREM08","John Cena","john-cena"],
  ["PREM09","Rhea Ripley","rhea-ripley"],["PREM10","Liv Morgan","liv-morgan"],["PREM11","Becky Lynch","becky-lynch"],["PREM12","Charlotte Flair","charlotte-flair"],
  ["PREM13","Tiffany Stratton","tiffany-stratton"],["PREM14","IYO SKY","iyo-sky"],["PREM15","Alexa Bliss","alexa-bliss"],["PREM16","Trish Stratus","trish-stratus"]
].map(([id,name,superstarId],index)=>({id,name,kind:"superstar",superstarId,setId:"premiere",rarity:1,cardNumber:index+1,cardCode:id}));

// Archived pre-relaunch reward definitions below are retained as reference only and are not added to collectionCards.
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

const premiereGameplayCards = allGameplayCards.filter(card => /^PREM(?:0[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-6][0-9]|270)$/.test(String(card.id)));
const mitbGameplayCards = allGameplayCards.filter(card => /^MITB0[2-7]$/.test(String(card.id)));
const activeCards = [
  ...premiereGameplayCards,
  ...premiereStarterSuperstars.filter(card => !premiereGameplayCards.some(existing => existing.id === card.id)),
  { id:"MITB01", name:"LA Knight", kind:"superstar", superstarId:"la-knight", setId:"money-in-the-bank", rarity:4, fixedPrintingTier:"amethyst", cardNumber:1, cardCode:"MITB01" },
  ...mitbGameplayCards,
  { id:"MITB08", name:"LA Knight T-Shirt", kind:"merch", superstarId:"la-knight", setId:"money-in-the-bank", rarity:4, fixedPrintingTier:"amethyst", cardNumber:8, cardCode:"MITB08" }
];
const byId = new Map(activeCards.map(card => [card.id, card]));
if (byId.size !== 278) throw new Error(`Active relaunch collection must contain exactly 278 unique cards; found ${byId.size}.`);
for (let i=1;i<=270;i++) {
  const id=`PREM${String(i).padStart(2,"0")}`;
  if (!byId.has(id)) throw new Error(`Active Premiere collection is missing ${id}.`);
}
for (let i=1;i<=8;i++) {
  const id=`MITB0${i}`;
  if (!byId.has(id)) throw new Error(`Active Money in the Bank collection is missing ${id}.`);
}

export const collectionCardsBySet = {
  premiere: activeCards.filter(card => card.id.startsWith("PREM")).sort((a,b)=>Number(a.id.slice(4))-Number(b.id.slice(4))),
  "money-in-the-bank": activeCards.filter(card => card.id.startsWith("MITB")).sort((a,b)=>Number(a.id.slice(4))-Number(b.id.slice(4)))
};
export const collectionCards = [...collectionCardsBySet.premiere, ...collectionCardsBySet["money-in-the-bank"]];
export const setCollections = Object.fromEntries(
  Object.entries(collectionCardsBySet).map(([setId, list]) => [setId, {
    ...sets[setId],
    cardCount: list.length,
    superstarCount: list.filter(c => c.kind === "superstar").length,
    rarityLabels,
  }])
);
export const setCollection = setCollections["premiere"];
export function cardsForSet(setId) { return collectionCardsBySet[setId] ?? []; }
export function setCollectionFor(setId) { return setCollections[setId] ?? null; }
