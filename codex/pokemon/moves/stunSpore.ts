import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const StunSpore: Move = loader.register<Move>(P => ({
  name: "Stun Spore",
  description: "The user scatters a cloud of numbing powder that paralyzes the target.",
  type: P.Types.Grass,
  category: "Status",
  pp: 30, // max 48
  accuracy: 75,
  target: { position: "Adjacent" },
  makesContact: false,
  status: P.Statuses.Paralysis,
}));
