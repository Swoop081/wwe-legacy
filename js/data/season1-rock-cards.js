import { allGameplayCards } from "./content.js?v=1.0.0"; export const season1RockCards=Object.fromEntries(allGameplayCards.filter(c=>c.setId==="season-1-final-boss").map(c=>[c.id,c]));
