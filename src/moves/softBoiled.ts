import C, { Move, Codemon } from "../index.ts";
import { moves } from "../core/codex.ts";

export const SoftBoiled = moves.register(() => ({
  name: "Soft-Boiled",
  description: "The user restores its own HP by up to half of its max HP.",
  type: C.Types.Normal,
  target: "Self",
  category: "Status",
  pp: 5,
  makesContact: false,
  hp: action => (action.source instanceof Codemon ? action.source.stats.hp.max / 2 : 0),
}));
