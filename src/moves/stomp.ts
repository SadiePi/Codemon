import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Stomp = moves.register(() => ({
  name: "Stomp",
  description: "The target is stomped with a big foot. This may also make the target flinch.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 65,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Flinch, 3 / 10],
}));
