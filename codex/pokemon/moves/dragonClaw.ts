import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const DragonClaw: Move = loader.register<Move>(P => ({
  name: "Dragon Claw",
  description: "The user slashes the target with huge sharp claws.",
  type: P.Types.Dragon,
  category: "Physical",
  pp: 15,
  attack: power(80),
  target: "Any Adjacent",
  makesContact: true,
}));
