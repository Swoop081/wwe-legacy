import { superstars } from "../data/superstars.js?v=1.1.132";

// WWE Legacy v1.1.66 — featured-set Superstar ability individuality audit.
// The first nine featured launch sets should not ship template placeholder copy
// or exact duplicate Superstar ability payloads. Older, approved identities are
// preserved; later template-derived entries are given bespoke text/effects using
// engine-supported trigger primitives.

const FEATURED_SET_IDS = new Set([
  "raw-series-1",
  "smackdown-series-1",
  "nxt-series-1",
  "evolution-series-1",
  "summerslam-series-1",
  "golden-era-series-1",
  "new-generation-series-1",
  "attitude-era-series-1",
  "ruthless-aggression-series-1"
]);

const OVERRIDES = Object.freeze({
  // SmackDown — Series 1
  "shinsuke-nakamura": {
    name: "Strong Style",
    text: "The first 2 times Shinsuke connects with a Strike Move dealing 5+ damage, draw 1 page and the opponent loses 1 Adrenaline.",
    trigger: { type:"connectMethodDamage", method:"strike", minDamage:5, maxUses:2, draw:1, opponentAdrenaline:-1 },
    maxUses: 2
  },
  "blake-monroe": {
    name: "The Glamour",
    text: "The first 2 times Blake connects with an Agility Move immediately after a Technical Move in the same Control sequence, draw 2 pages.",
    trigger: { type:"agilityAfterTechnical", maxUses:2, draw:2 },
    maxUses: 2
  },
  "trick-williams": {
    name: "Whoop That Trick",
    text: "The first 2 times Trick connects with an Agility Move after a Strike Move earlier in the same Control sequence, draw 2 pages and gain +1 Adrenaline.",
    trigger: { type:"agilityAfterStrike", maxUses:2, draw:2, adrenaline:1 },
    maxUses: 2
  },
  "jacy-jayne": {
    name: "Fatal Influence",
    text: "The first 2 times Jacy connects with a Strike Move dealing 5+ damage, the opponent ditches 1 random page.",
    trigger: { type:"connectMethodDamage", method:"strike", minDamage:5, maxUses:2, discardOpponent:1 },
    maxUses: 2
  },

  // NXT — Series 1
  "kendal-grey": {
    name: "The Amateur Ace",
    text: "The first 2 times Kendal connects with a Move whose Method differs from the previous Move she connected with, draw 1 page and gain +1 Adrenaline.",
    trigger: { type:"differentMethod", maxUses:2, draw:1, adrenaline:1 },
    maxUses: 2
  },
  "tony-dangelo": {
    name: "The Don of NXT",
    text: "The first 2 times Tony connects with a Strength Move costing 6+, gain +1 Adrenaline.",
    trigger: { type:"connectMethodCost", method:"strength", minCost:6, maxUses:2, adrenaline:1 },
    maxUses: 2
  },
  "jaida-parker": {
    name: "Miss Parker",
    text: "The first 2 times Jaida connects with an Agility Move costing 5+, draw 1 page and gain +1 Adrenaline.",
    trigger: { type:"connectMethodCost", method:"agility", minCost:5, maxUses:2, draw:1, adrenaline:1 },
    maxUses: 2
  },
  "kelani-jordan": {
    name: "The Standout",
    text: "The first 2 times Kelani connects with a Move requiring Agility 2+, draw 1 page and gain +1 Adrenaline.",
    trigger: { type:"agilityRequirement", minRequirement:2, maxUses:2, draw:1, adrenaline:1 },
    maxUses: 2
  },
  "mason-rook": {
    name: "The Stone Wall",
    text: "The first 2 times Mason takes 7+ damage from one connected Move, gain +1 Adrenaline.",
    trigger: { type:"takeDamage", minDamage:7, maxUses:2, adrenaline:1 },
    maxUses: 2
  },
  "tatum-paxley": {
    name: "The Twisted Competitor",
    text: "The first 3 times Tatum successfully Counters a Move, draw 1 page and gain +1 Adrenaline.",
    trigger: { type:"counterDraw", maxUses:3, draw:1, adrenaline:1 },
    maxUses: 3
  },
  "lexis-king": {
    name: "The King",
    text: "Once per Control sequence after Lexis successfully Counters a Move, his next Technical Move costs 1 less. The first 2 times this triggers each match, draw 1 page and gain +1 Adrenaline.",
    trigger: { type:"perfectExecution", discount:1, draw:1, adrenaline:1, drawMaxUses:2 }
  },
  "zilla-fatu": {
    name: "The Samoan Destroyer",
    text: "The first 3 times an opponent connects with a non-Finisher Move that would ground Zilla, Zilla remains standing.",
    trigger: { type:"superHeavyweightGroundResist", maxUses:3 },
    maxUses: 3
  },

  // Ruthless Aggression — Series 1
  "batista": {
    name: "The Animal",
    text: "Once per Control sequence after Batista connects with a Technical Move, his next Strength Move costs 2 less.",
    trigger: { type:"bulldogPowerAndTechnique", discount:2 }
  },
  "jbl": {
    name: "The Wrestling God",
    text: "The first 2 times JBL takes 9+ damage from one connected Move, gain +1 Adrenaline.",
    trigger: { type:"takeDamage", minDamage:9, maxUses:2, adrenaline:1 },
    maxUses: 2
  },
  "eddie-guerrero": {
    name: "Latino Heat",
    text: "Once per Control sequence after Eddie connects with a Technical Grapple that grounds the opponent, his next Agility Move costs 2 less. If that Agility Move connects, gain +1 Adrenaline.",
    trigger: { type:"jerichoY2J", discount:2, adrenaline:1 }
  },
  "edge": {
    name: "The Rated-R Superstar",
    text: "Once per Control sequence after Edge successfully Counters a Move, his next Technical Move costs 1 less. The first 2 times this triggers each match, draw 2 pages and gain +1 Adrenaline.",
    trigger: { type:"perfectExecution", discount:1, draw:2, adrenaline:1, drawMaxUses:2 }
  },
  "jeff-hardy": {
    name: "The Charismatic Enigma",
    text: "The first 2 times Jeff connects with an Agility Move after a Strike Move earlier in the same Control sequence, draw 1 page and gain +2 Adrenaline.",
    trigger: { type:"agilityAfterStrike", maxUses:2, draw:1, adrenaline:2 },
    maxUses: 2
  },
  "rob-van-dam": {
    name: "The Whole F’n Show",
    text: "The first 3 times RVD connects with a Strike Move immediately after a Technical Move, that Strike deals +1 Damage and RVD gains +1 Adrenaline.",
    trigger: { type:"pentaZeroFearZeroMercy", maxUses:3, bonusDamage:1, adrenaline:1 },
    maxUses: 3
  }
});

const stars = Object.values(superstars);
for (const star of stars) {
  const override = OVERRIDES[star.id];
  if (override) star.ability = { ...override, trigger: { ...override.trigger } };
}

const stable = value => {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
};

const featured = stars.filter(star => FEATURED_SET_IDS.has(star.setId) && !star.developmentOnly);
const templateCopy = featured.filter(star => /\buses\b.*\breinforce this deck/i.test(star.ability?.text ?? ""));
const byTrigger = new Map();
for (const star of featured) {
  const signature = stable(star.ability?.trigger ?? {});
  if (!byTrigger.has(signature)) byTrigger.set(signature, []);
  byTrigger.get(signature).push(star);
}
const exactDuplicateTriggers = [...byTrigger.values()]
  .filter(group => group.length > 1)
  .map(group => group.map(star => ({ id:star.id, name:star.name, setId:star.setId, ability:star.ability?.name ?? "" })));

const report = Object.freeze({
  version: "1.1.66",
  featuredSetCount: FEATURED_SET_IDS.size,
  superstarCount: featured.length,
  overriddenSuperstars: Object.keys(OVERRIDES),
  templateCopy: templateCopy.map(star => star.id),
  exactDuplicateTriggers
});

globalThis.__WWE_LEGACY_SUPERSTAR_ABILITY_AUDIT__ = report;
if (templateCopy.length || exactDuplicateTriggers.length) {
  console.warn("WWE Legacy featured Superstar ability audit still has findings", report);
} else {
  console.info("WWE Legacy featured Superstar ability audit passed", report);
}
