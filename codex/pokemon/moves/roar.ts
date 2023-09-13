import { power, Move } from "../mod.ts";
import loader from "../loader.ts";

export const Roar: Move = loader.register<Move>(P => ({
  name: "Roar",
  description:
    "The target is scared off, and a different Pokémon is dragged out. In the wild, this ends a battle against a single opponent.",
  type: P.Types.Normal,
  category: "Status",
  pp: 20,
  priority: -6,
  target: { position: "Adjacent" },
  makesContact: false,
  eject: true,
}));
