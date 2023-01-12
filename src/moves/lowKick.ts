import { Codex, Codemon, Move, power } from "../index.ts";
import loader from "../loader.ts";

export const LowKick: Move = loader.register<Move>((C: Codex) => ({
  name: "Low Kick",
  description:
    "A powerful low kick that makes the target fall over. The heavier the target, the greater the move's power.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 20,
  attack: ({ target }) => {
    if (!(target instanceof Codemon)) return;
    const w = target.species.weight;
    if (w < 10) return power(20);
    if (w < 25) return power(40);
    if (w < 50) return power(60);
    if (w < 100) return power(80);
    if (w < 200) return power(100);
    return power(120);
  },
  target: "Any Adjacent",
  makesContact: true,
}));
