import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync(new URL("../js/ui/app.js", import.meta.url), "utf8");

test("v0.14.14 Championship Road presentation metadata is normalized away from Live Event UI fields", () => {
  assert.match(app, /eventMeta: rawEventMeta, mode/);
  assert.match(app, /const eventMeta = mode === "live-event" \? rawEventMeta : null/);
  assert.match(app, /eventMeta\.eventName\.toUpperCase\(\)/);
  assert.match(app, /eventMeta \? `MATCH \$\{eventMeta\.stageIndex \+ 1\} OF \$\{LIVE_EVENT_LENGTH\}` : "MAIN EVENT"/);
});

test("v0.14.14 Championship Road header advertises the current 40-match length", () => {
  assert.match(app, /championship: \{ kicker: "40 MATCHES · FOUR DIFFICULTIES"/);
  assert.doesNotMatch(app, /championship: \{ kicker: "24 MATCHES · FOUR DIFFICULTIES"/);
});
