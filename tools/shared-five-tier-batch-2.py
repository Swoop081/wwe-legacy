from pathlib import Path
import subprocess
p=Path('js/shared/v1.1.69-card-identity-pass.js'); s=p.read_text()
marker="const APPROVED_AUDIT_OVERRIDES = Object.freeze({\n"
assert marker in s
stamp='// SHARED_FIVE_TIER_BATCH_2_V11203'
entries="""  // SHARED_FIVE_TIER_BATCH_2_V11203 — Roman-heavy shared pool; authored by move impact, not formula.
  'shoulder-tackle': {cost:2,damage:4,printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:3},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:4}}},
  'throat-thrust': {cost:2,damage:4,printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:3},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:4}}},
  'headbutt': {cost:3,damage:5,printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:5}}},
  'big-boot': {cost:4,damage:6,printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:5},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:6}}},
  'leaping-clothesline': {cost:4,damage:7,printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'samoan-drop': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'uranage': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'spinebuster': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'exploder-suplex': {cost:5,damage:7,printingStats:{base:{cost:6,damage:4},emerald:{cost:6,damage:5},sapphire:{cost:5,damage:6},ruby:{cost:5,damage:6},amethyst:{cost:5,damage:7}}},
  'tilt-a-whirl-slam': {cost:5,damage:8,printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'powerbomb': {cost:6,damage:10,printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
"""
if stamp not in s: s=s.replace(marker,marker+entries,1); p.write_text(s)
ids=['shoulder-tackle','throat-thrust','headbutt','big-boot','leaping-clothesline','samoan-drop','uranage','spinebuster','exploder-suplex','tilt-a-whirl-slam','powerbomb']
js=f"""import {{allGameplayCards}} from './js/data/content.js'; import {{gameplayStatsForPrinting}} from './js/data/reward-printings.js'; const ids={ids!r}; const by=new Map(allGameplayCards.map(c=>[c.id,c])); const tiers=['base','emerald','sapphire','ruby','amethyst']; for(const id of ids){{const c=by.get(id); if(!c)throw Error('missing '+id); for(const t of tiers){{if(!c.printingStats?.[t])throw Error(id+' '+t); const live=gameplayStatsForPrinting(c,t); if(live.cost!==c.printingStats[t].cost||live.damage!==c.printingStats[t].damage)throw Error(id+' runtime '+t);}}}} console.log('SHARED BATCH 2 PASS',ids.length);""".replace("'",'"')
subprocess.run(['node','--input-type=module','-e',js],check=True)
