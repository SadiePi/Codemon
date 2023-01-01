import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Growl: Move = dexBuilder.register<Move>(() => ({
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
