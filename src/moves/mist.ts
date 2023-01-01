import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Mist: Move = preload.register<Move>((C: Codex) => ({
  name: "Mist",
  description:
    "The user cloaks itself and its allies in a white mist that prevents any of their stats from being lowered for five turns.",
  type: C.Types.Ice,
  category: "Status",
  pp: 30,
  target: "Team",
  makesContact: false,
  // status: C.Statuses.Mist,
}));
// TODO mist effect
