import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Rest: Move = loader.register<Move>(P => ({
  name: "Rest",
  description:
    "The user goes to sleep for two turns. This fully restores the user's HP and heals any status conditions.",
  type: P.Types.Psychic,
  target: { alignment: "Self" },
  category: "Status",
  pp: 5,
  makesContact: false,
}));
// TODO multitutn moves
