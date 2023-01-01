import C, { Move, power } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const AuroraBeam: Move = dexBuilder.register<Move>(() => ({
  name: "Aurora Beam",
  description: "The target is hit with a rainbow-colored beam. This may also lower the target's Attack stat.",
  type: C.Types.Ice,
  category: "Special",
  pp: 20,
  attack: power(65),
  target: "Any Adjacent",
  makesContact: false,
  stages: [1 / 10, { attack: -1 }],
}));
