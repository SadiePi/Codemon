import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const MegaDrain: Move = loader.register<Move>(P => ({
  name: "Mega Drain",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: P.Types.Grass,
  category: "Special",
  pp: 15,
  attack: power(40),
  target: { position: "Adjacent" },
  makesContact: false,
  leech: 1 / 2,
}));
