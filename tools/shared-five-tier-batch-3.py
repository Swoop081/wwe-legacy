from pathlib import Path
p=Path('js/shared/v1.1.69-card-identity-pass.js')
s=p.read_text()
marker='const APPROVED_AUDIT_OVERRIDES = Object.freeze({'
assert marker in s
block="""const APPROVED_AUDIT_OVERRIDES = Object.freeze({
  // SHARED_FIVE_TIER_BATCH_3_V11205 — highest-reuse ordinary Moves from scoped audit; authored by impact, not formula.
  'superkick': {printingStats:{base:{cost:6,damage:6},emerald:{cost:6,damage:7},sapphire:{cost:5,damage:8},ruby:{cost:5,damage:8},amethyst:{cost:5,damage:9}}},
  'body-slam': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'clothesline': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'hurricanrana': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'ddt': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'neckbreaker': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'running-forearm': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'back-suplex': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'back-body-drop': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'springboard-crossbody': {printingStats:{base:{cost:6,damage:5},emerald:{cost:6,damage:6},sapphire:{cost:5,damage:7},ruby:{cost:5,damage:7},amethyst:{cost:5,damage:8}}},
  'tilt-a-whirl-headscissors': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'stomp': {printingStats:{base:{cost:3,damage:2},emerald:{cost:3,damage:3},sapphire:{cost:2,damage:4},ruby:{cost:2,damage:4},amethyst:{cost:2,damage:5}}},
  'piledriver': {printingStats:{base:{cost:7,damage:8},emerald:{cost:7,damage:9},sapphire:{cost:6,damage:10},ruby:{cost:6,damage:10},amethyst:{cost:6,damage:11}}},
  'chokeslam': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
  'elbow-drop': {printingStats:{base:{cost:4,damage:3},emerald:{cost:4,damage:4},sapphire:{cost:3,damage:5},ruby:{cost:3,damage:5},amethyst:{cost:3,damage:6}}},
  'powerslam': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'running-big-boot': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'backbreaker': {printingStats:{base:{cost:5,damage:5},emerald:{cost:5,damage:6},sapphire:{cost:4,damage:7},ruby:{cost:4,damage:7},amethyst:{cost:4,damage:8}}},
  'enzuigiri': {printingStats:{base:{cost:5,damage:4},emerald:{cost:5,damage:5},sapphire:{cost:4,damage:6},ruby:{cost:4,damage:6},amethyst:{cost:4,damage:7}}},
  'moonsault': {printingStats:{base:{cost:7,damage:7},emerald:{cost:7,damage:8},sapphire:{cost:6,damage:9},ruby:{cost:6,damage:9},amethyst:{cost:6,damage:10}}},
"""
s=s.replace(marker,block,1)
p.write_text(s)
print('SHARED BATCH 3 PASS 20')
