import { Codex, power, Move } from "../index.ts";
import loader from "../loader.ts";

export const DragonClaw: Move = loader.register<Move>((C: Codex) => ({
  name: "Dragon Claw",
  description: "The user slashes the target with huge sharp claws.",
  type: C.Types.Dragon,
  category: "Physical",
  pp: 15,
  attack: power(80),
  target: "Any Adjacent",
  makesContact: true,
}));
