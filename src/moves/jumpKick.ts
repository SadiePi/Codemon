import { Codex, dexBuilder, Codemon, Move, power } from "../index.ts";

export const JumpKick: Move = dexBuilder.register<Move>((C: Codex) => ({
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
    hp: action => (action.source instanceof Codemon ? Math.floor(action.source.stats.hp.value() / 2) : 0),
  },
}));
