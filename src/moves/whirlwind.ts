import C, { Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Whirlwind: Move = dexBuilder.register<Move>(() => ({
  name: "Whirlwind",
  description:
    "The target is blown away, and a different Pokémon is dragged out. In the wild, this ends a battle against a single Pokémon.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20,
  target: "Any Adjacent",
  makesContact: false,
  eject: true,
}));
