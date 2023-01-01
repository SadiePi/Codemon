import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const MegaKick: Move = dexBuilder.register<Move>(() => ({
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
