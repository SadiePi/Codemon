import C, { Move, Codemon } from "../index.ts";
import { moves } from "../core/codex.ts";

export const SuperFang = moves.register(() => ({
  name: "Super Fang",
  description: "The user chomps hard on the target with its sharp front fangs. This cuts the target's HP in half.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  accuracy: 90,
  makesContact: true,
  hp: (_, target) => (target instanceof Codemon ? Math.max(Math.floor(target.stats.hp.current / 2)) : 0),
}));
