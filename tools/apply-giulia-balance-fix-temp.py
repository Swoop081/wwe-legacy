from pathlib import Path
p=Path('js/data/decks.js')
s=p.read_text()
old='deckIds["giulia"]=cloneRoadmapDeck("tatum-paxley","giulia",["giulia-hammerlock-michinoku-driver","giulia-avalanche-butterfly-suplex","giulia-arrivederci","giulia-northern-lights-bomb"],"special-giulia",{"momentum-agility":"momentum-technical"});'
new='''deckIds["giulia"]=cloneRoadmapDeck("tatum-paxley","giulia",["giulia-hammerlock-michinoku-driver","giulia-avalanche-butterfly-suplex","giulia-arrivederci","giulia-northern-lights-bomb"],"special-giulia");
// Giulia's authored 12-Momentum identity is 6 Technical / 4 Strike / 1 Agility / 1 Strength.
// The roadmap clone previously converted all four Agility pages to Technical, leaving
// her Agility and Strength requirements unreachable in actual matches.
{
  const ids=deckIds["giulia"]??[];
  let agilitySeen=0;
  for(let i=0;i<ids.length;i++){
    if(ids[i]!=="momentum-agility")continue;
    agilitySeen++;
    if(agilitySeen<=2)ids[i]="momentum-strike";
    else if(agilitySeen===3)ids[i]="momentum-strength";
  }
}'''
if old not in s: raise SystemExit('Exact Giulia roadmap assignment not found')
s=s.replace(old,new,1)
p.write_text(s)
