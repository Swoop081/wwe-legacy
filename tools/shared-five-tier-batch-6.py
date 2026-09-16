from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SHARED_FIVE_TIER_BATCH_17_V11219' not in s
curves={
'tatum-paxley-diving-knee-drop':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'zilla-fatu-pop-up-samoan-drop':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'zilla-fatu-running-senton':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'batista-batista-spinebuster':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'batista-spear':[(7,8),(7,9),(6,10),(6,10),(6,11)],
'batista-demon-bomb':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'jbl-fallaway-slam':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'jbl-big-boot':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'eddie-guerrero-hurricanrana':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'edge-edge-o-matic':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'edge-impaler-ddt':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'jeff-hardy-whisper-in-the-wind':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'jeff-hardy-poetry-in-motion':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'rob-van-dam-rolling-thunder':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'rob-van-dam-split-legged-moonsault':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'aj-styles-pele-kick':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'aj-styles-ushigoroshi':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'danhausen-very-nice-knee-vil':[(6,6),(6,7),(5,8),(5,8),(5,9)],
'joe-hendry-freak-of-nature':[(7,7),(7,8),(6,9),(6,9),(6,10)],
'joe-hendry-hendry-slam':[(7,8),(7,9),(6,10),(6,10),(6,11)],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SHARED_FIVE_TIER_BATCH_17_V11219 — wrestler-specific ordinary offensive Moves; reversals, submissions, Finishers/Trademarks and special-case 619 excluded.']
for cid,vals in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:{d}}}' for t,(c,d) in zip(tiers,vals))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SHARED BATCH 17 PASS',len(curves))
