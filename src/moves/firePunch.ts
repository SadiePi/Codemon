import { Codex, power, Move, chance } from "../index.ts";
import preload from "../preload.ts";

export const FirePunch: Move = preload.register<Move>((C: Codex) => ({
  name: "Fire Punch",
  description: "The target is punched with a fiery fist. This may also leave the target with a burn.",
  type: C.Types.Fire,
  category: "Physical",
  pp: 15,
  attack: power(75),
  target: "Any Adjacent",
  makesContact: true,
  status: chance(1 / 10, C.Statuses.Burn),
}));
