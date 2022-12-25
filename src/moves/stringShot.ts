import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const StringShot = moves.register(() => ({
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
