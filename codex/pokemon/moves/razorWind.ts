import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const RazorWind: Move = loader.register<Move>(P => ({
  name: "Razor Wind",
  description:
    "In this two-turn attack, blades of wind hit opposing Pokémon on the second turn. Critical hits land more easily.",
  type: P.Types.Normal,
  category: "Special",
  pp: 10,
  attack: power(80),
  target: { position: "Adjacent" },
  makesContact: false,
  criticalHitStage: 1,
}));
// TODO multiturn moves
