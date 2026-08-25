import { allGameplayCards } from "./content.js?v=1.0.0"; export const entrances=Object.fromEntries(allGameplayCards.filter(c=>c.kind==="entrance").map(c=>[c.id,c]));
