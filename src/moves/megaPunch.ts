import C, { Move } from "../index.ts";
export const MegaPunch: Move = {
  name: "Mega Punch",
  description: "The target is slugged by a punch thrown with muscle-packed power.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 80,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
};
