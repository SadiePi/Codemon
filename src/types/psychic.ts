import { Codex, Type } from "../index.ts";
import loader from "../loader.ts";

export const Psychic: Type = loader.register<Type>((C: Codex) => ({
  name: "Psychic",
  color: "#F85888",
  weaknesses: [C.Types.Bug, C.Types.Ghost, C.Types.Dark],
  resistances: [C.Types.Fighting, C.Types.Psychic],
  immunities: [],
}));
