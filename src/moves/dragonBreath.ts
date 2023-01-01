import { Codex, power, Move, chance } from "../index.ts";
import preload from "../preload.ts";

export const DragonBreath: Move = preload.register<Move>((C: Codex) => ({
  name: "Dragon Breath",
  description: "The user exhales a mighty gust that inflicts damage. This may also leave the target with paralysis.",
  type: C.Types.Dragon,
  category: "Special",
  pp: 20,
  attack: power(60),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(3 / 10, C.Statuses.Paralysis),
}));