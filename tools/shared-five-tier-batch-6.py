from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_15_V11217' not in s
curves={
'kevin-owens-swanton-bomb':[(8,9),(8,10),(7,11),(7,11),(7,12)],
'gunther-folding-powerbomb':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'sol-ruca-avalanche-x-factor':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'chelsea-green-rough-ryder':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'austin-theory-ataxia':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'austin-theory-rolling-thunder-blockbuster':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'austin-theory-patella-brainbuster':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'montez-ford-blockbuster':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'lola-vice-running-hip-attack':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'dragon-lee-operation-dragon':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'dragon-lee-incinerator':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'dragon-lee-double-foot-stomp':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'vikingo-mexican-destroyer':[(8,9),(8,10),(7,11),(7,11),(7,12)],
'vikingo-top-rope-poison-rana':[(8,9),(8,10),(7,11),(7,11),(7,12)],
'mr-iguana-iguanarana':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'mr-iguana-pongase-verde':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'chris-jericho-lionsault':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'chris-jericho-breakdown':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'john-cena-five-knuckle-shuffle':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'blake-monroe-glamour-ddt':[(7,7),(7,8),(6,9),(6,9),(6,10)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_15_V11217 — wrestler-specific ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 15 PASS',len(curves))
