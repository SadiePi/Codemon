import { power, Move, chance } from "../mod.ts";
import loader from "../loader.ts";

export const Blizzard: Move = loader.register<Move>(P => ({
  name: "Blizzard",
  description:
    "A howling blizzard is summoned to strike opposing Pokémon. This may also leave the opposing Pokémon frozen.",
  type: P.Types.Ice,
  category: "Special",
  pp: 5,
  attack: power(110),
  accuracy: 70,
  target: "Every Adjacent Foe",
  makesContact: false,
  status: chance(1 / 10, P.Statuses.Freeze),
}));
