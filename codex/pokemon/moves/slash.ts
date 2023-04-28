import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Slash: Move = loader.register<Move>(P => ({
  name: "Slash",
  description: "The target is attacked with a slash of claws or blades. Critical hits land more easily.",
  type: P.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 20,
  attack: power(70),
  makesContact: true,
  criticalHitStage: 1,
}));
