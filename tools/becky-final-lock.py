from pathlib import Path
import re, subprocess

# Wire authored Becky/shared cards into canonical content.
p=Path('js/data/content.js'); s=p.read_text()
imp='import { BECKY_LYNCH_V11200_CARDS } from "./becky-lynch-v1.1.200.js?v=1.1.200";\n'
anchor='import { AJ_STYLES_GAMEPLAY_CARDS } from "./aj-styles-v1.1.80.js?v=1.1.132";\n'
if imp not in s:
    assert anchor in s; s=s.replace(anchor,anchor+imp,1)
marker='allGameplayCards.push(...AJ_STYLES_GAMEPLAY_CARDS);'; add='allGameplayCards.push(...BECKY_LYNCH_V11200_CARDS);'
assert marker in s
if add not in s: s=s.replace(marker,marker+'\n'+add,1)
p.write_text(s)

# 58 authored cards + Superstar + Entrance = 60.
p=Path('js/data/decks.js'); s=p.read_text()
m=re.search(r'  "becky-lynch": \[\n(.*?)\n  \],\n  "logan-paul":',s,re.S); assert m
deck=['momentum-strike','momentum-technical','momentum-strength','punch','arm-drag','momentum-strike','momentum-strike','momentum-strike','momentum-strike','momentum-technical','momentum-technical','momentum-technical','momentum-technical','becky-lynch-manhandle-slam','becky-lynch-manhandle-slam','becky-lynch-dis-arm-her','becky-lynch-dis-arm-her','becky-lynch-bex-plex','becky-lynch-bex-plex','becky-lynch-diving-leg-drop','becky-lynch-diving-leg-drop','becky-lynch-flying-fire-arm','becky-lynch-flying-fire-arm','punch','armbar','armbar','missile-dropkick','missile-dropkick','inverted-ddt','inverted-ddt','leg-lariat','leg-lariat','calf-kick','calf-kick','hammerlock','hammerlock','european-uppercut','european-uppercut','snap-suplex','snap-suplex','german-suplex','german-suplex','superplex','dropkick','arm-drag','snap-suplex','european-uppercut','special-becky-lynch','duck','sidestep','shoulder-up','once-too-often','standing-switch','up-and-over','dodge','knees-up','catch-the-foot','grab-the-ropes']
assert len(deck)==58 and deck[:5]==['momentum-strike','momentum-technical','momentum-strength','punch','arm-drag']
assert deck.count('momentum-strike')==5 and deck.count('momentum-technical')==5 and deck.count('momentum-strength')==1
assert deck.count('once-too-often')==1 and deck.count('punch')==2
assert not set(['chain-wrestling','game-plan','fire-up','jawbreaker','rollover-counter']) & set(deck)
body='\n'.join('    "'+x+'"'+(',' if i<57 else '') for i,x in enumerate(deck)); s=s[:m.start(1)]+body+s[m.end(1):]; p.write_text(s)

# Becky/shared move curves. These are global by ID, so every future deck reusing one inherits the same curve.
p=Path('js/shared/v1.1.69-card-identity-pass.js'); s=p.read_text()
marker="const APPROVED_AUDIT_OVERRIDES = Object.freeze({\n"
assert marker in s
if "// BECKY_FULL_FIVE_TIER_V11201" not in s:
    entries="""  // BECKY_FULL_FIVE_TIER_V11201 — shared IDs intentionally global.
  'punch': {cost:1,damage:3,printingStats:{base:{cost:2,damage:2},emerald:{cost:2,damage:2},sapphire:{cost:1,damage:2},ruby:{cost:1,damage:3},amethyst:{cost:1,damage:3}}},
  'arm-drag': {cost:3,damage:4,printingStats:{base:{cost:4,damage:2},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:3},ruby:{cost:3,damage:4},amethyst:{cost:3,damage:4}}},
  'missile-dropkick': {cost:6,damage:9,printingStats:{base:{cost:7,damage:6},emerald:{cost:7,damage:7},sapphire:{cost:6,damage:7},ruby:{cost:6,damage:8},amethyst:{cost:6,damage:9}}},
  'inverted-ddt': {cost:5,damage:7,printingStats:{base:{cost:6,damage:4},emerald:{cost:6,damage:5},sapphire:{cost:5,damage:5},ruby:{cost:5,damage:6},amethyst:{cost:5,damage:7}}},
  'leg-lariat': {cost:4,damage:7,printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:5},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'calf-kick': {cost:3,damage:5,printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:5}}},
  'hammerlock': {cost:3,damage:4,printingStats:{base:{cost:4,damage:2},emerald:{cost:4,damage:3},sapphire:{cost:3,damage:3},ruby:{cost:3,damage:3},amethyst:{cost:3,damage:4}}},
  'european-uppercut': {cost:2,damage:3,printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:2},sapphire:{cost:2,damage:2},ruby:{cost:2,damage:3},amethyst:{cost:2,damage:3}}},
  'snap-suplex': {cost:3,damage:5,printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:4},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:5}}},
  'german-suplex': {cost:5,damage:7,printingStats:{base:{cost:6,damage:4},emerald:{cost:6,damage:5},sapphire:{cost:5,damage:5},ruby:{cost:5,damage:6},amethyst:{cost:5,damage:7}}},
  'superplex': {cost:7,damage:11,printingStats:{base:{cost:8,damage:7},emerald:{cost:8,damage:8},sapphire:{cost:7,damage:9},ruby:{cost:7,damage:10},amethyst:{cost:7,damage:11}}},
  'dropkick': {cost:2,damage:3,printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:2},sapphire:{cost:2,damage:2},ruby:{cost:2,damage:3},amethyst:{cost:2,damage:3}}},
"""
    s=s.replace(marker,marker+entries,1)

# Approved Dis-arm-her identity and five-tier Submission pressure.
pat=r"  'becky-lynch-dis-arm-her': \{.*?\n  \},\n  'chelsea-green-im-prettier':"
replacement="""  'becky-lynch-dis-arm-her': {
    name:'Dis-arm-her', cost:9, damage:0, requirements:{}, method:null, moveType:'submission',
    submission:{bodyPart:'arms',pressure:6}, finisher:true, trademark:false,
    rulesText:'Becky Lynch-exclusive Finisher Submission. No Method requirement.',
    printingStats:{base:{cost:10,damage:0,submission:{bodyPart:'arms',pressure:3}},emerald:{cost:10,damage:0,submission:{bodyPart:'arms',pressure:4}},sapphire:{cost:9,damage:0,submission:{bodyPart:'arms',pressure:4}},ruby:{cost:9,damage:0,submission:{bodyPart:'arms',pressure:5}},amethyst:{cost:9,damage:0,submission:{bodyPart:'arms',pressure:6}}}
  },
  'chelsea-green-im-prettier':"""
s,n=re.subn(pat,replacement,s,count=1,flags=re.S); assert n==1; p.write_text(s)

# Runtime printing helper must carry nested submission data, not only cost/damage.
p=Path('js/data/reward-printings.js'); r=p.read_text()
old="""    ...(Number.isFinite(curve.damage) ? { damage: curve.damage } : {}),
    ...(Number.isFinite(curve.cost) ? { cost: curve.cost } : {}),
  };"""
new="""    ...(Number.isFinite(curve.damage) ? { damage: curve.damage } : {}),
    ...(Number.isFinite(curve.cost) ? { cost: curve.cost } : {}),
    ...(curve.submission ? { submission: { ...(card.submission ?? {}), ...curve.submission } } : {}),
  };"""
if old in r: r=r.replace(old,new,1)
else: assert 'curve.submission' in r
p.write_text(r)

# Full Becky Move certification: every offensive/submission Move has all five tiers and runtime values match them.
check=r'''import { deckIds } from './js/data/decks.js'; import { allGameplayCards } from './js/data/content.js'; import { gameplayStatsForPrinting } from './js/data/reward-printings.js';
const tiers=['base','emerald','sapphire','ruby','amethyst']; const d=deckIds['becky-lynch']; const byId=new Map(allGameplayCards.map(c=>[c.id,c]));
const missing=[...new Set(d.filter(id=>!byId.has(id)))]; if(d.length!==58||missing.length) throw new Error(`deck=${d.length} missing=${missing}`);
const moveIds=[...new Set(d.filter(id=>byId.get(id)?.kind==='move'))];
const exempt=new Set(['duck','sidestep','standing-switch','up-and-over']);
for(const id of moveIds){ const c=byId.get(id); if(exempt.has(id)) continue; for(const t of tiers){ if(!c.printingStats?.[t]) throw new Error(`${id} missing ${t}`); const live=gameplayStatsForPrinting(c,t); if(Number.isFinite(c.printingStats[t].damage)&&live.damage!==c.printingStats[t].damage) throw new Error(`${id} ${t} damage runtime`); if(Number.isFinite(c.printingStats[t].cost)&&live.cost!==c.printingStats[t].cost) throw new Error(`${id} ${t} cost runtime`); if(c.printingStats[t].submission?.pressure!=null && live.submission?.pressure!==c.printingStats[t].submission.pressure) throw new Error(`${id} ${t} submission runtime`); }}
const b=byId.get('becky-lynch-bex-plex'); if(b?.requirements?.strength!==1||b?.requirements?.technical!==1) throw new Error('Bex-Plex');
const x=byId.get('becky-lynch-dis-arm-her'); if(!x?.finisher||x.trademark||x.method!==null||Object.keys(x.requirements||{}).length) throw new Error('Dis-arm-her');
console.log('BECKY FIVE-TIER PASS',moveIds.length,'unique move IDs; exempt defensive reversals', [...exempt].filter(id=>moveIds.includes(id)).length);'''
subprocess.run(['node','--input-type=module','-e',check],check=True)
