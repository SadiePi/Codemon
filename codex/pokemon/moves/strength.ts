import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const Strength: Move = loader.register<Move>(P => ({
  name: "Strength",
  description: "The target is slugged with a punch thrown at maximum power.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 15,
  attack: power(80),
  target: "Any Adjacent",
  makesContact: true,
}));
