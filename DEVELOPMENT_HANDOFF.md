# WWE Legacy Development Handoff

Updated: 26 September 2026
Branch: main
Repository: Swoop081/wwe-legacy

## Current milestone

The relaunch starter-deck pass is complete. There are now 17 approved 60-card starter decks on main: all 16 Premiere Superstars plus LA Knight from Money in the Bank.

The next chat should continue from this exact state. Do not rebuild or reinterpret the approved decks unless the user explicitly asks for changes.

## Relaunch card pool

Premiere contains 270 identities:
- PREM01–PREM16 — Superstars
- PREM17–PREM32 — Entrances
- PREM33–PREM48 — Finishers
- PREM49–PREM96 — Trademarks, three per Superstar
- PREM97–PREM112 — Superstar Actions
- PREM113–PREM240 — shared Moves
- PREM241 — AMAZING ENTRANCE
- PREM242–PREM254 — shared/universal Actions and counters
- PREM255–PREM270 — T-shirts/merch; booster-only and deck-ineligible

Money in the Bank currently adds LA Knight:
- MITB01 — LA Knight — Superstar
- MITB02 — YEAH!! — Entrance
- MITB03 — Blunt Force Trauma — Finisher
- MITB04 — The Megastar’s Elbow — Trademark
- MITB05 — LA Elbow — Trademark
- MITB06 — Burning Hammer — Trademark
- MITB07 — Let Me Talk to Ya! — Superstar Action
- MITB08 — LA Knight T-Shirt — booster-only merch/deck-ineligible

Runtime boundary intentionally exposes Premiere plus MITB gameplay identities. Do not use retired legacy cards in the relaunch starters.

## Locked starter-deck construction rules

Each starter is exactly 60 cards.

Superstar and Entrance are outside the 60.

The opening five are inside the 60 and must be explicitly authored/listed first.

Opening Momentum is separate from the regular Momentum allocation. Every starter still receives exactly 12 regular Momentum cards: 6 primary + 6 secondary. An opening tertiary Momentum does not reduce those 12.

Fixed signature quantities:
- Finisher ×3
- Trademark 1 ×3
- Trademark 2 ×3
- Trademark 3 ×3
- Superstar Action ×2

This leaves 29 shared slots after opening five, regular Momentum and signatures are accounted for.

Opening copies of Moves may appear again later in the deck; those later copies are additional copies.

Use only valid current relaunch cards. No No Sell, Chain Wrestling or other retired legacy cards.

Shared Move distribution should be wrestler-authentic, contain a sensible low/medium/high damage curve, include defensive/counter options, and generally use 1×/2× quantities.

## Trademark requirement rule

For these starter builds, every Superstar's three Trademarks must be playable from Momentum available in that starter.

The approved starter-specific Trademark requirements have been authored into the gameplay data. Do not revert them to old legacy requirements.

Move rarity requirement rule remains:
- Common Move — no attribute Momentum requirement
- Uncommon Move — exactly 1 total attribute Momentum
- Rare Move — exactly 2 total attribute Momentum, either same attribute or split
- Very Rare Move — no attribute Momentum requirement

This blanket rule applies to Moves, not Actions.

## Approved starter roster

1. PREM01 Roman Reigns
2. PREM02 Cody Rhodes
3. PREM03 CM Punk
4. PREM04 Seth Rollins
5. PREM05 Randy Orton
6. PREM06 Sami Zayn
7. PREM07 Stone Cold Steve Austin
8. PREM08 John Cena
9. PREM09 Rhea Ripley
10. PREM10 Liv Morgan
11. PREM11 Becky Lynch
12. PREM12 Charlotte Flair
13. PREM13 Tiffany Stratton
14. PREM14 IYO SKY
15. PREM15 Alexa Bliss
16. PREM16 Trish Stratus
17. MITB01 LA Knight

The exact approved 60-card arrays are the source of truth in js/data/decks.js on main. Read that file rather than recreating lists from memory.

## Recently locked deck identities / Momentum decisions

Austin — Strike + Strength; no tertiary.
Cena — Strength + Strike; one opening Technical.
Rhea — Strength + Strike; one opening Agility.
Liv — Agility + Strike; one opening Technical.
Becky — Strength + Strike; one opening Agility.
Charlotte — Technical + Strike; one opening Agility.
Tiffany — Agility + Strength; one opening Technical.
IYO — Agility + Strike; one opening Technical.
Alexa — Agility + Technical; one opening Strike.
Trish — Strike + Agility; one opening Technical.
LA Knight — Strike + Strength; one opening Agility.

## Recently approved Trademark requirements

Austin:
- PREM67 Lou Thesz Press — 1 Strike + 1 Strength
- PREM68 Stomp a Mudhole — 2 Strike
- PREM69 Pointed Elbow Drop — 2 Strike

Cena:
- PREM70 Five Knuckle Shuffle — 1 Strike + 1 Strength
- PREM71 STF — 1 Technical + 1 Strength
- PREM72 Diving Shoulder Tackle — 2 Strength

Rhea:
- PREM73 Prism Trap — 2 Strength
- PREM74 Razor's Edge — 2 Strength
- PREM75 Missile Dropkick — 1 Strike + 1 Agility

Liv:
- PREM76 Jersey Codebreaker — 2 Strike
- PREM77 Complete Shot — 1 Agility + 1 Technical
- PREM78 Backstabber — 1 Agility + 1 Technical

Becky:
- PREM79 The Man Slam — 2 Strength
- PREM80 Bexploder — 2 Strength
- PREM81 Diving Leg Drop — 1 Strike + 1 Agility

Charlotte:
- PREM82 Natural Selection — 2 Technical
- PREM83 Charlotte's Moonsault — 1 Strike + 1 Agility
- PREM84 Flair Chop — 2 Strike

Tiffany:
- PREM85 Rolling Fireman's Carry Slam — 2 Strength
- PREM86 Handspring Back Elbow — 2 Agility
- PREM87 Cartwheel Alabama Slam — 1 Agility + 1 Technical

IYO:
- PREM88 Spanish Fly — 1 Agility + 1 Technical
- PREM89 Meteora — 1 Strike + 1 Agility
- PREM90 Asai Moonsault — 2 Agility

Alexa:
- PREM91 Twisted Bliss — 2 Agility
- PREM92 Snap DDT — 1 Strike + 1 Technical
- PREM93 Insult to Injury — 1 Agility + 1 Strike

Trish:
- PREM94 Chick Kick — 2 Strike
- PREM95 Stratusphere — 1 Agility + 1 Technical
- PREM96 Air Canada — 1 Strike + 1 Agility

LA Knight:
- MITB04 The Megastar’s Elbow — 1 Strike + 1 Agility
- MITB05 LA Elbow — 1 Strike + 1 Agility
- MITB06 Burning Hammer — 2 Strength

## Important LA Knight details

LA Knight's approved 60-card starter uses MITB03–MITB07 for his own signature cards and Premiere shared cards for the remainder.

MITB01 Superstar and MITB02 Entrance sit outside the 60. MITB08 T-shirt is booster-only and not starter eligible.

His approved deck is now in js/data/decks.js.

## Universal Premiere Actions

PREM242 ARGUE WITH THE REFEREE
PREM243 CAUGHT 'EM
PREM244 C'MON
PREM245 DISTRACT THE REFEREE
PREM246 FACE TO FACE
PREM247 FIGHT FOREVER
PREM248 GENERAL MANAGER ADAM PEARCE
PREM249 GENERAL MANAGER NICK ALDIS
PREM250 GOT ALL OF IT
PREM251 LET'S GO
PREM252 RESPECT
PREM253 STRETCH IT OUT
PREM254 THAT WAS THREE

Actions are exempt from the blanket Move Momentum-requirement rule.

## Key implementation files

js/data/decks.js
- Exact approved 60-card starter arrays. This is the source of truth for deck composition.

js/data/premiere-gameplay.js
- Premiere gameplay bridge, PREM identities and authored Premiere gameplay/Trademark requirement overrides.

js/data/content.js
- Includes the current LA Knight MITB02–MITB08 gameplay definitions. LA Knight MITB Trademark requirement changes were authored here.

js/data/superstars.js
- Superstar definitions/reference data, including LA Knight.

## Final commits from this pass

Trish starter:
0d627e67f23953849a5b62991c61c804df84d4fb

Trish Trademark requirements:
5ad4380106c9e463bafd8fdf28a2f19ec0a43039

LA Knight starter:
5c946504755a54e6ecba94c834118383d34b0db2

LA Knight MITB Trademark requirements:
f24e2f299d732af7191c1f76caabc24653bd0d4f

Earlier approved starter/requirement commits are already on main.

## Workflow for the next chat

1. Fetch current main before editing anything.
2. Treat js/data/decks.js as authoritative for all 17 approved starter compositions.
3. Treat current gameplay files as authoritative for card IDs, effects, rarity and requirements.
4. Do not guess or reconstruct card data from old WWE knowledge or legacy decks.
5. If the user asks to change a card/deck, make the change against current main and commit it.
6. Preserve the 60-card starter rules unless the user explicitly changes them.
7. Continue WWE Legacy development from the completed 17-deck milestone.



## 26 September 2026 — latest UI/store/catalogue work

Current client work has moved beyond the 24 September starter-deck milestone.

Latest completed changes on main:
- Store over-explanation cleanup: removed "RUBY CHASE" from active Premiere pack subtitle and removed the explanatory line under PREMIERE SUPERSTARS about Entrances remaining a Very Rare booster chase. Commit: 705b7274.
- Premiere Store pack logo fix: physical booster packs now use the canonical set-logo markup instead of a separate Premiere-only logo path, so the Store pack should match other Premiere packs. Commit: ac023746.
- Card Catalogue rework: each normal card now presents its five collectible printings as five separate cards — Base, Emerald, Sapphire, Ruby and Amethyst — instead of showing one card with five tier ownership counts stacked beneath it. Fixed-printing cards still show only their valid printing. Commit: 1ea30294.
- Added mobile catalogue readability CSS: larger catalogue/search/filter/stat/card metadata text and a five-column printing row. File: css/v1.1.355-catalogue-five-printings.css. Commit: 16d331b8.
- index.html now loads that stylesheet and cache references were bumped to v1.1.355. Commit: 61f9af3b.
- js/config/build.js was bumped to 1.1.355. Commit: f88c54a2.

Important immediate follow-up:
- build.json is STILL 1.1.354 at the time of this handoff even though js/config/build.js/index cache refs are 1.1.355. Synchronize build.json/version plumbing before treating 1.1.355 as fully deployed.
- Physical iPhone verification of the new Catalogue layout is still needed. The five cards are deliberately separate visual cards, but on a narrow phone the five-column sizing may need refinement after the user's screenshot.
- Continue the user's global UI direction: avoid tutorial-like explanatory copy on ordinary game screens. Prefer concise game labels/statuses unless explanation is genuinely required.
- Do not revert the Store pack to the old purple SERIES 1 text wrapper. Premiere boosters should use the Premiere logo treatment consistently everywhere.

## Current user-requested visual direction

The user wants WWE Legacy to feel like a finished commercial mobile CCG rather than a prototype:
- Bigger, immediately readable text on iPhone.
- Less explanatory/helper prose across screens.
- Premiere branding used consistently.
- The five collectible printings are visually distinct physical cards, not text rows or tier counts under one card.
- Preserve the established card frames/baseplates/artwork rather than redesigning cards unnecessarily.
