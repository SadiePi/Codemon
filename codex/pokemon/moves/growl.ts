import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Growl: Move = loader.register<Move>(P => ({
  name: "Growl",
  description:
    "The user growls in an endearing way, making opposing Pokémon less wary. This lowers their Attack stats.",
  type: P.Types.Normal,
  category: "Status",
  pp: 40, // max 64
  target: { quantity: "All", position: "Adjacent", alignment: "Foe" },
  makesContact: false,
  stages: { attack: -1 },
}));
