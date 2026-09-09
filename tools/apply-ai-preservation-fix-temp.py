from pathlib import Path
import re
p=Path('js/ai/WrestlingAI.js')
s=p.read_text()
pattern=r'''(const nonFinisher=legalNormal\.filter\(x=>!x\.finisher\),pool=nonFinisher\.length\?nonFinisher:legalNormal;\s*)const chosen=\[\.\.\.pool\]\.sort\(\(a,b\)=>\{.*?const av=cpuDiscardPreservationScore\(a\).*?const bv=cpuDiscardPreservationScore\(b\).*?return av-bv;\s*\}\)\[0\];'''
replacement=r'''\1// Purpose-built defensive counters are expendable answers. Preserve offensive Moves whenever one is legal.\n     const defensivePool=pool.filter(x=>x.defensiveOnly),choicePool=defensivePool.length?defensivePool:pool;\n     const chosen=[...choicePool].sort((a,b)=>cpuDiscardPreservationScore(a)-cpuDiscardPreservationScore(b))[0];'''
s,n=re.subn(pattern,replacement,s,count=1,flags=re.S)
if n!=1: raise SystemExit(f'counter selection target count={n}')
pattern=r'''let index=0,best=Infinity;for\(let i=0;i<p\.hand\.length;i\+\+\)\{const v=cpuDiscardPreservationScore\(p\.hand\[i\]\);if\(v<best\)\{best=v;index=i;\}\}\s*return\{type:'maintain',index\};'''
replacement="""// Maintain a Submission by ditching expendable pages first. Protected match-winning/reactive cards are last resort only.\n const protectedCard=c=>!!(c?.finisher||c?.trademark||c?.special||c?.pinEscape||c?.special?.type==='pinEscape'||c?.effect?.type==='onceTooOften');\n const indexed=p.hand.map((card,index)=>({card,index}));\n const safe=indexed.filter(x=>!protectedCard(x.card)),candidates=safe.length?safe:indexed;\n candidates.sort((a,b)=>cpuDiscardPreservationScore(a.card)-cpuDiscardPreservationScore(b.card)||a.index-b.index);\n return{type:'maintain',index:candidates[0].index};"""
s,n=re.subn(pattern,replacement,s,count=1)
if n!=1: raise SystemExit(f'submission target count={n}')
old="if(card.superstarId)return 32+(!legal.length?10:0)+(p.hand.length<=4?5:0);"
new="if(card.superstarId&&legal.length)return 32+(p.hand.length<=4?5:0);"
if old not in s: raise SystemExit('action fallback target not found')
s=s.replace(old,new,1)
p.write_text(s)
