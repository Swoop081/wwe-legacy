from pathlib import Path
import subprocess
p=Path('js/shared/v1.1.69-card-identity-pass.js'); s=p.read_text()
marker="const APPROVED_AUDIT_OVERRIDES = Object.freeze({\n"
assert marker in s
stamp='// ROMAN_EXCLUSIVE_FIVE_TIER_V11204'
entries="""  // ROMAN_EXCLUSIVE_FIVE_TIER_V11204 — Roman signature package; preserve card identity/effects.
  'roman-reigns-corner-clotheslines': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'roman-reigns-drive-by': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'roman-reigns-guillotine': {printingStats:{base:{cost:8,damage:0,submission:{pressure:3}},emerald:{cost:8,damage:0,submission:{pressure:4}},sapphire:{cost:7,damage:0,submission:{pressure:4}},ruby:{cost:7,damage:0,submission:{pressure:5}},amethyst:{cost:7,damage:0,submission:{pressure:6}}}},
  'roman-reigns-superman-punch': {printingStats:{base:{cost:8,damage:7},emerald:{cost:8,damage:8},sapphire:{cost:7,damage:9},ruby:{cost:7,damage:9},amethyst:{cost:7,damage:10}}},
  'roman-reigns-spear': {requirements:{},method:null,printingStats:{base:{cost:11,damage:12},emerald:{cost:11,damage:13},sapphire:{cost:10,damage:14},ruby:{cost:10,damage:15},amethyst:{cost:10,damage:16}}},
"""
if stamp not in s: s=s.replace(marker,marker+entries,1); p.write_text(s)
js="""import {allGameplayCards} from './js/data/content.js'; import {gameplayStatsForPrinting} from './js/data/reward-printings.js'; const ids=['roman-reigns-corner-clotheslines','roman-reigns-drive-by','roman-reigns-guillotine','roman-reigns-superman-punch','roman-reigns-spear']; const by=new Map(allGameplayCards.map(c=>[c.id,c])); const tiers=['base','emerald','sapphire','ruby','amethyst']; for(const id of ids){const c=by.get(id); if(!c)throw Error('missing '+id); for(const t of tiers){if(!c.printingStats?.[t])throw Error(id+' '+t); const live=gameplayStatsForPrinting(c,t); if(live.cost!==c.printingStats[t].cost||live.damage!==c.printingStats[t].damage)throw Error(id+' runtime '+t);} } const g=by.get('roman-reigns-guillotine'); for(const t of tiers){const live=gameplayStatsForPrinting(g,t); if(live.damage!==0||live.submission?.pressure!==g.printingStats[t].submission.pressure)throw Error('guillotine runtime '+t);} const spear=by.get('roman-reigns-spear'); if(Object.keys(spear.requirements||{}).length||spear.method!==null||!spear.finisher)throw Error('illegal Spear finisher method'); console.log('ROMAN EXCLUSIVE PASS',ids.length,'Guillotine submission PASS','Spear finisher PASS');"""
subprocess.run(['node','--input-type=module','-e',js],check=True)
