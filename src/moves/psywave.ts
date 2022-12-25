import C, { Move, Codemon } from "../index.ts";
import { moves } from "../core/codex.ts";

export const Psywave = moves.register(() => ({
  name: "Psywave",
  description: "The target is attacked with an odd psychic wave. The attack varies in intensity.",
  type: C.Types.Psychic,
  target: "Any Adjacent",
  category: "Special",
  pp: 15,
  makesContact: false,
  hp: action =>
    action.source instanceof Codemon ? Math.floor((action.source.experience.level * (Math.random() * +50)) / 100) : 0,
}));
