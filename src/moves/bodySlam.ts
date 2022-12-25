import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const BodySlam = moves.register(() => ({
  name: "Body Slam",
  description:
    "The user drops onto the target with its full body weight. This may also leave the target with paralysis.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  power: 85,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Paralysis, 3 / 10],
}));
