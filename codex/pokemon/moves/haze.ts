import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Haze: Move = loader.register<Move>(P => ({
  name: "Haze",
  description: "The user creates a haze that eliminates every stat change among all the Pokémon engaged in battle.",
  type: P.Types.Ice,
  category: "Status",
  pp: 30, // max 48
  target: { quantity: "All", alignment: "Any", includeSelf: true },
  makesContact: false,
}));
// TODO functionality (more complicated than it seems)
