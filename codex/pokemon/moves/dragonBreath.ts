import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const DragonBreath: Move = loader.register<Move>(P => ({
  name: "Dragon Breath",
  description: "The user exhales a mighty gust that inflicts damage. This may also leave the target with paralysis.",
  type: P.Types.Dragon,
  category: "Special",
  pp: 20,
  attack: power(60),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(3 / 10, P.Statuses.Paralysis),
}));
