import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { BUILD_VERSION } from "../js/config/build.js?v=1.1.128";
import build from "../build.json" with { type: "json" };

test("v1.1.95 runtime build identity matches build.json",()=>{
  assert.equal(BUILD_VERSION,build.version);
  assert.match(BUILD_VERSION,/^1\.1\.\d+$/);
});

test("v1.1.95 app update navigation has a same-build reload-loop guard",()=>{
  const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
  assert.ok(app.includes('searchParams.get("build") === String(version)'));
  assert.ok(app.includes("Update reload paused to prevent a loop"));
});

test("v1.1.95+ cache-busting imports are stamped to the current release version",()=>{
  const app=fs.readFileSync(new URL("../js/ui/app.js",import.meta.url),"utf8");
  assert.ok(app.includes(`config/build.js?v=${BUILD_VERSION}`));
  const versions=[...app.matchAll(/\?v=(1\.1\.\d+)/g)].map(m=>m[1]);
  assert.ok(versions.length>0);
  assert.deepEqual([...new Set(versions)],[BUILD_VERSION]);
});
