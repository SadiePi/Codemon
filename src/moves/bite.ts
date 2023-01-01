import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Bite: Move = dexBuilder.register<Move>(() => ({
  name: "Bite",
  description: "The target is bitten with viciously sharp fangs. This may also make the target flinch.",
  type: C.Types.Dark,
  category: "Physical",
  pp: 25, // max 40
  attack: power(60),
  target: "Any Adjacent",
  makesContact: true,
  status: [3 / 10, C.Statuses.Flinch],
}));
