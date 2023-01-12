import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const Haze: Move = loader.register<Move>((C: Codex) => ({
  name: "Haze",
  description: "The user creates a haze that eliminates every stat change among all the Pokémon engaged in battle.",
  type: C.Types.Ice,
  category: "Status",
  pp: 30, // max 48
  target: "All",
  makesContact: false,
}));
// TODO functionality
