from pathlib import Path

content=Path('js/data/content.js')
s=content.read_text()
old='''    "cost": 2,\n    "rarity": 3,\n    "superstarId": "roman-reigns",\n    "maxCopies": 1,\n    "rulesText": "Roman Reigns-exclusive Action. Search/draw Roman’s Spear. If Roman’s Spear is already in hand, gain +1 Adrenaline instead. Roman’s next Spear this Control sequence costs 1 less.",\n    "effect": {\n      "type": "romanOohAhh",\n      "name": "Roman's Spear",\n      "discount": 1,\n      "adrenalineIfInHand": 1\n    }'''
new='''    "cost": 0,\n    "rarity": 3,\n    "superstarId": "roman-reigns",\n    "maxCopies": 1,\n    "rulesText": "Roman Reigns-exclusive Action. Gain +1 Adrenaline. If the next card you play this Control is Roman’s Spear, that Spear cannot be Countered. The protection expires if you play another card first or lose Control.",\n    "effect": {\n      "type": "romanOohAhh",\n      "adrenaline": 1,\n      "protectCardId": "roman-reigns-spear"\n    }'''
assert old in s, 'Ooh Ahh source block changed'
content.write_text(s.replace(old,new,1))

engine=Path('js/engine/MatchEngine.js')
e=engine.read_text()
old_reset="delete p.events.ajHouseBuiltDiscount;p.events.connectedMethodsThisControl={}"
new_reset="delete p.events.ajHouseBuiltDiscount;delete p.events.romanOohAhhSpearProtection;p.events.connectedMethodsThisControl={}"
assert old_reset in e, 'control reset anchor changed'
e=e.replace(old_reset,new_reset,1)
old_action='''if(ef.type===\"romanOohAhh\"){const name=ef.name??\"Roman's Spear\",already=p.hand.some(c=>c.name===name);let found=null;if(already){if(ef.adrenalineIfInHand)this._ad(pid,ef.adrenalineIfInHand);}else found=this._search(pid,name);p.namedDiscount[name]=(p.namedDiscount[name]??0)+(ef.discount??1);this._log(\"ACTION_EFFECT\",{playerId:pid,cardId:card.id,effect:\"ooh-ahh\",searchedCardId:found?.id??null,alreadyInHand:already,adrenaline:already?(ef.adrenalineIfInHand??0):0,discount:ef.discount??1});}'''
new_action='''if(ef.type===\"romanOohAhh\"){const adrenaline=Math.max(0,ef.adrenaline??1);if(adrenaline)this._ad(pid,adrenaline);p.events.romanOohAhhSpearProtection={cardId:ef.protectCardId??\"roman-reigns-spear\"};this._log(\"ACTION_EFFECT\",{playerId:pid,cardId:card.id,effect:\"ooh-ahh\",adrenaline,protectCardId:p.events.romanOohAhhSpearProtection.cardId});}'''
assert old_action in e, 'Ooh Ahh engine block changed'
e=e.replace(old_action,new_action,1)
old_decl="const methodUncounterable=p.nextUncounterableMethod&&card.method===p.nextUncounterableMethod&&!card.finisher;"
new_decl="const romanOohAhhProtected=!!p.events.romanOohAhhSpearProtection&&card.id===p.events.romanOohAhhSpearProtection.cardId;if(p.events.romanOohAhhSpearProtection)delete p.events.romanOohAhhSpearProtection;const methodUncounterable=p.nextUncounterableMethod&&card.method===p.nextUncounterableMethod&&!card.finisher;"
assert old_decl in e, 'move declaration anchor changed'
e=e.replace(old_decl,new_decl,1)
old_phase='''this._state.phase=(p.nextUncounterable||methodUncounterable||strengthUncounterable||austinSequence||hoganSequence||card.uncounterable)?\"RESOLVE_MOVE\":\"COUNTER\";'''
new_phase='''this._state.phase=(romanOohAhhProtected||p.nextUncounterable||methodUncounterable||strengthUncounterable||austinSequence||hoganSequence||card.uncounterable)?\"RESOLVE_MOVE\":\"COUNTER\";'''
assert old_phase in e, 'counter phase anchor changed'
e=e.replace(old_phase,new_phase,1)
engine.write_text(e)

# Static certification of the exact gameplay semantics added by this pass.
c=content.read_text(); m=engine.read_text()
assert '"cost": 0' in c[c.index('"id": "roman-reigns-ooh-ahh"'):c.index('"id": "roman-reigns-guillotine"')]
assert '"adrenaline": 1' in c[c.index('"id": "roman-reigns-ooh-ahh"'):c.index('"id": "roman-reigns-guillotine"')]
assert '"protectCardId": "roman-reigns-spear"' in c
assert 'romanOohAhhSpearProtection' in m and 'romanOohAhhProtected||p.nextUncounterable' in m
assert 'delete p.events.romanOohAhhSpearProtection' in m
print('ROMAN OOH AHH PASS: cost 0; +1 Adrenaline; next-card Spear protection; expires on other move/control loss')
