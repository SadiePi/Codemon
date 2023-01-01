import { Codex, dexBuilder, power, Move } from "../index.ts";

export const SkullBash: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Skull Bash",
  description:
    "The user tucks in its head to raise its Defense in the first turn, then rams the target on the next turn.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  attack: power(130),
  makesContact: true,
  stages: { defense: 1 },
}));
// TODO multiturn moves
