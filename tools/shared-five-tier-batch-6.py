from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_14_V11216' not in s
curves={
'the-undertaker-old-school':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'cody-rhodes-disaster-kick':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'liv-morgan-jersey-codebreaker':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'brock-lesnar-brocks-german':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'logan-paul-prime-splash':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'sol-ruca-springboard-splash':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'chad-gable-moonsault':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'raquel-rodriguez-big-boot':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'raquel-rodriguez-corkscrew-splash':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'three-amigos':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'penta-handstand-dropkick':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'el-grande-americano-jumping-headbutt':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'tiffany-stratton-handspring-back-elbow':[(6,5),(6,6),(5,7),(5,7),(5,8)],
'running-knees-to-the-back':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'chelsea-green-missile-dropkick':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'randy-orton-draping-ddt':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'roxanne-perez-russian-leg-sweep':[(5,5),(5,6),(4,7),(4,7),(4,8)],
'roxanne-perez-meteora':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'montez-ford-spinebuster':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'lola-vice-spinning-heel-kick':[(5,5),(5,6),(4,7),(4,7),(4,8)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_14_V11216 — wrestler-specific ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 14 PASS',len(curves))
