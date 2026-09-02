import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { collectionCards } from "../js/data/collection.js?v=1.1.107";
import { addOwnedCard, totalOwnedCopies, underTierOwnershipCap } from "../js/data/profile.js?v=1.1.107";
import { CARD_TIERS, fixedPrintingTierFor } from "../js/data/variants.js?v=1.1.107";

const blank = () => ({ ownedCards: {} });
const superstars = collectionCards.filter(card => card.kind === "superstar");
const entrances = collectionCards.filter(card => card.kind === "entrance");

test("v1.1.78 every Superstar and Entrance is intrinsically Amethyst-only", () => {
  assert.ok(superstars.length > 0);
  assert.ok(entrances.length > 0);
  for (const card of [...superstars, ...entrances]) {
    assert.equal(fixedPrintingTierFor(card), "amethyst", card.id);
    assert.equal(card.fixedPrintingTier, "amethyst", `${card.id} carries explicit catalogue tier`);
  }
});

test("v1.1.78 lower-tier requests cannot create lower-tier Superstar or Entrance ownership", () => {
  for (const card of [superstars[0], entrances[0]]) {
    const profile = blank();
    const result = addOwnedCard(profile, card.id, { tier: "normal", amount: 1 });
    assert.equal(result.tier, "amethyst");
    assert.equal(profile.ownedCards[card.id].amethyst, 1);
    for (const tier of CARD_TIERS.filter(tier => tier !== "amethyst")) {
      assert.equal(profile.ownedCards[card.id][tier], 0, `${card.id} cannot exist as ${tier}`);
      assert.equal(underTierOwnershipCap(blank(), card, tier), false, `${card.id} rejects ${tier}`);
    }
  }
});

test("v1.1.78 Superstar duplicates are excluded before pull while Entrance duplicates remain rollable for UP", () => {
  const source = fs.readFileSync(new URL("../js/data/boosters.js", import.meta.url), "utf8");
  assert.match(source, /unownedSuperstars = base\.filter\(card => card\.kind === "superstar" && totalOwnedCopies\(profile, card\.id\) === 0\)/);
  assert.match(source, /normalBase = base\.filter\(card => card\.kind !== "superstar"\)/);
  assert.doesNotMatch(source, /card\.kind !== "entrance" \|\| underOwnershipCap/);
  assert.match(source, /if \(fixedPullTier\)[\s\S]*pullTier = fixedPullTier/);
});

test("v1.1.78 duplicate Entrance overflows for UP while duplicate Superstar storage remains impossible", () => {
  const entrance = entrances[0];
  const superstar = superstars[0];
  const ep = blank();
  addOwnedCard(ep, entrance.id, { tier: "amethyst" });
  const entranceDup = addOwnedCard(ep, entrance.id, { tier: "amethyst" });
  assert.equal(entranceDup.added, 0);
  assert.equal(entranceDup.overflowed, 1);
  assert.equal(totalOwnedCopies(ep, entrance.id), 1);

  const sp = blank();
  addOwnedCard(sp, superstar.id, { tier: "amethyst" });
  const superstarDup = addOwnedCard(sp, superstar.id, { tier: "amethyst" });
  assert.equal(superstarDup.added, 0);
  assert.equal(totalOwnedCopies(sp, superstar.id), 1);
});

test("v1.1.78 Card Studio receives fixed Amethyst tier and locks its selector", () => {
  const generator = fs.readFileSync(new URL("../tools/generate-card-studio-data.mjs", import.meta.url), "utf8");
  const studio = fs.readFileSync(new URL("../js/tools/card-art-studio.js", import.meta.url), "utf8");
  assert.match(generator, /fixedPrintingTier: fixedPrintingTierFor\(card\) \?\? null/);
  assert.match(studio, /tierSelect\.disabled=!!PRINTING_TIER_FRAMES\[fixed\]/);
  assert.match(studio, /if\(PRINTING_TIER_FRAMES\[fixed\]\)return fixed/);
});
