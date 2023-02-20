import { power, Move } from "../index.ts";
import loader from "../loader.ts"

export const Kinesis: Move = loader.register<Move>(P => ({
  name: "Kinesis",
  description: "The user distracts the target by bending a spoon. This lowers the target's accuracy.",
  type: P.Types.Psychic,
  target: "Any Adjacent",
  category: "Status",
  pp: 15,
  accuracy: 80,
  makesContact: false,
  stages: { accuracy: -1 },
}));
