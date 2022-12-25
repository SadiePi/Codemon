import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const ThunderShock = moves.register(() => ({
  name: "Thunder Shock",
  description:
    "A jolt of electricity crashes down on the target to inflict damage. This may also leave the target with paralysis.",
  type: C.Types.Electric,
  category: "Special",
  pp: 30, // max 48
  power: 40,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Paralysis, 1 / 10],
}));
