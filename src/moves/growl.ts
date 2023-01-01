import { Codex, dexBuilder, power, Move } from "../index.ts";

export const Growl: Move = dexBuilder.register<Move>((C: Codex) => ({
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
