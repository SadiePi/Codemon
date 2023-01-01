import { Codex, power, Move } from "../index.ts";
import preload from "../preload.ts";

export const Supersonic: Move = preload.register<Move>((C: Codex) => ({
  name: "Supersonic",
  description: "The user generates odd sound waves from its body that confuse the target.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20,
  accuracy: 55,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Confusion,
}));
