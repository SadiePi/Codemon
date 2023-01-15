import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const Reflect: Move = loader.register<Move>(P => ({
  name: "Reflect",
  description: "A wondrous wall of light is put up to reduce damage from physical attacks for five turns.",
  type: P.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  target: "Team",
  makesContact: false,
}));
// TODO functionality
