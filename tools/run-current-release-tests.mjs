import { spawnSync } from "node:child_process";
import fs from "node:fs";
const manifest=JSON.parse(fs.readFileSync(new URL("../test/current-release-manifest.json",import.meta.url),"utf8"));
const result=spawnSync(process.execPath,["--test",...manifest.currentTests],{stdio:"inherit"});
process.exit(result.status??1);
