import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BUILD_VERSION } from '../js/config/build.js?v=1.0.2';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

function pngSize(file){
  const buf=fs.readFileSync(file);
  assert.equal(buf.toString('ascii',1,4),'PNG');
  return [buf.readUInt32BE(16),buf.readUInt32BE(20)];
}

test('v1.0.1 launch-branding hotfix carries forward on the v1.0 patch line',()=>{
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  const build=JSON.parse(fs.readFileSync(path.join(root,'build.json'),'utf8'));
  assert.match(pkg.version,/^1\.0\.[1-9]\d*$/);
  assert.equal(build.version,pkg.version);
  assert.equal(BUILD_VERSION,pkg.version);
  assert.equal(build.releaseChannel,'stable');
  assert.equal(build.launchStatus,'released');
  assert.equal(build.featureFreeze,true);
});

test('launch splash renders the supplied WWE Legacy logo instead of the legacy CSS wordmark',()=>{
  const app=fs.readFileSync(path.join(root,'js/ui/app.js'),'utf8');
  assert.match(app,/function launchBrandLogoMarkup\(showVersion = false\)/);
  assert.match(app,/branding-wwe-legacy-lockup\.png\?v=\$\{BUILD_VERSION\}/);
  const splash=app.match(/function renderSplash\(\)[\s\S]*?function renderMainMenu\(\)/)?.[0] ?? '';
  assert.match(splash,/clean-splash-brand">\$\{launchBrandLogoMarkup\(true\)\}/);
  assert.doesNotMatch(splash,/clean-splash-brand">\$\{legacyLogoMarkup/);
});

test('launch-specific supplied-logo lockup asset is present and wide',()=>{
  const [w,h]=pngSize(path.join(root,'assets/images/branding-wwe-legacy-lockup.png'));
  assert.equal(w,800);
  assert.equal(h,410);
  assert.ok(w/h > 1.9);
});
