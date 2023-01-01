import { Codex, dexBuilder, power, Move } from "../index.ts";

export const LeechLife: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Leech Life",
  description:
    "The user drains the target's blood. The user's HP is restored by up to half the damage taken by the target.",
  type: C.Types.Bug,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  attack: power(80),
  makesContact: true,
  leech: 1 / 2,
}));
