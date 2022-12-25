import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const HyperFang = moves.register(() => ({
  name: "Hyper Fang",
  description: "The user bites hard on the target with its sharp front fangs. This may also make the target flinch.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  power: 80,
  accuracy: 90,
  makesContact: true,
  status: [C.Statuses.Flinch, 1 / 10],
}));
