from pathlib import Path
import re, subprocess

# Wire authored Becky/shared cards into canonical content.
p=Path('js/data/content.js'); s=p.read_text()
imp='import { BECKY_LYNCH_V11200_CARDS } from "./becky-lynch-v1.1.200.js?v=1.1.200";\n'
anchor='import { AJ_STYLES_GAMEPLAY_CARDS } from "./aj-styles-v1.1.80.js?v=1.1.132";\n'
if imp not in s:
    assert anchor in s
    s=s.replace(anchor,anchor+imp,1)
marker='allGameplayCards.push(...AJ_STYLES_GAMEPLAY_CARDS);'
add='allGameplayCards.push(...BECKY_LYNCH_V11200_CARDS);'
assert marker in s
if add not in s: s=s.replace(marker,marker+'\n'+add,1)
p.write_text(s)

# 58 authored cards + Superstar + Entrance = 60.
p=Path('js/data/decks.js'); s=p.read_text()
m=re.search(r'  "becky-lynch": \[\n(.*?)\n  \],\n  "logan-paul":',s,re.S)
assert m
deck=[
'momentum-strike','momentum-technical','momentum-strength','punch','arm-drag',
'momentum-strike','momentum-strike','momentum-strike','momentum-strike',
'momentum-technical','momentum-technical','momentum-technical','momentum-technical',
'becky-lynch-manhandle-slam','becky-lynch-manhandle-slam','becky-lynch-dis-arm-her','becky-lynch-dis-arm-her',
'becky-lynch-bex-plex','becky-lynch-bex-plex','becky-lynch-diving-leg-drop','becky-lynch-diving-leg-drop',
'becky-lynch-flying-fire-arm','becky-lynch-flying-fire-arm','punch',
'armbar','armbar','missile-dropkick','missile-dropkick','inverted-ddt','inverted-ddt','leg-lariat','leg-lariat',
'calf-kick','calf-kick','hammerlock','hammerlock','european-uppercut','european-uppercut','snap-suplex','snap-suplex',
'german-suplex','german-suplex','superplex','dropkick','arm-drag','snap-suplex','european-uppercut',
'special-becky-lynch','duck','sidestep','shoulder-up','once-too-often','standing-switch','up-and-over',
'dodge','knees-up','catch-the-foot','grab-the-ropes']
assert len(deck)==58
assert deck[:5]==['momentum-strike','momentum-technical','momentum-strength','punch','arm-drag']
assert deck.count('momentum-strike')==5 and deck.count('momentum-technical')==5 and deck.count('momentum-strength')==1
assert deck.count('once-too-often')==1 and deck.count('punch')==2
assert not set(['chain-wrestling','game-plan','fire-up','jawbreaker','rollover-counter']) & set(deck)
body='\n'.join('    "'+x+'"'+(',' if i<57 else '') for i,x in enumerate(deck))
s=s[:m.start(1)]+body+s[m.end(1):]
p.write_text(s)

# Approved Dis-arm-her identity and five-tier Submission pressure.
p=Path('js/shared/v1.1.69-card-identity-pass.js'); s=p.read_text()
pat=r"  'becky-lynch-dis-arm-her': \{.*?\n  \},\n  'chelsea-green-im-prettier':"
replacement="""  'becky-lynch-dis-arm-her': {
    name:'Dis-arm-her', cost:9, damage:0, requirements:{}, method:null, moveType:'submission',
    submission:{bodyPart:'arms',pressure:6}, finisher:true, trademark:false,
    rulesText:'Becky Lynch-exclusive Finisher Submission. No Method requirement.',
    printingStats:{
      base:{cost:10,damage:0,submission:{bodyPart:'arms',pressure:3}},
      emerald:{cost:10,damage:0,submission:{bodyPart:'arms',pressure:4}},
      sapphire:{cost:9,damage:0,submission:{bodyPart:'arms',pressure:4}},
      ruby:{cost:9,damage:0,submission:{bodyPart:'arms',pressure:5}},
      amethyst:{cost:9,damage:0,submission:{bodyPart:'arms',pressure:6}}
    }
  },
  'chelsea-green-im-prettier':"""
s,n=re.subn(pat,replacement,s,count=1,flags=re.S)
assert n==1
p.write_text(s)

# Runtime/module certification after patching.
check=r'''import { deckIds } from './js/data/decks.js';
import { allGameplayCards } from './js/data/content.js';
const d=deckIds['becky-lynch']; const byId=new Map(allGameplayCards.map(c=>[c.id,c]));
const missing=[...new Set(d.filter(id=>!byId.has(id)))];
if(d.length!==58||missing.length) throw new Error(`deck=${d.length} missing=${missing}`);
const b=byId.get('becky-lynch-bex-plex'); if(b?.requirements?.strength!==1||b?.requirements?.technical!==1) throw new Error('Bex-Plex');
const x=byId.get('becky-lynch-dis-arm-her'); if(!x?.finisher||x.trademark||x.method!==null||Object.keys(x.requirements||{}).length) throw new Error('Dis-arm-her');
for(const t of ['base','emerald','sapphire','ruby','amethyst']) if(x.printingStats?.[t]?.damage!==0) throw new Error('submission damage');
for(const id of ['dodge','knees-up','catch-the-foot','grab-the-ropes']) if(!byId.get(id)?.defensiveOnly) throw new Error(id);
console.log('BECKY FINAL LOCK PASS',d.length,'missing',missing.length);'''
subprocess.run(['node','--input-type=module','-e',check],check=True)
