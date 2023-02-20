import { Move } from "../index.ts";
import loader from "../loader.ts"

export const Smokescreen: Move = loader.register<Move>(P => ({
  name: "Smokescreen",
  description: "The user releases an obscuring cloud of smoke or ink. This lowers the target's accuracy.",
  type: P.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Any Adjacent",
  makesContact: false,
  stages: { accuracy: -1 },
}));
