import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Ember: Move = dexBuilder.register<Move>(() => ({
  name: "Ember",
  description: "The target is attacked with small flames. This may also leave the target with a burn.",
  type: C.Types.Fire,
  category: "Special",
  pp: 25,
  attack: power(40),
  target: "Any Adjacent",
  makesContact: false,
  status: [1 / 10, C.Statuses.Burn],
}));
