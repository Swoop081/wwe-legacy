from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_9_V11211' not in s
curves={
'razor-ramon-bulldog':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'diesel-snake-eyes':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'diesel-big-boot':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'diesel-sidewalk-slam':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'doink-drop-toe-hold':[(3,2),(3,3),(2,4),(2,4),(2,5)],
'doink-flying-body-press':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'yokozuna-savate-kick':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'yokozuna-belly-to-belly-suplex':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'dropkick-to-the-knee':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'owen-hart-enzuigiri':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'owen-hart-dragon-suplex':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'owen-hart-missile-dropkick':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'wheel-kick':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'gutbuster':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'bridging-german-suplex':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'step-up-enzuigiri':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'spinning-heel-kick':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'british-bulldog-delayed-vertical-suplex':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'british-bulldog-military-press-slam':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'knee-facebuster':[(5,5),(5,6),(4,7),(4,7),(4,8)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_9_V11211 — ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 9 PASS',len(curves))
