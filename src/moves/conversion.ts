import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Conversion = moves.register(() => ({
  name: "Conversion",
  description:
    "The user changes its type to become the same type as the move at the top of the list of moves it knows.",
  type: C.Types.Normal,
  target: "Self",
  category: "Status",
  pp: 30,
  makesContact: false,
}));
// TODO conversion
