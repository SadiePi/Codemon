import { chance, Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Bite: Move = preload.register<Move>((C: Codex) => ({
  name: "Bite",
  description: "The target is bitten with viciously sharp fangs. This may also make the target flinch.",
  type: C.Types.Dark,
  category: "Physical",
  pp: 25, // max 40
  attack: power(60),
  target: "Any Adjacent",
  makesContact: true,
  status: chance(3 / 10, C.Statuses.Flinch),
}));