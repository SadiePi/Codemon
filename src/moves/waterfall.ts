import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Waterfall = moves.register(() => ({
  name: "Waterfall",
  description: "The user charges at the target and may make it flinch.",
  type: C.Types.Water,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  power: 80,
  makesContact: true,
  status: [C.Statuses.Flinch, 2 / 10],
}));
