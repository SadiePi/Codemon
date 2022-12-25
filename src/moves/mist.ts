import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Mist = moves.register(() => ({
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
