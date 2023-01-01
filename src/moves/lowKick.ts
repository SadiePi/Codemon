import { Codex, dexBuilder, Codemon, Move, power } from "../index.ts";

export const LowKick: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Low Kick",
  description:
    "A powerful low kick that makes the target fall over. The heavier the target, the greater the move's power.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 20,
  attack: (_, target, __) => {
    if (!(target instanceof Codemon)) return;
    const w = target.species.weight;
    if (w < 10) return power(20)(_, target, __);
    if (w < 25) return power(40)(_, target, __);
    if (w < 50) return power(60)(_, target, __);
    if (w < 100) return power(80)(_, target, __);
    if (w < 200) return power(100)(_, target, __);
    return power(120)(_, target, _);
  },
  target: "Any Adjacent",
  makesContact: true,
}));
