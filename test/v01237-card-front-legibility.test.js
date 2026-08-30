import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const studio = fs.readFileSync(new URL('../js/tools/card-art-studio.js', import.meta.url), 'utf8');

test('v1.1.5 keeps heavyweight Cost/Damage figures dominant without nested stat cells', () => {
  assert.doesNotMatch(studio, /const statBox=\(cx,label,value\)=>/);
  assert.match(studio, /cardFont\(NUMBER_STACK,64,1000\)/);
  assert.match(studio, /statFigure\(w\*\.16,"COST",card\.cost\?\?0\)/);
  assert.match(studio, /statFigure\(w\*\.84,"DAMAGE",card\.damage\?\?0\)/);
  assert.match(studio, /fillRect\(panelLeft,panelTop,panelWidth/);
  assert.match(studio, /strokeRect\(panelLeft,panelTop,panelWidth/);
});

test('v1.1.7 move requirements use larger equal-spaced colour dots while the type line retains hierarchy', () => {
  assert.match(studio, /drawRequirementDots\(card,w\*\.5,h\*\.866\)/);
  assert.match(studio, /hasReq\?34:40/);
  assert.match(studio, /MOVE • \$\{moveType\}/);
});
