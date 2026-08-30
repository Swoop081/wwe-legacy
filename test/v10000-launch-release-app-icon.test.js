import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BUILD_VERSION } from '../js/config/build.js?v=1.1.25';
import { PROFILE_VERSION } from '../js/data/profile.js?v=1.1.25';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

function pkgVersion(){return JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version;}

function pngSize(file){
  const buf=fs.readFileSync(file);
  assert.equal(buf.toString('ascii',1,4),'PNG');
  return [buf.readUInt32BE(16),buf.readUInt32BE(20)];
}

test('v1.0 launch line remains an explicit stable release',()=>{
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  const build=JSON.parse(fs.readFileSync(path.join(root,'build.json'),'utf8'));
  assert.match(pkg.version,/^1\.0\.\d+$/);
  assert.equal(build.version,pkg.version);
  assert.equal(BUILD_VERSION,pkg.version);
  assert.equal(build.releaseChannel,'stable');
  assert.equal(build.launchStatus,'released');
  assert.equal(build.featureFreeze,true);
  assert.equal(build.criticalFixOnly,false);
  assert.equal(build.physicalIphoneSmoke,'passed-user-certified');
  assert.equal(PROFILE_VERSION,42);
});

test('v1.0 launch line uses the supplied WWE Legacy logo for all installable web app icons',()=>{
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
  const icons=new Map(manifest.icons.map(i=>[i.sizes,i.src]));
  assert.equal(icons.get('192x192'),`assets/images/app-icon-192.png?v=${pkgVersion()}`);
  assert.equal(icons.get('512x512'),`assets/images/app-icon-512.png?v=${pkgVersion()}`);
  assert.deepEqual(pngSize(path.join(root,'assets/images/app-apple-touch-icon.png')),[180,180]);
  assert.deepEqual(pngSize(path.join(root,'assets/images/app-icon-192.png')),[192,192]);
  assert.deepEqual(pngSize(path.join(root,'assets/images/app-icon-512.png')),[512,512]);
  assert.deepEqual(pngSize(path.join(root,'assets/images/branding-wwe-legacy-logo.png')),[1024,1024]);
});

test('v1.0 launch line wires the launch icon into iOS, favicon and in-app chrome',()=>{
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const v=pkgVersion().replaceAll('.', '\\.');
  assert.match(html,new RegExp(`app-apple-touch-icon\\.png\\?v=${v}`));
  assert.match(html,new RegExp(`app-icon-192\\.png\\?v=${v}`));
  assert.match(html,new RegExp(`manifest\\.webmanifest\\?v=${v}`));
  assert.match(html,new RegExp(`class=\"gamebar-app-icon\"[^>]+app-icon-192\\.png\\?v=${v}`));
});
