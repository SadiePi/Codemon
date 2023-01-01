import C, { Type } from "../index.ts";
import dexBuilder from "../core/codex.ts";

export const Ghost: Type = dexBuilder.register<Type>(() => ({
  name: "Ghost",
  color: "#705898",
  weaknesses: [C.Types.Ghost, C.Types.Dark],
  resistances: [C.Types.Poison, C.Types.Bug],
  immunities: [C.Types.Normal, C.Types.Fighting],
}));
