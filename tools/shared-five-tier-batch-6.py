from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
assert 'SUBMISSION_FIVE_TIER_PASS_V11220' not in s
curves={
'mankind-mandible-claw':[11,10,9,8,7],
'bearhug':[7,6,5,4,3],
'crossface':[8,7,6,5,4],
'koji-clutch':[8,7,6,5,4],
'cm-punk-anaconda-vise':[9,8,7,6,5],
'paige-pto':[9,8,7,6,5],
'andre-the-giant-bear-hug':[9,8,7,6,5],
'figure-four-leglock':[8,7,6,5,4],
'charlotte-flair-figure-eight-leglock':[11,10,9,8,7],
'rhea-ripley-prism-trap':[9,8,7,6,5],
'brock-lesnar-kimura-lock':[9,8,7,6,5],
'boston-crab':[7,6,5,4,3],
'gunther-gojira-clutch':[11,10,9,8,7],
'stf':[7,6,5,4,3],
'abdominal-stretch':[6,5,4,3,2],
'chad-gable-ankle-lock':[11,10,9,8,7],
'mexican-surfboard':[7,6,5,4,3],
'octopus-hold':[7,6,5,4,3],
'joe-hendry-hendry-lock':[8,7,6,5,4],
'roxanne-perez-rok-lock':[8,7,6,5,4],
'hangman-armbar':[5,4,3,2,1],
'lola-vice-triangle-choke':[8,7,6,5,4],
'mr-iguana-muta-lock':[8,7,6,5,4],
'bret-hart-ringpost-figure-four':[8,7,6,5,4],
'bret-hart-sharpshooter':[11,10,9,8,7],
'razor-ramon-abdominal-stretch':[7,6,5,4,3],
'doink-stump-puller':[7,6,5,4,3],
'wristlock':[4,3,2,1,1],
'side-headlock':[5,4,3,2,1],
'nerve-hold':[6,5,4,3,2],
'owen-hart-sharpshooter':[11,10,9,8,7],
'full-nelson':[6,5,4,3,2],
'rowdy-roddy-piper-sleeper-hold':[10,9,8,7,6],
'ted-dibiase-million-dollar-dream':[10,9,8,7,6],
'front-facelock':[6,5,4,3,2],
'chris-jericho-walls-of-jericho':[11,10,9,8,7],
'kurt-angle-ankle-lock':[11,10,9,8,7],
'john-cena-stf':[11,10,9,8,7],
'kendal-grey-ankle-lock':[8,7,6,5,4],
'eddie-guerrero-lasso-from-el-paso':[7,6,5,4,3],
'aj-styles-calf-crusher':[9,8,7,6,5],
}
tiers=['base','emerald','sapphire','ruby','amethyst']
lines=['const APPROVED_AUDIT_OVERRIDES = Object.freeze({','  // SUBMISSION_FIVE_TIER_PASS_V11220 — submissions stay at 0 direct damage; higher tiers improve play efficiency through lower cost while preserving authored pressure/effects.']
for cid,costs in curves.items():
    ps=','.join(f'{t}:{{cost:{c},damage:0}}' for t,c in zip(tiers,costs))
    lines.append(f"  '{cid}': {{printingStats:{{{ps}}}}},")
block='\n'.join(lines)+'\n'
s=s.replace(marker,block,1)
p.write_text(s)
assert all(f"'{cid}': {{printingStats:" in s for cid in curves)
print('SUBMISSION FIVE TIER PASS',len(curves))
