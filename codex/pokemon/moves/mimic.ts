import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const Mimic: Move = loader.register<Move>(P => ({
  name: "Mimic",
  description:
    "The user copies the target's last move. The move can be used during battle until the Pokémon is switched out.",
  type: P.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO mimic
