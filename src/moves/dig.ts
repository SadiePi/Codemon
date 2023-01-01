import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Dig: Move = preload.register<Move>((C: Codex) => ({
  name: "Dig",
  description: "The user burrows into the ground, then attacks on the next turn.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 10, // max 16
  attack: power(80),
  target: "Any Adjacent",
  makesContact: true,
  status: C.Statuses.SemiInvulnerableTurn,
}));
// TODO multiturn moves