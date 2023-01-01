import { Codex, dexBuilder, power, Move, chance } from "../index.ts";

export const Lick: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Lick",
  description: "The target is licked with a long tongue, causing damage. It may also leave the target with paralysis.",
  type: C.Types.Ghost,
  target: "Any Adjacent",
  category: "Physical",
  pp: 30,
  attack: power(30),
  makesContact: true,
  status: chance(3 / 10, C.Statuses.Paralysis),
}));
