import C, { Move } from "../index.ts";

export const QuickAttack: Move = {
  name: "Quick Attack",
  description: "The user lunges at the target at a speed that makes it almost invisible. This move always goes first.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 30, // max 48
  power: 40,
  priority: 1,
  target: "Any Adjacent",
  makesContact: true,
};
