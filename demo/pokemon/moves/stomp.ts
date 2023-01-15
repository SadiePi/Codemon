import { Codex, chance, power, Move, register } from "../index.ts";

export const Stomp: Move = register<Move>((C: Codex) => ({
  name: "Stomp",
  description: "The target is stomped with a big foot. This may also make the target flinch.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  attack: power(65),
  target: "Any Adjacent",
  makesContact: true,
  status: chance(3 / 10, C.Statuses.Flinch),
}));
