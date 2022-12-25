import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Headbutt = moves.register(() => ({
  name: "Headbutt",
  description:
    "The user sticks out its head and attacks by charging straight into the target. This may also make the target flinch.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  power: 70,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Flinch, 3 / 10],
}));
