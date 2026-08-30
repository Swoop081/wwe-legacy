import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const css = fs.readFileSync(path.join(root,"css/game.css"),"utf8");
const app = fs.readFileSync(path.join(root,"js/ui/app.js"),"utf8");

test("v1.1.33 keeps Trish at 2x but moves the Home Season render out of the XP bar lane", () => {
  const block = css.slice(css.lastIndexOf("v1.1.33 — Home Season One Trish framing correction"));
  assert.match(block,/\.legacy-season-rock:has\(img\.legacy-season-cena\)\{[\s\S]*top:-6%!important;[\s\S]*right:-20%!important;[\s\S]*height:106%!important;/);
  assert.match(block,/\.legacy-season-rock img\.legacy-season-cena\{[\s\S]*transform:scale\(2\)!important;[\s\S]*transform-origin:right top!important;/);
  assert.match(app,/seasonOneTrishRenderMarkup\("legacy-season-cena"\)/);
});
