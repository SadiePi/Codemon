import C, { Move } from "../index.ts";

export const Absorb: Move = {
  name: "Absorb",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: C.Types.Grass,
  category: "Special",
  pp: 20,
  power: 20,
  target: "Any Adjacent",
  makesContact: false,
  leech: 1 / 2,
};
