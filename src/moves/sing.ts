import C, { Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Sing: Move = dexBuilder.register<Move>(() => ({
  name: "Sing",
  description: "A soothing lullaby is sung in a calming voice that puts the target into a deep slumber.",
  type: C.Types.Normal,
  category: "Status",
  pp: 15,
  accuracy: 55,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Sleep,
}));
