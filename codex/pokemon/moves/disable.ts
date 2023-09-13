import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Disable: Move = loader.register<Move>(P => ({
  name: "Disable",
  description: "For four turns, this move prevents the target from using the move it last used.",
  type: P.Types.Normal,
  category: "Status",
  pp: 20,
  target: { position: "Adjacent" },
  makesContact: false,
  restrict: null, // TODO
}));
// TODO move restrictions
