import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const studio=fs.readFileSync(new URL('../js/tools/card-art-studio.js',import.meta.url),'utf8');

test('v1.1.7 Move fronts do not print a no-requirement placeholder',()=>{
  assert.doesNotMatch(studio,/NO METHOD REQUIREMENT/);
  assert.doesNotMatch(studio,/NO MOMENTUM REQUIRED/);
  assert.match(studio,/const hasReq=drawRequirementDots\(card,w\*\.5,h\*\.866\)/);
});

test('v1.1.7 no-requirement Moves promote the Move type into the empty centre space',()=>{
  assert.match(studio,/hasReq\?34:40/);
  assert.match(studio,/hasReq\?h\*\.929:h\*\.895/);
});
