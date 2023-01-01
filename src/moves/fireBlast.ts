import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const FireBlast: Move = dexBuilder.register<Move>(() => ({
  name: "Fire Blast",
  description:
    "The target is attacked with an intense blast of all-consuming fire. This may also leave the target with a burn.",
  type: C.Types.Fire,
  target: "Any Adjacent",
  category: "Special",
  pp: 5,
  attack: power(110),
  accuracy: 85,
  makesContact: false,
  status: [C.Statuses.Burn, 1 / 10],
}));
