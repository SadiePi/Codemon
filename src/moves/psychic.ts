import { Codex, dexBuilder, power, Move } from "../index.ts";

export const Psychic: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Psychic",
  description: "The target is hit by a strong telekinetic force. This may also lower the target's Sp. Def stat.",
  type: C.Types.Psychic,
  category: "Special",
  pp: 10, // max 16
  attack: power(90),
  target: "Any Adjacent",
  makesContact: false,
  stages: [1 / 10, { specialDefense: -1 }],
}));
