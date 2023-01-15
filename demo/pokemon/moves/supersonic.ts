import { Codex, power, Move, register } from "../index.ts";

export const Supersonic: Move = register<Move>((C: Codex) => ({
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
