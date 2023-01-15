import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const Conversion: Move = loader.register<Move>(P => ({
  name: "Conversion",
  description:
    "The user changes its type to become the same type as the move at the top of the list of moves it knows.",
  type: P.Types.Normal,
  target: "Self",
  category: "Status",
  pp: 30,
  makesContact: false,
}));
// TODO conversion
