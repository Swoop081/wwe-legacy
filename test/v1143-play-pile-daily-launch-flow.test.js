import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { sets } from "../js/data/sets.js?v=1.1.130";
import { PLAY_PILE_MAT_THEMES, playPileMatStyle } from "../js/ui/play-pile-mats.js?v=1.1.130";

const app = fs.readFileSync(new URL("../js/ui/app.js", import.meta.url), "utf8");
const css = fs.readFileSync(new URL("../css/game.css", import.meta.url), "utf8");

test("v1.1.43 every defined set has a self-contained play-pile mat theme", () => {
  const missing = Object.keys(sets).filter(setId => !PLAY_PILE_MAT_THEMES[setId]);
  assert.deepEqual(missing, []);
  for (const setId of Object.keys(sets)) {
    const style = playPileMatStyle(setId);
    assert.match(style, /--ring-mat-canvas:/);
    assert.match(style, /--ring-mat-accent:/);
    assert.match(style, /--ring-mat-secondary:/);
  }
});

test("v1.1.43 play pile no longer depends on the optional top-down ring asset", () => {
  assert.match(app, /const pileSetId = pendingMatch\?\.brandSetId \?\? matchPresentationSetId \?\? "summerslam-series-1"/);
  assert.match(app, /data-ring-mat-set="\$\{pileSetId\}" style="\$\{pileMatStyle\}"/);
  assert.match(app, /setLogoMarkup\(matchPresentationSetId,"ring-centre-logo"\) \|\| setLogoMarkup\(pileSetId,"ring-centre-logo"\)/);
  assert.match(css, /\.ring-play-surface\[data-ring-mat-set\]\{/);
  const v1143 = css.slice(css.indexOf("v1.1.43 — Set-complete play-pile mats"));
  assert.ok(v1143.length > 0);
  assert.doesNotMatch(v1143, /ui-ring-topdown\.svg/);
});

test("v1.1.43 Trish Play Now launches free pack first, then Daily Spin", () => {
  assert.match(app, /#launch-poster-play[\s\S]*if \(profile\) beginLaunchDailyRewards\(\)/);
  assert.match(app, /function beginLaunchDailyRewards\(\)[\s\S]*freePackStatus\(profile, new Date\(\)\)[\s\S]*claimFreeSeasonBooster\(profile, Math\.random, new Date\(\)\)[\s\S]*boosterReturnScreen = "launch-daily-rewards"[\s\S]*processPack\("standard"\)/);
  assert.match(app, /function continueLaunchDailyRewards\(\)[\s\S]*dailySpinState\(profile, new Date\(\)\)[\s\S]*dailySpinOpen = true[\s\S]*renderMainMenu\(\)/);
  assert.match(app, /function finishPackFlow\(\)[\s\S]*returnScreen === "launch-daily-rewards"[\s\S]*continueLaunchDailyRewards\(\)/);
});
