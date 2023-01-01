import { Codex, power, Move, chance } from "../index.ts";
import preload from "../preload.ts";

export const Ember: Move = preload.register<Move>((C: Codex) => ({
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
