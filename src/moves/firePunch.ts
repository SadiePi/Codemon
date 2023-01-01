import C, { power, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const FirePunch: Move = dexBuilder.register<Move>(() => ({
  name: "Fire Punch",
  description: "The target is punched with a fiery fist. This may also leave the target with a burn.",
  type: C.Types.Fire,
  category: "Physical",
  pp: 15,
  attack: power(75),
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Burn, 1 / 10],
}));
