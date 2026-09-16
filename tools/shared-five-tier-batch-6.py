from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_7_V11209' not in s
curves={
'blockbuster':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'falcon-arrow':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'back-elbow':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'double-axe-handle':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'mounted-punches':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'elbow':[(3,2),(3,3),(2,4),(2,4),(2,5)],
'senton-splash':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'headlock-takeover':[(4,2),(4,3),(3,4),(3,4),(3,5)],
'monkey-flip':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'eye-rake':[(3,2),(3,3),(2,4),(2,4),(2,5)],
'hair-pull-takedown':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'back-rake':[(3,2),(3,3),(2,4),(2,4),(2,5)],
'forearm-club':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'club-to-the-back':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'running-body-avalanche':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'hammerlock-takedown':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'running-knee-lift':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'shoulder-breaker':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'front-powerslam':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'arm-wringer':[(4,2),(4,3),(3,4),(3,4),(3,5)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_7_V11209 — shared ordinary offensive Moves; reversals, submissions and 619 excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 7 PASS',len(curves))
