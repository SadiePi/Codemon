import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const DoubleEdge: Move = preload.register<Move>((C: Codex) => ({
  name: "Double-Edge",
  description:
    "A reckless, life-risking tackle in which the user rushes the target. This also damages the user quite a lot.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15, // max 24
  attack: power(120),
  target: "Any Adjacent",
  makesContact: true,
  // recoil: 1 / 4,
}));
// TODO proportional recoil