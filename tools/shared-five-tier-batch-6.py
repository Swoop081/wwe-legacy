from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_16_V11218' not in s
curves={
'blake-monroe-monroe-kick':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'trick-williams-book-end':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'trick-williams-cyclone-boot':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'jacy-jayne-cannonball-senton':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'jacy-jayne-discus-boot':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'jacy-jayne-running-knee-smash':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'kendal-grey-olympic-takedown':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'kendal-grey-rolling-german-suplex':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'tony-dangelo-family-spinebuster':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'tony-dangelo-fisherman-buster':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'jaida-parker-hipnotic':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'jaida-parker-running-hip-attack':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'kelani-jordan-handspring-elbow':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'kelani-jordan-springboard-cutter':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'kelani-jordan-450-splash':[(8,9),(8,10),(7,11),(7,11),(7,12)],
'mason-rook-fallaway-slam':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'mason-rook-corner-big-boot':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'mason-rook-checkmate-slam':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'tatum-paxley-bridging-german-suplex':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'lexis-king-superkick':[(5,5),(5,6),(4,7),(4,7),(4,8)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_16_V11218 — wrestler-specific ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 16 PASS',len(curves))
