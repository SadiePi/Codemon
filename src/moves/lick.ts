import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Lick = moves.register(() => ({
  name: "Lick",
  description: "The target is licked with a long tongue, causing damage. It may also leave the target with paralysis.",
  type: C.Types.Ghost,
  target: "Any Adjacent",
  category: "Physical",
  pp: 30,
  power: 30,
  makesContact: true,
  status: [C.Statuses.Paralysis, 3 / 10],
}));
