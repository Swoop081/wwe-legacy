from pathlib import Path
p=Path('js/ai/WrestlingAI.js')
s=p.read_text()
old='''const nonFinisher=legalNormal.filter(x=>!x.finisher),pool=nonFinisher.length?nonFinisher:legalNormal;
     // Purpose-built defensive counters are expendable answers. Preserve offensive Moves whenever one is legal.
     const defensivePool=pool.filter(x=>x.defensiveOnly),choicePool=defensivePool.length?defensivePool:pool;
     const chosen=[...choicePool].sort((a,b)=>cpuDiscardPreservationScore(a)-cpuDiscardPreservationScore(b))[0];'''
new='''// Prefer any purpose-built defensive counter before considering offensive Moves.
     // Only after that preserve Finishers where another legal answer exists.
     const defensivePool=legalNormal.filter(x=>x.defensiveOnly);
     const basePool=defensivePool.length?defensivePool:legalNormal;
     const nonFinisher=basePool.filter(x=>!x.finisher),choicePool=nonFinisher.length?nonFinisher:basePool;
     const chosen=[...choicePool].sort((a,b)=>cpuDiscardPreservationScore(a)-cpuDiscardPreservationScore(b))[0];'''
if old not in s: raise SystemExit('current counter target not found')
s=s.replace(old,new,1)
old='''const safe=indexed.filter(x=>!protectedCard(x.card)),candidates=safe.length?safe:indexed;
 candidates.sort((a,b)=>cpuDiscardPreservationScore(a.card)-cpuDiscardPreservationScore(b.card)||a.index-b.index);
 return{type:'maintain',index:candidates[0].index};'''
new='''const safe=indexed.filter(x=>!protectedCard(x.card));
 // If every remaining page is a protected match-winning/reactive card, release
 // the hold rather than sacrifice a Finisher, Trademark, Special or pin escape.
 if(!safe.length)return{type:'release'};
 safe.sort((a,b)=>cpuDiscardPreservationScore(a.card)-cpuDiscardPreservationScore(b.card)||a.index-b.index);
 return{type:'maintain',index:safe[0].index};'''
if old not in s: raise SystemExit('current submission target not found')
s=s.replace(old,new,1)
p.write_text(s)
