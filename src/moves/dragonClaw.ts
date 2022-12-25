import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const DragonClaw = moves.register(() => ({
  name: "Dragon Claw",
  description: "The user slashes the target with huge sharp claws.",
  type: C.Types.Dragon,
  category: "Physical",
  pp: 15,
  power: 80,
  target: "Any Adjacent",
  makesContact: true,
}));
