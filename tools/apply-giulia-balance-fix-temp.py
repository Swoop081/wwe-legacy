from pathlib import Path
import re
p=Path('js/data/decks.js')
s=p.read_text()
m=re.search(r'(\"giulia\"\s*:\s*\[)(.*?)(\n\s*\])',s,re.S)
if not m: raise SystemExit('Giulia deck block not found')
body=m.group(2)
pattern=re.compile(r'\"momentum-(strength|strike|technical|agility)\"')
matches=list(pattern.finditer(body))
if len(matches)!=12: raise SystemExit(f'Expected 12 Giulia Momentum cards, found {len(matches)}')
target=['technical']*6+['strike']*4+['agility','strength']
out=[]; last=0
for hit,method in zip(matches,target):
    out.append(body[last:hit.start()]); out.append(f'\"momentum-{method}\"'); last=hit.end()
out.append(body[last:])
newbody=''.join(out)
s=s[:m.start(2)]+newbody+s[m.end(2):]
p.write_text(s)
