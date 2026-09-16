from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_6_V11208' not in s
curves={
'forearm-smash':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'diving-body-press':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'flying-clothesline':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'northern-lights-suplex':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'double-leg-takedown':[(4,2),(4,3),(3,4),(3,4),(3,5)],
'overhead-belly-to-belly-suplex':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'butterfly-suplex':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'asai-moonsault':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'drop-toe-hold':[(3,2),(3,3),(2,4),(2,4),(2,5)],
'low-blow':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'front-dropkick':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'schoolboy-roll-up':[(4,2),(4,3),(3,4),(3,4),(3,5)],
'elbow-smash':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'high-knee':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'meteora':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'double-stomp':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'double-underhook-backbreaker':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'sunset-flip-powerbomb':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'swinging-neckbreaker':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'standing-shooting-star-press':[(7,7),(7,8),(6,9),(6,9),(6,10)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_6_V11208 — post-Batch-5 ordinary offensive pool; reversals and submissions excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 6 PASS',len(curves))
