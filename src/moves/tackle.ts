import C, { Move } from "../index.ts";

export const Tackle: Move = {
  name: "Tackle",
  description: "A physical attack in which the user charges and slams into the target with its whole body.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 35, // max 56
  power: 40,
  target: "Any Adjacent",
  makesContact: true,
};
