import { allGameplayCards } from "./content.js?v=1.1.22"; export const goldenEraCards=Object.fromEntries(allGameplayCards.filter(c=>c.setId==="golden-era-series-1").map(c=>[c.id,c]));
