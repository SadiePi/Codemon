import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Thunderbolt = moves.register(() => ({
  name: "Thunderbolt",
  description: "A strong electric blast crashes down on the target. This may also leave the target with paralysis.",
  type: C.Types.Electric,
  category: "Special",
  pp: 15, // max 24
  power: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Paralysis, 1 / 10],
}));
