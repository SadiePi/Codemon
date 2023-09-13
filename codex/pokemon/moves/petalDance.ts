import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const PetalDance: Move = loader.register<Move>(P => ({
  name: "Petal Dance",
  description: "The user attacks the target with sharp petals that land on the target.",
  type: P.Types.Grass,
  category: "Physical",
  pp: 10, // max 16
  attack: power(120),
  target: {
    alignment: "Foe",
    selection: "Random",
  },
  makesContact: true,
}));
// TODO multiturn moves
