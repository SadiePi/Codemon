import { power, Move } from "../index.ts";
import { loader } from "../loader.ts"

export const Rest: Move = loader.register<Move>(P => ({
  name: "Rest",
  description:
    "The user goes to sleep for two turns. This fully restores the user's HP and heals any status conditions.",
  type: P.Types.Psychic,
  target: "Self",
  category: "Status",
  pp: 5,
  makesContact: false,
}));
// TODO multitutn moves
