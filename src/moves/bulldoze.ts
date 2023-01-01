import { Codex, dexBuilder, power, Move } from "../index.ts";

export const Bulldoze: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Bulldoze",
  description:
    "The user tramples its target into the ground, dealing damage. This also lowers the target's action speed.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 20,
  attack: power(60),
  target: "Every Adjacent",
  makesContact: false,
  stages: { speed: -1 },
}));
