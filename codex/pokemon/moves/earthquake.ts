import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Earthquake: Move = loader.register<Move>(P => ({
  name: "Earthquake",
  description: "The user sets off an earthquake that strikes every Pokémon around it.",
  type: P.Types.Ground,
  category: "Physical",
  pp: 10, // max 16
  attack: power(100),
  target: "Every Adjacent",
  makesContact: false,
}));
