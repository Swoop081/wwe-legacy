from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_11_V11213' not in s
curves={
'mr-perfect-dropkick':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'mr-perfect-neck-snap':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'mr-perfect-knee-lift':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'triple-h-high-knee':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'triple-h-knee-facebuster':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'triple-h-spinebuster':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'fist-drop':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'chris-jericho-one-handed-bulldog':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'springboard-dropkick':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'single-leg-takedown':[(4,2),(4,3),(3,4),(3,4),(3,5)],
'kurt-angle-three-german-suplexes':[(8,9),(8,10),(7,11),(7,11),(7,12)],
'kurt-angle-moonsault':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'waistlock-takedown':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'the-rock-attitude-spinebuster':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'the-rock-attitude-lay-the-smack-down':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'john-cena-protobomb':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'shinsuke-nakamura-inverted-exploder':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'shinsuke-nakamura-landslide':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'shinsuke-nakamura-sliding-german-suplex':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'blake-monroe-glamour-shot':[(6,6),(6,7),(5,8),(5,8),(5,9)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_11_V11213 — ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 11 PASS',len(curves))
