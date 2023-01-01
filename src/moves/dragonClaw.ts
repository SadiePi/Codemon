import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const DragonClaw: Move = dexBuilder.register<Move>(() => ({
  name: "Dragon Claw",
  description: "The user slashes the target with huge sharp claws.",
  type: C.Types.Dragon,
  category: "Physical",
  pp: 15,
  attack: power(80),
  target: "Any Adjacent",
  makesContact: true,
}));
