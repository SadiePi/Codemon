import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Flamethrower = moves.register(() => ({
  name: "Flamethrower",
  description: "The target is scorched with an intense blast of fire. This may also leave the target with a burn.",
  type: C.Types.Fire,
  category: "Special",
  pp: 15,
  power: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Burn, 1 / 10],
}));
