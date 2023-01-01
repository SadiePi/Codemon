import { Codex, dexBuilder, power, Move } from "../index.ts";

export const Ember: Move = dexBuilder.register<Move>((C: Codex) => ({
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
