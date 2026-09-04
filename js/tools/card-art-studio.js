// v1.1.197 — Card Studio sync for exclusive identities and generic booster-only library isolation.
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

  const electricChairDrop = STUDIO_CARDS.find(card => card?.id === "rhea-ripley-electric-chair-facebuster");
  if (electricChairDrop) {
    Object.assign(electricChairDrop, {
      name: "Electric Chair Drop",
      superstarId: null,
      specificSuperstarIds: [],
      deckSuperstarIds: [],
      librarySuperstarIds: [],
      universalSuperstarCard: false,
      rarity: 2,
      boosterOnly: true,
      rulesText: "Shared. Grounds opponent."
    });
    delete electricChairDrop.allowedSuperstarIds;
    delete electricChairDrop.trademark;
    delete electricChairDrop.signature;
    delete electricChairDrop.finisher;
  }

  const crucifixPowerbomb = STUDIO_CARDS.find(card => card?.id === "razor-s-edge");
  if (crucifixPowerbomb) {
    Object.assign(crucifixPowerbomb, {
      name: "Rhea’s Crucifix Powerbomb",
      superstarId: "rhea-ripley",
      specificSuperstarIds: ["rhea-ripley"],
      librarySuperstarIds: ["rhea-ripley"],
      universalSuperstarCard: false,
      rarity: 3,
      boosterOnly: true,
      trademark: true,
      signature: false,
      rulesText: "Rhea Ripley-exclusive Trademark. Grounds opponent."
    });
  }

  const kelani450 = STUDIO_CARDS.find(card => card?.id === "kelani-jordan-450-splash");
  if (kelani450) {
    Object.assign(kelani450, {
      name: "Kelani’s 450 Splash",
      superstarId: "kelani-jordan",
      specificSuperstarIds: ["kelani-jordan"],
      librarySuperstarIds: ["kelani-jordan"],
      universalSuperstarCard: false,
      trademark: true,
      rulesText: "Kelani Jordan-exclusive Trademark. 450 Splash. Grounded opponent only. On Connect: +1 persistent Leg damage."
    });
  }

  const sharedFrog = STUDIO_CARDS.find(card => card?.id === "frog-splash");
  if (sharedFrog) {
    Object.assign(sharedFrog, {
      name: "Frog Splash",
      superstarId: null,
      specificSuperstarIds: [],
      deckSuperstarIds: [],
      librarySuperstarIds: [],
      universalSuperstarCard: false,
      boosterOnly: true,
      rulesText: "Shared. Grounded opponent only. Stun 1.",
      effects: []
    });
    delete sharedFrog.allowedSuperstarIds;
    delete sharedFrog.trademark;
    delete sharedFrog.signature;
    delete sharedFrog.finisher;
  }

  const eddieFrog = STUDIO_CARDS.find(card => card?.id === "eddie-guerrero-frog-splash");
  if (eddieFrog) {
    Object.assign(eddieFrog, {
      name: "Eddie’s Frog Splash",
      superstarId: "eddie-guerrero",
      specificSuperstarIds: ["eddie-guerrero"],
      librarySuperstarIds: ["eddie-guerrero"],
      universalSuperstarCard: false,
      finisher: true,
      rulesText: "Eddie Guerrero-exclusive Finisher. Frog Splash. No Method requirement. Grounded opponent only. On Connect: opponent loses 1 additional Adrenaline."
    });
  }

  const eddieLasso = STUDIO_CARDS.find(card => card?.id === "eddie-guerrero-lasso-from-el-paso");
  if (eddieLasso) {
    Object.assign(eddieLasso, {
      rulesText: "Eddie Guerrero-exclusive Trademark Submission. Lasso from El Paso. Grounded opponent only. +5 persistent Leg damage per successful turn. On Connect: search/draw Eddie’s Frog Splash; it costs 1 less this Control sequence.",
      searchOnConnectName: "Eddie’s Frog Splash"
    });
  }

  const jeySplash = STUDIO_CARDS.find(card => card?.id === "uso-splash");
  if (jeySplash) {
    Object.assign(jeySplash, {
      name: "Jey Uso Splash",
      superstarId: "jey-uso",
      specificSuperstarIds: ["jey-uso"],
      librarySuperstarIds: ["jey-uso"],
      universalSuperstarCard: false,
      finisher: true,
      rulesText: "Jey Uso-exclusive Finisher. No Method requirement. Grounded opponent only. If played immediately after Spear in the same Control sequence, +1 Damage."
    });
    delete jeySplash.allowedSuperstarIds;
  }

  const jeyAction = STUDIO_CARDS.find(card => card?.id === "special-jey-uso");
  if (jeyAction) {
    jeyAction.rulesText = "Once per match, after Jey connects with Spear, search/draw Jey Uso Splash. That searched Jey Uso Splash costs 3 less during the current Control sequence.";
    if (jeyAction.special && typeof jeyAction.special === "object") jeyAction.special.searchName = "Jey Uso Splash";
  }

  const jimmySplash = STUDIO_CARDS.find(card => card?.id === "jimmy-uso-uso-splash");
  if (jimmySplash) {
    Object.assign(jimmySplash, {
      name: "Jimmy Uso Splash",
      superstarId: "jimmy-uso",
      specificSuperstarIds: ["jimmy-uso"],
      librarySuperstarIds: ["jimmy-uso"],
      universalSuperstarCard: false,
      finisher: true,
      rulesText: "Jimmy Uso-exclusive Finisher. No Method requirement. Grounded opponent only."
    });
  }

  const renames = new Map([
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
  const refsByStar = {
    "jacob-fatu": new Map([["Moonsault", "Jacob Fatu’s Moonsault"], ["Pop-Up Samoan Drop", "Jacob Fatu’s Pop-Up Samoan Drop"]]),
    "jaida-parker": new Map([["Samoan Drop", "Jaida Parker’s Samoan Drop"], ["Running Hip Attack", "Jaida Parker’s Running Hip Attack"]]),
    "jimmy-uso": new Map([["Running Hip Attack", "Jimmy Uso’s Running Hip Attack"], ["Spear", "Jimmy Uso’s Spear"], ["Superkick", "Jimmy Uso’s Superkick"]]),
    "zilla-fatu": new Map([["Pop-Up Samoan Drop", "Zilla Fatu’s Pop-Up Samoan Drop"]]),
    "lexis-king": new Map([["Superkick", "Lexis King’s Superkick"]])
  };
  const replaceRefs = (value, replacements) => {
    if (!value || !replacements) return;
    if (Array.isArray(value)) { for (const item of value) replaceRefs(item, replacements); return; }
    if (typeof value !== "object") return;
    for (const [key, current] of Object.entries(value)) {
      if (typeof current === "string") {
        if (["name", "searchName", "searchOnConnectName", "standingChainAfter", "afterName"].includes(key) && replacements.has(current)) value[key] = replacements.get(current);
      } else replaceRefs(current, replacements);
    }
  };
  for (const card of STUDIO_CARDS) {
    if (renames.has(card?.id)) card.name = renames.get(card.id);
    const replacements = refsByStar[card?.superstarId];
    if (replacements) {
      replaceRefs(card, replacements);
      if (typeof card.rulesText === "string") for (const [oldName, newName] of replacements) card.rulesText = card.rulesText.replaceAll(oldName, newName);
    }
  }

  const duplicateRunningPowerslam = STUDIO_CARDS.findIndex(card => card?.id === "ra1-running-powerslam");
  if (duplicateRunningPowerslam >= 0) STUDIO_CARDS.splice(duplicateRunningPowerslam, 1);

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

  globalThis.WWE_LEGACY_CARD_STUDIO_RHEA_SWAP_1190 = Object.freeze({
    electricChairDrop: Object.freeze({ id: "rhea-ripley-electric-chair-facebuster", rarity: 2, shared: true, trademark: false, superstarAssigned: false }),
    crucifixPowerbomb: Object.freeze({ id: "razor-s-edge", rarity: 3, superstarId: "rhea-ripley", trademark: true })
  });

  globalThis.WWE_LEGACY_CARD_STUDIO_SPLASH_IDENTITY_1193 = Object.freeze({
    kelani: "Kelani’s 450 Splash",
    sharedFrogSplash: true,
    sharedFrogSplashSuperstarAssigned: false,
    eddie: "Eddie’s Frog Splash",
    jey: "Jey Uso Splash",
    jimmy: "Jimmy Uso Splash"
  });

  globalThis.WWE_LEGACY_CARD_STUDIO_EXCLUSIVE_NAMES_1194 = Object.freeze({
    renamed: Object.freeze(Object.fromEntries(renames)),
    canonicalRunningPowerslam: "running-powerslam",
    removedRunningPowerslamAlias: "ra1-running-powerslam"
  });

  globalThis.WWE_LEGACY_CARD_STUDIO_GENERIC_BOOSTER_ONLY_1197 = Object.freeze({
    ids: Object.freeze(["frog-splash", "rhea-ripley-electric-chair-facebuster", "slap", "shove"]),
    universalSuperstarCard: false
  });

  const core = document.createElement("script");
  core.src = "../js/tools/card-art-studio-core.js?v=1.1.197-card-studio-sync";
  core.async = false;
  document.body.appendChild(core);
})();