import { Codex, dexBuilder, power, Move } from "../index.ts";

export const MegaKick: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Mega Kick",
  description: "The target is attacked by a kick launched with muscle-packed power.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 5,
  attack: power(120),
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: true,
}));
