import { Move, Codemon } from "../mod.ts";
import loader from "../loader.ts";

export const SuperFang: Move = loader.register<Move>(P => ({
  name: "Super Fang",
  description: "The user chomps hard on the target with its sharp front fangs. This cuts the target's HP in half.",
  type: P.Types.Normal,
  target: { position: "Adjacent" },
  category: "Physical",
  pp: 10,
  accuracy: 90,
  makesContact: true,
  hp: ({ target }) => (target instanceof Codemon ? -Math.max(Math.floor(target.stats.hp.current / 2)) : 0),
}));
