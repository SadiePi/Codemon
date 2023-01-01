import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Mimic: Move = dexBuilder.register<Move>(() => ({
  name: "Mimic",
  description:
    "The user copies the target's last move. The move can be used during battle until the Pokémon is switched out.",
  type: C.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Any Adjacent",
  makesContact: false,
}));
// TODO mimic
