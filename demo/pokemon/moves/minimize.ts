import { Codex, power, Move, register } from "../index.ts";

export const Minimize: Move = register<Move>((C: Codex) => ({
  name: "Minimize",
  description: "The user compresses its body to make itself look smaller, which sharply raises its evasiveness.",
  type: C.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Self",
  makesContact: false,
  stages: { evasion: 2 },
  status: C.Statuses.Minimize,
}));
