import { Codex, power, Move, chance, register } from "../index.ts";

export const Ember: Move = register<Move>((C: Codex) => ({
  name: "Ember",
  description: "The target is attacked with small flames. This may also leave the target with a burn.",
  type: C.Types.Fire,
  category: "Special",
  pp: 25,
  attack: power(40),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(1 / 10, C.Statuses.Burn),
}));
