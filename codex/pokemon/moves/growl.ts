import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const Growl: Move = loader.register<Move>(P => ({
  name: "Growl",
  description:
    "The user growls in an endearing way, making opposing Pokémon less wary. This lowers their Attack stats.",
  type: P.Types.Normal,
  category: "Status",
  pp: 40, // max 64
  target: "Every Adjacent Foe",
  makesContact: false,
  stages: { attack: -1 },
}));
