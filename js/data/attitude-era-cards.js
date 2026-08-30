import { allGameplayCards } from "./content.js?v=1.1.44"; export const attitudeEraCards=Object.fromEntries(allGameplayCards.filter(c=>c.setId==="attitude-era-series-1").map(c=>[c.id,c]));
