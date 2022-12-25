import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Reflect = moves.register(() => ({
  name: "Reflect",
  description: "A wondrous wall of light is put up to reduce damage from physical attacks for five turns.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  target: "Team",
  makesContact: false,
}));
// TODO functionality
