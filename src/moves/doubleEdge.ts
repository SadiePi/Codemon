import C, { Move } from "../index.ts";

export const DoubleEdge: Move = {
  name: "Double-Edge",
  description:
    "A reckless, life-risking tackle in which the user rushes the target. This also damages the user quite a lot.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15, // max 24
  power: 120,
  target: "Any Adjacent",
  makesContact: true,
  // recoil: 1 / 4,
};
// TODO proportional recoil
