import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const RazorLeaf = moves.register(() => ({
  name: "Razor Leaf",
  description: "Sharp-edged leaves are launched to slash at opposing Pokémon. Critical hits land more easily.",
  type: C.Types.Grass,
  category: "Physical",
  pp: 25, // max 40
  power: 55,
  accuracy: 95,
  target: "Every Adjacent Foe",
  makesContact: false,
  criticalHitStage: 1,
}));
