import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Supersonic: Move = loader.register<Move>(P => ({
  name: "Supersonic",
  description: "The user generates odd sound waves from its body that confuse the target.",
  type: P.Types.Normal,
  category: "Status",
  pp: 20,
  accuracy: 55,
  target: "Any Adjacent",
  makesContact: false,
  status: P.Statuses.Confusion,
}));
