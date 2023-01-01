import { Codex, dexBuilder, power, Move, chance } from "../index.ts";

export const PoisonSting: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Poison Sting",
  description: "The user stabs the target with a poisonous stinger. This may also poison the target.",
  type: C.Types.Poison,
  category: "Physical",
  pp: 35,
  attack: power(15),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(3 / 10, C.Statuses.Poison),
}));
