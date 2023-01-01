import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Conversion: Move = preload.register<Move>((C: Codex) => ({
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