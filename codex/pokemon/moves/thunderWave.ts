import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const ThunderWave: Move = loader.register<Move>(P => ({
  name: "Thunder Wave",
  description: "The user launches a weak jolt of electricity that paralyzes the target.",
  type: P.Types.Electric,
  category: "Status",
  pp: 20, // max 32
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: P.Statuses.Paralysis,
}));
