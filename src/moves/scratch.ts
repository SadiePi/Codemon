import C, { Move } from "../index.ts";

export const Scratch: Move = {
  name: "Scratch",
  description: "Hard, pointed, sharp claws rake the target to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 35,
  power: 40,
  target: "Any Adjacent",
  makesContact: true,
};
