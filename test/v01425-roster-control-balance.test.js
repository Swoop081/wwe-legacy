import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { allGameplayCards } from '../js/data/content.js?v=1.1.126';
import { superstars } from '../js/data/superstars.js?v=1.1.126';
import { decks } from '../js/data/decks.js?v=1.1.126';
import { MatchEngine } from '../js/engine/MatchEngine.js?v=1.1.126';

const card = id => allGameplayCards.find(c => c.id === id);
const star = id => Object.values(superstars).find(s => s.id === id);

test('v0.14.25 locks the approved roster balance values', () => {
  const oba = star('oba-femi');
  assert.equal(oba.ability.trigger.minCost, 7);
  assert.equal(oba.ability.trigger.draw, 1);

  const doink = star('doink-the-clown');
  assert.equal(doink.hp, 63);
  assert.equal(card('doink-stump-puller').submission.pressure, 7);

  const becky = star('becky-lynch');
  assert.equal(becky.hp, 69);
  assert.equal(card('becky-lynch-dis-arm-her').submission.pressure, 7);

  const perfect = star('mr-perfect');
  assert.equal(perfect.hp, 66);
  assert.equal(perfect.ability.trigger.drawMaxUses, 3);
  assert.equal(perfect.ability.trigger.adrenaline, 1);
});

test('v0.14.25 Tribal Chief only offers after Roman non-Finisher is Countered', () => {
  const roman = star('roman-reigns'), opp = star('cm-punk'), tribal = card('special-roman-reigns');
  const game = new MatchEngine({p1:roman,p2:opp,decks,rng:()=>0.42});
  const s = game.state(), p = s.players.p1;
  p.hand=[tribal]; p.deck=[]; p.specialUsed=false; s.phase='ACTION'; s.playerInControl='p1';

  assert.equal(game.passTurn('p1'), true);
  assert.equal(s.phase, 'ACTION');
  assert.equal(s.playerInControl, 'p2');
  assert.equal(p.specialUsed, false);

  s.phase='ACTION'; game._setControl('p1');
  assert.equal(game._transferControl('p2','counter',{draw:true,counteredCard:card('punch')}), true);
  assert.equal(s.phase, 'TRIGGER_RESPONSE');
  assert.equal(s.pendingTriggeredSpecial?.cardId, tribal.id);
  assert.equal(game.resolveTriggeredSpecial('p1', false), true);

  s.phase='ACTION'; game._setControl('p1');
  assert.equal(game._transferControl('p2','counter',{draw:true,counteredCard:card('roman-reigns-spear')}), true);
  assert.equal(s.phase, 'ACTION');
  assert.equal(s.playerInControl, 'p2');
  assert.equal(p.specialUsed, false);
});

test('v0.14.25 pin escapes use normal failed-pin Control rules for Shoulder Up and Best in the World', () => {
  const standing = allGameplayCards.find(c=>c.name==='Standing Moonsault');
  for (const escapeId of ['shoulder-up','special-cm-punk']) {
    const game = new MatchEngine({p1:star('logan-paul'),p2:star('cm-punk'),decks,rng:()=>0.999});
    const s=game.state(), escape=card(escapeId);
    s.playerInControl='p1'; s.phase='PIN_RESPONSE'; s.postMove={attackerId:'p1',defenderId:'p2',cardId:standing.id};
    s.proposedPin={attackerId:'p1',defenderId:'p2'}; s.players.p1.discard.push(standing); s.players.p2.hand=[escape];
    assert.equal(game.playPinEscape('p2',escape),true);
    assert.equal(s.playerInControl,'p1');
  }
});

test('v0.14.25 KO Show cancels utility but no longer steals Control', () => {
  const game = new MatchEngine({p1:star('cm-punk'),p2:star('kevin-owens'),decks,rng:()=>0.42});
  const s=game.state(), action=card('game-plan'), special=card('special-kevin-owens');
  s.playerInControl='p1'; s.phase='ACTION'; s.players.p1.hand=[action]; s.players.p2.hand=[special]; s.players.p2.specialUsed=false;
  assert.equal(game.playAction('p1',action),true);
  assert.equal(s.playerInControl,'p1');
  assert.equal(s.players.p1.turn.actionPlayed,1);
  assert.equal(s.players.p2.specialUsed,true);
  assert.ok(s.players.p1.discard.some(c=>c.id===action.id));
});

test('v0.14.25 control wording is normalized across comparable Specials', () => {
  assert.match(card('special-cm-punk').rulesText,/normal failed-pin rules/i);
  assert.match(card('shoulder-up').rulesText,/normal failed-pin rules/i);
  assert.doesNotMatch(card('special-kevin-owens').rulesText,/take Control/i);
  assert.doesNotMatch(card('special-the-undertaker').rulesText,/take Control/i);
  assert.doesNotMatch(card('special-bayley').rulesText,/take Control/i);
  const app=fs.readFileSync(new URL('../js/ui/app.js',import.meta.url),'utf8');
  assert.match(app,/Roman’s non-Finisher Move is Countered/);
});
