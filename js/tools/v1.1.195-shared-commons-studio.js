// v1.1.196 — Card Studio entries for shared Common Slap and Shove.
(() => {
  // Card Studio's generated data is exposed as the page-level STUDIO_CARDS binding.
  // Do not gate this on globalThis.STUDIO_CARDS: a top-level lexical binding is not
  // required to be mirrored as a Window/globalThis property.
  if (typeof STUDIO_CARDS === "undefined" || !Array.isArray(STUDIO_CARDS)) return;

  const makeStudioCard = card => ({
    ...card,
    source: "collector",
    superstarId: null,
    specificSuperstarIds: [],
    deckSuperstarIds: [],
    librarySuperstarIds: [],
    universalSuperstarCard: true,
    imageKey: card.id,
    artKey: card.id,
    currentArt: "assets/cards/art/temp/generic-wrestling-action.webp",
    finishedPath: `assets/cards/art/summerslam-series-1/${card.id}.webp`,
    basePlatePath: `assets/cards/art/summerslam-series-1/${card.id}-base-plate.webp`,
    amount: null,
    fixedPrintingTier: null,
    duration: null,
    scope: null,
    variantType: null,
    hpBonus: null,
    ultraRare: false,
    finisher: false,
    signature: false,
    trademark: false
  });

  const additions = [
    makeStudioCard({
      id: "slap",
      name: "Slap",
      kind: "move",
      setId: "summerslam-series-1",
      cardNumber: "S1",
      cardCode: "SS1-S01",
      cost: 1,
      damage: 2,
      rarity: 1,
      requirements: { strike: 1 },
      method: "strike",
      moveType: "strike",
      counterState: "arm-extended",
      counterStates: null,
      stun: 0,
      groundOpponent: false,
      groundedOnly: false,
      selfDamage: 0,
      boosterOnly: true,
      rulesText: "Shared. On Connect: opponent loses 1 Adrenaline.",
      effects: [{ type: "loseOpponentAdrenaline", amount: 1 }]
    }),
    makeStudioCard({
      id: "shove",
      name: "Shove",
      kind: "move",
      setId: "summerslam-series-1",
      cardNumber: "S2",
      cardCode: "SS1-S02",
      cost: 1,
      damage: 0,
      rarity: 1,
      requirements: { strength: 1 },
      method: "strength",
      moveType: "grapple",
      counterState: "front-control",
      counterStates: ["front-control"],
      stun: 0,
      groundOpponent: true,
      groundedOnly: false,
      selfDamage: 0,
      boosterOnly: true,
      defensiveOnly: true,
      rulesText: "Shared Counter-only Reversal. Counter a front-control Grapple. On successful Counter, opponent becomes grounded.",
      effects: []
    })
  ];

  for (const card of additions) {
    if (!STUDIO_CARDS.some(existing => existing?.id === card.id)) STUDIO_CARDS.push(card);
  }

  globalThis.WWE_LEGACY_CARD_STUDIO_SHARED_COMMONS_1196 = Object.freeze({
    slap: "slap",
    shove: "shove",
    visibleCount: additions.filter(card => STUDIO_CARDS.some(existing => existing?.id === card.id)).length
  });
})();
