import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Psychic: Type = dexBuilder.register<Type>(() => ({
  name: "Psychic",
  color: "#F85888",
  weaknesses: [C.Types.Bug, C.Types.Ghost, C.Types.Dark],
  resistances: [C.Types.Fighting, C.Types.Psychic],
  immunities: [],
}));
