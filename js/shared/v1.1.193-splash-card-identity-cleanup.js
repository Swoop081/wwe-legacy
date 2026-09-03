// v1.1.193 — disambiguate same-name Splash cards and make SummerSlam Frog Splash truly shared.
import { allGameplayCards } from "../data/content.js?v=1.1.132";
import { collectionCards, collectionCardsBySet, setCollections } from "../data/collection.js?v=1.1.132";

function patch(card) {
  if (!card) return card;

  if (card.id === "kelani-jordan-450-splash") {
    card.name = "Kelani’s 450 Splash";
    card.superstarId = "kelani-jordan";
    card.trademark = true;
    card.rulesText = "Kelani Jordan-exclusive Trademark. 450 Splash. Grounded opponent only. On Connect: +1 persistent Leg damage.";
  }

  if (card.id === "frog-splash") {
    card.name = "Frog Splash";
    card.superstarId = null;
    card.rulesText = "Shared. Grounded opponent only. Stun 1.";
    card.effects = [];
    delete card.allowedSuperstarIds;
    delete card.specificSuperstarIds;
    delete card.trademark;
    delete card.signature;
    delete card.finisher;
  }

  if (card.id === "eddie-guerrero-frog-splash") {
    card.name = "Eddie’s Frog Splash";
    card.superstarId = "eddie-guerrero";
    card.finisher = true;
    card.rulesText = "Eddie Guerrero-exclusive Finisher. Frog Splash. No Method requirement. Grounded opponent only. On Connect: opponent loses 1 additional Adrenaline.";
  }

  if (card.id === "eddie-guerrero-lasso-from-el-paso") {
    card.rulesText = "Eddie Guerrero-exclusive Trademark Submission. Lasso from El Paso. Grounded opponent only. +5 persistent Leg damage per successful turn. On Connect: search/draw Eddie’s Frog Splash; it costs 1 less this Control sequence.";
    card.searchOnConnectName = "Eddie’s Frog Splash";
  }

  if (card.id === "uso-splash") {
    card.name = "Jey Uso Splash";
    card.superstarId = "jey-uso";
    card.finisher = true;
    card.rulesText = "Jey Uso-exclusive Finisher. No Method requirement. Grounded opponent only. If played immediately after Spear in the same Control sequence, +1 Damage.";
    delete card.allowedSuperstarIds;
  }

  if (card.id === "special-jey-uso") {
    card.rulesText = "Once per match, after Jey connects with Spear, search/draw Jey Uso Splash. That searched Jey Uso Splash costs 3 less during the current Control sequence.";
    if (card.special && typeof card.special === "object") card.special.searchName = "Jey Uso Splash";
  }

  if (card.id === "jimmy-uso-uso-splash") {
    card.name = "Jimmy Uso Splash";
    card.superstarId = "jimmy-uso";
    card.finisher = true;
    card.rulesText = "Jimmy Uso-exclusive Finisher. No Method requirement. Grounded opponent only.";
  }

  return card;
}

for (const card of allGameplayCards) patch(card);
for (const card of collectionCards) patch(card);
for (const list of Object.values(collectionCardsBySet ?? {})) for (const card of list ?? []) patch(card);

for (const [setId, meta] of Object.entries(setCollections ?? {})) {
  const list = collectionCardsBySet?.[setId] ?? [];
  if (meta && typeof meta === "object") {
    meta.cardCount = list.length;
    meta.superstarCount = list.filter(card => card?.kind === "superstar").length;
  }
}

globalThis.WWE_LEGACY_SPLASH_IDENTITY_1193 = Object.freeze({
  kelani: "Kelani’s 450 Splash",
  sharedFrogSplash: true,
  eddie: "Eddie’s Frog Splash",
  jey: "Jey Uso Splash",
  jimmy: "Jimmy Uso Splash"
});
