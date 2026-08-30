import { allGameplayCards } from "./content.js?v=1.1.44"; export const entrances=Object.fromEntries(allGameplayCards.filter(c=>c.kind==="entrance").map(c=>[c.id,c]));
