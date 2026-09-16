from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_13_V11215' not in s
curves={
'flair-chop':[(4,3),(4,4),(3,5),(3,5),(3,6)],
'kane-flying-clothesline':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'kane-two-handed-choke-lift':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'the-undertaker-running-big-boot':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'the-undertaker-snake-eyes':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'ultimate-warrior-clothesline':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'ultimate-warrior-diving-shoulder-block':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'ultimate-warrior-gorilla-press-slam':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'rhea-ripley-electric-chair-facebuster':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'rhea-ripley-reverse-alabama-slam':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'cody-rhodes-dropdown-uppercut':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'cody-rhodes-bionic-elbow':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'oba-femi-running-elbow':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'oba-femi-one-handed-backbreaker':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'stone-cold-steve-austin-pointed-elbow-drop':[(5,4),(5,5),(4,6),(4,6),(4,7)],
'stone-cold-steve-austin-mudhole-stomps':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'stone-cold-steve-austin-lou-thesz-press':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'gunther-gunther-s-chop':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'gunther-front-dropkick':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'gunther-burning-lariat':[(7,8),(7,9),(6,10),(6,10),(6,11)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_13_V11215 — wrestler-specific ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 13 PASS',len(curves))
