import { Codex, chance, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const ThunderShock: Move = preload.register<Move>((C: Codex) => ({
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
