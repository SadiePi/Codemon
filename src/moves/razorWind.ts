import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const RazorWind: Move = preload.register<Move>((C: Codex) => ({
  name: "Razor Wind",
  description:
    "In this two-turn attack, blades of wind hit opposing Pokémon on the second turn. Critical hits land more easily.",
  type: C.Types.Normal,
  category: "Special",
  pp: 10,
  attack: power(80),
  target: "Any Adjacent",
  makesContact: false,
  criticalHitStage: 1,
  // TODO somehow
}));
// TODO multiturn moves
