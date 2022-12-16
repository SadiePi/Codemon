import C, { Move } from "../index.ts";

export const Cut: Move = {
  name: "Cut",
  description: "The target is cut with a scythe or claw.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 30,
  power: 50,
  accuracy: 95,
  target: "Any Adjacent",
  makesContact: true,
};
