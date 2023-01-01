import { Codex, dexBuilder, Type } from "../index.ts";

export const Fighting: Type = dexBuilder.register<Type>((C: Codex) => ({
  name: "Fighting",
  color: "#C03028",
  weaknesses: [C.Types.Flying, C.Types.Psychic, C.Types.Fairy],
  resistances: [C.Types.Rock, C.Types.Bug],
  immunities: [],
}));
