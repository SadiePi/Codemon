import { Codex, chance, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Smog: Move = preload.register<Move>((C: Codex) => ({
  name: "Smog",
  description: "The target is attacked with a discharge of filthy gases. This may also poison the target.",
  type: C.Types.Poison,
  target: "Any Adjacent",
  category: "Special",
  pp: 20,
  attack: power(30),
  accuracy: 70,
  makesContact: false,
  status: chance(2 / 5, C.Statuses.Poison),
}));
