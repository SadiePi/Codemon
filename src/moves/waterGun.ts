import C, { Move } from "../index.ts";

export const WaterGun: Move = {
  name: "Water Gun",
  description: "The target is blasted with a forceful shot of water.",
  type: C.Types.Water,
  category: "Special",
  pp: 25,
  power: 40,
  target: "Any Adjacent",
  makesContact: false,
};
