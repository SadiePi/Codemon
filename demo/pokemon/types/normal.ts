import { Codex, Type, register } from "../index.ts";

export const Normal: Type = register<Type>((C: Codex) => ({
  name: "Normal",
  color: "#A8A878",
  weaknesses: [C.Types.Fighting],
  resistances: [],
  immunities: [C.Types.Ghost],
}));
