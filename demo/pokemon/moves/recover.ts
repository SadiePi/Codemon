import { Codex, Codemon, Move, register } from "../index.ts";

export const Recover: Move = register<Move>((C: Codex) => ({
  name: "Recover",
  description: "Restoring its own cells, the user restores its own HP by half of its max HP.",
  type: C.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Self",
  makesContact: false,
  hp: ({ action }) => (action.source instanceof Codemon ? action.source.stats.hp.max / 2 : 0),
}));
