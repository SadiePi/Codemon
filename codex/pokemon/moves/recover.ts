import { Codemon, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Recover: Move = loader.register<Move>(P => ({
  name: "Recover",
  description: "Restoring its own cells, the user restores its own HP by half of its max HP.",
  type: P.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: { alignment: "Self" },
  makesContact: false,
  hp: ({ action }) => action.params.user.stats.hp.max / 2,
}));
