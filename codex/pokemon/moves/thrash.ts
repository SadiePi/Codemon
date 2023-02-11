import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const Thrash: Move = loader.register<Move>(P => ({
  name: "Thrash",
  description: "The user rampages and attacks for two to three turns. The user then becomes confused.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 10,
  attack: power(120),
  target: "Self",
  makesContact: true,
  status: P.Statuses.Thrashing,
}));