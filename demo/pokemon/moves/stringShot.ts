import { Codex, Move, register } from "../index.ts";

export const StringShot: Move = register<Move>((C: Codex) => ({
  name: "String Shot",
  description: "Opposing Pokémon are bound with silk blown from the user's mouth that harshly lowers the Speed stat.",
  type: C.Types.Bug,
  category: "Status",
  pp: 40, // max 64
  accuracy: 95,
  target: "Every Adjacent Foe",
  makesContact: false,
  stages: { speed: -2 },
}));
