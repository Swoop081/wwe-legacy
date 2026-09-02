import { allGameplayCards } from "./content.js?v=1.1.122"; export const evolutionCards=Object.fromEntries(allGameplayCards.filter(c=>c.setId==="evolution-series-1").map(c=>[c.id,c]));
