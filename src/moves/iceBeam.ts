import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const IceBeam = moves.register(() => ({
  name: "Ice Beam",
  description: "The target is struck with an icy-cold beam of energy. This may also leave the target frozen.",
  type: C.Types.Ice,
  category: "Special",
  pp: 10,
  power: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Freeze, 1 / 10],
}));
