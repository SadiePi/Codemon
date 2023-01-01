import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const PoisonSting: Move = dexBuilder.register<Move>(() => ({
  name: "Poison Sting",
  description: "The user stabs the target with a poisonous stinger. This may also poison the target.",
  type: C.Types.Poison,
  category: "Physical",
  pp: 35,
  attack: power(15),
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Poison, 3 / 10],
}));
