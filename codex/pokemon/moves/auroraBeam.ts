import { chance, Move, power } from "../mod.ts";
import loader from "../loader.ts";

export const AuroraBeam: Move = loader.register<Move>(P => ({
  name: "Aurora Beam",
  description: "The target is hit with a rainbow-colored beam. This may also lower the target's Attack stat.",
  type: P.Types.Ice,
  category: "Special",
  pp: 20,
  attack: power(65),
  target: { position: "Adjacent" },
  makesContact: false,
  stages: chance(1 / 10, { attack: -1 }),
}));
