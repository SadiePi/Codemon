import { Move, power } from "../index.ts";
import loader from "../loader.ts"

export const Acid: Move = loader.register<Move>(P => ({
  name: "Acid",
  description: "Opposing Pokémon are attacked with a spray of harsh acid. This may also lower their Sp. Def stats.",
  type: P.Types.Poison,
  category: "Special",
  pp: 30,
  attack: power(40),
  target: "Every Adjacent Foe",
  makesContact: false,
  stages: { specialDefense: -1 },
}));
