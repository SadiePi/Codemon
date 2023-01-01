import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const HyperFang: Move = dexBuilder.register<Move>(() => ({
  name: "Hyper Fang",
  description: "The user bites hard on the target with its sharp front fangs. This may also make the target flinch.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  attack: power(80),
  accuracy: 90,
  makesContact: true,
  status: [C.Statuses.Flinch, 1 / 10],
}));
