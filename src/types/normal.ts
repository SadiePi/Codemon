import { Codex, Type } from "../index.ts";
import loader from "../loader.ts";

export const Normal: Type = loader.register<Type>((C: Codex) => ({
  name: "Normal",
  color: "#A8A878",
  weaknesses: [C.Types.Fighting],
  resistances: [],
  immunities: [C.Types.Ghost],
}));
