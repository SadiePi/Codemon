import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const FirePunch: Move = loader.register<Move>(P => ({
  name: "Fire Punch",
  description: "The target is punched with a fiery fist. This may also leave the target with a burn.",
  type: P.Types.Fire,
  category: "Physical",
  pp: 15,
  attack: power(75),
  target: { position: "Adjacent" },
  makesContact: true,
  status: chance(1 / 10, P.Statuses.Burn),
}));
