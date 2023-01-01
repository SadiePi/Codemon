import { Codex, Codemon, Move, power } from "../index.ts";
import preload from "../preload.ts";

export const JumpKick: Move = preload.register<Move>((C: Codex) => ({
  name: "Jump Kick",
  description: "The user jumps up high, then strikes with a kick. If the kick misses, the user hurts itself.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 10,
  attack: power(100),
  accuracy: 95,
  target: "Any Adjacent",
  makesContact: true,
  crash: {
    hp: reciept =>
      reciept.action.source instanceof Codemon ? Math.floor(reciept.action.source.stats.hp.value() / 2) : 0,
  },
}));
