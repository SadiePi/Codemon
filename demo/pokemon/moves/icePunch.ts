import { Codex, power, Move, chance, register } from "../index.ts";

export const IcePunch: Move = register<Move>((C: Codex) => ({
  name: "Ice Punch",
  description: "The target is punched with an icy fist. This may also leave the target frozen.",
  type: C.Types.Ice,
  category: "Physical",
  pp: 15,
  attack: power(75),
  target: "Any Adjacent",
  makesContact: true,
  status: chance(1 / 10, C.Statuses.Freeze),
}));
