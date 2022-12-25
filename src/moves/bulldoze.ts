import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Bulldoze = moves.register(() => ({
  name: "Bulldoze",
  description:
    "The user tramples its target into the ground, dealing damage. This also lowers the target's action speed.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 20,
  power: 60,
  target: "Every Adjacent",
  makesContact: false,
  stages: { speed: -1 },
}));
