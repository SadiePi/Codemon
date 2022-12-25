import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const RockSlide = moves.register(() => ({
  name: "Rock Slide",
  description:
    "Large boulders are hurled at opposing Pokémon to inflict damage. This may also make the opposing Pokémon flinch.",
  type: C.Types.Rock,
  target: "Every Adjacent Foe",
  category: "Physical",
  pp: 10,
  power: 75,
  accuracy: 90,
  makesContact: false,
  status: [C.Statuses.Flinch, 3 / 10],
}));
