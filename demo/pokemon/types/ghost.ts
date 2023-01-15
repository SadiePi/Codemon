import { Codex, Type, register } from "../index.ts";

export const Ghost: Type = register<Type>((C: Codex) => ({
  name: "Ghost",
  color: "#705898",
  weaknesses: [C.Types.Ghost, C.Types.Dark],
  resistances: [C.Types.Poison, C.Types.Bug],
  immunities: [C.Types.Normal, C.Types.Fighting],
}));
