import C, { Move } from "../index.ts";

export const Clamp: Move = {
  name: "Clamp",
  description: "The target is clamped and squeezed by the user's very thick and sturdy shell for four to five turns.",
  type: C.Types.Water,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 35,
  accuracy: 85,
  makesContact: true,
};
// TODO multiturn moves