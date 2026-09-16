from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_12_V11214' not in s
curves={
'iyo-sky-bullet-train-attack':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'mankind-clothesline':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'mankind-cactus-elbow':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'mankind-double-arm-ddt':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'hogans-big-boot':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'middle-rope-stunner':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'springboard-clothesline':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'diving-elbow-drop':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'cm-punk-corner-running-knee':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'paige-superkick':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'paige-rope-hung-knee-strikes':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'seth-rollins-turnbuckle-sto':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'seth-rollins-springboard-knee':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'ripcord-knee':[(6,7),(6,8),(5,9),(5,9),(5,10)],
'seth-rollins-buckle-bomb':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'andre-the-giant-headbutt':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'stephanie-vaquer-dragon-screw':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'stephanie-vaquer-svb':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'stephanie-vaquer-devils-kiss':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'randy-savage-machos-double-axe-handle':[(7,7),(7,8),(6,9),(6,9),(6,10)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_12_V11214 — ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 12 PASS',len(curves))
