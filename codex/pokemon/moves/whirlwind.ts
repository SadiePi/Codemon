import { Move } from "../index.ts";
import loader from "../loader.ts"

export const Whirlwind: Move = loader.register<Move>(P => ({
  name: "Whirlwind",
  description:
    "The target is blown away, and a different Pokémon is dragged out. In the wild, this ends a battle against a single Pokémon.",
  type: P.Types.Normal,
  category: "Status",
  pp: 20,
  target: "Any Adjacent",
  makesContact: false,
  eject: true,
}));
