import C, { Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const WorrySeed: Move = dexBuilder.register<Move>(() => ({
  name: "Worry Seed",
  description:
    "A seed that causes worry is planted on the target. It prevents sleep by making the target's Ability Insomnia.",
  type: C.Types.Grass,
  category: "Status",
  pp: 10, // max 16
  priority: 0,
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO ability change
