import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Growl: Move = preload.register<Move>((C: Codex) => ({
  name: "Growl",
  description:
    "The user growls in an endearing way, making opposing Pokémon less wary. This lowers their Attack stats.",
  type: C.Types.Normal,
  category: "Status",
  pp: 40, // max 64
  target: "Every Adjacent Foe",
  makesContact: false,
  stages: { attack: -1 },
}));
