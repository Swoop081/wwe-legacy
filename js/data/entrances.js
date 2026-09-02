import { allGameplayCards } from "./content.js?v=1.1.128"; export const entrances=Object.fromEntries(allGameplayCards.filter(c=>c.kind==="entrance").map(c=>[c.id,c]));
