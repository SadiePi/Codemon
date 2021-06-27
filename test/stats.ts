import * as T from "../src/index.ts";
import { garchomp } from "./common.ts";

// https://bulbapedia.bulbagarden.net/wiki/Stat#Example_2
const chompy = new T.Codemon({
  species: garchomp,
  name: "Noam Chompy",
  sex: T.SexFemale,
  level: 78,
  nature: T.Nature.Adamant,
  ivs: [24, 12, 30, 5, 16, 23],
  evs: [74, 190, 91, 23, 48, 84],
});
console.debug(`${chompy}`);
