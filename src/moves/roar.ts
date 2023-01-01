import { Codex, dexBuilder, power, Move } from "../index.ts";

export const Roar: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Roar",
  description:
    "The target is scared off, and a different Pokémon is dragged out. In the wild, this ends a battle against a single opponent.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20,
  priority: -6,
  target: "Any Adjacent",
  makesContact: false,
  eject: true,
}));
