import C, { Move } from "../index.ts";

export const MegaDrain: Move = {
  name: "Mega Drain",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: C.Types.Grass,
  category: "Special",
  pp: 15,
  power: 40,
  target: "Any Adjacent",
  makesContact: false,
  leech: 1 / 2,
};
