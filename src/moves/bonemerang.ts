import C, { Move } from "../index.ts";

export const Bonemerang: Move = {
  name: "Bonemerang",
  description: "The user throws the bone it holds. The bone loops around to hit the target twice—coming and going.",
  type: C.Types.Ground,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 50,
  accuracy: 90,
  makesContact: false,
};
// TODO multihit moves