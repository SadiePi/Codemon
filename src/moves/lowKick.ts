import C, { Codemon, Move } from "../index.ts";

export const LowKick: Move = {
  name: "Low Kick",
  description:
    "A powerful low kick that makes the target fall over. The heavier the target, the greater the move's power.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 20,
  power: (_, target) => {
    if (!(target instanceof Codemon)) return;
    const w = target.species.weight;
    if (w < 10) return 20;
    if (w < 25) return 40;
    if (w < 50) return 60;
    if (w < 100) return 80;
    if (w < 200) return 100;
    return 120;
  },
  target: "Any Adjacent",
  makesContact: true,
};
