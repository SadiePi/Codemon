import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const PoisonSting = moves.register(() => ({
  name: "Poison Sting",
  description: "The user stabs the target with a poisonous stinger. This may also poison the target.",
  type: C.Types.Poison,
  category: "Physical",
  pp: 35,
  power: 15,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Poison, 3 / 10],
}));
