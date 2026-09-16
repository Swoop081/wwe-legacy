from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_8_V11210' not in s
curves={
'jawbreaker':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'corner-avalanche':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'leaping-rope-clothesline':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'cannonball':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'spinning-torture-rack-neckbreaker':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'front-backbreaker':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'biel-toss':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'reverse-elbow':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'running-uppercut':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'gorilla-press-slam':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'corner-shoulder-thrusts':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'ground-and-pound':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'clothesline-over-the-top-rope':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'dragon-screw':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'apron-german-suplex':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'brainbuster':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'pump-kick':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'cutter':[(6,7),(6,8),(5,9),(5,9),(5,10)],
'finlay-roll':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'swanton-bomb':[(8,9),(8,10),(7,11),(7,11),(7,12)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_8_V11210 — shared ordinary offensive Moves; reversals, submissions and special-case 619 excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 8 PASS',len(curves))
