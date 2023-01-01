import { Codex, Move } from "../index.ts";
import preload from "../preload.ts";

export const TailWhip: Move = preload.register<Move>((C: Codex) => ({
  name: "Tail Whip",
  description: "The user wags its tail cutely, making opposing Pokémon less wary and lowering their Defense stats.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30,
  target: "Every Adjacent Foe",
  makesContact: false,
  stages: { defense: -1 },
}));
