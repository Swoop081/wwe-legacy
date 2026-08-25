import { createProfile } from '../js/data/profile.js';
import { superstars } from '../js/data/superstars.js';
import { isPlayerVisibleSuperstar, isUnreleasedSetId, isLaunchLiveSetId } from '../js/data/release.js';
import { boosterCreditsFor } from '../js/data/boosters.js';
import {
  CHAMPIONSHIP_ROAD_LENGTH, CHAMPIONSHIP_ROAD_OPPONENTS, CHAMPIONSHIP_ROAD_SECTIONS,
  championshipRoadOpponentsForSuperstar, championshipDifficultyUnlocked,
  startChampionshipRoad, recordChampionshipMatch
} from '../js/data/championship-road.js';
import {
  LIVE_EVENT_LENGTH, DAILY_LIVE_EVENT_SET_XP, BIRTHDAY_TOWERS, RELEASED_BIRTHDAY_ROSTER_IDS,
  activeLiveEventTowers, startLiveEventTower, recordLiveEventTowerMatch,
  dailyLiveEventSetStatus
} from '../js/data/live-events.js';
import { seasonState } from '../js/data/seasons.js';

const START = new Date('2026-08-25T12:00:00');
const DAY_MS = 86400000;
const fixedRng = () => 0.371;
const allIds = Object.values(superstars).filter(star => !star.developmentOnly).map(star => star.id);
const launchSetIds = ['summerslam-series-1','evolution-series-1','new-generation-series-1','golden-era-series-1','attitude-era-series-1'];
function profileAll() { const p=createProfile('cm-punk'); p.unlockedSuperstars=[...new Set(allIds)]; return p; }
function visibleIds(profile, now=START) { return Object.values(superstars).filter(star=>isPlayerVisibleSuperstar(star,profile,now)).map(star=>star.id); }
function totalCredits(profile){ return launchSetIds.reduce((sum,id)=>sum+boosterCreditsFor(profile,id),0); }
function invariant(ok, message){ if(!ok) throw new Error(message); }

const master = profileAll();
const released = visibleIds(master);
let roadSlots = 0, roadClears = 0, checkpointPacks = 0, mirrorRoads = 0, certifiedMirrorMatches = 0;
for (const id of released) {
  const opponents = championshipRoadOpponentsForSuperstar(id);
  invariant(opponents.length===CHAMPIONSHIP_ROAD_LENGTH, `${id}: wrong road length`);
  invariant(new Set(opponents).size===CHAMPIONSHIP_ROAD_LENGTH, `${id}: duplicate road opponent`);
  invariant(JSON.stringify(opponents)===JSON.stringify(CHAMPIONSHIP_ROAD_OPPONENTS), `${id}: route diverged from canonical map`);
  const mirrorCount = opponents.filter(opponentId => opponentId===id).length;
  invariant(mirrorCount===(CHAMPIONSHIP_ROAD_OPPONENTS.includes(id)?1:0), `${id}: incorrect mirror-match count`);
  if (mirrorCount) mirrorRoads += 1;
  roadSlots += opponents.length;
  const p=profileAll();
  const before=totalCredits(p);
  for (const difficultyId of ['easy','normal','hard','hardcore']) {
    const run=startChampionshipRoad(p,id,[],fixedRng,difficultyId);
    if (difficultyId === 'easy') invariant(recordChampionshipMatch(p,'loss',id).status==='retry' && run.stage===0, `${id}: loss did not retry`);
    const rewards=[];
    for(let i=0;i<CHAMPIONSHIP_ROAD_LENGTH;i++){
      const outcome=recordChampionshipMatch(p,'win',id);
      if(outcome.packAwarded) rewards.push(outcome.packSetId);
    }
    invariant(run.status==='cleared', `${id}/${difficultyId}: road did not clear`);
    invariant(rewards.length===CHAMPIONSHIP_ROAD_SECTIONS.length, `${id}/${difficultyId}: checkpoint reward count`);
    invariant(JSON.stringify(rewards)===JSON.stringify(CHAMPIONSHIP_ROAD_SECTIONS.map(s=>s.setId)), `${id}/${difficultyId}: checkpoint reward order`);
    roadClears += 1; checkpointPacks += rewards.length;
    if (CHAMPIONSHIP_ROAD_OPPONENTS.includes(id)) certifiedMirrorMatches += 1;
  }
  invariant(totalCredits(p)===before+40, `${id}: expected forty packs across four difficulties`);
  invariant(championshipDifficultyUnlocked(p,'hardcore',id), `${id}: Hardcore did not unlock`);
}

let calendarTowers=0, invalidRewardSets=0, dailyClears=0, dailyPacks=0, dailySetBonuses=0;
for(let d=0;d<365;d++){
  const now=new Date(START.getTime()+d*DAY_MS);
  const p=profileAll();
  const towers=activeLiveEventTowers(now,p);
  invariant(towers.length===3, `${now.toDateString()}: expected 3 towers`);
  invariant(new Set(towers.map(t=>t.key)).size===3, `${now.toDateString()}: duplicate tower keys`);
  calendarTowers += towers.length;
  for(const tower of towers){ if(isUnreleasedSetId(tower.event.rewardSetId,now)) invalidRewardSets += 1; }
  // Exercise the complete three-tower reward loop on every calendar day.
  {
    const eligible=visibleIds(p,now);
    const before=totalCredits(p);
    for(const tower of towers){
      const run=startLiveEventTower(p,tower.key,'cm-punk',eligible,fixedRng,now);
      invariant(run.opponents.length===LIVE_EVENT_LENGTH && new Set(run.opponents).size===LIVE_EVENT_LENGTH, `${tower.key}: invalid route`);
      invariant(!run.opponents.includes('cm-punk'), `${tower.key}: self-match`);
      for(let i=0;i<LIVE_EVENT_LENGTH;i++){
        const outcome=recordLiveEventTowerMatch(p,tower.key,'win',now,fixedRng);
        if(outcome.status==='cleared'){ dailyClears += 1; dailyPacks += outcome.packCount ?? 0; if(outcome.dailySetXpAwarded) dailySetBonuses += 1; }
      }
    }
    invariant(totalCredits(p)===before+3, `${now.toDateString()}: daily set did not award three packs`);
    invariant(dailyLiveEventSetStatus(p,now).claimed, `${now.toDateString()}: daily XP claim not sealed`);
    invariant(seasonState(p).liveEventBonusXpEarned===DAILY_LIVE_EVENT_SET_XP, `${now.toDateString()}: wrong daily set XP`);
  }
}
invariant(invalidRewardSets===0,'Live Event calendar exposed an unreleased reward set');
const launchBirthdayIds = Object.values(superstars).filter(star=>!star.developmentOnly && isLaunchLiveSetId(star.setId)).map(star=>star.id).sort();
const configuredBirthdayIds = [...RELEASED_BIRTHDAY_ROSTER_IDS].sort();
invariant(JSON.stringify(launchBirthdayIds)===JSON.stringify(configuredBirthdayIds),'Birthday Bash roster does not match released launch roster');
const birthdayBossIds = BIRTHDAY_TOWERS.filter(event=>launchBirthdayIds.includes(event.bossId)).map(event=>event.bossId).sort();
invariant(JSON.stringify(launchBirthdayIds)===JSON.stringify(birthdayBossIds),'A released launch Superstar is missing a Birthday Bash profile');

console.log(JSON.stringify({
  build:'0.17.01',
  championshipRoad:{releasedSuperstars:released.length, roadLength:CHAMPIONSHIP_ROAD_LENGTH, certifiedOpponentSlots:roadSlots, fullDifficultyClears:roadClears, checkpointPacks, checkpointCountPerRoad:CHAMPIONSHIP_ROAD_SECTIONS.length, mirrorRoads, certifiedMirrorMatches},
  liveEvents:{calendarDays:365, towerDescriptors:calendarTowers, towersPerDay:3, invalidRewardSets, fullyClearedDays:365, towerClears:dailyClears, clearPacks:dailyPacks, dailySetXpBonuses:dailySetBonuses, dailySetXp:DAILY_LIVE_EVENT_SET_XP, birthdayRoster:configuredBirthdayIds.length, birthdayProfiles:birthdayBossIds.length}
},null,2));
