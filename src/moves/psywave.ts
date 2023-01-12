import { Codex, Move, Codemon } from "../index.ts";
import loader from "../loader.ts";

export const Psywave: Move = loader.register<Move>((C: Codex) => ({
  name: "Psywave",
  description: "The target is attacked with an odd psychic wave. The attack varies in intensity.",
  type: C.Types.Psychic,
  target: "Any Adjacent",
  category: "Special",
  pp: 15,
  makesContact: false,
  hp: ({ action }) =>
    action.source instanceof Codemon ? Math.floor((action.source.stats.level * (Math.random() * +50)) / 100) : 0,
}));
