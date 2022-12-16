import C, { Move } from "../index.ts";
export const Pound: Move = {
  name: "Pound",
  description: "The target is physically pounded with a long tail, a foreleg, or the like.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 35,
  target: "Any Adjacent",
  makesContact: true,

  power: 40,
};
