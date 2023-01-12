import { Codex, power, Move, chance } from "../index.ts";
import loader from "../loader.ts";

export const Flamethrower: Move = loader.register<Move>((C: Codex) => ({
  name: "Flamethrower",
  description: "The target is scorched with an intense blast of fire. This may also leave the target with a burn.",
  type: C.Types.Fire,
  category: "Special",
  pp: 15,
  attack: power(90),
  target: "Any Adjacent",
  makesContact: false,
  status: chance(1 / 10, C.Statuses.Burn),
}));
