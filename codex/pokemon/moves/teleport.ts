import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Teleport: Move = loader.register<Move>(P => ({
  name: "Teleport",
  description:
    "The user switches places with another party Pokémon. It may also be used to warp to the last Pokémon Center visited. If a wild Pokémon uses this move, it flees.",
  type: P.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  priority: -6,
  target: { alignment: "Self" },
  makesContact: false,
  eject: true,
}));
