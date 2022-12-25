import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const RockThrow = moves.register(() => ({
  name: "Rock Throw",
  description: "The user picks up and throws a small rock at the target to attack.",
  type: C.Types.Rock,
  category: "Physical",
  target: "Any Adjacent",
  makesContact: false,
  pp: 15, // max 24
  power: 50,
  accuracy: 90,
}));
