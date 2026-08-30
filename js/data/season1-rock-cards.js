import { allGameplayCards } from "./content.js?v=1.1.21"; export const season1RockCards=Object.fromEntries(allGameplayCards.filter(c=>c.setId==="season-1-final-boss").map(c=>[c.id,c]));
