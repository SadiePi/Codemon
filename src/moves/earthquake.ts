import C, { Move } from "../index.ts";

export const Earthquake: Move = {
  name: "Earthquake",
  description: "The user sets off an earthquake that strikes every Pokémon around it.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 10, // max 16
  power: 100,
  target: "Every Adjacent",
  makesContact: false,
};
