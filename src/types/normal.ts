import { Codex, Type } from "../index.ts";
import preload from "../preload.ts";

export const Normal: Type = preload.register<Type>((C: Codex) => ({
  name: "Normal",
  color: "#A8A878",
  weaknesses: [C.Types.Fighting],
  resistances: [],
  immunities: [C.Types.Ghost],
}));
