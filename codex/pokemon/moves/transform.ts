import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Transform: Move = loader.register<Move>(P => ({
  name: "Transform",
  description: "The user transforms into a copy of the target right down to having the same move set.",
  type: P.Types.Normal,
  target: { position: "Adjacent" },
  category: "Status",
  pp: 10,
  makesContact: false,
}));
// TODO transform
