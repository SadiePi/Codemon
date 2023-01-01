import { Codex, dexBuilder, power, Move } from "../index.ts";

export const Thrash: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Thrash",
  description: "The user rampages and attacks for two to three turns. The user then becomes confused.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 10,
  attack: power(120),
  target: "Self",
  makesContact: true,
  status: C.Statuses.Thrashing,
}));
