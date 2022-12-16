import C, { Move } from "../index.ts";

export const SonicBoom: Move = {
  name: "Sonic Boom",
  description: "The target is hit with a destructive shock wave that always inflicts 20 HP damage.",
  type: C.Types.Normal,
  category: "Special",
  pp: 20,
  power: 20,
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
  hp: -20,
};
