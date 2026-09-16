from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_10_V11212' not in s
curves={
'fisherman-buster':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'leg-kick':[(3,2),(3,3),(2,4),(2,4),(2,5)],
'spinning-back-kick':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'scissors-kick':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'top-rope-splash':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'bret-hart-inverted-atomic-drop':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'bret-hart-pendulum-backbreaker':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'bret-hart-second-rope-elbow-drop':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'shawn-michaels-flying-forearm':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'shawn-michaels-teardrop-suplex':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'shawn-michaels-top-rope-elbow-drop':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'razor-ramon-fallaway-slam':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'yokozuna-running-leg-drop':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'rowdy-roddy-piper-eye-poke':[(3,2),(3,3),(2,4),(2,4),(2,5)],
'rowdy-roddy-piper-punch-combination':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'rowdy-roddy-piper-bulldog':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'ted-dibiase-million-dollar-fist-drop':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'ted-dibiase-backbreaker':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'ted-dibiase-piledriver':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'jake-roberts-short-arm-clothesline':[(5,5),(5,6),(4,7),(4,7),(4,8)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_10_V11212 — ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 10 PASS',len(curves))
