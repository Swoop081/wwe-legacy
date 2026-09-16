from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_5_V11207' not in s
curves={
'hotshot':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'side-suplex':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'senton':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'running-shoulder-block':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'running-powerslam':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'running-knee':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'military-press-slam':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'knee-to-the-gut':[(3,2),(3,3),(2,4),(2,4),(2,5)],
'knee-breaker':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'kick-to-the-gut':[(3,2),(3,3),(2,4),(2,4),(2,5)],
'front-kick':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'backhand-chop':[(3,2),(3,3),(2,4),(2,4),(2,5)],
'uppercut':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'turnbuckle-smash':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'tornado-ddt':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'tilt-a-whirl-backbreaker':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'spanish-fly':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'seated-shotgun-dropkick':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'roundhouse-kick':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'reverse-suplex':[(6,5),(6,6),(5,7),(5,7),(5,8)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_5_V11207 — next coherent ordinary Move group; defensive/reversal/submission cards excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 5 PASS',len(curves))
