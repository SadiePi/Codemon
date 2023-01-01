import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Reflect: Move = preload.register<Move>((C: Codex) => ({
  name: "Reflect",
  description: "A wondrous wall of light is put up to reduce damage from physical attacks for five turns.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  target: "Team",
  makesContact: false,
}));
// TODO functionality
