import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const RollingKick: Move = loader.register<Move>(P => ({
  name: "Rolling Kick",
  description: "The user lashes out with a quick, spinning kick. This may also make the target flinch.",
  type: P.Types.Fighting,
  category: "Physical",
  pp: 15,
  attack: power(60),
  accuracy: 85,
  target: { position: "Adjacent" },
  makesContact: true,
  status: chance(3 / 10, P.Statuses.Flinch),
}));
