import { Codex, power, Move, chance } from "../index.ts";
import preload from "../preload.ts";

export const IcePunch: Move = preload.register<Move>((C: Codex) => ({
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
