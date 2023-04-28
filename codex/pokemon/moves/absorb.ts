import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Absorb: Move = loader.register(P => ({
  name: "Absorb",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: P.Types.Grass,
  category: "Special",
  pp: 20,
  target: "Any Adjacent",
  makesContact: false,
  leech: 1 / 2,
}));
