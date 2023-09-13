import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const DoubleEdge: Move = loader.register<Move>(P => ({
  name: "Double-Edge",
  description:
    "A reckless, life-risking tackle in which the user rushes the target. This also damages the user quite a lot.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 15, // max 24
  attack: power(120),
  target: { position: "Adjacent" },
  makesContact: true,
  // recoil: 1 / 4,
}));
// TODO proportional recoil
