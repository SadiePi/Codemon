import { Codemon, Move, power } from "../mod.ts";
import loader from "../loader.ts";

export const JumpKick: Move = loader.register<Move>(P => ({
  name: "Jump Kick",
  description: "The user jumps up high, then strikes with a kick. If the kick misses, the user hurts itself.",
  type: P.Types.Fighting,
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
