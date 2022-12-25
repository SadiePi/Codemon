import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const SkullBash = moves.register(() => ({
  name: "Skull Bash",
  description:
    "The user tucks in its head to raise its Defense in the first turn, then rams the target on the next turn.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 130,
  makesContact: true,
  stages: { defense: 1 },
}));
// TODO multiturn moves
