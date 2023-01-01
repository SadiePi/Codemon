import { Codex, dexBuilder, Move, power } from "../index.ts";

export const Agility: Move = dexBuilder.register<Move>((C: Codex) => ({
  name: "Agility",
  description: "The user relaxes and lightens its body to move faster. This sharply raises the Speed stat.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 30, // max 48
  target: "Self",
  makesContact: false,
  stages: { speed: 2 },
}));
