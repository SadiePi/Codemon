import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const RazorLeaf: Move = loader.register<Move>(P => ({
  name: "Razor Leaf",
  description: "Sharp-edged leaves are launched to slash at opposing Pokémon. Critical hits land more easily.",
  type: P.Types.Grass,
  category: "Physical",
  pp: 25, // max 40
  attack: power(55),
  accuracy: 95,
  target: { quantity: "All", position: "Adjacent", alignment: "Foe" },
  makesContact: false,
  criticalHitStage: 1,
}));
