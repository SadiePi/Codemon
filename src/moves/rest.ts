import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Rest: Move = preload.register<Move>((C: Codex) => ({
  name: "Rest",
  description:
    "The user goes to sleep for two turns. This fully restores the user's HP and heals any status conditions.",
  type: C.Types.Psychic,
  target: "Self",
  category: "Status",
  pp: 5,
  makesContact: false,
}));
// TODO multitutn moves