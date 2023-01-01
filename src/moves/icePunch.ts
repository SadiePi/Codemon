import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const IcePunch: Move = dexBuilder.register<Move>(() => ({
  name: "Ice Punch",
  description: "The target is punched with an icy fist. This may also leave the target frozen.",
  type: C.Types.Ice,
  category: "Physical",
  pp: 15,
  attack: power(75),
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Freeze, 1 / 10],
}));
