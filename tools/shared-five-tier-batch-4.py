from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
block="""const APPROVED_AUDIT_OVERRIDES = Object.freeze({
  // SHARED_FIVE_TIER_BATCH_4_V11206 — next highest-reuse offensive ordinary Moves; reversals and submissions intentionally excluded.
  'sidewalk-slam': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'sling-blade': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'belly-to-belly-suplex': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'knee-strike': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'short-arm-clothesline': {printingStats:{base:{cost:4,damage:4},emerald:{cost:4,damage:5},sapphire:{cost:3,damage:6},ruby:{cost:3,damage:6},amethyst:{cost:3,damage:7}}},
  'standing-moonsault': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'tope-con-hilo': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  '450-splash': {printingStats:{base:{cost:8,damage:8},emerald:{cost:8,damage:9},sapphire:{cost:7,damage:10},ruby:{cost:7,damage:10},amethyst:{cost:7,damage:11}}},
  'atomic-drop': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'backstabber': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'chop': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'fallaway-slam': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'firemans-carry': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'fisherman-suplex': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'frog-splash': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'hip-toss': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'lariat': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'running-clothesline': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'running-knee-strike': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'standing-dropkick': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
"""
s=s.replace(marker,block,1)
p.write_text(s)
for card_id in ['sidewalk-slam','sling-blade','belly-to-belly-suplex','knee-strike','short-arm-clothesline','standing-moonsault','tope-con-hilo','450-splash','atomic-drop','backstabber','chop','fallaway-slam','firemans-carry','fisherman-suplex','frog-splash','hip-toss','lariat','running-clothesline','running-knee-strike','standing-dropkick']:
    assert f"'{card_id}': {{printingStats:" in s
print('SHARED BATCH 4 PASS 20')
