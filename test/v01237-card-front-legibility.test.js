import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const studio = fs.readFileSync(new URL('../js/tools/card-art-studio.js', import.meta.url), 'utf8');
const shared = fs.readFileSync(new URL('../js/shared/card-face-renderer.js', import.meta.url), 'utf8');

test('v1.1.5 keeps heavyweight Cost/Damage figures dominant without nested stat cells', () => {
  assert.doesNotMatch(studio, /const statBox=\(cx,label,value\)=>/);
  assert.match(shared, /size:64\*s/);
  assert.match(shared, /stat\(width\*\.16,"COST",card\.cost\?\?0\)/);
  assert.match(shared, /stat\(width\*\.84,"DAMAGE",card\.damage\?\?0\)/);
  assert.match(shared, /fillRect\(left,top,pw,bottom-top\)/);
  assert.match(shared, /strokeRect\(left,top,pw,bottom-top\)/);
});

test('v1.1.7 move requirements use larger equal-spaced colour dots while the type line retains hierarchy', () => {
  assert.match(shared, /drawRequirementDots\(ctx,card,cx,height\*\.866/);
  assert.match(shared, /fontSize=\(hasReq\?34:40\)\*s/);
  assert.match(shared, /MOVE • \$\{moveType\}/);
});
