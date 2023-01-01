import { Codex, dexBuilder, Type } from "../index.ts";

export const Psychic: Type = dexBuilder.register<Type>((C: Codex) => ({
  name: "Psychic",
  color: "#F85888",
  weaknesses: [C.Types.Bug, C.Types.Ghost, C.Types.Dark],
  resistances: [C.Types.Fighting, C.Types.Psychic],
  immunities: [],
}));
