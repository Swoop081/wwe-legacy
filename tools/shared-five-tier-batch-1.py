from pathlib import Path
import subprocess
p=Path('js/shared/v1.1.69-card-identity-pass.js'); s=p.read_text()
marker="const APPROVED_AUDIT_OVERRIDES = Object.freeze({\n"
assert marker in s
stamp='// SHARED_FIVE_TIER_BATCH_1_V11221'
entries="""  // SHARED_FIVE_TIER_BATCH_1_V11221 — universal five-tier authored curves; preserve each card's existing requirements/effects.
  'suplex': {cost:3,damage:4,printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:3},ruby:{cost:3,damage:4},amethyst:{cost:3,damage:4}}},
  'vertical-suplex': {cost:4,damage:6,printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:5},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:6}}},
  'knee-drop': {cost:3,damage:5,printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:5}}},
  'russian-leg-sweep': {cost:3,damage:4,printingStats:{base:{cost:4,damage:2},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:3},ruby:{cost:3,damage:4},amethyst:{cost:3,damage:4}}},
  'diving-crossbody': {cost:4,damage:6,printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:5},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:6}}},
  'snap-powerslam': {cost:4,damage:7,printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'bulldog': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'gourdbuster': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'suicide-dive': {cost:5,damage:7,printingStats:{base:{cost:6,damage:4},emerald:{cost:6,damage:5},sapphire:{cost:5,damage:6},ruby:{cost:5,damage:6},amethyst:{cost:5,damage:7}}},
  'pescado': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'top-rope-bulldog': {cost:6,damage:9,printingStats:{base:{cost:7,damage:6},emerald:{cost:7,damage:7},sapphire:{cost:6,damage:8},ruby:{cost:6,damage:8},amethyst:{cost:6,damage:9}}},
  'alabama-slam': {cost:6,damage:10,printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'rear-naked-choke': {cost:6,damage:0,printingStats:{base:{cost:7,damage:0,submission:{bodyPart:'head',pressure:2}},emerald:{cost:7,damage:0,submission:{bodyPart:'head',pressure:3}},sapphire:{cost:6,damage:0,submission:{bodyPart:'head',pressure:3}},ruby:{cost:6,damage:0,submission:{bodyPart:'head',pressure:4}},amethyst:{cost:6,damage:0,submission:{bodyPart:'head',pressure:5}}}},
"""
if stamp not in s:
    old_start=s.find("  // SHARED_FIVE_TIER_BATCH_1_V11202")
    old_end=s.find("  // SHARED_FIVE_TIER_BATCH_2", old_start)
    if old_start>=0 and old_end>old_start: s=s[:old_start]+entries+s[old_end:]
    elif old_start>=0: raise RuntimeError('Batch 1 end marker not found')
    else: s=s.replace(marker,marker+entries,1)
    p.write_text(s)
check="""import {allGameplayCards} from './js/data/content.js'; import {gameplayStatsForPrinting} from './js/data/reward-printings.js'; const ids=['suplex','vertical-suplex','knee-drop','russian-leg-sweep','diving-crossbody','snap-powerslam','bulldog','gourdbuster','suicide-dive','pescado','top-rope-bulldog','alabama-slam','rear-naked-choke']; const by=new Map(allGameplayCards.map(c=>[c.id,c])); const tiers=['base','emerald','sapphire','ruby','amethyst']; for(const id of ids){const c=by.get(id); if(!c)throw Error('missing '+id); for(const t of tiers){if(!c.printingStats?.[t])throw Error(id+' '+t); const live=gameplayStatsForPrinting(c,t); if(live.cost!==c.printingStats[t].cost||live.damage!==c.printingStats[t].damage)throw Error(id+' runtime '+t); if(c.printingStats[t].submission?.pressure!=null&&live.submission?.pressure!==c.printingStats[t].submission.pressure)throw Error(id+' pressure '+t);}} console.log('SHARED BATCH 1 PASS',ids.length);"""
subprocess.run(['node','--input-type=module','-e',check],check=True)
