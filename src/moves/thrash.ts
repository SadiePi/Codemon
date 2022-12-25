import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Thrash = moves.register(() => ({
  name: "Thrash",
  description: "The user rampages and attacks for two to three turns. The user then becomes confused.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 10,
  power: 120,
  target: "Self",
  makesContact: true,
  status: C.Statuses.Thrashing,
}));
