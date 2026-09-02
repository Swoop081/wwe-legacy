import assert from 'node:assert/strict';
import { STARTER_CHOICES, WELCOME_SUPERSTAR_SET_IDS, createProfile, claimWelcomeSuperstar, ownedCount, DEFAULT_PLAYER_ENTRANCE_ID, STARTING_MOMENTUM_COPIES } from '../js/data/profile.js?v=1.1.117';
import { buildPlayableDeck } from '../js/data/deck-assistant.js?v=1.1.117';
import { claimAllSeasonTiers, seasonState } from '../js/data/seasons.js?v=1.1.117';

const report = { starterPaths: [], welcomePaths: [], seasonCompletion: null };
for (const sid of STARTER_CHOICES) {
  const p = createProfile(sid);
  const playable = buildPlayableDeck(p,sid).length;
  assert.equal(playable,60);
  assert.equal(ownedCount(p,DEFAULT_PLAYER_ENTRANCE_ID,'normal'),1);
  for (const method of ['strength','strike','technical','agility']) assert.equal(ownedCount(p,`momentum-${method}`,'normal'),STARTING_MOMENTUM_COPIES);
  report.starterPaths.push({ superstarId:sid, playablePages:playable, onboardingActive:!p.onboarding.complete });
}
for (const setId of WELCOME_SUPERSTAR_SET_IDS) {
  const p = createProfile('cm-punk');
  const result = claimWelcomeSuperstar(p,setId,()=>0);
  const playable = buildPlayableDeck(p,result.superstarId).length;
  assert.equal(playable,60);
  report.welcomePaths.push({ setId, superstarId:result.superstarId, playablePages:playable, normalDeck:p.savedDecks[result.superstarId].every(entry=>entry.tier==='normal') });
}
const p = createProfile('roman-reigns');
p.seasons['season-1'].xp = 5000;
claimAllSeasonTiers(p,new Date('2026-08-25T12:00:00'));
const state = seasonState(p);
const moveIds=['john-cena-protobomb','john-cena-five-knuckle-shuffle','john-cena-stf','john-cena-attitude-adjustment'];
const oneIds=['john-cena-hustle-loyalty-respect','special-john-cena','entrance-john-cena','superstar-john-cena'];
assert.ok(moveIds.every(id=>ownedCount(p,id,'amethyst')===5));
assert.ok(oneIds.every(id=>ownedCount(p,id,'amethyst')===1));
assert.equal(p.savedDecks['john-cena'].length,60);
assert.equal(state.completionCelebrationPending,true);
report.seasonCompletion={ tier:50, cenaUnlocked:p.unlockedSuperstars.includes('john-cena'), rubyExclusiveCopies:24, deckPages:p.savedDecks['john-cena'].length, dedicatedCelebrationPending:state.completionCelebrationPending };
console.log(JSON.stringify(report,null,2));
