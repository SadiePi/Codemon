import C, { Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const TailWhip: Move = dexBuilder.register<Move>(() => ({
  name: "Tail Whip",
  description: "The user wags its tail cutely, making opposing Pokémon less wary and lowering their Defense stats.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30,
  target: "Every Adjacent Foe",
  makesContact: false,
  stages: { defense: -1 },
}));
