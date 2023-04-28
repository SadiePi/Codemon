import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const SandAttack: Move = loader.register<Move>(P => ({
  name: "Sand Attack",
  description: "Sand is hurled in the target's face, reducing the target's accuracy.",
  type: P.Types.Ground,
  category: "Status",
  pp: 15,
  target: "Any Adjacent",
  makesContact: false,
  stages: { accuracy: -1 },
}));
