from pathlib import Path
p=Path('js/ai/WrestlingAI.js')
s=p.read_text()
old='''      const nonFinisher=legalNormal.filter(x=>!x.finisher),pool=nonFinisher.length?nonFinisher:legalNormal;
      const chosen=[...pool].sort((a,b)=>{
        // Counter with purpose-built defensive pages first and preserve offensive
        // damage, Trademarks, Finishers and Specials for the player's own turn.
        const av=cpuDiscardPreservationScore(a)+(a.defensiveOnly?-60:Math.min(45,(a.damage??0)*3));
        const bv=cpuDiscardPreservationScore(b)+(b.defensiveOnly?-60:Math.min(45,(b.damage??0)*3));
        return av-bv;
      })[0];'''
new='''      const nonFinisher=legalNormal.filter(x=>!x.finisher),pool=nonFinisher.length?nonFinisher:legalNormal;
      // Purpose-built defensive counters are expendable answers. Preserve offensive
      // Moves for the player's own Control sequence whenever a defensive answer exists.
      const defensivePool=pool.filter(x=>x.defensiveOnly),choicePool=defensivePool.length?defensivePool:pool;
      const chosen=[...choicePool].sort((a,b)=>cpuDiscardPreservationScore(a)-cpuDiscardPreservationScore(b))[0];'''
if old not in s: raise SystemExit('counter selection target not found')
s=s.replace(old,new,1)
old=""" let index=0,best=Infinity;for(let i=0;i<p.hand.length;i++){const v=cpuDiscardPreservationScore(p.hand[i]);if(v<best){best=v;index=i;}}
 return{type:'maintain',index};"""
new=""" // Maintaining a Submission should consume expendable pages first. Protected
 // match-winning/reactive cards are only ditched when the hand contains nothing else.
 const protectedCard=c=>!!(c?.finisher||c?.trademark||c?.special||c?.pinEscape||c?.special?.type==='pinEscape'||c?.effect?.type==='onceTooOften');
 const indexed=p.hand.map((card,index)=>({card,index}));
 const safe=indexed.filter(x=>!protectedCard(x.card)),candidates=safe.length?safe:indexed;
 candidates.sort((a,b)=>cpuDiscardPreservationScore(a.card)-cpuDiscardPreservationScore(b.card)||a.index-b.index);
 return{type:'maintain',index:candidates[0].index};"""
if old not in s: raise SystemExit('submission target not found')
s=s.replace(old,new,1)
old=""" if(card.superstarId)return 32+(!legal.length?10:0)+(p.hand.length<=4?5:0);
 return -Infinity;"""
new=""" if(card.superstarId&&legal.length)return 32+(p.hand.length<=4?5:0);
 return -Infinity;"""
if old not in s: raise SystemExit('action fallback target not found')
s=s.replace(old,new,1)
p.write_text(s)
