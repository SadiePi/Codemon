import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const MegaDrain = moves.register(() => ({
  name: "Mega Drain",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: C.Types.Grass,
  category: "Special",
  pp: 15,
  power: 40,
  target: "Any Adjacent",
  makesContact: false,
  leech: 1 / 2,
}));
