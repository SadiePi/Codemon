import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Thrash: Move = dexBuilder.register<Move>(() => ({
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
