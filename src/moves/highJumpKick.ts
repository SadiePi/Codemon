import C, { Move, Codemon } from "../index.ts";
import { moves } from "../core/codex.ts";

export const HighJumpKick = moves.register(() => ({
  name: "High Jump Kick",
  description:
    "The target is attacked with a knee kick from a jump. If this move misses, the user takes damage instead.",
  type: C.Types.Fighting,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 130,
  accuracy: 90,
  makesContact: true,
  crash: { hp: action => (action.source instanceof Codemon ? action.source.stats.hp.max / 2 : 0) },
}));
