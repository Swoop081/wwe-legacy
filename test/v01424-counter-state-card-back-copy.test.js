import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const rules = fs.readFileSync(new URL('../js/data/game-rules.js', import.meta.url), 'utf8');

test('v0.14.24 card backs describe incoming move counter state without implying the card is a reversal', () => {
  assert.match(app, /<b>CAN BE COUNTERED AS<\/b> \$\{COUNTER_STATE_LABELS\[card\.counterState\]/);
  assert.doesNotMatch(app, /<b>COUNTER STATE<\/b>/);
  assert.match(app, /<b>REVERSES<\/b>/, 'actual state-reversal ability keeps its distinct REVERSES label');
});

test('v0.14.24 collection and Deck Lab metadata use the same clearer counter-state wording', () => {
  assert.match(app, /`Countered as \$\{COUNTER_STATE_LABELS\[card\.counterState\]/);
  assert.match(app, /`Countered as: \$\{COUNTER_STATE_LABELS\[card\.counterState\]/);
});

test('v0.14.24 Rulebook explicitly distinguishes exposed counter state from reversal ability', () => {
  assert.match(rules, /Card backs label this CAN BE COUNTERED AS/);
  assert.match(rules, /it does not mean the Move reverses anything itself/);
  assert.match(rules, /Actual reversal abilities are labeled REVERSES/);
});
