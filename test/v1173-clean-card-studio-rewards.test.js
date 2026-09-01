import test from "node:test";import assert from "node:assert/strict";import fs from "node:fs";
const studio=fs.readFileSync(new URL("../js/tools/card-art-studio-data.js",import.meta.url),"utf8");
test("v1.1.73 Card Studio excludes retired Rewards",()=>{for(const term of ["season-1-final-boss","parked-chyna","season-2-whos-next","Final Boss","Goldberg","Chyna"])assert.equal(studio.includes(term),false,term);});
test("v1.1.73 Card Studio retains Trish",()=>{assert.match(studio,/Trish Stratus/);assert.match(studio,/season-1-last-time-is-now/);});
