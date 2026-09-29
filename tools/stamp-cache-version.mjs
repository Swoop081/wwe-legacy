import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const pkgPath=path.join(root,"package.json");
const pkg=JSON.parse(fs.readFileSync(pkgPath,"utf8"));
const version=pkg.version;
const versionPattern=/\d+\.\d+\.\d+/g;

const files=[
  "build.json",
  "js/config/build.js",
  "js/runtime/current.js",
  "js/ui/app.js",
  "index.html"
];

function replaceVersion(text){
  return text.replace(versionPattern,version);
}

let changed=0;
for(const rel of files){
  const full=path.join(root,rel);
  const before=fs.readFileSync(full,"utf8");
  let after=before;

  if(rel==="build.json"){
    const manifest=JSON.parse(before);
    manifest.version=version;
    after=JSON.stringify(manifest,null,2)+"\n";
  }else if(rel==="js/config/build.js"){
    after=before.replace(/(BUILD_VERSION\s*=\s*["'])\d+\.\d+\.\d+(["'])/, `$1${version}$2`);
  }else if(rel==="js/runtime/current.js"){
    after=before.replace(/(const VERSION\s*=\s*["'])\d+\.\d+\.\d+(["'])/, `$1${version}$2`);
  }else if(rel==="js/ui/app.js"){
    after=before.replace(/([?&]v=)\d+\.\d+\.\d+/g,`$1${version}`);
  }else if(rel==="index.html"){
    after=before
      .replace(/([?&]v=)\d+\.\d+\.\d+/g,`$1${version}`)
      .replace(/(__WWE_LEGACY_BOOT_VERSION__\s*=\s*["'])\d+\.\d+\.\d+(["'])/, `$1${version}$2`)
      .replace(/(wanted===["'])\d+\.\d+\.\d+(["'])/, `$1${version}$2`)
      .replace(/(Version:\s*)\d+\.\d+\.\d+/, `$1${version}`);
  }
  if(after!==before){fs.writeFileSync(full,after);changed++;}
}

console.log(JSON.stringify({version,changedFiles:changed,files},null,2));
