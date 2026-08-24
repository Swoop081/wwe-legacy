import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createProfile } from '../js/data/profile.js?v=0.14.20';
import {
  CHAMPIONSHIP_ROAD_LENGTH, CHAMPIONSHIP_ROAD_SECTIONS, CHAMPIONSHIP_ROAD_OPPONENTS,
  championshipRoadForSuperstar, championshipRoadSectionForStage
} from '../js/data/championship-road.js?v=0.14.20';

const app = fs.readFileSync(new URL('../js/ui/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../css/game.css', import.meta.url), 'utf8');

test('v0.14.14 Championship Road is 40 matches in the approved ten-section order', () => {
  assert.equal(CHAMPIONSHIP_ROAD_LENGTH, 40);
  assert.deepEqual(CHAMPIONSHIP_ROAD_SECTIONS.map(s => [s.label,s.start,s.end]), [
    ['Golden Era · Part I',1,4],['New Generation · Part I',5,8],['Attitude Era · Part I',9,12],
    ['SummerSlam · Part I',13,16],['Evolution · Part I',17,20],['Golden Era · Part II',21,24],
    ['New Generation · Part II',25,28],['Attitude Era · Part II',29,32],
    ['SummerSlam · Part II',33,36],['Evolution · Part II',37,40]
  ]);
  assert.equal(CHAMPIONSHIP_ROAD_OPPONENTS.length, 40);
  assert.equal(championshipRoadSectionForStage(20).label, 'Golden Era · Part II');
  assert.equal(championshipRoadSectionForStage(28).label, 'Attitude Era · Part II');
});

test('v0.14.14 legacy 32-match active runs expand without losing numeric progress', () => {
  const p = createProfile('roman-reigns');
  p.championshipRoad.roadsBySuperstar ??= {};
  p.championshipRoad.roadsBySuperstar['roman-reigns'] = {
    activeRun:{superstarId:'roman-reigns',difficultyId:'easy',opponents:Array.from({length:32},(_,i)=>`old-${i}`),stage:9,status:'active'},
    clears:0,bestStage:9,clearsByDifficulty:{},bestStageByDifficulty:{easy:9},completedByDifficulty:{},unlockedDifficulties:['easy'],selectedDifficulty:'easy'
  };
  p.championshipRoad.selectedSuperstarId='roman-reigns';
  p.championshipRoad.perSuperstarRoadsMigrated=true;
  const road = championshipRoadForSuperstar(p,'roman-reigns');
  assert.equal(road.activeRun.stage,9);
  assert.equal(road.activeRun.opponents.length,40);
  assert.deepEqual(road.activeRun.opponents, CHAMPIONSHIP_ROAD_OPPONENTS);
});

test('v0.14.14 Championship Road freezes upper controls and focuses the active route group', () => {
  assert.match(app, /class="champ-road-fixed"/);
  assert.match(app, /data-champ-section=/);
  assert.match(app, /const focusSection = championshipRoadSectionForStage\(focusStage\)/);
  assert.match(app, /map\.scrollTop = Math\.max\(0, sectionEl\.offsetTop - 8\)/);
  assert.match(css, /body\[data-screen="championship"\] \.champ-road-map\{[\s\S]*overflow-y:auto!important/);
  assert.match(css, /body\[data-screen="championship"\] \.champ-road-fixed\{[\s\S]*flex:0 0 auto!important/);
});

test('v0.14.14 entrance label uses the lower open portion of the hero while the logo remains in row one', () => {
  assert.match(css, /entrance-hero-band\{[\s\S]*grid-template-rows:auto minmax\(0,1fr\) auto!important/);
  assert.match(css, /entrance-intro-heading\{[\s\S]*grid-row:3!important;align-self:end!important/);
});
