import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BUILD_VERSION } from '../js/config/build.js?v=1.0.0';
import { PROFILE_VERSION } from '../js/data/profile.js?v=1.0.0';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

function pngSize(file){
  const buf=fs.readFileSync(file);
  assert.equal(buf.toString('ascii',1,4),'PNG');
  return [buf.readUInt32BE(16),buf.readUInt32BE(20)];
}

test('v1.0.0 is an explicit stable launch build',()=>{
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  const build=JSON.parse(fs.readFileSync(path.join(root,'build.json'),'utf8'));
  assert.equal(pkg.version,'1.0.0');
  assert.equal(build.version,'1.0.0');
  assert.equal(BUILD_VERSION,'1.0.0');
  assert.equal(build.releaseChannel,'stable');
  assert.equal(build.launchStatus,'released');
  assert.equal(build.featureFreeze,true);
  assert.equal(build.criticalFixOnly,false);
  assert.equal(build.physicalIphoneSmoke,'passed-user-certified');
  assert.equal(PROFILE_VERSION,42);
});

test('v1.0.0 uses the supplied WWE Legacy logo for all installable web app icons',()=>{
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
  const icons=new Map(manifest.icons.map(i=>[i.sizes,i.src]));
  assert.equal(icons.get('192x192'),'assets/images/app-icon-192.png?v=1.0.0');
  assert.equal(icons.get('512x512'),'assets/images/app-icon-512.png?v=1.0.0');
  assert.deepEqual(pngSize(path.join(root,'assets/images/app-apple-touch-icon.png')),[180,180]);
  assert.deepEqual(pngSize(path.join(root,'assets/images/app-icon-192.png')),[192,192]);
  assert.deepEqual(pngSize(path.join(root,'assets/images/app-icon-512.png')),[512,512]);
  assert.deepEqual(pngSize(path.join(root,'assets/images/branding-wwe-legacy-logo.png')),[1024,1024]);
});

test('v1.0.0 index wires the launch icon into iOS, favicon and in-app chrome',()=>{
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  assert.match(html,/app-apple-touch-icon\.png\?v=1\.0\.0/);
  assert.match(html,/app-icon-192\.png\?v=1\.0\.0/);
  assert.match(html,/manifest\.webmanifest\?v=1\.0\.0/);
  assert.match(html,/class="gamebar-app-icon"[^>]+app-icon-192\.png\?v=1\.0\.0/);
});
