import C, { Move } from "../index.ts";

export const ViseGrip: Move = {
  name: "Vise Grip",
  description: "The target is gripped and squeezed from both sides to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 30,
  power: 55,
  target: "Any Adjacent",
  makesContact: true,
};
