import test from "node:test";
import assert from "node:assert/strict";
import { superstars } from "../js/data/superstars.js?v=1.1.125";
const SETS = new Set(["nxt-series-1", "ruthless-aggression-series-1"]);
const expected = new Set(["kendal-grey","tony-dangelo","jaida-parker","kelani-jordan","mason-rook","tatum-paxley","lexis-king","zilla-fatu","john-cena","randy-orton","batista","jbl","eddie-guerrero","edge","jeff-hardy","rob-van-dam"]);
const stable = value => Array.isArray(value) ? `[${value.map(stable).join(",")}]` : value && typeof value === "object" ? `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}` : JSON.stringify(value);
test("v1.1.67 NXT and Ruthless Aggression Superstar abilities are authored in core data", () => {
  const stars = Object.values(superstars).filter(star => SETS.has(star.setId) && !star.developmentOnly);
  assert.equal(stars.length, 16); assert.deepEqual(new Set(stars.map(star => star.id)), expected);
  for (const star of stars) { assert.ok(star.ability?.name); assert.ok(star.ability?.text); assert.ok(star.ability?.trigger?.type); assert.doesNotMatch(star.ability.text, /\buses\b.*\breinforce this deck/i); }
  const signatures = stars.map(star => stable(star.ability.trigger)); assert.equal(new Set(signatures).size, signatures.length);
});
