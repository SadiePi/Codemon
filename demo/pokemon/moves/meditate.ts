import { Codex, power, Move, register } from "../index.ts";

export const Meditate: Move = register<Move>((C: Codex) => ({
  name: "Meditate",
  description: "The user meditates to awaken the power deep within its body and raise its Attack stat.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
  stages: { attack: 1 },
}));
