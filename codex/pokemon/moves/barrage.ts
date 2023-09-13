import { Decider, EffectDeciderContext, Move, decide, multiHit, power, range } from "../mod.ts";
import loader from "../loader.ts";

export const Barrage: Move = loader.register<Move>(P => ({
  name: "Barrage",
  description: "Round objects are hurled at the target to strike two to five times in a row.",
  type: P.Types.Normal,
  target: { position: "Adjacent" },
  category: "Physical",
  pp: 20,
  attack: power(15),
  accuracy: 85,
  makesContact: false,
  hitAgain: multiHit(2, 5),
}));
