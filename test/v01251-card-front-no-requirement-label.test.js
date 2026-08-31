import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const studio=fs.readFileSync(new URL('../js/tools/card-art-studio.js',import.meta.url),'utf8');
const shared=fs.readFileSync(new URL('../js/shared/card-face-renderer.js',import.meta.url),'utf8');

test('v1.1.7 Move fronts do not print a no-requirement placeholder',()=>{
  assert.doesNotMatch(studio,/NO METHOD REQUIREMENT/);
  assert.doesNotMatch(studio,/NO MOMENTUM REQUIRED/);
  assert.match(shared,/const hasReq=drawRequirementDots\(ctx,card,cx,height\*\.866/);
});

test('v1.1.7 no-requirement Moves promote the Move type into the empty centre space',()=>{
  assert.match(shared,/fontSize=\(hasReq\?34:40\)\*s/);
  assert.match(shared,/y=height\*\(hasReq\?\.929:\.895\)/);
});
