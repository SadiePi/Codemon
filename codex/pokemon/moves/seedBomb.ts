import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const SeedBomb: Move = loader.register<Move>(P => ({
  name: "Seed Bomb",
  description: "The user slams a barrage of hard-shelled seeds down on the target from above.",
  type: P.Types.Grass,
  category: "Physical",
  pp: 15, // max 24
  attack: power(80),
  target: "Any Adjacent",
  makesContact: false,
}));
