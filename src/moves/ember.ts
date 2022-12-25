import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Ember = moves.register(() => ({
  name: "Ember",
  description: "The target is attacked with small flames. This may also leave the target with a burn.",
  type: C.Types.Fire,
  category: "Special",
  pp: 25,
  power: 40,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Burn, 1 / 10],
}));
