import C, { Move } from "../index.ts";

export const Surf: Move = {
  name: "Surf",
  description: "The user attacks everything around it by swamping its surroundings with a giant wave.",
  type: C.Types.Water,
  category: "Special",
  pp: 15,
  power: 90,
  target: "Every Adjacent",
  makesContact: false,
};
