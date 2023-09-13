import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Bulldoze: Move = loader.register<Move>(P => ({
  name: "Bulldoze",
  description:
    "The user tramples its target into the ground, dealing damage. This also lowers the target's action speed.",
  type: P.Types.Ground,
  category: "Physical",
  pp: 20,
  attack: power(60),
  target: { quantity: "All", position: "Adjacent" },
  makesContact: false,
  stages: { speed: -1 },
}));
