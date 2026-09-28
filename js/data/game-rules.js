export const PIN_CHANCE_TABLE = Object.freeze([
  ["0–4 HP", "75%"], ["5 HP", "70%"], ["6 HP", "60%"], ["7 HP", "55%"], ["8 HP", "50%"],
  ["9 HP", "48%"], ["10 HP", "45%"], ["11 HP", "40%"], ["12 HP", "35%"], ["13 HP", "30%"],
  ["14 HP", "25%"], ["15 HP", "20%"], ["16+ HP", "5%"]
]);

export const GAME_RULE_SECTIONS = Object.freeze([
  {
    id: "match-basics", group: "MATCH", title: "Winning & Match Basics",
    summary: "Control the match, damage your opponent and finish by pinfall or submission.",
    items: [
      ["The objective", "Win the match by successful pinfall or by forcing a submission. There is no referee-decision finish for Playbook exhaustion."],
      ["Superstar HP", "Every Superstar has printed maximum HP. Damage reduces current HP but does not change printed maximum HP."],
      ["Health zones", "Green is 65% or more of maximum HP. Amber is 25%–64%. Red is below 25%. These zones matter for pin legality and presentation."],
      ["Card text", "Specific card, Superstar, Entrance and Action text can create exceptions. When an authored card explicitly overrides a general rule, that card text wins for that interaction."]
    ]
  },
  {
    id: "turns-control", group: "MATCH", title: "Turns, Control & Drawing",
    summary: "Only the Superstar in Control takes normal actions.",
    items: [
      ["Lead Off 5", "Each match begins with the authored or saved Lead Off 5. There is no normal Turn 1 draw."],
      ["Control", "The Superstar in Control may play legal cards, make Moves, pass, and use available post-Move options."],
      ["Keeping Control", "A connected non-Submission Move normally keeps Control. After it connects, the defender draws 1 page; the attacker does not receive an automatic replacement draw."],
      ["Recycling the Playbook", "Played Moves and normal reusable Actions go to your recycle pile. When your Playbook empties and you need to draw or search, shuffle that recycle pile to create a new Playbook. Pages explicitly ditched, one-use cards and committed Momentum do not recycle."],
      ["Losing Control", "Control normally changes on a pass, a successful Counter, or a failed pin / kick out. Some Superstar or Action effects can explicitly retain or regain Control."],
      ["Unlimited match clock", "Matches do not end because a turn limit or an empty Playbook is reached. When a draw or search needs a page and your Playbook is empty, shuffle your recyclable used pages to form a new Playbook. If you have no recyclable pages, that draw or search simply finds nothing."]
    ]
  },
  {
    id: "resources", group: "MATCH", title: "Momentum & Adrenaline",
    summary: "Build permanent Method Momentum and use Adrenaline as flexible numeric Cost power.",
    items: [
      ["Four Methods", "Strength is orange, Strike is red, Technical is green and Agility is blue."],
      ["Playing Momentum", "You may normally play 1 Momentum page per turn while in Control. Method Momentum is permanent for the match and is not spent when you play normal cards."],
      ["Numeric Cost", "A card's numeric Cost checks your total Method Momentum plus current Adrenaline. These resources are thresholds, not a payment that is normally consumed."],
      ["Method requirements", "Printed Method requirements check the named Method totals separately. Finishers have no Method Momentum requirement unless an explicit card effect says otherwise."],
      ["Adrenaline shift", "Each connected Move or Submission gives the attacker +1 Adrenaline and removes 1 Adrenaline from the defender, to a minimum of 0."],
      ["Entrance Adrenaline", "Entrance Adrenaline that is tied to gaining Control is awarded only on that Superstar's first gain of Control."],
      ["Superstar Method Limits", "Each Superstar has Method Limits. Deck Lab prevents cards whose printed Method requirements exceed that Superstar's legal limits."]
    ]
  },
  {
    id: "card-types", group: "CARDS", title: "Card Types & Timing",
    summary: "Every card type has a different job and timing window.",
    items: [
      ["Moves", "Moves are the main offensive and defensive wrestling cards. They can be Strikes, Grapples, Aerials, Counters, Submissions, Trademarks or Finishers and may carry grounding, stun, search or other effects."],
      ["Momentum", "Momentum pages add +1 of their printed Method and are discarded after being played; the Momentum they granted remains for the match."],
      ["Actions", "Actions are utility and character cards. You may include multiple different Actions in a deck. Normal Actions use your Action window and the normal limit is 1 per turn; reactive or one-use Actions instead follow the specific timing printed on the card."],
      ["Triggered Actions", "When a one-use or reactive card becomes eligible because its trigger occurs, the human player is offered a clear choice to use it or decline. Declining does not consume the card or its once-per-match use; the card remains available for a later valid trigger. Mandatory effects from a card already played still resolve automatically."],
      ["Managers", "A Manager occupies the active Manager slot and follows the timing and effect printed on that card."],
      ["Entrances", "Entrances sit outside the 60-page deck. Your selected Entrance resolves automatically at its authored pre-match or first-Control timing; Entrances are not played from the hand."],
      ["Superstar cards", "The Superstar identity card defines HP, Method Limits, ability and associated deck identity. It is not one of the 60 deck pages."]
    ]
  },
  {
    id: "move-legality", group: "CARDS", title: "Playing Moves",
    summary: "A Move must satisfy Cost, Method, position and Superstar restrictions before it can be declared.",
    items: [
      ["Cost check", "Your total Method Momentum plus Adrenaline must meet the Move's effective numeric Cost after any legal discounts."],
      ["Method check", "Non-Finishers must also meet every printed Method requirement. Finishers ignore generic Method requirements."],
      ["Position", "Grounded-only Moves need the opponent on the mat. Standing-only Submissions need the opponent standing. Other card text can impose additional position requirements."],
      ["Exclusivity", "A Superstar-exclusive card can only be played by its named Superstar. Cards with an allowed-Superstar family restriction are legal only for that listed family."],
      ["Printing tiers", "Collectible cards use five printing tiers: Base, Emerald, Sapphire, Ruby and Amethyst. Sapphire is the authored midpoint. The live card face shows the resolved values for the printing being used; higher and lower printings can adjust Damage, Cost, submission pressure or effect magnitude according to that card type."]
    ]
  },
  {
    id: "counters", group: "MATCH", title: "Counters & Auto Counter",
    summary: "Counters answer the physical state of an incoming Move.",
    items: [
      ["Eight Counter States", "Arm Extended, Leg Extended, Running Aerial, Diving Aerial, Body Elevated, Torso Trapped, Front Control and Rear Control."],
      ["Matching a Counter", "A legal Counter must match the incoming card's Counter State, explicit counter-card relationship, or an applicable Submission body target."],
      ["Counter-attacks", "An offensive Counter becomes a counter-attack. Counter-attacks are terminal by default and resolve without opening another generic Counter window."],
      ["Punch / Elbow exchange", "Punch and Elbow are the explicit exchange family that may answer each other and continue the exchange when legal."],
      ["Mirror locks", "Jawbreaker cannot answer Jawbreaker. Offensive counter-attacks such as Arm Drag resolve terminally and do not recursively open a generic Counter window."],
      ["Reactive reversals", "Some reactive Actions can reverse an incoming Move when their printed trigger is satisfied. These cards follow their own printed timing and restrictions; a card-specific reversal may create an exception to the normal Counter rules."],
      ["Auto Counter", "Auto Counter is the fallback when you do not use a matching reversal. Its discard Cost is 5 pages the first time, then 6, 7, 8 and so on. You must still have at least 2 pages left in hand afterward."],
      ["Auto Counter limits", "Auto Counter cannot answer a Finisher or a counter-attack. The CPU prefers a real matching Counter and only considers Auto Counter in its authored decision rules."]
    ]
  },
  {
    id: "damage-state", group: "MATCH", title: "Damage, Grounding & Stun",
    summary: "Moves can change HP, body position and short-term match state.",
    items: [
      ["Damage", "Connected Moves reduce current HP by their resolved Damage, to a minimum of 0."],
      ["Grounding", "Cards that ground the opponent put them on the mat. Grounded status matters for many Finishers, Aerials and Submissions."],
      ["Stun", "Stun is an authored temporary state used by certain Moves and Actions. Stun duration and any prevention or bonus interactions follow the relevant card text."],
      ["Body-part damage", "Some attacks mark persistent damage to Head, Arms, Legs, Back or Chest. Submission pressure on that body part adds to the same persistent total."],
      ["Persistent injury", "Body-part damage remains after a Submission is released. Later holds can continue working the same damaged area."]
    ]
  },
  {
    id: "pins", group: "FINISH", title: "Pins & Kick Outs",
    summary: "Pins are only legal against an opponent already in Amber or Red health.",
    items: [
      ["Pin window", "A pin attempt is available after you connected a Move and retained Control, before playing Momentum or an Action in that fresh post-Move Action window."],
      ["Health gate", "Green-health opponents cannot be pinned. The defender must be in Amber or Red before the pin chance table is consulted."],
      ["Referee count", "A legal cover uses the referee count presentation. The defender may use a legal Pin Escape card when available."],
      ["Failed pin", "If the pin does not succeed, the defender kicks out and gains Control."],
      ["Pin probability", "Once the pin is legal, success chance is based on the defender's actual current HP, using the table shown in this Rulebook."]
    ]
  },
  {
    id: "submissions", group: "FINISH", title: "Submissions & Body Damage",
    summary: "Submission pressure is persistent and the tap threshold is the defender's current HP.",
    items: [
      ["Applying a hold", "A connected Submission adds its first pressure tick to the targeted body part. If that tick does not already meet the tap threshold, the defender receives a visible response window before any further pressure can resolve."],
      ["Defender response", "When you are trapped in a CPU Submission, the match pauses on an In the Hold response. Press Pass · Continue Hold to resolve the next pressure step. If the CPU maintains again, you receive another response window before another tick."],
      ["Tap threshold", "The defender taps whenever accumulated damage on the targeted body part is greater than or equal to the defender's current HP at a Submission damage tick."],
      ["Maintaining", "Maintaining a Submission ditches 1 page from the attacker's hand and adds the hold's pressure again."],
      ["Releasing", "The attacker may release instead of maintaining. The existing body-part damage stays in place and the attacker normally retains Control."],
      ["Worked body parts", "Repeated holds on an already-damaged body part become increasingly dangerous because prior damage is never reset simply by releasing the hold."]
    ]
  },
  {
    id: "deck-building", group: "DECK LAB", title: "Deck Building",
    summary: "Every playable Superstar deck is exactly 60 pages plus a separate Entrance.",
    items: [
      ["Deck size", "A legal deck contains exactly 60 pages."],
      ["Lead Off 5", "The first 5 pages are your opening hand. Lead Off may contain only Moves and Momentum, and must contain at least 1 Move and at least 1 Momentum page."],
      ["Copy caps", "Normal deck cards have a default maximum of 5 copies. Momentum cards may use up to 12 copies of the same Momentum card. A card-specific lower maxCopies value overrides those defaults."],
      ["Copy families", "Cards that share a copyFamily have a combined family cap of 5 copies."],
      ["Ownership", "You can only save copies you actually own. Collectible cards track Base, Emerald, Sapphire, Ruby and Amethyst printings separately. Collection ownership limits and deck-construction copy limits are separate rules."],
      ["Superstar legality", "Deck Lab enforces Superstar-exclusive cards, allowed-Superstar families, Method Limits and any card-specific restrictions."],
      ["Entrance", "A legal deck also needs one owned compatible Entrance selected outside the 60 pages."],
      ["Merch slot", "Deck Lab also has one active Merch slot outside the 60-page deck. Merch never stacks. Each Merch card lasts 1, 3 or 5 completed eligible matches, consuming one match of duration after each completed match in which its effect applies. Generic Merch is assigned to one eligible unlocked Superstar when equipped; it is not copied across multiple decks. Superstar-specific Merch can only be equipped for that unlocked Superstar. Momentum-granting Merch is illegal if that Superstar has a 0 limit for the Method or if the Merch bonus itself exceeds a finite Method limit."],
      ["Recommended decks", "Starter selections receive playable starter decks during onboarding. Deck Lab compares your Collection against each Superstar\'s authored recommended build, uses owned recommended cards first, fills gaps only with legal shared cards you already own, and identifies missing authored cards as you collect them."]
    ]
  },
  {
    id: "collection-rarity", group: "COLLECTION", title: "Rarity, Ownership & Card Tiers",
    summary: "Card rarity stays intrinsic while five collectible printing tiers provide progressively stronger versions.",
    items: [
      ["Rarity", "1★ Common, 2★ Uncommon, 3★ Rare and 4★ Very Rare."],
      ["Ownership caps", "Collectible cards track Base, Emerald, Sapphire, Ruby and Amethyst separately. Each eligible printing can hold up to its Collection cap; overflow copies convert to Universe Points. Deck-construction limits remain separate from Collection ownership limits."],
      ["Duplicate conversion", "When a collectible printing is already at its ownership cap, additional copies convert to Universe Points. The conversion value increases with both the card\'s intrinsic rarity and the printing tier, so rarer premium-print duplicates award more UP than Base duplicates."],
      ["Card tiers", "The five printing tiers are Base, Emerald, Sapphire, Ruby and Amethyst. Sapphire is the authored midpoint. The resolved card face displays the active values for that printing, including any tier-based changes to Damage, Cost, submission pressure or effect magnitude. Core card identity and printed legality restrictions remain intact."],
      ["Tier deck use", "Deck Lab and Deck Assistance prefer the strongest owned tier. The live card plate shows the active Damage and submission pressure so tier strength is never a hidden modifier."],
      ["Collection milestones", "Released sets can provide collection-progress tracks and milestone rewards. Base completion counts collector identities, while printing-specific tracks count unique cards owned at that exact printing tier. The Collection screen displays the active milestones and rewards for each set."]
    ]
  },
  {
    id: "boosters", group: "COLLECTION", title: "Boosters, Duplicates & Deck Assistance",
    summary: "Five-card boosters build the collection while ownership caps protect the economy.",
    items: [
      ["Pack size", "A standard booster contains 5 pulls."],
      ["Rarity weights", "Ordinary slots roll from the current available pool using 50% Common, 30% Uncommon, 15% Rare and 5% Very Rare weighting until a Very Rare has been hit."],
      ["Very Rare ceiling", "A standard five-card booster can contain at most 1 Very Rare total. A Superstar chase consumes that one Very Rare slot."],
      ["Tier chase", "Eligible booster pulls can appear at Base, Emerald, Sapphire, Ruby or Amethyst printing tier. Higher tiers are progressively rarer; the active booster screen and card face identify the printing received."],
      ["Superstar chase", "Eligible Superstar identities use a separate 2% pack-level chase with a 100-pack hard pity for an available unowned Superstar in that set."],
      ["Duplicate conversion", "Ordinary collectible cards track each of the five printing tiers separately with a five-copy cap: up to 5 Base, 5 Emerald, 5 Sapphire, 5 Ruby and 5 Amethyst copies (25 total). Copy 6+ of a tier converts to Universe Points. Superstar and Entrance cards are unique collectibles: only one printing of that identity can be owned, and every later copy converts to Universe Points. Overflow value remains based on the card’s intrinsic rarity: Common 1 UP, Uncommon 2 UP, Rare 3 UP and Very Rare 4 UP."],
      ["Released sets only", "Only currently released player-facing sets can be opened or awarded from live reward pools. Future subset boosters remain unavailable until their release pass goes live."],
      ["Universal booster cards", "Some shared WWE Legacy cards may appear across multiple eligible booster pools while retaining one collector identity."],
      ["Deck Assistance", "Deck Assistance can suggest safe restoration toward a Superstar's authored recommended build and prefers the strongest owned printing tier for each card. If a booster reveals usable Merch while the single Merch slot is empty, Deck Assistance can flag one equip suggestion. Superstar-specific Merch targets its owner; Generic Merch is scored against the actual effect and your eligible unlocked roster, then suggested once for the best legal fit."]
    ]
  },
  {
    id: "modes", group: "PLAY", title: "Game Modes",
    summary: "WWE Legacy modes use the same core match engine with different structures, progression and rewards.",
    items: [
      ["Exhibition", "Exhibition is a standard one-off match using an owned Superstar against an eligible CPU opponent. Any active milestone rewards are shown on the mode screen."],
      ["Live Events", "Live Events are rotating limited-time match towers. Each event has its own opponent lineup, progress and completion reward. The Live Events screen shows the currently active events, their reset time and their rewards; expired event progress does not carry into a new rotation."],
      ["King of the Ring", "King of the Ring is a single-elimination tournament. Win each round in succession to become tournament champion; a loss ends the current run. The mode screen displays the current bracket and completion reward."],
      ["Money in the Bank", "Money in the Bank is a multi-match tower with limited lives. Losses consume lives, while clearing the full tower completes the run. The mode screen displays the active tower, lives, reset timing and completion reward."],
      ["Survivor Series", "Survivor Series is a team-based elimination mode. Its match structure, available participants and active rewards are displayed on the mode screen."],
      ["Championship Road", "Championship Road gives each eligible Superstar persistent individual progression through a sequence of matches and difficulty levels. Progress is saved separately for each Superstar, and the mode screen displays the current road, difficulty and rewards."],
      ["Career records", "Completed tracked matches feed My Legacy's overall record, Superstar records and mode records."]
    ]
  },
  {
    id: "season-challenges", group: "PROGRESSION", title: "Season, Challenges & Rewards",
    summary: "Season XP, challenges and rotating rewards provide long-term progression.",
    items: [
      ["Season progression", "The active Season has a tiered XP progression road. Tier requirements, duration and rewards are displayed on the Season screen so the Rulebook remains independent of a particular Season."],
      ["Match XP", "Eligible match results award Season XP according to the active progression rules shown in game."],
      ["Daily challenges", "Daily Challenges rotate on their displayed schedule and award the rewards shown on the Challenges screen."],
      ["Weekly challenges", "Weekly Challenges rotate on their displayed schedule and award the rewards shown on the Challenges screen."],
      ["Free rewards", "Any timed free Season reward is shown on the Season screen together with its next availability time."],
      ["Reward gating", "Reward pools only use content that is released and eligible at the time the reward is granted. Unreleased content cannot appear early."]
    ]
  },
  {
    id: "legacy-records", group: "MY LEGACY", title: "Records, Achievements & Save Data",
    summary: "My Legacy is the permanent career record for this local profile.",
    items: [
      ["Overall record", "My Legacy stores total wins and losses from the career-record tracking build onward."],
      ["Superstar record", "Every unlocked Superstar has their own W/L record."],
      ["Mode record", "Each tracked game mode keeps its own W/L totals in My Legacy."],
      ["Achievements", "Achievements are persistent career milestones for wins, modes, finish methods and roster use. Previously stored clear counters can legitimately satisfy matching achievements."],
      ["Local profile", "Progress, collection, decks, Season state, records and achievements are stored in the local WWE Legacy profile on this device / browser."],
      ["Reset Progress", "Reset Progress in My Legacy permanently clears the local profile when confirmed."]
    ]
  },
  {
    id: "glossary", group: "REFERENCE", title: "Quick Glossary",
    summary: "The short version of the terms used throughout WWE Legacy.",
    items: [
      ["Control", "The right to take normal offensive actions."],
      ["Control sequence", "The uninterrupted stretch during which one Superstar keeps Control. Many bonuses check what happened earlier in the same sequence."],
      ["Printed", "The number or rule physically authored on the card before temporary match effects modify it."],
      ["Trademark", "A signature Superstar Move with its own authored card rules and restrictions."],
      ["Finisher", "A finishing Move. Finishers ignore generic Method requirements unless an explicit card effect says otherwise."],
      ["Counter State", "The physical state an incoming Move exposes to the defender for reversal matching. Card backs label this CAN BE COUNTERED AS; it does not mean the Move reverses anything itself. Actual reversal abilities are labeled REVERSES."],
      ["UP", "Universe Points, the store currency also earned from duplicate overflow and selected game rewards."],
      ["Card tiers", "The five printing tiers are Base, Emerald, Sapphire, Ruby and Amethyst. Sapphire is the authored midpoint, and the resolved card face displays the active values for the printing in use."],
      ["REWARD pack", "A special completion-pack wrapper used for Money in the Bank and Championship-style completion rewards; its underlying set still determines the cards inside."]
    ]
  }
]);
