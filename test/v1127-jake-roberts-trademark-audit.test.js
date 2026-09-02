import test from "node:test";
import assert from "node:assert/strict";
import { allGameplayCards } from "../js/data/content.js?v=1.1.117";
import { deckIds } from "../js/data/decks.js?v=1.1.117";
import { superstars } from "../js/data/superstars.js?v=1.1.117";
import { CARD_NUMBER_MANIFEST } from "../js/data/card-number-manifest.js?v=1.1.117";

const removed = ["jake-roberts-gutwrench-gutbuster", "jake-roberts-running-knee-lift"];

test("Jake's two unauthentic Trademarks are removed completely", () => {
  const ids = new Set(allGameplayCards.map(card => card.id));
  const manifestIds = new Set(CARD_NUMBER_MANIFEST.map(card => card.id));
  for (const id of removed) {
    assert.equal(ids.has(id), false);
    assert.equal(manifestIds.has(id), false);
    assert.equal(deckIds["jake-roberts"].includes(id), false);
  }
  const jake = Object.values(superstars).find(star => star.id === "jake-roberts");
  assert.deepEqual(jake.signatures, ["jake-roberts-short-arm-clothesline", "jake-roberts-ddt"]);
});

test("Jake keeps a legal 60-page deck using authentic shared replacements", () => {
  const deck = deckIds["jake-roberts"];
  assert.equal(deck.length, 60);
  const count = id => deck.filter(cardId => cardId === id).length;
  assert.equal(count("clothesline"), 4);
  assert.equal(count("short-arm-clothesline"), 2);
  assert.equal(count("punch"), 1);
  assert.equal(count("atomic-drop"), 5);
  assert.equal(count("neckbreaker"), 5);
  const kindById = new Map(allGameplayCards.map(card => [card.id, card.kind]));
  assert.ok([...new Set(deck)].filter(id => kindById.get(id) !== "momentum").every(id => count(id) <= 5));
  const counterCapable = card => card?.kind === "move" && ((card.counters?.length ?? 0) || (card.counterStates?.length ?? 0) || (card.counterSubmissionTargets?.length ?? 0) || (card.countersCardIds?.length ?? 0));
  assert.equal(deck.filter(id => counterCapable(allGameplayCards.find(card => card.id === id))).length, 10);
});

test("Golden Era collector numbering closes the removed-card gap", () => {
  const cards = CARD_NUMBER_MANIFEST.filter(card => card.setId === "golden-era-series-1");
  assert.equal(cards.length, 82);
  assert.deepEqual(cards.map(card => card.cardNumber).sort((a,b) => a-b), Array.from({ length: 82 }, (_, i) => i + 1));
  assert.equal(cards.some(card => card.cardCode === "GE1-083" || card.cardCode === "GE1-084"), false);
});
