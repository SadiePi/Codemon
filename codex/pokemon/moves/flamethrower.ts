import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const Flamethrower: Move = loader.register<Move>(P => ({
  name: "Flamethrower",
  description: "The target is scorched with an intense blast of fire. This may also leave the target with a burn.",
  type: P.Types.Fire,
  category: "Special",
  pp: 15,
  attack: power(90),
  target: {},
  makesContact: false,
  status: chance(1 / 10, P.Statuses.Burn),
}));
