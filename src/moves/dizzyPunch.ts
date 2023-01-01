import { Codex, dexBuilder, power, Move, chance } from "../index.ts";

export const DizzyPunch: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Dizzy Punch",
  description: "The target is hit with rhythmically launched punches. This may also leave the target confused.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  attack: power(70),
  makesContact: true,
  status: chance(1 / 5, C.Statuses.Confusion),
}));
