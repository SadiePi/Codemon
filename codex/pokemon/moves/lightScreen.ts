import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const LightScreen: Move = loader.register<Move>(P => ({
  name: "Light Screen",
  description: "A wondrous wall of light is put up to reduce damage from special attacks for five turns.",
  type: P.Types.Psychic,
  category: "Status",
  pp: 30, // max 48
  target: "Team",
  makesContact: false,
}));
// TODO te,porary boosts
