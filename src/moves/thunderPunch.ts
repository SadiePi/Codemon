import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const ThunderPunch = moves.register(() => ({
  name: "Thunder Punch",
  description: "The target is punched with an electrified fist. This may also leave the target with paralysis.",
  type: C.Types.Electric,
  category: "Physical",
  pp: 15,
  power: 75,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Paralysis, 1 / 10],
}));
