import C, { Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Transform: Move = dexBuilder.register<Move>(() => ({
  name: "Transform",
  description: "The user transforms into a copy of the target right down to having the same move set.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 10,
  makesContact: false,
}));
// TODO transform
