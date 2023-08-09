import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const TailWhip: Move = loader.register<Move>(P => ({
  name: "Tail Whip",
  description: "The user wags its tail cutely, making opposing Pokémon less wary and lowering their Defense stats.",
  type: P.Types.Normal,
  category: "Status",
  pp: 30,
  target: {},
  makesContact: false,
  stages: { defense: -1 },
}));
