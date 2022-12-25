import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Transform = moves.register(() => ({
  name: "Transform",
  description: "The user transforms into a copy of the target right down to having the same move set.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 10,
  makesContact: false,
}));
// TODO transform
