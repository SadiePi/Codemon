import { Codex, power, Move, chance } from "../index.ts";
import loader from "../loader.ts";

export const RollingKick: Move = loader.register<Move>((C: Codex) => ({
  name: "Rolling Kick",
  description: "The user lashes out with a quick, spinning kick. This may also make the target flinch.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 15,
  attack: power(60),
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
  status: chance(3 / 10, C.Statuses.Flinch),
}));
