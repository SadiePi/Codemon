import { chance, Codex, Move, power } from "../index.ts";
import preload from "../preload.ts";

export const AuroraBeam: Move = preload.register<Move>((C: Codex) => ({
  name: "Aurora Beam",
  description: "The target is hit with a rainbow-colored beam. This may also lower the target's Attack stat.",
  type: C.Types.Ice,
  category: "Special",
  pp: 20,
  attack: power(65),
  target: "Any Adjacent",
  makesContact: false,
  stages: chance(1 / 10, { attack: -1 }),
}));
