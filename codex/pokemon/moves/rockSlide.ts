import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const RockSlide: Move = loader.register<Move>(P => ({
  name: "Rock Slide",
  description:
    "Large boulders are hurled at opposing Pokémon to inflict damage. This may also make the opposing Pokémon flinch.",
  type: P.Types.Rock,
  target: { quantity: "All", position: "Adjacent", alignment: "Foe" },
  category: "Physical",
  pp: 10,
  attack: power(75),
  accuracy: 90,
  makesContact: false,
  status: chance(3 / 10, P.Statuses.Flinch),
}));
