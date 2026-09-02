import { allGameplayCards } from "./content.js?v=1.1.127"; export const cards=Object.fromEntries(allGameplayCards.filter(c=>c.setId==="summerslam-series-1").map(c=>[c.id,c]));
