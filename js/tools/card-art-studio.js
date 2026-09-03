// v1.1.189 — Card Studio sync for Shotgun Dropkick split + Sol Ruca X-Factor rebalance.
(() => {
  const NORMAL_ID = "shotgun-dropkick";
  const DIVING_ID = "diving-shot-gun-dropkick";
  const SET_ID = "money-in-the-bank-series-1";
  const normalRules = "Grounds opponent. When played by Finn Bálor, on connect search/draw Coup de Grâce; that searched Coup de Grâce costs 1 less during the current Control sequence.";
  const divingRules = "Diving aerial. Grounds opponent. Stun 1. When played by Finn Bálor, on connect search/draw Coup de Grâce; that searched Coup de Grâce costs 3 less during the current Control sequence.";

  const normal = STUDIO_CARDS.find(card => card?.id === NORMAL_ID);
  if (normal) {
    Object.assign(normal, {
      cost: 3,
      damage: 5,
      stun: 0,
      groundOpponent: true,
      rulesText: normalRules,
      moveType: "strike",
      method: "strike"
    });
  }

  if (!STUDIO_CARDS.some(card => card?.id === DIVING_ID)) {
    const base = normal ?? {};
    STUDIO_CARDS.push({
      ...base,
      id: DIVING_ID,
      name: "Diving Shot-Gun Dropkick",
      kind: "move",
      source: "collector",
      setId: SET_ID,
      cardNumber: "19A",
      cardCode: "MITB1-019A",
      superstarId: null,
      specificSuperstarIds: [],
      deckSuperstarIds: ["finn-balor"],
      librarySuperstarIds: ["finn-balor"],
      universalSuperstarCard: false,
      imageKey: DIVING_ID,
      artKey: DIVING_ID,
      currentArt: base.currentArt ?? "assets/cards/art/temp/generic-wrestling-action.webp",
      finishedPath: "assets/cards/art/money-in-the-bank-series-1/diving-shot-gun-dropkick.webp",
      basePlatePath: "assets/cards/art/money-in-the-bank-series-1/diving-shot-gun-dropkick-base-plate.webp",
      cost: 5,
      damage: 8,
      amount: null,
      method: "agility",
      moveType: "aerial",
      counterState: "diving-aerial",
      counterStates: null,
      submissionTarget: null,
      counterSubmissionTargets: null,
      rarity: 3,
      fixedPrintingTier: null,
      requirements: { agility: 2 },
      stun: 1,
      groundOpponent: true,
      rulesText: divingRules,
      duration: null,
      scope: null,
      variantType: null,
      hpBonus: null,
      ultraRare: false,
      finisher: false,
      signature: false,
      trademark: false
    });
  }

  const solXFactor = STUDIO_CARDS.find(card => card?.id === "sol-ruca-avalanche-x-factor");
  if (solXFactor) {
    Object.assign(solXFactor, {
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
    delete solXFactor.tacticalType;
    delete solXFactor.counterStates;
  }

  globalThis.WWE_LEGACY_CARD_STUDIO_SHOTGUN_188 = Object.freeze({
    normal: Object.freeze({ id: NORMAL_ID, cost: 3, damage: 5, stun: 0, coupDiscount: 1 }),
    diving: Object.freeze({ id: DIVING_ID, cardCode: "MITB1-019A", cost: 5, damage: 8, stun: 1, coupDiscount: 3, method: "agility", requirement: 2 })
  });

  globalThis.WWE_LEGACY_CARD_STUDIO_SOL_X_FACTOR_119 = Object.freeze({
    id: "sol-ruca-avalanche-x-factor",
    name: "X-Factor",
    cost: 4,
    damage: 7,
    method: "agility",
    requirement: 1,
    groundOpponent: true,
    stun: 0,
    counterState: "front-control"
  });

  const core = document.createElement("script");
  core.src = "../js/tools/card-art-studio-core.js?v=1.1.189-card-studio-sync";
  core.async = false;
  document.body.appendChild(core);
})();
