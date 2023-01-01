import C, { chance, power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const ThunderShock: Move = dexBuilder.register<Move>(() => ({
  name: "Thunder Shock",
  description:
    "A jolt of electricity crashes down on the target to inflict damage. This may also leave the target with paralysis.",
  type: C.Types.Electric,
  category: "Special",
  pp: 30, // max 48
  attack: power(40),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(1 / 10, C.Statuses.Paralysis),
}));
