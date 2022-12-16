import C, { Move } from "../index.ts";

export const Strength: Move = {
  name: "Strength",
  description: "The target is slugged with a punch thrown at maximum power.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  power: 80,
  target: "Any Adjacent",
  makesContact: true,
};
