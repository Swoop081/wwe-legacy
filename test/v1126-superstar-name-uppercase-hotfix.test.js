import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../css/game.css", import.meta.url), "utf8");

test("live Superstar card nameplates render names in uppercase without changing their typography", () => {
  const rule = css.match(/\.ccg-superstar-nameplate strong\{([^}]+)\}/)?.[1] ?? "";
  assert.match(rule, /text-transform:uppercase/);
  assert.match(rule, /font-family:var\(--np-font/);
  assert.match(rule, /font-style:normal/);
});

test("Superstar Pack uses the approved WWE Legacy logo asset", () => {
  const app = readFileSync(new URL("../js/ui/app.js", import.meta.url), "utf8");
  const block = app.slice(app.indexOf('class="superstar-pack-sealed"'), app.indexOf('class="superstar-pack-footnote"'));
  assert.match(block, /launchBrandLogoMarkup\(false\)/);
  assert.doesNotMatch(block, /legacyLogoMarkup\(true\)/);
});

test("Merch animated artwork fills the card face behind the plaque", () => {
  const rule = css.match(/\.ccg-card\.type-merch \.ccg-animated-card-surface\{([^}]+)\}/)?.[1] ?? "";
  assert.match(rule, /top:4\.4%!important/);
  assert.match(rule, /bottom:4\.4%!important/);
  assert.doesNotMatch(rule, /bottom:23\.0%/);
});
