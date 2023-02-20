import { Move, Codemon, power } from "../index.ts";
import loader from "../loader.ts"

export const HighJumpKick: Move = loader.register<Move>(P => ({
  name: "High Jump Kick",
  description:
    "The target is attacked with a knee kick from a jump. If this move misses, the user takes damage instead.",
  type: P.Types.Fighting,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  attack: power(130),
  accuracy: 90,
  makesContact: true,
  crash: { hp: reciept => (reciept.action.source instanceof Codemon ? reciept.action.source.stats.hp.max / 2 : 0) },
}));
