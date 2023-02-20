import { power, Move } from "../index.ts";
import loader from "../loader.ts"

// why isn't this a status move apdabiouaboduiboiuafb
export const Screech: Move = loader.register<Move>(P => ({
  name: "Screech",
  description: "An earsplitting screech harshly lowers the target's Defense stat.",
  type: P.Types.Normal,
  category: "Special",
  pp: 40, // max 64
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: false,
  stages: { defense: -2 },
}));
