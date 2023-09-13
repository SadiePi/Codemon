import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const PoisonPowder: Move = loader.register<Move>(P => ({
  name: "Poison Powder",
  description: "The user scatters a cloud of poisonous dust that poisons the target.",
  type: P.Types.Poison,
  category: "Status",
  pp: 35, // max 56
  accuracy: 75,
  target: { position: "Adjacent" },
  makesContact: false,
  status: P.Statuses.Poison,
}));
