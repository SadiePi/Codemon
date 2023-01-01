import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const BodySlam: Move = dexBuilder.register<Move>(() => ({
  name: "Body Slam",
  description:
    "The user drops onto the target with its full body weight. This may also leave the target with paralysis.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  attack: power(85),
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Paralysis, 3 / 10],
}));
