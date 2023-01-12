import { Codex, Codemon, Move } from "../index.ts";
import loader from "../loader.ts";

export const Recover: Move = loader.register<Move>((C: Codex) => ({
  name: "Recover",
  description: "Restoring its own cells, the user restores its own HP by half of its max HP.",
  type: C.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Self",
  makesContact: false,
  hp: ({ action }) => (action.source instanceof Codemon ? action.source.stats.hp.max / 2 : 0),
}));
