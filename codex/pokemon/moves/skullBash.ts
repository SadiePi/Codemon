import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const SkullBash: Move = loader.register<Move>(P => ({
  name: "Skull Bash",
  description:
    "The user tucks in its head to raise its Defense in the first turn, then rams the target on the next turn.",
  type: P.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  attack: power(130),
  makesContact: true,
  stages: { defense: 1 },
}));
// TODO multiturn moves
