import { Codex, Type } from "../index.ts";
import preload from "../preload.ts";

export const Psychic: Type = preload.register<Type>((C: Codex) => ({
  name: "Psychic",
  color: "#F85888",
  weaknesses: [C.Types.Bug, C.Types.Ghost, C.Types.Dark],
  resistances: [C.Types.Fighting, C.Types.Psychic],
  immunities: [],
}));
