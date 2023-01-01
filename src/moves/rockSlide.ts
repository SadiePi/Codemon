import { Codex, power, Move, chance } from "../index.ts";
import preload from "../preload.ts";

export const RockSlide: Move = preload.register<Move>((C: Codex) => ({
  name: "Rock Slide",
  description:
    "Large boulders are hurled at opposing Pokémon to inflict damage. This may also make the opposing Pokémon flinch.",
  type: C.Types.Rock,
  target: "Every Adjacent Foe",
  category: "Physical",
  pp: 10,
  attack: power(75),
  accuracy: 90,
  makesContact: false,
  status: chance(3 / 10, C.Statuses.Flinch),
}));
