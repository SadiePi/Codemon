import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Surf: Move = loader.register<Move>(P => ({
  name: "Surf",
  description: "The user attacks everything around it by swamping its surroundings with a giant wave.",
  type: P.Types.Water,
  category: "Special",
  pp: 15,
  attack: power(90),
  target: { quantity: "All", position: "Adjacent" },
  makesContact: false,
}));
