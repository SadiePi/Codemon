import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const WingAttack: Move = loader.register<Move>(P => ({
  name: "Wing Attack",
  description: "The target is struck with large, imposing wings spread wide to inflict damage.",
  type: P.Types.Flying,
  category: "Physical",
  pp: 35,
  attack: power(60),
  target: "Any",
  makesContact: true,
}));
