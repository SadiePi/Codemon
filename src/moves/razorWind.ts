import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const RazorWind = moves.register(() => ({
  name: "Razor Wind",
  description:
    "In this two-turn attack, blades of wind hit opposing Pokémon on the second turn. Critical hits land more easily.",
  type: C.Types.Normal,
  category: "Special",
  pp: 10,
  power: 80,
  target: "Any Adjacent",
  makesContact: false,
  criticalHitStage: 1,
  // TODO somehow
}));
// TODO multiturn moves
