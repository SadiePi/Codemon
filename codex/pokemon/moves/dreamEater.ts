import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const DreamEater: Move = loader.register<Move>(P => ({
  name: "Dream Eater",
  description:
    "The user eats the dreams of a sleeping target. The user's HP is restored by up to half the damage taken by the target.",
  type: P.Types.Psychic,
  target: "Any Adjacent",
  category: "Special",
  pp: 15,
  attack: power(100),
  makesContact: false,
  leech: 1 / 2,
}));
// TODO effect consideration (only hit sleeping targets)
