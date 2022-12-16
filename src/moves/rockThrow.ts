import C, { Move } from "../index.ts";

export const RockThrow: Move = {
  name: "Rock Throw",
  description: "The user picks up and throws a small rock at the target to attack.",
  type: C.Types.Rock,
  category: "Physical",
  target: "Any Adjacent",
  makesContact: false,
  pp: 15, // max 24
  power: 50,
  accuracy: 90,
};
