import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Growth: Move = loader.register<Move>(P => ({
  name: "Growth",
  description: "The user's body grows all at once, raising the Attack and Sp. Atk stats.",
  type: P.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: { alignment: "Self" },
  makesContact: false,
  stages: { attack: 1, specialAttack: 1 },
}));
