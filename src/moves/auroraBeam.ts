import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const AuroraBeam = moves.register(() => ({
  name: "Aurora Beam",
  description: "The target is hit with a rainbow-colored beam. This may also lower the target's Attack stat.",
  type: C.Types.Ice,
  category: "Special",
  pp: 20,
  power: 65,
  target: "Any Adjacent",
  makesContact: false,
  stages: [1 / 10, { attack: -1 }],
}));
