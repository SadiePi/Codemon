import { Codex, dexBuilder, power, Move, chance } from "../index.ts";

export const HyperFang: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Hyper Fang",
  description: "The user bites hard on the target with its sharp front fangs. This may also make the target flinch.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  attack: power(80),
  accuracy: 90,
  makesContact: true,
  status: chance(1 / 10, C.Statuses.Flinch),
}));
