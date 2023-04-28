import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const DragonRush: Move = loader.register<Move>(P => ({
  name: "Dragon Rush",
  description:
    "The user tackles the target while exhibiting overwhelming menace. This may also make the target flinch.",
  type: P.Types.Dragon,
  category: "Physical",
  pp: 10, // max 16
  attack: power(100),
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: true,
}));
//  status consideration (boost against minimize)
