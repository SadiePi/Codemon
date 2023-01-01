import C, { chance, power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Waterfall: Move = dexBuilder.register<Move>(() => ({
  name: "Waterfall",
  description: "The user charges at the target and may make it flinch.",
  type: C.Types.Water,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  attack: power(80),
  makesContact: true,
  status: chance(2 / 10, C.Statuses.Flinch),
}));
