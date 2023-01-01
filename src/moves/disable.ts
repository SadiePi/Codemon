import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Disable: Move = preload.register<Move>((C: Codex) => ({
  name: "Disable",
  description: "For four turns, this move prevents the target from using the move it last used.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20,
  target: "Any Adjacent",
  makesContact: false,
  restrict: null, // TODO
}));
// TODO move restrictions
