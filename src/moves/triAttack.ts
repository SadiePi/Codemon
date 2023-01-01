import { Codex, dexBuilder, power, Move } from "../index.ts";
import { chance, multiple } from "../core/decision.ts";

export const TriAttack: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Tri Attack",
  description:
    "The user strikes with a simultaneous three-beam attack. This may also burn, freeze, or paralyze the target.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Special",
  pp: 10,
  attack: power(80),
  makesContact: false,
  status: multiple([
    chance(1 / 5, C.Statuses.Burn),
    chance(1 / 5, C.Statuses.Freeze),
    chance(1 / 5, C.Statuses.Paralysis),
  ]),
}));
// TODO triattack
