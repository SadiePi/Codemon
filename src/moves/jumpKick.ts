import C, { Codemon, Move } from "../index.ts";

export const JumpKick: Move = {
  name: "Jump Kick",
  description: "The user jumps up high, then strikes with a kick. If the kick misses, the user hurts itself.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 10,
  power: 100,
  accuracy: 95,
  target: "Any Adjacent",
  makesContact: true,
  crash: {
    hp: action => (action.source instanceof Codemon ? Math.floor(action.source.stats.hp.value() / 2) : 0),
  },
};
