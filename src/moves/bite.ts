import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Bite = moves.register(() => ({
  name: "Bite",
  description: "The target is bitten with viciously sharp fangs. This may also make the target flinch.",
  type: C.Types.Dark,
  category: "Physical",
  pp: 25, // max 40
  power: 60,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Flinch, 3 / 10],
}));
