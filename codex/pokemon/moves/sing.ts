import { Move } from "../index.ts";
import { loader } from "../loader.ts"

export const Sing: Move = loader.register<Move>(P => ({
  name: "Sing",
  description: "A soothing lullaby is sung in a calming voice that puts the target into a deep slumber.",
  type: P.Types.Normal,
  category: "Status",
  pp: 15,
  accuracy: 55,
  target: "Any Adjacent",
  makesContact: false,
  status: P.Statuses.Sleep,
}));