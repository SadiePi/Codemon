import { Codex, Move, Codemon, register } from "../index.ts";

export const SuperFang: Move = register<Move>((C: Codex) => ({
  name: "Super Fang",
  description: "The user chomps hard on the target with its sharp front fangs. This cuts the target's HP in half.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  accuracy: 90,
  makesContact: true,
  hp: ({ target }) => (target instanceof Codemon ? -Math.max(Math.floor(target.stats.hp.current / 2)) : 0),
}));
