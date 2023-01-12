import { Codex, Type } from "../index.ts";
import loader from "../loader.ts";

export const Poison: Type = loader.register<Type>((C: Codex) => ({
  name: "Poison",
  color: "#A040A0",
  weaknesses: [C.Types.Ground, C.Types.Psychic],
  resistances: [C.Types.Fighting, C.Types.Poison, C.Types.Bug, C.Types.Grass, C.Types.Fairy],
  immunities: [],
}));
