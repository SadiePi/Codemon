import { Codex, Type } from "../index.ts";
import preload from "../preload.ts";

export const Fighting: Type = preload.register<Type>((C: Codex) => ({
  name: "Fighting",
  color: "#C03028",
  weaknesses: [C.Types.Flying, C.Types.Psychic, C.Types.Fairy],
  resistances: [C.Types.Rock, C.Types.Bug],
  immunities: [],
}));
