import { Codex, chance, power, Move, register } from "../index.ts";

export const Sludge: Move = register<Move>((C: Codex) => ({
  name: "Sludge",
  description: "Unsanitary sludge is hurled at the target. This may also poison the target.",
  type: C.Types.Poison,
  target: "Any Adjacent",
  category: "Special",
  pp: 20,
  attack: power(65),
  makesContact: false,
  status: chance(3 / 10, C.Statuses.Poison),
}));
