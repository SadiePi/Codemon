import { Move, chance, power } from "../mod.ts";
import loader from "../loader.ts";

export const Acid: Move = loader.register<Move>(P => ({
  name: "Acid",
  description: "Opposing Pokémon are attacked with a spray of harsh acid. This may also lower their Sp. Def stats.",
  target: { quantity: "All", position: "Adjacent", alignment: "Foe" },
  category: "Special",
  type: P.Types.Poison,
  pp: 30,
  makesContact: false,

  attack: power(40),
  stages: chance(1 / 10, { specialDefense: -1 }),
}));
