import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Disable = moves.register(() => ({
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
