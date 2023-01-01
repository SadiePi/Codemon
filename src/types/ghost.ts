import { Codex, Type } from "../index.ts";
import preload from "../preload.ts";

export const Ghost: Type = preload.register<Type>((C: Codex) => ({
  name: "Ghost",
  color: "#705898",
  weaknesses: [C.Types.Ghost, C.Types.Dark],
  resistances: [C.Types.Poison, C.Types.Bug],
  immunities: [C.Types.Normal, C.Types.Fighting],
}));