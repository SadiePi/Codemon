import C, { chance, power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Smog: Move = dexBuilder.register<Move>(() => ({
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
