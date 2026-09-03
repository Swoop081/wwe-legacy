// v1.1.194 — disambiguate Superstar-exclusive moves that share a generic move name.
import { allGameplayCards } from "../data/content.js?v=1.1.132";
import { collectionCards, collectionCardsBySet, setCollections } from "../data/collection.js?v=1.1.132";

const RENAMES = new Map([
  ["lexis-king-superkick", "Lexis King’s Superkick"],
  ["jacob-fatu-moonsault", "Jacob Fatu’s Moonsault"],
  ["jaida-parker-samoan-drop", "Jaida Parker’s Samoan Drop"],
  ["jaida-parker-running-hip-attack", "Jaida Parker’s Running Hip Attack"],
  ["jimmy-uso-running-hip-attack", "Jimmy Uso’s Running Hip Attack"],
  ["jimmy-uso-spear", "Jimmy Uso’s Spear"],
  ["jimmy-uso-superkick", "Jimmy Uso’s Superkick"],
  ["jacob-fatu-pop-up-samoan-drop", "Jacob Fatu’s Pop-Up Samoan Drop"],
  ["zilla-fatu-pop-up-samoan-drop", "Zilla Fatu’s Pop-Up Samoan Drop"]
]);

const NAME_REFS_BY_STAR = {
  "jacob-fatu": new Map([
    ["Moonsault", "Jacob Fatu’s Moonsault"],
    ["Pop-Up Samoan Drop", "Jacob Fatu’s Pop-Up Samoan Drop"]
  ]),
  "jaida-parker": new Map([
    ["Samoan Drop", "Jaida Parker’s Samoan Drop"],
    ["Running Hip Attack", "Jaida Parker’s Running Hip Attack"]
  ]),
  "jimmy-uso": new Map([
    ["Running Hip Attack", "Jimmy Uso’s Running Hip Attack"],
    ["Spear", "Jimmy Uso’s Spear"],
    ["Superkick", "Jimmy Uso’s Superkick"]
  ]),
  "zilla-fatu": new Map([
    ["Pop-Up Samoan Drop", "Zilla Fatu’s Pop-Up Samoan Drop"]
  ]),
  "lexis-king": new Map([
    ["Superkick", "Lexis King’s Superkick"]
  ])
};

function replaceExactNamedRefs(value, replacements) {
  if (!value || !replacements) return;
  if (Array.isArray(value)) {
    for (const item of value) replaceExactNamedRefs(item, replacements);
    return;
  }
  if (typeof value !== "object") return;
  for (const [key, current] of Object.entries(value)) {
    if (typeof current === "string") {
      if (["name", "searchName", "searchOnConnectName", "standingChainAfter", "afterName"].includes(key) && replacements.has(current)) {
        value[key] = replacements.get(current);
      }
      continue;
    }
    replaceExactNamedRefs(current, replacements);
  }
}

function patchCard(card) {
  if (!card) return card;
  const renamed = RENAMES.get(card.id);
  if (renamed) card.name = renamed;

  const replacements = NAME_REFS_BY_STAR[card.superstarId];
  if (replacements) {
    replaceExactNamedRefs(card, replacements);
    if (typeof card.rulesText === "string") {
      for (const [oldName, newName] of replacements) {
        card.rulesText = card.rulesText.replaceAll(oldName, newName);
      }
    }
  }
  return card;
}

for (const card of allGameplayCards) patchCard(card);
for (const card of collectionCards) patchCard(card);
for (const list of Object.values(collectionCardsBySet ?? {})) for (const card of list ?? []) patchCard(card);

// Consolidate the second generic Running Powerslam into the canonical RAW shared card.
// No recommended deck references ra1-running-powerslam; removing it avoids two indistinguishable shared cards.
const REMOVED_ID = "ra1-running-powerslam";
function removeById(list, id) {
  if (!Array.isArray(list)) return;
  for (let i = list.length - 1; i >= 0; i -= 1) if (list[i]?.id === id) list.splice(i, 1);
}
removeById(allGameplayCards, REMOVED_ID);
removeById(collectionCards, REMOVED_ID);
for (const list of Object.values(collectionCardsBySet ?? {})) removeById(list, REMOVED_ID);

for (const [setId, meta] of Object.entries(setCollections ?? {})) {
  const list = collectionCardsBySet?.[setId] ?? [];
  if (meta && typeof meta === "object") {
    meta.cardCount = list.length;
    meta.superstarCount = list.filter(card => card?.kind === "superstar").length;
  }
}

globalThis.WWE_LEGACY_EXCLUSIVE_MOVE_NAMES_1194 = Object.freeze({
  renamed: Object.freeze(Object.fromEntries(RENAMES)),
  canonicalRunningPowerslam: "running-powerslam",
  removedRunningPowerslamAlias: REMOVED_ID
});
