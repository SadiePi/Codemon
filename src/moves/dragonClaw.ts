import C, { Move } from "../index.ts";

export const DragonClaw: Move = {
  name: "Dragon Claw",
  description: "The user slashes the target with huge sharp claws.",
  type: C.Types.Dragon,
  category: "Physical",
  pp: 15,
  power: 80,
  target: "Any Adjacent",
  makesContact: true,
};