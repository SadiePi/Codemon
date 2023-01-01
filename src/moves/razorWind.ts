import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const RazorWind: Move = dexBuilder.register<Move>(() => ({
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
