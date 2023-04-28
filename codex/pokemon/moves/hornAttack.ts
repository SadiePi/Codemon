import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const HornAttack: Move = loader.register<Move>(P => ({
  name: "Horn Attack",
  description: "The target is jabbed with a sharply pointed horn to inflict damage.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 25,
  attack: power(65),
  target: "Any Adjacent",
  makesContact: true,
}));
